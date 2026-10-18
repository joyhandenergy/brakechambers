import React from 'react';
import Link from 'next/link';
import { PackageSearch, Boxes } from 'lucide-react';

export default function CategoryPromoBanner() {
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OEM Matcher Promo */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
          <PackageSearch className="w-12 h-12 text-amber-600 mb-4 relative z-10" />
          <h3 className="text-xl font-bold text-navy-900 mb-2 relative z-10">Looking for a specific OEM part?</h3>
          <p className="text-slate-600 mb-6 relative z-10">Find direct replacements for Bendix, Knorr-Bremse, ZF/WABCO, Meritor, Haldex, and more using our cross-reference tool.</p>
          <Link href="/oem-cross-reference" className="relative z-10 bg-white border-2 border-navy-900 text-navy-900 font-bold py-2.5 px-6 rounded-lg hover:bg-navy-900 hover:text-white transition-colors">
            Use Cross-Reference Matcher
          </Link>
        </div>

        {/* Bulk Order Promo */}
        <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-8 border border-navy-700 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB000]/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
          <Boxes className="w-12 h-12 text-[#FFB000] mb-4 relative z-10" />
          <h3 className="text-xl font-bold text-white mb-2 relative z-10">Need container or pallet pricing?</h3>
          <p className="text-navy-200 mb-6 relative z-10">We supply large fleets and distributors worldwide with direct factory pricing and custom terms.</p>
          <Link href="/quote" className="relative z-10 bg-[#FFB000] text-navy-900 font-bold py-2.5 px-6 rounded-lg hover:bg-amber-400 transition-colors">
            Get a Wholesale Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
