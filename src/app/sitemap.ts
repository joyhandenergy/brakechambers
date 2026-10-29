import type { MetadataRoute } from 'next';
import { getProducts, getBlogPosts } from '@/sanity/queries';
import { BRAKE_CHAMBERS } from '@/lib/data';
import { blogPosts as fallbackBlogPosts } from '@/data/blogPosts';
import { APPLICATION_DATA } from '@/data/applicationsData';

export const revalidate = 3600; // revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brakechambers.com';

  let products: any[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.warn('Sitemap: Failed to fetch products from Sanity, using fallback data', error);
    products = BRAKE_CHAMBERS;
  }
  if (!products || products.length === 0) {
    products = BRAKE_CHAMBERS;
  }

  let blogPosts: any[] = [];
  try {
    blogPosts = await getBlogPosts();
  } catch (error) {
    console.warn('Sitemap: Failed to fetch blog posts from Sanity, using fallback data', error);
    blogPosts = fallbackBlogPosts;
  }
  if (!blogPosts || blogPosts.length === 0) {
    blogPosts = fallbackBlogPosts;
  }

  // Base routes
  const baseRoutes = [
    '',
    '/products',
    '/contact',
    '/quote',
    '/our-story',
    '/distributors',
    '/privacy',
    '/terms',
    '/warranty',
    '/shipping',
    '/blog',
    '/applications',
    '/technical-resources',

    // Manufacturing Hub
    '/manufacturing',
    '/manufacturing/process',
    '/manufacturing/material-sourcing',
    '/manufacturing/quality-assurance',
    '/manufacturing/research-development',
    '/manufacturing/custom-oem',
    '/manufacturing/private-label',
    '/manufacturing/high-volume-orders',

    // Top-level categories
    '/spring-brake-chambers',
    '/service-brake-chambers',
    '/air-disc-brake-actuators',
    '/parts-and-kits',

    // OEM Hub
    '/oem-cross-reference',
    '/oem-cross-reference/database',
    '/oem-cross-reference/request',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Spring Brakes Categories
  const springBrakeCategories = [
    '30-30-air-brake-chambers',
    '24-30-24-24-spring-brakes',
    '20-24-spring-brake-chambers',
    'type-30-30-piggyback-kits',
    '36-36-spring-brakes',
    '30-28-spring-brakes',
  ].map((slug) => ({
    url: `${baseUrl}/spring-brake-chambers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Service Chambers Categories
  const serviceChamberCategories = [
    'type-20-steer-axle-brake-chambers',
    'type-30-service-chambers',
    'type-12-16-24-service-chambers',
    'welded-clevis-brake-chambers',
    'type-36-service-chambers',
  ].map((slug) => ({
    url: `${baseUrl}/service-brake-chambers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // ADB Categories
  const adbCategories = [
    'type-16-18-adb-actuators',
    'type-20-24-air-disc-brake-actuator',
    'type-24-24-adb-chambers',
    'type-24-30-air-disc-brake-actuators',
  ].map((slug) => ({
    url: `${baseUrl}/air-disc-brake-actuators/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Chamber Parts Categories
  const partCategories = [
    'air-brake-chamber-rebuild-kits',
    'brake-chamber-diaphragms',
    'clevis-pins-slack-adjuster-hardware',
    'brake-chamber-caging-bolts-tools',
    'brake-chamber-clamp-bands',
    'automatic-manual-slack-adjusters',
  ].map((slug) => ({
    url: `${baseUrl}/parts-and-kits/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Applications (Dynamically pulls all 13 application and regional routes)
  const applicationRoutes = Object.keys(APPLICATION_DATA).map((slug) => ({
    url: `${baseUrl}/applications/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // OEM Brands
  const oemBrands = ['bendix', 'meritor', 'haldex', 'wabco', 'zf-wabco', 'knorr-bremse', 'sorl', 'mgm', 'automann', 'dexter', 'tse', 'tse-brakes'];
  const oemCategories = [
    '',
    '-spring-brake-chambers',
    '-service-brake-chambers',
    '-air-disc-brake-actuators',
  ];
  const oemCrossReferenceHubs = oemBrands.flatMap((brand) =>
    oemCategories.map((cat) => ({
      url: `${baseUrl}/oem-cross-reference/${brand}${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: cat === '' ? 0.9 : 0.8,
    }))
  );

  // Technical Resources
  const technicalResources = [
    'installation',
    'caging',
    'size-charts',
    'stroke-length',
    'selection-guides',
    'identification',
  ].map((slug) => ({
    url: `${baseUrl}/technical-resources/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Products from Sanity (or fallback)
  const productRoutes = products.map((product) => {
    let categoryPrefix = 'products';
    if (product.category === 'Spring Brake') categoryPrefix = 'spring-brake-chambers';
    else if (product.category === 'Service Brake') categoryPrefix = 'service-brake-chambers';
    else if (product.category === 'Air Disc Actuator') categoryPrefix = 'air-disc-brake-actuators';
    else if (product.category === 'Parts & Kits') categoryPrefix = 'parts-and-kits';

    return {
      url: `${baseUrl}/${categoryPrefix}/${product.slug}`,
      lastModified: product.publishedAt ? new Date(product.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  // Blog Posts from Sanity (or fallback)
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishDate ? new Date(post.publishDate) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...baseRoutes,
    ...springBrakeCategories,
    ...serviceChamberCategories,
    ...adbCategories,
    ...partCategories,
    ...oemCrossReferenceHubs,
    ...technicalResources,
    ...applicationRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
