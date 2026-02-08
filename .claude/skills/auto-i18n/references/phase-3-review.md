# Phase 3: Review (审核)

## Step 3.1: Content Quality Check
**Use Skill:** `/content-optimizer`

Check:
- Heading structure
- Keyword density (target language specific)
- Readability
- E-E-A-T score

---

## Step 3.2: Copy Quality Check
**Use Skill:** `/copy-editing`

Seven Sweeps Framework:
1. Clarity - Is it immediately understandable?
2. Voice & Tone - Is it consistent?
3. So What - Does every claim answer "why should I care?"
4. Prove It - Is every claim supported?
5. Specificity - Is it concrete enough?
6. Heightened Emotion - Does it evoke feeling?
7. Zero Risk - Are barriers removed?

---

## Step 3.3: Title & Description Audit (MANDATORY)
**Use Skills:** `/metadata-optimizer` → `/i18n-seo-localizer` → `/geo-content-optimizer`

**Check:**
| Dimension | Requirement |
|-----------|-------------|
| SEO Best Practice | Length within limits, keywords present |
| SEO Friendly | Natural keyword integration |
| Native Expression | No machine-translation feel |
| Topic Match | Accurately reflects page content |

**Length Standards:**
| Language | Title | Description |
|----------|-------|-------------|
| English | 50-60 chars | 150-160 chars |
| Chinese | 20-30 chars | 70-80 chars |
| Italian | 50-60 chars | 150-160 chars |
| German | 50-60 chars | 150-160 chars |
| Other European | 50-60 chars | 150-160 chars |

**If NOT passing:**
1. `/metadata-optimizer` → Diagnose issues
2. `/i18n-seo-localizer` → Re-research keywords
3. `/geo-content-optimizer` → Optimize for AI
4. `/content-optimizer` → Final quality check
5. **Rewrite ONLY title and description** (nothing else)

---

## Step 3.4: Structure Validation
```bash
# Compare file counts
find messages/en -name "*.json" | wc -l
find messages/{locale} -name "*.json" | wc -l

# Verify JSON structure matches English
```

**Checklist:**
- [ ] All JSON keys match English version
- [ ] No missing files
- [ ] JSON syntax valid
- [ ] Placeholders preserved ({count}, {name}, etc.)

---

## Step 3.5: Update Sitemap Config (MANDATORY)
**File:** `src/config/sitemap-config.ts`

Update `localeLastmod` for the page:
```typescript
{
  path: '/path/to/page',
  lastmod: '2026-01-17',
  localeLastmod: {
    // ... existing locales ...
    '{locale}': '{today-date}'  // ADD THIS
  },
  changefreq: 'weekly',
  priority: 0.8,
},
```

**Get today's date:**
```bash
date +%Y-%m-%d  # Output: 2026-01-20
```

---

## Step 3.6: Build and Test
```bash
pnpm build
```

**Verify:**
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No missing translation warnings
