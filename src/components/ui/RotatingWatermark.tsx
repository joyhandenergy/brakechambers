import React from 'react';

interface RotatingWatermarkProps {
  className?: string;
  imageSrc?: string;
  opacityClass?: string;
  sizeClass?: string;
}

export default function RotatingWatermark({ 
  className = '',
  imageSrc = '/images/brc-chamber-watermark.jpg.png',
  opacityClass = 'opacity-[0.15]',
  sizeClass = 'w-[400px] h-[400px] lg:w-[700px] lg:h-[700px]'
}: RotatingWatermarkProps) {
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 ${sizeClass} ${opacityClass} pointer-events-none animate-[spin_120s_linear_infinite] z-0 ${className}`}>
      <img 
        src={imageSrc} 
        alt="Brake Chamber Watermark" 
        className="w-full h-full object-contain mix-blend-multiply grayscale drop-shadow-2xl" 
      />
    </div>
  );
}
