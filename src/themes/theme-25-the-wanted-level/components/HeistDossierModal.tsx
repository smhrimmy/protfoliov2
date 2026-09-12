import React, { useEffect } from 'react';
import { X, ExternalLink, GitBranch, Target, DollarSign, Shield, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { soundFX } from './SoundEffects';

interface HeistDossierModalProps {
  project: Project | null;
  onClose: () => void;
}

export const HeistDossierModal: React.FC<HeistDossierModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const handleLiveClick = () => {
    soundFX.playCashChime();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClose = () => {
    soundFX.playMenuTick();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200 font-mono"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0c0e17] border-2 border-[#f59e0b]/50 rounded-xl shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden text-gray-200"
      >
        
        {/* Top Caution Stripe */}
        <div 
          className="h-2 w-full opacity-80"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 15px, #000 15px, #000 30px)'
          }}
        />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-start justify-between gap-4 bg-gradient-to-r from-black/60 to-transparent">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] text-[10px] font-bold tracking-wider border border-[#f59e0b]/40">
                CLASSIFIED HEIST DOSSIER
              </span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED OPERATION
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
              {project.title}
            </h2>
            <p className="text-xs text-gray-400 font-mono tracking-wide">
              ROLE: <span className="text-white font-bold">{project.role || 'Principal Architect'}</span>
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/10 focus:outline-none"
            title="Abort Briefing"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Cover Art Plate if available */}
          {project.coverImage && (
            <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden border border-white/15 shadow-inner">
              <img 
                src={project.coverImage} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale-[30%] contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] bg-black/80 px-2.5 py-1 rounded text-amber-400 border border-amber-400/30">
                  SYSTEM OVERVIEW CAPTURE
                </span>
                <span className="text-[10px] text-gray-300 bg-black/70 px-2 py-0.5 rounded font-mono">
                  SLA: 99.9% LIVE
                </span>
              </div>
            </div>
          )}

          {/* Key Heist Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-black/50 border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Estimated Yield</span>
              <p className="text-lg font-black text-emerald-400 font-sans">$750,000+ VALUE</p>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Security Rating</span>
              <p className="text-lg font-black text-sky-400 font-sans">MAX TIER (ISO/A11Y)</p>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Field Status</span>
              <p className="text-lg font-black text-[#f59e0b] font-sans">PRODUCTION LIVE</p>
            </div>
          </div>

          {/* Mission Objective / Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-[#f59e0b]" /> Mission Intel &amp; Objective
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed font-sans bg-black/30 p-4 rounded-lg border border-white/5">
              {project.summary}
            </p>
          </div>

          {/* Tech Stack Equipment / Weaponry */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" /> Tactical Stack Equipped
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/15 text-xs text-amber-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Case Study Body if available */}
          {project.caseStudyBody && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Declassified Execution Log
              </h4>
              <div className="text-xs text-gray-400 space-y-3 leading-relaxed font-mono whitespace-pre-line bg-black/40 p-4 rounded-lg border border-white/5">
                {project.caseStudyBody}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/80 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold transition-colors focus:outline-none"
          >
            ABORT DOSSIER [ESC]
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playMenuTick()}
                className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none"
              >
                <GitBranch className="w-4 h-4 text-sky-400" /> Inspect Codebase
              </a>
            )}

            {project.liveUrl && (
              <button
                onClick={handleLiveClick}
                className="px-5 py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-black text-xs font-black transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)] focus:outline-none"
              >
                <ExternalLink className="w-4 h-4" /> LAUNCH INFILTRATION ↗
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
