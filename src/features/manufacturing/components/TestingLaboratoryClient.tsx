"use client";

import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  ArrowRight,
  Microscope,
  Thermometer,
  ShieldAlert,
  Activity,
  FlaskConical,
  Gauge,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/layout/PageHeader";
import IconBox from "@/components/ui/IconBox";
import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";

export default function TestingLaboratoryClient() {
  const stats = [
    { value: "200K / 1M", label: "Cycle Tests (Service/Parking)", icon: Activity },
    { value: "500-Hour", label: "Salt Spray Testing", icon: ShieldAlert },
    { value: "-40°F to 200°F", label: "Thermal Validation", icon: Thermometer },
    { value: "100%", label: "End-of-Line Pneumatic Testing", icon: Gauge },
  ];

  const tests = [
    {
      title: "Lifecycle Endurance Testing",
      description:
        "Sampled BRC brake chambers are subjected to continuous actuate/release cycles under maximum operating pressure: 200,000 cycles for service chambers and 1,000,000 cycles for parking chambers. Any units that show loss of stroke response or air leakage before the full cycle count are rejected.",
      icon: <Activity />,
      badge: "Fatigue & Durability",
    },
    {
      title: "Salt Spray Corrosion Chambers",
      description:
        "Chambers are placed in inline saline fog environments for 500 hours, simulating years of exposure to winter road salt and coastal humidity. This is well beyond the ASTM B117 industry baseline for aftermarket brake components.",
      icon: <ShieldAlert />,
      badge: "Corrosion Resistance",
    },
    {
      title: "Extreme Temperature Chambers",
      description:
        "Neoprene diaphragms and internal springs are tested in thermal chambers spanning -40°F to 200°F (-40°C to 93°C). This validates flexibility in Arctic cold and structural integrity in desert heat.",
      icon: <Thermometer />,
      badge: "Thermal Performance",
    },
    {
      title: "100% End-of-Line Pneumatic Testing",
      description:
        "We do not rely on batch testing. Every brake chamber leaving our factory is individually pneumatic leak-tested on the assembly line. If it fails a fraction of a PSI, it is scrapped.",
      icon: <Microscope />,
      badge: "Zero-Defect Policy",
    },
    {
      title: "Burst Pressure Validation",
      description:
        "Every housing design undergoes destructive burst pressure testing at 4× its rated operating pressure. This validates structural integrity under catastrophic failure scenarios, the foundation of our FMVSS-121 compliance claim.",
      icon: <Gauge />,
      badge: "Structural Safety",
    },
    {
      title: "Diaphragm Ozone & Aging Testing",
      description:
        "Rubber diaphragms are exposed to accelerated ozone environments, UV radiation, and thermal cycling, simulating extended outdoor aging. Compounds that crack, harden, or lose flexibility are rejected before production.",
      icon: <FlaskConical />,
      badge: "Material Longevity",
    },
  ];

  const equipment = [
    {
      name: "Pneumatic Cycle Test Rigs",
      detail: "Automated 24/7 cycle testing at 150 PSI operating pressure.",
    },
    {
      name: "Environmental Salt Chambers",
      detail: "500-hour ASTM B117 salt spray exposure.",
    },
    {
      name: "Climate Simulation Chambers",
      detail: "-40°C to +150°C thermal cycling range.",
    },
    {
      name: "Burst Pressure Test Fixtures",
      detail: "Up to 600 PSI destructive pressure testing.",
    },
    {
      name: "CMM Dimensional Inspection",
      detail: '±0.001" measurement accuracy on critical tolerances.',
    },
    {
      name: "Pneumatic Leak Detection",
      detail: "100% inline leak testing, zero batch sampling.",
    },
  ];

  return (
    <article className="min-h-screen bg-slate-50 font-sans pb-0 overflow-x-clip">
      <PageHeader
        badge="Quality Assurance"
        title="Brake Chamber Quality Assurance: Inside Our Testing Lab"
        description="Every BRC brake chamber is pressure-tested, cycle-tested, and corrosion-tested before it ships. Our in-house lab validates each unit under our IATF 16949-aligned quality system, because a brake chamber that fails on the road is not an option."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Manufacturing", href: "/manufacturing" },
          { label: "Quality Assurance", href: "/manufacturing/quality" },
        ]}
      />
      <div className="space-y-0">
        {/* Stats */}
        <section className="py-12 md:py-16 bg-blue-50 border-b border-slate-200 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-navy-900 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-navy-800 shadow-xl shadow-navy-900/10 hover:shadow-2xl hover:bg-navy-800 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                  {/* The Top Right Circle Decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-navy-800/30 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 z-0"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 text-amber-400 flex items-center justify-center mb-4 md:mb-6 shadow-inner border border-navy-700 group-hover:border-amber-500/50 transition-colors duration-300">
                      <stat.icon
                        className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>{" "}
        {/* Test Protocols Section */}
        <section className="py-16 md:py-24 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="w-full">
              <SectionHeader
                badge="Zero-Defect Manufacturing"
                title={
                  <>
                    Why Brake Chamber Quality Assurance{" "}
                    <span className="text-amber-500 whitespace-nowrap">
                      Matters
                    </span>
                  </>
                }
                description="A loaded commercial vehicle cannot afford a brake failure, whether that is 36,000 kg on a European motorway or 80,000 lbs on an American interstate. That is why our in-house testing lab is the final checkpoint between our production line and your fleet."
                className="!mb-8"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map((test, idx) => {
                  const isPrimary = idx % 2 === 0;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.5 }}
                      className={`bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden ${isPrimary ? "hover:border-amber-400" : "hover:border-navy-400"}`}
                    >
                      {/* Top Right Circle Decoration */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 ${isPrimary ? "bg-amber-50/60" : "bg-slate-50/60"} rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 z-0 pointer-events-none`}
                      ></div>

                      <div className="relative z-10 flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 ${isPrimary ? 'text-amber-500 group-hover:bg-amber-50 group-hover:border-amber-200' : 'text-slate-500 group-hover:bg-slate-50 group-hover:border-slate-200'} transition-all duration-300`}>
                          <div className="w-7 h-7 md:w-8 md:h-8 [&>svg]:w-full [&>svg]:h-full group-hover:scale-110 transition-transform duration-300">
                            {test.icon}
                          </div>
                        </div>
                        <div
                          className={`inline-block px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest bg-white/50 backdrop-blur-sm ${isPrimary ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-slate-50 border-slate-200 text-slate-500"}`}
                        >
                          {test.badge}
                        </div>
                      </div>
                      <h3
                        className={`relative z-10 text-xl md:text-2xl font-bold text-navy-900 mb-3 tracking-tight transition-colors ${isPrimary ? "group-hover:text-amber-600" : "group-hover:text-slate-600"}`}
                      >
                        {test.title}
                      </h3>
                      <p className="relative z-10 text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal">
                        {test.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Equipment & Quality Section */}
        </section>
        <section className="py-16 md:py-24 bg-blue-50/50 border-t border-slate-100 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-12">
              <SectionHeader
                badge="Laboratory Equipment"
                title="Brake Chamber Testing Equipment"
                description="Our lab runs precision test equipment around the clock. Every instrument is calibrated annually to traceable standards."
                accentColor="amber"
                plainText={true}
                className="!mb-6"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {equipment.map((item, idx) => {
                const isPrimary = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`bg-white flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl border border-slate-100 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:-translate-y-1 ${isPrimary ? "hover:border-amber-400 hover:bg-amber-50/10" : "hover:border-navy-400 hover:bg-navy-50/10"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${isPrimary ? "bg-amber-50 border-amber-100" : "bg-navy-50 border-navy-100"}`}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${isPrimary ? "text-amber-500" : "text-navy-500"}`}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-navy-900 text-[15px] md:text-base mb-1 tracking-tight">
                        {item.name}
                      </div>
                      <div className="text-[14px] md:text-[15px] leading-[1.6] text-slate-500 font-normal">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* ISO Callout Banner */}
            <div className="mt-20 -mx-4 sm:mx-0 bg-navy-950 rounded-none sm:rounded-3xl md:rounded-[2.5rem] px-6 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 relative overflow-hidden border-y sm:border border-navy-800 shadow-2xl">
              <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5"></div>
              <AnimatedGridBackground opacity={0.08} />
              <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-center max-w-5xl mx-auto">
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl flex items-center justify-center border border-navy-700 shadow-xl shadow-navy-950">
                      <Cpu className="w-7 h-7 text-amber-400" />
                    </div>
                    <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-gradient-to-r from-navy-800 to-navy-900 border border-navy-700 text-amber-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-navy-950 whitespace-nowrap">
                      Quality Management System
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight leading-tight">
                    IATF 16949-Aligned Quality Management System
                  </h2>
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-navy-200 font-normal">
                    Every brake chamber test result is logged in our quality
                    management system, which operates to IATF 16949-aligned
                    standards. This provides full traceability from raw material
                    intake to finished chamber packaging, for every batch we
                    produce.
                  </p>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                    <div className="bg-gradient-to-b from-navy-800 to-navy-900 rounded-2xl p-6 border border-navy-700 text-center md:text-left min-w-0 md:min-w-[240px] shadow-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="text-4xl font-black text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
                        100%
                      </div>
                      <div className="text-xs font-bold text-navy-300 uppercase tracking-widest">
                        Traceability
                      </div>
                    </div>
                    <div className="bg-gradient-to-b from-navy-800 to-navy-900 rounded-2xl p-6 border border-navy-700 text-center md:text-left min-w-0 md:min-w-[240px] shadow-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="text-4xl font-black text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
                        Strict
                      </div>
                      <div className="text-xs font-bold text-navy-300 uppercase tracking-widest">
                        Internal Quality Audits
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Bottom CTA */}
        <section className="bg-[#F1EFE8] py-16 md:py-24 border-y border-slate-200 ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <SectionHeader
              badge="Quality You Can Verify"
              title="Need a Sample to Verify Our Quality?"
              description="Order an evaluation sample directly from our factory. Test it against your current brake chamber brand: pressure, stroke, fit, and finish. If it does not meet your standard, you don't place an order."
              className="!mb-8"
              plainText={true}
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-amber-500 text-navy-950 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Order Evaluation Sample <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/oem-cross-reference"
                className="inline-flex items-center justify-center bg-white border border-slate-200 text-navy-900 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 shadow-sm uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto"
              >
                View OEM Cross-Reference <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
