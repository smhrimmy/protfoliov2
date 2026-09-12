import type { Variants } from 'motion/react';
import type { ThemeAnimationFlavor, ThemeNumber } from './types';

// ============================================================================
// ACCESSIBLE REDUCED-MOTION VARIANTS (WCAG 2.2 Compliant)
// All spatial drift, scale, 3D translation, and strobing collapse to simple opacity
// ============================================================================
export const REDUCED_MOTION_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.01,
    },
  },
};

export const REDUCED_MOTION_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.12, ease: 'linear' },
  },
};

// ============================================================================
// ALL 25 THEME ANIMATION FLAVORS
// Grounded in 2026 motion restraint: 1 coherent metaphor per theme, animate-once
// ============================================================================
export const THEME_ANIMATION_FLAVORS: Record<ThemeNumber, ThemeAnimationFlavor> = {
  // --------------------------------------------------------------------------
  // 01: TERMINAL DEV
  // --------------------------------------------------------------------------
  '01': {
    number: '01',
    canonicalId: 'theme-01-minimal-editorial',
    name: 'Terminal Dev',
    revealStyle: 'Type-writer character reveal on headings; cards blink in like cat output',
    hoverTreatment: 'Cursor-blink underline on focus',
    loadingState: 'Blinking _ cursor + fake command echo',
    containerVariants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: [0, 1, 0, 1],
        transition: { duration: 0.22, times: [0, 0.3, 0.6, 1], ease: 'linear' },
      },
    },
    hoverClassName: 'hover:border-emerald-400/80 transition-colors after:content-["_"] after:animate-pulse after:text-emerald-400 after:ml-1',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 02: CYBERPUNK HUD
  // --------------------------------------------------------------------------
  '02': {
    number: '02',
    canonicalId: 'theme-03-cyberpunk-hud',
    name: 'Cyberpunk HUD',
    revealStyle: 'Scanline wipe (top-to-bottom reveal mask)',
    hoverTreatment: 'Neon edge-glow intensifies',
    loadingState: 'Glitch/flicker shimmer',
    containerVariants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        clipPath: 'inset(0% 0% 100% 0%)',
      },
      visible: {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.6),0_0_50px_rgba(236,72,153,0.3)] transition-all duration-300',
    cornerDecoration: 'crosshairs',
  },

  // --------------------------------------------------------------------------
  // 03: MINIMALIST EDITORIAL
  // --------------------------------------------------------------------------
  '03': {
    number: '03',
    canonicalId: 'theme-02-brutalist',
    name: 'Minimalist Editorial',
    revealStyle: 'Simple fade + 12px upward slide, slow ease',
    hoverTreatment: 'Underline draws in on hover',
    loadingState: 'Plain skeleton bars, no color',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      },
    },
    hoverClassName: 'hover:-translate-y-0.5 transition-transform duration-300',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 04: NEUMORPHIC STUDIO
  // --------------------------------------------------------------------------
  '04': {
    number: '04',
    canonicalId: 'theme-15-neumorphic-soft',
    name: 'Neumorphic Studio',
    revealStyle: 'Soft scale-up from 96%→100% with shadow deepening',
    hoverTreatment: 'Inset shadow flips to raised',
    loadingState: 'Soft pulsing clay-tone skeleton',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.09, delayChildren: 0.04 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:shadow-[8px_8px_16px_rgba(0,0,0,0.5),-6px_-6px_14px_rgba(255,255,255,0.06)] hover:scale-[1.01] transition-all duration-300',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 05: GLASSMORPHISM AURORA
  // --------------------------------------------------------------------------
  '05': {
    number: '05',
    canonicalId: 'theme-07-noir-aurora',
    name: 'Glassmorphism Aurora',
    revealStyle: 'Blur-to-focus (starts blurred, sharpens in)',
    hoverTreatment: 'Frosted panel brightens + lifts',
    loadingState: 'Frosted shimmer sweep',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.06 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, filter: 'blur(12px)', y: 8 },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      },
    },
    hoverClassName: 'hover:-translate-y-1.5 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_12px_32px_rgba(168,85,247,0.25)] transition-all duration-300 backdrop-blur-xl',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 06: RETRO 8-BIT ARCADE
  // --------------------------------------------------------------------------
  '06': {
    number: '06',
    canonicalId: 'theme-06-bento-showcase',
    name: 'Retro 8-Bit Arcade',
    revealStyle: 'Pixel-snap step reveal (no easing, discrete steps)',
    hoverTreatment: 'Palette-swap flash on hover',
    loadingState: 'Loading bar in pixel-block segments',
    containerVariants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: [16, 8, 4, 0],
        transition: { duration: 0.22, ease: 'linear' },
      },
    },
    hoverClassName: 'hover:brightness-125 hover:border-amber-400 hover:shadow-[4px_4px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 transition-none',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 07: BENTO GRID MODERN
  // --------------------------------------------------------------------------
  '07': {
    number: '07',
    canonicalId: 'theme-06-bento-showcase',
    name: 'Bento Grid Modern',
    revealStyle: 'Tiles pop in from their own corner (asymmetric stagger by tile size)',
    hoverTreatment: 'Tile scales 102%, shadow grows',
    loadingState: 'Skeleton bento shapes matching real layout',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.04 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.92, y: 16 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }, // Slight spring pop
      },
    },
    hoverClassName: 'hover:scale-[1.02] hover:shadow-2xl hover:border-white/25 transition-all duration-300',
    cornerDecoration: 'none',
    hasDynamicIndexOffset: true,
  },

  // --------------------------------------------------------------------------
  // 08: 3D SPATIAL CANVAS
  // --------------------------------------------------------------------------
  '08': {
    number: '08',
    canonicalId: 'theme-18-spatial-canvas',
    name: '3D Spatial Canvas',
    revealStyle: 'Cards fly in from depth (z-axis translate + fade)',
    hoverTreatment: 'Slight 3D tilt toward cursor',
    loadingState: 'Rotating low-poly placeholder',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.88, y: 20 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-300',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 09: DYNAMIC ISLAND OS
  // --------------------------------------------------------------------------
  '09': {
    number: '09',
    canonicalId: 'theme-09-retro-desktop-os',
    name: 'Dynamic Island OS',
    revealStyle: 'Items morph out from a collapsed pill shape',
    hoverTreatment: 'Pill expands smoothly on hover',
    loadingState: 'Pill pulses at rest size',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.09, delayChildren: 0.04 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scaleY: 0.4, borderRadius: '9999px' },
      visible: {
        opacity: 1,
        scaleY: 1,
        borderRadius: '16px',
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      },
    },
    hoverClassName: 'hover:scale-[1.015] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 10: SPLIT SCREEN STORY
  // --------------------------------------------------------------------------
  '10': {
    number: '10',
    canonicalId: 'theme-14-split-screen',
    name: 'Split Screen Story',
    revealStyle: 'Alternating panels slide in from opposite edges (L/R)',
    hoverTreatment: "Panel's inactive half dims",
    loadingState: 'Split skeleton, one side at a time',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:opacity-100 opacity-90 transition-opacity duration-300',
    cornerDecoration: 'none',
    hasDynamicIndexOffset: true,
  },

  // --------------------------------------------------------------------------
  // 11: INFINITE CANVAS GRAPH
  // --------------------------------------------------------------------------
  '11': {
    number: '11',
    canonicalId: 'theme-11-kinetic-physics-3d',
    name: 'Infinite Canvas Graph',
    revealStyle: 'Nodes fade in + edges draw (stroke-dashoffset animate)',
    hoverTreatment: 'Node glows, connected edges highlight',
    loadingState: 'Faint node outlines pulsing',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.06 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.9, y: 15 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
      },
    },
    hoverClassName: 'hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300',
    cornerDecoration: 'dots',
  },

  // --------------------------------------------------------------------------
  // 12: BRUTALIST ARCHITECT
  // --------------------------------------------------------------------------
  '12': {
    number: '12',
    canonicalId: 'theme-02-brutalist',
    name: 'Brutalist Architect',
    revealStyle: 'Hard cut, no easing — appears instantly on a 1-frame delay per item (raw)',
    hoverTreatment: 'Border thickness increases, no smooth transition',
    loadingState: 'Solid gray blocks, no shimmer (stays raw)',
    containerVariants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.001 },
      },
    },
    hoverClassName: 'hover:border-4 hover:border-white transition-none',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 13: ORGANIC FLUID CANVAS
  // --------------------------------------------------------------------------
  '13': {
    number: '13',
    canonicalId: 'theme-13-swiss-typographic',
    name: 'Organic Fluid Canvas',
    revealStyle: 'Blob-morph reveal (border-radius animates from irregular to card shape)',
    hoverTreatment: 'Gentle wobble on hover',
    loadingState: 'Liquid blob loading shape',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
      visible: {
        opacity: 1,
        borderRadius: '16px',
        transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] },
      },
    },
    hoverClassName: 'hover:-rotate-0.5 hover:scale-[1.01] transition-transform duration-300',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 14: AUDIO WORKSTATION DAW
  // --------------------------------------------------------------------------
  '14': {
    number: '14',
    canonicalId: 'theme-14-split-screen',
    name: 'Audio Workstation DAW',
    revealStyle: 'Items slide in like tracks scrubbing into place (horizontal)',
    hoverTreatment: 'Waveform-style hover pulse',
    loadingState: 'Animated waveform placeholder',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.03 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, x: -45 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-200',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 15: HAND-DRAWN SKETCHBOOK
  // --------------------------------------------------------------------------
  '15': {
    number: '15',
    canonicalId: 'theme-20-layered-paper-collage',
    name: 'Hand-Drawn Sketchbook',
    revealStyle: 'Sketch-in effect (SVG stroke draws the card outline first, fill after)',
    hoverTreatment: 'Slight hand-jitter wiggle',
    loadingState: 'Pencil-sketch outline pulsing',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' },
      },
    },
    hoverClassName: 'hover:rotate-[-0.5deg] hover:scale-[1.01] transition-transform duration-200',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 16: MECHANICAL BLUEPRINT
  // --------------------------------------------------------------------------
  '16': {
    number: '16',
    canonicalId: 'theme-12-blueprint-drafting',
    name: 'Mechanical Blueprint',
    revealStyle: 'Draft-line draw-in (like a CAD plotter tracing the card)',
    hoverTreatment: 'Crosshair/measurement overlay appears',
    loadingState: 'Dashed outline "drafting" animation',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.09, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 15 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-200',
    cornerDecoration: 'crosshairs',
  },

  // --------------------------------------------------------------------------
  // 17: COMMAND CENTER SCI-FI
  // --------------------------------------------------------------------------
  '17': {
    number: '17',
    canonicalId: 'theme-17-newspaper-broadside',
    name: 'Command Center Sci-Fi',
    revealStyle: 'Radar-sweep reveal (radial wipe from center)',
    hoverTreatment: 'Telemetry ping/blip on hover',
    loadingState: 'Rotating radar-sweep skeleton',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.06 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.94 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300',
    cornerDecoration: 'crosshairs',
  },

  // --------------------------------------------------------------------------
  // 18: LUXURY ATELIER
  // --------------------------------------------------------------------------
  '18': {
    number: '18',
    canonicalId: 'theme-19-prajwal-luxury',
    name: 'Luxury Atelier',
    revealStyle: 'Slow, elegant fade + 4px slide only — deliberately minimal motion, longer duration (700ms)',
    hoverTreatment: 'Subtle gold underline, no scale',
    loadingState: 'Understated shimmer, no color',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.08 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 4 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:border-amber-400/40 hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)] transition-all duration-500',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 19: GAME BOY RETRO 90S
  // --------------------------------------------------------------------------
  '19': {
    number: '19',
    canonicalId: 'theme-09-retro-desktop-os',
    name: 'Game Boy Retro 90s',
    revealStyle: 'Dot-matrix pixel fade (low-res block reveal)',
    hoverTreatment: '2-tone palette flash',
    loadingState: 'Chunky pixel-block loading bar',
    containerVariants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: {
        opacity: [0, 0.5, 0.25, 1],
        scale: 1,
        transition: { duration: 0.25, ease: 'linear' },
      },
    },
    hoverClassName: 'hover:invert-[0.15] hover:border-[#8bac0f] transition-none',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 20: INTERACTIVE OS DESKTOP
  // --------------------------------------------------------------------------
  '20': {
    number: '20',
    canonicalId: 'theme-09-retro-desktop-os',
    name: 'Interactive OS Desktop',
    revealStyle: 'Window "open" animation (scale from title-bar point)',
    hoverTreatment: 'Window title bar highlights',
    loadingState: 'Generic OS spinner/hourglass',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.04 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.85, y: -8 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:shadow-2xl hover:border-blue-400/60 transition-all duration-200',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 21: HOLOGRAPHIC SCI-FI
  // --------------------------------------------------------------------------
  '21': {
    number: '21',
    canonicalId: 'theme-16-holographic-matrix',
    name: 'Holographic Sci-Fi',
    revealStyle: 'Light-field flicker-in (opacity strobes briefly before settling)',
    hoverTreatment: 'Refraction/prism shimmer on hover',
    loadingState: 'Interference-pattern shimmer',
    containerVariants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.09, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: [0, 0.85, 0.2, 1],
        transition: { duration: 0.35, times: [0, 0.2, 0.4, 1], ease: 'easeOut' },
      },
    },
    hoverClassName: 'hover:border-teal-400 hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] transition-all duration-300',
    cornerDecoration: 'crosshairs',
  },

  // --------------------------------------------------------------------------
  // 22: SOLAR SYSTEM 3D
  // --------------------------------------------------------------------------
  '22': {
    number: '22',
    canonicalId: 'theme-22-animated-mascot',
    name: 'Solar System 3D',
    revealStyle: 'Items orbit into position (arc path, not straight line)',
    hoverTreatment: 'Orbit ring highlights on hover',
    loadingState: 'Faint orbit-path pulsing',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.06 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, x: 30, y: 15, rotate: 6 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      },
    },
    hoverClassName: 'hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] transition-all duration-300',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 23: HAND GESTURE MEDIAPIPE
  // --------------------------------------------------------------------------
  '23': {
    number: '23',
    canonicalId: 'theme-23-handtracked-lowpoly',
    name: 'Hand Gesture MediaPipe',
    revealStyle: 'Items respond to tracked hand proximity (scale by distance) in addition to scroll reveal',
    hoverTreatment: 'Highlight follows tracked pinch/point gesture',
    loadingState: 'Calibration-style scanning shimmer',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.04 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, scale: 0.92 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:scale-[1.03] hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-200',
    cornerDecoration: 'crosshairs',
  },

  // --------------------------------------------------------------------------
  // 24: THE JOURNAL
  // --------------------------------------------------------------------------
  '24': {
    number: '24',
    canonicalId: 'theme-24-the-journal',
    name: 'The Journal',
    revealStyle: 'Simple fade + 8px slide, generous timing — quiet and restrained',
    hoverTreatment: 'Text underline only, no card chrome',
    loadingState: '3-dot bounce (already specced)',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.06 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:opacity-95 transition-opacity duration-300',
    cornerDecoration: 'none',
  },

  // --------------------------------------------------------------------------
  // 25: THE WANTED LEVEL
  // --------------------------------------------------------------------------
  '25': {
    number: '25',
    canonicalId: 'theme-25-the-wanted-level',
    name: 'The Wanted Level',
    revealStyle: 'HUD panel slide-in from screen edge with a brief star-ping flash on entry',
    hoverTreatment: 'Corner-bracket frame lights up',
    loadingState: 'Progress-bar sweep (already specced for splash; reuse for content loads)',
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.11, delayChildren: 0.05 },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, x: -28 },
      visible: {
        opacity: 1,
        x: 0,
        boxShadow: ['0 0 0px rgba(236,72,153,0)', '0 0 25px rgba(236,72,153,0.5)', '0 0 0px rgba(236,72,153,0)'],
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    },
    hoverClassName: 'hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300',
    cornerDecoration: 'brackets',
  },
};

