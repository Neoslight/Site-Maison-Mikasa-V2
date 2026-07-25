import React from 'react';
import { resolveAssetPath } from '../../lib/resolveAssetPath';
import { resolveResponsiveImage } from '../../lib/images';

interface ImgProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Responsive <img>: serves the right width for the viewport via srcset/sizes
 * and sets width/height from the source file to prevent layout shift.
 * Falls back to a plain <img> for external URLs (e.g. picsum placeholders
 * on unpublished projects) that vite-imagetools never processed.
 */
const Img: React.FC<ImgProps> = ({
  src,
  alt,
  sizes,
  className,
  loading = 'lazy',
  fetchPriority,
}) => {
  const responsive = resolveResponsiveImage(src);

  if (!responsive) {
    return (
      <img
        src={resolveAssetPath(src)}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className={className}
      />
    );
  }

  return (
    <img
      src={responsive.src}
      srcSet={responsive.srcSet}
      sizes={sizes}
      width={responsive.width}
      height={responsive.height}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      className={className}
    />
  );
};

export default Img;
