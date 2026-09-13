import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-26-cyberdeck-3d',
  layoutArchitecture: '3d-workspace-spatial-perspective',
  navigationPattern: '3d-hotspot-orbital-nav',
  gridSystem: 'holographic-card-orbit',
  typographyPairing: 'Monospace Terminal + Spatial HUD',
  motionLanguage: 'Spring camera 3D perspective shift, WebGL particle drift, and holographic float',
  capabilities: ['3D', 'Motion-Rich', 'Pointer-Intensive'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#050614',
    bgSecondary: '#0c0824',
    accent: '#00ffff',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8',
    borderColor: 'rgba(0, 255, 255, 0.4)'
  }
};
