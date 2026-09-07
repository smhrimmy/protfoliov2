import React from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, blogPosts, onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white font-mono uppercase selection:bg-white selection:text-black">
      {/* Brutalist In-Grid All-Caps Header */}
      <header className="border-b-4 border-white grid grid-cols-1 md:grid-cols-4 divide-y-4 md:divide-y-0 md:divide-x-4 divide-white">
        <div className="p-4 flex items-center justify-between">
          <span className="text-xl font-black">{identity.name}</span>
          <span className="text-xs bg-red-600 px-2 py-0.5 font-bold">BRUTALIST</span>
        </div>
        <a href="#projects" className="p-4 text-center font-bold hover:bg-white hover:text-black transition-none">
          PROJECTS [{projects.length}]
        </a>
        <a href="#about" className="p-4 text-center font-bold hover:bg-white hover:text-black transition-none">
          MANIFESTO
        </a>
        <a href={`mailto:${identity.socialLinks.email}`} className="p-4 text-center font-bold bg-white text-black hover:bg-red-600 hover:text-white transition-none">
          HIRE NOW
        </a>
      </header>

      {/* Giant Marquee Viewport Overrun */}
      <div className="border-b-4 border-white py-6 overflow-x-hidden whitespace-nowrap bg-black select-none">
        <div className="inline-block animate-marquee text-5xl sm:text-7xl font-black tracking-tighter">
          {identity.role.toUpperCase()} — {identity.tagline.toUpperCase()} — {identity.alias} —&nbsp;
        </div>
      </div>

      {/* Strict 1px / 4px Bordered Grid */}
      <main className="grid grid-cols-1 md:grid-cols-12 divide-y-4 md:divide-y-0 md:divide-x-4 divide-white border-b-4 border-white">
        {/* Left Manifesto Column */}
        <section className="md:col-span-4 p-6 sm:p-8 space-y-6">
          <div className="border-2 border-white p-4 bg-white/5 space-y-2">
            <span className="text-xs text-red-500 font-black">// IDENTITY MATRIX</span>
            <p className="text-xs leading-relaxed text-gray-300 normal-case">{identity.bio}</p>
          </div>

          <div className="border-2 border-white p-4 space-y-3">
            <span className="text-xs text-red-500 font-black">// METRICS RECORD</span>
            <div className="text-xs space-y-2">
              <div className="flex justify-between border-b border-white pb-1">
                <span>SHIPPED:</span>
                <span className="font-black text-white">{identity.stats.projectsShipped}</span>
              </div>
              <div className="flex justify-between border-b border-white pb-1">
                <span>REVENUE:</span>
                <span className="font-black text-red-500">{identity.stats.revenueInfluenced}</span>
              </div>
              <div className="flex justify-between">
                <span>CLIENTS:</span>
                <span className="font-black text-white">{identity.stats.happyClients}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Projects Grid with Hard Inversion on Hover (Signature Interaction) */}
        <section id="projects" className="md:col-span-8 divide-y-4 divide-white">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => onNavigate(`/projects/${proj.slug}`)}
              className="p-6 sm:p-8 group cursor-pointer hover:bg-white hover:text-black transition-none flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-red-600 group-hover:text-black font-black">PROJECT 0{idx + 1}</span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1">{proj.title}</h3>
                </div>
                <span className="text-xs border-2 border-current px-2 py-1 font-bold">
                  {proj.date}
                </span>
              </div>

              <p className="text-xs mt-3 normal-case leading-relaxed max-w-xl group-hover:text-black text-gray-400">
                {proj.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {proj.technologies.map((t, i) => (
                  <span key={i} className="text-[10px] border border-current px-2 py-0.5 font-bold">
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
