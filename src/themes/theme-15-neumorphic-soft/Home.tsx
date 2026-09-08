import React, { useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Sliders, ExternalLink, Activity, Sparkles } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, experience, skillCategories, onNavigate, config }) => {
  const [activeTab, setActiveTab] = useState<'systems' | 'bio' | 'stack' | 'contact'>('systems');

  const neuOuter = "shadow-[9px_9px_18px_#bec3c9,-9px_9px_18px_#ffffff] rounded-2xl bg-[#e0e5ec] transition-all";
  const neuInner = "shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_#ffffff] rounded-2xl bg-[#e0e5ec]";
  const neuBtn = "shadow-[5px_5px_10px_#bec3c9,-5px_-5px_10px_#ffffff] active:shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_#ffffff] rounded-xl transition-all";

  const allSkills = skillCategories.flatMap(c => c.skills);

  return (
    <div
      className="min-h-screen font-sans text-slate-800 select-none p-6 md:p-12 overflow-x-hidden"
      style={{ backgroundColor: config?.colorTokens.bgPrimary || '#e0e5ec' }}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top Tactile Nav Bar */}
        <header className={`p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 ${neuOuter}`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_#ffffff]">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {identity.name}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {identity.role} · {identity.location}
              </p>
            </div>
          </div>

          {/* Recessed Switchboard Buttons */}
          <div className="flex items-center space-x-2 bg-[#e0e5ec] p-1.5 rounded-xl shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_#ffffff]">
            {(['systems', 'bio', 'stack', 'contact'] as const).map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#e0e5ec] text-indigo-600 shadow-[4px_4px_8px_#bec3c9,-4px_-4px_8px_#ffffff]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div>
            <button
              onClick={() => onNavigate && onNavigate('/admin')}
              className={`px-4 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 ${neuBtn}`}
            >
              Admin OS
            </button>
          </div>
        </header>

        {/* Hero Extruded Plate */}
        <div className={`p-8 md:p-12 ${neuOuter} relative overflow-hidden`}>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-[#e0e5ec] shadow-[inset_2px_2px_5px_#bec3c9,inset_-2px_-2px_5px_#ffffff]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Architecture &amp; Advisory</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {identity.tagline}
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              {identity.bio}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className={`p-4 ${neuInner} text-center`}>
                <span className="text-2xl font-black text-indigo-600">{identity.stats.yearsBuilding}</span>
                <span className="block text-[11px] font-semibold text-slate-500 mt-0.5">Years Experience</span>
              </div>
              <div className={`p-4 ${neuInner} text-center`}>
                <span className="text-2xl font-black text-indigo-600">{identity.stats.projectsShipped}</span>
                <span className="block text-[11px] font-semibold text-slate-500 mt-0.5">Live Deployments</span>
              </div>
              <div className={`p-4 ${neuInner} text-center`}>
                <span className="text-2xl font-black text-indigo-600">{identity.stats.revenueInfluenced}</span>
                <span className="block text-[11px] font-semibold text-slate-500 mt-0.5">Delivery Rate</span>
              </div>
              <div className={`p-4 ${neuInner} text-center`}>
                <span className="text-2xl font-black text-indigo-600">0</span>
                <span className="block text-[11px] font-semibold text-slate-500 mt-0.5">Silent Failures</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Systems */}
        {activeTab === 'systems' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                Production-Engineered Systems ({projects.length})
              </h3>
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <span>Tactile Density: High</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-6 ${neuOuter} flex flex-col justify-between hover:shadow-[12px_12px_24px_#bec3c9,-12px_-12px_24px_#ffffff]`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-indigo-700 bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#bec3c9,inset_-2px_-2px_4px_#ffffff]">
                        {proj.role}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">ID: {proj.id}</span>
                    </div>

                    <h4 className="text-xl font-bold text-slate-900">
                      {proj.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded text-slate-600 bg-[#e0e5ec] shadow-[2px_2px_4px_#bec3c9,-2px_-2px_4px_#ffffff]">
                          {t}
                        </span>
                      ))}
                    </div>

                    {proj.liveUrl && (
                      <div className="pt-2 flex justify-end">
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-3 py-1.5 text-xs font-bold text-indigo-600 flex items-center space-x-1.5 ${neuBtn}`}
                        >
                          <span>Inspect Live</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Bio */}
        {activeTab === 'bio' && (
          <div className={`p-8 ${neuOuter} space-y-6`}>
            <h3 className="text-xl font-bold text-slate-900">
              Professional Trajectory &amp; Principles
            </h3>
            <div className="text-sm text-slate-600 leading-relaxed space-y-4">
              <p>{identity.bio}</p>
            </div>
            <div className="pt-4 border-t border-slate-300">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                Experience Timeline
              </h5>
              <div className="space-y-3">
                {experience.map(exp => (
                  <div key={exp.id} className={`p-4 ${neuInner} flex justify-between items-center`}>
                    <div>
                      <div className="font-bold text-sm text-slate-800">{exp.role} · {exp.company}</div>
                      <div className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</div>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 bg-white/50 px-2 py-1 rounded">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Stack */}
        {activeTab === 'stack' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">
              Core Competencies &amp; Architectural Mastery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allSkills.map(s => (
                <div key={s.name} className={`p-5 ${neuOuter}`}>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <span className="text-slate-800">{s.name}</span>
                    <span className="text-indigo-600">{s.level}%</span>
                  </div>
                  <div className="w-full bg-[#e0e5ec] p-1 rounded-full shadow-[inset_2px_2px_4px_#bec3c9,inset_-2px_-2px_4px_#ffffff]">
                    <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Contact */}
        {activeTab === 'contact' && (
          <div className={`p-8 ${neuOuter} space-y-6`}>
            <h3 className="text-xl font-bold text-slate-900">
              Direct Telemetry &amp; Inquiries
            </h3>
            <p className="text-xs text-slate-500">
              Direct connection channels for principal architectural contracts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 ${neuInner} text-center`}>
                <span className="text-xs text-slate-500 block">Email</span>
                <span className="text-sm font-bold text-indigo-600">{identity.socialLinks.email}</span>
              </div>
              <div className={`p-4 ${neuInner} text-center`}>
                <span className="text-xs text-slate-500 block">Location</span>
                <span className="text-sm font-bold text-slate-800">{identity.location}</span>
              </div>
              <div className={`p-4 ${neuInner} text-center`}>
                <span className="text-xs text-slate-500 block">GitHub</span>
                <span className="text-sm font-bold text-indigo-600">{identity.socialLinks.github}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
