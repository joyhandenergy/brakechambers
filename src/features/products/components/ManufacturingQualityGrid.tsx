import React from 'react';
import { ShieldCheck, Target, Droplets, Factory, Layers, Anchor, PenTool, GitMerge } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';

interface ManufacturingQualityGridProps {
  category?: 'all' | 'spring-brake-chambers' | 'service-brake-chambers' | 'air-disc-brake-actuators' | 'parts-and-kits' | string;
}

export default function ManufacturingQualityGrid({ category = 'all' }: ManufacturingQualityGridProps) {
  const getQualityFeatures = () => {
    switch (category) {
      case 'spring-brake-chambers':
        return [
          {
            icon: Layers,
            title: "Dual-Diaphragm Design",
            description: "Separate service and parking diaphragms operate independently. If one function fails, the other remains operational."
          },
          {
            icon: ShieldCheck,
            title: "8-Gauge Steel Housings",
            description: "Heavy-gauge steel withstands the sustained spring pressure of parking brake engagement without deforming."
          },
          {
            icon: Droplets,
            title: "Epoxy-Coated Power Springs",
            description: "Internal springs are epoxy-coated to prevent rust flaking — the leading cause of parking brake failure in aftermarket chambers."
          },
          {
            icon: GitMerge,
            title: "Long-Stroke Options",
            description: "Type 30/30 LS chambers available for high-wear applications where standard stroke is insufficient to maintain brake adjustment."
          }
        ];
      case 'service-brake-chambers':
        return [
          {
            icon: Target,
            title: "Single-Diaphragm Precision",
            description: "High-tensile nylon-reinforced diaphragms deliver consistent linear force across the full stroke."
          },
          {
            icon: ShieldCheck,
            title: "Compact Housing Design",
            description: "Optimized housing profile fits tight steer-axle clearances without sacrificing diaphragm area."
          },
          {
            icon: GitMerge,
            title: "Standard & Long-Stroke Options",
            description: "Both standard and LS configurations available to match different slack adjuster setups."
          },
          {
            icon: Droplets,
            title: "Corrosion-Resistant Coating",
            description: "E-coat + epoxy finish prevents rust on internal springs and housing interiors."
          }
        ];
      case 'air-disc-brake-actuators':
        return [
          {
            icon: Target,
            title: "HOT Technology",
            description: "Proprietary internal mechanism maintains clamping force as friction builds, the leading cause of brake fade in standard actuators."
          },
          {
            icon: ShieldCheck,
            title: "Sealed Housing Construction",
            description: "Internal bore sealed against dust, water, and contaminants, critical for long-term actuator life."
          },
          {
            icon: GitMerge,
            title: "High-Strength Return Spring",
            description: "Reliable return-to-rest function prevents drag and unnecessary pad wear between stops."
          },
          {
            icon: Droplets,
            title: "Direct Caliper Compatibility",
            description: "Matches Bendix ADB22X, Meritor EX+, and WABCO PAN/MAX caliper mounting dimensions for drop-in replacement."
          }
        ];
      default:
        return [
          {
            icon: Factory,
            title: "Automotive Standards",
            description: "Manufactured in our audited facility operating to global standards for total quality control."
          },
          {
            icon: Target,
            title: "1-Million Cycles",
            description: "Tested to withstand over a million duty cycles in extreme conditions."
          },
          {
            icon: Droplets,
            title: "Anti-Corrosion",
            description: "Heavy epoxy powder-coating resists salt spray and harsh chemicals."
          },
          {
            icon: ShieldCheck,
            title: "Premium Rubber",
            description: "Diaphragms engineered for extreme temperatures (-40°C to 80°C)."
          }
        ];
    }
  };

  const features = getQualityFeatures();

  return (
    <div className="mt-16 sm:mt-24 mb-16 sm:mb-24">
      {category === 'spring-brake-chambers' ? (
        <div className="max-w-4xl mx-auto mb-8">
           <SectionHeader
             badge="Built for Emergency Braking"
             title="What Makes BRC Spring Brake Chambers Reliable"
             description="A spring brake chamber has to perform two functions without compromise: service braking during normal driving, and emergency/parking braking when air pressure is lost. Every BRC chamber is engineered for both."
             align="center"
             accentColor="emerald"
           />
        </div>
      ) : category === 'service-brake-chambers' ? (
        <div className="max-w-4xl mx-auto mb-8">
           <SectionHeader
             badge="Built for Primary Braking"
             title="What Makes BRC Service Brake Chambers Reliable"
             description="Service brake chambers handle the primary braking force on every stop. Every BRC chamber is engineered for immediate pneumatic response and consistent force output across the full stroke."
             align="center"
             accentColor="emerald"
           />
        </div>
      ) : category === 'air-disc-brake-actuators' ? (
        <div className="max-w-4xl mx-auto mb-8">
           <SectionHeader
             badge="Built for Modern Disc Brakes"
             title="What Makes BRC Air Disc Brake Actuators Reliable"
             description="Air disc brake actuators convert air pressure into linear mechanical force for caliper activation. Every BRC ADB actuator is engineered for consistent clamping force and reduced brake fade."
             align="center"
             accentColor="emerald"
           />
        </div>
      ) : category === 'parts-and-kits' ? (
        <div className="max-w-4xl mx-auto mb-8">
           <SectionHeader
             badge="Built for Repair and Maintenance"
             title="What Makes BRC Brake Chamber Parts Reliable"
             description="Replacement parts must fit and function identically to the OEM components they replace. Every BRC part is manufactured to OEM specifications and tested before shipment."
             align="center"
             accentColor="emerald"
           />
        </div>
      ) : (
        <h2 className="text-2xl font-extrabold text-navy-900 mb-6 text-center">Engineered for Maximum Reliability</h2>
      )}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${['spring-brake-chambers', 'service-brake-chambers', 'air-disc-brake-actuators', 'parts-and-kits'].includes(category) ? '' : '2xl:grid-cols-6'} gap-4 md:gap-6`}>
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col h-full bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
      {category === 'spring-brake-chambers' && (
        <div className="mt-8 text-center">
          <Link href="/technical-resources" className="text-emerald-600 font-bold hover:underline inline-flex items-center">
            View our spring brake chamber technical specs <span className="ml-1">→</span>
          </Link>
        </div>
      )}
      {category === 'service-brake-chambers' && (
        <div className="mt-8 text-center">
          <Link href="/technical-resources" className="text-emerald-600 font-bold hover:underline inline-flex items-center">
            View our service brake chamber technical specs <span className="ml-1">→</span>
          </Link>
        </div>
      )}
      {category === 'air-disc-brake-actuators' && (
        <div className="mt-8 text-center">
          <Link href="/technical-resources" className="text-emerald-600 font-bold hover:underline inline-flex items-center">
            View our ADB actuator technical specs <span className="ml-1">→</span>
          </Link>
        </div>
      )}
      {category === 'parts-and-kits' && (
        <div className="mt-8 text-center">
          <Link href="/technical-resources" className="text-emerald-600 font-bold hover:underline inline-flex items-center">
            View our parts & kits technical specs <span className="ml-1">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
