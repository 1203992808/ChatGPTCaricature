# Keyword Research Guide

## Core Principle

> **Translation ≠ Localization. Research first, then localize.**

The same concept often has vastly different search volumes depending on how it's expressed in each language.

## Research Workflow

### Step 1: Identify Source Keywords

Extract primary and secondary keywords from the English page:

```
Page: /ai-image/generator
Primary: "AI image generator"
Secondary: "text to image", "AI art", "free AI images", "online"
```

### Step 2: Find Candidate Expressions

For each keyword, brainstorm multiple expressions in the target language:

**Example for Japanese "AI image generator":**
1. AI画像生成器 (direct translation)
2. AI イラスト生成 (AI illustration generation)
3. AI 絵を描く (AI drawing/painting)
4. AI アート生成 (AI art generation)
5. 画像生成AI (image generation AI)

### Step 3: SERP Analysis - Top 30 Results (CRITICAL)

**This is the most important validation step.** Use WebSearch to analyze what keywords top-ranking pages actually use.

#### 3.1 Execute SERP Scraping

For each candidate keyword, run WebSearch and analyze top 30 results:

```markdown
## SERP Analysis: {candidate keyword}

### Search Query
"{candidate keyword}" lang:{locale}

### Collect from Top 30 Results:
1. Page titles (extract keywords used)
2. Meta descriptions (common phrases)
3. URL patterns (slug keywords)

### Output Format:
| Rank | Title | Keywords in Title | Domain |
|------|-------|-------------------|--------|
| 1 | ... | ... | ... |
| 2 | ... | ... | ... |
| ... | ... | ... | ... |
| 30 | ... | ... | ... |
```

#### 3.2 Keyword Frequency Analysis

After collecting 30 titles, count keyword occurrences:

```markdown
## Keyword Frequency in Top 30 Titles

| Expression | Count | Percentage | Example Titles |
|------------|-------|------------|----------------|
| AI イラスト | 18 | 60% | "AI イラスト生成...", "無料 AI イラスト..." |
| AI 画像生成 | 8 | 27% | "AI 画像生成ツール..." |
| AI 絵 | 4 | 13% | "AI で絵を描く..." |

**Winner:** "AI イラスト" - appears in 60% of top 30 titles
```

#### 3.3 Competitor Title Pattern Analysis

Identify common title patterns from top results:

```markdown
## Title Pattern Analysis

### Common Patterns Found:
1. "{keyword} - 無料で{benefit}" (12 occurrences)
2. "【{year}】{keyword}おすすめ{N}選" (8 occurrences)
3. "{keyword}の使い方・{feature}" (5 occurrences)

### Recommended Title Format:
Based on patterns, use: "{primary keyword} - {benefit} | {brand}"
```

### Step 3.4: Cumulative Search Strategy (30+ Results)

Since WebSearch returns ~10 results per query, use **cumulative multi-query search** to collect 30+ results:

#### Query Variation Matrix

For each candidate keyword, run 3-4 search variations:

```markdown
## Cumulative Search Plan: Japanese "AI image generator"

### Base Candidate: "AI イラスト生成"

| Query # | Search Query | Purpose |
|---------|--------------|---------|
| 1 | "AI イラスト生成" | Base keyword |
| 2 | "AI イラスト生成 無料" | + free modifier |
| 3 | "AI イラスト生成 おすすめ" | + recommendation |
| 4 | "AI イラスト生成 サイト" | + site/tool |
| 5 | "AI イラスト 作成" | Variation |

### Alternative Candidate: "AI 画像生成"

| Query # | Search Query | Purpose |
|---------|--------------|---------|
| 6 | "AI 画像生成" | Base keyword |
| 7 | "AI 画像生成 無料" | + free modifier |
| 8 | "AI 画像生成 ツール" | + tool |
| 9 | "画像生成AI おすすめ" | Word order variant |
```

#### Deduplication Process

After collecting results from multiple queries:

```markdown
## Result Deduplication

### Raw Results: 80 titles (8 queries × 10 results)
### After Dedup: 45 unique titles

### Dedup Rules:
1. Same URL = same result (remove duplicate)
2. Same domain + similar title = keep one
3. Different domains with same title = keep both (indicates popular format)
```

#### Aggregated Frequency Analysis

