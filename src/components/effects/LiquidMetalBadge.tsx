import React from 'react';

interface LiquidMetalBadgeProps {
  children: React.ReactNode;
  className?: string;
  metalColor?: 'chrome' | 'gold' | 'neon-cyan' | 'rose-gold';
}

export const LiquidMetalBadge: React.FC<LiquidMetalBadgeProps> = ({
  children,
  className = '',
  metalColor = 'chrome'
}) => {
  const metalGradients = {
    chrome: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 25%, #cbd5e1 50%, #475569 75%, #f8fafc 100%)',
    gold: 'linear-gradient(135deg, #fef08a 0%, #f59e0b 25%, #fef3c7 50%, #b45309 75%, #fffbeb 100%)',
    'neon-cyan': 'linear-gradient(135deg, #a5f3fc 0%, #06b6d4 25%, #cff4fc 50%, #0891b2 75%, #ecfeff 100%)',
    'rose-gold': 'linear-gradient(135deg, #fbcfe8 0%, #f43f5e 25%, #ffe4e6 50%, #be123c 75%, #fff1f2 100%)'
  };

  return (
    <div 
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-black shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 select-none ${className}`}
      style={{
        background: metalGradients[metalColor],
        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      }}
    >
      {/* Liquid Metal Shimmer Beam */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 animate-[pulse_3s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)'
        }}
      />
      <span className="relative z-10 font-bold">{children}</span>
    </div>
  );
};
