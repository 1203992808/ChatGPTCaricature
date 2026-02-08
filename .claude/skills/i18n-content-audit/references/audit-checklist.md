# i18n Content Audit - Detailed Checklist

This document provides comprehensive checklists for content auditing.

---

## Pre-Audit Preparation

### Files to Read
```bash
# Target locale file (to audit)
src/config/locale/messages/{locale}/{page-path}.json

# English source (for comparison)
src/config/locale/messages/en/{page-path}.json

# Sitemap config (for lastmod check)
src/config/sitemap-config.ts
```

### Information to Gather
- [ ] Page URL path
- [ ] Target locale code
- [ ] Page type (landing, product, blog, etc.)
- [ ] Target audience
- [ ] Primary conversion goal

---

## Phase 1: Keyword Analysis Checklist

### Keyword Extraction
- [ ] Extract title keywords
- [ ] Extract description keywords
- [ ] Extract H1 keyword
- [ ] Extract H2/H3 keywords
- [ ] Extract CTA text
- [ ] Extract feature names
- [ ] Extract FAQ keywords

### Keyword Research
For each keyword:
- [ ] Search Google Trends for target locale
- [ ] Compare at least 2-3 alternative expressions
- [ ] Document search volume estimates
- [ ] Identify the highest-volume option
- [ ] Note if current keyword is optimal

### Keyword Gap Analysis Template
```markdown
| # | Current Keyword | Location | Volume | Best Alternative | Alt Volume | Action |
|---|----------------|----------|--------|-----------------|------------|--------|
| 1 | | Title | | | | |
| 2 | | Description | | | | |
| 3 | | H1 | | | | |
| 4 | | H2 | | | | |
| 5 | | CTA | | | | |
```

---

## Phase 2: Title & Description Audit Checklist

### Title Audit

**Basic Checks:**
- [ ] Title exists
- [ ] Title is not empty
- [ ] Title is unique (not duplicated from other pages)

**Length Check:**
| Language | Current Length | Target Range | Status |
|----------|---------------|--------------|--------|
| EN | ___ chars | 50-60 | ✅/❌ |
| ZH | ___ chars | 20-30 | ✅/❌ |
| JA | ___ chars | 25-35 | ✅/❌ |
| KO | ___ chars | 25-35 | ✅/❌ |
| European | ___ chars | 50-60 | ✅/❌ |

**Keyword Check:**
- [ ] Primary keyword present
- [ ] Keyword positioned in first 50% of title
- [ ] Keyword is highest-volume local expression
- [ ] Secondary keyword present (if space allows)

**Quality Check:**
- [ ] Reads naturally (not keyword-stuffed)
- [ ] No machine-translation feel
- [ ] Matches page content accurately
- [ ] Includes brand name (at end, if space allows)
- [ ] Format follows: `Primary | Secondary - Brand`

**Scoring:**
| Criterion | Weight | Score (0-10) | Weighted |
|-----------|--------|--------------|----------|
| Length | 10 | | |
| Primary Keyword | 15 | | |
| Keyword Position | 10 | | |
| Natural Expression | 15 | | |
| Topic Match | 15 | | |
| Uniqueness | 10 | | |
| Brand Presence | 5 | | |
| **Total** | **80** | | **/80** |

### Description Audit

**Basic Checks:**
- [ ] Description exists
- [ ] Description is not empty
- [ ] Description is unique

**Length Check:**
| Language | Current Length | Target Range | Status |
|----------|---------------|--------------|--------|
| EN | ___ chars | 150-160 | ✅/❌ |
| ZH | ___ chars | 70-80 | ✅/❌ |
| JA | ___ chars | 70-100 | ✅/❌ |
| KO | ___ chars | 70-100 | ✅/❌ |
| European | ___ chars | 150-160 | ✅/❌ |

**Content Check:**
- [ ] Primary keyword present
- [ ] Secondary keyword present
- [ ] Has call-to-action (CTA)
- [ ] Has unique value proposition
- [ ] Answers "what will user get?"

**Quality Check:**
- [ ] Reads naturally
- [ ] No machine-translation feel
- [ ] Compelling and engaging
- [ ] Matches page content
- [ ] GEO-friendly (can stand alone as answer)

**Scoring:**
| Criterion | Weight | Score (0-10) | Weighted |
|-----------|--------|--------------|----------|
| Length | 10 | | |
| Primary Keyword | 10 | | |
| Secondary Keyword | 5 | | |
| CTA Present | 15 | | |
| Value Proposition | 15 | | |
| Natural Expression | 15 | | |
| Topic Match | 10 | | |
| GEO-Friendly | 10 | | |
| **Total** | **90** | | **/90** |

---

## Phase 2: E-E-A-T Assessment Checklist

### Experience (Max: 7 points)

