"use client";

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import FilterAccordion from '@/features/products/components/FilterAccordion';
import Link from 'next/link';
import { Search, RotateCcw, Check } from 'lucide-react';
import type { BrakeChamber } from '@/types';

interface FacetedSidebarProps {
  baseCategory?: 'spring-brake-chambers' | 'service-brake-chambers' | 'parts-and-kits' | 'air-disc-brake-actuators' | 'all';
  products?: BrakeChamber[];
}

export default function FacetedSidebar({ baseCategory, products = [] }: FacetedSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [brandSearch, setBrandSearch] = useState('');

  // 1. Brands dynamically extracted from product contents (Cross-Reference & OEM Part Brands)
  const availableBrands = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      const set = new Set<string>();
      (p.crossReferenceBrands || []).forEach((b: string) => {
        if (b && typeof b === 'string' && b.trim()) set.add(b.trim());
      });
      (p.oemPartNumbers || []).forEach((o: any) => {
        if (o?.brand && typeof o.brand === 'string' && o.brand.trim()) set.add(o.brand.trim());
      });
      set.forEach(b => {
        counts[b] = (counts[b] || 0) + 1;
      });
    });

    const entries = Object.entries(counts).map(([name, count]) => ({ name, count }));
    if (entries.length === 0) {
      return [
        { name: 'Bendix', count: 0 },
        { name: 'Haldex', count: 0 },
        { name: 'Meritor', count: 0 },
        { name: 'Wabco', count: 0 },
        { name: 'MGM', count: 0 },
        { name: 'Knorr-Bremse', count: 0 },
        { name: 'TSE', count: 0 },
        { name: 'Provia', count: 0 },
      ];
    }

    return entries.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [products]);

  // 2. Chamber Models dynamically extracted from products
  const availableModels = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      if (p.type) {
        counts[p.type] = (counts[p.type] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // 3. Stroke Inch dynamically extracted from products
  const availableStrokes = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      if (p.strokeInch) {
        counts[p.strokeInch] = (counts[p.strokeInch] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // 4. Push Rod Length dynamically extracted from products
  const availablePushRods = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      if (p.pushRodLengthInch) {
        counts[p.pushRodLengthInch] = (counts[p.pushRodLengthInch] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // 5. Applications dynamically extracted from products
  const availableApplications = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      if (p.application) {
        counts[p.application] = (counts[p.application] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    const filterKeys = ['brand', 'model', 'strokeInch', 'pushRodLength', 'application', 'filter', 'categoryFilter'];
    filterKeys.forEach(k => {
      count += searchParams.getAll(k).length;
    });
    return count;
  }, [searchParams]);

  // Determine if we are on a specific subcategory page (e.g., /spring-brake-chambers/30-30-air-brake-chambers)
  const isNestedRoute = pathname.split('/').length > 2;

  // Filter brands by search keyword in sidebar
  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    const query = brandSearch.toLowerCase();
    return availableBrands.filter(b => b.name.toLowerCase().includes(query));
  }, [availableBrands, brandSearch]);

  // Create or toggle URL query parameter
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');

      const currentValues = params.getAll(name);
      if (currentValues.includes(value)) {
        params.delete(name);
        currentValues.forEach(v => {
          if (v !== value) params.append(name, v);
        });
      } else {
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const isChecked = (name: string, value: string) => {
    return searchParams.getAll(name).includes(value);
  };

  const handleToggle = (name: string, value: string) => {
    const queryString = createQueryString(name, value);
    router.push(pathname + (queryString ? '?' + queryString : ''), { scroll: false });
  };

  const handleClearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const modelSectionTitle = 
    baseCategory === 'spring-brake-chambers' ? 'Spring Brake Model' :
    baseCategory === 'service-brake-chambers' ? 'Service Chamber Model' :
    baseCategory === 'air-disc-brake-actuators' ? 'ADB Model' : 'Chamber Model';

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Active Filters Clear Bar */}
      {activeFilterCount > 0 && (
        <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-3 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{activeFilterCount} Active {activeFilterCount === 1 ? 'Filter' : 'Filters'}</span>
          </div>
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline transition-colors cursor-pointer bg-white/80 px-2 py-1 rounded border border-amber-200 shadow-2xs"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        </div>
      )}

      {/* Context-Aware Category Links (Silo Structure) */}
      {(!baseCategory || baseCategory === 'all') && (
        <FilterAccordion 
          title="Categories" 
          isOpen={openSection === "Categories"} 
          onToggle={() => setOpenSection(openSection === "Categories" ? null : "Categories")}
        >
          <ul className="py-2">
            <li><Link href={`/spring-brake-chambers`} className="block px-4 py-2 text-sm border-l-4 transition-colors text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900">Spring Brakes</Link></li>
            <li><Link href={`/service-brake-chambers`} className="block px-4 py-2 text-sm border-l-4 transition-colors text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900">Service Chambers</Link></li>
            <li><Link href={`/air-disc-brake-actuators`} className="block px-4 py-2 text-sm border-l-4 transition-colors text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900">Air Disc Actuators</Link></li>
            <li><Link href={`/parts-and-kits`} className="block px-4 py-2 text-sm border-l-4 transition-colors text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900">Parts & Kits</Link></li>
          </ul>
        </FilterAccordion>
      )}

      {baseCategory === 'spring-brake-chambers' && (
        <FilterAccordion 
          title="Spring Brake Types" 
          isOpen={openSection === "Spring Brake Types"} 
          onToggle={() => setOpenSection(openSection === "Spring Brake Types" ? null : "Spring Brake Types")}
        >
          <ul className="py-2">
            <li><Link href={`/spring-brake-chambers/30-30-air-brake-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('30-30') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 30/30 Spring Brake</Link></li>
            <li><Link href={`/spring-brake-chambers/36-36-spring-brakes`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('36-36') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 36/36 Spring Brake</Link></li>
            <li><Link href={`/spring-brake-chambers/24-30-24-24-spring-brakes`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('24-30-24-24') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 24/30 & 24/24 Chambers</Link></li>
            <li><Link href={`/spring-brake-chambers/30-28-spring-brakes`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('30-28') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 30/28 Spring Brake</Link></li>
            <li><Link href={`/spring-brake-chambers/20-24-spring-brake-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('20-24') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 20/24 Spring Brake</Link></li>
            <li><Link href={`/spring-brake-chambers/type-30-30-piggyback-kits`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('piggyback') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 30/30 Piggyback Kits</Link></li>
            <li><Link href={`/spring-brake-chambers`} className={`block px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-navy-50 mt-2 border-t border-slate-100 pt-2`}>&larr; All Spring Brakes</Link></li>
          </ul>
        </FilterAccordion>
      )}

      {baseCategory === 'service-brake-chambers' && (
        <FilterAccordion 
          title="Service Chamber Types" 
          isOpen={openSection === "Service Chamber Types"} 
          onToggle={() => setOpenSection(openSection === "Service Chamber Types" ? null : "Service Chamber Types")}
        >
          <ul className="py-2">
            <li><Link href={`/service-brake-chambers/type-20-steer-axle-brake-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('20-steer') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 20 Steer Axle Brake Chambers</Link></li>
            <li><Link href={`/service-brake-chambers/type-30-service-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('type-30') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 30 Service Chambers</Link></li>
            <li><Link href={`/service-brake-chambers/type-36-service-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('type-36') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 36 Service Chambers</Link></li>
            <li><Link href={`/service-brake-chambers/type-12-16-24-service-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('12-16-24') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 12, 16 & 24 Service Chambers</Link></li>
            <li><Link href={`/service-brake-chambers/welded-clevis-brake-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('welded-clevis') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Welded Clevis Brake Chambers</Link></li>
            <li><Link href={`/service-brake-chambers`} className={`block px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-navy-50 mt-2 border-t border-slate-100 pt-2`}>&larr; All Service Chambers</Link></li>
          </ul>
        </FilterAccordion>
      )}

      {baseCategory === 'air-disc-brake-actuators' && (
        <FilterAccordion 
          title="Air Disc Actuators" 
          isOpen={openSection === "Air Disc Actuators"} 
          onToggle={() => setOpenSection(openSection === "Air Disc Actuators" ? null : "Air Disc Actuators")}
        >
          <ul className="py-2">
            <li><Link href={`/air-disc-brake-actuators/type-16-18-adb-actuators`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('16-18') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 16 & 18 ADB</Link></li>
            <li><Link href={`/air-disc-brake-actuators/type-20-24-air-disc-brake-actuator`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('20-24') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 20/24 ADB</Link></li>
            <li><Link href={`/air-disc-brake-actuators/type-24-24-adb-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('24-24') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 24/24 ADB</Link></li>
            <li><Link href={`/air-disc-brake-actuators/type-24-30-air-disc-brake-actuators`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('24-30') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Type 24/30 ADB</Link></li>
            <li><Link href={`/air-disc-brake-actuators`} className={`block px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-navy-50 mt-2 border-t border-slate-100 pt-2`}>&larr; All Air Disc Actuators</Link></li>
          </ul>
        </FilterAccordion>
      )}

      {baseCategory === 'parts-and-kits' && (
        <FilterAccordion 
          title="Parts & Kits Types" 
          isOpen={openSection === "Parts & Kits Types"} 
          onToggle={() => setOpenSection(openSection === "Parts & Kits Types" ? null : "Parts & Kits Types")}
        >
          <ul className="py-2">
            <li><Link href={`/parts-and-kits/air-brake-chamber-rebuild-kits`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('rebuild-kits') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Air Brake Chamber Rebuild Kits</Link></li>
            <li><Link href={`/parts-and-kits/brake-chamber-diaphragms`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('diaphragm') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Brake Chamber Diaphragms</Link></li>
            <li><Link href={`/parts-and-kits/clevis-pins-slack-adjuster-hardware`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('clevis') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Clevis Pins & Hardware</Link></li>
            <li><Link href={`/parts-and-kits/brake-chamber-caging-bolts-tools`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('caging') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Caging Bolts & Tools</Link></li>
            <li><Link href={`/parts-and-kits/brake-chamber-clamp-bands`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('clamp') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Clamp Bands</Link></li>
            <li><Link href={`/parts-and-kits/automatic-manual-slack-adjusters`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${pathname.includes('slack-adjuster') ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Slack Adjusters</Link></li>
            <li><Link href={`/parts-and-kits`} className={`block px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-navy-50 mt-2 border-t border-slate-100 pt-2`}>&larr; All Parts & Kits</Link></li>
          </ul>
        </FilterAccordion>
      )}

      {/* Dynamic Brands Filter (Cross-Reference & OEM Brands based on product contents) */}
      {availableBrands.length > 0 && (
        <FilterAccordion 
          title="Brands (Cross-Reference)" 
          isOpen={openSection === "Brands (Cross-Reference)"} 
          onToggle={() => setOpenSection(openSection === "Brands (Cross-Reference)" ? null : "Brands (Cross-Reference)")}
        >
          <div className="p-3 flex flex-col gap-2">
            {/* Quick search input if more than 7 brands */}
            {availableBrands.length > 7 && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter brands..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800"
                />
              </div>
            )}
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-navy-200 [&::-webkit-scrollbar-track]:bg-navy-50 pr-0.5">
              {filteredBrands.length > 0 ? (
                filteredBrands.map(({ name, count }) => {
                  const active = isChecked('brand', name);
                  return (
                    <label
                      key={name}
                      className={`flex items-center justify-between text-sm cursor-pointer p-1.5 rounded transition-colors ${
                        active
                          ? 'font-bold text-navy-900 bg-amber-50 border border-amber-200/60'
                          : 'text-gray-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4 shrink-0"
                          checked={active}
                          onChange={() => handleToggle('brand', name)}
                        />
                        <span className="truncate">{name}</span>
                      </div>
                      {count > 0 && (
                        <span className="text-xs text-slate-400 font-medium shrink-0 ml-1.5">
                          ({count})
                        </span>
                      )}
                    </label>
                  );
                })
              ) : (
                <div className="text-xs text-slate-400 py-2 text-center">No matching brands</div>
              )}
            </div>
          </div>
        </FilterAccordion>
      )}

      {/* Model Filter (Dynamically populated from products) */}
      {!isNestedRoute && availableModels.length > 0 && (
        <FilterAccordion 
          title={modelSectionTitle} 
          isOpen={openSection === modelSectionTitle} 
          onToggle={() => setOpenSection(openSection === modelSectionTitle ? null : modelSectionTitle)}
        >
          <div className="p-3 flex flex-col gap-1 max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-navy-200 pr-0.5">
            {availableModels.map(({ name, count }) => {
              const active = isChecked('model', name);
              return (
                <label
                  key={name}
                  className={`flex items-center justify-between text-sm cursor-pointer p-1.5 rounded transition-colors ${
                    active
                      ? 'font-bold text-navy-900 bg-amber-50 border border-amber-200/60'
                      : 'text-gray-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4 shrink-0"
                      checked={active}
                      onChange={() => handleToggle('model', name)}
                    />
                    <span className="truncate">{name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium shrink-0 ml-1.5">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterAccordion>
      )}

      {/* Stroke Inch Filter (Only rendered if available) */}
      {availableStrokes.length > 0 && (
        <FilterAccordion 
          title="Stroke Inch" 
          isOpen={openSection === "Stroke Inch"} 
          onToggle={() => setOpenSection(openSection === "Stroke Inch" ? null : "Stroke Inch")}
        >
          <div className="p-3 flex flex-col gap-1">
            {availableStrokes.map(({ name, count }) => {
              const active = isChecked('strokeInch', name);
              return (
                <label
                  key={name}
                  className={`flex items-center justify-between text-sm cursor-pointer p-1.5 rounded transition-colors ${
                    active
                      ? 'font-bold text-navy-900 bg-amber-50 border border-amber-200/60'
                      : 'text-gray-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4 shrink-0"
                      checked={active}
                      onChange={() => handleToggle('strokeInch', name)}
                    />
                    <span className="truncate">{name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium shrink-0 ml-1.5">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterAccordion>
      )}

      {/* Push Rod Length Filter (Only rendered if available) */}
      {availablePushRods.length > 0 && (
        <FilterAccordion 
          title="Push Rod Length" 
          isOpen={openSection === "Push Rod Length"} 
          onToggle={() => setOpenSection(openSection === "Push Rod Length" ? null : "Push Rod Length")}
        >
          <div className="p-3 flex flex-col gap-1">
            {availablePushRods.map(({ name, count }) => {
              const active = isChecked('pushRodLength', name);
              return (
                <label
                  key={name}
                  className={`flex items-center justify-between text-sm cursor-pointer p-1.5 rounded transition-colors ${
                    active
                      ? 'font-bold text-navy-900 bg-amber-50 border border-amber-200/60'
                      : 'text-gray-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4 shrink-0"
                      checked={active}
                      onChange={() => handleToggle('pushRodLength', name)}
                    />
                    <span className="truncate">{name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium shrink-0 ml-1.5">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterAccordion>
      )}

      {/* Application Filter (Only rendered if available) */}
      {availableApplications.length > 0 && (
        <FilterAccordion 
          title="Application" 
          isOpen={openSection === "Application"} 
          onToggle={() => setOpenSection(openSection === "Application" ? null : "Application")}
        >
          <div className="p-3 flex flex-col gap-1">
            {availableApplications.map(({ name, count }) => {
              const active = isChecked('application', name);
              return (
                <label
                  key={name}
                  className={`flex items-center justify-between text-sm cursor-pointer p-1.5 rounded transition-colors ${
                    active
                      ? 'font-bold text-navy-900 bg-amber-50 border border-amber-200/60'
                      : 'text-gray-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4 shrink-0"
                      checked={active}
                      onChange={() => handleToggle('application', name)}
                    />
                    <span className="truncate">{name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium shrink-0 ml-1.5">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterAccordion>
      )}

      {/* Accessories Specific Filters */}
      {baseCategory === 'parts-and-kits' && !isNestedRoute && (
        <FilterAccordion 
          title="Accessory Type" 
          isOpen={openSection === "Accessory Type"} 
          onToggle={() => setOpenSection(openSection === "Accessory Type" ? null : "Accessory Type")}
        >
          <div className="p-3 flex flex-col gap-1">
            {['Diaphragm', 'Slack Adjuster', 'Clamp Band', 'Caging Bolt', 'Hardware Kit'].map(type => (
              <label key={type} className={`flex items-center justify-between text-sm cursor-pointer p-1.5 rounded transition-colors ${isChecked('filter', type) ? 'font-bold text-navy-900 bg-amber-50' : 'text-gray-700 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    checked={isChecked('filter', type)}
                    onChange={() => handleToggle('filter', type)}
                  />
                  <span>{type}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterAccordion>
      )}

      {/* All Products Specific Filters */}
      {baseCategory === 'all' && (
        <FilterAccordion 
          title="Product Category" 
          isOpen={openSection === "Product Category"} 
          onToggle={() => setOpenSection(openSection === "Product Category" ? null : "Product Category")}
        >
          <div className="p-3 flex flex-col gap-1">
            {['Spring Brake', 'Service Brake', 'Air Disc Actuator', 'Parts & Kits'].map(type => (
              <label key={type} className={`flex items-center justify-between text-sm cursor-pointer p-1.5 rounded transition-colors ${isChecked('categoryFilter', type) ? 'font-bold text-navy-900 bg-amber-50' : 'text-gray-700 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    checked={isChecked('categoryFilter', type)}
                    onChange={() => handleToggle('categoryFilter', type)}
                  />
                  <span>{type}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterAccordion>
      )}

      {/* Global 'Browse All Categories' - Visible everywhere for easy navigation */}
      {baseCategory !== 'all' && (
        <FilterAccordion 
          title="Browse All Categories" 
          isOpen={openSection === "Browse All Categories"} 
          onToggle={() => setOpenSection(openSection === "Browse All Categories" ? null : "Browse All Categories")}
        >
          <ul className="py-2">
            <li><Link href={`/products`} className="block px-4 py-2 text-sm font-bold text-amber-600 hover:bg-navy-50 mb-2 border-b border-slate-100 pb-2">View Full Catalog</Link></li>
            <li><Link href={`/spring-brake-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${baseCategory === 'spring-brake-chambers' ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Spring Brakes</Link></li>
            <li><Link href={`/service-brake-chambers`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${baseCategory === 'service-brake-chambers' ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Service Chambers</Link></li>
            <li><Link href={`/air-disc-brake-actuators`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${baseCategory === 'air-disc-brake-actuators' ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Air Disc Actuators</Link></li>
            <li><Link href={`/parts-and-kits`} className={`block px-4 py-2 text-sm border-l-4 transition-colors ${baseCategory === 'parts-and-kits' ? 'text-navy-900 font-extrabold bg-amber-50 border-amber-500' : 'text-navy-600 border-transparent hover:bg-slate-50 hover:text-navy-900'}`}>Parts & Kits</Link></li>
          </ul>
        </FilterAccordion>
      )}
    </div>
  );
}
