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
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'BRC Brake Chambers',
    image: 'https://www.brakechambers.com/images/brc_brakechamber_building.jpg',
    description: 'Manufacturer of OEM-quality commercial vehicle brake chambers in Zhejiang, China.',
    url: 'https://www.brakechambers.com',
    telephone: '+86 13395856758',
    email: 'sales@brakechambers.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Block 3, No 55 Tianyang Rd, Fengqiao',
      addressLocality: 'Zhuji',
      addressRegion: 'Zhejiang',
      postalCode: '311811',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.878345,
      longitude: 121.463371,
    },
    hasMap: 'https://maps.google.com/?q=29.878345,121.463371',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactClient />
      <BreadcrumbSchema items={[{ name: 'Contact Us' }]} />
    </>
  );
}

