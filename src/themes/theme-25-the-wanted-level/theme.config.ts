import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-25-the-wanted-level',
  layoutArchitecture: 'game-pause-menu-hud',
  navigationPattern: 'tabbed-pause-ribbon',
  gridSystem: 'full-bleed-art-plate-diorama',
  typographyPairing: 'Impact Grotesk Display + Monospace Tactical HUD',
  motionLanguage: 'Snappy tactile menu slide, CRT scanline hum, and wanted star strobe',
  capabilities: ['High Contrast', 'Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0a0a0f',
    bgSecondary: '#13151f',
    accent: '#f59e0b',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8',
    borderColor: 'rgba(245, 158, 11, 0.3)'
  }
};
