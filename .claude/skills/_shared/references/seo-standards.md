# SEO Standards - Shared Reference

> **This file contains unified SEO standards used across all content generation and audit skills.**
>
> **Used by:** `auto-i18n`, `i18n-content-audit`, `shipany-page-builder`

---

## Word Count Requirements (ENFORCED)

### Minimum Word Counts by Language

| Language | MINIMUM | Optimal | FAIL if below |
|----------|---------|---------|---------------|
| EN | **800 words** | 1000-1500 | < 800 ❌ |
| ZH/zh-TW | **500 words** | 700-1000 | < 500 ❌ |
| JA/KO | **600 words** | 800-1200 | < 600 ❌ |
| European (de/es/fr/it/pt) | **800 words** | 1000-1500 | < 800 ❌ |

### Enforcement Rules

1. Generated content MUST meet minimum word count
2. Cannot mark task complete if word count insufficient
3. If below minimum, content must be expanded before completion
4. Word count includes: Title, headings, body text, FAQ
5. Word count excludes: Alt text, navigation labels, buttons

---

## Keyword Density Requirements (2026-02-01)

> **⚠️ IMPORTANT: Alt text does NOT count towards keyword density**
> Alt text is for image description, independent evaluation

### Density Calculation Method

```
Keyword Density = (Title + H1 + H2 + Body keyword count) / Total body words × 100%

Note: Alt text NOT included in numerator or denominator
```

### Target Density by Language

| Language | Target Density | Healthy Range | Failure Condition |
|----------|----------------|---------------|-------------------|
| ZH/zh-TW | **2.0-3.0%** | 1.8-3.5% | >4.0% or <1.5% ❌ |
| EN | **1.8-2.5%** | 1.5-3.0% | >3.5% or <1.2% ❌ |
| JA/KO | **2.0-2.8%** | 1.8-3.2% | >3.8% or <1.5% ❌ |
| European (de/es/fr/it/pt) | **1.8-2.5%** | 1.5-3.0% | >3.5% or <1.2% ❌ |

### Density Examples

**For 800-word English page:**
- 2.0% = 16 keyword occurrences
- 2.5% = 20 keyword occurrences
- 3.0% = 24 keyword occurrences

**For 500-word Chinese page:**
- 2.0% = 10 keyword occurrences
- 2.5% = 12-13 keyword occurrences
- 3.0% = 15 keyword occurrences

---

## Keyword Distribution Rules

### Standard Distribution Pattern

```markdown
✅ Title: 1x (MUST use primary keyword)
🚨 H1: 1x (MUST contain primary keyword - one-vote veto)
🚨 H2: 2-4 headings with keywords (primary ≤50%, variants 50%+)
ℹ️  H3: Optional, if used primary ≤30%, variants 70%+
✅ Body: Natural distribution
   - Primary keyword: 30% of total keyword uses
   - Semantic variants: 40% of total keyword uses
   - Related terms: 30% of total keyword uses
✅ Alt: 0-1x (independent evaluation, describe image naturally)
```

### H1 Rules (CRITICAL - One-Vote Veto)

**This is the MOST IMPORTANT rule. H1 without primary keyword = Automatic FAIL.**

```markdown
✅ CORRECT Examples:
- "AI绘画 - 智能图像生成工具" ← Contains primary "AI绘画"
- "专业的AI绘画平台" ← Contains primary "AI绘画"
- "AI Image Generator - Create Art Online" ← Contains primary

❌ WRONG Examples:
- "智能图像生成工具" ← Missing primary keyword
- "Digital Art Platform" ← Only semantic variant, missing primary
```

**Why H1 is critical:**
- H1 is the most important SEO element after Title
- Search engines weight H1 heavily for ranking
- H1 without primary keyword = poor SEO performance
- This check is enforced by script and CANNOT be bypassed

### H2 Rules (Important Check)

**Requirements:** At least 2-4 H2s should contain keywords (primary or variants)

