import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import PrivateLabelClient from '@/features/manufacturing/components/PrivateLabelClient';

export const metadata: Metadata = {
  title: 'Private Label & White Label Brake Chambers: Build Your Brand | BRC',
  description: 'Launch your own private label or white label brake chamber brand. Custom paint, laser engraving, branded packaging. Full factory-direct margins.',
};

export default function PrivateLabelPage() {
  return (
    <main>
      <PrivateLabelClient />
      <BreadcrumbSchema items={[
        { name: 'Manufacturing', item: '/manufacturing' },
        { name: 'Private Label & White Label' }
      ]} />
    </main>
  );
}
