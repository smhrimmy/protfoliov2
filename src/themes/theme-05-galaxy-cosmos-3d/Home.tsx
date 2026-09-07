import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { ArrowUpRight, Compass, MapPin, Ruler, Building2, Calendar, Mail, ArrowDown } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  onNavigate 
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'Residential', 'Commercial', 'Cultural', 'Urban'];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans antialiased selection:bg-black selection:text-white">
      {/* Precision Architectural Header */}
      <header className="sticky top-0 z-40 bg-[#fcfcfc]/90 backdrop-blur-md border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold tracking-tight">{identity.name}</span>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest pl-2 border-l border-gray-300">
              ARCHITECTURE & SPATIAL DESIGN
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-xs font-mono tracking-wider text-gray-500 uppercase">
            <a href="#projects" className="hover:text-black transition-colors">Works</a>
            <a href="#philosophy" className="hover:text-black transition-colors">Philosophy</a>
            <a href="#services" className="hover:text-black transition-colors">Practice</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="text-xs font-mono uppercase tracking-wider px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
            >
              Inquire
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-xs font-mono text-gray-400 hover:text-black"
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-36 pb-32">
        
        {/* ============================================================
            HERO SECTION
            - Full-bleed architectural photography
            - Architect name & firm philosophy
            - Tagline: "Architecture for human experience"
           ============================================================ */}
        <section className="max-w-7xl mx-auto px-8 pt-12 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block">
              ESTABLISHED 2018 · BENGALURU & SAN FRANCISCO
            </span>
            <h1 className="font-serif text-4xl sm:text-7xl font-light text-black tracking-tight leading-[1.06]">
              Architecture for human experience and timeless light.
            </h1>
            <p className="text-gray-500 font-light text-lg max-w-2xl leading-relaxed">
              We design spaces shaped by tectonic clarity, raw materials, environmental stewardship,
              and disciplined structural logic.
            </p>
          </div>

          {/* Full-bleed Hero Visual */}
          <div className="aspect-[21/9] w-full bg-stone-200 overflow-hidden relative shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
              alt="Architectural monograph"
              className="w-full h-full object-cover grayscale contrast-105"
            />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-mono text-gray-800">
              MONOLITH HOUSE · COMPLETED 2024 · 8,400 SQ FT
            </div>
          </div>
        </section>

        {/* ============================================================
            PROJECTS GRID
            - Large thumbnails (architecture needs big images)
            - Location, year, sq footage, status
           ============================================================ */}
        <section id="projects" className="max-w-7xl mx-auto px-8 space-y-12 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-black">
                Selected Works
              </h2>
              <p className="text-xs font-mono text-gray-400 mt-1">12 BUILT PROJECTS & ADVANCED CONCEPTS</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-3 py-1 uppercase tracking-wider transition-colors ${
                    selectedFilter === f ? 'border-b-2 border-black font-bold text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map((proj, idx) => (
              <article
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group cursor-pointer space-y-4"
              >
                <div className="aspect-[16/11] w-full bg-stone-100 overflow-hidden relative">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white text-[10px] font-mono tracking-widest uppercase">
                    COMPLETED {proj.date?.slice(0, 4) || '2024'}
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl font-normal text-black group-hover:underline">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-gray-400">{identity.location}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-light line-clamp-2 leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-[11px] font-mono text-gray-400">
                    <span>{proj.role}</span>
                    <span>·</span>
                    <span>6,200 SQ FT</span>
                    <span>·</span>
                    <span className="text-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      VIEW MONOGRAPH <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            PRACTICE PHILOSOPHY
           ============================================================ */}
        <section id="philosophy" className="max-w-7xl mx-auto px-8 space-y-8 scroll-mt-24">
          <div className="p-12 sm:p-20 bg-stone-100 border border-black/[0.06] space-y-8">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">PRACTICE MANIFESTO</span>
            <blockquote className="font-serif text-2xl sm:text-4xl font-light text-black leading-snug max-w-4xl">
              "We do not impose form upon context; we listen to the soil, orientation, light, and materiality until the structure reveals its inevitable geometry."
            </blockquote>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-black/[0.08] text-xs font-mono">
              <div>
                <span className="text-gray-400 block mb-1">01. TECTONIC HONESTY</span>
                <p className="text-gray-600 font-sans">Exposed cast concrete, sustainably milled timber, natural stone.</p>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">02. CLIMATIC RESPONSIVENESS</span>
                <p className="text-gray-600 font-sans">Passive solar orientation, natural cross-ventilation corridors.</p>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">03. HUMAN PROPORTION</span>
                <p className="text-gray-600 font-sans">Measured ceiling heights and light wells calibrated to biological rhythms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SERVICES & INQUIRY
           ============================================================ */}
        <section id="contact" className="max-w-7xl mx-auto px-8 scroll-mt-24 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400">COMMISSIONS & COLLABORATIONS</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-black">
                Initiate a project dialogue.
              </h2>
              <p className="text-gray-500 font-light text-sm leading-relaxed max-w-md">
                We accept a limited number of residential and cultural architectural commissions
                per calendar year to ensure uncompromised partner attention.
              </p>
              <div className="font-mono text-xs text-gray-600 space-y-1">
                <p>STUDIO: Indiranagar, 12th Main, Bengaluru 560038</p>
                <p>CORRESPONDENCE: {identity.socialLinks.email}</p>
              </div>
            </div>

            <div className="md:col-span-6 p-8 bg-white border border-black/[0.08] space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold">PROJECT INQUIRY</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry logged. Our studio will contact you.'); }} className="space-y-4 font-mono text-xs">
                <input
                  type="text"
                  required
                  placeholder="Client / Organization Name"
                  className="w-full p-3 border border-gray-200 text-black focus:outline-none focus:border-black"
                />
                <input
                  type="email"
                  required
                  placeholder="Contact Email"
                  className="w-full p-3 border border-gray-200 text-black focus:outline-none focus:border-black"
                />
                <select className="w-full p-3 border border-gray-200 text-black focus:outline-none focus:border-black bg-white">
                  <option>Residential Architecture</option>
                  <option>Commercial / Hospitality</option>
                  <option>Cultural Space / Pavilion</option>
                  <option>Master Planning & Urban</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Site location, projected timeline, and scale..."
                  className="w-full p-3 border border-gray-200 text-black focus:outline-none focus:border-black resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white font-mono uppercase tracking-widest text-xs hover:bg-stone-800 transition-colors"
                >
                  Submit Architectural Brief
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.08] py-12 text-xs font-mono text-gray-400 text-center">
        © 2026 {identity.name} ARCHITECTURAL PRACTICE. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};
