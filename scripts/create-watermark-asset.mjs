/**
 * One-off generator for the BRC watermark graphic.
 *
 * Produces assets/watermark/brc-watermark.png: a semi-transparent navy pill
 * containing a white BRC logo and "brakechambers.com".
 *
 * The output PNG is committed to the repo so that the build server never has
 * to render text (Linux build images often have no fonts installed).
 * Re-run only if you want to change the watermark design:
 *   node scripts/create-watermark-asset.mjs
 */
import sharp from 'sharp';

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const LOGO = path.join(ROOT, 'assets/originals/images/logo-brc.png');
const LOGO_FALLBACK = path.join(ROOT, 'public/images/logo-brc.png');
const OUT = path.join(ROOT, 'assets/watermark/brc-watermark.png');

const HEIGHT = 240;
const PAD_X = 56;
const LOGO_H = 168;
const GAP = 34;

async function main() {
  const logoPath = await fs.access(LOGO).then(() => LOGO).catch(() => LOGO_FALLBACK);

  // White silhouette of the logo (keep its alpha, paint it white)
  const logoResized = await sharp(logoPath).resize({ height: LOGO_H }).ensureAlpha().toBuffer({ resolveWithObject: true });
  const alpha = await sharp(logoResized.data).extractChannel(3).toBuffer();
  const whiteLogo = await sharp({
    create: { width: logoResized.info.width, height: logoResized.info.height, channels: 3, background: '#ffffff' },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();

  // Render the text on a wide canvas, then trim it to measure its real width
  const rawText = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="${HEIGHT}">
      <text x="10" y="108" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="72" letter-spacing="3" fill="#ffffff">BRC BRAKE CHAMBERS</text>
      <text x="12" y="176" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="52" letter-spacing="2" fill="#FFB000">brakechambers.com</text>
    </svg>`);
  const text = await sharp(rawText).trim({ threshold: 0 }).png().toBuffer({ resolveWithObject: true });

  const width = PAD_X + logoResized.info.width + GAP + text.info.width + PAD_X;

  const pill = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${HEIGHT}">
      <rect x="0" y="0" width="${width}" height="${HEIGHT}" rx="${HEIGHT / 2}" ry="${HEIGHT / 2}" fill="#0a1929" fill-opacity="0.55"/>
      <rect x="3" y="3" width="${width - 6}" height="${HEIGHT - 6}" rx="${(HEIGHT - 6) / 2}" ry="${(HEIGHT - 6) / 2}" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="3"/>
    </svg>`);

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await sharp(pill)
    .composite([
      { input: whiteLogo, left: PAD_X, top: Math.round((HEIGHT - logoResized.info.height) / 2) },
      {
        input: text.data,
        left: PAD_X + logoResized.info.width + GAP,
        top: Math.round((HEIGHT - text.info.height) / 2),
      },
    ])
    .png()
    .toFile(OUT);

  console.log(`Watermark asset written to ${path.relative(ROOT, OUT)} (${width}x${HEIGHT})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
