import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import HighVolumeOrdersClient from '@/features/manufacturing/components/HighVolumeOrdersClient';

export const metadata: Metadata = {
  title: 'High-Volume Brake Chamber Orders: Factory-Direct Volume Pricing | BRC',
  description: 'Volume brake chamber orders from 500 to 20,000+ units. Tiered factory-direct pricing, priority production, container optimization, and dedicated account management.',
};

export default function HighVolumeOrdersPage() {
  return (
    <main>
      <HighVolumeOrdersClient />
      <BreadcrumbSchema items={[
        { name: 'Manufacturing', item: '/manufacturing' },
        { name: 'High Volume Orders' }
      ]} />
    </main>
  );
}
