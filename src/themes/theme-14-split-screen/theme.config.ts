import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-14-split-screen',
  layoutArchitecture: '50/50 Dual Column Split View',
  navigationPattern: 'Center-Anchored Divider Dock',
  gridSystem: 'Twin Vertical Parallel Columns',
  typographyPairing: 'Contrast Pairing (Serif Left / Monospace Right)',
  motionLanguage: 'Dual opposing vertical parallax synchronization',
  capabilities: ['Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#121316',
    bgSecondary: '#1a1c22',
    accent: '#f97316',
    textPrimary: '#fff7ed',
    textMuted: '#fdba74',
    borderColor: '#431407'
  }
};
