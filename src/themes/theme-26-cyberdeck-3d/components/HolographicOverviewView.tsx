import React from 'react';
import { Play, Terminal, Zap, Shield, ChevronRight, Eye } from 'lucide-react';
import { CyberModeTokens } from '../types/cyberdeck';
import { soundFX3D } from './SoundFX3D';

interface HolographicOverviewViewProps {
  tokens: CyberModeTokens;
  onExploreSection: (sec: string) => void;
}

export const HolographicOverviewView: React.FC<HolographicOverviewViewProps> = ({
  tokens,
  onExploreSection
}) => {
  return (
    <div className="space-y-6 font-mono text-gray-200 animate-in fade-in duration-300">
      
      {/* Hero Mission Card */}
      <div 
        className="border-2 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl space-y-6"
        style={{
          backgroundColor: tokens.cardBg,
          borderColor: tokens.hudBorderColor,
          boxShadow: `0 0 35px ${tokens.accentGlow}`
        }}
      >
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span 
              className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border"
              style={{
                backgroundColor: `${tokens.primaryColor}20`,
                borderColor: tokens.primaryColor,
                color: tokens.primaryColor
              }}
            >
              SPATIAL 3D WORKSTATION // LIVE 2026
            </span>
            <span className="text-cyan-400 text-[10px] font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 fill-cyan-400" /> ONLINE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase font-sans tracking-tight leading-none">
            PRAJWAL DL <br />
            <span style={{ color: tokens.primaryColor }}>
              3D CYBERDECK PORTFOLIO
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed pt-1 max-w-2xl">
            Verified Fullstack Systems Architect &amp; Creative Developer specializing in high-concurrency web services, spatial Three.js interactive scenes, and reactive design systems.
          </p>
        </div>

        {/* Quick Tactical Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
          <div className="bg-black/70 p-4 rounded-xl border border-white/10">
            <span className="text-[9px] text-gray-400 uppercase block font-bold">PUBLIC REPOS</span>
            <span className="text-lg sm:text-2xl font-black text-emerald-400 font-sans">36 REPOS</span>
          </div>
          <div className="bg-black/70 p-4 rounded-xl border border-white/10">
            <span className="text-[9px] text-gray-400 uppercase block font-bold">SYSTEM SLA</span>
            <span className="text-lg sm:text-2xl font-black text-cyan-400 font-sans">99.9% LIVE</span>
          </div>
          <div className="bg-black/70 p-4 rounded-xl border border-white/10">
            <span className="text-[9px] text-gray-400 uppercase block font-bold">PRODUCTION</span>
            <span className="text-lg sm:text-2xl font-black text-amber-400 font-sans">8 PLATFORMS</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10">
          <button
            onClick={() => {
              soundFX3D.playHoloChime();
              onExploreSection('projects');
            }}
            className="px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: tokens.primaryColor,
              boxShadow: `0 0 25px ${tokens.accentGlow}`
            }}
          >
            <Play className="w-4 h-4 fill-black" />
            <span>EXPLORE PROJECTS SHOWCASE</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundFX3D.playKeyClick();
              onExploreSection('dossier');
            }}
            className="px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-300 hover:text-white bg-black/80 hover:bg-black border border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>INSPECT DOSSIER</span>
          </button>
        </div>

      </div>

    </div>
  );
};
