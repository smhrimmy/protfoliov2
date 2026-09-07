import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-10-horizontal-scrolly',
  layoutArchitecture: 'Continuous Panoramic Filmstrip',
  navigationPattern: 'Bottom Scrub Timeline Pips',
  gridSystem: 'Single-Row Horizontal Track',
  typographyPairing: 'Cinematic Serif & Condensed Display',
  motionLanguage: 'Smooth horizontal translation with parallax depth layers',
  capabilities: ['Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0e0e11',
    bgSecondary: '#18181f',
    accent: '#eab308',
    textPrimary: '#fefce8',
    textMuted: '#ca8a04',
    borderColor: '#422006'
  }
};
