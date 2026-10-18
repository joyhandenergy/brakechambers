import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function OEMQuickLinks({ categoryName }: { categoryName: string }) {
  const oemBrands = [
    { name: 'Bendix', slug: 'bendix' },
    { name: 'Meritor', slug: 'meritor' },
    { name: 'Haldex', slug: 'haldex' },
    { name: 'Wabco', slug: 'wabco' },
    { name: 'MGM', slug: 'mgm' },
    { name: 'TSI', slug: 'tsi' },
  ];

  return (
    <section className="mt-16 sm:mt-24">
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Abstract background design */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] z-0"></div>
        
        <div className="relative z-10 w-full md:w-5/12 flex flex-col items-start">
          <SectionHeader
            title="Looking for a specific OEM replacement?"
            description={`Our ${categoryName.toLowerCase()} are engineered as direct aftermarket drop-in replacements. Cross-reference your existing part numbers instantly.`}
            align="left"
            theme="dark"
            className="!mb-8"
          />
          <Link 
            href="/oem-cross-reference" 
            className="inline-flex w-fit items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-950 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[14px] transition-all duration-300 shadow-xl shadow-amber-500/20 transform hover:-translate-y-1"
          >
            Open Cross-Reference Tool
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
        
        <div className="relative z-10 w-full md:w-7/12 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
          {oemBrands.map((brand) => (
            <Link 
              key={brand.slug}
              href={`/oem-cross-reference/${brand.slug}`}
              className="bg-navy-900/50 backdrop-blur-sm border border-navy-700 hover:border-amber-500 hover:bg-navy-800/80 p-5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-amber-500/10 transform hover:-translate-y-1"
            >
              <span className="font-extrabold text-white text-lg tracking-wide group-hover:text-amber-400 transition-colors">{brand.name}</span>
              <span className="text-navy-300 text-[11px] font-bold uppercase tracking-widest mt-1">Replacements</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
