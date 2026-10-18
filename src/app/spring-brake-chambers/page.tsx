import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getProducts, getPageSeo } from '@/sanity/queries';
import ProductListingLayout from '@/features/products/components/ProductListingLayout';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/spring-brake-chambers');
  const title = seo?.title || 'Spring Brake Chambers: OEM Replacements for Trucks & Trailers | BRC';
  const description = seo?.description || 'Factory-direct spring brake chambers for heavy-duty trucks, trailers, and transit buses. Type 20/24, 24/24, 30/30, and 24/30 available. Direct Bendix, Haldex, Meritor & WABCO replacements.';
  const keywords = seo?.keywords?.length
    ? seo.keywords
    : ['Spring Brake Chambers', 'Type 30/30', 'Commercial Air Brakes', 'Heavy-Duty Brake Chambers', 'Bendix Replacement', 'Meritor Replacement'];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/spring-brake-chambers',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/spring-brake-chambers',
      type: 'website',
    },
  };
}

export default async function SpringBrakesPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const BRAKE_CHAMBERS = await getProducts();
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  
  // Base Filter for Spring Brakes
  let products = BRAKE_CHAMBERS.filter(c => c.category === 'Spring Brake');

  // Legacy basic filters for main page
  if (searchParams?.filter) {
    const filter = searchParams.filter as string;
    if (filter === 'Piggyback Kit') {
      products = products.filter(c => c.name.toLowerCase().includes('piggyback'));
    } else if (filter === 'Long Stroke') {
      products = products.filter(c => c.strokeSize === 'Long Stroke');
    } else if (filter === 'Standard Stroke') {
      products = products.filter(c => c.strokeSize === 'Standard');
    } else if (filter === 'Complete Assembly') {
      products = products.filter(c => !c.name.toLowerCase().includes('piggyback'));
    }
  }

  const seoContent = (
    <>
      <section className="mb-16">
        <SectionHeader
          badge="Technical Overview"
          badgeIcon={Settings}
          title="What Is a Spring Brake Chamber?"
          align="left"
          accentColor="amber"
          className="!mb-8"
        />
        <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-6 max-w-5xl">
          <p className="text-base md:text-lg font-medium text-navy-950 leading-relaxed">
            A spring brake chamber is a dual-function air brake component that handles both service braking and emergency/parking braking. It combines a standard service chamber (single diaphragm) with a spring-actuated parking brake section (power spring).
          </p>
          <p>
            When air pressure is applied, the service diaphragm activates the brakes during normal driving. When air pressure is released — for parking or in the event of air loss — the power spring automatically applies the brakes, delivering fail-safe stopping power across drive and trailer axles.
          </p>

          <div className="pt-4 border-t border-slate-200/80 space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                1. Industry-Standard Type 30/30 Spring Brake Chambers
              </h3>
              <p className="text-slate-600">
                The standard workhorse for North American heavy-duty Class 8 trucks, tractors, and tandem-axle trailers. Our <Link href="/spring-brake-chambers/30-30-air-brake-chambers" className="text-amber-600 font-bold hover:underline">Type 30/30 Spring Brake Chambers</Link>{' '}feature 30 sq. in. effective area on both service and parking sections, delivering FMVSS-121 compliant stopping torque and parking hold. Available in both Standard Stroke (2.5&quot;) and Long Stroke (3.0&quot;) configurations for enhanced push-rod reserve travel.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                2. Type 24/30 & Type 24/24 Combination Chambers
              </h3>
              <p className="text-slate-600">
                Engineered for specialized vocational trucks, heavy utility trailers, and clearance-constrained axle suspensions. BRC <Link href="/spring-brake-chambers/24-30-24-24-spring-brakes" className="text-amber-600 font-bold hover:underline">Type 24/30 & 24/24 Chambers</Link>{' '}pair a compact 24 sq. in. service chamber with high-output parking springs, providing optimal brake balance without chassis interference.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                3. Compact Type 20/24 Spring Brake Chambers
              </h3>
              <p className="text-slate-600">
                Designed for medium-duty commercial vehicles, bus chassis, and specialty low-profile trailer axles where full Type 30 housings cannot fit. Our <Link href="/spring-brake-chambers/20-24-spring-brake-chambers" className="text-amber-600 font-bold hover:underline">Type 20/24 Spring Brake Chambers</Link>{' '}deliver calibrated proportional force to prevent wheel hop while guaranteeing emergency mechanical lockup during pressure failure.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                4. Pre-Caged Type 30/30 Piggyback Replacement Kits
              </h3>
              <p className="text-slate-600">
                Cut service bay downtime in half during spring section overhauls. BRC <Link href="/spring-brake-chambers/type-30-30-piggyback-kits" className="text-amber-600 font-bold hover:underline">Type 30/30 Piggyback Kits</Link>{' '}arrive factory pre-caged with safety release tools pre-installed. Fleets can replace failed emergency springs and diaphragms without unbolting the foundation mounting bracket or disconnecting the push-rod linkage.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/80">
            <Link href="/technical-resources" className="text-amber-600 font-bold hover:underline inline-flex items-center text-sm md:text-base">
              Learn more in our spring brake chamber installation guide <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <SectionHeader
          badge="Common Questions"
          title="Spring Brake Chamber FAQs"
          description="Common questions from fleet managers and distributors about spring brake chambers."
          align="center"
          accentColor="amber"
        />
        <GlobalFAQAccordion faqs={[
          {
            q: 'What does "Type 30/30" mean?',
            a: 'The two numbers refer to the effective diaphragm area in square inches. "Type 30/30" means both the service diaphragm and the parking diaphragm have 30 square inches of effective area. The first number is the service side; the second is the parking side.'
          },
          {
            q: 'What is the difference between a spring brake chamber and a service brake chamber?',
            a: 'A spring brake chamber has two functions: service braking (using air pressure) and emergency/parking braking (using a compressed power spring). A service brake chamber has one function: service braking only. Spring brake chambers are used where parking brakes are required (drive axles and trailer axles); service chambers are used on steer axles and some trailer axles.'
          },
          {
            q: 'Are your spring brake chambers compatible with Bendix systems?',
            a: 'Yes. BRC spring brake chambers are engineered as direct drop-in replacements for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO chambers. Use our OEM cross-reference tool to find your exact part number match.'
          },
          {
            q: 'Should I replace the entire chamber or just use a piggyback kit?',
            a: 'If the mounting bracket, push-rod, clevis, and center section (service housing) are all in good condition, a piggyback kit replaces only the parking spring section and saves installation time. If the housing is corroded, the push-rod is worn, or the service diaphragm has failed, replace the entire chamber. See our selection guide for details.'
          },
          {
            q: 'Do you offer long-stroke spring brake chambers?',
            a: 'Yes. BRC manufactures Type 30/30 Long Stroke (LS) spring brake chambers for applications with high brake shoe wear rates. Long-stroke chambers provide extra push-rod travel margin to maintain correct brake adjustment as shoes wear.'
          },
          {
            q: 'Can I mix spring brake chamber types on the same axle?',
            a: 'No. Both sides of an axle must use the same chamber type, stroke, and manufacturer. Mixing types causes imbalanced braking, uneven shoe wear, and potential brake pull. Always replace both chambers on an axle at the same time.'
          }
        ]} />
      </section>

      <Script id="spring-brakes-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Heavy-Duty Commercial Spring Brake Chambers",
          "description": "Factory-direct heavy-duty spring brake chambers. Direct aftermarket replacements for Bendix, Knorr-Bremse, ZF/WABCO, Meritor, and Haldex.",
          "url": "https://www.brakechambers.com/spring-brake-chambers",
          "manufacturer": {
            "@type": "Organization",
            "name": "BRC Brake Chambers"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.brakechambers.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Spring Brakes",
              "item": "https://www.brakechambers.com/spring-brake-chambers"
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What does 'Type 30/30' mean?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The numbers indicate the effective area (in square inches) of the diaphragm for the service chamber (first number) and the spring chamber (second number). A Type 30/30 has 30 square inches of area for both braking functions."
              }
            },
            {
              "@type": "Question",
              "name": "Are your spring brakes compatible with Bendix systems?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our spring brake assemblies and piggyback kits are manufactured as direct aftermarket replacements for Bendix, Meritor, and other major OEM systems, matching exact stroke, pushrod length, and port angles."
              }
            },
            {
              "@type": "Question",
              "name": "Should I replace the entire assembly or just use a piggyback kit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If the service chamber housing and pushrod are still in excellent condition and free of corrosion, a piggyback kit is a cost-effective solution. However, replacing the entire complete assembly is often recommended for maximum safety."
              }
            }
          ]
        }
      ]) }} />
    </>
  );

  return (
    <ProductListingLayout
      badge="Emergency & Parking Brakes"
      title="Spring Brake Chambers: Heavy-Duty OEM Replacements"
      description="Factory-direct spring brake chambers (combination and double diaphragm) for heavy-duty trucks, trailers, and transit buses. Direct replacement for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO. Type 20/24, 24/24, 30/30, and 24/30 available."
      baseCategory="spring-brake-chambers"
      products={products}
      searchParams={searchParams}
      visualizerType="spring"
      seoText={seoContent}
      breadcrumbs={[{ label: 'Spring Brakes' }]}
      />
  );
}
