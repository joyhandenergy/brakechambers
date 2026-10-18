import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm font-medium text-slate-500 mb-6" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="hover:text-navy-900 transition-colors flex items-center text-slate-400"
        aria-label="Home"
      >
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={16} className="mx-2 text-slate-300" />
          {item.href ? (
             <Link 
               href={item.href} 
               className="hover:text-navy-900 transition-colors"
             >
               {item.label}
             </Link>
          ) : (
             <span className="text-navy-900 font-bold" aria-current="page">
               {item.label}
             </span>
          )}
        </div>
      ))}
    </nav>
  );
}
