# Keyword Template

Complete template and field specifications for keywords-{locale}.json files.

## File Structure

```json
{
  "locale": "zh",
  "localeName": "Simplified Chinese",
  "description": "Brief market characteristics",
  "lastUpdated": "2026-02-06",
  "researchNotes": "Market-specific notes",
  "characterLimits": {
    "title": { "min": 20, "max": 30 },
    "description": { "min": 50, "max": 80 }
  },
  "keywords": {
    "keyword-id": { /* keyword entry */ }
  },
  "commonPhrases": { /* locale-specific CTAs */ },
  "seoTemplates": { /* SEO templates */ },
  "culturalNotes": { /* cultural considerations */ },
  "modelKeywords": { /* model-specific keywords */ }
}
```

---

## Keyword Entry Structure

### Complete Example

```json
{
  "ai-image-generator": {
    // ===== BASIC FIELDS (Required) =====
    "source": "AI image generator",
    "primary": "AI绘画",
    "alternatives": ["AI生成图片", "AI图片生成器", "AI画图"],
    "reasoning": "根据多维度验证（2026-02-06）：百度 Autocomplete 排名第1，Top 30 中 Tier 1 采用率80%，百度指数日均 15k 搜索量，符合中国用户口语化表达习惯",
    "searchVolume": "very-high",
    "validationMethod": "multi-dimensional-5-metric",
    "validated": true,
    "validatedDate": "2026-02-06",

    // ===== EXTENDED FIELDS (Required - prevent keyword stuffing) =====
    "semanticVariants": [
      "智能绘画",
      "智能图像生成",
      "AI艺术创作",
      "AI辅助绘画",
      "智能画图工具"
    ],
    "relatedTerms": [
      "图像生成",
      "AI创作",
      "数字艺术",
      "智能设计",
      "图片制作"
    ],
    "longTail": [
      "免费AI绘画工具",
      "在线AI绘画生成器",
      "AI绘画软件推荐",
      "如何使用AI绘画",
      "最好的AI绘画平台"
    ],
    "usageGuidelines": {
      "title": {
        "maxOccurrences": 1,
        "preferredTerms": ["primary"]
      },
      "h1": {
        "maxOccurrences": 1,
        "preferredTerms": ["primary", "semanticVariants"]
      },
      "h2": {
        "maxOccurrences": 3,
        "preferredTerms": ["alternatives", "semanticVariants", "longTail"],
        "mustUseVariants": true
      },
      "body": {
        "strategy": "diverse",
        "distribution": {
          "primary": "30%",
          "semanticVariants": "40%",
          "relatedTerms": "30%"
        },
        "paragraphRule": "同段落主词最多1次",
        "spacing": "每次出现间隔≥50字"
      },
      "alt": {
        "maxOccurrences": 1,
        "preferredTerms": ["semanticVariants", "relatedTerms"],
        "required": false
      }
    },
    "antiPatterns": [
      "AI绘画是一款强大的AI绘画工具，使用AI绘画可以快速生成AI绘画作品",
      "我们的AI绘画平台提供AI绘画服务，让AI绘画变得简单",
      "AI绘画AI绘画AI绘画"
    ],
    "goodExamples": [
      "AI绘画是一款智能图像生成工具，通过深度学习技术辅助创作，让艺术创作变得更加简单",
      "我们的平台提供专业的智能绘画服务，结合先进的AI技术，帮助您快速实现创意构想",
      "这款图像生成工具采用先进的人工智能算法，为用户提供高质量的AI艺术创作体验"
    ],

    // ===== VALIDATION FIELDS (Multi-Dimensional Scoring) =====
    "searchEngine": "baidu",
    "searchEngineMarket": "中国大陆",
    "validationScores": {
      "resultsVolume": 15,
      "top30Analysis": 27,
      "autocomplete": 18.3,
      "relatedSearches": 20,
      "naturalness": 5,
      "tierConsistency": 10,
      "total": 95.3
    }
  }
}
```

---

## Field Specifications

### Basic Fields (Required)

#### source
- **Type**: string
- **Description**: Original English keyword
- **Example**: "AI image generator"

#### primary
- **Type**: string
- **Description**: Main keyword with highest search volume
- **How to determine**: Google Trends validation + WebSearch analysis
- **Example**: "AI绘画"

#### alternatives
- **Type**: array of strings (2-4 items)
- **Description**: Other high-volume keywords in descending order
- **Example**: ["AI生成图片", "AI图片生成器", "AI画图"]