// ============================================================================
// THEME RESOLUTION HELPER
// Seamlessly maps theme IDs (e.g. 'theme-25-the-wanted-level', '25', 'theme-01')
// to its corresponding ThemeAnimationFlavor
// ============================================================================
export function resolveThemeFlavor(themeIdOrNumber?: string | null): ThemeAnimationFlavor {
  if (!themeIdOrNumber) return THEME_ANIMATION_FLAVORS['03']; // Default to Minimalist Editorial

  const clean = themeIdOrNumber.trim().toLowerCase();

  // 1. Direct 2-digit number lookup ('01' - '25')
  if (clean in THEME_ANIMATION_FLAVORS) {
    return THEME_ANIMATION_FLAVORS[clean as ThemeNumber];
  }

  // 2. Single digit number lookup ('1' - '9')
  if (/^[1-9]$/.test(clean)) {
    const padded = clean.padStart(2, '0') as ThemeNumber;
    if (padded in THEME_ANIMATION_FLAVORS) {
      return THEME_ANIMATION_FLAVORS[padded];
    }
  }

  // 3. Match theme ID containing 'theme-XX' or 'XX'
  const match = clean.match(/theme-(\d{2})/);
  if (match && match[1] && (match[1] in THEME_ANIMATION_FLAVORS)) {
    return THEME_ANIMATION_FLAVORS[match[1] as ThemeNumber];
  }

  // 4. Keyword fuzzy resolution
  for (const flavor of Object.values(THEME_ANIMATION_FLAVORS)) {
    if (clean.includes(flavor.canonicalId.replace('theme-', '')) || clean.includes(flavor.name.toLowerCase())) {
      return flavor;
    }
  }

  // Fallback to Minimalist Editorial (03)
  return THEME_ANIMATION_FLAVORS['03'];
}
