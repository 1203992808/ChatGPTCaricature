import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { CaricatureGeneratorLazy } from '@/shared/blocks/generator/caricature-lazy';
import { getMetadata } from '@/shared/lib/seo';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const generateMetadata = getMetadata({
  metadataKey: 'pages.create.metadata',
  canonicalUrl: '/create',
});

export default async function CreatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.create');
  const tc = await getTranslations('ai.caricature');

  // build page sections
  const page: DynamicPage = {
    sections: {
      "features": {
        "block": "custom-features",
        title: t.raw('page.title'),
        description: t.raw('page.description'),
      },
      generator: {
        component: <CaricatureGeneratorLazy srOnlyTitle={tc.raw('generator.title')} />,
      },
    },
  };

  // load page component
  const Page = await getThemePage('dynamic-page');

  return <Page locale={locale} page={page} />;
}
