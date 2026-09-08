import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-20-layered-paper-collage',
  layoutArchitecture: 'collage-canvas',
  navigationPattern: 'sticky-note-tabs',
  gridSystem: 'none-collage',
  typographyPairing: 'Playfair Display + Courier Monospace',
  motionLanguage: 'Paper settling overshoot & multi-plane parallax',
  capabilities: ['Pointer-Intensive'],
  fallback: 'theme-02-brutalist',
  colorTokens: {
    bgPrimary: '#eae6dd',
    bgSecondary: '#dfdacd',
    accent: '#d9534f',
    textPrimary: '#2c2927',
    textMuted: '#6d6861',
    borderColor: '#c6bfb2'
  }
};
