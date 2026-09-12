import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-24-the-journal',
  layoutArchitecture: 'journal-writing-ledger',
  navigationPattern: 'minimal-plaintext-header-nav',
  gridSystem: 'quiet-margins-article-flow',
  typographyPairing: 'Playfair Display / Serif + Technical Monospace',
  motionLanguage: 'Whisper-quiet opacity transitions and delicate underline reveals',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#ffffff',
    bgSecondary: '#fafafa',
    accent: '#111111',
    textPrimary: '#111111',
    textMuted: '#666666',
    borderColor: '#e5e5e3'
  }
};
