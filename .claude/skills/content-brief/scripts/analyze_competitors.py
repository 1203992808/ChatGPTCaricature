#!/usr/bin/env python3
"""
竞品页面分析器 — Content Brief 数据采集工具

抓取 SERP 排名前 10 的竞品页面，提取：
- 页面结构（标题层级 H1/H2/H3）
- 字数统计
- 关键词使用和分布
- 内容特征（FAQ、在线 Demo、Gallery、对比表格等）
- Schema 标记
- 聚合摘要和差异化机会

用法:
  python analyze_competitors.py \
    --keyword "AI Image Generator" \
    --urls "url1,url2,url3,..." \
    --locale en \
    --output competitor-analysis.json
"""

from __future__ import annotations

import argparse
import json
import re
import ssl
import sys
import time
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Dict, List, Optional
from http.client import IncompleteRead
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = 20
DEFAULT_DELAY = 1.0


# ---------------------------------------------------------------------------
# HTML Parser
# ---------------------------------------------------------------------------

class PageStructureParser(HTMLParser):
    """解析 HTML 页面，提取结构、内容和特征。"""

    _FAQ_PATTERNS = [
        r"faq", r"frequently.asked", r"common.questions",
        r"q\s*&\s*a", r"questions?.and.answers?",
    ]

    def __init__(self, keyword: str = "", domain: str = ""):
        super().__init__()
        self.keyword = keyword.lower()
        self.domain = domain

        # Metadata
        self.title = ""
        self.meta_description = ""

        # Headings
        self.h1s: List[str] = []
        self.h2s: List[str] = []
        self.h3s: List[str] = []

        # Parser state
        self._in_title = False
        self._title_parts: List[str] = []
        self._in_heading = False
        self._heading_level = 0
        self._heading_text: List[str] = []

        self._in_body = False
        self._in_script = False
        self._in_style = False
        self._skip_depth = 0  # nav / footer / header nesting depth

        # Body text (for word count)
        self._body_texts: List[str] = []

        # Feature detection
        self.has_form = False
        self.has_input = False
        self.has_textarea = False
        self.has_table = False
        self.table_count = 0
        self.image_count = 0
        self.video_count = 0
        self.internal_links: List[str] = []
        self.external_links: List[str] = []

        # FAQ
        self.faq_signals = 0

        # Schema
        self.has_faq_schema = False
        self.has_howto_schema = False
        self.schema_types: List[str] = []

    # -- handlers ----------------------------------------------------------

    def handle_starttag(self, tag: str, attrs: list):
        tag = tag.lower()
        attr = dict(attrs)

        if tag == "title":
            self._in_title = True
            self._title_parts = []

        if tag == "meta":
            name = attr.get("name", "").lower()
            prop = attr.get("property", "").lower()
            content = attr.get("content", "")
            if name == "description" or prop == "og:description":
                if not self.meta_description:
                    self.meta_description = content

        if tag in ("h1", "h2", "h3"):
            self._in_heading = True
            self._heading_level = int(tag[1])
            self._heading_text = []

        if tag == "body":
            self._in_body = True
        if tag == "script":
            self._in_script = True
        if tag == "style":
            self._in_style = True
        if tag in ("nav", "footer", "header") and self._in_body:
            self._skip_depth += 1

        # Feature flags
        if tag == "form":
            self.has_form = True
        if tag == "input":
            itype = attr.get("type", "text").lower()
            if itype not in ("hidden", "submit", "button"):
                self.has_input = True
        if tag == "textarea":
            self.has_textarea = True
        if tag == "table":
            self.has_table = True
            self.table_count += 1
        if tag == "img":
            self.image_count += 1
        if tag in ("video", "iframe"):
            src = attr.get("src", "")
            if "youtube" in src or "vimeo" in src or tag == "video":
                self.video_count += 1

        # Links
        if tag == "a":
            href = attr.get("href", "")
            if href and not href.startswith(("#", "javascript:", "mailto:", "tel:")):
                if href.startswith(("http://", "https://")):
                    parsed = urlparse(href)
                    if self.domain and parsed.netloc and self.domain not in parsed.netloc:
                        self.external_links.append(href)
                    else:
                        self.internal_links.append(href)
                elif href.startswith("/"):
                    self.internal_links.append(href)

        # FAQ signal via class / id
        classes = attr.get("class", "").lower()
        elem_id = attr.get("id", "").lower()
        for pat in self._FAQ_PATTERNS:
            if re.search(pat, classes) or re.search(pat, elem_id):
                self.faq_signals += 1

    def handle_endtag(self, tag: str):
        tag = tag.lower()

        if tag == "title":
            self._in_title = False
            self.title = "".join(self._title_parts).strip()

        if tag in ("h1", "h2", "h3") and self._in_heading:
            self._in_heading = False
            text = "".join(self._heading_text).strip()
            if text:
                if self._heading_level == 1:
                    self.h1s.append(text)
                elif self._heading_level == 2:
                    self.h2s.append(text)
                elif self._heading_level == 3:
                    self.h3s.append(text)
                # FAQ heading?
                for pat in self._FAQ_PATTERNS:
                    if re.search(pat, text.lower()):
                        self.faq_signals += 2

        if tag == "script":
            self._in_script = False
        if tag == "style":
            self._in_style = False
        if tag in ("nav", "footer", "header"):
            self._skip_depth = max(0, self._skip_depth - 1)

    def handle_data(self, data: str):
        if self._in_title:
            self._title_parts.append(data)

        if self._in_heading:
            self._heading_text.append(data)

        # Schema detection in <script type="application/ld+json">
        if self._in_script:
            if "FAQPage" in data:
                self.has_faq_schema = True
                self.schema_types.append("FAQPage")
            if "HowTo" in data:
                self.has_howto_schema = True
                self.schema_types.append("HowTo")
            if "@type" in data:
                for t in re.findall(r'"@type"\s*:\s*"([^"]+)"', data):
                    if t not in self.schema_types:
                        self.schema_types.append(t)
            return

        if self._in_style or self._skip_depth > 0:
            return

        if self._in_body and not self._in_script and not self._in_style:
            text = data.strip()
            if text:
                self._body_texts.append(text)

    # -- derived metrics ---------------------------------------------------

    def body_text(self) -> str:
        return " ".join(self._body_texts)

    def word_count(self, locale: str = "en") -> int:
        text = self.body_text()
        if locale in ("zh", "ja", "ko"):
            return len(re.sub(r"\s+", "", text))
        return len(text.split())

    def keyword_analysis(self) -> Dict[str, Any]:
        if not self.keyword:
            return {}
        kw = self.keyword
        body = self.body_text().lower()
        wc = self.word_count()
        body_count = len(re.findall(re.escape(kw), body))
        density = (body_count / wc * 100) if wc > 0 else 0

        h2_with = [h for h in self.h2s if kw in h.lower()]
        h3_with = [h for h in self.h3s if kw in h.lower()]

        return {
            "in_title": kw in self.title.lower(),
            "in_h1": any(kw in h.lower() for h in self.h1s),
            "in_meta_description": kw in self.meta_description.lower(),
            "h2_with_keyword": len(h2_with),
            "h2_total": len(self.h2s),
            "h3_with_keyword": len(h3_with),
            "h3_total": len(self.h3s),
            "body_occurrences": body_count,
            "density_percent": round(density, 2),
        }

    def detect_features(self) -> Dict[str, Any]:
        has_demo = self.has_form and (self.has_input or self.has_textarea)
        has_gallery = self.image_count >= 6

        # Estimate FAQ question count
        faq_questions = 0
        if self.faq_signals >= 2 or self.has_faq_schema:
            for h in self.h3s:
                if "?" in h or h.endswith("？"):
                    faq_questions += 1
            for h in self.h2s:
                if ("?" in h or h.endswith("？")) and not any(
                    re.search(p, h.lower()) for p in self._FAQ_PATTERNS
                ):
                    faq_questions += 1
            if faq_questions == 0:
                faq_questions = max(3, self.faq_signals)

        return {
            "has_interactive_demo": has_demo,
            "has_gallery": has_gallery,
            "has_comparison_table": self.has_table and self.table_count >= 1,
            "has_video": self.video_count > 0,
            "has_faq": self.faq_signals >= 2 or self.has_faq_schema,
            "estimated_faq_count": faq_questions,
            "has_faq_schema": self.has_faq_schema,
            "has_howto_schema": self.has_howto_schema,
            "schema_types": list(set(self.schema_types)),
            "image_count": self.image_count,
            "video_count": self.video_count,
            "table_count": self.table_count,
            "internal_link_count": len(self.internal_links),
            "external_link_count": len(self.external_links),
        }


