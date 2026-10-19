"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Package, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSearchModalStore } from '@/store/search';
import type { BrakeChamber } from '@/types';

interface GlobalSearchModalProps {
  products: BrakeChamber[];
}

export default function GlobalSearchModal({ products }: GlobalSearchModalProps) {
  const router = useRouter();
  const { isOpen, closeSearch } = useSearchModalStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = React.useCallback(() => {
    setQuery('');
    closeSearch();
  }, [closeSearch]);

  useEffect(() => {
    if (isOpen) {
      // Prevent scrollbar jump by calculating its width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        clearTimeout(timer);
        document.body.style.paddingRight = '0px';
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useSearchModalStore.getState().openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const searchResults = React.useMemo(() => {
    if (!query.trim()) return { catalog: [], oem: [] };
    const q = query.toLowerCase();
    const qClean = q.replace(/[^a-z0-9]/g, '');
    const tokens = q.split(/\s+/).filter(t => t.length > 0);

    const catalog: Array<{ type: string; item: any }> = [];
    const oem: Array<{ type: string; item: any; matchedOem: { brand: string; partNumber: string } }> = [];

    products.forEach(p => {
      // Catalog matching
      const pNameLower = p.name.toLowerCase();
      const pNameClean = pNameLower.replace(/[^a-z0-9]/g, '');
      const pTypeClean = (p.type || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const pModelClean = (p.modelDesignation || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const pSlugClean = (p.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');

      const isCleanMatch = qClean.length >= 3 && (
        pNameClean.includes(qClean) ||
        pTypeClean.includes(qClean) ||
        pModelClean.includes(qClean) ||
        pSlugClean.includes(qClean) ||
        (p.hiddenSearchTags && p.hiddenSearchTags.some((tag: string) => tag.toLowerCase().replace(/[^a-z0-9]/g, '').includes(qClean)))
      );

      const isCatalogMatch = isCleanMatch || tokens.every(token => {
        const tokenClean = token.replace(/[^a-z0-9]/g, '');
        return pNameLower.includes(token) ||
          p.brandSlug.toLowerCase().includes(token) ||
          p.slug.toLowerCase().includes(token) ||
          (p.modelDesignation && p.modelDesignation.toLowerCase().includes(token)) ||
          (p.crossReferenceBrands && p.crossReferenceBrands.some((b: string) => b.toLowerCase().includes(token))) ||
          (p.hiddenSearchTags && p.hiddenSearchTags.some((tag: string) => {
            const tagLower = tag.toLowerCase();
            return tagLower.includes(token) || (tokenClean.length >= 3 && tag.toLowerCase().replace(/[^a-z0-9]/g, '').includes(tokenClean));
          }));
      });

      const type = p.category === 'Spring Brake' 
        ? 'spring-brake-chambers' 
        : (p.category === 'Air Disc Actuator' 
            ? 'air-disc-brake-actuators' 
            : (p.category === 'Parts & Kits' ? 'parts-and-kits' : 'service-brake-chambers'));

      if (isCatalogMatch) {
        catalog.push({ type, item: p });
      }

      // OEM matching
      if (p.oemPartNumbers) {
        p.oemPartNumbers.forEach(o => {
          const oPartLower = o.partNumber.toLowerCase();
          const oBrandLower = o.brand.toLowerCase();
          const oPartClean = oPartLower.replace(/[^a-z0-9]/g, '');

          const isOemMatch = 
            (qClean.length >= 3 && oPartClean.includes(qClean)) ||
            tokens.every(token => {
              const tokenClean = token.replace(/[^a-z0-9]/g, '');
              return oPartLower.includes(token) ||
                oBrandLower.includes(token) ||
                (tokenClean.length >= 3 && oPartClean.includes(tokenClean));
            });

          if (isOemMatch) {
            oem.push({ type, item: p, matchedOem: o });
          }
        });
      }
    });

    // Remove exact duplicates in OEM if multiple partial matches occur
    const uniqueOem = Array.from(new Map(oem.map(item => [item.matchedOem.partNumber + item.item.slug, item])).values());

    return { catalog, oem: uniqueOem };
  }, [query, products]);

  const handleSelect = (type: string, slug: string) => {
    router.push(`/${type}/${slug}`);
    handleClose();
  };

  const handleOemSelect = (brand: string, partNumber: string) => {
    const oBrandSlug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const oPartNum = partNumber.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/oem-cross-reference/${oBrandSlug}/${oPartNum}`);
    handleClose();
  };

  const handleOEMRequest = () => {
    const cleanQ = query.trim();
    router.push(cleanQ ? `/oem-cross-reference/request?part=${encodeURIComponent(cleanQ)}` : '/oem-cross-reference/request');
    handleClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.catalog.length > 0) {
      handleSelect(searchResults.catalog[0].type, searchResults.catalog[0].item.slug);
    } else if (searchResults.oem.length > 0) {
      handleOemSelect(searchResults.oem[0].matchedOem.brand, searchResults.oem[0].matchedOem.partNumber);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          
          <div className="fixed inset-0 z-[101] overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-100 flex flex-col max-h-[85vh]"
            >
              <form onSubmit={handleSubmit} className="relative flex items-center p-4 border-b border-slate-100 shrink-0">
                <Search className="w-6 h-6 text-slate-400 absolute left-6" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search part #, brand, or type..."
                  className="w-full pl-12 pr-12 py-3 text-lg sm:text-xl text-navy-900 placeholder-slate-400 focus:outline-none bg-transparent font-medium"
                />
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close search dialog"
                  className="absolute right-4 p-2 text-slate-400 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </form>

              <div className="overflow-y-auto flex-1 bg-slate-50/50 p-4">
                {query.trim() === '' ? (
                  <div className="py-8 px-4 text-center">
                    <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">Search the Catalog</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                      Find detailed specifications, cross-references, and technical data for thousands of brake chambers.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { label: 'Type 30/30', query: 'Type 30/30' },
                        { label: '3430051 (MGM)', query: '3430051' },
                        { label: '5009011 (Bendix)', query: '5009011' },
                        { label: '423.107.900.0 (Wabco)', query: '423.107.900.0' },
                        { label: 'GC3030 (Haldex)', query: 'GC3030' },
                        { label: 'Type 24', query: 'Type 24' },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setQuery(item.query)}
                          type="button"
                          className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-navy-800 hover:border-amber-400 hover:text-amber-600 transition-colors shadow-sm cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.catalog.length > 0 || searchResults.oem.length > 0 ? (
                  <div className="space-y-6">
                    {/* Catalog Results */}
                    {searchResults.catalog.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                          <Package className="w-3.5 h-3.5" /> BRC Products ({searchResults.catalog.length})
                        </div>
                        <div className="flex flex-col gap-1">
                          {searchResults.catalog.slice(0, 5).map((result) => (
                            <button
                              key={`catalog-${result.type}-${result.item.slug}`}
                              onClick={() => handleSelect(result.type, result.item.slug)}
                              type="button"
                              className="w-full text-left flex items-center gap-4 p-3 bg-white hover:bg-amber-50 rounded-xl border border-transparent hover:border-amber-100 transition-colors group shadow-sm"
                            >
                              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                                <Package className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-navy-900 truncate group-hover:text-amber-700">{result.item.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{result.type.replace(/-/g, ' ')} &bull; <span className="uppercase">{result.item.brandSlug}</span></p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* OEM Results */}
                    {searchResults.oem.length > 0 && (
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5" /> OEM Cross-References ({searchResults.oem.length})
                        </div>
                        <div className="flex flex-col gap-1">
                          {searchResults.oem.slice(0, 5).map((result) => (
                            <button
                              key={`oem-${result.matchedOem.brand}-${result.matchedOem.partNumber}`}
                              onClick={() => handleOemSelect(result.matchedOem.brand, result.matchedOem.partNumber)}
                              type="button"
                              className="w-full text-left flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white hover:bg-navy-50 rounded-xl border border-transparent hover:border-navy-100 transition-colors group shadow-sm relative overflow-hidden"
                            >
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-navy-100 transition-colors">
                                  <ShieldCheck className="w-5 h-5 text-navy-400 group-hover:text-navy-700 transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-navy-900 truncate group-hover:text-amber-600 font-mono">
                                    <span className="text-slate-500 font-sans font-medium text-xs mr-2">{result.matchedOem.brand}</span>
                                    {result.matchedOem.partNumber}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 sm:w-auto w-full group-hover:bg-white group-hover:border-navy-200 transition-colors">
                                <span className="text-xs text-slate-400 font-medium">Crosses to</span>
                                <span className="text-sm font-bold text-navy-900">{result.item.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-10 px-4 text-center max-w-sm mx-auto">
                    <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-100">
                      <Search className="w-6 h-6" />
                    </div>
                    <p className="text-navy-900 font-bold text-base mb-1">No direct match for "{query}"</p>
                    <p className="text-slate-500 text-xs sm:text-sm mb-5 leading-relaxed">
                      We couldn't find an automatic match in our instant index. Our engineering team can cross-reference it from factory drawings within 24h.
                    </p>
                    <button
                      onClick={handleOEMRequest}
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold rounded-xl text-sm shadow-md shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
                    >
                      <span>Request Custom Cross-Match</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="hidden sm:flex bg-slate-50 p-3 border-t border-slate-100 text-center items-center justify-center gap-6 shrink-0">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-sans shadow-sm">esc</kbd> to close</span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-sans shadow-sm">ctrl/cmd</kbd> + <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-sans shadow-sm">k</kbd> to search</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

