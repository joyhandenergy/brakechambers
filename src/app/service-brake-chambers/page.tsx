import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getProducts, getPageSeo } from '@/sanity/queries';
import ProductListingLayout from '@/features/products/components/ProductListingLayout';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import SectionHeader from '@/components/ui/SectionHeader';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/service-brake-chambers');
  const title = seo?.title || 'Service Brake Chambers: OEM Replacements for Steer & Drive Axles | BRC';
  const description = seo?.description || 'Factory-direct service brake chambers for steer axle, drive axle, and trailer applications. Type 9 through Type 30. Direct replacements for Bendix, Haldex, Meritor & WABCO.';
  const keywords = seo?.keywords?.length
    ? seo.keywords
    : ['Service Brake Chambers', 'Type 20', 'Type 24', 'Type 30', 'Commercial Air Brakes', 'Heavy-Duty Brake Chambers', 'Bendix Replacement', 'Meritor Replacement'];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/service-brake-chambers',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/service-brake-chambers',
      type: 'website',
    },
  };
}

export default async function ServiceBrakesPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const BRAKE_CHAMBERS = await getProducts();
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  
  // Base Filter for Service Brakes
  let products = BRAKE_CHAMBERS.filter(c => c.category === 'Service Brake');

  // Legacy basic filters for main page
  if (searchParams?.filter) {
    const filter = searchParams.filter as string;
    if (filter === 'Standard') {
      products = products.filter(c => c.strokeSize === 'Standard');
    } else if (filter === 'Long Stroke') {
      products = products.filter(c => c.strokeSize === 'Long Stroke');
    }
  }

  const seoContent = (
    <>
      <section className="mb-16">
        <SectionHeader
          badge="Technical Overview"
          badgeIcon={ShieldCheck}
          title="What Is a Service Brake Chamber?"
          align="left"
          accentColor="amber"
          className="!mb-8"
        />
        <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-6 max-w-5xl">
          <p className="text-base md:text-lg font-medium text-navy-950 leading-relaxed">
            A service brake chamber is a single-diaphragm air brake component that converts compressed air pressure into mechanical force for primary braking. It contains one diaphragm, one push-rod, and one pressure housing, with no parking spring section.
          </p>
          <p>
            When the driver presses the brake pedal, air enters the chamber and pushes the diaphragm against the push-rod. The push-rod transmits force to the slack adjuster and S-cam, applying the brakes. When the pedal is released, an internal return spring retracts the push-rod and releases the brakes. BRC manufactures the full range of commercial service brake chambers, engineered as direct OEM replacements for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO part numbers.
          </p>

          <div className="pt-4 border-t border-slate-200/80 space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                1. Dedicated Type 20 Steer Axle Brake Chambers
              </h3>
              <p className="text-slate-600">
                The preferred OE specification for Class 7 and Class 8 front steering axles. Our <Link href="/service-brake-chambers/type-20-steer-axle-brake-chambers" className="text-amber-600 font-bold hover:underline">Type 20 Steer Axle Chambers</Link>{' '}provide precisely calibrated 20 sq. in. diaphragm output to prevent steer wheel lockup under hard braking while maintaining full FMVSS-121 compliance and clearance around steering geometry.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                2. Heavy-Duty Type 30 Drive & Trailer Service Chambers
              </h3>
              <p className="text-slate-600">
                The high-output standard for non-parking brake positions on heavy-duty drive axles and vocational trailers. BRC <Link href="/service-brake-chambers/type-30-service-chambers" className="text-amber-600 font-bold hover:underline">Type 30 Service Chambers</Link>{' '}generate maximum mechanical push-rod force through heavy-gauge steel shells and oil-resistant nylon diaphragms, available in standard 2.5&quot; and long-stroke 3.0&quot; models.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                3. Compact Type 12, Type 16 & Type 24 Service Chambers
              </h3>
              <p className="text-slate-600">
                Tailored for medium-duty trucks, delivery step-vans, low-bed equipment haulers, and specialized transit vehicles. Our <Link href="/service-brake-chambers/type-12-16-24-service-chambers" className="text-amber-600 font-bold hover:underline">Type 12, 16 & 24 Chambers</Link>{' '}deliver compact dimensions and balanced linear actuation where mounting clearances are limited.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                4. Robotic-Welded Clevis Brake Chambers
              </h3>
              <p className="text-slate-600">
                Eliminate manual push-rod cutting and jam-nut torquing during assembly. BRC <Link href="/service-brake-chambers/welded-clevis-brake-chambers" className="text-amber-600 font-bold hover:underline">Welded Clevis Brake Chambers</Link>{' '}feature factory-welded yoke assemblies aligned precisely to OEM suspension specs, completely preventing thread stripping or push-rod slip under continuous cycling.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/80">
            <Link href="/technical-resources" className="text-amber-600 font-bold hover:underline inline-flex items-center text-sm md:text-base">
              See our service brake chamber selection guide <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <SectionHeader
          badge="Common Questions"
          title="Service Brake Chamber FAQs"
          description="Common questions from fleet managers and distributors about service brake chambers."
          align="center"
          accentColor="amber"
        />
        <GlobalFAQAccordion faqs={[
          {
            q: 'What is the difference between a service brake and a spring brake?',
            a: 'A service brake chamber has one diaphragm and provides primary braking only. A spring brake chamber (also called a combination chamber) contains a second internal section with a power spring that acts as an emergency and parking brake. Spring brakes are used where a parking brake is required (drive axles, trailer axles); service brakes are used on steer axles and other non-parking positions.'
          },
          {
            q: 'When should I choose a Long Stroke (LS) service chamber?',
            a: 'Choose a long-stroke service chamber when the vehicle experiences high brake shoe wear rates — usually heavy-duty vocational applications, transit buses, or any vehicle running frequent stop-and-go cycles. Long-stroke chambers provide additional push-rod travel margin, which keeps the slack adjuster in the proper operating range as shoes wear down.'
          },
          {
            q: 'Are these direct replacements for Bendix service chambers?',
            a: 'Yes. BRC service brake chambers are engineered to match the fit, form, and function of Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO service chambers. Use our OEM cross-reference tool to find the exact part number match for your application.'
          },
          {
            q: 'Can I replace a spring brake chamber with a service brake chamber?',
            a: 'No. Service and spring brake chambers are not interchangeable. If a position requires a parking brake function (which it does on drive axles and trailer axles), it must use a spring brake chamber. Service chambers are only used where no parking function is required.'
          },
          {
            q: 'What is a welded clevis service chamber?',
            a: 'A welded clevis service chamber has the clevis permanently welded to the push-rod at the factory, rather than being threaded and secured with a jam nut. Welded clevis designs eliminate the risk of clevis thread pull-out and are common on OE applications. They are not field-adjustable — the push-rod length is fixed.'
          },
          {
            q: 'Can I mix service brake chamber sizes on the same axle?',
            a: 'No. Both sides of an axle must use the same chamber type, stroke, and manufacturer. Mixing sizes causes imbalanced braking, uneven shoe wear, and potential brake pull. Always replace both chambers on an axle at the same time.'
          }
        ]} />
        <div className="mt-8 text-center">
          <Link href="/technical-resources" className="text-amber-600 font-bold hover:underline inline-flex items-center">
            See all brake chamber technical resources <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      <Script id="service-chambers-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Service Brake Chambers: OEM Replacements for Steer & Drive Axles",
          "description": "Factory-direct service brake chambers for steer axle, drive axle, and trailer applications. Type 9 through Type 30. Direct replacements for Bendix, Haldex, Meritor & WABCO.",
          "url": "https://www.brakechambers.com/service-brake-chambers",
          "manufacturer": {
            "@type": "Organization",
            "name": "BRC Brake Chambers"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the difference between a service brake and a spring brake?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A service brake chamber has one diaphragm and provides primary braking only. A spring brake chamber (also called a combination chamber) contains a second internal section with a power spring that acts as an emergency and parking brake. Spring brakes are used where a parking brake is required (drive axles, trailer axles); service brakes are used on steer axles and other non-parking positions."
              }
            },
            {
              "@type": "Question",
              "name": "When should I choose a Long Stroke (LS) service chamber?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Choose a long-stroke service chamber when the vehicle experiences high brake shoe wear rates — usually heavy-duty vocational applications, transit buses, or any vehicle running frequent stop-and-go cycles. Long-stroke chambers provide additional push-rod travel margin, which keeps the slack adjuster in the proper operating range as shoes wear down."
              }
            },
            {
              "@type": "Question",
              "name": "Are these direct replacements for Bendix service chambers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. BRC service brake chambers are engineered to match the fit, form, and function of Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO service chambers. Use our OEM cross-reference tool to find the exact part number match for your application."
              }
            },
            {
              "@type": "Question",
              "name": "Can I replace a spring brake chamber with a service brake chamber?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Service and spring brake chambers are not interchangeable. If a position requires a parking brake function (which it does on drive axles and trailer axles), it must use a spring brake chamber. Service chambers are only used where no parking function is required."
              }
            },
            {
              "@type": "Question",
              "name": "What is a welded clevis service chamber?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A welded clevis service chamber has the clevis permanently welded to the push-rod at the factory, rather than being threaded and secured with a jam nut. Welded clevis designs eliminate the risk of clevis thread pull-out and are common on OE applications. They are not field-adjustable — the push-rod length is fixed."
              }
            },
            {
              "@type": "Question",
              "name": "Can I mix service brake chamber sizes on the same axle?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Both sides of an axle must use the same chamber type, stroke, and manufacturer. Mixing sizes causes imbalanced braking, uneven shoe wear, and potential brake pull. Always replace both chambers on an axle at the same time."
              }
            }
          ]
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
              "name": "Service Brakes",
              "item": "https://www.brakechambers.com/service-brake-chambers"
            }
          ]
        }
      ]) }} />
    </>
  );

  return (
    <ProductListingLayout
      badge="Primary Braking"
      badgeIcon={ShieldCheck}
      title="Service Brake Chambers: OEM Replacements for Steer & Drive Axles"
      description="Factory-direct service brake chambers engineered for steer axle, drive axle, and trailer applications. Direct fit, form, and function replacement for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO. Type 9 through Type 30 available."
      baseCategory="service-brake-chambers"
      products={products}
      searchParams={searchParams}
      visualizerType="service"
      seoText={seoContent}
      breadcrumbs={[{ label: 'Service Brakes' }]}
    />
  );
}
