"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Paintbrush, Tag, Package, Printer, CheckCircle2, Palette, Stamp, Box, Layers, ShieldCheck, Users, BarChart3, Truck, MessageSquare, Settings, Globe2, Clock, Boxes, Container } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';

export default function PrivateLabelClient() {

  const stats = [
    { value: '50+', label: 'Private Label Programs Delivered', icon: Globe2 },
    { value: '500-Unit', label: 'Minimum Order', icon: Boxes },
    { value: '6', label: 'Customization Categories', icon: Settings },
    { value: '30-45 Day', label: 'Standard Production', icon: Clock },
  ];

  const customizations = [
    {
      icon: <Paintbrush className="w-7 h-7 text-amber-500" />,
      title: 'Custom Paint & Powder Coating',
      description: 'Choose any RAL color for chamber housings. Applied with industrial-grade powder coating or wet paint for maximum corrosion resistance and visual branding.',
    },
    {
      icon: <Stamp className="w-7 h-7 text-navy-500" />,
      title: 'Laser Engraving & Stamping',
      description: 'Your logo and part numbers laser-engraved directly into the housing metal. Unlike printed stickers that peel off, laser marking is permanent and survives harsh environments.',
    },
    {
      icon: <Box className="w-7 h-7 text-amber-500" />,
      title: 'Branded Retail Packaging',
      description: 'Full-color custom packaging designed to your specifications. From individual chamber boxes to shelf-ready cartons with your brand, part numbers, UPC codes, and installation instructions.',
    },
    {
      icon: <Tag className="w-7 h-7 text-navy-500" />,
      title: 'Custom Labels & Documentation',
      description: 'Branded warning labels, spec sheets, installation guides, and warranty cards, all printed with your company information. Your customers see your brand at every touchpoint.',
    },
    {
      icon: <Palette className="w-7 h-7 text-amber-500" />,
      title: 'Custom Spring & Bracket Colors',
      description: 'Differentiate your brake chambers with custom-colored internal springs and mounting brackets. A simple visual identifier that helps technicians confirm they are installing your premium brand.',
    },
    {
      icon: <Layers className="w-7 h-7 text-navy-500" />,
      title: 'Pallet & Container Branding',
      description: 'Every shipping pallet and container marking carries your brand. From warehouse to installation bay, every touchpoint reinforces your brand identity to distributors and technicians.',
    },
  ];

  const steps = [
    { step: '01', title: 'Brand Consultation', desc: 'Share your brand guidelines, color palette, logo files, and packaging requirements. We assign a dedicated project manager to coordinate every detail.', icon: <MessageSquare className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" /> },
    { step: '02', title: 'Sample Production', desc: 'We produce physical samples with your branding applied, painted, engraved, packaged, for your approval before committing to full production.', icon: <Settings className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" /> },
    { step: '03', title: 'Production Run', desc: 'Once approved, we integrate your branding into our production line. Custom parts, engraving, and packaging happen seamlessly alongside standard manufacturing.', icon: <Package className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" /> },
    { step: '04', title: 'Packaging & Delivery', desc: 'Finished products are packed in your branded boxes, palletized with your markings, and shipped directly to your distribution center or end customer.', icon: <Truck className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" /> },
  ];

  return (
    <article className="min-h-screen bg-white font-sans overflow-x-clip">
      <PageHeader
        badge="Brand Building"
        title="Private Label & White Label Brake Chambers From China"
        description="Launch your own aftermarket brake chamber brand without building a factory. BRC manufactures, brands, packages, and ships from Zhejiang, China, you sell under your name with full factory-direct margins."
        imageSrc="/images/brc_aftermarket.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Manufacturing', href: '/manufacturing' },
          { label: 'Private Label & White Label' }
        ]}
      />

      {/* Intro */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <SectionHeader 
              badge="Your Brand. Our Manufacturing Muscle."
              title={<>Your <span className="text-amber-500">Brand</span> on Factory-Direct Brake Chambers</>}
            />
            <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal max-w-3xl mx-auto mb-6">
              Building a brake chamber brand from scratch requires millions in factory investment, 
              years of R&D, and deep manufacturing expertise. Our private label brake chamber program lets you skip 
              all of that. BRC provides the engineering, production, and quality assurance in China, you provide the brand.
            </p>
            <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-500 font-normal max-w-3xl mx-auto">
              Whether you're an established distributor launching a house brand, or a new entrant 
              competing with premium aftermarket names, we provide the full manufacturing backbone. 
              Same factory. Same quality. Your name on the box.
            </p>
          </motion.div>
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

      {/* Private Label vs White Label Comparison */}
      <section className="py-12 md:py-16 bg-blue-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            badge="Private Label vs White Label"
            title="Private Label vs White Label Brake Chambers"
            description="Two ways to sell BRC brake chambers under your own brand, each suited to a different stage of brand development."
            accentColor="amber"
            plainText={true}
          />
          <div className="max-w-5xl mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Private Label */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-amber-200 shadow-xl hover:shadow-2xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[50px] -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-4 tracking-tight leading-tight">Private Label</h3>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal mb-6">
                  Full custom branding on BRC-manufactured brake chambers. Your logo, your colors, your 
                  packaging, your part numbers. The product is exclusively yours.
                </p>
                <ul className="space-y-3">
                  {['Custom paint colors & finishes', 'Laser-engraved logos & part numbers', 'Fully branded packaging & labels', 'Custom documentation & warranty cards', 'Exclusive distribution rights available'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[14px] md:text-[15px] leading-[1.6] text-navy-900 font-normal">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* White Label */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl hover:shadow-2xl hover:border-navy-400 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-navy-500/5 rounded-full blur-[50px] -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-bold uppercase tracking-widest">
                  Quick Start
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-4 tracking-tight leading-tight">White Label</h3>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal mb-6">
                  Ready-made BRC brake chambers in unbranded or neutral packaging. You apply your own labels 
                  and branding at your facility. Fastest path to market.
                </p>
                <ul className="space-y-3">
                  {['Standard BRC products, no branding', 'Plain or neutral packaging', 'You apply your own labels', 'Lower MOQs to get started', 'Ideal for testing new markets'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[14px] md:text-[15px] leading-[1.6] text-navy-900 font-normal">
                      <CheckCircle2 className="w-4 h-4 text-navy-500 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          </div>
        </div>
      </section>

      {/* What We Customize — Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
          <SectionHeader
            badge="Customization Options"
            title="What We Customize for Private Label Brake Chambers"
            description="From housing color to shipping pallet, every element can carry your brand identity."
            accentColor="amber"
            plainText={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-10">
            {customizations.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden ${idx % 2 === 0 ? "hover:border-amber-400" : "hover:border-navy-400"}`}
              >
                {/* Top Right Circle Decoration */}
                <div className={`absolute top-0 right-0 w-24 h-24 ${idx % 2 === 0 ? 'bg-amber-50/60' : 'bg-slate-50/60'} rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 z-0 pointer-events-none`}></div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 transition-all duration-300 ${idx % 2 === 0 ? "text-amber-500 group-hover:bg-amber-50 group-hover:border-amber-200" : "text-navy-500 group-hover:bg-slate-50 group-hover:border-slate-200"}`}>
                    <div className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-navy-900 mb-3 tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — Horizontal Timeline */}
      <section className="py-20 lg:py-32 bg-navy-950 relative overflow-hidden border-y border-navy-800">
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5  "></div>
        
        <AnimatedGridBackground opacity={0.08} />
        
        {/* Fade out masks to make the grid and image blend smoothly into the dark section */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] relative z-10">
          <SectionHeader
            badge="Private Label Process"
            title="From Brand Concept to Your Shelf in 4 Steps"
            description="Every private label brake chamber program follows the same controlled four-step process."
            theme="dark"
            accentColor="amber"
            plainText={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                className="bg-navy-900 border border-navy-800 rounded-[2rem] p-8 hover:bg-navy-800 transition-all duration-500 shadow-xl shadow-navy-900/10 group transform hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <span className="text-7xl font-black text-navy-800/50 absolute top-4 right-4 group-hover:text-amber-500/10 transition-colors pointer-events-none z-0">{step.step}</span>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-navy-700 group-hover:border-amber-500/50 transition-colors text-amber-400 [&>svg]:group-hover:scale-110 [&>svg]:transition-transform [&>svg]:duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-navy-200 text-[15px] leading-[1.6] font-normal flex-grow">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      {/* Bottom CTA */}
      <section className="bg-[#F1EFE8] py-16 md:py-24 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <SectionHeader 
            badge="Launch Your Private Label"
            title="Ready to Launch Your Private Label Brake Chamber Brand?" 
            description="Start with a free brand consultation. We'll walk you through MOQs, customization options, lead times, and pricing to get your private label brake chamber program off the ground."
            className="!mb-8"
            plainText={true}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center bg-amber-500 text-navy-950 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              Start Brand Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/manufacturing/custom-oem" className="inline-flex items-center justify-center bg-white border border-slate-200 text-navy-900 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 shadow-sm uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              Explore Custom OEM Manufacturing
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}


