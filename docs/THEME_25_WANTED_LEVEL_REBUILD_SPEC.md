# Theme 25 "The Wanted Level" — Exact HUD & Layout Rebuild Prompt

> **Purpose**: Master blueprint and prompt artifact to reconstruct, audit, or clone Theme 25 ("The Wanted Level") across any AI coding agent or development workspace with 100% architectural and functional fidelity.

---

## 1. Architectural Metaphor & Anti-Duplication Contract

Theme 25 must strictly adhere to the Portfolio OS One-Metaphor Rule:
- **Theme ID**: `theme-25-the-wanted-level`
- **Layout Architecture**: `game-pause-menu-hud`
- **Navigation Pattern**: `tabbed-pause-ribbon`
- **Grid System**: `full-bleed-art-plate-diorama`
- **Typography Pairing**: Impact Grotesk Display (`font-sans`) + Monospace Tactical HUD (`font-mono`)
- **Motion Language**: Snappy tactile menu slide, CRT scanline hum, and wanted star strobe
- **IP Compliance**: An original open-world crime game pause-menu skin. Do NOT use copyrighted game logos, trademarked fonts (e.g., Pricedown), character likenesses, or game screenshots. All icons must come from `lucide-react`, and all audio must be synthesized via the native Web Audio API (zero external `.mp3`/`.wav` assets).

---

## 2. Directory Structure & File Map

Place all theme files under `src/themes/theme-25-the-wanted-level/`:
```
src/themes/theme-25-the-wanted-level/
├── theme.config.ts              # Theme tokens & architectural triplet
├── Home.tsx                     # Master pause-menu shell & 6 tab sections
└── components/
    ├── GameHUD.tsx              # Persistent top HUD (health, armor, cash, stars, SFX)
    ├── RadarMinimap.tsx         # Circular 360° rotating GPS radar & sector banner
    ├── HeistDossierModal.tsx    # Classified mission dossier detail dialog
    └── SoundEffects.ts          # Zero-dependency Web Audio API sound synthesizer
```

---

## 3. Component Implementations

### 3.1. Theme Configuration (`theme.config.ts`)
```typescript
import { ThemeConfig } from '@/types/theme';

export const config: ThemeConfig = {
  id: 'theme-25-the-wanted-level',
  layoutArchitecture: 'game-pause-menu-hud',
  navigationPattern: 'tabbed-pause-ribbon',
  gridSystem: 'full-bleed-art-plate-diorama',
  typographyPairing: 'Impact Grotesk Display + Monospace Tactical HUD',
  motionLanguage: 'Snappy tactile menu slide, CRT scanline hum, and wanted star strobe',
  capabilities: ['High Contrast', 'Motion-Rich'],
  fallback: 'standard',
  colorTokens: {
    bgPrimary: '#0a0a0f',
    bgSecondary: '#13151f',
    accent: '#f59e0b',
    textPrimary: '#f8fafc',
    textMuted: '#94a3b8',
    borderColor: 'rgba(245, 158, 11, 0.3)'
  }
};
```

---

### 3.2. Persistent Game Heads-Up Display (`components/GameHUD.tsx`)
Render fixed at `top-0 left-0 right-0 z-40` with `pointer-events-none` container and `pointer-events-auto` inner elements:

1. **Left HUD Cluster (Status & Loadout)**:
   - Operative Callout: `OP: PRAJWAL DL` in amber `#f59e0b`, with pulsing emerald indicator `STATUS: ARMED`.
   - Health Bar: Emerald `#10b981` bar at 100% width with subtle glow (`shadow-[0_0_8px_#10b981]`) and `Heart` icon.
   - Armor Bar: Sky blue `#38bdf8` bar at 77% width (`TypeScript 76.5%`) with `Shield` icon.
   - Equipped Weapon/Arsenal: Displays `EQUIPPED: TYPESCRIPT // REACT 19` in monospace amber text with `[Q/E TABS]` controller hints.

