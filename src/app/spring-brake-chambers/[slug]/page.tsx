import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts, getPageSeo } from '@/sanity/queries';
import { SPRING_BRAKES_META } from '@/lib/categoryMeta';
import ProductListingLayout from '@/features/products/components/ProductListingLayout';
import ProductDetailLayout from '@/features/products/product-detail/ProductDetailLayout';

export const revalidate = 60;

export async function generateStaticParams() {
  const BRAKE_CHAMBERS = await getProducts();
  const categories = Object.keys(SPRING_BRAKES_META).map((slug) => ({ slug }));
  const products = BRAKE_CHAMBERS.filter(p => p.category === 'Spring Brake').map(p => ({ slug: p.slug }));
  return [...categories, ...products];
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const { slug } = params;
  
  const pageSeo = await getPageSeo(`/spring-brake-chambers/${slug}`);
  const meta = SPRING_BRAKES_META[slug];
  if (meta || pageSeo) {
    const title = pageSeo?.title || meta?.title || `${slug} | BRC`;
    const description = pageSeo?.description || meta?.desc;
    return {
      title,
      description,
      keywords: pageSeo?.keywords?.length ? pageSeo.keywords : [meta?.name || slug, 'Commercial Air Brakes', 'Spring Brake Chambers'],
      alternates: {
        canonical: `https://www.brakechambers.com/spring-brake-chambers/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.brakechambers.com/spring-brake-chambers/${slug}`,
        type: 'website',
      },
    };
  }

  const product = BRAKE_CHAMBERS.find(p => p.slug === slug && p.category === 'Spring Brake');
  if (product) {
    const title = product.seo?.metaTitle || `${product.name} | BRC Manufacturer`;
    const description = product.seo?.metaDescription || `Wholesale ${product.name}. Factory direct pricing.`;
    return {
      title,
      description,
      keywords: product.seo?.keywords,
      alternates: {
        canonical: `https://www.brakechambers.com/spring-brake-chambers/${product.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.brakechambers.com/spring-brake-chambers/${product.slug}`,
        type: 'website',
      },
    };
  }

  return { title: 'Not Found' };
}

export default async function SpringBrakesSlugPage(
  props: { 
    params: Promise<{ slug: string }>,
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const { slug } = params;

  // 1. Is it a Sub-Category (e.g. "30-30-air-brake-chambers")?
  const meta = SPRING_BRAKES_META[slug];
  if (meta) {
    let products = BRAKE_CHAMBERS.filter(c => c.category === 'Spring Brake');
    
    // Apply strict category filtering
    if (slug.includes('30-30') && !slug.includes('piggyback')) {
      products = products.filter(c => c.type === 'Type 30/30' && !c.name.toLowerCase().includes('piggyback'));
    } else if (slug.includes('piggyback')) {
      products = products.filter(c => c.name.toLowerCase().includes('piggyback'));
    } else if (slug.includes('24-30')) {
      products = products.filter(c => c.type === 'Type 24/30' || c.type === 'Type 24/24');
    } else if (slug.includes('20-24')) {
      products = products.filter(c => c.type === 'Type 20/24');
    } else if (slug.includes('36-36')) {
      products = products.filter(c => c.type === 'Type 36/36');
    } else if (slug.includes('30-28')) {
      products = products.filter(c => c.type === 'Type 30/28');
    }

    return (
      <ProductListingLayout
        title={meta.name}
        description={meta.desc}
        badge="Sub-Category"
        baseCategory="spring-brake-chambers"
        products={products}
        searchParams={searchParams}
        seoText={meta.seoText}
        isSubCategory={true}
        breadcrumbs={[
          { label: 'Spring Brakes', href: '/spring-brake-chambers' },
          { label: meta.name }
        ]}
      />
    );
  }

  // 2. Is it a specific product?
  const product = BRAKE_CHAMBERS.find(p => p.slug === slug && p.category === 'Spring Brake');
  if (product) {
    return (
      <ProductDetailLayout 
        product={product} 
        categoryName="Spring Brakes" 
        categoryPath="spring-brake-chambers" 
      />
    );
  }

  notFound();
}
