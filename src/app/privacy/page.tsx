import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

import { Metadata } from 'next';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/privacy');
  const title = seo?.title || 'Privacy Policy | BRC Brake Chambers';
  const description = seo?.description || 'How we handle your B2B data securely.';

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/privacy',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/privacy',
      type: 'website',
    },
  };
}

export default function PrivacyPage() {
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
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">Privacy Policy</h1>
          <p className="text-navy-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Last Updated: July 2026. How we handle your B2B data securely.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-4xl -mt-20 relative z-20">
        <Card padding="lg" className="-navy-50 md: space-y-8 text-navy-600">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Data Collection</h2>
            <p>We only collect data necessary to fulfill wholesale manufacturing orders, including company names, shipping addresses, tax IDs, and commercial contact information.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Usage of Data</h2>
            <p>Your B2B data is strictly used for processing quotes, managing logistics, and providing technical support. We do not sell your commercial data to third-party marketing firms. For more information, read our <Link href="/terms" className="text-amber-600 font-bold hover:underline">Terms of Service</Link>.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Security</h2>
            <p>All sensitive documents, including RFQs and payment confirmations, are stored on encrypted servers compliant with strict data security standards.</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
