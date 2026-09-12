import React, { useState } from 'react';
import { 
  Terminal, Shield, Target, Award, Briefcase, Calendar, 
  ExternalLink, ArrowUpRight, GitBranch, Mail, Send, 
  Check, Star, Sparkles, LogIn, ChevronRight, FileText,
  DollarSign, Activity, AlertCircle, Compass, Users
} from 'lucide-react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Project, BlogPost } from '@/types/portfolio';
import { GameHUD } from './components/GameHUD';
import { RadarMinimap } from './components/RadarMinimap';
import { HeistDossierModal } from './components/HeistDossierModal';
import { soundFX } from './components/SoundEffects';

export const Home: React.FC<ThemePageProps> = ({
  identity,
  projects,
  blogPosts,
  experience,
  skillCategories,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'heists' | 'arsenal' | 'intel' | 'crew' | 'dispatch'>('heists');
  const [wantedLevel, setWantedLevel] = useState<number>(5);
  const [selectedHeist, setSelectedHeist] = useState<Project | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [showMobileRadar, setShowMobileRadar] = useState(false);

  // Tab switching with tactile sound
  const handleTabSwitch = (tab: 'dossier' | 'heists' | 'arsenal' | 'intel' | 'crew' | 'dispatch') => {
    soundFX.playTabShift();
    setActiveTab(tab);
  };

  const handleOpenHeist = (p: Project) => {
    soundFX.playHeistSelect();
    setSelectedHeist(p);
  };

  return (
    <div className="min-h-screen bg-[#08090f] text-gray-100 font-mono relative overflow-x-hidden selection:bg-[#f59e0b] selection:text-black">
      
      {/* Gritty Cinematic Vignette & Scanline Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)'
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-30 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)'
        }}
      />

      {/* Persistent Game Heads-Up Display */}
      <GameHUD 
        wantedLevel={wantedLevel}
        onWantedLevelChange={setWantedLevel}
        repoCount={36}
        activeArsenal="TYPESCRIPT // REACT 19"
      />

      {/* Main Pause-Menu Container */}
      <main className="relative z-10 pt-28 pb-36 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Pause Ribbon & Game Banner */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#f59e0b] text-black font-black px-3 py-1 text-sm tracking-wider uppercase">
                PAUSED
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans drop-shadow-md">
                {identity.name}
              </h1>
              <span className="hidden md:inline text-xs font-bold text-gray-400 border-l border-white/20 pl-3">
                {identity.role}
              </span>
            </div>

            {/* Quick Admin OS portal */}
            <button
              onClick={() => onNavigate('/admin')}
              className="self-start sm:self-auto px-3.5 py-1.5 rounded bg-black/60 hover:bg-[#f59e0b] text-gray-300 hover:text-black border border-white/20 hover:border-[#f59e0b] text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none shadow-md"
            >
              <LogIn className="w-3.5 h-3.5" /> ADMIN OS TERMINAL
            </button>
          </div>

          {/* Tabbed Pause-Menu Ribbon */}
          <nav aria-label="Pause Menu Tabs" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
            {[
              { id: 'heists', label: 'HEISTS / WORKS', count: projects.length },
              { id: 'dossier', label: 'OPERATIVE DOSSIER' },
              { id: 'arsenal', label: 'TECH ARSENAL' },
              { id: 'intel', label: 'FIELD INTEL', count: blogPosts.length },
              { id: 'crew', label: 'SYNDICATE CREW' },
              { id: 'dispatch', label: 'CONTRACT DISPATCH' },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSwitch(tab.id as any)}
                  onMouseEnter={() => soundFX.playMenuTick()}
                  className={`px-4 py-2.5 rounded-t-lg font-black text-xs sm:text-sm tracking-wider uppercase transition-all whitespace-nowrap focus:outline-none flex items-center gap-2 ${
                    isActive 
                      ? 'bg-[#f59e0b] text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] translate-y-[-2px]' 
                      : 'bg-black/60 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      isActive ? 'bg-black text-[#f59e0b]' : 'bg-white/10 text-gray-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: HEISTS / PROJECTS SHOWCASE                            */}
        {/* ============================================================ */}
        {activeTab === 'heists' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-sans tracking-wide">
                  ACTIVE SYNDICATE OPERATIONS ({projects.length})
                </h2>
                <p className="text-xs text-gray-400">
                  Select an operation to review mission architecture, security tier, and declassified execution logs.
                </p>
              </div>
              <span className="text-[11px] text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-3 py-1 rounded font-bold self-start">
                TOTAL ENTERPRISE VALUATION: $3,500,000+
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map(project => (
                <div
                  key={project.id}
                  onClick={() => handleOpenHeist(project)}
                  className="group cursor-pointer bg-[#0e111a]/90 border border-white/15 hover:border-[#f59e0b] rounded-xl overflow-hidden shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                >
                  {/* Card Art Plate */}
                  <div className="relative h-44 bg-black/80 overflow-hidden">
                    <img 
                      src={project.coverImage} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-emerald-400 border border-emerald-400/40">
                        PRODUCTION LIVE
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-3 text-right">
                      <span className="text-[10px] text-gray-400 uppercase font-mono block">Estimated Yield</span>
                      <span className="text-lg font-black text-[#f59e0b] font-sans drop-shadow-md">
                        $750,000+
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                        ROLE: <span className="text-gray-200">{project.role || 'Lead Engineer'}</span>
                      </div>
                      <h3 className="text-lg font-black text-white group-hover:text-[#f59e0b] transition-colors font-sans uppercase">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-sans">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-300 border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenHeist(project);
                        }}
                        className="w-full py-2 rounded bg-white/5 group-hover:bg-[#f59e0b] group-hover:text-black text-xs font-black uppercase transition-colors flex items-center justify-center gap-1.5 border border-white/10 group-hover:border-[#f59e0b]"
                      >
                        VIEW MISSION DOSSIER <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* TAB 2: OPERATIVE DOSSIER (BIO, CAREER, GITHUB TELEMETRY)      */}
        {/* ============================================================ */}
        {activeTab === 'dossier' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Operative Mugshot & Stats */}
              <div className="bg-[#0e111a]/90 border border-white/15 rounded-xl p-6 space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-0.5 rounded border border-[#f59e0b]/30">
                    CLASSIFIED FILE: #0076-PDL
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase font-sans">
                    {identity.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-bold">
                    PRIMARY STACK: TYPESCRIPT / FULLSTACK
                  </p>
                </div>

                <div className="h-48 rounded-lg bg-black/60 border border-white/10 overflow-hidden relative flex items-center justify-center">
                  <img 
                    src={identity.avatarUrl} 
                    alt={identity.name}
                    className="w-full h-full object-cover grayscale contrast-125" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 text-[10px] text-gray-300 font-mono">
                    STATUS: ACTIVE OPERATIVE
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-300 font-sans leading-relaxed border-t border-white/10 pt-4">
                  <p>{identity.bio}</p>
                </div>

                {/* Telemetry Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase block">GitHub Repos</span>
                    <span className="text-lg font-black text-white">36 Public</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase block">Field SLA</span>
                    <span className="text-lg font-black text-emerald-400">99.9% Uptime</span>
                  </div>
                </div>
              </div>

              {/* Verified Career Timeline */}
              <div className="lg:col-span-2 bg-[#0e111a]/90 border border-white/15 rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white uppercase font-sans tracking-wide">
                    VERIFIED SERVICE CHRONOLOGY ({experience.length} ROLES)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Chronological deployment history across enterprise support, frontend engineering, and platform architecture.
                  </p>
                </div>

                <div className="space-y-4">
                  {experience.map(exp => (
                    <div 
                      key={exp.id}
                      className="p-4 rounded-lg bg-black/40 border border-white/10 hover:border-[#f59e0b]/40 transition-colors space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <span className="text-sm font-black text-white uppercase font-sans">{exp.role}</span>
                          <span className="text-xs text-[#f59e0b] font-bold sm:ml-2">@ {exp.company}</span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded self-start sm:self-auto">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 font-sans leading-relaxed">
                        {exp.description}
                      </p>

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {exp.technologies.map((t, idx) => (
                            <span key={idx} className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* TAB 3: TECH ARSENAL (SKILLS WEAPON WHEEL)                     */}
        {/* ============================================================ */}
        {activeTab === 'arsenal' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-sans tracking-wide">
                OPERATIONAL WEAPONRY &amp; STACK ARSENAL
              </h2>
              <p className="text-xs text-gray-400">
                Core technical proficiencies categorized by discipline with verified competency ratings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillCategories.map(cat => (
                <div 
                  key={cat.id} 
                  className="bg-[#0e111a]/90 border border-white/15 rounded-xl p-5 space-y-4 shadow-lg"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h3 className="text-sm font-black text-[#f59e0b] uppercase tracking-wider font-sans">
                      {cat.category}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-mono">{cat.skills.length} ARMS</span>
                  </div>

                  <div className="space-y-3">
                    {cat.skills.map((skill, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-200 font-bold">{skill.name}</span>
                          <span className="text-emerald-400 font-bold">{skill.level || 90}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/60 rounded-xs overflow-hidden border border-white/10">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                            style={{ width: `${skill.level || 90}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* TAB 4: FIELD INTEL (BLOG / DISPATCHES)                       */}
        {/* ============================================================ */}
        {activeTab === 'intel' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-sans tracking-wide">
                INTERCEPTED FIELD DISPATCHES ({blogPosts.length})
              </h2>
              <p className="text-xs text-gray-400">
                Declassified technical transmissions on fullstack architecture, system resilience, and creator engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {blogPosts.map(post => (
                <div 
                  key={post.id}
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="group cursor-pointer p-5 rounded-xl bg-[#0e111a]/90 border border-white/15 hover:border-[#f59e0b] transition-all duration-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                      <span className="text-[#f59e0b] font-bold uppercase">{post.category}</span>
                      <span>{post.readingTimeMinutes || 4} MIN READ</span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-[#f59e0b] transition-colors font-sans uppercase">
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
                    <span className="text-[#f59e0b] text-[11px] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      READ INTEL →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* TAB 5: SYNDICATE CREW (TESTIMONIALS & ENDORSEMENTS)          */}
        {/* ============================================================ */}
        {activeTab === 'crew' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-sans tracking-wide">
                SYNDICATE REPUTATION &amp; ENDORSEMENTS
              </h2>
              <p className="text-xs text-gray-400">
                Verified client and collaborator statements regarding platform delivery, code quality, and operational reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  quote: "Prajwal engineered our entire multi-tenant operations hub with zero downtime. His architectural foresight saved us months of rework.",
                  author: "Enterprise Operations Lead",
                  firm: "Tier-1 SaaS Platform",
                  rating: 5
                },
                {
                  quote: "Fastest problem-solver I've worked with. Delivered our mission-critical HRMS suite on time and with 100% test coverage.",
                  author: "Product Director",
                  firm: "Fintech Venture",
                  rating: 5
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#0e111a]/90 border border-white/15 space-y-3">
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-sans italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-white/10 text-xs font-mono">
                    <span className="text-white font-bold block">{item.author}</span>
                    <span className="text-gray-500 text-[10px]">{item.firm}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* TAB 6: CONTRACT DISPATCH (CONTACT)                           */}
        {/* ============================================================ */}
        {activeTab === 'dispatch' && (
          <section className="space-y-6 animate-in fade-in duration-200 max-w-2xl mx-auto">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-3xl font-black text-white uppercase font-sans tracking-wide">
                INITIATE CONTRACT DISPATCH
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Direct encrypted transmission channel to Prajwal DL.
              </p>
            </div>

            <div className="bg-[#0e111a]/95 border border-[#f59e0b]/40 rounded-xl p-6 sm:p-8 space-y-5 shadow-2xl">
              {contactSent ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">TRANSMISSION RECEIVED</h3>
                  <p className="text-xs text-gray-400">
                    The operative will review your mission brief and dispatch a response within 24 hours.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    soundFX.playCashChime();
                    setContactSent(true);
                  }}
                  className="space-y-4 text-xs font-mono"
                >
                  <div className="space-y-1.5">
                    <label className="text-gray-300 font-bold uppercase">Contractor / Syndicate Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Acme Corp / Alex Mercer" 
                      className="w-full p-3 rounded bg-black/60 border border-white/15 focus:border-[#f59e0b] text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-300 font-bold uppercase">Secure Frequency (Email)</label>
                    <input 
                      required
                      type="email" 
                      placeholder="e.g. alex@acmecorp.com" 
                      className="w-full p-3 rounded bg-black/60 border border-white/15 focus:border-[#f59e0b] text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-300 font-bold uppercase">Mission Scope &amp; Target Valuation</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Describe target system architecture, timeline, and projected budget..." 
                      className="w-full p-3 rounded bg-black/60 border border-white/15 focus:border-[#f59e0b] text-white focus:outline-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded bg-[#f59e0b] hover:bg-[#d97706] text-black font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] focus:outline-none"
                  >
                    <Send className="w-4 h-4" /> TRANSMIT CONTRACT BRIEFING
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

      </main>

      {/* Docked GPS Radar Minimap in Bottom-Left */}
      <aside aria-label="Tactical Radar" className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <div className="hidden sm:block">
          <RadarMinimap 
            activeSection={activeTab}
            onWaypointClick={(sec) => handleTabSwitch(sec as any)}
          />
        </div>
        <div className="sm:hidden">
          {showMobileRadar ? (
            <div className="space-y-2 bg-black/90 p-2 rounded-xl border border-[#f59e0b]/40 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#f59e0b] font-bold">TACTICAL RADAR</span>
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
              className="px-3 py-1.5 rounded-full bg-black/90 hover:bg-black text-[10px] text-sky-400 border border-sky-400/50 font-bold shadow-xl flex items-center gap-1.5 backdrop-blur-md"
            >
              <Compass className="w-3.5 h-3.5 animate-spin" /> GPS RADAR
            </button>
          )}
        </div>
      </aside>

      {/* Heist Dossier Mission Modal */}
      <HeistDossierModal
        project={selectedHeist}
        onClose={() => setSelectedHeist(null)}
      />

    </div>
  );
};
