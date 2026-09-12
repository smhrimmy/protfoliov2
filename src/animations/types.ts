import { ReactNode } from 'react';
import type { Variants, Transition } from 'motion/react';

export type ThemeNumber = 
  | '01' | '02' | '03' | '04' | '05' 
  | '06' | '07' | '08' | '09' | '10' 
  | '11' | '12' | '13' | '14' | '15' 
  | '16' | '17' | '18' | '19' | '20' 
  | '21' | '22' | '23' | '24' | '25';

export interface ThemeAnimationFlavor {
  number: ThemeNumber;
  canonicalId: string;
  name: string;
  revealStyle: string;
  hoverTreatment: string;
  loadingState: string;
  
  // Motion/react animation variants
  containerVariants: Variants;
  itemVariants: Variants;
  headingVariants?: Variants;
  
  // Motion transitions & easing
  containerTransition?: Transition;
  itemTransition?: Transition;
  
  // Visual classes for hover / decoration
  hoverClassName?: string;
  cornerDecoration?: 'brackets' | 'crosshairs' | 'none' | 'dots';
  
  // Custom metadata
  hasDynamicIndexOffset?: boolean;
}

export interface MotionGridProps {
  children: ReactNode;
  themeId?: string;
  className?: string;
  staggerDelay?: number;
  viewportMargin?: string;
  as?: 'div' | 'section' | 'article' | 'ul' | 'ol' | 'main' | 'aside' | string;
  forceReducedMotion?: boolean;
}

export interface MotionCardProps {
  children: ReactNode;
  themeId?: string;
  index?: number;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'section' | 'article' | 'li' | 'aside' | string;
  hoverDisabled?: boolean;
  style?: React.CSSProperties;
}

export interface MotionHeadingProps {
  children: ReactNode;
  themeId?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  subtitle?: string;
}

export interface ThemeSkeletonProps {
  themeId?: string;
  count?: number;
  className?: string;
  layout?: 'grid' | 'list' | 'bento';
}