#### reasoning
- **Type**: string
- **Description**: Why this keyword was selected
- **Must include**:
  - Validation method reference
  - Search volume insight
  - Cultural/linguistic rationale
- **Example**: "根据 Google Trends 验证数据（2026-02-06），'AI绘画'搜索量最高（100），符合中国用户口语化表达习惯，竞争对手网站普遍使用"

#### searchVolume
- **Type**: enum
- **Values**: "very-high" | "high" | "medium" | "low"
- **How to determine**: Based on WebSearch results count and Google Trends data

#### validationMethod
- **Type**: enum
- **Values**:
  - "multi-dimensional-5-metric" - Full 5-metric validation (recommended)
  - "websearch-autocomplete" - WebSearch + Autocomplete only
  - "competitor-analysis" - Based on competitor usage
  - "baidu-index" - Baidu Index data (for Chinese markets)
  - "naver-datalab" - Naver DataLab data (for Korean markets)
  - "yandex-wordstat" - Yandex Wordstat data (for Russian markets)

#### validated
- **Type**: boolean
- **Description**: Whether keyword is fully validated
- **true when**: Multi-dimensional validation completed with sufficient confidence
- **false when**: Only partial validation (e.g., WebSearch only)

#### validatedDate
- **Type**: string (YYYY-MM-DD)
- **Description**: Date of validation
- **Example**: "2026-02-06"

---

### Extended Fields (Required - Prevent Keyword Stuffing)

**⚠️ CRITICAL**: These fields are REQUIRED, not optional. Missing these fields causes keyword stuffing in generated content.

#### semanticVariants
- **Type**: array of strings (5+ items)
- **Purpose**: Provide natural alternative expressions for primary keyword
- **How to research**:
  1. Search "{primary} 同义词" or "{primary} synonym"
  2. Analyze how competitors express same concept
  3. Check Wikipedia for different phrasings
  4. Use synonym dictionaries
- **Example**: ["智能绘画", "智能图像生成", "AI艺术创作", "AI辅助绘画", "智能画图工具"]

#### relatedTerms
- **Type**: array of strings (5+ items)
- **Purpose**: Provide contextually rich related vocabulary
- **How to research**:
  1. Scrape top 10 ranking pages
  2. Run TF-IDF analysis
  3. Extract high-frequency co-occurring terms
  4. Select semantically related but not duplicate
- **Example**: ["图像生成", "AI创作", "数字艺术", "智能设计", "图片制作"]

#### longTail
- **Type**: array of strings (5+ items)
- **Purpose**: For H2 headings and FAQ questions
- **How to research**:
  1. Google autocomplete suggestions
  2. "People Also Search For" section
  3. Answer The Public tool
  4. Competitor H2 heading analysis
- **Example**: ["免费AI绘画工具", "在线AI绘画生成器", "如何使用AI绘画"]

#### usageGuidelines
- **Type**: object
- **Purpose**: Detailed keyword usage rules for each content section
- **Structure**: See complete example above
- **Key sections**:
  - `title`: Max 1 occurrence, use primary only
  - `h1`: Max 1 occurrence, primary or semanticVariants
  - `h2`: Max 3 occurrences, must use variants
  - `body`: Diverse strategy with distribution percentages
  - `alt`: Image alt text rules

#### antiPatterns
- **Type**: array of strings (3-5 items)
- **Purpose**: Show AI what NOT to write (keyword stuffing examples)
- **Examples**:
  - "AI绘画是一款强大的AI绘画工具，使用AI绘画可以..."
  - "AI绘画AI绘画AI绘画"
  - Repetitive, unnatural phrases

#### goodExamples
- **Type**: array of strings (3-5 items)
- **Purpose**: Show AI high-quality natural writing
- **Requirements**:
  - Natural flow
  - Appropriate keyword density
  - Diverse vocabulary
- **Example**: "AI绘画是一款智能图像生成工具，通过深度学习技术辅助创作..."

---

### Validation Fields (Multi-Dimensional Scoring)

#### searchEngine
- **Type**: string
- **Description**: Search engine used for validation
- **Example**: "baidu", "google-tw", "naver", "yandex", "google-jp"
- **Required**: Yes (always specify which engine was used)

#### searchEngineMarket
- **Type**: string
- **Description**: Human-readable market name
- **Example**: "中国大陆", "台湾", "韩国", "日本"
- **Required**: Yes

#### validationScores
- **Type**: object (optional but recommended)
- **Description**: Detailed scores from 5-metric validation
- **Example**:
  ```json
  {
    "resultsVolume": 15,
    "top30Analysis": 20.7,
    "autocomplete": 18.3,
    "relatedSearches": 20,
    "naturalness": 5,
    "tierConsistency": 10,
    "total": 89
  }
  ```