# ---------------------------------------------------------------------------
# Fetch & Analyse
# ---------------------------------------------------------------------------

def fetch_page(url: str) -> tuple:
    """Fetch HTML content from a URL.

    Returns:
        (html_string, final_url) on success
        (None, url) on failure
    """
    try:
        req = Request(url, headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
        })
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        with urlopen(req, timeout=REQUEST_TIMEOUT, context=ctx) as resp:
            final_url = resp.url if hasattr(resp, "url") and resp.url else url

            # Validate content type
            content_type = resp.headers.get("Content-Type", "")
            if content_type and not any(
                ct in content_type.lower()
                for ct in ("text/html", "application/xhtml", "text/xml")
            ):
                print(f"  ⚠ Non-HTML response ({content_type}): {url}", file=sys.stderr)
                return None, url

            if final_url != url:
                print(f"  → Redirected to: {final_url}", file=sys.stderr)

            charset = resp.headers.get_content_charset() or "utf-8"
            return resp.read().decode(charset, errors="replace"), final_url
    except (HTTPError, URLError, TimeoutError, OSError, IncompleteRead) as exc:
        print(f"  ⚠ Fetch failed {url}: {exc}", file=sys.stderr)
        return None, url


def analyze_page(url: str, html: str, keyword: str, locale: str = "en") -> Dict[str, Any]:
    """Parse a single page and return structured analysis."""
    domain = urlparse(url).netloc
    parser = PageStructureParser(keyword=keyword, domain=domain)
    try:
        parser.feed(html)
    except Exception as exc:
        print(f"  ⚠ Parse error {url}: {exc}", file=sys.stderr)

    return {
        "url": url,
        "domain": domain,
        "title": parser.title,
        "meta_description": parser.meta_description,
        "word_count": parser.word_count(locale),
        "heading_structure": {
            "h1": parser.h1s,
            "h2": parser.h2s,
            "h3": parser.h3s,
            "h1_count": len(parser.h1s),
            "h2_count": len(parser.h2s),
            "h3_count": len(parser.h3s),
        },
        "keyword_analysis": parser.keyword_analysis(),
        "features": parser.detect_features(),
    }


