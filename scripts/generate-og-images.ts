/**
 * Generates static 1200x630 JPEG Open Graph images from the project source
 * photos, written to dist/og/{slug}.jpg. Run after `vite build` (which
 * creates `dist/`) and before `prerender.ts` (which references these paths
 * in the OG/Twitter meta tags).
 *
 * Sources are read from `assets/images/**` (not the hashed `dist/assets/`
 * output) since the output filename here is stable and never hashed.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { projectsData } from '../data/projects';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'assets', 'images');
const ogDir = path.join(rootDir, 'dist', 'og');

async function generateOg(sourceRelPath: string, slug: string) {
  const sourcePath = path.join(imagesDir, sourceRelPath);
  const outPath = path.join(ogDir, `${slug}.jpg`);

  await sharp(sourcePath)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82 })
    .toFile(outPath);

  console.log(`[og] ✓ ${slug}.jpg`);
}

async function run() {
  await fs.mkdir(ogDir, { recursive: true });

  await generateOg('homepage-photo-accueil.webp', 'home');

  const visibleProjects = projectsData.filter((p) => !p.hidden);
  for (const project of visibleProjects) {
    if (project.coverImage.startsWith('http')) {
      console.warn(`[og] ✗ ${project.id} — coverImage is an external placeholder, skipped`);
      continue;
    }
    await generateOg(project.coverImage.replace(/^\/+/, ''), project.id);
  }

  console.log(`\n[og] Done — ${visibleProjects.length + 1} images generated.`);
}

run().catch((err) => {
  console.error('[og] Fatal error:', err);
  process.exit(1);
});
