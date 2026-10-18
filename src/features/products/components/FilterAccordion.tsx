"use client";

import React, { useState, useEffect } from 'react';

interface FilterAccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function FilterAccordion({ title, children, isOpen, onToggle }: FilterAccordionProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if provided, otherwise fallback to internal state
  const isActuallyOpen = isOpen !== undefined ? isOpen : internalOpen;

  // On mount, if it's uncontrolled, we might want it closed. 
  // Native details manages its own open attribute, but we are overriding it.

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group mb-2 lg:mb-0">
      {/* Mobile View (Accordion) */}
      <details className="lg:hidden group" open={isActuallyOpen}>
        <summary 
          onClick={handleToggle}
          className={`bg-navy-900 text-white font-bold py-3 px-4 text-sm flex justify-between items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
        >
          <span>{title}</span>
          <span className={`text-slate-400 transition-transform ${isActuallyOpen ? 'rotate-90' : ''}`}>&gt;</span>
        </summary>
        <div className="bg-white border-t border-navy-800">
          {children}
        </div>
      </details>

      {/* Desktop View (Always Open) */}
      <div className="hidden lg:block">
        <div className="bg-navy-900 text-white font-bold py-3 px-4 text-sm flex justify-between items-center">
          <span>{title}</span>
        </div>
        <div className="bg-white border-t border-navy-800">
          {children}
        </div>
      </div>
    </div>
  );
}
