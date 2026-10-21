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

import PageHeader from '@/components/layout/PageHeader';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-[#F8FAFC] pb-20">
      <PageHeader
        badge="Legal & Compliance"
        badgeIcon={FileText}
        title="Terms of Service"
        description="Last Updated: July 2026. Terms and conditions for wholesale BRC Brake Chambers orders."
        imageSrc="/images/brc_brakechamber_aftermarket.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' }
        ]}
      />

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
