import React from 'react';
import { Truck, ShieldCheck, CheckCircle, Settings, Layers, Wrench, Thermometer, Box } from 'lucide-react';

interface TrustBannerProps {
  category?: 'all' | 'spring-brake-chambers' | 'service-brake-chambers' | 'air-disc-brake-actuators' | 'parts-and-kits' | string;
}

export default function TrustBanner({ category = 'all' }: TrustBannerProps) {
  const getBannerContent = () => {
    switch (category) {
      case 'spring-brake-chambers':
        return [
          { icon: Layers, title: "Dual-Diaphragm Design", desc: "Engineered for durability" },
          { icon: ShieldCheck, title: "Emergency & Parking", desc: "Reliable mechanical lockup" },
          { icon: Settings, title: "Type 20/24 to 30/30", desc: "Full size range available" },
          { icon: CheckCircle, title: "OEM Cross-Reference", desc: "Direct drop-in replacements" },
        ];
      case 'service-brake-chambers':
        return [
          { icon: Box, title: "Single-Diaphragm Design", desc: "High-response actuation" },
          { icon: Truck, title: "Steer & Drive Axle", desc: "Universal fitment options" },
          { icon: Settings, title: "Type 9 to Type 30", desc: "Full size range available" },
          { icon: CheckCircle, title: "OEM Cross-Reference", desc: "Direct drop-in replacements" },
        ];
      case 'air-disc-brake-actuators':
        return [
          { icon: Thermometer, title: "HOT Technology", desc: "Optimized thermal performance" },
          { icon: ShieldCheck, title: "Reduced Brake Fade", desc: "Shorter stopping distances" },
          { icon: Settings, title: "Direct Caliper Match", desc: "Drop-in compatibility" },
          { icon: CheckCircle, title: "OEM Cross-Reference", desc: "Direct drop-in replacements" },
        ];
      case 'parts-and-kits':
        return [
          { icon: Wrench, title: "Repair Kits & Diaphragms", desc: "Premium replacements" },
          { icon: Settings, title: "Caging Bolts & Pins", desc: "Hardware included" },
          { icon: Truck, title: "In-Stock Ready to Ship", desc: "Fast global dispatch" },
          { icon: CheckCircle, title: "OEM-Spec Built", desc: "Manufactured to exact tolerances" },
        ];
      default:
        return [
          { icon: Truck, title: "Fast Shipping", desc: "In stock & ready to dispatch" },
          { icon: ShieldCheck, title: "1-Year Warranty", desc: "Tested up to 1 million cycles" },
          { icon: CheckCircle, title: "Automotive Standards", desc: "Factory-direct quality" },
          { icon: Settings, title: "Exact OEM Match", desc: "Drop-in replacements" },
        ];
    }
  };

  const content = getBannerContent();

  return (
    <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 border-b-4 border-amber-500 py-6 rounded-[1.5rem] mb-8 shadow-xl shadow-navy-900/20 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none"></div>
      <div className="px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-navy-700/50">
          {content.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-2">
              <item.icon className="w-8 h-8 text-amber-500 mb-2" />
              <div className="text-white font-bold text-sm md:text-base">{item.title}</div>
              <p className="text-navy-300 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
