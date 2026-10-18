import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import ManufacturingClient from '@/features/manufacturing/components/ManufacturingClient';

import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/manufacturing');
  const title = seo?.title || 'Brake Chamber Manufacturing in China - Inside Our IATF 16949-Aligned Factory | BRC';
  const description = seo?.description || 'Tour our high-capacity brake chamber factory in Zhejiang, China. IATF 16949-aligned production. 1M+ chambers produced annually. Serving 30+ countries.';

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/manufacturing',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/manufacturing',
      type: 'website',
    },
  };
}

export default function ManufacturingPage() {
  return (
    <main>
      <ManufacturingClient />

      <BreadcrumbSchema items={[{ name: 'Manufacturing' }]} />
    </main>
  );
}
