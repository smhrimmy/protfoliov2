import React, { useState, useEffect } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Crosshair, Layers, ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, skillCategories, onNavigate, config }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [activeLayer, setActiveLayer] = useState<'all' | 'schematics' | 'stack' | 'specs'>('all');
  const [activeProject, setActiveProject] = useState(projects[0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const allSkills = skillCategories.flatMap(c => c.skills);

  return (
    <div
      className="min-h-screen relative font-mono text-cyan-200 select-none overflow-x-hidden"
      style={{
        backgroundColor: config?.colorTokens.bgPrimary || '#0a192f',
        backgroundImage: `
          linear-gradient(to right, rgba(100, 255, 218, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(100, 255, 218, 0.05) 1px, transparent 1px),
          linear-gradient(to right, rgba(100, 255, 218, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(100, 255, 218, 0.12) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px'
      }}
    >
      {/* Top CAD Metric Ruler */}
      <div className="h-6 w-full border-b border-cyan-500/30 flex items-center justify-between px-4 text-[9px] text-cyan-400/60 sticky top-0 bg-[#0a192f]/90 backdrop-blur z-40 overflow-hidden">
        <div className="hidden sm:flex space-x-6 overflow-hidden">
          <span>0.00mm</span>
          <span>100.00mm</span>
          <span>200.00mm</span>
          <span>300.00mm</span>
          <span>400.00mm</span>
          <span>500.00mm</span>
          <span>600.00mm</span>
          <span>700.00mm</span>
        </div>
        <div className="flex items-center space-x-2 text-cyan-300 font-bold truncate">
          <Crosshair className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="truncate">X: {coords.x}mm | Y: {coords.y}mm</span>
          <button
            onClick={() => onNavigate && onNavigate('/admin')}
            className="ml-2 px-2 py-0.5 border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 text-[9px] shrink-0"
          >
            [ ADMIN ]
          </button>
        </div>
      </div>

      {/* Main Drafting Canvas Container */}
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        {/* Header CAD Specification Banner */}
        <div className="border-2 border-cyan-400/60 p-6 relative bg-[#0b1d38]/80 backdrop-blur shadow-2xl">
          <div className="absolute -top-3 left-4 bg-[#0a192f] px-2 text-xs font-bold text-cyan-300 tracking-wider">
            SYSTEM SPECIFICATION SHEET // DWG-PDL-01
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>{identity.name}</span>
                <span className="text-xs px-2 py-0.5 border border-cyan-400 text-cyan-300">
                  {identity.alias}
                </span>
              </h1>
              <p className="text-xs text-cyan-400/80 mt-1">
                {identity.role} // {identity.location} // STATUS: ACTIVE
              </p>
            </div>

            {/* Layer Selection Tabs */}
            <div className="flex items-center space-x-1 border border-cyan-500/40 p-1 bg-[#0a192f]">
              <span className="text-[10px] text-cyan-400/60 px-2 flex items-center gap-1">
                <Layers className="w-3 h-3" /> LAYERS:
              </span>
              {(['all', 'schematics', 'stack', 'specs'] as const).map(layer => (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-3 py-1 text-xs uppercase transition-colors ${
                    activeLayer === layer
                      ? 'bg-cyan-400 text-black font-bold'
                      : 'text-cyan-300 hover:bg-cyan-400/20'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 text-xs text-cyan-200/70 leading-relaxed max-w-4xl">
            {identity.bio}
          </div>
        </div>

        {/* Viewport A-A: Schematics & Featured Systems */}
        {(activeLayer === 'all' || activeLayer === 'schematics') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/40 pb-2">
              <span className="text-xs font-bold text-cyan-300 tracking-wider">
                SECTION A-A: ARCHITECTURAL BLUEPRINTS ({projects.length} SPECIFIED ENGINES)
              </span>
              <span className="text-[10px] text-cyan-400/60">TOLERANCE: +/- 0.001 MS LATENCY</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Schematics List */}
              <div className="space-y-3 lg:col-span-1">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className={`p-4 border cursor-pointer transition-all ${
                      activeProject?.id === proj.id
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-lg text-white'
                        : 'border-cyan-500/20 bg-[#0a192f]/60 text-cyan-300/70 hover:border-cyan-400/50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold">{proj.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 border border-cyan-500/40">
                        {proj.role}
                      </span>
                    </div>
                    <p className="text-[11px] line-clamp-2 text-cyan-300/80">{proj.summary}</p>
                  </div>
                ))}
              </div>

              {/* Active Project Blueprint Detail */}
              {activeProject && (
                <div className="lg:col-span-2 border-2 border-cyan-400/40 p-6 bg-[#0b1d38]/90 relative flex flex-col justify-between">
                  <div className="absolute top-2 right-3 text-[10px] text-cyan-500/80">
                    REF NO: {activeProject.id.toUpperCase()}
                  </div>

                  <div className="space-y-4">
                    <div className="inline-block px-2 py-0.5 bg-cyan-400 text-black text-xs font-bold">
                      CAD COMPONENT SCHEMATIC
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      {activeProject.title}
                    </h3>

                    <p className="text-xs text-cyan-200 leading-relaxed">
                      {activeProject.caseStudyBody || activeProject.summary}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[10px] text-cyan-400 font-bold uppercase">
                        Material Stack Specification:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.technologies.map(t => (
                          <span key={t} className="px-2 py-1 border border-cyan-500/40 bg-[#0a192f] text-xs text-cyan-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-cyan-500/30 flex items-center justify-between mt-6">
                    <span className="text-[10px] text-cyan-500">ENGINEERING STATUS: VERIFIED IN PRODUCTION</span>
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>INSPECT LIVE DEPLOYMENT</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Viewport B-B: Stack & Technical Competencies */}
        {(activeLayer === 'all' || activeLayer === 'stack') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/40 pb-2">
              <span className="text-xs font-bold text-cyan-300 tracking-wider">
                SECTION B-B: TECHNICAL RUNTIME CAPABILITIES
              </span>
              <span className="text-[10px] text-cyan-400/60">STANDARD COMPLIANCE: ISO-9001</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allSkills.map((s) => (
                <div key={s.name} className="border border-cyan-500/30 p-3 bg-[#0b1d38]/50">
                  <div className="font-bold text-sm text-white mt-1">{s.name}</div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-cyan-300">
                    <span>INDEX: {s.level}%</span>
                    <span>ACTIVE: YES</span>
                  </div>
                  <div className="w-full bg-[#0a192f] border border-cyan-500/40 h-1.5 mt-1">
                    <div className="bg-cyan-400 h-full" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Viewport C-C: Blueprint Title Block (Bottom Right Engineering Stamp) */}
        <div className="flex justify-end pt-6">
          <div className="w-full md:w-96 border-2 border-cyan-400 bg-[#0a192f] text-[10px]">
            <div className="grid grid-cols-2 border-b border-cyan-400 p-2">
              <div>
                <span className="text-cyan-500 block">PROJECT:</span>
                <span className="font-bold text-white">PDL PORTFOLIO OS</span>
              </div>
              <div className="border-l border-cyan-400 pl-2">
                <span className="text-cyan-500 block">DRAWING NO:</span>
                <span className="font-bold text-cyan-300">PDL-2026-ARCH</span>
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-cyan-400 p-2 text-center">
              <div>
                <span className="text-cyan-500 block">SCALE:</span>
                <span className="font-bold">1:1 N.T.S.</span>
              </div>
              <div className="border-l border-cyan-400">
                <span className="text-cyan-500 block">REV:</span>
                <span className="font-bold text-cyan-300">REV 2.0</span>
              </div>
              <div className="border-l border-cyan-400">
                <span className="text-cyan-500 block">STATUS:</span>
                <span className="font-bold text-green-400">APPROVED</span>
              </div>
            </div>
            <div className="p-2 flex justify-between items-center">
              <div>
                <span className="text-cyan-500 block">ENGINEER:</span>
                <span className="font-bold text-white">{identity.name.toUpperCase()}</span>
              </div>
              <div className="text-right">
                <span className="text-cyan-500 block">LOCATION:</span>
                <span>{identity.location.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
