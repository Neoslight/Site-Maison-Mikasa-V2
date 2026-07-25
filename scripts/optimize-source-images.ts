/**
 * One-shot maintenance script — NOT part of the build pipeline.
 *
 * Re-encodes every image under assets/images/** in place: caps the long side
 * at 2400px (most images here are full camera resolution, up to 4795px wide,
 * far beyond anything actually rendered on the site) and re-compresses to
 * WebP quality 78. Run manually after adding new project photos:
 *
 *   npx tsx scripts/optimize-source-images.ts
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, '../assets/images');

const MAX_DIMENSION = 2400;
const QUALITY = 78;

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.webp$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function optimize(file: string): Promise<{ before: number; after: number }> {
  const before = (await fs.stat(file)).size;
  const input = await fs.readFile(file);
  const image = sharp(input);
  const meta = await image.metadata();
  const needsResize = (meta.width ?? 0) > MAX_DIMENSION || (meta.height ?? 0) > MAX_DIMENSION;

  const pipeline = needsResize
    ? image.resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true,
      })
    : image;

  const output = await pipeline.webp({ quality: QUALITY }).toBuffer();
  await fs.writeFile(file, output);
  return { before, after: output.length };
}

async function run() {
  const files = await walk(imagesDir);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const { before, after } = await optimize(file);
    totalBefore += before;
    totalAfter += after;
    console.log(
      `[optimize] ${path.relative(imagesDir, file)} — ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`
    );
  }

  console.log(
    `\n[optimize] Done — ${files.length} images, ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
}

run().catch((err) => {
  console.error('[optimize] Fatal error:', err);
  process.exit(1);
});
