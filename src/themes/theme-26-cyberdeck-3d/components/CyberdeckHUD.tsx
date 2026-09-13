import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, Terminal, Zap, Radio, ChevronDown, Check, Compass, Cpu } from 'lucide-react';
import { soundFX3D } from './SoundFX3D';
import { CyberMode, CYBER_MODES } from '../types/cyberdeck';

interface CyberdeckHUDProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentMode: CyberMode;
  onModeChange: (mode: CyberMode) => void;
  onNavigateAdmin: () => void;
}

export const CyberdeckHUD: React.FC<CyberdeckHUDProps> = ({
  activeTab,
  onTabChange,
  currentMode,
  onModeChange,
  onNavigateAdmin
}) => {
  const [isMuted, setIsMuted] = useState(soundFX3D.isMuted());
  const [modeMenuOpen, setModeMenuOpen] = useState(false);
  const modeTokens = CYBER_MODES[currentMode] || CYBER_MODES['cyber-neon'];

  const menuItems = [
    { id: 'start', label: 'OVERVIEW' },
    { id: 'dossier', label: 'DOSSIER' },
    { id: 'skills', label: 'SKILLS MATRIX' },
    { id: 'projects', label: 'PROJECTS (8)' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'FREQUENCY' }
  ];

  const handleToggleMute = () => {
    const muted = soundFX3D.toggleMute();
    setIsMuted(muted);
  };

  const handleModeSelect = (mode: CyberMode) => {
    soundFX3D.playHoloChime();
    onModeChange(mode);
    setModeMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 pointer-events-none select-none font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
        
        {/* Left: Brand Title & Telemetry */}
        <div className="flex items-center gap-3 bg-black/85 px-4 py-2 rounded-2xl border backdrop-blur-xl shadow-2xl"
          style={{ borderColor: modeTokens.hudBorderColor }}
        >
          <div className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: modeTokens.primaryColor }} />
          <div>
            <h1 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider font-sans leading-none">
              PRAJWAL DL <span style={{ color: modeTokens.primaryColor }}>// CYBERDECK 3D</span>
            </h1>
            <span className="text-[9px] text-gray-400 font-mono tracking-widest block pt-0.5">
              FULLSTACK SPATIAL SYSTEMS ARCHITECT
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav aria-label="3D Cyberdeck Navigation" className="hidden lg:flex items-center gap-1.5 bg-black/85 p-1.5 rounded-full border backdrop-blur-xl shadow-2xl"
          style={{ borderColor: modeTokens.hudBorderColor }}
        >
          {menuItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFX3D.playKeyClick();
                  onTabChange(item.id);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-black shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: isActive ? modeTokens.primaryColor : undefined,
                  boxShadow: isActive ? `0 0 18px ${modeTokens.accentGlow}` : undefined
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Mode Selector, SFX Toggle & Admin OS */}
        <div className="flex items-center gap-2">
          
          {/* Mode Switcher */}
          <div className="relative">
            <button
              onClick={() => setModeMenuOpen(!modeMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/85 border text-xs font-bold text-white backdrop-blur-xl shadow-lg transition-all hover:scale-105 cursor-pointer"
              style={{ borderColor: modeTokens.hudBorderColor }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: modeTokens.primaryColor }} />
              <span className="hidden sm:inline">{modeTokens.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${modeMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {modeMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-black/95 border-2 rounded-xl p-2 shadow-2xl backdrop-blur-2xl space-y-1 z-50">
                {Object.values(CYBER_MODES).map(m => (
                  <button
                    key={m.id}
                    onClick={() => handleModeSelect(m.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                      currentMode === m.id ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.primaryColor }} />
                      <span>{m.name}</span>
                    </div>
                    {currentMode === m.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-black/85 border text-gray-300 hover:text-white backdrop-blur-xl shadow-lg transition-colors cursor-pointer"
            style={{ borderColor: modeTokens.hudBorderColor }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Exit / Admin OS */}
          <button
            onClick={onNavigateAdmin}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>ADMIN</span>
          </button>

        </div>

      </div>

      {/* Mobile Horizontal Nav Bar (< lg) */}
      <div className="block lg:hidden mt-2 pointer-events-auto">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar bg-black/85 p-1.5 rounded-xl border backdrop-blur-xl"
          style={{ borderColor: modeTokens.hudBorderColor }}
        >
          {menuItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFX3D.playKeyClick();
                  onTabChange(item.id);
                }}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  isActive ? 'text-black' : 'text-gray-300'
                }`}
                style={{
                  backgroundColor: isActive ? modeTokens.primaryColor : undefined
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
