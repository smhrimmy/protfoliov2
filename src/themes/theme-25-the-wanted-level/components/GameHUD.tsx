import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Shield, Heart, Clock, Star, Zap, Radio, ChevronDown, Check } from 'lucide-react';
import { soundFX } from './SoundEffects';
import { useTheme25Era } from '../context/Theme25EraContext';
import { Theme25Era, ERA_CONFIGS } from '../types/eras';

interface GameHUDProps {
  wantedLevel: number;
  onWantedLevelChange: (level: number) => void;
  repoCount?: number;
  activeArsenal?: string;
  currentObjective?: string;
  onBackToMenu?: () => void;
}

const RADIO_STATIONS = [
  '98.4 WAVE FM',
  '105.7 FLASH FM',
  '101.1 FEVER FM',
  '94.5 EMOTION FM'
];

export const GameHUD: React.FC<GameHUDProps> = ({
  wantedLevel,
  onWantedLevelChange,
  repoCount = 36,
  activeArsenal = 'TYPESCRIPT // REACT 19',
  currentObjective = 'DEEP-DIVE INTO PRODUCTION PLATFORMS',
  onBackToMenu
}) => {
  const { era, tokens, setEra } = useTheme25Era();
  const [isMuted, setIsMuted] = useState(soundFX.isMuted());
  const [timeStr, setTimeStr] = useState('');
  const [countdownStr, setCountdownStr] = useState('');
  const [stationIdx, setStationIdx] = useState(0);
  const [eraMenuOpen, setEraMenuOpen] = useState(false);

  // Rolling cash amount based on repoCount (e.g. 36 repos = $36,000,000 or $1,425,000)
  const cashAmount = (repoCount * 1_000_000).toLocaleString();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${mins}`);

      // Calculate countdown to late 2026 (target: Nov 15, 2026)
      const target = new Date('2026-11-15T00:00:00Z');
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdownStr(`${days}d ${h}h ${m}m ${s}s`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMute = () => {
    const next = soundFX.toggleMute();
    setIsMuted(next);
  };

  const handleRadioClick = () => {
    soundFX.playRadioTuning();
    setStationIdx((prev) => (prev + 1) % RADIO_STATIONS.length);
  };

  const handleStarClick = (starIndex: number) => {
    const nextLevel = starIndex === wantedLevel ? 0 : starIndex;
    onWantedLevelChange(nextLevel);
    soundFX.playWantedStarSiren();
  };

  const handleEraSelect = (selectedEra: Theme25Era) => {
    soundFX.playTabShift();
    setEra(selectedEra);
    setEraMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-2.5 bg-gradient-to-b from-black/95 via-black/75 to-transparent pointer-events-none select-none font-mono">
      <div className="max-w-7xl mx-auto flex items-start justify-between gap-3 pointer-events-none">
        
        {/* ============================================================ */}
        {/* LEFT CLUSTER: Operative Status, Health, Armor, Weapon Arsenal */}
        {/* ============================================================ */}
        <div 
          className="space-y-1 p-2 sm:p-2.5 rounded-xl border backdrop-blur-md shadow-2xl max-w-[55%] sm:max-w-none pointer-events-auto transition-colors"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.borderColor
          }}
        >
          {/* Operative Callout */}
          <div className="flex items-center justify-between text-[8px] sm:text-[11px] font-bold text-white/90 gap-1.5 sm:gap-4">
            <span 
              className="tracking-wider uppercase truncate"
              style={{ color: tokens.accentColor }}
            >
              OP: PRAJWAL DL
            </span>
            <span className="text-emerald-400 text-[7px] sm:text-[10px] font-mono flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden xs:inline">STATUS: </span>ARMED
            </span>
          </div>

          {/* Health, Armor & Stamina Status Bars */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3">
            {/* Health (Green) */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Heart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-emerald-500 fill-emerald-500 shrink-0" />
              <div className="w-9 xs:w-12 sm:w-16 lg:w-24 h-1.5 sm:h-2 lg:h-2.5 bg-gray-900 rounded-xs overflow-hidden border border-emerald-500/40">
                <div className="h-full bg-emerald-500 w-full animate-pulse shadow-[0_0_8px_#10b981]" />
              </div>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-emerald-400 font-bold hidden sm:inline">100%</span>
            </div>

            {/* Armor (Blue - TypeScript 76.5%) */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Shield className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-sky-400 fill-sky-400 shrink-0" />
              <div className="w-9 xs:w-12 sm:w-16 lg:w-24 h-1.5 sm:h-2 lg:h-2.5 bg-gray-900 rounded-xs overflow-hidden border border-sky-400/40">
                <div className="h-full bg-sky-400 w-[77%] shadow-[0_0_8px_#38bdf8]" />
              </div>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-sky-400 font-bold hidden sm:inline">77%</span>
            </div>

            {/* Stamina / Energy Pill */}
            <div 
              className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-bold"
              style={{
                backgroundColor: `${tokens.accentColor}15`,
                borderColor: `${tokens.accentColor}40`,
                color: tokens.accentColor
              }}
            >
              <Zap className="w-2.5 h-2.5" style={{ fill: tokens.accentColor }} />
              <span>100</span>
            </div>
          </div>

          {/* Tactical Weapon / Stack Slot */}
          <div className="hidden sm:flex items-center justify-between pt-0.5 sm:pt-1 border-t border-white/10 text-[8px] sm:text-[9px] lg:text-[10px] text-gray-400">
            <span className="text-gray-300 font-bold">EQUIPPED:</span>
            <span 
              className="font-mono tracking-wider truncate"
              style={{ color: tokens.highlightColor }}
            >
              {activeArsenal}
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CENTER CLUSTER: 98.4 FM Radio Capsule & Leonida Countdown    */}
        {/* ============================================================ */}
        <div className="hidden lg:flex flex-col items-center gap-1 shrink-0 pt-0.5 pointer-events-auto">
          {/* Radio Station Tuner Capsule */}
          <button 
            onClick={handleRadioClick}
            className="cursor-pointer group flex items-center gap-2 px-3.5 py-1 rounded-full border shadow-lg backdrop-blur-md transition-all hover:scale-105 focus:outline-none"
            style={{
              backgroundColor: tokens.cardBg,
              borderColor: tokens.borderColor,
              boxShadow: `0 0 15px ${tokens.accentGlow}`
            }}
            title="Click to tune Vice City radio station"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" style={{ color: tokens.accentColor }} />
            <span 
              className="text-[11px] font-black tracking-wider font-mono"
              style={{ color: tokens.accentColor }}
            >
              {RADIO_STATIONS[stationIdx]}
            </span>
            {/* Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-pink-400 animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3 bg-cyan-400 animate-[pulse_0.4s_ease-in-out_infinite]" />
              <span className="w-0.5 h-1.5 bg-amber-400 animate-[pulse_0.8s_ease-in-out_infinite]" />
            </div>
          </button>

          {/* Leonida Countdown Ticker */}
          <div className="text-[8px] sm:text-[9px] text-gray-300 font-mono tracking-wider flex flex-col items-center bg-black/80 px-3 py-0.5 rounded border border-white/10 backdrop-blur-md shadow-md">
            <span className="text-[8px] uppercase font-bold tracking-widest text-cyan-400">
              LEONIDA DROPS IN
            </span>
            <span className="font-mono text-white font-bold">
              {countdownStr || '109d 18h 16m 27s'}
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT CLUSTER: Clock, Cash, Stars, Avatar & Back to Menu      */}
        {/* ============================================================ */}
        <div className="flex items-start gap-2 sm:gap-3 pointer-events-auto shrink-0">
          
          <div className="flex flex-col items-end space-y-1 shrink-0">
            {/* Top row: Clock & Audio FX Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-black text-white font-sans tracking-wider bg-black/80 px-2 py-0.5 rounded border border-white/10">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>{timeStr || '16:13'}</span>
              </div>

              <button
                onClick={handleToggleMute}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-[9px] bg-black/80 px-2 py-0.5 rounded border border-white/10 focus:outline-none"
                title={isMuted ? 'Unmute Game SFX' : 'Mute Game SFX'}
              >
                {isMuted ? <VolumeX className="w-3 h-3 text-rose-400" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
                <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'SFX'}</span>
              </button>
            </div>

            {/* Middle row: Cash Counter Odometer */}
            <div 
              onClick={() => soundFX.playCashChime()}
              className="cursor-pointer group flex items-baseline gap-1 bg-black/90 px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-lg border shadow-xl backdrop-blur-md transition-all hover:scale-105"
              style={{
                borderColor: `${tokens.cashColor}60`,
                boxShadow: `0 0 15px ${tokens.cashColor}25`
              }}
              title="Verified GitHub Telemetry Repos Capitalized"
            >
              <span 
                className="text-sm sm:text-lg lg:text-2xl font-black tracking-tighter"
                style={{ color: tokens.cashColor }}
              >
                $
              </span>
              <span className="text-base sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {cashAmount}
              </span>
            </div>

            {/* Bottom row: Wanted Stars & Menu trigger */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Wanted Level Stars (6 Stars, interactive) */}
              <div className="flex items-center gap-0.5 bg-black/85 px-2 py-0.5 rounded-md border border-white/10">
                {[1, 2, 3, 4, 5, 6].map((starNum) => {
                  const isFilled = starNum <= wantedLevel;
                  return (
                    <button
                      key={starNum}
                      onClick={() => handleStarClick(starNum)}
                      className="p-0.5 transition-transform hover:scale-125 focus:outline-none"
                      title={`Wanted Level ${starNum} Stars`}
                    >
                      <Star 
                        className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${
                          isFilled 
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_#f59e0b] animate-pulse' 
                            : 'text-gray-600 fill-transparent'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>

              {onBackToMenu && (
                <button
                  onClick={onBackToMenu}
                  className="hidden sm:flex items-center gap-1 text-[9px] text-gray-300 hover:text-white bg-black/80 px-2 py-1 rounded border border-white/15 hover:border-pink-500/50 transition-colors focus:outline-none"
                  title="Return to Main Menu [ESC]"
                >
                  <span className="bg-white/15 px-1 rounded text-[8px] text-pink-400 font-bold">ESC</span>
                  <span className="hidden md:inline">MENU</span>
                </button>
              )}
            </div>
          </div>

          {/* Avatar Square Box: Letter "P" for Prajwal DL */}
          <div 
            className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-black/90 border-2 shadow-2xl flex items-center justify-center font-sans font-black text-base sm:text-2xl text-white select-none shrink-0"
            style={{
              borderColor: tokens.borderColor,
              background: `linear-gradient(135deg, ${tokens.accentColor}30 0%, #000000 100%)`,
              boxShadow: `0 0 15px ${tokens.accentGlow}`
            }}
            title="Prajwal DL // Operative Avatar"
          >
            P
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* PERSISTENT BOTTOM BAR WITH ERA STYLE SWITCHER                */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-white/10 px-3 sm:px-6 py-1.5 flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400 font-mono tracking-wider select-none backdrop-blur-md pointer-events-auto">
        <div className="flex items-center gap-2 truncate">
          <span className="text-pink-400 font-bold hidden xs:inline">VICE CITY INSPIRED</span>
          <span className="text-white/20 hidden xs:inline">&bull;</span>
          <span className="text-cyan-400 font-bold">BUILD DIFFERENT</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-amber-400 font-bold">STAY LEGENDARY</span>
        </div>

        {/* Style Switcher Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => setEraMenuOpen(!eraMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border transition-all hover:scale-105 focus:outline-none"
            style={{
              backgroundColor: `${tokens.accentColor}20`,
              borderColor: tokens.borderColor,
              color: tokens.accentColor
            }}
            title="Switch Theme 25 Era (Neon Retro / Sun-Belt / Modern Chrome)"
          >
            <span className="font-bold">THEME 25: {tokens.name.toUpperCase()}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${eraMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Era Popover Menu */}
          {eraMenuOpen && (
            <div 
              className="absolute bottom-full right-0 mb-2 w-56 bg-[#0c0e17]/98 border rounded-xl p-1.5 shadow-2xl backdrop-blur-xl space-y-1 font-mono text-xs z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
              style={{ borderColor: tokens.borderColor }}
            >
              <div className="px-2.5 py-1 text-[9px] text-gray-400 font-bold border-b border-white/10 uppercase tracking-wider">
                Select Visitor Era
              </div>
              {(Object.keys(ERA_CONFIGS) as Theme25Era[]).map((eraKey) => {
                const cfg = ERA_CONFIGS[eraKey];
                const isActive = era === eraKey;
                return (
                  <button
                    key={eraKey}
                    onClick={() => handleEraSelect(eraKey)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      isActive 
                        ? 'bg-white/15 text-white font-bold' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: cfg.accentColor }} 
                        />
                        <span>{cfg.name}</span>
                      </div>
                      <span className="text-[8px] text-gray-400 block pl-3.5">
                        {cfg.tagline}
                      </span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
