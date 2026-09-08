import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  Smartphone, Layers, ArrowUpRight, CheckCircle2, TrendingUp,
  Sparkles, Sliders, Eye, RefreshCw, Zap, ShieldCheck, ChevronRight
} from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  onNavigate 
}) => {
  // Interactive Mobile Prototype State
  const [prototypeScreen, setPrototypeScreen] = useState<'onboarding' | 'checkout' | 'metrics'>('checkout');
  
  // Before / After State
  const [comparisonMode, setComparisonMode] = useState<'after' | 'before'>('after');

  const activeProject = projects[0] || {
    title: 'Fintech Mobile Architecture',
    role: 'Lead UX Architect',
    summary: 'Redesigning the enterprise mobile transaction ledger from scratch.',
    technologies: ['Figma', 'Prototyping', 'Design Systems', 'React Native']
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200 w-full max-w-full overflow-x-hidden">
      
      {/* 1. PRODUCT STUDIO NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/[0.08] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
            <span className="font-bold text-white tracking-tight text-sm">{identity.name}</span>
            <span className="text-gray-500 hidden sm:inline">·</span>
            <span className="text-gray-400 hidden sm:inline text-xs">{identity.role}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/admin')}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors text-xs font-mono"
            >
              Admin OS
            </button>
            <a
              href={`mailto:${identity.socialLinks.email}`}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors text-xs shadow-lg shadow-indigo-600/20"
            >
              Hire for UX Sprint
            </a>
          </div>
        </div>
      </header>

      {/* 2. INTERACTIVE PRODUCT HERO & LIVE PROTOTYPE STAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Product Manifesto & Problem Framing */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive UX & Product Design Lab</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Transforming complex workflows into effortless digital products.
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              {identity.bio}
            </p>

            {/* Impact Metric Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+142%</span>
                </div>
                <span className="text-xs text-gray-400 block mt-1 font-medium">Funnel Conversion</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <Zap className="w-3.5 h-3.5" />
                  <span>-3.4s</span>
                </div>
                <span className="text-xs text-gray-400 block mt-1 font-medium">Task Latency</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>99.2%</span>
                </div>
                <span className="text-xs text-gray-400 block mt-1 font-medium">Usability CSAT</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate(`/projects/${activeProject.slug || activeProject.id}`)}
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
              >
                <span>Explore Featured Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="#comparison"
                className="px-5 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.03] transition-colors text-sm"
              >
                View Before & After Audit
              </a>
            </div>
          </div>

          {/* Right: Live Interactive Smartphone Prototype Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Screen Selector Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.05] rounded-xl border border-white/[0.1] mb-4 text-xs">
              <button
                onClick={() => setPrototypeScreen('onboarding')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  prototypeScreen === 'onboarding'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Onboard
              </button>
              <button
                onClick={() => setPrototypeScreen('checkout')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  prototypeScreen === 'checkout'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Checkout
              </button>
              <button
                onClick={() => setPrototypeScreen('metrics')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  prototypeScreen === 'metrics'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Analytics
              </button>
            </div>

            {/* Smartphone Chassis */}
            <div className="w-[280px] sm:w-[310px] h-[560px] rounded-[44px] bg-[#161b22] p-3 border-4 border-zinc-700 shadow-2xl relative overflow-hidden flex flex-col">
              {/* Dynamic Island / Speaker Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>

              {/* Inside Screen Content */}
              <div className="flex-1 bg-[#0b0e14] rounded-[32px] p-4 flex flex-col justify-between text-xs overflow-y-auto">
                {prototypeScreen === 'onboarding' && (
                  <div className="space-y-4 pt-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                      01
                    </div>
                    <h3 className="text-base font-bold text-white">Seamless Identity Verification</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Zero friction biometric onboarding designed with 99.8% completion rate.
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                        <span className="text-gray-300 text-[11px]">FaceID Auto-Sync</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                        <span className="text-gray-300 text-[11px]">Passkey Credential</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    </div>
                    <button 
                      onClick={() => setPrototypeScreen('checkout')}
                      className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold mt-4 text-center block"
                    >
                      Next Step →
                    </button>
                  </div>
                )}

                {prototypeScreen === 'checkout' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-white/[0.08] pb-2">
                      <span>Order #8492</span>
                      <span className="text-emerald-400 font-bold">$1,250.00</span>
                    </div>
                    <h3 className="text-base font-bold text-white">Instant One-Click Settlement</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Optimized for sub-second confirmation with real-time feedback states.
                    </p>
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px]">
                      Verified via Stripe & Apple Pay
                    </div>
                    <button 
                      onClick={() => setPrototypeScreen('metrics')}
                      className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-semibold mt-4 text-center block"
                    >
                      Authorize Payment
                    </button>
                  </div>
                )}

                {prototypeScreen === 'metrics' && (
                  <div className="space-y-4 pt-2">
                    <span className="text-[10px] uppercase font-mono text-indigo-400">Live Pulse</span>
                    <h3 className="text-base font-bold text-white">Conversion Telemetry</h3>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-white/[0.04]">
                        <span className="text-gray-400 block text-[10px]">Total Revenue Routed</span>
                        <span className="text-white font-bold text-sm">$4.8M / mo</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.04]">
                        <span className="text-gray-400 block text-[10px]">Drop-off Mitigation</span>
                        <span className="text-emerald-400 font-bold text-sm">-38.4%</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setPrototypeScreen('onboarding')}
                      className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-center block text-[11px]"
                    >
                      Reset Prototype
                    </button>
                  </div>
                )}

                {/* Simulated Home Indicator */}
                <div className="w-20 h-1 bg-white/30 rounded-full mx-auto mt-4 shrink-0" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE BEFORE VS. AFTER DESIGN AUDIT */}
      <section id="comparison" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08]">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block">
                Evidence-Based Design
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Before & After UX Transformation
              </h2>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-2 p-1 bg-black/50 rounded-xl border border-white/[0.1] text-xs">
              <button
                onClick={() => setComparisonMode('before')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  comparisonMode === 'before'
                    ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Legacy Friction (Before)
              </button>
              <button
                onClick={() => setComparisonMode('after')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  comparisonMode === 'after'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Optimized Solution (After)
              </button>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border transition-all ${
              comparisonMode === 'before'
                ? 'bg-rose-950/20 border-rose-500/40 ring-2 ring-rose-500/20'
                : 'bg-white/[0.02] border-white/[0.06] opacity-60'
            }`}>
              <div className="flex items-center justify-between text-xs text-rose-400 font-mono mb-3">
                <span className="font-bold uppercase">[ PROBLEM STATEMENT ]</span>
                <span>Friction Benchmark</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Multi-page checkout with 48% drop-off</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>7 disjointed form steps requiring manual billing & shipping re-entry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Hidden error validations that only triggered upon final submit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Average completion time of 3 minutes and 42 seconds</span>
                </li>
              </ul>
            </div>

            <div className={`p-6 rounded-2xl border transition-all ${
              comparisonMode === 'after'
                ? 'bg-emerald-950/20 border-emerald-500/40 ring-2 ring-emerald-500/20'
                : 'bg-white/[0.02] border-white/[0.06] opacity-60'
            }`}>
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-3">
                <span className="font-bold uppercase">[ THE SYSTEM REDESIGN ]</span>
                <span>Measured Outcome</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Unified sheet checkout with instant token pay</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Single collapsible drawer with intelligent address autofill</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Inline micro-validations preventing user errors before submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Checkout time slashed down to 18 seconds (12x acceleration)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08]">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block">
                Selected Work
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">UX Case Studies</h2>
            </div>
            <span className="text-xs text-gray-400">
              {projects.length} Total Projects Shipped
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug || proj.id}`)}
                className="group p-6 rounded-2xl bg-[#161b22] border border-white/[0.08] hover:border-indigo-500/50 transition-all cursor-pointer space-y-4"
              >
                {proj.coverImage && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-black/40">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-indigo-400 font-medium">
                  <span>{proj.role}</span>
                  <span className="text-gray-500">{proj.date || '2024'}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {proj.summary}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-medium">
                  <span className="text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read UX Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#090c10] py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Ava Chen Product Design Framework · Built for high velocity</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/admin')} className="hover:text-white transition-colors font-mono">
              Admin OS
            </button>
            <span>© {new Date().getFullYear()} {identity.name}</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
