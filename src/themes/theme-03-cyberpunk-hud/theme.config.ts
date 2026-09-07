import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-03-cyberpunk-hud',
  layoutArchitecture: 'Layered Telemetry Viewport',
  navigationPattern: 'Side-Docked Vertical Icon Rail',
  gridSystem: 'Freeform Overlapping HUD Panels',
  typographyPairing: 'Monospace Sci-Fi Telemetry & Matrix Glitch',
  motionLanguage: 'Neon pulse and glitch displacement',
  capabilities: ['Motion-Rich', 'High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#030712',
    bgSecondary: '#0b1329',
    accent: '#00f0ff',
    textPrimary: '#e0f2fe',
    textMuted: '#38bdf8',
    borderColor: '#0284c7'
  }
};
