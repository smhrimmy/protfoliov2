import React, { useState } from 'react';
import { ExternalLink, GitBranch, ArrowUpRight, Star, Shield, Target, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { soundFX } from './SoundEffects';

interface ProjectCaseStudyViewProps {
  projects: Project[];
  onOpenDossier: (project: Project) => void;
}

export const ProjectCaseStudyView: React.FC<ProjectCaseStudyViewProps> = ({
  projects,
  onOpenDossier
}) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const activeProject = projects[activeProjectIdx] || projects[0];

  const handleSelectProject = (idx: number) => {
    soundFX.playTabShift();
    setActiveProjectIdx(idx);
  };

  const handleLiveDemoClick = () => {
    soundFX.playCashChime();
    if (activeProject.liveUrl) {
      window.open(activeProject.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6 font-mono text-gray-200">
      {/* Title Header matching Screenshot 2 & 3: "PROJECTS: Case Studies" */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight">
            PROJECTS:
          </h2>
          <span 
            className="text-2xl sm:text-4xl text-pink-400 font-serif italic drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]"
            style={{ fontFamily: 'Brush Script MT, cursive, serif' }}
          >
            Case Studies
          </span>
        </div>

        <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-lg border border-pink-500/40">
          <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
            OPERATION {activeProjectIdx + 1} OF {projects.length}
          </span>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Project Detail Block */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Cyan/Pink Bordered Tactical Card (Screenshot 2) */}
          <div className="bg-[#0c0e17] border-2 border-cyan-400/50 rounded-2xl p-5 sm:p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)] space-y-5">
            
            {/* Top Row: Title & Completion Metrics */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase block">
                  PROJECT 0{activeProjectIdx + 1}: ENTERPRISE PLATFORM
                </span>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-white font-sans uppercase tracking-tight leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  ROLE: <span className="text-amber-400 font-bold">{activeProject.role || 'Principal Fullstack Architect'}</span>
                </p>
              </div>

              {/* Completion & Satisfaction Badges */}
              <div className="flex items-center gap-3 self-start sm:self-auto bg-black/60 p-2.5 rounded-xl border border-white/10 shrink-0">
                <div className="text-center px-2 border-r border-white/10">
                  <span className="text-[9px] text-gray-400 uppercase block font-bold">COMPLETION</span>
                  <span className="text-sm font-black text-emerald-400 font-sans">100% LIVE</span>
                </div>
                <div className="text-center px-2">
                  <span className="text-[9px] text-gray-400 uppercase block font-bold">RATING</span>
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Row */}
            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                EQUIPPED TECH ARSENAL
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-black/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary & Core Features Box (Screenshot 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block">
                  MISSION ARCHITECTURE &amp; SCOPE
                </span>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  {activeProject.summary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                  DEPLOYED CAPABILITIES
                </span>
                <ul className="space-y-1.5 text-xs text-gray-300 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-pink-400 font-bold">1.</span> Enterprise High-Availability Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">2.</span> Real-Time Analytics &amp; Reactive Telemetry
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">3.</span> Zero-Downtime Data &amp; Hosting Pipelines
                  </li>
                </ul>
              </div>
            </div>

            {/* Cover Image Plate & Holographic Overlay */}
            {activeProject.coverImage && (
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src={activeProject.coverImage}
                  alt={activeProject.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Holographic Stats Tag */}
                <div className="absolute top-3 left-3 bg-black/85 px-3 py-1 rounded-lg border border-pink-500/50 text-pink-400 text-[10px] font-bold tracking-wider backdrop-blur-md">
                  SYSTEM OVERVIEW CAPTURE
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs text-gray-200 bg-black/80 px-2.5 py-1 rounded font-mono border border-white/10">
                    ESTIMATED VALUATION: <span className="text-emerald-400 font-bold">$750,000+</span>
                  </span>
                  <button
                    onClick={() => onOpenDossier(activeProject)}
                    className="text-xs text-amber-300 hover:text-white bg-black/80 px-3 py-1 rounded border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-1 font-bold"
                  >
                    FULL BRIEFING [ESC] →
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => onOpenDossier(activeProject)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors border border-white/15 focus:outline-none flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-cyan-400" /> DECLASSIFIED CASE STUDY
              </button>

              <div className="flex items-center gap-2">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playMenuTick()}
                    className="px-4 py-3 rounded-xl bg-black/80 hover:bg-black text-gray-300 hover:text-white text-xs font-bold transition-colors border border-white/15 flex items-center gap-1.5 focus:outline-none"
                  >
                    <GitBranch className="w-4 h-4 text-sky-400" /> CODEBASE
                  </a>
                )}

                {activeProject.liveUrl && (
                  <button
                    onClick={handleLiveDemoClick}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-black tracking-wider transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 focus:outline-none"
                  >
                    <ExternalLink className="w-4 h-4" /> VIEW LIVE DEMO ↗
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: "OTHER PROJECTS" list (Screenshot 3) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0c0e17] border border-white/15 rounded-2xl p-5 space-y-4 shadow-xl">
            <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest block border-b border-white/10 pb-2">
              ACTIVE SYNDICATE CATALOG
            </span>

            <div className="space-y-2">
              {projects.map((proj, idx) => {
                const isCurrent = idx === activeProjectIdx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group focus:outline-none ${
                      isCurrent
                        ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                        : 'bg-black/60 border-white/10 hover:border-cyan-400/60 hover:bg-black/80 text-gray-300'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <span className="text-[9px] font-mono block text-gray-400">
                        OP-0{idx + 1} // {proj.role || 'FULLSTACK'}
                      </span>
                      <span className="text-xs font-black font-sans uppercase truncate block group-hover:text-cyan-300">
                        {proj.title}
                      </span>
                    </div>

                    <span className={`text-xs font-black px-2 py-1 rounded shrink-0 ${
                      isCurrent ? 'bg-pink-500 text-black' : 'text-gray-500 group-hover:text-white'
                    }`}>
                      {isCurrent ? 'ACTIVE' : '[+]'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Mission Objective Card */}
          <div className="p-4 rounded-xl bg-black/70 border border-cyan-500/30 space-y-1 text-xs">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
              CURRENT BRIEFING OBJECTIVE
            </span>
            <p className="text-gray-300 font-sans text-xs leading-relaxed">
              Analyze case study architecture or launch the interactive live demo to inspect verified client deliverables.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
