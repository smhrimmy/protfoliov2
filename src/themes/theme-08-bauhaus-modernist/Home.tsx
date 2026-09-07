import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, onNavigate }) => {
  const [rotatedAngle, setRotatedAngle] = useState(0);

  return (
    <div className="min-h-screen bg-[#f5f0e6] text-[#1a1a1a] font-sans antialiased overflow-x-hidden selection:bg-[#d90429] selection:text-white">
      {/* Primary Geometric Bauhaus Header Tabs */}
      <header className="flex border-b-4 border-black">
        <div className="p-6 bg-black text-white font-black text-xl tracking-tighter w-48">
          {identity.alias}
        </div>
        <div className="flex-1 bg-[#ffb703] p-6 font-black text-sm uppercase tracking-wider flex items-center">
          BAUHAUS 1919 — {identity.name}
        </div>
        <a href="#projects" className="p-6 bg-[#0077b6] text-white font-bold text-xs uppercase hover:bg-black transition-colors">
          WERKE [{projects.length}]
        </a>
      </header>

      <main className="max-w-7xl mx-auto p-8 sm:p-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Geometric Pillar */}
        <section className="md:col-span-6 space-y-8">
          <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_#000000] space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#d90429]" />
              <span className="w-5 h-5 bg-[#ffb703]" />
              <span className="w-5 h-5 bg-[#0077b6]" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none text-black">
              {identity.tagline}
            </h1>
            <p className="text-xs font-bold leading-relaxed text-[#4a4a4a]">
              {identity.bio}
            </p>
          </div>

          {/* Interactive Rotated Geometry */}
          <div 
            onMouseEnter={() => setRotatedAngle(prev => prev + 45)}
            className="p-8 border-4 border-black bg-[#ffb703] cursor-pointer flex items-center justify-between"
          >
            <span className="font-black text-sm uppercase">HOVER TO ROTATE FORM</span>
            <div 
              className="w-12 h-12 bg-[#d90429] border-2 border-black transition-transform duration-300"
              style={{ transform: `rotate(${rotatedAngle}deg)` }}
            />
          </div>
        </section>

        {/* Right Modular Project Constructivist Cards */}
        <section id="projects" className="md:col-span-6 space-y-6">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => onNavigate(`/projects/${proj.slug}`)}
              className="border-4 border-black p-6 bg-white hover:bg-[#ffb703] cursor-pointer transition-colors shadow-[6px_6px_0px_#000000] group"
            >
              <div className="flex items-baseline justify-between border-b-2 border-black pb-2 mb-3">
                <span className="font-black text-xs">№ 0{idx + 1}</span>
                <span className="text-[10px] font-mono font-bold">{proj.date}</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">{proj.title}</h3>
              <p className="text-xs font-medium text-gray-700 mt-2 line-clamp-2 leading-relaxed">{proj.summary}</p>
              <div className="flex flex-wrap gap-1 pt-4">
                {proj.technologies.slice(0, 3).map((t, i) => (
                  <span key={i} className="text-[10px] font-black border border-black px-2 py-0.5 bg-white">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
