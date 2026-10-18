import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

import { Metadata } from 'next';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/terms');
  const title = seo?.title || 'Terms of Service | BRC Brake Chambers';
  const description = seo?.description || 'Terms and conditions for wholesale BRC Brake Chambers orders.';

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/terms',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/terms',
      type: 'website',
    },
  };
}

export default function TermsPage() {
  return (
    <div className="bg-[#F8FAFC] pb-20">
      <section className="bg-navy-950 relative pt-20 pb-36 border-b border-navy-800 overflow-hidden text-center px-4">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] -mr-40 -mt-40 mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -ml-40 -mb-40 mix-blend-screen pointer-events-none"></div>
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-navy-900 border border-navy-700 shadow-xl shadow-navy-950 text-amber-400 text-[11px] font-bold uppercase tracking-widest backdrop-blur-md">
            Legal & Compliance
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">Terms of Service</h1>
          <p className="text-navy-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Last Updated: July 2026. Terms and conditions for wholesale BRC Brake Chambers orders.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-4xl -mt-20 relative z-20">
        <Card padding="lg" className="-navy-50 md: space-y-8 text-navy-600">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Business-to-Business (B2B) Only</h2>
            <p>BRC Brake Chambers operates strictly as a Business-to-Business (B2B) wholesale manufacturer. We require a minimum order quantity (MOQ) for most shipments (typically one pallet) to ensure competitive factory-direct pricing.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Quotes and Pricing</h2>
            <p>All prices provided in quotes are subject to change based on raw material costs and international shipping rates. Quotes are generally valid for 30 days unless otherwise specified.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">3. OEM Cross-Referencing</h2>
            <p>Our <Link href="/oem-cross-reference" className="text-amber-600 font-bold hover:underline">OEM cross-reference tool</Link> is provided for convenience. While we guarantee fitment for listed OEM part numbers (e.g., Bendix, Haldex), the buyer is responsible for verifying final technical specifications prior to bulk orders.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Payment Terms</h2>
            <p>Standard terms for international wholesale orders are 30% T/T deposit to commence manufacturing, and 70% balance before shipment, unless long-term credit terms have been established.</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
