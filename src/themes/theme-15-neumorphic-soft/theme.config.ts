import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-15-neumorphic-soft',
  layoutArchitecture: 'Tactile Extruded Surface',
  navigationPattern: 'Recessed Switchboard Push-Buttons',
  gridSystem: 'Symmetrical Inset Card Grid',
  typographyPairing: 'Clean Humanist Sans',
  motionLanguage: 'Smooth lighting angle transitions',
  capabilities: ['Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#e0e5ec',
    bgSecondary: '#d1d9e6',
    accent: '#4f46e5',
    textPrimary: '#1e293b',
    textMuted: '#64748b',
    borderColor: '#b8c4d8'
  }
};
