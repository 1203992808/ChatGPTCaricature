'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { AnimatedGridPattern } from '@/shared/components/ui/animated-grid-pattern';
import { Button } from '@/shared/components/ui/button';
import { Highlighter } from '@/shared/components/ui/highlighter';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { SocialAvatars } from './social-avatars';

const createFadeInVariant = (delay: number) => ({
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export function Hero({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const highlightText = section.highlight_text ?? '';
  let texts = null;
  if (highlightText) {
    texts = section.title?.split(highlightText, 2);
  }

  return (
    <>
      <section
        id={section.id}
        className={cn(
          `pt-16 pb-8 md:pt-24 md:pb-8`,
          section.className,
          className
        )}
      >
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <motion.div {...createFadeInVariant(0.15)}>
            {texts && texts.length > 0 ? (
              <h1 className="text-5xl font-extrabold tracking-tight text-balance sm:mt-12 sm:text-7xl">
                <span className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  {texts[0]}
                  {highlightText}
                </span>
                <br />
                <span className="text-foreground mt-2 block text-4xl sm:text-5xl">
                  {texts[1]}
                </span>
              </h1>
            ) : section.title === 'Z Image Turbo AI Image Generator' ? (
              <h1 className="flex flex-col items-center justify-center text-balance font-extrabold tracking-tight sm:mt-6">
                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 bg-clip-text text-3xl text-transparent sm:text-5xl dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-300">
                  Z Image Turbo
                </span>
                <span className="text-foreground mt-2 text-4xl font-bold sm:text-6xl">
                  AI Image Generator
                </span>
              </h1>
            ) : (
              <h1 className="text-foreground text-5xl font-extrabold tracking-tight text-balance sm:mt-12 sm:text-7xl">
                {section.title}
              </h1>
            )}
          </motion.div>

          {section.announcement && (
            <motion.div {...createFadeInVariant(0.2)} className="mt-3 flex justify-center">
              <Link
                href={section.announcement.url || ''}
                target={section.announcement.target || '_self'}
                className="hover:bg-background dark:hover:border-t-border bg-muted group flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
              >
                <span className="text-foreground text-sm">
                  {section.announcement.title}
                </span>
                <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                  <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3" />
                    </span>
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          <motion.p
            {...createFadeInVariant(0.3)}
            className="text-muted-foreground mt-3 mb-5 text-lg text-balance"
            dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
          />

          {section.buttons && (
            <motion.div
              {...createFadeInVariant(0.45)}
              className="flex items-center justify-center gap-4"
            >
              {section.buttons.map((button, idx) => (
                <Button
                  asChild
                  size={button.size || 'default'}
                  variant={button.variant || 'default'}
                  className="px-4 text-sm"
                  key={idx}
                >
                  <Link
                    href={button.url ?? ''}
                    target={button.target ?? '_self'}
                  >
                    {button.icon && <SmartIcon name={button.icon as string} />}
                    <span>{button.title}</span>
                  </Link>
                </Button>
              ))}
            </motion.div>
          )}

          {section.tip && (
            <motion.p
              {...createFadeInVariant(0.6)}
              className="text-muted-foreground mt-6 block text-center text-sm"
              dangerouslySetInnerHTML={{ __html: section.tip ?? '' }}
            />
          )}

          {section.show_avatars && (
            <motion.div {...createFadeInVariant(0.75)}>
              <SocialAvatars tip={section.avatars_tip || ''} />
            </motion.div>
          )}
        </div>

        {section.component && (
          <motion.div {...createFadeInVariant(0.45)}>
            {section.component}
          </motion.div>
        )}
      </section>
      {section.image && (
        <motion.section
          className="border-foreground/10 relative mt-8 border-y sm:mt-16"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.9,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          <div className="relative z-10 mx-auto max-w-6xl border-x px-3">
            <div className="border-x">
              <div
                aria-hidden
                className="h-3 w-full bg-[repeating-linear-gradient(-45deg,var(--color-foreground),var(--color-foreground)_1px,transparent_1px,transparent_4px)] opacity-5"
              />
              <LazyImage
                className="border-border/25 relative z-2 hidden border dark:block"
                src={section.image_invert?.src || section.image?.src || ''}
                alt={section.image_invert?.alt || section.image?.alt || ''}
              />
              <LazyImage
                className="border-border/25 relative z-2 border dark:hidden"
                src={section.image?.src || section.image_invert?.src || ''}
                alt={section.image?.alt || section.image_invert?.alt || ''}
              />
            </div>
          </div>
        </motion.section>
      )}

      {section.background_image ? (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
          <div className="from-background/80 via-background/80 to-background absolute inset-0 z-10 bg-gradient-to-b" />
          <LazyImage
            src={section.background_image?.src || ''}
            alt={section.background_image?.alt || ''}
            className="h-full w-full object-cover opacity-20 blur-[0px]"
          />
        </div>
      ) : section.show_bg !== false ? (
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
          )}
        />
      ) : null}
    </>
  );
}
