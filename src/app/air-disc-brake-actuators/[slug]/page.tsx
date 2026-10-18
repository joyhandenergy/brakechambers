import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts, getPageSeo } from '@/sanity/queries';
import { AIR_DISC_ACTUATORS_META } from '@/lib/categoryMeta';
import ProductListingLayout from '@/features/products/components/ProductListingLayout';
import ProductDetailLayout from '@/features/products/product-detail/ProductDetailLayout';

export const revalidate = 60;

export async function generateStaticParams() {
  const BRAKE_CHAMBERS = await getProducts();
  const categories = Object.keys(AIR_DISC_ACTUATORS_META).map((slug) => ({ slug }));
  const products = BRAKE_CHAMBERS.filter(p => p.category === 'Air Disc Actuator').map(p => ({ slug: p.slug }));
  return [...categories, ...products];
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const { slug } = params;
  
  const pageSeo = await getPageSeo(`/air-disc-brake-actuators/${slug}`);
  const meta = AIR_DISC_ACTUATORS_META[slug];
  if (meta || pageSeo) {
    const title = pageSeo?.title || meta?.title || `${slug} | BRC`;
    const description = pageSeo?.description || meta?.desc;
    return {
      title,
      description,
      keywords: pageSeo?.keywords?.length ? pageSeo.keywords : [meta?.name || slug, 'Air Disc Brakes', 'ADB Actuators', 'Commercial Air Brakes'],
      alternates: {
        canonical: `https://www.brakechambers.com/air-disc-brake-actuators/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.brakechambers.com/air-disc-brake-actuators/${slug}`,
        type: 'website',
      },
    };
  }

  const product = BRAKE_CHAMBERS.find(p => p.slug === slug && p.category === 'Air Disc Actuator');
  if (product) {
    const title = product.seo?.metaTitle || `${product.name} | BRC Manufacturer`;
    const description = product.seo?.metaDescription || `Wholesale ${product.name}. Factory direct pricing.`;
    return {
      title,
      description,
      keywords: product.seo?.keywords,
      alternates: {
        canonical: `https://www.brakechambers.com/air-disc-brake-actuators/${product.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.brakechambers.com/air-disc-brake-actuators/${product.slug}`,
        type: 'website',
      },
    };
  }

  return { title: 'Not Found' };
}

export default async function AirDiscActuatorsSlugPage(
  props: { 
    params: Promise<{ slug: string }>,
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const { slug } = params;

  // 1. Is it a Sub-Category?
  const meta = AIR_DISC_ACTUATORS_META[slug];
  if (meta) {
    let products = BRAKE_CHAMBERS.filter(c => c.category === 'Air Disc Actuator');
    
    // Apply strict category filtering
    if (slug.includes('16-18')) {
      products = products.filter(c => c.type.includes('Type 16') || c.type.includes('Type 18'));
    } else if (slug.includes('20-24')) {
      products = products.filter(c => c.type.includes('Type 20/24'));
    } else if (slug.includes('24-24')) {
      products = products.filter(c => c.type.includes('Type 24/24'));
    } else if (slug.includes('24-30')) {
      products = products.filter(c => c.type.includes('Type 24/30'));
    }

    return (
      <ProductListingLayout
        title={meta.name}
        description={meta.desc}
        badge="Sub-Category"
        baseCategory="air-disc-brake-actuators"
        products={products}
        searchParams={searchParams}
        seoText={meta.seoText}
        isSubCategory={true}
        breadcrumbs={[
          { label: 'Air Disc Actuators', href: '/air-disc-brake-actuators' },
          { label: meta.name }
        ]}
      />
    );
  }

  // 2. Is it a specific product?
  const product = BRAKE_CHAMBERS.find(p => p.slug === slug && p.category === 'Air Disc Actuator');
  if (product) {
    return (
      <ProductDetailLayout 
        product={product} 
        categoryName="Air Disc Actuators" 
        categoryPath="air-disc-brake-actuators" 
      />
    );
  }

  notFound();
}
