/**
 * Centralized image resolver.
 *
 * Preferred path: bundled images under `assets/images/**` (hashed by Vite at build).
 * Fallback path: root-absolute URL from `public/` if a matching bundled asset is not found.
 */
const bundledImages = import.meta.glob('/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const imageByLogicalPath: Record<string, string> = {};

for (const [fullPath, url] of Object.entries(bundledImages)) {
  const logical = fullPath.replace(/^\/assets\/images\//, '');
  imageByLogicalPath[logical] = url;
}

export function resolveAssetPath(src: string): string {
  if (!src) return src;

  // Keep external URLs untouched (CDN, data URI, etc.).
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src;

  // Accept values like:
  // - "/tassigny/a.webp"
  // - "tassigny/a.webp"
  // - "assets/images/tassigny/a.webp"
  // - "public/tassigny/a.webp"
  const normalized = src
    .replace(/^[./]+/, '')
    .replace(/^public\/+/, '')
    .replace(/^assets\/images\/+/, '')
    .replace(/^\/+/, '');

  const bundled = imageByLogicalPath[normalized];
  if (bundled) return bundled;

  // Safe fallback for still-unmigrated static files in `public/`.
  return `/${normalized}`;
}
