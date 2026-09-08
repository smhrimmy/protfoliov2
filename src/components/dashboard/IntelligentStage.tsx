import React, { useState, useEffect, useMemo, useRef } from 'react';
import { mockStorage } from '@/data/mockStorage';
import { ThemeManifest } from '@/types/theme';
import { 
  Activity, Zap, ShieldCheck, FolderGit2, FileText, Send, 
  GitBranch, Palette, Users, ChevronLeft, ChevronRight, Sliders, Layers,
  ExternalLink, Plus, Eye, CheckCircle2, RefreshCw, Check
} from 'lucide-react';

// 7-row bitmap glyph dictionary (spec-exact LED dot matrix definitions)
const GLYPHS: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["010", "110", "010", "010", "010", "010", "111"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
  "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
  ".": ["0", "0", "0", "0", "0", "0", "1"],
  "I": ["111", "010", "010", "010", "010", "010", "111"],
  "n": ["00000", "00000", "11110", "10001", "10001", "10001", "10001"],
  "t": ["010", "010", "111", "010", "010", "010", "001"],
  "e": ["00000", "00000", "01110", "10001", "11111", "10000", "01110"],
  "l": ["10", "10", "10", "10", "10", "10", "01"],
  "i": ["1", "0", "1", "1", "1", "1", "1"],
  "g": ["00000", "00000", "01111", "10001", "01111", "00001", "01110"]
};

// LED Dot-Matrix SVG component
export const DotWord: React.FC<{ text: string; isWord?: boolean; className?: string }> = ({
  text,
  isWord = false,
  className = ''
}) => {
  const pitchX = isWord ? 3.8 : 4.6;
  const pitchY = 4.0;
  const dotRadius = isWord ? 1.55 : 1.75;

  const { circles, totalWidth } = useMemo(() => {
    let x = 0;
    const dots: { cx: string; cy: string; r: number; key: string }[] = [];

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const glyph = GLYPHS[ch] || GLYPHS["0"];
      const cols = glyph[0].length;

      for (let r = 0; r < 7; r++) {
        const rowStr = glyph[r];
        for (let c = 0; c < cols; c++) {
          if (rowStr[c] === '1') {
            dots.push({
              cx: (x + c * pitchX + 1.8).toFixed(2),
              cy: (r * pitchY + 1.8).toFixed(2),
              r: dotRadius,
              key: `${i}-${r}-${c}`
            });
          }
        }
      }
      x += cols * pitchX + (ch === '.' ? 2 : 2.5);
    }

    return { circles: dots, totalWidth: x };
  }, [text, pitchX, pitchY, dotRadius]);

  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox={`0 0 ${totalWidth} 28`}
      style={{ height: isWord ? '24px' : '34px', width: 'auto' }}
      fill="currentColor"
      aria-hidden="true"
    >
      {circles.map(c => (
        <circle key={c.key} cx={c.cx} cy={c.cy} r={c.r} />
      ))}
    </svg>
  );
};

interface IntelligentStageProps {
  onNavigate: (route: string) => void;
  siteMode?: 'draft' | 'live';
  onPublishSite?: () => void;
  activeManifest?: ThemeManifest;
  children?: React.ReactNode;
}

