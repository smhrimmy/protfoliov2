import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-13-swiss-typographic',
  layoutArchitecture: 'Strict Typographic Hierarchy',
  navigationPattern: 'Right-Aligned Index Numerals (01–06)',
  gridSystem: 'Rigid 12-Column Baseline Rhythm',
  typographyPairing: 'Pure Helvetica / Uncompromising Swiss Rhythm',
  motionLanguage: 'Precise zero-overshoot slide animations',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f4f4f5',
    accent: '#ef4444',
    textPrimary: '#09090b',
    textMuted: '#71717a',
    borderColor: '#e4e4e7'
  }
};
