# Phase 1: Research (研究)

## Step 1.0: ⛔ Load Validated Keywords (MANDATORY - DO NOT SKIP)

> **This is the CRITICAL first step. You MUST read the keyword file BEFORE any other action.**

```bash
# MANDATORY FIRST STEP - Read validated keyword data
Read: .claude/skills/i18n-seo-localizer/data/keywords-{locale}.json
# OR: .codex/skills/i18n-seo-localizer/data/keywords-{locale}.json (if using .codex)
```

**If file exists:**
1. ✅ Extract all relevant keywords for page topic
2. ✅ Use `primary` field for: Title, H1, Meta description
3. ✅ Use `alternatives` for: H2s, body content, FAQ
4. ✅ Skip redundant research for keywords already validated

**If file is missing:**
1. ⚠️ STOP - Do not proceed with guessed keywords
2. ⚠️ Alert: "Keyword file for {locale} is missing"
3. ⚠️ Action: Create keyword file first using cumulative SERP analysis
4. ⚠️ Reference: `.claude/skills/i18n-seo-localizer/references/00-keyword-research.md`

**Example - Reading keywords-zh.json:**
```json
// For "AI image generator" topic, find:
{
  "keywords": {
    "ai-image-generator": {
      "primary": "AI绘画",           // ← Use in Title, H1
      "alternatives": ["AI生成图片", "AI图片生成器"]  // ← Use in H2s, body
    }
  }
}
```

---

## Step 1.1: Read English Source
```bash
# Locate and read the English source file
Read: src/config/locale/messages/en/{page-path}.json
```

---

## Step 1.2: Map English Keywords to Validated Local Keywords

For each English keyword extracted from source:

| English Keyword | → Look up in keywords-{locale}.json | → Use validated keyword |
|-----------------|-------------------------------------|------------------------|
| AI image generator | `keywords.ai-image-generator.primary` | AI绘画 |
| image enhancer | `keywords.image-enhancer.primary` | 图片无损放大 |
| free | `commonPhrases.feature-free` | 免费 |

---

## Step 1.3: Identify Missing Keywords

Create a list of keywords NOT found in the keyword file:

```markdown
## Missing Keywords (need research)
- [ ] "new feature X" - not in keywords-{locale}.json
- [ ] "specific term Y" - not in keywords-{locale}.json
```

---

## Step 1.4: Research Missing Keywords ONLY

**Only for keywords NOT in the data file:**

1. Use cumulative SERP analysis (see i18n-seo-localizer/references/00-keyword-research.md)
2. Run 4-5 search queries per candidate
3. Analyze competitor titles
4. Add validated keyword to keywords-{locale}.json
5. Then use the newly validated keyword

**DO NOT:**
- ❌ Guess keywords based on Claude's knowledge
- ❌ Use direct translation
- ❌ Skip validation for "obvious" keywords
