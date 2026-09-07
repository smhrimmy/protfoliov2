import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-04-terminal-cli',
  layoutArchitecture: 'Full-Screen Monospace Shell',
  navigationPattern: 'Interactive Command-Line Prompt',
  gridSystem: '80-Column Terminal Character Matrix',
  typographyPairing: 'Pure Monospace Courier / JetBrains',
  motionLanguage: 'Typewriter ticker and blinking caret',
  capabilities: ['High Contrast'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0c1017',
    bgSecondary: '#161b22',
    accent: '#22c55e',
    textPrimary: '#4ade80',
    textMuted: '#86efac',
    borderColor: '#1e293b'
  }
};
