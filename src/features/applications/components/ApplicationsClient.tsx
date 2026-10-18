"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, Bus, Factory, ShieldAlert, ArrowRight, CheckCircle2, ThermometerSnowflake, Flame, Droplets, Activity, MapPin, Globe2, Users, Cog, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';
import RotatingWatermark from '@/components/ui/RotatingWatermark';

export default function ApplicationsClient() {
  const accentMap = {
    amber: {
      gradient: 'from-amber-50/50',
      iconBorder: 'border-amber-100',
      iconBg: 'bg-amber-50',
      iconText: 'text-amber-600',
      linkHoverBorder: 'hover:border-amber-300',
      linkHoverShadow: 'hover:shadow-md',
      linkHoverIconBg: 'group-hover/link:bg-amber-100',
      linkHoverIconText: 'group-hover/link:text-amber-700',
      linkHoverText: 'group-hover/link:text-amber-700',
      imgGlow: 'bg-amber-900/20 group-hover:bg-amber-900/10',
      btnHover: 'hover:bg-amber-400 shadow-amber-500/20'
    },
    navy: {
      gradient: 'from-navy-50/50',
      iconBorder: 'border-navy-100',
      iconBg: 'bg-navy-50',
      iconText: 'text-navy-500',
      linkHoverBorder: 'hover:border-navy-300',
      linkHoverShadow: 'hover:shadow-md',
      linkHoverIconBg: 'group-hover/link:bg-navy-50',
      linkHoverIconText: 'group-hover/link:text-navy-500',
      linkHoverText: 'group-hover/link:text-navy-700',
      imgGlow: 'bg-navy-900/20 group-hover:bg-navy-900/10',
      btnHover: 'hover:bg-amber-400 shadow-amber-500/20'
    },
    slate: {
      gradient: 'from-slate-100/50',
      iconBorder: 'border-slate-200',
      iconBg: 'bg-slate-100',
      iconText: 'text-slate-500',
      linkHoverBorder: 'hover:border-slate-300',
      linkHoverShadow: 'hover:shadow-md',
      linkHoverIconBg: 'group-hover/link:bg-slate-100',
      linkHoverIconText: 'group-hover/link:text-slate-600',
      linkHoverText: 'group-hover/link:text-slate-700',
      imgGlow: 'bg-slate-900/20 group-hover:bg-slate-900/10',
      btnHover: 'hover:bg-amber-400 shadow-amber-500/20'
    }
  };

  const categoryGroups = [
    {
      title: 'Brake Chambers for Commercial Trucks & Trailers',
      slug: 'commercial-freight',
      badge: 'Commercial & Freight',
      desc: 'Long-haul semi trucks, heavy-duty trailer axles, and medium-duty box trucks. These applications demand high-cycle spring brake chambers and service chambers rated for extreme mileage and consistent pneumatic response.',
      icon: <Truck className="w-8 h-8" />,
      image: '/images/applications/brc-heavy-duty-truck.jpg',
      accent: 'amber',
      links: [
        { id: '/applications/long-haul-semi-trucks', title: 'Long-Haul Semi Trucks' },
        { id: '/applications/heavy-duty-trailer', title: 'Heavy-Duty Trailer Axles' },
        { id: '/applications/medium-duty-trucks', title: 'Medium-Duty Box Trucks' },
      ],
      cta: 'View Truck & Trailer Brake Chambers',
      ctaLink: '/products'
    },
    {
      title: 'Brake Chambers for Mining, Construction & Agriculture',
      slug: 'severe-duty',
      badge: 'Severe-Duty & Off-Highway',
      desc: 'Off-highway equipment operates under sustained load, extreme heat, and heavy contamination. These applications require severe-duty ADB actuators and heavy-gauge spring brake chambers engineered for high-cycle endurance.',
      icon: <ShieldAlert className="w-8 h-8" />,
      image: '/images/applications/brc-mining-equipment.jpg',
      accent: 'amber',
      links: [
        { id: '/applications/mining-construction', title: 'Mining & Construction Equipment' },
        { id: '/applications/ag-trailers', title: 'Agricultural Trailers & Harvesters' },
        { id: '/applications/oil-field', title: 'Oil Field & Fracking Rigs' },
      ],
      cta: 'View Severe-Duty Brake Chambers',
      ctaLink: '/products'
    },
    {
      title: 'Brake Chambers for Transit Buses & Passenger Vehicles',
      slug: 'passenger-transport',
      badge: 'Transit & Passenger',
      desc: 'City buses, intercity coaches, school buses, and shuttle fleets demand low-noise, high-cycle brake chambers. BRC supplies air disc brake actuators and service chambers engineered for stop-and-go duty cycles and passenger comfort.',
      icon: <Bus className="w-8 h-8" />,
      image: '/images/applications/brc-transist-bus.jpg',
      accent: 'amber',
      links: [
        { id: '/applications/transit-buses', title: 'City & Intercity Transit Buses' },
        { id: '/applications/school-buses', title: 'School Bus Fleets' },
        { id: '/applications/shuttle-vans', title: 'Shuttle & Delivery Vans' },
      ],
      cta: 'View Transit Brake Chambers',
      ctaLink: '/products'
    }
  ];

  return (
    <article className="min-h-screen bg-slate-50 font-sans overflow-x-clip">
      <PageHeader
        badge="By Vehicle & Industry"
        badgeIcon={Truck}
        title="Brake Chambers by Application: Trucks, Trailers, Transit & Off-Highway"
        description="Find the right BRC brake chamber for your operating environment. Heavy-duty trucks, commercial trailers, transit buses, refuse vehicles, and off-highway equipment. Each application page recommends the exact spring, service, or air disc brake chamber for the job."
        imageSrc="/images/pageheaders/brc_application.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Applications' }
        ]}
      />

      {/* Categories container */}
      <div className="-mt-20 relative z-20 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col gap-16 md:gap-20">
            {categoryGroups.map((group, idx) => {
              const isEven = idx % 2 === 0;
              const a = accentMap[group.accent as keyof typeof accentMap] ?? accentMap.amber;
              return (
                <div key={idx} className={`flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-1/2 flex"
                  >
                    <div className="relative w-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl group border border-slate-200/50 min-h-[300px] sm:min-h-[360px] lg:min-h-[450px] lg:aspect-[16/11]">
                      <div className={`absolute inset-0 z-10 transition-colors duration-700 ${a.imgGlow}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                      <Image
                        src={group.image}
                        alt={group.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </motion.div>

                  {/* Content side */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="w-full lg:w-1/2 flex"
                  >
                    <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center w-full relative overflow-hidden group/card">
                      <div className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${a.gradient} to-transparent`} />
                      
                      <div className="relative z-10">
                        <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full ${a.iconBg} ${a.iconBorder} border mb-6 shadow-sm`}>
                          <span className={`${a.iconText} font-extrabold uppercase tracking-widest text-[11px]`}>{group.badge}</span>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-5 mb-6">
                          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy-900 font-heading tracking-tight leading-tight">
                            {group.title}
                          </h2>
                        </div>
                        <p className="text-[15px] md:text-base leading-[1.6] text-slate-600 mb-8 font-normal">
                          {group.desc}
                        </p>
                        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                          <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Key Applications</h3>
                          <div className="flex flex-col gap-2 sm:gap-3">
                            {group.links.map((link) => (
                              <Link
                                key={link.id}
                                href={link.id}
                                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-100 transition-all group/link hover:bg-white ${a.linkHoverBorder} ${a.linkHoverShadow} hover:-translate-y-1 transform`}
                              >
                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 transition-colors ${a.iconBg} ${a.linkHoverIconBg}`}>
                                  <CheckCircle2 className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${a.iconText} ${a.linkHoverIconText}`} aria-hidden="true" />
                                </div>
                                <span className={`font-bold text-navy-800 text-sm transition-colors ${a.linkHoverText}`}>{link.title}</span>
                                <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 text-slate-300 ml-auto transition-all group-hover/link:translate-x-1 ${a.linkHoverIconText}`} aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Link
                            href={group.ctaLink}
                            className={`inline-flex w-full items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-navy-950 rounded-xl font-black uppercase tracking-widest text-[13px] sm:text-[14px] transition-all duration-300 shadow-xl transform hover:-translate-y-1 group/btn ${a.btnHover}`}
                          >
                            {group.cta}
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Regional Coverage (NEW) */}
      <section className="py-16 md:py-24 bg-blue-50 relative border-t border-blue-100 overflow-hidden">
        {/* Subtle background pattern to match home page premium feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            badge="Regional Coverage"
            title="Brake Chambers by Region"
            description="BRC ships to distributors, importers, and fleet operators across four major regions. Each region has specific regulatory requirements and operating environments."
            align="center"
            plainText={true}
            theme="light"
            accentColor="amber"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
            {[
              { region: "North America", desc: "FMVSS-121 compliant brake chambers for Class 7–8 trucks, trailers, and transit buses.", link: "/applications/north-america" },
              { region: "Australia & New Zealand", desc: "ADR-compliant brake chambers for road trains, prime movers, B-doubles, and dog trailers.", link: "/applications/australia" },
              { region: "Europe", desc: "ECE R13 compliant brake chambers for HGVs, articulated trucks, and transit fleets.", link: "/applications/europe" },
              { region: "Middle East", desc: "Heavy-duty brake chambers for desert, mining, and construction fleets in UAE, Saudi Arabia, Qatar, and Oman.", link: "/applications/middle-east" }
            ].map((market, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-navy-50 rounded-bl-[100px] -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-125 z-0 pointer-events-none"></div>
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-50 border border-amber-100 shadow-sm flex items-center justify-center mb-4 sm:mb-5 text-amber-600 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-400 transition-all duration-300 transform group-hover:-translate-y-1">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-navy-900 mb-3 relative z-10">{market.region}</h3>
                <p className="text-[14px] md:text-[15px] leading-[1.6] font-normal text-slate-600 relative z-10 flex-grow mb-6">{market.desc}</p>
                
                <Link href={market.link} className="inline-flex items-center text-amber-600 font-extrabold text-xs uppercase tracking-widest hover:text-amber-700 transition-colors relative z-10 mt-auto group/link">
                  View {market.region.split(' ')[0]} Applications <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extreme Environments */}
      <section className="py-16 md:py-24 bg-navy-950 border-y border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5 z-0"></div>
        <AnimatedGridBackground opacity={0.08} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SectionHeader
            badge="Tested for the Extremes"
            title="Brake Chambers Engineered for Extreme Environments"
            description="BRC brake chambers are tested to operate in the environments where other aftermarket chambers fail, from Arctic cold to desert heat, from mining dust to coastal humidity."
            accentColor="amber"
            theme="dark"
            plainText={true}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mt-12"
          >
            {[
              { icon: ThermometerSnowflake, title: "Sub-Zero Rated", desc: "Maintains diaphragm flexibility and prevents cracking at -40°F (-40°C), validated for Arctic linehaul and Canadian winter fleets." },
              { icon: Flame, title: "High-Heat Validated", desc: "Neoprene and internal components tested up to 200°F (93°C) for desert and mining applications." },
              { icon: Droplets, title: "Corrosion Resistant", desc: "500-hour salt spray testing validates protection against winter road salt and coastal humidity." },
              { icon: Activity, title: "Contamination Sealed", desc: "Sealed housings prevent dust, mud, and debris ingress, critical for off-highway and construction use." }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-navy-900 border border-navy-800 rounded-2xl lg:rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-navy-900/10 hover:shadow-2xl hover:bg-navy-800 group flex flex-col relative overflow-hidden transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
                <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-navy-700 group-hover:border-amber-500/50 transition-colors">
                  <stat.icon className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="relative z-10 text-xl font-extrabold text-white mb-3">{stat.title}</h3>
                <p className="relative z-10 text-[14px] md:text-[15px] leading-[1.6] font-normal text-navy-300">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted by Fleets (REPLACES FLEET SUCCESS SNAPSHOT) */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-slate-200">
        <RotatingWatermark />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SectionHeader
            badge="Trusted by Fleets Worldwide"
            title="Brake Chambers Deployed in 30+ Countries"
            description="BRC brake chambers are currently in service across North America, Australia, Europe, and the Middle East, on long-haul fleets, mining operations, transit bus networks, and construction equipment."
            align="center"
            theme="light"
            accentColor="amber"
            plainText={true}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative z-10 mt-12 md:mt-16">
            {[
              { icon: Cog, value: "1.2M+", label: "Units Deployed" },
              { icon: Globe2, value: "30+", label: "Countries Served" },
              { icon: Users, value: "250+", label: "Fleet Customers" },
              { icon: LineChart, value: "100%", label: "Pre-Delivery Tested" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white border border-slate-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl group flex flex-col relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-amber-50 border border-amber-100 shadow-sm rounded-xl flex items-center justify-center mb-4 sm:mb-5 text-amber-600 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-400 transition-all duration-300 transform group-hover:-translate-y-1">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </div>
                <div className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="relative z-10 text-[10px] sm:text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="py-16 md:py-24 bg-[#F1EFE8] relative overflow-hidden">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] z-0 pointer-events-none"></div>

            <div className="relative z-10 flex-1 max-w-2xl text-center md:text-left">
              <SectionHeader
                badge="Application Support"
                title="Not Sure Which Brake Chamber Fits Your Application?"
                description="Send us your vehicle type, axle configuration, and current chamber part number. Our engineering team will identify the exact BRC replacement, or recommend a custom configuration if nothing in our catalog fits."
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
                className="bg-amber-500 text-navy-950 font-black py-4 px-8 rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 text-center uppercase tracking-widest text-[13px] transform hover:-translate-y-1 flex items-center justify-center"
              >
                Ask the Engineering Team <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                href="/oem-cross-reference" 
                className="bg-navy-800 text-white border border-navy-600 font-black py-4 px-8 rounded-xl hover:bg-navy-700 hover:border-navy-500 transition-all text-center uppercase tracking-widest text-[13px] transform hover:-translate-y-1 flex items-center justify-center"
              >
                Search OEM Cross-Reference <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </article>
  );
}
