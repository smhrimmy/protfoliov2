import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { ArrowUpRight, ArrowDown, Copy, Check, ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  skillCategories, 
  onNavigate 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const copyEmail = () => {
    navigator.clipboard.writeText(identity.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.role.toLowerCase().includes(selectedFilter.toLowerCase()) || 
                          p.technologies.some(t => t.toLowerCase().includes(selectedFilter.toLowerCase())));

  return (
    <div className="min-h-screen bg-[#070707] text-[#dedede] font-serif antialiased selection:bg-white selection:text-black w-full max-w-full overflow-x-hidden">
      
      {/* 1. MINIMAL EDITORIAL MASTHEAD */}
      <header className="sticky top-0 z-40 bg-[#070707]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between text-xs font-sans tracking-wide">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-base font-serif font-bold text-white hover:opacity-75 transition-opacity"
            >
              {identity.name}
            </button>
            <span className="text-zinc-600 hidden sm:inline">/</span>
            <span className="text-zinc-400 hidden sm:inline font-mono text-[11px]">
              Archival Catalogue (2021 — {new Date().getFullYear()})
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#plates" className="text-zinc-400 hover:text-white transition-colors">Plates</a>
            <a href="#index" className="text-zinc-400 hover:text-white transition-colors">Index</a>
            <a href="#colophon" className="text-zinc-400 hover:text-white transition-colors">Colophon</a>
            <button
              onClick={() => onNavigate('/admin')}
              className="px-3 py-1.5 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all text-[11px] font-mono"
            >
              Admin OS
            </button>
          </nav>
        </div>
      </header>

      {/* 2. EDITORIAL HERO & STATEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-20 sm:pt-32 pb-24 border-b border-white/[0.08]">
        <div className="max-w-4xl space-y-8">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {identity.location} · {identity.role}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05]">
            Work that questions, refines, and persists.
          </h1>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-12 gap-8 text-base sm:text-lg text-zinc-400 font-sans font-light leading-relaxed">
            <p className="sm:col-span-8">
              {identity.bio}
            </p>
            <div className="sm:col-span-4 space-y-3 font-mono text-xs text-zinc-500 border-l border-white/[0.08] pl-4 sm:pl-6">
              <div>
                <span className="text-zinc-600 block">STATUS</span>
                <span className="text-zinc-300">Available for Senior Directorship & Contracts</span>
              </div>
              <div>
                <span className="text-zinc-600 block">SPECIFICATION</span>
                <span className="text-zinc-300">Architecture · Systems · Interaction</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 sm:pt-24 flex items-center justify-between text-xs font-mono text-zinc-600">
          <a href="#plates" className="inline-flex items-center gap-2 hover:text-zinc-300 transition-colors">
            <span>EXPLORE EXHIBITION</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <span>FIG. 01 — {projects.length} EXHIBITS</span>
        </div>
      </section>

      {/* 3. FULL-BLEED PLATE EXHIBITION */}
      <section id="plates" className="max-w-7xl mx-auto px-4 sm:px-8 py-24 space-y-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Section I</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">Exhibition Plates</h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            Curated Visual Portfolio · Full-Bleed Records
          </span>
        </div>

        <div className="space-y-32">
          {projects.slice(0, 4).map((project, idx) => (
            <article key={project.id} className="space-y-6 group">
              {/* Plate Header Note */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-white/[0.06] pb-3">
                <span className="tracking-widest">PLATE 0{idx + 1} // {project.date || '2024'}</span>
                <span className="text-zinc-400">{project.role}</span>
              </div>

              {/* Large Image Frame */}
              <div 
                onClick={() => onNavigate(`/projects/${project.slug || project.id}`)}
                className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-zinc-950 cursor-pointer border border-white/[0.06] group-hover:border-white/20 transition-all duration-500"
              >
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-600">
                    [NO_VISUAL_RECORD]
                  </div>
                )}
              </div>

              {/* Minimal Caption Footnote */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline pt-2">
                <div className="sm:col-span-5">
                  <h3 
                    onClick={() => onNavigate(`/projects/${project.slug || project.id}`)}
                    className="text-2xl sm:text-3xl font-serif text-white hover:text-zinc-300 cursor-pointer transition-colors"
                  >
                    {project.title}
                  </h3>
                </div>

                <div className="sm:col-span-4 text-xs font-sans text-zinc-400 leading-relaxed">
                  <p>{project.summary}</p>
                </div>

                <div className="sm:col-span-3 sm:text-right">
                  <button
                    onClick={() => onNavigate(`/projects/${project.slug || project.id}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-zinc-400 transition-colors uppercase tracking-wider"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. ARCHIVAL LEDGER INDEX TABLE */}
      <section id="index" className="max-w-7xl mx-auto px-4 sm:px-8 py-24 border-t border-white/[0.08]">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Section II</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">Complete Archival Index</h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              Total Catalogued Works: {projects.length}
            </span>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-white/20 text-zinc-500 font-mono text-[11px] tracking-wider uppercase">
                  <th className="py-4 font-normal w-12">#</th>
                  <th className="py-4 font-normal">Project & Client</th>
                  <th className="py-4 font-normal hidden md:table-cell">Discipline / Role</th>
                  <th className="py-4 font-normal hidden sm:table-cell">Stack & Medium</th>
                  <th className="py-4 font-normal w-16">Year</th>
                  <th className="py-4 font-normal text-right w-28">Study</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {projects.map((proj, idx) => (
                  <tr 
                    key={proj.id}
                    onClick={() => onNavigate(`/projects/${proj.slug || proj.id}`)}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 font-mono text-zinc-600 group-hover:text-zinc-400">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="font-serif text-base text-white group-hover:text-zinc-200 block">
                        {proj.title}
                      </span>
                      <span className="text-zinc-500 text-[11px] font-sans block sm:hidden">
                        {proj.role}
                      </span>
                    </td>
                    <td className="py-4 text-zinc-400 hidden md:table-cell">
                      {proj.role}
                    </td>
                    <td className="py-4 text-zinc-500 font-mono text-[11px] hidden sm:table-cell">
                      {proj.technologies.slice(0, 3).join(', ')}
                    </td>
                    <td className="py-4 font-mono text-zinc-400">
                      {proj.date || '2024'}
                    </td>
                    <td className="py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-zinc-400 group-hover:text-white font-mono text-[11px]">
                        <span>View</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. COLOPHON & DIRECT INQUIRY */}
      <footer id="colophon" className="max-w-7xl mx-auto px-4 sm:px-8 py-24 border-t border-white/[0.08] text-xs font-sans">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Ethos */}
          <div className="md:col-span-6 space-y-4">
            <span className="font-mono text-zinc-500 uppercase tracking-widest text-[11px] block">
              Colophon & Philosophy
            </span>
            <p className="text-base text-zinc-300 font-serif leading-relaxed">
              Designed as an austere, quiet space for rigorous design and software engineering. 
              Typeset in classic serif and monospaced letterforms. Built on the PDL Portfolio Engine.
            </p>
            <div className="pt-2 flex items-center gap-4 text-zinc-500 font-mono text-[11px]">
              <span>© {new Date().getFullYear()} {identity.name}</span>
              <span>·</span>
              <span>All Rights Reserved</span>
            </div>
          </div>

          {/* Right Column: Inquiries */}
          <div className="md:col-span-6 space-y-6 md:pl-12 md:border-l border-white/[0.08]">
            <span className="font-mono text-zinc-500 uppercase tracking-widest text-[11px] block">
              Direct Transmission & Communication
            </span>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <span className="text-zinc-500 font-mono text-[11px] block">PRIMARY CONTACT</span>
                  <span className="text-sm font-mono text-white select-all">{identity.socialLinks.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded bg-white/[0.06] hover:bg-white text-white hover:text-black font-mono text-[11px] transition-all flex items-center gap-1.5"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                </button>
              </div>

              <div className="flex items-center gap-4 pt-2 font-mono text-[11px]">
                {identity.socialLinks.github && (
                  <a 
                    href={identity.socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                {identity.socialLinks.linkedin && (
                  <a 
                    href={identity.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => onNavigate('/admin')}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Admin Console
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
