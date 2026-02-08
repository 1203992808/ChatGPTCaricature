# Auto i18n - Detailed Workflow & Checklist

This document provides detailed execution steps and checklists for the auto-i18n skill.

## Pre-Flight Checks

Before starting, verify:

```bash
# 1. English source file exists
ls src/config/locale/messages/en/{page-path}.json

# 2. Target locale directory exists (create if not)
mkdir -p src/config/locale/messages/{locale}/

# 3. Check current file count for comparison later
find src/config/locale/messages/en -name "*.json" | wc -l
```

---

## Phase 1: Research - Detailed Steps

### 1.1 Read English Source

```bash
# Read the source file
Read: src/config/locale/messages/en/{page-path}.json
```

Extract and list:
- `metadata.title`
- `metadata.description`
- All heading texts (H1, H2, H3)
- CTA button texts
- Feature names
- FAQ questions and answers

### 1.2 Keyword Extraction Template

```markdown
## Keywords to Localize

| # | English Keyword | Context | Priority |
|---|----------------|---------|----------|
| 1 | AI Image Generator | Title, H1 | High |
| 2 | Create images | CTA | High |
| 3 | Professional quality | Feature | Medium |
| 4 | Free trial | Pricing | High |
| 5 | ... | ... | ... |
```

### 1.3 Keyword Research Process

For EACH keyword:

```markdown
### Keyword: "AI Image Generator"

**Research Method:** Google Trends Comparison

**Candidates:**
1. "generatore di immagini AI" - [search volume]
2. "creare immagini con AI" - [search volume]
3. "generatore AI per immagini" - [search volume]

**Selected:** [highest volume option]
**Reason:** Highest search volume, natural expression
**Source:** Google Trends IT, accessed {date}
```

### 1.4 Keyword Mapping Output

Create keyword mapping for reference:

```json
{
  "locale": "{locale}",
  "date": "{today}",
  "keywords": {
    "ai-image-generator": {
      "en": "AI Image Generator",
      "localized": "[selected expression]",
      "alternatives": ["alt1", "alt2"],
      "source": "Google Trends",
      "validated": true
    },
    "create-images": {
      "en": "Create images",
      "localized": "[selected expression]",
      "source": "Google Trends",
      "validated": true
    }
  }
}
```

---

## Phase 2: Generate - Detailed Steps

### 2.1 Content Generation Guidelines

**Title Format:**
```
{Primary Keyword} | {Secondary Keyword} - {Brand}
```

**Description Format:**
```
{Value proposition with primary keyword}. {Specific benefit}. {CTA}.
```

**Example (Italian):**
```json
{
  "metadata": {
    "title": "Creare Immagini con AI Gratis | Generatore Online - MakeMyPic",
    "description": "Crea immagini straordinarie con l'intelligenza artificiale in pochi secondi. 9+ modelli AI professionali, nessuna competenza richiesta. Prova gratis ora."
  }
}
```

### 2.2 GEO Optimization Checklist

- [ ] Clear definitions (40-60 words, standalone)
- [ ] Quotable statements with specific data
- [ ] Q&A format in FAQ section
- [ ] Authority signals (sources, credentials)
- [ ] Numbered lists for processes
- [ ] Comparison tables where relevant

### 2.3 JSON File Creation

**Path:** `src/config/locale/messages/{locale}/{page-path}.json`

**Critical Rules:**
1. Copy exact structure from English file
2. Translate values, NOT keys
3. Preserve all placeholders: `{count}`, `{name}`, `{price}`, etc.
4. Maintain JSON syntax (commas, brackets, quotes)

---

## Phase 3: Review - Detailed Checklists

### 3.1 Content Quality Checklist

**Heading Structure:**
- [ ] H1 is unique (only one per page)
- [ ] Heading hierarchy is logical (H1 → H2 → H3)
- [ ] Headings contain keywords naturally

**Keyword Density:**
| Language | Target Density |
|----------|---------------|
| Chinese | 2-4% |
| English | 1-2% |
| European | 1-2% |

**Readability:**
- [ ] Paragraph length: 3-5 sentences
- [ ] Sentence length: 15-25 words
- [ ] Uses bullet points and lists
- [ ] Has clear transitions

### 3.2 Seven Sweeps Checklist

**Sweep 1: Clarity**
- [ ] Every sentence immediately understandable
- [ ] No jargon without explanation
- [ ] Pronouns have clear references

**Sweep 2: Voice & Tone**
- [ ] Consistent formality throughout
- [ ] Brand personality maintained
- [ ] Reads well aloud

**Sweep 3: So What**
- [ ] Every feature connects to benefit
- [ ] Claims answer "why should I care?"
- [ ] Benefits connect to real desires

**Sweep 4: Prove It**
- [ ] Claims are substantiated
- [ ] Social proof is specific
- [ ] Numbers have sources

**Sweep 5: Specificity**
- [ ] Vague words replaced with concrete
- [ ] Numbers and timeframes included
- [ ] No filler content

**Sweep 6: Heightened Emotion**
- [ ] Copy evokes feeling
- [ ] Pain points feel real
- [ ] Aspirations achievable

**Sweep 7: Zero Risk**
- [ ] Objections addressed
- [ ] Trust signals present
- [ ] Next steps crystal clear

### 3.3 Title & Description Audit

**Title Checklist:**
- [ ] Length within limit (see table below)
- [ ] Contains primary keyword
- [ ] Keyword positioned early
- [ ] Format: `Primary | Secondary - Brand`
- [ ] Native expression (not MT)
- [ ] Unique (not duplicated)

