import React, { useState } from 'react';
import { ExternalLink, Eye, GitBranch, Code2 } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { CyberModeTokens } from '../types/cyberdeck';
import { soundFX3D } from './SoundFX3D';

interface HolographicProjectsViewProps {
  projects: Project[];
  tokens: CyberModeTokens;
  onNavigate: (path: string) => void;
}

export const HolographicProjectsView: React.FC<HolographicProjectsViewProps> = ({
  projects,
  tokens,
  onNavigate
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenModal = (p: Project) => {
    soundFX3D.playHoloChime();
    setSelectedProject(p);
  };

  return (
    <div className="space-y-6 font-mono text-gray-200 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <span 
            className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border"
            style={{
              backgroundColor: `${tokens.primaryColor}20`,
              borderColor: tokens.primaryColor,
              color: tokens.primaryColor
            }}
          >
            PRODUCTION SYSTEMS // {projects.length} REPOSITORIES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
            FEATURED PROJECTS SHOWCASE
          </h2>
        </div>
      </div>

      {/* 3D Interactive Floating Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleOpenModal(project)}
            className="group cursor-pointer border rounded-2xl p-5 space-y-4 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            style={{
              backgroundColor: tokens.cardBg,
              borderColor: tokens.hudBorderColor
            }}
          >
            {/* Ambient Corner Glow */}
            <div 
              className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-20 blur-xl pointer-events-none group-hover:opacity-60 transition-opacity"
              style={{ backgroundColor: tokens.primaryColor }}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px]">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400 font-bold uppercase">
                  {project.role || 'FULLSTACK'}
                </span>
                <span className="text-gray-400 font-mono">ID #{project.id.slice(0, 6)}</span>
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors font-sans uppercase">
                {project.title}
              </h3>

              <p className="text-xs text-gray-300 font-sans line-clamp-3 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-3">
              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-1">
                {(project.technologies || []).slice(0, 3).map((tech: string, idx: number) => (
                  <span key={idx} className="text-[9px] bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/10 font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span 
                  className="font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  style={{ color: tokens.primaryColor }}
                >
                  <Eye className="w-3.5 h-3.5" /> INSPECT CASE STUDY &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: tokens.cardBg,
              borderColor: tokens.primaryColor,
              boxShadow: `0 0 35px ${tokens.accentGlow}`
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-xs font-bold text-gray-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 cursor-pointer"
            >
              ✕ CLOSE [ESC]
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                VERIFIED ARCHITECTURE DOSSIER
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans">
                {selectedProject.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              {selectedProject.summary || selectedProject.caseStudyBody}
            </p>

            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">TECHNICAL STACK:</span>
              <div className="flex flex-wrap gap-2">
                {(selectedProject.technologies || []).map((tech: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-amber-300 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase text-black flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: tokens.primaryColor }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH LIVE DEMO</span>
                </a>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
