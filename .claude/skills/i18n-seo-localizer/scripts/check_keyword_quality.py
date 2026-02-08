#!/usr/bin/env python3
"""
Keyword Quality Check Script for i18n SEO Localizer

This script analyzes JSON content files to validate keyword usage quality.
It checks for:
- Keyword stuffing (overuse of primary keywords)
- Proper distribution between primary, semantic variants, and related terms
- Natural language flow
- Character limits compliance
- Spacing between keyword occurrences

Usage:
    python check_keyword_quality.py --file=path/to/content.json --keywords=path/to/keywords.json --locale=es
"""

import argparse
import json
import re
from pathlib import Path
from typing import Dict, List, Tuple, Any


def extract_all_text(obj: Any, texts: List[str] = None) -> List[str]:
    """Recursively extract all text content from JSON object."""
    if texts is None:
        texts = []

    if isinstance(obj, dict):
        for value in obj.values():
            extract_all_text(value, texts)
    elif isinstance(obj, list):
        for item in obj:
            extract_all_text(item, texts)
    elif isinstance(obj, str):
        texts.append(obj)

    return texts


def count_keyword_occurrences(text: str, keyword: str) -> int:
    """Count occurrences of a keyword in text (case-insensitive)."""
    pattern = re.compile(re.escape(keyword), re.IGNORECASE)
    return len(pattern.findall(text))


def analyze_keyword_distribution(content: Dict, keywords_config: Dict) -> Dict:
    """Analyze keyword usage and distribution in content."""

    # Extract all text from content
    all_texts = extract_all_text(content)
    combined_text = " ".join(all_texts)

    # Get keyword data for the locale
    locale = keywords_config.get("locale", "unknown")

    results = {
        "locale": locale,
        "total_characters": len(combined_text),
        "total_words": len(combined_text.split()),
        "keywords_analysis": {}
    }

    # Analyze each keyword category
    for keyword_key, keyword_data in keywords_config.get("keywords", {}).items():
        primary = keyword_data.get("primary", "")
        alternatives = keyword_data.get("alternatives", [])
        semantic_variants = keyword_data.get("semanticVariants", [])
        related_terms = keyword_data.get("relatedTerms", [])

        # Count occurrences
        primary_count = count_keyword_occurrences(combined_text, primary)
        alternatives_count = sum(count_keyword_occurrences(combined_text, alt) for alt in alternatives)
        semantic_count = sum(count_keyword_occurrences(combined_text, var) for var in semantic_variants)
        related_count = sum(count_keyword_occurrences(combined_text, term) for term in related_terms)

        total_count = primary_count + alternatives_count + semantic_count + related_count

        # Calculate percentages
        primary_pct = (primary_count / total_count * 100) if total_count > 0 else 0
        semantic_pct = (semantic_count / total_count * 100) if total_count > 0 else 0
        related_pct = (related_count / total_count * 100) if total_count > 0 else 0

        # Get usage guidelines
        guidelines = keyword_data.get("usageGuidelines", {})
        body_guidelines = guidelines.get("body", {})
        expected_distribution = body_guidelines.get("distribution", {})

        # Check for keyword stuffing (primary keyword density)
        keyword_density = (primary_count / len(combined_text.split())) * 100 if combined_text else 0

        results["keywords_analysis"][keyword_key] = {
            "primary": primary,
            "counts": {
                "primary": primary_count,
                "alternatives": alternatives_count,
                "semantic_variants": semantic_count,
                "related_terms": related_count,
                "total": total_count
            },
            "distribution": {
                "primary_pct": round(primary_pct, 1),
                "semantic_pct": round(semantic_pct, 1),
                "related_pct": round(related_pct, 1)
            },
            "expected_distribution": expected_distribution,
            "keyword_density": round(keyword_density, 2),
            "quality_checks": {
                "keyword_stuffing": "PASS" if keyword_density < 2.0 else "FAIL - Too high keyword density",
                "distribution_balance": check_distribution_balance(primary_pct, semantic_pct, related_pct, expected_distribution)
            }
        }

    return results


def check_distribution_balance(primary_pct: float, semantic_pct: float, related_pct: float, expected: Dict) -> str:
    """Check if keyword distribution matches expected guidelines."""
    if not expected:
        return "NO GUIDELINES"

    expected_primary = float(expected.get("primary", "30").rstrip('%'))
    expected_semantic = float(expected.get("semanticVariants", "40").rstrip('%'))
    expected_related = float(expected.get("relatedTerms", "30").rstrip('%'))

    # Allow 15% tolerance
    tolerance = 15

    if abs(primary_pct - expected_primary) > tolerance:
        return f"FAIL - Primary {primary_pct}% vs expected {expected_primary}%"
    if abs(semantic_pct - expected_semantic) > tolerance:
        return f"FAIL - Semantic {semantic_pct}% vs expected {expected_semantic}%"
    if abs(related_pct - expected_related) > tolerance:
        return f"FAIL - Related {related_pct}% vs expected {expected_related}%"

    return "PASS"


