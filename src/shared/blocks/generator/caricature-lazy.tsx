'use client';

import { Wand } from 'lucide-react';
import dynamic from 'next/dynamic';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

function GeneratorSkeleton({ title }: { title?: string }) {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <Card>
        <CardHeader>
          {title && <h2 className="sr-only">{title}</h2>}
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Wand className="h-5 w-5" />
            ChatGPT Caricature Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-muted aspect-square rounded-xl" />
              ))}
            </div>
            <div className="bg-muted h-48 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const CaricatureGeneratorInner = dynamic(
  () =>
    import('@/shared/blocks/generator/caricature').then(
      (mod) => mod.CaricatureGenerator
    ),
  {
    ssr: false,
    loading: () => <GeneratorSkeleton />,
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
