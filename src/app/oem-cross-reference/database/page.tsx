import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import { Download, Table, FileSpreadsheet } from 'lucide-react';
import { getProducts } from '@/sanity/queries';

export const metadata: Metadata = {
  title: 'Full Interchange Database | BRC Brake Chambers',
  description: 'View or download our complete commercial brake chamber cross-reference database mapping Bendix, Knorr-Bremse, ZF/WABCO, Meritor, Haldex, and more to BRC equivalents.',
  keywords: ['Brake Chamber Database', 'Download Cross Reference', 'Air Brake Interchange PDF', 'Fleet Maintenance Data'],
};

export default async function DatabasePage() {
  
  const BRAKE_CHAMBERS = await getProducts();
  // Extract all OEM part mappings for the table
  const allMappings: Array<{
    oemBrand: string;
    oemPart: string;
    brcEquivalent: string;
    category: string;
    brcSlug: string;
  }> = [];
  
  BRAKE_CHAMBERS.forEach(chamber => {
    if (chamber.oemPartNumbers) {
      chamber.oemPartNumbers.forEach(oem => {
        allMappings.push({
          oemBrand: oem.brand,
          oemPart: oem.partNumber,
          brcEquivalent: chamber.name,
          category: chamber.category,
          brcSlug: chamber.category === 'Spring Brake' ? `/spring-brake-chambers/${chamber.slug}` : `/service-brake-chambers/${chamber.slug}`
        });
      });
    }
  });

  // Sort alphabetically by OEM Brand
  allMappings.sort((a, b) => a.oemBrand.localeCompare(b.oemBrand));

  return (
    <div className="bg-[#F8FAFC] pb-16 md:pb-24 font-sans overflow-x-clip">
      <PageHeader
        badge="Master List"
        title="Full Interchange Database"
        description="Access our entire cross-reference database below. Fleet managers and mechanics can also download this data for offline use."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cross-Reference', href: '/oem-cross-reference' },
          { label: 'Database' }
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] -mt-6 sm:-mt-16 relative z-20">
        
        <div className="bg-white rounded-none sm:rounded-[2rem] shadow-sm sm:shadow-xl border-y sm:border border-slate-100 p-4 sm:p-8 lg:p-10 -mx-4 sm:mx-0 flex flex-col gap-6 sm:gap-8">
          
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center w-full md:w-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy-50 rounded-xl flex items-center justify-center mr-4 shrink-0 shadow-inner">
                <Table className="w-6 h-6 sm:w-7 sm:h-7 text-navy-600" />
              </div>
              <div>
                <h2 className="font-extrabold text-navy-900 text-lg sm:text-xl">Live Web Index</h2>
                <p className="text-sm font-medium text-slate-500">{allMappings.length} exact matches found</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
              <button className="w-full sm:w-auto flex justify-center items-center px-6 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-navy-900 font-bold rounded-xl transition-colors shadow-sm">
                <FileSpreadsheet className="w-5 h-5 mr-2 text-slate-500" /> Export CSV
              </button>
              <button className="w-full sm:w-auto flex justify-center items-center px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold rounded-xl transition-transform transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20">
                <Download className="w-5 h-5 mr-2" /> Download PDF Guide
              </button>
            </div>
          </div>

          {/* Database Table Container */}
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-navy-900 text-white border-b border-navy-800">
                    <th className="p-4 sm:p-5 font-bold tracking-wide text-sm whitespace-nowrap">OEM Brand</th>
                    <th className="p-4 sm:p-5 font-bold tracking-wide text-sm whitespace-nowrap">OEM Part #</th>
                    <th className="p-4 sm:p-5 font-bold tracking-wide text-sm whitespace-nowrap">Category</th>
                    <th className="p-4 sm:p-5 font-bold tracking-wide text-sm whitespace-nowrap">BRC Equivalent</th>
                    <th className="p-4 sm:p-5 font-bold tracking-wide text-sm text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allMappings.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4 sm:p-5 font-medium text-slate-700 whitespace-nowrap group-hover:text-navy-900">{row.oemBrand}</td>
                      <td className="p-4 sm:p-5 font-mono font-bold text-navy-900 whitespace-nowrap bg-slate-50/50 group-hover:bg-transparent">{row.oemPart}</td>
                      <td className="p-4 sm:p-5 text-slate-500 text-sm whitespace-nowrap uppercase tracking-wider">{row.category}</td>
                      <td className="p-4 sm:p-5 font-bold text-emerald-600 whitespace-nowrap">{row.brcEquivalent}</td>
                      <td className="p-4 sm:p-5 text-right whitespace-nowrap">
                        <Link href={row.brcSlug} className="inline-flex items-center justify-center px-4 py-2 bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 font-bold text-xs rounded-lg transition-colors shadow-sm">
                          View Part
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <BreadcrumbSchema items={[
        { name: 'OEM Cross-Reference', item: 'https://www.brakechambers.com/oem-cross-reference' },
        { name: 'Database' }
      ]} />
    </div>
  );
}
