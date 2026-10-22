import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import { ShieldCheck, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import RequestForm from './RequestForm';

export const metadata: Metadata = {
  title: 'Request an OEM Cross-Match | BRC Brake Chambers',
  description: 'Can\'t find your exact brake chamber part number? Submit your part details or photos to our factory technical team and we will help identify the correct BRC replacement.',
  keywords: ['Request Brake Chamber Cross Reference', 'Unknown Air Brake Part', 'Engineering Match', 'Brake Chamber Drawing Fitment'],
};

export default function RequestMatchPage() {
  return (
    <div className="bg-[#F8FAFC] pb-16 md:pb-24 font-sans overflow-x-clip">
      <PageHeader
        badge="Engineering Support & Cross-Reference"
        title="Request an OEM Cross-Match: Factory Engineering Desk"
        description="If you have a specialized, legacy, or rusted part number not found in our online catalog, our factory engineering team can review your specifications and assist in finding the matching BRC replacement."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cross-Reference', href: '/oem-cross-reference' },
          { label: 'Request Match' }
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] -mt-6 sm:-mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Column (Left) */}
          <div className="lg:col-span-7 xl:col-span-8 order-1">
            <Suspense fallback={<div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">Loading form...</div>}>
              <RequestForm />
            </Suspense>
          </div>

          {/* Sticky Sidebar Cards (Right) */}
          <div className="lg:col-span-5 xl:col-span-4 order-2 space-y-6 lg:sticky lg:top-24">
            
            {/* Card 1: How Cross-Matching Works */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_8px_24px_rgba(10,25,41,0.04)]">
              <div className="pb-4 mb-5 border-b border-slate-100">
                <h3 className="font-extrabold text-navy-900 text-lg sm:text-xl">
                  How Cross-Matching Works
                </h3>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-navy-950 font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-base mb-1">Submit Part Details</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Provide part numbers, cast marks, or upload a clear photo of the chamber tag or port layout.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-navy-950 font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-base mb-1">Engineering Verification</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our engineers evaluate stroke length, diaphragm size, clamp angle, and port thread pitch to match your application.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-navy-950 font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-base mb-1">Matching Part Recommendation</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      We provide the matching BRC part number, technical specifications, and factory wholesale pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Direct Manufacturer Advantages */}
            <div className="bg-gradient-to-b from-navy-800 to-navy-900 text-white border border-navy-700/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(10,25,41,0.18)]">
              <div className="flex items-center gap-2.5 mb-3.5">
                <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  Direct Manufacturer Advantages
                </h3>
              </div>
              <p className="text-navy-200 text-sm sm:text-base leading-relaxed mb-4">
                Work directly with Zhuji City's leading brake chamber manufacturing facility operating under IATF 16949 standards for dependable quality:
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-slate-200 mb-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Direct OEM / Factory-Floor Engineering</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Extensive OEM & Aftermarket Interchange Data</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Manufactured to IATF 16949 & SAE J1469 Standards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Factory-Direct Wholesale Pricing</span>
                </li>
              </ul>

              <div className="pt-3 border-t border-navy-700/60">
                <a
                  href="https://wa.me/85253629718"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>WhatsApp Desk: +852 53629718</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      <BreadcrumbSchema items={[
        { name: 'OEM Cross-Reference', item: 'https://www.brakechambers.com/oem-cross-reference' },
        { name: 'Request Match' }
      ]} />
    </div>
  );
}
