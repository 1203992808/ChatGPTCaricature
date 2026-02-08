#!/usr/bin/env python3
"""
Run Lighthouse locally for one or more routes and print a short summary.

Examples:
  python3 .codex/lighthouse-audit/scripts/run_lighthouse.py --route "/pricing"
  python3 .codex/lighthouse-audit/scripts/run_lighthouse.py --routes "/,/pricing" --preset desktop --runs 3
  python3 .codex/lighthouse-audit/scripts/run_lighthouse.py --url "http://localhost:3000/pricing"
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin, urlparse


DEFAULT_BASE_URL = "http://localhost:3000"
DEFAULT_OUTPUT_DIR = ".lighthouse"


def _repo_root_from_this_file() -> Path:
    current = Path(__file__).resolve()
    for parent in [current] + list(current.parents):
        if (parent / "package.json").exists():
            return parent
    raise RuntimeError("Could not locate repo root (package.json not found).")


def _normalize_route(route: str) -> str:
    raw = (route or "").strip()
    if not raw:
        raise ValueError("route is required")

    if "://" in raw:
        parsed = urlparse(raw)
        raw = parsed.path or "/"

    raw = raw.split("?", 1)[0].split("#", 1)[0]
    if not raw.startswith("/"):
        raw = "/" + raw
    return re.sub(r"/{2,}", "/", raw)


def _slug_from_path(path: str) -> str:
    cleaned = (path or "").strip().strip("/")
    if not cleaned:
        return "root"
    safe = re.sub(r"[^A-Za-z0-9_-]+", "-", cleaned)
    safe = re.sub(r"-{2,}", "-", safe).strip("-")
    return safe or "root"


def _pick_runner() -> list[str]:
    if shutil.which("npx"):
        return ["npx", "lighthouse"]
    if shutil.which("pnpm"):
        return ["pnpm", "dlx", "lighthouse"]
    if shutil.which("bunx"):
        return ["bunx", "lighthouse"]
    raise RuntimeError("Could not find npx, pnpm, or bunx to run Lighthouse.")


def _get_lighthouse_help(runner: list[str]) -> str:
    try:
        result = subprocess.run(
            [*runner, "--help"],
            capture_output=True,
            text=True,
            check=False,
        )
    except Exception:
        return ""
    return (result.stdout or "") + "\n" + (result.stderr or "")


def _extract_choices(help_text: str, flag: str) -> list[str]:
    if not help_text:
        return []
    pattern = re.compile(rf"^\s*{re.escape(flag)}(\s|$)")
    flag_start = re.compile(r"^\s*--[A-Za-z0-9-]+")
    lines = help_text.splitlines()
    for idx, line in enumerate(lines):
        if not pattern.search(line):
            continue
        for j in range(idx, len(lines)):
            probe = lines[j]
            if j > idx and flag_start.search(probe):
                break
            if "choices:" in probe:
                return re.findall(r'"([^"]+)"', probe)
        break
    return []


def _resolve_preset_args(preset: str, runner: list[str]) -> list[str]:
    help_text = _get_lighthouse_help(runner)
    preset_choices = _extract_choices(help_text, "--preset")
    form_factor_choices = _extract_choices(help_text, "--form-factor")

    if preset == "desktop":
        if "desktop" in preset_choices:
            return ["--preset", "desktop"]
        if "desktop" in form_factor_choices:
            return ["--form-factor", "desktop"]
        return ["--preset", "desktop"]

    # Mobile/default: map to the new preset if needed.
    args: list[str] = []
    if "mobile" in preset_choices:
        args.extend(["--preset", "mobile"])
    elif "perf" in preset_choices:
        args.extend(["--preset", "perf"])
    else:
        args.extend(["--preset", "mobile"])

    if "mobile" in form_factor_choices:
        args.extend(["--form-factor", "mobile"])
    return args


def _collect_routes(route_list: list[str], routes_csv: str) -> list[str]:
    routes = []
    for route in route_list:
        if route:
            routes.append(route)
    if routes_csv:
        routes.extend([part.strip() for part in routes_csv.split(",") if part.strip()])
    return routes


def _audit_value(audits: dict, key: str) -> str:
    audit = audits.get(key, {}) if isinstance(audits, dict) else {}
    value = audit.get("displayValue")
    if value:
        return str(value)
    numeric = audit.get("numericValue")
    if numeric is None:
        return "n/a"
    if key in {"cumulative-layout-shift"}:
        return f"{numeric:.3f}"
    if numeric >= 1000:
        return f"{numeric/1000:.2f}s"
    return f"{numeric:.0f}ms"


def _print_summary(url: str, report_path: Path) -> None:
    report = json.loads(report_path.read_text(encoding="utf-8"))
    categories = report.get("categories", {}) if isinstance(report, dict) else {}
    audits = report.get("audits", {}) if isinstance(report, dict) else {}

    perf_score = categories.get("performance", {}).get("score")
    perf_score_display = "n/a" if perf_score is None else f"{round(perf_score * 100)}"

    tti_key = "interactive" if "interactive" in audits else "interaction-to-next-paint"

    summary = {
        "Performance": perf_score_display,
        "FCP": _audit_value(audits, "first-contentful-paint"),
        "LCP": _audit_value(audits, "largest-contentful-paint"),
        "Speed Index": _audit_value(audits, "speed-index"),
        "TBT": _audit_value(audits, "total-blocking-time"),
        "CLS": _audit_value(audits, "cumulative-layout-shift"),
        "TTI/INP": _audit_value(audits, tti_key),
    }

    print("\nLighthouse summary")
    print(f"URL: {url}")
    print(f"Report: {report_path}")
    for label, value in summary.items():
        print(f"- {label}: {value}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Run Lighthouse audits locally.")
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL)
    parser.add_argument("--route", action="append", default=[])
    parser.add_argument("--routes", default="")
    parser.add_argument("--url", action="append", default=[])
    parser.add_argument("--preset", choices=["mobile", "desktop"], default="mobile")
    parser.add_argument("--runs", type=int, default=None)
    parser.add_argument("--output-dir", default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--chrome-flags", default="")
    parser.add_argument("--quiet", action="store_true")

    args = parser.parse_args()

    repo_root = _repo_root_from_this_file()
    output_root = Path(args.output_dir)
    if not output_root.is_absolute():
        output_root = repo_root / output_root

    urls: list[str] = []
    if args.url:
        urls.extend([u for u in args.url if u])
    else:
        routes = _collect_routes(args.route, args.routes)
        if not routes:
            raise SystemExit("Provide --route/--routes or --url.")
        base = args.base_url.rstrip("/") + "/"
        for route in routes:
            normalized = _normalize_route(route)
            urls.append(urljoin(base, normalized.lstrip("/")))

    runner = _pick_runner()
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")

    for url in urls:
        parsed = urlparse(url)
        slug = _slug_from_path(parsed.path)
        run_dir = output_root / slug / args.preset / timestamp
        run_dir.mkdir(parents=True, exist_ok=True)
        report_path = run_dir / "report.json"

        preset_args = _resolve_preset_args(args.preset, runner)
        command = [
            *runner,
            url,
            "--output=json",
            "--output-path",
            str(report_path),
            *preset_args,
        ]

        if args.runs:
            command.extend(["--runs", str(args.runs)])
        if args.chrome_flags:
            command.extend(["--chrome-flags", args.chrome_flags])
        if args.quiet:
            command.append("--quiet")

        print("\nRunning Lighthouse...")
        print("Command:", " ".join(command))
        subprocess.run(command, check=True)

        if not report_path.exists():
            json_reports = sorted(run_dir.glob("*.json"), key=lambda p: p.stat().st_mtime, reverse=True)
            if json_reports:
                report_path = json_reports[0]
            else:
                raise FileNotFoundError(f"No JSON report found in {run_dir}")

        _print_summary(url, report_path)

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # pragma: no cover - CLI error handling
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)
