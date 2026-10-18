import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import BrakeRandDClient from '@/features/manufacturing/components/BrakeRandDClient';

export const metadata: Metadata = {
  title: 'Brake Chamber R&D: Engineering the Next Generation | BRC',
  description: 'Inside BRC\'s brake chamber R&D process: 3D CAD modeling, FEA simulation, rapid prototyping, and materials validation. Every design is validated to IATF 16949 standards.',
};

export default function BrakeRandDPage() {
  return (
    <main>
      <BrakeRandDClient />
      <BreadcrumbSchema items={[
        { name: 'Manufacturing', item: '/manufacturing' },
        { name: 'Brake R&D' }
      ]} />
    </main>
  );
}
