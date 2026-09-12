import React from 'react';
import { Play, Sparkles, Shield, ChevronRight, Terminal, ArrowRight, Zap, Target } from 'lucide-react';
import { soundFX } from './SoundEffects';
import { useTheme25Era } from '../context/Theme25EraContext';

interface HeroStartGameViewProps {
  onStartGame: () => void;
  onExploreSection: (section: string) => void;
}

export const HeroStartGameView: React.FC<HeroStartGameViewProps> = ({
  onStartGame,
  onExploreSection
}) => {
  const { tokens } = useTheme25Era();

  const handleLaunch = () => {
    soundFX.playCashChime();
    onStartGame();
  };

  return (
    <div className="space-y-6 font-mono text-gray-200">
      
      {/* Hero Headline & Mission Briefing Banner */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight">
            START GAME:
          </h2>
          <span 
            className="text-2xl sm:text-4xl italic drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]"
            style={{ 
              color: tokens.accentColor,
              fontFamily: tokens.fontScript 
            }}
          >
            Mission Briefing
          </span>
        </div>

        <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-lg border border-white/15">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            SYSTEM ONLINE // READY TO INFILTRATE
          </span>
        </div>
      </div>

      {/* Main Hero Card & Waterfront Diorama */}
      <div 
        className="border-2 rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md space-y-6"
        style={{
          backgroundColor: tokens.cardBg,
          borderColor: tokens.borderColor,
          boxShadow: `0 0 30px ${tokens.accentGlow}`
        }}
      >
        
        {/* Subtle Ambient Scanlines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)'
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-center">
          
          {/* Left Side: Operative Mission Briefing */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span 
                  className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border"
                  style={{
                    backgroundColor: `${tokens.accentColor}20`,
                    borderColor: tokens.borderColor,
                    color: tokens.accentColor
                  }}
                >
                  OPERATION 2026 // LIVE
                </span>
                <span className="text-cyan-400 text-[10px] font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-cyan-400" /> FULLSTACK ARCHITECT
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase font-sans tracking-tight leading-none">
                BUILD NEXT LEVEL <br />
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: tokens.activePillGradient }}
                >
                  DIGITAL EXPERIENCES
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed pt-1">
                Prajwal DL is a verified Full Stack Developer and Systems Architect specializing in high-performance web applications, scalable APIs, and immersive interfaces.
              </p>
            </div>

            {/* Quick Tactical Metrics */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                <span className="text-[9px] text-gray-400 uppercase block font-bold">PUBLIC REPOS</span>
                <span className="text-base sm:text-xl font-black text-emerald-400 font-sans">36 REPOS</span>
              </div>
              <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                <span className="text-[9px] text-gray-400 uppercase block font-bold">SYSTEM SLA</span>
                <span className="text-base sm:text-xl font-black text-cyan-400 font-sans">99.9% LIVE</span>
              </div>
              <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                <span className="text-[9px] text-gray-400 uppercase block font-bold">PRODUCTION</span>
                <span className="text-base sm:text-xl font-black text-amber-400 font-sans">8 SYSTEMS</span>
              </div>
            </div>

            {/* Primary Action Button: Start Mission */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleLaunch}
                onMouseEnter={() => soundFX.playMenuTick()}
                className="group px-6 py-3.5 rounded-xl font-black text-sm tracking-wider uppercase text-white shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 focus:outline-none cursor-pointer"
                style={{
                  background: tokens.activePillGradient,
                  boxShadow: `0 0 25px ${tokens.accentGlow}`
                }}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>START MISSION [PROJECTS]</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundFX.playMenuTick();
                  onExploreSection('dossier');
                }}
                className="px-5 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-gray-300 hover:text-white bg-black/80 hover:bg-black border border-white/15 hover:border-white/40 transition-colors flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>VIEW DOSSIER</span>
              </button>
            </div>

          </div>

          {/* Right Side: Sunset Waterfront Supercar Illustration Plate */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-black/80">
              
              {/* Sky Background */}
              <div 
                className="absolute inset-0"
                style={{ background: tokens.skyGradient }}
              />

              {/* Sun & Sunset Glow */}
              <div 
                className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-60 blur-xl pointer-events-none"
                style={{ backgroundColor: tokens.accentColor }}
              />
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-amber-200/90 shadow-[0_0_40px_#f59e0b]" />

              {/* Distant skyline vector silhouette */}
              <svg className="absolute bottom-10 left-0 right-0 w-full h-24" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path d="M0,100 L0,70 L20,70 L20,50 L40,50 L40,75 L60,75 L60,40 L75,30 L90,40 L90,80 L120,80 L120,45 L140,45 L140,80 L180,80 L180,35 L195,20 L210,35 L210,85 L250,85 L250,55 L280,55 L280,85 L320,85 L320,40 L340,40 L340,75 L370,75 L370,50 L400,50 L400,100 Z" fill="#0c0714" />
                <path d="M10,100 L10,80 L35,80 L35,65 L70,65 L70,85 L110,85 L110,60 L130,60 L130,90 L170,90 L170,50 L200,50 L200,90 L240,90 L240,70 L270,70 L270,90 L310,90 L310,60 L350,60 L350,85 L400,85 L400,100 Z" fill="#05030a" />
              </svg>

              {/* Palm trees silhouettes */}
              <svg className="absolute top-4 right-2 w-28 h-48 opacity-70 pointer-events-none" viewBox="0 0 100 200">
                <path d="M100,0 Q60,30 20,50 Q60,60 100,50 Z" fill="#030206" />
                <path d="M100,20 Q50,50 10,90 Q60,95 100,75 Z" fill="#030206" />
                <path d="M100,40 Q40,80 0,130 Q50,120 100,95 Z" fill="#030206" />
                <path d="M100,0 Q85,100 90,200 L100,200 Z" fill="#030206" />
              </svg>

              {/* Supercar silhouette vector */}
              <svg className="absolute bottom-2 left-6 right-6 w-auto h-24" viewBox="0 0 320 120" fill="none">
                {/* Car body */}
                <path 
                  d="M10,95 C15,95 25,85 45,85 C65,85 75,70 100,65 C125,60 180,55 210,60 C235,65 260,75 285,82 C300,86 310,90 315,95 C315,100 305,102 290,102 C265,102 255,102 245,102 C230,102 220,95 210,95 C200,95 190,102 175,102 C150,102 120,102 95,102 C80,102 70,95 60,95 C50,95 40,102 25,102 C15,102 10,98 10,95 Z" 
                  fill="#0c0e14" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="1.5" 
                />
                {/* Windshield & Roof */}
                <path 
                  d="M95,66 C115,55 145,50 175,50 C200,50 215,58 225,66 Z" 
                  fill="rgba(34,211,238,0.25)" 
                  stroke="rgba(34,211,238,0.5)" 
                  strokeWidth="1" 
                />
                {/* Wheels */}
                <circle cx="60" cy="98" r="16" fill="#050608" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="60" cy="98" r="7" fill="#1c1f2b" />
                <circle cx="240" cy="98" r="16" fill="#050608" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="240" cy="98" r="7" fill="#1c1f2b" />
                {/* Tail lights red glow */}
                <path d="M12,90 L20,90 L18,94 L10,94 Z" fill="#ef4444" className="animate-pulse" />
                {/* Headlights cyan glow */}
                <path d="M305,88 L315,90 L310,94 L302,92 Z" fill="#38bdf8" />
              </svg>

              {/* Character silhouette standing near the car */}
              <div className="absolute bottom-6 left-1/3 -translate-x-1/2 flex flex-col items-center">
                {/* Head with glasses reflection */}
                <div className="w-8 h-8 rounded-full bg-[#181124] border border-amber-400/40 relative">
                  <span className="absolute top-2.5 left-1 w-2.5 h-1.5 rounded-sm bg-cyan-400/80 shadow-[0_0_6px_#22d3ee]" />
                  <span className="absolute top-2.5 right-1 w-2.5 h-1.5 rounded-sm bg-cyan-400/80 shadow-[0_0_6px_#22d3ee]" />
                </div>
                {/* Torso & Shirt */}
                <div className="w-12 h-14 bg-[#140e1e] rounded-t-lg border-t border-x border-pink-400/30 flex items-center justify-center">
                  <span className="text-[7px] text-pink-400 font-bold">PDL</span>
                </div>
                {/* Legs */}
                <div className="flex gap-1">
                  <div className="w-4 h-12 bg-[#0c0812]" />
                  <div className="w-4 h-12 bg-[#0c0812]" />
                </div>
              </div>

              {/* Vignette & Water reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
