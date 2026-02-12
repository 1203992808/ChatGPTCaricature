import dynamic from 'next/dynamic';

import { getThemeBlock } from '@/core/theme';
import type { DynamicPage as DynamicPageType } from '@/shared/types/blocks/landing';

// Eagerly load Hero (always above-the-fold)
import { Hero } from '@/themes/default/blocks/hero';

// Lazily load all other blocks – they are below the fold or rarely used
const CTA = dynamic(() => import('@/themes/default/blocks/cta').then((m) => m.CTA));
const FAQ = dynamic(() => import('@/themes/default/blocks/faq').then((m) => m.FAQ));
const Features = dynamic(() => import('@/themes/default/blocks/features').then((m) => m.Features));
const FeaturesAccordion = dynamic(() => import('@/themes/default/blocks/features-accordion').then((m) => m.FeaturesAccordion));
const FeaturesFlow = dynamic(() => import('@/themes/default/blocks/features-flow').then((m) => m.FeaturesFlow));
const FeaturesList = dynamic(() => import('@/themes/default/blocks/features-list').then((m) => m.FeaturesList));
const FeaturesMedia = dynamic(() => import('@/themes/default/blocks/features-media').then((m) => m.FeaturesMedia));
const FeaturesStep = dynamic(() => import('@/themes/default/blocks/features-step').then((m) => m.FeaturesStep));
const Logos = dynamic(() => import('@/themes/default/blocks/logos').then((m) => m.Logos));
const Showcases = dynamic(() => import('@/themes/default/blocks/showcases').then((m) => m.Showcases));
const ShowcasesFlow = dynamic(() => import('@/themes/default/blocks/showcases-flow').then((m) => m.ShowcasesFlow));
const Stats = dynamic(() => import('@/themes/default/blocks/stats').then((m) => m.Stats));
const Subscribe = dynamic(() => import('@/themes/default/blocks/subscribe').then((m) => m.Subscribe));
const Testimonials = dynamic(() => import('@/themes/default/blocks/testimonials').then((m) => m.Testimonials));

export default async function DynamicPage({
  locale,
  page,
  data,
}: {
  locale?: string;
  page: DynamicPageType;
  data?: Record<string, any>;
}) {
  return (
    <>
      {page.title && !page.sections?.hero && (
        <h1 className="sr-only">{page.title}</h1>
      )}
      {page?.sections &&
        Object.keys(page.sections).map(async (sectionKey: string) => {
          const section = page.sections?.[sectionKey];
          if (!section) {
            return null;
          }

          // block name
          const block = section.block || section.id || sectionKey;

          switch (block) {
            case 'hero':
              return <Hero key={sectionKey} section={section} />;
            case 'logos':
              return <Logos key={sectionKey} section={section} />;
            case 'features':
              return <Features key={sectionKey} section={section} />;
            case 'features-list':
              return <FeaturesList key={sectionKey} section={section} />;
            case 'features-accordion':
              return <FeaturesAccordion key={sectionKey} section={section} />;
            case 'features-flow':
              return <FeaturesFlow key={sectionKey} section={section} />;
            case 'features-media':
              return <FeaturesMedia key={sectionKey} section={section} />;
            case 'features-step':
              return <FeaturesStep key={sectionKey} section={section} />;
            case 'showcases':
              return <Showcases key={sectionKey} section={section} />;
            case 'showcases-flow':
              // If section has a custom component, use it instead
              if (section.component) {
                return section.component;
              }
              return <ShowcasesFlow key={sectionKey} section={section} />;
            case 'stats':
              return <Stats key={sectionKey} section={section} />;
            case 'testimonials':
              return <Testimonials key={sectionKey} section={section} />;
            case 'faq':
              return <FAQ key={sectionKey} section={section} />;
            case 'cta':
              return <CTA key={sectionKey} section={section} />;
            case 'subscribe':
              return <Subscribe key={sectionKey} section={section} />;

            default:
              try {
                if (section.component) {
                  return section.component;
                }

                const DynamicBlock = await getThemeBlock(block);
                return (
                  <DynamicBlock
                    key={sectionKey}
                    section={section}
                    {...(data || section.data || {})}
                  />
                );
              } catch (error) {
                console.log(`Dynamic block "${block}" not found`);
                return null;
              }
          }
        })}
    </>
  );
}