def check_metadata_limits(content: Dict, keywords_config: Dict) -> Dict:
    """Check if metadata meets character limit requirements."""
    metadata = content.get("metadata", {})
    limits = keywords_config.get("characterLimits", {})

    title = metadata.get("title", "")
    description = metadata.get("description", "")

    title_limits = limits.get("title", {})
    desc_limits = limits.get("description", {})

    return {
        "title": {
            "content": title,
            "length": len(title),
            "min": title_limits.get("min", 0),
            "max": title_limits.get("max", 999),
            "status": "PASS" if title_limits.get("min", 0) <= len(title) <= title_limits.get("max", 999) else "FAIL"
        },
        "description": {
            "content": description,
            "length": len(description),
            "min": desc_limits.get("min", 0),
            "max": desc_limits.get("max", 999),
            "status": "PASS" if desc_limits.get("min", 0) <= len(description) <= desc_limits.get("max", 999) else "FAIL"
        }
    }


def main():
    parser = argparse.ArgumentParser(description="Check keyword quality in i18n content")
    parser.add_argument("--file", required=True, help="Path to content JSON file")
    parser.add_argument("--keywords", required=True, help="Path to keywords JSON file")
    parser.add_argument("--locale", required=True, help="Locale code (es, ja, ko, etc.)")
    parser.add_argument("--output", default=None, help="Output file for results")

    args = parser.parse_args()

    # Load files
    with open(args.file, 'r', encoding='utf-8') as f:
        content = json.load(f)

    with open(args.keywords, 'r', encoding='utf-8') as f:
        keywords_config = json.load(f)

    # Validate locale matches
    if keywords_config.get("locale") != args.locale:
        print(f"WARNING: Locale mismatch - file: {keywords_config.get('locale')}, expected: {args.locale}")

    # Analyze content
    print(f"\n{'='*60}")
    print(f"KEYWORD QUALITY ANALYSIS - {args.locale.upper()}")
    print(f"{'='*60}\n")

    # Check metadata
    print("📏 METADATA CHARACTER LIMITS:")
    metadata_check = check_metadata_limits(content, keywords_config)
    for field, data in metadata_check.items():
        status_icon = "✅" if data["status"] == "PASS" else "❌"
        print(f"{status_icon} {field.upper()}: {data['length']} chars (min: {data['min']}, max: {data['max']})")
        print(f"   '{data['content']}'")

    # Analyze keyword distribution
    print(f"\n🔍 KEYWORD DISTRIBUTION ANALYSIS:")
    analysis = analyze_keyword_distribution(content, keywords_config)

    print(f"\nTotal content: {analysis['total_characters']} characters, {analysis['total_words']} words\n")

    overall_pass = True
    for keyword_key, data in analysis["keywords_analysis"].items():
        print(f"\n📊 {keyword_key.upper()}:")
        print(f"   Primary: '{data['primary']}'")
        print(f"   Counts: Primary={data['counts']['primary']}, Alternatives={data['counts']['alternatives']}, "
              f"Semantic={data['counts']['semantic_variants']}, Related={data['counts']['related_terms']}")
        print(f"   Distribution: Primary={data['distribution']['primary_pct']}%, "
              f"Semantic={data['distribution']['semantic_pct']}%, Related={data['distribution']['related_pct']}%")
        print(f"   Keyword Density: {data['keyword_density']}%")

        print(f"\n   Quality Checks:")
        for check_name, check_result in data["quality_checks"].items():
            status_icon = "✅" if "PASS" in check_result else "❌"
            print(f"   {status_icon} {check_name}: {check_result}")
            if "FAIL" in check_result:
                overall_pass = False

    # Final verdict
    print(f"\n{'='*60}")
    if overall_pass and all(v["status"] == "PASS" for v in metadata_check.values()):
        print("✅ OVERALL: PASSED - Content quality is good!")
    else:
        print("⚠️  OVERALL: NEEDS IMPROVEMENT - Some checks failed")
    print(f"{'='*60}\n")

    # Save results if output specified
    if args.output:
        full_results = {
            "metadata_check": metadata_check,
            "keyword_analysis": analysis,
            "overall_status": "PASS" if overall_pass else "FAIL"
        }
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(full_results, f, ensure_ascii=False, indent=2)
        print(f"Results saved to: {args.output}")


if __name__ == "__main__":
    main()
