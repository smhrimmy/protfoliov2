import React, { createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { useThemeAnimation } from './useThemeAnimation';
import type { MotionGridProps, ThemeAnimationFlavor } from './types';

interface MotionGridContextValue {
  flavor: ThemeAnimationFlavor;
  isReducedMotion: boolean;
  themeId?: string;
}

const MotionGridContext = createContext<MotionGridContextValue | null>(null);

export function useMotionGridContext() {
  return useContext(MotionGridContext);
}

export const MotionGrid: React.FC<MotionGridProps> = ({
  children,
  themeId,
  className = 'grid grid-cols-1 md:grid-cols-2 gap-6',
  staggerDelay,
  viewportMargin = '-50px',
  as = 'div',
  forceReducedMotion = false,
}) => {
  const { flavor, isReducedMotion, containerVariants } = useThemeAnimation({
    themeId,
    forceReducedMotion,
  });

  // Customized container variants if custom staggerDelay is supplied
  const resolvedContainerVariants = React.useMemo(() => {
    if (!staggerDelay || isReducedMotion) return containerVariants;
    return {
      ...containerVariants,
      visible: {
        ...(typeof containerVariants.visible === 'object' ? containerVariants.visible : {}),
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.04,
        },
      },
    };
  }, [containerVariants, staggerDelay, isReducedMotion]);

  const Component = (motion as any)[as] || motion.div;

  return (
    <MotionGridContext.Provider value={{ flavor, isReducedMotion, themeId }}>
      <Component
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: viewportMargin }}
        variants={resolvedContainerVariants}
        className={className}
      >
        {children}
      </Component>
    </MotionGridContext.Provider>
  );
};
