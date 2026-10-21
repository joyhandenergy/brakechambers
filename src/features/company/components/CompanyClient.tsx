"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, ArrowRight, CheckCircle2, Globe2, Users, Cog, Factory, Target, MapPin, ShieldCheck, Handshake, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';
import RotatingWatermark from '@/components/ui/RotatingWatermark';

export default function CompanyClient() {
  return (
    <article className="min-h-screen bg-slate-50 font-sans overflow-x-clip">
      {/* SECTION 1: PAGE HERO */}
      <PageHeader
        badge="Chinese Manufacturer"
        badgeIcon={Building2}
        title="Chinese Manufacturer of OEM-Quality Brake Chambers"
        description="BRC Brake Chambers is a Zhejiang-based manufacturer of OEM-quality aftermarket brake chambers. Founded on deep engineering, vertically integrated production, and a single mission: give fleets in North America, Australia, Europe, and the Middle East a factory-direct alternative to overpriced OEM parts."
        imageSrc="/images/pageheaders/brc_about.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Story' }
        ]}
      />

      {/* SECTION 2: OUR STORY */}
      <section className="relative z-20 bg-white sm:rounded-t-[3rem] shadow-[0_-20px_50px_rgba(15,23,42,0.06)] -mt-12 sm:-mt-24 border-b border-slate-200 px-4 sm:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <SectionHeader
                badge="Our Story"
                title="How BRC Brake Chambers Began"
                align="left"
                plainText={true}
                theme="light"
                accentColor="amber"
                className="!mb-6"
              />
              <div className="space-y-6 text-slate-600 text-[15px] md:text-base leading-[1.6] font-normal">
                <p>
                  Zhejiang GAP Auto Parts Co., Ltd. (operating globally as BRC Brake Chambers) was founded to solve one problem: international fleets were paying OEM prices for aftermarket brake chambers, or buying cheap aftermarket parts that failed early.
                </p>
                <p>
                  We started with a single production line focused on Type 30 and Type 30/30D brake chambers for North American heavy-duty trucks. That focus built our reputation: two decades of producing only what we could prove.
                </p>
                <p>
                  Today, BRC operates a vertically integrated manufacturing facility in Zhejiang, China, exporting brake chambers to distributors across North America, Australia, Europe, and the Middle East, serving 30+ countries in total. But the founding principle has not changed: every chamber we ship is engineered to perform identically to the OEM part it replaces, at factory-direct pricing.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative h-[400px] sm:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image src="/images/brc_brakechamber_building.jpg" alt="BRC Manufacturing Building" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-all duration-700 hover:scale-105" />
                {/* Subtle vignette gradient only at bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950/60 to-transparent h-28 pointer-events-none"></div>

                {/* Location Pill Tag (Top Right) */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-navy-950 border border-white/60 shadow-lg">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> Zhejiang, China
                  </span>
                </div>

                {/* Compact Floating Capsule (Bottom Left) in former white UI */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 max-w-[calc(100%-2rem)] sm:max-w-xs">
                  <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 pl-5 rounded-2xl shadow-xl border border-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[11px] font-extrabold tracking-wider uppercase text-navy-900">BRC Production Facility</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-snug">
                      Vertically integrated manufacturing & testing center for OEM-spec brake chambers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="hidden lg:block absolute -top-6 -right-6 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-60 -z-10"></div>
              <div className="hidden lg:block absolute -bottom-6 -left-6 w-40 h-40 bg-navy-100 rounded-full blur-3xl opacity-60 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR TEAM */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden border-b border-slate-200">
        <RotatingWatermark />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SectionHeader
            badge="Our Team"
            title="The People Behind BRC Brake Chambers"
            description="BRC employs exactly 104 manufacturing specialists, quality engineers, and export professionals across our Zhejiang facility. The team combines decades of automotive manufacturing experience with a shared focus: producing brake chambers that perform as well as the OEM parts they replace."
            align="center"
            plainText={true}
            theme="light"
            accentColor="amber"
          />
          <div className="space-y-20 mt-16">
            {/* Stats Grid - Individual Elevated Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
              {[
                { icon: Users, stat: "104", text: "Total Employees" },
                { icon: Cog, stat: "Dedicated", text: "Engineering & R&D Staff" },
                { icon: Globe2, stat: "Dedicated", text: "Export & Logistics Team" },
                { icon: Factory, stat: "In-House", text: "Quality Assurance Lab" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white border border-slate-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl group flex flex-col relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-amber-50 border border-amber-100 shadow-sm rounded-xl flex items-center justify-center mb-4 sm:mb-5 text-amber-600 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-400 transition-all duration-300 transform group-hover:-translate-y-1">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  </div>
                  <div className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black text-navy-900 mb-1 sm:mb-2 tracking-tight">
                    {item.stat}
                  </div>
                  <div className="relative z-10 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">
                    {item.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Leadership Header */}
            <div className="text-center max-w-3xl mx-auto pt-10 border-t border-slate-200">
              <h3 className="text-3xl font-black text-navy-900 mb-4 tracking-tight">Leadership Team</h3>
              <p className="text-slate-600 text-[15px] md:text-base leading-[1.6] font-normal">Driven by experts in commercial vehicle braking systems, metallurgy, and lean manufacturing.</p>
            </div>

            {/* Leadership Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
              {[
                {
                  name: 'Mr. Lee',
                  role: 'Chief Engineer',
                  bio: '30+ years of engineering leadership. He ensures every brake chamber meets uncompromising global safety standards.',
                  img: '/images/company/brc-mr-lee-chief-engineer.jpg'
                },
                {
                  name: 'Mr. Gan',
                  role: 'General Manager',
                  bio: 'Directs BRC’s facility operations, driving lean manufacturing processes and strategic global supply chain expansion.',
                  img: '/images/company/brc-mr-gan-general-manager.jpg'
                },
                {
                  name: 'Mr. Xu',
                  role: 'Aluminum Die Casting Master',
                  bio: '28 years of specialized mastery, guaranteeing flawless structural integrity and absolute precision in every component.',
                  img: '/images/company/brc-mr-xu-aluminum-die-casting-master.jpg'
                },
                {
                  name: 'Junlin',
                  role: 'IT Engineer',
                  bio: 'Leads digital infrastructure and facility automation, keeping BRC at the cutting edge of modern industrial tech.',
                  img: '/images/company/brc--junlin-it-engineer.jpg'
                }
              ].map((leader, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="bg-white rounded-[1.5rem] p-3 sm:p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:border-amber-500 hover:-translate-y-1 text-center flex flex-col items-center group h-full justify-start"
                >
                  <div className="w-full aspect-square mx-auto bg-slate-200 rounded-xl mb-4 sm:mb-5 overflow-hidden relative shadow-inner shrink-0">
                    <img src={leader.img} alt={leader.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="px-2 pb-2">
                    <h3 className="text-lg font-bold text-navy-900 mb-1">{leader.name}</h3>
                    <p className="text-amber-600 text-[11px] font-bold uppercase tracking-widest mb-3">{leader.role}</p>
                    <div className="w-8 h-[2px] bg-slate-100 mx-auto mb-3 shrink-0 rounded-full"></div>
                    <p className="text-slate-500 text-[13px] leading-[1.5] mb-0 font-normal">
                      {leader.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Group Photo Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative group border border-slate-200"
            >
              <img
                src="/images/brc_brakechamber_aftermarket.jpg"
                alt="BRC Leadership Team on the manufacturing floor"
                className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-[10s] group-hover:scale-110 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-white text-3xl md:text-4xl font-black mb-3 tracking-tight">United by Precision</h3>
                <p className="text-navy-100 max-w-2xl text-[15px] md:text-base leading-[1.6] font-normal">
                  Our diverse executive board combines decades of tier-1 automotive manufacturing experience with forward-thinking engineering to redefine commercial vehicle safety.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MISSION & VALUES */}
      <section className="py-16 md:py-24 bg-white relative border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative order-2 lg:order-1"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image src="/images/brc_brakechamber_aftermarket.jpg" alt="BRC Mission" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-navy-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="w-24 h-24 text-white/80" strokeWidth={1} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8 order-1 lg:order-2"
            >
              <SectionHeader
                badge="What Drives Us"
                title="Our Mission as a Brake Chamber Manufacturer"
                description="BRC exists to give distributors and fleet operators across North America, Australia, Europe, and the Middle East an alternative to overpriced OEM brake chambers, without the quality compromises that define most low-cost aftermarket suppliers."
                align="left"
                plainText={true}
                theme="light"
                accentColor="amber"
                className="!mb-6"
              />

              <div className="space-y-6">
                {[
                  { icon: Target, title: "Precision Over Volume", desc: "Every chamber is engineered to fit, form, and function like the OEM part it replaces." },
                  { icon: Building2, title: "Factory-Direct Transparency", desc: "No middlemen, no hidden markups. Our customers buy from the factory floor." },
                  { icon: Handshake, title: "Long-Term Partnerships", desc: "We build relationships with distributors, not one-time transactions." },
                  { icon: CheckSquare, title: "Manufacturing Discipline", desc: "IATF 16949 quality systems govern every stage of production." }
                ].map((value, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-14 h-14 rounded-[1.25rem] bg-white border border-slate-100/60 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-amber-200 group-hover:scale-110 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                      <value.icon className="w-6 h-6 text-amber-500 transition-colors" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[15px] md:text-base text-navy-900 tracking-tight mb-1">{value.title}</h4>
                      <p className="text-slate-600 text-[14px] leading-[1.6]">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: GLOBAL REACH */}
      <section className="py-16 md:py-24 bg-slate-50 relative border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            badge="Global Reach"
            title="Brake Chambers Shipped to 30+ Countries"
            description="BRC exports brake chambers to distributors, importers, and fleet operators across four major regions."
            align="center"
            plainText={true}
            theme="light"
            accentColor="amber"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 md:mt-16">
            {[
              { region: "North America", desc: "Serving distributors and fleet operators in the United States, Canada, and Mexico. FMVSS-121 compliant chambers for Class 7–8 trucks and trailers." },
              { region: "Australia & New Zealand", desc: "Brake chambers for road trains, prime movers, B-doubles, and dog trailers. ADR-compliant configurations available for Australian heavy vehicle fleets." },
              { region: "Europe", desc: "ECE R13 compliant brake chambers for HGVs and articulated trucks. Serving distributors across the UK, Germany, Netherlands, and wider EU markets." },
              { region: "Middle East", desc: "Heavy-duty brake chambers for desert, mining, and construction fleets. Serving importers and distributors in UAE, Saudi Arabia, Qatar, and Oman." }
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
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-50 border border-amber-100 shadow-sm flex items-center justify-center mb-4 sm:mb-5 relative z-10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-400 transition-all duration-300 transform group-hover:-translate-y-1">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-navy-900 mb-3 relative z-10">{market.region}</h3>
                <p className="text-slate-600 text-[14px] font-normal leading-[1.6] relative z-10 flex-grow">{market.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: STANDARDS & COMPLIANCE */}
      <section className="py-16 md:py-24 bg-navy-950 relative overflow-hidden border-t border-navy-800">
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5 z-0"></div>
        <AnimatedGridBackground opacity={0.08} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SectionHeader
            badge="Standards & Compliance"
            title="Manufacturing to Global Brake Chamber Standards"
            description="BRC operates under IATF 16949-aligned quality management systems and produces brake chambers tested to FMVSS-121 (North America), ECE R13 (Europe), and ADR (Australia) standards."
            align="center"
            theme="dark"
            accentColor="amber"
            plainText={true}
          />

          <div className="mt-12 mb-16">
            <div className="bg-navy-900/50 backdrop-blur-sm border border-navy-700/50 rounded-3xl p-6 sm:p-10 flex flex-wrap justify-center items-center gap-x-10 gap-y-6 shadow-xl">
              {[
                "Manufactured to IATF 16949 Standards",
                "FMVSS-121 Compliant",
                "ECE R13 Compliant",
                "ADR Compliant",
                "SAE J1469 Compliant"
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-[15px] sm:text-base whitespace-nowrap">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/manufacturing/quality-assurance" className="inline-flex items-center justify-center bg-amber-500 text-navy-950 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto group">
              View Quality Assurance Lab <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: BOTTOM CTA */}
      <section className="py-16 md:py-24 bg-[#F1EFE8] relative overflow-hidden">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] z-0 pointer-events-none"></div>

            <div className="relative z-10 flex-1 max-w-2xl text-center md:text-left">
              <SectionHeader
                badge="Work With BRC"
                title={<>Ready to Source Brake Chambers <span className="text-amber-400">Direct From the Factory?</span></>}
                description="Whether you're looking for a supplier for your distribution business, a private label partner, or a custom OEM program, BRC is ready to quote."
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
                Contact Sales Team <ArrowRight className="inline-block w-4 h-4 ml-2 -mt-1" />
              </Link>
              <Link
                href="/quote"
                className="bg-navy-800 text-white border border-navy-600 font-black py-4 px-8 rounded-xl hover:bg-navy-700 hover:border-navy-500 transition-all text-center uppercase tracking-widest text-[13px] transform hover:-translate-y-1"
              >
                Request Factory Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
