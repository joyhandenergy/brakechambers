"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Truck, ShieldCheck } from 'lucide-react';
import { useMarketStore } from '../../store/market';

const FooterColumn = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <>
    {/* Mobile: Accordion */}
    <details className="group md:hidden border-b border-navy-800 py-4">
      <summary className="font-bold text-lg font-heading flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        {title}
        <svg className="w-5 h-5 text-navy-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="pt-4 pb-2">
        {children}
      </div>
    </details>

    {/* Desktop: Standard List */}
    <div className="hidden md:block">
      <div className="font-bold text-lg mb-6 font-heading">{title}</div>
      {children}
    </div>
  </>
);

export default function Footer() {
  const selectedMarket = useMarketStore(state => state.selectedMarket);
  const marketCode = selectedMarket?.code || 'us';

  return (
    <footer className="bg-navy-900 text-white pt-12 md:pt-20 pb-10 border-t border-navy-800 mt-auto relative overflow-hidden">
      {/* Decorative Manufacturing Sparks */}
      <div className="absolute bottom-0 right-0 w-full md:max-w-[700px] h-[650px] md:h-full pointer-events-none z-0 overflow-hidden opacity-10 md:opacity-15 mix-blend-lighten">
        {/* Gradients to fade harsh edges. On mobile it fades the top edge. On desktop it fades the left edge. */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent z-10"></div>
        <Image 
          src="/images/footer-sparks.jpg?v=3"
          alt="Manufacturing Brake Chambers"
          fill
          unoptimized={true}
          className="object-cover object-center md:object-[75%_center]"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1920px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 md:mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 mb-6 relative group flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                <img src="/images/logo-brc.png" alt="BRC" className="h-7 md:h-8 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-xl md:text-2xl text-white tracking-tight">BRC</span>
                <span className="text-xs md:text-[13px] font-bold text-navy-300 tracking-widest uppercase">Brake Chambers</span>
              </div>
            </Link>
            <p className="text-navy-300 text-sm mb-5 leading-relaxed pr-4 text-justify">
              Chinese manufacturer of aftermarket brake chambers for heavy-duty commercial vehicles. Large-scale factory in Zhejiang, China. Serving distributors in 30+ countries. IATF 16949-aligned quality system.
            </p>

            <div className="flex flex-col gap-4">
              <span className="text-sm text-amber-400 font-bold">Follow us on social media</span>
              <div className="flex items-center gap-4">
                {/* Facebook */}
                <a href="https://www.facebook.com/profile.php?id=61594923702878" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-navy-300 hover:bg-amber-500 hover:text-navy-950 transition-all shadow-sm">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/brakechambers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-navy-300 hover:bg-amber-500 hover:text-navy-950 transition-all shadow-sm">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/@BrakeChambers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-navy-300 hover:bg-amber-500 hover:text-navy-950 transition-all shadow-sm">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
                {/* TikTok (Custom SVG or use a placeholder) */}
                <a href="https://www.tiktok.com/@brakechambers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-navy-300 hover:bg-amber-500 hover:text-navy-950 transition-all shadow-sm">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="lg:col-span-2">
            <FooterColumn title="Catalog">
            <ul className="space-y-3">
              <li><Link href={`/products`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors font-semibold">All Products</Link></li>
              <li><Link href={`/spring-brake-chambers`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Spring Brake Chambers</Link></li>
              <li><Link href={`/service-brake-chambers`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Service Brake Chambers</Link></li>
              <li><Link href={`/air-disc-brake-actuators`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Air Disc Actuators</Link></li>
              <li><Link href={`/parts-and-kits`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Chamber Parts & Kits</Link></li>
              <li><Link href={`/oem-cross-reference`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">OEM Cross-Reference</Link></li>
            </ul>
            </FooterColumn>
          </div>
          
          {/* Manufacturing */}
          <div className="lg:col-span-2">
            <FooterColumn title="Manufacturing">
            <ul className="space-y-3">
              <li><Link href={`/manufacturing`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors font-semibold">OEM & Factory</Link></li>
              <li><Link href={`/manufacturing/process`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Production Process</Link></li>
              <li><Link href={`/manufacturing/custom-oem`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Custom OEM</Link></li>
              <li><Link href={`/manufacturing/private-label`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Private Label</Link></li>
              <li><Link href={`/manufacturing/high-volume-orders`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Volume Orders</Link></li>
              <li><Link href={`/shipping`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Global Logistics</Link></li>
            </ul>
            </FooterColumn>
          </div>
          
          {/* Applications */}
          <div className="lg:col-span-2">
            <FooterColumn title="Applications">
            <ul className="space-y-3">
              <li><Link href={`/applications/long-haul-semi-trucks`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Trucks & Trailers</Link></li>
              <li><Link href={`/applications/garbage-refuse`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Severe-Duty</Link></li>
              <li><Link href={`/applications/transit-buses`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Passenger Transport</Link></li>
              <li><Link href={`/applications/mining-construction`} className="text-navy-300 hover:text-slate-400 text-sm transition-colors">Off-Highway</Link></li>
            </ul>
            </FooterColumn>
          </div>
          
          {/* Company & Contact */}
          <div className="lg:col-span-3">
            <FooterColumn title="Company">
            <ul className="space-y-4">
              <li className="flex flex-col gap-2 mb-2">
                <Link href={`/our-story`} className="text-amber-400 hover:text-amber-300 text-sm transition-colors font-semibold">About BRC</Link>
                <Link href={`/technical-resources`} className="text-amber-400 hover:text-amber-300 text-sm transition-colors font-semibold">Technical Resources</Link>
                <Link href={`/warranty`} className="text-amber-400 hover:text-amber-300 text-sm transition-colors font-semibold">Warranty</Link>
                <Link href={`/contact`} className="text-amber-400 hover:text-amber-300 text-sm transition-colors font-semibold">Contact</Link>
                <Link href={`/quote`} className="text-amber-400 hover:text-amber-300 text-sm transition-colors font-semibold">Request a Quote</Link>
                <Link href={`/distributors`} className="text-amber-400 hover:text-amber-300 text-sm transition-colors font-semibold">Distributors</Link>
              </li>
              <li className="flex items-start gap-3 mt-4">
                <Mail className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-navy-300 text-sm">sales@brakechambers.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-navy-300 text-sm">Factory direct line: +86 13395856758<br/>WhatsApp/Wechat: +852 53629718</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-navy-300 text-sm leading-relaxed">Block 3, No 55 Tianyang Rd, Fengqiao,<br/>Zhuji, Zhejiang. China 311811</span>
              </li>
            </ul>
            </FooterColumn>
          </div>
        </div>
        
        <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-navy-400 text-sm">
            &copy; 2025 Zhejiang GAP Auto Parts Co., Ltd. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm mt-2 md:mt-0">
            <Link href={`/privacy`} className="text-navy-400 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href={`/terms`} className="text-navy-400 hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
        
        {/* Aftermarket / SEO Disclaimer */}
        <div className="pt-6 mt-6 border-t border-navy-800/50">
          <p className="text-navy-500 text-[11px] leading-relaxed max-w-4xl">
            <strong>Disclaimer:</strong> Zhejiang GAP Auto Parts Co., Ltd. (operating as BRC Brake Chambers) is an independent manufacturer of aftermarket heavy-duty commercial vehicle parts. 
            Brand names, trademarks, logos, and part numbers (including but not limited to Bendix, Haldex, Meritor, Rockwell, Wabco, and MGM Brakes) 
            are used strictly for identification and cross-reference purposes only. BRC is not affiliated with, sponsored by, or endorsed by any of these original equipment manufacturers.
          </p>
        </div>
      </div>
    </footer>
  );
}
