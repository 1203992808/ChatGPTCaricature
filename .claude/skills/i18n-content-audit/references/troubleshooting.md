# Troubleshooting

## Issue: --fix creates unexpected changes
**Solution:** Run without `--fix` first to review recommendations, then apply selectively.

## Issue: Build fails after --fix
**Solution:** Check JSON syntax, verify placeholders preserved, compare with English structure.

## Issue: Keywords not improving
**Solution:** Re-run `/keyword-research` manually with more alternatives.

## Issue: Content still has MT feel
**Solution:** Use `/copywriting` skill manually for additional refinement.

## Issue: Sitemap not updated
**Solution:** Manually update `src/config/sitemap-config.ts` with today's date.

## Issue: Quality scores not improving
**Solution:**
1. Check if recommendations were actually implemented
2. Verify keyword data file has high-volume expressions
3. Re-run `/content-optimizer` with specific focus areas
4. Use `/copy-editing` for Seven Sweeps improvements

## Issue: JSON structure broken after fix
**Solution:**
1. Compare with English version structure
2. Verify all placeholders maintained
3. Check for missing commas or brackets
4. Use JSON validator to identify syntax errors
