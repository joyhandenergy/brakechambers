"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PenTool, Microscope, Factory, ShieldCheck, CheckCircle2, Settings, Lock, Users, FileText, Cog, Package, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import IconBox from '@/components/ui/IconBox';

export default function CustomOemClient() {

  const phases = [
    {
      phase: '01',
      title: 'CAD Concept & Design Review',
      description: 'Send us your CAD files, engineering drawings, or a physical sample. Our team analyzes the design for manufacturability, identifies cost-reduction opportunities, and proposes material and geometry optimizations, all before any tooling investment is made.',
      icon: <PenTool />,
      features: [
        '3D Modeling & Stress Analysis: Your design is modeled in CAD and stress-tested through FEA.', 
        'Material Selection Consultation: Engineering team recommends optimal steel grade, rubber compound, or aluminum alloy.', 
        'DFM (Design for Manufacturing) Audits: Design reviewed against our production capability before tooling is cut.', 
        'Cost Engineering & Value Analysis: Cost-reduction opportunities identified without compromising performance.'
      ],
      image: '/images/manufacturing/brc_brakechamber_design_review.jpg',
    },
    {
      phase: '02',
      title: 'Rapid Prototyping & Validation',
      description: 'Before committing to production tooling, BRC creates functional prototypes using rapid 3D printing and low-volume CNC machining. Prototypes undergo pneumatic testing, dimensional verification, and performance benchmarking against your specifications.',
      icon: <Microscope />,
      features: [
        'Functional Metal Prototypes in 7 Days: In-house CNC machining center produces working samples for bench validation.', 
        'Pneumatic & Burst Pressure Testing: Prototypes tested to the same standards as our catalog chambers.', 
        'Iterative Design Refinement: Every test result feeds back into the CAD model.', 
        'Customer Sign-Off Before Tooling: No volume tooling is committed until you approve the prototype.'
      ],
      image: '/images/manufacturing/brc_brakechamber_cnc_machine.jpg',
    },
    {
      phase: '03',
      title: 'Tooling Development & Production Launch',
      description: 'Once prototypes are approved, BRC develops custom aluminum die-casting molds and stamping dies in-house. Your dedicated engineering team coordinates tooling approval, first-article inspection, and production ramp-up with defined sign-off points before each stage.',
      icon: <Factory />,
      features: [
        'Custom Aluminum Die-Casting Molds: In-house mold development for your specific housing geometry.', 
        'First-Article Inspection: Initial production units measured against your specification before full ramp-up.', 
        'Defined Sign-Off Points: You approve each stage before we advance to the next.', 
        'Scale-Up Coordination: Production scaling from pilot runs to full program volumes coordinated by your dedicated account manager.'
      ],
      image: '/images/manufacturing/brc_brakechamber_diecasting_machine.jpg',
      linkText: 'View High-Volume Orders →',
      linkHref: '/manufacturing/high-volume-orders'
    },
  ];

  const stats = [
    { value: '50+', label: 'Custom OEM Programs', icon: Handshake },
    { value: '7 Days', label: 'To First Prototype', icon: Cog },
    { value: '100%', label: 'IP Protection', icon: Lock },
    { value: 'In-House', label: 'Tooling & Dies', icon: Factory },
  ];

  return (
    <article className="min-h-screen bg-white font-sans overflow-x-clip">
      <PageHeader
        badge="Custom Engineering"
        title="Custom OEM Brake Chamber Manufacturing"
        description="BRC develops and manufactures custom brake chambers to buyer specifications, from initial CAD design to prototype validation and volume production. Bring your drawings, part numbers, or physical samples, and our engineering team will reverse-engineer or improve them at scale."
        imageSrc="/images/brc_brakechamber_aftermarket.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Manufacturing', href: '/manufacturing' },
          { label: 'Custom OEM Manufacturing' }
        ]}
      />

      {/* Light Value Proposition (Section Blue) */}
      <section className="py-12 md:py-16 bg-blue-50 relative overflow-hidden border-b border-blue-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <SectionHeader
            title={<>Your Design. <span className="text-amber-500">Our Factory.</span></>}
            description="You don't need to build a factory in China to get factory-direct margins. Partner with BRC to engineer, test, and mass-produce your proprietary brake chamber designs at scale, while we handle manufacturing, testing, and logistics."
            align="center"
            theme="light"
            accentColor="amber"
            plainText={true}
            className="!mb-10"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <Lock className="w-5 h-5 text-emerald-500" />, text: '100% IP Protection' },
              { icon: <Settings className="w-5 h-5 text-amber-500" />, text: 'In-House Tooling' },
              { icon: <FileText className="w-5 h-5 text-emerald-500" />, text: 'NDA Before Review' },
            ].map((badge, idx) => (
              <div key={idx} className="bg-white border border-slate-200 px-5 py-3 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                {badge.icon}
                <span className="text-navy-900 text-sm font-bold">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-blue-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-navy-900 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-navy-800 shadow-xl shadow-navy-900/10 hover:shadow-2xl hover:bg-navy-800 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                
                {/* The Top Right Circle Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-navy-800/30 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 text-amber-400 flex items-center justify-center mb-4 md:mb-6 shadow-inner border border-navy-700 group-hover:border-amber-500/50 transition-colors duration-300">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Phase Development Process — Alternating Layout */}
      <section className="py-12 md:py-16 bg-[#F1EFE8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
          <div className="flex flex-col items-center mb-16">
            <SectionHeader
              badge="Development Process"
              title="Our Custom OEM Development Process"
              description="Every custom brake chamber program follows a controlled development process: design review, rapid prototyping, tooling, and volume production. Each phase has defined deliverables and sign-off points."
              accentColor="amber"
              className="!mb-6"
            />
            <Link href="/manufacturing/quality-assurance" className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700 transition-colors">
              See how we test custom prototypes <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="space-y-16 md:space-y-12">
            {phases.map((phase, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {React.cloneElement(phase.icon as React.ReactElement<any>, { className: `w-7 h-7 md:w-8 md:h-8 ${isEven ? 'text-amber-500' : 'text-navy-500'}` })}
                      </div>
                      <span className="text-slate-400 font-black text-5xl md:text-6xl tracking-tighter opacity-20">
                        {phase.phase}
                      </span>
                    </div>
                    <h3 className={`text-xl md:text-2xl lg:text-3xl font-black text-navy-900 mb-4 tracking-tight leading-tight transition-colors ${isEven ? 'group-hover:text-amber-600' : 'group-hover:text-navy-600'}`}>{phase.title}</h3>
                    <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal mb-8">{phase.description}</p>
                    <div className="space-y-3 mb-8">
                      {phase.features.map((f, fIdx) => {
                        const [title, desc] = f.split(': ');
                        return (
                          <div key={fIdx} className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-navy-900 font-bold text-[14px] md:text-[15px]">{title}: </span>
                              <span className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">{desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {phase.linkText && (
                      <Link href={phase.linkHref || "#"} className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700 transition-colors">
                        {phase.linkText}
                      </Link>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="relative h-[280px] md:h-[380px] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 group">
                      <Image src={phase.image} alt={phase.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-[8s] group-hover:scale-110 ease-out " />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"></div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IP Protection Section */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 group">
                <Image src="/images/manufacturing/brc_brakechamber_ip_protection.jpg" alt="OEM IP Protection" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-[8s] " />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <SectionHeader
                badge="Intellectual Property Protection"
                title="Your IP is Protected"
                description="We understand that your proprietary designs represent years of R&D investment. Our custom OEM program is built on absolute confidentiality and intellectual property protection at every stage."
                align="left"
                theme="light"
                accentColor="amber"
                className="!mb-8"
              />
              <div className="space-y-5">
                {[
                  { title: 'Standard NDA Before Any Review', desc: 'We sign comprehensive non-disclosure agreements before you share a single CAD file or specification sheet.' },
                  { title: 'Dedicated Engineering Team', desc: 'Your project is assigned to a dedicated team that operates independently, so your designs are never shared across other client programs.' },
                  { title: 'Exclusive Tooling Ownership', desc: 'All custom molds, dies, and tooling developed for your program remain your intellectual property. You own what you pay for.' },
                  { title: 'Segregated Production Runs', desc: 'Custom OEM orders run on segregated lines with controlled access, ensuring your products never mix with standard catalog items.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[15px] md:text-base tracking-tight text-navy-900 mb-1">{item.title}</h3>
                      <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      {/* Bottom CTA */}
      <section className="bg-[#F1EFE8] py-16 md:py-24 border-y border-slate-200 mt-12 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <SectionHeader 
            badge="Start Your OEM Project"
            title="Ready to Start Your Custom OEM Brake Chamber Project?" 
            description="We sign standard NDAs before reviewing any files. Send us your drawings, part numbers, or samples, and our engineering team responds within 24 hours."
            className="!mb-8"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center bg-amber-500 text-navy-950 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              Request OEM Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/manufacturing/private-label" className="inline-flex items-center justify-center bg-white border border-slate-200 text-navy-900 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 shadow-sm uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              Explore Private Label <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}




