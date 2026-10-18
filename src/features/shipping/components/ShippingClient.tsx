"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ship, Anchor, Package, CheckCircle2, MapPin, Globe2, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import PageHeader from '@/components/layout/PageHeader';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';
import RotatingWatermark from '@/components/ui/RotatingWatermark';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

export default function ShippingClient() {
  return (
    <article className="bg-[#F8FAFC] pb-0 overflow-x-clip font-sans">
      {/* SECTION 1: PAGE HERO */}
      <PageHeader
        badge={<><Ship className="w-4 h-4 inline-block mr-1" /> China Export & Global Logistics</>}
        title="Brake Chamber Shipping From China — FCL, LCL & Door-to-Door Export"
        description="BRC exports brake chambers from our high-capacity factory in Zhejiang, China to distributors in 30+ countries. We ship from Ningbo and Shanghai ports with EXW, FOB, CIF, DDP, and DAP terms — full-container, less-than-container, and door-to-door logistics managed by our in-house export team."
        imageSrc="/images/pageheaders/brc_shipping.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shipping & Logistics' }
        ]}
      />

      {/* SECTION 2: STATS BAR */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-30 -mt-16 mb-20">
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { icon: Globe2, value: "Zhejiang, China", label: "Manufactured In" },
            { icon: Anchor, value: "Ningbo & Shanghai", label: "Export Ports" },
            { icon: Ship, value: "30+ Countries", label: "Global Reach" },
            { icon: ShieldCheck, value: "ISPM-15", label: "Compliant Pallets" }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={scaleIn}>
              <Card padding="md" className="bg-white border-slate-100 shadow-xl shadow-navy-900/5 text-center h-full group hover:border-amber-200 transition-colors">
                <stat.icon className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-xl md:text-2xl font-black text-navy-900 mb-1 leading-tight">{stat.value}</div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* SECTION 3: SHIPPING ORIGIN */}
        <section className="mt-20 relative">
          <RotatingWatermark />
          <div className="relative z-10">
          <SectionHeader
            badge="China Factory Origin"
            title="Brake Chamber Shipping From Zhejiang, China"
            description="Every BRC brake chamber ships from our expansive manufacturing facility in Zhejiang Province, China. Our factory is located in the Fengqiao Industrial Zone, Zhuji — approximately 2 hours from Ningbo-Zhoushan Port, one of the largest container ports in the world."
            align="center"
            accentColor="amber"
            plainText={true}
          />

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-slate-200 relative overflow-hidden mt-8">
             <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-8 -mt-8 z-0 pointer-events-none"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
               <div className="space-y-4">
                 {[
                   { label: "Factory Location", val: "Fengqiao Industrial Zone, Zhuji, Zhejiang Province, China 311811" },
                   { label: "Primary Export Port", val: "Ningbo-Zhoushan Port (CNNGB) — China's 2nd largest" },
                   { label: "Secondary Export Port", val: "Port of Shanghai (CNSHA) — China's largest" },
                   { label: "Inland Transport", val: "Approximately 2 hours by truck from factory to Ningbo port" }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                     <div><strong className="text-navy-900">{item.label}</strong> — <span className="text-slate-600">{item.val}</span></div>
                   </div>
                 ))}
               </div>
               <div className="space-y-4">
                 {[
                   { label: "Direct Sailing Routes", val: "North America, Europe, Australia, Middle East, Southeast Asia" },
                   { label: "Export Documentation", val: "Handled entirely in-house by our export team" },
                   { label: "Factory Verification", val: "Buyers welcome to visit our factory or request a third-party audit" }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                     <div><strong className="text-navy-900">{item.label}</strong> — <span className="text-slate-600">{item.val}</span></div>
                   </div>
                 ))}
               </div>
             </div>
             <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3 bg-amber-50 rounded-xl p-4 border border-amber-100">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-navy-900 tracking-wide uppercase text-sm text-center">BRC Factory — Zhejiang, China → Ningbo / Shanghai Port</span>
             </div>
          </motion.div>
          </div>
        </section>
      </div>

      {/* SECTION 4 & 5: ROUTES MAP AND DISTRIBUTION NETWORK */}
      <section className="py-20 bg-navy-950 relative overflow-hidden border-y border-navy-800">
        <AnimatedGridBackground opacity={0.08} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <SectionHeader
            badge="China Export Routes"
            title="Brake Chamber Distribution Hubs by Region"
            description="BRC ships brake chambers from Ningbo and Shanghai, China to major distribution hubs across five regions. Our shipping lanes connect our factory directly to distribution hubs across North America, Australia, Europe, and the Middle East."
            align="center"
            theme="dark"
            accentColor="amber"
            plainText={true}
          />

          {/* Full Width Grid for Hubs - Restoring the beautiful layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12">
            {[
              { region: "North America", ports: "Los Angeles, Long Beach, Houston, New York, Vancouver, Manzanillo" },
              { region: "Europe", ports: "Rotterdam, Hamburg, Antwerp, Felixstowe, Le Havre" },
              { region: "Australia & NZ", ports: "Sydney, Melbourne, Brisbane, Fremantle, Auckland" },
              { region: "Middle East", ports: "Jebel Ali, Jeddah, Dammam, Hamad, Shuwaikh" },
              { region: "Southeast Asia", ports: "Singapore, Port Klang, Laem Chabang, Jakarta" }
            ].map((hub, idx) => (
              <div key={idx} className={`flex flex-col items-center text-center gap-4 bg-gradient-to-b from-navy-800 to-navy-900 border border-navy-700 p-6 md:p-8 rounded-xl shadow-lg group hover:bg-navy-800 transition-all duration-300 transform hover:-translate-y-1 hover:border-amber-500/50 ${idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <div className="w-12 h-12 bg-navy-950 rounded-full flex items-center justify-center border border-navy-800 shadow-[0_0_10px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-all duration-300 mb-1">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <strong className="text-white block font-extrabold text-lg tracking-widest mb-2 group-hover:text-amber-400 transition-colors drop-shadow-md">{hub.region}</strong>
                  <span className="text-navy-300 text-sm leading-relaxed block max-w-xs mx-auto">{hub.ports}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESTORED SPLIT LAYOUTS FOR LOGISTICS DETAILS */}
      <section aria-label="Logistics Details" className="w-full bg-white border-y border-slate-200 py-16 md:py-24 mb-12 relative overflow-hidden text-navy-600">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50/80 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50/80 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl relative z-10 space-y-20 md:space-y-24">
          
          {/* Row 1: Image Left, Freight Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/10 border border-slate-200 group">
              <div className="absolute inset-0 bg-[url('/images/brc_aftermarket.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <SectionHeader
                badge="Freight Options"
                title="Freight Volumes From China — FCL & LCL"
                description="BRC ships brake chambers from Zhejiang, China by full-container load (FCL) or less-than-container load (LCL). Container loading is planned to maximize pallet density and reduce per-unit freight cost."
                align="left"
                theme="light"
                accentColor="amber"
                plainText={true}
                className="!mb-0"
              />
              <ul className="space-y-6">
                <li className="flex items-start gap-4 p-5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors shadow-sm">
                  <div className="mt-1 bg-emerald-100 p-2 rounded-xl shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-navy-900 block text-lg mb-2">FCL — Full Container Load</strong>
                    <span className="text-slate-600 font-normal text-[15px] leading-[1.6] block">Best value for bulk orders. Available in 20ft and 40ft HQ containers loaded at our factory or at Ningbo/Shanghai port. We use specialized loading software to calculate the maximum number of brake chambers per container without risking crush damage.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors shadow-sm">
                  <div className="mt-1 bg-emerald-100 p-2 rounded-xl shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-navy-900 block text-lg mb-2">LCL — Less Than Container Load</strong>
                    <span className="text-slate-600 font-normal text-[15px] leading-[1.6] block">Consolidated pallet shipments for smaller distributors restocking high-velocity brake chamber SKUs. Shared container space, lower minimum order, and fixed sailing schedules from Ningbo and Shanghai.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Row 2: Content Left (Packaging), Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Content */}
            <div className="order-1 lg:order-1 space-y-8">
              <SectionHeader
                badge="Export Packaging"
                title="Export Packaging Standard"
                description="Every brake chamber is packaged at our Zhejiang, China factory for ocean transit to international export standards, ensuring absolute zero movement and zero damage during rough ocean transit."
                align="left"
                theme="light"
                accentColor="amber"
                plainText={true}
                className="!mb-0"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-base bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
                {[
                  { title: "ISPM-15 Pallets", desc: "Heat-treated wooden pallets." },
                  { title: "Double Shrink-Wrap", desc: "Moisture & corrosion barrier." },
                  { title: "Corner Protectors", desc: "Prevents impact damage." },
                  { title: "Steel Strapping", desc: "Secures pallets completely." },
                  { title: "Custom Cartons", desc: "For private label clients." }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 text-slate-700">
                    <div className="flex items-center gap-2 font-bold text-navy-900">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                       <span>{item.title}</span>
                    </div>
                    <span className="text-[14px] leading-[1.6] text-slate-500 pl-6 font-normal">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="order-2 lg:order-2 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/10 border border-slate-200 group">
              <div className="absolute inset-0 bg-[url('/images/brc_aftermarket.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>

          {/* Row 3: Image Left, Content Right (Incoterms) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
             {/* Image */}
             <div className="order-2 lg:order-1 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/10 border border-slate-200 group">
              <div className="absolute inset-0 bg-[url('/images/brc_aftermarket.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <SectionHeader
                badge="China Export Trade Terms"
                title="Shipping Incoterms From China"
                description="BRC supports all standard international trade terms. If you don't have a dedicated freight forwarder, our in-house export team handles the entire booking process seamlessly."
                align="left"
                theme="light"
                accentColor="amber"
                plainText={true}
                className="!mb-0"
              />
              <Card padding="md" className="bg-white border-slate-200 shadow-xl shadow-navy-900/5 space-y-5">
                {[
                  { term: "EXW", desc: "Ex Works. Buyer arranges pickup at factory." },
                  { term: "FOB", desc: "Free on Board (Shanghai/Ningbo)." },
                  { term: "CIF", desc: "Cost, Insurance & Freight to destination." },
                  { term: "DDP", desc: "Delivered Duty Paid to your warehouse." },
                  { term: "DAP", desc: "Delivered at Place (buyer handles customs)." }
                ].map((inc, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-5 last:pb-0 last:border-0 hover:bg-slate-50/50 p-2 -mx-2 rounded-lg transition-colors">
                    <span className="font-black text-navy-900 tracking-wide text-lg px-2">{inc.term}</span>
                    <span className="text-slate-600 font-normal text-[14px] md:text-[15px] leading-[1.6] text-right px-2">{inc.desc}</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>

          {/* Row 4: Centered Transit Times Table */}
          <div className="pt-10 max-w-4xl mx-auto">
            <SectionHeader
              badge="Shipping Schedule"
              title="Transit Times From China"
              description="Production lead time is 30 - 45 days. Estimated ocean transit times from Ningbo/Shanghai Port to your destination region:"
              align="center"
              theme="light"
              accentColor="amber"
              plainText={true}
              className="!mb-8"
            />
            <div className="bg-white rounded-3xl shadow-xl shadow-navy-900/5 border border-slate-200 overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-5 px-6 font-bold text-navy-900 uppercase text-xs tracking-wider">Destination Region</th>
                      <th className="py-5 px-6 font-bold text-navy-900 uppercase text-xs tracking-wider">Estimated Transit Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { region: "North America", time: "20-45 days" },
                      { region: "South America", time: "30-45 days" },
                      { region: "Europe", time: "25-35 days" },
                      { region: "Australia & New Zealand", time: "15-25 days" },
                      { region: "Middle East", time: "10-18 days" },
                      { region: "Southeast Asia", time: "7-14 days" }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors">
                        <td className="py-5 px-6 font-semibold text-navy-900 text-lg">{row.region}</td>
                        <td className="py-5 px-6 font-black text-amber-600 text-lg">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
               <div className="bg-amber-50 p-5 text-sm text-amber-900 text-center font-medium border-t border-amber-100">
                  NOTE: Transit times exclude destination customs clearance (add 2-5 business days).
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: BOTTOM CTA */}
      <section className="py-20 bg-[#F1EFE8] border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <SectionHeader
            badge="Request China Export Quote"
            title="Need a Brake Chamber Shipping Quote From China?"
            description="Contact our export team with your destination port, estimated monthly volume, and preferred Incoterms. We'll respond with a full freight quotation from our Zhejiang, China factory to your destination within 24 business hours."
            align="center"
            accentColor="amber"
            plainText={true}
          />
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold px-8 py-4 rounded-xl transition-all shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[13px] hover:-translate-y-1">
              Request China Export Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/manufacturing/high-volume-orders" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-xl shadow-navy-900/20 uppercase tracking-widest text-[13px] hover:-translate-y-1">
              View High-Volume Orders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </article>
  );
}
