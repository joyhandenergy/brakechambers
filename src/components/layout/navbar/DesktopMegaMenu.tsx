import React, { useState } from 'react';
import Link from 'next/link';
import { MegaMenuConfig } from '@/lib/navigationData';

interface DesktopMegaMenuProps {
  config: MegaMenuConfig;
  isActive: boolean;
  isScrolled: boolean;
  getLinkClass: (path: string) => string;
}

export default function DesktopMegaMenu({ config, isActive, isScrolled, getLinkClass }: DesktopMegaMenuProps) {
  const [forceHide, setForceHide] = useState(false);

  const handleLinkClick = () => {
    setForceHide(true);
    setTimeout(() => {
      setForceHide(false);
    }, 500);
  };

  const isSingleColumn = config.columns.length === 1;

  return (
    <div className={`${isSingleColumn ? 'relative' : ''} group h-full flex items-center`}>
      <Link 
        href={config.href} 
        onClick={handleLinkClick}
        className={`cursor-pointer transition-colors py-3 h-full flex items-center border-b-[3px] ${
          isActive 
            ? `font-bold ${isScrolled ? 'border-amber-400 text-amber-400' : 'border-amber-500 text-amber-600'}` 
            : 'border-transparent ' + (isScrolled ? 'group-hover:border-amber-400 group-hover:text-white' : 'group-hover:border-amber-500 group-hover:text-amber-600')
        }`}
      >
        {config.title}
      </Link>
      {isSingleColumn ? (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl border border-slate-200 rounded-2xl p-5 transition-all duration-300 ease-out z-50 mt-1 ${
          forceHide ? 'hidden' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
        }`}>
          {config.columns.map((column, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="flex items-center gap-2 text-navy-900 font-extrabold text-sm mb-3 border-b border-slate-100 pb-2">
                {column.icon} {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.href} onClick={handleLinkClick} className={getLinkClass(link.href)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-200 transition-all duration-300 ease-out z-50 ${
          forceHide ? 'hidden' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] py-8">
            <div className="grid grid-cols-4 gap-8">
              {config.columns.map((column, idx) => (
                <div key={idx} className={column.extraContent ? "flex flex-col justify-center" : ""}>
                  {column.extraContent ? (
                    column.extraContent
                  ) : (
                    <>
                      <h3 className="flex items-center gap-2 text-navy-900 font-bold text-lg mb-4 border-b border-slate-200 pb-2">
                        {column.icon} {column.title}
                      </h3>
                      <ul className="space-y-3">
                        {column.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link href={link.href} onClick={handleLinkClick} className={getLinkClass(link.href)}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        {column.ctaLink && (
                          <li className="pt-2">
                            <Link href={column.ctaLink.href} onClick={handleLinkClick} className="inline-flex items-center gap-2 transform transition-transform duration-200 text-amber-600 font-bold hover:text-amber-500 hover:translate-x-1 text-sm">
                              {column.ctaLink.icon} {column.ctaLink.label}
                            </Link>
                          </li>
                        )}
                      </ul>
                      {column.viewAllLink && (
                        <Link href={column.viewAllLink.href} onClick={handleLinkClick} className="inline-block mt-4 text-amber-500 font-bold hover:text-amber-600 transition-colors text-sm">
                          {column.viewAllLink.label}
                        </Link>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