```markdown
## Aggregated Keyword Frequency (45 unique titles)

| Expression | Count | Percentage | Appears In |
|------------|-------|------------|------------|
| AIイラスト | 22 | 49% | Query 1,2,3,4,5 results |
| AI画像生成 | 18 | 40% | Query 6,7,8,9 results |
| 画像生成AI | 5 | 11% | Query 9 results |

**Cumulative Winner:** "AIイラスト" - 49% across 45 unique results
```

#### Query Modifier Patterns by Locale

| Locale | Modifiers to Add | Example Queries |
|--------|------------------|-----------------|
| ja | 無料, おすすめ, サイト, ツール, 使い方 | "{kw} 無料", "{kw} おすすめ" |
| ko | 무료, 추천, 사이트, 방법 | "{kw} 무료", "{kw} 추천" |
| de | kostenlos, beste, online, Vergleich | "{kw} kostenlos", "beste {kw}" |
| zh | 免费, 推荐, 在线, 工具 | "{kw} 免费", "{kw} 推荐" |
| ru | бесплатно, лучший, онлайн, сайт | "{kw} бесплатно", "лучший {kw}" |
| ar | مجاني, أفضل, موقع | "{kw} مجاني", "أفضل {kw}" |
| hi | फ्री, बेस्ट, ऑनलाइन | "{kw} फ्री", "बेस्ट {kw}" |
| id | gratis, terbaik, online, cara | "{kw} gratis", "{kw} terbaik" |

---

### Step 4: Multi-Candidate Comparison

Run SERP analysis for ALL candidate keywords and compare:

```markdown
## Candidate Comparison: Japanese "AI image generator"

| Candidate | Top 30 Frequency | Avg Rank Using This | Recommendation |
|-----------|------------------|---------------------|----------------|
| AI イラスト生成 | 18/30 (60%) | 5.2 | ⭐ PRIMARY |
| AI 画像生成 | 8/30 (27%) | 12.4 | Secondary |
| AI 絵を描く | 4/30 (13%) | 18.7 | Long-tail |
| 画像生成AI | 2/30 (7%) | 22.1 | Avoid |

**Decision:** Use "AI イラスト生成" as primary keyword
**Reasoning:** 60% of top 30 results use this expression
```

### Step 5: Cross-Validate with Google Trends

After SERP analysis, confirm with Google Trends:

**URL Pattern:**
```
https://trends.google.com/trends/explore?geo={COUNTRY_CODE}&q={term1},{term2},{term3}
```

**Example:**
```
https://trends.google.com/trends/explore?geo=JP&q=AI%20イラスト生成,AI画像生成,AI%20絵
```

### Step 6: Document Final Decision

```json
{
  "source": "AI image generator",
  "selected": "AI イラスト生成",
  "alternatives": ["AI 画像生成", "AI 絵を描く"],
  "reasoning": "SERP analysis: 60% of top 30 JP results use this expression",
  "validated": "2026-01-31",
  "method": "SERP top-30 analysis + Google Trends confirmation",
  "serpData": {
    "top30Frequency": "18/30 (60%)",
    "avgRankUsingKeyword": 5.2,
    "competitorTitlePatterns": [
      "{keyword} - 無料で{benefit}",
      "【2026】{keyword}おすすめ"
    ]
  }
}
```

---

## Automated SERP Analysis Protocol

### For Claude: How to Execute

When researching keywords for a locale, follow this exact protocol:

```markdown
## SERP Research Protocol

### Input:
- Source keyword (English): "AI image generator"
- Target locale: ja (Japanese)
- Candidates: ["AI画像生成器", "AI イラスト生成", "AI 絵を描く"]

### Execution:

#### Step 1: Search Each Candidate
For each candidate, use WebSearch:
- Query: "{candidate}" (with locale context)
- Collect: titles, descriptions, URLs from results

#### Step 2: Extract Title Keywords
Parse each title to identify:
- Main keyword expression used
- Modifiers (無料, オンライン, etc.)
- Pattern structure

#### Step 3: Frequency Count
Count how many of top 30 use each expression

#### Step 4: Rank Analysis
Note average ranking position of pages using each expression

#### Step 5: Output Decision
Select keyword with highest frequency in top positions
```

### WebSearch Query Patterns by Locale

| Locale | Query Pattern | Example |
|--------|--------------|---------|
| ja | "{keyword}" | "AI イラスト生成" |
| ko | "{keyword}" | "AI 이미지 생성기" |
| de | "{keyword}" | "KI-Bildgenerator" |
| zh | "{keyword}" | "AI绘画" |
| ru | "{keyword}" | "нейросеть для генерации картинок" |
| ar | "{keyword}" | "مولد الصور بالذكاء الاصطناعي" |
| hi | "{keyword}" | "AI इमेज जनरेटर" |
| id | "{keyword}" | "pembuat gambar AI" |

