import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts, getPageSeo } from '@/sanity/queries';
import { SERVICE_CHAMBERS_META } from '@/lib/categoryMeta';
import ProductListingLayout from '@/features/products/components/ProductListingLayout';
import ProductDetailLayout from '@/features/products/product-detail/ProductDetailLayout';

export const revalidate = 60;

export async function generateStaticParams() {
  const BRAKE_CHAMBERS = await getProducts();
  const categories = Object.keys(SERVICE_CHAMBERS_META).map((slug) => ({ slug }));
  const products = BRAKE_CHAMBERS.filter(p => p.category === 'Service Brake').map(p => ({ slug: p.slug }));
  return [...categories, ...products];
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const { slug } = params;
  
  const pageSeo = await getPageSeo(`/service-brake-chambers/${slug}`);
  const meta = SERVICE_CHAMBERS_META[slug];
  if (meta || pageSeo) {
    const title = pageSeo?.title || meta?.title || `${slug} | BRC`;
    const description = pageSeo?.description || meta?.desc;
    return {
      title,
      description,
      keywords: pageSeo?.keywords?.length ? pageSeo.keywords : [meta?.name || slug, 'Commercial Air Brakes', 'Service Brake Chambers'],
      alternates: {
        canonical: `https://www.brakechambers.com/service-brake-chambers/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.brakechambers.com/service-brake-chambers/${slug}`,
        type: 'website',
      },
    };
  }

  const product = BRAKE_CHAMBERS.find(p => p.slug === slug && p.category === 'Service Brake');
  if (product) {
    const title = product.seo?.metaTitle || `${product.name} | BRC Manufacturer`;
    const description = product.seo?.metaDescription || `Wholesale ${product.name}. Factory direct pricing.`;
    return {
      title,
      description,
      keywords: product.seo?.keywords,
      alternates: {
        canonical: `https://www.brakechambers.com/service-brake-chambers/${product.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.brakechambers.com/service-brake-chambers/${product.slug}`,
        type: 'website',
      },
    };
  }

  return { title: 'Not Found' };
}

export default async function ServiceBrakesSlugPage(
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
  const meta = SERVICE_CHAMBERS_META[slug];
  if (meta) {
    let products = BRAKE_CHAMBERS.filter(c => c.category === 'Service Brake');
    
    // Apply strict category filtering
    if (slug.includes('type-20')) {
      products = products.filter(c => c.type.includes('Type 20'));
    } else if (slug.includes('type-30')) {
      products = products.filter(c => c.type.includes('Type 30'));
    } else if (slug.includes('type-12-16-24')) {
      products = products.filter(c => c.type.includes('Type 12') || c.type.includes('Type 16') || c.type.includes('Type 24'));
    } else if (slug.includes('welded-clevis')) {
      products = products.filter(c => c.name.toLowerCase().includes('welded'));
    } else if (slug.includes('type-36')) {
      products = products.filter(c => c.type.includes('Type 36'));
    }

    return (
      <ProductListingLayout
        title={meta.name}
        description={meta.desc}
        badge="Sub-Category"
        baseCategory="service-brake-chambers"
        products={products}
        searchParams={searchParams}
        seoText={meta.seoText}
        isSubCategory={true}
        breadcrumbs={[
          { label: 'Service Brakes', href: '/service-brake-chambers' },
          { label: meta.name }
        ]}
      />
    );
  }

  // 2. Is it a specific product?
  const product = BRAKE_CHAMBERS.find(p => p.slug === slug && p.category === 'Service Brake');
  if (product) {
    return (
      <ProductDetailLayout 
        product={product} 
        categoryName="Service Chambers" 
        categoryPath="service-brake-chambers" 
      />
    );
  }

  notFound();
}
