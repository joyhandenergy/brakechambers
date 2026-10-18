import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import TestingLaboratoryClient from '@/features/manufacturing/components/TestingLaboratoryClient';

export const metadata: Metadata = {
  title: 'Brake Chamber Quality Assurance: Inside Our Testing Lab | BRC',
  description: 'Every BRC brake chamber passes up to 1M cycle tests, 500-hour salt spray, and 100% pneumatic leak testing. IATF 16949 quality system. Full traceability.',
};

export default function TestingLaboratoryPage() {
  return (
    <main>
      <TestingLaboratoryClient />
      <BreadcrumbSchema items={[
        { name: 'Manufacturing', item: '/manufacturing' },
        { name: 'Quality Assurance & Lab' }
      ]} />
    </main>
  );
}
