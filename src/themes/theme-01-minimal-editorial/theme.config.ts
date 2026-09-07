import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-01-minimal-editorial',
  layoutArchitecture: 'Developer Portfolio (Claude Code)',
  navigationPattern: 'Sticky Monospace Chrome + Section Anchor Bar',
  gridSystem: 'Categorized Stack & Terminal Impact Matrix',
  typographyPairing: 'Geist Sans + JetBrains Monospace',
  motionLanguage: 'Smooth typing animation and subtle hover lift',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0a0c10',
    bgSecondary: '#0e121a',
    accent: '#10b981',
    textPrimary: '#e6edf3',
    textMuted: '#9ca3af',
    borderColor: '#ffffff14'
  }
};
