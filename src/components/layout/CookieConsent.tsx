'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented via cookies
    const hasConsented = document.cookie.split('; ').find(row => row.startsWith('cookie-consent='));
    
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie to expire in 365 days
    document.cookie = "cookie-consent=accepted; max-age=" + (60 * 60 * 24 * 365) + "; path=/";
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Set cookie to expire in 365 days
    document.cookie = "cookie-consent=declined; max-age=" + (60 * 60 * 24 * 365) + "; path=/";
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-0 md:left-auto md:right-6 md:bottom-6 md:w-[420px] pointer-events-none"
        >
          <Card padding="none" className="border-slate-200 pointer-events-auto shadow-2xl">
            {/* Top Amber Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FFB000]" />
            
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-100/50">
                    <ShieldCheck className="w-5 h-5 text-[#FFB000]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy-900 tracking-tight leading-none">
                    Privacy & Cookies
                  </h3>
                </div>
                <button 
                  onClick={handleDecline}
                  className="text-navy-400 hover:text-navy-900 transition-colors p-1 -mr-1 -mt-1 rounded-full hover:bg-navy-50"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium mb-6">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By using our website, you consent to our use of cookies. Read our{' '}
                <Link href="/privacy" className="text-amber-600 hover:text-amber-500 font-bold underline decoration-amber-500/30 underline-offset-2 transition-colors">
                  Privacy Policy
                </Link>.
              </p>
              
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  onClick={handleDecline}
                  className="flex-1 bg-white hover:bg-slate-50 text-navy-900 font-extrabold text-[12px] uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-200 border-2 border-navy-200 active:scale-[0.98]"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-[#FFB000] hover:bg-[#e59d00] text-navy-950 font-extrabold text-[12px] uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md shadow-amber-500/20 border-2 border-[#FFB000] hover:border-[#e59d00]"
                >
                  Accept All
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
