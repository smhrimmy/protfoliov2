import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-16-holographic-matrix',
  layoutArchitecture: 'Volumetric Hologram Stage',
  navigationPattern: 'Projector Base Control Panel',
  gridSystem: '3D Volumetric Grid Cage',
  typographyPairing: 'Electric Phosphor Monospace',
  motionLanguage: 'Three.js wireframe rotation with digital glitch interference',
  capabilities: ['3D', 'Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#021008',
    bgSecondary: '#052212',
    accent: '#10b981',
    textPrimary: '#6ee7b7',
    textMuted: '#34d399',
    borderColor: '#047857'
  }
};
