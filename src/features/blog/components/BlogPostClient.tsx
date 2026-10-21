"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight, Share2, ArrowRight, Phone, Mail } from 'lucide-react';
import type { BlogPost } from '@/types';
import { PortableText } from '@portabletext/react';
import { fadeInUp } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';

const portableTextComponents = {
  marks: {
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target ? 'noopener noreferrer' : undefined} 
          className="text-amber-600 hover:text-amber-700 underline font-semibold transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?.url && !value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img src={value.asset.url || ''} alt={value.alt || ''} className="rounded-2xl w-full shadow-lg object-cover" />
          {value.caption && <figcaption className="text-center text-sm text-slate-500 mt-2 font-medium">{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

interface BlogPostClientProps {
  post: BlogPost;
  prevPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

export default function BlogPostClient({ post, prevPost, nextPost }: BlogPostClientProps) {
  return (
    <article className="min-h-screen bg-white font-sans flex flex-col">
      {/* 1. Original Article Header */}
      <section className="pt-16 pb-12 bg-white relative overflow-hidden">
        
        {/* Subtle Background Image Watermark */}
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] lg:w-[800px] h-full opacity-[0.15] mix-blend-multiply pointer-events-none z-0">
          <Image 
            src="/images/brc-chamber-watermark.jpg.png" 
            alt="Brake Chamber Background"
            fill
            sizes="100vw"
            className="object-contain object-right-top transform translate-x-12"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          {/* Breadcrumbs */}
          <motion.nav variants={fadeInUp} initial="hidden" animate="visible" className="flex items-center justify-center md:justify-start gap-2 mb-10 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 flex-nowrap w-full overflow-hidden">
            <Link href="/" className="hover:text-amber-500 transition-colors shrink-0 whitespace-nowrap">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
            <Link href="/blog" className="hover:text-amber-500 transition-colors shrink-0 whitespace-nowrap">Technical Blog</Link>
            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
            <span className="text-slate-600 truncate min-w-0">{post.title}</span>
          </motion.nav>

          {/* Post Header */}
          <motion.header variants={fadeInUp} initial="hidden" animate="visible" className="mb-12 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <span className="bg-amber-500 text-navy-950 text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                {post.category}
              </span>
              <span className="text-slate-500 text-[12px] font-bold uppercase tracking-widest flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> {post.date || post.publishDate}
              </span>
              <span className="text-slate-500 text-[12px] font-bold uppercase tracking-widest items-center hidden sm:flex">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> {post.readTime} Read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-900 leading-tight mb-6 tracking-tight max-w-4xl mx-auto">
              {post.title}
            </h1>

            <p className="text-[16px] md:text-[18px] leading-[1.6] text-slate-600 font-medium max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          </motion.header>

          {/* Featured Image */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <div className="w-full h-[350px] md:h-[500px] lg:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img 
                src={post.imageUrl || post.featuredImageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Article Content Area */}
      <section className="pb-16 md:pb-24 bg-white relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Sidebar / Back Link (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 flex justify-center">
                <Link href="/blog" className="flex items-center justify-center w-12 h-12 bg-navy-900 border border-navy-800 hover:border-amber-500 text-white hover:text-navy-950 hover:bg-amber-500 rounded-full transition-all group shadow-lg shrink-0" title="Back to Articles">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Center Content (Article Body) */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="lg:col-span-7 xl:col-span-8">
              
              <div className="lg:hidden mb-8">
                <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-amber-600 font-bold text-sm uppercase tracking-widest transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back to Articles
                </Link>
              </div>

              {/* Advanced Typography Styles */}
              <style dangerouslySetInnerHTML={{__html: `
                .blog-content {
                  font-family: inherit;
                }
                .blog-content .lead {
                  font-size: 1.25rem;
                  line-height: 1.8;
                  font-weight: 500;
                  color: #334155;
                  margin-bottom: 2.5rem;
                }
                .blog-content p {
                  margin-bottom: 1.5rem;
                  line-height: 1.8;
                  color: #475569;
                  font-size: 1.125rem;
                  text-align: justify;
                }
                .blog-content h2 {
                  font-size: 2rem;
                  font-weight: 900;
                  color: #0f172a;
                  margin-top: 3.5rem;
                  margin-bottom: 1.5rem;
                  letter-spacing: -0.025em;
                }
                .blog-content h3 {
                  font-size: 1.5rem;
                  font-weight: 800;
                  color: #1e293b;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                }
                .blog-content ul {
                  list-style-type: none;
                  padding-left: 0;
                  margin-bottom: 2.5rem;
                }
                .blog-content ul li {
                  position: relative;
                  padding-left: 1.75rem;
                  margin-bottom: 1rem;
                  color: #475569;
                  font-size: 1.125rem;
                  line-height: 1.7;
                }
                .blog-content ul li::before {
                  content: "•";
                  color: #f59e0b;
                  font-weight: bold;
                  font-size: 1.5rem;
                  position: absolute;
                  left: 0;
                  top: -0.25rem;
                }
                .blog-content ol {
                  list-style-type: decimal;
                  padding-left: 1.5rem;
                  margin-bottom: 2.5rem;
                  color: #475569;
                  font-size: 1.125rem;
                  line-height: 1.7;
                }
                .blog-content ol li {
                  margin-bottom: 1rem;
                  padding-left: 0.5rem;
                }
                .blog-content ol li::marker {
                  color: #f59e0b;
                  font-weight: 800;
                }
                .blog-content strong {
                  color: #0f172a;
                  font-weight: 700;
                }
                .blog-content blockquote {
                  border-left: 4px solid #f59e0b;
                  background-color: #f8fafc;
                  padding: 1.5rem 2rem;
                  margin: 2.5rem 0;
                  border-radius: 0 1rem 1rem 0;
                  font-style: italic;
                  color: #1e293b;
                  font-size: 1.25rem;
                  font-weight: 500;
                }
                .blog-content img {
                  border-radius: 1.5rem;
                  margin: 3rem 0;
                  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
                  width: 100%;
                  height: auto;
                }
              `}} />
              
              <div className="blog-content">
                {Array.isArray(post.body) && post.body.length > 0 ? (
                  <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                )}
              </div>

              {/* Article Footer Tags */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">Topics:</span>
                {(post.tags && post.tags.length > 0 ? post.tags : ['Brake Chambers', post.category, 'Commercial Vehicles', 'Safety']).map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-100 cursor-pointer transition-colors shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Next / Previous Article Navigation */}
              <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="flex flex-col justify-center p-6 rounded-3xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-slate-200 transition-all group min-h-[110px]">
                    <span className="text-amber-500 group-hover:text-slate-400 transition-colors text-[10px] font-extrabold uppercase tracking-widest mb-2 flex items-center shrink-0">
                      <ChevronLeft className="w-3.5 h-3.5 mr-1 transform group-hover:-translate-x-1 transition-all" /> Previous Article
                    </span>
                    <span className="text-navy-900 text-[15px] font-bold leading-tight group-hover:text-amber-600 transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="flex flex-col justify-center p-6 rounded-3xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-slate-200 transition-all group text-right min-h-[110px]">
                    <span className="text-amber-500 group-hover:text-slate-400 transition-colors text-[10px] font-extrabold uppercase tracking-widest mb-2 flex items-center justify-end shrink-0">
                      Next Article <ChevronRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-all" />
                    </span>
                    <span className="text-navy-900 text-[15px] font-bold leading-tight group-hover:text-amber-600 transition-colors line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>

            </motion.div>

            {/* Right Sidebar */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-32 space-y-8">
                
                {/* Explore Card */}
                <div className="bg-navy-900 p-6 md:p-8 rounded-3xl shadow-xl border border-navy-800">
                  <h3 className="text-[11px] font-extrabold text-white uppercase tracking-widest mb-4">
                    Explore BRC
                  </h3>
                  <div className="flex flex-col gap-2">
                    <Link href="/products" className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/50 transition-all text-navy-100 hover:text-amber-400 group">
                      <span className="text-sm font-bold">All Products</span>
                      <ChevronRight className="w-4 h-4 text-navy-300 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/manufacturing" className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/50 transition-all text-navy-100 hover:text-amber-400 group">
                      <span className="text-sm font-bold">Factory & Manufacturing</span>
                      <ChevronRight className="w-4 h-4 text-navy-300 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/our-story" className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/50 transition-all text-navy-100 hover:text-amber-400 group">
                      <span className="text-sm font-bold">About the Company</span>
                      <ChevronRight className="w-4 h-4 text-navy-300 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Share Card */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                  <h3 className="text-[11px] font-extrabold text-navy-900 uppercase tracking-widest mb-5 flex items-center">
                    <Share2 className="w-4 h-4 mr-2 text-amber-500" /> Share Article
                  </h3>
                  <div className="flex gap-3">
                    <button aria-label="Share on LinkedIn" className="flex-1 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-colors border border-slate-200 shadow-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button aria-label="Share on X (Twitter)" className="flex-1 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors border border-slate-200 shadow-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                    <button aria-label="Share on Facebook" className="flex-1 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#4267B2] hover:text-white hover:border-[#4267B2] transition-colors border border-slate-200 shadow-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Technical Support Card */}
                <div className="bg-gradient-to-b from-navy-900 to-navy-950 p-6 md:p-8 rounded-3xl shadow-xl border border-navy-800 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none"></div>
                  
                  <h3 className="text-[11px] font-extrabold text-white uppercase tracking-widest mb-4 flex items-center">
                    Need Technical Help?
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-navy-200 font-normal mb-6">
                    Our engineering team is available to help you cross-reference OEM parts or select the correct chamber for your fleet.
                  </p>
                  
                  <div className="space-y-3">
                    <a href="mailto:sales@brakechambers.com" className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                      <Mail className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold">Email Engineering</span>
                    </a>
                    <a href="tel:+8613395856758" className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                      <Phone className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold">+86 13395856758</span>
                    </a>
                  </div>
                </div>

                {/* Banner CTA */}
                <Link href="/oem-cross-reference" className="block relative h-48 rounded-3xl overflow-hidden group shadow-xl">
                  <img src="/images/brc_brakechamber_aftermarket.jpg" alt="OEM Cross Reference" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-navy-950/80 group-hover:bg-navy-950/70 transition-colors"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">Database</span>
                    <h4 className="text-white font-extrabold text-lg leading-tight mb-3">OEM Cross-Reference Tool</h4>
                    <span className="text-white text-[11px] font-bold uppercase tracking-widest flex items-center">
                      Search Now <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Bottom Factory CTA */}
      <section className="py-12 md:py-16 bg-[#F1EFE8] relative overflow-hidden mt-auto">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-2xl md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] z-0 pointer-events-none"></div>

            <div className="relative z-10 flex-1 max-w-2xl text-center md:text-left">
              <SectionHeader
                badge="Work With BRC"
                title="Ready to Source Brake Chambers From a Chinese Manufacturer?"
                description="Send us your specifications, target volumes, and destination country. Our export engineering team responds within 24 business hours with factory-direct pricing and lead times."
                align="left"
                theme="dark"
                accentColor="amber"
                className="!mb-0"
                plainText={true}
              />
            </div>

            <div className="relative z-10 flex flex-col w-full md:w-auto gap-4 min-w-[240px] shrink-0 mt-8 md:mt-0">
              <Link
                href="/quote"
                className="bg-amber-500 text-navy-950 font-black py-4 px-4 sm:px-8 rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 text-center uppercase tracking-wider sm:tracking-widest text-[12px] sm:text-[13px] transform hover:-translate-y-1 flex items-center justify-center whitespace-nowrap"
              >
                Request Factory Quote <ArrowRight className="ml-2 w-4 h-4 shrink-0" />
              </Link>
              <Link
                href="/contact"
                className="bg-navy-800 text-white border border-navy-600 font-black py-4 px-4 sm:px-8 rounded-xl hover:bg-navy-700 hover:border-navy-500 transition-all text-center uppercase tracking-wider sm:tracking-widest text-[12px] sm:text-[13px] transform hover:-translate-y-1 flex items-center justify-center whitespace-nowrap"
              >
                Contact Engineering <ArrowRight className="ml-2 w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
