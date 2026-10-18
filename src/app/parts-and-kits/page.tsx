import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getProducts, getPageSeo } from '@/sanity/queries';
import ProductListingLayout from '@/features/products/components/ProductListingLayout';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Wrench, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('/parts-and-kits');
  const title = seo?.title || 'Brake Chamber Parts & Kits: Diaphragms, Caging Bolts & Hardware | BRC';
  const description = seo?.description || 'Factory-direct brake chamber parts and kits. Diaphragms, caging bolts, clevis pins, and rebuild kits. Direct OEM fitment. In-stock and ready to ship worldwide.';
  const keywords = seo?.keywords?.length
    ? seo.keywords
    : ['Brake Chamber Accessories', 'Replacement Diaphragms', 'Clevis Kits', 'Commercial Air Brakes', 'Bendix Replacement', 'Meritor Replacement'];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: 'https://www.brakechambers.com/parts-and-kits',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.brakechambers.com/parts-and-kits',
      type: 'website',
    },
  };
}

export default async function ChamberPartsKitsPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const allProducts = await getProducts();
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  
  // Base Filter for Parts & Kits
  let products = allProducts.filter(c => c.category === 'Parts & Kits');

  // Basic filters for main page
  if (searchParams?.filter) {
    const filter = (searchParams.filter as string).toLowerCase();
    products = products.filter(c => 
      c.name.toLowerCase().includes(filter) || 
      c.type?.toLowerCase().includes(filter) ||
      c.brakingMethod?.toLowerCase().includes(filter)
    );
  }


  const seoContent = (
    <>
      <section className="mb-16">
        <SectionHeader
          badge="Maintenance & Repair"
          title="Why Quality Replacement Parts Matter for Brake Chambers"
          align="left"
          accentColor="amber"
          className="!mb-8"
        />
        <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-6 max-w-5xl">
          <p className="text-base md:text-lg font-medium text-navy-950 leading-relaxed">
            A brake chamber is a sealed assembly, but it can be rebuilt. When the diaphragm fails, when the caging bolt is lost, or when the return spring weakens, replacement parts bring the chamber back to full function.
          </p>
          <p>
            Using low-quality aftermarket parts causes premature failure, air leaks, and unsafe braking. Every BRC replacement part is manufactured to OEM specifications to restore the chamber to its original performance.
          </p>

          <div className="pt-4 border-t border-slate-200/80 space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                1. Comprehensive Air Brake Chamber Rebuild Kits
              </h3>
              <p className="text-slate-600">
                Instead of replacing entire assemblies during preventative maintenance, our complete <Link href="/parts-and-kits/air-brake-chamber-rebuild-kits" className="text-amber-600 font-bold hover:underline">Chamber Rebuild Kits</Link>{' '}provide fleets with every wear component needed for rapid overhaul in the bay. Each kit includes high-integrity diaphragms, precision oil-resistant center seals, dust boots, mounting hardware, and caging tools—eliminating the need to source individual small fasteners and ensuring uniform seal pressure.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                2. Heavy-Duty Rubber Diaphragms (Type 20 to Type 36)
              </h3>
              <p className="text-slate-600">
                The diaphragm is the primary air-actuated pressure boundary. BRC <Link href="/parts-and-kits/brake-chamber-diaphragms" className="text-amber-600 font-bold hover:underline">Rubber Diaphragms</Link>{' '}are molded from proprietary nylon fabric-reinforced neoprene engineered to endure over one million stroke cycles from -40°C to +80°C (-40°F to +176°F). Resistant to oil vapors and continuous pressure spikes, they prevent internal blow-by and micro-cracking across all standard North American chamber diameters.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                3. Precision Clevis Pins & Slack Adjuster Linkage Hardware
              </h3>
              <p className="text-slate-600">
                The mechanical linkage between the chamber pushrod and slack adjuster must maintain zero slop. Lost motion from worn or corroded clevis pins degrades brake timing and extends stopping distance. BRC supplies drop-forged, zinc-plated 5/8"-18 threaded clevis assemblies, hardened steel clevis pins, and heavy-duty cotter pins on our <Link href="/parts-and-kits/clevis-pins-slack-adjuster-hardware" className="text-amber-600 font-bold hover:underline">Clevis Pins & Hardware</Link>{' '}line, ensuring a tight connection that passes DOT roadside inspections.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                4. Forged Caging Bolts & Release Tools
              </h3>
              <p className="text-slate-600">
                Safety is paramount when working with high-energy mechanical parking springs. Our manual and automatic release <Link href="/parts-and-kits/brake-chamber-caging-bolts-tools" className="text-amber-600 font-bold hover:underline">Caging Bolts & Release Tools</Link>{' '}are drop-forged from high-tensile alloy steel with a zinc-dichromate anti-seize finish, ensuring safe, controlled mechanical compression of the power spring during roadside towing or shop servicing.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                5. Heavy-Gauge Clamp Bands & Airtight Fasteners
              </h3>
              <p className="text-slate-600">
                The two halves of a brake chamber depend on uniform 360° perimeter clamping to prevent catastrophic air leaks. BRC <Link href="/parts-and-kits/brake-chamber-clamp-bands" className="text-amber-600 font-bold hover:underline">Brake Chamber Clamp Bands</Link>{' '}utilize heavy-gauge formed steel with Grade 8 fasteners, providing a durable, vibration-proof seal for Type 30, Type 24, and Type 20 housings.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-navy-950">
                6. Automatic & Manual Slack Adjusters (ASA)
              </h3>
              <p className="text-slate-600">
                Maintaining pushrod stroke within legal FMVSS-121 tolerances requires reliable clearance adjustment. Our <Link href="/parts-and-kits/automatic-manual-slack-adjusters" className="text-amber-600 font-bold hover:underline">Automatic & Manual Slack Adjusters</Link>{' '}feature precision-machined splines and grease-purge check valves to continuously compensate for foundation brake lining wear, keeping your fleet safe and compliant.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/80">
            <Link href="/technical-resources" className="text-amber-600 font-bold hover:underline inline-flex items-center text-sm md:text-base">
              See our brake chamber installation and maintenance guide <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <SectionHeader
          badge="Common Questions"
          title="Brake Chamber Parts FAQs"
          description="Common questions from fleet managers, technicians, and distributors about brake chamber replacement parts."
          align="center"
          accentColor="amber"
        />
        <GlobalFAQAccordion faqs={[
          {
            q: 'What brake chamber accessories do you offer?',
            a: 'BRC manufactures a full range of replacement parts and kits: air brake chamber repair kits, rubber diaphragms (neoprene, nylon-reinforced), caging bolts and tools, clevis pins and hardware, slack adjusters, clamp bands, pre-caged piggyback kits, and internal return springs. All parts are manufactured to OEM specifications.'
          },
          {
            q: 'Are BRC parts compatible with OEM chambers like Bendix or Meritor?',
            a: 'Yes. BRC replacement parts are engineered to match OEM dimensions and function for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO brake chambers. Use our OEM cross-reference tool to confirm the exact part number match for your application.'
          },
          {
            q: 'Do you offer wholesale pricing for repair shops and fleets?',
            a: 'Yes. BRC supplies repair shops, fleet maintenance departments, and distributors with wholesale pricing on parts and kits. Volume discounts are available for regular orders. Contact our sales team for pricing and account setup.'
          },
          {
            q: 'What is a pre-caged piggyback kit?',
            a: 'A pre-caged piggyback kit is a complete spring brake replacement section that arrives already caged at the factory. It allows mechanics to swap the parking spring section without dismounting the entire chamber, saving significant installation time. See our selection guide for full details on when to use a piggyback kit vs. a full chamber replacement.'
          },
          {
            q: 'What is the operating temperature range for BRC diaphragms?',
            a: 'BRC neoprene rubber diaphragms are rated for -40°C to +80°C (-40°F to +176°F) operating range. They remain flexible in extreme cold and resist thermal degradation in high-heat applications.'
          },
          {
            q: 'How do I identify the correct diaphragm for my brake chamber?',
            a: 'Diaphragms are matched by chamber type (e.g., Type 30/30, Type 24/24). You can identify your chamber type by measuring the outside diameter of the clamp band or checking the ID tag. See our brake chamber visual identification guide for step-by-step instructions.'
          }
        ]} />
        <div className="mt-8 text-center">
          <Link href="/technical-resources" className="text-amber-600 font-bold hover:underline inline-flex items-center">
            See all brake chamber technical resources <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      <Script id="parts-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Brake Chamber Parts & Kits: Diaphragms, Caging Bolts & Hardware",
          "description": "Factory-direct brake chamber parts and kits. Diaphragms, caging bolts, clevis pins, and rebuild kits. Direct OEM fitment.",
          "url": "https://www.brakechambers.com/parts-and-kits",
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
              "name": "What brake chamber accessories do you offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BRC manufactures a full range of replacement parts and kits: air brake chamber repair kits, rubber diaphragms (neoprene, nylon-reinforced), caging bolts and tools, clevis pins and hardware, slack adjusters, clamp bands, pre-caged piggyback kits, and internal return springs. All parts are manufactured to OEM specifications."
              }
            },
            {
              "@type": "Question",
              "name": "Are BRC parts compatible with OEM chambers like Bendix or Meritor?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. BRC replacement parts are engineered to match OEM dimensions and function for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO brake chambers. Use our OEM cross-reference tool to confirm the exact part number match for your application."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer wholesale pricing for repair shops and fleets?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. BRC supplies repair shops, fleet maintenance departments, and distributors with wholesale pricing on parts and kits. Volume discounts are available for regular orders. Contact our sales team for pricing and account setup."
              }
            },
            {
              "@type": "Question",
              "name": "What is a pre-caged piggyback kit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A pre-caged piggyback kit is a complete spring brake replacement section that arrives already caged at the factory. It allows mechanics to swap the parking spring section without dismounting the entire chamber, saving significant installation time. See our selection guide for full details on when to use a piggyback kit vs. a full chamber replacement."
              }
            },
            {
              "@type": "Question",
              "name": "What is the operating temperature range for BRC diaphragms?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BRC neoprene rubber diaphragms are rated for -40°C to +80°C (-40°F to +176°F) operating range. They remain flexible in extreme cold and resist thermal degradation in high-heat applications."
              }
            },
            {
              "@type": "Question",
              "name": "How do I identify the correct diaphragm for my brake chamber?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Diaphragms are matched by chamber type (e.g., Type 30/30, Type 24/24). You can identify your chamber type by measuring the outside diameter of the clamp band or checking the ID tag. See our brake chamber visual identification guide for step-by-step instructions."
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
              "name": "Chamber Parts & Kits",
              "item": "https://www.brakechambers.com/parts-and-kits"
            }
          ]
        }
      ]) }} />
    </>
  );

  return (
    <ProductListingLayout
      badge="Maintenance & Repair"
      badgeIcon={Wrench}
      title="Brake Chamber Parts & Kits: Diaphragms, Caging Bolts & Hardware"
      description="Factory-direct replacement parts for commercial brake chambers. Repair kits, rubber diaphragms, caging bolts, clevis pins, and mounting hardware, all precision-manufactured to OEM specifications. In-stock and ready to ship worldwide."
      baseCategory="parts-and-kits"
      products={products}
      searchParams={searchParams}
      visualizerType="parts"
      seoText={seoContent}
      breadcrumbs={[{ label: 'Chamber Parts & Kits' }]}
    />
  );
}