---

## Tools for Keyword Research

### Free Tools

| Tool | URL | Use Case |
|------|-----|----------|
| WebSearch (Claude) | Built-in | SERP analysis, top 30 titles |
| Google Trends | trends.google.com | Relative interest comparison |
| Google Search | google.com | Manual verification |
| Ubersuggest (limited) | neilpatel.com/ubersuggest | Keyword ideas |
| AnswerThePublic | answerthepublic.com | Question keywords |

### Paid Tools (Optional Enhancement)

| Tool | URL | Use Case | Cost |
|------|-----|----------|------|
| Keywords Everywhere | keywordseverywhere.com | Search volume data | $10/100K queries |
| DataForSEO | dataforseo.com | Bulk SERP API | Pay-per-use |
| SerpApi | serpapi.com | Structured SERP data | $50/mo+ |

---

## SERP Analysis Examples

### Example 1: Japanese "AI image generator"

```markdown
## WebSearch Results Analysis

Query: "AI イラスト生成"
Top 30 Title Analysis:

| # | Title | Primary Keyword |
|---|-------|-----------------|
| 1 | AI イラスト生成おすすめ10選【2026年最新】 | AI イラスト |
| 2 | 無料で使えるAI イラスト生成サイト | AI イラスト |
| 3 | AI イラスト生成の使い方完全ガイド | AI イラスト |
| 4 | AI 画像生成ツール比較 | AI 画像生成 |
| 5 | AIでイラストを作成する方法 | AI イラスト |
| ... | ... | ... |

**Keyword Frequency (Top 30):**
- "AI イラスト": 19 occurrences (63%)
- "AI 画像生成": 7 occurrences (23%)
- "AI 絵": 4 occurrences (13%)

**Decision:** PRIMARY = "AI イラスト生成"
```

### Example 2: German "AI image generator"

```markdown
## WebSearch Results Analysis

Query: "KI Bildgenerator"
Top 30 Title Analysis:

| # | Title | Primary Keyword |
|---|-------|-----------------|
| 1 | KI-Bildgenerator: Kostenlos Bilder erstellen | KI-Bildgenerator |
| 2 | Die besten KI Bilder erstellen Tools 2026 | KI Bilder erstellen |
| 3 | AI Bildgenerator - Fotos mit künstlicher Intelligenz | AI Bildgenerator |
| ... | ... | ... |

**Keyword Frequency (Top 30):**
- "KI-Bildgenerator": 14 occurrences (47%)
- "KI Bilder erstellen": 10 occurrences (33%)
- "AI Bildgenerator": 6 occurrences (20%)

**Decision:** PRIMARY = "KI-Bildgenerator"
**Note:** KI (47%) beats AI (20%) - confirms German preference
```

---

## Common Mistakes to Avoid

### 1. Direct Translation Without SERP Check

❌ **Wrong:** AI image generator → AI画像生成器 (assumed)
✅ **Right:** AI image generator → AI イラスト生成 (verified by SERP analysis)

### 2. Using Only Google Trends

❌ **Wrong:** Rely solely on Google Trends relative data
✅ **Right:** Combine SERP top-30 analysis + Google Trends

### 3. Small Sample Size

❌ **Wrong:** Check only top 5 results
✅ **Right:** Analyze top 30 results for statistically meaningful data

### 4. Ignoring Title Patterns

❌ **Wrong:** Only extract keywords
✅ **Right:** Also identify common title structures for SEO templates

---

## Research Checklist (Updated)

- [ ] Identified all source keywords from English page
- [ ] Generated 3-5 candidate expressions per keyword
- [ ] **Ran cumulative SERP analysis (4-5 queries per candidate)**
- [ ] **Deduplicated and merged results (30+ unique titles)**
- [ ] **Counted keyword frequency across all results**
- [ ] **Identified common title patterns**
- [ ] Cross-validated with Google Trends
- [ ] Selected highest-frequency natural expression
- [ ] Documented reasoning with SERP data
- [ ] Updated keyword mapping file with serpData

---

## Complete Cumulative Search Example

### Task: Find best Japanese keyword for "AI image generator"

