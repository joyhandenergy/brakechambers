import React from 'react';
import WarrantyClient from '@/features/warranty/components/WarrantyClient';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata() {
  const seo = await getPageSeo('/warranty');
  const title = seo?.title || 'Brake Chamber Warranty - 1-Year Limited Factory Guarantee | BRC';
  const description = seo?.description || 'Every BRC brake chamber carries a 1-year limited warranty against manufacturing defects. Claims processed within 24 hours. Full terms and conditions.';

  return {
    title,
    description,
    keywords: seo?.keywords?.length ? seo.keywords : ['Brake Chamber Warranty', 'Factory Guarantee'],
    alternates: {
      canonical: 'https://www.brakechambers.com/warranty',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/warranty',
      type: 'website',
    },
  };
}

export default function WarrantyPage() {
  return <WarrantyClient />;
}
