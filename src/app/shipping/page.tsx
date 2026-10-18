import React from 'react';
import type { Metadata } from 'next';
import ShippingClient from '@/features/shipping/components/ShippingClient';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/shipping');
  const title = seo?.title || 'Brake Chamber Shipping From China — FCL, LCL & Global Export | BRC';
  const description = seo?.description || 'BRC ships brake chambers from our Zhejiang, China factory to 30+ countries. Ningbo & Shanghai ports. FCL, LCL, door-to-door. EXW, FOB, CIF, DDP. ISPM-15 compliant.';

  return {
    title,
    description,
    keywords: seo?.keywords?.length ? seo.keywords : ['Brake Chamber Shipping', 'Global Export', 'FCL LCL'],
    alternates: {
      canonical: 'https://www.brakechambers.com/shipping',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/shipping',
      type: 'website',
    },
  };
}

export default function ShippingPage() {
  return <ShippingClient />;
}
