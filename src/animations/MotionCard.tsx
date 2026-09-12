import React from 'react';
import { motion, type Variants } from 'motion/react';
import { useMotionGridContext } from './MotionGrid';
import { useThemeAnimation } from './useThemeAnimation';
import type { MotionCardProps } from './types';

export const MotionCard: React.FC<MotionCardProps> = ({
  children,
  themeId,
  index = 0,
  className = '',
  onClick,
  as = 'div',
  hoverDisabled = false,
  style,
}) => {
  const gridCtx = useMotionGridContext();
  const themeHook = useThemeAnimation({ themeId: themeId || gridCtx?.themeId });
  
  const flavor = gridCtx?.flavor || themeHook.flavor;
  const isReducedMotion = gridCtx?.isReducedMotion ?? themeHook.isReducedMotion;
  const baseItemVariants = themeHook.itemVariants;

  // Compute dynamic index variations (e.g. alternating split-screen or bento corners)
  const resolvedItemVariants: Variants = React.useMemo(() => {
    if (isReducedMotion) return baseItemVariants;

    // Theme 10: Split Screen alternating left/right
    if (flavor.number === '10') {
      const isEven = index % 2 === 0;
      return {
        hidden: { opacity: 0, x: isEven ? -40 : 40 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      };
    }

    // Theme 07: Bento corner pop
    if (flavor.number === '07') {
      const offsetX = (index % 2 === 0 ? -12 : 12);
      const offsetY = 14;
      return {
        hidden: { opacity: 0, scale: 0.93, x: offsetX, y: offsetY },
        visible: {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
        },
      };
    }

    return baseItemVariants;
  }, [baseItemVariants, flavor.number, index, isReducedMotion]);

  const Component = (motion as any)[as] || motion.div;

  // Hover micro-interaction class
  const hoverClass = hoverDisabled || isReducedMotion ? '' : (flavor.hoverClassName || '');

  return (
    <Component
      variants={resolvedItemVariants}
      onClick={onClick}
      style={style}
      className={`relative group ${hoverClass} ${className}`}
    >
      {/* Corner Bracket Decorator for Theme 25 ("The Wanted Level") */}
      {flavor.cornerDecoration === 'brackets' && !isReducedMotion && (
        <>
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-pink-500/40 group-hover:border-pink-400 group-hover:scale-110 transition-all pointer-events-none" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-pink-500/40 group-hover:border-pink-400 group-hover:scale-110 transition-all pointer-events-none" />
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/40 group-hover:border-cyan-300 group-hover:scale-110 transition-all pointer-events-none" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/40 group-hover:border-cyan-300 group-hover:scale-110 transition-all pointer-events-none" />
        </>
      )}

      {/* Crosshair Decorator for Blueprint & Cyberpunk Themes */}
      {flavor.cornerDecoration === 'crosshairs' && !isReducedMotion && (
        <span className="absolute top-2 right-2 text-[9px] font-mono text-cyan-400/40 group-hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          + [{index + 1}]
        </span>
      )}

      {children}
    </Component>
  );
};
