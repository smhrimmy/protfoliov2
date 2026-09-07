import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });

  return (
    <div 
      onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
      className="relative min-h-screen bg-[#08080c] text-[#fdf2f8] font-sans overflow-hidden p-6 sm:p-12 selection:bg-pink-500/30"
    >
      {/* Signature Dynamic Mouse-Following Aurora Glow */}
      <div 
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 -z-10 transition-all duration-75 ease-out"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          background: 'radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(168,85,247,0.4) 50%, transparent 70%)'
        }}
      />

      <header className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-white/5">
        <span className="font-display font-black text-xl tracking-tight text-white">{identity.name}</span>
        <nav className="flex items-center gap-6 text-xs font-mono text-gray-400">
          <a href="#work" className="hover:text-pink-400">WORK</a>
          <a href="#about" className="hover:text-pink-400">PHILOSOPHY</a>
          <a href={`mailto:${identity.socialLinks.email}`} className="text-pink-400">CONTACT</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto py-16 space-y-20">
        <section className="space-y-6 text-center sm:text-left max-w-3xl">
          <span className="text-xs font-mono text-pink-400 uppercase tracking-widest block">LUXURY NOIR · AURORA EDITION</span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-white leading-[1.1]">
            {identity.tagline}
          </h1>
          <p className="text-base text-gray-400 leading-relaxed font-sans">{identity.bio}</p>
        </section>

        <section id="work" className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
            <h2 className="text-2xl font-display font-bold text-white">Selected Systems</h2>
            <span className="text-xs font-mono text-pink-400">01 — 0{projects.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group relative rounded-3xl p-6 bg-[#12121c]/60 border border-white/5 backdrop-blur-xl hover:border-pink-500/40 transition-all cursor-pointer space-y-4 shadow-xl"
              >
                <div className="h-60 w-full rounded-2xl overflow-hidden bg-black/40">
                  <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-pink-400 transition-colors">{proj.title}</h3>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{proj.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
