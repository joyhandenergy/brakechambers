import React from 'react';
import CompanyClient from '@/features/company/components/CompanyClient';

import { Metadata } from 'next';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/our-story');
  const title = seo?.title || 'About BRC Brake Chambers | Chinese OEM-Quality Brake Chamber Manufacturer';
  const description = seo?.description || 'BRC Brake Chambers is a Zhejiang-based manufacturer of OEM-quality aftermarket brake chambers. Serving distributors in North America, Australia, Europe & the Middle East. Manufactured to IATF 16949 standards.';

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/our-story',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/our-story',
      type: 'website',
    },
  };
}

export default function CompanyPage() {
  return <CompanyClient />;
}
