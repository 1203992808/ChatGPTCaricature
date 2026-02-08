# Keyword Research Workflow

Complete workflow for researching and validating keywords for new locales.

## Overview

**Core workflow:** Generate candidates → Multi-dimensional validation → Document decision

**No Google Trends required.** Validation is based on proven search behavior data: Autocomplete, Related Searches, and competitor analysis.

---

## Table of Contents

1. [Select Search Engine](#step-1-select-search-engine)
2. [Generate Candidates](#step-2-generate-candidates)
3. [Multi-Dimensional Validation (100-point system)](#step-3-multi-dimensional-validation)
4. [Document Decision](#step-4-document-decision)

---

## Step 1: Select Search Engine

**CRITICAL:** Use the search engine your target market actually uses.

See [search-engines-config.md](./search-engines-config.md) for complete mapping.

**Quick reference:**
- **zh (China):** 百度 (Baidu) - NOT Google
- **ko (Korea):** Naver (primary)
- **ru (Russia):** Yandex + Google
- **Others:** Google (appropriate TLD)

---

## Step 2: Generate Candidates

Use Claude's multilingual knowledge to generate 3-5 candidate expressions:
- Direct translation
- Colloquial alternatives
- Local market terminology

**Example (English → Chinese):**

English: "AI image generator"

Candidates:
1. AI绘画 (direct + colloquial)
2. AI生成图片 (descriptive)
3. AI图片生成器 (literal translation)
4. AI画图 (ultra-colloquial)

---

## Step 3: Multi-Dimensional Validation

### 100-Point Scoring System

| Metric | Weight | Purpose |
|--------|--------|---------|
| 1. Search Results Volume (relative) | 15% | Market presence |
| 2. Top 30 Competitor Analysis | 30% | Professional adoption |
| 3. Autocomplete Ranking | 30% | Real user behavior ⭐ |
| 4. Related Searches | 20% | User intent validation |
| 5. Language Naturalness | 5% | UX quality |
| **Bonus:** Tier Consistency | ±10 | Keyword maturity |

---

### Metric 1: Search Results Volume (15 points)

**Purpose:** Relative market presence, not absolute numbers.

**Method:**
```bash
# Exact match search
"{keyword A}" site:{appropriate-search-engine}
"{keyword B}" site:{appropriate-search-engine}

# Title-specific (stronger signal)
intitle:"{keyword}" site:{appropriate-search-engine}
```

**Scoring:**
```
Score = (Current results / Highest results) × 15

If intitle: results > 50% of total → Score × 1.3 (bonus)
```

**Example:**
```
"AI绘画": 8,200,000 results → 8.2M / 8.2M = 100% → 15 points
"AI生成图片": 3,500,000 results → 3.5M / 8.2M = 43% → 6.5 points
"AI图片生成器": 1,500,000 results → 1.5M / 8.2M = 18% → 2.7 points
```

---

### Metric 2: Top 30 Competitor Analysis (30 points)

**Purpose:** Validate professional SEO choices across market segments.

**Why Top 30?**
- 3× sample size of Top 10
- Enables three-tier analysis
- Statistical reliability

#### Three-Tier Weighting

| Tier | Rankings | Multiplier | Rationale |
|------|----------|------------|-----------|
| **Tier 1** | 1-10 | ×1.5 | Head - Most reliable SEO |
| **Tier 2** | 11-20 | ×1.0 | Torso - Solid practices |
| **Tier 3** | 21-30 | ×0.5 | Tail - Mixed quality |

#### Element Scoring

| Element | Base Points | Notes |
|---------|-------------|-------|
| Title | 5 | Strongest SEO signal |
| H1 | 4 | Page theme |
| URL | 3 | Structural signal |
| Meta Description | 2 | User attraction |
| Body (high frequency) | 1 | Content relevance |

#### Domain Authority Multiplier

```
DR ≥ 80: ×2.0 (Ultra-high authority)
DR 70-79: ×1.8 (High authority)
DR 60-69: ×1.5 (Medium-high authority)
DR 50-59: ×1.3 (Medium authority)
DR 40-49: ×1.0 (Medium-low authority)
DR 30-39: ×0.8 (Low authority)
DR < 30: ×0.5 (Very low authority)
```

#### Example Calculation

**"AI绘画" in Top 30:**

**Tier 1 (Ranks 1-10):**
- Adobe.com (DR 95): Title ✓ (5×2.0=10) + H1 ✓ (4×2.0=8) = 18 points
- Canva.com (DR 92): Title ✓ (10) + H1 ✓ (8) = 18 points
- 8 other sites... → Tier 1 Total: 180 points

**Tier 2 (Ranks 11-20):**
- 10 sites with mixed usage → Tier 2 Total: 90 points

**Tier 3 (Ranks 21-30):**
- 10 sites with lower adoption → Tier 3 Total: 40 points

**Total:** 180 + 90 + 40 = 310 points
**Normalized:** (310 / 450) × 30 = **20.7 points / 30**

#### Tier Consistency Analysis (Bonus/Penalty)

| Pattern | Tier 1 | Tier 2 | Tier 3 | Interpretation | Score Modifier |
|---------|--------|--------|--------|----------------|----------------|
| **Pyramid** | 80% | 60% | 40% | Mature keyword, professional adoption | **+10** |
| **Consistent** | 70% | 70% | 70% | Market-wide consensus | **+10** |
| **Head-only** | 90% | 20% | 10% | Professional/new term | **+5** |
| **Inverted** | 20% | 50% | 80% | Amateur/outdated term | **-5** |
| **Declining** | 30% | 50% | 70% | Possibly obsolete | **-10** |
| **Rising** | 70% | 50% | 30% | Emerging trend | **+8** |

---

### Metric 3: Autocomplete Ranking (30 points) ⭐

**Why most important:** Based on REAL user search behavior, not assumptions.

**Method:**

Test multiple prefix combinations:

```
# Chinese example
Baidu.com search box:
- Type: "AI" → check suggestions
- Type: "AI生" → check suggestions
- Type: "AI图" → check suggestions
- Type: "图片生成" → check suggestions

# Test at least 3 different prefixes
```

**Scoring:**

```
Position 1: 30 points
Position 2-3: 25 points
Position 4-5: 20 points
Position 6-10: 15 points
Not in top 10: 0 points

Final score = Average across prefix tests
```

**Example:**

```
"AI绘画":
- "AI" prefix → Rank 1 → 30 points
- "AI生" prefix → Not shown → 0 points
- "AI图" prefix → Rank 3 → 25 points
Average: (30 + 0 + 25) / 3 = 18.3 points

"AI生成图片":
- "AI" prefix → Not in top 10 → 0 points
- "AI生" prefix → Rank 1 → 30 points
- "AI图" prefix → Not shown → 0 points
Average: (0 + 30 + 0) / 3 = 10 points
```

---

### Metric 4: Related Searches (20 points)

**Location:** Page bottom "相关搜索" / "Related Searches"

**Purpose:** Validate keyword is commonly searched.

**Scoring:**

```
5+ related suggestions: 20 points
3-4 suggestions: 15 points
1-2 suggestions: 10 points
No suggestions / irrelevant: 0 points
```

**Example:**

Search "AI绘画" on Baidu:

Related searches shown:
✓ AI绘画生成器
✓ AI绘画软件
✓ 免费AI绘画
✓ AI绘画网站
✓ AI画图
→ 5+ suggestions → **20 points**

---

### Metric 5: Language Naturalness (5 points)

**Check:**

| Dimension | Criteria |
|-----------|----------|
| Grammar | Correct for target language |
| Length | Reasonable (Chinese: 2-8 chars ideal) |
| Colloquial | Daily usage, not overly formal |
| Search-friendly | Users would type this |

**Deductions:**

```
- Unnatural translation patterns: -3 points
- Too formal/technical: -2 points
- Unreasonable length: -3 points

Minimum score: 0
Maximum score: 5
```

**Examples:**

```
✅ "AI绘画" → 5 points (natural, colloquial, 4 chars)
⚠️ "AI图像生成器" → 2 points (literal translation, technical)
❌ "基于人工智能的图像生成系统" → 0 points (too formal, too long)
```

---

## Step 4: Document Decision

Record in `keywords-{locale}.json` with all required fields.

**See [keyword-template.md](./keyword-template.md) for complete template.**

### Minimum Required Fields

```json
{
  "source": "AI image generator",
  "primary": "AI绘画",
  "alternatives": ["AI生成图片", "AI图片生成器"],
  "reasoning": "Based on multi-dimensional validation (2026-02-06): Autocomplete rank 1 for 'AI' prefix, 80% Top 30 adoption in Tier 1, 15k daily searches on Baidu Index. Natural colloquial expression.",
  "searchVolume": "very-high",
  "validationMethod": "multi-dimensional-5-metric",
  "validated": true,
  "validatedDate": "2026-02-06",

  "searchEngine": "baidu",
  "searchEngineMarket": "中国大陆",

  "validationScores": {
    "resultsVolume": 15,
    "top30Analysis": 20.7,
    "autocomplete": 18.3,
    "relatedSearches": 20,
    "naturalness": 5,
    "tierConsistency": 10,
    "total": 89
  },

  // ... extended fields (semanticVariants, etc.)
}
```

---

## Complete Example: Chinese Keyword Research

### Candidates Generated

1. AI绘画
2. AI生成图片
3. AI图片生成器

### Validation Results

#### Candidate 1: "AI绘画"

| Metric | Score | Details |
|--------|-------|---------|
| Results Volume | 15/15 | 8.2M results (100% relative) |
| Top 30 Analysis | 27/30 | 80% Tier 1, 60% Tier 2, 40% Tier 3 (Pyramid +10) |
| Autocomplete | 18/30 | Avg rank across 3 prefixes |
| Related Searches | 20/20 | 5+ suggestions |
| Naturalness | 5/5 | Perfect colloquial expression |
| **TOTAL** | **85/100** | ⭐⭐⭐⭐⭐ |

**Decision:** **Primary keyword**

---

#### Candidate 2: "AI生成图片"

| Metric | Score | Details |
|--------|-------|---------|
| Results Volume | 6.5/15 | 3.5M results (43% relative) |
| Top 30 Analysis | 12/30 | 50% Tier 1, 60% Tier 2, 70% Tier 3 (Inverted -5) |
| Autocomplete | 10/30 | Only shows for "AI生" prefix |
| Related Searches | 15/20 | 3-4 suggestions |
| Naturalness | 4/5 | Slightly descriptive but natural |
| **TOTAL** | **47.5/100** | ⭐⭐⭐ |

**Decision:** Alternative keyword

---

#### Candidate 3: "AI图片生成器"

| Metric | Score | Details |
|--------|-------|---------|
| Results Volume | 2.7/15 | 1.5M results (18% relative) |
| Top 30 Analysis | 6/30 | 10% Tier 1, 20% Tier 2, 30% Tier 3 (Declining -10) |
| Autocomplete | 0/30 | Not in top 10 for any prefix |
| Related Searches | 0/20 | No relevant suggestions |
| Naturalness | 2/5 | Literal translation, awkward |
| **TOTAL** | **10.7/100** | ❌ |

**Decision:** Exclude (too low)

---

## Search Engine Specific Notes

### Baidu (China)

- First 5-8 results are often ads - skip when analyzing
- Result counts are estimates, less accurate than Google
- **百度指数 (Baidu Index)** can provide precise daily search volumes
- Autocomplete is highly reliable

### Naver (Korea)

- Different SEO principles than Google
- **Naver DataLab** for trend data
- Blog posts rank higher than websites

### Yandex (Russia)

- **Yandex Wordstat** provides precise search volumes
- Validate on both Yandex and Google when possible

---

## Workflow Summary

```
1. Select search engine (see search-engines-config.md)
   ↓
2. Generate 3-5 candidates
   ↓
3. Multi-dimensional validation (100 points):
   ├─ Results volume (15%)
   ├─ Top 30 analysis (30%)
   ├─ Autocomplete (30%) ⭐ Most important
   ├─ Related searches (20%)
   └─ Naturalness (5%)
   ↓
4. Document in keywords-{locale}.json
   - Include validationScores
   - Record search engine used
   - Add extended fields to prevent keyword stuffing
```

---

## Common Mistakes

### ❌ Don't Do This

```
# Using wrong search engine
site:google.com.cn "AI绘画"  # doesn't exist!

# Only checking Top 10
# (Sample too small, unreliable)

# Ignoring Autocomplete
# (Miss most direct user behavior signal)

# Relying on search result numbers alone
# (Numbers don't equal search volume)
```

### ✅ Do This

```
# Use correct search engine per market
site:baidu.com "AI绘画"  # For China

# Analyze Top 30 with tier weighting
# (Reliable statistical sample)

# Test multiple Autocomplete prefixes
# (Most accurate user behavior)

# Use multi-dimensional scoring
# (Comprehensive validation)
```
