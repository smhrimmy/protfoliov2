import React, { useEffect, useRef, useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { Terminal, Shield, Cpu, Activity, Disc, Target, Radio, ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, blogPosts, onNavigate }) => {
  const [activeHUD, setActiveHUD] = useState<string>('SYS_OVERVIEW');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Signature Interaction: Luminous cursor trail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: { x: number; y: number; age: number }[] = [];
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      points.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, age: 0 });
      if (points.length > 25) points.shift();
    };

    window.addEventListener('mousemove', handleMove);

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.forEach(p => {
        p.age += 1;
        const opacity = Math.max(0, 1 - p.age / 20);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, 4 - p.age / 5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${opacity})`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      points = points.filter(p => p.age < 20);
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#e0f2fe] font-mono overflow-hidden select-none">
      {/* Canvas for Luminous Cursor Trail */}
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} className="fixed inset-0 pointer-events-none z-40" />

      {/* Scanline CRT overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-20 scanlines" />

      {/* Side-Docked Vertical Icon Rail */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 bg-[#0b1329]/80 backdrop-blur-md border-r border-[#0284c7]/30 flex flex-col items-center py-6 justify-between z-20">
        <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff]">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>

        <nav className="flex flex-col gap-6">
          <button onClick={() => setActiveHUD('SYS_OVERVIEW')} className={`p-2.5 rounded-lg border transition-all ${activeHUD === 'SYS_OVERVIEW' ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}>
            <Terminal className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveHUD('NODES')} className={`p-2.5 rounded-lg border transition-all ${activeHUD === 'NODES' ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}>
            <Target className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveHUD('TRANSMISSION')} className={`p-2.5 rounded-lg border transition-all ${activeHUD === 'TRANSMISSION' ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}>
            <Radio className="w-5 h-5" />
          </button>
        </nav>

        <span className="text-[10px] text-[#00f0ff] tracking-widest rotate-90">HUD_v2.0</span>
      </aside>

      {/* Viewport Content */}
      <main className="pl-20 pr-6 py-8 max-w-7xl mx-auto space-y-6">
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between border border-[#0284c7]/40 bg-[#0b1329]/60 p-4 rounded-xl shadow-[0_0_15px_rgba(2,132,199,0.1)]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-xs tracking-wider text-[#00f0ff] font-bold">OPERATOR // {identity.name.toUpperCase()} [{identity.alias}]</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-[#38bdf8]">
            <span>STATUS: COMBAT_READY</span>
            <span>SHIPPED: {identity.stats.projectsShipped}</span>
            <span>REV: {identity.stats.revenueInfluenced}</span>
          </div>
        </div>

        {/* Freeform Overlapping HUD Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Terminal Screen */}
          <section className="lg:col-span-8 bg-[#0b1329]/70 border border-[#0284c7]/30 rounded-2xl p-6 relative overflow-hidden space-y-6">
            <div className="flex justify-between items-center text-xs border-b border-[#0284c7]/20 pb-3">
              <span className="text-[#00f0ff]">PRIMARY NEURAL DISPLAY // {activeHUD}</span>
              <span className="text-gray-500">RES_COORD: 1920x1080</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
                {identity.tagline}
              </h2>
              <p className="text-xs text-[#38bdf8] leading-relaxed max-w-2xl">{identity.bio}</p>
            </div>

            {/* Tactical Projects Grid */}
            <div className="space-y-3">
              <span className="text-xs text-[#00f0ff] uppercase tracking-wider block">TARGET NODES [PROJECTS]</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    onClick={() => onNavigate(`/projects/${proj.slug}`)}
                    className="p-4 rounded-xl bg-[#030712] border border-[#0284c7]/40 hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-[#00f0ff]">NODE_0{idx + 1}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#00f0ff]" />
                    </div>
                    <p className="font-bold text-white text-sm group-hover:text-[#00f0ff]">{proj.title}</p>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{proj.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Telemetry Radar & Uplink */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0b1329]/70 border border-[#0284c7]/30 rounded-2xl p-6 space-y-4">
              <span className="text-xs text-[#00f0ff] uppercase tracking-wider block">TELEMETRY DIAGNOSTIC</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1"><span>ARCHITECTURE:</span><span className="text-white">EDGE / THREE.JS</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span>CORE PROTOCOL:</span><span className="text-white">AGENTIC / TS</span></div>
                <div className="flex justify-between"><span>LOCATION:</span><span className="text-white">{identity.location}</span></div>
              </div>
            </div>

            <div className="bg-[#0b1329]/70 border border-[#0284c7]/30 rounded-2xl p-6 space-y-3">
              <span className="text-xs text-[#00f0ff] uppercase tracking-wider block">TRANSMIT UPLINK</span>
              <p className="text-xs text-gray-400">Direct encrypted transmission link to operator.</p>
              <a
                href={`mailto:${identity.socialLinks.email}`}
                className="block text-center py-2.5 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff] rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                DISPATCH UPLINK
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
