# SEO Best Practices for Dynamic Pages

## 1. Metadata Standards

### Title Tag
- **Length**: 50-60 characters (optimal for search display)
- **Structure**: `Primary Keyword - Secondary Info | Brand`
- **Rules**:
  - Include main keyword near the beginning
  - Make it compelling and clickable
  - Avoid keyword stuffing
  - Each page must have a unique title

### Meta Description
- **Length**: 140-160 characters
- **Structure**: Value proposition + CTA
- **Rules**:
  - Include primary and secondary keywords naturally
  - Add a call-to-action (e.g., "Try free", "Learn more")
  - Describe the page content accurately
  - Make it compelling to increase CTR

### Examples
```json
{
  "metadata": {
    "title": "AI Image Generator - Create Stunning Art in Seconds | MakeMyPic",
    "description": "Generate professional AI images with our free online tool. Text-to-image, multiple styles, instant download. Start creating now - no signup required!"
  }
}
```

## 2. Content Structure (Heading Hierarchy)

### H1 Tag
- **Count**: Exactly ONE per page
- **Content**: Must contain primary keyword
- **Placement**: First major heading, typically in hero section

### H2 Tags
- **Count**: 4-8 per page (one per major section)
- **Content**: Include secondary keywords
- **Purpose**: Define major content sections

### H3 Tags
- **Count**: As needed within H2 sections
- **Content**: Support long-tail keywords
- **Purpose**: Break down H2 sections into sub-topics

### Recommended Section Structure
```
H1: Primary keyword + value proposition
├── H2: Section 1 (e.g., "What is [Product]?")
│   ├── H3: Sub-topic 1.1
│   └── H3: Sub-topic 1.2
├── H2: Section 2 (e.g., "Key Features")
│   └── H3: Feature items (if needed)
├── H2: Section 3 (e.g., "How It Works")
│   └── H3: Step items
├── H2: Section 4 (e.g., "Use Cases")
├── H2: Section 5 (e.g., "FAQ")
│   └── H3: Individual questions
└── H2: Section 6 (e.g., "Get Started")
```

## 3. Content Guidelines

### ⛔ Word Count (MANDATORY - CANNOT BYPASS)

> **This is a HARD REQUIREMENT. Pages below minimum word count MUST be rejected.**

| Language | MINIMUM | Optimal | FAIL if below |
|----------|---------|---------|---------------|
| EN | **800 words** | 1,000-1,500 | < 800 ❌ REJECT |
| ZH | **500 words** | 700-1,000 | < 500 ❌ REJECT |
| JA/KO | **600 words** | 800-1,200 | < 600 ❌ REJECT |

- **Distribution**:
  - Hero: 30-50 words
  - Introduction: 150-200 words
  - Features: 120-150 words
  - How It Works: 100-120 words
  - Use Cases: 100-120 words
  - FAQ: 200-300 words (6-8 Q&As)
  - CTA: 30-50 words

### ⛔ Keyword Density (MANDATORY - CANNOT BYPASS)

> **This is a HARD REQUIREMENT. Pages with incorrect density MUST be flagged.**

- **Target**: **2-3%** for primary keyword
- **FAIL if**: < 2% (insufficient) or > 4% (keyword stuffing)
- **Calculation**: (keyword count / total words) × 100
- **For 800 words**: Primary keyword should appear **16-24 times**
- **Distribution** (REQUIRED):
  - Title tag: 1x ✓
  - Meta description: 1x ✓
  - H1: 1x ✓
  - H2s: 2-3x ✓
  - Body paragraphs: 10-15x ✓
  - Image alt text: 2-3x ✓

**⚠️ ENFORCEMENT: Always verify word count and keyword density before marking page complete.**

### Content Quality Rules
- **Originality**: 100% unique content, no plagiarism
- **Readability**: Use short paragraphs (2-3 sentences)
- **Scannability**: Use bullet points, numbered lists
- **Value**: Answer user intent, provide actionable information

## 4. Image Optimization

