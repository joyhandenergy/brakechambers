import React from 'react';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import PageHeader from '@/components/layout/PageHeader';
import QuoteClient from '@/features/quote/components/QuoteClient';
import { Calculator } from 'lucide-react';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata() {
  const seo = await getPageSeo('/quote');
  const title = seo?.title || 'Global Wholesale RFQ | BRC Brake Chambers';
  const description = seo?.description || 'Request a quote for bulk orders, full containers, or OEM partnerships for our heavy-duty commercial air brake chambers.';

  return {
    title,
    description,
    keywords: seo?.keywords?.length ? seo.keywords : ['Brake Chamber Quote', 'Wholesale Air Brakes', 'Factory Direct Pricing'],
    alternates: {
      canonical: 'https://www.brakechambers.com/quote',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/quote',
      type: 'website',
    },
  };
}

export default function QuotePage() {
  return (
    <div className="bg-[#F8FAFC] pb-16 md:pb-24 overflow-x-clip">
      <PageHeader
        badge="Wholesale Pricing"
        badgeIcon={Calculator}
        title="Request a Brake Chamber Quote: Factory-Direct Wholesale Pricing"
        description="Get factory-direct pricing on BRC brake chambers for your fleet or distribution business. Container pricing, sample orders, and private-label options available. Response within 24 hours."
        imageSrc="/images/pageheaders/brc_quote.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Quote' }
        ]}
      />
      
      <QuoteClient />
      


      <BreadcrumbSchema items={[{ name: 'Quote' }]} />
    </div>
  );
}
