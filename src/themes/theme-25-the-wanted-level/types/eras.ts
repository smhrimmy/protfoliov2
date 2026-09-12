export type Theme25Era = 
  | 'gta-vice-city' 
  | 'gta-san-andreas' 
  | 'gta-iv' 
  | 'gta-v' 
  | 'gta-vi'
  | 'neon-retro'
  | 'sun-belt'
  | 'modern-chrome';

export interface EraTokens {
  id: Theme25Era;
  name: string;
  releaseYear: string;
  tagline: string;
  radioStation: string;
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

export const GTA_EDITIONS: Array<{ id: Theme25Era; name: string; releaseYear: string; tagline: string }> = [
  { 
    id: 'gta-vice-city', 
    name: 'GTA: Vice City', 
    releaseYear: '1986 // 2002', 
    tagline: 'Neon Sunset & 80s Synthwave (daniyalalii/GTA-Vice-City)' 
  },
  { 
    id: 'gta-san-andreas', 
    name: 'GTA: San Andreas', 
    releaseYear: '1992 // 2004', 
    tagline: 'Grove Street Golden Hour & West Coast Vibe' 
  },
  { 
    id: 'gta-iv', 
    name: 'GTA: IV Liberty City', 
    releaseYear: '2008', 
    tagline: 'Liberty Industrial Metallic & Steel Slate' 
  },
  { 
    id: 'gta-v', 
    name: 'GTA: V Los Santos', 
    releaseYear: '2013', 
    tagline: 'Vinewood Heist Emerald & Cash Capital' 
  },
  { 
    id: 'gta-vi', 
    name: 'GTA: VI Leonida', 
    releaseYear: '2025 // 2026', 
    tagline: 'Next-Gen Vice Neon & Cyber Chrome' 
  }
];

export const ERA_CONFIGS: Record<Theme25Era, EraTokens> = {
  'gta-vice-city': {
    id: 'gta-vice-city',
    name: 'GTA: Vice City',
    releaseYear: '1986 // 2002',
    tagline: 'Neon Sunset & 80s Synthwave (daniyalalii/GTA-Vice-City)',
    radioStation: '98.4 WAVE FM',
    accentColor: '#ec4899',
    accentGlow: 'rgba(236, 72, 153, 0.45)',
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
  'gta-san-andreas': {
    id: 'gta-san-andreas',
    name: 'GTA: San Andreas',
    releaseYear: '1992 // 2004',
    tagline: 'Grove Street Golden Hour & West Coast Vibe',
    radioStation: '105.7 RADIO LOS SANTOS',
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.45)',
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
  'gta-iv': {
    id: 'gta-iv',
    name: 'GTA: IV Liberty City',
    releaseYear: '2008',
    tagline: 'Liberty Industrial Metallic & Steel Slate',
    radioStation: '101.1 VLADIVOSTOK FM',
    accentColor: '#38bdf8',
    accentGlow: 'rgba(56, 189, 248, 0.45)',
    activePillGradient: 'linear-gradient(90deg, #0284c7 0%, #0369a1 50%, #1e293b 100%)',
    borderColor: 'rgba(56, 189, 248, 0.45)',
    cardBg: 'rgba(10, 15, 26, 0.94)',
    skyGradient: 'linear-gradient(180deg, #050b14 0%, #0c1626 45%, #182234 75%, #070e1a 100%)',
    highlightColor: '#e2e8f0',
    fontDisplay: 'font-sans',
    fontScript: 'Trebuchet MS, sans-serif',
    starColor: '#f59e0b',
    cashColor: '#38bdf8'
  },
  'gta-v': {
    id: 'gta-v',
    name: 'GTA: V Los Santos',
    releaseYear: '2013',
    tagline: 'Vinewood Heist Emerald & Cash Capital',
    radioStation: '94.5 WEST COAST CLASSICS',
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.45)',
    activePillGradient: 'linear-gradient(90deg, #10b981 0%, #047857 50%, #065f46 100%)',
    borderColor: 'rgba(16, 185, 129, 0.45)',
    cardBg: 'rgba(8, 18, 13, 0.94)',
    skyGradient: 'linear-gradient(180deg, #04140d 0%, #09281a 45%, #0f3d28 75%, #051910 100%)',
    highlightColor: '#a7f3d0',
    fontDisplay: 'font-sans',
    fontScript: 'Impact, sans-serif',
    starColor: '#fbbf24',
    cashColor: '#34d399'
  },
  'gta-vi': {
    id: 'gta-vi',
    name: 'GTA: VI Leonida',
    releaseYear: '2025 // 2026',
    tagline: 'Next-Gen Vice Neon & Cyber Chrome',
    radioStation: '109.2 VICE CITY METRO',
    accentColor: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.45)',
    activePillGradient: 'linear-gradient(90deg, #8b5cf6 0%, #6366f1 50%, #06b6d4 100%)',
    borderColor: 'rgba(139, 92, 246, 0.45)',
    cardBg: 'rgba(12, 10, 24, 0.94)',
    skyGradient: 'linear-gradient(180deg, #090617 0%, #150d30 45%, #241147 75%, #0d0722 100%)',
    highlightColor: '#06b6d4',
    fontDisplay: 'font-sans',
    fontScript: 'Courier New, monospace',
    starColor: '#f59e0b',
    cashColor: '#34d399'
  },
  // Backwards compatibility aliases
  'neon-retro': {
    id: 'neon-retro',
    name: 'GTA: Vice City (Neon Retro)',
    releaseYear: '1986 // 2002',
    tagline: 'Neon Sunset & 80s Synthwave (daniyalalii/GTA-Vice-City)',
    radioStation: '98.4 WAVE FM',
    accentColor: '#ec4899',
    accentGlow: 'rgba(236, 72, 153, 0.45)',
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
    name: 'GTA: San Andreas (Sun-Belt)',
    releaseYear: '1992 // 2004',
    tagline: 'Grove Street Golden Hour & West Coast Vibe',
    radioStation: '105.7 RADIO LOS SANTOS',
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.45)',
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
    name: 'GTA: VI Leonida (Modern Chrome)',
    releaseYear: '2025 // 2026',
    tagline: 'Next-Gen Vice Neon & Cyber Chrome',
    radioStation: '109.2 VICE CITY METRO',
    accentColor: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.45)',
    activePillGradient: 'linear-gradient(90deg, #8b5cf6 0%, #6366f1 50%, #06b6d4 100%)',
    borderColor: 'rgba(139, 92, 246, 0.45)',
    cardBg: 'rgba(12, 10, 24, 0.94)',
    skyGradient: 'linear-gradient(180deg, #090617 0%, #150d30 45%, #241147 75%, #0d0722 100%)',
    highlightColor: '#06b6d4',
    fontDisplay: 'font-sans',
    fontScript: 'Courier New, monospace',
    starColor: '#f59e0b',
    cashColor: '#34d399'
  }
};
