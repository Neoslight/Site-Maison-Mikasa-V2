/**
 * Static prerender script — run after `vite build` and `vite build --ssr entry-server.tsx`.
 *
 * Usage (via package.json build:ssg):
 *   vite build && vite build --ssr entry-server.tsx && tsx scripts/prerender.ts
 *
 * For each route, renders the app to HTML using the SSR bundle and injects it
 * into the built index.html shell — including per-route <head> tags (title,
 * description, OG, Twitter, canonical). Each route gets its own
 * dist/{route}/index.html file so crawlers see the correct meta without JS.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { getAllPrerenderRoutes, getRouteMeta, type RouteMeta } from '../data/routeMeta';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

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

function injectMeta(template: string, meta: RouteMeta): string {
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

  console.log(`\n[prerender] Done — ${prerenderedCount}/${routes.length} routes prerendered.`);
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
