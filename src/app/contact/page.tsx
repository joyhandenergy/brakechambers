import React from 'react';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import ContactClient from '@/features/contact/components/ContactClient';
import { getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata() {
  const seo = await getPageSeo('/contact');
  const title = seo?.title || 'Contact BRC - Brake Chamber Sales & Technical Support';
  const description = seo?.description || 'Contact BRC Brake Chambers for technical support, OEM cross-referencing, sample orders, or wholesale pricing. Response within 24 hours. Zhejiang, China.';

  return {
    title,
    description,
    keywords: seo?.keywords?.length ? seo.keywords : ['Contact BRC', 'Brake Chamber Support', 'Wholesale Contact'],
    alternates: {
      canonical: 'https://www.brakechambers.com/contact',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/contact',
      type: 'website',
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <ContactClient />
      <BreadcrumbSchema items={[{ name: 'Contact Us' }]} />
    </>
  );
}

