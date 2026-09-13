import { ThemeConfig } from '../../types/theme';

/**
 * PALETTE OPTIONS FOR THE DISTRICT THEME:
 * 
 * Option A (DEFAULT — Dusk District):
 * - ground/sky: deep navy (#0E1330)
 * - window glow: warm amber (#F5A65B)
 * - rim-light: soft lavender (#8B8FD9)
 * 
 * Option B (Paper City):
 * - ground/sky: warm off-white (#F4EFE6)
 * - structures: ink navy (#1B2333)
 * - accent: coral (#E85D4E)
 * 
 * Option C (Neon-Minimal):
 * - ground/sky: charcoal (#15171C)
 * - accent: electric teal (#3FE8C4)
 */

export const config: ThemeConfig = {
  id: 'theme-27-the-district',
  layoutArchitecture: 'isometric-walkable-city-district',
  navigationPattern: '3d-building-dolly-interior-transition',
  gridSystem: 'district-building-quadrants',
  typographyPairing: 'Bricolage Grotesque + Instrument Sans + Space Mono',
  motionLanguage: '3/4 isometric perspective, 900ms camera dolly push-in, 4px building hover lift, mouse parallax drift',
  capabilities: ['3D', 'Motion-Rich', 'Pointer-Intensive'],
  fallback: 'static-isometric-illustration',
  colorTokens: {
    bgPrimary: '#0E1330', // Deep navy ground/sky
    bgSecondary: '#161C3D',
    accent: '#F5A65B',   // Warm amber window glow
    textPrimary: '#F8FAFC',
    textMuted: '#8B8FD9', // Soft lavender rim-light
    borderColor: 'rgba(245, 166, 91, 0.25)'
  }
};
