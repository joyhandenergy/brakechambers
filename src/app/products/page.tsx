import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import ProductsClient from '@/features/products/components/ProductsClient';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/products');
  const title = seo?.title || 'Commercial Brake Chamber Catalog — Spring, Service & ADB | BRC';
  const description = seo?.description || "Browse BRC's full range of OEM-grade brake chambers: spring brakes, service chambers, air disc actuators, and replacement parts. IATF 16949 standard manufacturing.";

  return {
    title,
    description,
    keywords: seo?.keywords?.length ? seo.keywords : ['Commercial Brake Chambers', 'Truck Parts', 'OEM Replacements', 'BRC Catalog'],
    alternates: {
      canonical: 'https://www.brakechambers.com/products',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/products',
      type: 'website',
    },
  };
}

export default function ProductsPage() {
  return (
    <main>
      <ProductsClient />
      <BreadcrumbSchema items={[{ name: 'Products' }]} />
    </main>
  );
}
