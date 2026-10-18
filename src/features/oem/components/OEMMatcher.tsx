"use client";

import React, { useState } from 'react';
import { ReplaceAll, ArrowRightLeft, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const competitors = [
  { id: 'bendix', name: 'Bendix', type: 'Piggyback Kit', match: 'BRC-PB-3030' },
  { id: 'haldex', name: 'Haldex', type: 'Service Diaphragm', match: 'BRC-D-30' },
  { id: 'mgm', name: 'MGM', type: 'Complete Chamber', match: 'BRC-3030-STD' },
  { id: 'meritor', name: 'Meritor', type: 'Clamp Band', match: 'BRC-CB-30' },
];

export default function OEMMatcher() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="w-full mt-16 mb-8 rounded-[2.5rem] bg-navy-900 border border-navy-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionHeader
          badge={<><ReplaceAll className="w-3 h-3 mr-2 inline-block relative -top-[1px]" /> Direct-Fit Cross Reference</>}
          title="Exact Match Replacements."
          description="Don't waste time guessing. Our aftermarket accessories and piggyback kits are engineered to be 100% direct-fit replacements for major OEM brands. Select a brand below to see the BRC equivalent."
          align="center"
          theme="dark"
          accentColor="emerald"
          className="!mb-12"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {competitors.map((comp) => {
          const isActive = activeId === comp.id;

          return (
            <div 
              key={comp.id}
              onClick={() => setActiveId(isActive ? null : comp.id)}
              className="relative h-48 [perspective:1000px] cursor-pointer group"
            >
              <div className={`w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isActive ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* Front Side (Competitor) */}
                <div className="absolute inset-0 w-full h-full bg-navy-950 border border-navy-800 rounded-2xl flex flex-col items-center justify-center p-6 shadow-lg [backface-visibility:hidden] group-hover:border-navy-600 transition-colors">
                  <div className="text-navy-400 text-xs font-bold uppercase tracking-wider mb-2">Replacing</div>
                  <h3 className="text-2xl font-extrabold text-white">{comp.name}</h3>
                  <div className="mt-4 text-xs text-navy-300 bg-navy-800 px-3 py-1 rounded-full border border-navy-700">
                    {comp.type}
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                {/* Back Side (BRC Match) */}
                <div className="absolute inset-0 w-full h-full bg-emerald-900 border border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center p-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
                  <div className="text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">BRC Equivalent</div>
                  <h3 className="text-xl font-extrabold text-white">{comp.match}</h3>
                  <div className="mt-3 text-[10px] text-emerald-100/70 bg-black/20 px-2 py-1 rounded border border-emerald-500/30 text-center leading-tight">
                    Guaranteed Fit <br/> Same Day Shipping
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
