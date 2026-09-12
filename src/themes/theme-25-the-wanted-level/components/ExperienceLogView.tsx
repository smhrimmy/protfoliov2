import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight, Shield, Terminal, ExternalLink } from 'lucide-react';
import { Experience } from '@/types/portfolio';
import { soundFX } from './SoundEffects';

interface ExperienceLogViewProps {
  experience: Experience[];
}

export const ExperienceLogView: React.FC<ExperienceLogViewProps> = ({ experience }) => {
  const [selectedExpId, setSelectedExpId] = useState<string>(experience[0]?.id || 'exp-1');

  const selectedExp = experience.find(e => e.id === selectedExpId) || experience[0];

  const handleSelect = (id: string) => {
    soundFX.playMenuTick();
    setSelectedExpId(id);
  };

  return (
    <div className="space-y-6 font-mono text-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest border border-cyan-500/30">
              FIELD MISSION ARCHIVE
            </span>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> VERIFIED CHRONOLOGY
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
            EXPERIENCE LOG
          </h2>
          <p className="text-xs text-gray-400">
            Chronological deployment history across enterprise support, frontend engineering, and platform architecture.
          </p>
        </div>

        <div className="text-right self-start sm:self-auto bg-black/80 px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-[9px] text-gray-400 block uppercase">Total Deployments</span>
          <span className="text-base font-black text-[#f59e0b] font-sans">{experience.length} ENTERPRISE ROLES</span>
        </div>
      </div>

      {/* 2-Column Grid: List on Left, Active Mission Briefing on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Vertical Mission Cards */}
        <div className="lg:col-span-6 space-y-3">
          {experience.map((exp, index) => {
            const isSelected = exp.id === selectedExpId;
            const opCode = `OP-0${index + 1}`;
            const dateSpan = `${exp.startDate} - ${exp.endDate}`;

            return (
              <div
                key={exp.id}
                onClick={() => handleSelect(exp.id)}
                className={`group cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-black/95 border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                    : 'bg-black/70 border-white/10 hover:border-cyan-400/50 hover:bg-black/85'
                }`}
              >
                {/* Thumbnail / Mission Badge */}
                <div className="w-16 h-16 rounded-lg bg-gray-900 border border-white/15 overflow-hidden shrink-0 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-cyan-500/30" />
                  <span className="font-mono text-xs font-black text-white tracking-widest relative z-10">
                    {opCode}
                  </span>
                  <div className="absolute bottom-1 right-1">
                    <span className={`w-2 h-2 rounded-full block ${exp.current ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
                  </div>
                </div>

                {/* Card Intel */}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#f59e0b] tracking-wider uppercase">
                      {exp.current ? 'STATUS: ACTIVE OPERATION' : 'STATUS: DEPLOYMENT COMPLETE'}
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono">
                      {dateSpan}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white font-sans uppercase group-hover:text-cyan-300 transition-colors truncate">
                    {exp.role}
                  </h3>

                  <p className="text-xs text-gray-300 font-sans">
                    CLIENT: <span className="font-bold text-white">{exp.company}</span> • {exp.location}
                  </p>

                  <p className="text-[11px] text-gray-400 font-sans line-clamp-2 leading-relaxed pt-0.5">
                    {exp.achievements && exp.achievements.length > 0 ? exp.achievements[0] : exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Declassified Mission Dossier */}
        <div className="lg:col-span-6">
          {selectedExp && (
            <div className="bg-[#0c0e17] border border-[#f59e0b]/50 rounded-xl p-6 shadow-2xl space-y-5 relative overflow-hidden">
              {/* Caution Diagonal Stripe */}
              <div 
                className="h-1.5 w-full absolute top-0 left-0 right-0 opacity-80"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #000 10px, #000 20px)'
                }}
              />

              <div className="flex items-start justify-between gap-3 pt-2">
                <div className="space-y-1">
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-cyan-400 border border-cyan-400/30 font-bold">
                    MISSION BRIEFING // {selectedExp.company.toUpperCase()}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-sans">
                    {selectedExp.role}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 pt-0.5">
                    <span className="flex items-center gap-1 text-gray-300">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> {selectedExp.startDate} - {selectedExp.endDate}
                    </span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" /> {selectedExp.location}
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                  selectedExp.current ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-gray-800 text-gray-400 border border-white/10'
                }`}>
                  {selectedExp.current ? 'ACTIVE' : 'COMPLETED'}
                </span>
              </div>

              {/* Highlights & Deliverables */}
              <div className="space-y-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Field Deliverables &amp; Impact
                </span>
                <ul className="space-y-2 text-xs text-gray-300 font-sans leading-relaxed">
                  {selectedExp.achievements && selectedExp.achievements.length > 0 ? (
                    selectedExp.achievements.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 bg-black/40 p-3 rounded-lg border border-white/5">
                        <span className="text-[#f59e0b] font-bold text-sm shrink-0">▸</span>
                        <span>{h}</span>
                      </li>
                    ))
                  ) : (
                    <li className="bg-black/40 p-3 rounded-lg border border-white/5">
                      {selectedExp.description}
                    </li>
                  )}
                </ul>
              </div>

              {/* Technologies Equipped */}
              {selectedExp.technologies && selectedExp.technologies.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                    Assigned Weaponry / Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-cyan-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer SLA */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-gray-400">
                <span>SECURITY CLEARANCE: LEVEL 5</span>
                <span className="text-emerald-400 font-bold">VERIFIED REPUTATION ★★★★★</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
