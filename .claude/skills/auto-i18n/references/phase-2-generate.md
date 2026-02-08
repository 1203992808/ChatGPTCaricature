# Phase 2: Generate (生成)

## Step 2.0: ⚡ Pre-Generation Commitment (生成前承诺)

**BEFORE generating any content, you MUST complete this checklist:**

```markdown
## 🚨 Pre-Generation Checklist

I am about to generate content for {locale} market.

Before I start, I commit to the following rules:

### Heading Structure (MANDATORY - One-vote veto)
- [ ] H1: Will include primary keyword "{primary_keyword}"
      Example: "{primary_keyword} - description"
- [ ] H2: Will generate 2-4 H2s with keywords
      Distribution: primary ≤ 50%, rest = semantic variants
- [ ] H3: If generated, primary ≤ 30%

### Keyword Usage
- [ ] Keyword pool:
      - Primary: {primary_keyword} (30% frequency)
      - Semantic variants: {semanticVariants} (40%)
      - Related terms: {relatedTerms} (30%)
- [ ] Distribution rules:
      - Max 1 primary per paragraph
      - Spacing ≥ 50 chars (CN) / 200 chars (EN)
      - No "X的X" patterns

I have read and understood these rules. Ready to generate.
```

---

## Step 2.1: Generate Heading Outline FIRST

**DO NOT generate full content yet! Start with headings only:**

```markdown
Step 1: Generate headings structure
├─ H1 (1): Must contain "{primary_keyword}"
├─ H2 (2-4): At least 2 with keywords, primary ≤ 50%
└─ H3 (0-6): Optional, primary ≤ 30%

Step 2: Self-verify headings
✅ Does H1 contain "{primary_keyword}"?
✅ Do 2-4 H2s contain keywords?
✅ Is H2 primary ratio ≤ 50%?

If ANY check fails ❌:
→ Fix headings immediately
→ Do NOT proceed to body content

If all checks pass ✅:
→ Continue to Step 2.2
```

**Example - Correct Heading Structure:**
```json
{
  "h1": "AI绘画 - 智能图像生成工具", // ✅ Contains primary
  "sections": [
    {"h2": "AI绘画的核心功能"},      // ✅ Primary (1/4 = 25%)
    {"h2": "智能图像生成的使用方法"}, // ✅ Semantic variant
    {"h2": "数字艺术创作的应用"},     // ✅ Related term
    {"h2": "免费AI绘画工具选择"}      // ✅ Long-tail
  ]
}

Verification:
- H1 has primary? ✅
- H2 with keywords: 4/4 ✅
- H2 primary count: 1 (25%) ✅
- PASS → Continue to body generation
```

---

## Step 2.2: Content Generation (Based on verified headings)
**Use Skills:** `/ai-content-creator` + `/copywriting`

Now that headings are verified, generate body content:
- Title (with validated keywords)
- Description (with CTA and value proposition)
- Body text (follow verified heading structure)
- FAQ content
- Button/CTA text

**Requirements:**
- Use validated local keywords (NOT direct translation)
- Maintain brand voice consistency
- Adapt to local cultural context
- Follow E-E-A-T principles
- Follow verified heading structure from Step 2.1

---

## Step 2.3: GEO Optimization
**Use Skill:** `/geo-content-optimizer`

Optimize for AI citation:
- Clear definitions (40-60 words)
- Quotable statements with data
- Q&A format sections
- Authority signals

---

## Step 2.4: Create JSON File
**Use Skill:** `/shipany-page-builder`

Create the locale JSON file:
```bash
Write: src/config/locale/messages/{locale}/{page-path}.json
```

**Structure must match English version exactly:**
- Same keys
- Same nesting
- Placeholders preserved (e.g., {count}, {name})

**Content Exclusions (IMPORTANT):**
- ❌ Do NOT include `metadata.keywords` field
- ❌ Do NOT include `footer.friendLinks` section
- ❌ Do NOT include any backlinks/friend links sections

---

## Step 2.5: Self-Verify Content

Verify paragraph keyword usage (≤ 1 primary per paragraph)
Verify keyword spacing (≥ 50 chars/200 chars)
Verify no stuffing patterns ("X的X", "X是X")
