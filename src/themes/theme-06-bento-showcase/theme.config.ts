import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-06-bento-showcase',
  layoutArchitecture: 'Modular Bento Box Matrix',
  navigationPattern: 'Floating Frosted Pill Bar',
  gridSystem: '12-Column Responsive Bento Grid with Variable Spans',
  typographyPairing: 'Clean Neo-Grotesque Display',
  motionLanguage: 'Spring-damped hover lift and subtle specular highlight',
  capabilities: ['Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#090d16',
    bgSecondary: '#111827',
    accent: '#3b82f6',
    textPrimary: '#f9fafb',
    textMuted: '#9ca3af',
    borderColor: '#1f2937'
  }
};
