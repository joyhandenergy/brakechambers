'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  Package, 
  Truck, 
  ArrowRight, 
  Trash2, 
  CheckCircle2, 
  User, 
  Building, 
  Mail, 
  Phone, 
  AlertCircle, 
  FileText, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Clock, 
  MessageCircle,
  Sparkles,
  Lock,
  Unlock,
  Check,
  Search,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';

export default function QuoteClient() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    volume: 'LCL (Less than Container Load - Pallet)',
    incoterms: 'FOB (Free on Board - Ningbo / Shanghai)',
    destination: '',
    notes: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const totalUnits = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [items]);

  // CORE RULE: Without product selection the form cannot be active
  const hasProducts = items.length > 0;
  const isFormActive = hasProducts;

  const errors = useMemo(() => ({
    name: touched.name ? validateRequired(formData.name, 'Full name', 2) : null,
    companyName: touched.companyName ? validateRequired(formData.companyName, 'Company name', 2) : null,
    email: touched.email ? validateEmail(formData.email) : null,
    phone: touched.phone ? validatePhone(formData.phone, false) : null,
    destination: touched.destination ? validateRequired(formData.destination, 'Country', 2) : null,
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

  const handleQtyChange = (id: string, delta: number, currentQty: number) => {
    const nextQty = Math.max(1, currentQty + delta);
    updateQuantity(id, nextQty);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    // Guard: Form cannot be submitted without at least 1 product selected
    if (!isFormActive || items.length === 0) {
      setServerError('Please select at least one brake chamber from our catalog to activate and submit your quotation request.');
      return;
    }

    const allTouched = {
      name: true,
      companyName: true,
      email: true,
      phone: true,
      destination: true,
      notes: true
    };
    setTouched(allTouched);

    const hasErrors =
      validateRequired(formData.name, 'Full name', 2) ||
      validateRequired(formData.companyName, 'Company name', 2) ||
      validateEmail(formData.email) ||
      validatePhone(formData.phone, false) ||
      validateRequired(formData.destination, 'Country', 2);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    
    // Prepare rich products data including image URLs for email and lead tracking
    const quoteProducts = items.map(i => {
      const rawImg = (i.product as any).imageUrl || (i.product as any).galleryUrls?.[0] || '/productsImage/brc-t16-single-brake-1.jpg';
      const fullImageUrl = rawImg.startsWith('http') 
        ? rawImg 
        : `https://www.brakechambers.com${rawImg.startsWith('/') ? '' : '/'}${rawImg}`;

      return {
        name: i.product.name,
        sku: i.product.slug.toUpperCase(),
        quantity: i.quantity,
        category: i.product.category,
        strokeSize: (i.product as any).strokeSize || '',
        imageUrl: fullImageUrl,
        productUrl: `https://www.brakechambers.com/products/${i.product.slug}`
      };
    });

    const quoteItems = quoteProducts.map(p => 
      `${p.name} (SKU: ${p.sku}, Qty: ${p.quantity}) - Image: ${p.imageUrl}`
    );
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          source: 'Brake Chamber Wholesale RFQ', 
          ...formData,
          totalUnitsConfigured: totalUnits,
          items: quoteItems,
          products: quoteProducts,
          productImages: quoteProducts.map(p => p.imageUrl)
        })
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to submit quote request');
      }
      setIsSuccess(true);
      clearCart();
    } catch (error: any) {
      console.error('Submission failed', error);
      setServerError(error.message || 'Something went wrong. Please try again or email sales@brakechambers.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  // Selected Chambers (Quote Cart) Component - Positioned at top on mobile, and in sticky sidebar on desktop
  const selectedChambersContent = (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(10,25,41,0.06)] border border-slate-200/90 relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />
          <h3 className="font-extrabold text-navy-900 text-lg sm:text-xl">Selected Chambers</h3>
        </div>
        <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full border ${
          hasProducts 
            ? 'text-slate-800 bg-slate-100 border-slate-200' 
            : 'text-amber-800 bg-amber-50 border-amber-200'
        }`}>
          {items.length} {items.length === 1 ? 'Model' : 'Models'} ({totalUnits} Pcs)
        </span>
      </div>

      {!hasProducts ? (
        <div className="bg-slate-50/80 border border-dashed border-slate-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-white rounded-xl shadow-2xs border border-slate-200/80 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-slate-400" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-navy-900 mb-1">No Chambers Selected Yet</h4>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto mb-4 font-normal leading-relaxed">
            Browse our catalog to select your required brake chambers. The quotation form activates immediately upon selecting a product.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-2xs transition-all group"
          >
            Browse Product Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {items.map((item) => {
              const itemImg = (item.product as any).imageUrl || (item.product as any).galleryUrls?.[0] || '/productsImage/brc-t16-single-brake-1.jpg';

              return (
                <div 
                  key={item.id} 
                  className="p-3.5 bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl sm:rounded-2xl transition-colors relative"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Product Image Thumbnail */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-slate-200 overflow-hidden relative shrink-0 p-1">
                      <Image
                        src={itemImg}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 56px, 64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] sm:text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 uppercase tracking-wider">
                          {item.product.brandSlug === 'brc' ? 'BRC Original' : item.product.brandSlug}
                        </span>
                        <button 
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-bold text-navy-900 text-sm sm:text-base leading-snug line-clamp-1 mt-1">
                        {item.product.name}
                      </h4>

                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        SKU: {item.product.slug.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-200/60">
                    <span className="text-xs sm:text-sm font-semibold text-slate-600">Order Quantity:</span>
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(item.id, -1, item.quantity)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input 
                        type="number" 
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-10 text-center font-bold text-navy-900 text-sm focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleQtyChange(item.id, 1, item.quantity)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2.5 flex justify-between items-center border-t border-slate-100 text-xs sm:text-sm">
            <span className="text-slate-600">Total Units: <strong className="text-navy-900 font-bold">{totalUnits} Pcs</strong></span>
            <Link 
              href="/products" 
              className="font-bold text-amber-600 hover:text-amber-700 transition-colors inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add more models
            </Link>
          </div>
        </div>
      )}

      {/* Quick Process Roadmap */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/60 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-2xl sm:rounded-b-3xl">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy-900 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" /> Fast Turnaround Guarantee
        </div>
        <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
          <li>• Technical fitment & cross-reference verification</li>
          <li>• Itemized proforma with tiered container pricing</li>
          <li>• Express samples via DHL/FedEx or ocean FCL booking</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-4 sm:-mt-10 lg:-mt-16 relative z-20">
      
      {/* 2-Column Responsive RFQ Workspace (Mobile-compact & optimized) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        
        {/* LEFT COLUMN: Master Commercial RFQ Form (Desktop: 7-8 cols, Mobile: order-1) */}
        <div className="lg:col-span-7 xl:col-span-8 order-1">
          
          {/* Mobile-Only: Selected Chambers Card appears FIRST before the Form */}
          <div className="block lg:hidden mb-5">
            {selectedChambersContent}
          </div>

          <div className="-mx-4 sm:mx-0 bg-white rounded-none sm:rounded-3xl shadow-[0_12px_36px_rgba(10,25,41,0.06)] border-y sm:border border-slate-200/90 overflow-hidden relative">
            
            {/* Top Signature Brand Accent Line (Clean Navy & Amber - No harsh green borders) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-navy-900 via-amber-500 to-navy-900" />

            {/* Form Section Header Bar */}
            <div className="p-4 sm:p-6 lg:p-7 bg-slate-50/70 border-b border-slate-200/80">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-amber-600" />
                  Official Factory RFQ
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Commercial Quotation & Shipping Details
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 font-normal leading-relaxed">
                Provide your fleet credentials and destination port below. Our sales engineering team will prepare an itemized proforma invoice with tiered container pricing.
              </p>
            </div>

            {/* Success Overlay */}
            {isSuccess && (
              <div className="p-6 sm:p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-5 shadow-xs border border-emerald-100">
                  <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
                </div>
                <span className="inline-block px-3.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider mb-2.5">
                  RFQ Dispatched Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-2">Quotation Request Received</h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-lg mb-6 leading-relaxed font-normal">
                  Thank you! Our technical sales and export logistics desk in Zhuji will review your specifications, verify inventory and production lead times, and email your formal proforma quote within 24 hours.
                </p>
                
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 mb-6 max-w-md w-full text-left">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Need Immediate Expedited Assistance?</h4>
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

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-sm sm:text-base transition-colors cursor-pointer"
                  >
                    Submit Another Quote
                  </button>
                  <Link 
                    href="/products" 
                    className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm sm:text-base transition-colors shadow-sm"
                  >
                    Browse Product Catalog
                  </Link>
                </div>
              </div>
            )}

            {!isSuccess && (
              <form onSubmit={handleSubmit} noValidate className="p-4 sm:p-6 lg:p-7 flex flex-col gap-5 sm:gap-6 relative">
                
                {/* CALL TO ACTION STATE: If no products selected, display prominent CTA guiding user to catalog */}
                {!isFormActive ? (
                  <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200/90 rounded-2xl text-navy-950 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-navy-950 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                          <Lock className="w-3.5 h-3.5" /> Product Selection Required
                        </div>
                        <h3 className="font-extrabold text-base sm:text-lg text-navy-900 leading-snug">
                          Select a Brake Chamber from Our Catalog to Activate This Form
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-normal leading-relaxed">
                          Wholesale quotes are custom-tailored to specific chamber stroke sizes, port threads, and order volumes. Please choose your product from our catalog to unlock this RFQ form.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-sm transition-all group"
                      >
                        <span>Browse Catalog</span>
                        <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        href="/oem-cross-reference"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-slate-100 text-navy-900 font-bold border border-slate-200 rounded-xl text-xs sm:text-sm transition-colors"
                      >
                        <Search className="w-3.5 h-3.5 text-slate-500" />
                        <span>OEM Cross-Ref</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Clean, understated active banner without harsh green borders */
                  <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-center justify-between gap-3 text-navy-900">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <div className="text-xs sm:text-sm truncate">
                        <strong className="text-navy-900">RFQ Form Active:</strong>{' '}
                        <span className="text-slate-600 font-normal">{items.length} chamber model{items.length > 1 ? 's' : ''} attached ({totalUnits} pcs total).</span>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 shrink-0">
                      Proforma Ready
                    </span>
                  </div>
                )}

                {/* Server Error Alert */}
                {serverError && (
                  <div className="p-3.5 bg-rose-50/70 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* SECTION 01: Buyer & Fleet Information */}
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="John Doe"
                        required
                        disabled={!isFormActive || isSubmitting}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                          errors.name
                            ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                            : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.name}
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
                        placeholder="john@company.com"
                        required
                        disabled={!isFormActive || isSubmitting}
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

                    {/* Company Name */}
                    <div>
                      <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                        Company / Fleet Name <span className="text-amber-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('companyName')}
                        placeholder="Global Trucking Logistics"
                        required
                        disabled={!isFormActive || isSubmitting}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                          errors.companyName
                            ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                            : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                        }`}
                      />
                      {errors.companyName && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.companyName}
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
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        onBlur={() => handleBlur('destination')}
                        placeholder="United States"
                        required
                        disabled={!isFormActive || isSubmitting}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none placeholder:text-slate-400 placeholder:font-normal ${
                          errors.destination
                            ? 'bg-rose-50/30 border-2 border-rose-300 focus:border-rose-400 text-navy-900'
                            : 'bg-white border border-slate-200 text-navy-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed'
                        }`}
                      />
                      {errors.destination && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-600 font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {errors.destination}
                        </p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">
                        Direct Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+1 (555) 019-2834"
                        disabled={!isFormActive || isSubmitting}
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

                {/* SECTION 02: Shipping & Commercial Logistics */}
                <div>
                  <div className="flex items-center gap-3 pb-3 mb-5 border-b border-slate-100">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-900 text-amber-400 font-bold text-sm sm:text-base flex items-center justify-center shrink-0">
                      02
                    </span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-900">
                      Commercial & Delivery Terms
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Volume */}
                    <div>
                      <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">Estimated Order Volume</label>
                      <select
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        disabled={!isFormActive || isSubmitting}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium focus:outline-none transition-all shadow-2xs bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <option value="LCL (Less than Container Load - Pallet)">LCL (Less than Container Load - Pallet)</option>
                        <option value="20ft Container (FCL - Approx. 2,200 pcs)">20ft Container (FCL - Approx. 2,200 pcs)</option>
                        <option value="40ft Container (FCL - Approx. 4,500 pcs)">40ft Container (FCL - Approx. 4,500 pcs)</option>
                        <option value="Sample Order for Quality Testing">Sample Order for Testing & Verification</option>
                      </select>
                    </div>

                    {/* Incoterms */}
                    <div>
                      <label className="block text-sm sm:text-base font-bold text-navy-900 mb-1.5">Preferred Incoterms / Trade Term</label>
                      <select
                        name="incoterms"
                        value={formData.incoterms}
                        onChange={handleChange}
                        disabled={!isFormActive || isSubmitting}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium focus:outline-none transition-all shadow-2xs bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <option value="FOB (Free on Board - Ningbo / Shanghai)">FOB (Free on Board - Ningbo / Shanghai)</option>
                        <option value="CIF (Cost, Insurance & Freight to Your Port)">CIF (Cost, Insurance & Freight to Your Port)</option>
                        <option value="EXW (Ex Works Factory Floor - Zhuji)">EXW (Ex Works Factory Floor - Zhuji)</option>
                        <option value="DDP (Delivered Duty Paid to Warehouse)">DDP (Delivered Duty Paid)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 03: Technical Specifications & Notes */}
                <div>
                  <div className="flex items-center gap-3 pb-3 mb-5 border-b border-slate-100">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-900 text-amber-400 font-bold text-sm sm:text-base flex items-center justify-center shrink-0">
                      03
                    </span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-900">
                      Technical Specifications & Private Labeling <span className="text-slate-400 text-sm sm:text-base font-normal">(Optional)</span>
                    </h3>
                  </div>

                  <div>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Custom pushrod lengths, port threads, laser stamping, or branding requirements..."
                      disabled={!isFormActive || isSubmitting}
                      className="w-full p-4 rounded-xl sm:rounded-2xl text-base text-navy-900 font-medium transition-all shadow-2xs focus:outline-none resize-none bg-white border border-slate-200 placeholder:text-slate-400 placeholder:font-normal focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 disabled:bg-slate-50/70 disabled:text-slate-600 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Submit Action & Guarantee */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isFormActive || isSubmitting}
                    className={`w-full font-black text-sm sm:text-base py-4 sm:py-4.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2.5 uppercase tracking-wider ${
                      !isFormActive
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300 shadow-none'
                        : isSubmitting
                        ? 'bg-amber-300 text-navy-950 cursor-wait shadow-none'
                        : 'bg-amber-500 hover:bg-amber-400 text-navy-950 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transform hover:-translate-y-0.5 cursor-pointer'
                    }`}
                  >
                    {!isFormActive ? (
                      <span className="flex items-center gap-2 text-slate-600 font-bold">
                        <Lock className="w-5 h-5 text-slate-500 shrink-0" />
                        SELECT PRODUCT FROM CATALOG FIRST
                      </span>
                    ) : isSubmitting ? (
                      <span className="flex items-center gap-2.5">
                        GENERATING RFQ...
                        <div className="w-5 h-5 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2.5">
                        REQUEST QUOTATION
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

        {/* RIGHT COLUMN: Dedicated Quote Cart & Manufacturing Assurance (Desktop: 4-5 cols, Mobile: order-2) */}
        <div className="lg:col-span-5 xl:col-span-4 order-2 space-y-6 lg:sticky lg:top-24">
          
          {/* Desktop-Only: Selected Chambers Card in sticky sidebar */}
          <div className="hidden lg:block">
            {selectedChambersContent}
          </div>

          {/* Card 2: Factory Credentials & WhatsApp Desk (Contained rounded card) */}
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-lg shadow-navy-950/15 relative overflow-hidden border border-navy-700">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center gap-2.5 mb-2.5">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              <h3 className="text-base sm:text-lg font-extrabold text-white">Direct Manufacturer Advantages</h3>
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
    </div>
  );
}
