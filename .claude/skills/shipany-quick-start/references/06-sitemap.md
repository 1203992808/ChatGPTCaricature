# Step 6 — Sitemap Configuration

## Goal

Configure sitemap with correct domain and initial page entries for the new project.

## Files

- `src/config/sitemap-config.ts` — Central sitemap page definitions
- `src/app/sitemap.ts` — Sitemap generator (reads from config)

## Actions

### 1. Update sitemap-config.ts

The sitemap is configured in `src/config/sitemap-config.ts`. Update the page entries as needed:

```typescript
// src/config/sitemap-config.ts

export const staticPages: SitemapPageConfig[] = [
  {
    path: '/',
    lastmod: '2025-01-18',        // Default date
    localeLastmod: {              // Optional: language-specific dates
      ja: '2025-01-18',
      ko: '2025-01-18',
    },
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    path: '/pricing',
    lastmod: '2025-01-18',
    changefreq: 'weekly',
    priority: 0.9,
  },
  // Add more pages as needed
];
```

### 2. Set lastmod to today for bootstrap

When bootstrapping a new project, update all `lastmod` dates to today's date.

### 3. Add/remove pages based on project features

- If `/blog` is disabled, remove the blog entry from `staticPages`
- If `/showcases` is disabled, remove the showcases entry
- Add new feature pages as they are created

## Page Configuration Structure

```typescript
export interface SitemapPageConfig {
  path: string;           // URL path without locale prefix
  lastmod: string;        // Default date (YYYY-MM-DD)
  localeLastmod?: {       // Optional: language-specific dates
    [locale: string]: string;  // e.g., { ja: '2025-01-18', ko: '2025-01-20' }
  };
  changefreq: ChangeFrequency;  // daily, weekly, monthly, yearly
  priority: number;       // 0.0 to 1.0
}
```

## Priority Guidelines

| Page Type | Priority |
|-----------|----------|
| Homepage | 1.0 |
| Main features (generator, pricing) | 0.9 |
| Model-specific pages | 0.8 |
| Content pages (blog, showcases) | 0.7 |
| Secondary pages | 0.5-0.6 |

## Change Frequency Guidelines

| Content Type | Frequency |
|--------------|-----------|
| Homepage | daily |
| Blog/news | daily |
| Feature pages | weekly |
| Static pages | monthly |

## Multi-language Support

The sitemap supports different `lastmod` dates per language:

```typescript
{
  path: '/features/new-feature',
  lastmod: '2025-01-15',        // Default (en, zh)
  localeLastmod: {
    ja: '2025-01-18',           // Japanese translated later
    ko: '2025-01-20',           // Korean translated later
  },
  changefreq: 'weekly',
  priority: 0.7,
},
```

**How it works:**
- If a locale is in `localeLastmod`, use that date
- Otherwise, fall back to the default `lastmod`
- Sitemap automatically generates URLs for all configured locales

## Notes

- The sitemap generator automatically expands pages for all locales (en, zh, ja, ko)
- Robots.txt references sitemap via `src/app/robots.ts` using `envConfigs.app_url`
- No need to edit `sitemap.ts` directly — it reads from `sitemap-config.ts`

## When Adding New Pages

When creating new pages (via `shipany-page-builder` or manually), always add the corresponding entry to `sitemap-config.ts`:

```typescript
// In staticPages or modelPages array:
{
  path: '/new-feature',
  lastmod: '2025-01-18',
  localeLastmod: {
    ja: '2025-01-18',
    ko: '2025-01-18',
  },
  changefreq: 'weekly',
  priority: 0.7,
},
```
