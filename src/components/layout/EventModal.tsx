'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

// Campaign lasts for 1 month: active through November 30, 2026 23:59:59 UTC
const EXPIRY_TIMESTAMP = new Date('2026-11-30T23:59:59Z').getTime();

export default function EventModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // If campaign period has ended (after 1 month), do not show
    if (Date.now() > EXPIRY_TIMESTAMP) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    try {
      const badgeDismissed = sessionStorage.getItem('brc_aapex_badge_dismissed');
      if (!badgeDismissed) {
        setShowBadge(true);
      }

      const hasSeenThisSession = sessionStorage.getItem('brc_aapex_modal_seen');

      // Initial visit: show full pop-up once after a gentle 2.5s delay
      if (!hasSeenThisSession) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem('brc_aapex_modal_seen', 'true');
        }, 2500);

        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => setIsOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('brc_aapex_modal_seen', 'true');
    } catch {}
  }, []);

  const dismissBadge = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBadge(false);
    try {
      sessionStorage.setItem('brc_aapex_badge_dismissed', 'true');
    } catch {}
  }, []);

  // Keyboard shortcut: close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!mounted) {
    return null;
  }

  // Pre-filled WhatsApp link
  const whatsappUrl = `https://wa.me/85253629718?text=${encodeURIComponent(
    "Hello BRC! I'm attending AAPEX 2026 in Las Vegas and would like to meet at Booth #19710."
  )}`;

  return (
    <>
      {/* 1. Full Modal Pop-up (Shows once on arrival, mobile-responsive, pure image, clickable) */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
            aria-modal="true"
            role="dialog"
            aria-label="AAPEX 2026 Invitation"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeModal}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Pure Image Container - responsive scaling */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative z-10 w-full max-w-[90vw] sm:max-w-[420px] select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button directly on the image */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeModal();
                }}
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black text-white hover:text-amber-400 flex items-center justify-center shadow-2xl transition-all duration-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Clickable Image (tapping opens WhatsApp) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transition-transform active:scale-[0.99] cursor-pointer"
                title="Click to chat with us on WhatsApp (+852 53629718)"
              >
                <Image
                  src="/images/aapex-2026.jpg"
                  alt="Meet BRC Brake Chambers at AAPEX 2026 Las Vegas - Booth 19710 (Nov 3-5)"
                  width={980}
                  height={980}
                  priority
                  className="w-full h-auto object-contain block rounded-xl sm:rounded-2xl"
                />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Compact Halfway Teaser (Reduced size, mobile-optimized, unobtrusive) */}
      <AnimatePresence>
        {showBadge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-[90] w-[176px] sm:w-[208px] select-none"
          >
            <div className="relative bg-navy-950 rounded-xl sm:rounded-2xl border border-amber-500/50 shadow-xl overflow-hidden group transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/10">
              
              {/* Slim Header Bar */}
              <div className="flex items-center justify-between px-2.5 py-1 bg-navy-900 border-b border-navy-800 text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB000]"></span>
                  </span>
                  <span className="tracking-wide">AAPEX 2026</span>
                </div>

                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-navy-800 transition-colors cursor-pointer"
                    aria-label="Expand AAPEX invitation"
                    title="Expand flyer"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={dismissBadge}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-navy-800 transition-colors cursor-pointer"
                    aria-label="Dismiss AAPEX reminder"
                    title="Dismiss"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Compact Halfway Cropped Image Preview */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative block w-full text-left cursor-pointer overflow-hidden focus:outline-none"
                title="Click to view full AAPEX flyer"
              >
                {/* Shows the top half of the flyer image: BRC logo, Las Vegas, AAPEX 2026, Booth #19710 */}
                <div className="relative w-full h-20 sm:h-24 overflow-hidden bg-navy-950">
                  <Image
                    src="/images/aapex-2026.jpg"
                    alt="AAPEX 2026 Las Vegas Booth 19710"
                    width={980}
                    height={980}
                    className="w-full h-auto object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Subtle soft shadow vignette at the bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-navy-950/80 to-transparent" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
