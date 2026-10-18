"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, Download, ChevronRight, Check, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CategoryPromoBanner from '@/features/products/components/CategoryPromoBanner';
import ProductSeoBlock from '@/features/products/components/ProductSeoBlock';
import TechnicalDownloads from '@/features/products/product-detail/TechnicalDownloads';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import RelatedProducts from './RelatedProducts';
import CrossReferenceMarquee from '@/components/ui/CrossReferenceMarquee';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ProductDetailLayout({
  product,
  categoryName,
  categoryPath
}: {
  product: any;
  categoryName: string;
  categoryPath: string;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isChamber = 'type' in product;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, categoryPath as any, 1);
    setTimeout(() => {
      setIsAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 400);
  };

  return (
    <>
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-[1920px]">
        <Breadcrumb items={[{ label: categoryName, href: `/${categoryPath}` }, { label: product.name }]} />

        <div className="bg-white rounded-3xl shadow-xl shadow-navy-900/5 border border-navy-50 overflow-hidden flex flex-col lg:flex-row mt-6 relative">

          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 min-w-0 p-5 lg:p-12 bg-gradient-to-b from-[#F8FAFC] to-white flex flex-col items-center justify-start border-b lg:border-b-0 lg:border-r border-navy-50">
            <div className="relative w-full max-w-lg aspect-square lg:aspect-square bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-4 mb-6 group transition-all duration-300 hover:shadow-md hover:border-slate-200">
              <Image
                src={product.galleryUrls?.[activeImage] || product.galleryUrls?.[0]}
                alt={activeImage === 0 ? `${product.name} - Commercial Air Brake Chamber Photo` : `${product.name} - Technical Dimensions and Schematic Drawing`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            {product.galleryUrls && product.galleryUrls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 max-w-full scrollbar-thin scrollbar-thumb-slate-200">
                {product.galleryUrls.map((url: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-amber-500 shadow-md' : 'border-transparent bg-slate-50 opacity-70 hover:opacity-100 shadow-sm'}`}
                    title={idx === 0 ? "View Product Photo" : "View Technical Drawing"}
                  >
                    <Image src={url} alt={idx === 0 ? `${product.name} Thumbnail Photo` : `${product.name} Technical Drawing Thumbnail`} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
              <span className="flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-100"><Check size={14} className="mr-1.5" /> In Stock</span>
              <span className="flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-navy-700 bg-navy-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-navy-100"><ShieldCheck size={14} className="mr-1.5" /> Automotive Standards</span>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 min-w-0 p-5 lg:p-12 flex flex-col relative z-10">
            <div className="inline-flex items-center text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 shadow-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-max mb-4">
              {product.type}
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-navy-900 mb-6 leading-tight">{product.name}</h1>

            {/* Logistics Box */}
            <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white border border-navy-700 rounded-3xl p-6 lg:p-8 mb-8 shadow-xl relative overflow-hidden group">
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full transition-transform duration-700 group-hover:scale-110 z-0 pointer-events-none"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl z-0 pointer-events-none"></div>

              <h2 className="text-[11px] font-black text-amber-400 uppercase tracking-widest mb-6 relative z-10 flex items-center">
                <Truck size={16} className="mr-2" /> Wholesale Logistics
              </h2>
              <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10">
                <div className="flex flex-col border-r border-navy-700/50 pr-4">
                  <span className="text-3xl lg:text-4xl font-black text-white mb-1 tracking-tight drop-shadow-sm">{product.moq || 50}<span className="text-sm font-bold text-navy-400 ml-1 tracking-normal">pcs</span></span>
                  <span className="text-[10px] sm:text-xs text-navy-300 font-bold uppercase tracking-wider leading-tight">Minimum Order</span>
                </div>
                <div className="flex flex-col pl-2">
                  <span className="text-3xl lg:text-4xl font-black text-white mb-1 tracking-tight drop-shadow-sm">{product.palletQuantity || 120}<span className="text-sm font-bold text-navy-400 ml-1 tracking-normal">pcs</span></span>
                  <span className="text-[10px] sm:text-xs text-navy-300 font-bold uppercase tracking-wider leading-tight">Standard Pallet</span>
                </div>
              </div>
            </div>

            {/* OEM Table */}
            <div className="border-y sm:border border-slate-200 rounded-none sm:rounded-xl overflow-hidden mb-2 sm:mb-8 -mx-5 sm:mx-0">
              <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-5 py-3 sm:py-4">
                <h2 className="font-bold text-navy-900 flex items-center text-xs sm:text-sm tracking-wide uppercase">
                  <ShieldCheck size={18} className="mr-2 text-amber-500" /> Direct OEM Cross-Reference
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white border-b border-slate-100 text-slate-500 text-[11px] sm:text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-4 py-3 sm:px-5 sm:py-3 whitespace-nowrap">Brand</th>
                      <th className="px-4 py-3 sm:px-5 sm:py-3 whitespace-nowrap">Part Number</th>
                      <th className="px-4 py-3 sm:px-5 sm:py-3 whitespace-nowrap">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {product.oemPartNumbers && product.oemPartNumbers.length > 0 ? (
                      product.oemPartNumbers.map((oem: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900 whitespace-nowrap">{oem.brand}</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-mono font-bold text-navy-700 whitespace-nowrap">{oem.partNumber}</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-slate-500 text-xs sm:text-sm min-w-[120px]">{oem.notes || 'Direct Drop-in Replacement'}</td>
                        </tr>
                      ))
                    ) : (
                      product.crossReferenceBrands?.map((brand: string, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900 whitespace-nowrap">{brand}</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-mono text-slate-400 whitespace-nowrap">Match by Specs</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-slate-400 text-xs min-w-[120px]">-</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Specifications Table */}
            {product.specifications && (
              <div className="border-y sm:border border-slate-200 rounded-none sm:rounded-xl overflow-hidden mb-2 sm:mb-8 -mx-5 sm:mx-0">
                <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-5 py-3 sm:py-4">
                  <h2 className="font-bold text-navy-900 flex items-center text-xs sm:text-sm tracking-wide uppercase">
                    Technical Specifications
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white border-b border-slate-100 text-slate-500 text-[11px] sm:text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-4 py-3 sm:px-5 sm:py-3 whitespace-nowrap">Specification Attribute</th>
                        <th className="px-4 py-3 sm:px-5 sm:py-3 whitespace-nowrap">Value / Measurement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                      {product.brakingMethod && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Braking Method</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.brakingMethod}</td>
                        </tr>
                      )}
                      {product.specifications.strokeMetric && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Stroke</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.strokeMetric}</td>
                        </tr>
                      )}
                      {product.specifications.pushrodLengthMetric && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Pushrod Length (L)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.pushrodLengthMetric}</td>
                        </tr>
                      )}
                      {product.specifications.mountingBoltSpacing && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Mounting Bolt Spacing (A)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.mountingBoltSpacing}</td>
                        </tr>
                      )}
                      {product.specifications.mountingStudThread && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Mounting Stud Thread (B)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.mountingStudThread}</td>
                        </tr>
                      )}
                      {product.specifications.mountingStudLength && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Mounting Stud Length (C)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.mountingStudLength}</td>
                        </tr>
                      )}
                      {product.specifications.clevisPinDiameter && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Clevis Pin Diameter (D)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.clevisPinDiameter}</td>
                        </tr>
                      )}
                      {product.specifications.yokeClevisGapWidth && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Yoke/Clevis Gap Width (E)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.yokeClevisGapWidth}</td>
                        </tr>
                      )}
                      {product.specifications.inletPortThreadSize && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Air Port Thread Size (M)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.inletPortThreadSize}</td>
                        </tr>
                      )}
                      {product.specifications.hydraulicPortSize && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Hydraulic Port Size (N)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.hydraulicPortSize}</td>
                        </tr>
                      )}
                      {product.specifications.sphericalRadius && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Spherical Radius (R)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.sphericalRadius}</td>
                        </tr>
                      )}
                      {product.specifications.boltCircleDiameter && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Bolt Circle Diameter (A)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.boltCircleDiameter}</td>
                        </tr>
                      )}
                      {product.specifications.flangeHoleConfiguration && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Flange Holes (B)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.flangeHoleConfiguration}</td>
                        </tr>
                      )}
                      {product.specifications.pilotDiameter && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Pilot Diameter (F)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.pilotDiameter}</td>
                        </tr>
                      )}
                      {product.specifications.flangeDimension && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Flange Dimension (C)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.flangeDimension}</td>
                        </tr>
                      )}
                      {product.specifications.bodyLength && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Body Length (L)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.bodyLength}</td>
                        </tr>
                      )}
                      {product.specifications.bodyOffset && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Body Offset (L)</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.specifications.bodyOffset}</td>
                        </tr>
                      )}
                      {/* Fallbacks for older imperial specs if metric doesn't exist */}
                      {!product.specifications.strokeMetric && product.strokeInch && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Stroke</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.strokeInch}</td>
                        </tr>
                      )}
                      {!product.specifications.pushrodLengthMetric && product.pushRodLengthInch && (
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-navy-900">Pushrod Length</td>
                          <td className="px-4 py-3 sm:px-5 sm:py-4 text-navy-700">{product.pushRodLengthInch}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {/* CTA Buttons */}
            <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-slate-100">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 text-center font-black py-4 rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center cursor-pointer ${
                  added 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20' 
                    : 'bg-amber-500 hover:bg-amber-400 text-navy-950 shadow-amber-500/20'
                }`}
              >
                {isAdding ? (
                  <span className="flex items-center"><div className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin mr-2"></div> Adding...</span>
                ) : added ? (
                  <span className="flex items-center"><Check size={18} className="mr-2" /> Added! Add Again</span>
                ) : (
                  <span className="flex items-center"><ShoppingCart size={18} className="mr-2" /> Add to Quote List</span>
                )}
              </button>
              
              <Link 
                href="/quote" 
                className="flex-1 bg-navy-900 hover:bg-navy-800 text-white text-center font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-sm border border-navy-700 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Complete RFQ Form</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </Link>
            </div>

            {/* Instant notification when item added */}
            {added && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900">
                <span className="flex items-center gap-1.5 font-bold">
                  <Check size={16} className="text-emerald-600" /> {product.name} attached! RFQ Form is now active.
                </span>
                <Link href="/quote" className="font-extrabold text-navy-900 underline hover:text-navy-950 flex items-center gap-1">
                  Go to Active RFQ Form &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Product-Specific SEO Block */}
        <ProductSeoBlock product={product} />

        {/* Product-Specific FAQ (Dynamic based on product) */}
        <section className="mt-16 mb-20 bg-slate-50 border-y sm:border border-slate-200 rounded-none sm:rounded-2xl p-5 sm:p-8 -mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-auto">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge="Product FAQs"
              title="Frequently Asked Questions"
              description={`Technical details, warranty coverage, and OEM compatibility for the ${product.name}.`}
              align="center"
              theme="light"
              accentColor="amber"
              className="!mb-8 md:!mb-10"
            />
            <GlobalFAQAccordion faqs={[
              {
                q: `What does the ${product.name} replace?`,
                a: `It is an exact aftermarket replacement for ${isChamber && product.oemPartNumbers && product.oemPartNumbers.length > 0 ? product.oemPartNumbers.map((p: any) => p.brand + ' ' + p.partNumber).join(', ') : 'major OEM brands like Bendix, Meritor, and Haldex'}.`
              },
              {
                q: `Is this ${isChamber ? product.type : 'component'} covered by warranty?`,
                a: "Yes, all BRC products are rigorously tested in our Automotive Standards facility and backed by a comprehensive industry warranty against manufacturing defects."
              }
            ]} />
          </div>
        </section>
      </div>

      <div className="bg-[#F1EFE8] py-16 md:py-20 border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1920px]">
          <TechnicalDownloads product={product} />
        </div>
      </div>

      {/* NEW CROSS REF MARQUEE */}
      <CrossReferenceMarquee />

    </>
  );
}
