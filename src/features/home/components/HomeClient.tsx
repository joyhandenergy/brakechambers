"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ShieldCheck, Settings, Cpu, Zap,
  Mail, CheckCircle, FileText, Wrench, Globe2, ChevronRight, Phone, Search, PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { BlogPost } from '@/types';
import BlogCard from '@/components/ui/BlogCard';
import AnimatedGridBackground from '@/components/ui/AnimatedGridBackground';
import TrendingModelsMarquee from '@/components/ui/TrendingModelsMarquee';
import TrustMarquee from '@/components/ui/TrustMarquee';
import SectionHeader from '@/components/ui/SectionHeader';
import RotatingWatermark from '@/components/ui/RotatingWatermark';

const HERO_SLIDES = [
  {
    id: 1,
    badge: "Direct Factory",
    badgeIcon: <Settings className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />,
    title: <>OEM Brake Chamber <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-navy-400">Manufacturer <br className="block md:hidden" />in China.</span></>,
    description: "Source direct from our large-scale IATF 16949-aligned facility in Zhejiang, China. Eliminate middleman markups on premium aftermarket brake chambers for trucks, trailers, and commercial fleets worldwide.",
    cta1: { text: "Get Factory Pricing", link: "/quote" },
    cta2: { text: "Request Free Samples", link: "/contact" },
    image: "/images/home/hero_truck_image_1.png",
    gradient: "from-navy-950 via-navy-950/90 to-transparent",
    glow: "bg-amber-500"
  },
  {
    id: 2,
    badge: "Heavy-Duty Engineering",
    badgeIcon: <Cpu className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />,
    title: <>Precision-Built Brake Chambers for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-navy-400">Trucks & Trailers.</span></>,
    description: "Engineered to eliminate air leaks and deliver perfectly balanced braking under extreme road pressure. Direct fit, form, and function match for Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO tolerances.",
    cta1: { text: "View Product Catalog", link: "/products" },
    cta2: { text: "Request Test Samples", link: "/contact" },
    image: "/images/home/hero_truck_image_2.jpg",
    gradient: "from-navy-950 via-navy-950/80 to-transparent",
    glow: "bg-amber-500"
  },
  {
    id: 3,
    badge: "International Export",
    badgeIcon: <Globe2 className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />,
    title: <>Global Brake Chamber Supplier <br />to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-navy-400">30+ Countries.</span></>,
    description: "Streamlined global B2B procurement with predictable lead times and hassle-free port logistics. Direct container shipping, FCL, and LCL handled for distributors, fleets, and importers worldwide.",
    cta1: { text: "Start Wholesale Inquiry", link: "/contact" },
    cta2: { text: "View Export Capabilities", link: "/shipping" },
    image: "/images/home/hero_truck_image_3.jpg",
    gradient: "from-navy-950 via-navy-950/90 to-transparent",
    glow: "bg-amber-500"
  }
];

interface HomeClientProps {
  blogPosts: BlogPost[];
}

