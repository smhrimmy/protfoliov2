import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-09-retro-desktop-os',
  layoutArchitecture: 'Multi-Window Desktop Workspace',
  navigationPattern: 'Classic Bottom Taskbar + Start Menu',
  gridSystem: 'Pixel-Aligned Desktop Icon Matrix',
  typographyPairing: 'Pixelated MS Sans Serif',
  motionLanguage: 'Stepped window snap and retro UI sound beeps',
  capabilities: ['Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#008080',
    bgSecondary: '#c0c0c0',
    accent: '#000080',
    textPrimary: '#000000',
    textMuted: '#555555',
    borderColor: '#ffffff'
  }
};
