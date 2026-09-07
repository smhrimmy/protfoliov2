import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-02-brutalist',
  layoutArchitecture: 'Hard-Bordered CSS Monolith',
  navigationPattern: 'Giant In-Grid All-Caps Header Cells',
  gridSystem: '1px High-Contrast Bordered Grid',
  typographyPairing: 'Heavy Monospace & Grotesque Uppercase',
  motionLanguage: 'Stepped instant cut',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#000000',
    bgSecondary: '#0a0a0a',
    accent: '#ff2d55',
    textPrimary: '#ffffff',
    textMuted: '#a3a3a3',
    borderColor: '#ffffff'
  }
};