export const IntelligentStage: React.FC<IntelligentStageProps> = ({
  onNavigate,
  siteMode = 'draft',
  onPublishSite,
  activeManifest,
  children
}) => {
  const [ambientMotion, setAmbientMotion] = useState<boolean>(() => {
    return localStorage.getItem('pdl_ambient_motion') !== 'false';
  });

  // Real data telemetry from mockStorage
  const [projectsCount, setProjectsCount] = useState(mockStorage.getProjects().length);
  const [postsCount, setPostsCount] = useState(mockStorage.getPosts().length);
  const [automationsCount, setAutomationsCount] = useState(
    mockStorage.getAutomations().filter(a => a.enabled).length
  );
  const [pendingDraftsCount, setPendingDraftsCount] = useState(
    mockStorage.getSocialDrafts().filter(d => d.status === 'pending_approval').length
  );

  // Category filter & mobile carousel controls
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'intelligence'>('all');
  const [mobileViewMode, setMobileViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Multi-metric active indexes for each of the 6 cards (4 options each)
  const [card1Index, setCard1Index] = useState(0); // Performance
  const [card2Index, setCard2Index] = useState(0); // Content
  const [card3Index, setCard3Index] = useState(0); // Channels
  const [card4Index, setCard4Index] = useState(0); // Audience
  const [card5Index, setCard5Index] = useState(0); // Themes
  const [card6Index, setCard6Index] = useState(0); // Social AI

  useEffect(() => {
    const handleStorage = () => {
      setProjectsCount(mockStorage.getProjects().length);
      setPostsCount(mockStorage.getPosts().length);
      setAutomationsCount(mockStorage.getAutomations().filter(a => a.enabled).length);
      setPendingDraftsCount(mockStorage.getSocialDrafts().filter(d => d.status === 'pending_approval').length);
      setAmbientMotion(localStorage.getItem('pdl_ambient_motion') !== 'false');
    };
    window.addEventListener('storage', handleStorage);
    const unsub = mockStorage.subscribe(handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      unsub();
    };
  }, []);

  const toggleMotion = () => {
    const next = !ambientMotion;
    setAmbientMotion(next);
    localStorage.setItem('pdl_ambient_motion', String(next));
  };

  // Card 1: Site Performance Data Options
  const card1Data = [
    { num: '118', unit: 'ms', label: 'Site Performance', subtitle: 'Edge Latency', caption: 'Average global edge response latency', link: '/admin/site-health' },
    { num: '98', unit: '%', label: 'Audit Score', subtitle: 'Lighthouse Health', caption: 'Passing Core Web Vitals audit score', link: '/admin/site-health' },
    { num: '0.8', unit: 's', label: 'Visual Stability', subtitle: 'Largest Paint (LCP)', caption: 'Instant hero render without layout shift', link: '/admin/site-health' },
    { num: '42', unit: 'ms', label: 'Server Response', subtitle: 'Time to First Byte', caption: 'Global CDN edge cache hit ratio 99.4%', link: '/admin/site-health' }
  ];

  // Card 2: Content Library Data Options
  const card2Data = [
    { num: '8.0', unit: 'M', label: 'Content Library', subtitle: 'Index Volume', caption: 'Total tokens indexed across knowledge base', link: '/admin/projects' },
    { num: String(projectsCount + postsCount), unit: 'Items', label: 'Content Corpus', subtitle: 'Published Nodes', caption: `${projectsCount} case studies & ${postsCount} published articles`, link: '/admin/projects' },
    { num: String(projectsCount), unit: 'Projects', label: 'Engineered Works', subtitle: 'Production Systems', caption: 'Full-stack & 3D WebGL architectures', link: '/admin/projects' },
    { num: '14.8', unit: 'K', label: 'Written Articles', subtitle: 'Total Words', caption: 'Technical essays & architectural breakdowns', link: '/admin/blog' }
  ];

  // Card 3: Connected Channels Data Options
  const card3Data = [
    { num: '16', unit: 'K', label: 'Connected Channels', subtitle: 'Active Endpoints', caption: 'Connected data sources & sync pipelines', link: '/admin/automations' },
    { num: String(automationsCount || 3), unit: 'Hubs', label: 'Active Pipelines', subtitle: 'Enabled Automations', caption: 'Live social, telegram & webhook monitors', link: '/admin/automations' },
    { num: '99', unit: '%', label: 'Pipeline Uptime', subtitle: 'Sync Reliability', caption: 'Zero failed webhooks in trailing 30 days', link: '/admin/automations' },
    { num: '15', unit: 'm', label: 'Sync Cadence', subtitle: 'Interval Polling', caption: 'Real-time telemetry and cache invalidation', link: '/admin/automations' }
  ];

  // Card 4: Audience Intelligence Data Options
  const card4Data = [
    { num: '4.8', unit: 'K', label: 'Audience Intelligence', subtitle: 'Weekly Visits', caption: 'Verified developer & recruiter traffic (+18%)', link: '/admin/analytics' },
    { num: '84', unit: 'IPs', label: 'Recruiter Traffic', subtitle: 'Company Networks', caption: 'Fortune 500 & tech firm employer visits', link: '/admin/analytics' },
    { num: '19', unit: 'K', label: 'Global Impressions', subtitle: 'Monthly Reach', caption: 'Portfolio page impressions across 23 themes', link: '/admin/analytics' },
    { num: '3.4', unit: 'm', label: 'Dwell Duration', subtitle: 'Average Session', caption: 'High-intent technical reader engagement', link: '/admin/analytics' }
  ];

  // Card 5: Theme Ecosystem Data Options
  const card5Data = [
    { num: '23', unit: 'Worlds', label: 'Theme Ecosystem', subtitle: 'Isolated Themes', caption: '23 structurally distinct production themes', link: '/admin/themes' },
    { num: '6', unit: 'Types', label: 'Design Paradigms', subtitle: 'DOM Architectures', caption: 'IDE, Swiss Canvas, 3D, Zine, OS, Collage', link: '/admin/themes' },
    { num: '100', unit: '%', label: 'Isolation Score', subtitle: 'Style Sandboxing', caption: 'Strict CSS scoped component isolation', link: '/admin/themes' },
    { num: activeManifest ? activeManifest.number : '01', unit: 'Active', label: 'Live Theme', subtitle: activeManifest ? activeManifest.name : 'Developer Portfolio', caption: 'Currently serving all incoming visitors', link: '/admin/themes' }
  ];

  // Card 6: Autonomous Pipeline Data Options
  const card6Data = [
    { num: String(Math.max(1, pendingDraftsCount)), unit: 'Queue', label: 'Autonomous Pipeline', subtitle: 'Review Queue', caption: 'Telegram & LinkedIn drafts awaiting approval', link: '/admin/automations' },
    { num: '14', unit: 'Sent', label: 'Broadcast Engine', subtitle: 'Dispatched Posts', caption: 'Syndicated articles & project spotlights', link: '/admin/automations' },
    { num: '1.2', unit: 's', label: 'AI Drafter Speed', subtitle: 'Generation Velocity', caption: 'Autonomous markdown-to-social conversion', link: '/admin/automations' },
    { num: '4', unit: 'Hubs', label: 'Social Channels', subtitle: 'Distribution Nodes', caption: 'LinkedIn, Telegram, X and RSS syndication', link: '/admin/automations' }
  ];

  // Filter cards based on category
  const showCore = activeCategory === 'all' || activeCategory === 'core';
  const showIntelligence = activeCategory === 'all' || activeCategory === 'intelligence';

  const scrollToSlide = (idx: number) => {
    setCurrentSlide(idx);
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.bento-telemetry-card');
      if (cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = 320;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(Math.max(0, Math.min(5, index)));
    }
  };

  return (
    <div className="w-full text-[#222222] font-sans">
      {/* 1. EXECUTIVE COMMAND MASTHEAD */}
      <header className="relative px-4 sm:px-8 pt-6 pb-8 border-b border-black/8 bg-gradient-to-b from-[#f5f5f4] to-[#ececeb]">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Status micro-badges row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LIVE TELEMETRY STREAM
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/5 border border-black/10 text-[#44444a]">
                PDL OS v2.4
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-black/5 border border-black/10 text-[#44444a]">
                Theme {activeManifest ? activeManifest.number : '01'}: {activeManifest ? activeManifest.name : 'Developer Portfolio'} (23 Themes)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleMotion}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-black/10 text-[#333339] text-xs font-medium transition-all shadow-xs"
                title="Toggle ambient motion"
              >
                <Zap className={`w-3.5 h-3.5 ${ambientMotion ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                <span>Motion: {ambientMotion ? 'ON' : 'OFF'}</span>
              </button>

              {siteMode === 'draft' && onPublishSite && (
                <button
                  onClick={onPublishSite}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Publish Live
                </button>
              )}
            </div>
          </div>

          {/* Headline & Quick Actions in a clean flex layout */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] tracking-tight leading-tight flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span>Built for</span>
                <span className="inline-flex items-center text-[#ad314d] pt-1">
                  <DotWord text="Intelligent" isWord />
                </span>
                <span>Performance</span>
              </h1>
              <p className="text-sm sm:text-base text-[#55555e] leading-relaxed">
                Operating Command Center for Prajwal DL. Real-time telemetry, 23 structurally isolated theme architectures, and autonomous social distribution engine.
              </p>
            </div>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate('/admin/projects/new')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ad314d] hover:bg-[#92243d] text-white text-xs font-bold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" /> New Project
              </button>
              <button
                onClick={() => onNavigate('/admin/blog/new')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1e2025] hover:bg-[#111215] text-white text-xs font-bold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" /> New Article
              </button>
              <button
                onClick={() => onNavigate('/admin/visual-editor')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-black/12 text-[#2d2d32] text-xs font-bold shadow-xs transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-purple-600" /> Visual Editor
              </button>
              <button
                onClick={() => onNavigate('/admin/recruiter')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-black/12 text-[#2d2d32] text-xs font-bold shadow-xs transition-all"
              >
                <Users className="w-3.5 h-3.5 text-emerald-600" /> Recruiter Mode
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. THE INTELLIGENT BENTO TELEMETRY STAGE */}
      <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto space-y-6" aria-label="System Telemetry Bento">
        {/* Stage Controls: Filters + Mobile Layout Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-black/5 rounded-full border border-black/8 text-xs font-medium">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-[#1a1a1a] font-bold shadow-xs'
                  : 'text-[#666670] hover:text-[#1a1a1a]'
              }`}
            >
              All 6 Cards
            </button>
            <button
              onClick={() => setActiveCategory('core')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeCategory === 'core'
                  ? 'bg-white text-[#1a1a1a] font-bold shadow-xs'
                  : 'text-[#666670] hover:text-[#1a1a1a]'
              }`}
            >
              Core Triad (Health, Index, Nodes)
            </button>
            <button
              onClick={() => setActiveCategory('intelligence')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeCategory === 'intelligence'
                  ? 'bg-white text-[#1a1a1a] font-bold shadow-xs'
                  : 'text-[#666670] hover:text-[#1a1a1a]'
              }`}
            >
              Intelligence Suite (Audience, Themes, AI)
            </button>
          </div>

          {/* Mobile view switch (Carousel vs Grid) */}
          <div className="flex sm:hidden items-center p-1 bg-black/5 rounded-full border border-black/8 text-xs">
            <button
              onClick={() => setMobileViewMode('carousel')}
              className={`px-3 py-0.5 rounded-full font-semibold transition-all ${
                mobileViewMode === 'carousel' ? 'bg-white text-[#1a1a1a] shadow-xs' : 'text-[#666670]'
              }`}
            >
              Swipe
            </button>
            <button
              onClick={() => setMobileViewMode('grid')}
              className={`px-3 py-0.5 rounded-full font-semibold transition-all ${
                mobileViewMode === 'grid' ? 'bg-white text-[#1a1a1a] shadow-xs' : 'text-[#666670]'
              }`}
            >
              Grid
            </button>
          </div>
        </div>

        {/* BENTO CARDS CONTAINER */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className={`${
            mobileViewMode === 'carousel'
              ? 'flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-x-visible scroll-snap-x snap-mandatory gap-4 pb-3 sm:pb-0 no-scrollbar'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
          }`}
        >
          {/* CARD 1: SITE PERFORMANCE & EDGE LATENCY */}
          {showCore && (
            <article
              className="bento-telemetry-card shrink-0 w-[88vw] max-w-[390px] sm:w-auto h-[245px] rounded-2xl p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-lg border border-white/30 scroll-snap-center"
              style={{
                background: 'linear-gradient(145deg, #c0395e 0%, #a42c4c 45%, #7e1220 100%)'
              }}
            >
              {/* Background Glow / Radial Highlight */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              {/* Top Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white/90" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide">
                    {card1Data[card1Index].label}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate(card1Data[card1Index].link)}
                  className="text-xs text-white/80 hover:text-white font-medium flex items-center gap-1 group"
                >
                  <span>Inspect</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              {/* Middle Metric + Artwork */}
              <div className="flex items-center justify-between my-auto z-10">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <DotWord text={card1Data[card1Index].num} />
                    <span className="text-2xl font-bold tracking-tight text-white/95">
                      {card1Data[card1Index].unit}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 mt-1 font-medium line-clamp-1">
                    {card1Data[card1Index].caption}
                  </p>
                </div>

                {/* Micro Gauge Graphic */}
                <div className="w-16 h-16 shrink-0 relative flex items-center justify-center opacity-90">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#ffffff"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="60"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-mono font-bold text-white">98%</span>
                </div>
              </div>

              {/* Bottom Interactive Multi-Metric Pills */}
              <div className="flex items-center gap-1.5 pt-3 border-t border-white/15 z-10 overflow-x-auto no-scrollbar">
                {card1Data.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setCard1Index(i)}
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all ${
                      card1Index === i
                        ? 'bg-white text-[#1a1a1a] shadow-sm'
                        : 'bg-white/15 text-white/85 hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    {d.num}{d.unit} {d.subtitle}
                  </button>
                ))}
              </div>
            </article>
          )}

          {/* CARD 2: CONTENT LIBRARY & CORPUS */}
          {showCore && (
            <article
              className="bento-telemetry-card shrink-0 w-[88vw] max-w-[390px] sm:w-auto h-[245px] rounded-2xl p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-lg border border-white/30 scroll-snap-center"
              style={{
                background: 'linear-gradient(145deg, #a87bc4 0%, #8c4e74 50%, #68233a 100%)'
              }}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-white/90" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide">
                    {card2Data[card2Index].label}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate(card2Data[card2Index].link)}
                  className="text-xs text-white/80 hover:text-white font-medium flex items-center gap-1 group"
                >
                  <span>Browse</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              <div className="flex items-center justify-between my-auto z-10">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <DotWord text={card2Data[card2Index].num} />
                    <span className="text-2xl font-bold tracking-tight text-white/95">
                      {card2Data[card2Index].unit}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 mt-1 font-medium line-clamp-1">
                    {card2Data[card2Index].caption}
                  </p>
                </div>

                {/* Frosted Layered Tile Graphic */}
                <div className="w-16 h-14 shrink-0 relative flex items-center justify-center">
                  <div className="w-12 h-8 rounded-lg bg-white/20 border border-white/30 backdrop-blur-xs transform -rotate-6 shadow-sm" />
                  <div className="w-12 h-8 rounded-lg bg-white/40 border border-white/40 backdrop-blur-xs absolute top-2 right-1 shadow-md flex items-center justify-center">
                    <div className="w-6 h-1.5 rounded-full bg-white/70" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-3 border-t border-white/15 z-10 overflow-x-auto no-scrollbar">
                {card2Data.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setCard2Index(i)}
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all ${
                      card2Index === i
                        ? 'bg-white text-[#1a1a1a] shadow-sm'
                        : 'bg-white/15 text-white/85 hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    {d.num}{d.unit} {d.subtitle}
                  </button>
                ))}
              </div>
            </article>
          )}

          {/* CARD 3: CONNECTED CHANNELS & PIPELINES */}
          {showCore && (
            <article
              className="bento-telemetry-card shrink-0 w-[88vw] max-w-[390px] sm:w-auto h-[245px] rounded-2xl p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-lg border border-white/30 scroll-snap-center"
              style={{
                background: 'linear-gradient(145deg, #ea580c 0%, #c2410c 50%, #881e05 100%)'
              }}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-white/90" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide">
                    {card3Data[card3Index].label}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate(card3Data[card3Index].link)}
                  className="text-xs text-white/80 hover:text-white font-medium flex items-center gap-1 group"
                >
                  <span>Channels</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              <div className="flex items-center justify-between my-auto z-10">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <DotWord text={card3Data[card3Index].num} />
                    <span className="text-2xl font-bold tracking-tight text-white/95">
                      {card3Data[card3Index].unit}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 mt-1 font-medium line-clamp-1">
                    {card3Data[card3Index].caption}
                  </p>
                </div>

                {/* Connected Curve Network Graphic */}
                <div className="w-16 h-14 shrink-0 relative flex items-center justify-center">
                  <svg viewBox="0 0 80 50" className="w-full h-full stroke-white fill-none">
                    <path d="M 5 25 C 25 5, 45 45, 75 25" strokeWidth="2.5" strokeOpacity="0.8" />
                    <circle cx="5" cy="25" r="4" fill="#ffffff" />
                    <circle cx="40" cy="25" r="3" fill="#ffffff" opacity="0.7" />
                    <circle cx="75" cy="25" r="4" fill="#ffffff" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-3 border-t border-white/15 z-10 overflow-x-auto no-scrollbar">
                {card3Data.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setCard3Index(i)}
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all ${
                      card3Index === i
                        ? 'bg-white text-[#1a1a1a] shadow-sm'
                        : 'bg-white/15 text-white/85 hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    {d.num}{d.unit} {d.subtitle}
                  </button>
                ))}
              </div>
            </article>
          )}

          {/* CARD 4: AUDIENCE & RECRUITER TELEMETRY */}
          {showIntelligence && (
            <article
              className="bento-telemetry-card shrink-0 w-[88vw] max-w-[390px] sm:w-auto h-[245px] rounded-2xl p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-lg border border-white/30 scroll-snap-center"
              style={{
                background: 'linear-gradient(145deg, #4f46e5 0%, #3730a3 50%, #1e1b4b 100%)'
              }}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-white/90" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide">
                    {card4Data[card4Index].label}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate(card4Data[card4Index].link)}
                  className="text-xs text-white/80 hover:text-white font-medium flex items-center gap-1 group"
                >
                  <span>Analytics</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              <div className="flex items-center justify-between my-auto z-10">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <DotWord text={card4Data[card4Index].num} />
                    <span className="text-2xl font-bold tracking-tight text-white/95">
                      {card4Data[card4Index].unit}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 mt-1 font-medium line-clamp-1">
                    {card4Data[card4Index].caption}
                  </p>
                </div>

                {/* Waveform Radar Graphic */}
                <div className="w-16 h-14 shrink-0 relative flex items-center justify-center">
                  <svg viewBox="0 0 80 50" className="w-full h-full stroke-white fill-none">
                    <path d="M 5 35 Q 25 5, 45 40 T 75 15" strokeWidth="2.5" strokeOpacity="0.8" />
                    <circle cx="28" cy="18" r="3.5" fill="#38bdf8" />
                    <circle cx="65" cy="20" r="3" fill="#ffffff" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-3 border-t border-white/15 z-10 overflow-x-auto no-scrollbar">
                {card4Data.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setCard4Index(i)}
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all ${
                      card4Index === i
                        ? 'bg-white text-[#1a1a1a] shadow-sm'
                        : 'bg-white/15 text-white/85 hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    {d.num}{d.unit} {d.subtitle}
                  </button>
                ))}
              </div>
            </article>
          )}

          {/* CARD 5: THEME ECOSYSTEM & ISOLATION */}
          {showIntelligence && (
            <article
              className="bento-telemetry-card shrink-0 w-[88vw] max-w-[390px] sm:w-auto h-[245px] rounded-2xl p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-lg border border-white/30 scroll-snap-center"
              style={{
                background: 'linear-gradient(145deg, #059669 0%, #047857 50%, #064e3b 100%)'
              }}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-white/90" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide">
                    {card5Data[card5Index].label}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate(card5Data[card5Index].link)}
                  className="text-xs text-white/80 hover:text-white font-medium flex items-center gap-1 group"
                >
                  <span>Themes</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              <div className="flex items-center justify-between my-auto z-10">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <DotWord text={card5Data[card5Index].num} />
                    <span className="text-2xl font-bold tracking-tight text-white/95">
                      {card5Data[card5Index].unit}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 mt-1 font-medium line-clamp-1">
                    {card5Data[card5Index].caption}
                  </p>
                </div>

                {/* Isometric 3D Layered Prism Graphic */}
                <div className="w-16 h-14 shrink-0 relative flex flex-col items-center justify-center">
                  <div className="w-12 h-3.5 rounded-sm bg-white/30 border border-white/40 transform -skew-x-12 mb-1" />
                  <div className="w-12 h-3.5 rounded-sm bg-white/50 border border-white/50 transform -skew-x-12 mb-1 shadow-sm" />
                  <div className="w-12 h-3.5 rounded-sm bg-white/70 border border-white/60 transform -skew-x-12 shadow-md" />
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-3 border-t border-white/15 z-10 overflow-x-auto no-scrollbar">
                {card5Data.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setCard5Index(i)}
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all ${
                      card5Index === i
                        ? 'bg-white text-[#1a1a1a] shadow-sm'
                        : 'bg-white/15 text-white/85 hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    {d.num}{d.unit} {d.subtitle}
                  </button>
                ))}
              </div>
            </article>
          )}

          {/* CARD 6: AUTONOMOUS SOCIAL PIPELINE */}
          {showIntelligence && (
            <article
              className="bento-telemetry-card shrink-0 w-[88vw] max-w-[390px] sm:w-auto h-[245px] rounded-2xl p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-lg border border-white/30 scroll-snap-center"
              style={{
                background: 'linear-gradient(145deg, #d97706 0%, #b45309 50%, #78350f 100%)'
              }}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-white/90" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide">
                    {card6Data[card6Index].label}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate(card6Data[card6Index].link)}
                  className="text-xs text-white/80 hover:text-white font-medium flex items-center gap-1 group"
                >
                  <span>Pipeline</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              <div className="flex items-center justify-between my-auto z-10">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <DotWord text={card6Data[card6Index].num} />
                    <span className="text-2xl font-bold tracking-tight text-white/95">
                      {card6Data[card6Index].unit}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 mt-1 font-medium line-clamp-1">
                    {card6Data[card6Index].caption}
                  </p>
                </div>

                {/* Neural Dispatch Constellation Graphic */}
                <div className="w-16 h-14 shrink-0 relative flex items-center justify-center">
                  <svg viewBox="0 0 60 50" className="w-full h-full stroke-white fill-none">
                    <line x1="30" y1="25" x2="10" y2="10" strokeWidth="1.5" strokeOpacity="0.6" />
                    <line x1="30" y1="25" x2="50" y2="10" strokeWidth="1.5" strokeOpacity="0.6" />
                    <line x1="30" y1="25" x2="12" y2="40" strokeWidth="1.5" strokeOpacity="0.6" />
                    <line x1="30" y1="25" x2="48" y2="40" strokeWidth="1.5" strokeOpacity="0.6" />
                    <circle cx="30" cy="25" r="5" fill="#ffffff" />
                    <circle cx="10" cy="10" r="3" fill="#fde68a" />
                    <circle cx="50" cy="10" r="3" fill="#67e8f9" />
                    <circle cx="12" cy="40" r="3" fill="#fca5a5" />
                    <circle cx="48" cy="40" r="3" fill="#86efac" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-3 border-t border-white/15 z-10 overflow-x-auto no-scrollbar">
                {card6Data.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setCard6Index(i)}
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all ${
                      card6Index === i
                        ? 'bg-white text-[#1a1a1a] shadow-sm'
                        : 'bg-white/15 text-white/85 hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    {d.num}{d.unit} {d.subtitle}
                  </button>
                ))}
              </div>
            </article>
          )}
        </div>

        {/* Mobile Swipe Pagination Dots & Arrows */}
        {mobileViewMode === 'carousel' && (
          <div className="flex sm:hidden items-center justify-between px-2 pt-1">
            <button
              onClick={() => scrollToSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="p-1.5 rounded-full bg-white/80 border border-black/10 text-[#1a1a1a] disabled:opacity-30 shadow-xs"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4, 5].map(idx => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`transition-all ${
                    currentSlide === idx
                      ? 'w-4 h-1.5 rounded-full bg-[#ad314d]'
                      : 'w-1.5 h-1.5 rounded-full bg-black/20'
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToSlide(Math.min(5, currentSlide + 1))}
              disabled={currentSlide === 5}
              className="p-1.5 rounded-full bg-white/80 border border-black/10 text-[#1a1a1a] disabled:opacity-30 shadow-xs"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 3. DASHBOARD WORKING SPACES */}
      {children && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 pb-12">
          {children}
        </div>
      )}
    </div>
  );
};
