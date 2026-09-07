import React from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Project } from '@/types/portfolio';
import { ArrowUpRight, Crown, Gem } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, onNavigate, config }) => {
  return (
    <div
      className="min-h-screen font-serif text-stone-100 select-none overflow-x-hidden"
      style={{ backgroundColor: config?.colorTokens.bgPrimary || '#0a0a0a' }}
    >
      {/* Haute-Couture Monogram Header */}
      <header className="fixed top-0 left-0 right-0 h-20 px-8 md:px-16 flex items-center justify-between z-40 bg-black/60 backdrop-blur-md border-b border-amber-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border border-amber-500/60 rounded-full flex items-center justify-center bg-gradient-to-tr from-amber-950/40 to-black shadow-lg">
            <span className="font-serif italic text-amber-300 text-sm font-bold tracking-tighter">
              PDL
            </span>
          </div>
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-amber-200/80 hidden sm:inline">
            Atelier {identity.name}
          </span>
        </div>

        <div className="flex items-center space-x-6 text-xs font-sans tracking-widest uppercase">
          <span className="text-amber-400/80 hidden md:inline">
            COMMISSIONS: <strong className="text-amber-200">ACTIVE</strong>
          </span>
          <button
            onClick={() => onNavigate && onNavigate('/admin')}
            className="px-4 py-1.5 border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 transition-colors text-[11px] rounded"
          >
            Studio OS
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-16 px-8 md:px-16 max-w-7xl mx-auto flex flex-col justify-center relative">
        <div className="space-y-8 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-300 text-xs font-sans tracking-wider">
            <Gem className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Value Distributed Computing &amp; Bespoke Systems</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-serif font-normal text-white tracking-tight leading-[1.05]">
            The Architecture <br />
            <span className="italic font-light text-amber-300 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              of Distinction.
            </span>
          </h1>

          <p className="text-base md:text-xl text-stone-300 leading-relaxed font-sans max-w-2xl font-light">
            {identity.bio}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-amber-950/80">
            <div>
              <span className="text-3xl md:text-4xl font-serif text-amber-300 block">
                {identity.stats.yearsBuilding}
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-stone-400">
                Years Proven Craft
              </span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-serif text-amber-300 block">
                {identity.stats.projectsShipped}
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-stone-400">
                Principal Systems
              </span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-serif text-amber-300 block">
                {identity.stats.revenueInfluenced}
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-stone-400">
                Revenue Influenced
              </span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-serif text-amber-300 block">
                Zero
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-stone-400">
                Architectural Debt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Systems: Luxury Exhibition Plaque Gallery */}
      <section className="py-24 px-8 md:px-16 border-t border-amber-950/60 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-900/40 pb-6">
            <div>
              <span className="text-xs font-sans tracking-[0.25em] uppercase text-amber-400 block mb-2">
                COLLECTION 2026 // MASTERWORKS
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white font-normal">
                Curated Production Systems
              </h2>
            </div>
            <span className="text-xs font-sans text-stone-400">
              Each system delivered with rigorous computational proofs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((proj: Project, idx: number) => (
              <div
                key={proj.id}
                className="group border border-amber-900/40 bg-[#121212] p-8 md:p-10 rounded-xl space-y-6 hover:border-amber-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/10 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-medium">
                      EXHIBITION #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-sans text-stone-400 border border-stone-800 px-2.5 py-0.5 rounded-full">
                      {proj.role}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-amber-200 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-sm font-sans text-stone-300 leading-relaxed font-light">
                    {proj.summary}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-stone-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t: string) => (
                      <span key={t} className="text-[11px] font-sans px-2.5 py-1 bg-black border border-stone-800 text-stone-300 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.liveUrl && (
                    <div className="pt-2">
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-amber-300 hover:text-amber-100 font-semibold"
                      >
                        <span>Inspect Masterwork</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Atelier Inquiries */}
      <section className="py-24 px-8 md:px-16 border-t border-amber-950/60 max-w-5xl mx-auto text-center space-y-8">
        <Crown className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="text-3xl md:text-5xl font-serif text-white">
          Direct Private Advisory
        </h3>
        <p className="text-base text-stone-300 max-w-xl mx-auto font-sans font-light">
          Commission {identity.name} for principal software architecture, high-concurrency systems design, or executive technical advisory.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-sans tracking-widest uppercase">
          <a
            href={`mailto:${identity.socialLinks.email}`}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl shadow-amber-900/20"
          >
            Initiate Contact
          </a>
          <a
            href={identity.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 border border-amber-500/40 text-amber-300 rounded hover:bg-amber-500/10 transition-colors"
          >
            Verify GitHub Repositories
          </a>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="py-8 px-8 md:px-16 border-t border-amber-950/60 flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-stone-500 tracking-wider">
        <div>ATELIER {identity.name.toUpperCase()} · {identity.location.toUpperCase()}</div>
        <div className="mt-2 sm:mt-0 text-amber-400/80">RESERVED FOR THE DISCERNING</div>
      </footer>
    </div>
  );
};

export default Home;
