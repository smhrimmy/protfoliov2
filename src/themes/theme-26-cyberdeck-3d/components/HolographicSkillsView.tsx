import React, { useState } from 'react';
import { Rocket, Layout, Brain, Cpu, Terminal, Cloud, Zap, Sparkles } from 'lucide-react';
import { CyberModeTokens } from '../types/cyberdeck';
import { soundFX3D } from './SoundFX3D';

interface HolographicSkillsViewProps {
  tokens: CyberModeTokens;
}

export const HolographicSkillsView: React.FC<HolographicSkillsViewProps> = ({ tokens }) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillsData = [
    { name: 'REACT 19 / NEXT.JS', level: 95, icon: Rocket, category: 'Frontend' },
    { name: 'TYPESCRIPT STRICT', level: 92, icon: Layout, category: 'Core' },
    { name: 'THREE.JS / 3D CANVAS', level: 88, icon: Sparkles, category: 'Spatial' },
    { name: 'NODE.JS / EXPRESS', level: 85, icon: Cpu, category: 'Backend' },
    { name: 'AI AGENTS & LLMs', level: 82, icon: Brain, category: 'AI / ML' },
    { name: 'DOCKER / CLOUD INFRA', level: 80, icon: Cloud, category: 'Infra' }
  ];

  const handleSelectSkill = (name: string) => {
    soundFX3D.playKeyClick();
    setSelectedSkill(selectedSkill === name ? null : name);
  };

  return (
    <div className="space-y-6 font-mono text-gray-200 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span 
            className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border"
            style={{
              backgroundColor: `${tokens.primaryColor}20`,
              borderColor: tokens.primaryColor,
              color: tokens.primaryColor
            }}
          >
            HOLOGRAPHIC SKILLS MATRIX
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
            TECHNICAL TALENT TREE
          </h2>
        </div>

        <div className="flex items-center gap-3 bg-black/80 px-4 py-2 rounded-xl border border-white/15">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-white font-bold">POWER LEVEL: 98.4%</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Segmented Progress Bars */}
        <div className="lg:col-span-7 space-y-3">
          {skillsData.map((skill, idx) => {
            const Icon = skill.icon;
            const isSelected = selectedSkill === skill.name;
            const totalSegments = 14;
            const filledSegments = Math.round((skill.level / 100) * totalSegments);

            return (
              <div
                key={idx}
                onClick={() => handleSelectSkill(skill.name)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 backdrop-blur-xl ${
                  isSelected
                    ? 'bg-black/95 scale-[1.02]'
                    : 'bg-black/75 hover:bg-black/90'
                }`}
                style={{
                  borderColor: isSelected ? tokens.primaryColor : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isSelected ? `0 0 25px ${tokens.accentGlow}` : undefined
                }}
              >
                <div className="flex items-center gap-3 min-w-[170px]">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                    <Icon className="w-4 h-4" style={{ color: tokens.primaryColor }} />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-white font-sans uppercase tracking-wide block">
                      {skill.name}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">
                      TIER: {skill.category}
                    </span>
                  </div>
                </div>

                {/* Segmented Glowing Bar */}
                <div className="flex items-center gap-1 flex-1 justify-end sm:justify-center">
                  {[...Array(totalSegments)].map((_, sIdx) => {
                    const isFilled = sIdx < filledSegments;
                    return (
                      <div
                        key={sIdx}
                        className="h-5 w-2 rounded-xs transition-all duration-300"
                        style={{
                          backgroundColor: isFilled ? tokens.primaryColor : 'rgba(255, 255, 255, 0.08)',
                          boxShadow: isFilled ? `0 0 8px ${tokens.primaryColor}` : undefined
                        }}
                      />
                    );
                  })}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black font-sans" style={{ color: tokens.primaryColor }}>
                    {skill.level}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Holographic Nodes & Details */}
        <div className="lg:col-span-5 space-y-4">
          <div 
            className="border rounded-2xl p-5 backdrop-blur-xl space-y-4 shadow-2xl"
            style={{
              backgroundColor: tokens.cardBg,
              borderColor: tokens.hudBorderColor
            }}
          >
            <div className="border-b border-white/10 pb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                ACTIVE TALENT TELEMETRY
              </span>
              <span className="text-[9px] text-gray-400 font-mono">NODE #3D-99</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              {selectedSkill
                ? `Selected specialization '${selectedSkill}'. Fully integrated into production cloud platforms with zero-downtime tolerance.`
                : 'Click any skill row to inspect architectural depth and live capability metrics.'}
            </p>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">
                EQUIPPED TOOLCHAIN ARSENAL
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['TypeScript', 'React 19', 'Three.js', 'Next.js', 'Node.js', 'TailwindCSS', 'PostgreSQL', 'Docker', 'AWS', 'Redis', 'Python'].map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
