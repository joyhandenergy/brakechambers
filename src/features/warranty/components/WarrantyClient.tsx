"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle, Zap, Settings, Camera, FileText, Truck, AlertTriangle, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';
import RotatingWatermark from '@/components/ui/RotatingWatermark';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

export default function WarrantyClient() {
  return (
    <div className="bg-[#F8FAFC] pb-0 font-sans">
      <PageHeader
        badge={<><ShieldCheck className="w-4 h-4 inline-block mr-1" /> Warranty & Claims</>}
        title="Brake Chamber Warranty - 1-Year Factory Guarantee"
        description="Every BRC brake chamber carries a 1-year limited factory warranty against manufacturing defects in materials and workmanship. Claims are processed within 24 hours through our online portal."
        imageSrc="/images/pageheaders/brc_warranty.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Warranty' }
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-16 relative z-30 mb-20">
        <div className="grid grid-cols-1 gap-12">

          {/* Section 1: Standard Warranty */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.div variants={fadeInUp} className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 bg-amber-50 rounded-full flex items-center justify-center relative shadow-inner">
                  <div className="absolute inset-2 border-2 border-amber-200 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
                  <ShieldCheck className="w-16 h-16 text-amber-500 relative z-10" />
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="md:w-2/3">
                <SectionHeader
                  badge="Warranty Terms"
                  title="BRC 1-Year Limited Brake Chamber Warranty"
                  description="BRC Brake Chambers (Zhejiang GAP Auto Parts Co., Ltd.) warrants that brake chambers manufactured under the BRC brand are free from defects in materials and workmanship for a period of 12 months from the date of shipment."
                  align="left"
                  theme="light"
                  accentColor="amber"
                  plainText={true}
                  className="!mb-6"
                />

              </motion.div>
            </div>
          </motion.section>

          {/* Section 1.5: Coverage Details */}
          <section className="py-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                variants={fadeInUp} 
                className="bg-white rounded-3xl shadow-md p-8 border border-emerald-100/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 z-0 pointer-events-none"></div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3"><CheckCircle className="w-6 h-6 text-emerald-500" /> Covered (Subject to Conditions)</h4>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    {[
                      "Manufacturing defects in materials",
                      "Manufacturing defects in workmanship",
                      "Diaphragm failure under normal service conditions (excluding punctures, tears, or damage from external causes)",
                      "Internal power spring failure under normal service conditions"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-slate-700 font-medium">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span className="leading-[1.6] text-[15px] font-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                className="bg-white rounded-3xl shadow-md p-8 border border-amber-100/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-4 -mt-4 z-0 pointer-events-none"></div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500" /> Conditions</h4>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    {[
                      "Warranty is extended to the original purchaser and is non-transferable.",
                      "Covered products must be installed by a qualified technician in accordance with BRC installation procedures.",
                      "Covered products must be operated within specified air system pressure ranges.",
                      "Claims must be submitted within 30 days of failure discovery.",
                      "Original invoice or proof of purchase is required."
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-slate-700 font-medium">
                        <span className="text-amber-500 font-bold mt-0.5">-</span>
                        <span className="leading-[1.6] text-[15px] font-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 2: Quality Control Grid */}
          <section className="py-16 md:py-24 relative overflow-hidden bg-slate-50 border-y border-slate-200 mt-12 mb-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <RotatingWatermark />
            <div className="relative z-10">
              <SectionHeader
              badge="Quality Verification"
              title="How BRC Verifies Every Brake Chamber Before Shipment"
              description="Every BRC brake chamber is verified before shipment under our IATF 16949-aligned quality system. These tests confirm warranty coverage applies to products built to specification."
              accentColor="amber"
              plainText={true}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {[
                { icon: Zap, title: "100% Pneumatic Leak Testing", desc: "Every unit is pressure-tested using automated equipment to detect microscopic air loss before packaging. Failing units are scrapped.", color: "emerald" },
                { icon: Settings, title: "Full Stroke Validation", desc: "Push-rods are cycled to verify spring force and return consistency across the full stroke range.", color: "amber" },
                { icon: ShieldCheck, title: "Burst Pressure Testing", desc: "Random batch sampling subjects housings to burst pressure testing above the rated operating pressure, validating structural integrity.", color: "navy" }
              ].map((test, i) => (
                <motion.div key={i} variants={scaleIn} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md hover:shadow-lg transition-shadow text-center group">
                  <div className={"w-16 h-16 mx-auto bg-" + test.color + "-50 text-" + test.color + "-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm"}>
                    <test.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-navy-900 mb-3">{test.title}</h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">{test.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-8">
              <Link href="/manufacturing/quality-assurance" className="inline-flex items-center gap-2 text-navy-600 font-bold hover:text-emerald-500 transition-colors">
                View Full Quality Assurance Process <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            </div>
          </section>
        </div>
      </div>

      {/* Section 3: Claims Process Timeline */}
      <section className="py-16 md:py-24 bg-navy-950 relative overflow-hidden border-y border-navy-800 mt-12">
        <div className="absolute inset-0 bg-[url('/images/home/quality-control.jpg')] bg-cover bg-center opacity-5"></div>
        <AnimatedGridBackground opacity={0.08} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

            <div className="relative z-10 mb-12">
              <SectionHeader
                badge="How to File a Warranty Claim"
                title="BRC Brake Chamber Warranty Claim Process"
                description="Claims are reviewed within 24 business hours of submission. Once verified, we issue replacement units or credit, according to the terms below."
                align="center"
                theme="dark"
                accentColor="amber"
                plainText={true}
                className="!mb-0"
              />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative"
            >
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-navy-800 via-amber-500/50 to-navy-800 z-0"></div>

              {[
                { icon: Camera, title: "1. Document the Failure", desc: "Photograph the failed chamber clearly, capturing the serial number and batch code stamped on the housing. Include a description of the failure and operating conditions." },
                { icon: FileText, title: "2. Submit the Claim", desc: "Submit your claim through our online portal or by contacting sales@brakechambers.com. Include photos, the original invoice number, and the quantity affected." },
                { icon: Truck, title: "3. Review & Resolution", desc: "Our QA team reviews the submitted evidence and responds within 24 business hours. Verified claims are resolved by (a) replacement units shipped with your next order, or (b) credit note applied to your account." }
              ].map((step, i) => (
                <motion.div key={i} variants={fadeInUp} className="relative z-10 text-center px-4">
                  <div className="w-24 h-24 mx-auto bg-navy-900 border border-navy-700 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-navy-950/50 group hover:border-amber-500 transition-colors">
                    <step.icon className="w-10 h-10 text-amber-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-navy-300 font-normal">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="relative z-10 mt-12 bg-navy-900/50 border border-navy-800 rounded-xl p-6 text-left max-w-3xl mx-auto">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-500" /> Claim Conditions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[14px] md:text-[15px] leading-[1.6] font-normal text-navy-200">
                {[
                  "Claims must be submitted within 30 days of discovering the failure.",
                  "Physical return of failed parts may be requested for QA analysis before credit is issued.",
                  "Replacement units ship EXW factory (standard Incoterms apply).",
                  "Labour costs are not covered under this warranty."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold mt-0.5">-</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-10 text-center">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] hover:-translate-y-1 uppercase tracking-wide text-sm">
                Contact Warranty Support <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section className="py-16 md:py-24 max-w-4xl mx-auto w-full px-4 sm:px-6">
            <SectionHeader
              title="Brake Chamber Warranty FAQs"
              description="Common questions from distributors and fleet operators about BRC brake chamber warranty coverage."
              align="center"
              accentColor="amber"
              plainText={true}
            />

            <div className="mt-8">
              <GlobalFAQAccordion faqs={[
                {
                  q: "What voids the standard warranty?",
                  a: "The BRC warranty is void if: (a) the chamber was installed incorrectly or by an unqualified technician; (b) the chamber was operated outside specified air pressure ranges; (c) the chamber was modified, disassembled, or repaired by anyone other than BRC; (d) the failure resulted from accident, misuse, or external physical damage; (e) the chamber was installed on a vehicle for which it was not specified."
                },
                {
                  q: "Do I need to return the defective chambers?",
                  a: "Not in all cases. For clear manufacturing defects documented by photo, we typically issue credit or replacement without requiring physical return. For failures requiring QA analysis (unusual failure modes, disputed claims, or batch-level concerns), we may request the failed part be returned for engineering review. Return shipping in these cases is paid by the buyer, unless the claim is confirmed as a manufacturing defect."
                },
                {
                  q: "Does the warranty cover labor costs?",
                  a: "No. The BRC warranty covers replacement of the defective brake chamber itself. It does not cover labor, downtime, towing, or any incidental or consequential costs associated with replacing a covered chamber. This is standard in the commercial vehicle parts industry."
                },
                {
                  q: "How long is the warranty period?",
                  a: "12 months from the date of shipment. The warranty is non-transferable and applies only to the original purchaser."
                },
                {
                  q: "Does the warranty cover normal wear and tear?",
                  a: "No. Wear-and-tear items like diaphragms (from normal operational cycling) and push-rod seals are not covered beyond their normal service life. Warranty coverage is limited to manufacturing defects in materials and workmanship."
                },
                {
                  q: "How do I file a warranty claim?",
                  a: "Submit your claim through our online portal or by contacting sales@brakechambers.com. Include photographs, invoice number, batch code, and a description of the failure. Claims are reviewed within 24 business hours."
                }
              ]} />
            </div>
        </section>

      {/* SECTION 7: BOTTOM CTA */}
      <section className="py-16 md:py-24 bg-[#F1EFE8] relative overflow-hidden mt-10">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] z-0 pointer-events-none"></div>

            <div className="relative z-10 flex-1 max-w-2xl text-center md:text-left">
              <SectionHeader
                badge="File a Claim"
                title={<>Need to File a Brake Chamber <span className="text-amber-400">Warranty Claim?</span></>}
                description="Submit your claim with photos of the failed chamber, the batch code, and the original invoice number. Our team responds within 24 business hours."
                align="left"
                theme="dark"
                accentColor="amber"
                className="!mb-0"
                plainText={true}
              />
            </div>

            <div className="relative z-10 flex flex-col w-full md:w-auto gap-4 min-w-[240px] shrink-0 mt-8 md:mt-0">
              <Link
                href="/contact"
                className="bg-amber-500 text-navy-950 font-black py-4 px-8 rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 text-center uppercase tracking-widest text-[13px] transform hover:-translate-y-1"
              >
                Contact Warranty Support <ArrowRight className="inline-block w-4 h-4 ml-2 -mt-1" />
              </Link>
              <Link
                href="/manufacturing/quality-assurance"
                className="bg-navy-800 text-white border border-navy-600 font-black py-4 px-8 rounded-xl hover:bg-navy-700 hover:border-navy-500 transition-all text-center uppercase tracking-widest text-[13px] transform hover:-translate-y-1"
              >
                View Quality Assurance
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
