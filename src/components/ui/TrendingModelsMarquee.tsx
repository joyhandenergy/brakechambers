"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, ArrowUpRight } from 'lucide-react';
import { BRAKE_CHAMBERS } from '../../lib/data';
import { fadeInUp } from '../../lib/animations';
import SectionHeader from '../ui/SectionHeader';
import Card from '@/components/ui/Card';

export default function TrendingModelsMarquee() {
  // Select a diverse set of chambers to show in the marquee
  // We filter to ensure we get visually distinct products (different primary images)
  const popularChambers = [];
  const seenImages = new Set<string>();

  // Use a prime step to deterministically scatter the selection across the whole list (avoids hydration mismatches while preventing clustering)
  const step = 7;
  for (let i = 0; i < BRAKE_CHAMBERS.length; i++) {
    const index = (i * step) % BRAKE_CHAMBERS.length;
    const chamber = BRAKE_CHAMBERS[index];
    const primaryImage = chamber.galleryUrls?.[0];
    
    // Only pick products that have a real image uploaded (not a placeholder or generic brake)
    if (primaryImage && !primaryImage.includes('placeholder') && !primaryImage.includes('brc-brakechambers-') && !seenImages.has(primaryImage)) {
      seenImages.add(primaryImage);
      popularChambers.push(chamber);
    }
    if (popularChambers.length >= 8) break;
  }

  const displayChambers = popularChambers.length >= 8 ? popularChambers : BRAKE_CHAMBERS.slice(0, 8);

  const categoryUrlMap: Record<string, string> = {
    'Service Brake': 'service-brake-chambers',
    'Spring Brake': 'spring-brake-chambers',
    'Air Disc Actuator': 'air-disc-brake-actuators'
  };

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200 overflow-hidden relative z-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] relative">
        <SectionHeader
          badge="High Demand"
          title="Most Popular Assemblies"
          description="Explore our top-selling aftermarket brake chambers currently shipping to distribution centers worldwide."
          align="center"
        />
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden group mt-4 z-0">
        {/* We duplicate the content to create a seamless infinite scroll effect */}
        <div className="flex animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap min-w-max pb-8 pt-2">
          {/* First set */}
          <div className="flex gap-6 px-3">
            {displayChambers.map((chamber, i) => {
              const urlCategory = categoryUrlMap[chamber.category] || 'products';
              return (
                <Link
                  key={`${chamber.slug}-${i}`}
                  href={`/${urlCategory}/${chamber.slug}`}
                  className="w-72 bg-white border border-slate-200 rounded-3xl p-5 flex flex-col shadow-sm hover:border-amber-400 hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] hover:-translate-y-1.5 transition-all duration-300 group/card relative shrink-0"
                >
                  <div className="w-full h-48 sm:h-52 bg-slate-50 rounded-2xl relative mb-5 overflow-hidden flex items-center justify-center border border-slate-100">
                    {chamber.galleryUrls?.[0] ? (
                      <Image
                        src={chamber.galleryUrls[0]}
                        alt={chamber.name}
                        fill
                        className="object-contain transition-transform duration-700 group-hover/card:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] pointer-events-none rounded-2xl"></div>
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-navy-900 text-lg truncate">{chamber.name}</h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover/card:text-amber-500 transition-colors flex-shrink-0" />
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 shadow-sm px-3 py-1.5 rounded-full">
                      {chamber.type}
                    </span>
                    <span className="text-amber-600 font-bold text-sm flex items-center gap-1 group-hover/card:text-amber-500 transition-colors">
                      View Specs
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Second set (duplicated for seamless looping) */}
          <div className="flex gap-6 px-3">
            {displayChambers.map((chamber, i) => {
              const urlCategory = categoryUrlMap[chamber.category] || 'products';
              return (
                <Link
                  key={`dup-${chamber.slug}-${i}`}
                  href={`/${urlCategory}/${chamber.slug}`}
                  className="w-72 bg-white border border-slate-200 rounded-3xl p-5 flex flex-col shadow-sm hover:border-amber-400 hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] hover:-translate-y-1.5 transition-all duration-300 group/card relative shrink-0"
                >
                  <div className="w-full h-48 sm:h-52 bg-slate-50 rounded-2xl relative mb-5 overflow-hidden flex items-center justify-center border border-slate-100">
                    {chamber.galleryUrls?.[0] ? (
                      <Image
                        src={chamber.galleryUrls[0]}
                        alt={chamber.name}
                        fill
                        className="object-contain transition-transform duration-700 group-hover/card:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] pointer-events-none rounded-2xl"></div>
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-navy-900 text-lg truncate">{chamber.name}</h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover/card:text-amber-500 transition-colors flex-shrink-0" />
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 shadow-sm px-3 py-1.5 rounded-full">
                      {chamber.type}
                    </span>
                    <span className="text-amber-600 font-bold text-sm flex items-center gap-1 group-hover/card:text-amber-500 transition-colors">
                      View Specs
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Gradient overlays for smooth fade on edges (responsive width) */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </motion.section>
  );
}
