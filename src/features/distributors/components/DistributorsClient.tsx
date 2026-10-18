"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, FileSignature, ArrowRight, Globe, Lock, Mail, Building, Phone, PhoneCall, ExternalLink, ShieldCheck, CheckCircle, X, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';

const MOCK_DISTRIBUTORS: any[] = [];

const REGIONS = ['All', 'North America', 'Europe', 'Middle East', 'Asia Pacific', 'South America', 'Africa'];

export default function DistributorsClient() {
  const [activeModal, setActiveModal] = useState<'none' | 'login' | 'register'>('none');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    businessType: 'Aftermarket Parts Wholesaler',
    notes: '',
    agreeTerms: false
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => ({
    company: touched.company ? validateRequired(formData.company, 'Company name', 2) : null,
    contactName: touched.contactName ? validateRequired(formData.contactName, 'Contact name', 2) : null,
    email: touched.email ? validateEmail(formData.email) : null,
    phone: touched.phone ? validatePhone(formData.phone, true) : null,
    country: touched.country ? validateRequired(formData.country, 'Country / Region', 2) : null,
    agreeTerms: touched.agreeTerms && !formData.agreeTerms ? 'You must agree to the distributor terms' : null,
  }), [formData, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setServerError(null);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const allTouched = {
      company: true,
      contactName: true,
      email: true,
      phone: true,
      country: true,
      agreeTerms: true
    };
    setTouched(allTouched);

    const hasErrors =
      validateRequired(formData.company, 'Company name', 2) ||
      validateRequired(formData.contactName, 'Contact name', 2) ||
      validateEmail(formData.email) ||
      validatePhone(formData.phone, true) ||
      validateRequired(formData.country, 'Country / Region', 2) ||
      (!formData.agreeTerms ? 'You must agree to terms' : null);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'Distributor Application', ...formData })
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to submit application');
      }
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Submission failed', error);
      setServerError(error.message || 'Something went wrong. Please try again or email sales@brakechambers.com');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const closeModal = () => {
    setActiveModal('none');
    setServerError(null);
    setTimeout(() => setIsSuccess(false), 300);
  };

  const filteredDistributors = MOCK_DISTRIBUTORS.filter(d => selectedRegion === 'All' || d.region === selectedRegion);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal !== 'none') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup function to restore scrolling if component unmounts while modal is open
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  return (
    <article className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-clip relative">
      <PageHeader
        badge="Global Network & Portal"
        badgeIcon={Globe}
        title="Become a BRC Brake Chamber Distributor: Global Partner Network"
        description="Join BRC's global network of authorized brake chamber distributors. Access wholesale pricing, private-label programs, marketing support, and priority factory logistics. Apply to become a distributor or log in to the partner portal."
        imageSrc="/images/pageheaders/brc_whosale_distributor.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Distributors' }
        ]}
      />

      {/* Main Content Area */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] relative z-20 flex-grow flex flex-col mb-16">
        
        {/* Overlapping Quick Actions Box */}
        <div className="-mt-8 sm:-mt-20 bg-white border border-slate-200 rounded-2xl sm:rounded-[2rem] p-6 lg:p-8 shadow-sm sm:shadow-xl shadow-slate-200/50 mb-10 sm:mb-16 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="w-full text-center md:text-left">
              <SectionHeader
                title="Partner Portal"
                description="Access B2B pricing, or apply to join our global network."
                align="left"
                theme="light"
                accentColor="navy"
                plainText={true}
                className="!mb-0"
              />
           </div>
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button onClick={() => setActiveModal('login')} className="bg-navy-50 text-navy-900 hover:bg-navy-100 border border-navy-100 font-extrabold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md w-full md:w-auto text-sm sm:text-base uppercase tracking-wider whitespace-nowrap cursor-pointer">
                 <Lock className="w-5 h-5 shrink-0"/> Partner Login
              </button>
              <button onClick={() => setActiveModal('register')} className="bg-amber-500 text-navy-950 hover:bg-amber-400 font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 w-full md:w-auto text-sm sm:text-base uppercase tracking-wider hover:-translate-y-0.5 whitespace-nowrap cursor-pointer">
                 <FileSignature className="w-5 h-5 shrink-0"/> Become a Partner
              </button>
           </div>
        </div>

        {/* Network Content (Always Visible) */}
        <div className="w-full flex-grow relative min-h-[400px]">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Sticky Sidebar for Regions */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <div className="sticky top-32">
                <h2 className="text-xl font-extrabold text-navy-900 mb-6 font-heading tracking-tight flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-500" /> Filter by Region
                </h2>
                <div className="flex flex-row lg:flex-col flex-wrap gap-2">
                  {REGIONS.map(region => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`flex items-center justify-between px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
                        selectedRegion === region
                          ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20 scale-[1.02]'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {region}
                      {selectedRegion === region && <ArrowRight className="w-4 h-4 text-amber-500" />}
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-navy-50 rounded-2xl border border-navy-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-2">Verified Partners</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">All listed distributors are fully authorized to sell genuine BRC OEM replacement parts and honor factory warranties.</p>
                </div>
              </div>
            </div>

            {/* Right Side Grid */}
            <div className="w-full lg:w-3/4">
              <SectionHeader
                title="Global Authorized Network"
                description={selectedRegion === 'All' ? 'Showing all international distributors.' : `Showing authorized distributors in ${selectedRegion}.`}
                align="left"
                theme="light"
                accentColor="navy"
                plainText={true}
                asH1={true}
                className="!mb-8"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredDistributors.map((dist) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={dist.id}
                      className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-200/60 p-6 sm:p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-300 flex flex-col relative overflow-hidden group"
                    >
                      {/* Decorative abstract map/grid watermark */}
                      <div className="absolute -right-12 -top-12 w-48 h-48 bg-slate-50 rounded-full opacity-50 group-hover:bg-amber-50 transition-colors duration-500 -z-0"></div>
                      <div className="absolute right-8 top-8 w-16 h-16 border-4 border-slate-100 rounded-full opacity-50 group-hover:border-amber-100 transition-colors duration-500 -z-0"></div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all duration-300 flex-shrink-0 text-navy-900">
                            <MapPin className="w-6 h-6" />
                          </div>
                          <span className="text-xs uppercase tracking-wider font-extrabold bg-slate-100 text-slate-600 px-3.5 py-1 rounded-full border border-slate-200">
                            {dist.type}
                          </span>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-navy-900 mb-2">{dist.name}</h3>
                        
                        <div className="flex items-start gap-3 text-slate-500 mb-6">
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                          <div className="font-normal leading-relaxed text-sm sm:text-base text-slate-600">
                            {dist.address}<br />
                            {dist.city}, {dist.country}
                          </div>
                        </div>
                        
                        <div className="mt-auto pt-6 border-t border-slate-100 space-y-3.5 mb-8">
                          <a href={`tel:${dist.phone}`} className="flex items-center gap-3 text-sm sm:text-base text-navy-800 hover:text-amber-600 font-bold transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0"><PhoneCall className="w-5 h-5 text-slate-400" /></div>
                            {dist.phone}
                          </a>
                          <a href={`mailto:${dist.email}`} className="flex items-center gap-3 text-sm sm:text-base text-navy-800 hover:text-amber-600 font-bold transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-slate-400" /></div>
                            {dist.email}
                          </a>
                        </div>

                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${dist.name} ${dist.address} ${dist.city} ${dist.country}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl sm:rounded-2xl transition-all shadow-md hover:shadow-lg text-sm sm:text-base group/btn"
                        >
                          <ExternalLink className="w-4.5 h-4.5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" /> 
                          View on Google Maps
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {filteredDistributors.length === 0 && (
                <div className="text-center py-12 sm:py-20 px-4 sm:px-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 mt-6 shadow-sm">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">No distributors in this region</h3>
                  <p className="text-slate-500 text-[15px] leading-[1.6] font-normal mb-6 max-w-md mx-auto">We are actively looking for qualified partners to exclusively represent BRC in this territory.</p>
                  <button 
                    onClick={() => setActiveModal('register')} 
                    className="inline-flex items-center gap-2 bg-amber-500 text-navy-950 font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20 whitespace-nowrap"
                  >
                    Apply for Territory Rights <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modals for Login & Register */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeModal()}
              className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
            />
            
            {/* Modal Content Wrapper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`relative z-10 w-full max-w-4xl flex flex-col ${activeModal === 'login' ? 'h-auto p-4 sm:p-0' : 'h-full sm:h-auto'}`}
            >
              {/* LOGIN MODAL */}
              {activeModal === 'login' && (
                <div className="max-w-md mx-auto w-full bg-white rounded-[2rem] shadow-2xl border border-slate-200/60 relative flex flex-col overflow-hidden">
                  {/* Fixed Header with Close Button */}
                  <div className="shrink-0 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 bg-white relative z-20 flex justify-end">
                    <button 
                      onClick={() => closeModal()}
                      className="w-10 h-10 bg-navy-900 hover:bg-navy-800 text-white shadow-xl shadow-navy-900/20 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-amber-50 rounded-full opacity-50 blur-2xl z-0 pointer-events-none"></div>

                  <div className="px-6 sm:px-8 pb-8 sm:pb-10 relative z-10 flex flex-col items-center">
                    <div className="text-center mb-6 relative z-10 w-full">
                      <div className="w-16 h-16 bg-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-navy-900/20">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                      <SectionHeader
                        title="Portal Coming Soon"
                        description="We are currently building our online wholesale portal. Check back soon for B2B pricing, live inventory, and bulk ordering."
                        align="center"
                        theme="light"
                        accentColor="navy"
                        plainText={true}
                        className="!mb-0"
                      />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center w-full">
                      <p className="text-slate-500 text-center mb-6">
                        If you are interested in becoming a partner, please submit an application.
                      </p>
                      <button 
                        onClick={() => setActiveModal('register')} 
                        className="bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group whitespace-nowrap w-full sm:w-auto"
                      >
                        Become a Partner <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* REGISTER MODAL */}
              {activeModal === 'register' && (
                <div className="w-full h-full sm:h-auto sm:max-h-[88vh] bg-white rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-slate-200/90 relative flex flex-col overflow-hidden">
                  {/* Signature top accent line */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-navy-900 via-amber-500 to-navy-900 shrink-0" />

                  {/* Fixed Header Bar with Badges & Close Button */}
                  <div className="shrink-0 px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-4 bg-slate-50/70 border-b border-slate-200/80 relative z-10 pr-14 sm:pr-16">
                    <button 
                      onClick={() => closeModal()}
                      className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 bg-navy-900 hover:bg-navy-800 text-white shadow-md rounded-full flex items-center justify-center transition-transform hover:scale-105 z-20 cursor-pointer"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-wider">
                        <Globe className="w-4 h-4 text-amber-600" />
                        Distributor Program
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
                      Become an Authorized BRC Distributor
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed">
                      Join our international distribution network. Gain direct factory pricing, territory protection, priority manufacturing, and dedicated engineering support.
                    </p>
                  </div>

                  {/* Scrollable Body */}
                  <div className="modal-scroll flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                    {isSuccess ? (
                      <div className="text-center py-10 px-4">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-emerald-100">
                          <CheckCircle className="w-9 h-9 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-2">Application Received!</h3>
                        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                          Thank you for your interest in becoming a BRC partner. Our distributor success team will review your application and contact you within 2-3 business days.
                        </p>
                        <button 
                          onClick={closeModal}
                          className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                        >
                          Return to Distributors
                        </button>
                      </div>
                    ) : (
                      <form className="space-y-5 sm:space-y-6" onSubmit={handleRegisterSubmit} noValidate>
                        {serverError && (
                          <div className="p-3.5 bg-rose-50/70 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-start gap-2.5">
                            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{serverError}</span>
                          </div>
                        )}

                        {/* Section 01: Contact & Corporate Profile */}
                        <div>
                          <div className="flex items-center gap-3 pb-3 mb-5 border-b border-slate-100">
                            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-900 text-amber-400 font-bold text-sm sm:text-base flex items-center justify-center shrink-0">
                              01
                            </span>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-900">
                              Contact & Corporate Profile
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            {/* Contact Name */}
                            <div>
                              <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                                Contact Name <span className="text-amber-500 font-bold">*</span>
                              </label>
                              <input
                                type="text"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                onBlur={() => handleBlur('contactName')}
                                required
                                disabled={isSubmitting}
                                placeholder="John Doe"
                                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                                  errors.contactName
                                    ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                                    : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                                }`}
                              />
                              {errors.contactName && (
                                <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.contactName}
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
                                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
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

                            {/* Company Name */}
                            <div>
                              <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                                Company Name <span className="text-amber-500 font-bold">*</span>
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
                                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
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

                            {/* Country / Region */}
                            <div>
                              <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                                Country / Region <span className="text-amber-500 font-bold">*</span>
                              </label>
                              <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                onBlur={() => handleBlur('country')}
                                required
                                disabled={isSubmitting}
                                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base font-medium focus:outline-none transition-all shadow-2xs bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed cursor-pointer ${
                                  errors.country ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400' : ''
                                }`}
                              >
                                <option value="">Select Region...</option>
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Europe">Europe</option>
                                <option value="Middle East">Middle East</option>
                                <option value="Latin America">Latin America</option>
                                <option value="Asia Pacific">Asia Pacific</option>
                                <option value="Africa">Africa</option>
                              </select>
                              {errors.country && (
                                <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.country}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Section 02: Commercial & Channel Operations */}
                        <div>
                          <div className="flex items-center gap-3 pb-3 mb-5 border-b border-slate-100">
                            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-900 text-amber-400 font-bold text-sm sm:text-base flex items-center justify-center shrink-0">
                              02
                            </span>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-900">
                              Commercial & Channel Operations
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            {/* Phone Number */}
                            <div>
                              <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                                Direct Phone / WhatsApp <span className="text-amber-500 font-bold">*</span>
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={() => handleBlur('phone')}
                                required
                                disabled={isSubmitting}
                                placeholder="+1 (555) 019-2834"
                                className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
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

                            {/* Business Type */}
                            <div>
                              <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                                Primary Business Activity
                              </label>
                              <select
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 sm:py-3.5 bg-white border border-slate-200 rounded-xl sm:rounded-2xl text-navy-900 text-base font-medium focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all cursor-pointer shadow-2xs"
                              >
                                <option value="Aftermarket Heavy-Duty Parts Wholesaler">Aftermarket Heavy-Duty Parts Wholesaler</option>
                                <option value="Commercial Truck & Trailer Dealership">Commercial Truck & Trailer Dealership</option>
                                <option value="Fleet Maintenance / Repair Facility Chain">Fleet Maintenance / Repair Facility Chain</option>
                                <option value="OEM / Trailer Axle Manufacturer">OEM / Trailer Axle Manufacturer</option>
                                <option value="Import / Export Trading Company">Import / Export Trading Company</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Section 03: Verification & Terms */}
                        <div>
                          <div className="flex items-center gap-3 pb-3 mb-5 border-b border-slate-100">
                            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-900 text-amber-400 font-bold text-sm sm:text-base flex items-center justify-center shrink-0">
                              03
                            </span>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-900">
                              Verification & Terms
                            </h3>
                          </div>

                          <div className={`flex items-start gap-3.5 p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all ${
                            errors.agreeTerms ? 'bg-rose-50/60 border-rose-300' : 'bg-slate-50/70 border-slate-200'
                          }`}>
                            <input
                              type="checkbox"
                              id="terms"
                              name="agreeTerms"
                              checked={formData.agreeTerms}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              className="mt-1 w-4.5 h-4.5 text-amber-500 rounded border-slate-300 focus:ring-amber-500 cursor-pointer shrink-0"
                            />
                            <label htmlFor="terms" className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal cursor-pointer">
                              I verify that I am an authorized corporate representative and agree to the BRC Distributor Terms & Conditions. <span className="text-amber-500 font-bold">*</span>
                            </label>
                          </div>
                          {errors.agreeTerms && (
                            <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.agreeTerms}
                            </p>
                          )}
                        </div>

                        {/* Submit Button & Trust Markers */}
                        <div className="pt-2">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 disabled:cursor-not-allowed text-navy-950 font-black text-sm sm:text-base py-4 sm:py-4.5 px-6 rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-2.5 uppercase tracking-wider transform hover:-translate-y-0.5 cursor-pointer"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                PROCESSING APPLICATION...
                                <div className="w-5 h-5 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                SUBMIT APPLICATION
                                <ArrowRight className="w-5 h-5 shrink-0" />
                              </span>
                            )}
                          </button>

                          {/* Trust Markers */}
                          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 font-medium text-center">
                            <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                            <span>Direct Factory Pricing • Manufactured to IATF 16949 Standards • Evaluation &lt; 48h</span>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </article>
  );
}

