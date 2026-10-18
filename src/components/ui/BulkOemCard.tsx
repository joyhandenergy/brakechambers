import React from 'react';
import Link from 'next/link';
import { Truck, ArrowRight } from 'lucide-react';

export default function BulkOemCard() {
  return (
    <Link href="/manufacturing/high-volume-orders" className="hidden lg:flex flex-col items-center justify-center p-6 bg-gradient-to-b from-navy-900 to-navy-950 border border-navy-800 rounded-2xl text-center mt-6 shadow-xl shadow-navy-900/10 relative overflow-hidden sticky top-[30vh] group hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-amber-500/20 transition-colors"></div>
      
      <div className="bg-navy-800/80 p-2.5 rounded-full mb-3 border border-navy-700 group-hover:scale-110 transition-transform shadow-inner">
        <Truck size={20} className="text-amber-400" />
      </div>
      
      <h3 className="font-extrabold text-white text-sm mb-2 uppercase tracking-wide group-hover:text-amber-400 transition-colors">Bulk OEM Orders</h3>
      <p className="text-xs mb-5 text-navy-200 leading-relaxed font-light">
        Custom paint, private labeling, and manufacturing to IATF 16949 standards for large fleets.
      </p>
      
      <div className="w-full bg-navy-950/50 border border-navy-700 text-amber-500 text-xs font-extrabold px-4 py-2.5 rounded-xl group-hover:bg-amber-500 group-hover:text-navy-900 group-hover:border-amber-500 transition-all shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider">
        View OEM Programs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
