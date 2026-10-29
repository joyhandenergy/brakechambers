import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts } from '@/sanity/queries';

export const dynamicParams = true;

export const revalidate = 60;

function getCategoryPath(category: string): string {
  if (category === 'Spring Brake') return 'spring-brake-chambers';
  if (category === 'Service Brake') return 'service-brake-chambers';
  if (category === 'Air Disc Actuator') return 'air-disc-brake-actuators';
  if (category === 'Parts & Kits') return 'parts-and-kits';
  return 'products';
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const BRAKE_CHAMBERS = await getProducts();
  const params = await props.params;
  const { slug } = params;
  
  const product = BRAKE_CHAMBERS.find(p => p.slug === slug);

  if (product) {
    const categoryPath = getCategoryPath(product.category);
    const title = product.seo?.metaTitle || `${product.name} | BRC Brake Chambers`;
    const description = product.seo?.metaDescription || `Wholesale ${product.name}. Direct OEM replacement for commercial trucks & trailers. Factory-direct pricing and fast worldwide shipping.`;
    const canonical = `https://www.brakechambers.com/${categoryPath}/${product.slug}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'BRC Brake Chambers',
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
    const categoryPath = getCategoryPath(product.category);
    permanentRedirect(`/${categoryPath}/${product.slug}`);
  }

  notFound();
}