def _failed_entry(url: str) -> Dict[str, Any]:
    return {
        "url": url,
        "domain": urlparse(url).netloc,
        "error": "Failed to fetch",
        "word_count": 0,
        "heading_structure": {
            "h1": [], "h2": [], "h3": [],
            "h1_count": 0, "h2_count": 0, "h3_count": 0,
        },
        "keyword_analysis": {},
        "features": {},
    }


# ---------------------------------------------------------------------------
# Common Section Detection
# ---------------------------------------------------------------------------

_SECTION_PATTERNS: List[Dict[str, str]] = [
    {"re": r"what\s+is|introduction|overview|about", "type": "introduction", "label": "What is / Introduction"},
    {"re": r"how\s+(it|to)\s+work|steps?|process|guide|tutorial", "type": "how_it_works", "label": "How it Works / Steps"},
    {"re": r"feature|capabilit|function|tool", "type": "features", "label": "Features / Capabilities"},
    {"re": r"benefit|advantage|why\s+(use|choose)|reason", "type": "benefits", "label": "Benefits / Why Choose"},
    {"re": r"use\s+case|application|example|scenario", "type": "use_cases", "label": "Use Cases"},
    {"re": r"pric|plan|cost|free\s+tier", "type": "pricing", "label": "Pricing"},
    {"re": r"faq|frequently|common\s+question|q\s*&\s*a", "type": "faq", "label": "FAQ"},
    {"re": r"compar|vs\.?|versus|alternative|differ", "type": "comparison", "label": "Comparison / Alternatives"},
    {"re": r"testimon|review|customer|feedback|rating|user\s+stor", "type": "testimonials", "label": "Testimonials / Reviews"},
    {"re": r"gallery|showcase|portfolio|sample|demo|example", "type": "gallery", "label": "Gallery / Showcase"},
    {"re": r"get\s+start|try\s+(it|now|free)|sign\s+up|create|begin|start\s+creat", "type": "cta", "label": "CTA / Get Started"},
    {"re": r"tip|best\s+practice|advice|pro\s+tip", "type": "tips", "label": "Tips / Best Practices"},
    {"re": r"type|style|categor|kind|mode", "type": "types", "label": "Types / Styles / Categories"},
    {"re": r"api|integrat|developer|sdk", "type": "api", "label": "API / Integration"},
    {"re": r"updat|changelog|what.s\s+new|release", "type": "updates", "label": "Updates / What's New"},
]


