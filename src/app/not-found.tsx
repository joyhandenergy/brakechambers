"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, Cog } from 'lucide-react';
import TrendingModelsMarquee from '@/components/ui/TrendingModelsMarquee';

export default function NotFound() {
  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-24 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-navy-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative shadow-inner">
            <Cog className="w-12 h-12 text-navy-800 relative z-10" />
            <ShieldAlert className="w-8 h-8 text-amber-500 absolute -bottom-2 -right-2 z-20 bg-white rounded-full p-1 shadow-sm" />
          </div>
          
          <h1 className="font-heading font-black text-6xl md:text-8xl text-navy-900 mb-6 tracking-tight">404</h1>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-800 mb-4">Part Not Found</h2>
          
          <p className="text-slate-600 text-lg mb-12 max-w-lg mx-auto leading-relaxed font-light">
            Looks like this page was shipped to the wrong dock, or the part number you're looking for doesn't exist in our current catalog. Let's get you back on the road.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products" className="bg-amber-500 text-navy-950 font-extrabold py-4 px-8 rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center uppercase tracking-widest text-sm">
              View Catalog <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="bg-white hover:bg-slate-50 border border-slate-200 text-navy-900 font-extrabold py-4 px-8 rounded-xl transition-all shadow-sm transform hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center uppercase tracking-widest text-sm">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
      
      {/* Show popular assemblies to recover traffic */}
      <TrendingModelsMarquee />
    </>
  );
}
