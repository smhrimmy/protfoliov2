import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-03-cyberpunk-hud',
  layoutArchitecture: 'UX/UI Designer Portfolio',
  navigationPattern: 'Indigo Pill Accent + Sticky Backdrop Header',
  gridSystem: 'Alternating Case Study Stack + 4-Step Process Flow',
  typographyPairing: 'DM Sans + Inter',
  motionLanguage: 'Soft shadow elevations and crisp layout shifts',
  capabilities: ['Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#fafafa',
    bgSecondary: '#ffffff',
    accent: '#6366f1',
    textPrimary: '#1f2937',
    textMuted: '#6b7280',
    borderColor: '#e5e7eb'
  }
};
