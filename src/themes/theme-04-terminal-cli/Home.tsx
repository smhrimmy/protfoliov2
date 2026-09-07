import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  Play, Box, Layers, Film, ArrowUpRight, Mail, 
  Sparkles, ExternalLink, X, Monitor, Cpu
} from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  onNavigate 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showReelModal, setShowReelModal] = useState(false);
  const [breakdownMode, setBreakdownMode] = useState<'final' | 'clay' | 'wireframe'>('final');

  const categories = ['All', 'Character Design', 'Environment Art', 'Product Viz', 'Motion'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.role.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 4)));

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f3f4f6] font-sans antialiased selection:bg-amber-500 selection:text-black">
      {/* Sleek Dark Header */}
      <header className="sticky top-0 z-40 bg-[#07080b]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Box className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-wide block">{identity.name}</span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">3D ARTIST & MOTION</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-gray-400">
            <a href="#work" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#breakdown" className="hover:text-white transition-colors">Breakdowns</a>
            <a href="#about" className="hover:text-white transition-colors">Studio & Specs</a>
            <a href="#contact" className="hover:text-white transition-colors">Commissions</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReelModal(true)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-2 border border-white/10 transition-colors"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Watch Reel</span>
            </button>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-xs font-mono text-gray-500 hover:text-white px-2 py-1"
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="space-y-36 pb-32">
        
        {/* ============================================================
            HERO SECTION
            - Full-screen 3D render presentation
            - Title overlay
            - Reel button & Explore Work CTA
           ============================================================ */}
        <section className="relative min-h-[85vh] flex items-end p-8 sm:p-16 max-w-7xl mx-auto">
          {/* Hero Background Render */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden mx-4 sm:mx-6 my-4 bg-zinc-950 border border-white/[0.08]">
            <img
              src={projects[0]?.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600'}
              alt="Hero 3D Still"
              className="w-full h-full object-cover opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/40 to-transparent" />
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMISSIONS OPEN FOR 2026</span>
            </div>

            <h1 className="text-4xl sm:text-7xl font-bold tracking-tight text-white leading-none">
              High-Fidelity 3D CGI & Spatial Worlds.
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl leading-relaxed">
              Specializing in cinematic lighting, procedural texturing, character sculpting,
              and photorealistic product rendering for global brands.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#work"
                className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setShowReelModal(true)}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/20 transition-colors flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play 2026 Reel (1:45)</span>
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
            WORK / PROJECT GRID
            - Category filters
            - High-res render grid
           ============================================================ */}
        <section id="work" className="max-w-7xl mx-auto px-6 space-y-10 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/[0.08] pb-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Selected 3D Renders
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-white/[0.05] text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <article
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group cursor-pointer rounded-2xl bg-zinc-900/60 border border-white/[0.08] overflow-hidden hover:border-amber-500/40 transition-all duration-300 space-y-4"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-gray-300">
                    {proj.role}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{proj.summary}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white shrink-0 ml-3" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            RENDER BREAKDOWN SECTION
            - Side-by-side: Wireframe / Clay / Final Lighting
           ============================================================ */}
        <section id="breakdown" className="max-w-7xl mx-auto px-6 space-y-8 scroll-mt-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/50 border border-white/[0.08] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">// Technical Breakdown</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Topology, Shading & Lighting Pipeline
                </h2>
              </div>

              {/* Mode Toggle */}
              <div className="p-1 rounded-xl bg-black/60 border border-white/10 flex items-center gap-1 font-mono text-xs">
                <button
                  onClick={() => setBreakdownMode('wireframe')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    breakdownMode === 'wireframe' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Wireframe
                </button>
                <button
                  onClick={() => setBreakdownMode('clay')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    breakdownMode === 'clay' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Clay Render
                </button>
                <button
                  onClick={() => setBreakdownMode('final')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    breakdownMode === 'final' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Final Lit Still
                </button>
              </div>
            </div>

            {/* Simulated Breakdown Viewport */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black relative border border-white/10 shadow-2xl">
              <img
                src={projects[1]?.coverImage || projects[0]?.coverImage}
                alt="Breakdown inspect"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  breakdownMode === 'wireframe' ? 'invert opacity-80 contrast-200 hue-rotate-90' :
                  breakdownMode === 'clay' ? 'grayscale contrast-125 brightness-125' :
                  'opacity-100'
                }`}
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/80 font-mono text-xs text-amber-400 border border-amber-500/30">
                PASS: {breakdownMode.toUpperCase()}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            ABOUT & HARDWARE SPECS
           ============================================================ */}
        <section id="about" className="max-w-7xl mx-auto px-6 space-y-12 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-6 space-y-6">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Crafting worlds with mathematical precision.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {identity.bio}
              </p>
              <div className="space-y-2 font-mono text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">Software:</span>
                  <span>Blender, Unreal Engine 5.4, Houdini, ZBrush, Cinema 4D, Octane</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">Specialties:</span>
                  <span>Photoreal product rendering, procedural environments, micro-animations</span>
                </div>
              </div>
            </div>

            {/* Hardware Specs Card (3D artists care about this) */}
            <div className="md:col-span-6 p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.08] space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold pb-2 border-b border-white/[0.06]">
                <Monitor className="w-4 h-4" />
                <span>STUDIO WORKSTATION SPECIFICATIONS</span>
              </div>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">GPU Rig:</span>
                  <span>Dual NVIDIA RTX 4090 24GB VRAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Processor:</span>
                  <span>AMD Ryzen 9 7950X 16-Core @ 5.7GHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Memory:</span>
                  <span>128GB DDR5 6000MHz ECC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Color Grading:</span>
                  <span>Calibrated ProArt 4K HDR 100% DCI-P3</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            CONTACT / COMMISSIONS
           ============================================================ */}
        <section id="contact" className="max-w-7xl mx-auto px-6 scroll-mt-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/80 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-white tracking-tight">Commission a Project</h2>
              <p className="text-sm text-gray-400">Available for commercial campaigns, product stills, and animations.</p>
            </div>
            <a
              href={`mailto:${identity.socialLinks.email}`}
              className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs font-mono transition-colors shrink-0"
            >
              Initiate Commission Inquiry
            </a>
          </div>
        </section>

      </main>

      {/* Showreel Modal */}
      {showReelModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="w-full max-w-4xl bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden relative space-y-4 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-amber-400 font-bold">2026 SHOWREEL · CINEMATIC HIGHLIGHTS</span>
              <button onClick={() => setShowReelModal(false)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[16/9] w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center relative">
              <img
                src={projects[0]?.coverImage}
                alt="Reel Still"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute text-center space-y-2">
                <Play className="w-16 h-16 text-amber-400 fill-amber-400 mx-auto" />
                <p className="text-xs font-mono text-white">4K 60FPS Showcase Stream</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 text-xs font-mono text-gray-500 text-center">
        © 2026 {identity.name}. All 3D assets and renders protected by copyright.
      </footer>
    </div>
  );
};
