# SEO Guidelines for Localized Pages

## Keyword Validation Workflow (Using Playwright)

### Step-by-Step Process

```
1. PREPARE: Identify keywords to validate
   ↓
2. NAVIGATE: Use Playwright to open Google Trends
   mcp__playwright__playwright_navigate
   url: https://trends.google.com/trends/explore?geo={COUNTRY}&q={terms}
   ↓
3. WAIT: Allow page to fully load (3-5 seconds)
   ↓
4. CAPTURE: Take screenshot for documentation
   mcp__playwright__playwright_screenshot
   name: trends-{lang}-{keyword-slug}
   ↓
5. EXTRACT: Get comparison data
   mcp__playwright__playwright_get_visible_text
   OR check the chart visually from screenshot
   ↓
6. ANALYZE: Determine which term has highest interest
   ↓
7. DOCUMENT: Update keyword mapping JSON with results
```

### Example Playwright Workflow for Japanese Keywords

```javascript
// Step 1: Navigate to Google Trends Japan
mcp__playwright__playwright_navigate({
  url: "https://trends.google.com/trends/explore?geo=JP&q=AI%20イラスト生成,AI画像生成,画像生成AI",
  headless: false
})

// Step 2: Wait and Screenshot
mcp__playwright__playwright_screenshot({
  name: "trends-ja-ai-image-generator"
})

// Step 3: Extract visible text or evaluate
mcp__playwright__playwright_get_visible_text()
```

## Content Generation Guidelines

### Title Tag Formula

```
{Primary Keyword} - {Benefit/Feature} | {Brand}
```

**Examples by Language:**

| Language | Example |
|----------|---------|
| EN | AI Image Generator - Create Stunning Art Free \| MakeMyPic |
| JA | AI イラスト生成 - 無料で美しい画像を作成 \| MakeMyPic |
| KO | AI 이미지 생성기 - 무료로 멋진 이미지 만들기 \| MakeMyPic |
| DE | KI Bilder erstellen - Kostenlos beeindruckende Kunst \| MakeMyPic |

### Meta Description Formula

```
{Primary keyword}で{benefit}。{Feature list}、{CTA}。
```

**Character Limits by Language:**

| Language | Min | Max | Notes |
|----------|-----|-----|-------|
| EN | 140 | 160 | Standard |
| JA | 70 | 100 | Dense characters |
| KO | 70 | 110 | Efficient Hangul |
| DE | 150 | 170 | Compound words |
| ES | 145 | 165 | Similar to English |

### H1 Requirements

- Exactly ONE H1 per page
- **MUST contain primary keyword** (not just semantic variants)
- Primary keyword should appear naturally in the H1
- Can include additional descriptive text after/before the primary keyword
- Should be compelling and clear
- Different from title tag (but related)

**Examples:**

| Language | H1 Example |
|----------|------------|
| EN | Create Amazing AI Images in Seconds |
| JA | AIで美しいイラストを瞬時に生成 |
| KO | 몇 초 만에 놀라운 AI 이미지 만들기 |

### Keyword Density

Target: **2-3%** for primary keyword

For an 800-word page:
- Primary keyword: 16-24 occurrences
- Distribution:
  - Title: 1x (primary)
  - Meta description: 1x (primary)
  - H1: 1x (primary - REQUIRED)
  - H2s: 1-2x (primary) + 1-2x (semantic variants/long-tail)
  - H3s: 0-1x (primary) + mix of variants
  - Body paragraphs: 10-15x (30% primary, 40% semantic variants, 30% related terms)
  - Image alt text: 0-2x (natural inclusion, not forced)

## FAQ Section Guidelines

### Minimum Requirements
- 6-8 questions per page
- Questions should be localized (not just translated)
- Use FAQ schema markup

### FAQ Localization Strategy

**DON'T**: Directly translate English questions
**DO**: Research what local users actually ask

Example:

| English Question | Japanese (Localized) |
|-----------------|---------------------|
| What is an AI image generator? | AI イラスト生成とは何ですか？ |
| Is it free to use? | 無料で使えますか？登録は必要ですか？ |
| How long does it take? | 画像の生成にどのくらい時間がかかりますか？ |

### Finding Local Questions

1. Google autocomplete in target language
2. "People also ask" section
3. Competitor FAQ sections
4. Local forums/communities

## Image Alt Text Localization

### Format
```
{Action} + {Subject} + {Context} + {Keyword}
```

### Examples

| Language | Alt Text |
|----------|----------|
| EN | AI image generator creating a fantasy landscape from text prompt |
| JA | テキストプロンプトからファンタジー風景を生成するAIイラスト生成ツール |
| KO | 텍스트 프롬프트로 판타지 풍경을 생성하는 AI 이미지 생성기 |

## Internal Linking Strategy

### Per-Language Requirements
- 2-5 internal links per page
- Link to related localized pages (same language)
- Use keyword-rich anchor text

### Anchor Text Examples

| Language | Anchor Text | Target |
|----------|-------------|--------|
| JA | AI画像生成モデル一覧 | /ja/ai-image/models |
| JA | 無料で始める | /ja/pricing |
| KO | AI 이미지 생성 모델 | /ko/ai-image/models |
| KO | 무료로 시작하기 | /ko/pricing |

## Pre-Publish Checklist

### Content Quality
- [ ] All keywords validated via Google Trends (Playwright)
- [ ] Primary keyword in title (within char limit)
- [ ] Primary keyword in meta description
- [ ] Primary keyword in H1
- [ ] 800+ words of content
- [ ] 2-3% keyword density

### Technical SEO
- [ ] Proper hreflang tags (handled by framework)
- [ ] Clean URL with locale prefix (/ja/, /ko/)
- [ ] All images have localized alt text
- [ ] Internal links point to same-language pages

### Localization Quality
- [ ] Native-quality language (not machine translated)
- [ ] Culturally appropriate examples
- [ ] Local number/date formats
- [ ] Currency localized if applicable

## Validation Documentation

When validating keywords, document in the JSON:

```json
{
  "keyword": "AI イラスト生成",
  "validated": true,
  "validatedDate": "2026-01-15",
  "validationMethod": "google-trends-playwright",
  "comparedWith": ["AI画像生成", "画像生成AI"],
  "result": "2x higher interest than alternatives",
  "screenshotPath": "validation/trends-ja-ai-image-2026-01-15.png"
}
```