**Case Studies:**
- [ ] Contains at least one case study
- [ ] Case study has specific details (who, what, when)
- [ ] Case study shows measurable results
- [ ] Case study is relevant to topic

**Hands-on Examples:**
- [ ] Shows practical application
- [ ] Includes step-by-step guidance
- [ ] Contains real-world scenarios

**Personal Insights:**
- [ ] Shares lessons learned
- [ ] Includes tips from experience
- [ ] Mentions what doesn't work (failures)

**Score:** ___/7

### Expertise (Max: 7 points)

**Technical Accuracy:**
- [ ] Information is factually correct
- [ ] No outdated information
- [ ] Uses correct terminology
- [ ] Consistent with authoritative sources

**Credentials:**
- [ ] Author/company credentials mentioned
- [ ] Relevant experience stated
- [ ] Professional qualifications shown

**Content Depth:**
- [ ] Goes beyond surface-level
- [ ] Covers nuances and edge cases
- [ ] Provides comprehensive coverage

**Score:** ___/7

### Authoritativeness (Max: 7 points)

**External Citations:**
- [ ] Cites authoritative sources
- [ ] Links to research/studies
- [ ] References industry standards
- Count: ___ citations

**Unique Value:**
- [ ] Contains original data/research
- [ ] Offers unique perspective
- [ ] Has proprietary insights

**Recognition:**
- [ ] Mentions awards/recognition
- [ ] Shows customer testimonials
- [ ] Displays trust badges

**Score:** ___/7

### Trustworthiness (Max: 6 points)

**Freshness:**
- [ ] Update date displayed
- [ ] Content is current (within 6 months)
- [ ] No outdated statistics

**Transparency:**
- [ ] Sources are cited
- [ ] Distinguishes fact from opinion
- [ ] Acknowledges limitations

**Contact:**
- [ ] Contact information available
- [ ] About page exists
- [ ] Privacy policy present

**Score:** ___/6

### E-E-A-T Total: ___/27 (Target: ≥18)

---

## Phase 2: GEO Assessment Checklist

### Clear Definitions (Max: 5 points)
- [ ] Key terms are defined
- [ ] Definitions are 40-60 words
- [ ] Definitions can stand alone as answers
- [ ] Definitions use "[Term] is..." format
**Score:** ___/5

### Quotable Statements (Max: 5 points)
- [ ] Contains specific statistics
- [ ] Statistics have sources cited
- [ ] Statements are memorable
- [ ] Can be quoted independently
**Score:** ___/5

### Factual Density (Max: 5 points)
- [ ] High fact-to-opinion ratio
- [ ] Specific numbers used
- [ ] Dates and timeframes included
- [ ] Verifiable claims
**Score:** ___/5

### Source Citations (Max: 5 points)
- [ ] Sources are authoritative
- [ ] Citations are verifiable
- [ ] Multiple sources used
- [ ] Recent sources (within 2 years)
**Score:** ___/5

### Q&A Format (Max: 5 points)
- [ ] FAQ section exists
- [ ] Questions match user queries
- [ ] Answers are direct (40-60 words)
- [ ] Covers common questions
**Score:** ___/5

### Authority Signals (Max: 5 points)
- [ ] Expert quotes present
- [ ] Credentials mentioned
- [ ] Third-party validation
- [ ] Industry recognition
**Score:** ___/5

### Content Freshness (Max: 5 points)
- [ ] Recent data (within 1 year)
- [ ] Update date shown
- [ ] Current trends mentioned
- [ ] No outdated information
**Score:** ___/5

### Structure Clarity (Max: 5 points)
- [ ] Clear heading hierarchy
- [ ] Logical content flow
- [ ] Easy to scan
- [ ] Uses lists and tables
**Score:** ___/5

### GEO Total: ___/40 (Target: ≥30)

---

## Phase 2: Word Count & Keyword Density Checklist

### Word Count Check
| Language | Current | Minimum | Optimal | Status |
|----------|---------|---------|---------|--------|
| EN | ___ words | 800 | 1000-1500 | ✅/❌ |
| ZH | ___ words | 500 | 700-1000 | ✅/❌ |
| JA | ___ words | 600 | 800-1200 | ✅/❌ |
| KO | ___ words | 600 | 800-1200 | ✅/❌ |
| European | ___ words | 800 | 1000-1500 | ✅/❌ |

### Keyword Density Check
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Primary keyword count | ___ | 16-24 (per 800 words) | ✅/❌ |
| Primary keyword density | ___% | 2-3% | ✅/❌ |
| Stuffing check | ___% | < 4% | ✅/❌ |

### Keyword Distribution Check
- [ ] Title: 1x primary keyword
- [ ] Meta description: 1x primary keyword
- [ ] H1: 1x primary keyword (REQUIRED - not just semantic variants)
- [ ] H2s: 1-2x primary + 1-2x semantic variants/long-tail (diversified, not all primary)
- [ ] H3s: 0-1x primary + mix of variants (more diversified than H2s)
- [ ] Body paragraphs: 10-15x total (30% primary, 40% semantic variants, 30% related terms)
- [ ] Image alt text: 0-2x keywords (natural inclusion, not forced)

