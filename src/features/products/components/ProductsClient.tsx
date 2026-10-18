"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Settings, Wrench, Package, ArrowRight, Disc, CheckCircle2, ShieldCheck, Zap, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';
import TrustMarquee from '@/components/ui/TrustMarquee';
import RotatingWatermark from '@/components/ui/RotatingWatermark';


export default function ProductsClient() {
  const categoryGroups = [
    {
      title: 'Spring Brake Chambers',
      slug: 'spring-brake-chambers',
      tag: 'Parking & Emergency Chambers',
      desc: 'Heavy-duty combination spring brake chambers for trucks and trailers. Double diaphragm design manages both service and parking brake functions. Available in standard long-stroke and welded clevis configurations. Direct replacement for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO.',
      icon: <Settings className="w-10 h-10 text-white" />,
      image: '/images/products/brc-heavy-duty-spring-brake-chambers.jpg',
      accent: 'amber',
      links: [
        { id: '/spring-brake-chambers/30-30-air-brake-chambers', title: 'Type 30/30 Spring Brake', desc: 'Standard & Long Stroke' },
        { id: '/spring-brake-chambers/24-30-24-24-spring-brakes', title: 'Type 24/30 & 24/24', desc: 'Heavy-Duty Parking' },
        { id: '/spring-brake-chambers/20-24-spring-brake-chambers', title: 'Type 20/24 Spring Brake', desc: 'Compact Power' },
        { id: '/spring-brake-chambers/type-30-30-piggyback-kits', title: 'Type 30/30 Piggyback', desc: 'Quick Replacement' },
      ]
    },
    {
      title: 'Service Chambers',
      slug: 'service-brake-chambers',
      tag: 'Steer & Drive Axles',
      desc: 'Single-diaphragm service brake chambers engineered for immediate pneumatic response, extended service life, and consistent braking performance. Available for steer axle, drive axle, and trailer applications. Direct replacement for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO.',
      icon: <Wrench className="w-10 h-10 text-white" />,
      image: '/images/products/brc-commercial-truck-service-brake-chambers.jpg',
      accent: 'navy',
      links: [
        { id: '/service-brake-chambers/type-20-steer-axle-brake-chambers', title: 'Type 20 Steer Axle', desc: 'Precision Control' },
        { id: '/service-brake-chambers/type-30-service-chambers', title: 'Type 30 Service Chamber', desc: 'Maximum Force' },
        { id: '/service-brake-chambers/type-12-16-24-service-chambers', title: 'Type 12, 16 & 24', desc: 'Versatile Fitment' },
        { id: '/service-brake-chambers/welded-clevis-brake-chambers', title: 'Welded Clevis', desc: 'Factory Sealed' },
      ]
    },
    {
      title: 'Air Disc Actuators',
      slug: 'air-disc-brake-actuators',
      tag: 'High Output Technology (HOT)',
      desc: 'Next-generation air disc brake actuators for modern commercial fleets. HOT Technology delivers superior clamping force, reduced brake fade, and consistent performance under extreme heat and heavy loads. Direct replacement for Bendix, Haldex, Meritor, and WABCO.',
      icon: <Disc className="w-10 h-10 text-white" />,
      image: '/images/products/brc-commercial-air-disc-brake-actuators.jpg',
      accent: 'amber',
      links: [
        { id: '/air-disc-brake-actuators/type-16-18-adb-actuators', title: 'Type 16 & 18 ADB', desc: 'Linear Output' },
        { id: '/air-disc-brake-actuators/type-20-24-air-disc-brake-actuator', title: 'Type 20/24 ADB', desc: 'High Capacity' },
        { id: '/air-disc-brake-actuators/type-24-24-adb-chambers', title: 'Type 24/24 ADB', desc: 'Severe Duty' },
        { id: '/air-disc-brake-actuators/type-24-30-air-disc-brake-actuators', title: 'Type 24/30 ADB', desc: 'Maximum Torque' },
      ]
    },
    {
      title: 'Chamber Parts & Kits',
      slug: 'parts-and-kits',
      tag: 'Rebuild Kits · Diaphragms · Hardware',
      desc: 'OEM-spec replacement components for field servicing and maintenance of commercial brake chambers. Includes rebuild kits, rubber diaphragms, caging bolts, clevis pins, and mounting hardware. In-stock and ready to ship worldwide.',
      icon: <Package className="w-10 h-10 text-white" />,
      image: '/images/products/brc-brake-chamber-replacement-parts-kits.jpg',
      accent: 'navy',
      links: [
        { id: '/parts-and-kits/air-brake-chamber-rebuild-kits', title: 'Chamber Rebuild Kits', desc: 'All-in-One Overhaul' },
        { id: '/parts-and-kits/brake-chamber-diaphragms', title: 'Rubber Diaphragms', desc: 'Extreme Temp Rated' },
        { id: '/parts-and-kits/clevis-pins-slack-adjuster-hardware', title: 'Clevis Pins & Hardware', desc: 'Zinc Plated Steel' },
        { id: '/parts-and-kits/brake-chamber-caging-bolts-tools', title: 'Caging Bolts & Tools', desc: 'Safety First' },
      ]
    }
  ];

  // Accent colour lookup maps — avoids repetitive ternary chains
  const accentMap = {
    amber: {
      bg: 'bg-amber-500/20 border-amber-400/30',
      glow: 'bg-amber-500',
      overlay: 'bg-amber-900/20',
      gradient: 'from-amber-400/10',
      borderBar: 'bg-amber-400',
      circleBg: 'bg-amber-50',
      iconBox: 'bg-amber-50 border-amber-100 text-amber-600',
      hoverBorder: 'hover:border-amber-200',
      btnHover: 'group-hover/card:border-amber-200 group-hover/card:bg-amber-50 text-amber-600',
      iconHover: 'from-amber-500 to-amber-500 text-navy-950 lg:from-navy-50 lg:to-navy-100 lg:text-navy-900 group-hover/card:from-amber-500 group-hover/card:to-amber-500 group-hover/card:text-navy-950',
    },
    navy: {
      bg: 'bg-navy-500/20 border-navy-400/30',
      glow: 'bg-navy-500',
      overlay: 'bg-navy-900/20',
      gradient: 'from-navy-400/10',
      borderBar: 'bg-navy-400',
      circleBg: 'bg-navy-50',
      iconBox: 'bg-navy-50 border-navy-100 text-navy-600',
      hoverBorder: 'hover:border-navy-200',
      btnHover: 'group-hover/card:border-navy-200 group-hover/card:bg-navy-50 text-navy-600',
      iconHover: 'from-navy-600 to-navy-600 text-white lg:from-navy-50 lg:to-navy-100 lg:text-navy-900 group-hover/card:from-navy-600 group-hover/card:to-navy-600 group-hover/card:text-white',
    },
    emerald: {
      bg: 'bg-emerald-500/20 border-emerald-400/30',
      glow: 'bg-emerald-500',
      overlay: 'bg-emerald-900/20',
      gradient: 'from-emerald-400/10',
      borderBar: 'bg-emerald-400',
      circleBg: 'bg-emerald-50',
      iconBox: 'bg-emerald-50 border-emerald-100 text-emerald-600',
      hoverBorder: 'hover:border-emerald-200',
      btnHover: 'group-hover/card:border-emerald-200 group-hover/card:bg-emerald-50 text-emerald-600',
      iconHover: 'from-emerald-500 to-emerald-500 text-white lg:from-navy-50 lg:to-navy-100 lg:text-navy-900 group-hover/card:from-emerald-500 group-hover/card:to-emerald-500 group-hover/card:text-white',
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-clip">

      {/* PAGE HEADER — do not modify */}
      <PageHeader
        badge="Heavy-Duty Components"
        badgeIcon={Package}
        title="Commercial Brake Chamber Catalog: Spring, Service & ADB"
        description="Browse BRC's full range of OEM-grade brake chambers and replacement parts for trucks, trailers, and commercial fleets. Spring brakes, service chambers, air disc actuators, piggyback kits, and hardware. Every product includes technical specs and direct OEM cross-reference."
        imageSrc="/images/pageheaders/brc_products.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products' }
        ]}
      />

      {/* MAIN PRODUCT CATEGORIES */}
      <section className="relative z-20 -mt-20 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {categoryGroups.map((group, idx) => {
            const isEven = idx % 2 === 0;
            const a = accentMap[group.accent as keyof typeof accentMap] ?? accentMap.amber;

            return (
              <motion.div
                key={idx}
                id={group.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={[
                  'flex flex-col gap-6',
                  'lg:flex-row lg:gap-10 lg:items-stretch',
                  isEven ? '' : 'lg:flex-row-reverse',
                  idx === 0 ? 'mt-0' : 'mt-8 sm:mt-10 lg:mt-16',
                  idx > 0 ? 'border-t border-slate-200/60 pt-8 sm:pt-10 lg:pt-16' : '',
                ].join(' ')}
              >
                {/* LARGE FEATURE CARD */}
                <div className="w-full lg:w-5/12 rounded-3xl lg:rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between shadow-2xl group min-h-[300px] sm:min-h-[360px] lg:min-h-[450px]">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[10s] group-hover:scale-110 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className={`absolute inset-0 ${a.overlay} mix-blend-color`} />
                  <div className={`absolute -bottom-20 -right-20 w-64 h-64 blur-[80px] rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-40 ${a.glow}`} />

                  <div className="relative z-10 p-6 sm:p-8 lg:p-10 xl:p-12 h-full flex flex-col">
                    <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-auto border backdrop-blur-md shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500 ${a.bg}`}>
                      {React.cloneElement(group.icon as React.ReactElement<any>, {
                        className: 'w-8 h-8 lg:w-10 lg:h-10 text-white transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110',
                        'aria-hidden': 'true'
                      })}
                    </div>
                    <div className="mt-6 lg:mt-8">
                      {group.tag && (
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-xl">
                          {group.tag}
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3 drop-shadow-lg group-hover:translate-x-2 transition-transform duration-300">
                        {group.title}
                      </h2>
                      <p className="text-[14px] md:text-[15px] leading-[1.6] text-navy-100 font-normal mb-6 max-w-sm text-justify">
                        {group.desc}
                      </p>
                      <Link
                        href={`/${group.slug}`}
                        className="inline-flex items-center text-amber-400 hover:text-amber-300 font-black tracking-widest uppercase text-[12px] transition-all group/link"
                      >
                        View {group.title} <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* PRODUCT SUB-CARDS
                    Mobile  : 1 column (full-width comfortable cards)
                    sm+     : 2 columns
                    lg      : 2 columns inside 7/12 of the row
                */}
                <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  {group.links.map((link, linkIdx) => (
                    <Link
                      key={linkIdx}
                      href={link.id}
                      className="group/card relative bg-white rounded-2xl overflow-hidden p-6 lg:p-8 xl:p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 hover:border-slate-300 transform hover:-translate-y-1 active:scale-[0.98] flex flex-col justify-between cursor-pointer"
                    >
                      {/* Gradient wash on hover */}
                      <div className={`absolute inset-0 opacity-100 lg:opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${a.gradient} to-transparent`} />

                      {/* Top right circle accent */}
                      <div className={`absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 ${a.circleBg} rounded-bl-full -mr-2 -mt-2 transition-transform duration-500 scale-110 lg:scale-100 group-hover/card:scale-110 z-0`}></div>

                      {/* Left accent bar */}
                      <div className={`absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-100 lg:opacity-0 group-hover/card:opacity-100 transition-all duration-300 ${a.borderBar}`} />

                      <div className="relative z-10">
                        {/* Colored top dash — grows on hover */}
                        <div className={`w-14 h-1 lg:w-8 rounded-full mb-5 transition-all duration-300 group-hover/card:w-14 ${a.borderBar}`} />
                        <div className="mb-3 lg:mb-4">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-navy-900 leading-tight">
                            {link.title}
                          </h3>
                        </div>
                        <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-500 font-normal text-justify">
                          {link.desc}
                        </p>
                      </div>

                      <div className="relative z-10 mt-8 flex justify-end">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br flex items-center justify-center transition-all duration-300 shadow-md lg:shadow-sm group-hover/card:shadow-md ${a.iconHover} transform rotate-0 group-hover/card:-rotate-45 group-active/card:scale-95`}>
                          <ArrowRight className="w-5 h-5 transition-transform duration-300" aria-hidden="true" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* TRUSTED BY GLOBAL FLEETS - DARK THEME */}
      <section className="py-16 md:py-24 bg-navy-950 border-b border-navy-800 relative overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5 mix-blend-luminosity"></div>

        {/* Animated Grid Layer */}
        <AnimatedGridBackground opacity={0.08} />

        {/* Top/Bottom Fade Masks */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Text + stats */}
            <div className="w-full lg:w-1/2">
              <SectionHeader
                badge="Proven Reliability"
                title={<>Trusted by <span className="text-amber-500">Global Fleets</span></>}
                description="From sub-zero Arctic logging routes to blistering desert mining operations, BRC brake chambers are the chosen aftermarket replacement for the world's most demanding fleets. Every chamber is manufactured to IATF 16949 standards and pressure-tested before shipment."
                align="left"
                theme="dark"
                accentColor="amber"
                className="!mb-8"
              />

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-navy-800/50">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-white mb-1">1.2M+</div>
                  <div className="text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-widest">Units Deployed</div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-white mb-1">30+</div>
                  <div className="text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-widest">Countries Served</div>
                </div>
              </div>
            </div>

            {/* Images — side by side on mobile, offset grid on desktop */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                <img
                  src="/images/products/brc-heavy-duty-desert-truck.jpg"
                  alt="BRC heavy duty fleet truck operating in harsh desert mining environment"
                  className="rounded-2xl lg:rounded-3xl shadow-xl shadow-navy-950/50 w-full h-48 sm:h-56 lg:h-64 object-cover object-[25%_center] transition-all duration-500 hover:opacity-90"
                />
                <img
                  src="/images/products/brc-engineer-tighting-a-bolt.jpg"
                  alt="BRC engineer tightening a bolt on a brake chamber"
                  className="rounded-2xl lg:rounded-3xl shadow-xl shadow-navy-950/50 w-full h-60 sm:h-72 lg:h-80 object-cover object-center mt-6 sm:mt-8 lg:mt-12 transition-all duration-500 hover:opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BY VEHICLE APPLICATION TEASER */}
      <section className="py-12 md:py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/60 -skew-x-12 translate-x-1/4 pointer-events-none z-0" />

        {/* Rotating Brake Chamber Watermark */}
        <RotatingWatermark 
          sizeClass="w-[500px] h-[500px] lg:w-[800px] lg:h-[800px]" 
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <SectionHeader
                badge="By Vehicle Application"
                title="Brake Chambers by Vehicle Type"
                description="Select your vehicle type to see the recommended brake chambers for your operating environment. Each application page includes product recommendations, OEM cross-reference data, and installation specs."
                align="left"
                theme="light"
                accentColor="amber"
                plainText={true}
                className="!mb-0"
              />
            </div>
            <Link href="/applications" className="hidden md:inline-flex items-center text-amber-600 font-extrabold uppercase tracking-widest text-[13px] hover:text-amber-500 transition-colors group">
              Explore All Brake Chamber Applications <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: 'Heavy-Duty Trucks', rec: 'Spring Brakes (Type 30/30, 24/30)', img: '/images/applications/brc-heavy-duty-truck.jpg', link: '/applications/long-haul-semi-trucks' },
              { title: 'Commercial Trailers', rec: 'Service Chambers (Type 20, 30)', img: '/images/applications/brc-commercial-trailer.jpg', link: '/applications/heavy-duty-trailer' },
              { title: 'Transit Buses', rec: 'Air Disc Actuators (Type 16/18)', img: '/images/applications/brc-transist-bus.jpg', link: '/applications/transit-buses' },
              { title: 'Off-Highway & Mining', rec: 'Severe-Duty ADB (Type 24/24)', img: '/images/applications/brc-mining-equipment.jpg', link: '/applications/mining-construction' }
            ].map((app, idx) => (
              <Link key={idx} href={app.link} className="group relative h-64 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                <Image
                  src={app.img}
                  alt={app.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-[10s] group-hover:scale-110"
                />
                {/* Heavy dark gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-amber-900/20 mix-blend-color" />

                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end">
                  <h3 className="text-xl lg:text-2xl font-extrabold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-navy-200 font-normal mb-4">{app.rec}</p>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transform group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 md:hidden flex w-full justify-center text-center">
            <Link href="/applications" className="inline-flex items-center justify-center text-amber-600 font-extrabold uppercase tracking-widest text-[13px] hover:text-amber-500 transition-colors group leading-snug">
              <span>Explore All Brake Chamber<br/>Applications</span>
              <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SHORT OEM CROSS-REFERENCE TEASER */}
      <section className="py-10 md:py-16 bg-blue-50 relative overflow-hidden border-b border-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 relative overflow-hidden">

            {/* Subtle background element for depth */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none -mr-10 -mt-10"></div>

            {/* Text Content */}
            <div className="max-w-2xl text-center lg:text-left relative z-10">
              <SectionHeader
                badge={<><Search className="w-3.5 h-3.5 inline-block mr-1.5 relative -top-[1px]" />Find Your Match</>}
                title="Already Have an OEM Brake Chamber Part Number?"
                description="Enter your Bendix, Knorr-Bremse, ZF/WABCO, Haldex, SORL, or MGM part number and instantly find the matching BRC brake chamber equivalent. Every cross-reference is verified for fit, form, and function. Live database updated weekly."
                align="left"
                theme="light"
                accentColor="amber"
                plainText={true}
                className="!mb-0"
              />
            </div>

            {/* Action Area (Link to OEM Page) */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:shrink-0 relative z-10 mt-6 lg:mt-0">
              <Link href="/oem-cross-reference" className="flex w-full sm:w-auto items-center justify-center text-center bg-navy-900 hover:bg-navy-800 text-white font-bold px-8 py-4 rounded-xl text-[13px] sm:text-[14px] uppercase tracking-widest transition-all shadow-md transform hover:-translate-y-0.5 whitespace-normal sm:whitespace-nowrap border border-navy-700 leading-snug">
                <span>Go to OEM Cross-Reference Database</span>
                <ArrowRight className="ml-3 w-5 h-5 flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* WHOLESALE CTA */}
      <div className="py-12 md:py-20 bg-[#F1EFE8] relative overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] p-8 sm:p-10 md:p-12 lg:p-16 text-white shadow-2xl shadow-navy-900/20 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10">
            {/* Internal Card Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0"></div>

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <SectionHeader
                badge="Factory-Direct Pricing"
                title="Looking for Volume Pricing or Container Orders?"
                description={<>Distributors and large fleets get direct factory pricing, tiered discounts, and reliable container shipping from our IATF 16949 factory in Zhejiang, China. <strong className="text-white font-bold">No middlemen. No hidden markups.</strong></>}
                align="left"
                theme="dark"
                accentColor="amber"
                className="!mb-0"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto shrink-0">
              <Link href="/contact" className="inline-block w-full bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-center px-6 sm:px-10 py-5 rounded-xl uppercase tracking-widest text-[13px] transition-all duration-300 shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 whitespace-normal sm:whitespace-nowrap leading-tight sm:leading-normal">
                Request Factory Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
