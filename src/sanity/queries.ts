import { groq } from 'next-sanity';
import { client } from './lib/client';
import { BrakeChamber, BrakeAccessory, BlogPost } from '@/types';
import { blogPosts } from '@/data/blogPosts';

// We project the data to match the existing TypeScript interfaces 
// so the rest of the application doesn't need to change.
export const allProductsQuery = groq`*[_type == "product"] {
  "slug": slug.current,
  name,
  brandSlug,
  category,
  priceUSD,
  type,
  modelDesignation,
  brakingMethod,
  strokeSize,
  strokeInch,
  pushRodLengthInch,
  dutySpec,
  mountType,
  application,
  crossReferenceBrands,
  oemPartNumbers,
  hiddenSearchTags,
  material,
  includedItems,
  description,
  specifications,
  galleryUrls,
  factoryVideoUrl,
  promoVideoUrl,
  stock,
  publishedAt,
  moq,
  palletQuantity,
  "uploadedImages": images[].asset->url,
  "seo": seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`;

export const allBlogPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  category,
  "publishDate": publishedAt,
  readTime,
  excerpt,
  "imageUrl": coalesce(mainImage.asset->url, imageUrl, "/images/pageheaders/brc_blog.jpg"),
  "featuredImageUrl": coalesce(mainImage.asset->url, imageUrl, "/images/pageheaders/brc_blog.jpg"),
  body,
  "content": contentHtml,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "tags": coalesce(seo.keywords, [])
}`;

export const singleBlogPostQuery = groq`*[_type == "post" && (slug.current == $slug || slug.current == $canonicalSlug)][0] {
  "slug": slug.current,
  title,
  category,
  "publishDate": publishedAt,
  readTime,
  excerpt,
  "imageUrl": coalesce(mainImage.asset->url, imageUrl, "/images/pageheaders/brc_blog.jpg"),
  "featuredImageUrl": coalesce(mainImage.asset->url, imageUrl, "/images/pageheaders/brc_blog.jpg"),
  body,
  "content": contentHtml,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "tags": coalesce(seo.keywords, [])
}`;

export const allPagesQuery = groq`*[_type == "page"] {
  title,
  path,
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`;

function sanitizeChinese<T>(data: T): T {
  if (typeof data === 'string') {
    return (data as string)
      .replace(/[\u4e00-\u9fa5]/g, '')
      .replace(/\s*\(\s*\)/g, '')
      .replace(/\s*（\s*）/g, '')
      .trim() as unknown as T;
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeChinese(item)) as unknown as T;
  }
  if (data !== null && typeof data === 'object') {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(data)) {
      cleaned[key] = sanitizeChinese(value);
    }
    return cleaned as T;
  }
  return data;
}

import { BRAKE_CHAMBERS } from '@/lib/data';

export async function getProducts(): Promise<BrakeChamber[]> {
  try {
    const products = await client.fetch(allProductsQuery, {}, { next: { revalidate: 60 } });
    if (products && Array.isArray(products) && products.length > 0) {
      const sanitized = sanitizeChinese(products);
      return sanitized.map((p: any) => {
        // Map legacy /products/ to new /productsImage/ folder
        const rawGallery = p.galleryUrls || [];
        const normalizedGallery = rawGallery.map((url: string) => {
          if (typeof url === 'string') {
            return url.replace(/^\/products\//, '/productsImage/');
          }
          return url;
        });

        // If images are uploaded in Sanity Studio, put them first
        const galleryUrls = p.uploadedImages && p.uploadedImages.length > 0
          ? [...p.uploadedImages, ...normalizedGallery]
          : (normalizedGallery.length > 0 ? normalizedGallery : ['/productsImage/brc-t16-single-brake-1.jpg']);

        const fallbackChamber = BRAKE_CHAMBERS.find(b => b.slug === p.slug);
        const oemPartNumbers = (p.oemPartNumbers && p.oemPartNumbers.length > 0)
          ? p.oemPartNumbers
          : fallbackChamber?.oemPartNumbers;
        const hiddenSearchTags = (p.hiddenSearchTags && p.hiddenSearchTags.length > 0)
          ? p.hiddenSearchTags
          : fallbackChamber?.hiddenSearchTags;
        const crossReferenceBrands = (p.crossReferenceBrands && p.crossReferenceBrands.length > 0)
          ? p.crossReferenceBrands
          : fallbackChamber?.crossReferenceBrands;

        return {
          ...p,
          oemPartNumbers: oemPartNumbers || [],
          hiddenSearchTags: hiddenSearchTags || [],
          crossReferenceBrands: crossReferenceBrands || fallbackChamber?.crossReferenceBrands || [],
          galleryUrls,
          imageUrl: galleryUrls[0] || '/productsImage/brc-t16-single-brake-1.jpg',
        };
      });
    }
  } catch (err) {
    console.warn('Sanity getProducts fetch failed or timed out, using fallback:', err);
  }
  return BRAKE_CHAMBERS;
}

export function resolveBlogCategory(category?: string, slug?: string): string {
  // Direct post-level assignment requested
  if (slug === 'how-to-buy-brake-chambers-trucks-trailers') return 'Buying & Sourcing';
  if (slug === 'how-to-diagnose-air-leaks-spring-brake-chambers' || slug === 'diagnose-air-leaks-spring-brake-chambers') return 'How-To & Repair';
  if (slug === 'air-disc-brakes-vs-drum-brakes-future-of-trucking' || slug === 'air-disc-vs-drum-brakes') return 'Industry & Compliance';
  if (slug === 'brake-chamber-sizing-guide-type-30-24-16' || slug === 'brake-chamber-sizing-guide') return 'Technical Guides';
  if (slug === 'usa-brake-chamber-regulations-fmvss-121-compliance' || slug === 'fmvss-121-compliance-importers') return 'Industry & Compliance';
  if (slug === 'fleet-brake-maintenance-reduce-downtime-save-money' || slug === 'fleet-brake-maintenance-guide') return 'Fleet Management';
  if (slug === 'arctic-mining-success' || slug === 'cold-weather-brake-chambers') return 'Technical Guides';

  // General legacy category fallback mapping
  if (category === 'Buying Guide') return 'Buying & Sourcing';
  if (category === 'How-To') return 'How-To & Repair';
  if (category === 'Technical Guide') return 'Technical Guides';
  if (category === 'Innovation' || category === 'Industry News') return 'Industry & Compliance';
  
  return category || 'Technical Guides';
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const sanityPosts = await client.fetch(allBlogPostsQuery, {}, { next: { revalidate: 60 } });
    if (sanityPosts && sanityPosts.length > 0) {
      return sanityPosts.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || '',
        body: p.body || null,
        content: p.content || '',
        featuredImageUrl: p.featuredImageUrl || p.imageUrl || '/images/pageheaders/brc_blog.jpg',
        imageUrl: p.imageUrl || p.featuredImageUrl || '/images/pageheaders/brc_blog.jpg',
        publishDate: p.publishDate || p.publishedAt || '',
        date: p.publishDate || p.publishedAt || '',
        category: resolveBlogCategory(p.category, p.slug),
        readTime: p.readTime || '5 min read',
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        tags: p.tags || [],
      }));
    }
  } catch (err) {
    console.error('Failed to fetch blog posts from Sanity, using fallback:', err);
  }

  // Graceful fallback to local data
  return blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    featuredImageUrl: p.imageUrl,
    imageUrl: p.imageUrl,
    publishDate: p.date,
    date: p.date,
    category: resolveBlogCategory(p.category, p.slug),
    readTime: p.readTime,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    tags: p.tags || [],
  }));
}

export async function getBlogPostBySlug(slug: string, canonicalSlug?: string): Promise<BlogPost | null> {
  const cSlug = canonicalSlug || slug;
  try {
    const post = await client.fetch(singleBlogPostQuery, { slug, canonicalSlug: cSlug }, { next: { revalidate: 60 } });
    if (post) {
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        body: post.body || null,
        content: post.content || '',
        featuredImageUrl: post.featuredImageUrl || post.imageUrl || '/images/pageheaders/brc_blog.jpg',
        imageUrl: post.imageUrl || post.featuredImageUrl || '/images/pageheaders/brc_blog.jpg',
        publishDate: post.publishDate || post.publishedAt || '',
        date: post.publishDate || post.publishedAt || '',
        category: resolveBlogCategory(post.category, post.slug),
        readTime: post.readTime || '5 min read',
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        tags: post.tags || [],
      };
    }
  } catch (err) {
    console.error('Failed to fetch post from Sanity, using fallback:', err);
  }

  // Fallback to local blogPosts
  const local = blogPosts.find((p) => p.slug === cSlug || p.slug === slug);
  if (!local) return null;
  return {
    slug: local.slug,
    title: local.title,
    excerpt: local.excerpt,
    content: local.content,
    featuredImageUrl: local.imageUrl,
    imageUrl: local.imageUrl,
    publishDate: local.date,
    date: local.date,
    category: resolveBlogCategory(local.category, local.slug),
    readTime: local.readTime,
    metaTitle: local.metaTitle,
    metaDescription: local.metaDescription,
    tags: local.tags || [],
  };
}

export async function getPages() {
  return await client.fetch(allPagesQuery, {}, { next: { revalidate: 60 } });
}

export interface PageSeoResult {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
}

export async function getPageSeo(path: string): Promise<PageSeoResult | null> {
  try {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const altPath = normalizedPath.endsWith('/') && normalizedPath.length > 1
      ? normalizedPath.slice(0, -1)
      : `${normalizedPath}/`;

    const page = await client.fetch(
      groq`*[_type == "page" && (path == $path || path == $altPath)][0] {
        title,
        path,
        seo {
          metaTitle,
          metaDescription,
          keywords
        }
      }`,
      { path: normalizedPath, altPath },
      { next: { revalidate: 60 } }
    );

    if (page?.seo?.metaTitle || page?.seo?.metaDescription) {
      return {
        title: page.seo.metaTitle || page.title,
        description: page.seo.metaDescription || undefined,
        keywords: page.seo.keywords || [],
        canonical: `https://www.brakechambers.com${normalizedPath === '/' ? '' : normalizedPath}`,
      };
    }
    return null;
  } catch (err) {
    console.error(`Failed to fetch SEO for path ${path}:`, err);
    return null;
  }
}

