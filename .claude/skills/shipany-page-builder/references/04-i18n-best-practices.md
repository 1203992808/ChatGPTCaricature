# i18n Development Best Practices

## Critical: Server-Side Translation Loading

When using `next-intl` with Next.js App Router, there is a **race condition** between `getRequestConfig()` and `setRequestLocale()` that can cause translations to fall back to the default locale (English) instead of the requested locale.

### The Problem

```typescript
// This pattern has a race condition bug
export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // BAD: May receive wrong locale due to timing issues
  const t = await getTranslations('pages.xxx');

  return <div>{t('title')}</div>;
}
```

When a user directly accesses a URL like `/zh/ai-image/generator/nano-banana-pro`:
1. `getRequestConfig()` may be called BEFORE `setRequestLocale()` executes
2. `requestLocale` will be `undefined`, falling back to English
3. The page renders with English content despite the `/zh/` URL

### The Solution: Always Use Explicit Locale

```typescript
// GOOD: Always pass locale explicitly
export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // CORRECT: Explicitly bind locale parameter
  const t = await getTranslations({ locale, namespace: 'pages.xxx' });

  return <div>{t('title')}</div>;
}
```

### Required Pattern for All Public Pages

For **any page that needs SEO** or can be accessed directly via URL:

```typescript
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Always use explicit locale in getTranslations
  const t = await getTranslations({ locale, namespace: 'pages.your-page' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  // ... rest of page
}
```

### Page Template (Copy This)

```typescript
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Use explicit locale for metadata translations too
  const t = await getTranslations({ locale, namespace: 'pages.your-page' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default async function YourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // All getTranslations calls MUST use explicit locale
  const t = await getTranslations({ locale, namespace: 'pages.your-page' });

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      {/* ... */}
    </div>
  );
}
```

### Checklist

- [ ] `setRequestLocale(locale)` is called early in the page component
- [ ] All `getTranslations()` calls use `{ locale, namespace }` format
- [ ] `generateMetadata()` also uses explicit locale
- [ ] Layout files that call `getTranslations()` also use explicit locale

### When Is Implicit OK?

The simplified `getTranslations('namespace')` pattern is acceptable ONLY for:
- Admin pages (not indexed, user already logged in)
- Protected routes (settings, activity, etc.)
- Client-side navigation only pages

**For any SEO-relevant public page, ALWAYS use explicit locale.**
