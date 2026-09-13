export type CyberMode = 'cyber-neon' | 'matrix-emerald' | 'obsidian-gold' | 'deep-space-ice';

export interface CyberModeTokens {
  id: CyberMode;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  bgGradient: string;
  gridLineColor: string;
  hudBorderColor: string;
  cardBg: string;
  wireframeColor: number;
  lightColor: number;
}

export const CYBER_MODES: Record<CyberMode, CyberModeTokens> = {
  'cyber-neon': {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    primaryColor: '#00ffff',
    secondaryColor: '#ff00ff',
    accentGlow: 'rgba(0, 255, 255, 0.4)',
    bgGradient: 'linear-gradient(135deg, #050614 0%, #0c0824 50%, #150930 100%)',
    gridLineColor: 'rgba(0, 255, 255, 0.25)',
    hudBorderColor: 'rgba(0, 255, 255, 0.4)',
    cardBg: 'rgba(10, 14, 30, 0.88)',
    wireframeColor: 0x00ffff,
    lightColor: 0x00ffff
  },
  'matrix-emerald': {
    id: 'matrix-emerald',
    name: 'Matrix Emerald',
    primaryColor: '#10b981',
    secondaryColor: '#34d399',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    bgGradient: 'linear-gradient(135deg, #02120b 0%, #052617 50%, #073822 100%)',
    gridLineColor: 'rgba(16, 185, 129, 0.25)',
    hudBorderColor: 'rgba(16, 185, 129, 0.4)',
    cardBg: 'rgba(6, 20, 14, 0.88)',
    wireframeColor: 0x10b981,
    lightColor: 0x10b981
  },
  'obsidian-gold': {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    bgGradient: 'linear-gradient(135deg, #120c05 0%, #261908 50%, #3d270b 100%)',
    gridLineColor: 'rgba(245, 158, 11, 0.25)',
    hudBorderColor: 'rgba(245, 158, 11, 0.4)',
    cardBg: 'rgba(20, 14, 6, 0.88)',
    wireframeColor: 0xf59e0b,
    lightColor: 0xf59e0b
  },
  'deep-space-ice': {
    id: 'deep-space-ice',
    name: 'Deep Space Ice',
    primaryColor: '#38bdf8',
    secondaryColor: '#818cf8',
    accentGlow: 'rgba(56, 189, 248, 0.4)',
    bgGradient: 'linear-gradient(135deg, #050d1a 0%, #0a1830 50%, #0f254a 100%)',
    gridLineColor: 'rgba(56, 189, 248, 0.25)',
    hudBorderColor: 'rgba(56, 189, 248, 0.4)',
    cardBg: 'rgba(8, 18, 36, 0.88)',
    wireframeColor: 0x38bdf8,
    lightColor: 0x38bdf8
  }
};
