/**
 * BRC image watermarking pipeline
 * ================================
 *
 * Clean originals live in   assets/originals/<path>   (never served)
 * Watermarked copies go to  public/<path>              (served on the site)
 *
 * e.g. assets/originals/productsImage/abc.jpg  ->  public/productsImage/abc.jpg
 *
 * Runs automatically before `npm run dev` and `npm run build` (predev / prebuild),
 * so new images get watermarked on every deploy. Run it by hand anytime with:
 *   npm run watermark
 *
 * Adding or updating images:
 *   - You can drop new or updated images straight into public/images,
 *     public/productsImage, or public/blogImage as you normally do.
 *   - On the next run, the pipeline automatically adopts the clean originals
 *     into assets/originals/ and replaces the public/ copies with watermarked versions.
 *   - Alternatively, you can save clean originals directly into assets/originals/.
 *
 * Only changed or new files are reprocessed (tracked in assets/.watermark-manifest.json).
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'assets', 'originals');
const OUT_DIR = path.join(ROOT, 'public');
const WATERMARK = path.join(ROOT, 'assets', 'watermark', 'brc-watermark.png');
const MANIFEST = path.join(ROOT, 'assets', '.watermark-manifest.json');

/** Folders under public/ managed by this pipeline */
const MANAGED_DIRS = ['images', 'productsImage', 'blogImage'];

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

/** Files copied through untouched (logos, decorative watermarks, icons, favicons) */
const EXCLUDE = [
  /logo/i,
  /watermark/i,
  /favicon/i,
  /apple-touch-icon/i,
  /^icon-\d+/i,
  /^icon\./i,
];

/** Watermark appearance settings */
const SETTINGS = {
  widthRatio: 0.32,      // watermark width relative to image width
  minWidth: 180,         // minimum watermark width in px
  maxWidth: 500,         // maximum watermark width in px
  marginRatio: 0.025,    // margin from edges relative to image width
  minMargin: 12,         // minimum margin in px
  opacity: 0.85,         // watermark opacity (0 to 1)
  skipBelowWidth: 300,   // images narrower than 300px are copied untouched
  jpegQuality: 88,
  webpQuality: 88,
};

const sha1 = (buf) => crypto.createHash('sha1').update(buf).digest('hex');

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      return e.isDirectory() ? walk(full) : [full];
    })
  );
  return files.flat();
}

const toPosix = (p) => p.split(path.sep).join('/');

async function loadManifest(version) {
  try {
    const data = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
    return {
      version: data.version,
      files: data.files || {},
      stale: data.version !== version,
    };
  } catch {
    return { version, files: {}, stale: true };
  }
}

/**
 * Adopts new or updated clean images from public/ into assets/originals/.
 * Uses safe copyFile so no files are ever deleted or lost.
 */
async function adoptNewPublicImages(manifest) {
  let adopted = 0;
  for (const dir of MANAGED_DIRS) {
    const fullDir = path.join(OUT_DIR, dir);
    if (!existsSync(fullDir)) continue;
    const files = await walk(fullDir);

    for (const file of files) {
      const rel = toPosix(path.relative(OUT_DIR, file));
      const dest = path.join(SRC_DIR, rel);
      const ext = path.extname(file).toLowerCase();

      if (!IMAGE_EXT.has(ext)) continue;

      const publicBuffer = await fs.readFile(file);
      const publicHash = sha1(publicBuffer);
      const record = manifest.files[rel];

      // If we already generated this file and it matches our watermark output hash, skip it
      if (record && record.outHash === publicHash) {
        continue;
      }

      // If destination clean original doesn't exist, this is a new image to adopt
      if (!existsSync(dest)) {
        await fs.mkdir(path.dirname(dest), { recursive: true });
        await fs.copyFile(file, dest);
        adopted++;
        console.log(`  + adopted new original: ${rel}`);
        continue;
      }

      // If clean original exists, but someone updated the public/ copy directly
      if (record && record.cleanHash) {
        const destHash = sha1(await fs.readFile(dest));
        if (publicHash !== destHash && publicHash !== record.outHash) {
          await fs.copyFile(file, dest);
          adopted++;
          console.log(`  + adopted updated original: ${rel}`);
        }
      }
    }
  }
  return adopted;
}

