import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import ProductionProcessClient from '@/features/manufacturing/components/ProductionProcessClient';

export const metadata: Metadata = {
  title: 'Brake Chamber Manufacturing Process: From Raw Steel to Export | BRC',
  description: 'Inside our brake chamber production process: stamping, robotic welding, e-coating, and automated assembly. IATF 16949-aligned factory in Zhejiang, China.',
};

export default function ProductionProcessPage() {
  return (
    <main>
      <ProductionProcessClient />
      <BreadcrumbSchema items={[
        { name: 'Manufacturing', item: '/manufacturing' },
        { name: 'Manufacturing Process' }
      ]} />
    </main>
  );
}
