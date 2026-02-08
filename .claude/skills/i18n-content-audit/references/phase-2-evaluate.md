# Phase 2: Evaluate (质量评估)

## Step 2.1: Title & Description Audit
**Use Skill:** `/metadata-optimizer`

**Evaluate:**
| Dimension | Check | Score |
|-----------|-------|-------|
| Length | Within limits for language | 0-10 |
| Keywords | Primary keyword present & positioned | 0-10 |
| Native Expression | No machine-translation feel | 0-10 |
| Topic Match | Accurately reflects page content | 0-10 |
| Uniqueness | Not duplicated from other pages | 0-10 |
| CTA (Description) | Has call-to-action | 0-10 |
| Value Prop | Has unique value proposition | 0-10 |

**Length Standards:**
| Language | Title | Description |
|----------|-------|-------------|
| English (en) | 50-60 chars | 150-160 chars |
| Chinese (zh) | 20-30 chars | 70-80 chars |
| Japanese (ja) | 25-35 chars | 70-100 chars |
| Korean (ko) | 25-35 chars | 70-100 chars |
| European (de/es/fr/it/pt) | 50-60 chars | 150-160 chars |

## Step 2.2: Content Quality Assessment
**Use Skill:** `/content-optimizer`

**E-E-A-T Evaluation:**
| Factor | Max Score | Evaluation Criteria |
|--------|-----------|---------------------|
| Experience | 7 | Case studies, hands-on examples, personal insights |
| Expertise | 7 | Technical accuracy, author credentials, depth |
| Authoritativeness | 7 | External citations, unique data, industry recognition |
| Trustworthiness | 6 | Update frequency, source transparency, contact info |
| **Total** | **27** | Target: ≥ 18 |

**Content Structure Check:**
- [ ] H1 unique and contains primary keyword
- [ ] Heading hierarchy logical (H1→H2→H3)
- [ ] Keyword density appropriate (2-3% EN, 2-4% ZH)
- [ ] Paragraphs short (3-5 sentences)
- [ ] Lists and tables used appropriately
- [ ] Internal links present (3-5 per 500 words)

**Word Count & Keyword Density Check (IMPORTANT):**
| Language | Min Words | Optimal | Primary Keyword Density |
|----------|-----------|---------|------------------------|
| EN | 800 | 1000-1500 | 2-3% (16-24x per 800 words) |
| ZH | 500 | 700-1000 | 2-4% |
| JA/KO | 600 | 800-1200 | 2-3% |
| European | 800 | 1000-1500 | 2-3% |

- [ ] Total word count meets minimum (800 EN / 500 ZH)
- [ ] Primary keyword density within 2-3% range
- [ ] Keywords distributed across: Title(1x), H1(1x), H2s(2-3x), Body(10-15x), Alt(2-3x)
- [ ] No keyword stuffing (density < 4%)

## Step 2.3: GEO Quality Assessment
**Use Skill:** `/geo-content-optimizer`

**GEO Score Evaluation:**
| Factor | Max Score | Evaluation Criteria |
|--------|-----------|---------------------|
| Clear Definitions | 5 | 40-60 word standalone definitions |
| Quotable Statements | 5 | Specific facts with sources |
| Factual Density | 5 | Statistics, data, verifiable claims |
| Source Citations | 5 | Authoritative references |
| Q&A Format | 5 | Question-answer structures |
| Authority Signals | 5 | Expert quotes, credentials |
| Content Freshness | 5 | Recent data, update dates |
| Structure Clarity | 5 | Clear headings, logical flow |
| **Total** | **40** | Target: ≥ 30 |

## Step 2.4: Seven Sweeps Review
**Use Skill:** `/copy-editing`

| Sweep | Focus | Pass/Fail | Issues Found |
|-------|-------|-----------|--------------|
| 1. Clarity | Immediately understandable? | | |
| 2. Voice & Tone | Consistent throughout? | | |
| 3. So What | Claims answer "why should I care?" | | |
| 4. Prove It | Claims substantiated? | | |
| 5. Specificity | Concrete and specific? | | |
| 6. Heightened Emotion | Evokes feeling? | | |
| 7. Zero Risk | Barriers to action removed? | | |

## Step 2.5: Content Exclusion Check

**Verify these are NOT present:**
- [ ] No `metadata.keywords` field (deprecated)
- [ ] No `footer.friendLinks` section
- [ ] No backlinks/friend links sections
