import { useMemo } from 'react';
import { useReducedMotion } from 'motion/react';
import { mockStorage } from '@/data/mockStorage';
import { 
  resolveThemeFlavor, 
  REDUCED_MOTION_CONTAINER_VARIANTS, 
  REDUCED_MOTION_ITEM_VARIANTS 
} from './themeFlavors';
import type { ThemeAnimationFlavor } from './types';

export interface UseThemeAnimationOptions {
  themeId?: string;
  forceReducedMotion?: boolean;
}

export function useThemeAnimation(options?: UseThemeAnimationOptions) {
  const osReducedMotion = useReducedMotion();
  const isReducedMotion = Boolean(options?.forceReducedMotion || osReducedMotion);

  // Active theme resolution: explicit prop -> query param -> mockStorage
  const activeThemeId = useMemo(() => {
    if (options?.themeId) return options.themeId;
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('theme');
      if (q) return q;
    }
    return mockStorage.getActiveTheme();
  }, [options?.themeId]);

  const flavor: ThemeAnimationFlavor = useMemo(() => {
    return resolveThemeFlavor(activeThemeId);
  }, [activeThemeId]);

  // If reduced motion is preferred, use accessible zero-drift variants
  const containerVariants = useMemo(() => {
    return isReducedMotion ? REDUCED_MOTION_CONTAINER_VARIANTS : flavor.containerVariants;
  }, [isReducedMotion, flavor]);

  const itemVariants = useMemo(() => {
    return isReducedMotion ? REDUCED_MOTION_ITEM_VARIANTS : flavor.itemVariants;
  }, [isReducedMotion, flavor]);

  return {
    flavor,
    activeThemeId,
    isReducedMotion,
    containerVariants,
    itemVariants,
    hoverClassName: isReducedMotion ? '' : flavor.hoverClassName,
    cornerDecoration: flavor.cornerDecoration,
  };
}
