"use client";

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import Card from '@/components/ui/Card';

interface MobileSidebarWrapperProps {
  children: React.ReactNode;
}

export default function MobileSidebarWrapper({ children }: MobileSidebarWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-navy-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-navy-800 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filter Products
        </button>
      </div>

      {/* Desktop Sidebar (always visible on lg+) */}
      <div className="hidden lg:flex flex-col gap-4 w-full">
        {children}
      </div>

      {/* Mobile Modal (visible only when isOpen on smaller screens) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex items-center justify-center p-3 sm:p-6">
          {/* Semi-transparent backdrop - allows user to see products changing */}
          <div 
            className="absolute inset-0 bg-navy-900/60 backdrop-blur-[2px] transition-opacity" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Centered Floating Modal (visible background on all sides) */}
          <Card padding="none" className="relative w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 bg-slate-50/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10 shrink-0">
              <h2 className="text-xl font-extrabold text-navy-900 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-amber-500" />
                Filters
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {children}
            </div>
            
            {/* Modal Footer (Sticky Apply Button) */}
            <div className="p-4 bg-white border-t border-slate-200 sticky bottom-0 z-10 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-navy-900 font-extrabold py-3.5 px-4 rounded-xl shadow-md transition-colors text-center"
              >
                View Results
              </button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
