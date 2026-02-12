'use client';

import dynamic from 'next/dynamic';

const CaricatureGeneratorInner = dynamic(
  () =>
    import('@/shared/blocks/generator/caricature').then(
      (mod) => mod.CaricatureGenerator
    ),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-5xl px-4 py-6 md:py-8">
        <div className="animate-pulse space-y-4">
          <div className="bg-muted h-12 rounded-lg" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-muted aspect-square rounded-xl" />
            ))}
          </div>
          <div className="bg-muted h-48 rounded-xl" />
        </div>
      </div>
    ),
  }
);

export function CaricatureGeneratorLazy({
  srOnlyTitle,
  className,
}: {
  srOnlyTitle: string;
  className?: string;
}) {
  return (
    <CaricatureGeneratorInner srOnlyTitle={srOnlyTitle} className={className} />
  );
}
