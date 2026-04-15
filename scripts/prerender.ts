/**
 * Static prerender script — run after `vite build` and `vite build --ssr entry-server.tsx`.
 *
 * Usage (via package.json build:ssg):
 *   vite build && vite build --ssr entry-server.tsx && tsx scripts/prerender.ts
 *
 * For each route, renders the app to HTML using the SSR bundle and injects it into
 * the built index.html shell. Each route gets its own dist/{route}/index.html file,
 * making the content immediately readable by all crawlers without JavaScript.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

// All routes to prerender (must match App.tsx routes + project IDs that are visible)
const ROUTES: string[] = [
  '/',
  '/a-propos',
  '/prestations',
  '/realisations',
  '/realisations/maison',
  '/realisations/appartement',
  '/realisations/professionnel',
  '/contact',
  '/rendez-vous',
  // Visible project pages (hidden:false in data/projects.ts)
  '/realisations/app-1',
  '/realisations/app-2',
  '/realisations/mai-1',
  '/realisations/mai-3',
  '/realisations/mai-4',
  '/realisations/pro-1',
];

async function prerender() {
  // Load the SSR bundle built by `vite build --ssr entry-server.tsx --outDir dist/server`
  // pathToFileURL required on Windows (absolute paths must be file:// URLs in ESM)
  const ssrBundlePath = path.join(distDir, 'server', 'entry-server.js');
  const { render } = (await import(pathToFileURL(ssrBundlePath).href)) as {
    render: (url: string) => string;
  };

  // Read the built HTML template (client shell)
  const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');

  let prerenderedCount = 0;

  for (const url of ROUTES) {
    try {
      const appHtml = render(url);

      if (!appHtml) {
        console.warn(`[prerender] Skipped (SSR returned empty): ${url}`);
        continue;
      }

      const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Compute output path: '/' → dist/index.html, '/a-propos' → dist/a-propos/index.html
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

  console.log(`\n[prerender] Done — ${prerenderedCount}/${ROUTES.length} routes prerendered.`);
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
