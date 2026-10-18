"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { BrakeChamber } from '@/types';
import { Search, AlertCircle, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

interface OEMSearchFormProps {
  products: BrakeChamber[];
}

export default function OEMSearchForm({ products }: OEMSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{ found: boolean } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResult(null);

    setTimeout(() => {
      const cleanQuery = query.trim().toUpperCase();
      let foundOem: { brand: string, partNumber: string, matchType: string } | null = null;
      let brcProduct = null;

      for (const c of products) {
        if (!c.oemPartNumbers) continue;
        const oemMatch = c.oemPartNumbers.find(oem => oem.partNumber.toUpperCase() === cleanQuery);
        if (oemMatch) {
          foundOem = { brand: oemMatch.brand, partNumber: oemMatch.partNumber, matchType: 'Exact' };
          brcProduct = c;
          break;
        }

        const oemPartialMatch = c.oemPartNumbers.find(oem => oem.partNumber.toUpperCase().includes(cleanQuery) || cleanQuery.includes(oem.partNumber.toUpperCase()));
        if (oemPartialMatch) {
          foundOem = { brand: oemPartialMatch.brand, partNumber: oemPartialMatch.partNumber, matchType: 'Equivalent' };
          brcProduct = c;
          break;
        }
      }

      if (brcProduct && foundOem) {
        const oBrandSlug = foundOem.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const oPartNum = foundOem.partNumber.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        router.push(`/oem-cross-reference/${oBrandSlug}/${oPartNum}`);
      } else {
        setResult({ found: false });
        setIsSearching(false);
      }
    }, 800);
  };

  return (
    <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="flex-1 w-full lg:w-1/2">
          <SectionHeader
            badge={<><Search className="w-3.5 h-3.5 inline-block mr-1.5 relative -top-[1px]" /> Live Database</>}
            title="Brake Chamber Interchange Search"
            description={
              <>Enter any OEM part number to instantly find the BRC equivalent. Try searching for parts like <button type="button" onClick={() => setQuery('3430051')} className="bg-slate-100 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 px-2 py-0.5 rounded text-navy-900 hover:text-amber-700 font-mono text-sm font-semibold shadow-sm transition-colors cursor-pointer" title="Click to fill 3430051">3430051</button> or <button type="button" onClick={() => setQuery('423.107.900.0')} className="bg-slate-100 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 px-2 py-0.5 rounded text-navy-900 hover:text-amber-700 font-mono text-sm font-semibold shadow-sm transition-colors cursor-pointer" title="Click to fill 423.107.900.0">423.107.900.0</button>.</>
            }
            align="left"
            theme="light"
            accentColor="amber"
            plainText={true}
            className="!mb-0"
          />
        </div>

        <div className="w-full lg:w-1/2 flex-shrink-0">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                <Search className="text-slate-400 w-5 h-5 sm:w-6 sm:h-6 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter OEM Part Number..."
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 sm:py-5 text-base sm:text-lg text-navy-900 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono uppercase shadow-inner placeholder-slate-400"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              className="bg-navy-900 text-white font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl hover:bg-navy-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center min-w-[160px] sm:min-w-[180px] text-base sm:text-lg"
            >
              {isSearching ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Search Now'
              )}
            </button>
          </form>
          
          <div className="mt-4">
            <Link href="/oem-cross-reference/request" className="text-amber-600 hover:text-amber-500 font-bold text-sm flex items-center w-fit transition-colors">
              Need help? Request a custom cross-match <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8">
        {result && !result.found && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full text-amber-600 flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 text-lg mb-1">No direct cross-reference found</h3>
                <p className="text-amber-800 text-sm mb-3">
                  We could not find an automatic match for "<span className="font-mono font-bold uppercase">{query}</span>" in our instant index.
                </p>
                <p className="text-amber-900 text-sm font-medium bg-amber-100/50 p-3 rounded-lg border border-amber-200/50 mb-4">
                  <strong>Need this part?</strong> Our engineering team can cross-reference it manually against manufacturer technical drawings.
                </p>
                <Link
                  href={`/oem-cross-reference/request?part=${encodeURIComponent(query)}`}
                  className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-navy-800 transition-colors shadow-sm"
                >
                  Request Custom Cross-Match for "{query}" <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