export default function HomeClient({ blogPosts }: HomeClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans bg-[#F8FAFC]">
      {/* 1. Dynamic Engineering Hero Carousel */}
      <section
        className="relative min-h-[85vh] flex items-center bg-navy-950 overflow-hidden"
      >

        {/* Carousel Backgrounds & Slides */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Image styling matching Application Detail pages */}
            <img
              src={slide.image}
              alt="Heavy-Duty Commercial Brake Chamber Manufacturing Facility"
              className="absolute inset-0 w-full h-full object-cover object-[25%_center] md:object-center opacity-85 scale-100 md:scale-105 animate-[slow-pan_20s_ease-in-out_infinite_alternate]"
              style={{ animationPlayState: index === currentSlide ? 'running' : 'paused' }}
            />
            {/* Image Overlay Gradient matching Application Detail pages */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/75 to-navy-950" />

            {/* Dynamic Glow */}
            <div className={`absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] ${slide.glow} opacity-10 rounded-full blur-[80px] md:blur-[120px] -mr-20 -mt-20 md:-mr-40 md:-mt-40 mix-blend-screen transition-colors duration-1000`}></div>
          </div>
        ))}

        {/* Blueprint Grid Overlay (Static) */}
        <div
          className="absolute inset-0 z-20 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-30 pt-8 pb-20 md:pt-12 md:pb-20">
          <div className="max-w-3xl grid relative">

            {HERO_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`col-start-1 row-start-1 flex flex-col justify-start transition-all duration-700 ease-out ${index === currentSlide
                  ? 'opacity-100 translate-y-0 z-10 visible'
                  : 'opacity-0 translate-y-8 z-0 invisible pointer-events-none'
                  }`}
              >
                <div>
                  <div className="inline-block px-3 py-1 mb-4 md:px-4 md:py-1.5 md:mb-6 rounded-full bg-gradient-to-r from-navy-800 to-navy-900 border border-navy-700 text-amber-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-navy-950 whitespace-nowrap">
                    {slide.badgeIcon} {slide.badge}
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6 tracking-tight drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-[15px] md:text-[16px] leading-[1.6] mb-8 md:mb-10 max-w-2xl font-normal text-navy-100">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                    <Link href={slide.cta1.link} className="bg-amber-500 hover:bg-amber-400 text-navy-950 font-black px-6 py-3.5 md:px-8 md:py-3.5 rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/20 text-center flex items-center justify-center gap-2 uppercase tracking-wide text-[12px] md:text-[13px] transform hover:-translate-y-0.5 w-full sm:w-auto">
                      {slide.cta1.text} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href={slide.cta2.link} className="bg-navy-900/60 backdrop-blur-md border border-navy-600 hover:border-amber-500 hover:text-amber-400 text-white font-bold px-6 py-3.5 md:px-8 md:py-3.5 rounded-xl transition-all duration-300 text-center flex items-center justify-center uppercase tracking-wide text-[12px] md:text-[13px] shadow-xl shadow-navy-950 transform hover:-translate-y-0.5 w-full sm:w-auto whitespace-normal sm:whitespace-nowrap">
                      {slide.cta2.text}
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-20 sm:bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-amber-500' : 'w-4 bg-navy-700 hover:bg-navy-500'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Compliance & Trust Banner — Infinite Marquee */}
      <TrustMarquee />

      {/* 3. Comprehensive Product Architecture */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        {/* Subtle background gradient accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-navy-100/40 to-transparent rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        {/* Premium Fixed Parallax Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 w-full h-full bg-[url('/images/brc-truck-background.jpg?v=3')] md:bg-fixed bg-right bg-no-repeat bg-cover opacity-40 mix-blend-multiply"></div>
          {/* Gradient Overlay: Solid on the left for text readability, fading to transparent on the right for image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-50/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-14 gap-6 text-center md:text-left">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <SectionHeader
                badge="Product Lines"
                title="Explore Our Brake Chamber Range: Spring, Service, ADB & Parts"
                description="Browse BRC's complete range of aftermarket brake chambers for trucks, trailers, and commercial fleets. Every category is manufactured to IATF 16949 standards and cross-referenced against Bendix, Haldex, Meritor, Knorr-Bremse, and WABCO part numbers."
                align="left"
                theme="light"
                accentColor="amber"
                plainText={false}
                className="!mb-0"
              />
            </div>
            <Link href="/products" className="hidden md:flex text-amber-600 font-extrabold uppercase tracking-widest text-[13px] items-center justify-center hover:text-amber-500 transition-colors bg-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md">
              View All BRC Chambers <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Spring Brakes */}
            <Link href="/spring-brake-chambers" className="block group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] transition-all duration-500 border border-slate-200 hover:border-amber-400 transform hover:-translate-y-1.5">
              <div className="absolute inset-0 bg-[url('/images/products/brc-heavy-duty-spring-brake-chambers.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-all duration-700   z-0 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-navy-50/90 z-0"></div>

              <div className="relative z-10 p-6 md:p-10 flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-navy-900 mb-2">Combination Spring Brakes (Drum)</h3>
                      <p className="text-amber-600 font-bold text-[11px] tracking-widest uppercase bg-amber-50 px-2.5 py-1 inline-block rounded-md mt-1 border border-amber-100">Double Diaphragm · S-Cam Setup</p>
                    </div>
                  </div>
                  <div className="text-slate-600 text-[14px] md:text-[15px] leading-[1.6] font-normal max-w-md mb-4 hidden sm:block">Heavy-duty combination spring brake chambers managing both service and parking brake functions. Precision-machined internal bore delivers consistent mechanical advantage across millions of cycles.</div>
                  <div className="text-navy-900 font-bold text-[11px] uppercase tracking-widest mb-6">Type 20/24 · Type 24/24 · Type 30/30 · Type 24/30</div>
                  <div className="flex items-center text-amber-600 font-extrabold text-[12px] uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                    View Spring Brake Specs <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-full sm:w-48 h-48 sm:h-48 flex-shrink-0 relative mt-4 sm:mt-0 flex items-center justify-center">
                  <div className="w-full h-full animate-[spin_60s_linear_infinite] [animation-delay:-0s] group-hover:[animation-play-state:paused] flex items-center justify-center">
                    <img src="/images/home/compination-spring-brake.png" alt="Spring Brake Chamber" className="w-[115%] sm:w-[130%] h-[115%] sm:h-[130%] max-w-none object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Service Brakes */}
            <Link href="/service-brake-chambers" className="block group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] transition-all duration-500 border border-slate-200 hover:border-amber-400 transform hover:-translate-y-1.5">
              <div className="absolute inset-0 bg-[url('/images/products/brc-commercial-truck-service-brake-chambers.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-all duration-700   z-0 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-navy-50/90 z-0"></div>

              <div className="relative z-10 p-6 md:p-10 flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-navy-900 mb-2">Service Brake Chambers (Drum)</h3>
                      <p className="text-amber-600 font-bold text-[11px] tracking-widest uppercase bg-amber-50 px-2.5 py-1 inline-block rounded-md mt-1 border border-amber-100">Single Diaphragm · Steer & Drive Axles</p>
                    </div>
                  </div>
                  <div className="text-slate-600 text-[14px] md:text-[15px] leading-[1.6] font-normal max-w-md mb-4 hidden sm:block">Factory-direct service brake chambers engineered for precise pneumatic response on drum brake systems. Available for steer axle, drive axle, and trailer applications. Manufactured to IATF 16949 standards and pressure-tested before shipment.</div>
                  <div className="text-navy-900 font-bold text-[11px] uppercase tracking-widest mb-6">Size 9 · Size 12 · Size 16 · Size 20 · Size 24 · Size 30</div>
                  <div className="flex items-center text-amber-600 font-extrabold text-[12px] uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                    View Service Specs <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-full sm:w-48 h-48 sm:h-48 flex-shrink-0 relative mt-4 sm:mt-0 flex items-center justify-center">
                  <div className="w-full h-full animate-[spin_60s_linear_infinite] [animation-delay:-15s] group-hover:[animation-play-state:paused] flex items-center justify-center">
                    <img src="/images/home/service-brake-chamber.png" alt="Service Brake Chamber" className="w-auto h-[60%] sm:w-[110%] sm:h-[110%] max-w-none object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Air Disc Brakes */}
            <Link href="/air-disc-brake-actuators" className="block group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] transition-all duration-500 border border-slate-200 hover:border-amber-400 transform hover:-translate-y-1.5">
              <div className="absolute inset-0 bg-[url('/images/products/brc-commercial-air-disc-brake-actuators.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-all duration-700   z-0 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-navy-50/90 z-0"></div>

              <div className="relative z-10 p-6 md:p-10 flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-navy-900 mb-2">Air Disc Brake (ADB) Actuators</h3>
                      <p className="text-amber-600 font-bold text-[11px] tracking-widest uppercase bg-amber-50 px-2.5 py-1 inline-block rounded-md mt-1 border border-amber-100">High-Output Technology · Severe-Duty Rated</p>
                    </div>
                  </div>
                  <div className="text-slate-600 text-[14px] md:text-[15px] leading-[1.6] font-normal max-w-md mb-4 hidden sm:block">Next-generation air disc brake actuators delivering superior clamping force, reduced brake fade, and longer pad life. Built with our proprietary HOT Technology for high-mileage, high-temperature, and severe-duty applications.</div>
                  <div className="text-navy-900 font-bold text-[11px] uppercase tracking-widest mb-6">HOT Technology · Severe-Duty Rated</div>
                  <div className="flex items-center text-amber-600 font-extrabold text-[12px] uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                    View ADB Specs <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-full sm:w-48 h-48 sm:h-48 flex-shrink-0 relative mt-4 sm:mt-0 flex items-center justify-center">
                  <div className="w-full h-full animate-[spin_60s_linear_infinite] [animation-delay:-30s] group-hover:[animation-play-state:paused] flex items-center justify-center">
                    <img src="/images/home/air-disc-brake-chambers.png" alt="Air Disc Brake Chamber" className="w-[70%] sm:w-[75%] h-[70%] sm:h-[75%] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Piggybacks & Accessories */}
            <Link href="/parts-and-kits" className="block group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] transition-all duration-500 border border-slate-200 hover:border-amber-400 transform hover:-translate-y-1.5">
              <div className="absolute inset-0 bg-[url('/images/products/brc-brake-chamber-replacement-parts-kits.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-all duration-700   z-0 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-navy-50/90 z-0"></div>

              <div className="relative z-10 p-6 md:p-10 flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-navy-900 mb-2">Brake Chamber Parts & Kits</h3>
                      <p className="text-amber-600 font-bold text-[11px] tracking-widest uppercase bg-amber-50 px-2.5 py-1 inline-block rounded-md mt-1 border border-amber-100">Repair Kits · Diaphragms · Hardware</p>
                    </div>
                  </div>
                  <div className="text-slate-600 text-[14px] md:text-[15px] leading-[1.6] font-normal max-w-md mb-4 hidden sm:block">OEM-spec brake chamber repair components to extend the service life of your existing chambers. Includes piggyback kits, rubber diaphragms, caging bolts, clevis pins, and mounting hardware. In-stock and ready to ship worldwide.</div>
                  <div className="text-navy-900 font-bold text-[11px] uppercase tracking-widest mb-6">OEM-Spec · In-Stock · Ready to Ship</div>
                  <div className="flex items-center text-amber-600 font-extrabold text-[12px] uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                    Explore Brake Chamber Parts <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-full sm:w-48 h-48 sm:h-48 flex-shrink-0 relative mt-4 sm:mt-0 flex items-center justify-center">
                  <div className="w-full h-full animate-[spin_60s_linear_infinite] [animation-delay:-45s] group-hover:[animation-play-state:paused] flex items-center justify-center">
                    <img src="/images/home/piggy-accessory.png" alt="Piggyback & Accessories" className="w-[70%] h-[70%] sm:w-[100%] sm:h-[100%] max-w-none object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <Link href="/products" className="w-full text-amber-600 font-extrabold uppercase tracking-widest text-[13px] flex items-center justify-center hover:text-amber-500 transition-colors bg-white px-6 py-3.5 rounded-lg shadow-sm hover:shadow-md border border-slate-100">
              View All BRC Chambers <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEW: Inside Our Facility (The Factory Proof) */}
      <section id="facility" className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image Grid / Factory Floor */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-5">
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="col-span-2 rounded-2xl overflow-hidden h-64 md:h-80 shadow-lg">
                <img src="/images/brc7.jpg" alt="Brake Chamber Assembly Line" className="w-full h-full object-cover  hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl overflow-hidden h-40 md:h-48 shadow-lg">
                <img src="/images/home/brc_quality_control_factory_worker.jpg?v=2" alt="Quality Control Testing" className="w-full h-full object-cover  hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl overflow-hidden h-40 md:h-48 shadow-lg">
                <img src="/images/home/brc_quality_factory_worker.jpg?v=1" alt="Factory Machining Center" className="w-full h-full object-cover  hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>

            {/* Copy / Narrative */}
            <div className="w-full lg:w-1/2">
              <SectionHeader
                badge="FACTORY-DIRECT SUPPLY"
                title={<>Inside Our <span className="text-amber-500">High-Capacity</span> Brake Chamber Factory</>}
                description="BRC operates a vertically integrated brake chamber factory in Zhejiang, China, operating to IATF 16949 standards. By sourcing direct, you eliminate middleman markups and manage the full production lifecycle, from raw material to export-ready container."
                align="left"
                theme="light"
                accentColor="amber"
                plainText={true}
                className="!mb-6"
              />
              <ul className="space-y-5 mb-8 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-[15px] leading-[1.75]"><strong className="text-navy-900">Large-Scale Facility:</strong> State-of-the-art production infrastructure for high-volume brake chamber output and consistent supply.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-[15px] leading-[1.75]"><strong className="text-navy-900">IATF 16949 Standards:</strong> Tier-1 automotive quality systems audited to global standards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-[15px] leading-[1.75]"><strong className="text-navy-900">1M+ Units / Year:</strong> Fully automated assembly lines scaling to meet container-level demand.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-[15px] leading-[1.75]"><strong className="text-navy-900">100% Tested:</strong> Every chamber is pressure-tested at end-of-line, and designs are lab-verified for up to 1,000,000 continuous cycles.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-[15px] leading-[1.75]"><strong className="text-navy-900">Export Logistics:</strong> Turnkey ocean freight, from rapid 7-day LCL dispatches to full 40ft container staging.</span>
                </li>
              </ul>
              <Link href="/contact" className="inline-flex w-full sm:w-auto justify-center items-center bg-navy-900 text-white font-bold px-6 sm:px-8 py-4 rounded-xl hover:bg-amber-500 hover:text-navy-950 transition-all duration-300 shadow-xl uppercase tracking-widest text-[11px] sm:text-[12px] transform hover:-translate-y-1 text-center whitespace-normal">
                <span>See the manufacturing process</span> <ChevronRight className="w-4 h-4 ml-2 flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Aftermarket Brands Showcase */}
      <section className="py-16 md:py-24 bg-slate-100 relative overflow-hidden border-y border-slate-300">
        <div className="absolute inset-0 bg-[url('/images/brc_aftermarket.jpg')] bg-cover bg-center opacity-[0.15] grayscale"></div>

        {/* Subtle Modern Dot Grid Background */}
        <AnimatedGridBackground opacity={0.03} />
        {/* Fade out masks to make the grid blend smoothly into the light section */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-transparent to-slate-100 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <SectionHeader
            badge="OEM-Compatible Aftermarket"
            title="Engineered as a Direct OEM Replacement"
            description="BRC brake chambers are manufactured to match the exact fit, form, and function of leading OEM brands. Swapping to BRC doesn't mean swapping your specs. It means sourcing the same performance at factory-direct pricing."
            align="center"
            theme="light"
            accentColor="amber"
            plainText={true}
            className="!mb-12"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-3 md:gap-6 mb-12"
          >
            {[
              { name: "BENDIX", dot: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]", hoverBorder: "hover:border-emerald-500", hoverText: "group-hover:text-emerald-600" },
              { name: "MERITOR", dot: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]", hoverBorder: "hover:border-amber-500", hoverText: "group-hover:text-amber-600" },
              { name: "HALDEX", dot: "bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]", hoverBorder: "hover:border-sky-500", hoverText: "group-hover:text-sky-600" },
              { name: "WABCO", dot: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", hoverBorder: "hover:border-indigo-500", hoverText: "group-hover:text-indigo-600" },
              { name: "MGM BRAKES", dot: "bg-rose-500 shadow-[0_0_10px_rgba(243,64,94,0.5)]", hoverBorder: "hover:border-rose-500", hoverText: "group-hover:text-rose-600" }
            ].map((brand, idx) => (
              <motion.div
                key={brand.name}
                variants={scaleIn}
                className={`bg-white border border-slate-200 px-4 py-3 sm:px-8 sm:py-4 rounded-xl shadow-sm flex items-center justify-center gap-3 min-w-[140px] sm:min-w-[160px] group hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${brand.hoverBorder} ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <div className={`w-2 h-2 rounded-full ${brand.dot} group-hover:scale-125 transition-transform duration-300`}></div>
                <span className={`text-navy-900 font-extrabold text-sm sm:text-lg tracking-widest transition-colors ${brand.hoverText}`}>
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <Link href="/oem-cross-reference" className="inline-flex w-full sm:w-auto justify-center items-center text-white bg-navy-900 font-extrabold px-4 sm:px-8 py-4 sm:py-3.5 rounded-xl hover:bg-amber-500 hover:text-navy-950 transition-all duration-300 shadow-xl uppercase tracking-widest text-[11px] sm:text-[12px] transform hover:-translate-y-0.5 text-center">
            <span>Search the OEM Part Database</span> <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* 5. R&D and Innovation Highlight */}
      <section className="relative overflow-hidden bg-navy-950 py-16 md:py-24 flex items-center border-t border-navy-800 group">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/images/brc-truck-background.jpg?v=3" alt="Commercial Truck" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/75 to-transparent"></div>
          {/* Accent gradient bar */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.6)]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-5xl bg-navy-950/80 backdrop-blur-xl p-6 md:p-10 lg:p-12 rounded-3xl border border-navy-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] transform transition-transform hover:-translate-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

              {/* Left Column: Text & CTA */}
              <div>
                <SectionHeader
                  badge="PROPRIETARY R&D SPOTLIGHT"
                  title={<>High Output Technology <span className="text-amber-500">(HOT)</span><br /><span className="text-xl md:text-2xl text-navy-200 mt-3 block">for Air Disc Brake Actuators</span></>}
                  description="Standard air disc actuators lose clamping force as internal friction builds over time. BRC's patented HOT Technology corrects this through a proprietary internal mechanism that maintains mechanical advantage over millions of cycles, delivering consistent stopping performance under heavy loads."
                  align="left"
                  theme="dark"
                  accentColor="amber"
                  plainText={true}
                  className="!mb-8"
                />
                <Link href="/technical-resources" className="inline-flex w-full sm:w-auto justify-center items-center text-navy-950 bg-white font-extrabold px-6 py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-xl text-[12px] uppercase tracking-widest transform hover:-translate-y-0.5 text-center">
                  <span>Download Tech Specs</span> <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                </Link>
              </div>

              {/* Right Column: Key Benefits */}
              <div className="hidden md:block space-y-4">
                <div className="bg-navy-900/50 border border-navy-700/50 p-5 rounded-2xl flex items-start gap-4 hover:border-amber-500/30 transition-colors">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl shrink-0 mt-0.5">
                    <Zap className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-amber-400 font-bold mb-1.5 text-[15px] md:text-base tracking-tight">Consistent Clamping Force</h3>
                    <p className="text-[14px] leading-[1.6] font-normal text-navy-200">Overcomes friction loss to maintain peak stopping power across the actuator's full service life.</p>
                  </div>
                </div>

                <div className="bg-navy-900/50 border border-navy-700/50 p-5 rounded-2xl flex items-start gap-4 hover:border-amber-500/30 transition-colors">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-amber-400 font-bold mb-1.5 text-[15px] md:text-base tracking-tight">Reduced Brake Fade</h3>
                    <p className="text-[14px] leading-[1.6] font-normal text-navy-200">Mechanical design maintains reliable performance even under sustained heavy loads and high heat.</p>
                  </div>
                </div>

                <div className="bg-navy-900/50 border border-navy-700/50 p-5 rounded-2xl flex items-start gap-4 hover:border-amber-500/30 transition-colors">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl shrink-0 mt-0.5">
                    <Settings className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-amber-400 font-bold mb-1.5 text-[15px] md:text-base tracking-tight">Patented Internal Design</h3>
                    <p className="text-[14px] leading-[1.6] font-normal text-navy-200">Exclusive BRC internal mechanics you won't find in standard aftermarket generic actuators.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Digital B2B Tools & Support */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-[#F1EFE8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 pr-6">
              <SectionHeader
                badge="B2B Support Tools"
                title="Part Lookups, Training & Warranty: All Online"
                description="Self-service tools built for brake chamber distributors, fleet managers, and shop technicians. No phone calls. No waiting on email replies."
                align="left"
                theme="light"
                accentColor="amber"
                plainText={true}
                className="!mb-8"
              />
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tool 1 */}
              <Link href="/oem-cross-reference#search-tool" className="block bg-navy-900 border border-navy-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 hover:bg-navy-800 transition-all duration-500 shadow-xl shadow-navy-900/10 group transform hover:-translate-y-1 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-navy-700 group-hover:border-amber-500/50 transition-colors">
                    <Search className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">Instant OEM Part Lookup</h3>
                  <p className="text-navy-200 text-[15px] mb-8 leading-[1.6] font-normal text-left">Enter a Bendix, Knorr-Bremse, ZF/WABCO, Haldex, SORL, or MGM part number and get the matching BRC brake chamber in seconds. No account required.</p>
                  <div className="text-amber-400 text-[11px] font-extrabold uppercase tracking-widest flex items-center group-hover:text-amber-300">
                    Launch Part Lookup Tool <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* Tool 2 */}
              <Link href="/technical-resources#video-training" className="block bg-navy-900 border border-navy-800 p-6 md:p-8 rounded-2xl hover:border-amber-500/50 hover:bg-navy-800 transition-all duration-500 shadow-xl shadow-navy-900/10 group transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-navy-700 group-hover:border-amber-500/50 transition-colors">
                    <PlayCircle className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">On-Demand Technician Training Modules</h3>
                  <p className="text-navy-200 text-[15px] mb-8 leading-[1.6] font-normal text-left">Short, practical video courses covering installation, torque specifications, and common failure diagnostics. Built for shop-floor training—so your team gets it right the first time.</p>
                  <div className="text-amber-400 text-[11px] font-extrabold uppercase tracking-widest flex items-center group-hover:text-amber-300">
                    View Training Courses <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* Tool 3 */}
              <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-navy-900 p-6 md:p-8 rounded-2xl md:col-span-2 shadow-xl group relative overflow-hidden transition-transform transform hover:-translate-y-1 duration-500">
                {/* Shine effect */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg] group-hover:animate-[shine_1.5s_ease-in-out]"></div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-14 h-14 bg-navy-900/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner border border-white/20 mb-2 md:mb-0">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 drop-shadow-md">Industry-Leading 1-Year Warranty</h3>
                      <p className="text-white/90 text-[15px] md:text-base max-w-xl font-normal leading-[1.6] text-left drop-shadow-sm">Enjoy complete peace of mind. Every BRC chamber is backed by a comprehensive defect warranty with a streamlined, no-hassle online claims process.</p>
                    </div>
                  </div>
                  <Link href="/warranty" className="w-full md:w-auto flex items-center justify-center text-center bg-navy-950 text-white px-6 sm:px-8 py-4 rounded-xl font-extrabold text-[12px] uppercase tracking-widest hover:bg-navy-900 flex-shrink-0 whitespace-normal sm:whitespace-nowrap shadow-xl transform transition-transform hover:-translate-y-1">
                    Submit a Warranty Claim
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 3 Steps to Partner */}
      <section className="pt-12 pb-10 md:pt-16 md:pb-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Prominent Rotating Brake Chamber Background (Watermark) */}
        <RotatingWatermark 
          sizeClass="w-[400px] h-[400px] lg:w-[700px] lg:h-[700px]" 
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <SectionHeader
              badge="How to Order Wholesale"
              title="Source Brake Chambers from China in 3 Steps"
              description="From sample evaluation to direct container shipping, BRC makes importing aftermarket brake chambers scalable, predictable, and secure."
              align="center"
              theme="light"
              accentColor="amber"
              plainText={true}
              className="!mb-0"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-navy-900 text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg border-4 border-slate-50 z-10">1</div>
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-4 tracking-tight">Get Your Custom Wholesale Quote</h3>
              <p className="text-[15px] md:text-base leading-[1.6] text-slate-600 font-normal">Tell us your brake chamber requirements. We send a full wholesale catalog with factory-direct pricing, so you know exactly what you&apos;re buying and at what cost.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-navy-900 text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg border-4 border-slate-50 z-10">2</div>
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-4 tracking-tight">Order Evaluation Samples</h3>
              <p className="text-[15px] md:text-base leading-[1.6] text-slate-600 font-normal">Order brake chamber samples directly from our factory for your engineering team to approve. Zero technical risk before committing to volume.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-500 text-navy-950 rounded-full flex items-center justify-center font-black text-xl shadow-lg border-4 border-slate-50 z-10">3</div>
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-4 tracking-tight">Scale to Container Orders</h3>
              <p className="text-[15px] md:text-base leading-[1.6] text-slate-600 font-normal">Once approved, we produce and stage your order for container shipping. We handle Incoterms, FCL/LCL, and direct delivery to your port or 3PL warehouse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8.5 Latest Blog Posts */}
      <section className="pt-10 pb-24 md:pt-16 md:pb-24 bg-slate-50 relative border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <SectionHeader
              badge="Knowledge Base"
              title="Technical Guides & News"
              description="Read the latest insights from our engineering team on selecting, installing, and maintaining heavy-duty brake chambers."
              align="left"
              className="!mb-0"
            />
            <Link href="/blog" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-bold tracking-widest text-[13px] uppercase group whitespace-nowrap">
              View All Articles <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <motion.div key={post.slug} variants={fadeInUp} custom={index}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final Factory CTA */}
      <section className="py-12 md:py-16 bg-[#F1EFE8] relative overflow-hidden">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Internal Card Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0"></div>

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <SectionHeader
                badge="Factory-Direct Contact"
                title="Work Directly With Our Factory in China"
                description={<>Connect with our export engineering team in Zhejiang. We respond in English, quote in USD, and manage your brake chamber order from first inquiry to final container. No trading companies. No hidden markups.</>}
                align="left"
                theme="dark"
                accentColor="amber"
                className="!mb-8"
              />

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
                <a href="tel:+8613395856758" className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-xl transition-all duration-300 backdrop-blur-sm group">
                  <Phone className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-wide text-white">+86 13395856758</span>
                </a>
                <a href="mailto:sales@brakechambers.com" className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-xl transition-all duration-300 backdrop-blur-sm group">
                  <Mail className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm tracking-wide text-white">sales@brakechambers.com</span>
                </a>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-auto shrink-0 mt-8 md:mt-0">
              <Link href="/quote" className="inline-block w-full bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-center px-6 sm:px-10 py-5 rounded-xl uppercase tracking-widest text-[13px] transition-all duration-300 shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 whitespace-normal sm:whitespace-nowrap leading-tight sm:leading-normal">
                Request Factory Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Marquee (Moved to bottom) */}
      <TrendingModelsMarquee />
    </div>
  );
}
