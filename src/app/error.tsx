'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real application, you might log this to a service like Sentry
    console.error('Page loading error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-24 px-4 text-center w-full">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100/50">
        <AlertTriangle className="w-10 h-10" />
      </div>
      
      <h2 className="text-3xl font-bold font-heading text-navy-900 mb-3 tracking-tight">
        Connection Interrupted
      </h2>
      
      <p className="text-slate-600 mb-8 max-w-md mx-auto text-sm leading-relaxed">
        We encountered an unexpected error while trying to load this content. It might be a temporary delay or a network issue.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none">
        <button
          onClick={() => reset()}
          className="bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold text-[13px] uppercase tracking-widest py-4 px-8 rounded-xl transition-all shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 w-full sm:w-auto text-center"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-white hover:bg-slate-50 border border-slate-200 text-navy-900 font-extrabold text-[13px] uppercase tracking-widest py-4 px-8 rounded-xl transition-all shadow-sm transform hover:-translate-y-1 w-full sm:w-auto text-center block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
