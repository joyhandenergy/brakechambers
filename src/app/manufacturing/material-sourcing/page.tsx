import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import MaterialSourcingClient from '@/features/manufacturing/components/MaterialSourcingClient';

export const metadata: Metadata = {
  title: 'Brake Chamber Material Sourcing: Steel, Rubber & Aluminum | BRC',
  description: 'Inside our brake chamber material sourcing process: 8-gauge steel, high-strength neoprene rubber, and ADC12 aluminum. Verified for grade, thickness, and hardness before production.',
};

export default function MaterialSourcingPage() {
  return (
    <main>
      <MaterialSourcingClient />
      <BreadcrumbSchema items={[
        { name: 'Manufacturing', item: '/manufacturing' },
        { name: 'Material Sourcing' }
      ]} />
    </main>
  );
}
