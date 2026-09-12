import React, { useState, useEffect } from "react";
import { soundFX } from "./SoundEffects";

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const bootSequence = [
      "VICE CITY PORTFOLIO OS [Ver 25.0]",
      "BIOS Date 09/12/26 13:04:27 Ver 1.00",
      "CPU: Central Processing Unit @ 3.4GHz",
      "Memory Test: 32768K OK",
      "",
      "Initializing AI & Telemetry Modules... OK",
      "Mounting Virtual DOM & React 19... OK",
      "Loading Portfolio Assets & City Map... OK",
      "Establishing Secure Frequency... OK",
      "",
      "SYSTEM READY. INITIATING MISSION BRIEFING..."
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootSequence.length) {
        soundFX.playMenuTick();
        setLines(prev => [...prev, bootSequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-start justify-start w-screen h-screen bg-[#070912] text-[#4ade80] font-mono p-6 sm:p-12 text-base sm:text-xl selection:bg-pink-500 selection:text-white">
      <div className="max-w-3xl space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
            {line}
          </div>
        ))}
        <div className="animate-pulse text-emerald-400 font-bold mt-2">_</div>
      </div>
      
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white border border-white/20 font-bold transition-colors cursor-pointer"
      >
        SKIP BOOT [ESC] &rarr;
      </button>
    </div>
  );
};
