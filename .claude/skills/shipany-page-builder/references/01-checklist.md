# Checklist (v1)

## Internal Linking (CRITICAL for L2+ pages)

- [ ] `childPagesGrid` configured in `internal-links.json` (if page has children)
- [ ] `siblingPagesGrid` configured in `internal-links.json` (for L3+ pages with siblings)
- [ ] **Parent page's config updated** to include this new page
- [ ] Multi-locale: config added to ALL locale files (en, zh, ja, ko, etc.)
- [ ] `ChildPagesGrid` component added to page.tsx (below Hero)

## Files created

- For each configured locale in `src/config/locale/index.ts` (`localeNames`):
  - `src/config/locale/messages/<locale>/pages/<slug>.json` created

## Registration updated

- `src/config/locale/index.ts` contains exactly one entry:
  - `'pages/<slug>'`

## Sitemap updated

- `src/config/sitemap-config.ts` contains new page entry with:
  - `path`: URL path (e.g., `/features/ai-art-styles`)
  - `lastmod`: Default date (YYYY-MM-DD format)
  - `localeLastmod`: (optional) Language-specific dates if translations added at different times
  - `changefreq`: Appropriate frequency (usually `weekly`)
  - `priority`: Appropriate priority (usually `0.7` for feature pages)

## Placeholder images

- Any image fields in the new JSON use placeholder URLs (recommended: `picsum.photos`)
- No edits under `public/` were made

## Routing sanity

- Slug contains no `.` (dot), otherwise it will 404
- Page can be visited at:
  - `/...` (EN)
  - `/zh/...` (ZH)

## i18n Best Practices (CRITICAL)

- All `getTranslations()` calls use explicit locale: `getTranslations({ locale, namespace: '...' })`
- `setRequestLocale(locale)` is called at the start of the page component
- `generateMetadata()` also uses explicit locale in `getTranslations()` calls
- See `references/04-i18n-best-practices.md` for full details

## Validation (required)

- Build must pass: `pnpm build`
- Test direct URL access in non-default locale (e.g., `/zh/your-page`) to verify translations load correctly
