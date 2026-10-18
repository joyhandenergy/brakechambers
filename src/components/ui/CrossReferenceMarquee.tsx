"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BRAKE_CHAMBERS } from '../../lib/data';

interface CrossReferenceMatch {
  oemBrand: string;
  oemPart: string;
  brcName: string;
  brcType: string;
  url: string;
}

interface CrossReferenceMarqueeProps {
  filterBrand?: string;
  maxItems?: number;
}

export default function CrossReferenceMarquee({ filterBrand, maxItems = 15 }: CrossReferenceMarqueeProps) {
  
  const matches = useMemo(() => {
    const allMatches: CrossReferenceMatch[] = [];
    
    const categoryUrlMap: Record<string, string> = {
      'Service Brake': 'service-brake-chambers',
      'Spring Brake': 'spring-brake-chambers',
      'Air Disc Actuator': 'air-disc-brake-actuators'
    };

    BRAKE_CHAMBERS.forEach(chamber => {
      if (chamber.oemPartNumbers) {
        chamber.oemPartNumbers.forEach(oem => {
          if (!filterBrand || oem.brand.toLowerCase() === filterBrand.toLowerCase()) {
            allMatches.push({
              oemBrand: oem.brand,
              oemPart: oem.partNumber,
              brcName: chamber.name,
              brcType: chamber.type,
              url: `/${categoryUrlMap[chamber.category] || 'products'}/${chamber.slug}`,
            });
          }
        });
      }
    });

    // Sort by the reversed part number string to deterministically scramble them.
    // This perfectly mixes up the list so new families don't stack together visually!
    allMatches.sort((a, b) => {
      const revA = a.oemPart.split('').reverse().join('');
      const revB = b.oemPart.split('').reverse().join('');
      return revA > revB ? 1 : -1;
    });
    return allMatches.slice(0, maxItems);
  }, [filterBrand, maxItems]);

  if (matches.length === 0) return null;

  return (
    <div className="relative w-full flex overflow-x-hidden group py-4">
        <div className="flex animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap min-w-max pb-4 pt-2">
          
          {/* First set */}
          <div className="flex gap-6 px-3">
            {matches.map((match, i) => (
              <Link
                key={`${match.oemPart}-${i}`}
                href={match.url}
                className="w-[85vw] max-w-[360px] sm:w-[360px] min-h-[240px] bg-white border border-slate-200 shadow-sm rounded-[2rem] p-7 flex flex-col hover:border-amber-400 hover:shadow-md hover:shadow-navy-900/5 hover:-translate-y-1 transition-all duration-300 group relative shrink-0 overflow-hidden"
              >
                {/* Subtle Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* OEM Part Section */}
                  <div className="mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      OEM Part
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-navy-900 text-[22px] tracking-tight truncate">{match.oemPart}</span>
                      <span className="font-semibold text-slate-500 text-sm truncate">{match.oemBrand}</span>
                    </div>
                  </div>

                  {/* Connection / Match Indicator */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="h-px bg-slate-100 flex-1"></div>
                    <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-200/50 flex items-center gap-1.5 shadow-sm">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Exact Match
                    </div>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>

                  {/* BRC Match Section */}
                  <div className="mt-auto">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:animate-pulse"></span>
                      BRC Equivalent
                    </p>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-black text-navy-900 text-lg leading-snug transition-colors line-clamp-2 pr-2">
                        {match.brcName}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:border-navy-900 transition-colors duration-300">
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Second set (duplicated for seamless looping) */}
          <div className="flex gap-6 px-3">
             {matches.map((match, i) => (
              <Link
                key={`dup-${match.oemPart}-${i}`}
                href={match.url}
                className="w-[85vw] max-w-[360px] sm:w-[360px] min-h-[240px] bg-white border border-slate-200 shadow-sm rounded-[2rem] p-7 flex flex-col hover:border-amber-400 hover:shadow-md hover:shadow-navy-900/5 hover:-translate-y-1 transition-all duration-300 group relative shrink-0 overflow-hidden"
              >
                {/* Subtle Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* OEM Part Section */}
                  <div className="mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      OEM Part
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-navy-900 text-[22px] tracking-tight truncate">{match.oemPart}</span>
                      <span className="font-semibold text-slate-500 text-sm truncate">{match.oemBrand}</span>
                    </div>
                  </div>

                  {/* Connection / Match Indicator */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="h-px bg-slate-100 flex-1"></div>
                    <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-200/50 flex items-center gap-1.5 shadow-sm">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Exact Match
                    </div>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>

                  {/* BRC Match Section */}
                  <div className="mt-auto">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:animate-pulse"></span>
                      BRC Equivalent
                    </p>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-black text-navy-900 text-lg leading-snug transition-colors line-clamp-2 pr-2">
                        {match.brcName}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:border-navy-900 transition-colors duration-300">
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
  );
}
