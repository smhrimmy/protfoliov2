import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Star, Compass, 
  ArrowLeft, ArrowRight, FileText, ExternalLink
} from 'lucide-react';
import { Project } from '@/types/portfolio';
import { GameHUD } from './components/GameHUD';
import { ProjectDetailView } from './components/ProjectDetailView';
import { soundFX } from './components/SoundEffects';
import { MotionGrid, MotionCard } from '@/animations';
import { useTheme25Era, Theme25EraProvider } from './context/Theme25EraContext';

interface ProjectsPageProps {
  projects: Project[];
  onNavigate: (route: string) => void;
  activeNav?: string;
  onSelectNav?: (navId: string) => void;
  initialProjectSlug?: string;
}

const Theme25ProjectsContent: React.FC<ProjectsPageProps> = ({
  projects,
  onNavigate,
  activeNav = 'projects',
  onSelectNav,
  initialProjectSlug
}) => {
  const { tokens } = useTheme25Era();
  const [selectedIdx, setSelectedIdx] = useState(() => {
    if (initialProjectSlug) {
      const foundIdx = projects.findIndex(p => p.slug === initialProjectSlug || p.id === initialProjectSlug);
      if (foundIdx !== -1) return foundIdx;
    }
    return 0;
  });

  const [selectedDetailProject, setSelectedDetailProject] = useState<Project | null>(() => {
    if (initialProjectSlug) {
      return projects.find(p => p.slug === initialProjectSlug || p.id === initialProjectSlug) || null;
    }
    return null;
  });

  const [wantedLevel, setWantedLevel] = useState(5);
  const [showMobileRadar, setShowMobileRadar] = useState(false);

  // Safe active project lookup
  const activeProject = projects[selectedIdx] || projects[0] || {
    id: 'proj-1',
    title: 'AI POWERED DIGITAL EXPERIENCE',
    summary: 'Personalized recommendations, adaptive UI, and real-time performance telemetry.',
    technologies: ['React', 'Python', 'TensorFlow', 'AWS'],
    liveUrl: 'https://frontend-beta-five-hfzyr9ap4o.vercel.app',
    completionPercentage: 85,
    linesOfCode: 21500,
    clientSatisfaction: 5,
    features: [
      'Personalized Recommendations',
      'Adaptive UI',
      'Performance Stats'
    ],
    objective_label: 'VICE CITY PORT',
    galleryImages: []
  };

  const completionPercentage = activeProject.completionPercentage ?? 85;
  const linesOfCode = activeProject.linesOfCode ?? 21500;
  const clientSatisfaction = activeProject.clientSatisfaction ?? 5;
  const features = (activeProject.features && activeProject.features.length > 0)
    ? activeProject.features
    : [
        'Personalized Recommendations',
        'Adaptive UI',
        'Performance Stats'
      ];
  const objectiveLabel = activeProject.objective_label || 'VICE CITY PORT';

  // 6 screenshot thumbnails for the 2x3 matrix
  const defaultThumbnails = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80'
  ];

  const galleryList = (activeProject.galleryImages && activeProject.galleryImages.length >= 6)
    ? activeProject.galleryImages.slice(0, 6)
    : (activeProject.galleryImages && activeProject.galleryImages.length > 0)
    ? [...activeProject.galleryImages, ...defaultThumbnails].slice(0, 6)
    : defaultThumbnails;

  const menuItems = [
    { id: 'start', label: 'START GAME' },
    { id: 'dossier', label: 'ABOUT ME' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'academy', label: 'ACADEMY' },
    { id: 'contact', label: 'CONTACT' },
    { id: 'exit', label: 'EXIT GAME' }
  ];

  const handleNavClick = (itemId: string) => {
    soundFX.playMenuTick();
    if (itemId === 'exit') {
      onNavigate('/admin');
    } else if (onSelectNav) {
      onSelectNav(itemId);
    } else if (itemId === 'projects') {
      setSelectedDetailProject(null);
    } else {
      onNavigate(`/?theme=theme-25-the-wanted-level#${itemId}`);
    }
  };

  const handleNextProject = () => {
    soundFX.playTabShift();
    setSelectedIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrevProject = () => {
    soundFX.playTabShift();
    setSelectedIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleLiveDemoClick = () => {
    soundFX.playCashChime();
    if (activeProject.liveUrl) {
      window.open(activeProject.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (activeProject.githubUrl) {
      window.open(activeProject.githubUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedDetailProject(activeProject);
    }
  };

  const renderTechBadge = (tech: string, idx: number) => {
    const t = tech.toLowerCase();
    if (t.includes('react')) {
      return (
        <span 
          key={idx} 
          title="React Architecture" 
          className="w-6 h-6 rounded-md bg-[#087ea4]/25 border border-[#087ea4]/60 flex items-center justify-center text-[#149eca] shadow-[0_0_8px_rgba(20,158,202,0.4)]"
        >
          <svg className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="12" rx="10" ry="4.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </span>
      );
    }
    if (t.includes('python')) {
      return (
        <span 
          key={idx} 
          title="Python Engine" 
          className="w-6 h-6 rounded-md bg-yellow-500/25 border border-yellow-500/60 flex items-center justify-center text-yellow-300 font-mono font-black text-[10px] shadow-[0_0_8px_rgba(234,179,8,0.4)]"
        >
          Py
        </span>
      );
    }
    if (t.includes('typescript') || t.includes('ts')) {
      return (
        <span 
          key={idx} 
          title="TypeScript Strict Mode" 
          className="w-6 h-6 rounded-md bg-[#3178c6]/25 border border-[#3178c6]/60 flex items-center justify-center text-[#38bdf8] font-mono font-black text-[10px] shadow-[0_0_8px_rgba(49,120,198,0.4)]"
        >
          TS
        </span>
      );
    }
    if (t.includes('node')) {
      return (
        <span 
          key={idx} 
          title="Node.js Runtime" 
          className="w-6 h-6 rounded-md bg-emerald-500/25 border border-emerald-500/60 flex items-center justify-center text-emerald-400 font-mono font-black text-[9px] shadow-[0_0_8px_rgba(16,185,129,0.4)]"
        >
          Node
        </span>
      );
    }
    if (t.includes('tail') || t.includes('css')) {
      return (
        <span 
          key={idx} 
          title="Tailwind CSS Styling" 
          className="w-6 h-6 rounded-md bg-sky-500/25 border border-sky-500/60 flex items-center justify-center text-sky-300 font-mono font-black text-[9px] shadow-[0_0_8px_rgba(14,165,233,0.4)]"
        >
          TW
        </span>
      );
    }
    if (t.includes('aws') || t.includes('cloud')) {
      return (
        <span 
          key={idx} 
          title="AWS Cloud Infrastructure" 
          className="w-6 h-6 rounded-md bg-[#ff9900]/25 border border-[#ff9900]/60 flex items-center justify-center text-[#ff9900] font-mono font-black text-[8px] shadow-[0_0_8px_rgba(255,153,0,0.4)]"
        >
          AWS
        </span>
      );
    }
    if (t.includes('docker') || t.includes('container')) {
      return (
        <span 
          key={idx} 
          title="Docker Containers" 
          className="w-6 h-6 rounded-md bg-blue-600/25 border border-blue-500/60 flex items-center justify-center text-blue-400 font-mono font-black text-[9px] shadow-[0_0_8px_rgba(59,130,246,0.4)]"
        >
          DOC
        </span>
      );
    }
    if (t.includes('tensor') || t.includes('ai') || t.includes('llm') || t.includes('ml')) {
      return (
        <span 
          key={idx} 
          title="AI / ML Pipeline" 
          className="w-6 h-6 rounded-md bg-pink-500/25 border border-pink-500/60 flex items-center justify-center text-pink-400 font-mono font-black text-[10px] shadow-[0_0_8px_rgba(236,72,153,0.4)]"
        >
          AI
        </span>
      );
    }
    return (
      <span 
        key={idx} 
        title={tech} 
        className="w-6 h-6 rounded-md bg-cyan-500/25 border border-cyan-500/60 flex items-center justify-center text-cyan-300 font-mono font-black text-[9px] shadow-[0_0_8px_rgba(34,211,238,0.4)]"
      >
        {tech.slice(0, 3).toUpperCase()}
      </span>
    );
  };

  // If in Project Detail Mode (Screenshot 3), render ProjectDetailView directly
  if (selectedDetailProject) {
    return (
      <div className="min-h-screen bg-[#070912] text-white font-mono relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
        <GameHUD
          wantedLevel={wantedLevel}
          onWantedLevelChange={setWantedLevel}
          repoCount={36}
          activeArsenal="TYPESCRIPT // REACT 19"
          currentObjective={`OBJECTIVE: ${selectedDetailProject.title}`}
          onBackToMenu={() => setSelectedDetailProject(null)}
        />
        <main className="relative z-10 pt-16 sm:pt-24 pb-28 px-3 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
          <ProjectDetailView
            project={selectedDetailProject}
            projects={projects}
            onSelectProject={(p) => setSelectedDetailProject(p)}
            onBackToList={() => setSelectedDetailProject(null)}
            onNavigate={onNavigate}
          />
        </main>
      </div>
    );
  }

  // Projects List View (Screenshot 1)
  return (
    <div className="min-h-screen bg-[#070912] text-white font-mono relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
      
      {/* FULL-BLEED ILLUSTRATED BACKGROUND ART */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070912]">
        <img
          src="/themes/theme-25/background-desk.jpg"
          alt="Vice City Illustrated Project Showcase"
          className="w-full h-full object-cover object-right filter contrast-[1.05] brightness-[0.98] opacity-25 lg:opacity-100 transition-opacity duration-300"
        />

        {/* Soft mobile gradient mask */}
        <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-[#070912]/85 via-[#070912]/65 to-[#070912]/95" />

        {/* Ambient Neon Atmosphere Glow */}
        <div 
          className="absolute top-0 right-0 w-[550px] h-[550px] opacity-30 mix-blend-screen pointer-events-none"
          style={{
            background: `radial-gradient(circle at 75% 30%, ${tokens.accentColor}50 0%, ${tokens.highlightColor}30 50%, transparent 80%)`
          }}
        />

        {/* CRT Scanline Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)'
          }}
        />
      </div>

      {/* PERSISTENT GAME HEADS-UP DISPLAY (Top HUD) */}
      <GameHUD
        wantedLevel={wantedLevel}
        onWantedLevelChange={setWantedLevel}
        repoCount={36}
        activeArsenal="TYPESCRIPT // REACT 19"
        currentObjective={`OBJECTIVE: ${objectiveLabel}`}
        onBackToMenu={() => handleNavClick('start')}
      />

      {/* MAIN STAGE: LEFT NAV COLUMN + 3 STACKED INFO CARDS */}
      <main className="relative z-10 pt-16 sm:pt-24 pb-28 sm:pb-24 px-3 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-5 xl:gap-8 items-start">
          
          {/* COLUMN 1: TITLE BLOCK + LEFT NAV + BOTTOM-LEFT MINIMAP */}
          <aside className="w-full lg:w-56 xl:w-60 shrink-0 flex flex-col justify-between space-y-4 lg:space-y-6">
            
            <div className="space-y-3 sm:space-y-4">
              {/* PAGE TITLE BLOCK */}
              <div className="space-y-0 select-none">
                <h1 className="text-2xl sm:text-4xl xl:text-5xl font-black text-white uppercase tracking-tight font-sans leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  PROJECTS:
                </h1>
                <span 
                  className="text-xl sm:text-3xl xl:text-4xl italic block drop-shadow-[0_0_15px_rgba(244,114,182,0.9)] -mt-0.5 sm:-mt-1"
                  style={{ 
                    color: tokens.accentColor,
                    fontFamily: tokens.fontScript 
                  }}
                >
                  Case Studies
                </span>
              </div>

              {/* MOBILE HORIZONTAL NAV RAIL (< lg screens) */}
              <nav aria-label="Theme 25 Mobile Navigation" className="block lg:hidden pt-0.5">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-1 px-1">
                  {menuItems.map((item) => {
                    const isActive = item.id === 'projects';
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        onMouseEnter={() => soundFX.playMenuTick()}
                        className={`whitespace-nowrap px-3 py-1.5 rounded-full font-bold text-[10px] tracking-wider uppercase transition-all shrink-0 flex items-center gap-1 focus:outline-none ${
                          isActive
                            ? 'text-white border shadow-lg'
                            : 'text-white/80 hover:text-white bg-black/70 border border-white/10'
                        }`}
                        style={{
                          background: isActive ? tokens.activePillGradient : undefined,
                          borderColor: isActive ? tokens.borderColor : undefined,
                          boxShadow: isActive ? `0 0 15px ${tokens.accentGlow}` : undefined
                        }}
                      >
                        <span>{item.label}</span>
                        {isActive && <ChevronRight className="w-3 h-3 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* DESKTOP VERTICAL NAV COLUMN (>= lg screens) */}
              <nav aria-label="Theme 25 Navigation" className="hidden lg:block space-y-1 pt-1">
                {menuItems.map((item) => {
                  const isActive = item.id === 'projects';
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      onMouseEnter={() => soundFX.playMenuTick()}
                      className={`w-full text-left px-4 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-between group focus:outline-none ${
                        isActive
                          ? 'border text-white shadow-xl translate-x-1'
                          : 'text-white hover:text-cyan-300 transition-colors'
                      }`}
                      style={{
                        background: isActive ? tokens.activePillGradient : undefined,
                        borderColor: isActive ? tokens.borderColor : undefined,
                        boxShadow: isActive ? `0 0 20px ${tokens.accentGlow}` : undefined
                      }}
                    >
                      <span className="font-sans">
                        {item.label}
                      </span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-white translate-x-0.5 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* BOTTOM-LEFT MINIMAP CARD */}
            <div className="hidden lg:block pt-2">
              <div 
                className="border rounded-2xl p-3 shadow-2xl backdrop-blur-md space-y-2 max-w-[230px]"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.borderColor
                }}
              >
                {/* Vector Map Illustration */}
                <div className="relative h-28 rounded-xl bg-[#070a12] border border-cyan-400/40 overflow-hidden group">
                  <svg className="w-full h-full opacity-60" viewBox="0 0 160 120">
                    <path d="M120,0 Q130,50 140,80 Q150,110 160,120 L160,0 Z" fill="#0369a1" opacity="0.4" />
                    <path d="M10,20 L150,20 M10,50 L150,50 M10,85 L150,85 M35,10 L35,110 M75,10 L75,110 M115,10 L115,110" stroke="#38bdf8" strokeWidth="0.8" fill="none" opacity="0.4" />
                    <path d="M25,85 L50,85 L75,40 L115,40 L130,70" stroke={tokens.accentColor} strokeWidth="2.5" fill="none" strokeDasharray="3 3" />
                    <circle cx="75" cy="40" r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                    <text x="12" y="22" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">N</text>
                  </svg>
                  
                  {/* Sweep Beam */}
                  <div className="absolute inset-0 pointer-events-none origin-center animate-[spin_5s_linear_infinite]">
                    <div 
                      className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left"
                      style={{
                        background: `conic-gradient(from 0deg, ${tokens.accentColor}50 0deg, ${tokens.highlightColor}40 30deg, transparent 60deg)`
                      }}
                    />
                  </div>
                </div>

                {/* CURRENT OBJECTIVE Label & Headline */}
                <div className="space-y-0.5">
                  <span 
                    className="text-[9px] font-bold uppercase tracking-wider block font-mono"
                    style={{ color: tokens.accentColor }}
                  >
                    CURRENT OBJECTIVE
                  </span>
                  <span className="text-xs font-black text-white uppercase font-sans tracking-wide block truncate">
                    {objectiveLabel}
                  </span>
                </div>

                {/* Tactical Ammo / Skills Strip */}
                <div className="flex items-center justify-between bg-black/80 px-2 py-0.5 rounded-lg border border-white/10 text-[8px] font-mono text-cyan-400">
                  <span title="TypeScript ammo" className="hover:text-white cursor-pointer font-bold">TS</span>
                  <span className="text-white/20">•</span>
                  <span title="React weapon" className="hover:text-white cursor-pointer font-bold">REACT</span>
                  <span className="text-white/20">•</span>
                  <span title="Node engine" className="hover:text-white cursor-pointer font-bold">NODE</span>
                  <span className="text-white/20">•</span>
                  <span title="AWS Cloud" className="hover:text-white cursor-pointer font-bold text-amber-400">AWS</span>
                </div>
              </div>
            </div>

          </aside>

          {/* COLUMN 2: THREE STACKED INFO CARDS (~340px wide) */}
          <div className="w-full max-w-xl lg:w-[340px] xl:w-[360px] shrink-0 space-y-3.5 mx-auto lg:mx-0">
            
            {/* Project Switcher Bar */}
            <div className="flex items-center justify-between bg-black/85 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider font-mono">
                DOSSIER {selectedIdx + 1} OF {projects.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevProject}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
                  title="Previous Case Study"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-1 px-1">
                  {projects.slice(0, 5).map((_, pIdx) => (
                    <span
                      key={pIdx}
                      onClick={() => {
                        soundFX.playTabShift();
                        setSelectedIdx(pIdx);
                      }}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                        pIdx === selectedIdx ? 'scale-125' : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                      style={{
                        backgroundColor: pIdx === selectedIdx ? tokens.accentColor : undefined,
                        boxShadow: pIdx === selectedIdx ? `0 0 8px ${tokens.accentColor}` : undefined
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextProject}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
                  title="Next Case Study"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* THREE STACKED INFO CARDS WITH THEME 25 MOTION CONTRACT */}
            <MotionGrid themeId="25" className="space-y-3.5">
              
              {/* CARD 1 — "Project 01" summary card */}
              <MotionCard
                themeId="25"
                index={0}
                className="border-2 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md space-y-2.5"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.highlightColor,
                  boxShadow: `0 0 25px ${tokens.accentGlow}`
                }}
              >
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[11px] font-bold uppercase tracking-wider font-mono"
                    style={{ color: tokens.highlightColor }}
                  >
                    PROJECT 0{selectedIdx + 1}:
                  </span>
                  <span className="text-[8px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    VERIFIED DEPLOYMENT
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-black text-white font-sans uppercase tracking-tight leading-snug">
                  {activeProject.title}
                </h2>

                <div className="border-t border-white/10 pt-2 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-bold uppercase tracking-wider text-[11px]"
                      style={{ color: tokens.accentColor }}
                    >
                      TECH STACK
                    </span>
                    <div className="flex items-center gap-1.5">
                      {activeProject.technologies.slice(0, 4).map((tech, idx) => renderTechBadge(tech, idx))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-gray-300 uppercase text-[11px]">
                      PROJECT COMPLETION:
                    </span>
                    <span className="text-sm font-black text-white font-mono">
                      {completionPercentage}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 uppercase text-[11px]">
                      LINES OF CODE:
                    </span>
                    <span className="text-sm font-black text-white font-mono">
                      {linesOfCode.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 uppercase text-[11px]">
                      CLIENT SATISFACTION:
                    </span>
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(clientSatisfaction)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </MotionCard>

              {/* CARD 2 — "Features" box */}
              <MotionCard
                themeId="25"
                index={1}
                className="border-2 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md space-y-2"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.borderColor,
                  boxShadow: `0 0 25px ${tokens.accentGlow}`
                }}
              >
                <span 
                  className="text-[11px] font-bold uppercase tracking-wider block font-mono"
                  style={{ color: tokens.accentColor }}
                >
                  FEATURES
                </span>

                <ol className="space-y-1.5 text-xs text-gray-200 font-sans list-none">
                  {features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span 
                        className="font-black font-mono"
                        style={{ color: tokens.accentColor }}
                      >
                        {idx + 1}.
                      </span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ol>
              </MotionCard>

              {/* CARD 3 — Screenshot grid + Full-width CTA pill button */}
              <MotionCard
                themeId="25"
                index={2}
                className="border rounded-2xl p-4 shadow-2xl backdrop-blur-md space-y-2.5"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.borderColor
                }}
              >
                <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono border-b border-white/10 pb-1.5">
                  <span className="uppercase font-bold text-cyan-400">TELEMETRY SCREENSHOTS</span>
                  <span>2 × 3 MATRIX</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {galleryList.map((imgUrl, gIdx) => (
                    <div 
                      key={gIdx}
                      onClick={() => {
                        soundFX.playMenuTick();
                        setSelectedDetailProject(activeProject);
                      }}
                      className="aspect-video rounded-lg overflow-hidden border border-white/15 bg-black/60 hover:border-pink-500/90 transition-all cursor-pointer group relative shadow-md"
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Project Screenshot ${gIdx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-10 transition-opacity" />
                    </div>
                  ))}
                </div>

                {/* Primary Action Button: VIEW LIVE DEMO */}
                <button
                  onClick={handleLiveDemoClick}
                  onMouseEnter={() => soundFX.playMenuTick()}
                  className="w-full py-2.5 mt-1.5 rounded-full text-white font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all focus:outline-none cursor-pointer"
                  style={{
                    background: tokens.activePillGradient,
                    boxShadow: `0 0 20px ${tokens.accentGlow}`
                  }}
                >
                  <span>VIEW LIVE DEMO</span>
                  <span className="text-sm leading-none">›</span>
                </button>

                {/* Secondary Action: INSPECT FULL DOSSIER */}
                <button
                  onClick={() => {
                    soundFX.playTabShift();
                    setSelectedDetailProject(activeProject);
                  }}
                  onMouseEnter={() => soundFX.playMenuTick()}
                  className="w-full py-2 rounded-full bg-black/80 hover:bg-black text-gray-300 hover:text-white border border-white/15 hover:border-white/40 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>INSPECT FULL DOSSIER</span>
                </button>
              </MotionCard>

            </MotionGrid>

          </div>

        </div>
      </main>

      {/* Floating GPS Radar for Mobile Devices */}
      <aside aria-label="Tactical Radar" className="fixed bottom-6 left-4 z-40 lg:hidden">
        {showMobileRadar ? (
          <div className="space-y-2 bg-black/95 p-3 rounded-2xl border border-pink-500/50 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-pink-400 font-bold">TACTICAL RADAR</span>
              <button
                onClick={() => setShowMobileRadar(false)}
                className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-gray-300 font-bold"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="w-40 h-28 rounded-lg bg-[#090d16] border border-cyan-400/40 p-2 text-xs">
              <span className="text-pink-400 font-bold text-[9px] block">CURRENT OBJECTIVE</span>
              <span className="text-white font-bold text-xs">{objectiveLabel}</span>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowMobileRadar(true)}
            className="px-3.5 py-2 rounded-full bg-black/90 hover:bg-black text-[10px] text-cyan-400 border border-cyan-400/50 font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] flex items-center gap-1.5 backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 animate-spin" /> GPS RADAR
          </button>
        )}
      </aside>

      {/* CHARACTER OVERLAY ILLUSTRATION (Prajwal DL Vice City Style) */}
      <div className="fixed bottom-0 right-[2%] xl:right-[4%] z-20 pointer-events-none select-none hidden lg:block overflow-hidden max-h-[82vh] transition-all duration-300">
        <img
          src="/themes/theme-25/character-prajwal.png"
          alt="Prajwal DL Vice City Character Illustration"
          className="h-[75vh] xl:h-[82vh] w-auto object-contain object-bottom filter drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] brightness-105 contrast-105"
        />
      </div>

      {/* Bottom Right Quote */}
      <div className="fixed bottom-8 right-6 z-30 hidden md:block text-right pointer-events-none select-none">
        <p 
          className="text-sm sm:text-base italic drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]"
          style={{ 
            color: tokens.accentColor,
            fontFamily: tokens.fontScript 
          }}
        >
          &ldquo;Code is my weapon. Creativity is my world.&rdquo;
        </p>
        <span className="text-xs text-[#f59e0b] font-mono tracking-widest block font-bold">
          &mdash; Prajwal DL
        </span>
      </div>

    </div>
  );
};

export const Theme25ProjectsView: React.FC<ProjectsPageProps> = (props) => (
  <Theme25EraProvider>
    <Theme25ProjectsContent {...props} />
  </Theme25EraProvider>
);
