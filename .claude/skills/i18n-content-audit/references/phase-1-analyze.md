# Phase 1: Analyze (内容分析)

## Step 1.0: ⛔ Load Validated Keyword Reference (MANDATORY)

> **This is the FIRST step. You MUST read the keyword data file before any analysis.**

```bash
# MANDATORY FIRST STEP - Load validated keyword data
Read: .claude/skills/i18n-seo-localizer/data/keywords-{locale}.json
# OR: .codex/skills/i18n-seo-localizer/data/keywords-{locale}.json (if using .codex)
```

This provides the **benchmark** for comparing current keywords against validated high-volume expressions.

**Why This Matters:**
- Current content may use machine-translated keywords
- Validated keywords have been SERP-tested
- Comparing against validated data reveals optimization opportunities

## Step 1.1: Read Target Content
```bash
# Read the localized content file
Read: src/config/locale/messages/{locale}/{page-path}.json

# Read English source for comparison
Read: src/config/locale/messages/en/{page-path}.json
```

## Step 1.2: Extract Current Keywords
Identify all keywords currently used in:
- `metadata.title`
- `metadata.description`
- H1/H2/H3 headings
- CTA buttons
- Feature descriptions
- FAQ content

## Step 1.3: Compare Against Validated Keywords

**Compare current keywords with validated keywords from Step 1.0:**

| Location | Current Keyword | Validated Keyword | Status | Action |
|----------|-----------------|-------------------|--------|--------|
| Title | AI图像生成器 | AI绘画 (from data file) | ❌ Mismatch | Replace |
| H1 | 图片增强 | 图片无损放大 (from data file) | ❌ Mismatch | Replace |
| CTA | 免费试用 | 免费试用 (from commonPhrases) | ✅ Match | Keep |

**Keyword Quality Score:**
- ✅ Match = Current keyword equals validated keyword → +1 point
- ⚠️ Similar = Current keyword is in `alternatives` list → +0.5 points
- ❌ Mismatch = Current keyword is machine-translated → 0 points

## Step 1.4: Identify Keywords Not in Data File

If page contains keywords not found in `keywords-{locale}.json`:
1. Flag as "needs research"
2. Do NOT guess if it's correct
3. Recommend: Research using cumulative SERP analysis before fixing
