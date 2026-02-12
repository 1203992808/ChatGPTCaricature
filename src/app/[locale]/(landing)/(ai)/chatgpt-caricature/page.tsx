import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { getThemePage } from '@/core/theme';
import { CaricatureGeneratorLazy } from '@/shared/blocks/generator/caricature-lazy';
import {
  buildFAQSchema,
  buildWebApplicationSchema,
  JsonLd,
} from '@/shared/components/seo/json-ld';
import { DynamicPage, Section } from '@/shared/types/blocks/landing';
import { ShowcasesFlowDynamic } from '@/themes/default/blocks/showcases-flow-dynamic';

import { getLatestShowcases } from '@/shared/models/showcase';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const appUrl = envConfigs.app_url;
  return {
    title: 'AI Caricature Maker - 9 ChatGPT Styles | Action Figure & Claymation',
    description:
      'Try the viral ChatGPT caricature trend with 9 professional AI styles. Create Action Figure, Claymation, South Park & more cartoon portraits instantly.',
    alternates: {
      canonical: `${appUrl}/chatgpt-caricature`,
    },
    openGraph: {
      title: 'AI Caricature Maker - 9 ChatGPT Styles | Action Figure & Claymation',
      description:
        'Make viral ChatGPT caricatures with 9 unique AI styles - Action Figure, South Park, Claymation & more. Professional online generator.',
      url: `${appUrl}/chatgpt-caricature`,
      type: 'website',
    },
  };
}

export default async function ChatGPTCaricaturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tl = await getTranslations('landing');
  const tc = await getTranslations('ai.caricature');

  const rawShowcases = await getLatestShowcases({
    sortOrder: 'desc',
    limit: 12,
  });

  const initialShowcases = rawShowcases.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  const page: DynamicPage = {
    sections: {
      hero: {
        title: 'AI Caricature Maker — Create ChatGPT Cartoon Portraits Online',
        description:
          'The viral AI caricature trend — transform any photo into a hilarious cartoon portrait in seconds. Choose from 9 unique styles including Action Figure, Claymation, South Park, and more. Personalize with your job, hobbies, and personality.',
        background_image: {
          src: '/imgs/bg/bg.webp',
          alt: 'ChatGPT Caricature hero background',
        },
      },
      generator: {
        component: (
          <CaricatureGeneratorLazy
            srOnlyTitle={tc.raw('generator.title')}
          />
        ),
      },
      'showcases-flow': {
        component: (
          <ShowcasesFlowDynamic
            key="seo-showcases"
            title="AI Caricature Gallery"
            description="See what others have created with AI Caricature Generator"
            sortOrder="desc"
            hideCreateButton={false}
            initialItems={initialShowcases}
          />
        ),
      },
      faq: tl.raw('faq'),
      cta: tl.raw('cta'),
    },
  };

  const Page = await getThemePage('dynamic-page');

  // ── JSON-LD Structured Data ──
  const appUrl = envConfigs.app_url;

  const faqData = tl.raw('faq') as Section;
  const faqSchema = buildFAQSchema(
    (faqData.items || []).map((item: any) => ({
      question: item.question || item.title || '',
      answer: item.answer || item.description || '',
    }))
  );

  const webAppSchema = buildWebApplicationSchema({
    name: 'AI Caricature Maker',
    description:
      'Try the viral ChatGPT caricature trend with 9 professional AI styles. Create Action Figure, Claymation, South Park and more cartoon portraits instantly.',
    url: `${appUrl}/chatgpt-caricature`,
    imageUrl: `${appUrl}/example/classic-style.webp`,
    applicationCategory: 'DesignApplication',
    offers: { price: '4.9', priceCurrency: 'USD' },
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />
      <Page locale={locale} page={page} />
    </>
  );
}
