import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import ApplicationsClient from '@/features/applications/components/ApplicationsClient';

import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/applications');
  const title = seo?.title || 'Brake Chambers by Application | Trucks, Trailers, Transit & Off-Highway | BRC';
  const description = seo?.description || 'Find the right BRC brake chamber for your vehicle or industry. Trucks, trailers, transit buses, refuse, mining, and off-highway applications. Manufactured to IATF 16949 standards.';

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/applications',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/applications',
      type: 'website',
    },
  };
}

export default function ApplicationsPage() {
  return (
    <main>
      <ApplicationsClient />
      <BreadcrumbSchema items={[{ name: 'Applications' }]} />
    </main>
  );
}
