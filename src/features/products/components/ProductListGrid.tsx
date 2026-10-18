"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import ProductListCard from '@/features/products/components/ProductListCard';
import AccessoryListCard from '@/features/products/product-detail/AccessoryListCard';
import Pagination from '@/features/products/components/Pagination';

interface ProductListGridProps {
  products: any[];
  baseCategory: string;
  title: string;
  cardType?: 'product' | 'accessory';
  initialPage?: number;
}

export default function ProductListGrid({
  products,
  baseCategory,
  title,
  cardType = 'product',
  initialPage = 1
}: ProductListGridProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Desktop maintains current 20 cards per page
  // Mobile (< 768px) reduces to half: 10 cards per page
  const [pageSize, setPageSize] = useState<number>(20);
  const queryPage = Number(searchParams?.get('page')) || initialPage;
  const [currentPage, setCurrentPage] = useState<number>(queryPage);
  const [prevQueryPage, setPrevQueryPage] = useState<number>(queryPage);

  if (queryPage !== prevQueryPage) {
    setPrevQueryPage(queryPage);
    setCurrentPage(queryPage);
  }

  // Responsive page size: 20 on desktop, 10 on mobile
  useEffect(() => {
    const handleResize = () => {
      setPageSize(window.innerWidth < 768 ? 10 : 20);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(products.length / pageSize) || 1;
  const safeCurrentPage = (totalPages > 0 && currentPage > totalPages) ? 1 : currentPage;

  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedProducts = useMemo(() => {
    return products.slice(startIndex, startIndex + pageSize);
  }, [products, startIndex, pageSize]);

  const scrollToListingStart = () => {
    if (typeof window === 'undefined') return;
    requestAnimationFrame(() => {
      const target = document.getElementById('product-listing') || document.getElementById('product-listing-start');
      if (target) {
        // Measure real header height from DOM (top bar + main header + secondary navbar = ~176-180px on desktop, ~80px on mobile)
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : (window.innerWidth >= 1024 ? 180 : 90);
        const isDesktop = window.innerWidth >= 1024;
        // Generous breathing space (44px desktop, 28px mobile) so cards & sidebar sit cleanly before the header
        const extraBuffer = isDesktop ? 44 : 28;
        const totalOffset = headerHeight + extraBuffer;

        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const targetScrollY = Math.max(0, Math.round(elementPosition - totalOffset));

        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (newPage === 1) {
        params.delete('page');
      } else {
        params.set('page', newPage.toString());
      }
      const newQuery = params.toString() ? `?${params.toString()}` : '';
      const newUrl = `${pathname}${newQuery}`;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

      scrollToListingStart();
    }
  };

  return (
    <>
      {/* Top Product Count & Page Indicator Bar */}
      <div className="bg-navy-900 p-3 rounded-xl shadow-md flex justify-between items-center mb-5 text-sm">
        <div className="text-white font-bold tracking-wide px-2">
          {products.length > 0 ? (
            totalPages > 1 ? (
              <>Showing <span className="text-amber-400 font-extrabold">{startIndex + 1}–{Math.min(startIndex + pageSize, products.length)}</span> of <span className="font-extrabold">{products.length}</span> products</>
            ) : (
              <>Showing <span className="font-extrabold">{products.length}</span> {products.length === 1 ? 'product' : 'products'}</>
            )
          ) : (
            'Showing 0 products'
          )}
        </div>
        {totalPages > 1 && (
          <div className="text-amber-400 font-bold text-xs px-2 tracking-wider uppercase">
            Page {safeCurrentPage} of {totalPages}
          </div>
        )}
      </div>

      {products.length > 0 ? (
        <>
          <h2 className="sr-only">Available Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {paginatedProducts.map(product => (
              cardType === 'product' ? (
                <ProductListCard key={product.slug} product={product} categoryPath={baseCategory} />
              ) : (
                <AccessoryListCard key={product.slug} product={product} categoryPath={baseCategory} />
              )
            ))}
          </div>
        </>
      ) : (
        <div className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200 text-center">
          <h3 className="text-lg font-bold text-navy-900 mb-2">No Products Found</h3>
          <p className="text-slate-600 mb-4">We couldn't find any products matching your criteria.</p>
          <Link href={`/${baseCategory}`} className="text-amber-600 font-bold hover:underline">View All {title}</Link>
        </div>
      )}

      {/* Consistent Pagination matching Blog UI */}
      {totalPages > 1 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
