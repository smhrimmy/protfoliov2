import { ThemeConfig } from '../../types/theme';

export const config: ThemeConfig = {
  id: 'theme-27-persona-studio',
  layoutArchitecture: '3d-isometric-city-canvas',
  navigationPattern: '3d-city-building-raycast-nav',
  gridSystem: 'floating-city-pill-hud',
  typographyPairing: 'Bricolage Grotesque + Instrument Sans',
  motionLanguage: '3D camera orbit lerp, particle rain/snow drift, and dawn preloader pop',
  capabilities: ['3D', 'Motion-Rich', 'Pointer-Intensive'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#F6F5F2',
    bgSecondary: '#EDECEA',
    accent: '#FDCA3D',
    textPrimary: '#0C0B0A',
    textMuted: '#7A7670',
    borderColor: 'rgba(12, 11, 10, 0.09)'
  }
};
