import React from 'react';
import { Search } from 'lucide-react';
import { useSearchModalStore } from '@/store/search';

interface DesktopSearchProps {
  // Keeping props for backward compatibility, but we won't use them
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  showDropdown?: boolean;
  setShowDropdown?: (show: boolean) => void;
  searchResults?: Array<{ type: string; item: any }>;
  handleSearch?: (e: React.FormEvent) => void;
  searchContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function DesktopSearch(props: DesktopSearchProps) {
  const { openSearch } = useSearchModalStore();

  return (
    <div className="flex-1 w-full mx-auto hidden lg:block max-w-3xl">
      <div className="relative group">
        <button 
          type="button"
          onClick={openSearch}
          className="relative group flex items-center w-full bg-white rounded-full border border-transparent hover:border-amber-400 hover:ring-4 hover:ring-amber-500/10 transition-all overflow-hidden shadow-sm h-10 text-left"
        >
          <Search className="h-5 w-5 text-navy-400 ml-4 group-hover:text-amber-500 transition-colors" />
          <span className="flex-1 bg-transparent py-2.5 px-3 text-sm text-slate-400 font-medium">
            Search BRC catalog or OEM part numbers...
          </span>
          <div className="pr-5 pl-3 flex items-center justify-center h-full text-navy-400 font-medium text-xs border-l border-slate-100">
            <kbd className="font-sans">cmd</kbd>+<kbd className="font-sans">k</kbd>
          </div>
        </button>
      </div>
    </div>
  );
}