#### Step 1: Define Candidates
```
Candidates:
1. AI イラスト生成
2. AI 画像生成
3. 画像生成AI
```

#### Step 2: Execute Cumulative Searches

**Candidate 1: "AI イラスト生成"**
```
Query 1.1: "AI イラスト生成"
Query 1.2: "AI イラスト生成 無料"
Query 1.3: "AI イラスト生成 おすすめ"
Query 1.4: "AI イラスト 作成 サイト"
→ Collect ~40 results, dedupe to ~25 unique
```

**Candidate 2: "AI 画像生成"**
```
Query 2.1: "AI 画像生成"
Query 2.2: "AI 画像生成 無料"
Query 2.3: "AI 画像生成 ツール おすすめ"
Query 2.4: "AI 画像生成 サイト"
→ Collect ~40 results, dedupe to ~25 unique
```

**Candidate 3: "画像生成AI"**
```
Query 3.1: "画像生成AI"
Query 3.2: "画像生成AI 無料"
Query 3.3: "画像生成AI おすすめ"
→ Collect ~30 results, dedupe to ~20 unique
```

#### Step 3: Merge and Analyze

```markdown
## Combined Results Analysis

Total Queries: 11
Total Raw Results: 110
After Global Dedup: 52 unique titles

### Keyword Distribution in 52 Titles

| Keyword Expression | Count | % | Position Analysis |
|--------------------|-------|---|-------------------|
| AIイラスト | 26 | 50% | Dominates pos 1-5 in イラスト queries |
| AI画像生成 | 19 | 37% | Strong in tool/comparison articles |
| 画像生成AI | 7 | 13% | Mostly in technical articles |

### Title Pattern Analysis

| Pattern | Count | Example |
|---------|-------|---------|
| 【{year}】{kw}おすすめ{N}選 | 12 | 【2026】AIイラスト生成おすすめ10選 |
| {kw} - 無料で{benefit} | 8 | AI イラスト生成 - 無料で簡単作成 |
| 無料{kw}サイト{N}選 | 7 | 無料AIイラストサイト7選 |
| {kw}の使い方・始め方 | 5 | AI画像生成の使い方完全ガイド |

### Common Modifiers Found

| Modifier | Frequency | Notes |
|----------|-----------|-------|
| 無料 | 34/52 (65%) | Critical modifier |
| おすすめ | 21/52 (40%) | Recommendation intent |
| 2026 / 最新 | 18/52 (35%) | Freshness signal |
| サイト / ツール | 15/52 (29%) | Tool-seeking intent |
```

#### Step 4: Final Decision

```json
{
  "keyword": "ai-image-generator",
  "locale": "ja",
  "decision": {
    "primary": "AI イラスト生成",
    "secondary": ["AI 画像生成", "画像生成AI"],
    "reasoning": "Cumulative SERP analysis (52 unique titles): 'AIイラスト' appears in 50% of results and dominates top positions. 'AI画像生成' is strong secondary for technical contexts.",
    "titlePattern": "【2026】{primary} - 無料で{benefit} | {brand}",
    "criticalModifiers": ["無料", "おすすめ", "オンライン"]
  },
  "serpData": {
    "totalQueries": 11,
    "uniqueTitles": 52,
    "keywordFrequency": {
      "AIイラスト": "50%",
      "AI画像生成": "37%",
      "画像生成AI": "13%"
    },
    "topModifiers": {
      "無料": "65%",
      "おすすめ": "40%"
    },
    "analyzedDate": "2026-01-31"
  }
}
```

---

## Execution Template for Claude

When asked to research keywords for a locale, use this template:

```markdown
## Keyword Research: {English keyword} → {locale}

### Phase 1: Generate Candidates
[List 3-5 candidate expressions]

### Phase 2: Cumulative Search (run these WebSearch queries)

**Candidate A: "{candidate1}"**
- Query A1: "{candidate1}"
- Query A2: "{candidate1} {free_modifier}"
- Query A3: "{candidate1} {recommend_modifier}"

**Candidate B: "{candidate2}"**
- Query B1: "{candidate2}"
- Query B2: "{candidate2} {free_modifier}"
- Query B3: "{candidate2} {tool_modifier}"

[Continue for all candidates]

### Phase 3: Collect and Dedupe
[After running all queries, list unique titles]

### Phase 4: Frequency Analysis
[Count keyword occurrences, identify patterns]

### Phase 5: Final Recommendation
[Document decision with data]
```
