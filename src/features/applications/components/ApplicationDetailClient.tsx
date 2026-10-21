'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, HelpCircle, AlertTriangle, PackagePlus, ShieldAlert, Wrench, Settings } from 'lucide-react';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';
import SectionHeader from '@/components/ui/SectionHeader';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import Card from '@/components/ui/Card';
import IconBox from '@/components/ui/IconBox';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { APPLICATION_DATA } from '@/data/applicationsData';
import { notFound } from 'next/navigation';

import PageHeader from '@/components/layout/PageHeader';

export default function ApplicationDetailClient({ appSlug }: { appSlug: string }) {
  const data = APPLICATION_DATA[appSlug];

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader
        badge="Application Profile"
        title={data.title}
        description={data.desc}
        imageSrc="/images/brc_brakechamber_aftermarket.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Applications', href: '/applications' },
          { label: data.title }
        ]}
      />

      {/* The Challenge Section - White with Central Red Blend */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden border-b border-slate-200">
        {/* Central Red Glow Blend */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-red-600 opacity-[0.04] md:opacity-[0.06] rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:w-1/2"
            >
              <SectionHeader
                badge="The Challenge"
                title={data.challenge.title}
                description={data.challenge.desc}
                align="left"
                accentColor="amber"
                plainText={true}
              />
            </motion.div>

            {/* Operating Parameters Grid */}
            {data.specs && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full relative z-10"
              >
                {data.specs.map((spec: any, idx: number) => (
                  <motion.div variants={fadeInUp} key={idx} className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-center min-h-[120px]">
                    <div className="text-amber-600 text-[10px] font-black uppercase tracking-widest mb-2">{spec.label}</div>
                    <div className="text-navy-950 text-base md:text-lg font-bold leading-tight">{spec.value}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* The Solution / Technologies */}
      <section className="py-16 md:py-20 bg-blue-50 relative overflow-hidden border-t border-blue-100">
        {/* Subtle background pattern to match home page premium feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <SectionHeader
              badge="Purpose-Built"
              title="Engineered Solutions"
              description="How BRC overcomes the unique demands of this application with purpose-built technology."
              align="center"
              accentColor="amber"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className={`grid grid-cols-1 md:grid-cols-2 ${data.technologies?.length === 3 ? 'lg:grid-cols-3' : ''} gap-6 lg:gap-8 mt-4`}
          >
            {data.technologies.map((tech: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
              >
                <Card padding="md" hoverEffect="lift" className="group h-full flex flex-col">
                  <IconBox icon={tech.icon} color="amber" size="lg" className="mb-6" />
                  <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-slate-600 font-normal">
                    {tech.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recommended Package - Call to Action */}
      <section className="py-20 lg:py-32 bg-navy-950 relative overflow-hidden border-t border-navy-900">
        {/* Background Image Layer */}
        <div className="absolute inset-0 bg-[url('/images/brc_equipment_background.jpg')] bg-cover bg-center opacity-5   z-0"></div>
        {/* Animated Grid Layer */}
        <AnimatedGridBackground opacity={0.08} />
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500 opacity-5 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>
        {/* Top/Bottom Fade Masks */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
              <div className="lg:w-1/2">
                <SectionHeader
                  badge="Recommended"
                  title={data.recommendedTitle || "Upgrade Your Fleet"}
                  description={data.recommendedDesc || `The perfect brake chamber combination specifically recommended for ${data.title.toLowerCase()}.`}
                  align="left"
                  theme="dark"
                  accentColor="amber"
                  className="mb-6 md:mb-8"
                />
                <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full bg-navy-900/80 border border-navy-700/50 text-slate-300 text-xs font-bold tracking-wide uppercase shadow-lg backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-amber-500" /> All recommended packages are manufactured to IATF 16949 standards and up to 1M-cycle lab tested
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {data.recommendedPackage.map((pkg: any, idx: number) => {
                // Determine icon based on product type
                let Icon = PackagePlus;
                if (pkg.link.includes('spring-brake') || pkg.link.includes('sealed')) Icon = ShieldAlert;
                else if (pkg.link.includes('service-brake')) Icon = CheckCircle2;
                else if (pkg.link.includes('parts') || pkg.link.includes('piggyback')) Icon = Wrench;
                else if (pkg.link.includes('air-disc')) Icon = Settings;

                return (
                <motion.div key={idx} variants={fadeInUp} className="h-full">
                  <Link href={pkg.link} className="bg-gradient-to-b from-navy-800 to-navy-900 border border-navy-700 p-8 lg:p-10 rounded-[2rem] hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full group transform hover:-translate-y-2">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                    
                    <div className="relative z-10">
                      {/* Stats-style Icon Box */}
                      <div className="w-16 h-16 bg-gradient-to-br from-navy-800 to-navy-900 shadow-inner border border-navy-700 rounded-2xl flex items-center justify-center mb-8 group-hover:border-amber-500/50 transition-colors duration-300">
                        <Icon className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 group-hover:text-amber-400 transition-colors tracking-tight">{pkg.name}</h3>
                      <p className="text-[15px] leading-[1.6] text-slate-400 mb-8 font-normal">{pkg.desc}</p>
                    </div>
                    {/* Consistent Outline Button */}
                    <div className="relative z-10 flex items-center justify-between text-white font-bold uppercase tracking-widest text-[13px] bg-navy-900/50 w-full sm:w-max px-8 py-4 rounded-xl border border-navy-700 group-hover:border-amber-500/50 group-hover:bg-navy-800 transition-all shadow-lg">
                      View Product Details <ArrowRight className="w-5 h-5 ml-4 text-amber-500 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <SectionHeader
              badge="Support"
              title="Frequently Asked Questions"
              description="Common questions about this specific application."
              align="center"
              accentColor="slate"
            />

            <div className="mt-12">
              <GlobalFAQAccordion faqs={data.faqs} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application-Specific Bottom CTA */}
      <section className="py-24 lg:py-32 bg-[#F1EFE8] relative overflow-hidden">
        <AnimatedGridBackground opacity={0.03} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-white opacity-50 blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <SectionHeader
              badge="Direct From The Source"
              title={data.cta?.heading || `Need a custom volume quote for your ${data.title}?`}
              description={data.cta?.subheading || "Connect directly with our engineering and wholesale team to get factory-direct container pricing and specifications tailored to your fleet."}
              align="center"
              theme="light"
              accentColor="amber"
            />
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={data.cta?.link || "/quote"} className="inline-flex items-center justify-center bg-navy-900 hover:bg-navy-800 text-white font-black px-8 py-4 rounded-xl transition-all duration-300 text-[13px] uppercase tracking-widest shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.3)] transform hover:-translate-y-1 w-full sm:w-auto">
                {data.cta?.buttonText || "Request a Quote"} <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
              {data.cta?.secondaryButton && (
                <Link href={data.cta.secondaryButton.link} className="inline-flex items-center justify-center bg-transparent border-2 border-navy-900 text-navy-900 hover:bg-navy-50 font-black px-8 py-4 rounded-xl transition-all duration-300 text-[13px] uppercase tracking-widest transform hover:-translate-y-1 w-full sm:w-auto">
                  {data.cta.secondaryButton.text} <ArrowRight className="w-5 h-5 ml-3" />
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
