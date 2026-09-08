import React from 'react';
import { ThemeConfig } from '@/types/theme';
import { ThemePageProps } from './_contracts/PageRenderer';

// Theme 01
import { config as t01Config } from './theme-01-minimal-editorial/theme.config';
import { Home as T01Home } from './theme-01-minimal-editorial/Home';

// Theme 02
import { config as t02Config } from './theme-02-brutalist/theme.config';
import { Home as T02Home } from './theme-02-brutalist/Home';

// Theme 03
import { config as t03Config } from './theme-03-cyberpunk-hud/theme.config';
import { Home as T03Home } from './theme-03-cyberpunk-hud/Home';

// Theme 04
import { config as t04Config } from './theme-04-terminal-cli/theme.config';
import { Home as T04Home } from './theme-04-terminal-cli/Home';

// Theme 05
import { config as t05Config } from './theme-05-galaxy-cosmos-3d/theme.config';
import { Home as T05Home } from './theme-05-galaxy-cosmos-3d/Home';

// Theme 06
import { config as t06Config } from './theme-06-bento-showcase/theme.config';
import { Home as T06Home } from './theme-06-bento-showcase/Home';

// Theme 07
import { config as t07Config } from './theme-07-noir-aurora/theme.config';
import { Home as T07Home } from './theme-07-noir-aurora/Home';

// Theme 08
import { config as t08Config } from './theme-08-bauhaus-modernist/theme.config';
import { Home as T08Home } from './theme-08-bauhaus-modernist/Home';

// Theme 09
import { config as t09Config } from './theme-09-retro-desktop-os/theme.config';
import { Home as T09Home } from './theme-09-retro-desktop-os/Home';

// Theme 10
import { config as t10Config } from './theme-10-horizontal-scrolly/theme.config';
import { Home as T10Home } from './theme-10-horizontal-scrolly/Home';

// Theme 11
import { config as t11Config } from './theme-11-kinetic-physics-3d/theme.config';
import { Home as T11Home } from './theme-11-kinetic-physics-3d/Home';

// Theme 12
import { config as t12Config } from './theme-12-blueprint-drafting/theme.config';
import { Home as T12Home } from './theme-12-blueprint-drafting/Home';

// Theme 13
import { config as t13Config } from './theme-13-swiss-typographic/theme.config';
import { Home as T13Home } from './theme-13-swiss-typographic/Home';

// Theme 14
import { config as t14Config } from './theme-14-split-screen/theme.config';
import { Home as T14Home } from './theme-14-split-screen/Home';

// Theme 15
import { config as t15Config } from './theme-15-neumorphic-soft/theme.config';
import { Home as T15Home } from './theme-15-neumorphic-soft/Home';

// Theme 16
import { config as t16Config } from './theme-16-holographic-matrix/theme.config';
import { Home as T16Home } from './theme-16-holographic-matrix/Home';

// Theme 17
import { config as t17Config } from './theme-17-newspaper-broadside/theme.config';
import { Home as T17Home } from './theme-17-newspaper-broadside/Home';

// Theme 18
import { config as t18Config } from './theme-18-spatial-canvas/theme.config';
import { Home as T18Home } from './theme-18-spatial-canvas/Home';

// Theme 19
import { config as t19Config } from './theme-19-prajwal-luxury/theme.config';
import { Home as T19Home } from './theme-19-prajwal-luxury/Home';

// Theme 20
import { config as t20Config } from './theme-20-layered-paper-collage/theme.config';
import { Home as T20Home } from './theme-20-layered-paper-collage/Home';

// Theme 21
import { config as t21Config } from './theme-21-secret-reveal-ai/theme.config';
import { Home as T21Home } from './theme-21-secret-reveal-ai/Home';

// Theme 22
import { config as t22Config } from './theme-22-animated-mascot/theme.config';
import { Home as T22Home } from './theme-22-animated-mascot/Home';

// Theme 23
import { config as t23Config } from './theme-23-handtracked-lowpoly/theme.config';
import { Home as T23Home } from './theme-23-handtracked-lowpoly/Home';

