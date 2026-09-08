import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { ArrowUpRight, Sliders, Type, ArrowDown, Sparkles } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  onNavigate 
}) => {
  // Live Type Specimen Sandbox State
  const [specimenText, setSpecimenText] = useState('TYPOGRAPHIC ARCHITECTURE & POSTER MANIFESTO');
  const [fontSize, setFontSize] = useState(48);
  const [tracking, setTracking] = useState(0);
  const [activeFontClass, setActiveFontClass] = useState<'font-sans' | 'font-serif' | 'font-mono'>('font-serif');

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-amber-400 selection:text-black w-full max-w-full overflow-x-hidden">
      
      {/* 1. ASYMMETRICAL POSTER STRIP HEADER */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.1] text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-bold tracking-widest text-sm uppercase">
              [ISSUE № 07]
            </span>
            <span className="text-zinc-600 hidden sm:inline">/</span>
            <span className="text-zinc-400 hidden sm:inline uppercase">
              {identity.name} · Typographic Biennial
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#specimen" className="text-zinc-400 hover:text-white transition-colors hidden sm:inline">
              Type Specimen
            </a>
            <a href="#exhibits" className="text-zinc-400 hover:text-white transition-colors hidden sm:inline">
              Plates ({projects.length})
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="px-3 py-1 border border-white/20 hover:border-white rounded-full text-zinc-300 hover:text-white transition-colors text-[11px]"
            >
              Admin OS
            </button>
          </div>
        </div>
      </header>

      {/* 2. GIANT POSTER COVER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-24 border-b border-white/[0.1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Headline */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Manifesto & Exhibition · Zurich / Tokyo / New York</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal tracking-tight text-white leading-[0.95]">
              Form follows language.
            </h1>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-12 gap-6 text-sm text-zinc-400 leading-relaxed">
              <p className="sm:col-span-8 text-base sm:text-lg font-light text-zinc-300">
                {identity.bio}
              </p>
              <div className="sm:col-span-4 font-mono text-xs text-zinc-500 border-l border-white/[0.1] pl-4 space-y-2">
                <div>FOLIO: VOL. 24</div>
                <div>GRID: 12-COL ASYMMETRIC</div>
                <div>CURATOR: {identity.name}</div>
              </div>
            </div>
          </div>

          {/* Right Rotated Margin Stamp */}
          <div className="lg:col-span-3 hidden lg:flex flex-col items-end justify-between h-full text-right font-mono text-xs text-zinc-500 space-y-12">
            <div className="border border-white/[0.1] p-4 rounded-xl space-y-1 w-full">
              <div className="text-amber-400 font-bold uppercase text-[10px]">EDITION LIMIT</div>
              <div className="text-white font-bold text-base">№ 042 / 100</div>
              <div className="text-[10px] text-zinc-500">Letterpress Archival Print</div>
            </div>
            <div className="text-[11px] uppercase tracking-widest text-zinc-600">
              EXPLORE EXHIBITION DOWNWARDS ↓
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE LIVE TYPE SPECIMEN SANDBOX */}
      <section id="specimen" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-b border-white/[0.1] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
              Tool 01 // Interactive Specimen
            </span>
            <h2 className="text-3xl font-serif text-white mt-1">Live Typeface Sandbox</h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            Experiment with scale, tracking, and family rhythm
          </span>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/[0.1] space-y-6 shadow-2xl">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 text-xs font-mono">
            {/* Font Family Selector */}
            <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-xl border border-white/[0.08]">
              {(['font-serif', 'font-sans', 'font-mono'] as const).map(font => (
                <button
                  key={font}
                  onClick={() => setActiveFontClass(font)}
                  className={`px-3 py-1 rounded-lg transition-colors capitalize ${
                    activeFontClass === font
                      ? 'bg-amber-400 text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {font.replace('font-', '')}
                </button>
              ))}
            </div>

            {/* Sliders */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-[11px]">Size: {fontSize}px</span>
                <input
                  type="range"
                  min="24"
                  max="84"
                  value={fontSize}
                  onChange={e => setFontSize(Number(e.target.value))}
                  className="w-24 accent-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-[11px]">Tracking: {tracking}px</span>
                <input
                  type="range"
                  min="-3"
                  max="12"
                  value={tracking}
                  onChange={e => setTracking(Number(e.target.value))}
                  className="w-24 accent-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Editable Specimen Canvas */}
          <div className="min-h-[160px] flex items-center">
            <textarea
              value={specimenText}
              onChange={e => setSpecimenText(e.target.value)}
              rows={2}
              style={{ fontSize: `${fontSize}px`, letterSpacing: `${tracking}px` }}
              className={`w-full bg-transparent text-white focus:outline-none resize-none leading-none ${activeFontClass}`}
            />
          </div>

          <div className="text-[11px] font-mono text-zinc-500 border-t border-white/[0.06] pt-3 flex items-center justify-between">
            <span>Click canvas above to type custom copy</span>
            <span className="uppercase text-amber-400">{activeFontClass.replace('font-', '')} · {fontSize}PT</span>
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRICAL POSTER EXHIBITS */}
      <section id="exhibits" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 space-y-16">
        <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
              Catalogue Plates
            </span>
            <h2 className="text-3xl font-serif text-white mt-1">Exhibition Works</h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">{projects.length} Registered Works</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {projects.map((proj, idx) => {
            const isLarge = idx % 3 === 0;
            return (
              <article
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug || proj.id}`)}
                className={`group cursor-pointer space-y-4 p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] hover:border-amber-400/50 transition-all ${
                  isLarge ? 'md:col-span-8' : 'md:col-span-4'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="text-amber-400 font-bold">PLATE 0{idx + 1}</span>
                  <span>{proj.date || '2024'}</span>
                </div>

                {proj.coverImage && (
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/60">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase block">{proj.role}</span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-amber-300 transition-colors mt-0.5">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans line-clamp-2 mt-1 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">{proj.technologies.slice(0, 2).join(' · ')}</span>
                  <span className="text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-white/[0.1] bg-black py-12 text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span>© {new Date().getFullYear()} {identity.name}</span>
            <span className="mx-2">/</span>
            <span>Typographic Atelier & Type Design</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/admin')} className="hover:text-white transition-colors">
              Admin OS
            </button>
            <a href={`mailto:${identity.socialLinks.email}`} className="text-amber-400 hover:underline">
              {identity.socialLinks.email}
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
