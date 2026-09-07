import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-02-brutalist',
  layoutArchitecture: 'Minimal Designer Portfolio',
  navigationPattern: 'Spacious Top Nav + Text Links',
  gridSystem: 'Two-Column Orderly Showcase with Large Thumbnails',
  typographyPairing: 'Inter Clean Sans-Serif',
  motionLanguage: 'Subtle scroll reveals and smooth scale elevation',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0a0a0a',
    bgSecondary: '#141414',
    accent: '#ffffff',
    textPrimary: '#ededed',
    textMuted: '#737373',
    borderColor: '#ffffff10'
  }
};