**Description Checklist:**
- [ ] Length within limit (see table below)
- [ ] Contains primary + secondary keywords
- [ ] Has CTA (call to action)
- [ ] Has unique value proposition
- [ ] GEO-friendly (quotable as standalone answer)
- [ ] Native expression (not MT)
- [ ] Unique (not duplicated)

**Length Limits by Language:**

| Language | Title | Description |
|----------|-------|-------------|
| English (en) | 50-60 chars | 150-160 chars |
| Chinese (zh) | 20-30 chars | 70-80 chars |
| Traditional Chinese (zh-TW) | 20-30 chars | 70-80 chars |
| Japanese (ja) | 25-35 chars | 70-100 chars |
| Korean (ko) | 25-35 chars | 70-100 chars |
| German (de) | 50-60 chars | 150-160 chars |
| Spanish (es) | 50-60 chars | 150-160 chars |
| French (fr) | 50-60 chars | 150-160 chars |
| Italian (it) | 50-60 chars | 150-160 chars |
| Portuguese (pt) | 50-60 chars | 150-160 chars |

### 3.4 JSON Structure Validation

```bash
# Compare keys between English and target locale
# Use jq or manual comparison

# Check JSON syntax
cat src/config/locale/messages/{locale}/{page-path}.json | jq .
```

**Validation Checklist:**
- [ ] All keys from English present
- [ ] No extra keys added
- [ ] JSON syntax valid (no errors)
- [ ] Placeholders preserved exactly
- [ ] No trailing commas
- [ ] Proper UTF-8 encoding

### 3.5 Content Exclusion Validation (MANDATORY)

**Check that the following content is NOT present:**

```bash
# Check for forbidden keywords field
grep -r "keywords" src/config/locale/messages/{locale}/{page-path}.json

# Check for forbidden friendLinks
grep -r "friendLinks" src/config/locale/messages/{locale}/{page-path}.json

# Check for forbidden backlinks
grep -r "backlinks" src/config/locale/messages/{locale}/{page-path}.json
```

**Exclusion Checklist:**
- [ ] No `metadata.keywords` field
- [ ] No `footer.friendLinks` section
- [ ] No backlinks or friend links sections
- [ ] No external link exchange sections

**If found, DELETE immediately:**
```json
// ❌ DELETE these if present:
"keywords": "...",
"friendLinks": [...],
"backlinks": [...]
```

### 3.5 Sitemap Update

**File:** `src/config/sitemap-config.ts`

**Find the page entry and update:**

```typescript
// Before
{
  path: '/pricing',
  lastmod: '2026-01-17',
  localeLastmod: { ko: '2026-01-18', es: '2026-01-18' },
  changefreq: 'weekly',
  priority: 0.9,
},

// After (adding Italian)
{
  path: '/pricing',
  lastmod: '2026-01-17',
  localeLastmod: { ko: '2026-01-18', es: '2026-01-18', it: '2026-01-20' },
  changefreq: 'weekly',
  priority: 0.9,
},
```

**Checklist:**
- [ ] Found correct page entry
- [ ] Added locale to `localeLastmod`
- [ ] Used today's date (YYYY-MM-DD format)
- [ ] Maintained proper TypeScript syntax
- [ ] No duplicate locale entries

---

## Final Verification

### Build Test
```bash
pnpm build
```
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No missing translation warnings

### Visual Test
```bash
pnpm dev
# Visit: http://localhost:3000/{locale}/{page-path}
```
- [ ] Page loads correctly
- [ ] UI displays properly
- [ ] No broken layouts
- [ ] No missing text (shows translation, not keys)
- [ ] Language switcher works

### Comparison with English
- [ ] Same sections present
- [ ] Same functionality
- [ ] No regressions

---

## Completion Report Template

```markdown
# i18n Completion Report

**Page:** {page-path}
**Target Locale:** {locale}
**Date:** {today}

## Files Modified
- [x] Created: `src/config/locale/messages/{locale}/{page-path}.json`
- [x] Updated: `src/config/sitemap-config.ts`

## Quality Scores
- E-E-A-T Score: {score}/20
- GEO Score: {score}/40
- Seven Sweeps: PASS/FAIL

## Title & Description
- Title: "{title}" ({length} chars) ✅
- Description: "{description}" ({length} chars) ✅

## Keywords Localized
| English | Localized | Source |
|---------|-----------|--------|
| {kw1} | {localized1} | Google Trends |
| {kw2} | {localized2} | Google Trends |

## Verification
- [x] Build passes
- [x] Visual test passes
- [x] Sitemap updated

## Notes
{any additional notes}
```

---

## Troubleshooting Guide

### Problem: Keyword research returns no results
**Solution:**
1. Try broader search terms
2. Check spelling in target language
3. Use Google Trends directly
4. Consult native speakers

### Problem: Title/Description exceeds length
**Solution:**
1. Remove brand name if necessary
2. Use shorter synonym
3. Remove less important keywords
4. Prioritize primary keyword

### Problem: JSON parse error
**Solution:**
1. Check for missing commas
2. Check for extra commas (trailing)
3. Verify all strings are quoted
4. Check bracket matching
5. Use JSON validator tool

### Problem: Build fails with missing translation
**Solution:**
1. Check if message path registered in `localeMessagesPaths`
2. Verify file exists at correct path
3. Check for typos in file path
4. Ensure all required keys present

### Problem: UI shows wrong language
**Solution:**
1. Clear browser cache
2. Check locale detection logic
3. Verify cookie/localStorage
4. Check URL structure