### Calculation Reference
```
Keyword Density = (keyword count / total words) × 100

For 800-word EN page:
- 2% = 16 occurrences
- 2.5% = 20 occurrences
- 3% = 24 occurrences
```

---

## Phase 2: Seven Sweeps Checklist

### Sweep 1: Clarity
- [ ] Every sentence immediately understandable
- [ ] No jargon without explanation
- [ ] Pronouns have clear references
- [ ] No run-on sentences
- [ ] No ambiguous statements
**Result:** PASS / FAIL

### Sweep 2: Voice & Tone
- [ ] Consistent formality level
- [ ] Brand personality maintained
- [ ] No jarring shifts in mood
- [ ] Reads well aloud
- [ ] Appropriate for target audience
**Result:** PASS / FAIL

### Sweep 3: So What
- [ ] Every feature connects to benefit
- [ ] Claims answer "why should I care?"
- [ ] Benefits connect to real desires
- [ ] No empty superlatives
- [ ] Value is clear
**Result:** PASS / FAIL

### Sweep 4: Prove It
- [ ] Claims are substantiated
- [ ] Social proof is specific
- [ ] Numbers have sources
- [ ] Testimonials are attributed
- [ ] No unearned "best" or "leading"
**Result:** PASS / FAIL

### Sweep 5: Specificity
- [ ] Vague words replaced with concrete
- [ ] Numbers and timeframes included
- [ ] Examples are specific
- [ ] No filler content
- [ ] Details make it real
**Result:** PASS / FAIL

### Sweep 6: Heightened Emotion
- [ ] Copy evokes feeling
- [ ] Pain points feel real
- [ ] Aspirations feel achievable
- [ ] Emotional texture present
- [ ] Not manipulative
**Result:** PASS / FAIL

### Sweep 7: Zero Risk
- [ ] Objections addressed
- [ ] Trust signals near CTA
- [ ] Guarantees mentioned
- [ ] Next steps crystal clear
- [ ] No hidden costs/surprises
**Result:** PASS / FAIL

### Seven Sweeps Total: ___/7 passed

---

## Phase 2: Content Exclusion Check

### Forbidden Elements
| Element | Location | Status | Action |
|---------|----------|--------|--------|
| `metadata.keywords` | metadata section | Present/Absent | Remove if present |
| `footer.friendLinks` | footer section | Present/Absent | Remove if present |
| `sections.backlinks` | any section | Present/Absent | Remove if present |
| External link exchanges | any location | Present/Absent | Remove if present |

---

## Phase 3: Report Generation Checklist

### Report Sections to Include
- [ ] Executive Summary with scores
- [ ] Keyword Analysis table
- [ ] Title & Description audit
- [ ] E-E-A-T breakdown
- [ ] GEO score breakdown
- [ ] Seven Sweeps results
- [ ] Content exclusion check
- [ ] Prioritized action items
- [ ] Recommended rewrites
- [ ] English comparison
- [ ] Implementation guide

### Score Summary Template
```markdown
| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| SEO Score | /100 | ≥80 | |
| E-E-A-T | /27 | ≥18 | |
| GEO | /40 | ≥30 | |
| Seven Sweeps | /7 | 7/7 | |
| Title | /70 | ≥50 | |
| Description | /70 | ≥50 | |
```

### Grade Calculation
| Overall Score | Grade |
|--------------|-------|
| 90-100% | A |
| 80-89% | B |
| 70-79% | C |
| 60-69% | D |
| <60% | F |

---

## Phase 4: Recommendations Checklist

### For Each Recommendation:
- [ ] Identified the specific issue
- [ ] Explained why it's a problem
- [ ] Provided the specific fix
- [ ] Included before/after example
- [ ] Assigned priority (Critical/Important/Nice-to-have)
- [ ] Estimated impact

### Recommendation Priority Levels
| Priority | Criteria | Timeline |
|----------|----------|----------|
| 🔴 Critical | Significantly hurts SEO/GEO | Immediate |
| 🟡 Important | Notable improvement opportunity | This week |
| 🟢 Nice-to-have | Minor enhancement | When possible |

### Implementation Guidance
- [ ] Specific file path provided
- [ ] Exact JSON changes shown
- [ ] Sitemap update reminder included
- [ ] Build/test instructions included
- [ ] Re-audit reminder included

---

## Post-Audit Actions

After delivering the report:
1. [ ] User reviews recommendations
2. [ ] User implements priority changes
3. [ ] User updates sitemap-config.ts
4. [ ] User runs `pnpm build`
5. [ ] User tests page visually
6. [ ] Re-run audit to verify improvements
