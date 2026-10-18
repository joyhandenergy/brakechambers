import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverEffect?: 'none' | 'lift' | 'glow';
  glowColor?: 'amber' | 'navy' | 'slate';
  theme?: 'light' | 'dark';
  className?: string;
}

export default function Card({ 
  children, 
  padding = 'lg',
  hoverEffect = 'none',
  glowColor = 'amber',
  theme = 'light',
  className = '',
  ...props
}: CardProps) {
  
  // Padding map
  const paddingMap = {
    none: 'p-0',
    sm: 'p-4 sm:p-6 lg:p-8', // Used for OEM Brand grids, etc.
    md: 'p-6 sm:p-8 md:p-10', // Medium spacing
    lg: 'p-6 sm:p-8 md:p-10 lg:p-12', // Standard for big sections like Applications
  };

  // Hover effect map
  let hoverClasses = '';
  if (hoverEffect === 'lift') {
    hoverClasses = 'hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300';
    if (glowColor === 'amber') hoverClasses += ' hover:border-amber-200';
    if (glowColor === 'navy') hoverClasses += ' hover:border-navy-200';
    if (glowColor === 'slate') hoverClasses += ' hover:border-slate-300';
  } else if (hoverEffect === 'glow') {
    hoverClasses = 'transition-all duration-300';
    if (glowColor === 'amber') hoverClasses += ' hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:border-amber-200';
    if (glowColor === 'navy') hoverClasses += ' hover:shadow-[0_0_30px_rgba(15,23,42,0.15)] hover:border-navy-200';
    if (glowColor === 'slate') hoverClasses += ' hover:shadow-[0_0_30px_rgba(100,116,139,0.15)] hover:border-slate-300';
  }

  const themeClasses = theme === 'dark' 
    ? 'bg-navy-900 border border-navy-800 shadow-[0_8px_30px_rgb(0,0,0,0.15)]' 
    : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]';

  return (
    <div 
      className={`${themeClasses} rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[2rem] relative overflow-hidden ${paddingMap[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
