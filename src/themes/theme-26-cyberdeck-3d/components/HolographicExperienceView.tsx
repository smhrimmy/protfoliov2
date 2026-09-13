import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { Experience } from '@/types/portfolio';
import { CyberModeTokens } from '../types/cyberdeck';

interface HolographicExperienceViewProps {
  experience: Experience[];
  tokens: CyberModeTokens;
}

export const HolographicExperienceView: React.FC<HolographicExperienceViewProps> = ({
  experience,
  tokens
}) => {
  return (
    <div className="space-y-6 font-mono text-gray-200 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <span 
          className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border"
          style={{
            backgroundColor: `${tokens.primaryColor}20`,
            borderColor: tokens.primaryColor,
            color: tokens.primaryColor
          }}
        >
          ENTERPRISE TIMELINE // VERIFIED SERVICE RECORD
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
          EXPERIENCE DATASTREAM
        </h2>
      </div>

      {/* Experience Timeline Stream */}
      <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
        {experience.map((exp, idx) => (
          <div
            key={exp.id || idx}
            className="relative pl-10 group"
          >
            {/* Timeline node */}
            <div 
              className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 transform -translate-x-1/2 transition-transform group-hover:scale-125"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.primaryColor,
                boxShadow: `0 0 10px ${tokens.primaryColor}`
              }}
            />

            <div 
              className="border rounded-2xl p-5 sm:p-6 space-y-3 backdrop-blur-xl shadow-2xl transition-all hover:border-cyan-400/60"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.hudBorderColor
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-lg font-black text-white font-sans uppercase">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-bold text-cyan-400 block pt-0.5">
                    {exp.company}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}</span>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {exp.description}
              </p>

              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">VERIFIED DELIVERABLES:</span>
                  <ul className="space-y-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-xs text-gray-300 font-sans flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
