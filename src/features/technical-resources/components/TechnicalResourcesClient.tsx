"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText, Wrench, FileArchive, Shield, ArrowDownToLine, ArrowRight, Ruler,
  BookOpen, Settings, Eye, ChevronLeft, AlertOctagon, AlertTriangle, Info,
  CheckCircle2, Download, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import RotatingWatermark from '@/components/ui/RotatingWatermark';
import { TECHNICAL_RESOURCES_DATA } from '@/lib/technicalResourcesData';

export default function TechnicalResourcesClient() {
  const categories = [
    {
      id: 'installation',
      title: 'Installation & Maintenance',
      icon: <Wrench className="w-7 h-7 text-amber-500" />,
      accent: 'amber',
      desc: 'Each guide contains detailed specifications, step-by-step procedures, and reference tables for technicians, engineers, and fleet managers.',
      items: [
        {
          title: 'Installation Guides',
          subtitle: 'Step-by-step mounting, push-rod cutting, and air line connection procedures.',
          slug: 'installation',
          icon: <Wrench className="w-5 h-5" />,
        },
        {
          title: 'Safe Caging Procedures',
          subtitle: 'Critical safety procedures for manually caging spring brakes during maintenance.',
          slug: 'caging',
          icon: <Shield className="w-5 h-5" />,
        }
      ],
    },
    {
      id: 'specifications',
      title: 'Specifications & Sizing',
      icon: <FileArchive className="w-7 h-7 text-navy-500" />,
      accent: 'navy',
      desc: 'Detailed size charts, stroke length guides, and thread specifications for precise component matching.',
      items: [
        {
          title: 'Size & Dimension Charts',
          subtitle: 'OD, mounting stud centers, push-rod lengths, and thread weights for Type 12 through Type 36.',
          slug: 'size-charts',
          icon: <Ruler className="w-5 h-5" />,
        },
        {
          title: 'Stroke Length Guide',
          subtitle: 'Standard vs. long-stroke limits and CVSA out-of-service readjustment criteria.',
          slug: 'stroke-length',
          icon: <FileText className="w-5 h-5" />,
        },
        {
          title: 'Chamber Selection Guides',
          subtitle: 'Choose the correct chamber by vocation: linehaul, severe-duty, transit, or heavy haul.',
          slug: 'selection-guides',
          icon: <BookOpen className="w-5 h-5" />,
        },
        {
          title: 'Visual Identification Guide',
          subtitle: 'How to identify chamber sizes and stroke types without part numbers.',
          slug: 'identification',
          icon: <Eye className="w-5 h-5" />,
        },
      ],
    }
  ];

  return (
    <article className="min-h-screen bg-slate-50 font-sans overflow-x-clip">
      <PageHeader
        badge="Engineering Support"
        badgeIcon={BookOpen}
        title="Brake Chamber Technical Resources: Guides, Specs & Data Sheets"
        description="Access BRC's technical library: installation procedures, sizing specifications, caging guides, torque specs, and chamber selection tools. Everything engineers, technicians, and fleet managers need to spec and install BRC brake chambers correctly."
        imageSrc="/images/pageheaders/brc_technicalspec.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Technical Resources' }
        ]}
      />

      <div className="relative z-20 -mt-12 sm:-mt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
            {/* SECTION 1: QUICK LINKS */}
            <section className="relative">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full bg-white rounded-[2rem] shadow-2xl shadow-navy-900/5 border border-slate-100 p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mb-6">
                    <div className="w-full">
                      <SectionHeader
                        title="Most Popular Resources"
                        description="Quick access to our most frequently viewed technical guides."
                        align="left"
                        theme="light"
                        accentColor="navy"
                        plainText={true}
                        className="!mb-0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
                    {[
                      { title: "Size & Dimension Charts", desc: "Type 12–36 specs", icon: <Ruler className="w-5 h-5 text-amber-500" />, slug: "size-charts" },
                      { title: "Installation Guide", desc: "Step-by-step procedures", icon: <Wrench className="w-5 h-5 text-amber-500" />, slug: "installation" },
                      { title: "Chamber Selection Guide", desc: "Match by vocation", icon: <BookOpen className="w-5 h-5 text-navy-500" />, slug: "selection-guides" }
                    ].map((item, idx) => (
                      <Link
                        key={idx}
                        href={`/technical-resources/${item.slug}`}
                        className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-navy-200 hover:shadow-md transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 w-full overflow-hidden mr-2">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-navy-900 text-[13px] md:text-[14px] block mb-1">{item.title}</span>
                            <span className="text-[12px] leading-[1.6] text-slate-400 block font-normal">{item.desc}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 transition-colors flex-shrink-0" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

                        {/* SECTION 2: VIDEO TRAINING BANNER */}
            <section className="py-16 md:py-24 relative">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
                <div id="video-training" className="scroll-mt-32 lg:scroll-mt-40 bg-gradient-to-b from-navy-800 to-navy-900 border border-navy-700 rounded-[2rem] shadow-xl shadow-navy-900/10 relative overflow-hidden group flex flex-col lg:flex-row transform hover:-translate-y-2 transition-all duration-500 hover:border-amber-500/50">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  
                  {/* Subtle Corner Graphic */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-navy-700/40 rounded-br-full -ml-10 -mt-10 transition-transform duration-500 group-hover:scale-110 z-0 pointer-events-none"></div>

                  <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center relative z-10">
                    <SectionHeader
                      badge="Video Training Library"
                      title={<>Brake Chamber Installation & <span className="text-amber-500">Maintenance Videos</span></>}
                      description="Step-by-step video walkthroughs from our lead engineers. Covers safe caging procedures, push-rod cutting, torque specs, and complete installation - filmed on the shop floor."
                      align="left"
                      theme="dark"
                      accentColor="amber"
                      className="!mb-4"
                    />
                    <ul className="space-y-3 mb-8 text-slate-300 font-light text-sm">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Video Training Content Coming Soon</li>
                    </ul>
                    <Link href="/contact?subject=Video+Training+Access" className="inline-flex items-center gap-3 bg-amber-500 px-6 py-3 rounded-lg text-navy-950 font-extrabold hover:bg-amber-400 transition-colors uppercase tracking-widest text-xs md:text-sm group/btn mt-4 md:mt-0 self-start shadow-lg shadow-amber-500/20 transform hover:-translate-y-1">
                      Notify Me <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="w-full lg:w-1/2 relative min-h-[250px] md:min-h-[300px] lg:min-h-full overflow-hidden rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem] m-[2px]">
                    <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80" alt="BRC Brake Chamber Video Training - Installation and Caging Procedures" className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-500/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner border border-amber-500/50 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                        <div className="w-0 h-0 border-t-[8px] md:border-t-[12px] border-t-transparent border-l-[14px] md:border-l-[20px] border-l-amber-500 border-b-[8px] md:border-b-[12px] border-b-transparent ml-1 md:ml-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: LIBRARY CATEGORIES */}

            <section className="py-16 md:py-24 relative bg-blue-50 border-t border-blue-100 overflow-hidden">
              <RotatingWatermark />
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] relative z-10">
                <div className="mb-10 lg:mb-16">
                  <SectionHeader
                    badge="Technical Library"
                    title="Browse Brake Chamber Resources by Topic"
                    description="Find the technical resource you need. Each guide contains detailed specifications, step-by-step procedures, and reference tables for technicians, engineers, and fleet managers."
                    align="left"
                    plainText={true}
                  />
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8 md:space-y-12"
                >
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      id={category.id}
                      variants={fadeInUp}
                      className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 lg:p-10 relative overflow-hidden group/section"
                    >
                      {/* Subtle background glow on section hover */}
                      <div className={`absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 blur-[80px] rounded-full opacity-0 group-hover/section:opacity-10 transition-opacity duration-700 pointer-events-none
                        ${category.accent === 'amber' ? 'bg-amber-500' : 'bg-navy-500'}
                      `}></div>

                      <div className="relative z-10">
                        {/* Category Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mb-8 md:mb-10">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.25rem] bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0">
                            {category.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-navy-900 font-heading tracking-tight mb-2">{category.title}</h3>
                            <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">{category.desc}</p>
                          </div>
                        </div>

                        {/* Resource Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                          {category.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={`/technical-resources/${item.slug}`}
                              className={`flex items-start gap-4 p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer
                                ${idx % 2 === 0 ? 'hover:border-amber-300' : 'hover:border-slate-300'}
                              `}
                            >
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300
                                ${idx % 2 === 0
                                  ? 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-400 group-hover:shadow-amber-500/20'
                                  : 'bg-slate-50 text-slate-600 border-slate-100 group-hover:bg-navy-900 group-hover:text-white group-hover:border-navy-800 group-hover:shadow-navy-900/20'
                                }
                              `}>
                                {item.icon}
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="font-bold text-navy-900 text-sm md:text-[15px] group-hover:text-navy-700 transition-colors block mb-1">{item.title}</span>
                                <span className="text-[13px] md:text-[14px] leading-[1.6] text-slate-500 block font-normal">{item.subtitle}</span>
                              </div>
                              <ArrowRight className={`w-5 h-5 flex-shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-1
                                ${idx % 2 === 0 ? 'text-slate-300 group-hover:text-amber-500' : 'text-slate-300 group-hover:text-slate-600'}
                              `} aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Engineering Support CTA */}
            <section className="py-16 md:py-24 bg-[#F1EFE8] relative overflow-hidden">
              <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-[1920px]">
                <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] p-8 lg:p-12 text-white shadow-2xl shadow-navy-900/30 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                  {/* Internal Card Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0"></div>

                  <div className="max-w-xl relative z-10 w-full">
                    <SectionHeader
                      badge="Engineering Support"
                      title="Need Custom Engineering Support?"
                      description="If you require specific pushrod calculations, unique bracket alignments, or modified stroke limits, our engineering team is ready to assist."
                      align="left"
                      theme="dark"
                      accentColor="amber"
                      className="!mb-0"
                    />
                  </div>

                  <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto shrink-0">
                    <Link href="/contact" className="inline-block w-full bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-center px-10 py-5 rounded-xl uppercase tracking-widest text-[13px] transition-all duration-300 shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 whitespace-nowrap">
                      Contact BRC Engineering
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
      </div>
    </article>
  );
}

