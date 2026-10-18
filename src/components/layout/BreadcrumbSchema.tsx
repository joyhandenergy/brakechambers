import Script from 'next/script';
import React from 'react';

export interface BreadcrumbSchemaItem {
  name: string;
  item?: string; // e.g. "/", "/company"
}

export default function BreadcrumbSchema({ items }: { items: BreadcrumbSchemaItem[] }) {
  // Ensure we always have Home as the first item if not explicitly provided
  const fullItems = items[0]?.name === 'Home' ? items : [{ name: 'Home', item: '/' }, ...items];

  const itemListElement = fullItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.item ? { item: `https://www.brakechambers.com${item.item}` } : {}),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
