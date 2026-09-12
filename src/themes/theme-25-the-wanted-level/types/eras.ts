export type Theme25Era = 'neon-retro' | 'sun-belt' | 'modern-chrome';

export interface EraTokens {
  id: Theme25Era;
  name: string;
  tagline: string;
  accentColor: string;
  accentGlow: string;
  activePillGradient: string;
  borderColor: string;
  cardBg: string;
  skyGradient: string;
  highlightColor: string;
  fontDisplay: string;
  fontScript: string;
  starColor: string;
  cashColor: string;
}

export const ERA_CONFIGS: Record<Theme25Era, EraTokens> = {
  'neon-retro': {
    id: 'neon-retro',
    name: 'Neon Retro',
    tagline: 'Vice City 80s Synthwave',
    accentColor: '#ec4899',
    accentGlow: 'rgba(236, 72, 153, 0.4)',
    activePillGradient: 'linear-gradient(90deg, #ec4899 0%, #db2777 50%, #9333ea 100%)',
    borderColor: 'rgba(236, 72, 153, 0.45)',
    cardBg: 'rgba(12, 14, 23, 0.92)',
    skyGradient: 'linear-gradient(180deg, #070814 0%, #150a24 40%, #2d0b33 75%, #0e0717 100%)',
    highlightColor: '#22d3ee',
    fontDisplay: 'font-sans',
    fontScript: 'Brush Script MT, cursive, serif',
    starColor: '#f59e0b',
    cashColor: '#34d399'
  },
  'sun-belt': {
    id: 'sun-belt',
    name: 'Sun-Belt Classic',
    tagline: 'San Andreas Golden Hour',
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    activePillGradient: 'linear-gradient(90deg, #f59e0b 0%, #ea580c 50%, #b45309 100%)',
    borderColor: 'rgba(245, 158, 11, 0.45)',
    cardBg: 'rgba(20, 13, 7, 0.94)',
    skyGradient: 'linear-gradient(180deg, #120b06 0%, #291508 45%, #421c0b 75%, #180c06 100%)',
    highlightColor: '#fbbf24',
    fontDisplay: 'font-sans',
    fontScript: 'Georgia, serif',
    starColor: '#f59e0b',
    cashColor: '#10b981'
  },
  'modern-chrome': {
    id: 'modern-chrome',
    name: 'Modern Chrome',
    tagline: 'Leonida Modern High-Tech',
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    activePillGradient: 'linear-gradient(90deg, #10b981 0%, #059669 50%, #0284c7 100%)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    cardBg: 'rgba(9, 11, 16, 0.94)',
    skyGradient: 'linear-gradient(180deg, #07090e 0%, #0c121e 40%, #111b2d 75%, #080b12 100%)',
    highlightColor: '#38bdf8',
    fontDisplay: 'font-sans',
    fontScript: 'Courier New, monospace',
    starColor: '#fbbf24',
    cashColor: '#10b981'
  }
};
