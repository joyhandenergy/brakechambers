'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('hasSeenSplash') === 'true') {
        setIsRemoved(true);
        return;
      }
    } catch {}

    // Set a timer for the splash screen fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
      try {
        sessionStorage.setItem('hasSeenSplash', 'true');
      } catch {}
    }, 1100);

    // Set a timer to completely unmount after transition
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="splash-container"
      suppressHydrationWarning
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden global-splash-screen transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFadingOut ? 'opacity-0 -translate-y-5 blur-[5px] pointer-events-none' : 'opacity-100 translate-y-0 blur-none'
      }`}
    >
      {/* Creative Animation Container */}
      <div className="relative flex flex-col items-center justify-center w-40 h-40">
        
        {/* Outer Spinning Mechanical Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ 
            rotate: { duration: 4, ease: "linear", repeat: Infinity },
          }}
          className="absolute w-32 h-32 rounded-full border-[2px] border-[#0A192F] border-t-[#FFB000] border-r-[#FFB000]"
        />
        
        {/* Inner Counter-Spinning Ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ 
            rotate: { duration: 2.5, ease: "linear", repeat: Infinity },
          }}
          className="absolute w-24 h-24 rounded-full border border-[#0A192F] border-b-transparent border-l-transparent opacity-60"
        />

        {/* Central Logo Plaque */}
        <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-50">
          <img 
            src="/images/logo-brc.png" 
            alt="BRC Logo" 
            className="w-12 h-auto object-contain"
          />
        </div>
      </div>

      {/* Text and Loading Bar */}
      <div className="mt-6 flex flex-col items-center">
        <div className="flex flex-col items-center leading-none mb-6">
           <span className="font-bold text-3xl text-[#0A192F] tracking-wider mb-3">BRC</span>
           <span className="text-[10px] font-bold text-[#FFB000] tracking-[0.4em] uppercase">Brake Chambers</span>
        </div>
        
        {/* Glowing Sweep Progress Bar */}
        <div className="w-52 h-[2px] bg-[#0A192F] overflow-hidden relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.2, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#FFB000] to-transparent"
          />
        </div>
      </div>
      
    </div>
  );
}
