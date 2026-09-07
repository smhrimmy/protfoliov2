import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-18-spatial-canvas',
  layoutArchitecture: '2D Infinite Panning Canvas',
  navigationPattern: 'Floating Minimap & Zoom Controls',
  gridSystem: 'Nodal Relationship Network Grid',
  typographyPairing: 'Modern Diagrammatic Sans',
  motionLanguage: 'Smooth inertial canvas zoom and pan',
  capabilities: ['Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0c0f1d',
    bgSecondary: '#151930',
    accent: '#6366f1',
    textPrimary: '#e0e7ff',
    textMuted: '#818cf8',
    borderColor: '#3730a3'
  }
};
