#!/usr/bin/env python3
"""
Keyword Validation Script for i18n SEO Localizer

This script validates keywords using Google Trends via Playwright browser automation.
It compares multiple keyword expressions to find the highest search volume.

Usage:
    python validate_keyword.py --lang=ja --terms="AI イラスト生成,AI画像生成,画像生成AI"
    python validate_keyword.py --lang=ko --terms="AI 이미지 생성기,AI 그림,그림 그려주는 AI"

Requirements:
    - Playwright MCP or Claude's Playwright tools
    - This script provides the workflow; actual browser automation is done by Claude

NOTE: This script is meant to be used as a reference/guide for Claude to perform
      keyword validation using Playwright browser automation tools.
"""

import argparse
import json
import urllib.parse
from datetime import datetime
from pathlib import Path

# Country codes for Google Trends
COUNTRY_CODES = {
    "ja": "JP",  # Japan
    "ko": "KR",  # South Korea
    "de": "DE",  # Germany
    "es": "ES",  # Spain (use MX for Mexico)
    "pt-BR": "BR",  # Brazil
    "fr": "FR",  # France
    "zh": "CN",  # China (limited availability)
    "en": "US",  # United States
}

def generate_google_trends_url(terms: list, country_code: str) -> str:
    """
    Generate Google Trends comparison URL for given terms.

    Args:
        terms: List of search terms to compare (max 5)
        country_code: Two-letter country code (JP, KR, etc.)

    Returns:
        Google Trends URL for comparison
    """
    # Limit to 5 terms (Google Trends max)
    terms = terms[:5]

    # URL encode each term
    encoded_terms = [urllib.parse.quote(term) for term in terms]

    # Build the comparison query
    query = ",".join(encoded_terms)

    url = f"https://trends.google.com/trends/explore?geo={country_code}&q={query}"

    return url


def get_validation_workflow(lang: str, terms: list) -> dict:
    """
    Generate the workflow for keyword validation using Playwright.

    This returns instructions for Claude to execute via Playwright MCP.
    """
    country_code = COUNTRY_CODES.get(lang, "US")
    url = generate_google_trends_url(terms, country_code)

    workflow = {
        "step1_navigate": {
            "action": "playwright_navigate",
            "url": url,
            "description": f"Navigate to Google Trends to compare terms in {country_code} region"
        },
        "step2_wait": {
            "action": "wait",
            "duration": "3-5 seconds",
            "description": "Wait for trends data to load"
        },
        "step3_screenshot": {
            "action": "playwright_screenshot",
            "name": f"trends-{lang}-comparison",
            "description": "Capture the comparison chart"
        },
        "step4_extract": {
            "action": "playwright_get_visible_text or playwright_evaluate",
            "description": "Extract the relative interest values for each term",
            "selector_hints": [
                "Look for percentage or relative numbers",
                "Check the legend showing each term's relative interest",
                "Interest over time chart shows which term is higher"
            ]
        },
        "step5_document": {
            "action": "update_keyword_mapping",
            "description": "Update the keyword JSON with validation results"
        }
    }

    return {
        "language": lang,
        "country_code": country_code,
        "terms_to_compare": terms,
        "google_trends_url": url,
        "workflow": workflow
    }


def main():
    parser = argparse.ArgumentParser(description="Keyword Validation Helper")
    parser.add_argument("--lang", required=True, help="Language code (ja, ko, de, etc.)")
    parser.add_argument("--terms", required=True, help="Comma-separated terms to compare")
    parser.add_argument("--output", default=None, help="Output file path")

    args = parser.parse_args()

    # Parse terms
    terms = [t.strip() for t in args.terms.split(",")]

    # Generate workflow
    workflow = get_validation_workflow(args.lang, terms)

    # Output
    output = json.dumps(workflow, ensure_ascii=False, indent=2)
    print(output)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(output)
        print(f"\nWorkflow saved to: {args.output}")

    print("\n" + "="*60)
    print("INSTRUCTIONS FOR CLAUDE:")
    print("="*60)
    print(f"""
To validate these keywords, use Playwright MCP tools:

1. Navigate to Google Trends:
   mcp__playwright__playwright_navigate
   url: {workflow['google_trends_url']}

2. Wait for page load, then screenshot:
   mcp__playwright__playwright_screenshot
   name: trends-{args.lang}-comparison

3. Extract comparison data:
   mcp__playwright__playwright_get_visible_text
   OR
   mcp__playwright__playwright_evaluate
   script: document.querySelector('.fe-line-chart-content')?.innerText

4. Analyze which term has highest relative interest

5. Update keyword mapping file:
   data/keywords-{args.lang}.json
""")


if __name__ == "__main__":
    main()
