# Usage Examples

## Example 1: Report-Only Mode (Default)

**Command:**
```bash
/i18n-content-audit it pages/pricing
```

**Output:**
```
🔍 Starting Content Audit...
  ├─ Locale: Italian (it)
  ├─ Page: pages/pricing
  ├─ Mode: Report-Only (no --fix flag)
  └─ Reading content files...

📊 Phase 1: Analyze
  ├─ Extracted 15 keywords from current content
  ├─ Researching keyword performance...
  │   ├─ "prezzi" - 12K/mo ✅ (optimal)
  │   ├─ "abbonamento" - 8K/mo ⚠️ (better: "piano di abbonamento" 15K/mo)
  │   └─ ... (13 more keywords analyzed)
  └─ ✅ Analysis complete

📈 Phase 2: Evaluate
  ├─ Title & Description: 45/70 ⚠️
  ├─ E-E-A-T Score: 14/27 🔴
  ├─ GEO Score: 22/40 🔴
  ├─ Seven Sweeps: 4/7 passed ⚠️
  └─ Content Exclusions: ✅ Clean

📝 Phase 3: Report
  ├─ Generating comprehensive audit report...
  └─ ✅ Report generated

💡 Phase 4: Recommend
  ├─ Generated 8 specific optimization recommendations
  ├─ Created rewrite suggestions for title & description
  └─ Estimated impact: +25 points overall

📋 Audit Complete! (Report-Only Mode)

Overall Grade: C (Needs Improvement)

Top 3 Priority Actions:
1. 🔴 Replace title keyword "prezzi" with "piani e prezzi" (+3K/mo volume)
2. 🔴 Add case study to improve E-E-A-T Experience score
3. 🟡 Add quotable statistics for GEO optimization

💡 To apply fixes automatically, run:
   /i18n-content-audit it pages/pricing --fix
```

---

## Example 2: Report + Fix Mode

**Command:**
```bash
/i18n-content-audit it pages/pricing --fix
```

**Output:**
```
🔍 Starting Content Audit...
  ├─ Locale: Italian (it)
  ├─ Page: pages/pricing
  ├─ Mode: Report + Fix (--fix flag detected)
  └─ Reading content files...

📊 Phase 1: Analyze
  ├─ Extracted 15 keywords from current content
  ├─ Researching keyword performance...
  │   ├─ "prezzi" - 12K/mo ✅ (optimal)
  │   ├─ "abbonamento" - 8K/mo ⚠️ (better: "piano di abbonamento" 15K/mo)
  │   └─ ... (13 more keywords analyzed)
  └─ ✅ Analysis complete

📈 Phase 2: Evaluate
  ├─ Title & Description: 45/70 ⚠️
  ├─ E-E-A-T Score: 14/27 🔴
  ├─ GEO Score: 22/40 🔴
  ├─ Seven Sweeps: 4/7 passed ⚠️
  └─ Content Exclusions: ✅ Clean

📝 Phase 3: Report
  ├─ Generating comprehensive audit report...
  └─ ✅ Report generated

💡 Phase 4: Recommend
  ├─ Generated 8 specific optimization recommendations
  ├─ Created rewrite suggestions for title & description
  └─ Estimated impact: +25 points overall

🔧 Phase 5: Fix (Applying Changes...)
  ├─ Keyword Optimization
  │   ├─ Replacing "abbonamento" → "piano di abbonamento"
  │   ├─ Replacing "costo" → "prezzo"
  │   └─ ✅ 5 keywords optimized
  │
  ├─ Title & Description Rewrite
  │   ├─ Title: "Prezzi e Piani | Generatore AI - MakeMyPic" (52 chars) ✅
  │   ├─ Description: "Scopri i piani di abbonamento MakeMyPic..." (158 chars) ✅
  │   └─ ✅ Metadata optimized
  │
  ├─ Content Optimization
  │   ├─ Added case study section (+3 E-E-A-T points)
  │   ├─ Added statistics with sources (+2 GEO points)
  │   ├─ Improved FAQ format (+1 GEO point)
  │   └─ ✅ Content enhanced
  │
  ├─ Copy Quality Refinement
  │   ├─ Seven Sweeps: 7/7 passed ✅
  │   └─ ✅ Copy polished
  │
  ├─ Content Exclusion Cleanup
  │   └─ ✅ No forbidden content found
  │
  ├─ Writing Changes
  │   ├─ Updated: src/config/locale/messages/it/pages/pricing.json
  │   └─ ✅ File saved
  │
  ├─ Sitemap Update
  │   ├─ Updated: src/config/sitemap-config.ts
  │   ├─ Added: localeLastmod.it = '2026-01-20'
  │   └─ ✅ Sitemap updated
  │
  └─ Build Verification
      ├─ Running: pnpm build
      └─ ✅ Build passed

🎉 Audit & Fix Complete!

## Before → After

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| SEO Score | 58/100 | 83/100 | +25 |
| E-E-A-T | 14/27 | 19/27 | +5 |
| GEO Score | 22/40 | 31/40 | +9 |
| Seven Sweeps | 4/7 | 7/7 | +3 |
| Overall Grade | C | B | ⬆️ |

## Files Modified
- ✅ src/config/locale/messages/it/pages/pricing.json
- ✅ src/config/sitemap-config.ts

## Next Steps
1. Visual test: Visit http://localhost:3000/it/pricing
2. Verify changes look correct
3. Optional: Re-run audit to confirm improvements
```
