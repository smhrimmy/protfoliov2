import React, { useRef, useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { ArrowRight, Film, ChevronRight, Sparkles } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, blogPosts, skillCategories, onNavigate, config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);

  // Wheel to horizontal scroll conversion
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
      const frame = Math.min(5, Math.floor(progress * 5) + 1);
      setCurrentFrame(frame);
    }
  };

  const scrollToFrame = (index: number) => {
    if (containerRef.current) {
      const target = (containerRef.current.scrollWidth - containerRef.current.clientWidth) * (index / 4);
      containerRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  const allSkills = skillCategories.flatMap(c => c.skills);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden text-amber-50 select-none flex flex-col justify-between"
      style={{ backgroundColor: config?.colorTokens.bgPrimary || '#0e0e11' }}
      onWheel={handleWheel}
    >
      {/* Top Cinematic Header Bar */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-amber-950/40 bg-black/60 backdrop-blur-md z-30">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full border border-amber-500/50 flex items-center justify-center bg-amber-950/30">
            <Film className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h1 className="font-serif tracking-widest text-sm uppercase text-amber-200 font-bold">
              {identity.name}
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-amber-500/80 font-mono">
              Panoramic Production Reel · 35mm Digital
            </p>
          </div>
        </div>

        {/* Global Stats */}
        <div className="hidden md:flex items-center space-x-6 text-xs font-mono text-amber-300/70">
          <div><span className="text-amber-500">BUILDING:</span> {identity.stats.yearsBuilding}</div>
          <div><span className="text-amber-500">PRODUCTION DEPLOYS:</span> {identity.stats.projectsShipped}</div>
          <div><span className="text-amber-500">LOCATION:</span> {identity.location}</div>
          <button
            onClick={() => onNavigate && onNavigate('/admin')}
            className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 rounded text-xs transition-colors"
          >
            Studio Admin
          </button>
        </div>
      </header>

      {/* Main Horizontal Track */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 flex overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Frame 1: Hero & Identity */}
        <section className="min-w-[90vw] md:min-w-[70vw] h-full flex items-center px-12 md:px-24 snap-start border-r border-amber-950/40 shrink-0 relative">
          <div className="absolute top-8 left-12 text-[10px] font-mono text-amber-600/70 tracking-widest">
            REEL 01 / PROLOGUE · {identity.alias}
          </div>
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{identity.role}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight text-amber-100">
              {identity.tagline}
            </h2>
            <p className="text-sm md:text-base text-amber-200/70 leading-relaxed font-sans max-w-xl">
              {identity.bio}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={() => scrollToFrame(1)}
                className="flex items-center space-x-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors text-sm"
              >
                <span>Explore Systems</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-xs font-mono text-amber-400/80 flex items-center space-x-2">
                <span>Scroll wheel or drag track right</span>
                <ChevronRight className="w-4 h-4 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Frame 2: Flagship Systems */}
        <section className="min-w-[150vw] md:min-w-[120vw] h-full flex flex-col justify-center px-12 md:px-20 snap-start border-r border-amber-950/40 shrink-0">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <div className="text-[10px] font-mono text-amber-600/70 tracking-widest">
                REEL 02 / FEATURED SYSTEMS
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-amber-100 mt-1">
                Engineered for High Concurrency &amp; Extreme Reliability
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-500/60">
              {projects.length} System Records
            </span>
          </div>

          <div className="flex space-x-6 overflow-hidden py-4">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="w-80 md:w-96 bg-amber-950/20 border border-amber-900/40 rounded-xl p-6 flex flex-col justify-between hover:border-amber-500/50 hover:bg-amber-950/30 transition-all shrink-0 group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-500 mb-3">
                    <span>FRAME #{String(idx + 1).padStart(2, '0')}</span>
                    <span className="px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                      {proj.role}
                    </span>
                  </div>
                  <h4 className="text-xl font-serif text-amber-100 group-hover:text-amber-300 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-amber-200/70 mt-2 leading-relaxed line-clamp-3">
                    {proj.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-900/30 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.slice(0, 4).map(t => (
                      <span key={t} className="text-[10px] font-mono bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded text-amber-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frame 3: Architecture & Engineering Stack */}
        <section className="min-w-[100vw] md:min-w-[80vw] h-full flex flex-col justify-center px-12 md:px-20 snap-start border-r border-amber-950/40 shrink-0">
          <div className="mb-8">
            <div className="text-[10px] font-mono text-amber-600/70 tracking-widest">
              REEL 03 / SYSTEM ARCHITECTURE &amp; CAPABILITIES
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-amber-100 mt-1">
              Deep Technical Competence
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            {allSkills.slice(0, 8).map((skill) => (
              <div
                key={skill.name}
                className="bg-black/40 border border-amber-900/40 p-5 rounded-lg hover:border-amber-500/40 transition-colors"
              >
                <div className="text-base font-semibold text-amber-100">{skill.name}</div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-amber-400/80">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-amber-950/50 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frame 4: Publications & Research */}
        <section className="min-w-[90vw] md:min-w-[70vw] h-full flex flex-col justify-center px-12 md:px-20 snap-start border-r border-amber-950/40 shrink-0">
          <div className="mb-8">
            <div className="text-[10px] font-mono text-amber-600/70 tracking-widest">
              REEL 04 / PUBLICATIONS &amp; FIELD NOTES
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-amber-100 mt-1">
              Engineering Whitepapers &amp; Architectural Writings
            </h3>
          </div>

          <div className="space-y-4 max-w-2xl">
            {blogPosts.map((b) => (
              <article
                key={b.id}
                className="p-5 bg-amber-950/20 border border-amber-900/30 rounded-lg hover:border-amber-500/40 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3 text-xs font-mono text-amber-500/80 mb-1">
                  <span>{b.publishedAt}</span>
                  <span>·</span>
                  <span>{b.readingTimeMinutes} min read</span>
                </div>
                <h4 className="text-lg font-serif text-amber-100 hover:text-amber-300">
                  {b.title}
                </h4>
                <p className="text-xs text-amber-200/60 mt-1.5 line-clamp-2">
                  {b.excerpt}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Frame 5: Epilogue & Inbound */}
        <section className="min-w-[90vw] md:min-w-[70vw] h-full flex flex-col justify-center px-12 md:px-24 snap-start shrink-0">
          <div className="max-w-xl space-y-6">
            <div className="text-[10px] font-mono text-amber-600/70 tracking-widest">
              REEL 05 / EPILOGUE &amp; CONTRACTS
            </div>
            <h3 className="text-3xl md:text-5xl font-serif text-amber-100">
              Initiate Direct Collaboration
            </h3>
            <p className="text-sm text-amber-200/70 leading-relaxed font-sans">
              Currently accepting principal systems contracts, high-performance web applications, and architectural advisory engagements.
            </p>
            <div className="space-y-2 font-mono text-xs text-amber-300/90 pt-2">
              <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded flex justify-between">
                <span>INQUIRIES:</span>
                <span className="font-bold text-amber-400">{identity.socialLinks.email}</span>
              </div>
              <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded flex justify-between">
                <span>HEADQUARTERS:</span>
                <span className="text-amber-200">{identity.location}</span>
              </div>
              <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded flex justify-between">
                <span>GITHUB:</span>
                <span className="text-amber-200">{identity.socialLinks.github}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Scrubber Timeline */}
      <footer className="h-14 px-8 border-t border-amber-950/40 bg-black/70 backdrop-blur-md flex items-center justify-between z-30">
        <div className="flex items-center space-x-2 text-xs font-mono text-amber-500">
          <span>FRAME {String(currentFrame).padStart(2, '0')} OF 05</span>
        </div>

        {/* Scrub Pip Navigation */}
        <div className="flex items-center space-x-4">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={() => scrollToFrame(idx)}
              className="flex items-center space-x-2 group focus:outline-none"
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentFrame === idx + 1
                    ? 'w-8 bg-amber-400'
                    : 'w-2 bg-amber-900 group-hover:bg-amber-600'
                }`}
              />
              <span className="text-[10px] font-mono text-amber-600 hidden group-hover:inline">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Progress percentage */}
        <div className="text-xs font-mono text-amber-500/80">
          {Math.round(scrollProgress * 100)}% SCRUBBED
        </div>
      </footer>
    </div>
  );
};

export default Home;
