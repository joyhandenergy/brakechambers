"use client";

import React from 'react';

export type BlogCategory =
  | 'All'
  | 'Technical Guides'
  | 'How-To & Repair'
  | 'Buying & Sourcing'
  | 'Fleet Management'
  | 'Industry & Compliance';

export interface CategoryTabConfig {
  id: BlogCategory;
  label: string;
  slug: string;
}

export const BLOG_CATEGORIES: CategoryTabConfig[] = [
  { id: 'All', label: 'All', slug: 'all' },
  { id: 'Technical Guides', label: 'Technical Guides', slug: 'technical-guides' },
  { id: 'How-To & Repair', label: 'How-To & Repair', slug: 'how-to-and-repair' },
  { id: 'Buying & Sourcing', label: 'Buying & Sourcing', slug: 'buying-and-sourcing' },
  { id: 'Fleet Management', label: 'Fleet Management', slug: 'fleet-management' },
  { id: 'Industry & Compliance', label: 'Industry & Compliance', slug: 'industry-and-compliance' },
];

export function getCategoryColor(_category?: string): string {
  return '#F59E0B'; // Consistent brand amber
}

interface BlogTabsProps {
  activeCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
  postCounts?: Record<string, number>;
}

export default function BlogTabs({
  activeCategory,
  onSelectCategory,
  postCounts
}: BlogTabsProps) {
  return (
    <div className="w-full">
      {/* Mobile: 2-column stacked grid. Desktop: Strictly ONE straight horizontal line */}
      <nav 
        aria-label="Blog categories"
        className="grid grid-cols-2 gap-2 w-full sm:flex sm:flex-nowrap sm:items-center sm:justify-center sm:gap-1.5 md:gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible scrollbar-none py-0.5"
      >
        {BLOG_CATEGORIES.map((tab) => {
          const isActive = activeCategory === tab.id;
          const count = postCounts ? postCounts[tab.id] : undefined;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectCategory(tab.id)}
              aria-pressed={isActive}
              title={tab.label}
              className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 md:px-4 lg:px-5 py-2.5 sm:py-2.5 md:py-3 rounded-xl sm:rounded-full text-[11px] sm:text-[13px] md:text-sm lg:text-[15px] min-w-0 w-full sm:w-auto transition-all duration-200 cursor-pointer select-none text-center ${
                isActive
                  ? 'bg-amber-500 text-navy-950 font-black shadow-md shadow-amber-500/25 border-0 border-transparent outline-none ring-0 scale-[1.01]'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400 hover:text-navy-950 hover:bg-amber-50/40 font-bold shadow-2xs'
              }`}
            >
              <span className="truncate min-w-0">{tab.label}</span>

              {typeof count === 'number' && (
                <span
                  className={`text-[10px] sm:text-xs font-bold shrink-0 transition-colors ${
                    isActive ? 'text-navy-950/75' : 'text-slate-400'
                  }`}
                >
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