- **Only include when**: Using multi-dimensional-5-metric validation method

---

## File-Level Fields

### characterLimits
- **Type**: object
- **Purpose**: Language-specific character count limits for SEO
- **Example**:
  ```json
  {
    "title": { "min": 20, "max": 30 },
    "description": { "min": 50, "max": 80 }
  }
  ```
- **Varies by language**:
  - **Chinese/Japanese**: Lower counts (CJK characters denser)
  - **German**: Higher counts (compound words longer)

### commonPhrases
- **Type**: object
- **Purpose**: Locale-specific CTA and UI phrases
- **Example**:
  ```json
  {
    "cta-try-free": "免费试用",
    "cta-start-creating": "开始创作",
    "cta-sign-up": "立即注册"
  }
  ```

### seoTemplates
- **Type**: object
- **Purpose**: Locale-specific SEO title/description templates
- **Example**:
  ```json
  {
    "title": "{primary} - {feature} | {brand}",
    "description": "{primary}，{benefit}。{feature}，{cta}。"
  }
  ```

### culturalNotes
- **Type**: object
- **Purpose**: Important cultural considerations for this locale
- **Example**:
  ```json
  {
    "key-insight": "中国用户偏好简洁口语化表达，避免过于技术化术语",
    "color-preference": "红色寓意吉祥，绿色需谨慎使用",
    "number-superstition": "避免数字4（谐音'死'），偏好8（'发'）"
  }
  ```

### modelKeywords
- **Type**: object
- **Purpose**: Model-specific keyword variations
- **Example**:
  ```json
  {
    "gpt-image": {
      "primary": "GPT-4o图像生成",
      "alternatives": ["ChatGPT画图", "GPT绘画"],
      "localizedFeatures": ["完美文字渲染", "自然语言描述"]
    }
  }
  ```

---

## Validation Checklist

Before finalizing keywords-{locale}.json, ensure:

### Basic Fields
- [ ] All required basic fields present
- [ ] `primary` is highest-volume keyword
- [ ] `alternatives` in descending order (2-4 items)
- [ ] `reasoning` includes validation method and rationale
- [ ] `validatedDate` is current (YYYY-MM-DD format)

### Extended Fields
- [ ] `semanticVariants` has 5+ items
- [ ] `relatedTerms` has 5+ items
- [ ] `longTail` has 5+ items
- [ ] `usageGuidelines` complete with all sections
- [ ] `antiPatterns` has 3-5 clear examples
- [ ] `goodExamples` has 3-5 natural examples

### Validation Fields
- [ ] `searchEngine` specified (e.g., "baidu", "google-tw")
- [ ] `searchEngineMarket` human-readable market name
- [ ] `validationScores` present if using 5-metric method
- [ ] `validationMethod` matches actual process
- [ ] `validated` is true (or false with explanation)

### File-Level
- [ ] `characterLimits` appropriate for language
- [ ] `commonPhrases` include key CTAs
- [ ] `culturalNotes` capture important insights

---

## Quick Templates

### Minimal Entry (for rapid prototyping)

```json
{
  "keyword-id": {
    "source": "English term",
    "primary": "主词",
    "alternatives": ["备选1", "备选2"],
    "reasoning": "Based on...",
    "validated": false,
    "validationMethod": "websearch-only",
    "validatedDate": "2026-02-06"
  }
}
```

**⚠️ Warning**: Minimal entries should be upgraded to full entries before content generation to prevent keyword stuffing.

### Full Production Entry

Use complete example at top of this document.

---

## Common Mistakes

### ❌ Don't Do This

```json
{
  "primary": "AI图像生成器",  // ❌ Literal translation
  "alternatives": [],          // ❌ Empty alternatives
  "validated": true,           // ❌ False claim
  "validationMethod": "guess"  // ❌ Invalid method
  // ❌ Missing extended fields
}
```

### ✅ Do This

```json
{
  "primary": "AI绘画",           // ✅ Researched local term
  "alternatives": ["AI生成图片"], // ✅ Multiple alternatives
  "validated": true,             // ✅ Actually validated
  "validationMethod": "multi-dimensional-5-metric",
  "searchEngine": "baidu",       // ✅ Correct search engine
  "searchEngineMarket": "中国大陆",
  "semanticVariants": [...],     // ✅ All extended fields
  "relatedTerms": [...],
  "longTail": [...]
}
```
