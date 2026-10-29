import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPostBySlug } from '@/sanity/queries';
import BlogPostClient from '@/features/blog/components/BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const slugAliases: Record<string, string> = {
  'arctic-mining-success': 'cold-weather-brake-chambers',
  'how-to-diagnose-air-leaks-spring-brake-chambers': 'diagnose-air-leaks-spring-brake-chambers',
  'air-disc-brakes-vs-drum-brakes-future-of-trucking': 'air-disc-vs-drum-brakes',
  'brake-chamber-sizing-guide-type-30-24-16': 'brake-chamber-sizing-guide',
  'usa-brake-chamber-regulations-fmvss-121-compliance': 'fmvss-121-compliance-importers',
  'fleet-brake-maintenance-reduce-downtime-save-money': 'fleet-brake-maintenance-guide',
};

export const revalidate = 60;

function resolveSlug(slug: string): string {
  return slugAliases[slug] || slug;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const canonicalSlug = resolveSlug(slug);
  const post = await getBlogPostBySlug(slug, canonicalSlug);
  
  if (!post) {
    return {
      title: 'Post Not Found | BRC Brake Chambers',
    };
  }

  const title = post.metaTitle || `${post.title} | BRC Brake Chambers`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: `https://www.brakechambers.com/blog/${canonicalSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.brakechambers.com/blog/${canonicalSlug}`,
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
      type: 'article',
    },
  };
}

// Generate static params for all known blog posts at build time
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const allSlugs = new Set<string>();
  posts.forEach(post => {
    allSlugs.add(post.slug);
  });
  Object.keys(slugAliases).forEach(alias => {
    allSlugs.add(alias);
  });
  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const canonicalSlug = resolveSlug(slug);
  const allPosts = await getBlogPosts();
  const postIndex = allPosts.findIndex((p) => p.slug === canonicalSlug || p.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = allPosts[postIndex];
  const prevPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const nextPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  const articleImageUrl = post.imageUrl
    ? (post.imageUrl.startsWith('http') ? post.imageUrl : `https://www.brakechambers.com${post.imageUrl}`)
    : 'https://www.brakechambers.com/images/pageheaders/brc_blog.jpg';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.metaDescription || post.excerpt,
    'image': [articleImageUrl],
    'datePublished': post.publishDate || '2024-01-01',
    'dateModified': post.publishDate || '2024-01-01',
    'author': {
      '@type': 'Organization',
      'name': 'BRC Brake Chambers Engineering Team',
      'url': 'https://www.brakechambers.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'BRC Brake Chambers',
      'url': 'https://www.brakechambers.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.brakechambers.com/images/logo-brc.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.brakechambers.com/blog/${canonicalSlug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostClient post={post} prevPost={prevPost} nextPost={nextPost} />
    </>
  );
}

