# i18n Content Audit - Scoring Guide

This document defines how to calculate scores for each audit dimension.

---

## Overall SEO Score (0-100)

The overall SEO score is a weighted average of multiple factors:

| Factor | Weight | Max Points |
|--------|--------|------------|
| Title Quality | 15% | 15 |
| Description Quality | 15% | 15 |
| Keyword Optimization | 20% | 20 |
| Content Structure | 15% | 15 |
| E-E-A-T Score | 20% | 20 |
| GEO Score | 15% | 15 |
| **Total** | **100%** | **100** |

### Calculation
```
SEO Score = (Title × 0.15) + (Description × 0.15) + (Keywords × 0.20) +
            (Structure × 0.15) + (EEAT × 0.20) + (GEO × 0.15)
```

### Grade Thresholds
| Score | Grade | Interpretation |
|-------|-------|----------------|
| 90-100 | A | Excellent - Minor tweaks only |
| 80-89 | B | Good - Some optimization needed |
| 70-79 | C | Average - Significant improvements needed |
| 60-69 | D | Below Average - Major overhaul needed |
| <60 | F | Poor - Complete rewrite recommended |

---

## Title Quality Score (0-70)

### Scoring Rubric

| Criterion | Points | How to Score |
|-----------|--------|--------------|
| **Length** | 0-10 | |
| - Within optimal range | 10 | Perfect length for language |
| - Within acceptable range | 7 | Slightly short/long |
| - Too short (<50% of target) | 3 | Missing information |
| - Too long (>120% of target) | 0 | Will be truncated |
| **Primary Keyword** | 0-15 | |
| - Present + high-volume + front-loaded | 15 | Optimal |
| - Present + high-volume + not front | 12 | Good |
| - Present + not highest volume | 8 | Suboptimal keyword |
| - Present but poorly positioned | 5 | Needs improvement |
| - Missing | 0 | Critical issue |
| **Secondary Keyword** | 0-5 | |
| - Present and relevant | 5 | Good |
| - Partially relevant | 3 | Acceptable |
| - Missing or irrelevant | 0 | Opportunity missed |
| **Native Expression** | 0-15 | |
| - Reads like native wrote it | 15 | Excellent |
| - Minor awkwardness | 10 | Good |
| - Noticeable MT feel | 5 | Needs rewrite |
| - Clearly machine translated | 0 | Requires complete rewrite |
| **Topic Match** | 0-15 | |
| - Perfectly describes page | 15 | Excellent |
| - Good match with minor gaps | 10 | Good |
| - Partial match | 5 | Misleading |
| - Poor match | 0 | Completely off |
| **Uniqueness** | 0-10 | |
| - Completely unique | 10 | Good |
| - Similar to other pages | 5 | Risk of cannibalization |
| - Duplicate | 0 | Must change |

**Total: ___/70**

### Title Score Interpretation
| Score | Status | Action |
|-------|--------|--------|
| 60-70 | ✅ Excellent | Minor tweaks if any |
| 50-59 | 🟡 Good | Small improvements |
| 40-49 | ⚠️ Needs Work | Significant revision |
| <40 | 🔴 Poor | Complete rewrite |

---

## Description Quality Score (0-90)

### Scoring Rubric

| Criterion | Points | How to Score |
|-----------|--------|--------------|
| **Length** | 0-10 | |
| - Within optimal range | 10 | Perfect length |
| - Within acceptable range | 7 | Slightly off |
| - Too short (<60% of target) | 3 | Missing opportunity |
| - Too long (>120% of target) | 0 | Will be truncated |
| **Primary Keyword** | 0-10 | |
| - Present + high-volume | 10 | Optimal |
| - Present but not optimal | 6 | Suboptimal |
| - Missing | 0 | Critical |
| **Secondary Keywords** | 0-5 | |
| - 2+ relevant keywords | 5 | Good |
| - 1 relevant keyword | 3 | Acceptable |
| - None | 0 | Opportunity missed |
| **Call-to-Action** | 0-15 | |
| - Clear, compelling CTA | 15 | Excellent |
| - CTA present but weak | 10 | Good |
| - Implied CTA | 5 | Weak |
| - No CTA | 0 | Missing opportunity |
| **Value Proposition** | 0-15 | |
| - Unique, clear value | 15 | Excellent |
| - Value stated but generic | 10 | Good |
| - Vague value | 5 | Needs improvement |
| - No value stated | 0 | Critical issue |
| **Native Expression** | 0-15 | |
| - Reads naturally | 15 | Excellent |
| - Minor issues | 10 | Good |
| - Noticeable MT feel | 5 | Needs rewrite |
| - Clearly MT | 0 | Complete rewrite |
| **Topic Match** | 0-10 | |
| - Perfectly describes page | 10 | Excellent |
| - Good match | 7 | Good |
| - Partial match | 4 | Misleading |
| - Poor match | 0 | Critical |
| **GEO-Friendly** | 0-10 | |
| - Can stand alone as answer | 10 | Excellent for AI |
| - Partially standalone | 6 | Acceptable |
| - Requires context | 2 | Poor for AI |
| - Not standalone | 0 | Not GEO-friendly |

