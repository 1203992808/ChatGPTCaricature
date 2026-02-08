# Phase 3: Report (报告生成)

## Report Template

```markdown
# i18n Content Audit Report

**Page:** {page-path}
**Locale:** {locale}
**Audit Date:** {today}
**Auditor:** Claude (auto-i18n-content-audit)

---

## Executive Summary

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Overall SEO Score | {x}/100 | ≥ 80 | 🔴/🟡/🟢 |
| E-E-A-T Score | {x}/27 | ≥ 18 | 🔴/🟡/🟢 |
| GEO Score | {x}/40 | ≥ 30 | 🔴/🟡/🟢 |
| Seven Sweeps | {x}/7 passed | 7/7 | 🔴/🟡/🟢 |
| Title Quality | {x}/70 | ≥ 50 | 🔴/🟡/🟢 |
| Description Quality | {x}/70 | ≥ 50 | 🔴/🟡/🟢 |

**Overall Grade:** {A/B/C/D/F}

**Priority Issues:**
1. {Critical issue 1}
2. {Critical issue 2}
3. {Critical issue 3}

---

## 1. Keyword Analysis

### Current Keywords vs Optimal Keywords

| Location | Current | Volume | Optimal | Volume | Action |
|----------|---------|--------|---------|--------|--------|
| Title | {current} | {vol} | {optimal} | {vol} | {Replace/Keep} |
| Description | {current} | {vol} | {optimal} | {vol} | {Replace/Keep} |
| H1 | {current} | {vol} | {optimal} | {vol} | {Replace/Keep} |
| ... | ... | ... | ... | ... | ... |

### Keyword Research Sources
- Google Trends: {link}
- Competitor Analysis: {findings}

### Keyword Recommendations
1. Replace "{current}" with "{optimal}" - {reason}
2. Add missing keyword "{keyword}" in {location}
3. ...

---

## 2. Title & Description Audit

### Title Analysis

**Current:**
```
{current title}
```

**Length:** {x} chars ({status} - target: {range})
**Primary Keyword:** {present/missing} at position {x}
**Native Expression:** {score}/10
**Topic Match:** {score}/10

**Issues:**
- {issue 1}
- {issue 2}

### Description Analysis

**Current:**
```
{current description}
```

**Length:** {x} chars ({status} - target: {range})
**Keywords:** {present/missing}
**CTA:** {present/missing}
**Value Proposition:** {present/missing}
**Native Expression:** {score}/10

**Issues:**
- {issue 1}
- {issue 2}

---

## 3. E-E-A-T Assessment

### Experience: {x}/7
- Case studies: {present/missing}
- Hands-on examples: {present/missing}
- Personal insights: {present/missing}

**Recommendations:**
- {recommendation}

### Expertise: {x}/7
- Technical accuracy: {assessment}
- Author credentials: {present/missing}
- Content depth: {assessment}

**Recommendations:**
- {recommendation}

### Authoritativeness: {x}/7
- External citations: {count}
- Unique data: {present/missing}
- Industry recognition: {assessment}

**Recommendations:**
- {recommendation}

### Trustworthiness: {x}/6
- Update date shown: {yes/no}
- Source transparency: {assessment}
- Contact info: {present/missing}

**Recommendations:**
- {recommendation}

---

## 4. GEO Assessment

### GEO Score Breakdown: {x}/40

| Factor | Score | Issues |
|--------|-------|--------|
| Clear Definitions | {x}/5 | {issues} |
| Quotable Statements | {x}/5 | {issues} |
| Factual Density | {x}/5 | {issues} |
| Source Citations | {x}/5 | {issues} |
| Q&A Format | {x}/5 | {issues} |
| Authority Signals | {x}/5 | {issues} |
| Content Freshness | {x}/5 | {issues} |
| Structure Clarity | {x}/5 | {issues} |

### GEO Optimization Recommendations
1. {recommendation with example}
2. {recommendation with example}
3. {recommendation with example}

---

## 5. Seven Sweeps Results

| # | Sweep | Result | Issues |
|---|-------|--------|--------|
| 1 | Clarity | {Pass/Fail} | {issues} |
| 2 | Voice & Tone | {Pass/Fail} | {issues} |
| 3 | So What | {Pass/Fail} | {issues} |
| 4 | Prove It | {Pass/Fail} | {issues} |
| 5 | Specificity | {Pass/Fail} | {issues} |
| 6 | Heightened Emotion | {Pass/Fail} | {issues} |
| 7 | Zero Risk | {Pass/Fail} | {issues} |

### Detailed Issues & Fixes
{For each failed sweep, provide specific issues and fixes}

---

## 6. Content Exclusion Check

| Item | Status | Action |
|------|--------|--------|
| `metadata.keywords` | {Present/Absent} | {Remove if present} |
| `footer.friendLinks` | {Present/Absent} | {Remove if present} |
| `backlinks` section | {Present/Absent} | {Remove if present} |

---

## 7. Action Items (Priority Order)

### 🔴 Critical (Do Immediately)
1. {action item with specific change}
2. {action item with specific change}

### 🟡 Important (Do This Week)
3. {action item with specific change}
4. {action item with specific change}

### 🟢 Nice to Have (Do When Possible)
5. {action item with specific change}
6. {action item with specific change}

---

## 8. Recommended Rewrites

### Title Rewrite

**Before:**
```
{current title}
```

**After:**
```
{optimized title}
```

**Changes:**
- {change 1 with reason}
- {change 2 with reason}

### Description Rewrite

**Before:**
```
{current description}
```

**After:**
```
{optimized description}
```

**Changes:**
- {change 1 with reason}
- {change 2 with reason}

### Content Section Rewrites

{For each section that needs improvement, provide before/after}

---

## 9. Comparison with English Version

| Aspect | English | {Locale} | Gap |
|--------|---------|----------|-----|
| Title Length | {x} chars | {x} chars | {ok/issue} |
| Description Length | {x} chars | {x} chars | {ok/issue} |
| Sections Count | {x} | {x} | {ok/issue} |
| FAQ Count | {x} | {x} | {ok/issue} |
| Internal Links | {x} | {x} | {ok/issue} |

---

## 10. Next Steps

After implementing the recommendations:

1. [ ] Update the JSON file with recommended changes
2. [ ] Update sitemap-config.ts with new localeLastmod
3. [ ] Run `pnpm build` to verify no errors
4. [ ] Visual test at `/{locale}/{page-path}`
5. [ ] Re-run audit to verify improvements

---

**Report Generated:** {timestamp}
**Audit Version:** 1.0
```
