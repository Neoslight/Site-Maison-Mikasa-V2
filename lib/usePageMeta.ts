import { useEffect } from 'react';

interface PageMetaOptions {
  ogImage?: string; // absolute URL
  ogUrl?: string; // absolute URL
  canonical?: string; // absolute URL
}

function setOrCreate(selector: string, attr: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    if (attr === 'name') el.name = selector.match(/name="([^"]+)"/)?.[1] ?? '';
    if (attr === 'property')
      el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] ?? '');
    document.head.appendChild(el);
  }
  el.content = value;
  return el;
}

function setOrCreateLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
  return el;
}

export function usePageMeta(title: string, description?: string, options?: PageMetaOptions) {
  useEffect(() => {
    const BASE_URL = 'https://www.maisonmikasa.fr';
    const fullTitle = `${title} | Maison Mikasa`;

    // Title
    document.title = fullTitle;

    // Description
    if (description) {
      setOrCreate('meta[name="description"]', 'name', description);
    }

    // Open Graph
    setOrCreate('meta[property="og:title"]', 'property', fullTitle);
    if (description) {
      setOrCreate('meta[property="og:description"]', 'property', description);
    }
    if (options?.ogImage) {
      setOrCreate('meta[property="og:image"]', 'property', options.ogImage);
    }
    if (options?.ogUrl) {
      setOrCreate('meta[property="og:url"]', 'property', options.ogUrl);
    }

    // Twitter Cards
    setOrCreate('meta[name="twitter:card"]', 'name', 'summary_large_image');
    setOrCreate('meta[name="twitter:title"]', 'name', fullTitle);
    if (description) {
      setOrCreate('meta[name="twitter:description"]', 'name', description);
    }
    if (options?.ogImage) {
      setOrCreate('meta[name="twitter:image"]', 'name', options.ogImage);
    }

    // Canonical
    const canonical = options?.canonical ?? `${BASE_URL}${window.location.pathname}`;
    setOrCreateLink('canonical', canonical);

    return () => {
      document.title = 'Maison Mikasa';
    };
  }, [title, description, options?.ogImage, options?.ogUrl, options?.canonical]);
}