2. **Right HUD Cluster (Economy, Heat & Controls)**:
   - Cash Counter Odometer: Computes capital based on public repos (`repoCount * 1_000_000`, e.g., 36 repos = `$36,000,000`). Clicking triggers `soundFX.playCashChime()`. Bold emerald dollar sign with high-contrast white digits.
   - Wanted Level Stars: 5 interactive `Star` icons. Clicking star index `N` sets heat to `N` (or resets to 0 if clicked again), triggering `soundFX.playWantedStarSiren()`. Filled stars pulse with amber glow (`#f59e0b`).
   - Time & Audio Control: Live ticking 24-hour clock (`HH:MM:SS DAY`) updated every 1,000ms. Mute button toggling `soundFX.toggleMute()` with `Volume2` / `VolumeX` icons and `pdl_game_sfx_muted` local storage sync.

---

### 3.3. Tactical GPS Radar Minimap (`components/RadarMinimap.tsx`)
Positioned at `fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40`:

1. **Sector Banner**:
   - Amber accent border with pulsing live ping.
   - Text: `BENGALURU SECTOR` + GPS Coordinates: `12.9716° N / 77.5946° E`.
2. **Circular Radar Plate**:
   - Dimensions: `w-36 h-36 sm:w-44 sm:h-44`, background `#0a0d14/95`, circular border with inner distance rings and crosshairs.
   - 360° Continuous Radar Sweep: CSS spinning beam using `conic-gradient(from 0deg, rgba(56, 189, 248, 0.4) 0deg, rgba(56, 189, 248, 0) 60deg)` animated with `spin 4s linear infinite`.
   - Waypoints: 6 mapped coordinate pins corresponding to menu tabs:
     * `dossier` (HQ, center 50%, 50%, amber `#f59e0b`)
     * `heists` (JOB, 28%, 32%, sky `#38bdf8`)
     * `arsenal` (GUN, 74%, 25%, pink `#ec4899`)
     * `intel` (LOG, 80%, 68%, emerald `#10b981`)
     * `crew` (REP, 30%, 72%, purple `#a855f7`)
     * `dispatch` (COM, 58%, 82%, yellow `#eab308`)
   - Waypoints emit an animated expanding ring (`animate-ping`) when their section is active. Clicking navigates to that tab.
   - Center Player Blip: White directional arrow blip at `50%, 50%`.
   - North Indicator: Static `N` marker at top edge.
   - Zoom Switcher: Interactive button switching between `x1.0` and `x2.0`.
3. **Mobile Drawer Behavior**:
   - On screens `<640px`, the radar collapses into a floating pill button (`🧭 GPS RADAR`). Clicking opens a tactical overlay modal with a close button.

---

### 3.4. Zero-Dependency Web Audio API Sound Synthesizer (`components/SoundEffects.ts`)
Synthesizes all game sounds programmatically with native oscillators:
- `playMenuTick()`: Triangle oscillator dropping from 750Hz to 320Hz over 35ms (gain `0.08 -> 0.001`).
- `playTabShift()`: Sine oscillator rising from 350Hz to 800Hz over 60ms (gain `0.12 -> 0.001`).
- `playHeistSelect()`: Dual-tone chord. Tone 1: Sawtooth ramping from 180Hz to 240Hz (150ms). Tone 2: Triangle ramping from 360Hz to 480Hz (180ms).
- `playWantedStarSiren()`: Sawtooth oscillator sweeping 520Hz -> 840Hz -> 520Hz over 200ms with siren modulation.
- `playCashChime()`: 3-note arpeggio chord playing D5 (587.33Hz), A5 (880.00Hz), and D6 (1174.66Hz) staggered by 40ms.
- Autoplay Compliance: Context initializes lazily on first user gesture. Catches audio permission errors silently.

---

### 3.5. Classified Heist Mission Dossier (`components/HeistDossierModal.tsx`)
Overlay modal rendered when a project is selected:
1. **Backdrop & Styling**: `fixed inset-0 z-50 bg-black/85 backdrop-blur-md` with warning diagonal hazard stripe header (`repeating-linear-gradient(45deg, #f59e0b, #f59e0b 15px, #000 15px, #000 30px)`).
2. **Dismissal Logic**: Full keyboard `Escape` listener and backdrop-click dismissal with `e.stopPropagation()` on the modal body.
3. **Metadata Header**:
   - Badge: `CLASSIFIED HEIST DOSSIER` + `VERIFIED OPERATION` emerald checkmark.
   - Project Title: Uppercase display font.
   - Role Callout: e.g., `ROLE: Principal Architect`.
