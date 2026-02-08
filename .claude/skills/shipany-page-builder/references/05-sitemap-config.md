# Step 4 — Sitemap Configuration

## Goal

Register the new page in sitemap configuration so it appears in the sitemap with proper SEO metadata.

## File

- `src/config/sitemap-config.ts`

## Actions

When creating a new page, add an entry to the appropriate array in `sitemap-config.ts`:

### Basic structure (same date for all languages)

```typescript
{
  path: '/your-new-page',       // URL path without locale prefix
  lastmod: '2025-01-18',        // Default date (YYYY-MM-DD format)
  changefreq: 'weekly',         // How often: daily, weekly, monthly, yearly
  priority: 0.7,                // 0.0 to 1.0
},
```

### With language-specific dates

When different languages are updated at different times:

```typescript
{
  path: '/your-new-page',
  lastmod: '2025-01-15',        // Default date (used for en, zh if not specified)
  localeLastmod: {              // Language-specific dates
    ja: '2025-01-18',           // Japanese version updated later
    ko: '2025-01-18',           // Korean version updated later
  },
  changefreq: 'weekly',
  priority: 0.7,
},
```

### For AI model pages

Add to `modelPages` array:

```typescript
{
  path: '/ai-image/generator/new-model',
  lastmod: '2025-01-18',
  localeLastmod: {
    ja: '2025-01-18',
    ko: '2025-01-18',
  },
  changefreq: 'weekly',
  priority: 0.8,
},
```

## Priority Guidelines

| Page Type | Suggested Priority |
|-----------|-------------------|
| Homepage | 1.0 |
| Main feature pages (generator, pricing) | 0.9 |
| Model-specific pages | 0.8 |
| Content pages (blog, showcases) | 0.7 |
| Secondary pages (updates, coming soon) | 0.5-0.6 |

## Change Frequency Guidelines

| Content Type | Suggested Frequency |
|--------------|---------------------|
| Homepage | daily |
| Dynamic content (blog) | daily |
| Feature pages | weekly |
| Model pages | weekly |
| Static pages | monthly |
| Coming soon pages | monthly |

## Example: New feature page with i18n

For a new page at route `/features/ai-art-styles` created in English first, then translated to other languages later:

```typescript
// In staticPages array:
{
  path: '/features/ai-art-styles',
  lastmod: '2025-01-15',        // English/Chinese created
  localeLastmod: {
    ja: '2025-01-18',           // Japanese translation added
    ko: '2025-01-20',           // Korean translation added
  },
  changefreq: 'weekly',
  priority: 0.7,
},
```

## Important Notes

- Use today's date for `lastmod` when creating new pages
- Add `localeLastmod` entries when translating to new languages
- Update the appropriate date when making significant content changes
- The sitemap automatically expands pages for all configured locales
- If a locale is not in `localeLastmod`, it uses the default `lastmod` date
