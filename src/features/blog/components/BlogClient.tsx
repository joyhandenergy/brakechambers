"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import PageHeader from '@/components/layout/PageHeader';
import BlogCard from '@/components/ui/BlogCard';
import BlogTabs, { BlogCategory, BLOG_CATEGORIES } from '@/components/ui/BlogTabs';
import BlogPagination from '@/components/ui/BlogPagination';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import TrendingModelsMarquee from '@/components/ui/TrendingModelsMarquee';
import { Newspaper } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogClientProps {
  blogPosts: BlogPost[];
}

export default function BlogClient({ blogPosts }: BlogClientProps) {
  const searchParams = useSearchParams();

  // Resolve initial tab from ?tab= query parameter
  const tabParam = searchParams?.get('tab');
  const matchedCategory = useMemo(() => {
    if (!tabParam) return 'All' as BlogCategory;
    const matched = BLOG_CATEGORIES.find(c => c.slug === tabParam);
    return matched ? matched.id : ('All' as BlogCategory);
  }, [tabParam]);

  const [activeCategory, setActiveCategory] = useState<BlogCategory>(matchedCategory);
  const [prevMatchedCategory, setPrevMatchedCategory] = useState<BlogCategory>(matchedCategory);
  if (matchedCategory !== prevMatchedCategory) {
    setPrevMatchedCategory(matchedCategory);
    setActiveCategory(matchedCategory);
  }

  const queryPage = Number(searchParams?.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState<number>(queryPage);
  const [prevQueryPage, setPrevQueryPage] = useState<number>(queryPage);
  if (queryPage !== prevQueryPage) {
    setPrevQueryPage(queryPage);
    setCurrentPage(queryPage);
  }

  const [postsPerPage, setPostsPerPage] = useState<number>(12); // Default to 12 for desktop SSR

  // Set responsive posts per page: 12 on desktop (>= 768px), 6 on mobile (< 768px)
  useEffect(() => {
    const handleResize = () => {
      setPostsPerPage(window.innerWidth < 768 ? 6 : 12);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBlogStart = () => {
    if (typeof window === 'undefined') return;
    requestAnimationFrame(() => {
      const target = document.getElementById('blog-grid') || document.getElementById('blog-cards-start');
      if (target) {
        // Measure real header height from DOM (top bar + main header + secondary navbar = ~176-180px on desktop, ~80px on mobile)
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : (window.innerWidth >= 1024 ? 180 : 90);
        const isDesktop = window.innerWidth >= 1024;
        // Generous breathing space (44px desktop, 28px mobile) so cards sit cleanly before the header
        const extraBuffer = isDesktop ? 44 : 28;
        const totalOffset = headerHeight + extraBuffer;

        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const targetScrollY = Math.max(0, Math.round(elementPosition - totalOffset));

        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });
      }
    });
  };

  const handleSelectCategory = (category: BlogCategory) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to page 1 on category change
    if (typeof window !== 'undefined') {
      const match = BLOG_CATEGORIES.find(c => c.id === category);
      if (match && match.slug !== 'all') {
        const url = `${window.location.pathname}?tab=${match.slug}`;
        window.history.replaceState({ ...window.history.state, as: url, url }, '', url);
      } else {
        window.history.replaceState({ ...window.history.state, as: window.location.pathname, url: window.location.pathname }, '', window.location.pathname);
      }

      // If user has scrolled down past the start of the cards, scroll smoothly to just before the card top
      requestAnimationFrame(() => {
        const target = document.getElementById('blog-grid') || document.getElementById('blog-cards-start');
        if (target) {
          const headerEl = document.querySelector('header');
          const headerHeight = headerEl ? headerEl.offsetHeight : (window.innerWidth >= 1024 ? 180 : 90);
          const isDesktop = window.innerWidth >= 1024;
          const extraBuffer = isDesktop ? 44 : 28;
          const totalOffset = headerHeight + extraBuffer;

          const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const targetScrollY = Math.max(0, Math.round(elementPosition - totalOffset));

          if (window.pageYOffset > targetScrollY) {
            window.scrollTo({
              top: targetScrollY,
              behavior: 'smooth'
            });
          }
        }
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollToBlogStart();
  };

  // Compute counts per category for tab badges
  const postCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: blogPosts.length,
      'Technical Guides': 0,
      'How-To & Repair': 0,
      'Buying & Sourcing': 0,
      'Fleet Management': 0,
      'Industry & Compliance': 0,
    };

    blogPosts.forEach(post => {
      if (counts[post.category] !== undefined) {
        counts[post.category]++;
      }
    });

    return counts;
  }, [blogPosts]);

  // Filter posts client-side
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter(post => post.category === activeCategory);
  }, [blogPosts, activeCategory]);

  // Paginate posts: 12 on desktop (>= 768px), 6 on mobile (< 768px)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const safeCurrentPage = (totalPages > 0 && currentPage > totalPages) ? 1 : currentPage;

  const startIndex = (safeCurrentPage - 1) * postsPerPage;
  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, startIndex, postsPerPage]);

  return (
    <article className="min-h-screen bg-slate-50 font-sans overflow-x-clip pb-0">
      <PageHeader
        badge="Brake Chamber Insights"
        badgeIcon={Newspaper}
        title="Brake Chamber Blog: Technical Guides, Industry News & Updates"
        description="Technical bulletins, installation guides, cross-reference updates, and industry insights from BRC Brake Chambers. Written for fleet managers, technicians, and distributors who spec, install, and purchase commercial brake chambers."
        imageSrc="/images/pageheaders/brc_blog.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' }
        ]}
      />

      <div className="relative z-20 -mt-8 md:-mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16 relative z-10">
          
          {/* Category Tabs Section Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-3.5 sm:p-5 md:p-6 lg:p-7 mb-10 sm:mb-14 w-full mx-auto">
            <BlogTabs
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              postCounts={postCounts}
            />
            
            {/* Filter status description */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 text-xs sm:text-sm text-slate-500 pt-3 mt-2.5 border-t border-slate-100 px-1 sm:px-2">
              <span className="truncate">
                Showing <strong className="text-navy-900 font-bold">{filteredPosts.length > 0 ? `${startIndex + 1} to ${Math.min(startIndex + postsPerPage, filteredPosts.length)}` : 0}</strong> of <strong className="text-navy-900 font-bold">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'article' : 'articles'} 
                {activeCategory !== 'All' ? <span> in <strong className="text-navy-900 font-bold">{activeCategory}</strong></span> : ' across all categories'}
              </span>
              {activeCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => handleSelectCategory('All')}
                  className="text-amber-600 hover:text-amber-700 font-bold hover:underline self-start sm:self-auto shrink-0 cursor-pointer text-xs sm:text-sm"
                >
                  Show All
                </button>
              )}
            </div>
          </div>

          {/* Start of Blog Cards Anchor */}
          <div id="blog-cards-start" className="relative -top-4 scroll-mt-48 lg:scroll-mt-60" />

          {/* Equal-Height Blog Grid with align-items: stretch */}
          <div id="blog-grid" className="scroll-mt-48 lg:scroll-mt-60">
            <AnimatePresence mode="wait">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                key={`${activeCategory}-${safeCurrentPage}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
              >
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} variants={fadeInUp} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          <BlogPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-8 shadow-sm">
              <p className="text-navy-900 font-bold text-lg mb-2">No articles found in {activeCategory}</p>
              <p className="text-slate-500 text-sm mb-6">Explore our full library of technical guides, fleet maintenance, and regulatory insights.</p>
              <button
                type="button"
                onClick={() => handleSelectCategory('All')}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold rounded-xl text-sm transition-colors shadow-sm"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Blog CTA */}
      <section className="py-16 md:py-24 bg-[#F1EFE8] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-[2rem] p-8 lg:p-12 text-white shadow-2xl shadow-navy-900/30 border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Internal Card Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0" />

            <div className="max-w-xl relative z-10 w-full">
              <SectionHeader
                badge="Expert Support"
                title="Have Questions About Our Products?"
                description="Whether you need help with part identification, cross-referencing, or engineering specifications, our technical team is ready to help."
                align="left"
                theme="dark"
                accentColor="amber"
                className="!mb-0"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto shrink-0">
              <Link 
                href="/contact" 
                className="inline-block w-full bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-center px-10 py-5 rounded-xl uppercase tracking-widest text-[14px] transition-all duration-300 shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 whitespace-nowrap"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cross-Sell Section */}
      <TrendingModelsMarquee />
    </article>
  );
}
