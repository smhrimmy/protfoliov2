import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Shield, Heart, Clock, Star, Terminal, Zap } from 'lucide-react';
import { soundFX } from './SoundEffects';

interface GameHUDProps {
  wantedLevel: number;
  onWantedLevelChange: (level: number) => void;
  repoCount?: number;
  activeArsenal?: string;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  wantedLevel,
  onWantedLevelChange,
  repoCount = 36,
  activeArsenal = 'TYPESCRIPT // REACT 19'
}) => {
  const [isMuted, setIsMuted] = useState(soundFX.isMuted());
  const [timeStr, setTimeStr] = useState('');
  
  // Rolling cash amount based on repoCount (36 repos = $36,000,000)
  const cashAmount = (repoCount * 1_000_000).toLocaleString();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
      setTimeStr(`${hours}:${mins}:${secs} ${day}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMute = () => {
    const next = soundFX.toggleMute();
    setIsMuted(next);
  };

  const handleStarClick = (starIndex: number) => {
    const nextLevel = starIndex === wantedLevel ? 0 : starIndex;
    onWantedLevelChange(nextLevel);
    soundFX.playWantedStarSiren();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-none select-none font-mono">
      <div className="max-w-7xl mx-auto flex items-start justify-between gap-4 pointer-events-auto">
        
        {/* LEFT HUD: Health, Armor, Weapon Arsenal */}
        <div className="space-y-1 bg-black/85 p-2 sm:p-2.5 rounded-lg border border-white/10 backdrop-blur-md shadow-xl max-w-[55%] sm:max-w-none">
          {/* Operative Callout */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-bold text-white/90 gap-2 sm:gap-4">
            <span className="tracking-wider text-[#f59e0b] truncate">OP: PRAJWAL DL</span>
            <span className="text-emerald-400 text-[8px] sm:text-[10px] font-mono flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden xs:inline">STATUS: </span>ARMED
            </span>
          </div>

          {/* Health & Armor Status Bars */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Health (Green) */}
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 fill-emerald-500 shrink-0" />
              <div className="w-12 sm:w-28 h-2 sm:h-2.5 bg-gray-900 rounded-xs overflow-hidden border border-emerald-500/40">
                <div className="h-full bg-emerald-500 w-full animate-pulse shadow-[0_0_8px_#10b981]" />
              </div>
              <span className="text-[9px] sm:text-[10px] text-emerald-400 font-bold hidden sm:inline">100%</span>
            </div>

            {/* Armor (Blue - TypeScript 76.5%) */}
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400 fill-sky-400 shrink-0" />
              <div className="w-12 sm:w-28 h-2 sm:h-2.5 bg-gray-900 rounded-xs overflow-hidden border border-sky-400/40">
                <div className="h-full bg-sky-400 w-[77%] shadow-[0_0_8px_#38bdf8]" />
              </div>
              <span className="text-[9px] sm:text-[10px] text-sky-400 font-bold hidden sm:inline">77%</span>
            </div>
          </div>

          {/* Tactical Weapon / Stack Slot */}
          <div className="flex items-center justify-between pt-0.5 sm:pt-1 border-t border-white/10 text-[8px] sm:text-[10px] text-gray-400">
            <span className="text-gray-300 font-bold hidden sm:inline">EQUIPPED:</span>
            <span className="text-amber-400 font-mono tracking-wider truncate">{activeArsenal}</span>
          </div>
        </div>

        {/* RIGHT HUD: Cash Counter, Wanted Stars & Time */}
        <div className="flex flex-col items-end space-y-1 shrink-0">
          {/* Stylized Cash Counter Odometer */}
          <div 
            onClick={() => soundFX.playCashChime()}
            className="cursor-pointer group flex items-baseline gap-1 bg-black/85 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md"
            title="Verified GitHub Telemetry Repos Capitalized"
          >
            <span className="text-base sm:text-2xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              $
            </span>
            <span className="text-lg sm:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
              {cashAmount}
            </span>
          </div>

          {/* Wanted Level Stars (Interactive 1-5 Stars) */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-black/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md border border-white/10 backdrop-blur-md">
            <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold mr-0.5 sm:mr-1">HEAT:</span>
            {[1, 2, 3, 4, 5].map((starNum) => {
              const isFilled = starNum <= wantedLevel;
              return (
                <button
                  key={starNum}
                  onClick={() => handleStarClick(starNum)}
                  className={`p-0.5 transition-transform hover:scale-125 focus:outline-none ${
                    isFilled ? 'text-[#f59e0b] drop-shadow-[0_0_8px_#f59e0b]' : 'text-gray-600'
                  }`}
                  title={`Wanted Level ${starNum} Stars`}
                >
                  <Star className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${isFilled ? 'fill-[#f59e0b] animate-[pulse_1s_ease-in-out_infinite]' : 'fill-transparent'}`} />
                </button>
              );
            })}
          </div>

          {/* Time & Audio FX Toggle Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] text-gray-400 bg-black/70 px-2 sm:px-2.5 py-0.5 rounded border border-white/5">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
            <span className="hidden xs:inline">{timeStr}</span>
            <span className="hidden xs:inline text-white/20">|</span>
            <button
              onClick={handleToggleMute}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
              title={isMuted ? 'Unmute Game SFX' : 'Mute Game SFX'}
            >
              {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />}
              <span>{isMuted ? 'MUTED' : 'SFX'}</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
