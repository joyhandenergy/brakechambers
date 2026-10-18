import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import TechnicalResourcesClient from '@/features/technical-resources/components/TechnicalResourcesClient';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/technical-resources');
  const title = seo?.title || 'Brake Chamber Technical Resources - Guides, Specs & Data Sheets | BRC';
  const description = seo?.description || 'Installation guides, size charts, torque specs, and selection guides for BRC brake chambers. Technical resources for engineers, technicians & fleet managers.';

  return {
    title,
    description,
    keywords: seo?.keywords?.length ? seo.keywords : ['Brake Chamber Technical Guides', 'Installation Guide', 'Size Charts', 'Torque Specs'],
    alternates: {
      canonical: 'https://www.brakechambers.com/technical-resources',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/technical-resources',
      type: 'website',
    },
  };
}

export default function TechnicalResourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Brake Chamber Technical Resources & Documentation",
    "description": "Comprehensive technical library for commercial brake chambers including installation guides, size charts, stroke length specifications, caging procedures, and selection guides.",
    "url": "https://www.brakechambers.com/technical-resources",
    "publisher": {
      "@type": "Organization",
      "name": "BRC Brake Chambers",
      "url": "https://www.brakechambers.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Brake Chamber Installation Guides",
          "url": "https://www.brakechambers.com/technical-resources/installation"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Safe Caging Procedures",
          "url": "https://www.brakechambers.com/technical-resources/caging"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Size & Dimension Charts",
          "url": "https://www.brakechambers.com/technical-resources/size-charts"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Stroke Length Guide & CVSA Limits",
          "url": "https://www.brakechambers.com/technical-resources/stroke-length"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Chamber Selection Guides",
          "url": "https://www.brakechambers.com/technical-resources/selection-guides"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Visual Identification Guide",
          "url": "https://www.brakechambers.com/technical-resources/identification"
        }
      ]
    }
  };

  return (
    <main>
      <Script
        id="technical-resources-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TechnicalResourcesClient />
      <BreadcrumbSchema items={[
        { name: 'Technical Resources' }
      ]} />
    </main>
  );
}
