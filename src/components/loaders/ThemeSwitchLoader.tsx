import React, { useEffect, useState } from 'react';
import { THEME_MANIFESTS } from '@/data/initialThemes';

interface ThemeSwitchLoaderProps {
  themeId: string;
  onComplete: () => void;
}

export const ThemeSwitchLoader: React.FC<ThemeSwitchLoaderProps> = ({ themeId, onComplete }) => {
  const manifest = THEME_MANIFESTS.find(m => m.id === themeId) || THEME_MANIFESTS[0];
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'));
    }, 180);

    const timer = setTimeout(() => {
      onComplete();
    }, 650);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Terminal Theme (theme-04)
  if (manifest.id === 'theme-04-terminal-cli') {
    return (
      <div className="fixed inset-0 z-50 bg-[#0c1017] text-[#22c55e] font-mono flex flex-col items-center justify-center p-8 select-none">
        <div className="w-full max-w-md bg-[#161b22] border border-[#22c55e]/30 rounded p-6 shadow-2xl">
          <p className="text-xs text-[#86efac] mb-2">$ sysctl --load-theme {manifest.id}</p>
          <div className="text-sm space-y-1">
            <p>[OK] Unmounting current layout architecture</p>
            <p>[OK] Allocating 80-column monospace buffer</p>
            <p>[OK] Initializing CLI prompt interface{dots}</p>
          </div>
          <div className="mt-4 h-1 bg-[#22c55e]/20 w-full overflow-hidden">
            <div className="h-full bg-[#22c55e] animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  // 3D Themes (theme-05, theme-11, theme-16)
  if (manifest.uses3D) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050510] text-purple-200 flex flex-col items-center justify-center p-6 select-none font-sans">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-mono text-purple-300">3D</span>
          </div>
        </div>
        <p className="text-sm font-medium tracking-wide mb-1">Spinning up WebGL Context{dots}</p>
        <p className="text-xs font-mono text-purple-400/70">{manifest.name} · {manifest.layoutArchitecture}</p>
      </div>
    );
  }

  // Brutalist Theme (theme-02)
  if (manifest.id === 'theme-02-brutalist') {
    return (
      <div className="fixed inset-0 z-50 bg-black text-white font-mono flex flex-col items-center justify-center p-6 select-none">
        <div className="border-4 border-white p-8 max-w-sm text-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">RAW BRUTALIST</h2>
          <p className="text-xs uppercase tracking-widest text-red-500 font-bold mb-4">HARD CUT LOADING</p>
          <div className="w-full bg-white h-2" />
        </div>
      </div>
    );
  }

  // Cyberpunk HUD Theme (theme-03)
  if (manifest.id === 'theme-03-cyberpunk-hud') {
    return (
      <div className="fixed inset-0 z-50 bg-[#030712] text-[#00f0ff] font-mono flex flex-col items-center justify-center p-6 select-none">
        <div className="border border-[#00f0ff]/40 p-6 rounded-lg bg-[#0b1329]/80 shadow-[0_0_20px_rgba(0,240,255,0.2)] max-w-sm text-center">
          <p className="text-xs text-[#38bdf8] uppercase tracking-widest mb-1">HUD CALIBRATION</p>
          <p className="text-lg font-bold mb-3 tracking-wider">SYNCING TELEMETRY{dots}</p>
          <div className="h-1 bg-[#00f0ff]/20 w-full overflow-hidden">
            <div className="h-full bg-[#00f0ff] animate-pulse w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  // Default / Editorial
  return (
    <div className="fixed inset-0 z-50 bg-[#0f1115] text-white flex flex-col items-center justify-center p-6 select-none font-sans">
      <div className="w-full max-w-xs flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-3">
          <span className="font-serif italic font-bold text-amber-400 text-sm">{manifest.number}</span>
        </div>
        <h3 className="text-sm font-semibold tracking-tight text-white mb-1">Applying {manifest.name}</h3>
        <p className="text-xs text-gray-400 font-mono mb-4">{manifest.layoutArchitecture}</p>
        <div className="w-full bg-white/10 h-0.5 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 animate-pulse w-2/3" />
        </div>
      </div>
    </div>
  );
};
