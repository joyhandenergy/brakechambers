import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import CustomOemClient from '@/features/manufacturing/components/CustomOemClient';

export const metadata: Metadata = {
  title: 'Custom OEM Brake Chamber Manufacturing: Design to Production | BRC',
  description: 'BRC manufactures custom brake chambers to your specifications. CAD design review, prototyping, custom tooling, and volume production. IP protected.',
};

export default function CustomOemPage() {
  return (
    <main>
      <CustomOemClient />
      <BreadcrumbSchema items={[
        { name: 'Manufacturing', item: '/manufacturing' },
        { name: 'Custom OEM Manufacturing' }
      ]} />
    </main>
  );
}
