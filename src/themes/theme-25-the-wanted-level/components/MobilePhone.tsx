import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, Mail, Signal, Battery, Wifi, ChevronDown } from "lucide-react";
import { useTheme25Era } from "../context/Theme25EraContext";
import { soundFX } from "./SoundEffects";

export const MobilePhone: React.FC = () => {
  const { tokens } = useTheme25Era();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput = activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA");
      if (isInput) return;

      if (e.key === "ArrowUp" && !isOpen) {
        soundFX.playRadioTuning();
        setIsOpen(true);
      } else if ((e.key === "ArrowDown" || e.key === "Escape") && isOpen) {
        soundFX.playMenuTick();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleCall = () => {
    soundFX.playCashChime();
    window.location.href = "tel:+919876543210";
  };

  const handleText = () => {
    soundFX.playMenuTick();
    window.location.href = "sms:+919876543210";
  };

  const handleEmail = () => {
    soundFX.playCashChime();
    window.location.href = "mailto:prajwal@example.com";
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => {
            soundFX.playRadioTuning();
            setIsOpen(true);
          }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 font-mono font-black text-[10px] sm:text-xs bg-black/90 text-white px-3 py-1.5 rounded-full border shadow-2xl backdrop-blur-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
          style={{
            borderColor: tokens.borderColor,
            boxShadow: `0 0 15px ${tokens.accentGlow}`
          }}
          title="Open iFruit Mobile Phone [Press Up Arrow]"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>[&uarr;] iFRUIT PHONE</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-6 w-[270px] sm:w-[290px] h-[480px] sm:h-[510px] z-50 bg-[#0c0e17] border-4 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col font-mono text-white animate-in slide-in-from-bottom duration-300 pointer-events-auto"
          style={{ borderColor: tokens.borderColor, boxShadow: `0 0 35px ${tokens.accentGlow}` }}
        >
          {/* Status Bar */}
          <div className="flex justify-between items-center px-3 py-1.5 bg-black/60 text-[10px] text-gray-300 font-mono backdrop-blur-md">
            <div className="flex items-center gap-1">
              <Signal className="w-3 h-3 text-emerald-400" />
              <Wifi className="w-3 h-3 text-cyan-400" />
              <span className="font-bold text-[9px] tracking-wider text-pink-400">iFRUIT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>{currentTime || "16:20"}</span>
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Contact Profile Header */}
          <div className="flex flex-col items-center justify-center p-4 pt-6 text-center border-b border-white/10 bg-gradient-to-b from-black/80 to-transparent">
            <div 
              className="w-16 h-16 rounded-full bg-black/80 border-2 flex items-center justify-center font-sans font-black text-2xl text-white shadow-xl mb-2"
              style={{ borderColor: tokens.accentColor, boxShadow: `0 0 15px ${tokens.accentGlow}` }}
            >
              P
            </div>
            <h3 className="font-sans font-black text-lg text-white uppercase tracking-tight">
              PRAJWAL DL
            </h3>
            <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
              OPERATIVE // LEAD ARCHITECT
            </p>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/40 mt-1 font-bold">
              ● ONLINE &bull; BENGALURU
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex-1 flex flex-col justify-center gap-3 px-4 py-3">
            <button 
              onClick={handleCall}
              className="flex items-center justify-center gap-2 bg-emerald-600/90 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>CALL OPERATIVE</span>
            </button>
            <button 
              onClick={handleText}
              className="flex items-center justify-center gap-2 bg-sky-600/90 hover:bg-sky-500 text-white py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>SEND SMS INTEL</span>
            </button>
            <button 
              onClick={handleEmail}
              className="flex items-center justify-center gap-2 bg-purple-600/90 hover:bg-purple-500 text-white py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL DIRECTLY</span>
            </button>
          </div>

          {/* Close Handle */}
          <div 
            onClick={() => {
              soundFX.playMenuTick();
              setIsOpen(false);
            }}
            className="bg-black/80 hover:bg-black text-gray-400 hover:text-white py-2 text-[10px] font-bold text-center flex flex-col items-center justify-center cursor-pointer transition-colors border-t border-white/10"
          >
            <ChevronDown className="w-4 h-4" />
            <span>[&darr;] CLOSE PHONE</span>
          </div>
        </div>
      )}
    </>
  );
};