# Stop words for keyword extraction (English)
_STOP_WORDS = frozenset({
    "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "shall", "can", "need", "ought", "used",
    "to", "of", "in", "for", "on", "with", "at", "by", "from", "up",
    "about", "into", "through", "during", "before", "after", "above",
    "below", "between", "out", "off", "over", "under", "again", "then",
    "once", "here", "there", "when", "where", "why", "how", "all",
    "each", "every", "both", "few", "more", "most", "other", "some",
    "such", "no", "nor", "not", "only", "own", "same", "so", "than",
    "too", "very", "just", "because", "as", "until", "while", "it",
    "its", "this", "that", "these", "those", "i", "me", "my", "we",
    "our", "you", "your", "he", "him", "his", "she", "her", "they",
    "them", "what", "which", "who", "whom", "and", "but", "if", "or",
    "see", "also", "references", "contents", "new", "get", "make",
})

# Common keyword modifiers in SEO headings
_KEYWORD_MODIFIERS = frozenset({
    "free", "best", "top", "online", "easy", "fast", "simple",
    "professional", "advanced", "powerful", "custom", "popular",
    "cheap", "affordable", "premium", "unlimited", "instant",
    "automatic", "smart", "creative", "realistic", "quality",
    "high", "low", "no", "without", "open", "source",
})


def _extract_h2_keyword_patterns(all_h2s: List[str]) -> Dict[str, Any]:
    """从竞品 H2 标题中提取高频关键词、短语模式和修饰词。

    用于理解竞品的关键词布局策略：他们在 H2 中实际使用了哪些词。
    """
    words: List[str] = []
    bigrams: List[str] = []

    for h2 in all_h2s:
        tokens = re.findall(r"[a-zA-Z]+", h2.lower())
        tokens = [t for t in tokens if t not in _STOP_WORDS and len(t) > 2]
        words.extend(tokens)
        for i in range(len(tokens) - 1):
            bigrams.append(f"{tokens[i]} {tokens[i + 1]}")

    # Count frequencies
    word_freq: Dict[str, int] = {}
    for w in words:
        word_freq[w] = word_freq.get(w, 0) + 1

    bigram_freq: Dict[str, int] = {}
    for b in bigrams:
        bigram_freq[b] = bigram_freq.get(b, 0) + 1

    # Top words and bigrams (sorted by frequency)
    top_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:20]
    top_bigrams = sorted(bigram_freq.items(), key=lambda x: x[1], reverse=True)[:10]

    # Modifiers found in headings
    found_modifiers = sorted(
        [(w, c) for w, c in word_freq.items() if w in _KEYWORD_MODIFIERS],
        key=lambda x: x[1], reverse=True,
    )

    return {
        "top_words": top_words,
        "top_bigrams": top_bigrams,
        "common_modifiers": found_modifiers,
        "total_h2_analyzed": len(all_h2s),
    }


def _detect_common_sections(all_h2s: List[str]) -> List[Dict[str, Any]]:
    """统计所有竞品 H2 中出现的章节类型及频次。"""
    detected: Dict[str, Dict[str, Any]] = {}
    for h2 in all_h2s:
        h2_lower = h2.lower()
        for sp in _SECTION_PATTERNS:
            if re.search(sp["re"], h2_lower):
                key = sp["type"]
                if key not in detected:
                    detected[key] = {"type": key, "label": sp["label"], "count": 0, "examples": []}
                detected[key]["count"] += 1
                if len(detected[key]["examples"]) < 3:
                    detected[key]["examples"].append(h2)
    return sorted(detected.values(), key=lambda x: x["count"], reverse=True)


# ---------------------------------------------------------------------------
# Aggregate Summary
# ---------------------------------------------------------------------------

