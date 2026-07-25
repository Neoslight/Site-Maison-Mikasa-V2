/**
 * Responsive image data, generated at build time by vite-imagetools from the
 * same `assets/images/**` tree as lib/resolveAssetPath.ts. Powers
 * components/ui/Img.tsx: srcset (multiple widths) + a single fallback URL +
 * intrinsic width/height (prevents layout shift).
 */
// import.meta.glob options must be a static object literal — Vite parses it at
// build time, so the widths string can't be extracted into a shared constant.
const srcsetGlob = import.meta.glob('/assets/images/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: { w: '480;768;1200;1920', format: 'webp', as: 'srcset' },
  import: 'default',
}) as Record<string, string>;

const fallbackGlob = import.meta.glob('/assets/images/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: { w: '1200', format: 'webp' },
  import: 'default',
}) as Record<string, string>;

const metaGlob = import.meta.glob('/assets/images/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: { format: 'webp', as: 'metadata' },
  import: 'default',
}) as Record<string, { width: number; height: number }>;

export interface ResponsiveImage {
  src: string;
  srcSet: string;
  width?: number;
  height?: number;
}

const responsiveByLogicalPath: Record<string, ResponsiveImage> = {};

for (const [fullPath, srcSet] of Object.entries(srcsetGlob)) {
  const logical = fullPath.replace(/^\/assets\/images\//, '');
  const fallback = fallbackGlob[fullPath];
  const meta = metaGlob[fullPath];
  if (!fallback) continue;
  responsiveByLogicalPath[logical] = {
    src: fallback,
    srcSet,
    width: meta?.width,
    height: meta?.height,
  };
}

/** Same normalization as resolveAssetPath — accepts "/tassigny/a.webp", "tassigny/a.webp", etc. */
function normalize(src: string): string {
  return src
    .replace(/^[./]+/, '')
    .replace(/^public\/+/, '')
    .replace(/^assets\/images\/+/, '')
    .replace(/^\/+/, '');
}

export function resolveResponsiveImage(src: string): ResponsiveImage | undefined {
  if (!src) return undefined;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return undefined;
  return responsiveByLogicalPath[normalize(src)];
}
