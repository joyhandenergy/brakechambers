import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts } from '@/sanity/queries';
import ProductDetailLayout from '@/features/products/product-detail/ProductDetailLayout';

export const dynamicParams = false;

export async function generateStaticParams() {
  const BRAKE_CHAMBERS = await getProducts();
  return BRAKE_CHAMBERS.map((p) => ({ slug: p.slug }));
}

export const revalidate = 60;

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const { slug } = params;
  
  const product = BRAKE_CHAMBERS.find(p => p.slug === slug);

  if (product) {
    const title = product.seo?.metaTitle || `${product.name} | BRC Brake Chambers`;
    const description = product.seo?.metaDescription || `Wholesale ${product.name}. Direct OEM replacement for commercial trucks & trailers. Factory-direct pricing and fast worldwide shipping.`;
    const canonical = `https://www.brakechambers.com/${product.slug}`;

    const defaultKeywords = [
      product.name, 
      product.category,
      'Commercial Air Brake', 
      'OEM Replacement',
      ...(product.crossReferenceBrands || []),
      ...(product.oemPartNumbers?.map((o: any) => o.partNumber) || []),
      ...(product.hiddenSearchTags || [])
    ];
    const keywords = product.seo?.keywords?.length
      ? product.seo.keywords.join(', ')
      : defaultKeywords.join(', ');

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'website',
      },
    };
  }

  return { title: 'Product Not Found | BRC Brake Chambers' };
}

export default async function ProductRootPage(
  props: { params: Promise<{ slug: string }> }
) {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const { slug } = params;

  const product = BRAKE_CHAMBERS.find(p => p.slug === slug);

  if (product) {
    // Determine categoryName and categoryPath
    let categoryName = '';
    let categoryPath = '';
    
    if (product.category === 'Spring Brake') {
      categoryName = 'Spring Brakes';
      categoryPath = 'spring-brake-chambers';
    } else if (product.category === 'Service Brake') {
      categoryName = 'Service Chambers';
      categoryPath = 'service-brake-chambers';
    } else if (product.category === 'Air Disc Actuator') {
      categoryName = 'Air Disc Actuators';
      categoryPath = 'air-disc-brake-actuators';
    } else {
      categoryName = 'Parts & Kits';
      categoryPath = 'parts-and-kits';
    }

    return (
      <ProductDetailLayout 
        product={product} 
        categoryName={categoryName} 
        categoryPath={categoryPath} 
      />
    );
  }

  notFound();
}
