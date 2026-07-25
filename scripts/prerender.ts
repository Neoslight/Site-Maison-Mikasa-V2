/**
 * Static prerender script — run after `vite build`, `vite build --ssr entry-server.tsx`
 * and `generate-og-images.ts`.
 *
 * Usage (via package.json build:ssg):
 *   vite build && vite build --ssr entry-server.tsx && tsx scripts/generate-og-images.ts && tsx scripts/prerender.ts
 *
 * For each route, renders the app to HTML using the SSR bundle and injects it
 * into the built index.html shell — including per-route <head> tags (title,
 * description, OG, Twitter, canonical, robots). Each route gets its own
 * dist/{route}/index.html file so crawlers see the correct meta without JS.
 *
 * Also prerenders a dist/404.html (served automatically by Vercel for
 * unmatched paths — see vercel.json), and writes dist/sitemap.xml from the
 * same route list so it can never drift from what's actually published.
 * (The LCP hero preload tag is handled by React 19 itself: it hoists a
 * correctly-hashed <link rel="preload"> for each page's eager image during
 * this very SSR render, so no manual manifest lookup is needed here.)
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { getAllPrerenderRoutes, getRouteMeta, SITE_URL, type RouteMeta } from '../data/routeMeta';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceTag(template: string, pattern: RegExp, replacement: string): string {
  return pattern.test(template) ? template.replace(pattern, replacement) : template;
}

interface InjectOptions {
  robots?: string; // defaults to DEFAULT_ROBOTS
}

function injectMeta(template: string, meta: RouteMeta, options: InjectOptions = {}): string {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const ogImage = escapeHtml(meta.ogImage);
  const canonical = escapeHtml(meta.canonical);

  let html = template;

  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);

  html = replaceTag(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${description}">`
  );

  html = replaceTag(
    html,
    /<meta\s+name="robots"[^>]*>/,
    `<meta name="robots" content="${escapeHtml(options.robots ?? DEFAULT_ROBOTS)}">`
  );

  html = replaceTag(
    html,
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${title}">`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${description}">`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:url"[^>]*>/,
    `<meta property="og:url" content="${canonical}">`
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image"[^>]*>/,
    `<meta property="og:image" content="${ogImage}">`
  );

  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${title}">`
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${description}">`
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:image"[^>]*>/,
    `<meta name="twitter:image" content="${ogImage}">`
  );

  const canonicalTag = `<link rel="canonical" href="${canonical}">`;
  if (/<link\s+rel="canonical"[^>]*>/.test(html)) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/, canonicalTag);
  } else {
    html = html.replace('</head>', `    ${canonicalTag}\n  </head>`);
  }

  return html;
}

const SITEMAP_PRIORITY: Record<string, { priority: string; changefreq: string }> = {
  '/': { priority: '1.0', changefreq: 'monthly' },
  '/prestations': { priority: '0.9', changefreq: 'monthly' },
  '/realisations': { priority: '0.9', changefreq: 'weekly' },
  '/realisations/maison': { priority: '0.7', changefreq: 'weekly' },
  '/realisations/appartement': { priority: '0.7', changefreq: 'weekly' },
  '/realisations/professionnel': { priority: '0.7', changefreq: 'weekly' },
  '/a-propos': { priority: '0.8', changefreq: 'monthly' },
  '/contact': { priority: '0.8', changefreq: 'yearly' },
  '/rendez-vous': { priority: '0.7', changefreq: 'yearly' },
  '/mentions-legales': { priority: '0.3', changefreq: 'yearly' },
};

function sitemapEntryFor(route: string): { priority: string; changefreq: string } {
  if (SITEMAP_PRIORITY[route]) return SITEMAP_PRIORITY[route];
  if (route.startsWith('/architecte-interieur-')) return { priority: '0.8', changefreq: 'monthly' };
  if (route.startsWith('/realisations/')) return { priority: '0.6', changefreq: 'yearly' };
  return { priority: '0.5', changefreq: 'monthly' };
}

async function writeSitemap(routes: string[]) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => {
      const { priority, changefreq } = sitemapEntryFor(route);
      const loc = `${SITE_URL}${route === '/' ? '/' : route}`;
      return `  <url>
    <loc>${escapeHtml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`[prerender] ✓ sitemap.xml (${routes.length} URLs)`);
}

async function prerender() {
  const ssrBundlePath = path.join(distDir, 'server', 'entry-server.js');
  const { render } = (await import(pathToFileURL(ssrBundlePath).href)) as {
    render: (url: string) => string;
  };

  const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');
  const routes = getAllPrerenderRoutes();

  let prerenderedCount = 0;

  for (const url of routes) {
    try {
      const appHtml = render(url);

      if (!appHtml) {
        console.warn(`[prerender] Skipped (SSR returned empty): ${url}`);
        continue;
      }

      const meta = getRouteMeta(url);
      const withMeta = injectMeta(template, meta);
      const html = withMeta.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      const outFile =
        url === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, url.slice(1), 'index.html');

      await fs.mkdir(path.dirname(outFile), { recursive: true });
      await fs.writeFile(outFile, html, 'utf-8');
      prerenderedCount++;
      console.log(`[prerender] ✓ ${url}`);
    } catch (err) {
      console.warn(`[prerender] ✗ ${url} — ${(err as Error).message}`);
    }
  }

  // 404 page — served automatically by Vercel (via vercel.json / static
  // hosting convention) for any path that doesn't match a prerendered route.
  try {
    const notFoundHtml = render('/__not_found__');
    const notFoundMeta: RouteMeta = {
      title: 'Page introuvable | Maison Mikasa',
      description: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
      ogImage: getRouteMeta('/').ogImage,
      canonical: `${SITE_URL}/404`,
    };
    const withMeta = injectMeta(template, notFoundMeta, { robots: 'noindex, follow' });
    const html = withMeta.replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`);
    await fs.writeFile(path.join(distDir, '404.html'), html, 'utf-8');
    console.log('[prerender] ✓ 404.html');
  } catch (err) {
    console.warn('[prerender] ✗ 404.html —', (err as Error).message);
  }

  await writeSitemap(routes);

  console.log(`\n[prerender] Done — ${prerenderedCount}/${routes.length} routes prerendered.`);
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
