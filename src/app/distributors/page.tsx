import { Metadata } from 'next';
import DistributorsClient from '@/features/distributors/components/DistributorsClient';

import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/distributors');
  const title = seo?.title || 'Global Distributor Network & Partner Portal | BRC Brake Chambers';
  const description = seo?.description || 'Find a BRC distributor near you, or log in to the wholesale partner portal to access B2B pricing, inventory, and place bulk orders.';

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/distributors',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/distributors',
      siteName: 'BRC Brake Chambers',
      images: [
        {
          url: '/images/og-distributors.jpg',
          width: 1200,
          height: 630,
          alt: 'BRC Global Distributor Network',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default function DistributorsPage() {
  return <DistributorsClient />;
}
