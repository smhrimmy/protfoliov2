import React, { useRef, useEffect, useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Project } from '@/types/portfolio';
import { ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, onNavigate, config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [glitchActive, setGlitchActive] = useState(false);

  // 3D Canvas Wireframe & Projector Beam loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angleX = 0;
    let angleY = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const size = 120;
    const vertices = [
      [-size, -size, -size],
      [ size, -size, -size],
      [ size,  size, -size],
      [-size,  size, -size],
      [-size, -size,  size],
      [ size, -size,  size],
      [ size,  size,  size],
      [-size,  size,  size],
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    const renderHologram = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const emitterX = w / 2;
      const emitterY = h - 60;
      const beamGrad = ctx.createRadialGradient(emitterX, emitterY, 10, emitterX, h / 2, Math.max(w, h));
      beamGrad.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
      beamGrad.addColorStop(0.4, 'rgba(16, 185, 129, 0.06)');
      beamGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(emitterX - 100, emitterY);
      ctx.lineTo(w * 0.1, 0);
      ctx.lineTo(w * 0.9, 0);
      ctx.lineTo(emitterX + 100, emitterY);
      ctx.closePath();
      ctx.fill();

      const targetAngleY = ((mouseX - w / 2) / w) * 2;
      const targetAngleX = ((mouseY - h / 2) / h) * 2;
      angleY += (targetAngleY - angleY) * 0.05 + 0.01;
      angleX += (targetAngleX - angleX) * 0.05;

      const fov = 400;
      const projected = vertices.map(([x, y, z]) => {
        let rx = x * Math.cos(angleY) + z * Math.sin(angleY);
        let rz = -x * Math.sin(angleY) + z * Math.cos(angleY);
        let ry = y * Math.cos(angleX) - rz * Math.sin(angleX);
        rz = y * Math.sin(angleX) + rz * Math.cos(angleX);

        const depth = rz + 450;
        const scale = fov / depth;
        return {
          x: w / 2 + rx * scale,
          y: h / 2.3 + ry * scale,
          scale
        };
      });

      ctx.strokeStyle = glitchActive ? '#f43f5e' : '#10b981';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = glitchActive ? '#f43f5e' : '#10b981';
      ctx.shadowBlur = 12;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      projected.forEach((p) => {
        ctx.fillStyle = '#6ee7b7';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.03)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1.5);
      }

      animId = requestAnimationFrame(renderHologram);
    };

    animId = requestAnimationFrame(renderHologram);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [glitchActive]);

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 250);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none font-mono text-emerald-400 flex flex-col justify-between"
      style={{ backgroundColor: config?.colorTokens.bgPrimary || '#021008' }}
    >
      {/* Background 3D Wireframe Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Top Phosphor Telemetry Bar */}
      <header className="relative z-20 h-14 border-b border-emerald-500/30 px-6 flex items-center justify-between bg-black/60 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold tracking-widest text-sm text-emerald-300">
            HOLO://STAGE.{identity.alias}
          </span>
          <span className="text-[10px] text-emerald-600 hidden md:inline">
            // FREQ: 5.8 GHz // CH-09
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <button
            onClick={() => onNavigate && onNavigate('/admin')}
            className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 text-xs transition-colors"
          >
            ADMIN OS
          </button>
        </div>
      </header>

      {/* Main Hologram Floating Stage Content */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 pointer-events-none">
        {/* Left Telemetry Feed */}
        <div className="w-full md:w-80 space-y-4 pointer-events-auto bg-black/70 border border-emerald-500/40 p-5 rounded-lg backdrop-blur-md">
          <div className="flex justify-between items-center text-xs text-emerald-500 border-b border-emerald-900 pb-2">
            <span>OPERATOR PROFILE</span>
            <span>ID: {identity.alias}</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              {identity.name}
            </h2>
            <p className="text-xs text-emerald-400/80 mt-0.5">
              {identity.role}
            </p>
          </div>

          <p className="text-xs text-emerald-200/70 leading-relaxed font-sans">
            {identity.bio}
          </p>

          <div className="pt-2 border-t border-emerald-900 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-emerald-600 block">BUILDING</span>
              <span className="font-bold text-emerald-300">{identity.stats.yearsBuilding}</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-600 block">PRODUCTION</span>
              <span className="font-bold text-emerald-300">{identity.stats.projectsShipped} Platforms</span>
            </div>
          </div>
        </div>

        {/* Right Active Projected Case Study */}
        {activeProject && (
          <div className="w-full md:w-96 space-y-4 pointer-events-auto bg-black/70 border border-emerald-500/40 p-5 rounded-lg backdrop-blur-md mt-4 md:mt-0">
            <div className="flex justify-between items-center text-xs text-emerald-500 border-b border-emerald-900 pb-2">
              <span>PROJECTED SYSTEM</span>
              <span className="text-emerald-300 font-bold">{activeProject.role}</span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {activeProject.title}
            </h3>

            <p className="text-xs text-emerald-200/80 leading-relaxed">
              {activeProject.summary}
            </p>

            <div className="flex flex-wrap gap-1">
              {activeProject.technologies.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 border border-emerald-800 bg-emerald-950/60 text-emerald-300">
                  {t}
                </span>
              ))}
            </div>

            {activeProject.liveUrl && (
              <div className="pt-2">
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-emerald-500 text-black font-bold text-xs flex items-center justify-center space-x-2 hover:bg-emerald-400 transition-colors"
                >
                  <span>BEAM TO LIVE DEPLOYMENT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Projector Base Control Panel */}
      <footer className="relative z-20 h-20 border-t-2 border-emerald-500/50 px-6 flex items-center justify-between bg-black/90 backdrop-blur-md">
        <div className="flex items-center space-x-2 overflow-x-auto py-1">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => { setActiveProject(proj); triggerGlitch(); }}
              className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap border transition-all ${
                activeProject?.id === proj.id
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/30'
                  : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60 hover:border-emerald-500/60'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4 text-xs">
          <button
            onClick={triggerGlitch}
            className="px-3 py-1.5 border border-red-500/40 text-red-400 hover:bg-red-500/20 text-xs font-bold"
          >
            INJECT GLITCH
          </button>
          <div className="text-right text-[10px] text-emerald-600">
            <div>3D MATRIX WIREFRAME v2.0</div>
            <div>STATUS: OPTIMAL PROJECTION</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