4. **Tactical Intel Grid**:
   - Estimated Yield: Card displaying `$750,000+ VALUE` in emerald font.
   - Security Rating: `MAX TIER (ISO/A11Y)` in sky blue font.
   - Field Status: `PRODUCTION LIVE` in amber font.
5. **Mission Objective & Equipment**:
   - Mission Intel: Full project summary.
   - Tactical Stack Equipped: Technology tags displayed as ammo/equipment slots.
   - Declassified Execution Log: Full case study markdown or formatted architecture notes.
6. **Footer Actions**:
   - `ABORT DOSSIER [ESC]`: Closes modal and triggers menu tick.
   - `Inspect Codebase`: Opens GitHub repository if present.
   - `LAUNCH INFILTRATION ↗`: Amber high-contrast button launching live project URL while triggering `soundFX.playCashChime()`.

---

### 3.6. Master Pause Menu Shell & Sections (`Home.tsx`)
1. **Background Atmosphere**:
   - Base color `#08090f`.
   - Subtle radial vignette: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)`.
   - CRT Scanline pattern: `repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)` at 10% opacity.
2. **Keyboard Navigation**:
   - `Q` / `ArrowLeft`: Previous tab (LB).
   - `E` / `ArrowRight`: Next tab (RB).
   - `1` through `6`: Direct tab jump.
   - Bumper visual indicators rendered in header ribbon.
3. **Top Pause Ribbon**:
   - Yellow `PAUSED` pill badge.
   - Operative Title: `PRAJWAL DL // FULL STACK DEVELOPER`.
   - Shortcut Button: `ADMIN OS TERMINAL` routing directly to `/admin`.
   - 6 Tab Buttons with live badge counters:
     1. `HEISTS / WORKS` (Project count)
     2. `OPERATIVE DOSSIER`
     3. `TECH ARSENAL`
     4. `FIELD INTEL` (Blog post count)
     5. `SYNDICATE CREW`
     6. `CONTRACT DISPATCH`
4. **Tab Section Implementation**:
   - **Tab 1: Heists / Works**: Card grid with cover imagery, yield valuations, stack chips, and `VIEW MISSION DOSSIER` buttons opening the modal.
   - **Tab 2: Operative Dossier**: Mugshot avatar card, GitHub public repo counter (`36 Public`), 99.9% uptime SLA badge, and verified career timeline:
     * Unifycx: Web Advisor (`Jun 2025 - Present`)
     * Freelance: Freelancer / Web Developer (`Dec 2024 - Jun 2025`)
     * Glowtouch Technologies: Junior Support Engineer (`Aug 2024 - Dec 2024`)
     * Vitvara Technologies: Web Developer Intern (`Jan 2024 - May 2024`)
   - **Tab 3: Tech Arsenal**: Weapon-wheel inspired skill categories with animated percentage stamina bars.
   - **Tab 4: Field Intel**: Declassified blog cards with reading times, tags, and click-through to `/blog/:slug`.
   - **Tab 5: Syndicate Crew**: Client endorsements with 5-star heat ratings and corporate affiliations.
   - **Tab 6: Contract Dispatch**: High-contrast dark contract briefing form with encrypted status feedback.

---

## 4. Verification Checklist
- [x] `tsc -b` passes with 0 errors.
- [x] `validateThemeUniqueness()` passes with 0 collisions.
- [x] Clicking wanted stars updates heat and plays siren audio.
- [x] Odometer reflects `$36,000,000` with cash chime sound.
- [x] Radar rotates at 360° continuously and waypoints filter active sections.
- [x] Pressing `Q`/`E`, `ArrowLeft`/`ArrowRight`, or `1-6` cycles tabs with `playTabShift()`.
- [x] Heist dossier modal dismisses via `Escape` key, backdrop click, or close button.
