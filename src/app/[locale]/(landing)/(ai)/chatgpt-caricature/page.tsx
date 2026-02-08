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
    title: 'ChatGPT Caricature - AI Caricature Generator',
    description:
      'Create viral ChatGPT caricature portraits from your photos. Choose from 6 AI styles and download your cartoon portrait in seconds. Free to try!',
    alternates: {
      canonical: `${appUrl}/chatgpt-caricature`,
    },
    openGraph: {
      title: 'ChatGPT Caricature - AI Caricature Generator',
      description:
        'Transform your photos into fun AI caricature portraits. The viral ChatGPT caricature trend — try it now!',
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
          'The viral AI caricature trend — transform any photo into a hilarious cartoon portrait in seconds. Choose from 6 unique styles and personalize with your job, hobbies, and personality.',
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
