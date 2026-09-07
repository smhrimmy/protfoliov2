import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { ArrowUpRight, ArrowRight, Check, Sparkles, Layers, Eye } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  onNavigate 
}) => {
  return (
    <div className="min-h-screen bg-[#111215] text-[#ededed] font-sans antialiased selection:bg-amber-400 selection:text-black">
      {/* Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#111215]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-white">{identity.name}</span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-3 border-l border-white/10">
              BRAND & GRAPHIC SYSTEMS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-gray-400 uppercase tracking-wider">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Disciplines</a>
            <a href="#about" className="hover:text-white transition-colors">Studio</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="text-xs font-mono px-4 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-all rounded-full"
            >
              Start a Project
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-xs font-mono text-gray-500 hover:text-white px-2 py-1"
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20 sm:py-32 space-y-36">
        
        {/* HERO SECTION */}
        <section className="space-y-8 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
            SELECTED PORTFOLIO · 2024–2026
          </span>

          <h1 className="font-serif text-4xl sm:text-7xl font-normal text-white tracking-tight leading-[1.05]">
            Visual systems that define culture & elevate brands.
          </h1>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl leading-relaxed">
            {identity.tagline}. We craft comprehensive visual identities, editorial publications,
            bespoke packaging, and high-impact digital experiences.
          </p>

          <div className="flex items-center gap-6 pt-4 text-xs font-mono">
            <a
              href="#work"
              className="px-6 py-3.5 rounded-full bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              View Selected Work
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              Start an Inquiry →
            </a>
          </div>
        </section>

        {/* SELECTED WORK (Image-Led Editorial Showcase) */}
        <section id="work" className="space-y-16 scroll-mt-24">
          <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Selected Work
            </h2>
            <span className="text-xs font-mono text-gray-500 uppercase">
              Brand Identity · Packaging · Editorial
            </span>
          </div>

          <div className="space-y-24">
            {projects.map((proj, idx) => (
              <article
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group cursor-pointer space-y-6"
              >
                {/* Large Curated Imagery */}
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-900 relative">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
                    0{idx + 1} / 0{projects.length}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-xl">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-gray-400 shrink-0">
                    <span className="uppercase">{proj.role}</span>
                    <span className="text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SERVICES / DISCIPLINES */}
        <section id="services" className="space-y-12 border-t border-white/[0.08] pt-20 scroll-mt-24">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Capabilities</span>
            <h2 className="font-serif text-3xl font-bold text-white">Brand & Creative Disciplines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
              <h3 className="font-serif text-xl font-bold text-white">Brand Identity Systems</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Logomarks, dynamic token guidelines, typographic pairing, and art direction rules.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
              <h3 className="font-serif text-xl font-bold text-white">Packaging & Tangible Craft</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Structural packaging design, material specification, dielines, and print production.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
              <h3 className="font-serif text-xl font-bold text-white">Digital & Launch Systems</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Responsive web interfaces, campaign assets, interactive microsites, and launch decks.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT STATION */}
        <section id="contact" className="space-y-8 border-t border-white/[0.08] pt-20 scroll-mt-24">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Collaborations</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              Let's create something enduring.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Accepting commissions for comprehensive brand systems, editorial direction, and packaging initiatives.
            </p>
            <div className="pt-4">
              <a
                href={`mailto:${identity.socialLinks.email}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono uppercase tracking-wider rounded-full transition-colors"
              >
                <span>Email {identity.socialLinks.email}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 text-xs font-mono text-gray-500 text-center">
        © 2026 {identity.name}. All typography and identity systems protected under studio copyright.
      </footer>
    </div>
  );
};
