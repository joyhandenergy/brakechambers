"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Package, Ship, TrendingDown, Users, Clock, Globe2, Calculator, BarChart3, Boxes, Container, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';

export default function HighVolumeOrdersClient() {

  const tiers = [
    {
      tier: 'LCL Pilot Order',
      range: 'MOQ: 100+ units (LCL)',
      discount: 'Base Pricing',
      color: 'slate',
      features: ['Standard catalog products', 'LCL ocean freight support', 'Standard 30-45 day lead time', 'Email-based account support'],
    },
    {
      tier: 'Standard FCL',
      range: "20' Container",
      discount: 'Volume Discount',
      color: 'amber',
      popular: true,
      features: ['Full catalog + custom specs', 'Optimized LCL/FCL shipping', 'Priority 30-45 day lead time', 'Dedicated account manager'],
    },
    {
      tier: 'Large FCL',
      range: "40' Container",
      discount: 'Tier 2 Pricing',
      color: 'navy',
      features: ['Custom OEM engineering available', 'Full container (FCL) optimization', 'Priority allocation scheduling', 'Quarterly business reviews'],
    },
    {
      tier: 'Annual Contract',
      range: 'Multi-Container Programs',
      discount: 'Best Factory-Direct Rate',
      color: 'emerald',
      features: ['Dedicated production line access', 'Multi-container programs', 'JIT inventory holding available', 'Executive partnership program'],
    },
  ];

  const advantages = [
    {
      icon: <TrendingDown className="w-7 h-7 text-amber-500" />,
      title: 'Tiered Volume Pricing',
      description: 'The more you order, the lower your per-unit cost. Our pricing tiers are structured so that scaling your order directly translates to stronger margins for your business, with no hidden fees or surcharges.',
    },
    {
      icon: <Container className="w-7 h-7 text-navy-500" />,
      title: 'Container Load Optimization',
      description: 'Our logistics team optimizes every container shipment to maximize pallet density. We calculate the most efficient box configurations and stacking patterns to fit the most units per 20ft or 40ft container, reducing your per-unit freight cost.',
    },
    {
      icon: <Clock className="w-7 h-7 text-amber-500" />,
      title: 'Priority Production Scheduling',
      description: 'High-volume clients receive priority scheduling on our brake chamber production lines. Your orders move to the front of the queue with guaranteed capacity reservations, so your lead times remain predictable even during peak season.',
    },
    {
      icon: <Users className="w-7 h-7 text-navy-500" />,
      title: 'Dedicated Account Management',
      description: 'Every high-volume client is assigned a dedicated account manager who coordinates production scheduling, quality reports, shipping logistics, and ongoing communication. One point of contact for everything.',
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-amber-500" />,
      title: 'Demand Forecasting & JIT Supply',
      description: 'For strategic partners, we offer demand forecasting and just-in-time inventory programs. We pre-produce and warehouse your orders so they are ready to ship the moment your warehouse needs replenishment.',
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-navy-500" />,
      title: 'Enhanced Quality Reporting',
      description: 'High-volume clients receive detailed quality reports with every shipment, including test results, dimensional data, and traceability certificates. Full transparency into every batch that leaves our factory.',
    },
  ];

  const stats = [
    { value: '1M+', label: 'Brake Chambers Produced Annually', icon: Boxes },
    { value: '30+', label: 'Countries Shipped To', icon: Globe2 },
    { value: '30-45 Day', label: 'Standard Lead Time', icon: Clock },
    { value: '40ft', label: 'FCL Container Programs', icon: Container },
  ];

  return (
    <article className="min-h-screen bg-navy-950 font-sans overflow-x-clip">
      <PageHeader
        badge="Volume Pricing & Scale"
        title="High-Volume Brake Chamber Orders From China: Factory-Direct Pricing"
        description="From 500-unit pilot orders to multi-container annual programs, BRC offers tiered factory-direct pricing, priority production scheduling, and dedicated account management for distributors and fleets ordering from China."
        imageSrc="/images/brc_brakechamber_aftermarket.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Manufacturing', href: '/manufacturing' },
          { label: 'High Volume Orders' }
        ]}
      />

      {/* Intro */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <SectionHeader 
              badge="Factory-Direct Pricing"
              title={<>Factory-Direct Brake Chamber <span className="text-amber-500">Pricing</span> at Scale</>}
            />
            <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal max-w-3xl mx-auto mb-6">
              When you buy directly from our factory in China, you eliminate every middleman markup between the 
              production line and your warehouse. Our tiered pricing program rewards volume with progressively 
              better per-unit costs, passing our manufacturing efficiency directly to your bottom line.
            </p>
            <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-500 font-normal max-w-3xl mx-auto">
              Whether you're a regional distributor placing your first container order, or a multinational 
              aftermarket group running multi-container programs, we have the brake chamber production capacity, logistics 
              infrastructure, and pricing flexibility to support your growth.
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
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume Tiers */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
          <SectionHeader
            badge="Pricing Tiers"
            title="Brake Chamber Volume Discount Structure"
            description="Transparent tiered pricing, the more you order, the better your margins."
            accentColor="amber"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
            {tiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl relative overflow-hidden ${
                  tier.popular
                    ? 'bg-amber-50/50 border-amber-300 hover:border-amber-400'
                    : 'bg-white border-slate-100 hover:border-navy-400'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-navy-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-black text-navy-900 mb-2">{tier.tier}</h3>
                <div className="text-amber-600 font-bold text-sm mb-1">{tier.range}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">{tier.discount}</div>
                <ul className="space-y-3">
                  {tier.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-[14px] md:text-[15px] leading-[1.6] text-navy-900 font-normal">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages — 2-Column Grid */}
      <section className="py-20 lg:py-32 bg-navy-950 relative overflow-hidden border-y border-navy-800">
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5  "></div>
        
        <AnimatedGridBackground opacity={0.08} />
        
        {/* Fade out masks to make the grid and image blend smoothly into the dark section */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] relative z-10">
          <SectionHeader
            badge="Volume Buyer Benefits"
            title="Why Distributors Scale With BRC Brake Chambers"
            description="Volume buyers get more than better pricing. They get priority production, dedicated support, and logistics optimization."
            theme="dark"
            accentColor="amber"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {advantages.map((adv, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.6 }}
                className="bg-navy-900 border border-navy-800 rounded-[2rem] p-8 lg:p-10 hover:bg-navy-800 transition-all duration-500 shadow-xl shadow-navy-900/10 group transform hover:-translate-y-1 relative overflow-hidden flex flex-col md:flex-row items-start gap-6">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-navy-700 group-hover:border-amber-500/50 transition-colors [&>svg]:text-amber-400 [&>svg]:group-hover:scale-110 [&>svg]:transition-transform [&>svg]:duration-300">
                  {adv.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{adv.title}</h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-400 font-normal">{adv.description}</p>
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
            badge="Request Volume Pricing"
            title="Request High-Volume Brake Chamber Pricing" 
            description="Tell us your target volumes and brake chamber product mix, and we'll provide a detailed quotation with tiered pricing, container optimization analysis, and estimated lead times."
            className="!mb-8"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="inline-flex items-center justify-center bg-amber-500 text-navy-950 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              Request Volume Pricing <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/shipping" className="inline-flex items-center justify-center bg-white border border-slate-200 text-navy-900 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 shadow-sm uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto">
              View Shipping & Logistics <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}




