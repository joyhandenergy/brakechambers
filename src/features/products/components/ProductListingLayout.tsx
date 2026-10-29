import React from 'react';
import Link from 'next/link';
import BulkOemCard from '@/components/ui/BulkOemCard';
import { Truck } from 'lucide-react';
import ProductListGrid from '@/features/products/components/ProductListGrid';
import FacetedSidebar from '@/features/products/components/FacetedSidebar';
import MobileSidebarWrapper from '@/features/products/components/MobileSidebarWrapper';
import CategoryVisualizer from '@/features/products/components/CategoryVisualizer';
import TrustBanner from '@/components/ui/TrustBanner';
import FleetReviewsSection from '@/features/home/components/FleetReviewsSection';
import OEMQuickLinks from '@/features/oem/components/OEMQuickLinks';
import TechnicalResourcesSection from '@/components/ui/TechnicalResourcesSection';
import SubCategoryComparisonTable from '@/features/products/components/SubCategoryComparisonTable';
import SubCategoryWholesaleCTA from '@/features/products/components/SubCategoryWholesaleCTA';
import SubCategoryFAQ from '@/features/products/components/SubCategoryFAQ';
import PageHeader from '@/components/layout/PageHeader';
import ManufacturingQualityGrid from '@/features/products/components/ManufacturingQualityGrid';
import ApplicationScopeSection from '@/features/products/components/ApplicationScopeSection';
interface ProductListingLayoutProps {
  title: string;
  description: string;
  badge?: string;
  badgeIcon?: React.ElementType;
  baseCategory: "all" | "spring-brake-chambers" | "service-brake-chambers" | "parts-and-kits" | "air-disc-brake-actuators";
  products: any[];
  searchParams?: { [key: string]: string | string[] | undefined };
  visualizerType?: 'spring' | 'service' | 'parts' | 'adp';
  seoText?: React.ReactNode;
  breadcrumbs: { label: string; href?: string }[];
  isSubCategory?: boolean;
  cardType?: 'product' | 'accessory';
}

export default function ProductListingLayout({
  title,
  description,
  badge,
  badgeIcon,
  baseCategory,
  products: initialProducts,
  searchParams,
  visualizerType,
  seoText,
  breadcrumbs,
  isSubCategory = false,
  cardType = 'product'
}: ProductListingLayoutProps) {

  // Apply Faceted Filters
  let products = [...initialProducts];
  if (searchParams) {
    const applyFilter = (key: string, paramVal: string | string[] | undefined, filterFn: (p: any, val: string) => boolean) => {
      if (!paramVal) return;
      const values = Array.isArray(paramVal) ? paramVal : [paramVal];
      products = products.filter(p => values.some(v => filterFn(p, v)));
    };

    applyFilter('brand', searchParams.brand, (p, v) => {
      const vLower = v.toLowerCase();
      const inCross = p.crossReferenceBrands?.some((b: string) => b.toLowerCase() === vLower);
      const inOem = p.oemPartNumbers?.some((o: any) => o.brand?.toLowerCase() === vLower);
      const inSlug = p.brandSlug?.toLowerCase() === vLower;
      return Boolean(inCross || inOem || inSlug);
    });

    applyFilter('model', searchParams.model, (p, v) => {
      if (!p.type) return false;
      const tLower = p.type.toLowerCase();
      const vLower = v.toLowerCase();
      return tLower === vLower || tLower.includes(vLower);
    });

    applyFilter('strokeInch', searchParams.strokeInch, (p, v) => p.strokeInch === v);
    applyFilter('pushRodLength', searchParams.pushRodLength, (p, v) => p.pushRodLengthInch === v);
    applyFilter('application', searchParams.application, (p, v) => p.application === v);
    applyFilter('categoryFilter', searchParams.categoryFilter, (p, v) => p.category === v);

    const filter = searchParams.filter as string;
    if (filter === 'Standard') {
      products = products.filter(c => c.strokeSize === 'Standard');
    } else if (filter === 'Long Stroke') {
      products = products.filter(c => c.strokeSize === 'Long Stroke');
    } else if (filter) {
      const fLower = filter.toLowerCase();
      products = products.filter(p =>
        (p.name && p.name.toLowerCase().includes(fLower)) ||
        (p.type && p.type.toLowerCase().includes(fLower))
      );
    }
  }



  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': title,
    'description': description,
    'numberOfItems': products.length,
    'itemListElement': products.slice(0, 30).map((p, index) => {
      const categorySegment = baseCategory === 'all'
        ? (p.category === 'Spring Brake' ? 'spring-brake-chambers' : p.category === 'Service Brake' ? 'service-brake-chambers' : p.category === 'Air Disc Actuator' ? 'air-disc-brake-actuators' : 'parts-and-kits')
        : baseCategory;

      return {
        '@type': 'ListItem',
        'position': index + 1,
        'name': p.name,
        'url': `https://www.brakechambers.com/${categorySegment}/${p.slug}`
      };
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PageHeader
        title={title}
        description={description}
        badge={badge}
        badgeIcon={badgeIcon}
        breadcrumbs={[{ label: 'Home', href: '/' }, ...breadcrumbs]}
      />
      <div className={`container mx-auto px-4 lg:px-8 pt-6 lg:pt-8 max-w-[1920px] ${isSubCategory ? 'pb-16 lg:pb-24' : 'pb-6 lg:pb-8'}`}>

      {!isSubCategory && <TrustBanner category={baseCategory} />}

      {/* Scroll Anchor positioned cleanly just before the product listing & sidebar */}
      <div id="product-listing-start" className="relative -top-4 scroll-mt-48 lg:scroll-mt-60" />
      <div id="product-listing" className="flex flex-col lg:flex-row gap-6 relative scroll-mt-48 lg:scroll-mt-60">
        <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
           <MobileSidebarWrapper>
             <React.Suspense fallback={<div className="bg-white rounded-xl p-4 border border-slate-100 animate-pulse h-64" />}>
               <FacetedSidebar baseCategory={baseCategory} products={initialProducts} />
             </React.Suspense>
           </MobileSidebarWrapper>
           
           <BulkOemCard />
        </div>

        <div className="flex-grow min-w-0">
          <React.Suspense fallback={<div className="bg-white rounded-xl p-8 border border-slate-100 animate-pulse h-96" />}>
            <ProductListGrid
              products={products}
              baseCategory={baseCategory}
              title={title}
              cardType={cardType}
              initialPage={Number(searchParams?.page) || 1}
            />
          </React.Suspense>
          
          {seoText && (
            <div className="mt-6 sm:mt-10 md:mt-16 bg-slate-50 border-y sm:border border-slate-200 rounded-none sm:rounded-2xl p-5 sm:p-8 text-slate-600 prose prose-slate max-w-none -mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-auto">
              {seoText}
            </div>
          )}
          
          {isSubCategory && (
            <div className="flex flex-col gap-12 sm:gap-16 mt-10 sm:mt-16">
              <SubCategoryComparisonTable products={products.slice(0, 6)} categoryName={title} />
              <SubCategoryWholesaleCTA categoryName={title} />
              <SubCategoryFAQ categoryName={title} />
            </div>
          )}
        </div>
      </div>

      {!isSubCategory && visualizerType && <CategoryVisualizer type={visualizerType} />}
      {!isSubCategory && <ApplicationScopeSection category={baseCategory} />}
      
      {!isSubCategory && (
        <>
          <ManufacturingQualityGrid category={baseCategory} />
          <OEMQuickLinks categoryName={title} />
        </>
      )}

      </div>

      {!isSubCategory && (
        <FleetReviewsSection categoryName={title} />
      )}
    </>
  );
}
