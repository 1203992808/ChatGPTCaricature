#!/usr/bin/env python3
"""Fetch an OpenGraph/Twitter preview image from a URL.

Usage:
  python scripts/fetch_og_image.py "https://example.com" "public/imgs/brand/hero.jpg"

Notes:
- Best-effort: looks for og:image and twitter:image.
- Uses Python stdlib only (no external deps).
"""

from __future__ import annotations

import re
import ssl
import sys
import urllib.parse
import urllib.request
from http.client import IncompleteRead
from urllib.error import HTTPError, URLError


META_PATTERNS = [
    # og:image
    re.compile(
        r"<meta\s+[^>]*property=[\"']og:image[\"'][^>]*content=[\"']([^\"']+)[\"'][^>]*>",
        re.IGNORECASE,
    ),
    re.compile(
        r"<meta\s+[^>]*content=[\"']([^\"']+)[\"'][^>]*property=[\"']og:image[\"'][^>]*>",
        re.IGNORECASE,
    ),
    # twitter:image
    re.compile(
        r"<meta\s+[^>]*name=[\"']twitter:image[\"'][^>]*content=[\"']([^\"']+)[\"'][^>]*>",
        re.IGNORECASE,
    ),
    re.compile(
        r"<meta\s+[^>]*content=[\"']([^\"']+)[\"'][^>]*name=[\"']twitter:image[\"'][^>]*>",
        re.IGNORECASE,
    ),
]


def _fetch_bytes(url: str, *, timeout: int = 20) -> tuple[bytes, str]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
            data = resp.read()
            content_type = resp.headers.get("Content-Type", "")
            return data, content_type
    except (HTTPError, URLError, TimeoutError, OSError, IncompleteRead) as exc:
        print(f"Fetch failed {url}: {exc}", file=sys.stderr)
        raise


def _find_image_url(html: str) -> str | None:
    for pat in META_PATTERNS:
        m = pat.search(html)
        if m:
            return m.group(1).strip()
    return None


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: python scripts/fetch_og_image.py <url> <output-path>", file=sys.stderr)
        return 2

    page_url = sys.argv[1]
    out_path = sys.argv[2]

    page_bytes, _ = _fetch_bytes(page_url)
    # best-effort decode
    html = page_bytes.decode("utf-8", errors="ignore")

    img_url = _find_image_url(html)
    if not img_url:
        print("No og:image or twitter:image found", file=sys.stderr)
        return 1

    img_url = urllib.parse.urljoin(page_url, img_url)

    img_bytes, content_type = _fetch_bytes(img_url)

    # Safety: do not write huge files by accident
    max_bytes = 15 * 1024 * 1024
    if len(img_bytes) > max_bytes:
        print(f"Image too large ({len(img_bytes)} bytes)", file=sys.stderr)
        return 1

    # Basic validation: must look like an image
    if "image" not in (content_type or "").lower():
        # Some servers omit content-type; do a very light magic check
        if not (
            img_bytes.startswith(b"\x89PNG")
            or img_bytes.startswith(b"\xff\xd8\xff")
            or img_bytes.startswith(b"GIF8")
            or img_bytes.lstrip().startswith(b"<svg")
        ):
            print(f"Unexpected content-type: {content_type}", file=sys.stderr)
            return 1

    with open(out_path, "wb") as f:
        f.write(img_bytes)

    print(img_url)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
