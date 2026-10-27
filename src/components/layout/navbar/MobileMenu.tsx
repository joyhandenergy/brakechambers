import React, { Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MarketSelector from '@/features/home/components/MarketSelector';
import { MOBILE_LINKS } from '@/lib/navigationData';
import { useSearchModalStore } from '@/store/search';
import Card from '@/components/ui/Card';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  searchResults: Array<{ type: string; item: any }>;
  handleSearch: (e: React.FormEvent) => void;
  mobileSearchContainerRef: React.RefObject<HTMLDivElement | null>;
  mounted: boolean;
  cartCount: number;
}

export default function MobileMenu({
  isOpen,
  setIsOpen,
  searchQuery,
  setSearchQuery,
  showDropdown,
  setShowDropdown,
  searchResults,
  handleSearch,
  mobileSearchContainerRef,
  mounted,
  cartCount
}: MobileMenuProps) {
  const router = useRouter();
  const { openSearch } = useSearchModalStore();

  const handleOpenSearch = () => {
    setIsOpen(false);
    openSearch();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for closing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-[100px] bg-navy-950/60 backdrop-blur-md z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Premium Light Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute left-0 right-0 top-full bg-white z-50 shadow-2xl h-[calc(100dvh-64px)] overflow-y-auto flex flex-col"
          >
            <div className="px-4 pt-6 pb-24 flex-1 flex flex-col" ref={mobileSearchContainerRef}>
              <div className="relative mb-8">
                <button 
                  onClick={handleOpenSearch}
                  className="flex items-center w-full bg-slate-50 rounded-xl border border-slate-200 focus-within:border-amber-500 focus-within:bg-white overflow-hidden group transition-colors shadow-sm text-left h-14"
                >
                  <Search className="h-5 w-5 text-navy-400 ml-4 group-hover:text-amber-500 transition-colors" />
                  <span className="flex-1 bg-transparent px-3 text-[15px] text-slate-400 font-medium">
                    Search catalog or part #...
                  </span>
                  <div className="pr-4 pl-2 flex items-center justify-center text-navy-600 font-extrabold text-[12px] uppercase tracking-widest group-hover:text-amber-600 transition-colors h-full border-l border-slate-200">
                    Search
                  </div>
                </button>
              </div>

              <div className="p-4 sm:p-6 md:p-8 rounded-[1.25rem] mb-8 flex justify-between items-center bg-slate-50 border border-slate-200 shadow-sm relative z-50">
                <span className="text-[13px] font-extrabold text-navy-500 uppercase tracking-widest">Language / 语言</span>
                <Suspense fallback={<div className="w-24 h-8 bg-slate-200 rounded-full animate-pulse" />}>
                  <MarketSelector />
                </Suspense>
              </div>

              <nav className="flex flex-col gap-2">
                <div className="pt-2 pb-2 px-3">
                  <span className="text-[11px] font-extrabold text-navy-400 uppercase tracking-widest">Products</span>
                </div>
                <div className="pl-2 flex flex-col gap-1 mb-4">
                  {MOBILE_LINKS.products.map((link, idx) => (
                    <Link key={idx} href={link.href} onClick={() => setTimeout(() => setIsOpen(false), 150)} className={`flex items-center gap-3 p-3 font-bold rounded-xl transition-colors text-navy-800 hover:bg-slate-50 hover:text-navy-950 text-[15px]`}>
                      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">{link.icon}</div> {link.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 pb-2 px-3 border-t border-slate-100">
                  <span className="text-[11px] font-extrabold text-navy-400 uppercase tracking-widest">Company & Resources</span>
                </div>
                <div className="pl-2 flex flex-col gap-1 mb-4">
                  {MOBILE_LINKS.company.map((link, idx) => (
                    <Link key={idx} href={link.href} onClick={() => setTimeout(() => setIsOpen(false), 150)} className={`flex items-center gap-3 p-3 font-bold rounded-xl transition-colors text-navy-800 hover:bg-slate-50 hover:text-navy-950 text-[15px]`}>
                      <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center flex-shrink-0">{link.icon}</div> {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link href={`/quote`} onClick={() => setTimeout(() => setIsOpen(false), 150)} className={`p-4 font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 bg-amber-500 text-navy-950 hover:bg-amber-400 text-[13px] uppercase tracking-widest shadow-lg shadow-amber-500/20`}>
                    <ShoppingBag className="w-4 h-4" /> Get Quote {mounted && cartCount > 0 && <span className="bg-navy-950 text-white text-xs px-2 py-0.5 rounded-full ml-1">{cartCount}</span>}
                  </Link>
                  <Link href={`/distributors`} onClick={() => setTimeout(() => setIsOpen(false), 150)} className={`p-4 font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 bg-navy-900 text-white hover:bg-navy-800 text-[13px] uppercase tracking-widest border border-navy-700`}>
                    <User className="w-4 h-4" /> Distributors
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
