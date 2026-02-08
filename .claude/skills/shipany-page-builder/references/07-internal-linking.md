# Internal Linking Requirements

> 页面内链要求 - 生成页面时必须遵守

## Overview

每个页面**必须**提供清晰的子页面入口，确保用户能够发现所有相关功能。

---

## Mandatory Requirements

### 1. Child Pages Navigation

当创建 L2 或更深层级的页面时，**必须**配置子页面导航：

| 页面层级 | 必须配置 | 说明 |
|---------|---------|------|
| L2 (如 `/ai-image-enhancer`) | `childPagesGrid` | 展示所有 L3 子页面 |
| L3 (如 `/ai-image-enhancer/upscaler`) | `siblingPagesGrid` | "Try Other Tools" 同级页面 |
| L4 (如 `/ai-image/generator/flux-2`) | `siblingPagesGrid` (可选) | "Try Other Models" 同级页面 |

### 2. Configuration Location

所有内链配置统一在 `internal-links.json` 中管理：

```
src/config/locale/messages/<locale>/internal-links.json
```

### 3. Required Fields

```json
{
  "pages": {
    "<page-key>": {
      "breadcrumb": {
        "label": "Page Title",
        "shortLabel": "Short"
      },
      "childPagesGrid": {
        "title": "Choose Your Tool",
        "description": "Section description",
        "items": [
          {
            "title": "Child Page Title",
            "description": "Brief description",
            "href": "/path/to/child",
            "icon": "RiIconName",
            "badge": "Popular",
            "badgeVariant": "popular"
          }
        ]
      },
      "siblingPagesGrid": {
        "title": "Try Other Tools",
        "items": [
          {
            "title": "Sibling Page",
            "description": "Brief description",
            "href": "/path/to/sibling",
            "icon": "RiIconName"
          }
        ]
      },
      "relatedPages": {
        "title": "Explore More",
        "description": "Related tools",
        "items": [...]
      }
    }
  }
}
```

---

## Page Creation Checklist

When creating a new page, verify:

### For ALL L2+ Pages

- [ ] `breadcrumb` configured in `internal-links.json`
- [ ] `LandingBreadcrumb` component added to page

### For Pages WITH Children (L2 Hub Pages)

- [ ] `childPagesGrid` configured with ALL child pages
- [ ] `ChildPagesGrid` component added to page (below Hero)
- [ ] Each child item has: `title`, `description`, `href`, `icon`

### For L3+ Pages (with siblings)

- [ ] `siblingPagesGrid` configured with sibling pages
- [ ] `ChildPagesGrid` (variant="compact") added to page

### For Parent Page Updates

- [ ] Parent page's `childPagesGrid` includes the new page

---

## Component Usage

### ChildPagesGrid (for L2 Hub Pages)

```tsx
import { ChildPagesGrid, type ChildPageItem } from '@/shared/blocks/landing';

// Get config
const childPagesConfig = linksT.raw('pages.<page-key>.childPagesGrid') as {
  title: string;
  description: string;
  items: ChildPageItem[];
};

// Render below Hero
<ChildPagesGrid
  title={childPagesConfig.title}
  description={childPagesConfig.description}
  items={childPagesConfig.items}
  columns={2}
  variant="featured"
/>
```

### ChildPagesGrid for Siblings (for L3+ Pages)

```tsx
// Get sibling config
const siblingPagesConfig = linksT.raw('pages.<page-key>.siblingPagesGrid') as {
  title: string;
  items: ChildPageItem[];
};

// Render with compact variant
<ChildPagesGrid
  title={siblingPagesConfig.title}
  items={siblingPagesConfig.items}
  variant="compact"
/>
```

---

## Badge Guidelines

Use badges sparingly to highlight important items:

| Badge | Use Case | badgeVariant |
|-------|----------|--------------|
| `Popular` | Most used item | `popular` |
| `New` | Recently added | `new` |
| `Hot` | Trending item | `hot` |
| `Fast` | Performance highlight | `fast` |
| `Best` | Editor's choice | `best` |

---

## Validation

Before completing page creation:

1. **Check parent page**: Does the parent page's config include this new page?
2. **Check siblings**: Are all sibling pages listed in siblingPagesGrid?
3. **Check children**: If this page has children, are they all configured?
4. **Multi-locale**: Is the config added to ALL locale files?

---

## Common Mistakes

### 1. Missing Parent Update

❌ Created `/ai-image-enhancer/new-tool` but forgot to add it to `/ai-image-enhancer`'s childPagesGrid.

✅ Always update parent page configuration when adding child pages.

### 2. Incomplete Multi-locale

❌ Added config to `en/internal-links.json` but not other locales.

✅ Add to ALL locales: en, zh, ja, ko, etc.

### 3. Missing Icon

❌ `{ "title": "...", "href": "..." }` - No icon specified.

✅ Always include an icon: `{ "icon": "RiImageLine", ... }`

### 4. Broken Links

❌ `"href": "/ai-image/genertor/flux"` - Typo in path.

✅ Verify paths match actual routes.

---

## Related Documents

- [Child Pages Navigation Design](/docs/designs/child-pages-navigation-design.md)
- [SEO Best Practices](/references/02-seo-best-practices.md)
