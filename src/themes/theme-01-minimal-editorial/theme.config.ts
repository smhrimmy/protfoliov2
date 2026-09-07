import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-01-minimal-editorial',
  layoutArchitecture: 'Asymmetric Two-Column Magazine',
  navigationPattern: 'Static Top-Left Wordmark + Inline Rail',
  gridSystem: 'Strict 680px Text Column & Asymmetric Right Rail',
  typographyPairing: 'Playfair Display Serif + Inter Sans',
  motionLanguage: 'Pure opacity cross-fades',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0f1115',
    bgSecondary: '#161920',
    accent: '#d4af37',
    textPrimary: '#f4f4f5',
    textMuted: '#9ca3af',
    borderColor: '#27272a'
  }
};
