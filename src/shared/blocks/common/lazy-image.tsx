'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';

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
    <LazyLoadImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      effect="blur" // 支持 blur、opacity 等
      placeholderSrc={placeholderSrc} // 可选
      className={className}
      style={style}
      afterLoad={onLoad} // LazyLoadImage uses afterLoad for onLoad
      onError={onError}
      {...props}
    />
  );
}
