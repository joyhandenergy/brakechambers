import React from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';

interface SubCategoryWholesaleCTAProps {
  categoryName: string;
}

export default function SubCategoryWholesaleCTA({ categoryName }: SubCategoryWholesaleCTAProps) {
  return (
    <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0 pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex-1 max-w-2xl">
        <SectionHeader
          badge="Factory Direct Wholesale"
          title={<>Procuring <span className="text-amber-400">{categoryName}</span> in Bulk?</>}
          description={`Skip the middlemen. We manufacture our ${categoryName.toLowerCase()} directly to IATF 16949 automotive standards. Get preferential pricing, guaranteed lead times, and pallet shipping discounts when you order directly from BRC.`}
          align="left"
          theme="dark"
          accentColor="amber"
          className="!mb-0"
        />
      </div>

      <div className="relative z-10 flex flex-col w-full md:w-auto gap-4 min-w-[240px]">
        <Link 
          href="/quote" 
          className="bg-amber-500 text-navy-950 font-black py-4 px-8 rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 text-center uppercase tracking-widest text-[13px] transform hover:-translate-y-1"
        >
          Request Bulk Quote
        </Link>
        <Link 
          href="/distributors" 
          className="bg-navy-900/50 backdrop-blur-sm text-white border border-navy-700 font-bold py-4 px-8 rounded-xl hover:bg-navy-800 transition-all text-center uppercase tracking-widest text-[13px] hover:border-amber-500/50 group-hover:shadow-lg"
        >
          View Pallet Pricing
        </Link>
      </div>
    </section>
  );
}
