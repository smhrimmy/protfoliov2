import React from 'react';
import { motion } from 'motion/react';
import { useThemeAnimation } from './useThemeAnimation';
import type { ThemeSkeletonProps } from './types';

export const ThemeSkeleton: React.FC<ThemeSkeletonProps> = ({
  themeId,
  count = 2,
  className = '',
  layout = 'grid',
}) => {
  const { flavor, isReducedMotion } = useThemeAnimation({ themeId });
  const items = Array.from({ length: count });

  // --------------------------------------------------------------------------
  // 01: TERMINAL DEV (Blinking _ cursor + fake command echo)
  // --------------------------------------------------------------------------
  if (flavor.number === '01') {
    return (
      <div className={`p-6 rounded-xl bg-black border border-emerald-500/30 font-mono text-xs space-y-3 ${className}`}>
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="animate-pulse">❯</span>
          <span className="text-gray-300">cat /var/log/portfolio_stream.out</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-3.5 bg-emerald-400 inline-block"
          />
        </div>
        <div className="space-y-1.5 text-[11px] text-emerald-600/80">
          <p>[SYS_INIT] Synchronizing repository heads...</p>
          <p>[IO_STREAM] Resolving production artifacts (200 OK)...</p>
          <p className="animate-pulse text-emerald-400">[BUFFER] Loading data payloads...</p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 02: CYBERPUNK HUD (Glitch / flicker shimmer)
  // --------------------------------------------------------------------------
  if (flavor.number === '02') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="relative h-64 rounded-xl border border-cyan-500/40 bg-black/80 overflow-hidden p-6 space-y-4">
            <motion.div
              animate={{ opacity: [0.3, 0.9, 0.2, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-pink-500/10 to-transparent pointer-events-none"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400">
              <span className="animate-pulse">CYBER_LINK // BUFFERING</span>
              <span>0{i + 1} // HUD</span>
            </div>
            <div className="w-3/4 h-6 bg-cyan-500/20 rounded animate-pulse" />
            <div className="w-full h-16 bg-white/5 rounded border border-cyan-500/20" />
            <div className="w-1/2 h-4 bg-pink-500/20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 04: NEUMORPHIC STUDIO (Soft pulsing clay-tone skeleton)
  // --------------------------------------------------------------------------
  if (flavor.number === '04') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {items.map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-[#1e232e] shadow-[inset_6px_6px_12px_#14171f,inset_-6px_-6px_12px_#282f3d] p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1/3 h-5 rounded-full bg-[#181c25]"
              />
              <div className="w-3/4 h-8 rounded-xl bg-[#181c25]" />
              <div className="w-full h-12 rounded-xl bg-[#181c25]" />
            </div>
            <div className="w-24 h-6 rounded-full bg-[#181c25]" />
          </div>
        ))}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 06: RETRO 8-BIT ARCADE (Pixel-block segments)
  // --------------------------------------------------------------------------
  if (flavor.number === '06') {
    return (
      <div className={`p-6 rounded-none border-4 border-amber-400 bg-black font-mono text-amber-400 space-y-4 ${className}`}>
        <p className="text-xs font-black uppercase tracking-widest animate-pulse">INSERT COIN // LOADING STAGE...</p>
        <div className="flex gap-1.5">
          {Array.from({ length: 12 }).map((_, idx) => (
            <motion.div
              key={idx}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: idx * 0.1 }}
              className="w-4 h-6 bg-amber-400 border border-black"
            />
          ))}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 12: BRUTALIST ARCHITECT (Solid gray blocks, no shimmer, raw)
  // --------------------------------------------------------------------------
  if (flavor.number === '12') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="h-64 border-2 border-white bg-[#1a1a1a] p-6 space-y-4">
            <div className="w-1/4 h-4 bg-white" />
            <div className="w-3/4 h-8 bg-[#444]" />
            <div className="w-full h-20 bg-[#2a2a2a]" />
          </div>
        ))}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 14: AUDIO WORKSTATION DAW (Animated waveform bars with scrub playhead)
  // --------------------------------------------------------------------------
  if (flavor.number === '14') {
    return (
      <div className={`p-6 rounded-xl bg-[#12141a] border border-amber-500/30 font-mono space-y-3 ${className}`}>
        <div className="flex justify-between text-xs text-amber-400">
          <span>TRACK BUFFERING... [CH 01-08]</span>
          <span className="text-white/40">48kHz // 24-BIT</span>
        </div>
        <div className="relative h-16 bg-black/60 rounded border border-white/10 flex items-center justify-around px-4 overflow-hidden">
          {Array.from({ length: 24 }).map((_, idx) => (
            <motion.div
              key={idx}
              animate={{ height: ['20%', '85%', '35%', '95%', '20%'] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: idx * 0.05 }}
              className="w-1 bg-amber-400/70 rounded-full"
            />
          ))}
          <motion.div
            animate={{ left: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-[2px] bg-rose-500 shadow-[0_0_8px_#f43f5e]"
          />
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 16: MECHANICAL BLUEPRINT (Dashed drafting outline + crosshairs)
  // --------------------------------------------------------------------------
  if (flavor.number === '16') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="h-64 border border-dashed border-cyan-400/50 bg-[#06182c]/80 p-6 space-y-4 relative">
            <span className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400">+ [GRID REF {i + 1}]</span>
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-cyan-400">SCALE 1:50</span>
            <div className="w-1/2 h-5 bg-cyan-400/20 rounded mt-4" />
            <div className="w-full h-24 border border-cyan-400/20 bg-cyan-500/5 flex items-center justify-center">
              <span className="text-xs font-mono text-cyan-400/60 animate-pulse">CAD_PLOTTING_DRAFT...</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 17: COMMAND CENTER SCI-FI (Rotating radar-sweep skeleton)
  // --------------------------------------------------------------------------
  if (flavor.number === '17') {
    return (
      <div className={`p-8 rounded-xl bg-black border border-emerald-500/40 flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className="relative w-24 h-24 rounded-full border border-emerald-500/40 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-emerald-500/20" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-t-2 border-emerald-400 shadow-[0_0_15px_#10b981]"
          />
        </div>
        <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase animate-pulse">RADAR SWEEP // DETECTING TARGETS</p>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 18: LUXURY ATELIER (Understated soft champagne shimmer, no color)
  // --------------------------------------------------------------------------
  if (flavor.number === '18') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="h-64 border border-white/[0.08] bg-[#0c0d10] p-8 space-y-6">
            <div className="w-20 h-3 bg-amber-200/20" />
            <div className="w-3/4 h-7 bg-white/[0.08]" />
            <div className="w-full h-16 bg-white/[0.03]" />
            <div className="w-28 h-[1px] bg-amber-400/30" />
          </div>
        ))}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 24: THE JOURNAL (Minimalist 3-dot bounce)
  // --------------------------------------------------------------------------
  if (flavor.number === '24') {
    return (
      <div className={`py-16 flex flex-col items-center justify-center space-y-4 text-gray-400 ${className}`}>
        <div className="flex gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: dot * 0.15 }}
              className="w-2 h-2 rounded-full bg-gray-400"
            />
          ))}
        </div>
        <p className="text-xs font-serif italic text-gray-500">Loading ledger entries...</p>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 25: THE WANTED LEVEL (Neon striped progress-bar sweep)
  // --------------------------------------------------------------------------
  if (flavor.number === '25') {
    return (
      <div className={`p-6 rounded-2xl bg-[#090d16] border border-pink-500/40 font-mono space-y-3 shadow-2xl ${className}`}>
        <div className="flex items-center justify-between text-xs">
          <span className="text-pink-400 font-bold uppercase tracking-wider">ESTABLISHING HEIST DOSSIER</span>
          <span className="text-cyan-400 font-bold">100% SECURE</span>
        </div>
        <div className="relative h-3 w-full bg-black/80 rounded-full overflow-hidden border border-white/10">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            className="h-full w-1/2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_15px_#ec4899]"
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-500">
          <span>LEONIDA TELEMETRY</span>
          <span>VALUATION: $36M</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DEFAULT / MINIMALIST EDITORIAL (03) SKELETON BARS
  // --------------------------------------------------------------------------
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {items.map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/[0.08] bg-[#0e121a] p-6 space-y-4 animate-pulse"
        >
          <div className="h-44 w-full bg-white/[0.04] rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-1/3 bg-white/[0.08] rounded" />
            <div className="h-6 w-3/4 bg-white/[0.1] rounded" />
            <div className="h-4 w-full bg-white/[0.04] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
