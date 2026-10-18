"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/types';
import { getCategoryColor } from './BlogTabs';

interface BlogCardProps {
  post: BlogPost;
  variants?: any;
}

function formatPublishDate(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return dateStr;
}

export default function BlogCard({ post, variants }: BlogCardProps) {
  const categoryColor = getCategoryColor(post.category);
  const formattedDate = formatPublishDate(post.publishDate);
  const readTime = post.readTime || '5 min read';

  return (
    <motion.article 
      variants={variants} 
      className="group flex flex-col h-full bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_-6px_rgba(15,23,42,0.08)] hover:shadow-[0_16px_32px_-10px_rgba(15,23,42,0.16)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 overflow-hidden"
    >
      <Link 
        href={`/blog/${post.slug}`} 
        className="flex flex-col h-full p-4 sm:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-2xl"
      >
        {/* Cover Image with strict 16:9 equal height ratio */}
        <div 
          className="w-full aspect-[16/9] rounded-xl mb-4 overflow-hidden relative flex-shrink-0 bg-slate-100"
          style={{ aspectRatio: '16 / 9' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <img 
            src={post.featuredImageUrl || '/images/pageheaders/brc_blog.jpg'} 
            alt={post.title} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />

          {/* Hover overlay hint */}
          <div className="absolute bottom-3 left-3 z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-500 text-navy-950 flex items-center shadow-md">
              Read Guide <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        {/* Category Eyebrow Badge - Matches SectionHeader / site badge style */}
        <div className="mb-3 flex items-center">
          <span className="inline-block px-3 py-1 rounded-full border border-amber-100 bg-amber-50 text-amber-600 text-[11px] font-bold uppercase tracking-widest shadow-2xs select-none">
            {post.category}
          </span>
        </div>

        {/* Post Title: Max 2 lines truncated with ellipsis */}
        <h3 className="text-lg sm:text-xl font-bold text-navy-900 group-hover:text-amber-600 transition-colors duration-200 leading-snug line-clamp-2 mb-2">
          {post.title}
        </h3>

        {/* Excerpt: Max 2 lines */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Footer: Publish Date + Read Time (Aligned to bottom) */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {formattedDate}
            </span>
          )}
          
          {readTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {readTime}
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
