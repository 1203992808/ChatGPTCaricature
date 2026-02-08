# Phase 5: Fix (应用修复) - Only with `--fix` Flag

> ⚠️ **This phase ONLY executes when `--fix` flag is provided.**
> Without the flag, the skill stops after Phase 4 (Report + Recommend).

## Step 5.1: Keyword Rewriting
**Use Skill:** `/keyword-research` + `/i18n-seo-localizer`

Based on keyword gap analysis from Phase 1:
1. Replace suboptimal keywords with validated high-volume expressions
2. Ensure keyword placement follows SEO best practices
3. Maintain natural language flow

## Step 5.2: Title & Description Optimization
**Use Skills:** `/ai-content-creator` + `/copywriting` + `/metadata-optimizer`

Rewrite title and description:
- Apply validated keywords (NOT direct translation)
- Ensure length within target limits
- Include CTA and value proposition (description)
- Maintain native expression quality

**Length Standards:**
| Language | Title | Description |
|----------|-------|-------------|
| English (en) | 50-60 chars | 150-160 chars |
| Chinese (zh/zh-TW) | 20-30 chars | 70-80 chars |
| Japanese (ja) | 25-35 chars | 70-100 chars |
| Korean (ko) | 25-35 chars | 70-100 chars |
| European (de/es/fr/it/pt) | 50-60 chars | 150-160 chars |

## Step 5.3: Content Optimization
**Use Skills:** `/ai-content-creator` + `/geo-content-optimizer`

Apply content improvements based on audit findings:
1. **E-E-A-T improvements:**
   - Add experience signals (case studies, examples)
   - Add authority signals (citations, credentials)
   - Add trust signals (update dates, sources)

2. **GEO improvements:**
   - Add clear definitions (40-60 words, standalone)
   - Add quotable statements with data
   - Improve Q&A format in FAQ sections
   - Add authority signals

3. **Seven Sweeps fixes:**
   - Clarify ambiguous statements
   - Substantiate claims with evidence
   - Replace vague words with specific details
   - Add emotional texture where appropriate
   - Address objections and reduce barriers

## Step 5.4: Copy Quality Refinement
**Use Skill:** `/copy-editing`

Final copy polish:
1. Seven Sweeps pass on all new content
2. Ensure consistent voice and tone
3. Verify natural expression (no MT feel)
4. Check clarity and readability

## Step 5.5: Content Exclusion Cleanup

**Remove if present:**
```bash
# Check and remove forbidden content
- metadata.keywords (deprecated - DELETE)
- footer.friendLinks (DELETE)
- sections.backlinks (DELETE)
```

## Step 5.6: Apply Changes to JSON File
**File:** `src/config/locale/messages/{locale}/{page-path}.json`

```bash
# Write optimized content to file
Write: src/config/locale/messages/{locale}/{page-path}.json
```

**Checklist:**
- [ ] All keys match original structure
- [ ] Placeholders preserved ({count}, {name}, etc.)
- [ ] JSON syntax valid
- [ ] Content exclusions removed
- [ ] UTF-8 encoding correct

## Step 5.7: Update Sitemap Config (MANDATORY)
**File:** `src/config/sitemap-config.ts`

Update `localeLastmod` for the page:
```typescript
{
  path: '/path/to/page',
  lastmod: '2026-01-17',
  localeLastmod: {
    // ... existing locales ...
    '{locale}': '{today-date}'  // UPDATE THIS
  },
  changefreq: 'weekly',
  priority: 0.8,
},
```

**Get today's date:**
```bash
date +%Y-%m-%d  # Output: 2026-01-20
```

## Step 5.8: Build Verification
```bash
pnpm build
```

**Verify:**
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No missing translation warnings

## Step 5.9: Visual Test (Recommended)
```bash
pnpm dev
# Visit: http://localhost:3000/{locale}/{page-path}
```

**Verify:**
- [ ] Page loads correctly
- [ ] UI displays properly
- [ ] No broken layouts
- [ ] All text displays correctly (no keys showing)

## Step 5.10: Generate Fix Summary

Output summary of all changes made:

```markdown
## Fix Summary

**Files Modified:**
- `src/config/locale/messages/{locale}/{page-path}.json`
- `src/config/sitemap-config.ts`

**Changes Applied:**

### Metadata Changes
| Field | Before | After |
|-------|--------|-------|
| title | {old} | {new} |
| description | {old} | {new} |

### Keyword Replacements
| Location | Old Keyword | New Keyword | Volume Change |
|----------|-------------|-------------|---------------|
| {loc} | {old} | {new} | +{x}K/mo |

### Content Improvements
1. {improvement 1}
2. {improvement 2}
3. {improvement 3}

### Content Removed
- [x] metadata.keywords (if present)
- [x] footer.friendLinks (if present)
- [x] backlinks section (if present)

### Quality Score Changes
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| SEO Score | {x}/100 | {x}/100 | +{x} |
| E-E-A-T | {x}/27 | {x}/27 | +{x} |
| GEO Score | {x}/40 | {x}/40 | +{x} |
| Seven Sweeps | {x}/7 | {x}/7 | +{x} |

**Build Status:** ✅ Passed
**Sitemap Updated:** ✅ Yes

**Next Steps:**
1. Run visual test at /{locale}/{page-path}
2. Re-run audit to verify improvements: `/i18n-content-audit {locale} {page-path}`
```
