"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers with smart ellipsis for larger page counts
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
      aria-label="Blog pagination" 
      className="flex justify-center items-center gap-2 mt-12 mb-8 select-none"
    >
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
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
              onClick={() => onPageChange(pageNum)}
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

      {/* Next Page Button */}
      <button
        type="button"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
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