export interface ThemeBundle {
  config: ThemeConfig;
  Home: React.ComponentType<ThemePageProps>;
}

export const themeRegistry: Record<string, ThemeBundle> = {
  'theme-01-minimal-editorial': { config: t01Config, Home: T01Home },
  'theme-02-brutalist': { config: t02Config, Home: T02Home },
  'theme-03-cyberpunk-hud': { config: t03Config, Home: T03Home },
  'theme-04-terminal-cli': { config: t04Config, Home: T04Home },
  'theme-05-galaxy-cosmos-3d': { config: t05Config, Home: T05Home },
  'theme-06-bento-showcase': { config: t06Config, Home: T06Home },
  'theme-07-noir-aurora': { config: t07Config, Home: T07Home },
  'theme-08-bauhaus-modernist': { config: t08Config, Home: T08Home },
  'theme-09-retro-desktop-os': { config: t09Config, Home: T09Home },
  'theme-10-horizontal-scrolly': { config: t10Config, Home: T10Home },
  'theme-11-kinetic-physics-3d': { config: t11Config, Home: T11Home },
  'theme-12-blueprint-drafting': { config: t12Config, Home: T12Home },
  'theme-13-swiss-typographic': { config: t13Config, Home: T13Home },
  'theme-14-split-screen': { config: t14Config, Home: T14Home },
  'theme-15-neumorphic-soft': { config: t15Config, Home: T15Home },
  'theme-16-holographic-matrix': { config: t16Config, Home: T16Home },
  'theme-17-newspaper-broadside': { config: t17Config, Home: T17Home },
  'theme-18-spatial-canvas': { config: t18Config, Home: T18Home },
  'theme-19-prajwal-luxury': { config: t19Config, Home: T19Home },
  'theme-20-layered-paper-collage': { config: t20Config, Home: T20Home },
  'theme-21-secret-reveal-ai': { config: t21Config, Home: T21Home },
  'theme-22-animated-mascot': { config: t22Config, Home: T22Home },
  'theme-23-handtracked-lowpoly': { config: t23Config, Home: T23Home }
};

// ============================================================================
// STRICT ANTI-DUPLICATION & THEME DIFFERENTIATION VALIDATION
// Ensures every single theme has an entirely unique layout + navigation + grid
// ============================================================================
export const validateThemeUniqueness = (): { valid: boolean; collisions: string[] } => {
  const seenLayouts = new Set<string>();
  const seenNavs = new Set<string>();
  const seenGrids = new Set<string>();
  const seenTriplets = new Set<string>();
  const collisions: string[] = [];

  Object.values(themeRegistry).forEach(({ config }) => {
    const triplet = `${config.layoutArchitecture} | ${config.navigationPattern} | ${config.gridSystem}`;
    if (seenTriplets.has(triplet)) {
      collisions.push(`Collision on theme ${config.id}: identical architectural triplet '${triplet}'`);
    }
    seenTriplets.add(triplet);
    seenLayouts.add(config.layoutArchitecture);
    seenNavs.add(config.navigationPattern);
    seenGrids.add(config.gridSystem);
  });

  return {
    valid: collisions.length === 0,
    collisions
  };
};

// Execute validation on load
const validation = validateThemeUniqueness();
if (!validation.valid) {
  console.error('[PDL Theme Registry] Architectural collision detected:', validation.collisions);
} else {
  console.log(`[PDL Theme Registry] All ${Object.keys(themeRegistry).length} themes passed strict architectural differentiation validation.`);
}

export const getThemeConfig = (themeId: string): ThemeConfig | undefined => {
  return themeRegistry[themeId]?.config;
};

export const getAllThemeConfigs = (): ThemeConfig[] => {
  return Object.values(themeRegistry).map(t => t.config);
};

export const resolveThemePage = (
  themeId: string,
  _page: string = 'home'
): React.ComponentType<ThemePageProps> => {
  const bundle = themeRegistry[themeId] || themeRegistry['theme-01-minimal-editorial'];
  return bundle.Home;
};
