"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRightLeft, ArrowRight, ShieldCheck, Zap, Wrench, Ruler, Database, FileText, BookOpen, CheckCircle2, MonitorCheck, FileDigit, Factory } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import OEMSearchForm from '@/features/oem/components/OEMSearchForm';
import { BRAKE_CHAMBERS } from '@/lib/data';

import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import RotatingWatermark from '@/components/ui/RotatingWatermark';

export default function OEMCrossReferenceClient() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-clip">
      {/* Hero Section */}
      <PageHeader
        badge="Cross-Reference Tool"
        badgeIcon={ArrowRightLeft}
        title="OEM Brake Chamber Cross-Reference: Find Direct Replacements"
        description="Search by Bendix, Haldex, Meritor, Knorr-Bremse, WABCO, SORL, or MGM part number and get the exact BRC equivalent in seconds. Every match is verified for fit, form, and function."
        imageSrc="/images/pageheaders/brc_crossreference.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'OEM Cross-Reference' }
        ]}
      />

      {/* Main Search Interface */}
      <section id="search-tool" className="scroll-mt-32 lg:scroll-mt-40 relative z-20 -mt-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-16 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <OEMSearchForm products={BRAKE_CHAMBERS} />
        </motion.div>
      </section>

      {/* NEW: SECTION 3 — HOW IT WORKS */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-50"></div>
        
        {/* Prominent Rotating Brake Chamber Background (Watermark) */}
        <RotatingWatermark 
          sizeClass="w-[400px] h-[400px] lg:w-[700px] lg:h-[700px]" 
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SectionHeader
            badge="How It Works"
            title="How the BRC Brake Chamber Cross-Reference Works"
            description="Find the exact BRC replacement for any OEM brake chamber in three simple steps."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12 lg:mt-16 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-2xl mb-6 shadow-sm border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">1</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Enter OEM Part Number</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">Type in your Bendix, Haldex, Meritor, WABCO, Knorr-Bremse, SORL, TSE, or MGM part number.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-2xl mb-6 shadow-sm border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">2</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Get Verified Equivalent</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">Our database returns the matching BRC brake chamber, confirmed for fit, form, and function.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-2xl mb-6 shadow-sm border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">3</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Order Direct</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">Request pricing or place a container order — shipped direct from our IATF 16949 compliant factory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — BRAND LIBRARY */}
      <section className="pt-16 pb-24 relative overflow-hidden bg-blue-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col items-center mb-12 gap-6 text-center max-w-4xl mx-auto">
            <div className="max-w-3xl">
              <SectionHeader
                badge="Component Library"
                title="Browse Brake Chamber Replacements by OEM Brand"
                description="Select your OEM brand or vehicle manufacturer to find guaranteed compatible BRC aftermarket brake chambers. Every brand page includes part numbers, dimensional data, and verified interchange matches."
                align="center"
                className="!mb-0 mx-auto"
              />
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 max-w-7xl mx-auto"
          >
            {[
              { name: 'Bendix', path: 'bendix', color: 'amber', region: 'North America', desc: 'View Bendix brake chamber replacements' },
              { name: 'Meritor', path: 'meritor', color: 'amber', region: 'North America', desc: 'View Meritor brake chamber replacements' },
              { name: 'Haldex', path: 'haldex', color: 'amber', region: 'North America', desc: 'View Haldex brake chamber replacements' },
              { name: 'MGM', path: 'mgm', color: 'amber', region: 'North America', desc: 'View MGM brake chamber replacements' },
              { name: 'TSE', path: 'tse', color: 'amber', region: 'North America', desc: 'View TSE brake chamber replacements' },
              { name: 'ZF / WABCO', path: 'zf-wabco', color: 'navy', region: 'Europe / Global', desc: 'View ZF/WABCO brake chamber replacements' },
              { name: 'Knorr-Bremse', path: 'knorr-bremse', color: 'navy', region: 'Europe / Global', desc: 'View Knorr-Bremse replacements' },
              { name: 'SORL', path: 'sorl', color: 'navy', region: 'Europe / Global', desc: 'View SORL brake chamber replacements' }
            ].map((brand) => (
              <motion.div key={brand.name} variants={fadeInUp}>
                <Link 
                  href={`/oem-cross-reference/${brand.path}`} 
                  className={`bg-white rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[2rem] p-4 sm:p-6 lg:p-8 border border-slate-100 shadow-xl hover:shadow-2xl hover:border-${brand.color}-200 hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-300 group flex flex-col relative overflow-hidden h-full`}
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-${brand.color}-50 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 z-0`}></div>
                  <div className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-${brand.color}-100 rounded-lg lg:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <ShieldCheck className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-${brand.color}-600`} />
                  </div>
                  <h3 className={`relative z-10 text-base sm:text-lg lg:text-xl font-extrabold text-navy-900 mb-1 lg:mb-2 group-hover:text-${brand.color}-600 transition-colors leading-tight`}>{brand.name}</h3>
                  <p className="relative z-10 text-slate-500 text-[10px] sm:text-xs lg:text-sm font-medium mb-1 flex-grow leading-tight">{brand.region}</p>
                  <p className="relative z-10 text-slate-400 text-[10px] sm:text-[11px] mb-4 sm:mb-6 lg:mb-8 flex-grow leading-tight hidden sm:block">{brand.desc}</p>
                  
                  <span className={`relative z-10 text-${brand.color}-600 font-extrabold text-[9px] sm:text-[11px] lg:text-[13px] uppercase tracking-widest flex items-center mt-auto`}>
                    View Parts <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 ml-1 sm:ml-1.5 lg:ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — WHY FLEET MANAGERS USE BRC */}
      <section className="py-16 md:py-24 bg-navy-950 border-y border-navy-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5"></div>
        <AnimatedGridBackground opacity={0.08} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Imagery */}
            <div className="w-full lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <img src="/images/home/service-brakes-bg.jpg" alt="Commercial Brake Chamber Axle Testing" className="rounded-2xl shadow-lg w-full h-40 sm:h-48 object-cover transition-all duration-500" />
                  <img src="/images/home/brc_quality_factory_worker.jpg" alt="Factory Brake Chamber Assembly & Quality Control" className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover object-top transition-all duration-500" />
                </div>
                <div className="pt-8">
                  <img src="/images/brc7.jpg" alt="Commercial Truck Brake Chamber Production Line" className="rounded-2xl shadow-lg w-full h-64 sm:h-80 object-cover object-center bg-slate-100 transition-all duration-500" />
                </div>
              </motion.div>
            </div>
            
            {/* Content */}
            <div className="w-full lg:w-1/2">
              <SectionHeader
                badge="Interchange Engineering Protocol"
                title={<>Axle-Matched Crossover <span className="text-amber-500">Pneumatic & Geometric Parity</span></>}
                description="Cross-referencing commercial brake chambers is more than cross-referencing part numbers — it is preserving factory axle timing and CVSA road compliance. A mismatch of 0.2 seconds in release rate or 5 mm in stroke travel causes cross-axle brake pull and premature lining wear."
                align="center"
                theme="dark"
              />
              <ul className="space-y-6">
                <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-200 text-sm md:text-base leading-relaxed"><strong className="text-white">Precision Metrology & Push-Rod Alignment:</strong> Every BRC crossover maintains exact 120.7 mm (4.75") stud centers, cold-rolled 5/8"-18 UNF threads, and ±0.05 mm clevis pin tolerances — seating directly into automatic slack adjusters at a true 90° angle with zero cutting or bracket bending.</span>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-200 text-sm md:text-base leading-relaxed"><strong className="text-white">Robotic 360° Crimping & Hydrostatic Leak Verification:</strong> Dual-diaphragm chambers are sealed in automated robotic cells under calibrated hydraulic clamping force. Every batch passes 150 PSI hydrostatic burst tests and sub-zero pneumatic cycle audits, preventing chamber separation and air loss.</span>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-4">
                  <Wrench className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-200 text-sm md:text-base leading-relaxed"><strong className="text-white">FMVSS 121 & SAE J1461 Dynamic Output Parity:</strong> High-tensile power springs and multi-ply natural rubber diaphragms deliver identical force-deflection curves under 90–120 PSI. Axles stroke and exhaust in unison, eliminating brake pull and guaranteeing full CVSA roadside inspection compliance.</span>
                </motion.li>
              </ul>
            </div>
          </div>

          {/* SECTION 6 — ACTION CARDS */}
          <div className="mt-16 lg:mt-24 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Tool 1 */}
              <Link href="/technical-resources/identification" className="bg-white rounded-[2rem] p-6 lg:p-10 border border-slate-100 shadow-xl hover:shadow-2xl hover:border-amber-200 hover:-translate-y-2 transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 z-0"></div>
                <div className="relative z-10 w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Ruler className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="relative z-10 text-2xl font-extrabold text-navy-900 mb-4 group-hover:text-amber-600 transition-colors">Visual Sizing & ID Guide</h3>
                <p className="relative z-10 text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal mb-8 flex-grow">Identify chamber size and stroke type without an OEM part number. Step-by-step procedures for measuring clamp band circumference, checking port bosses, and reading trapezoidal tags.</p>
                <span className="relative z-10 text-amber-600 font-extrabold text-[13px] uppercase tracking-widest flex items-center mt-auto">
                  View Visual ID Guide <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Tool 2 (Dark Theme) */}
              <Link href="/oem-cross-reference/database" className="bg-gradient-to-b from-navy-800 to-navy-900 border border-navy-700 p-6 lg:p-10 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 shadow-xl shadow-navy-900/10 group flex flex-col relative overflow-hidden transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-navy-700/40 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 z-0"></div>
                
                <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center mb-8 shadow-inner border border-navy-700 group-hover:border-emerald-500/50 transition-colors">
                  <Database className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="relative z-10 text-2xl font-extrabold text-white mb-4 group-hover:text-emerald-400 transition-colors">Master Interchange Database</h3>
                <p className="relative z-10 text-[14px] md:text-[15px] leading-[1.6] text-navy-300 font-normal mb-8 flex-grow">Access our verified cross-reference table mapping major OEM part numbers (Bendix, Haldex, Meritor, Wabco) to direct BRC equivalents, with instant search and CSV export.</p>
                <span className="relative z-10 text-emerald-400 font-extrabold text-[13px] uppercase tracking-widest flex items-center mt-auto group-hover:text-emerald-300 transition-colors">
                  Open Master Database <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </span>
              </Link>

              {/* Tool 3 */}
              <Link href="/oem-cross-reference/request" className="bg-white rounded-[2rem] p-6 lg:p-10 border border-slate-100 shadow-xl hover:shadow-2xl hover:border-navy-200 hover:-translate-y-2 transition-all duration-300 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-navy-50 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 z-0"></div>
                <div className="relative z-10 w-14 h-14 bg-navy-100 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-navy-600" />
                </div>
                <h3 className="relative z-10 text-2xl font-extrabold text-navy-900 mb-4 group-hover:text-navy-600 transition-colors">Request Custom Cross-Match</h3>
                <p className="relative z-10 text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal mb-8 flex-grow">Have a worn tag, discontinued part, or specialized chamber? Submit your dimensions, photos, or vehicle specs to our engineering desk for 24-hour verification.</p>
                <span className="relative z-10 text-navy-600 font-extrabold text-[13px] uppercase tracking-widest flex items-center mt-auto">
                  Submit Match Request <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQ */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        {/* Premium Fixed Parallax Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[url('/productsImage/brc-t3030-mgm-spring-brake-7-v2.jpg')] bg-fixed bg-center bg-no-repeat bg-[length:800px_800px] mix-blend-multiply "></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <SectionHeader
            title="Brake Chamber Cross-Reference FAQs"
            description="Answers to the most common questions about our OEM cross-reference database, verified matches, and aftermarket brake chamber fitment."
            accentColor="amber"
          />
          <div className="mt-8">
            <GlobalFAQAccordion faqs={[
              { q: "Will using an aftermarket brake chamber void my vehicle's warranty?", a: "No. In most jurisdictions — including the United States (Magnuson-Moss Warranty Act), the European Union, and Australia — using an aftermarket replacement part does not void a vehicle's warranty, as long as the part meets or exceeds OEM specifications. BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 (North America) and ECE R13 (Europe)." },
              { q: "How accurate is the BRC cross-reference database?", a: "Every cross-reference in our database is validated against the original manufacturer catalog by our in-house engineering team. If our database says a BRC chamber matches a specific OEM part number, it will fit, form, and function identically. We update the database weekly with new OEM part numbers." },
              { q: "Do BRC brake chambers meet the same safety standards as OEM?", a: "Yes. BRC brake chambers are manufactured in an IATF 16949 compliant facility and tested to FMVSS-121 (North America) and ECE R13 (Europe) standards. Every chamber undergoes pressure testing and stroke testing before shipment. Our chambers are direct replacements for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO." },
              { q: "How do I identify my current brake chamber type?", a: "Check the chamber's ID tag or stamped markings. Most commercial brake chambers include a type number (e.g., Type 30/30, Type 20/24) and a manufacturer part number. If you can't find these, our Visual ID Guide walks you through measuring the chamber body, stroke, and mounting type to identify it." },
              { q: "How does BRC ensure an aftermarket chamber matches original axle dynamics?", a: "Every crossover entry is validated against manufacturer technical prints — matching exact 120.7 mm mounting stud spacing, 5/8\"-18 UNF push-rod thread pitch, and port clocking degrees. Furthermore, chambers are calibrated to SAE J1461 and FMVSS 121 standards to deliver identical stroke output curves and release timing, preventing cross-axle brake pull and premature lining wear." },
              { q: "Can I search by brand and part number at the same time?", a: "Yes. Our interchange search accepts either a raw OEM part number (e.g., 5009011) or a brand-prefixed format (e.g., Bendix 5009011). The database will return the matching BRC equivalent in seconds." },
              { q: "How quickly can I get a sample of a cross-referenced part?", a: "Sample orders ship directly from our factory in Zhejiang, China. Most cross-referenced samples are dispatched within 5–7 business days. Express shipping (DHL, FedEx, UPS) is available for urgent evaluation." }
            ]} />
          </div>
        </div>
      </section>



            {/* SECTION 9 — CUSTOM CROSS-REFERENCE CTA */}
      <div className="py-16 md:py-24 bg-[#F1EFE8] relative overflow-hidden border-b border-slate-200">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Internal Card Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0"></div>

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <SectionHeader
                badge="Engineering Support"
                title="Need a Custom Brake Chamber Cross-Reference?"
                description={<>If you have a specialized, discontinued, or legacy OEM part number not found in our database, our engineering team will reverse-engineer the match and return a verified BRC equivalent within 24 hours. Every crossover is backed by our factory dimensional verification protocol.</>}
                align="left"
                theme="dark"
                accentColor="amber"
                className="!mb-0"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto shrink-0">
              <Link href="/contact" className="inline-block w-full bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-center px-6 sm:px-10 py-4 sm:py-5 rounded-xl uppercase tracking-widest text-[13px] sm:text-[14px] transition-all duration-300 shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 whitespace-normal sm:whitespace-nowrap leading-tight sm:leading-normal">
                Request a Custom Cross-Match
              </Link>
              <button onClick={() => { document.getElementById('search-tool')?.scrollIntoView({ behavior: 'smooth' }) }} className="inline-block w-full bg-navy-800/60 hover:bg-navy-800 border border-navy-600 hover:border-amber-500 text-white font-black text-center px-6 sm:px-10 py-4 sm:py-5 rounded-xl uppercase tracking-widest text-[13px] sm:text-[14px] transition-all duration-300 shadow-xl transform hover:-translate-y-1 whitespace-normal sm:whitespace-nowrap leading-tight sm:leading-normal">
                Search the Full Database
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 10 — RELATED RESOURCES */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            badge="Related Resources"
            title="Brake Chamber Technical & Reference Resources"
            description="Everything you need to spec, install, and maintain commercial brake chambers."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {[
              { title: "Brake Chamber Visual ID Guide", icon: Ruler },
              { title: "Brake Chamber Size Chart", icon: FileDigit },
              { title: "Brake Chamber Installation Guide", icon: BookOpen },
              { title: "Brake Chamber Torque Specs", icon: Wrench }
            ].map((res, i) => (
              <Link key={i} href="/technical-resources" className="bg-white border border-slate-100 shadow-xl rounded-2xl p-8 flex flex-col items-start hover:border-amber-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                {/* Subtle gradient hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col h-full w-full">
                  <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mb-6 group-hover:bg-amber-500 transition-colors duration-300 shadow-sm">
                    <res.icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="font-extrabold text-navy-900 text-lg md:text-xl leading-snug mb-6 flex-1">
                    {res.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 w-full">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center group-hover:text-amber-600 transition-colors">
                      View Resource <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
