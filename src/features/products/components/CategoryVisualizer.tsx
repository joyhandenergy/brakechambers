"use client";

import React from 'react';
import { ShieldEllipsis, Wrench, Disc } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';

export default function CategoryVisualizer({ type }: { type: 'spring' | 'service' | 'parts' | 'adp' }) {
  const content = {
    service: {
      badge: "Stroke Length Comparison",
      title: "Reserve Stopping Power.",
      desc: "Service brakes can fade under heavy use. Long Stroke chambers provide an additional reserve of pushrod travel, ensuring reliable braking even when drums expand from extreme heat.",
      tab1: "Standard Stroke",
      tab2: "Long Stroke",
      highlight1Title: "Standard Application",
      highlight1Desc: "Ideal for standard highway operations and fleets with strict preventative maintenance schedules. Reliable, consistent daily performance.",
      highlight2Title: "Enhanced Safety Margin",
      highlight2Desc: "Provides up to 3 inches of extra stroke. Critical for severe duty cycles, steep grades, and maximizing lining wear life.",
      img: "/images/products/brc-service-brake-chamber-parts-diagram.jpg",
      alt: "Labeled cutaway diagram showing the internal components of a single service brake chamber.",
      icon: ShieldEllipsis,
    },
    spring: {
      badge: "Dual Chamber System",
      title: "Fail-Safe Parking Power.",
      desc: "Spring brakes combine a standard service chamber with an emergency parking spring. If air pressure is lost, the heavy-duty mechanical spring automatically applies the brakes.",
      tab1: "Service Braking",
      tab2: "Emergency / Parking",
      highlight1Title: "Air Applied",
      highlight1Desc: "Air pressure pushes the diaphragm to apply service brakes during normal driving. Completely independent from the parking spring.",
      highlight2Title: "Mechanical Spring Applied",
      highlight2Desc: "When air is released (or lost), the powerful steel spring expands to mechanically lock the brakes. A vital fail-safe mechanism.",
      img: "/images/products/brc-spring-brake-chamber-cutaway-diagram.jpg",
      alt: "Technical 2D cross-section diagram of a commercial truck spring brake chamber with component labels.",
      icon: ShieldEllipsis,
    },
    parts: {
      badge: "Modular Components",
      title: "Cost-Effective Rebuilds.",
      desc: "Instead of replacing entire assemblies, our piggyback kits and replacement diaphragms allow fleets to perform rapid, modular maintenance that saves money and reduces downtime.",
      tab1: "Full Assembly",
      tab2: "Piggyback Kit",
      highlight1Title: "Complete Replacement",
      highlight1Desc: "Replacing the entire chamber ensures all components are new. This is the ideal solution for severely corroded or damaged units.",
      highlight2Title: "Smart Maintenance",
      highlight2Desc: "Replace only the failed parking section. Reuses the existing service housing and pushrod, cutting costs by up to 40%.",
      img: "/images/products/brc-brake-chamber-parts-kit-components.jpg",
      alt: "Knolling diagram layout of commercial brake chamber replacement hardware parts and diaphragm kit.",
      icon: Wrench,
    },
    adp: {
      badge: "Air Disc Actuators",
      title: "Consistent Linear Force.",
      desc: "Air disc brake actuators translate air pressure into direct, linear mechanical force. This drives the caliper pistons to squeeze the rotor, delivering superior stopping distance and virtually eliminating brake fade.",
      tab1: "Drum Actuation",
      tab2: "Disc Actuation",
      highlight1Title: "S-Cam Rotation",
      highlight1Desc: "Traditional drum brakes use the pushrod to rotate an S-cam, which pushes brake shoes outward against the drum.",
      highlight2Title: "Direct Caliper Force",
      highlight2Desc: "Disc actuators push directly into the caliper mechanism, resulting in faster response times and perfectly even pad wear.",
      img: "/images/products/brc-air-disc-brake-actuator-adb-diagram.jpg",
      alt: "Air disc brake actuator (ADB) technical illustration with parts labeling.",
      icon: Disc,
    }
  };

  const data = content[type];
  const Icon = data.icon;

  return (
    <div className="-mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-full mt-10 md:mt-16 mb-8 rounded-none sm:rounded-[2rem] lg:rounded-[2.5rem] bg-navy-950 border-y border-navy-800 sm:border sm:border-navy-800 shadow-2xl relative overflow-hidden flex flex-col items-center">
      
      {/* Background image & Animated Grid Pattern (Consistent with other dark sections) */}
      <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5 z-0 pointer-events-none"></div>
      <AnimatedGridBackground opacity={0.08} />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>

      {/* Header (Top Center) */}
      <div className="relative z-10 w-full max-w-4xl px-6 md:px-8 pt-10 md:pt-16 pb-6 md:pb-8 flex flex-col items-center text-center">
        <SectionHeader
          badge={<><Icon className="w-3.5 h-3.5 mr-2 inline-block text-amber-500 relative -top-[1px]" /> {data.badge}</>}
          title={data.title}
          description={data.desc}
          align="center"
          theme="dark"
          accentColor="amber"
          className="!mb-0"
        />
      </div>

      {/* Visual Grid Area */}
      <div className="relative w-full max-w-[1920px] px-4 md:px-12 pb-10 md:pb-20 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 z-10">
        
        {/* Card 1 (Left Flank) */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end order-2 lg:order-1">
          <div className="w-full md:max-w-sm bg-navy-900 border border-navy-800 rounded-2xl md:rounded-[2rem] p-6 md:p-8 shadow-xl shadow-navy-900/10 hover:shadow-2xl hover:bg-navy-800 group flex flex-col relative overflow-hidden transform hover:-translate-y-1 transition-all duration-500">
             {/* Subtle amber ambient glow on hover */}
             <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

             <div className="relative z-10 bg-gradient-to-br from-navy-800 to-navy-900 shadow-inner border border-navy-700 rounded-xl py-1.5 px-3 mb-4 self-start flex items-center">
               <span className="flex items-center gap-2 text-amber-400 uppercase tracking-widest text-[11px] sm:text-xs font-black">
                 <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                 {data.tab1}
               </span>
             </div>
             <h3 className="relative z-10 text-white text-xl md:text-2xl font-extrabold mb-3 md:mb-4 leading-snug">{data.highlight1Title}</h3>
             <p className="relative z-10 text-slate-200 text-sm md:text-base leading-relaxed font-normal">{data.highlight1Desc}</p>
          </div>
        </div>

        {/* Center Diagram (Appears First on Mobile) */}
        <div className="w-full lg:w-1/3 flex justify-center items-center py-4 lg:py-0 relative order-1 lg:order-2 mb-4 lg:mb-0">
          <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl md:rounded-[2rem] p-3 sm:p-4 shadow-2xl border border-slate-200/20 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
            <img 
              src={data.img} 
              alt={data.alt}
              className="w-full h-auto max-h-[320px] md:max-h-[360px] object-contain transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Card 2 (Right Flank) */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start order-3 lg:order-3">
          <div className="w-full md:max-w-sm bg-navy-900 border border-navy-800 rounded-2xl md:rounded-[2rem] p-6 md:p-8 shadow-xl shadow-navy-900/10 hover:shadow-2xl hover:bg-navy-800 group flex flex-col relative overflow-hidden transform hover:-translate-y-1 transition-all duration-500">
             {/* Glow effect on hover */}
             <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
             


             <div className="relative z-10 bg-gradient-to-br from-navy-800 to-navy-900 shadow-inner border border-navy-700 rounded-xl py-1.5 px-3 mb-4 self-start flex items-center">
               <span className="flex items-center gap-2 text-amber-400 uppercase tracking-widest text-[11px] sm:text-xs font-black">
                 <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                 {data.tab2}
               </span>
             </div>
             <h3 className="relative z-10 text-white text-xl md:text-2xl font-extrabold mb-3 md:mb-4 leading-snug">{data.highlight2Title}</h3>
             <p className="relative z-10 text-slate-200 text-sm md:text-base leading-relaxed font-normal">{data.highlight2Desc}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
