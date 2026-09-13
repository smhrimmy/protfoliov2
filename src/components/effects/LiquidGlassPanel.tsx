import React from 'react';

interface LiquidGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  glowColor?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const LiquidGlassPanel: React.FC<LiquidGlassPanelProps> = ({
  children,
  className = '',
  intensity = 'medium',
  glowColor = 'rgba(255, 255, 255, 0.15)',
  style,
  onClick
}) => {
  const blurClass = 
    intensity === 'light' ? 'backdrop-blur-md' :
    intensity === 'heavy' ? 'backdrop-blur-3xl' :
    'backdrop-blur-xl';

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl border ${blurClass} transition-all duration-300 overflow-hidden group ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        borderColor: 'rgba(255, 255, 255, 0.14)',
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 ${glowColor}`,
        ...style
      }}
    >
      {/* Specular Edge Refraction Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 75%)'
        }}
      />
      {children}
    </div>
  );
};
