import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-22-animated-mascot',
  layoutArchitecture: 'character-anchored-sections',
  navigationPattern: 'chunky-playful-buttons',
  gridSystem: 'color-block-panels',
  typographyPairing: 'Plus Jakarta Sans + Space Grotesk Bold',
  motionLanguage: 'Bouncy spring easing, pupil tracking & section pose swaps',
  capabilities: ['Pointer-Intensive', 'Motion-Rich'],
  fallback: 'theme-06-bento-showcase',
  colorTokens: {
    bgPrimary: '#ffefd5',
    bgSecondary: '#ffe4b5',
    accent: '#ff4757',
    textPrimary: '#1e272e',
    textMuted: '#57606f',
    borderColor: '#ffa502'
  }
};
