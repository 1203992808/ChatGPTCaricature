'use client';

import { cn } from '@/shared/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderSrc?: string;
  title?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  [key: string]: any;
}

export function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  placeholderSrc,
  title,
  fill,
  priority,
  sizes,
  style,
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      title={title}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn(fill && 'absolute inset-0 h-full w-full', className)}
      style={style}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
}
