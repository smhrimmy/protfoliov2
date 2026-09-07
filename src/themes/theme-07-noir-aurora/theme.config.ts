import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-07-noir-aurora',
  layoutArchitecture: 'Graphic Designer Portfolio',
  navigationPattern: 'Editorial Wordmark + Minimal Circle CTAs',
  gridSystem: 'Full-Bleed Monograph Storyboard & Discipline Cards',
  typographyPairing: 'Playfair Display + Inter Sans',
  motionLanguage: 'Restrained image scale and smooth contrast fade',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#111215',
    bgSecondary: '#1a1c22',
    accent: '#fbbf24',
    textPrimary: '#ededed',
    textMuted: '#9ca3af',
    borderColor: '#ffffff14'
  }
};
