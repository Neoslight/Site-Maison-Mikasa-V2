import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMeta, SITE_URL } from '../data/routeMeta';

const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

interface RouteMetaOverride {
  /** Bare title (without the " | Maison Mikasa" suffix). Bypasses data/routeMeta.ts. */
  title?: string;
  description?: string;
  robots?: string;
}

function setOrCreateMeta(attr: 'name' | 'property', key: string, value: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setOrCreateLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Syncs <head> tags after client-side navigation to match what
 * scripts/prerender.ts already injected into the pre-rendered HTML for the
 * same path — data/routeMeta.ts is the single source of truth for both.
 */
export function useRouteMeta(override?: RouteMetaOverride) {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const title = override?.title ? `${override.title} | Maison Mikasa` : meta.title;
    const description = override?.description ?? meta.description;
    // Routes not resolved by getRouteMeta() (e.g. 404) fall back to the homepage
    // meta internally — self-canonicalizing that fallback would be misleading,
    // so an override always canonicalizes to the actual path instead.
    const canonical = override ? `${SITE_URL}${pathname}` : meta.canonical;

    document.title = title;

    setOrCreateMeta('name', 'description', description);
    setOrCreateMeta('property', 'og:title', title);
    setOrCreateMeta('property', 'og:description', description);
    setOrCreateMeta('property', 'og:url', canonical);
    setOrCreateMeta('property', 'og:image', meta.ogImage);

    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', title);
    setOrCreateMeta('name', 'twitter:description', description);
    setOrCreateMeta('name', 'twitter:image', meta.ogImage);

    setOrCreateMeta('name', 'robots', override?.robots ?? DEFAULT_ROBOTS);

    setOrCreateLink('canonical', canonical);
  }, [pathname, override]);
}
