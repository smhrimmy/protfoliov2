import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  Compass, MapPin, Ruler, Building2, Calendar, 
  ArrowUpRight, ArrowDown, ExternalLink, ShieldCheck, Layers
} from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  onNavigate 
}) => {
  const [activeCommissionIdx, setActiveCommissionIdx] = useState(0);
  const activeCommission = projects[activeCommissionIdx % projects.length] || projects[0];

  const materials = [
    { name: 'Rammed Earth & Lime', origin: 'Regional Soil Matrix', property: 'Embodied Carbon: -42 kg/m²' },
    { name: 'Post-Tensioned Timber', origin: 'FSC Certified Alpine Fir', property: 'Structural Span: 18.5m' },
    { name: 'Fluted Low-Iron Glazing', origin: 'Bespoke Annealed', property: 'Solar Gain Coeff: 0.28' },
    { name: 'Brushed Weathered Zinc', origin: 'Patinated Sheet Roll', property: 'Service Life: 120+ Years' }
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1c1d1f] font-sans antialiased selection:bg-[#1c1d1f] selection:text-[#f7f6f2] w-full max-w-full overflow-x-hidden">
      
      {/* 1. DRAFTING ROOM METADATA MASTHEAD */}
      <header className="sticky top-0 z-40 bg-[#f7f6f2]/95 backdrop-blur-md border-b border-black/[0.08] text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-base text-black tracking-tight">{identity.name}</span>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="text-gray-500 hidden sm:inline text-[11px]">
              Spatial Architecture & Structural Monograph
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-gray-400 hidden md:inline">
              COORD: 37°46'N 122°25'W · DATUM: WGS84
            </span>
            <button
              onClick={() => onNavigate('/admin')}
              className="px-3 py-1 border border-black/20 hover:border-black rounded text-black transition-colors"
            >
              Admin OS
            </button>
          </div>
        </div>
      </header>

      {/* 2. ARCHITECTURAL MANIFESTO & COMMISSION FOCUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-20 border-b border-black/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono text-gray-500 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-black" />
              <span>COMMISSION MONOGRAPH // VOL. 08</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-black leading-[1.08] font-normal tracking-tight">
              Spaces sculpted by tectonic discipline and enduring light.
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-light leading-relaxed">
              {identity.bio}
            </p>
          </div>

          {/* Right Blueprint Coordinate Box */}
          <div className="lg:col-span-4 p-6 rounded-xl border border-black/[0.1] bg-white text-xs font-mono space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-2 text-[11px]">
              <span className="text-gray-400 uppercase">OFFICE STATUS</span>
              <span className="text-emerald-700 font-bold">ACCEPTING COMMISSIONS</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">PRINCIPAL ARCHITECT</span>
              <span className="font-bold text-black">{identity.name}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">STUDIO LOCATION</span>
              <span className="text-gray-800">{identity.location}</span>
            </div>
            <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11px]">
              <span className="text-gray-400">REGISTERED WORKS</span>
              <span className="font-bold text-black">{projects.length} Buildings & Pavilions</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. COMMISSION REGISTRY & TECHNICAL BLUEPRINT VIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
              Architectural Ledger
            </span>
            <h2 className="text-3xl font-serif text-black mt-1">Built Works & Master Plans</h2>
          </div>
          <span className="text-xs font-mono text-gray-500">
            Select an entry to examine architectural specs
          </span>
        </div>

        {/* Selected Project Full Plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Plate */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              onClick={() => onNavigate(`/projects/${activeCommission.slug || activeCommission.id}`)}
              className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/5 border border-black/10 cursor-pointer group"
            >
              {activeCommission.coverImage ? (
                <img
                  src={activeCommission.coverImage}
                  alt={activeCommission.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-xs text-gray-400">
                  [PHOTOGRAPHIC_SURVEY_PENDING]
                </div>
              )}
              
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur text-white text-[11px] font-mono">
                PLOT REF: {activeCommission.date || '2024'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-b border-black/[0.08] pb-4">
              <div>
                <span className="text-xs font-mono text-gray-500 uppercase">{activeCommission.role}</span>
                <h3 className="text-2xl font-serif text-black">{activeCommission.title}</h3>
              </div>
              <button
                onClick={() => onNavigate(`/projects/${activeCommission.slug || activeCommission.id}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-lg text-xs font-mono hover:bg-gray-800 transition-colors self-start"
              >
                <span>Read Full Monograph</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-light">
              {activeCommission.summary}
            </p>
          </div>

          {/* Right: Technical Specification Ledger */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block font-bold">
              Project Registry Index
            </span>
            <div className="space-y-2">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setActiveCommissionIdx(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs font-mono ${
                    activeCommissionIdx === idx
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white border-black/[0.08] text-gray-700 hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1 opacity-70">
                    <span>FOLIO 0{idx + 1}</span>
                    <span>{proj.date || '2024'}</span>
                  </div>
                  <div className="font-serif text-sm font-bold truncate">{proj.title}</div>
                  <div className="text-[11px] opacity-80 truncate mt-0.5">{proj.role}</div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. TECTONIC MATERIALS PALETTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-black/[0.08] space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
            Materiality & Craft
          </span>
          <h2 className="text-2xl font-serif text-black">Structural Palette & Material Origins</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {materials.map((mat, i) => (
            <div key={i} className="p-5 rounded-xl bg-white border border-black/[0.08] space-y-2 shadow-sm">
              <div className="text-gray-400 text-[10px] uppercase tracking-wider">SPEC 0{i + 1}</div>
              <h4 className="font-serif text-sm font-bold text-black">{mat.name}</h4>
              <div className="text-gray-600 text-[11px]">{mat.origin}</div>
              <div className="text-[10px] text-emerald-800 font-medium pt-1 border-t border-black/[0.04]">
                {mat.property}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-black/[0.08] bg-[#f0eee6] py-10 text-xs font-mono text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span>© {new Date().getFullYear()} {identity.name} Atelier</span>
            <span className="mx-2">·</span>
            <span>Registered Architectural Practice</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/admin')} className="hover:text-black transition-colors">
              Admin OS
            </button>
            <a href={`mailto:${identity.socialLinks.email}`} className="hover:text-black transition-colors">
              Direct Inquiry
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
