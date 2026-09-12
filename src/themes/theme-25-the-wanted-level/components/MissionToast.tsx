import React, { useEffect } from "react";
import { useTheme25Era } from "../context/Theme25EraContext";
import { soundFX } from "./SoundEffects";

interface MissionToastProps {
  message?: string;
  onComplete: () => void;
}

export const MissionToast: React.FC<MissionToastProps> = ({ 
  message = "Intel Gathered: Case Study Unlocked", 
  onComplete 
}) => {
  const { era, tokens } = useTheme25Era();

  useEffect(() => {
    soundFX.playCashChime();
    const timer = setTimeout(() => {
      onComplete();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center whitespace-nowrap select-none font-mono">
      <h1 
        className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-widest text-center uppercase drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]"
        style={{ color: tokens.accentColor }}
      >
        MISSION UPDATE!
      </h1>
      <div className="bg-black/90 px-6 py-2 mt-3 border-t-2 border-b-2 shadow-2xl backdrop-blur-md" style={{ borderColor: tokens.borderColor }}>
        <p className="font-mono text-sm sm:text-lg md:text-2xl text-white uppercase tracking-[0.2em] font-bold">
          {message}
        </p>
      </div>
      <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest mt-2 bg-emerald-500/20 px-3 py-0.5 rounded border border-emerald-500/40">
        RESPECT +
      </span>
    </div>
  );
};
