# Shared Skills Resources

This directory contains resources shared across multiple skills to avoid duplication and maintain consistency.

## Contents

### `/references/seo-standards.md`

Unified SEO standards used by:
- `auto-i18n` - Page internationalization
- `i18n-content-audit` - Content audit and optimization
- `shipany-page-builder` - New page creation

**Contains:**
- Word count requirements by language
- Keyword density calculation and targets
- Keyword distribution rules (H1, H2, H3, body)
- Anti-stuffing rules and enforcement
- Title & description length standards
- E-E-A-T and GEO scoring references
- Quality gates and validation rules

## Why Shared?

**Benefits:**
1. **Single source of truth** - Update once, applies everywhere
2. **Consistency** - All skills use identical standards
3. **Reduced duplication** - Saves ~450 lines across skills
4. **Easier maintenance** - Change standards in one place

## Usage in Skills

Skills reference these shared standards like:

```markdown
## SEO Requirements

All content MUST meet shared SEO standards.

**Complete standards:** See `../_shared/references/seo-standards.md`

**Quick Reference:**
| Language | Min Words | Target Density |
|----------|-----------|----------------|
| EN | 800 | 1.8-2.5% |
| ZH | 500 | 2.0-3.0% |
```

## Maintenance

When updating SEO standards:
1. Edit only `seo-standards.md` in this directory
2. Sync to `.codex/skills/_shared/` (if using both)
3. No need to update individual skills

---

**Location:**
- `.claude/skills/_shared/` (primary)
- `.codex/skills/_shared/` (synced copy)
