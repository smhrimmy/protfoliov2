import React, { useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { ArrowUpRight } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, skillCategories, onNavigate, config }) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const allSkills = skillCategories.flatMap(c => c.skills);

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row text-orange-50 select-none overflow-x-hidden"
      style={{ backgroundColor: config?.colorTokens.bgPrimary || '#121316' }}
    >
      {/* Pinned Left Column (50vw on desktop) */}
      <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-orange-950/60 bg-[#15171c]/90">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
              {identity.alias} // AXIS 01
            </span>
            <button
              onClick={() => onNavigate && onNavigate('/admin')}
              className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono rounded hover:bg-orange-500/20"
            >
              ADMIN_OS
            </button>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white leading-tight">
              {identity.name}
            </h1>
            <p className="text-sm font-mono text-orange-300/80">
              {identity.role} · {identity.location}
            </p>
          </div>

          <p className="text-sm md:text-base text-stone-300 leading-relaxed max-w-md font-sans">
            {identity.bio}
          </p>

          {/* Active Highlight Card dynamically pinned */}
          <div className="p-4 bg-black/40 border border-orange-900/50 rounded-xl space-y-2 mt-6">
            <div className="flex items-center justify-between text-xs font-mono text-orange-400">
              <span>ACTIVE AXIS TARGET</span>
              <span>#{activeProjectIdx + 1} OF {projects.length}</span>
            </div>
            <div className="text-lg font-serif text-white font-bold">
              {projects[activeProjectIdx]?.title}
            </div>
            <div className="text-xs font-mono text-orange-300">
              ⚡ Role: {projects[activeProjectIdx]?.role}
            </div>
          </div>
        </div>

        {/* Left Bottom Telemetry */}
        <div className="pt-8 border-t border-orange-950/50 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>COMMISSIONS OPEN</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono text-stone-400">
            <div>
              <span className="text-orange-500 block">SYSTEMS EXP:</span>
              <span className="text-white text-sm font-bold">{identity.stats.yearsBuilding}</span>
            </div>
            <div>
              <span className="text-orange-500 block">PROD DEPLOYS:</span>
              <span className="text-white text-sm font-bold">{identity.stats.projectsShipped} Platforms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Right Column (50vw on desktop) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 space-y-16 overflow-y-auto">
        {/* Section: Projects Feed */}
        <div className="space-y-8">
          <div className="border-b border-orange-950/60 pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
              AXIS 02 // PRODUCTION DEPLOYMENTS
            </span>
            <span className="text-xs font-mono text-stone-500">
              {projects.length} CASE STUDIES
            </span>
          </div>

          <div className="space-y-10">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                onMouseEnter={() => setActiveProjectIdx(idx)}
                className="p-6 bg-[#1a1c22]/80 border border-orange-950/60 rounded-2xl space-y-4 hover:border-orange-500/50 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-orange-500">0{idx + 1} / SYSTEM</span>
                  <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded">
                    {proj.role}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-white group-hover:text-orange-300 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
                  {proj.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map(t => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 bg-[#121316] border border-orange-950 text-stone-400">
                      {t}
                    </span>
                  ))}
                </div>

                {proj.liveUrl && (
                  <div className="pt-2">
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-orange-400 hover:text-orange-300"
                    >
                      <span>INSPECT LIVE INSTANCE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section: Technical Competency Matrix */}
        <div className="space-y-6">
          <div className="border-b border-orange-950/60 pb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
              AXIS 02 // CAPABILITY MATRIX
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allSkills.slice(0, 8).map(s => (
              <div key={s.name} className="p-4 bg-[#1a1c22]/60 border border-orange-950/60 rounded-lg">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-white">{s.name}</span>
                  <span className="text-orange-400">{s.level}%</span>
                </div>
                <div className="w-full bg-black/50 h-1 rounded-full overflow-hidden mt-2">
                  <div className="bg-orange-500 h-full rounded-full" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Contact Form & Inbound */}
        <div className="space-y-6 pt-6 border-t border-orange-950/60">
          <div className="border-b border-orange-950/60 pb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
              AXIS 02 // DIRECT TRANSMISSION
            </span>
          </div>

          <div className="p-6 bg-black/30 border border-orange-900/40 rounded-xl space-y-4">
            <p className="text-xs text-stone-400 font-mono">
              Ready for principal system roles, advisory contracts, and high-performance WebGL builds.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 bg-[#121316] rounded border border-orange-950">
                <span className="text-stone-500">INBOX:</span>
                <span className="text-orange-300 font-bold">{identity.socialLinks.email}</span>
              </div>
              <div className="flex justify-between p-2 bg-[#121316] rounded border border-orange-950">
                <span className="text-stone-500">GITHUB:</span>
                <span className="text-orange-300 font-bold">{identity.socialLinks.github}</span>
              </div>
              <div className="flex justify-between p-2 bg-[#121316] rounded border border-orange-950">
                <span className="text-stone-500">LINKEDIN:</span>
                <span className="text-orange-300 font-bold">{identity.socialLinks.linkedin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
