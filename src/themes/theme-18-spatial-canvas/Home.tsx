import React, { useState, useRef, useEffect } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Project } from '@/types/portfolio';
import { ZoomIn, ZoomOut, Maximize2, ExternalLink, X } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, onNavigate, config }) => {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0, initX: 0, initY: 0 });
  const [selectedNode, setSelectedNode] = useState<Project | null>(null);

  // Center view on mount
  useEffect(() => {
    setPan({
      x: window.innerWidth / 2 - 400,
      y: window.innerHeight / 2 - 300
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.interactive-node')) return;
    setIsPanning(true);
    startPanRef.current = {
      x: e.clientX,
      y: e.clientY,
      initX: pan.x,
      initY: pan.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - startPanRef.current.x;
    const dy = e.clientY - startPanRef.current.y;
    setPan({
      x: startPanRef.current.initX + dx,
      y: startPanRef.current.initY + dy
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom(prev => Math.min(1.8, Math.max(0.5, prev + zoomDelta)));
  };

  const resetView = () => {
    setPan({
      x: window.innerWidth / 2 - 400,
      y: window.innerHeight / 2 - 300
    });
    setZoom(1);
  };

  const root = { x: 400, y: 300 };
  const projectNodes = projects.map((p: Project, idx: number) => {
    const angle = (idx / projects.length) * Math.PI * 2;
    const radius = 340;
    return {
      project: p,
      x: root.x + Math.cos(angle) * radius,
      y: root.y + Math.sin(angle) * radius
    };
  });

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className={`relative w-full max-w-full h-screen overflow-hidden select-none font-sans text-indigo-100 ${
        isPanning ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        backgroundColor: config?.colorTokens.bgPrimary || '#0c0f1d',
        backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Top Floating Controls Bar */}
      <header className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 z-30 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-2 bg-gray-900/80 backdrop-blur-md border border-indigo-500/30 px-3 py-1.5 rounded-xl shadow-xl truncate">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
          <span className="font-bold text-xs sm:text-sm text-white truncate">
            {identity.name}
          </span>
          <span className="text-xs text-indigo-400 border-l border-gray-700 pl-2 hidden sm:inline">
            Infinite Spatial Canvas
          </span>
        </div>

        <div className="pointer-events-auto flex items-center space-x-1.5 bg-gray-900/80 backdrop-blur-md border border-indigo-500/30 p-1 rounded-xl shadow-xl shrink-0 text-xs">
          <button
            onClick={() => setZoom(prev => Math.min(1.8, prev + 0.15))}
            className="p-1 text-gray-400 hover:text-white rounded hover:bg-gray-800"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-indigo-300 px-1">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.15))}
            className="p-1 text-gray-400 hover:text-white rounded hover:bg-gray-800"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetView}
            className="p-1 text-gray-400 hover:text-white rounded hover:bg-gray-800 hidden sm:inline-block"
            title="Reset to Center"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <div className="border-l border-gray-700 pl-1">
            <button
              onClick={() => onNavigate && onNavigate('/admin')}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Infinite Canvas Viewport Plane */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          transition: isPanning ? 'none' : 'transform 0.1s ease-out'
        }}
        className="absolute top-0 left-0 w-[2000px] h-[2000px] pointer-events-none"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {projectNodes.map((pn, idx: number) => (
            <g key={idx}>
              <path
                d={`M ${root.x} ${root.y} Q ${(root.x + pn.x) / 2} ${(root.y + pn.y) / 2 + 50} ${pn.x} ${pn.y}`}
                fill="none"
                stroke="rgba(99, 102, 241, 0.35)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle
                cx={(root.x + pn.x) / 2}
                cy={(root.y + pn.y) / 2 + 25}
                r="3"
                fill="#6366f1"
              />
            </g>
          ))}
        </svg>

        {/* Central Core Root Node */}
        <div
          style={{ transform: `translate(${root.x - 140}px, ${root.y - 90}px)` }}
          className="absolute w-72 bg-indigo-950/90 border-2 border-indigo-500 rounded-2xl p-6 shadow-2xl backdrop-blur-md pointer-events-auto interactive-node text-center space-y-3"
        >
          <div className="inline-block px-3 py-0.5 bg-indigo-600/30 border border-indigo-500/40 rounded-full text-[11px] font-mono text-indigo-300">
            ROOT NODE // {identity.alias}
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {identity.name}
          </h2>
          <p className="text-xs text-indigo-200 leading-relaxed font-sans">
            {identity.bio}
          </p>
          <div className="pt-2 border-t border-indigo-900/60 flex justify-center space-x-4 text-xs font-mono text-indigo-300">
            <span>{identity.stats.yearsBuilding} BUILDING</span>
            <span>·</span>
            <span>{identity.stats.projectsShipped} DEPLOYS</span>
          </div>
        </div>

        {/* Project Orbit Nodes */}
        {projectNodes.map(({ project, x, y }: { project: Project; x: number; y: number }) => (
          <div
            key={project.id}
            onClick={() => setSelectedNode(project)}
            style={{ transform: `translate(${x - 130}px, ${y - 80}px)` }}
            className="absolute w-64 bg-gray-900/90 border border-indigo-500/40 rounded-xl p-4 shadow-xl backdrop-blur-md pointer-events-auto interactive-node hover:border-indigo-400 hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-center text-[10px] font-mono text-indigo-400 mb-1">
              <span>SYSTEM NODE</span>
              <span className="px-1.5 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">
                {project.role}
              </span>
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              {project.title}
            </h4>
            <p className="text-[11px] text-gray-300 line-clamp-2 mt-1">
              {project.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Floating Minimap Radar */}
      <div className="absolute bottom-6 right-6 z-30 w-48 h-36 bg-gray-950/90 border border-indigo-500/30 rounded-xl p-2 shadow-2xl backdrop-blur-md pointer-events-auto">
        <div className="text-[10px] font-mono text-indigo-400 mb-1 flex items-center justify-between">
          <span>SPATIAL RADAR</span>
          <span>NODES: {projects.length + 1}</span>
        </div>
        <div className="relative w-full h-24 bg-gray-900/60 rounded border border-gray-800 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-indigo-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" />
          {projectNodes.map((pn, idx: number) => {
            const angle = (idx / projects.length) * Math.PI * 2;
            const rx = 50 + Math.cos(angle) * 35;
            const ry = 50 + Math.sin(angle) * 35;
            return (
              <div
                key={idx}
                style={{ top: `${ry}%`, left: `${rx}%` }}
                className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              />
            );
          })}
        </div>
      </div>

      {/* Node Detail Inspection Overlay */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm pointer-events-auto">
          <div className="bg-gray-900 border border-indigo-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-gray-100">
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded text-xs font-mono">
              {selectedNode.role}
            </span>

            <h3 className="text-2xl font-bold text-white mt-2 mb-3">
              {selectedNode.title}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {selectedNode.caseStudyBody || selectedNode.summary}
            </p>

            <div className="mb-5">
              <span className="text-xs font-mono text-gray-400 block mb-2">Technology Architecture:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.technologies.map((t: string) => (
                  <span key={t} className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs text-indigo-300 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm rounded-lg"
              >
                Close Node
              </button>
              {selectedNode.liveUrl && (
                <a
                  href={selectedNode.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-lg flex items-center space-x-1.5"
                >
                  <span>Launch Instance</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
