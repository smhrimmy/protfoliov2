import { ThemeManifest } from '../../types/theme';

export const config: ThemeManifest = {
  id: 'theme-27-persona-studio',
  number: '27',
  name: 'Persona Studio & Interactive City',
  category: '3D / Spatial',
  concept: 'Gamified 3D isometric city & interactive digital product studio experience inspired by Persona Studio, featuring 3D building hotspots, weather particle engines, day/night cycles, and interactive visitor drawing whiteboard.',
  capabilities: ['3D', 'Motion-Rich', 'Pointer-Intensive'],
  performance: 'Heavy',
  layoutArchitecture: '3d-isometric-city-canvas',
  navigationPattern: '3d-city-building-raycast-nav',
  gridSystem: 'floating-city-pill-hud',
  typographyPairing: 'Bricolage Grotesque + Instrument Sans',
  signatureInteraction: '3D isometric city building raycasting, day/night weather particle engine, and interactive whiteboard drawing board',
  motionModel: '3D camera orbit lerp, particle rain/snow drift, and dawn preloader pop',
  uses3D: true,
  defaultTokens: {
    bgPrimary: '#F6F5F2',
    bgSecondary: '#EDECEA',
    accent: '#FDCA3D',
    textPrimary: '#0C0B0A',
    textMuted: '#7A7670',
    borderColor: 'rgba(12, 11, 10, 0.09)'
  }
};
