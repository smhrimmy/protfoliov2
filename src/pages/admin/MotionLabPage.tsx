import React, { useState } from 'react';
import { 
  Sparkles, RefreshCw, Eye, ShieldCheck, Activity, 
  ExternalLink, Layers, ArrowRight, Zap, CheckCircle2 
} from 'lucide-react';
import { 
  THEME_ANIMATION_FLAVORS, 
  MotionGrid, 
  MotionCard, 
  MotionHeading, 
  ThemeSkeleton,
  resolveThemeFlavor,
  type ThemeNumber
} from '@/animations';
import { mockStorage } from '@/data/mockStorage';

interface MotionLabPageProps {
  onNavigate: (route: string) => void;
}

export const MotionLabPage: React.FC<MotionLabPageProps> = ({ onNavigate }) => {
  const [selectedThemeNum, setSelectedThemeNum] = useState<ThemeNumber>('25');
  const [forceReducedMotion, setForceReducedMotion] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const flavor = THEME_ANIMATION_FLAVORS[selectedThemeNum] || THEME_ANIMATION_FLAVORS['03'];
  const allThemes = Object.values(THEME_ANIMATION_FLAVORS);

  const sampleItems = [
    {
      id: 1,
      title: 'SupportOS — AI Customer Service',
      tag: 'React 19 // TypeScript',
      stat: '99.98% SLA',
      summary: 'High-throughput customer telemetry with automated classification routing.',
    },
    {
      id: 2,
      title: 'OptiTalent HRMS Cloud',
      tag: 'Next.js // ClickHouse',
      stat: '18,400 LOC',
      summary: 'Enterprise human capital operations with automated payroll pipelines.',
    },
    {
      id: 3,
      title: 'CloudShield Edge WAF',
      tag: 'Go // Redis // Tailwind',
      stat: '5.0 / 5.0 Rating',
      summary: 'Zero-trust edge firewall rule orchestrator with real-time DDoS mitigation.',
    },
    {
      id: 4,
      title: 'HyperSync Realtime Engine',
      tag: 'Node.js // WebSockets',
      stat: '24,100 LOC',
      summary: 'Conflict-free replicated state engine powering shared multiplayer whiteboards.',
    },
  ];

  return (
    <div className="motion-lab-scope space-y-8 max-w-7xl mx-auto pb-20 font-sans text-gray-100">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>2026 MOTION SYSTEM ARCHITECTURE</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">ANIMATE-ONCE CONTRACT</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>Motion &amp; Animation Lab</span>
            <span className="text-xs font-mono font-normal px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              All 25 Themes Verified
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Contract: scroll-triggered stagger on grids, strictly animate-once, restraint over abundance, and native WCAG 2.2 <code className="text-pink-400">prefers-reduced-motion</code> accessibility.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setForceReducedMotion(!forceReducedMotion)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
              forceReducedMotion
                ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle simulation of OS prefers-reduced-motion"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Reduced Motion: {forceReducedMotion ? 'SIMULATED ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setShowSkeleton(!showSkeleton)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
              showSkeleton
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{showSkeleton ? 'Show Content' : 'Show Skeleton'}</span>
          </button>

          <button
            onClick={() => setReplayKey(prev => prev + 1)}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-2 shadow-lg transition-all hover:scale-105"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-trigger Reveal</span>
          </button>
        </div>
      </div>

      {/* Theme Selector Rail (01 - 25) */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
          Select Theme Animation Flavor (25 Architectures)
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {allThemes.map((t) => {
            const isSelected = t.number === selectedThemeNum;
            return (
              <button
                key={t.number}
                onClick={() => {
                  setSelectedThemeNum(t.number);
                  setReplayKey(prev => prev + 1);
                }}
                className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-mono shrink-0 transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black shadow-lg scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                }`}
              >
                <span>#{t.number}</span>
                <span className="font-sans font-medium">{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Theme Spec Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0a0d14] p-5 rounded-2xl border border-white/10 text-white">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">// Reveal-in Style</span>
          <p className="text-sm font-bold text-white leading-snug">{flavor.revealStyle}</p>
          <p className="text-xs text-gray-400 font-mono mt-1">Theme #{flavor.number} · {flavor.canonicalId}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest block">// Hover Treatment</span>
          <p className="text-sm font-bold text-white leading-snug">{flavor.hoverTreatment}</p>
          <p className="text-xs text-gray-400 font-mono mt-1">Micro-interaction contract</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">// Loading State</span>
          <p className="text-sm font-bold text-white leading-snug">{flavor.loadingState}</p>
          <p className="text-xs text-gray-400 font-mono mt-1">Theme-tailored skeleton</p>
        </div>
      </div>

      {/* Live Interactive Canvas */}
      <div className="bg-[#0c1017] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8 text-white">
        
        {/* Section Heading under test */}
        <div key={`heading-${replayKey}`}>
          <MotionHeading
            themeId={flavor.number}
            subtitle={`Demonstrating ${flavor.name} motion contract`}
            className="text-2xl sm:text-4xl font-black text-white"
          >
            {flavor.name}: Case Studies
          </MotionHeading>
        </div>

        {/* Content Grid or Skeleton */}
        {showSkeleton ? (
          <div key={`skeleton-${replayKey}`} className="animate-in fade-in duration-300">
            <ThemeSkeleton themeId={flavor.number} count={2} />
          </div>
        ) : (
          <div key={`grid-${replayKey}`}>
            <MotionGrid
              themeId={flavor.number}
              forceReducedMotion={forceReducedMotion}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {sampleItems.map((item, idx) => (
                <MotionCard
                  key={item.id}
                  index={idx}
                  themeId={flavor.number}
                  className="bg-[#121722] border border-white/15 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl cursor-pointer text-white"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan-400 font-bold">{item.tag}</span>
                      <span className="text-emerald-400 font-bold">{item.stat}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-300 group-hover:text-white transition-colors">
                    <span>Inspect Specification</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </MotionCard>
              ))}
            </MotionGrid>
          </div>
        )}
      </div>

      {/* Complete 25-Theme Matrix Reference */}
      <div className="space-y-4 pt-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>Full 25-Theme Motion Flavor Specification Matrix</span>
        </h2>

        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#090c12]">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400">
                <th className="py-3 px-4 w-12">#</th>
                <th className="py-3 px-4 w-44">Theme</th>
                <th className="py-3 px-4">Reveal-in Style</th>
                <th className="py-3 px-4">Hover Treatment</th>
                <th className="py-3 px-4">Loading State</th>
                <th className="py-3 px-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allThemes.map((t) => (
                <tr 
                  key={t.number}
                  className={`hover:bg-white/[0.03] transition-colors ${t.number === selectedThemeNum ? 'bg-emerald-500/10' : ''}`}
                >
                  <td className="py-3 px-4 font-bold text-emerald-400">{t.number}</td>
                  <td className="py-3 px-4 font-sans font-bold text-white">{t.name}</td>
                  <td className="py-3 px-4 text-gray-300 font-sans">{t.revealStyle}</td>
                  <td className="py-3 px-4 text-pink-300 font-sans">{t.hoverTreatment}</td>
                  <td className="py-3 px-4 text-amber-300 font-sans">{t.loadingState}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedThemeNum(t.number);
                        setReplayKey(prev => prev + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-emerald-500 hover:text-black transition-colors font-bold text-[11px]"
                    >
                      Test
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
