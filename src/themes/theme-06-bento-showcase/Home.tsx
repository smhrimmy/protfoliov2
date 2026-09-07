import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { Code2, Play, Sparkles, FolderGit2, ArrowUpRight, Terminal } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, onNavigate }) => {
  const [codeOutput, setCodeOutput] = useState('Click "Run Architecture" to execute edge worker.');

  const runCode = () => {
    setCodeOutput('[200 OK] Edge worker executed in 4.2ms. All health checks green.');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f9fafb] font-sans p-6 sm:p-12 pb-32">
      {/* Floating Frosted Pill Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#111827]/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl text-xs font-medium text-gray-300">
        <a href="#hero" className="hover:text-white">Overview</a>
        <a href="#projects" className="hover:text-white">Projects</a>
        <a href="#code" className="hover:text-white">Interactive Sandbox</a>
        <a href={`mailto:${identity.socialLinks.email}`} className="text-blue-400 hover:text-blue-300 font-bold">Contact</a>
      </nav>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* Bento Grid Layer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: Identity & Hero (Col Span 8) */}
          <div className="md:col-span-8 p-8 rounded-3xl bg-[#111827]/70 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold">
                AVAILABLE FOR NEW INITIATIVES
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {identity.name} — {identity.role}
              </h1>
              <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
                {identity.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5 font-mono text-xs text-gray-400">
              <div><span className="text-white font-bold">{identity.stats.projectsShipped}</span> Projects Shipped</div>
              <div><span className="text-emerald-400 font-bold">{identity.stats.revenueInfluenced}</span> Revenue Generated</div>
              <div><span className="text-white font-bold">{identity.stats.happyClients}</span> Enterprise Clients</div>
            </div>
          </div>

          {/* Bento Card 2: Interactive Live Code Runner (Col Span 4) */}
          <div id="code" className="md:col-span-4 p-6 rounded-3xl bg-[#111827]/70 border border-white/10 flex flex-col justify-between font-mono text-xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <span className="text-blue-400 font-bold flex items-center gap-1.5"><Terminal className="w-4 h-4" /> worker.ts</span>
                <button onClick={runCode} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1">
                  <Play className="w-3 h-3 fill-white" /> Run
                </button>
              </div>
              <p className="text-gray-400">// Edge runtime deployment</p>
              <p className="text-purple-400">export default async () =&gt; &#123;</p>
              <p className="text-emerald-400 pl-3">return new Response("OK");</p>
              <p className="text-purple-400">&#125;;</p>
            </div>

            <div className="mt-4 p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-gray-300">
              {codeOutput}
            </div>
          </div>

          {/* Bento Cards: Project Matrix (3 cards, Col Span 4 each) */}
          {projects.slice(0, 3).map(proj => (
            <div
              key={proj.id}
              onClick={() => onNavigate(`/projects/${proj.slug}`)}
              className="md:col-span-4 p-6 rounded-3xl bg-[#111827]/70 border border-white/10 hover:border-blue-500/40 cursor-pointer group transition-all flex flex-col justify-between space-y-4"
            >
              <div className="h-44 w-full rounded-2xl overflow-hidden bg-slate-900">
                <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">{proj.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2">
                {proj.technologies.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
