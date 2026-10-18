"use client";

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage: propCurrentPage,
  onPageChange
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine current page: prop takes priority, fallback to searchParams
  const currentPage = propCurrentPage ?? (Number(searchParams?.get('page')) || 1);

  if (totalPages <= 1) return null;

  const handlePageClick = (pageNum: number) => {
    if (pageNum === currentPage) return;
    if (onPageChange) {
      onPageChange(pageNum);
    } else if (typeof window !== 'undefined') {
      const params = new URLSearchParams(searchParams?.toString() || '');
      if (pageNum === 1) {
        params.delete('page');
      } else {
        params.set('page', pageNum.toString());
      }
      const newQuery = params.toString() ? `?${params.toString()}` : '';
      const newUrl = `${pathname}${newQuery}`;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

      // Smooth scroll to product listing with header buffer
      const target = document.getElementById('product-listing') || document.getElementById('product-listing-start');
      if (target) {
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : (window.innerWidth >= 1024 ? 180 : 90);
        const isDesktop = window.innerWidth >= 1024;
        const extraBuffer = isDesktop ? 44 : 28;
        const totalOffset = headerHeight + extraBuffer;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, Math.round(elementPosition - totalOffset)),
          behavior: 'smooth'
        });
      }
    }
  };

  // Generate page numbers with smart ellipsis for larger page counts (matches Blog UI)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      aria-label="Product pagination"
      className="flex justify-center items-center gap-2 mt-12 mb-8 select-none"
    >
      {/* Prev Button */}
      <button
        type="button"
        onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl border transition-all duration-200 ${
          currentPage > 1
            ? 'bg-white border-slate-200 text-navy-900 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700 cursor-pointer shadow-2xs'
            : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {getPageNumbers().map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-10 sm:w-9 sm:h-11 flex items-center justify-center text-slate-400 font-bold"
              >
                ...
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => handlePageClick(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-navy-950 font-black shadow-md shadow-amber-500/25 border-0 border-transparent scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-navy-950 hover:border-amber-400 font-bold shadow-2xs'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl border transition-all duration-200 ${
          currentPage < totalPages
            ? 'bg-white border-slate-200 text-navy-900 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700 cursor-pointer shadow-2xs'
            : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
