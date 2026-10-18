import React from 'react';

export interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  color?: 'amber' | 'navy' | 'slate' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hoverScale?: boolean;
}

export default function IconBox({
  icon,
  color = 'amber',
  size = 'md',
  className = '',
  hoverScale = true,
  ...props
}: IconBoxProps) {
  
  const sizeMap = {
    sm: 'w-8 h-8 sm:w-10 sm:h-10 rounded-lg',
    md: 'w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl',
    lg: 'w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl',
    xl: 'w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl',
  };

  const iconSizeMap = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-5 h-5 lg:w-6 lg:h-6',
    lg: 'w-6 h-6 sm:w-8 sm:h-8',
    xl: 'w-7 h-7 sm:w-10 sm:h-10',
  };

  const colorMap = {
    amber: 'bg-amber-100 text-amber-600 border-amber-200',
    navy: 'bg-navy-50 text-navy-600 border-navy-100',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    white: 'bg-white text-navy-900 border-slate-100',
  };

  const hoverClass = hoverScale ? 'transition-transform duration-300 group-hover:scale-110' : '';

  return (
    <div 
      className={`flex items-center justify-center border flex-shrink-0 shadow-sm ${sizeMap[size]} ${colorMap[color]} ${hoverClass} ${className}`}
      {...props}
    >
      {React.cloneElement(icon as React.ReactElement<any>, {
        className: `${iconSizeMap[size]} ${hoverScale ? 'transition-colors duration-300' : ''}`,
        'aria-hidden': 'true'
      })}
    </div>
  );
}
