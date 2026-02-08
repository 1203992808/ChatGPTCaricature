# Usage Examples

## Example Execution

**Command:**
```bash
/auto-i18n pages/pricing it
```

**Output:**
```
🔍 Phase 1: Research
  ├─ Reading English source: messages/en/pages/pricing.json
  ├─ Extracted 12 keywords for localization
  ├─ Researching Italian expressions via Google Trends...
  │   ├─ "pricing" → "prezzi" (validated: 12K/mo)
  │   ├─ "subscription" → "abbonamento" (validated: 8K/mo)
  │   └─ ... (10 more keywords)
  └─ ✅ Keyword research complete

📝 Phase 2: Generate
  ├─ Generating Italian content...
  ├─ Optimizing for GEO...
  ├─ Creating: messages/it/pages/pricing.json
  └─ ✅ Content generation complete

✅ Phase 3: Review
  ├─ Content quality check: PASS (E-E-A-T: 19/27)
  ├─ Copy editing (Seven Sweeps): PASS
  ├─ Title & Description audit:
  │   ├─ Title: "Prezzi e Piani | MakeMyPic" (32 chars) ✅
  │   └─ Description: "..." (156 chars) ✅
  ├─ JSON structure validation: PASS
  ├─ Updating sitemap-config.ts...
  │   └─ Added: localeLastmod.it = '2026-01-20'
  └─ ✅ Review complete

🎉 Internationalization complete!
   Created: src/config/locale/messages/it/pages/pricing.json
   Updated: src/config/sitemap-config.ts

📋 Next steps:
   1. Run: pnpm build
   2. Test: Visit /it/pricing
   3. Verify UI displays correctly
```

---

## More Examples

**Example 1: Homepage internationalization**
```bash
/auto-i18n pages/index ja
```

**Example 2: Generator page to Korean**
```bash
/auto-i18n pages/ai-image/generator ko
```

**Example 3: Pricing page to German**
```bash
/auto-i18n pages/pricing de
```
