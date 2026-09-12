import React, { useState } from 'react';
import { Rocket, Sparkles, Brain, Cpu, Layout, Cloud, Shield, Terminal, Award, Zap } from 'lucide-react';
import { SkillCategory } from '@/types/portfolio';
import { soundFX } from './SoundEffects';

interface SkillsTreeViewProps {
  skillCategories: SkillCategory[];
}

export const SkillsTreeView: React.FC<SkillsTreeViewProps> = ({ skillCategories }) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const defaultSkills = [
    { name: 'Full-Stack Dev', level: 95, icon: Rocket, category: 'Core Mastery' },
    { name: 'UI/UX & Design Systems', level: 90, icon: Layout, category: 'Frontend' },
    { name: 'AI Implementation & LLMs', level: 88, icon: Brain, category: 'AI / ML' },
    { name: 'Backend Systems & Microservices', level: 92, icon: Cpu, category: 'Backend' },
    { name: 'Cloud, Docker & DevOps', level: 85, icon: Cloud, category: 'Infra' },
    { name: 'Performance & Web Vitals', level: 94, icon: Zap, category: 'Optimization' },
  ];

  const handleSkillClick = (name: string) => {
    soundFX.playMenuTick();
    setSelectedSkill(name === selectedSkill ? null : name);
  };

  return (
    <div className="space-y-6 font-mono text-gray-200">
      {/* View Header with Telemetry Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 text-[10px] font-bold tracking-widest border border-pink-500/30">
              TACTICAL TALENT TREE
            </span>
            <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 fill-cyan-400" /> MAX LEVEL REACHED
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
            SKILLS TREE
          </h2>
          <p className="text-xs text-gray-400">
            Field-tested competencies across fullstack engineering, reactive design systems, and cloud infrastructure.
          </p>
        </div>

        {/* Top Right Mini HUD: Skills Points, Power Up, Mastery */}
        <div className="flex items-center gap-3 bg-black/80 p-3 rounded-xl border border-white/10 backdrop-blur-md self-start lg:self-auto">
          <div className="space-y-0.5 border-r border-white/10 pr-3">
            <span className="text-[9px] text-gray-400 uppercase block font-bold">Skills Points</span>
            <span className="text-base font-black text-emerald-400 font-sans tracking-tight">3,450 XP</span>
          </div>
          <div className="space-y-0.5 border-r border-white/10 pr-3">
            <span className="text-[9px] text-gray-400 uppercase block font-bold">Power Up</span>
            <span className="text-base font-black text-pink-400 font-sans tracking-tight">MAX OVERDRIVE</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-gray-400 uppercase block font-bold">Mastery</span>
            <span className="text-base font-black text-[#f59e0b] font-sans tracking-tight">98.4%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Skills Blocks + Skills Progression Path Minimap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 6 Progression Bars with LED blocks */}
        <div className="lg:col-span-7 space-y-3">
          {defaultSkills.map((skill, idx) => {
            const Icon = skill.icon;
            const isSelected = selectedSkill === skill.name;
            const totalBlocks = 12;
            const filledBlocks = Math.round((skill.level / 100) * totalBlocks);

            return (
              <div
                key={idx}
                onClick={() => handleSkillClick(skill.name)}
                className={`group cursor-pointer p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-black/95 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                    : 'bg-black/70 border-white/10 hover:border-cyan-400/60 hover:bg-black/85'
                }`}
              >
                {/* Left: Icon & Name */}
                <div className="flex items-center gap-3 min-w-[160px] sm:min-w-[200px]">
                  <div className={`p-2 rounded-lg border transition-colors ${
                    isSelected ? 'bg-pink-500/20 text-pink-400 border-pink-500/40' : 'bg-white/5 text-cyan-400 border-white/10 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-white font-sans uppercase tracking-wide block group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">
                      TIER: {skill.category}
                    </span>
                  </div>
                </div>

                {/* Center: Segmented Cyan/Pink LED Blocks */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-1 justify-end sm:justify-center">
                  {[...Array(totalBlocks)].map((_, bIdx) => {
                    const isFilled = bIdx < filledBlocks;
                    return (
                      <div
                        key={bIdx}
                        className={`h-4 sm:h-5 w-1.5 sm:w-2 rounded-xs transition-all ${
                          isFilled
                            ? isSelected
                              ? 'bg-pink-500 shadow-[0_0_8px_#ec4899]'
                              : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                            : 'bg-gray-800/80 border border-white/5'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Right: Percentage */}
                <div className="text-right shrink-0">
                  <span className={`text-xs sm:text-sm font-black font-sans ${
                    isSelected ? 'text-pink-400' : 'text-emerald-400'
                  }`}>
                    {skill.level}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Skills Progression Path Radar Plate & Terminal */}
        <div className="lg:col-span-5 space-y-4">
          {/* Progression Radar Minimap */}
          <div className="bg-[#0c0e17] border border-cyan-500/40 rounded-xl p-4 shadow-xl relative overflow-hidden space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                SKILLS PROGRESSION PATH
              </span>
              <span className="text-[9px] text-gray-500 font-mono">NODE 98.4</span>
            </div>

            {/* Simulated Cyber Circuit / City Map */}
            <div className="h-44 rounded-lg bg-[#07090f] border border-white/10 relative overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full opacity-60" viewBox="0 0 200 120">
                {/* Circuit Grid */}
                <path d="M10,20 L190,20 M10,60 L190,60 M10,100 L190,100 M40,10 L40,110 M100,10 L100,110 M160,10 L160,110" stroke="#1e293b" strokeWidth="0.7" fill="none" />
                {/* Neon Route */}
                <path d="M20,90 L60,90 L80,40 L130,40 L150,80 L180,80" stroke="#22d3ee" strokeWidth="2.5" fill="none" strokeDasharray="3 3" />
                <path d="M20,90 L60,90 L80,40 L130,40 L150,80 L180,80" stroke="#ec4899" strokeWidth="1" fill="none" />
                {/* Waypoint Nodes */}
                <circle cx="20" cy="90" r="4" fill="#10b981" />
                <circle cx="80" cy="40" r="4" fill="#38bdf8" />
                <circle cx="130" cy="40" r="4" fill="#ec4899" />
                <circle cx="180" cy="80" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
              
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] text-gray-400 bg-black/80 px-2 py-1 rounded border border-white/10">
                <span className="text-cyan-400 font-bold">NEXT PERK: AI AGENTIC SDK</span>
                <span className="text-emerald-400 font-mono">READY TO UNLOCK</span>
              </div>
            </div>

            {/* Interactive Selected Perk Detail */}
            <div className="p-3 rounded-lg bg-black/50 border border-white/10 space-y-1 text-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Active Talent Specification:</span>
              <p className="text-gray-300 leading-relaxed font-sans text-xs">
                {selectedSkill 
                  ? `Selected specialization '${selectedSkill}'. Fully integrated in production systems with zero-downtime tolerance.` 
                  : 'Click any skill row to inspect architectural depth and deployment telemetry.'}
              </p>
            </div>
          </div>

          {/* Core Technologies Badges */}
          <div className="bg-black/70 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              Equipped Toolchain Arsenal
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['TypeScript', 'React 19', 'Next.js', 'Node.js', 'TailwindCSS', 'PostgreSQL', 'Docker', 'AWS', 'Redis', 'Python'].map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-amber-300 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