```markdown
✅ CORRECT Distribution:
H2-1: "AI绘画的核心功能" ← Primary (1/4 = 25%)
H2-2: "智能图像生成的使用方法" ← Semantic variant
H2-3: "数字艺术创作的应用场景" ← Related term
H2-4: "免费AI绘画工具的选择" ← Long-tail keyword
→ 4/4 contain keywords, primary ratio 25% ✅

❌ WRONG - All Primary (Stuffing):
H2-1: "AI绘画功能"
H2-2: "AI绘画使用"
H2-3: "AI绘画优势" ← All primary keywords
H2-4: "AI绘画特点"
→ 4/4 all primary, ratio 100% ❌ STUFFING RISK

❌ WRONG - No Keywords:
H2-1: "功能介绍"
H2-2: "使用方法"
H2-3: "应用场景" ← No keywords
H2-4: "产品特点"
→ 0/4 contain keywords ❌ POOR SEO
```

### H3 Rules (Recommended, Not Required)

```markdown
ℹ️  RECOMMENDED Distribution:
- 20-30% of H3s may contain keywords
- Primarily use semantic variants, not primary
- More diversified than H2s

✅ Good Example:
H3-1: "文生图功能" ← Related term
H3-2: "图生图编辑" ← Related term
H3-3: "AI绘画的速度优势" ← Primary (moderate use)
H3-4: "免费积分规则" ← Long-tail
→ 1/4 primary, ratio 25% ✅
```

### Anti-Stuffing Rules (MANDATORY)

```markdown
❌ PROHIBITED:
- Same paragraph: Primary keyword > 1 time
- Keyword spacing: < 50 characters (Chinese) / < 200 characters (English)
- Alt text: Keyword stuffing in alt attributes
- Unnatural patterns: "X是X", "X的X", "X和X" repetition
```

---

## Keyword Vocabulary Diversity

### Required Diversity

**Minimum diversity requirement: ≥70%**

This means:
- Primary keyword: ≤30% of total keyword uses
- Must use semantic variants and related terms for remaining 70%

### Example Keyword Pool

```json
{
  "primary": "AI绘画",
  "semanticVariants": [
    "AI生成图片",
    "AI图片生成器",
    "智能图像生成",
    "人工智能绘画"
  ],
  "relatedTerms": [
    "数字艺术创作",
    "AI艺术",
    "自动绘画工具",
    "图像生成技术"
  ],
  "longTail": [
    "免费AI绘画工具",
    "在线AI绘画生成器",
    "AI绘画生成平台"
  ]
}
```

### Usage Distribution Strategy

**In an 800-word article with 20 total keyword uses:**
- Primary keyword "AI绘画": 6 times (30%)
- Semantic variants: 8 times (40%)
- Related terms: 6 times (30%)

---

## Title & Description Standards

### Title Length Standards

| Language | Optimal Range | Acceptable Range | Too Short | Too Long |
|----------|---------------|------------------|-----------|----------|
| English (en) | 50-60 chars | 45-65 chars | <40 | >70 |
| Chinese (zh/zh-TW) | 20-30 chars | 18-32 chars | <15 | >35 |
| Japanese (ja) | 25-35 chars | 22-38 chars | <20 | >40 |
| Korean (ko) | 25-35 chars | 22-38 chars | <20 | >40 |
| European (de/es/fr/it/pt) | 50-60 chars | 45-65 chars | <40 | >70 |

### Description Length Standards

| Language | Optimal Range | Acceptable Range | Too Short | Too Long |
|----------|---------------|------------------|-----------|----------|
| English (en) | 150-160 chars | 140-165 chars | <120 | >170 |
| Chinese (zh/zh-TW) | 70-80 chars | 65-85 chars | <60 | >90 |
| Japanese (ja) | 70-100 chars | 65-105 chars | <60 | >110 |
| Korean (ko) | 70-100 chars | 65-105 chars | <60 | >110 |
| European (de/es/fr/it/pt) | 150-160 chars | 140-165 chars | <120 | >170 |

### Title Requirements

- [ ] Contains primary keyword
- [ ] Primary keyword positioned in first 50%
- [ ] Reads naturally (not keyword-stuffed)
- [ ] No machine-translation feel
- [ ] Matches page content accurately
- [ ] Includes brand name (at end, if space allows)
- [ ] Format: `Primary Keyword | Secondary - Brand`

