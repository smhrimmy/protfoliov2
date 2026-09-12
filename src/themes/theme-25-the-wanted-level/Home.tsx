import React, { useState, useEffect } from 'react';
import { 
  Play, User, Award, Briefcase, Calendar, 
  ExternalLink, ArrowUpRight, GitBranch, Mail, Send, 
  Check, Star, Sparkles, LogIn, ChevronRight, FileText,
  DollarSign, Activity, AlertCircle, Compass, Users,
  Zap, Radio, Shield, Target, Layers, LogOut
} from 'lucide-react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Project, BlogPost } from '@/types/portfolio';
import { GameHUD } from './components/GameHUD';
import { RadarMinimap } from './components/RadarMinimap';
import { HeistDossierModal } from './components/HeistDossierModal';
import { SkillsTreeView } from './components/SkillsTreeView';
import { ExperienceLogView } from './components/ExperienceLogView';
import { ContactSafeView } from './components/ContactSafeView';
import { ProjectCaseStudyView } from './components/ProjectCaseStudyView';
import { Theme25ProjectsView } from './Projects';
import { ViceCityBackdrop } from './components/ViceCityBackdrop';
import { soundFX } from './components/SoundEffects';

type ActiveTab = 'start' | 'dossier' | 'skills' | 'projects' | 'experience' | 'achievements' | 'academy' | 'contact';

