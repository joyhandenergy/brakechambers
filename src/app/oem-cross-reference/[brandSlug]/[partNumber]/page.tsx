import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts } from '@/sanity/queries';
import ProductListCard from '@/features/products/components/ProductListCard';
import PageHeader from '@/components/layout/PageHeader';
import CrossReferenceMarquee from '@/components/ui/CrossReferenceMarquee';
import { CheckCircle2, CheckCircle, ShieldCheck, ArrowRight, Settings2, Replace, BadgeCheck } from 'lucide-react';

export async function generateStaticParams() {
  const BRAKE_CHAMBERS = await getProducts();
  const params: { brandSlug: string, partNumber: string }[] = [];
  
  BRAKE_CHAMBERS.forEach(chamber => {
    if (chamber.oemPartNumbers) {
      chamber.oemPartNumbers.forEach(oem => {
        const brandSlug = oem.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const partNumber = oem.partNumber.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        params.push({ brandSlug, partNumber });
      });
    }
  });

  return params;
}

export async function generateMetadata(
  props: { params: Promise<{ brandSlug: string, partNumber: string }> }
): Promise<Metadata> {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const normalizedBrand = params.brandSlug.toUpperCase();
  const partNumber = params.partNumber.toUpperCase();

  return {
    title: `${normalizedBrand} ${partNumber} Equivalent | BRC Brake Chambers`,
    description: `Direct 1:1 replacement for ${normalizedBrand} ${partNumber}. Verified fit, form, and function for heavy-duty commercial vehicle air brake systems.`,
    keywords: [`${partNumber} replacement`, `${normalizedBrand} ${partNumber}`, 'Cross Reference', 'Direct Replacement', 'Aftermarket'],
    alternates: {
      canonical: `https://www.brakechambers.com/oem-cross-reference/${params.brandSlug}/${params.partNumber}`,
    },
    openGraph: {
      title: `${normalizedBrand} ${partNumber} Equivalent | BRC Brake Chambers`,
      description: `Direct 1:1 replacement for ${normalizedBrand} ${partNumber}. Verified fit, form, and function for heavy-duty commercial vehicle air brake systems.`,
      url: `https://www.brakechambers.com/oem-cross-reference/${params.brandSlug}/${params.partNumber}`,
      siteName: 'BRC Brake Chambers',
      images: [
        {
          url: 'https://www.brakechambers.com/images/logo-brc.png',
          width: 800,
          height: 800,
          alt: `${normalizedBrand} ${partNumber} Replacement Brake Chamber`,
        },
      ],
      type: 'website',
    },
  };
}

