import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { getThemePage } from '@/core/theme';
import { CaricatureGenerator } from '@/shared/blocks/generator';
import { DynamicPage } from '@/shared/types/blocks/landing';
import { ShowcasesFlowDynamic } from '@/themes/default/blocks/showcases-flow-dynamic';

import { getLatestShowcases } from '@/shared/models/showcase';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const appUrl = envConfigs.app_url;
  return {
    title: 'AI Caricature Maker - 11 ChatGPT Styles | Action Figure & Simpsons',
    description:
      'Try the viral ChatGPT caricature trend with 11 professional AI styles. Create Action Figure, Simpsons, Claymation & more cartoon portraits instantly.',
    alternates: {
      canonical: `${appUrl}/chatgpt-caricature`,
    },
    openGraph: {
      title: 'AI Caricature Maker - 11 ChatGPT Styles | Action Figure & Simpsons',
      description:
        'Make viral ChatGPT caricatures with 11 unique AI styles - Action Figure, Simpsons, South Park, Claymation & more. Professional online generator.',
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
        title: 'ChatGPT Caricature',
        description:
          'The viral AI caricature trend — transform any photo into a hilarious cartoon portrait in seconds. Choose from 11 unique styles including Action Figure, Simpsons, Claymation, and more. Personalize with your job, hobbies, and personality.',
        background_image: {
          src: '/imgs/bg/bg.jpg',
          alt: 'ChatGPT Caricature hero background',
        },
      },
      generator: {
        component: (
          <CaricatureGenerator
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

  return <Page locale={locale} page={page} />;
}
