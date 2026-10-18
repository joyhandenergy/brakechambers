import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Market } from '../types';
import { MARKETS } from '../lib/data';

interface MarketState {
  selectedMarket: Market;
  setMarket: (market: Market) => void;
}

export const useMarketStore = create<MarketState>()(
  persist(
    (set) => ({
      selectedMarket: MARKETS[0], // Default to English
      setMarket: (market) => set({ selectedMarket: market }),
    }),
    {
      name: 'brc-language-storage',
      partialize: (state) => ({ selectedMarket: state.selectedMarket }), // Only persist selected market
    }
  )
);
