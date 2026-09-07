import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-06-bento-showcase',
  layoutArchitecture: 'Freelance Creative Portfolio',
  navigationPattern: 'Rose Pill Header + High-Impact CTAs',
  gridSystem: 'Tiered Services Matrix & Client Social Proof Wall',
  typographyPairing: 'Inter Display + JetBrains Monospace',
  motionLanguage: 'Smooth card elevations and subtle scale transitions',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0d0f14',
    bgSecondary: '#141720',
    accent: '#e11d48',
    textPrimary: '#e2e8f0',
    textMuted: '#94a3b8',
    borderColor: '#ffffff14'
  }
};
