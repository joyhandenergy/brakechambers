"use client";

import React from 'react';
import { ArrowRight, PenTool, BarChart3, Microscope, MonitorPlay, CheckCircle2, Factory, Layers, Zap, Cpu, FlaskConical, TestTube2, ShieldCheck, FileSearch } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import PageHeader from '@/components/layout/PageHeader';

export default function BrakeRandDClient() {
  const stats = [
    { value: '50+', label: 'Engineering Specialists', icon: FileSearch },
    { value: '200+', label: 'Active Brake Chamber Designs', icon: Layers },
    { value: '100%', label: 'FEA-Validated Before Prototyping', icon: ShieldCheck },
    { value: 'Full', label: 'In-House Prototype Capability', icon: Factory }
  ];

  const capabilities = [
    {
      step: '01',
      badge: 'Core R&D Capability',
      title: '3D CAD Modeling & Design',
      description: 'Every new BRC brake chamber begins as a parametric 3D CAD model. Our engineers iterate housing wall thickness, diaphragm geometry, push-rod stroke length, and port location digitally, before any physical tooling is cut. This reduces tooling cost and shortens development time.',
      icon: <PenTool className="w-8 h-8 text-amber-500" />,
      image: "/images/manufacturing/brc_brakechambers_3d_cd_modeling_design.jpg",
      bullets: [
        { title: 'SolidWorks & Pro/E Parametric Design', text: 'Full parametric models allow fast design iteration without re-drawing.' },
        { title: 'Full Assembly Interference Checks', text: 'Every internal component validated for clearance before prototyping.' },
        { title: 'Design-for-Manufacturing (DFM) Reviews', text: 'Every design reviewed against production capability before release.' }
      ],
      accent: 'amber'
    },
    {
      step: '02',
      badge: 'Core R&D Capability',
      title: 'Finite Element Analysis (FEA)',
      description: 'We digitally simulate real-world brake chamber operating conditions: pneumatic burst pressure, torsional vibration from rough roads, and -40°F thermal shock, to identify stress concentrations before a physical prototype is built. Every BRC design is FEA-validated.',
      icon: <BarChart3 className="w-8 h-8 text-navy-500" />,
      image: "/images/manufacturing/bre_brakechamber_finite_element_analysis.jpg",
      bullets: [
        { title: 'Burst Pressure Simulation', text: 'Chamber housings simulated up to 200 PSI to validate burst margin.' },
        { title: 'Thermal Cycling & Fatigue Analysis', text: 'Cycles simulated across -40°F to 200°F to predict service life.' },
        { title: 'Aluminum Die-Cast Geometry Optimization', text: 'Housing geometry adjusted to reduce weight without losing strength.' }
      ],
      accent: 'navy'
    },
    {
      step: '03',
      badge: 'Core R&D Capability',
      title: 'Rapid Prototyping',
      description: 'Once the digital design passes FEA validation, BRC produces functional prototypes using 3D printing and low-volume CNC machining. Prototypes undergo bench testing before volume tooling is committed.',
      icon: <Microscope className="w-8 h-8 text-amber-500" />,
      image: "/images/manufacturing/brc_simulation_prototype.jpg",
      bullets: [
        { title: 'Functional Metal Prototypes', text: 'In-house CNC machining center produces working prototypes for bench validation.' },
        { title: 'In-House Prototype Lab', text: 'Rapid iteration without outsourcing: designs tested in days, not weeks.' },
        { title: 'Iterative Design-Test-Refine Loops', text: 'Every test result feeds back into the CAD model for the next iteration.' }
      ],
      accent: 'amber'
    },
    {
      step: '04',
      badge: 'Core R&D Capability',
      title: 'Simulation & Digital Prototyping',
      description: 'Every BRC brake chamber design is first built as a digital model in 3D CAD. Using Finite Element Analysis (FEA), we simulate pneumatic bursts, torsional vibration, and thermal shock, identifying stress points and optimizing housing geometry before any physical tooling is committed.',
      caption: 'ACTIVE SIMULATION: Computer-modeled stress on a Type 30/30 housing under 150 PSI test load, validating zero micro-fractures under extreme braking events.',
      icon: <MonitorPlay className="w-8 h-8 text-navy-500" />,
      image: "/images/manufacturing/brc_simulation_and_digital_Prototyping.jpg",
      bullets: [
        { title: 'Predictive Modeling', text: 'Design decisions validated before physical tooling.' },
        { title: 'Optimized Geometries', text: 'Housing shapes refined to reduce stress points.' },
        { title: 'Virtual Endurance', text: 'Millions of cycles simulated digitally before build.' }
      ],
      accent: 'navy'
    }
  ];

  const pipeline = [
    { title: 'Smart Sensor Integration', status: 'In Development', icon: <Cpu className="w-6 h-6 text-amber-500" /> },
    { title: 'Next-Gen Elastomer Compounds', status: 'Testing Phase', icon: <FlaskConical className="w-6 h-6 text-navy-500" /> },
    { title: 'Electric Vehicle Actuators', status: 'Prototype Stage', icon: <Zap className="w-6 h-6 text-amber-500" /> },
    { title: 'Lightweight Composite Housings', status: 'Research Stage', icon: <TestTube2 className="w-6 h-6 text-navy-500" /> },
  ];

  return (
    <article className="min-h-screen bg-slate-50 font-sans pb-0 overflow-x-clip">
      {/* SECTION 1 - HERO */}
      <PageHeader
        badge="Engineering & R&D"
        badgeIcon={PenTool}
        title="Brake Chamber R&D: Engineering the Next Generation of Air Brake Chambers"
        description="BRC's in-house R&D team combines advanced CAD modeling, FEA simulation, rapid prototyping, and metallurgical science to engineer heavy-duty brake chambers. Every design is validated before it reaches the production line."
        imageSrc="/images/brc_brakechamber_aftermarket.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Manufacturing', href: '/manufacturing' },
          { label: 'Research & Development', href: '/manufacturing/research-development' }
        ]}
      />

      {/* SECTION 2 - R&D PHILOSOPHY */}
      <section className="py-12 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <SectionHeader
            badge="R&D Philosophy"
            title={<>How BRC Engineers <span className="text-amber-500">Brake Chambers</span></>}
            description="At BRC, R&D is not a support function, it is the foundation of every brake chamber we manufacture. Each new design passes through thousands of hours of digital simulation, physical prototyping, and iterative refinement before it reaches the production line."
            align="center"
            className="max-w-4xl mx-auto"
          />
          <p className="mt-6 text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal max-w-4xl mx-auto">
            Our engineering team works across mechanical design, materials science, and manufacturing technology. From lightweight high-strength steel housings to proprietary rubber compounds rated for extreme temperatures, we control the design variables that determine how a brake chamber performs in the field.
          </p>
        </div>
      </section>

      {/* SECTION 3 - R&D STATS BAR */}
      <section className="py-12 md:py-16 bg-blue-50 border-y border-slate-200 w-[100vw] relative left-1/2 -translate-x-1/2">
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

      {/* MAIN CONTENT - R&D CAPABILITIES */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-12 md:pb-16">
        <div className="space-y-16 md:space-y-24 mt-16">
          {capabilities.map((cap, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-16 items-stretch group`}>
                <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-full">
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 group-hover:shadow-3xl transition-all duration-500">
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy-900/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0`}>
                      {cap.icon}
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-amber-50 border-amber-100 border">
                      <span className="text-amber-600 font-extrabold uppercase tracking-widest text-xs">
                        {cap.badge} {cap.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-navy-900 mb-4 tracking-tight leading-tight">{cap.title}</h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal mb-8">
                    {cap.description}
                  </p>

                  {cap.caption && (
                    <div className="mb-8 bg-amber-50/80 border border-amber-100/50 rounded-2xl p-5 text-sm font-medium text-amber-900 leading-relaxed shadow-sm">
                      <strong className="text-amber-700 block mb-1 text-[10px] uppercase tracking-widest">Simulation Detail</strong>
                      {cap.caption}
                    </div>
                  )}

                  <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-4">
                    {cap.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <CheckCircle2 className={`w-5 h-5 ${cap.accent === 'amber' ? 'text-amber-500' : 'text-navy-500'}`} />
                        </div>
                        <div className="text-[14px] md:text-[15px]">
                          <span className="font-bold text-navy-900">{bullet.title}: </span>
                          <span className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">{bullet.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 8 - FUTURE PIPELINE */}
        <div className="mt-24 md:mt-32">
          <SectionHeader
            badge="Future Pipeline"
            title="Brake Chamber R&D Pipeline: What's Next"
            description="BRC's active R&D programs are focused on the next generation of commercial brake chamber technology. Each program below is in active development or validation stage."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {pipeline.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors duration-300">
                  <div className="[&>svg]:w-6 [&>svg]:h-6 [&>svg]:text-amber-500 [&>svg]:group-hover:scale-110 [&>svg]:transition-transform [&>svg]:duration-300">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h4>
                <div className="mt-auto inline-block py-1 px-3 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-widest">
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 9 - BOTTOM CTA */}
      <section className="bg-[#F1EFE8] py-16 md:py-24 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <SectionHeader 
            badge="Engineering Collaboration"
            title="Have a Brake Chamber Engineering Question?" 
            description="BRC's engineering team supports design reviews, FEA validation requests, and material selection consultations for brake chamber applications. Send us your technical requirements: our team responds within 24 hours."
            className="!mb-8"
            plainText={true}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center bg-amber-500 text-navy-950 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              Contact Engineering <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/manufacturing/custom-oem" className="inline-flex items-center justify-center bg-white border border-slate-200 text-navy-900 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 shadow-sm uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              Explore Custom OEM Manufacturing <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
