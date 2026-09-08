import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-23-handtracked-lowpoly',
  layoutArchitecture: 'dark-canvas-with-device-frame',
  navigationPattern: 'minimal-corner-actions',
  gridSystem: 'none-spatial-hero',
  typographyPairing: 'Syne + Space Mono',
  motionLanguage: '3D faceted mesh rotation & gesture responses',
  capabilities: ['3D', 'Heavy Assets', 'Camera'],
  fallback: 'theme-04-terminal-cli',
  colorTokens: {
    bgPrimary: '#08080c',
    bgSecondary: '#101018',
    accent: '#7952ff',
    textPrimary: '#f0f0f5',
    textMuted: '#808098',
    borderColor: '#7952ff30'
  }
};
