import { ThemeConfig } from '../../types/theme';

export const config: ThemeConfig = {
  id: 'theme-27-the-district',
  layoutArchitecture: 'isometric-walkable-city-district',
  navigationPattern: '3d-building-dolly-interior-transition',
  gridSystem: 'district-building-quadrants',
  typographyPairing: 'Bricolage Grotesque + Instrument Sans + Space Mono',
  motionLanguage: 'Dolly camera push-in, interior room reveal, window glow pulse, and beacon signal drift',
  capabilities: ['3D', 'Motion-Rich', 'Pointer-Intensive'],
  fallback: 'static-isometric-illustration',
  colorTokens: {
    bgPrimary: '#0d111a',
    bgSecondary: '#161b26',
    accent: '#ffb703',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8',
    borderColor: 'rgba(255, 183, 3, 0.25)'
  }
};
