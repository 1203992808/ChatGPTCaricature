# Phase 4: Recommend (优化建议)

## Step 4.1: Generate Specific Rewrites
Based on audit findings, generate:
- Optimized title (with validated keywords)
- Optimized description (with CTA and value prop)
- Section-by-section improvements
- FAQ optimizations

## Step 4.2: Provide Implementation Guidance
```markdown
## Implementation Guide

### File to Modify
`src/config/locale/messages/{locale}/{page-path}.json`

### Changes Required

#### 1. Metadata Updates
```json
{
  "metadata": {
    "title": "{new optimized title}",
    "description": "{new optimized description}"
  }
}
```

#### 2. Content Updates
{specific JSON paths and new values}

#### 3. Sitemap Update
File: `src/config/sitemap-config.ts`
Add: `{locale}: '{today-date}'` to localeLastmod
```

## Step 4.3: Estimate Impact
```markdown
## Expected Impact

| Metric | Current | Expected After | Improvement |
|--------|---------|----------------|-------------|
| SEO Score | {x}/100 | {x}/100 | +{x} |
| E-E-A-T Score | {x}/27 | {x}/27 | +{x} |
| GEO Score | {x}/40 | {x}/40 | +{x} |
| Keyword Relevance | {x}% | {x}% | +{x}% |
```
