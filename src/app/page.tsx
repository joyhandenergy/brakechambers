import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import HomeClient from '@/features/home/components/HomeClient';
import { getBlogPosts, getPageSeo } from '@/sanity/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/');
  const title = seo?.title || 'BRC Brake Chambers | Premier Aftermarket Manufacturer for Heavy-Duty Trucks';
  const description = seo?.description || 'The world leader in aftermarket commercial brake chambers. Delivering direct OEM-grade replacements for Bendix, Haldex, Meritor, and Wabco to global fleets.';
  const keywords = seo?.keywords?.length
    ? seo.keywords.join(', ')
    : 'Brake Chambers, Commercial Air Brakes, Bendix Replacement, Meritor Replacement, Wabco Replacement, Haldex Replacement, Heavy Duty Truck Parts, Spring Brakes, Service Brakes, Air Disc Brakes';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com',
      type: 'website',
    },
  };
}

export default async function Home() {
  const blogPosts = await getBlogPosts();

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Manufacturer",
    "name": "BRC Brake Chambers",
    "description": "Premier aftermarket manufacturer of heavy-duty commercial vehicle brake chambers, offering direct replacements for Bendix, Haldex, Meritor, and Wabco.",
    "url": "https://www.brakechambers.com",
    "foundingDate": "2005",
    "category": "Automotive Parts Manufacturer",
    "productsSupported": [
      "Spring Brakes",
      "Service Brakes",
      "Air Disc Brakes",
      "Piggyback Kits",
      "Slack Adjusters"
    ],
    "brand": {
      "@type": "Brand",
      "name": "BRC"
    }
  };

  return (
    <>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 
        Visually hidden H1 for SEO. 
        This establishes the primary keyword context for the entire page, 
        resolving the issue of the rotating carousel headers. 
      */}
      <h1 className="sr-only">
        Heavy Duty Commercial Brake Chamber Manufacturer & Aftermarket Replacements
      </h1>

      {/* Render the interactive client component */}
      <HomeClient blogPosts={blogPosts} />
    </>
  );
}
