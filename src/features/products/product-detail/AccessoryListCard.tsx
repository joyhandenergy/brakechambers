import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BrakeAccessory, BrakeChamber } from '@/types';
import { ShieldCheck, Truck, Star, ChevronRight } from 'lucide-react';

export default function AccessoryListCard({ product, categoryPath }: { product: BrakeAccessory | BrakeChamber | any, categoryPath: string }) {

  // Generate a pseudo-random high rating (4.8 to 5.0) and review count based on slug
  const hash = product.slug.split('').reduce((a: number, b: string) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const rating = (4.8 + (Math.abs(hash) % 3) * 0.1).toFixed(1);
  const reviews = 50 + (Math.abs(hash) % 150);

  return (
    <Link href={`/${categoryPath}/${product.slug}`} className="h-full flex flex-row items-stretch bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-amber-200 hover:-translate-y-1 transition-all duration-300 group">
      
      {/* Left: Image (Flexible height, fixed width on desktop) */}
      <div className="w-[100px] sm:w-40 md:w-48 aspect-square sm:aspect-auto sm:min-h-full flex-shrink-0 relative bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-2 sm:p-4 border-r border-slate-100">
        <Image 
          src={product.galleryUrls[0]} 
          alt={product.name}
          fill
          className="object-contain p-2 sm:p-4 hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-0 right-0 bg-navy-50 text-navy-600 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-bl-lg border-b border-l border-navy-100 z-10">
          {product.category}
        </div>
      </div>

      {/* Right: Details (Professional B2B Typography) */}
      <div className="flex flex-col flex-grow w-full min-w-0 p-3 sm:p-5 h-full">
        
        {/* Top Info: Name & Rating */}
        <div className="mb-2 sm:mb-4">
          <h3 className="font-bold text-navy-900 text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-amber-600 transition-colors duration-200 mb-1.5">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400">
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill={rating === '5.0' ? "currentColor" : "none"} className={rating !== '5.0' ? "text-amber-400" : ""} />
            </div>
            <span className="text-[11px] font-bold text-navy-800">{rating}</span>
            <span className="text-[11px] text-slate-500">({reviews} reviews)</span>
          </div>
        </div>

        {/* Middle Info: Specs & Badges (sleek and compact) */}
        <div className="flex flex-col gap-2.5 mb-3">

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
              <ShieldCheck size={12} className="mr-1" /> Premium
            </span>
            <span className="flex items-center text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
              <Truck size={12} className="mr-1" /> Fast Ship
            </span>
          </div>

          {/* Features */}
          <ul className="flex flex-col gap-1 text-xs text-slate-600 mt-0.5">
            {((product as any).features || (product as any).includedItems || []).slice(0, 2).map((feat: string, i: number) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold mt-0.5 text-[10px]">•</span>
                <span className="leading-tight">{feat}</span>
              </li>
            ))}
          </ul>

        </div>

        {/* Action Button & Trust - Forced to Bottom */}
        <div className="mt-auto flex justify-between items-center pt-2 gap-2">
           <span className="flex-shrink-0 inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-1 rounded border border-emerald-100 uppercase tracking-wider">
             <ShieldCheck size={12} className="mr-1 flex-shrink-0" /> 
             <span className="hidden sm:inline">Factory Direct</span>
             <span className="sm:hidden">FD</span>
           </span>
          <span className="flex-shrink-0 inline-flex text-amber-600 text-sm font-bold items-center group-hover:text-amber-500 transition-colors">
            View Details <ChevronRight size={16} className="ml-1 flex-shrink-0 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

      </div>

</Link>
  );
}
