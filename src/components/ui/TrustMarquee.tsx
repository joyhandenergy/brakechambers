'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TrustMarquee() {
  return (
    <div className="bg-navy-900 border-y border-amber-500/30 overflow-hidden relative z-30 w-full">
      <div className="flex animate-marquee whitespace-nowrap py-5">
        {[...Array(2)].map((_, dupeIdx) => (
          <div key={dupeIdx} className="flex shrink-0 items-center">
            {[
              'IATF 16949 Aligned',
              'FMVSS-121 Compliant',
              'OEM Drop-In Replacement',
              '100% Leak Tested',
              'Factory-Direct Shipping',
            ].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-sm font-bold text-navy-100 uppercase tracking-widest mx-10"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
