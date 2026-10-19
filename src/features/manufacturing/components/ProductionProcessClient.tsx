"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Cpu, ShieldAlert, CheckCircle2, Info, Factory } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import PageHeader from '@/components/layout/PageHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';

export default function ProductionProcessClient() {
  const steps = [
    {
      step: '01',
      title: "Brake Chamber Stamping & Forming",
      description: "Every 8-gauge steel brake chamber housing begins in heavy-tonnage hydraulic presses. Automated stamping ensures exact tolerances and forms the rigid foundation required to withstand torsional forces, pressure cycling, and road impact stress.",
      icon: <Settings className="w-8 h-8 text-amber-500" />,
      image: "/images/just/Weixin Image_20261008105250_291_1.jpg",
      subNote: "Incoming steel is verified for grade, thickness, and hardness before entering the press line.",
      linkUrl: "/manufacturing/material-sourcing",
      linkText: "See how we source raw materials"
    },
    {
      step: '02',
      title: "Robotic Welding of Brake Chamber Housings",
      description: "Critical structural welds on every BRC brake chamber are performed by 6-axis robotic welding arms. Continuous, deep-penetration seams run around the housing to ensure structural integrity and burst resistance across millions of pressure cycles.",
      icon: <Cpu className="w-8 h-8 text-navy-500" />,
      image: "/images/just/Weixin Image_20261008133836_331_1.jpg",
      subNote: "Every weld is visually inspected and pressure-tested before moving to the next stage.",
      linkUrl: null,
      linkText: null
    },
    {
      step: '03',
      title: "Brake Chamber E-Coating & Epoxy Finishing",
      description: "Every steel component, including internal return springs, passes through a multi-stage cathodic electrodeposition (e-coat) process, followed by a heavy epoxy finish. This dual-layer corrosion defense prevents the internal rust flaking that damages center seals and shortens chamber life.",
      icon: <ShieldAlert className="w-8 h-8 text-amber-500" />,
      image: "/images/just/Weixin Image_20261008133820_324_1.jpg",
      subNote: "Coating thickness is measured and logged for every production batch.",
      linkUrl: null,
      linkText: null
    },
    {
      step: '04',
      title: "Brake Chamber Automated Assembly",
      description: "Every brake chamber is assembled in a clean-room environment using torque-controlled fastening systems. Neoprene diaphragms and machined push-rods are aligned to deliver consistent linear force across the full stroke, without binding, hesitation, or air loss.",
      icon: <CheckCircle2 className="w-8 h-8 text-navy-500" />,
      image: "/images/just/Weixin Image_20261008133815_322_1.jpg",
      subNote: "Every assembled chamber is 100% pneumatic leak-tested before packaging.",
      linkUrl: "/manufacturing/quality-assurance",
      linkText: "See quality assurance testing"
    }
  ];


  return (
    <article className="min-h-screen bg-slate-50 font-sans pb-0 overflow-x-clip">
      {/* SECTION 1 - HERO */}
      <PageHeader
        badge="Production Process"
        badgeIcon={Factory}
        title="Brake Chamber Manufacturing Process: From Raw Steel to Export-Ready"
        description="Inside our Zhejiang, China factory, every BRC brake chamber moves through a controlled four-stage production flow: stamping, welding, e-coating, and automated assembly."
        imageSrc="/images/brc_aftermarket.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Manufacturing', href: '/manufacturing' },
          { label: 'Process', href: '/manufacturing/process' }
        ]}
      />

      {/* SECTION 2 - PRODUCTION OVERVIEW */}
      <section className="py-12 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <SectionHeader
            badge="Production Overview"
            title={<>Inside Our Brake Chamber <span className="text-amber-500">Production Process</span></>}
            description="Our vertically integrated brake chamber production lines are built around one principle: consistency. Every unit is engineered to perform identically to the million chambers manufactured before it. Here are the four controlled stages that make it possible."
            align="center"
            className="max-w-4xl mx-auto"
          />
          <div className="mt-10 flex justify-center">
            <Link href="/manufacturing/material-sourcing" className="inline-flex items-center text-amber-600 font-extrabold hover:text-amber-700 uppercase tracking-wider sm:tracking-widest text-[11px] sm:text-sm bg-amber-50 px-4 sm:px-8 py-4 rounded-xl transition-all hover:bg-amber-100 hover:-translate-y-1 whitespace-nowrap">
              See the raw materials we start with <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 shrink-0" />
            </Link>
          </div>
        </div>
      </section>
      {/* MAIN CONTENT - STEPS */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
              <div className="w-full md:w-1/2">
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
                  <Image src={step.image} alt={step.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-navy-900/20 mix-blend-multiply"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100">
                    <span className="text-amber-600 font-extrabold uppercase tracking-widest text-xs">Step {step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-navy-900 mb-4 tracking-tight leading-tight">{step.title}</h3>
                <p className="text-slate-600 leading-[1.6] text-[15px] md:text-base font-normal">{step.description}</p>
                {step.subNote && (
                  <div className="mt-8 flex items-start gap-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 group-hover:bg-amber-400 transition-colors"></div>
                    <div className="shrink-0 p-2 bg-amber-50 rounded-lg">
                      <Info className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Quality Control</span>
                      <p className="text-[14px] text-slate-700 font-medium leading-[1.6]">{step.subNote}</p>
                    </div>
                  </div>
                )}
                {step.linkUrl && (
                  <div className="mt-6">
                    <Link href={step.linkUrl} className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700 uppercase tracking-widest text-sm">
                      {step.linkText} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7 - PRODUCTION CAPACITY */}
      <section className="bg-navy-950 py-16 md:py-24 relative overflow-hidden border-y border-navy-800 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5"></div>
        <AnimatedGridBackground opacity={0.08} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SectionHeader
            badge="Production Capacity"
            title="Brake Chamber Production at Scale"
            description="Our automated assembly lines scale to meet container-level demand. Whether you need 500 units for a pilot order or 100,000+ units for annual distribution, BRC delivers consistent quality at factory-direct pricing."
            theme="dark"
            accentColor="amber"
            plainText={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { title: "4 Controlled Stages", desc: "Every unit flows through stamping, welding, e-coating, and assembly.", icon: <Factory className="w-6 h-6" /> },
              { title: "100% Pneumatic Testing", desc: "Zero defects. Every chamber is pressure-tested at the end of the line.", icon: <ShieldAlert className="w-6 h-6" /> },
              { title: "500-Unit Minimum", desc: "Low pilot MOQ allows distributors to validate quality before scaling.", icon: <Info className="w-6 h-6" /> },
              { title: "100,000+ Unit Scale", desc: "Annual production programs supported by dedicated manufacturing cells.", icon: <Settings className="w-6 h-6" /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                className="bg-navy-900 border border-navy-800 rounded-[2rem] p-8 hover:bg-navy-800 transition-all duration-500 shadow-xl shadow-navy-900/10 group transform hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="text-7xl font-black text-navy-800/50 absolute top-4 right-4 group-hover:text-amber-500/10 transition-colors pointer-events-none z-0">0{idx + 1}</span>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-navy-700 group-hover:border-amber-500/50 transition-colors text-amber-400 [&>svg]:group-hover:scale-110 [&>svg]:transition-transform [&>svg]:duration-300">
                    {stat.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{stat.title}</h3>
                  <p className="text-navy-200 text-[15px] leading-[1.6] font-normal flex-grow">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/manufacturing/high-volume-orders" className="inline-flex items-center justify-center bg-navy-800 border border-navy-700 text-white font-extrabold px-6 py-4 rounded-xl hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 uppercase tracking-widest text-[11px] sm:text-xs whitespace-nowrap text-center">
              View High-Volume Orders <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            
          </div>
        </div>
      </section>
      {/* Bottom CTA */}
      <section className="bg-[#F1EFE8] py-16 md:py-24 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <SectionHeader
            badge="See the Next Stage"
            title="Where Does Your Brake Chamber Go After Production?"
            description="Every BRC brake chamber is tested, packaged, and prepared for export before it leaves our factory. See how we verify quality and package for international shipping."
            className="!mb-8"
            plainText={true}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/manufacturing/quality-assurance" className="inline-flex items-center justify-center bg-white border border-slate-200 text-navy-900 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 shadow-sm uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              Explore Quality Assurance <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/shipping-logistics" className="inline-flex items-center justify-center bg-amber-500 text-navy-950 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              View Shipping & Logistics <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

      </section>
    </article>
  );
}