def generate_summary(results: List[Dict[str, Any]], keyword: str) -> Dict[str, Any]:
    """从全部竞品分析中生成聚合摘要。"""
    ok = [r for r in results if r.get("word_count", 0) > 0]
    if not ok:
        return {"error": "No pages successfully analyzed"}
    n = len(ok)

    # Word count
    wcs = sorted(r["word_count"] for r in ok)
    avg_wc = sum(wcs) // n

    # Heading counts
    h2cs = [r["heading_structure"]["h2_count"] for r in ok]
    h3cs = [r["heading_structure"]["h3_count"] for r in ok]

    # Feature prevalence
    feat_keys = [
        ("interactive_demo", "has_interactive_demo"),
        ("gallery", "has_gallery"),
        ("comparison_table", "has_comparison_table"),
        ("video", "has_video"),
        ("faq", "has_faq"),
        ("faq_schema", "has_faq_schema"),
        ("howto_schema", "has_howto_schema"),
    ]
    prevalence = {k: sum(1 for r in ok if r.get("features", {}).get(fk, False)) for k, fk in feat_keys}
    percent = {k: round(v / n * 100) for k, v in prevalence.items()}

    # FAQ
    faq_counts = [r["features"]["estimated_faq_count"] for r in ok if r.get("features", {}).get("has_faq")]
    avg_faq = sum(faq_counts) // len(faq_counts) if faq_counts else 0

    # Keyword placement
    kw_title = sum(1 for r in ok if r.get("keyword_analysis", {}).get("in_title"))
    kw_h1 = sum(1 for r in ok if r.get("keyword_analysis", {}).get("in_h1"))
    kw_meta = sum(1 for r in ok if r.get("keyword_analysis", {}).get("in_meta_description"))
    avg_density = sum(r.get("keyword_analysis", {}).get("density_percent", 0) for r in ok) / n

    # Common sections & H2 keyword patterns
    all_h2s = []
    for r in ok:
        all_h2s.extend(r["heading_structure"]["h2"])
    common_sections = _detect_common_sections(all_h2s)
    h2_keyword_patterns = _extract_h2_keyword_patterns(all_h2s)

    # Schema types across competitors
    all_schemas: Dict[str, int] = {}
    for r in ok:
        for st in r.get("features", {}).get("schema_types", []):
            all_schemas[st] = all_schemas.get(st, 0) + 1
    top_schemas = sorted(all_schemas.items(), key=lambda x: x[1], reverse=True)

    return {
        "total_analyzed": n,
        "total_attempted": len(results),
        "word_count": {
            "average": avg_wc,
            "min": wcs[0],
            "max": wcs[-1],
            "median": wcs[n // 2],
            "recommended_min": max(800, int(avg_wc * 0.8)),
            "recommended_target": max(1000, avg_wc),
        },
        "heading_stats": {
            "avg_h2_count": sum(h2cs) // n,
            "avg_h3_count": sum(h3cs) // n,
            "max_h2_count": max(h2cs),
            "max_h3_count": max(h3cs),
        },
        "feature_prevalence": prevalence,
        "feature_percent": percent,
        "faq_stats": {
            "pages_with_faq": len(faq_counts),
            "avg_questions": avg_faq,
            "recommended_count": max(6, avg_faq),
        },
        "keyword_placement": {
            "in_title_percent": round(kw_title / n * 100),
            "in_h1_percent": round(kw_h1 / n * 100),
            "in_meta_percent": round(kw_meta / n * 100),
            "avg_density_percent": round(avg_density, 2),
        },
        "common_sections": common_sections,
        "h2_keyword_patterns": h2_keyword_patterns,
        "schema_types": top_schemas[:10],
    }


# ---------------------------------------------------------------------------
# Block Mapping Recommendation
# ---------------------------------------------------------------------------

# Maps detected section types → project block names
_BLOCK_MAP: Dict[str, Dict[str, str]] = {
    "introduction": {"block": "features-list", "note": "Image + text intro"},
    "how_it_works": {"block": "features-step", "note": "Step-by-step process"},
    "features": {"block": "features", "note": "Feature grid with icons"},
    "benefits": {"block": "features-accordion", "note": "Expandable benefits"},
    "use_cases": {"block": "features-media", "note": "Cases with images/media"},
    "pricing": {"block": "pricing", "note": "Price plans table"},
    "faq": {"block": "faq", "note": "Collapsible Q&A"},
    "comparison": {"block": "features-accordion", "note": "Accordion for vs/compare"},
    "testimonials": {"block": "testimonials", "note": "User reviews/quotes"},
    "gallery": {"block": "showcases-flow", "note": "Gallery with filtering"},
    "cta": {"block": "cta", "note": "Call to action"},
    "tips": {"block": "features-list", "note": "Tips as list items"},
    "types": {"block": "features-flow", "note": "Category grid/flow"},
    "api": {"block": "features", "note": "API feature grid"},
    "updates": {"block": "features-list", "note": "What's new list"},
}


def recommend_page_structure(summary: Dict[str, Any], keyword: str) -> Dict[str, Any]:
    """基于竞品分析推荐页面结构（映射到项目真实 block）。"""
    sections = summary.get("common_sections", [])
    n = summary.get("total_analyzed", 1)

    recommended: List[Dict[str, Any]] = []

    # Always start with hero
    recommended.append({
        "section_key": "hero",
        "block": "hero-image",
        "reason": "All pages have hero section",
        "prevalence": "100%",
    })

    # Add sections by prevalence (≥30% of competitors have it)
    for sec in sections:
        pct = round(sec["count"] / n * 100)
        if pct < 20:
            continue
        mapping = _BLOCK_MAP.get(sec["type"])
        if not mapping:
            continue
        recommended.append({
            "section_key": sec["type"],
            "block": mapping["block"],
            "note": mapping["note"],
            "reason": f'{pct}% of competitors have "{sec["label"]}"',
            "prevalence": f"{pct}%",
            "h2_examples": sec.get("examples", []),
        })

    # Always end with CTA if not already present
    cta_present = any(r["section_key"] == "cta" for r in recommended)
    if not cta_present:
        recommended.append({
            "section_key": "cta",
            "block": "cta",
            "reason": "Standard conversion section",
            "prevalence": "recommended",
        })

    return {
        "show_sections": [r["section_key"] for r in recommended],
        "sections": recommended,
        "target_word_count": summary.get("word_count", {}).get("recommended_target", 1200),
        "target_faq_count": summary.get("faq_stats", {}).get("recommended_count", 8),
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description="竞品页面分析器 — 为 Content Brief 采集 SERP 数据"
    )
    parser.add_argument("--keyword", required=True, help="目标关键词")
    parser.add_argument("--urls", required=True, help="逗号分隔的竞品 URL（SERP Top 10）")
    parser.add_argument("--locale", default="en", help="目标语言 (默认: en)")
    parser.add_argument("--output", default="", help="输出文件路径 (默认: stdout)")
    parser.add_argument("--delay", type=float, default=DEFAULT_DELAY, help="请求间隔秒数 (默认: 1.0)")
    args = parser.parse_args()

    urls = [u.strip() for u in args.urls.split(",") if u.strip()]
    if not urls:
        print("Error: No URLs provided", file=sys.stderr)
        return 1

    print(f"\n{'=' * 60}", file=sys.stderr)
    print(f"竞品分析: \"{args.keyword}\"", file=sys.stderr)
    print(f"目标语言: {args.locale} | 竞品数: {len(urls)}", file=sys.stderr)
    print(f"{'=' * 60}", file=sys.stderr)

    results: List[Dict[str, Any]] = []
    for i, url in enumerate(urls, 1):
        print(f"\n[{i}/{len(urls)}] {url}", file=sys.stderr)
        html, final_url = fetch_page(url)
        if html:
            analysis = analyze_page(final_url, html, args.keyword, args.locale)
            if final_url != url:
                analysis["original_url"] = url
            results.append(analysis)
            wc = analysis["word_count"]
            h2c = analysis["heading_structure"]["h2_count"]
            density = analysis.get("keyword_analysis", {}).get("density_percent", 0)
            print(f"  ✓ {wc} words | {h2c} H2s | density {density}%", file=sys.stderr)
        else:
            results.append(_failed_entry(url))

        if i < len(urls):
            time.sleep(args.delay)

    # Aggregate
    summary = generate_summary(results, args.keyword)
    page_structure = recommend_page_structure(summary, args.keyword)

    report = {
        "keyword": args.keyword,
        "locale": args.locale,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "summary": summary,
        "recommended_structure": page_structure,
        "competitors": results,
    }

    output_json = json.dumps(report, ensure_ascii=False, indent=2)

    if args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        Path(args.output).write_text(output_json + "\n", encoding="utf-8")
        print(f"\n报告已保存: {args.output}", file=sys.stderr)
    else:
        print(output_json)

    # Print quick summary to stderr
    sa = summary
    print(f"\n{'=' * 60}", file=sys.stderr)
    print(f"分析完成: {sa.get('total_analyzed', 0)}/{sa.get('total_attempted', 0)} 页面", file=sys.stderr)
    print(f"平均字数: {sa.get('word_count', {}).get('average', '?')}", file=sys.stderr)
    print(f"建议字数: {sa.get('word_count', {}).get('recommended_target', '?')}", file=sys.stderr)
    print(f"平均 H2: {sa.get('heading_stats', {}).get('avg_h2_count', '?')}", file=sys.stderr)
    print(f"关键词密度: {sa.get('keyword_placement', {}).get('avg_density_percent', '?')}%", file=sys.stderr)

    common = sa.get("common_sections", [])[:5]
    if common:
        print(f"\n常见章节:", file=sys.stderr)
        for sec in common:
            print(f"  - {sec['label']} ({sec['count']}次)", file=sys.stderr)

    print(f"{'=' * 60}\n", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
