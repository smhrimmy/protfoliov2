import React from 'react';
import { Project } from '../../../types/portfolio';

interface ProjectModalProps {
  projects: Project[];
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ projects, onClose }) => {
  return (
    <div className="persona-modal-overlay">
      <div className="persona-modal-card max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold font-display">Project Showcase & Case Studies</h2>
            <p className="text-sm opacity-70">Explore full-stack software products and engineering solutions.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center font-bold text-xl"
          >
            &times;
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white/80 dark:bg-black/30 p-5 rounded-2xl border border-black/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <img 
                    src={proj.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'} 
                    alt={proj.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold font-display mb-2">{proj.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed mb-4">{proj.summary}</p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.technologies?.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 bg-black/10 dark:bg-white/10 text-xs rounded-md font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {proj.liveUrl && (
                <a 
                  href={proj.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 bg-[#FDCA3D] hover:bg-[#e8b520] text-black text-center font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Live Product Demo &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
