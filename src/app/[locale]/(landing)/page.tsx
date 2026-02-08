import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { CaricatureGenerator } from '@/shared/blocks/generator';
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
          title: 'ChatGPT Caricature Generator',
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

  return <Page locale={locale} page={page} />;
}
