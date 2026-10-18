"use client";

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, ShoppingBag, X, Headphones, User } from 'lucide-react';
import { useCartStore } from '../../store/cart';
import { BRAKE_CHAMBERS } from '../../lib/data';
import MarketSelector from '@/features/home/components/MarketSelector';

// Data & Config
import { 
  PRODUCTS_MENU, 
  MANUFACTURING_MENU,
  APPLICATIONS_MENU,
  OEM_MENU, 
  OTHER_LINKS
} from '@/lib/navigationData';

// Subcomponents
import DesktopSearch from './navbar/DesktopSearch';
import DesktopMegaMenu from './navbar/DesktopMegaMenu';
import MobileMenu from './navbar/MobileMenu';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = React.useRef<HTMLDivElement>(null);

  // To avoid hydration errors with Zustand persist
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useCartStore(state => state.items);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Detect when scrolled past top
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => pathname === path;
  const getLinkClass = (path: string) => `block transform transition-transform duration-200 font-medium text-sm ${isActive(path) ? 'text-amber-600 font-bold translate-x-1' : 'text-slate-600 hover:text-amber-500 hover:translate-x-1'}`;

  // Compute live search results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const tokens = query.split(/\s+/).filter(t => t.length > 0);

    let results: Array<{ type: string; item: any }> = [];

    results = [...results, ...BRAKE_CHAMBERS.filter(p => {
      return tokens.every(token =>
        p.name.toLowerCase().includes(token) ||
        p.brandSlug.toLowerCase().includes(token) ||
        p.slug.toLowerCase().includes(token) ||
        p.oemPartNumbers?.some(oem => oem.partNumber.toLowerCase().includes(token) || oem.brand.toLowerCase().includes(token))
      );
    }).map(p => ({
      type: p.category === 'Spring Brake' 
        ? 'spring-brake-chambers' 
        : (p.category === 'Air Disc Actuator' 
            ? 'air-disc-brake-actuators' 
            : (p.category === 'Parts & Kits' ? 'parts-and-kits' : 'service-brake-chambers')),
      item: p
    }))];

    return results; // Return all matching results directly in the dropdown
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (mobileSearchContainerRef.current && !mobileSearchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchResults.length > 0) {
        // Navigate to the first result
        const firstResult = searchResults[0];
        router.push(`/${firstResult.type}/${firstResult.item.slug}`);
      } else {
        // Fallback to OEM part search
        router.push(`/oem-cross-reference/part-search`);
      }
      setIsMobileMenuOpen(false);
      setShowDropdown(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      {/* Top Utility Bar (Desktop Only) */}
      <div className="hidden lg:flex bg-navy-900 text-white border-b border-navy-800 text-xs font-medium relative z-[60]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px] h-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-navy-200">
              <Headphones className="w-3.5 h-3.5" /> Support: +86 13395856758
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Suspense fallback={<div className="w-20 h-5 bg-navy-800 rounded animate-pulse" />}>
              <MarketSelector />
            </Suspense>
            <div className="w-px h-3.5 bg-navy-700" />
            <Link href="/distributors" className="flex items-center gap-2 text-navy-100 hover:text-white transition-colors">
              <User className="w-3.5 h-3.5" /> Distributors
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-[#FFB000] border-b border-[#e59d00] relative z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
          <div className="h-20 md:h-24 flex items-center justify-between gap-4 md:gap-8">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 min-w-0 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy-900 flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                <img src="/images/logo-brc.png" alt="BRC" className="h-7 md:h-8 w-auto object-contain brightness-0 invert" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-xl md:text-2xl text-navy-950 tracking-tight">BRC</span>
                <span className="text-xs md:text-[13px] font-bold text-navy-800 tracking-widest uppercase">Brake Chambers</span>
              </div>
            </Link>

            {/* Main Search Bar (Center Desktop) */}
            <DesktopSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              searchResults={searchResults}
              handleSearch={handleSearch}
              searchContainerRef={searchContainerRef}
            />

            {/* Right side controls */}
            <div className="flex items-center gap-2.5 md:gap-4 flex-shrink-0">

              {/* Cart Button */}
              <Link
                href={`/quote`}
                className={`${mounted && cartCount > 0 ? 'flex' : 'hidden'} lg:flex relative items-center justify-center md:px-5 md:py-2.5 w-10 h-10 md:w-auto md:h-auto md:bg-navy-900 md:hover:bg-navy-800 text-navy-950 md:text-white rounded-full font-black transition-all md:shadow-lg group md:gap-2.5`}
              >
                <ShoppingBag className="h-6 w-6 md:h-5 md:w-5" />
                <span className="hidden md:inline text-[12px] uppercase tracking-widest">Request Quote</span>
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 bg-navy-950 md:bg-white text-white md:text-navy-950 text-[10px] font-extrabold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-sm md:border-2 md:border-navy-950">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-navy-950 text-white hover:bg-navy-900 transition-transform hover:scale-105 shadow-md"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        searchResults={searchResults}
        handleSearch={handleSearch}
        mobileSearchContainerRef={mobileSearchContainerRef}
        mounted={mounted}
        cartCount={cartCount}
      />

      {/* Secondary Navigation (Desktop Only) - DYNAMIC MEGA MENUS */}
      <div className={`hidden lg:block relative z-40 transition-colors duration-300 ${isScrolled ? 'bg-navy-900 border-t border-navy-800 border-b-2 border-[#FFB000] shadow-md' : 'bg-slate-50 border-y border-navy-100 shadow-sm'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
          <nav className={`flex items-center gap-6 lg:gap-8 h-12 text-sm font-semibold transition-colors duration-300 ${isScrolled ? 'text-navy-100' : 'text-navy-700'}`}>

            {/* Mega Menus - Ordered by Buyer Journey UX */}
            <DesktopMegaMenu config={PRODUCTS_MENU} isActive={pathname?.startsWith('/products') || pathname?.startsWith('/spring-brake-chambers') || pathname?.startsWith('/service-brake-chambers') || pathname?.startsWith('/air-disc-brake-actuators') || pathname?.startsWith('/parts-and-kits')} isScrolled={isScrolled} getLinkClass={getLinkClass} />
            <DesktopMegaMenu config={OEM_MENU} isActive={pathname?.startsWith('/oem-cross-reference')} isScrolled={isScrolled} getLinkClass={getLinkClass} />
            <DesktopMegaMenu config={MANUFACTURING_MENU} isActive={pathname?.startsWith('/manufacturing')} isScrolled={isScrolled} getLinkClass={getLinkClass} />
            <DesktopMegaMenu config={APPLICATIONS_MENU} isActive={pathname?.startsWith('/applications')} isScrolled={isScrolled} getLinkClass={getLinkClass} />

            {/* Technical Resources (Left Side) */}
            <div className="group h-full flex items-center">
              <Link href="/technical-resources" className={`cursor-pointer transition-colors py-3 h-full flex items-center border-b-[3px] ${
                isActive('/technical-resources')
                  ? `font-bold ${isScrolled ? 'border-amber-400 text-amber-400' : 'border-amber-500 text-amber-600'}`
                  : 'border-transparent ' + (isScrolled ? 'hover:border-amber-400 hover:text-white' : 'hover:border-amber-500 hover:text-amber-600')
              }`}>
                Technical Resources
              </Link>
            </div>

            <div className="flex-1"></div>

            {/* Standalone Links (Right Side) */}
            {OTHER_LINKS.filter(link => link.label !== 'Technical Resources').map((link, idx) => (
              <div key={idx} className="group h-full flex items-center">
                <Link href={link.href} className={`cursor-pointer transition-colors py-3 h-full flex items-center border-b-[3px] ${
                  isActive(link.href)
                    ? `font-bold ${isScrolled ? 'border-amber-400 text-amber-400' : 'border-amber-500 text-amber-600'}`
                    : 'border-transparent ' + (isScrolled ? 'hover:border-amber-400 hover:text-white' : 'hover:border-amber-500 hover:text-amber-600')
                }`}>
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
