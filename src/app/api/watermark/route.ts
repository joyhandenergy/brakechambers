import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

// Watermark template path
const WATERMARK_PATH = path.join(process.cwd(), 'assets', 'watermark', 'brc-watermark.png');

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  // Security check: only allow images from Sanity CDN or internal paths
  const isSanity = url.startsWith('https://cdn.sanity.io/');
  const isInternal = url.startsWith('/') && !url.startsWith('//');
  if (!isSanity && !isInternal) {
    return new NextResponse('Domain not allowed', { status: 403 });
  }

  try {
    let imageBuffer: Buffer;

    if (isInternal) {
      const localPath = path.join(process.cwd(), 'public', url);
      imageBuffer = await fs.readFile(localPath);
    } else {
      const res = await fetch(url);
      if (!res.ok) {
        return new NextResponse('Failed to fetch image from CDN', { status: res.status });
      }
      imageBuffer = Buffer.from(await res.arrayBuffer());
    }

    const baseSharp = sharp(imageBuffer).rotate();
    const meta = await baseSharp.metadata();

    // If image is very small (like an icon), return clean
    if (!meta.width || !meta.height || meta.width < 300) {
      return new NextResponse(new Uint8Array(imageBuffer), {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    const wmWidth = Math.round(Math.min(Math.max(meta.width * 0.32, 180), 500));
    const wm = await sharp(WATERMARK_PATH)
      .resize({ width: wmWidth })
      .ensureAlpha()
      .linear([1, 1, 1, 0.85], [0, 0, 0, 0])
      .png()
      .toBuffer({ resolveWithObject: true });

    const margin = Math.max(12, Math.round(meta.width * 0.025));
    const left = Math.max(0, meta.width - wm.info.width - margin);
    const top = Math.max(0, meta.height - wm.info.height - margin);

    const watermarked = await baseSharp
      .composite([{ input: wm.data, left, top }])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();

    return new NextResponse(new Uint8Array(watermarked), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: any) {
    console.error('Error watermarking dynamic image:', err);
    return new NextResponse('Internal error processing image', { status: 500 });
  }
}
