"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PhoneCall, Mail, Phone, MapPin, Clock, Send, Globe, Truck, MessageCircle, ArrowRight, CheckCircle, CheckCircle2, ShieldCheck, User, Building, HelpCircle, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';

const contactCards = [
  {
    icon: Phone,
    title: "Technical Sales Support",
    description: "Direct line to our sales and technical team for OEM cross-referencing, part specifications, and product inquiries.",
    value: "+86 13395856758",
    subtext: "Phone & WhatsApp available",
    href: "tel:+8613395856758",
    color: "navy",
    bgColor: "bg-navy-50",
    textColor: "text-navy-600",
    borderHover: "hover:border-navy-300",
  },
  {
    icon: Mail,
    title: "Wholesale & RFQ",
    description: "For formal RFQs, container shipping logistics, distribution partnerships, and pricing tiers.",
    value: "sales@brakechambers.com",
    subtext: "Official wholesale inquiries",
    href: "mailto:sales@brakechambers.com",
    color: "amber",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    borderHover: "hover:border-amber-300",
  },
  {
    icon: MapPin,
    title: "Manufacturing Facility",
    description: "Block 3, No 55 Tianyang Rd, Fengqiao, Zhuji, Zhejiang. China 311811",
    value: "View on Google Maps",
    href: "#map-section",
    color: "navy",
    bgColor: "bg-navy-50",
    textColor: "text-navy-600",
    borderHover: "hover:border-navy-300",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Monday - Saturday: 08:00 - 18:00 CST (GMT+8). Closed Sundays and Chinese public holidays.",
    value: "US: Prev day 19:00 - 05:00 EST | EU: 02:00 - 12:00 CET",
    href: undefined,
    color: "amber",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    borderHover: "hover:border-amber-300",
  },
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    country: '',
    phone: '',
    inquiryType: 'Technical Support',
    message: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => ({
    fullName: touched.fullName ? validateRequired(formData.fullName, 'Full name', 2) : null,
    email: touched.email ? validateEmail(formData.email) : null,
    company: touched.company ? validateRequired(formData.company, 'Company name', 2) : null,
    country: touched.country ? validateRequired(formData.country, 'Country', 2) : null,
    phone: touched.phone ? validatePhone(formData.phone, false) : null,
    inquiryType: touched.inquiryType ? validateRequired(formData.inquiryType, 'Inquiry type', 1) : null,
    message: touched.message ? validateRequired(formData.message, 'Message', 10) : null,
  }), [formData, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setServerError(null);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    // Mark all fields as touched
    const allTouched = {
      fullName: true,
      email: true,
      company: true,
      country: true,
      phone: true,
      inquiryType: true,
      message: true
    };
    setTouched(allTouched);

    const hasErrors = 
      validateRequired(formData.fullName, 'Full name', 2) ||
      validateEmail(formData.email) ||
      validateRequired(formData.company, 'Company name', 2) ||
      validateRequired(formData.country, 'Country', 2) ||
      validatePhone(formData.phone, false) ||
      validateRequired(formData.message, 'Message', 10);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'Wholesale Contact Form', ...formData })
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to submit form');
      }
      setSubmitted(true);
    } catch (error: any) {
      console.error('Submission failed', error);
      setServerError(error.message || 'Something went wrong. Please try again or email sales@brakechambers.com');
    } finally {
      setIsSubmitting(false);
    }
  };
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const faqs = [
    {
      q: "What is your Minimum Order Quantity (MOQ)?",
      a: "For standard catalog brake chambers, our MOQ is 500 units per order (LCL pilot order). For customized or private label orders, MOQ is typically 1,000 units per part number. Sample orders of 1-5 units are available for evaluation - contact us for sample pricing."
    },
    {
      q: "What are your standard manufacturing lead times?",
      a: "Standard catalog orders ship 30-45 days from order confirmation. Custom OEM or private label orders require 45-60 days depending on tooling and packaging requirements. Sample orders ship within 5-7 business days."
    },
    {
      q: "Do you offer private labeling or custom OEM branding?",
      a: "Yes. We offer both private label (custom paint, laser engraving, branded packaging on BRC-manufactured chambers) and custom OEM (full design-to-production of your proprietary chamber design). See our private label and custom OEM pages for details."
    },
    {
      q: "What payment terms do you accept?",
      a: "Standard terms are 30% deposit / 70% balance before shipment via T/T (bank wire). For long-term partners, we offer L/C at sight and revolving credit terms. Contact sales@brakechambers.com for terms specific to your order size."
    },
    {
      q: "Which countries do you ship to?",
      a: "BRC exports to 40+ countries across North America, Australia, New Zealand, Europe, and the Middle East. We handle FCL, LCL, and door-to-door container shipping with EXW, FOB, CIF, and DDP terms available."
    },
    {
      q: "What is your warranty policy?",
      a: "BRC brake chambers are covered by a 1-year limited warranty against manufacturing defects. Warranty claims are submitted through our online portal with photo documentation. Response within 24 hours. See our warranty page for full terms."
    }
  ];

  return (
    <div className="bg-[#F8FAFC] font-sans overflow-x-clip">
      <PageHeader
        badge="Customer Support"
        badgeIcon={PhoneCall}
        title="Contact BRC: Brake Chamber Sales & Technical Support"
        description="Connect with our OEM and wholesale team in Zhejiang, China. We respond to technical specifications, cross-reference requests, sample orders, and bulk pricing inquiries within 24 hours."
        imageSrc="/images/pageheaders/brc_contact.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' }
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-6 sm:-mt-16 relative z-20">
        {/* 2-Column Responsive Workspace Grid matching Quote Page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          
          {/* LEFT COLUMN: Master Commercial Contact Form */}
          <div className="lg:col-span-7 xl:col-span-8 order-1">
            <div className="-mx-4 sm:mx-0 bg-white rounded-none sm:rounded-3xl shadow-[0_12px_36px_rgba(10,25,41,0.06)] border-y sm:border border-slate-200/90 overflow-hidden relative">
              
              {/* Top Signature Brand Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-navy-900 via-amber-500 to-navy-900" />

              {/* Form Section Header Bar */}
              <div className="p-4 sm:p-6 lg:p-7 bg-slate-50/70 border-b border-slate-200/80">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-wider">
                    <PhoneCall className="w-4 h-4 text-amber-600" />
                    Direct Factory Desk
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
                  Commercial Inquiries & Technical Support
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 font-normal leading-relaxed">
                  Connect with our factory sales and engineering team in Zhejiang, China for specifications, custom configurations, sample requests, and wholesale quotations.
                </p>
              </div>

              {/* Success State */}
              {submitted ? (
                <div className="p-6 sm:p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-5 shadow-xs border border-emerald-100">
                    <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
                  </div>
                  <span className="inline-block px-3.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider mb-2.5">
                    Inquiry Dispatched Successfully
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-2">Thank You for Reaching Out</h3>
                  <p className="text-slate-600 text-sm sm:text-base max-w-lg mb-6 leading-relaxed font-normal">
                    Our technical sales team will review your specifications, prepare any required part cross-matches, and email your formal reply within 24 business hours.
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 mb-6 max-w-md w-full text-left">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Need Immediate Engineering Assistance?</h4>
                    <p className="text-sm text-slate-600 mb-3.5">For urgent cross-dock shipments or container bookings, message our export desk directly:</p>
                    <a 
                      href="https://wa.me/85253629718" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 px-4 py-2.5 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-emerald-600" /> WhatsApp Engineering Desk: +852 53629718
                    </a>
                  </div>

                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm sm:text-base transition-colors cursor-pointer shadow-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="p-4 sm:p-6 lg:p-7 flex flex-col gap-5 sm:gap-6 relative">
                  {serverError && (
                    <div className="p-3.5 bg-rose-50/70 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* SECTION 01: Buyer & Company Profile */}
                  <div>
                    <div className="flex items-center gap-3 pb-3 mb-5 border-b border-slate-100">
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-900 text-amber-400 font-bold text-sm sm:text-base flex items-center justify-center shrink-0">
                        01
                      </span>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-900">
                        Buyer & Company Profile
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                          Full Name <span className="text-amber-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={() => handleBlur('fullName')}
                          required
                          disabled={isSubmitting}
                          placeholder="John Doe"
                          className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                            errors.fullName
                              ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                              : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Business Email */}
                      <div>
                        <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                          Business Email <span className="text-amber-500 font-bold">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur('email')}
                          required
                          disabled={isSubmitting}
                          placeholder="john@company.com"
                          className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                            errors.email
                              ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                              : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Company / Fleet Name */}
                      <div>
                        <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                          Company / Fleet Name <span className="text-amber-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onBlur={() => handleBlur('company')}
                          required
                          disabled={isSubmitting}
                          placeholder="Global Trucking Logistics"
                          className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                            errors.company
                              ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                              : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                          }`}
                        />
                        {errors.company && (
                          <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.company}
                          </p>
                        )}
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                          Country <span className="text-amber-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          onBlur={() => handleBlur('country')}
                          required
                          disabled={isSubmitting}
                          placeholder="United States"
                          className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                            errors.country
                              ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                              : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                          }`}
                        />
                        {errors.country && (
                          <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.country}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                          Direct Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => handleBlur('phone')}
                          disabled={isSubmitting}
                          placeholder="+1 (555) 019-2834"
                          className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                            errors.phone
                              ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                              : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 02: Inquiry Classification & Requirements */}
                  <div>
                    <div className="flex items-center gap-3 pb-3 mb-5 border-b border-slate-100">
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-900 text-amber-400 font-bold text-sm sm:text-base flex items-center justify-center shrink-0">
                        02
                      </span>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-900">
                        Inquiry Scope & Requirements
                      </h3>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                      {/* Inquiry Type */}
                      <div>
                        <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                          Inquiry Type <span className="text-amber-500 font-bold">*</span>
                        </label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          required
                          className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium focus:outline-none transition-all shadow-2xs bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <option value="Technical Support">Technical Support</option>
                          <option value="Wholesale Quote">Wholesale & RFQ</option>
                          <option value="Sample Request">Sample Request</option>
                          <option value="Distribution Partnership">Distribution Partnership</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                          Message & Specifications <span className="text-amber-500 font-bold">*</span>
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={() => handleBlur('message')}
                          required
                          disabled={isSubmitting}
                          placeholder="Please include part numbers, estimated quantities, or destination country for shipping quotes..."
                          className={`w-full p-4 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none resize-none bg-white border border-slate-200 placeholder:text-slate-400 placeholder:font-normal focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed ${
                            errors.message
                              ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                              : ''
                          }`}
                        ></textarea>
                        {errors.message && (
                          <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Action & Guarantee */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 disabled:cursor-not-allowed text-navy-950 font-black text-sm sm:text-base py-4 sm:py-4.5 px-6 rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-2.5 uppercase tracking-wider transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2.5">
                          SUBMITTING INQUIRY...
                          <div className="w-5 h-5 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2.5">
                          SUBMIT INQUIRY
                          <ArrowRight className="w-5 h-5 shrink-0" />
                        </span>
                      )}
                    </button>

                    {/* Trust markers under CTA */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 font-medium text-center">
                      <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                      <span>Direct Factory Pricing • Manufactured to IATF 16949 Standards • 24h Response</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Support Desk & Manufacturing Assurance */}
          <div className="lg:col-span-5 xl:col-span-4 order-2 space-y-6 lg:sticky lg:top-24">
            
            {/* Card 1: Official Factory Communication Channels */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(10,25,41,0.06)] border border-slate-200/90 relative overflow-hidden">
              <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                <h3 className="font-extrabold text-navy-900 text-lg sm:text-xl">Direct Factory Channels</h3>
              </div>

              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-navy-50 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm sm:text-base">Production Facility & Export HQ</h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      Block 3, No 55 Tianyang Rd, Fengqiao, Zhuji, Zhejiang. China 311811
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm sm:text-base">Wholesale & RFQ Desk</h4>
                    <a href="mailto:sales@brakechambers.com" className="text-amber-600 hover:underline text-sm font-semibold block mt-0.5">
                      sales@brakechambers.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm sm:text-base">Direct Phone & WhatsApp</h4>
                    <a href="tel:+8613395856758" className="text-navy-900 hover:text-amber-600 text-sm font-semibold block mt-0.5">
                      Factory direct line: +86 13395856758
                    </a>
                    <span className="text-slate-500 text-xs sm:text-sm block mt-0.5">
                      WhatsApp/Wechat: +852 53629718
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm sm:text-base">Factory Operating Hours</h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      Mon &ndash; Fri: 8:00 AM &ndash; 6:00 PM (GMT+8)<br />
                      <span className="text-slate-400 text-xs">Online inquiry desk monitors requests 24/7</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Direct Manufacturer Advantages (Dark Card) */}
            <div className="bg-gradient-to-b from-navy-800 to-navy-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-md border border-navy-700/80 relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                <h3 className="font-extrabold text-white text-base sm:text-lg">Direct Manufacturer Advantages</h3>
              </div>
              <p className="text-navy-200 text-sm sm:text-base leading-relaxed font-normal mb-4">
                Direct factory pricing with zero intermediary commissions from our facility operating to IATF 16949 standards in Zhuji, China.
              </p>

              <div className="space-y-2.5 pt-3 border-t border-navy-700/80 mb-5 text-sm sm:text-base">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-1" />
                  <span className="text-navy-200">Custom laser stamping, bespoke packaging & private label.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Globe className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-1" />
                  <span className="text-navy-200">EXW, FOB Ningbo/Shanghai, CIF, and DDP to warehouse.</span>
                </div>
              </div>

              {/* Direct WhatsApp link */}
              <a 
                href="https://wa.me/85253629718" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Desk: +852 53629718
              </a>
            </div>

          </div>
        </div>

        {/* Centered FAQ Section - Matches Other Pages */}
        <section className="mt-16 sm:mt-24 max-w-4xl mx-auto w-full">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Everything you need to know about factory orders, sample testing, and delivery terms."
            align="center"
            accentColor="amber"
            className="!mb-10 sm:!mb-12"
          />
          <GlobalFAQAccordion faqs={faqs} />
        </section>
      </div>

      {/* Factory Location Map - Full Width */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-16 sm:mt-20 lg:mt-24 bg-white border-y border-slate-200 overflow-hidden relative w-full"
      >
        {/* Main Map Container */}
        <div id="map-section" className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] group bg-slate-100">
          {/* Amber Duotone Overlay - covers the entire map seamlessly */}
          <div className="absolute inset-0 bg-amber-500/15 mix-blend-color z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-1000 ease-out"></div>

          {/* The Google Map - Deferred Loading */}
          {isMapLoaded ? (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110190.57398188172!2d121.4633716503816!3d29.87834529999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x344d634db8bebaeb%3A0xeab5c8148b301764!2sNingbo%2C%20Zhejiang%2C%20China!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full filter -[0.8] contrast-[1.1] opacity-90 group-hover:-0 group-hover:opacity-100 transition-all duration-1000 ease-out z-0"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="absolute inset-0 w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-400 z-0 animate-pulse">
              <MapPin className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm font-medium">Loading Map...</span>
            </div>
          )}

          {/* Floating Info Card - Positioned at bottom left, fully responsive */}
          <div className="absolute bottom-0 left-0 w-full sm:w-auto p-4 sm:p-6 z-20 pointer-events-none flex justify-center sm:justify-start">
            <div className="bg-white/95 backdrop-blur-md px-5 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 transform group-hover:-translate-y-1 sm:group-hover:-translate-y-2 transition-transform duration-500 w-full sm:w-auto max-w-[400px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-heading font-extrabold text-navy-900 text-base sm:text-lg mb-0.5 sm:mb-1 tracking-tight">BRC Manufacturing Headquarters</h3>
                  <p className="text-[13px] md:text-[14px] font-normal text-slate-500 leading-[1.6]">
                    Block 3, No 55 Tianyang Rd, Fengqiao,<br className="hidden sm:block" />
                    Zhuji, Zhejiang. China 311811
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Re-open container for the next section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] mb-20">
        {/* Additional Section: Global Reach */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 sm:mt-16 md:mt-24"
        >
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 relative overflow-hidden shadow-none sm:shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/15 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

            <motion.div variants={fadeInUp} className="relative z-10">
              <SectionHeader
                badge="Global Reach"
                title="Global Distribution Network"
                description="We ship FCL containers to 40+ countries across six continents. Wherever your fleet operates, BRC chambers are ready to deliver."
                align="center"
                theme="dark"
                accentColor="amber"
                className="!mb-8 sm:!mb-12"
              />
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 relative z-10">
              {[
                { icon: Globe, stat: "40+", label: "Countries Served" },
                { icon: Truck, stat: "500K+", label: "Units Shipped/Year" },
                { icon: MessageCircle, stat: "24h", label: "Response Time" },
                { icon: CheckCircle, stat: "99.7%", label: "On-Time Delivery" }
              ].map((item, i) => (
                <motion.div key={i} variants={scaleIn} className="bg-navy-900/60 backdrop-blur-md border border-navy-700 rounded-2xl p-6 text-center hover:border-amber-500/50 transition-colors group">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-0.5 sm:mb-1">{item.stat}</div>
                  <div className="text-navy-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* SECTION 7: BOTTOM CTA */}
      <section className="py-16 md:py-24 bg-[#F1EFE8] relative overflow-hidden mt-10">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-white shadow-2xl shadow-navy-900/30 border-y sm:border border-navy-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 z-0 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] z-0 pointer-events-none"></div>

            <div className="relative z-10 flex-1 max-w-2xl text-center md:text-left">
              <SectionHeader
                badge="Ready to Order?"
                title={<>Request a Wholesale <span className="text-amber-400">Brake Chamber Quote</span></>}
                description="Tell us your target volumes, brake chamber types, and destination country. Our team will respond with factory-direct pricing, estimated lead times, and shipping options within 24 hours."
                align="left"
                theme="dark"
                accentColor="amber"
                className="!mb-0"
                plainText={true}
              />
            </div>

            <div className="relative z-10 flex flex-col w-full md:w-auto gap-4 min-w-[240px] shrink-0 mt-8 md:mt-0">
              <Link
                href="/quote"
                className="bg-amber-500 text-navy-950 font-black py-4 px-8 rounded-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 text-center uppercase tracking-widest text-[13px] transform hover:-translate-y-1"
              >
                Request a Quote <ArrowRight className="inline-block w-4 h-4 ml-2 -mt-1" />
              </Link>
              <Link
                href="/contact?subject=Sample+Request"
                className="bg-navy-800 text-white border border-navy-600 font-black py-4 px-8 rounded-xl hover:bg-navy-700 hover:border-navy-500 transition-all text-center uppercase tracking-widest text-[13px] transform hover:-translate-y-1"
              >
                Order Evaluation Samples
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
