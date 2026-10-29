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

import { getProducts } from '@/sanity/queries';

export default async function ProductsPage() {
  const products = await getProducts();
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'BRC Commercial Brake Chambers & Actuators',
    'description': 'Full catalog of OEM-quality spring brake chambers, service chambers, and air disc actuators.',
    'url': 'https://www.brakechambers.com/products',
    'numberOfItems': products.length,
    'itemListElement': products.slice(0, 30).map((p, index) => {
      let categoryPrefix = 'products';
      if (p.category === 'Spring Brake') categoryPrefix = 'spring-brake-chambers';
      else if (p.category === 'Service Brake') categoryPrefix = 'service-brake-chambers';
      else if (p.category === 'Air Disc Actuator') categoryPrefix = 'air-disc-brake-actuators';
      else if (p.category === 'Parts & Kits') categoryPrefix = 'parts-and-kits';

      return {
        '@type': 'ListItem',
        'position': index + 1,
        'name': p.name,
        'url': `https://www.brakechambers.com/${categoryPrefix}/${p.slug}`
      };
    })
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProductsClient />
      <BreadcrumbSchema items={[{ name: 'Products' }]} />
    </main>
  );
}