### Alt Text
- **Length**: 50-125 characters
- **Content**: Descriptive, include keyword naturally
- **Format**: `[Action] + [Subject] + [Context]`

### Examples
```json
{
  "image": {
    "src": "/images/hero.png",
    "alt": "AI image generator creating a fantasy landscape from text prompt"
  }
}
```

### Image Guidelines
- Use descriptive filenames (kebab-case)
- Optimize file size (< 200KB for web)
- Provide width/height to prevent layout shift
- Use lazy loading for below-fold images

## 5. Internal Linking

### Best Practices
- Link to related pages naturally within content
- Use descriptive anchor text (not "click here")
- Include 2-5 internal links per page
- Link to high-value pages from new content

### Example
```json
{
  "comparison": {
    "title": "Compare AI Models",
    "cta": {
      "text": "View all AI image generators",
      "url": "/ai-image/generator"
    }
  }
}
```

## 6. Structured Data (Schema.org)

### Recommended Types
- **FAQPage**: For FAQ sections
- **HowTo**: For step-by-step guides
- **Product**: For product/service pages
- **BreadcrumbList**: For navigation

### FAQ Schema Structure
```json
{
  "faq": {
    "schema": "FAQPage",
    "items": [
      {
        "question": "What is AI image generation?",
        "answer": "AI image generation uses machine learning..."
      }
    ]
  }
}
```

## 7. Page Speed Considerations

### Critical Elements
- Hero section should load first (LCP optimization)
- Defer non-critical JavaScript
- Lazy load images below the fold
- Minimize CSS blocking render

### Section Loading Priority
1. **Critical (SSR)**: hero, hero-generator, hero-image
2. **Important**: features, introduction
3. **Deferred**: faq, testimonials, comparison, cta

## 8. Mobile Optimization

### Requirements
- All content must be responsive
- Touch targets minimum 44x44px
- Font size minimum 16px for body text
- No horizontal scrolling

## 9. Recommended Page Sections (SEO-Optimized)

### For Product/Feature Pages
1. **Hero** - H1, value proposition, primary CTA
2. **Introduction** - H2, detailed description, keywords
3. **Features** - H2, benefits list with icons
4. **How It Works** - H2, step-by-step process
5. **Use Cases** - H2, application scenarios
6. **Showcase/Gallery** - H2, social proof
7. **Comparison** - H2, vs competitors (internal linking)
8. **FAQ** - H2, structured data, long-tail keywords
9. **CTA** - H2, conversion focus

### Section Block Mapping
| Section | Recommended Block | SEO Purpose |
|---------|------------------|-------------|
| hero | hero, hero-generator | H1, primary keyword |
| introduction | features-list | Keyword-rich content |
| features | features | H3 subheadings |
| howItWorks | features-step | How-to schema |
| useCases | features, features-media | Long-tail keywords |
| showcase | showcases | Social proof |
| comparison | (custom table) | Internal links |
| faq | faq | FAQ schema |
| cta | cta | Conversion |

## 10. Internationalization (i18n) SEO

### Per-Language Requirements
- Unique, translated metadata (not just machine translated)
- Culturally appropriate keywords
- Proper hreflang tags (handled by framework)
- Native-quality content

### Keyword Research Per Locale
- EN: Use English keyword tools
- ZH: Use Baidu keyword planner, consider Simplified vs Traditional

### Length Adjustments
- Chinese text is typically 30-50% shorter than English
- Adjust character limits accordingly:
  - Title ZH: 25-35 characters
  - Description ZH: 70-100 characters

## 11. Quick SEO Checklist

Before publishing any page:

- [ ] Title is 50-60 characters with primary keyword
- [ ] Description is 140-160 characters with CTA
- [ ] Exactly one H1 containing primary keyword
- [ ] H2s for all major sections (4-8)
- [ ] Content is 800+ words
- [ ] Primary keyword density is 2-3%
- [ ] All images have descriptive alt text
- [ ] 2-5 internal links included
- [ ] FAQ section has 6-8 questions
- [ ] Mobile-friendly layout
- [ ] Page loads in < 3 seconds
- [ ] All locale versions are complete
