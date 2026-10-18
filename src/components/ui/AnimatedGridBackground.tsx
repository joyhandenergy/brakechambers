import React from 'react';

interface AnimatedGridBackgroundProps {
  className?: string;
  opacity?: number;
  color?: string; // e.g. "255, 255, 255"
}

export default function AnimatedGridBackground({
  className = '',
  opacity = 0.08,
  color = '255, 255, 255',
}: AnimatedGridBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none animate-pan-grid ${className}`}
      style={{
        backgroundImage: `radial-gradient(rgba(${color}, ${opacity}) 1.5px, transparent 1.5px)`,
        backgroundSize: '30px 30px',
      }}
    />
  );
}