export const Home: React.FC<ThemePageProps> = ({
  identity,
  projects,
  blogPosts,
  experience,
  skillCategories,
  onNavigate
}) => {
  const getInitialTab = (): ActiveTab => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      const valid: ActiveTab[] = ['start', 'dossier', 'skills', 'projects', 'experience', 'achievements', 'academy', 'contact'];
      if (valid.includes(hash)) return hash;
    }
    return 'projects';
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);
  const [wantedLevel, setWantedLevel] = useState<number>(5);
  const [selectedHeist, setSelectedHeist] = useState<Project | null>(null);
  const [showMobileRadar, setShowMobileRadar] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '') as ActiveTab;
        const valid: ActiveTab[] = ['start', 'dossier', 'skills', 'projects', 'experience', 'achievements', 'academy', 'contact'];
        if (valid.includes(hash)) {
          setActiveTab(hash);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const menuItems: Array<{ id: ActiveTab; label: string; count?: number }> = [
    { id: 'start', label: 'START GAME' },
    { id: 'dossier', label: 'ABOUT ME' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS', count: projects.length },
    { id: 'experience', label: 'EXPERIENCE', count: experience.length },
    { id: 'achievements', label: 'ACHIEVEMENTS', count: blogPosts.length },
    { id: 'academy', label: 'ACADEMY' },
    { id: 'contact', label: 'CONTACT' }
  ];

  // Tab switching with tactile sound
  const handleTabSwitch = (tab: ActiveTab) => {
    soundFX.playTabShift();
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
    }
  };

  const handleOpenHeist = (p: Project) => {
    soundFX.playHeistSelect();
    setSelectedHeist(p);
  };

  // Keyboard navigation: Q/E or ArrowLeft/ArrowRight or 1-7, and ESC for menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
      if (isInput || selectedHeist) return;

      if (e.key === 'q' || e.key === 'Q' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = menuItems.findIndex(m => m.id === activeTab);
        const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        handleTabSwitch(menuItems[prevIndex].id);
      } else if (e.key === 'e' || e.key === 'E' || e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = menuItems.findIndex(m => m.id === activeTab);
        const nextIndex = (currentIndex + 1) % menuItems.length;
        handleTabSwitch(menuItems[nextIndex].id);
      } else if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        const num = parseInt(e.key, 10) - 1;
        if (num >= 0 && num < menuItems.length) {
          handleTabSwitch(menuItems[num].id);
        }
      } else if (e.key === 'Escape') {
        handleTabSwitch('start');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, selectedHeist]);

  // If projects is active, render the dedicated Theme 25 Projects showcase page
  if (activeTab === 'projects') {
    return (
      <Theme25ProjectsView
        projects={projects}
        onNavigate={onNavigate}
        activeNav="projects"
        onSelectNav={(tab) => handleTabSwitch(tab as any)}
      />
    );
  }

  // Objective string based on current tab
  const getObjectiveForTab = (): string => {
    switch (activeTab) {
      case 'start': return 'INITIATE OPERATIVE MISSION BRIEFING';
      case 'dossier': return 'INSPECT OPERATIVE BACKGROUND & CV';
      case 'skills': return 'UPGRADE TALENT TREE PROGRESSION';
      case 'experience': return 'VERIFY ENTERPRISE SERVICE RECORD';
      case 'achievements': return 'ANALYZE FIELD TRANSMISSIONS';
      case 'academy': return 'COMPLETE OPERATIVE CREDENTIAL AUDIT';
      case 'contact': return 'ESTABLISH SECURE FREQUENCY';
      default: return 'DEEP-DIVE INTO PRODUCTION PLATFORMS';
    }
  };

  return (
    <div className="min-h-screen bg-[#080911] text-gray-100 font-mono relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
      
      {/* Authentic Vice City Backdrop: Sunset Skyline, Searchlight & Palm Fronds */}
      <ViceCityBackdrop activeTab={activeTab} />

      {/* Persistent Game Heads-Up Display */}
      <GameHUD 
        wantedLevel={wantedLevel}
        onWantedLevelChange={setWantedLevel}
        repoCount={36}
        activeArsenal="TYPESCRIPT // REACT 19"
        currentObjective={getObjectiveForTab()}
        onBackToMenu={() => handleTabSwitch('start')}
      />

      {/* Main 2-Column Vice City Pause Menu Layout */}
      <main className="relative z-10 pt-28 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* ============================================================ */}
          {/* LEFT RAIL: VERTICAL PAUSE MENU (From Screenshot 1, 2, 3)     */}
          {/* ============================================================ */}
          <aside className="w-full lg:w-72 shrink-0 space-y-4">
            
            {/* Brand Masthead: PRAJWAL BUILDS / Portfolio */}
            <div className="bg-[#0c0e17]/90 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-3">
              <div className="border-b border-white/10 pb-3">
                <h1 className="text-2xl font-black text-white uppercase tracking-tight font-sans">
                  PRAJWAL BUILDS
                </h1>
                <span 
                  className="text-xl text-pink-400 font-serif italic block drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]"
                  style={{ fontFamily: 'Brush Script MT, cursive, serif' }}
                >
                  Portfolio
                </span>
                <p className="text-[10px] text-cyan-400 font-mono pt-1">
                  FULLSTACK SYSTEMS ARCHITECT
                </p>
              </div>

              {/* Vertical Menu Buttons */}
              <nav aria-label="Game Pause Navigation" className="space-y-1.5">
                {menuItems.map((item, idx) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabSwitch(item.id)}
                      onMouseEnter={() => soundFX.playMenuTick()}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-between group focus:outline-none ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500/30 to-purple-600/30 border-2 border-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] translate-x-1'
                          : 'bg-black/50 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono ${isActive ? 'text-pink-400 font-bold' : 'text-gray-600'}`}>
                          0{idx + 1}
                        </span>
                        <span className="font-sans group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.count !== undefined && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            isActive ? 'bg-pink-500 text-black font-bold' : 'bg-white/10 text-gray-500'
                          }`}>
                            {item.count}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                          isActive ? 'text-pink-400 translate-x-0.5' : 'text-gray-600 opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                    </button>
                  );
                })}

                {/* EXIT GAME / ADMIN OS BUTTON */}
                <button
                  onClick={() => onNavigate('/admin')}
                  onMouseEnter={() => soundFX.playMenuTick()}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-between text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/40 focus:outline-none pt-2 mt-2 border-t"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="w-3.5 h-3.5 text-amber-400" /> EXIT GAME (ADMIN OS)
                  </span>
                  <span className="text-[9px] text-gray-500 font-mono">/admin</span>
                </button>
              </nav>
            </div>

            {/* Tactical Key Controller Tips */}
            <div className="hidden lg:block bg-black/60 border border-white/10 rounded-xl p-3 text-[9px] text-gray-400 space-y-1">
              <span className="text-[#f59e0b] font-bold block">TACTICAL CONTROLLER:</span>
              <div className="flex items-center justify-between">
                <span>[Q / ↑] PREV SECTION</span>
                <span className="text-white/30">|</span>
                <span>[E / ↓] NEXT SECTION</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[1-7] QUICK LEAP</span>
                <span className="text-white/30">|</span>
                <span>[ESC] START MENU</span>
              </div>
            </div>

            {/* Tactical Radar for Desktop (Cleanly docked beneath the menu) */}
            <div className="hidden lg:flex flex-col items-center pt-2">
              <RadarMinimap 
                activeSection={activeTab}
                onWaypointClick={(sec) => handleTabSwitch(sec as any)}
              />
            </div>

          </aside>

          {/* ============================================================ */}
          {/* RIGHT STAGE: CONTEXTUAL SCREEN CONTENT                       */}
          {/* ============================================================ */}
          <div className="flex-1 w-full min-w-0 space-y-6">

            {/* TAB: START GAME (Hero Overview) */}
            {activeTab === 'start' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Hero Showcase Diorama Box */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#120a1f] via-[#0c0e17] to-black border-2 border-pink-500/40 p-6 sm:p-10 shadow-[0_0_40px_rgba(236,72,153,0.2)]">
                  {/* Decorative Neon Palm/City Sunset Glow */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/20 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-2xl space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" /> VICE CITY EDITION V2.5
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-sans leading-none">
                      PRAJWAL DL
                    </h2>

                    <p className="text-base sm:text-xl text-cyan-300 font-sans font-bold tracking-wide">
                      Fullstack Systems Architect &bull; Web Performance Advisor
                    </p>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                      Specializing in multi-tenant SaaS engineering, resilient DNS infrastructure, high-contrast reactive interfaces, and mission-critical cloud deployments.
                    </p>

                    {/* Telemetry Stats Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      <div className="bg-black/80 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-gray-400 uppercase block font-bold">Total Operations</span>
                        <span className="text-xl font-black text-white font-sans">36 REPOSITORIES</span>
                      </div>
                      <div className="bg-black/80 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-gray-400 uppercase block font-bold">Field Reliability</span>
                        <span className="text-xl font-black text-emerald-400 font-sans">99.9% UPTIME</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1 bg-black/80 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-gray-400 uppercase block font-bold">Valuation</span>
                        <span className="text-xl font-black text-[#f59e0b] font-sans">$3,600,000</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4">
                      <button
                        onClick={() => handleTabSwitch('projects')}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 focus:outline-none flex items-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" /> LAUNCH PROJECTS &bull; CASE STUDIES
                      </button>

                      <button
                        onClick={() => handleTabSwitch('contact')}
                        className="px-6 py-3 rounded-xl bg-black/80 hover:bg-black text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 hover:border-cyan-400/50 focus:outline-none flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4 text-cyan-400" /> CONTACT SAFE
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* TAB: ABOUT ME / OPERATIVE DOSSIER */}
            {activeTab === 'dossier' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Mugshot & Telemetry */}
                  <div className="lg:col-span-5 bg-[#0c0e17] border border-white/15 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="space-y-1 border-b border-white/10 pb-3">
                      <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded border border-pink-500/30">
                        CLASSIFIED DOSSIER #0076-PDL
                      </span>
                      <h3 className="text-2xl font-black text-white uppercase font-sans">
                        {identity.name}
                      </h3>
                      <p className="text-xs text-emerald-400 font-bold">
                        CLEARANCE: LEVEL 5 // ACTIVE OPERATIVE
                      </p>
                    </div>

                    <div className="h-56 rounded-xl bg-black/70 border border-white/10 overflow-hidden relative flex items-center justify-center">
                      <img 
                        src={identity.avatarUrl} 
                        alt={identity.name}
                        className="w-full h-full object-cover grayscale contrast-125" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-3 text-[10px] text-cyan-300 font-mono">
                        LOCATION: BENGALURU, INDIA
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {identity.bio}
                    </p>
                  </div>

                  {/* Operational Background */}
                  <div className="lg:col-span-7 bg-[#0c0e17] border border-white/15 rounded-2xl p-6 space-y-5 shadow-xl">
                    <div className="border-b border-white/10 pb-3">
                      <h3 className="text-xl font-black text-white uppercase font-sans tracking-wide">
                        OPERATIVE CAPABILITY BRIEFING
                      </h3>
                      <p className="text-xs text-gray-400">
                        Verified competency in designing high-throughput applications, zero-downtime migrations, and enterprise cloud support.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                        <span className="text-[10px] text-cyan-400 font-bold uppercase">PRIMARY WEAPONRY</span>
                        <p className="text-sm font-black text-white font-sans">TYPESCRIPT / REACT 19 / NODE.JS / NEXT.JS</p>
                        <p className="text-xs text-gray-400 font-sans">Type-safe component pipelines, streaming SSR, and modular architectures.</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                        <span className="text-[10px] text-pink-400 font-bold uppercase">INFRASTRUCTURE &amp; CLOUD</span>
                        <p className="text-sm font-black text-white font-sans">AWS / DOCKER / POSTGRESQL / REDIS</p>
                        <p className="text-xs text-gray-400 font-sans">Containerized microservices, high-concurrency caching, and cloud DNS routing.</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">DIAGNOSTIC TELEMETRY</span>
                        <p className="text-sm font-black text-white font-sans">DNS MIGRATION / SSL HANDSHAKE / WEB VITALS</p>
                        <p className="text-xs text-gray-400 font-sans">Author of enterprise hosting runbooks and CDN optimization strategies.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SKILLS TREE (From Screenshot 1) */}
            {activeTab === 'skills' && (
              <SkillsTreeView skillCategories={skillCategories} />
            )}

            {/* TAB: EXPERIENCE LOG (From Screenshot 1) */}
            {activeTab === 'experience' && (
              <ExperienceLogView experience={experience} />
            )}

            {/* TAB: ACHIEVEMENTS & INTEL */}
            {activeTab === 'achievements' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight">
                    ACHIEVEMENTS &bull; FIELD INTEL
                  </h2>
                  <p className="text-xs text-gray-400">
                    Declassified technical articles, platform performance certifications, and verified credentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {blogPosts.map(post => (
                    <div 
                      key={post.id}
                      onClick={() => onNavigate(`/blog/${post.slug}`)}
                      className="group cursor-pointer p-5 rounded-2xl bg-[#0c0e17] border border-white/15 hover:border-pink-500/60 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xl"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                          <span className="text-pink-400 font-bold uppercase">{post.category}</span>
                          <span>{post.readingTimeMinutes || 4} MIN READ</span>
                        </div>

                        <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors font-sans uppercase">
                          {post.title}
                        </h3>

                        <p className="text-xs text-gray-400 font-sans line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>
                        <span className="text-pink-400 text-[11px] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          READ INTEL &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ACADEMY (Technical Mastery & Training) */}
            {activeTab === 'academy' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest border border-emerald-500/30">
                      TECHNICAL MASTERY // ADVANCED CREDENTIALS
                    </span>
                    <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-cyan-400" /> GRADUATION LEVEL 100
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
                    OPERATIVE ACADEMY
                  </h2>
                  <p className="text-xs text-gray-400">
                    Formal engineering background, continuous cloud certifications, and high-intensity architectural training.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0c0e17] border border-cyan-400/40 space-y-3 shadow-xl">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                      DEGREE &amp; INSTITUTION
                    </span>
                    <h3 className="text-lg font-black text-white font-sans uppercase">
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <p className="text-xs text-amber-400 font-mono">
                      St. Aloysius College • Mangalore, Karnataka
                    </p>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      Graduated with high distinction in core computer science, relational database engineering, data structures, and distributed systems.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0c0e17] border border-pink-500/40 space-y-3 shadow-xl">
                    <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block">
                      PROFESSIONAL TRACK
                    </span>
                    <h3 className="text-lg font-black text-white font-sans uppercase">
                      Fullstack Web &amp; Cloud Infrastructure
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono">
                      Continuous Engineering Mastery • 2024 - 2026
                    </p>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      Advanced self-directed coursework and verified project deployment in React 19, TypeScript strict mode, Next.js streaming, and DNS hosting migrations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CONTACT SAFE (From Screenshot 1) */}
            {activeTab === 'contact' && (
              <ContactSafeView />
            )}

            {/* Bottom Right Quote (from Screenshot 1, 2, 3) */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 font-mono">
                SECURE TERMINAL BENGALURU &bull; ENCRYPTED TRANSMISSION
              </div>

              <div className="text-right space-y-0.5">
                <p 
                  className="text-sm sm:text-base text-pink-300 font-serif italic drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]"
                  style={{ fontFamily: 'Brush Script MT, cursive, serif' }}
                >
                  &ldquo;Code is my weapon. Creativity is my world.&rdquo;
                </p>
                <span className="text-xs text-[#f59e0b] font-mono tracking-widest block font-bold">
                  &mdash; Prajwal
                </span>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Floating GPS Radar for Mobile / Tablet Devices */}
      <aside aria-label="Tactical Radar" className="fixed bottom-6 left-4 z-40 lg:hidden">
        {showMobileRadar ? (
          <div className="space-y-2 bg-black/95 p-2.5 rounded-2xl border border-pink-500/50 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-pink-400 font-bold">TACTICAL RADAR</span>
              <button
                onClick={() => setShowMobileRadar(false)}
                className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-gray-300 font-bold"
              >
                ✕ CLOSE
              </button>
            </div>
            <RadarMinimap 
              activeSection={activeTab}
              onWaypointClick={(sec) => {
                handleTabSwitch(sec as any);
                setShowMobileRadar(false);
              }}
            />
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

      {/* Persistent Bottom Vice City Ticker Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-black/95 border-t border-white/10 px-4 py-1.5 text-center text-[9px] sm:text-[10px] text-gray-400 font-mono tracking-widest select-none backdrop-blur-md">
        <span className="text-pink-400 font-bold">VICE CITY INSPIRED</span>
        <span className="mx-2 text-white/20">&bull;</span>
        <span className="text-cyan-400 font-bold">BUILD DIFFERENT</span>
        <span className="mx-2 text-white/20">&bull;</span>
        <span className="text-[#f59e0b] font-bold">STAY LEGENDARY</span>
        <span className="mx-2 text-white/20 hidden sm:inline">&bull;</span>
        <span className="text-gray-500 hidden sm:inline">PORTFOLIO COMPILATION V2.5</span>
      </footer>

      {/* Heist Dossier Mission Modal */}
      <HeistDossierModal
        project={selectedHeist}
        onClose={() => setSelectedHeist(null)}
      />

    </div>
  );
};
