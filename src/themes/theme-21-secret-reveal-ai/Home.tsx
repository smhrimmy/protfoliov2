import React, { useState, useEffect } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  Shield, Cpu, Eye, ArrowUpRight, Zap, RefreshCw, 
  Terminal, Sparkles, ExternalLink, Lock, CheckCircle2
} from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  skillCategories, 
  onNavigate 
}) => {
  // Staged assembly state: 0 = dormant, 1 = brackets, 2 = visor, 3 = comms, 4 = active
  const [assemblyStage, setAssemblyStage] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setAssemblyStage(4); // Immediately assembled
    }
  }, []);

  const triggerActivation = () => {
    if (isActivating) return;
    setIsActivating(true);
    setAssemblyStage(1);

    setTimeout(() => setAssemblyStage(2), 220);
    setTimeout(() => setAssemblyStage(3), 440);
    setTimeout(() => {
      setAssemblyStage(4);
      setIsActivating(false);
    }, 660);
  };

  const resetActivation = () => {
    setAssemblyStage(0);
    setActiveHotspot(null);
  };

  return (
    <div className="min-h-screen bg-[#040609] text-[#e6edf3] font-sans antialiased selection:bg-[#00e5ff] selection:text-black w-full max-w-full overflow-x-hidden relative">
      
      {/* 1. OVERLAY MINIMAL TOP BAR */}
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#040609]/90 to-transparent backdrop-blur-xs text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full transition-colors ${
              assemblyStage === 4 ? 'bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]' : 'bg-gray-600'
            }`} />
            <span className="font-bold text-white tracking-wider text-xs uppercase">{identity.name}</span>
            <span className="text-gray-600 hidden sm:inline">::</span>
            <span className="text-[#00e5ff] hidden sm:inline text-[11px]">
              {assemblyStage === 4 ? 'AI_PERSONA_ARMED' : 'STANDBY_MODE'}
            </span>
          </div>

          <nav className="flex items-center gap-6 text-[11px] text-gray-400 uppercase tracking-widest">
            <a href="#dossier" className="hover:text-white transition-colors">Dossier</a>
            <a href="#projects" className="hover:text-white transition-colors">Archives</a>
            <a href="#contact" className="hover:text-white transition-colors">Uplink</a>
            <button
              onClick={() => onNavigate('/admin')}
              className="px-2.5 py-1 rounded border border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-colors"
            >
              Admin OS
            </button>
          </nav>
        </div>
      </header>

      {/* 2. THE SINGLE-FOCAL-REVEAL HERO STAGE */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16 pb-12">
        
        {/* Background Radial Cyber Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 45%, #00e5ff 0%, transparent 60%), linear-gradient(to right, #00e5ff10 1px, transparent 1px), linear-gradient(to bottom, #00e5ff10 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px'
          }}
        />

        {/* Ambient Telemetry Watermark */}
        <div className="absolute top-20 left-6 font-mono text-[10px] text-gray-600 space-y-1 hidden md:block">
          <div>LATENCY: 1.2MS</div>
          <div>CYBERNETIC_INDEX: 021</div>
          <div>PROTOCOL: DIRECT_REVEAL</div>
        </div>

        <div className="absolute top-20 right-6 font-mono text-[10px] text-right text-gray-600 space-y-1 hidden md:block">
          <div>NODE_STATUS: ONLINE</div>
          <div>ENCRYPTION: QUANTUM_SEC</div>
          <div>RECALL: LEVEL_5</div>
        </div>

        {/* The Centered Portrait & Assembled HUD Helmet Frame */}
        <div className="relative w-[320px] sm:w-[380px] md:w-[440px] aspect-[4/5] mx-auto flex items-center justify-center my-6">
          
          {/* Base Portrait Image */}
          <div 
            onClick={assemblyStage === 0 ? triggerActivation : undefined}
            className={`w-full h-full rounded-3xl overflow-hidden border-2 transition-all duration-700 relative cursor-pointer ${
              assemblyStage >= 1
                ? 'border-[#00e5ff]/80 shadow-[0_0_40px_rgba(0,229,255,0.25)]'
                : 'border-white/10 shadow-2xl grayscale contrast-125 hover:border-white/30'
            }`}
          >
            <img
              src={identity.avatarUrl}
              alt={identity.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                assemblyStage >= 1 ? 'contrast-135 brightness-95' : ''
              }`}
            />

            {/* Dark Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            {/* Inactive Prompt Callout */}
            {assemblyStage === 0 && (
              <div className="absolute inset-x-4 bottom-6 p-4 rounded-2xl bg-black/80 backdrop-blur border border-white/20 text-center space-y-2">
                <div className="text-[11px] font-mono text-[#00e5ff] uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 animate-pulse" />
                  <span>NEURAL PERSONA OFFLINE</span>
                </div>
                <button
                  onClick={triggerActivation}
                  className="w-full py-2 bg-[#00e5ff] hover:bg-[#33ebff] text-black font-mono font-bold text-xs rounded-xl shadow-lg shadow-[#00e5ff]/20 transition-all uppercase tracking-wider"
                >
                  Click to Activate Persona →
                </button>
              </div>
            )}
          </div>

          {/* STAGED HUD / HELMET OVERLAY PIECES */}

          {/* Piece 1: Targeting Reticle & Cranial Rings (Stage >= 1) */}
          {assemblyStage >= 1 && (
            <div className="absolute -inset-4 sm:-inset-6 pointer-events-none transition-all duration-300 animate-in fade-in zoom-in-95">
              <svg className="w-full h-full text-[#00e5ff]/40" viewBox="0 0 400 500">
                {/* Corner brackets */}
                <path d="M 20 60 L 20 20 L 60 20" stroke="currentColor" strokeWidth="3" fill="none" />
                <path d="M 340 20 L 380 20 L 380 60" stroke="currentColor" strokeWidth="3" fill="none" />
                <path d="M 20 440 L 20 480 L 60 480" stroke="currentColor" strokeWidth="3" fill="none" />
                <path d="M 380 440 L 380 480 L 340 480" stroke="currentColor" strokeWidth="3" fill="none" />
                {/* Target crosshairs */}
                <line x1="180" y1="20" x2="220" y2="20" stroke="currentColor" strokeWidth="2" />
                <line x1="200" y1="10" x2="200" y2="30" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          )}

          {/* Piece 2: Cyber Visor & Optics Plate (Stage >= 2) */}
          {assemblyStage >= 2 && (
            <div 
              onMouseEnter={() => setActiveHotspot('visor')}
              onMouseLeave={() => setActiveHotspot(null)}
              className="absolute top-[28%] inset-x-8 h-16 rounded-xl bg-gradient-to-r from-[#00e5ff]/30 via-[#00e5ff]/60 to-[#00e5ff]/30 border-2 border-[#00e5ff] backdrop-blur-xs shadow-[0_0_20px_#00e5ff] cursor-pointer transition-all duration-300 animate-in slide-in-from-top-4 flex items-center justify-between px-4 z-20 group"
            >
              <span className="font-mono text-[10px] text-white font-bold tracking-wider">
                OPTICS_LOCKED
              </span>
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </div>
          )}

          {/* Piece 3: Comm Aurals / Side Plates (Stage >= 3) */}
          {assemblyStage >= 3 && (
            <>
              {/* Left Comm Unit */}
              <div 
                onMouseEnter={() => setActiveHotspot('comm')}
                onMouseLeave={() => setActiveHotspot(null)}
                className="absolute left-[-12px] top-[36%] w-6 h-20 rounded-l-lg bg-[#00e5ff] border-2 border-white shadow-[0_0_15px_#00e5ff] cursor-pointer z-20 transition-all duration-300 animate-in slide-in-from-left-4" 
              />
              {/* Right Comm Unit */}
              <div 
                onMouseEnter={() => setActiveHotspot('comm')}
                onMouseLeave={() => setActiveHotspot(null)}
                className="absolute right-[-12px] top-[36%] w-6 h-20 rounded-r-lg bg-[#00e5ff] border-2 border-white shadow-[0_0_15px_#00e5ff] cursor-pointer z-20 transition-all duration-300 animate-in slide-in-from-right-4" 
              />
            </>
          )}

          {/* Piece 4: Collar Matrix / Neural Core (Stage >= 4) */}
          {assemblyStage >= 4 && (
            <div 
              onMouseEnter={() => setActiveHotspot('core')}
              onMouseLeave={() => setActiveHotspot(null)}
              className="absolute bottom-6 inset-x-10 p-2.5 rounded-xl bg-black/90 border border-[#00e5ff] shadow-[0_0_25px_rgba(0,229,255,0.4)] z-20 cursor-pointer text-center font-mono text-[10px] text-[#00e5ff] transition-all animate-in zoom-in-90"
            >
              <span className="font-bold tracking-widest uppercase">CORE STATUS: FULLY SYNCHRONIZED</span>
            </div>
          )}

        </div>

        {/* Hotspot Readout Card */}
        <div className="h-14 flex items-center justify-center">
          {activeHotspot === 'visor' && (
            <div className="px-4 py-2 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff] text-[#00e5ff] font-mono text-xs animate-in fade-in">
              [ OPTICAL MATRIX: High-fidelity User Interfaces & WebGL Engines ]
            </div>
          )}
          {activeHotspot === 'comm' && (
            <div className="px-4 py-2 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff] text-[#00e5ff] font-mono text-xs animate-in fade-in">
              [ TELEMETRY LINK: Sub-second Microservices & Edge Infrastructure ]
            </div>
          )}
          {activeHotspot === 'core' && (
            <div className="px-4 py-2 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff] text-[#00e5ff] font-mono text-xs animate-in fade-in">
              [ COGNITIVE CORE: Senior Architecture Directorship & Contracts ]
            </div>
          )}
          {!activeHotspot && assemblyStage === 4 && (
            <div className="text-gray-500 font-mono text-[11px] flex items-center gap-2">
              <span>HOVER HUD REGIONS FOR TELEMETRY READOUTS</span>
              <span>·</span>
              <button
                onClick={resetActivation}
                className="text-[#00e5ff] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Re-arm Link</span>
              </button>
            </div>
          )}
        </div>

        {/* Hero Title & Bio */}
        <div className="max-w-xl text-center space-y-3 pt-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {identity.name}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-gray-400">
            {identity.role} // {identity.location}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            {identity.bio}
          </p>
        </div>

      </section>

      {/* 3. DOSSIER & ARCHIVAL TELEMETRY */}
      <section id="dossier" className="max-w-6xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08] space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest block">
              // CLASSIFIED CREDENTIALS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              System Briefing & Mission Log
            </h2>
          </div>
          <span className="font-mono text-xs text-gray-500">
            SECURITY CLEARANCE: LEVEL_4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#090d14] border border-white/[0.08] hover:border-[#00e5ff]/40 transition-all space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between text-[#00e5ff]">
                <span className="font-bold text-sm text-white font-sans">{exp.role}</span>
                <span>{exp.startDate} — {exp.current ? 'ACTIVE' : exp.endDate}</span>
              </div>
              <div className="text-gray-400 font-sans">{exp.company} · {exp.location}</div>
              <p className="text-gray-300 leading-relaxed font-sans text-xs pt-1">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROJECTS ARCHIVE */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08] space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest block">
              // DEPLOYED REPOSITORIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Active Battle-Tested Systems
            </h2>
          </div>
          <span className="font-mono text-xs text-gray-500">
            {projects.length} Published Nodes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(proj => (
            <div
              key={proj.id}
              onClick={() => onNavigate(`/projects/${proj.slug || proj.id}`)}
              className="p-6 rounded-3xl bg-[#090d14] border border-white/[0.08] hover:border-[#00e5ff]/50 transition-all cursor-pointer space-y-4 group"
            >
              {proj.coverImage && (
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/[0.06] bg-black/60">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-[#00e5ff]">
                <span>{proj.role}</span>
                <span className="text-gray-500">{proj.date || '2024'}</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                {proj.title}
              </h3>

              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-light">
                {proj.summary}
              </p>

              <div className="pt-2 flex items-center justify-between font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.slice(0, 3).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[#00e5ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Inspect Spec</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. UPLINK FOOTER */}
      <footer id="contact" className="border-t border-white/[0.08] bg-[#020305] py-12 text-xs font-mono text-gray-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
            <span>AI PERSONA SYSTEM // BROADCAST CHANNEL SECURE</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${identity.socialLinks.email}`} className="text-[#00e5ff] hover:underline">
              {identity.socialLinks.email}
            </a>
            <button onClick={() => onNavigate('/admin')} className="hover:text-white transition-colors">
              Admin OS
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