### Description Requirements

- [ ] Contains primary keyword
- [ ] Contains secondary keyword(s)
- [ ] Has clear call-to-action (CTA)
- [ ] States unique value proposition
- [ ] Answers "what will user get?"
- [ ] Reads naturally and compellingly
- [ ] GEO-friendly (can stand alone as answer)

---

## Content Exclusion Rules

### Forbidden Elements

These elements MUST NOT be included in generated content:

| Element | Location | Reason | Action |
|---------|----------|--------|--------|
| `metadata.keywords` | Metadata section | Deprecated by search engines | Do NOT add |
| `footer.friendLinks` | Footer section | Not part of content strategy | Do NOT add |
| `sections.backlinks` | Any section | Not part of content strategy | Do NOT add |
| External link exchanges | Any location | Low-quality SEO practice | Do NOT add |

---

## Quality Gates

### Gate 0: Title & Keyword Quality (One-Vote Veto)

**MANDATORY checks that CANNOT be bypassed:**

```bash
python scripts/check_keyword_quality.py \
  --file {generated_file} \
  --keyword {primary_keyword} \
  --locale {locale}
```

**Must pass:**
- 🚨 H1 contains primary keyword (HIGHEST PRIORITY)
- 🚨 H2 distribution: 2-4 with keywords, primary ≤50%
- ℹ️  H3 distribution: primary ≤30% (warning, not blocking)
- ✅ Keyword spacing ≥ 50 chars (CN) / 200 chars (EN)
- ✅ Paragraph repetition ≤ 1 time per paragraph
- ✅ No unnatural patterns ("X是X", "X的X", etc.)
- ✅ Readability ≥ 60

**If fails:** Auto-rewrite (max 3 times), cannot bypass

### Gate 1: Content Quality

- [ ] Word count ≥ minimum for target language
- [ ] Keyword density within healthy range (not too low, not stuffing)
- [ ] Vocabulary diversity ≥ 70%
- [ ] E-E-A-T score ≥ 18/27

### Gate 2: SEO Optimization

- [ ] GEO score ≥ 28/40
- [ ] Metadata quality ≥ 50/70
- [ ] Title and description within length limits
- [ ] Natural keyword integration

### Gate 3: Technical

- [ ] JSON structure valid
- [ ] No syntax errors
- [ ] All placeholders preserved
- [ ] No forbidden content (keywords meta, friendLinks, etc.)
- [ ] Build passes without errors

---

## E-E-A-T Scoring Reference

### Experience (0-7 points)

| Score | Criteria |
|-------|----------|
| 7 | Multiple detailed case studies + failure analysis + practical tips |
| 5-6 | 1-2 case studies + some practical examples |
| 3-4 | General examples, no specific cases |
| 1-2 | Theoretical only, no experience shown |
| 0 | No experience indicators |

### Expertise (0-7 points)

| Score | Criteria |
|-------|----------|
| 7 | Technically flawless + expert credentials + comprehensive depth |
| 5-6 | Accurate information + some credentials + good depth |
| 3-4 | Mostly accurate + no credentials + surface level |
| 1-2 | Some inaccuracies + no depth |
| 0 | Significant errors |

### Authoritativeness (0-7 points)

| Score | Criteria |
|-------|----------|
| 7 | Multiple authoritative citations + original research + recognition |
| 5-6 | Several citations + unique perspective |
| 3-4 | Few citations + generic content |
| 1-2 | No citations + copied feel |
| 0 | No authority signals |

### Trustworthiness (0-6 points)

| Score | Criteria |
|-------|----------|
| 6 | Recent update + full transparency + complete contact |
| 4-5 | Updated within 6 months + sources cited + contact available |
| 2-3 | Somewhat dated + partial transparency |
| 1 | Outdated + missing sources |
| 0 | No trust signals |

**E-E-A-T Target:** ≥ 18/27

---

## GEO (Generative Engine Optimization) Scoring Reference

### Scoring Factors (Each 0-5 points, Total 0-40)

