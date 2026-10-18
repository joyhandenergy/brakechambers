import fs from 'fs';
import path from 'path';
import { createClient } from 'next-sanity';
import { blogPosts } from '../src/data/blogPosts';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gt5606kp';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
let token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  try {
    const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8');
    const match = envFile.match(/SANITY_API_WRITE_TOKEN=([^\r\n]+)/);
    if (match) token = match[1].trim();
  } catch (err) {}
}

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function parseDateToIso(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (err) {
    // fallback
  }
  return dateStr;
}

// Old document IDs from initial setup that should be cleaned up
const OLD_DOC_IDS = [
  'post-arctic-mining-success',
  'post-how-to-buy-brake-chambers-trucks-trailers',
  'post-how-to-diagnose-air-leaks-spring-brake-chambers',
  'post-air-disc-brakes-vs-drum-brakes-future-of-trucking',
  'post-brake-chamber-sizing-guide-type-30-24-16',
  'post-usa-brake-chamber-regulations-fmvss-121-compliance',
  'post-fleet-brake-maintenance-reduce-downtime-save-money',
];

async function main() {
  console.log(`Starting Blog Migration to Sanity (${projectId}/${dataset})...`);

  // Step 1: Upload assets and upsert documents
  for (const post of blogPosts) {
    console.log(`\nProcessing: "${post.title}" (${post.slug})`);

    let assetRef: string | null = null;
    const localImagePath = path.join(process.cwd(), 'public', post.imageUrl.replace(/^\//, ''));

    if (fs.existsSync(localImagePath)) {
      console.log(`  Uploading asset: ${localImagePath}`);
      try {
        const stream = fs.createReadStream(localImagePath);
        const asset = await client.assets.upload('image', stream, {
          filename: path.basename(localImagePath),
        });
        assetRef = asset._id;
        console.log(`  Asset uploaded successfully: ${assetRef}`);
      } catch (err: any) {
        console.warn(`  Warning: Failed to upload image asset: ${err.message}`);
      }
    } else {
      console.log(`  Note: Local image file not found at ${localImagePath}, retaining imageUrl path`);
    }

    const docId = `post-${post.slug}`;
    const publishedAt = parseDateToIso(post.date);

    const doc: any = {
      _id: docId,
      _type: 'post',
      title: post.title,
      slug: {
        _type: 'slug',
        current: post.slug,
      },
      category: post.category,
      publishedAt: publishedAt,
      readTime: post.readTime,
      excerpt: post.excerpt,
      imageUrl: post.imageUrl,
      contentHtml: post.content,
      seo: {
        _type: 'seo',
        metaTitle: post.metaTitle || `${post.title} | BRC Brake Chambers`,
        metaDescription: post.metaDescription || post.excerpt,
        keywords: post.tags || [],
      },
    };

    if (assetRef) {
      doc.mainImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetRef,
        },
        alt: post.title,
      };
    }

    const res = await client.createOrReplace(doc);
    console.log(`  Saved to Sanity: ID=${res._id}`);
  }

  // Step 2: Clean up old documents with outdated IDs (if different from new IDs)
  console.log('\nChecking for old documents to clean up...');
  const newDocIds = new Set(blogPosts.map((p) => `post-${p.slug}`));
  for (const oldId of OLD_DOC_IDS) {
    if (!newDocIds.has(oldId)) {
      try {
        console.log(`  Deleting obsolete doc: ${oldId}`);
        await client.delete(oldId);
      } catch (err: any) {
        console.log(`  (Note: ${oldId} already removed or not found)`);
      }
    }
  }

  // Step 3: Verify total posts in Sanity
  const sanityPosts = await client.fetch<any[]>('*[_type == "post"] | order(publishedAt desc)');
  console.log(`\nMigration completed successfully! Total posts in Sanity: ${sanityPosts.length}`);
  sanityPosts.forEach((p, idx) => {
    console.log(`  [${idx + 1}] ${p.title}`);
    console.log(`      Slug: /blog/${p.slug?.current}`);
    console.log(`      Category: ${p.category} | Date: ${p.publishedAt} | Image: ${p.mainImage ? 'Asset uploaded' : p.imageUrl}`);
    console.log(`      SEO: "${p.seo?.metaTitle}"`);
  });
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
