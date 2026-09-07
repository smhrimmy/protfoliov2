import React, { useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, blogPosts, skillCategories, onNavigate, config }) => {
  const [loupeActive, setLoupeActive] = useState(false);

  const allSkills = skillCategories.flatMap(c => c.skills);

  return (
    <div
      className="min-h-screen font-serif text-stone-900 select-none p-4 md:p-10"
      style={{
        backgroundColor: config?.colorTokens.bgPrimary || '#f7f4ec',
        backgroundImage: 'radial-gradient(#292524 0.35px, transparent 0.35px)',
        backgroundSize: '12px 12px'
      }}
    >
      {/* Newspaper Sheet Container */}
      <div className="max-w-6xl mx-auto border-4 border-stone-900 bg-[#f7f4ec] p-6 md:p-10 shadow-2xl space-y-6">
        {/* Top Folio Header */}
        <div className="border-b border-stone-900 pb-2 flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase tracking-widest text-stone-700">
          <span>THE DAILY ARCHITECTURAL DISPATCH</span>
          <span>ESTABLISHED 2026 · {identity.location.toUpperCase()}</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLoupeActive(!loupeActive)}
              className="hover:text-stone-950 underline cursor-pointer"
            >
              {loupeActive ? '[ LOUPE: ACTIVE ]' : '[ LOUPE: ENABLE ]'}
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/admin')}
              className="hover:text-stone-950 underline font-bold"
            >
              [ ADMIN OS ]
            </button>
          </div>
        </div>

        {/* Vintage Masthead */}
        <div className="text-center py-4 border-b-4 border-double border-stone-900 space-y-2">
          <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tight uppercase leading-none">
            The {identity.alias} Chronicle
          </h1>
          <p className="text-xs md:text-sm font-serif italic text-stone-700">
            Dedicated to High-Throughput Distributed Systems, Scalable Cloud Infrastructure &amp; Creative 3D Computing
          </p>
          <div className="border-t border-b border-stone-900 py-1 flex justify-between text-[11px] font-mono font-bold text-stone-800">
            <span>VOL. XXIV · NO. 8,421</span>
            <span>WEATHER: COASTAL 29°C · COMMISSIONS: OPEN</span>
            <span>PRICE: PRINCIPAL CONTRACT</span>
          </div>
        </div>

        {/* 4-Column Newspaper Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2 divide-y md:divide-y-0 md:divide-x divide-stone-400">
          {/* Column 1 & 2 (Span 2): Lead Headline & Primary Case Studies */}
          <div className="md:col-span-2 space-y-6 pr-0 md:pr-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-900 block">
                SPECIAL REPORT · SYSTEMS IN PRODUCTION
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black leading-tight">
                Architect Delivers High-Concurrency Breakthrough
              </h2>
              <p className="text-sm italic text-stone-600 font-serif">
                {identity.location} engineer {identity.name} completes multi-region rollouts with 99.99% operational uptime.
              </p>
            </div>

            {/* Lead Story with Drop Cap */}
            <div className={`text-sm text-stone-800 leading-relaxed space-y-4 text-justify ${loupeActive ? 'scale-105 origin-left transition-transform' : ''}`}>
              <p>
                <span className="float-left text-5xl font-black leading-none pr-3 pt-1 text-stone-950 font-serif">
                  {identity.bio.charAt(0)}
                </span>
                {identity.bio.slice(1)}
              </p>
              <p>
                Operating out of {identity.location}, the engineer has stewarded {identity.stats.projectsShipped} systems through complete production life cycles, encompassing distributed event backbones, high-volume telemedicine data pipelines, and responsive WebGL environments.
              </p>
            </div>

            {/* Lead Featured Projects */}
            <div className="border-t-2 border-stone-900 pt-4 space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-wide border-b border-stone-300 pb-1">
                Dispatches from the Field
              </h3>
              <div className="space-y-4">
                {projects.slice(0, 2).map((proj) => (
                  <article key={proj.id} className="border border-stone-400 p-4 bg-stone-100/50 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg font-bold">{proj.title}</h4>
                      <span className="text-[10px] font-mono bg-stone-200 px-1.5 py-0.5">{proj.role}</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-normal">{proj.summary}</p>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-bold text-red-900 hover:underline pt-1"
                      >
                        <span>VIEW FIELD ARCHIVE</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Secondary Case Studies & Research Notes */}
          <div className="space-y-6 px-0 md:px-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-600 block mb-1">
                SECTION B · ESSAYS
              </span>
              <h3 className="text-2xl font-bold leading-tight">
                Architectural Commentary &amp; Whitepapers
              </h3>
            </div>

            <div className="space-y-5">
              {blogPosts.map((b) => (
                <article key={b.id} className="space-y-1 pb-3 border-b border-stone-300 last:border-b-0">
                  <span className="text-[10px] font-mono text-stone-500">
                    {b.publishedAt} · {b.readingTimeMinutes} MIN READ
                  </span>
                  <h5 className="font-bold text-sm leading-snug hover:text-red-900 cursor-pointer">
                    {b.title}
                  </h5>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {b.excerpt}
                  </p>
                </article>
              ))}
            </div>

            <div className="border-t-2 border-stone-900 pt-4 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-600 block">
                NOTABLE DEPLOYMENTS
              </span>
              {projects.slice(2, 4).map(p => (
                <div key={p.id} className="border-b border-stone-300 pb-2">
                  <h6 className="font-bold text-xs">{p.title}</h6>
                  <p className="text-[11px] text-stone-600">{p.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Classifieds, Capabilities & Direct Wire */}
          <div className="space-y-6 pl-0 md:pl-6">
            <div className="bg-stone-200/60 p-4 border border-stone-400 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-800 block text-center border-b border-stone-400 pb-1">
                CLASSIFIEDS &amp; WIRE
              </span>
              <p className="text-xs italic text-center text-stone-700">
                Inquiries for principal engineering, fractional architecture, and advisory contracts.
              </p>
              <div className="space-y-2 text-xs font-mono pt-2">
                <div className="border-t border-stone-300 pt-1">
                  <strong>DISPATCH WIRE:</strong>
                  <div className="text-red-950 font-bold break-all">{identity.socialLinks.email}</div>
                </div>
                <div className="border-t border-stone-300 pt-1">
                  <strong>LOCATION:</strong>
                  <div>{identity.location}</div>
                </div>
                <div className="border-t border-stone-300 pt-1">
                  <strong>CODE BASE:</strong>
                  <div className="text-stone-900">{identity.socialLinks.github}</div>
                </div>
              </div>
            </div>

            {/* Competencies */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-600 block border-b border-stone-400 pb-1">
                VERIFIED SKILLS MANIFEST
              </span>
              <div className="space-y-2">
                {allSkills.slice(0, 8).map((s) => (
                  <div key={s.name} className="text-xs border-b border-stone-200 pb-1 flex justify-between items-baseline">
                    <span className="font-bold">{s.name}</span>
                    <span className="font-mono text-[10px] text-stone-600">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-stone-900 p-3 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold text-stone-900 uppercase block">
                ★ SEAL OF VERIFICATION ★
              </span>
              <p className="text-[11px] text-stone-600">
                All production metrics guaranteed true to field telemetry logs.
              </p>
            </div>
          </div>
        </div>

        {/* Newspaper Bottom Folio */}
        <div className="border-t-2 border-stone-900 pt-3 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-stone-600">
          <div>PRINTED IN {identity.location.toUpperCase()} · COPYRIGHT 2026 {identity.name.toUpperCase()}</div>
          <div>INDEPENDENT JOURNAL OF SYSTEMS ARCHITECTURE</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
