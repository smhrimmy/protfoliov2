import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  Play, Box, Layers, Film, ArrowUpRight, Cpu, 
  Sparkles, Sliders, Eye, RefreshCw, Maximize2, Monitor
} from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  onNavigate 
}) => {
  const [activeShader, setActiveShader] = useState<'lit' | 'wireframe' | 'clay' | 'normal' | 'depth'>('lit');
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  const selectedProject = projects[activeFrameIndex % projects.length] || projects[0];

  return (
    <div className="min-h-screen bg-[#060709] text-[#e2e8f0] font-mono antialiased selection:bg-amber-500 selection:text-black w-full max-w-full overflow-x-hidden">
      
      {/* 1. CINEMA STUDIO HEADER */}
      <header className="sticky top-0 z-40 bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.08] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wide text-xs">{identity.name}</span>
              <span className="text-[10px] text-gray-500 hidden sm:inline ml-2">3D VFX & Motion Director</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>RENDER RIG: READY</span>
            </div>
            <button
              onClick={() => onNavigate('/admin')}
              className="px-3 py-1 rounded border border-white/10 text-gray-400 hover:text-white transition-colors text-xs"
            >
              Admin OS
            </button>
          </div>
        </div>
      </header>

      {/* 2. THE 3D VIEWPORT STAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16 space-y-6">
        
        {/* Viewport Chrome Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0f131a] p-3 rounded-2xl border border-white/[0.08] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              CAMERA_01: PERSPECTIVE [45mm]
            </span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="text-gray-400 text-[11px] hidden sm:inline">
              ACEScg · 3840×2160 · 60fps
            </span>
          </div>

          {/* Shader Mode Switches */}
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/[0.08] text-[11px]">
            {[
              { id: 'lit', label: 'Lit (PBR)' },
              { id: 'wireframe', label: 'Wireframe' },
              { id: 'clay', label: 'Clay (AO)' },
              { id: 'normal', label: 'Normals' },
              { id: 'depth', label: 'Depth' }
            ].map(shader => (
              <button
                key={shader.id}
                onClick={() => setActiveShader(shader.id as any)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeShader === shader.id
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {shader.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Viewport Frame */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-black border border-white/[0.1] shadow-2xl group">
          {/* Active Project Cover with Shader Simulation */}
          {selectedProject.coverImage ? (
            <img
              src={selectedProject.coverImage}
              alt={selectedProject.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                activeShader === 'lit' 
                  ? 'brightness-100 contrast-105' 
                  : activeShader === 'clay'
                  ? 'grayscale brightness-125 contrast-150'
                  : activeShader === 'normal'
                  ? 'hue-rotate-90 saturate-200 contrast-125'
                  : activeShader === 'depth'
                  ? 'invert grayscale contrast-200'
                  : 'brightness-75 contrast-125'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              [NO_RENDER_BUFFER]
            </div>
          )}

          {/* Wireframe Overlay Simulation */}
          {activeShader === 'wireframe' && (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff6615_1px,transparent_1px),linear-gradient(to_bottom,#00ff6615_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          )}

          {/* Viewport HUD Elements */}
          <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[10px] space-y-1 font-mono">
            <div className="text-amber-400 font-bold uppercase">TARGET: {selectedProject.title}</div>
            <div className="text-gray-400">DISCIPLINE: {selectedProject.role}</div>
            <div className="text-gray-400">POLYCOUNT: 1,420,800 TRIS</div>
          </div>

          <div className="absolute top-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-right font-mono hidden sm:block">
            <div className="text-emerald-400 font-bold">CYCLE_TIME: 14.2 ms</div>
            <div className="text-gray-400">MEMORY: 11.4 GB / 24 GB</div>
            <div className="text-gray-400">OCTANE KERNEL: PMC PATH</div>
          </div>

          {/* Bottom Action Bar inside Viewport */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
            <div className="truncate pr-4">
              <h3 className="font-bold text-white text-sm font-sans truncate">{selectedProject.title}</h3>
              <p className="text-gray-400 text-xs truncate hidden sm:block">{selectedProject.summary}</p>
            </div>
            <button
              onClick={() => onNavigate(`/projects/${selectedProject.slug || selectedProject.id}`)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 text-xs shadow-lg shadow-amber-500/20"
            >
              <span>Inspect Breakdown</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filmstrip Motion Timeline Scrubber */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-white font-bold">PROJECT FILMSTRIP TIMELINE</span>
            </div>
            <span className="text-[11px] text-gray-500">
              FRAME 0{activeFrameIndex + 1} OF 0{projects.length}
            </span>
          </div>

          {/* Thumbnail Track */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveFrameIndex(idx)}
                className={`p-2 rounded-xl border text-left transition-all ${
                  activeFrameIndex === idx
                    ? 'bg-amber-500/10 border-amber-500 text-white ring-2 ring-amber-500/30'
                    : 'bg-white/[0.02] border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div className="aspect-video rounded-lg overflow-hidden bg-black mb-2 border border-white/[0.06]">
                  {proj.coverImage && (
                    <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="text-[10px] text-amber-400 font-bold uppercase truncate">
                  0{idx + 1} // {proj.date || '2024'}
                </div>
                <div className="text-xs font-bold text-white truncate font-sans">{proj.title}</div>
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* 3. HARDWARE BENCHMARK & WORKSTATION RIG HUD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-white/[0.08] space-y-8">
        <div className="space-y-1">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">// Production Rig</span>
          <h2 className="text-2xl font-bold text-white font-sans">Hardware & Pipeline Specifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-[#0e1219] border border-white/[0.08] space-y-2">
            <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Compute Cluster</span>
            <h4 className="text-sm font-bold text-white">Dual RTX 4090 24GB</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              48GB Unified VRAM for real-time volumetric path tracing and large scene geometry.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1219] border border-white/[0.08] space-y-2">
            <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Host System</span>
            <h4 className="text-sm font-bold text-white">Threadripper Pro · 128GB</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              64-Core high frequency architecture with DDR5 ECC memory for fluid physics sims.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1219] border border-white/[0.08] space-y-2">
            <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Color Pipeline</span>
            <h4 className="text-sm font-bold text-white">ACEScg / OpenColorIO</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Standardized theatrical wide-gamut linear pipeline calibrated for Hollywood mastering.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e1219] border border-white/[0.08] space-y-2">
            <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Software Suite</span>
            <h4 className="text-sm font-bold text-white">Houdini · Blender · Unreal</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Octane, Redshift, Substance 3D, and Three.js WebGL shader engineering.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#080a0e] py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>3D VFX Studio Engine · Ready for Commercial Commissions</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/admin')} className="hover:text-white transition-colors">
              Admin OS
            </button>
            <span>© {new Date().getFullYear()} {identity.name}</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