**Total: ___/90**

### Description Score Interpretation
| Score | Status | Action |
|-------|--------|--------|
| 75-90 | ✅ Excellent | Minor tweaks |
| 60-74 | 🟡 Good | Some improvements |
| 45-59 | ⚠️ Needs Work | Significant revision |
| <45 | 🔴 Poor | Complete rewrite |

---

## E-E-A-T Score (0-27)

### Experience (0-7)

| Score | Criteria |
|-------|----------|
| 7 | Multiple detailed case studies + failure analysis + practical tips |
| 5-6 | 1-2 case studies + some practical examples |
| 3-4 | General examples mentioned, no specific cases |
| 1-2 | Theoretical only, no real experience shown |
| 0 | No experience indicators |

### Expertise (0-7)

| Score | Criteria |
|-------|----------|
| 7 | Technically flawless + expert credentials + comprehensive depth |
| 5-6 | Accurate information + some credentials + good depth |
| 3-4 | Mostly accurate + no credentials + surface level |
| 1-2 | Some inaccuracies + no depth |
| 0 | Significant errors or no expertise shown |

### Authoritativeness (0-7)

| Score | Criteria |
|-------|----------|
| 7 | Multiple authoritative citations + original research + industry recognition |
| 5-6 | Several citations + unique perspective |
| 3-4 | Few citations + generic content |
| 1-2 | No citations + copied content feel |
| 0 | No authority signals |

### Trustworthiness (0-6)

| Score | Criteria |
|-------|----------|
| 6 | Recent update + full transparency + complete contact info |
| 4-5 | Updated within 6 months + sources cited + contact available |
| 2-3 | Somewhat dated + partial transparency |
| 1 | Outdated + missing sources |
| 0 | No trust signals |

### E-E-A-T Interpretation
| Score | Status | Action |
|-------|--------|--------|
| 22-27 | ✅ Excellent | Maintain quality |
| 18-21 | 🟡 Good | Minor improvements |
| 12-17 | ⚠️ Needs Work | Significant additions |
| <12 | 🔴 Poor | Major overhaul |

---

## GEO Score (0-40)

### Scoring Each Factor (0-5)

#### Clear Definitions
| Score | Criteria |
|-------|----------|
| 5 | Multiple clear definitions, 40-60 words, standalone |
| 4 | Some clear definitions, mostly standalone |
| 3 | Definitions present but not optimized |
| 2 | Few definitions, require context |
| 1 | Minimal definitions |
| 0 | No definitions |

#### Quotable Statements
| Score | Criteria |
|-------|----------|
| 5 | Multiple quotable facts with sources |
| 4 | Several quotable statements |
| 3 | Some specific statements |
| 2 | Few specific facts |
| 1 | Mostly generic statements |
| 0 | No quotable content |

#### Factual Density
| Score | Criteria |
|-------|----------|
| 5 | High fact-to-opinion ratio, specific data throughout |
| 4 | Good factual content |
| 3 | Mix of facts and opinions |
| 2 | Mostly opinion-based |
| 1 | Very few facts |
| 0 | No factual content |

#### Source Citations
| Score | Criteria |
|-------|----------|
| 5 | 5+ authoritative sources, recent |
| 4 | 3-4 good sources |
| 3 | 1-2 sources |
| 2 | Vague references |
| 1 | No proper citations |
| 0 | No sources |

#### Q&A Format
| Score | Criteria |
|-------|----------|
| 5 | Comprehensive FAQ, matches user queries |
| 4 | Good FAQ section |
| 3 | Basic FAQ |
| 2 | Minimal Q&A |
| 1 | Implied Q&A only |
| 0 | No Q&A format |

#### Authority Signals
| Score | Criteria |
|-------|----------|
| 5 | Expert quotes + credentials + validation |
| 4 | Some authority signals |
| 3 | Basic credentials |
| 2 | Minimal authority |
| 1 | Weak authority |
| 0 | No authority signals |

