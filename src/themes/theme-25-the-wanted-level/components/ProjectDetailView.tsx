import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ExternalLink, GitBranch, Shield, Star, 
  ChevronRight, Compass, Zap, Layers, Activity, CheckCircle2 
} from 'lucide-react';
import { Project } from '@/types/portfolio';
import { soundFX } from './SoundEffects';
import { useTheme25Era } from '../context/Theme25EraContext';
import { MotionGrid, MotionCard, MotionHeading } from '@/animations';

interface ProjectDetailViewProps {
  project: Project;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onBackToList: () => void;
  onNavigate: (route: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  projects,
  onSelectProject,
  onBackToList,
  onNavigate
}) => {
  const { tokens } = useTheme25Era();
  const [countdownStr, setCountdownStr] = useState('109, 18, 16, 32.');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date('2026-11-15T00:00:00Z');
      const diff = Math.max(0, target.getTime() - now.getTime());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdownStr(`${d}, ${h}, ${m}, ${s}.`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut: ESC to go back to list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playMenuTick();
        onBackToList();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBackToList]);

  const handleLiveDemo = () => {
    soundFX.playCashChime();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGithubRepo = () => {
    soundFX.playMenuTick();
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const otherProjects = projects.filter(p => p.id !== project.id);

  // Tech badge renderer
  const renderTechBadge = (tech: string, idx: number) => {
    const t = tech.toLowerCase();
    let bg = 'bg-white/10 text-gray-200 border-white/20';
    let iconLabel = tech;

    if (t.includes('react')) {
      bg = 'bg-[#087ea4]/25 text-[#22d3ee] border-[#087ea4]/60 shadow-[0_0_8px_rgba(34,211,238,0.3)]';
    } else if (t.includes('python')) {
      bg = 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50 shadow-[0_0_8px_rgba(234,179,8,0.3)]';
    } else if (t.includes('tensor') || t.includes('tf')) {
      bg = 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-[0_0_8px_rgba(249,115,22,0.3)]';
    } else if (t.includes('aws') || t.includes('cloud')) {
      bg = 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]';
    } else if (t.includes('typescript') || t.includes('ts')) {
      bg = 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,0.3)]';
    }

    return (
      <span 
        key={idx}
        className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border flex items-center gap-1.5 ${bg}`}
      >
        <span>{iconLabel}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6 font-mono text-gray-200">
      
      {/* Top Header & Telemetry Row matching Screenshot 3 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
        
        {/* Title Block: "PROJECTS: Case Studies" */}
        <div>
          <button
            onClick={() => {
              soundFX.playMenuTick();
              onBackToList();
            }}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mb-1 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ALL PROJECTS [ESC]</span>
          </button>
          <div className="flex items-baseline gap-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight">
              PROJECTS:
            </h1>
            <span 
              className="text-2xl sm:text-4xl italic drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]"
              style={{ 
                color: tokens.accentColor,
                fontFamily: tokens.fontScript 
              }}
            >
              Case Studies
            </span>
          </div>
        </div>

        {/* Center-Right Stats Telemetry matching Screenshot 3 */}
        <div className="flex flex-col items-start lg:items-end bg-black/80 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="text-[10px] sm:text-xs font-mono font-bold text-gray-300 flex items-center gap-2">
            <span>BUILDS COMPLETED: <strong className="text-white">{projects.length}</strong></span>
            <span className="text-white/30">/</span>
            <span>PROJECT VALUE: <strong className="text-emerald-400">$2,500,000</strong></span>
          </div>
          <div className="text-[10px] text-cyan-400 font-mono font-bold tracking-widest pt-0.5">
            {countdownStr}
          </div>
        </div>

      </div>

      {/* Main Grid: Project Detail Block, Other Projects List & Diorama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: PROJECT DETAIL BLOCK & OTHER PROJECTS LIST      */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* PROJECT DETAIL BLOCK (Cyan Border Box) */}
          <div className="space-y-1.5">
            <span 
              className="text-[11px] font-bold tracking-widest uppercase block"
              style={{ color: tokens.accentColor }}
            >
              PROJECT DETAIL BLOCK
            </span>

            <div 
              className="p-5 sm:p-6 rounded-2xl border-2 backdrop-blur-md shadow-2xl space-y-4"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.highlightColor,
                boxShadow: `0 0 25px ${tokens.accentGlow}`
              }}
            >
              
              {/* Title */}
              <div className="space-y-1 border-b border-white/10 pb-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  TITLE:
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white font-sans uppercase tracking-tight">
                  {project.title}
                </h2>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5 border-b border-white/10 pb-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  TECH STACK:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => renderTechBadge(tech, idx))}
                </div>
              </div>

              {/* Role */}
              <div className="space-y-0.5 border-b border-white/10 pb-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  ROLE:
                </span>
                <p className="text-sm sm:text-base font-black text-white font-sans uppercase tracking-wide">
                  {project.role || 'LEAD FULLSTACK ARCHITECT'}
                </p>
              </div>

              {/* Key Features Pill Badges */}
              <div className="space-y-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  KEY FEATURES:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(project.features && project.features.length > 0 ? project.features : [
                    'Personalized Recommendations',
                    'Adaptive UI Engine',
                    'Performance Telemetry',
                    'Enterprise Microservices',
                    'Zero Downtime Architecture'
                  ]).map((feat, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/70 text-gray-300 border border-white/10 hover:border-cyan-400/50 transition-colors"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={handleLiveDemo}
                  onMouseEnter={() => soundFX.playMenuTick()}
                  className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white shadow-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                  style={{
                    background: tokens.activePillGradient,
                    boxShadow: `0 0 20px ${tokens.accentGlow}`
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>VIEW LIVE SYSTEM &gt;</span>
                </button>

                {project.githubUrl && (
                  <button
                    onClick={handleGithubRepo}
                    onMouseEnter={() => soundFX.playMenuTick()}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-300 hover:text-white bg-black/80 hover:bg-black border border-white/15 hover:border-white/40 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>INSPECT REPOSITORY</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* OTHER PROJECTS Quick Switcher List matching Screenshot 3 */}
          <div className="space-y-1.5">
            <span 
              className="text-[11px] font-bold tracking-widest uppercase block"
              style={{ color: tokens.accentColor }}
            >
              OTHER PROJECTS
            </span>

            <div className="space-y-1.5">
              {otherProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    soundFX.playTabShift();
                    onSelectProject(p);
                  }}
                  onMouseEnter={() => soundFX.playMenuTick()}
                  className="w-full text-left p-3 rounded-xl bg-black/85 hover:bg-black border border-white/10 hover:border-pink-500/50 shadow-lg backdrop-blur-md transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span 
                      className="font-mono font-black text-xs"
                      style={{ color: tokens.accentColor }}
                    >
                      [+]
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white font-sans uppercase tracking-tight truncate group-hover:text-pink-300 transition-colors">
                      {p.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Penthouse Balcony Diorama & Holographic Tablet */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 relative">
          
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl bg-black/90">
            
            {/* Sky Background */}
            <div 
              className="absolute inset-0"
              style={{ background: tokens.skyGradient }}
            />

            {/* Distant Skyscrapers with glowing neon windows */}
            <svg className="absolute bottom-16 left-0 right-0 w-full h-44" viewBox="0 0 500 200" preserveAspectRatio="none">
              <path d="M0,200 L0,110 L30,110 L30,80 L60,80 L60,130 L90,130 L90,60 L110,40 L130,60 L130,140 L180,140 L180,70 L210,70 L210,130 L250,130 L250,50 L275,30 L300,50 L300,140 L350,140 L350,85 L380,85 L380,130 L430,130 L430,70 L460,70 L460,120 L500,120 L500,200 Z" fill="#0b0816" />
              <path d="M20,200 L20,130 L50,130 L50,95 L80,95 L80,145 L140,145 L140,85 L170,85 L170,150 L220,150 L220,70 L240,50 L260,70 L260,150 L320,150 L320,105 L360,105 L360,150 L410,150 L410,95 L450,95 L450,140 L500,140 L500,200 Z" fill="#06040c" />
              
              {/* Window lights */}
              <g fill={tokens.highlightColor} opacity="0.6">
                <rect x="95" y="80" width="3" height="4" />
                <rect x="105" y="80" width="3" height="4" />
                <rect x="115" y="80" width="3" height="4" />
                <rect x="95" y="100" width="3" height="4" />
                <rect x="115" y="100" width="3" height="4" />
                <rect x="260" y="70" width="3" height="4" />
                <rect x="270" y="70" width="3" height="4" />
                <rect x="280" y="70" width="3" height="4" />
                <rect x="260" y="90" width="3" height="4" />
                <rect x="280" y="90" width="3" height="4" />
              </g>

              {/* Red beacon lights */}
              <circle cx="110" cy="38" r="2.5" fill="#ef4444" className="animate-ping" />
              <circle cx="275" cy="28" r="2.5" fill="#ef4444" className="animate-ping" />
            </svg>

            {/* Police Helicopter with Spotlight Beam (Screenshot 3) */}
            <div className="absolute top-6 left-1/4 flex flex-col items-center">
              {/* Helicopter Icon */}
              <div className="w-10 h-4 bg-black rounded-full border border-white/20 relative animate-pulse">
                {/* Rotor */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-white/60 animate-spin" />
                {/* Tail */}
                <div className="absolute top-1 -right-4 w-4 h-1 bg-black" />
                <div className="absolute top-0 -right-4 w-1 h-3 bg-white/40" />
                {/* Red beacon */}
                <span className="absolute top-1 left-2 w-1 h-1 rounded-full bg-red-500 animate-ping" />
              </div>
              {/* Spotlight beam downward */}
              <div 
                className="w-36 h-48 opacity-25 mix-blend-screen pointer-events-none origin-top -rotate-12 animate-[searchlight_8s_ease-in-out_infinite_alternate]"
                style={{
                  background: 'conic-gradient(from 170deg at 50% 0%, rgba(56,189,248,0.4) 0deg, rgba(236,72,153,0.2) 15deg, transparent 25deg)'
                }}
              />
            </div>

            {/* Balcony Railing */}
            <div className="absolute bottom-0 left-0 right-0 h-16 border-t-2 border-white/20 bg-black/40 backdrop-blur-xs flex justify-around">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-0.5 h-full bg-white/20" />
              ))}
            </div>

            {/* Character standing holding tablet with glowing hologram */}
            <div className="absolute bottom-2 right-12 sm:right-20 flex flex-col items-center z-10">
              
              {/* Floating Holographic Tablet Chart Screen (Screenshot 3) */}
              <div 
                className="absolute -top-32 -left-36 w-52 sm:w-60 h-36 rounded-xl border-2 p-3 shadow-2xl backdrop-blur-md transform -rotate-6 animate-[pulse_4s_ease-in-out_infinite]"
                style={{
                  backgroundColor: 'rgba(6, 182, 212, 0.12)',
                  borderColor: tokens.highlightColor,
                  boxShadow: `0 0 25px rgba(34, 211, 238, 0.35)`
                }}
              >
                <div className="flex items-center justify-between border-b border-cyan-400/30 pb-1 text-[8px] text-cyan-300 font-mono">
                  <span>TELEMETRY STREAM</span>
                  <span className="animate-pulse font-bold">● LIVE</span>
                </div>
                {/* Holographic graph lines */}
                <svg className="w-full h-16 mt-1" viewBox="0 0 100 40">
                  <path 
                    d="M0,35 Q15,20 30,28 T60,10 T85,18 T100,5" 
                    fill="none" 
                    stroke="#22d3ee" 
                    strokeWidth="1.5" 
                  />
                  <path 
                    d="M0,35 Q15,20 30,28 T60,10 T85,18 T100,5 L100,40 L0,40 Z" 
                    fill="url(#holo-grad)" 
                    opacity="0.3" 
                  />
                  <defs>
                    <linearGradient id="holo-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between text-[7px] text-cyan-200 font-mono pt-1">
                  <span>LATENCY: 12ms</span>
                  <span>LOAD: 99.9%</span>
                  <span>SECURITY: AES-256</span>
                </div>
              </div>

              {/* Character head with glasses & beard */}
              <div className="w-11 h-11 rounded-full bg-[#1e152d] border border-amber-400/40 relative shadow-lg">
                {/* Glasses reflection */}
                <span className="absolute top-4 left-1.5 w-3 h-2 rounded-sm bg-cyan-400/80 shadow-[0_0_6px_#22d3ee]" />
                <span className="absolute top-4 right-1.5 w-3 h-2 rounded-sm bg-cyan-400/80 shadow-[0_0_6px_#22d3ee]" />
                {/* Beard */}
                <div className="absolute bottom-1 left-2 right-2 h-3 bg-[#0d0914] rounded-b-md" />
              </div>

              {/* Character body & Black shirt */}
              <div className="w-16 h-20 bg-[#0e0c14] rounded-t-xl border-t border-x border-white/20 flex flex-col items-center pt-2 relative">
                {/* Gold Watch on wrist */}
                <div className="absolute bottom-3 -left-2 w-3 h-3 rounded-full bg-amber-400 border border-amber-300 shadow-[0_0_6px_#f59e0b]" />
                {/* Hands holding tablet */}
                <div className="w-10 h-7 bg-gray-900 rounded-sm border border-cyan-400/60 shadow-[0_0_10px_#22d3ee] flex items-center justify-center">
                  <span className="text-[6px] text-cyan-300 font-bold">PDL</span>
                </div>
              </div>

              {/* Trousers */}
              <div className="flex gap-1.5">
                <div className="w-6 h-16 bg-[#07060a]" />
                <div className="w-6 h-16 bg-[#07060a]" />
              </div>

            </div>

          </div>

          {/* Bottom Right Quote */}
          <div className="pt-4 text-right space-y-0.5">
            <p 
              className="text-sm sm:text-base italic drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]"
              style={{ 
                color: tokens.accentColor,
                fontFamily: tokens.fontScript 
              }}
            >
              &ldquo;Code is my weapon. Creativity is my world.&rdquo;
            </p>
            <span className="text-xs text-amber-400 font-mono tracking-widest block font-bold">
              &mdash; Prajwal DL
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
