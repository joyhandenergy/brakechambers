import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts, getPageSeo } from '@/sanity/queries';
import { CHAMBER_PARTS_KITS_META } from '@/lib/categoryMeta';
import { findProductBySlug, getAllSlugsForProduct } from '@/lib/slugMapping';
import ProductListingLayout from '@/features/products/components/ProductListingLayout';
import ProductDetailLayout from '@/features/products/product-detail/ProductDetailLayout';

export const revalidate = 60;

export async function generateStaticParams() {
  const allProducts = await getProducts();
  const categories = Object.keys(CHAMBER_PARTS_KITS_META).map((slug) => ({ slug }));
  const partsProducts = allProducts.filter(p => p.category === 'Parts & Kits');
  const productSlugs = new Set<string>();
  partsProducts.forEach(p => {
    getAllSlugsForProduct(p.slug).forEach(s => productSlugs.add(s));
    if (p.aliases) p.aliases.forEach(a => productSlugs.add(a));
  });
  return [...categories, ...Array.from(productSlugs).map(slug => ({ slug }))];
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const allProducts = await getProducts();
  const params = await props.params;
  const { slug } = params;
  
  const pageSeo = await getPageSeo(`/parts-and-kits/${slug}`);
  const meta = CHAMBER_PARTS_KITS_META[slug];
  if (meta || pageSeo) {
    const title = pageSeo?.title || meta?.title || `${slug} | BRC`;
    const description = pageSeo?.description || meta?.desc;
    return {
      title,
      description,
      keywords: pageSeo?.keywords?.length ? pageSeo.keywords : [meta?.name || slug, 'Commercial Air Brakes', 'Brake Chamber Parts'],
      alternates: {
        canonical: `https://www.brakechambers.com/parts-and-kits/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.brakechambers.com/parts-and-kits/${slug}`,
        type: 'website',
      },
    };
  }

  const product = findProductBySlug(allProducts, slug, 'Parts & Kits');
  if (product) {
    const title = product.seo?.metaTitle || `${product.name} | BRC Manufacturer`;
    const description = product.seo?.metaDescription || (product.description ? product.description.replace(/<[^>]*>/g, '').slice(0, 160) : `Wholesale ${product.name}. Factory direct pricing.`);
    return {
      title,
      description,
      keywords: product.seo?.keywords,
      alternates: {
        canonical: `https://www.brakechambers.com/parts-and-kits/${product.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.brakechambers.com/parts-and-kits/${product.slug}`,
        type: 'website',
      },
    };
  }

  return { title: 'Not Found' };
}

export default async function ChamberPartsKitsSlugPage(
  props: { 
    params: Promise<{ slug: string }>,
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const allProducts = await getProducts();
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const { slug } = params;

  // 1. Is it a Sub-Category?
  const meta = CHAMBER_PARTS_KITS_META[slug];
  if (meta) {
    let products = allProducts.filter(c => c.category === 'Parts & Kits');
    
    // Apply strict category filtering
    if (slug === 'air-brake-chamber-rebuild-kits') {
      products = products.filter(c => 
        c.name.toLowerCase().includes('kit') || 
        c.name.toLowerCase().includes('rebuild') || 
        c.type?.toLowerCase().includes('kit')
      );
    } else if (slug === 'brake-chamber-diaphragms') {
      products = products.filter(c => 
        c.name.toLowerCase().includes('diaphragm') || 
        c.brakingMethod?.toLowerCase().includes('diaphragm')
      );
    } else if (slug === 'brake-chamber-caging-bolts-tools') {
      products = products.filter(c => 
        c.name.toLowerCase().includes('caging') || 
        c.name.toLowerCase().includes('tool') || 
        c.name.toLowerCase().includes('bolt')
      );
    } else if (slug === 'brake-chamber-clamp-bands') {
      products = products.filter(c => 
        c.name.toLowerCase().includes('clamp') || 
        c.name.toLowerCase().includes('band')
      );
    } else if (slug === 'automatic-manual-slack-adjusters') {
      products = products.filter(c => 
        c.name.toLowerCase().includes('slack') || 
        c.name.toLowerCase().includes('adjuster')
      );
    } else if (slug === 'clevis-pins-slack-adjuster-hardware') {
      products = products.filter(c => 
        c.name.toLowerCase().includes('clevis') || 
        c.name.toLowerCase().includes('pin') || 
        c.name.toLowerCase().includes('hardware')
      );
    }

    return (
      <ProductListingLayout
        title={meta.name}
        description={meta.desc}
        badge="Sub-Category"
        baseCategory="parts-and-kits"
        products={products}
        searchParams={searchParams}
        seoText={meta.seoText}
        isSubCategory={true}
        breadcrumbs={[
          { label: 'Chamber Parts & Kits', href: '/parts-and-kits' },
          { label: meta.name }
        ]}
        cardType="product"
      />
    );
  }

  // 2. Is it a specific product?
  const product = findProductBySlug(allProducts, slug, 'Parts & Kits');
  if (product) {
    return (
      <ProductDetailLayout 
        product={product} 
        categoryName="Parts & Kits" 
        categoryPath="parts-and-kits" 
      />
    );
  }

  notFound();
}
