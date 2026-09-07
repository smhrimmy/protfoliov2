export type ThemeCapability = '3D' | 'Heavy Assets' | 'High Contrast' | 'Motion-Rich';
export type ThemeCategory = 'Editorial' | 'Brutalist' | 'Cyber' | 'OS / Retro' | '3D / Spatial' | 'Minimalist' | 'Experimental';
export type PerformanceImpact = 'Light' | 'Moderate' | 'Heavy';

export interface ThemeColorTokens {
  bgPrimary: string;
  bgSecondary: string;
  accent: string;
  textPrimary: string;
  textMuted: string;
  borderColor: string;
}

export interface ThemeManifest {
  id: string;
  number: string;
  name: string;
  category: ThemeCategory;
  concept: string;
  capabilities: ThemeCapability[];
  performance: PerformanceImpact;
  layoutArchitecture: string;
  navigationPattern: string;
  gridSystem: string;
  typographyPairing: string;
  signatureInteraction: string;
  motionModel: string;
  uses3D: boolean;
  defaultTokens: ThemeColorTokens;
}

export interface ThemeConfig {
  id: string;
  layoutArchitecture: string;
  navigationPattern: string;
  gridSystem: string;
  typographyPairing: string;
  motionLanguage: string;
  capabilities: ThemeCapability[];
  fallback: string;
  colorTokens: ThemeColorTokens;
}