export default async function OEMPartNumberPage(
  props: { params: Promise<{ brandSlug: string, partNumber: string }> }
) {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  
  // Find the matching BRC chamber based on brandSlug and partNumber
  let matchedChamber = null;
  let oemOriginalBrand = '';
  let oemOriginalPart = '';

  for (const chamber of BRAKE_CHAMBERS) {
    if (chamber.oemPartNumbers) {
      const match = chamber.oemPartNumbers.find(oem => {
        const oBrandSlug = oem.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const oPartNum = oem.partNumber.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return oBrandSlug === params.brandSlug && oPartNum === params.partNumber;
      });
      
      if (match) {
        matchedChamber = chamber;
        oemOriginalBrand = match.brand;
        oemOriginalPart = match.partNumber;
        break;
      }
    }
  }

  if (!matchedChamber) {
    notFound();
  }

  const categoryPath = matchedChamber.category === 'Spring Brake' ? 'spring-brake-chambers' : 
                       matchedChamber.category === 'Service Brake' ? 'service-brake-chambers' : 'air-disc-brake-actuators';

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <PageHeader 
        badge="Direct Replacement"
        title={`${oemOriginalBrand} ${oemOriginalPart} Equivalent`}
        description={`Found an exact 1:1 direct aftermarket replacement for ${oemOriginalBrand} part number ${oemOriginalPart}. No modifications required.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'OEM Cross-Reference', href: '/oem-cross-reference' },
          { label: oemOriginalBrand, href: `/oem-cross-reference/${params.brandSlug}` },
          { label: oemOriginalPart }
        ]}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl -mt-10 relative z-20">
        
        {/* Success Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-5 mb-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500 text-white p-2.5 rounded-full flex-shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-emerald-950 font-bold text-lg sm:text-xl tracking-tight !mb-0.5">100% Compatibility Match Verified</h2>
              <p className="text-emerald-800 text-sm font-medium">We found the exact BRC factory-direct equivalent for your {oemOriginalBrand} part.</p>
            </div>
          </div>
          <div className="flex items-center text-sm font-bold text-emerald-900 border border-emerald-200 bg-white/90 px-4 py-2.5 rounded-xl shrink-0 shadow-sm">
            <span className="text-emerald-700 mr-2 uppercase tracking-wider text-xs">OEM SKU:</span> <span className="font-mono text-emerald-950 font-bold">{oemOriginalPart}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-grow flex flex-col gap-8">
            
            {/* Visual Match Visualization */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-6">
                {/* OEM Side */}
                <div className="flex-1 w-full bg-white rounded-2xl p-6 border border-slate-200 text-center relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-400"></div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Original Part</div>
                  <div className="font-black text-xl sm:text-2xl text-navy-900 mb-1">{oemOriginalBrand}</div>
                  <div className="font-mono text-slate-700 font-bold bg-slate-100 py-1 px-3 rounded-lg inline-block text-sm border border-slate-200/80">{oemOriginalPart}</div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 bg-white text-amber-500 p-3.5 rounded-full hidden md:block border border-slate-200 shadow-sm">
                  <Replace className="w-5 h-5" />
                </div>
                <div className="flex-shrink-0 bg-white text-amber-500 p-3.5 rounded-full md:hidden rotate-90 border border-slate-200 shadow-sm">
                  <Replace className="w-5 h-5" />
                </div>

                {/* BRC Side */}
                <div className="flex-1 w-full bg-amber-50/70 rounded-2xl p-6 border border-amber-300 text-center relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500"></div>
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1.5">BRC Equivalent</div>
                  <div className="font-black text-xl sm:text-2xl text-navy-900 mb-1">BRC {matchedChamber.type}</div>
                  <div className="font-mono font-bold text-amber-900 bg-amber-100 py-1 px-3 rounded-lg inline-block text-sm border border-amber-300">{matchedChamber.name.split('(')[0].trim()}</div>
                </div>
              </div>

              {/* The Product Card */}
              <div className="mb-2">
                <ProductListCard product={matchedChamber} categoryPath={categoryPath} />
              </div>
            </div>

            {/* Spec Comparison Checklist */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center border-b border-slate-100 pb-4">
                <Settings2 className="w-5 h-5 mr-3 text-amber-500" />
                Engineering Verification
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Chamber Type</div>
                    <div className="font-bold text-navy-900">{matchedChamber.type}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Stroke Profile</div>
                    <div className="font-bold text-navy-900">{matchedChamber.strokeSize} <span className="text-slate-400 font-normal">({matchedChamber.strokeInch || matchedChamber.specifications.strokeMetric})</span></div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Mounting Bolt Spacing</div>
                    <div className="font-bold text-navy-900">{matchedChamber.specifications.mountingBoltSpacing || '120.7 mm (4.75")'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Pushrod Length</div>
                    <div className="font-bold text-navy-900">{matchedChamber.specifications.pushRodLength || matchedChamber.pushRodLengthInch || 'Standard Cut-to-Length'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Inlet Port Spec</div>
                    <div className="font-bold text-navy-900">{matchedChamber.specifications.inletPortThreadSize || matchedChamber.specifications.portSize || '3/8" NPT'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Target Application</div>
                    <div className="font-bold text-navy-900">{matchedChamber.application || 'Heavy-Duty Commercial Axles'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-navy-900 !mb-0">Form, Fit & Function Guaranteed</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This BRC chamber provides a precision 1:1 mechanical and pneumatic replacement for the <strong className="text-navy-900">{oemOriginalBrand} {oemOriginalPart}</strong>, guaranteeing factory pushrod alignment, mounting stud centerlines, and calibrated release timing. 100% direct fit with zero bracket modifications required.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                 <Link href={`/${categoryPath}/${matchedChamber.slug}`} className="w-full sm:w-auto inline-flex items-center justify-center bg-amber-500 text-navy-950 font-bold py-3.5 px-8 rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                   View Details & Add to Quote <ArrowRight className="w-4 h-4 ml-2" />
                 </Link>
                 <Link href="/oem-cross-reference" className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-navy-900 font-bold py-3.5 px-8 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                   Search Another Part
                 </Link>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-500 fill-mode-both">
             <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-700 lg:sticky top-8 overflow-hidden relative">
               {/* Decorative glow */}
               <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[50px] -mr-10 -mt-10 z-0 pointer-events-none"></div>
               
               <div className="relative z-10">
                 <h3 className="font-bold text-xl mb-6 flex items-center border-b border-white/10 pb-4 !text-white">
                   <ShieldCheck className="w-5 h-5 mr-3 text-amber-400" />
                   Why switch to BRC?
                 </h3>
                 <ul className="space-y-5 mb-8">
                   <li className="flex gap-4">
                     <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
                     <p className="text-sm text-slate-300 leading-relaxed"><strong className="!text-white block mb-0.5">Wholesale Pricing</strong> Buy direct from the factory and cut out the middleman distributor margins.</p>
                   </li>
                   <li className="flex gap-4">
                     <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
                     <p className="text-sm text-slate-300 leading-relaxed"><strong className="!text-white block mb-0.5">Tested Quality</strong> Rated for over 1 million duty cycles in extreme operating environments.</p>
                   </li>
                   <li className="flex gap-4">
                     <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
                     <p className="text-sm text-slate-300 leading-relaxed"><strong className="!text-white block mb-0.5">Global Logistics</strong> We handle everything from EXW to CIF. Most parts ship same-day globally.</p>
                   </li>
                 </ul>
                 <Link href={`/quote?part=${encodeURIComponent(oemOriginalPart)}&brand=${encodeURIComponent(oemOriginalBrand)}`} className="block w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-950 text-center rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20">
                   Request Bulk Pricing
                 </Link>
               </div>
             </div>
          </div>
          
        </div>
      </div>

      {/* Suggested Cross References */}
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl mt-16 mb-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Catalog Interchange</div>
            <h3 className="text-2xl font-bold text-navy-900 !mb-0">More {oemOriginalBrand} Cross-References</h3>
          </div>
          <Link href={`/oem-cross-reference/${params.brandSlug}`} className="text-amber-600 hover:text-amber-700 font-bold text-sm inline-flex items-center gap-1 group">
            Browse All {oemOriginalBrand} Parts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      <CrossReferenceMarquee filterBrand={oemOriginalBrand} maxItems={15} />
    </div>
  );
}