#### Content Freshness
| Score | Criteria |
|-------|----------|
| 5 | Very recent (within 3 months) + update date shown |
| 4 | Recent (within 6 months) |
| 3 | Within 1 year |
| 2 | 1-2 years old |
| 1 | Outdated |
| 0 | Very outdated or no date |

#### Structure Clarity
| Score | Criteria |
|-------|----------|
| 5 | Perfect hierarchy, highly scannable, optimal formatting |
| 4 | Good structure |
| 3 | Acceptable structure |
| 2 | Confusing structure |
| 1 | Poor structure |
| 0 | No structure |

### GEO Score Interpretation
| Score | Status | AI Citation Potential |
|-------|--------|----------------------|
| 35-40 | ✅ Excellent | Very High |
| 30-34 | 🟡 Good | High |
| 20-29 | ⚠️ Needs Work | Medium |
| <20 | 🔴 Poor | Low |

---

## Seven Sweeps Score (0-7)

Each sweep is PASS (1) or FAIL (0).

### Scoring
- 7/7: ✅ Excellent copy
- 5-6/7: 🟡 Good, minor issues
- 3-4/7: ⚠️ Significant issues
- 0-2/7: 🔴 Major rewrite needed

---

## Keyword Optimization Score (0-20)

| Score | Criteria |
|-------|----------|
| 18-20 | All keywords are highest-volume local expressions |
| 14-17 | Most keywords optimized, 1-2 suboptimal |
| 10-13 | Mix of optimized and suboptimal |
| 5-9 | Many suboptimal keywords |
| 0-4 | Keywords are direct translations |

---

## ⛔ Word Count & Keyword Density Score (0-20) - MANDATORY

> **This score is REQUIRED and cannot be bypassed. Pages failing these minimums MUST be rejected.**

### Word Count Score (0-10)
| Score | EN Words | ZH Words | JA/KO Words |
|-------|----------|----------|-------------|
| 10 | ≥ 1200 | ≥ 800 | ≥ 1000 |
| 8 | 1000-1199 | 700-799 | 800-999 |
| 6 | 800-999 | 500-699 | 600-799 |
| 3 | 600-799 | 400-499 | 500-599 |
| 0 | < 600 ❌ FAIL | < 400 ❌ FAIL | < 500 ❌ FAIL |

**HARD MINIMUM (Cannot Pass Below):**
- EN: 800 words
- ZH: 500 words
- JA/KO: 600 words

### Keyword Density Score (0-10)
| Score | Density | Status |
|-------|---------|--------|
| 10 | 2.5-3% | Optimal |
| 8 | 2-2.5% or 3-3.5% | Good |
| 5 | 1.5-2% or 3.5-4% | Acceptable |
| 0 | < 1.5% ❌ | FAIL - Too Low |
| 0 | > 4% ❌ | FAIL - Keyword Stuffing |

**HARD REQUIREMENT:** Density must be 2-3% (acceptable range: 1.5-4%)

### Word Count & Density Total: ___/20

---

## Content Structure Score (0-15)

| Score | Criteria |
|-------|----------|
| 13-15 | Perfect H1, logical hierarchy, optimal formatting |
| 10-12 | Good structure, minor issues |
| 7-9 | Acceptable structure |
| 4-6 | Structural problems |
| 0-3 | Major structural issues |

---

## Quick Reference: Score Targets

| Metric | Minimum Acceptable | Target | Excellent |
|--------|-------------------|--------|-----------|
| Overall SEO | 60 | 80 | 90+ |
| Title Quality | 40 | 50 | 60+ |
| Description Quality | 45 | 60 | 75+ |
| E-E-A-T | 12 | 18 | 22+ |
| GEO | 20 | 30 | 35+ |
| Seven Sweeps | 4/7 | 6/7 | 7/7 |
| Keywords | 10 | 14 | 18+ |
| Structure | 7 | 10 | 13+ |
| **Word Count & Density** | **12/20** | **15/20** | **18+/20** |

---

## ⛔ MANDATORY CHECKS (Cannot Pass Without)

> **These are HARD REQUIREMENTS. Audit MUST fail if any of these are not met.**

| Check | Requirement | FAIL Condition |
|-------|-------------|----------------|
| Word Count (EN) | ≥ 800 words | < 800 ❌ |
| Word Count (ZH) | ≥ 500 words | < 500 ❌ |
| Word Count (JA/KO) | ≥ 600 words | < 600 ❌ |
| Keyword Density | 2-3% | < 1.5% or > 4% ❌ |

**If any MANDATORY check fails, the audit MUST report FAIL regardless of other scores.**
