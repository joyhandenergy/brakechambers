"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string | React.ReactNode;
}

interface GlobalFAQAccordionProps {
  faqs: FAQItem[];
  theme?: 'light' | 'dark';
}

export default function GlobalFAQAccordion({ faqs, theme = 'light' }: GlobalFAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isDark = theme === 'dark';

  return (
    <div className="w-full space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
              isOpen
                ? 'bg-slate-100 border-amber-400 shadow-md'
                : 'bg-slate-100 border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md'
            }`}
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full text-left px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-expanded={isOpen}
            >
              <span className={`font-bold pr-4 sm:pr-8 text-base sm:text-lg leading-tight transition-colors duration-200 ${
                isOpen ? 'text-amber-600' : 'text-navy-900'
              }`}>
                {faq.q}
              </span>
              <div
                className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? 'rotate-180 bg-amber-500 text-navy-950 shadow-lg shadow-amber-500/40'
                    : 'bg-amber-500 text-navy-950 hover:bg-amber-400 shadow-md shadow-amber-500/30'
                }`}
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-0 text-sm sm:text-base leading-relaxed text-slate-600 border-t border-slate-200">
                    <div className="pt-4">{faq.a}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
