import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  badge?: React.ReactNode;
  badgeIcon?: LucideIcon | React.ElementType;
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
  imageSrc?: string;
  breadcrumbs?: { label: string; href?: string }[];
  fullColorBackground?: boolean;
}

export default function PageHeader({ badge, badgeIcon: BadgeIcon, title, description, children, imageSrc, breadcrumbs, fullColorBackground = false }: PageHeaderProps) {
  return (
    <header className="relative pt-8 md:pt-10 lg:pt-12 pb-24 md:pb-32 lg:pb-40 border-b border-navy-800 overflow-hidden px-4 sm:px-6 lg:px-8 bg-navy-950">
      
      {/* Background Image (Only renders if an imageSrc is provided) */}
      <div className="absolute inset-0 z-0">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Header Background"
            fill
            unoptimized={imageSrc.startsWith('http')}
            className={`object-cover opacity-40 ${fullColorBackground ? '' : ' '}`}
            priority
          />
        )}
        {/* Dark Gradient Overlay to ensure text readability */}
        <div className={`absolute inset-0 ${fullColorBackground ? 'bg-gradient-to-b from-navy-950/80 via-navy-950/60 to-navy-950' : 'bg-gradient-to-b md:bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/40 opacity-90'}`}></div>
      </div>

      {/* Blueprint Grid Overlay (Static) */}
      <div
        className="absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Dynamic Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-amber-500 opacity-10 rounded-full blur-[80px] md:blur-[120px] -mr-20 -mt-20 md:-mr-40 md:-mt-40 mix-blend-screen pointer-events-none z-10"></div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl relative z-20">

        {/* TOP LEFT BREADCRUMB - Standardized Position */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 md:mb-10 w-full">
            <ol className="flex items-center gap-x-2 text-sm text-navy-300 font-medium whitespace-nowrap overflow-hidden">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <li className="flex-shrink-0"><span className="text-navy-600">/</span></li>}
                  {crumb.href ? (
                    <li className="flex-shrink-0">
                      <Link href={crumb.href} className="hover:text-amber-400 transition-colors block">
                        {crumb.label}
                      </Link>
                    </li>
                  ) : (
                    <li className="text-white min-w-0 flex-shrink truncate" aria-current={idx === breadcrumbs.length - 1 ? 'page' : undefined}>
                      {crumb.label}
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}

        {/* Left-Aligned Hero Content */}
        <div className="max-w-3xl text-left">
          {badge && (
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 mb-3 md:px-4 md:py-1.5 md:mb-4 rounded-full bg-gradient-to-r from-navy-800 to-navy-900 border border-navy-700 text-amber-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-navy-950 whitespace-nowrap">
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 md:w-4 md:h-4 -mt-0.5" />}
              <span>{badge}</span>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black text-white mb-4 tracking-tight leading-[1.1] drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-[15px] md:text-base lg:text-lg mb-6 md:mb-8 leading-[1.6] max-w-2xl font-normal text-navy-100">
            {description}
          </p>

          {children}
        </div>
      </div>
    </header>
  );
}
