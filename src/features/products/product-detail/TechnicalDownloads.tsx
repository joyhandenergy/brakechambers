"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, ShieldCheck, ExternalLink, Printer, X, CheckCircle2, 
  Wrench, Layers
} from 'lucide-react';
import { BrakeChamber, BrakeAccessory } from '@/types';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

interface TechnicalDownloadsProps {
  product?: BrakeChamber | BrakeAccessory;
  productName?: string;
}

export default function TechnicalDownloads({ product, productName }: TechnicalDownloadsProps) {
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);

  const title = product?.name || productName || 'Brake Chamber';
  const isChamber = product && 'type' in product;
  const chamber = isChamber ? (product as BrakeChamber) : null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const downloads = [
    {
      title: `${title} Specification Sheet`,
      type: 'PDF Datasheet',
      size: 'Printable',
      actionType: 'spec',
      icon: <FileText className="w-6 h-6 text-red-500" />,
      cornerIcon: <Printer className="w-4 h-4" />,
      actionText: 'View & Print'
    },
    {
      title: "Installation & Maintenance Manual",
      type: 'Technical Guide',
      size: 'Torque Specs',
      href: '/technical-resources',
      actionType: 'link',
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      cornerIcon: <ExternalLink className="w-4 h-4" />,
      actionText: 'View Guide'
    },
    {
      title: "FMVSS-121 & SAE Testing Standards",
      type: 'Quality Protocol',
      size: 'Lab Verified',
      href: '/manufacturing/quality-assurance',
      actionType: 'link',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      cornerIcon: <ExternalLink className="w-4 h-4" />,
      actionText: 'View Lab Testing'
    },
    {
      title: "OEM Cross-Reference & Interchange Chart",
      type: 'Interchange',
      size: 'Direct Fit',
      href: '/oem-cross-reference',
      actionType: 'link',
      icon: <Layers className="w-6 h-6 text-navy-600" />,
      cornerIcon: <ExternalLink className="w-4 h-4" />,
      actionText: 'Lookup Numbers'
    }
  ];

  return (
    <section>
      <SectionHeader
        title="Downloads & Documentation"
        description="Official factory technical datasheets, engineering standards, and maintenance guides."
        align="left"
        theme="light"
        accentColor="amber"
        plainText={true}
        className="!mb-8"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {downloads.map((doc, idx) => {
          if (doc.actionType === 'link' && doc.href) {
            return (
              <Link key={idx} href={doc.href} className="block group">
                <Card 
                  padding="md" 
                  hoverEffect="lift" 
                  glowColor="amber" 
                  className="h-full flex items-start gap-4 border-slate-200 group-hover:border-amber-400 bg-white transition-all"
                >
                  <div className="flex-shrink-0 mt-1">
                    {doc.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-navy-900 text-sm mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                      <span>{doc.type}</span>
                      <span>&bull;</span>
                      <span>{doc.size}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-amber-600 transition-all">
                    {doc.cornerIcon}
                  </div>
                </Card>
              </Link>
            );
          }

          return (
            <div 
              key={idx} 
              onClick={() => setIsSpecModalOpen(true)} 
              className="block group cursor-pointer"
            >
              <Card 
                padding="md" 
                hoverEffect="lift" 
                glowColor="amber" 
                className="h-full flex items-start gap-4 border-slate-200 group-hover:border-amber-400 bg-white transition-all"
              >
                <div className="flex-shrink-0 mt-1">
                  {doc.icon}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-navy-900 text-sm mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <span>{doc.type}</span>
                    <span>&bull;</span>
                    <span>{doc.size}</span>
                  </p>
                </div>
                <div className="flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-amber-600 transition-all">
                  {doc.cornerIcon}
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* BRANDED SPECIFICATION SHEET MODAL (PRINT/PDF READY) */}
      {isSpecModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto printable-container">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full my-auto shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[90vh] printable-document">
            
            {/* Modal Top Action Bar (Matching Website Navy & Amber Header) */}
            <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white px-5 sm:px-8 py-3.5 flex items-center justify-between border-b border-navy-700 no-print">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <FileText className="w-4 h-4" /> BRC Technical Datasheet
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-wider transition-all shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
                <button
                  onClick={() => setIsSpecModalOpen(false)}
                  className="text-navy-300 hover:text-white p-1 rounded-lg hover:bg-navy-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-800 modal-scroll">
              
              {/* Document Header with Logo and Brand Colors */}
              <div className="border-b-2 border-amber-500 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-navy-900 border border-navy-700 flex items-center justify-center shadow-md flex-shrink-0">
                    <img src="/images/logo-brc.png" alt="BRC" className="h-6 w-auto object-contain brightness-0 invert" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-navy-950 tracking-tight leading-none">BRC BRAKE CHAMBERS</h2>
                    <p className="text-[11px] font-bold text-amber-600 uppercase tracking-widest mt-1">
                      Heavy-Duty Factory Sales & Engineering
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right text-[11px] text-slate-500 font-medium">
                  <div>Document ID: <strong className="text-navy-900">DOC-BRC-{product?.slug?.toUpperCase() || 'SPEC'}</strong></div>
                  <div>Standard: <strong className="text-emerald-700">IATF 16949 / FMVSS-121</strong></div>
                </div>
              </div>

              {/* Product Header */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  {chamber?.type || 'Heavy-Duty Actuator'} &bull; {chamber?.strokeSize || 'Standard'} Stroke
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 mt-2 tracking-tight">
                  {title}
                </h3>
              </div>

              {/* Side-by-side Images: Product + Technical Drawing */}
              {product?.galleryUrls && product.galleryUrls.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F0F7FE]/60 p-4 rounded-2xl border border-[#E0EEFD]">
                  <div className="relative aspect-video sm:aspect-square bg-white rounded-xl overflow-hidden border border-[#E0EEFD] p-2 flex items-center justify-center">
                    <img 
                      src={product.galleryUrls[0]} 
                      alt={title} 
                      className="max-h-full max-w-full object-contain"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-navy-900/85 text-white px-2 py-0.5 rounded no-print">
                      Product Unit
                    </span>
                  </div>
                  {product.galleryUrls[1] ? (
                    <div className="relative aspect-video sm:aspect-square bg-white rounded-xl overflow-hidden border border-[#E0EEFD] p-2 flex items-center justify-center">
                      <img 
                        src={product.galleryUrls[1]} 
                        alt={`${title} Technical Schematic Drawing`} 
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-navy-900/85 text-white px-2 py-0.5 rounded no-print">
                        2D CAD Schematic
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500 bg-white rounded-xl border border-[#E0EEFD]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-2" />
                      <p className="text-xs font-bold text-navy-900">Direct Factory Fitment</p>
                      <p className="text-[11px] text-slate-500 mt-1">Conforms to standard commercial chassis mounting brackets.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Technical Specifications Matrix (Matching Brand Design System) */}
              {chamber?.specifications && (
                <div className="border border-[#E0EEFD] rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-[#F0F7FE] border-b border-[#E0EEFD] px-4 py-3 flex items-center justify-between">
                    <h3 className="font-extrabold text-navy-900 text-xs uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs"></span>
                      Engineering Parameters
                    </h3>
                    <span className="text-[11px] text-navy-700 font-bold">Standard Factory Tolerance</span>
                  </div>
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-[#E0EEFD]/60">
                      {chamber.specifications.strokeMetric && (
                        <tr className="hover:bg-[#F0F7FE]/40 transition-colors bg-white">
                          <td className="px-4 py-2.5 font-bold text-navy-900 w-1/2">Stroke Travel (S)</td>
                          <td className="px-4 py-2.5 text-navy-800 font-medium">{chamber.specifications.strokeMetric} {chamber.strokeInch ? `(${chamber.strokeInch})` : ''}</td>
                        </tr>
                      )}
                      {chamber.specifications.pushrodLengthMetric && (
                        <tr className="hover:bg-[#F0F7FE]/40 transition-colors bg-[#F0F7FE]/20">
                          <td className="px-4 py-2.5 font-bold text-navy-900">Pushrod Length (L)</td>
                          <td className="px-4 py-2.5 text-navy-800 font-medium">{chamber.specifications.pushrodLengthMetric} {chamber.pushRodLengthInch ? `(${chamber.pushRodLengthInch})` : ''}</td>
                        </tr>
                      )}
                      {chamber.specifications.mountingBoltSpacing && (
                        <tr className="hover:bg-[#F0F7FE]/40 transition-colors bg-white">
                          <td className="px-4 py-2.5 font-bold text-navy-900">Mounting Stud Centers (A)</td>
                          <td className="px-4 py-2.5 text-navy-800 font-medium">{chamber.specifications.mountingBoltSpacing}</td>
                        </tr>
                      )}
                      {chamber.specifications.mountingStudThread && (
                        <tr className="hover:bg-[#F0F7FE]/40 transition-colors bg-[#F0F7FE]/20">
                          <td className="px-4 py-2.5 font-bold text-navy-900">Mounting Stud Thread (B)</td>
                          <td className="px-4 py-2.5 text-navy-800 font-medium">{chamber.specifications.mountingStudThread}</td>
                        </tr>
                      )}
                      {chamber.specifications.inletPortThreadSize && (
                        <tr className="hover:bg-[#F0F7FE]/40 transition-colors bg-white">
                          <td className="px-4 py-2.5 font-bold text-navy-900">Air Port Thread Size (M)</td>
                          <td className="px-4 py-2.5 text-navy-800 font-medium">{chamber.specifications.inletPortThreadSize}</td>
                        </tr>
                      )}
                      {chamber.specifications.clevisPinDiameter && (
                        <tr className="hover:bg-[#F0F7FE]/40 transition-colors bg-[#F0F7FE]/20">
                          <td className="px-4 py-2.5 font-bold text-navy-900">Clevis Pin Hole (D)</td>
                          <td className="px-4 py-2.5 text-navy-800 font-medium">{chamber.specifications.clevisPinDiameter}</td>
                        </tr>
                      )}
                      {chamber.specifications.maxOperatingPressure && (
                        <tr className="hover:bg-[#F0F7FE]/40 transition-colors bg-white">
                          <td className="px-4 py-2.5 font-bold text-navy-900">Max Operating Pressure</td>
                          <td className="px-4 py-2.5 text-navy-800 font-medium">{chamber.specifications.maxOperatingPressure} (Burst Tested 600+ PSI)</td>
                        </tr>
                      )}
                      {chamber.specifications.weight && (
                        <tr className="hover:bg-[#F0F7FE]/40 transition-colors bg-[#F0F7FE]/20">
                          <td className="px-4 py-2.5 font-bold text-navy-900">Net Unit Weight</td>
                          <td className="px-4 py-2.5 text-navy-800 font-medium">{chamber.specifications.weight}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Direct OEM Cross Reference List */}
              {chamber?.oemPartNumbers && chamber.oemPartNumbers.length > 0 && (
                <div className="border border-[#E0EEFD] rounded-xl p-4 bg-[#F0F7FE]/60 text-xs">
                  <h4 className="font-bold text-navy-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Verified OEM Interchange Part Numbers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {chamber.oemPartNumbers.map((oem, idx) => (
                      <span key={idx} className="bg-white border border-[#E0EEFD] px-2.5 py-1 rounded-md text-slate-700 font-medium shadow-xs">
                        <strong className="text-navy-900 font-bold">{oem.brand}:</strong> {oem.partNumber}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Factory Footer */}
              <div className="pt-4 border-t border-[#E0EEFD] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 gap-2">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-navy-950">BRC Brake Chambers</span>
                  <span>&bull;</span>
                  <a href="mailto:sales@brakechambers.com" className="text-navy-700 hover:text-amber-600 transition-colors">sales@brakechambers.com</a>
                </div>
                <div className="font-bold">
                  <a href="https://www.brakechambers.com" target="_blank" rel="noopener noreferrer" className="text-navy-900 hover:text-amber-600 transition-colors">www.brakechambers.com</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}


