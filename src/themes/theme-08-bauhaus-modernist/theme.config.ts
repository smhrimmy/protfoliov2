import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-08-bauhaus-modernist',
  layoutArchitecture: 'Diagonal & Asymmetric Primary Geometry',
  navigationPattern: 'Primary-Color Geometric Corner Tabs',
  gridSystem: 'Constructivist Diagonal & Modular Grid',
  typographyPairing: 'Geometric Grotesk & Bold Rotated Text',
  motionLanguage: 'Snappy geometric rotation and sliding color planes',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#f5f0e6',
    bgSecondary: '#e8dec8',
    accent: '#d90429',
    textPrimary: '#1a1a1a',
    textMuted: '#4a4a4a',
    borderColor: '#1a1a1a'
  }
};
