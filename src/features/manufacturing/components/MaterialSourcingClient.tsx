"use client";

import React from "react";
import {
  ArrowRight,
  Layers,
  Droplet,
  Shield,
  Zap,
  Box,
  CheckCircle2,
  Factory,
  Scale,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHeader from "@/components/layout/PageHeader";
import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";

export default function MaterialSourcingClient() {
  const materials = [
    {
      badge: "Structural Material",
      title: "8-Gauge Steel Housings",
      description:
        "BRC pressure housings are stamped from verified 8-gauge steel, thicker than the 9-gauge and 11-gauge housings used by many aftermarket suppliers. The heavier gauge delivers superior burst strength, improved fatigue resistance, and greater tolerance to road debris impact.",
      icon: <Layers className="w-8 h-8 text-amber-500" />,
      specs: [
        { label: "Material Grade", value: "8-gauge (4.2mm) cold-rolled steel" },
        {
          label: "Property Focus",
          value: "Burst strength, fatigue resistance",
        },
        { label: "Application", value: "Pressure housing (top section)" },
        {
          label: "Quality Check",
          value:
            "Steel verified for grade, thickness, and hardness before entering the press line",
        },
      ],
      accent: "amber",
    },
    {
      badge: "Sealing Material",
      title: "High-Strength Neoprene Rubber Diaphragms",
      description:
        "BRC brake chamber diaphragms are molded from high-strength neoprene rubber compounds reinforced with nylon fabric. They remain flexible at -40°F and resist thermal degradation up to 200°F, delivering consistent stroke response across extreme operating environments.",
      icon: <Droplet className="w-8 h-8 text-navy-500" />,
      specs: [
        {
          label: "Material Type",
          value: "Neoprene rubber with nylon fabric reinforcement",
        },
        {
          label: "Property Focus",
          value: "Flexibility, thermal resistance, sealing",
        },
        { label: "Application", value: "Internal diaphragm" },
        {
          label: "Quality Check",
          value:
            "Every diaphragm batch is tensile-tested and flex-tested before assembly",
        },
      ],
      accent: "navy",
    },
    {
      badge: "Corrosion Protection",
      title: "Dual-Layer Corrosion Defense",
      description:
        "Every internal return spring and housing interior passes through a multi-stage cathodic electrodeposition (e-coat) process, followed by a heavy epoxy topcoat. This dual-layer defense prevents the internal rust flaking that is the leading cause of center seal failure in aftermarket brake chambers.",
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      specs: [
        { label: "Process", value: "Cathodic e-coat + epoxy topcoat" },
        {
          label: "Property Focus",
          value: "Corrosion resistance, anti-flaking",
        },
        {
          label: "Application",
          value: "Internal return springs, housing interiors",
        },
        {
          label: "Quality Check",
          value:
            "Coating thickness is measured and logged for every production batch",
        },
      ],
      accent: "amber",
    },
    {
      badge: "Internal Mechanism",
      title: "CNC-Machined Push-Rods",
      description:
        "BRC push-rods are CNC-machined from high-tensile steel to maintain straight-line tolerance across the full stroke. This prevents the binding and uneven wear that damages center seals and shortens brake chamber service life.",
      icon: <Zap className="w-8 h-8 text-navy-500" />,
      specs: [
        { label: "Material Type", value: "High-tensile steel" },
        { label: "Process", value: "CNC machining to precise tolerance" },
        { label: "Property Focus", value: "Linear travel, anti-binding" },
        {
          label: "Application",
          value: "Push-rod (connects chamber to slack adjuster)",
        },
        {
          label: "Quality Check",
          value: "Every push-rod is measured against tolerance before assembly",
        },
      ],
      accent: "navy",
    },
    {
      badge: "Non-Pressure Housings",
      title: "ADC12 Aluminum Die-Cast Ingots",
      description:
        "BRC sources ADC12-grade aluminum alloy ingots specifically formulated for high-pressure die casting. This ensures non-pressure housings are free of structural porosity and micro-cracks, delivering consistent strength without the weight of steel.",
      icon: <Box className="w-8 h-8 text-amber-500" />,
      specs: [
        { label: "Material Grade", value: "ADC12 aluminum alloy" },
        { label: "Process", value: "High-pressure die casting" },
        {
          label: "Property Focus",
          value: "Lightweight strength, porosity-free",
        },
        {
          label: "Application",
          value: "Non-pressure housings (bottom section)",
        },
        {
          label: "Quality Check",
          value:
            "Every aluminum batch is spectro-analyzed for alloy composition before casting",
        },
      ],
      accent: "amber",
    },
  ];

  return (
    <article className="min-h-screen bg-slate-50 font-sans pb-0 overflow-x-clip">
      {/* SECTION 1 - HERO */}
      <PageHeader
        badge="Supply Chain & Materials"
        badgeIcon={Factory}
        title="Brake Chamber Material Sourcing: Steel, Rubber & Aluminum"
        description="Brake chamber lifespan starts with material quality. BRC sources 8-gauge steel, high-strength neoprene rubber compounds, and ADC12 aluminum ingots, and qualifies every batch before it enters production."
        imageSrc="/images/brc_brakechamber_aftermarket.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Manufacturing", href: "/manufacturing" },
          {
            label: "Material Sourcing",
            href: "/manufacturing/material-sourcing",
          },
        ]}
      />

      {/* SECTION 2 - MATERIALS OVERVIEW */}
      <section className="py-12 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <SectionHeader
            badge="Material Superiority"
            title={
              <>
                How We Source Brake Chamber{" "}
                <span className="text-amber-500">Materials</span>
              </>
            }
            description="Brake chamber lifespan is determined by the quality of its raw materials. Every BRC chamber is built with heavy-gauge steel, high-strength rubber compounds, and pressure-cast aluminum, verified for grade, thickness, and hardness before production begins."
            align="center"
            className="max-w-4xl mx-auto"
          />
          <div className="mt-10 flex justify-center w-full px-4 sm:px-0">
            <Link
              href="/manufacturing/process"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 text-amber-600 font-extrabold hover:text-amber-700 uppercase tracking-widest text-[11px] sm:text-[13px] bg-amber-50 px-6 sm:px-8 py-4 rounded-xl transition-all hover:bg-amber-100 hover:-translate-y-1 w-full sm:w-auto text-center shadow-sm"
            >
              <span>View Manufacturing Process</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT - MATERIAL CARDS */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {materials.map((mat, idx) => {
            const isAmber = mat.accent === "amber";
            const isLast = idx === materials.length - 1;
            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${isLast ? "lg:col-span-2 lg:w-3/4 lg:mx-auto" : ""}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[100px] -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-125 z-0"></div>

                <div className="relative z-10 flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-md">
                    <div className="w-7 h-7 md:w-8 md:h-8 [&>svg]:w-full [&>svg]:h-full">
                      {mat.icon}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest mb-1 text-amber-600">
                      {mat.badge}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-navy-900 tracking-tight leading-tight">
                      {mat.title}
                    </h3>
                  </div>
                </div>

                <p className="relative z-10 text-[14px] md:text-[15px] leading-[1.6] text-slate-600 font-normal mb-8">
                  {mat.description}
                </p>

                <div className="relative z-10 mt-auto w-full bg-slate-50/80 rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-100 space-y-3">
                  {mat.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isAmber ? "text-amber-500" : "text-navy-500"}`}
                      />
                      <span className="text-slate-600 text-[14px] md:text-[15px] leading-[1.6]">
                        <strong className="text-navy-900 font-bold">
                          {spec.label}:{" "}
                        </strong>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* SECTION 8 - SOURCING PHILOSOPHY */}
      <section className="bg-navy-950 relative overflow-hidden border-t border-navy-800 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5"></div>
        <AnimatedGridBackground opacity={0.08} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>
        <div className="px-6 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24">
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl border border-navy-700 flex items-center justify-center shrink-0 shadow-xl shadow-navy-950">
              <Scale className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
            </div>
            <div className="flex-1 text-left">
              <SectionHeader
                badge="Our Approach"
                title="Why Material Sourcing Matters for Brake Chambers"
                align="left"
                theme="dark"
                accentColor="amber"
                plainText={true}
                className="!mb-4"
              />
              <div className="space-y-4 text-[14px] md:text-[15px] leading-[1.6] text-navy-200 font-normal">
                <p>
                  A brake chamber is only as strong as its weakest material.
                  Underbuilt steel, low-grade rubber, or contaminated aluminum
                  will fail earlier than any design mistake.
                </p>
                <p>
                  BRC builds every chamber from materials qualified by grade,
                  thickness, and composition, not by price alone. This means you
                  get aftermarket chambers that last as long as the OEM parts
                  they replace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 - BOTTOM CTA */}
      <section className="bg-[#F1EFE8] py-16 md:py-24 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <SectionHeader
            badge="Engineering Collaboration"
            title="Need Custom Brake Chamber Materials?"
            description="BRC can source and qualify alternative steel grades, rubber compounds, or aluminum alloys for custom brake chamber applications. Send us your material specifications, and our engineering team will respond within 24 hours."
            className="!mb-8"
            plainText={true}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white border border-slate-200 text-navy-900 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 shadow-sm uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Contact Engineering <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/manufacturing/research-development"
              className="inline-flex items-center justify-center bg-amber-500 text-navy-950 font-extrabold px-4 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Explore Brake Chamber R&D <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