async function buildWatermark(imageWidth) {
  const width = Math.round(
    Math.min(
      Math.max(imageWidth * SETTINGS.widthRatio, SETTINGS.minWidth),
      SETTINGS.maxWidth,
      imageWidth * 0.6
    )
  );
  return sharp(WATERMARK)
    .resize({ width })
    .ensureAlpha()
    .linear([1, 1, 1, SETTINGS.opacity], [0, 0, 0, 0])
    .png()
    .toBuffer({ resolveWithObject: true });
}

async function watermarkFile(srcPath, outPath) {
  const ext = path.extname(srcPath).toLowerCase();

  // Normalize orientation via EXIF before compositing
  const { data: base, info } = await sharp(srcPath).rotate().toBuffer({ resolveWithObject: true });

  if (info.width < SETTINGS.skipBelowWidth) {
    await fs.copyFile(srcPath, outPath);
    return 'copied (small)';
  }

  const wm = await buildWatermark(info.width);
  const margin = Math.max(SETTINGS.minMargin, Math.round(info.width * SETTINGS.marginRatio));
  const left = Math.max(0, info.width - wm.info.width - margin);
  const top = Math.max(0, info.height - wm.info.height - margin);

  let pipeline = sharp(base).composite([{ input: wm.data, left, top }]);
  if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 9 });
  else if (ext === '.webp') pipeline = pipeline.webp({ quality: SETTINGS.webpQuality });
  else pipeline = pipeline.jpeg({ quality: SETTINGS.jpegQuality, mozjpeg: true });

  await pipeline.toFile(outPath);
  return 'watermarked';
}

async function main() {
  if (!existsSync(WATERMARK)) {
    throw new Error(`Watermark asset missing: ${WATERMARK}. Run: node scripts/create-watermark-asset.mjs`);
  }

  const version = sha1(
    Buffer.concat([await fs.readFile(WATERMARK), Buffer.from(JSON.stringify(SETTINGS))])
  );
  const manifest = await loadManifest(version);
  const nextFiles = {};

  console.log('[watermark] Scanning for images...');
  const adopted = await adoptNewPublicImages(manifest);

  const sources = await walk(SRC_DIR);
  let processed = 0;
  let skipped = 0;

  for (const srcPath of sources) {
    const rel = toPosix(path.relative(SRC_DIR, srcPath));
    const outPath = path.join(OUT_DIR, rel);
    const srcBuffer = await fs.readFile(srcPath);
    const cleanHash = sha1(srcBuffer);

    const prevRecord = manifest.files[rel];
    if (
      !manifest.stale &&
      prevRecord &&
      prevRecord.cleanHash === cleanHash &&
      existsSync(outPath)
    ) {
      nextFiles[rel] = prevRecord;
      skipped++;
      continue;
    }

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    const ext = path.extname(srcPath).toLowerCase();
    const excluded = EXCLUDE.some((re) => re.test(path.basename(srcPath)));

    let result;
    if (!IMAGE_EXT.has(ext) || excluded) {
      await fs.copyFile(srcPath, outPath);
      result = excluded ? 'copied (excluded)' : 'copied';
    } else {
      try {
        result = await watermarkFile(srcPath, outPath);
      } catch (err) {
        console.warn(`  ! failed on ${rel}, copying original: ${err.message}`);
        await fs.copyFile(srcPath, outPath);
        result = 'copied (fallback)';
      }
    }

    const outBuffer = await fs.readFile(outPath);
    nextFiles[rel] = {
      cleanHash,
      outHash: sha1(outBuffer),
    };

    processed++;
    console.log(`  - ${rel}: ${result}`);
  }

  // Check for deleted files
  let removed = 0;
  for (const rel of Object.keys(manifest.files)) {
    if (!nextFiles[rel]) {
      const outPath = path.join(OUT_DIR, rel);
      if (existsSync(outPath)) {
        await fs.unlink(outPath);
        removed++;
        console.log(`  x removed: ${rel}`);
      }
    }
  }

  const sorted = Object.fromEntries(
    Object.entries(nextFiles).sort(([a], [b]) => a.localeCompare(b))
  );
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
  await fs.writeFile(MANIFEST, JSON.stringify({ version, files: sorted }, null, 2) + '\n');

  console.log(
    `[watermark] Complete. ${processed} processed, ${skipped} unchanged, ${adopted} adopted originals, ${removed} removed.`
  );
}

main().catch((err) => {
  console.error('[watermark] Failed:', err);
  process.exit(1);
});
