import React, { useEffect, useRef, useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Project } from '@/types/portfolio';
import { RefreshCw, Sparkles, X, ExternalLink } from 'lucide-react';

interface PhysicsBody {
  id: string;
  type: 'project' | 'skill' | 'core';
  title: string;
  subtitle?: string;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  textColor: string;
  projectData?: Project;
}

export const Home: React.FC<ThemePageProps> = ({ identity, projects, skillCategories, onNavigate, config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [gravityMode, setGravityMode] = useState<'normal' | 'zero' | 'vortex'>('normal');

  const bodiesRef = useRef<PhysicsBody[]>([]);
  const isDraggingRef = useRef<{ body: PhysicsBody; offsetX: number; offsetY: number; lastX: number; lastY: number; lastTime: number } | null>(null);

  // Initialize physics bodies
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];
    const bodies: PhysicsBody[] = [];

    // Core Identity Node
    bodies.push({
      id: 'core-pdl',
      type: 'core',
      title: identity.name,
      subtitle: identity.alias,
      radius: 65,
      x: width / 2,
      y: height / 3,
      vx: 0,
      vy: 0,
      color: '#10b981',
      textColor: '#ffffff'
    });

    // Projects
    projects.forEach((proj: Project, idx: number) => {
      bodies.push({
        id: proj.id,
        type: 'project',
        title: proj.title,
        subtitle: proj.role,
        radius: 54,
        x: (width / (projects.length + 1)) * (idx + 1),
        y: 80 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2,
        color: colors[idx % colors.length],
        textColor: '#ffffff',
        projectData: proj
      });
    });

    // Top Skills
    const allSkills = skillCategories.flatMap(c => c.skills);
    allSkills.slice(0, 6).forEach((skill, idx: number) => {
      bodies.push({
        id: `skill-${idx}`,
        type: 'skill',
        title: skill.name,
        subtitle: `${skill.level}%`,
        radius: 40,
        x: 100 + Math.random() * (width - 200),
        y: 50 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 2,
        color: '#374151',
        textColor: '#93c5fd'
      });
    });

    bodiesRef.current = bodies;
  }, [identity, projects, skillCategories]);

  // Physics simulation loop
  useEffect(() => {
    let animId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const runSimulation = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const gravity = gravityMode === 'normal' ? 0.35 : gravityMode === 'vortex' ? 0 : 0;
      const restitution = 0.72; // bounce damping
      const friction = 0.99;

      const bodies = bodiesRef.current;

      // Update positions
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];

        if (!isDraggingRef.current || isDraggingRef.current.body.id !== b.id) {
          if (gravityMode === 'vortex') {
            const cx = w / 2;
            const cy = h / 2;
            const dx = cx - b.x;
            const dy = cy - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            b.vx += (dx / dist) * 0.2;
            b.vy += (dy / dist) * 0.2;
            b.vx += (-dy / dist) * 0.3;
            b.vy += (dx / dist) * 0.3;
          } else {
            b.vy += gravity;
          }

          b.vx *= friction;
          b.vy *= friction;

          b.x += b.vx;
          b.y += b.vy;

          if (b.x - b.radius < 0) {
            b.x = b.radius;
            b.vx = -b.vx * restitution;
          } else if (b.x + b.radius > w) {
            b.x = w - b.radius;
            b.vx = -b.vx * restitution;
          }

          if (b.y - b.radius < 0) {
            b.y = b.radius;
            b.vy = -b.vy * restitution;
          } else if (b.y + b.radius > h) {
            b.y = h - b.radius;
            b.vy = -b.vy * restitution;
          }
        }
      }

      // Ball-to-ball elastic collisions
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const b1 = bodies[i];
          const b2 = bodies[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b1.radius + b2.radius;

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            b1.x -= nx * overlap;
            b1.y -= ny * overlap;
            b2.x += nx * overlap;
            b2.y += ny * overlap;

            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            b1.vx -= p * nx * restitution;
            b1.vy -= p * ny * restitution;
            b2.vx += p * nx * restitution;
            b2.vy += p * ny * restitution;
          }
        }
      }

      // Render bodies
      bodies.forEach(b => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 15;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = b.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = b.type === 'core' ? 'bold 14px sans-serif' : 'bold 12px sans-serif';
        ctx.fillText(b.title, b.x, b.subtitle ? b.y - 7 : b.y);

        if (b.subtitle) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '10px sans-serif';
          ctx.fillText(b.subtitle, b.x, b.y + 11);
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(runSimulation);
    };

    animId = requestAnimationFrame(runSimulation);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [gravityMode]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = bodiesRef.current.length - 1; i >= 0; i--) {
      const b = bodiesRef.current[i];
      const dist = Math.sqrt((mouseX - b.x) ** 2 + (mouseY - b.y) ** 2);
      if (dist <= b.radius) {
        isDraggingRef.current = {
          body: b,
          offsetX: mouseX - b.x,
          offsetY: mouseY - b.y,
          lastX: mouseX,
          lastY: mouseY,
          lastTime: performance.now()
        };
        break;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const now = performance.now();

    const drag = isDraggingRef.current;
    drag.body.x = mouseX - drag.offsetX;
    drag.body.y = mouseY - drag.offsetY;

    const dt = (now - drag.lastTime) || 16;
    drag.body.vx = ((mouseX - drag.lastX) / dt) * 8;
    drag.body.vy = ((mouseY - drag.lastY) / dt) * 8;

    drag.lastX = mouseX;
    drag.lastY = mouseY;
    drag.lastTime = now;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      const b = isDraggingRef.current.body;
      if (b.type === 'project' && b.projectData) {
        if (Math.abs(b.vx) < 1.5 && Math.abs(b.vy) < 1.5) {
          setSelectedProject(b.projectData);
        }
      }
      isDraggingRef.current = null;
    }
  };

  const resetPositions = () => {
    const w = window.innerWidth;
    bodiesRef.current.forEach((b) => {
      b.x = 80 + Math.random() * (w - 160);
      b.y = 80 + Math.random() * 120;
      b.vx = (Math.random() - 0.5) * 6;
      b.vy = Math.random() * 4;
    });
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none font-sans text-emerald-50"
      style={{ backgroundColor: config?.colorTokens.bgPrimary || '#111827' }}
    >
      {/* Floating Elastic Bubble Navigation Header */}
      <header className="absolute top-5 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-3 bg-gray-900/80 backdrop-blur-md border border-emerald-500/30 px-5 py-2.5 rounded-full shadow-2xl">
        <div className="flex items-center space-x-2 border-r border-gray-700 pr-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold text-sm text-emerald-400">{identity.name}</span>
        </div>

        {/* Gravity Control Pips */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setGravityMode('normal')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              gravityMode === 'normal'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Gravity
          </button>
          <button
            onClick={() => setGravityMode('zero')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              gravityMode === 'zero'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Zero-G Float
          </button>
          <button
            onClick={() => setGravityMode('vortex')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              gravityMode === 'vortex'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Vortex
          </button>
        </div>

        <div className="border-l border-gray-700 pl-2 flex items-center space-x-2">
          <button
            onClick={resetPositions}
            title="Scatter physics bodies"
            className="p-1.5 text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate && onNavigate('/admin')}
            className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-full hover:bg-emerald-500/20"
          >
            Admin OS
          </button>
        </div>
      </header>

      {/* Physics Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Instruction Overlay */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none bg-gray-900/70 border border-gray-800 backdrop-blur-sm px-4 py-2.5 rounded-xl text-xs space-y-1 text-gray-300">
        <p className="font-semibold text-emerald-400 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Verlet Physics Sandbox</span>
        </p>
        <p className="text-[11px] text-gray-400">
          • Drag &amp; toss project spheres with mouse momentum
        </p>
        <p className="text-[11px] text-gray-400">
          • Click any project circle to inspect architectural specs
        </p>
      </div>

      {/* Live System Counter */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none text-right font-mono text-xs text-gray-400">
        <div className="text-emerald-400 font-bold text-base">
          {identity.stats.projectsShipped} SHIPPED SYSTEMS
        </div>
        <div>{identity.stats.yearsBuilding} HIGH CONCURRENCY</div>
      </div>

      {/* Project Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-gray-900 border border-emerald-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-gray-100">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold mb-3">
              {selectedProject.role}
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              {selectedProject.summary}
            </p>

            <div className="mb-5">
              <h5 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">
                Tech Stack Specification
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-2.5 py-1 bg-gray-800 border border-gray-700 rounded-md text-xs text-emerald-300 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
              >
                Close Sandbox
              </button>
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-sm flex items-center space-x-1.5"
                >
                  <span>Launch Live</span>
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
