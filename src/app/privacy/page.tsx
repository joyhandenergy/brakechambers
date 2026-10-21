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

import PageHeader from '@/components/layout/PageHeader';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#F8FAFC] pb-20">
      <PageHeader
        badge="Legal & Compliance"
        badgeIcon={ShieldCheck}
        title="Privacy Policy"
        description="Last Updated: July 2026. How we handle your B2B data securely."
        imageSrc="/images/brc_brakechamber_aftermarket.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' }
        ]}
      />

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
