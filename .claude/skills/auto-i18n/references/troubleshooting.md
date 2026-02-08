# Troubleshooting

## Issue: Keywords not researched
**Solution:** NEVER skip keyword research. Use `/keyword-research` for every term.

## Issue: Title/Description too long
**Solution:** Use `/metadata-optimizer` to identify issues, then rewrite within limits.

## Issue: JSON structure mismatch
**Solution:** Compare with English file key-by-key. Ensure all keys present.

## Issue: Machine translation detected
**Solution:** Rewrite with `/copywriting` focusing on native expression.

## Issue: Build fails
**Solution:** Check JSON syntax, verify all message paths registered.

## Issue: H1 missing primary keyword
**Solution:** This is a FAIL condition. Regenerate H1 to include primary keyword.

## Issue: Keyword density too high (> 4%)
**Solution:**
1. Reduce keyword repetition in body text
2. Use more semantic variants and related terms
3. Expand content with non-keyword sections

## Issue: Keyword density too low (< 2%)
**Solution:**
1. Add keywords in H2s and body text naturally
2. Ensure Title and H1 contain keywords
3. Review FAQ for keyword opportunities

## Issue: Anti-stuffing check fails
**Solution:**
1. Check keyword spacing (≥ 50 chars CN / 200 chars EN)
2. Reduce same-paragraph keyword repetition
3. Eliminate "X的X" patterns
4. Use semantic variants instead of repeating primary
5. Run `python scripts/check_keyword_quality.py` to see specific issues
