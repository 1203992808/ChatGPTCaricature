import { getTranslations, setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { getThemePage } from '@/core/theme';
import { CaricatureGenerator } from '@/shared/blocks/generator';
import {
  buildFAQSchema,
  buildHowToSchema,
  buildOrganizationSchema,
  buildWebApplicationSchema,
  JsonLd,
} from '@/shared/components/seo/json-ld';
import { getLatestShowcases } from '@/shared/models/showcase';
import { DynamicPage, Section } from '@/shared/types/blocks/landing';
import { ShowcasesFlowDynamic } from '@/themes/default/blocks/showcases-flow-dynamic';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('landing');
  const tc = await getTranslations('ai.caricature');

  // Fetch showcases data server-side for faster initial render
  const rawShowcases = await getLatestShowcases({
    sortOrder: 'desc',
    limit: 20,
  });

  const initialShowcases = rawShowcases.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  const showSections = [
    'hero',
    'showcases-flow',
    'introduce',
    'styles',
    'howItWorks',
    'benefits',
    'features',
    'faq',
    'cta',
  ];

  // build page sections
  const page: DynamicPage = {
    sections: showSections.reduce<Record<string, Section>>((acc, section) => {
      if (section === 'hero') {
        const sectionData = t.raw(section) as Section;
        acc[section] = {
          ...sectionData,
          title: 'ChatGPT Caricature',
          description: '',
          announcement: {
            title: 'The  AI caricature trend everyone is talking about',
            url: '/chatgpt-caricature',
            target: '_self',
          },
          buttons: undefined,
          image: undefined,
          image_invert: undefined,
          component: (
            <CaricatureGenerator
              srOnlyTitle={tc.raw('generator.title')}
              className="py-6 md:py-8"
            />
          ),
        };
      } else if (section === 'showcases-flow') {
        const sectionData = t.raw(section) as Section;
        acc[section] = {
          ...sectionData,
          component: (
            <ShowcasesFlowDynamic
              key="showcases-flow"
              title={sectionData.title}
              description={sectionData.description}
              sortOrder="desc"
              hideCreateButton={true}
              initialItems={initialShowcases}
            />
          ),
        };
      } else {
        const sectionData = t.raw(section) as Section;
        // Skip sections that are explicitly hidden, null, or undefined
        if (
          sectionData &&
          typeof sectionData === 'object' &&
          sectionData.hidden !== true
        ) {
          acc[section] = sectionData;
        }
      }
      return acc;
    }, {}),
  };

  // load page component
  const Page = await getThemePage('dynamic-page');

  // ── JSON-LD Structured Data ──
  const appUrl = envConfigs.app_url;

  const faqData = t.raw('faq') as Section;
  const faqSchema = buildFAQSchema(
    (faqData.items || []).map((item: any) => ({
      question: item.question || item.title || '',
      answer: item.answer || item.description || '',
    }))
  );

  const howToData = t.raw('howItWorks') as Section;
  const howToSchema = buildHowToSchema({
    name: 'How to Create Your AI Caricature Portrait',
    description:
      'Turn any photo into a ChatGPT Caricature in 3 simple steps. No drawing skills required.',
    totalTime: 'PT1M',
    imageUrl: `${appUrl}/example/classic-style.webp`,
    steps: (howToData.items || []).map((item: any, idx: number) => ({
      position: idx + 1,
      name: item.title || '',
      text: item.description || '',
    })),
  });

  const webAppSchema = buildWebApplicationSchema({
    name: 'ChatGPT Caricature Generator',
    description:
      'Create viral ChatGPT caricatures with 9 AI styles including Action Figure, Claymation and South Park. Professional cartoon portraits from any photo in seconds.',
    url: appUrl,
    imageUrl: `${appUrl}/example/classic-style.webp`,
    applicationCategory: 'DesignApplication',
    offers: { price: '4.9', priceCurrency: 'USD' },
  });

  const orgSchema = buildOrganizationSchema({
    name: 'ChatGPT Caricature',
    url: appUrl,
    logoUrl: `${appUrl}/logo.png`,
    description:
      'AI-powered caricature generator — turn your photos into fun cartoon portraits.',
    email: 'yzshi123@gmail.com',
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={orgSchema} />
      <Page locale={locale} page={page} />
    </>
  );
}
