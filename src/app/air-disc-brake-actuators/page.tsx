import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getProducts, getPageSeo } from '@/sanity/queries';
import ProductListingLayout from '@/features/products/components/ProductListingLayout';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Disc, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/air-disc-brake-actuators');
  const title = seo?.title || 'Air Disc Brake Actuators (ADB): High-Output Technology | BRC';
  const description = seo?.description || 'Next-generation air disc brake actuators with HOT Technology. Superior clamping force, reduced brake fade. Direct replacements for Bendix, Haldex, Meritor & WABCO. Factory-direct pricing.';
  const keywords = seo?.keywords?.length
    ? seo.keywords
    : ['Air Disc Actuators', 'ADB Actuators', 'Type 20/24 ADB', 'Commercial Air Brakes', 'Bendix ADB22X Replacement'];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/air-disc-brake-actuators',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/air-disc-brake-actuators',
      type: 'website',
    },
  };
}

export default async function AirDiscActuatorsPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const BRAKE_CHAMBERS = await getProducts();
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  
  // Base Filter for ADB Actuators
  let products = BRAKE_CHAMBERS.filter(c => c.category === 'Air Disc Actuator');

  // Legacy basic filters for main page
  if (searchParams?.filter) {
    const filter = searchParams.filter as string;
    if (filter === 'Standard') {
      products = products.filter(c => c.strokeSize === 'Standard');
    }
  }

  const seoContent = (
    <>
      <section className="mb-16">
        <SectionHeader
          badge="Technical Overview"
          badgeIcon={Disc}
          title="What Is an Air Disc Brake Actuator?"
          align="left"
          accentColor="amber"
          className="!mb-8"
        />
        <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-6 max-w-5xl">
          <p className="text-base md:text-lg font-medium text-navy-950 leading-relaxed">
            An air disc brake actuator (sometimes called an ADB chamber or air disc chamber) is a pneumatic device that converts air pressure into linear mechanical force to activate disc brake calipers. Unlike traditional S-cam drum brake chambers, which use a rotating S-cam to push brake shoes outward, an ADB actuator pushes a piston or lever directly against the brake caliper.
          </p>
          <p>
            This direct-force design delivers faster response, more consistent pad pressure, and shorter stopping distances than drum brakes. Air disc brakes are now standard equipment on most new heavy-duty trucks and transit buses. BRC manufactures a full range of commercial air disc brake actuators, serving as direct OEM replacements for Bendix, Haldex, Meritor, and WABCO part numbers.
          </p>

          <div className="pt-4 border-t border-slate-200/80 space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                1. Type 16 & Type 18/24 Air Disc Brake Actuators
              </h3>
              <p className="text-slate-600">
                Built specifically for front steer axles and lightweight commercial applications. Our <Link href="/air-disc-brake-actuators/type-16-18-adb-actuators" className="text-amber-600 font-bold hover:underline">Type 16 & 18 ADB Actuators</Link>{' '}integrate seamlessly with industry-standard calipers (including Bendix ADB22X, WABCO PAN/MAX, and Knorr-Bremse), delivering zero brake fade, instant application speeds, and high thermal resistance.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                2. Type 20/24 High-Output ADB Combination Actuators
              </h3>
              <p className="text-slate-600">
                The most prevalent air disc brake spring chamber specified on modern Class 8 tractors and trailers. BRC <Link href="/air-disc-brake-actuators/type-20-24-air-disc-brake-actuator" className="text-amber-600 font-bold hover:underline">Type 20/24 ADB Actuators</Link>{' '}incorporate our proprietary HOT (High Output Technology) design and synthetic high-temp grease pack to withstand extreme caliper heat while maintaining full FMVSS-121 clamping force.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                3. Heavy-Duty Type 24/24 ADB Chambers
              </h3>
              <p className="text-slate-600">
                Engineered for severe-duty and high-capacity hauling operations. Our <Link href="/air-disc-brake-actuators/type-24-24-adb-chambers" className="text-amber-600 font-bold hover:underline">Type 24/24 ADB Chambers</Link>{' '}provide equal 24 sq. in. service and parking outputs, validated under rigorous 1-million cycle life tests to ensure flawless fail-safe parking spring deployment under maximum gross vehicle weight ratings.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                4. Maximum-Torque Type 24/30 ADB Actuators
              </h3>
              <p className="text-slate-600">
                The ultimate solution for extreme rear-axle holding power on steep grade parking. BRC <Link href="/air-disc-brake-actuators/type-24-30-air-disc-brake-actuators" className="text-amber-600 font-bold hover:underline">Type 24/30 ADB Actuators</Link>{' '}combine a 24 sq. in. service diaphragm with an oversized 30 sq. in. parking spring section, preventing rollaways on heavy logging, refuse, and oversized equipment trailers.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/80">
            <Link href="/technical-resources" className="text-amber-600 font-bold hover:underline inline-flex items-center text-sm md:text-base">
              See our brake chamber technical resources <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <SectionHeader
          badge="Common Questions"
          title="Air Disc Brake Actuator FAQs"
          description="Common questions from fleet managers and distributors about air disc brake actuators."
          align="center"
          accentColor="amber"
        />
        <GlobalFAQAccordion faqs={[
          {
            q: 'What is the difference between an air disc brake actuator and a spring brake chamber?',
            a: 'An air disc brake actuator is designed specifically for air disc brake systems. It pushes a piston or lever directly against the brake caliper. A spring brake chamber is designed for S-cam drum brake systems, it uses a rotating S-cam to push brake shoes outward. The two are not interchangeable.'
          },
          {
            q: 'Can I replace a standard drum brake chamber with an ADB actuator?',
            a: 'No. Air disc brake actuators and drum brake chambers are mechanically incompatible. If your vehicle has drum brakes, it uses drum chambers. If it has disc brakes, it uses ADB actuators. You cannot substitute one for the other.'
          },
          {
            q: 'What is HOT Technology?',
            a: 'HOT (High Output Technology) is BRC\'s proprietary internal mechanism that maintains consistent clamping force as friction builds over time. Standard ADB actuators lose clamping force as internal friction increases. HOT Technology corrects this by maximizing mechanical advantage through a proprietary internal design, delivering consistent stopping power over millions of cycles.'
          },
          {
            q: 'Are your ADB actuators compatible with Bendix ADB22X calipers?',
            a: 'Yes. BRC ADB actuators are engineered as direct replacements for Bendix ADB22X, Meritor EX+, and WABCO PAN/MAX caliper systems. Use our OEM cross-reference tool to confirm the exact part number match for your vehicle.'
          },
          {
            q: 'Do ADB actuators require different air pressure than drum chambers?',
            a: 'No. Air disc brake actuators and drum brake chambers operate on the same air system pressure (typically 100 to 120 PSI). The difference is in the internal mechanism and caliper interface, not the air supply.'
          },
          {
            q: 'What is the service life of an air disc brake actuator?',
            a: 'Under normal commercial vehicle duty, BRC ADB actuators are designed to deliver the same service life as the OEM actuator they replace, typically 500,000 to 1,000,000 miles depending on application, duty cycle, and maintenance. Actual lifespan depends on route type, load weight, and braking frequency.'
          }
        ]} />
        <div className="mt-8 text-center">
          <Link href="/technical-resources" className="text-amber-600 font-bold hover:underline inline-flex items-center">
            See all brake chamber technical resources <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      <Script id="adb-actuators-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Air Disc Brake Actuators (ADB): High-Output Technology",
          "description": "Next-generation air disc brake actuators with HOT Technology. Superior clamping force, reduced brake fade. Direct replacements for Bendix, Haldex, Meritor & WABCO.",
          "url": "https://www.brakechambers.com/air-disc-brake-actuators",
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
              "name": "What is the difference between an air disc brake actuator and a spring brake chamber?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "An air disc brake actuator is designed specifically for air disc brake systems. It pushes a piston or lever directly against the brake caliper. A spring brake chamber is designed for S-cam drum brake systems, it uses a rotating S-cam to push brake shoes outward. The two are not interchangeable."
              }
            },
            {
              "@type": "Question",
              "name": "Can I replace a standard drum brake chamber with an ADB actuator?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Air disc brake actuators and drum brake chambers are mechanically incompatible. If your vehicle has drum brakes, it uses drum chambers. If it has disc brakes, it uses ADB actuators. You cannot substitute one for the other."
              }
            },
            {
              "@type": "Question",
              "name": "What is HOT Technology?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "HOT (High Output Technology) is BRC's proprietary internal mechanism that maintains consistent clamping force as friction builds over time. Standard ADB actuators lose clamping force as internal friction increases. HOT Technology corrects this by maximizing mechanical advantage through a proprietary internal design, delivering consistent stopping power over millions of cycles."
              }
            },
            {
              "@type": "Question",
              "name": "Are your ADB actuators compatible with Bendix ADB22X calipers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. BRC ADB actuators are engineered as direct replacements for Bendix ADB22X, Meritor EX+, and WABCO PAN/MAX caliper systems. Use our OEM cross-reference tool to confirm the exact part number match for your vehicle."
              }
            },
            {
              "@type": "Question",
              "name": "Do ADB actuators require different air pressure than drum chambers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Air disc brake actuators and drum brake chambers operate on the same air system pressure (typically 100 to 120 PSI). The difference is in the internal mechanism and caliper interface, not the air supply."
              }
            },
            {
              "@type": "Question",
              "name": "What is the service life of an air disc brake actuator?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Under normal commercial vehicle duty, BRC ADB actuators are designed to deliver the same service life as the OEM actuator they replace, typically 500,000 to 1,000,000 miles depending on application, duty cycle, and maintenance. Actual lifespan depends on route type, load weight, and braking frequency."
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
              "name": "Air Disc Actuators",
              "item": "https://www.brakechambers.com/air-disc-brake-actuators"
            }
          ]
        }
      ]) }} />
    </>
  );

  return (
    <ProductListingLayout
      badge="Disc Brake Systems"
      badgeIcon={Disc}
      title="Air Disc Brake Actuators (ADB): High-Output Technology"
      description="Next-generation air disc brake actuators delivering superior clamping force, reduced brake fade, and longer pad life. Direct replacement for Bendix, Haldex, Meritor, and WABCO. HOT Technology inside. Factory-direct pricing."
      baseCategory="air-disc-brake-actuators"
      products={products}
      searchParams={searchParams}
      visualizerType="adp"
      seoText={seoContent}
      breadcrumbs={[{ label: 'Air Disc Actuators' }]}
    />
  );
}
