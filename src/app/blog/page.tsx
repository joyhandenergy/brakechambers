import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogClient from '@/features/blog/components/BlogClient';
import { getBlogPosts, getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/blog');
  const title = seo?.title || 'Brake Chamber Blog: Technical Guides, How-To & Industry Insights | BRC';
  const description = seo?.description || 'Technical bulletins, installation guides, cross-reference updates, and regulatory compliance insights from BRC Brake Chambers.';

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/blog',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/blog',
      type: 'website',
    },
  };
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-navy-900 border-t-amber-500 animate-spin" /></div>}>
      <BlogClient blogPosts={blogPosts} />
    </Suspense>
  );
}
