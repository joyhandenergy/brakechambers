"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useMarketStore } from '@/store/market';
import { MARKETS } from '@/lib/data';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';

// Inline SVG flags — no external CDN needed, works everywhere
const FLAGS: Record<string, React.ReactNode> = {
  'en': ( // USA
    <svg viewBox="0 0 60 30" className="w-full h-full"><rect fill="#B22234" width="60" height="30"/><rect fill="#fff" y="2.31" width="60" height="2.31"/><rect fill="#fff" y="6.92" width="60" height="2.31"/><rect fill="#fff" y="11.54" width="60" height="2.31"/><rect fill="#fff" y="16.15" width="60" height="2.31"/><rect fill="#fff" y="20.77" width="60" height="2.31"/><rect fill="#fff" y="25.38" width="60" height="2.31"/><rect fill="#3C3B6E" width="24" height="16.15"/></svg>
  ),
  'zh-CN': ( // China
    <svg viewBox="0 0 60 40" className="w-full h-full"><rect fill="#DE2910" width="60" height="40"/><polygon fill="#FFDE00" points="12,5 13.8,10.5 19.6,10.5 14.9,14 16.7,19.5 12,16 7.3,19.5 9.1,14 4.4,10.5 10.2,10.5"/></svg>
  ),
};

function FlagIcon({ code, size = 20, className = '' }: { code: string; size?: number; className?: string }) {
  return (
    <span 
      className={`inline-flex items-center justify-center rounded-[3px] overflow-hidden border border-white/20 shadow-sm flex-shrink-0 ${className}`}
      style={{ width: size, height: Math.round(size * 0.7) }}
    >
      {FLAGS[code] || FLAGS['en']}
    </span>
  );
}

export default function MarketSelector() {
  const { setMarket } = useMarketStore();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const rawMarket = useMarketStore(state => state.selectedMarket);
  // Ensure we always have a valid market from the current MARKETS list
  const currentMarket = MARKETS.find(m => m.code === rawMarket?.code) || MARKETS[0];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // If an obsolete market was stored in localStorage from previous visits, reset to English
    if (rawMarket && !MARKETS.some(m => m.code === rawMarket.code)) {
      setMarket(MARKETS[0]);
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    }
  }, [rawMarket, setMarket]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="relative">
        <button className="flex items-center gap-1.5 bg-navy-800/50 px-2.5 py-1 rounded-md border border-navy-700 text-navy-100 font-medium text-xs h-7 opacity-70 pointer-events-none">
          <FlagIcon code="en" size={18} />
          <span className="hidden sm:block">
            {MARKETS[0]?.countryName || 'English'}
          </span>
          <ChevronDown className="w-3 h-3 text-navy-400" />
        </button>
      </div>
    );
  }

  const handleMarketChange = (newMarketCode: string) => {
    setIsOpen(false);
    if (newMarketCode === currentMarket.code) return;
    
    const marketToSet = MARKETS.find(m => m.code === newMarketCode);
    if (marketToSet) {
      setMarket(marketToSet);
      
      if (newMarketCode === 'en') {
        // To reliably restore original language, clear the cookie and reload
        // eslint-disable-next-line react-hooks/immutability
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // eslint-disable-next-line react-hooks/immutability
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        window.location.reload();
      } else {
        // Set the Google Translate cookie for persistence
        // eslint-disable-next-line react-hooks/immutability
        document.cookie = `googtrans=/en/${newMarketCode}; path=/`;
        // eslint-disable-next-line react-hooks/immutability
        document.cookie = `googtrans=/en/${newMarketCode}; path=/; domain=${window.location.hostname}`;
        
        // Try to trigger Google Translate programmatically
        let selectField = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        
        if (selectField) {
          selectField.value = newMarketCode; 
          selectField.dispatchEvent(new Event('change'));
        } else {
          // If the widget hasn't fully loaded, poll for it briefly before falling back to reload
          let retries = 0;
          const poll = setInterval(() => {
            selectField = document.querySelector('.goog-te-combo') as HTMLSelectElement;
            if (selectField) {
              clearInterval(poll);
              selectField.value = newMarketCode; 
              selectField.dispatchEvent(new Event('change'));
            } else if (retries >= 15) { 
              // Give up after ~1.5 seconds and reload
              clearInterval(poll);
              window.location.reload();
            }
            retries++;
          }, 100);
        }
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-navy-800/50 hover:bg-navy-700 transition-all px-2.5 py-1 rounded-md border border-navy-700 text-navy-100 font-medium text-xs group h-7"
        aria-label="Select Language"
      >
        <FlagIcon code={currentMarket.code} size={18} />
        <span className="group-hover:text-amber-400 transition-colors hidden sm:block">
          {currentMarket.countryName}
        </span>
        <ChevronDown className={`w-3 h-3 text-navy-400 group-hover:text-amber-400 transition-all ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-50">
          <div className="bg-slate-50/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-navy-400 uppercase tracking-widest">Select Language</span>
            <Globe className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="p-2">
            {MARKETS.map(market => {
              const displayName = market.code === 'zh-CN' ? '中文 (Chinese)' : market.countryName;
              return (
                <button
                  key={market.code}
                  onClick={() => handleMarketChange(market.code)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center gap-3 transition-all ${market.code === currentMarket.code ? 'bg-slate-100 border border-slate-200' : 'hover:bg-slate-50 border border-transparent'}`}
                >
                  <FlagIcon code={market.code} size={22} />
                  <span className={`font-bold flex-grow ${market.code === currentMarket.code ? 'text-navy-900' : 'text-slate-600'}`}>
                    {displayName}
                  </span>
                  {market.code === currentMarket.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-navy-400"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

