import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-12-blueprint-drafting',
  layoutArchitecture: 'Technical CAD Drafting Sheet',
  navigationPattern: 'Architectural Title Block & Revision Tabs',
  gridSystem: '10mm Drafting Grid with Coordinate Rulers',
  typographyPairing: 'Technical Architectural Monospace',
  motionLanguage: 'Technical vector line drawing and blueprint unfold',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0a192f',
    bgSecondary: '#112240',
    accent: '#64ffda',
    textPrimary: '#ccd6f6',
    textMuted: '#8892b0',
    borderColor: '#233554'
  }
};
