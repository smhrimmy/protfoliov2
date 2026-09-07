import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-17-newspaper-broadside',
  layoutArchitecture: 'Multi-Column Vintage Broadside',
  navigationPattern: 'Traditional Masthead & Edition Index',
  gridSystem: 'Strict 4-Column Justified Newspaper Grid',
  typographyPairing: 'Editorial Serif + Gothic Masthead',
  motionLanguage: 'Subtle paper texture rustle and drop-cap reveal',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#f7f4ec',
    bgSecondary: '#ebe5d8',
    accent: '#854d0e',
    textPrimary: '#1c1917',
    textMuted: '#57534e',
    borderColor: '#292524'
  }
};
