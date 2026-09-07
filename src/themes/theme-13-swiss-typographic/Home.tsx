import React, { useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, blogPosts, skillCategories, onNavigate, config }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(1);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const allSkills = skillCategories.flatMap(c => c.skills);

  const sections = [
    {
      num: '01',
      title: 'IDENTITÄT & LEITBILD',
      subtitle: 'Biographical Manifesto & Core Philosophy',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-b border-zinc-200">
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-bold tracking-widest text-red-600 block uppercase">
              // PRINCIPAL SPECIALIZATION
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
              {identity.role}
            </h3>
            <p className="text-xs font-mono text-zinc-500">
              BASED IN {identity.location.toUpperCase()} · STATUS: ACTIVE
            </p>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-lg text-zinc-800 leading-relaxed font-normal">
              {identity.bio}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-200">
              <div>
                <span className="text-3xl font-black tracking-tighter text-zinc-950 block">
                  {identity.stats.yearsBuilding}
                </span>
                <span className="text-xs font-mono text-zinc-500 uppercase">Jahre Erfahrung</span>
              </div>
              <div>
                <span className="text-3xl font-black tracking-tighter text-zinc-950 block">
                  {identity.stats.projectsShipped}
                </span>
                <span className="text-xs font-mono text-zinc-500 uppercase">Produktionssysteme</span>
              </div>
              <div>
                <span className="text-3xl font-black tracking-tighter text-zinc-950 block">
                  99.99%
                </span>
                <span className="text-xs font-mono text-zinc-500 uppercase">Verfügbarkeit SLA</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      num: '02',
      title: 'PROJEKTE & SYSTEME',
      subtitle: 'High-Concurrency Architectural Case Studies',
      content: (
        <div className="py-8 space-y-8 border-b border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group border border-zinc-200 p-6 hover:border-zinc-900 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xs font-mono uppercase bg-zinc-100 text-zinc-800 px-2 py-0.5">
                      {p.role}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">ID: {p.id.toUpperCase()}</span>
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-red-600 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                    {p.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-100 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.map(t => (
                      <span key={t} className="text-[11px] font-mono border border-zinc-200 px-2 py-0.5 text-zinc-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-zinc-900 hover:text-red-600 pt-2"
                    >
                      <span>PROJEKT ÖFFNEN</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: '03',
      title: 'KOMPETENZ & MATRIX',
      subtitle: 'Technical Stacks & Engineering Rigor',
      content: (
        <div className="py-8 border-b border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {allSkills.map((s) => (
              <div key={s.name} className="border-t-2 border-zinc-900 pt-3">
                <div className="text-base font-bold text-zinc-900 mt-1">{s.name}</div>
                <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mt-3">
                  <span>STUFE</span>
                  <span>{s.level}%</span>
                </div>
                <div className="w-full bg-zinc-100 h-1 mt-1">
                  <div className="bg-red-600 h-full" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: '04',
      title: 'PUBLIKATIONEN & SCHRIFTEN',
      subtitle: 'Essays on High Reliability & Web Performance',
      content: (
        <div className="py-8 space-y-6 border-b border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((b) => (
              <article key={b.id} className="border-l-2 border-zinc-900 pl-4 py-2 space-y-2">
                <span className="text-xs font-mono text-zinc-400">
                  {b.publishedAt} · {b.readingTimeMinutes} MIN LESEZEIT
                </span>
                <h5 className="text-lg font-bold text-zinc-900 hover:text-red-600 cursor-pointer">
                  {b.title}
                </h5>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {b.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      )
    },
    {
      num: '05',
      title: 'KONTAKT & BERATUNG',
      subtitle: 'Inquiries, Consultancies & Architectural Audits',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-b border-zinc-200">
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-2xl font-bold tracking-tight text-zinc-900">
              Direkter Ansprechpartner
            </h4>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Verfügbar für Mandate im Bereich Principal Architecture, Full-Stack Engineering und 3D WebGL Webanwendungen.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate && onNavigate('/admin')}
                className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold hover:bg-red-600 transition-colors"
              >
                ADMINISTRATIONSSYSTEM ÖFFNEN
              </button>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-zinc-200 py-2">
              <span className="text-zinc-500">ELEKTRONISCHE POST:</span>
              <span className="font-bold text-zinc-900">{identity.socialLinks.email}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200 py-2">
              <span className="text-zinc-500">STANDORT:</span>
              <span className="text-zinc-900">{identity.location}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200 py-2">
              <span className="text-zinc-500">QUELLCODE:</span>
              <span className="text-zinc-900">{identity.socialLinks.github}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200 py-2">
              <span className="text-zinc-500">NETZWERK:</span>
              <span className="text-zinc-900">{identity.socialLinks.linkedin}</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div
      className="min-h-screen font-sans select-none text-zinc-900 bg-white"
      style={{ backgroundColor: config?.colorTokens.bgPrimary || '#ffffff' }}
    >
      {/* Swiss Header Bar */}
      <header className="border-b-2 border-zinc-900 px-6 md:px-12 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-white font-black text-sm">
            +
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight uppercase">
              {identity.name}
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              INTERNATIONAL TYPOGRAPHIC STYLE · EDITION 2026
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs font-mono">
          <span className="hidden md:inline text-zinc-400">RASTER: 12-SPALTEN GRID</span>
          <button
            onClick={() => onNavigate && onNavigate('/admin')}
            className="px-3 py-1 bg-zinc-900 text-white font-bold hover:bg-red-600 transition-colors"
          >
            ADMIN OS
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="border-b-2 border-zinc-900 pb-12 mb-8">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            ARCHITEKTUR &amp; SYSTEME.
          </h2>
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between text-sm font-mono text-zinc-600">
            <span>{identity.name.toUpperCase()} // {identity.alias}</span>
            <span>{identity.location.toUpperCase()}</span>
            <span className="text-red-600 font-bold">● BETRIEBSBEREIT FÜR NEUE PROJEKTE</span>
          </div>
        </div>

        {/* Index Accordion List */}
        <div className="space-y-0 divide-y divide-zinc-200">
          {sections.map((sec, idx) => {
            const isOpen = expandedSection === idx;
            return (
              <div key={sec.num} className="transition-colors">
                <div
                  onClick={() => toggleSection(idx)}
                  className="py-6 flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors px-2"
                >
                  <div className="flex items-baseline space-x-6">
                    <span className="text-2xl md:text-3xl font-black text-red-600 font-mono">
                      {sec.num}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-3xl font-black tracking-tight uppercase text-zinc-900">
                        {sec.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-500 mt-0.5">
                        {sec.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 border border-zinc-300 rounded-full">
                    {isOpen ? <Minus className="w-5 h-5 text-zinc-900" /> : <Plus className="w-5 h-5 text-zinc-500" />}
                  </div>
                </div>

                {isOpen && (
                  <div className="px-2 transition-all duration-200">
                    {sec.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-zinc-900 mt-16 px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-zinc-500">
        <div>ZÜRICH / BASEL TYPOGRAPHIC PRINCIPLES · COPYRIGHT 2026 {identity.name.toUpperCase()}</div>
        <div className="mt-4 md:mt-0 text-zinc-900 font-bold">ALL SYSTEMS VERIFIED IN PRODUCTION</div>
      </footer>
    </div>
  );
};

export default Home;