| Factor | 5 pts | 3 pts | 1 pt | 0 pts |
|--------|-------|-------|------|-------|
| Clear Definitions | Multiple 40-60 word standalone definitions | Some definitions | Few definitions | None |
| Quotable Statements | Multiple facts with sources | Some statements | Few facts | None |
| Factual Density | High fact-to-opinion ratio | Mix of facts/opinions | Mostly opinion | No facts |
| Source Citations | 5+ authoritative recent sources | 1-2 sources | Vague references | None |
| Q&A Format | Comprehensive FAQ matching queries | Basic FAQ | Minimal Q&A | None |
| Authority Signals | Expert quotes + credentials + validation | Basic credentials | Minimal authority | None |
| Content Freshness | Within 3 months + date shown | Within 1 year | 1-2 years old | Outdated |
| Structure Clarity | Perfect hierarchy + highly scannable | Good structure | Acceptable | Poor |

**GEO Target:** ≥ 30/40

---

## Anti-Stuffing Detection Script

### Script Location

```bash
scripts/check_keyword_quality.py
```

### Usage

```bash
python scripts/check_keyword_quality.py \
  --file src/config/locale/messages/zh/pages/example.json \
  --keyword "AI绘画" \
  --locale zh
```

### What It Checks

1. **H1 Primary Keyword Presence** (One-vote veto)
   - Must contain primary keyword
   - Cannot be only semantic variants

2. **H2 Distribution**
   - At least 2-4 H2s with keywords
   - Primary keyword ratio ≤50%

3. **H3 Distribution** (Warning only)
   - If H3s exist, primary ≤30%

4. **Keyword Spacing**
   - Chinese: ≥50 characters between same keywords
   - English: ≥200 characters between same keywords

5. **Paragraph Repetition**
   - Same paragraph: ≤1 primary keyword occurrence

6. **Unnatural Patterns**
   - "X是X", "X的X", "X和X" excessive repetition

7. **Readability Score**
   - Must be ≥60

### Exit Codes

- `0`: All checks passed ✅
- `1`: H1 check failed (critical) 🔴
- `2`: H2 distribution failed 🟡
- `3`: Other checks failed ⚠️
- `4`: H3 distribution warning (doesn't block) ℹ️

---

## Enforcement Philosophy

### Priority Order

1. **Natural readability** > Keyword density
   - If density conflicts with natural writing, prioritize readability
   - Use semantic variants to maintain natural flow

2. **User experience** > SEO metrics
   - Content must be valuable to human readers first
   - SEO optimization is secondary

3. **Quality** > Quantity
   - 800 high-quality words > 1500 mediocre words
   - Focus on substance, not just hitting word count

### When to Bend Rules

**Acceptable deviations:**
- Density 1.8% instead of 2.0% if content reads more naturally
- H2 primary ratio 55% instead of 50% if variants sound forced
- Word count 780 instead of 800 if content is complete and valuable

**Never acceptable:**
- H1 without primary keyword (one-vote veto)
- Keyword stuffing (>4% density)
- Unnatural "X的X" patterns
- Machine-translation feel
- Word count <80% of minimum

---

## Quick Reference Table

| Metric | EN | ZH | JA/KO | European |
|--------|----|----|-------|----------|
| Min Words | 800 | 500 | 600 | 800 |
| Optimal Words | 1000-1500 | 700-1000 | 800-1200 | 1000-1500 |
| Target Density | 1.8-2.5% | 2.0-3.0% | 2.0-2.8% | 1.8-2.5% |
| Max Density | 3.5% | 4.0% | 3.8% | 3.5% |
| Title Length | 50-60 | 20-30 | 25-35 | 50-60 |
| Desc Length | 150-160 | 70-80 | 70-100 | 150-160 |
| Keyword Spacing | 200 chars | 50 chars | 100 chars | 200 chars |

---

**Last Updated:** 2026-02-03
**Version:** 2.0
**Changelog:**
- 2026-02-03: Created unified shared standards file
- 2026-02-01: Updated density calculation (Alt text excluded)
- 2026-01-20: Added anti-stuffing requirements
