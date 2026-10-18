import React from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Layers } from 'lucide-react';

export default function OEMCrossReferenceCTA() {
  return (
    <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
        <div className="hidden sm:flex w-14 h-14 bg-amber-500/10 rounded-full items-center justify-center border border-amber-500/20 shrink-0">
          <Layers className="w-7 h-7 text-amber-500" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white mb-1.5 flex items-center gap-2">
            Looking for a specific part number?
          </h2>
          <p className="text-navy-200 text-sm md:text-base">
            Instantly cross-reference <strong className="text-white">Bendix, Knorr-Bremse, ZF/WABCO, Meritor, Haldex,</strong> and <strong className="text-white">Wabco</strong> parts to find the exact BRC equivalent.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-auto shrink-0">
        <Link 
          href="/oem-cross-reference" 
          className="flex items-center justify-center w-full md:w-auto gap-2 bg-amber-500 hover:bg-amber-400 text-navy-950 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap"
        >
          <Search className="w-5 h-5" />
          Use Cross-Reference Tool
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
