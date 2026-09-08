import React, { useState, useEffect, useMemo, useRef } from 'react';
import { mockStorage } from '@/data/mockStorage';
import { 
  Activity, Zap, ShieldCheck, FolderGit2, FileText, Send, 
  GitBranch, Palette, Users, ChevronLeft, ChevronRight, Sliders, Layers
} from 'lucide-react';

// 7-row bitmap glyph dictionary (exact definitions + common characters for flexible masthead)
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
  "a": ["00000", "00000", "01110", "00001", "01111", "10001", "01111"],
  "e": ["00000", "00000", "01110", "10001", "11111", "10000", "01110"],
  "g": ["00000", "00000", "01111", "10001", "01111", "00001", "01110"],
  "i": ["1", "0", "1", "1", "1", "1", "1"],
  "l": ["10", "10", "10", "10", "10", "10", "01"],
  "n": ["00000", "00000", "11110", "10001", "10001", "10001", "10001"],
  "t": ["010", "010", "111", "010", "010", "010", "001"],
  "r": ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
  "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  "o": ["00000", "00000", "01110", "10001", "10001", "10001", "01110"],
  "f": ["00110", "01001", "01000", "11110", "01000", "01000", "01000"],
  "m": ["00000", "00000", "11010", "10101", "10101", "10101", "10001"],
  "u": ["00000", "00000", "10001", "10001", "10001", "10011", "01101"],
  "s": ["00000", "00000", "01111", "10000", "01110", "00001", "11110"],
  "c": ["00000", "00000", "01110", "10001", "10000", "10001", "01110"],
  "d": ["00001", "00001", "01111", "10001", "10001", "10001", "01111"],
  "y": ["00000", "00000", "10001", "10001", "01111", "00001", "01110"],
  "v": ["00000", "00000", "10001", "10001", "10001", "01010", "00100"],
  "k": ["10000", "10000", "10010", "10100", "11000", "10100", "10010"],
  "h": ["10000", "10000", "11110", "10001", "10001", "10001", "10001"],
  "b": ["10000", "10000", "11110", "10001", "10001", "10001", "11110"],
  " ": ["00", "00", "00", "00", "00", "00", "00"]
};

interface DotWordProps {
  text: string;
  isWord?: boolean;
  isContext?: boolean;
  isSpeed?: boolean;
  className?: string;
}

export const DotWord: React.FC<DotWordProps> = ({
  text,
  isWord = false,
  isContext = false,
  isSpeed = false,
  className = ''
}) => {
  const pitchX = isWord ? 4 : 5;
  const pitchY = 4;
  const gap = 1;
  const dotRadius = isWord ? 1.8 : (isContext ? 2.32 : (isSpeed ? 2.05 : 1.55));

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
              cx: (x + c * pitchX + 1.55).toFixed(2),
              cy: (r * pitchY + 1.55).toFixed(2),
              r: dotRadius,
              key: `${i}-${r}-${c}`
            });
          }
        }
      }
      x += cols * pitchX + gap;
    }

    return { circles: dots, totalWidth: x };
  }, [text, pitchX, pitchY, gap, dotRadius]);

  return (
    <svg
      className={`dot-svg ${className}`}
      viewBox={`0 0 ${totalWidth} 28`}
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
  headlinePrefix?: string;
  dotWord?: string;
  headlineSuffix?: string;
  introText?: string;
  children?: React.ReactNode;
}

export const IntelligentStage: React.FC<IntelligentStageProps> = ({
  onNavigate,
  headlinePrefix = 'Built for ',
  dotWord = 'Intelligent',
  headlineSuffix = 'Performance',
  introText = 'Every capability is engineered for speed, scale and contextual understanding, giving your portfolio the foundation to reason, adapt and perform in production.',
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

  // Card filter / category for mobile & desktop navigation
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'intelligence'>('all');
  const [mobileViewMode, setMobileViewMode] = useState<'carousel' | 'stack'>('carousel');
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Multi-metric active indexes for each of the 6 cards
  const [card1Index, setCard1Index] = useState(0); // 0: Latency (118ms), 1: Health (98%), 2: LCP (0.8s), 3: TTFB (42ms)
  const [card2Index, setCard2Index] = useState(0); // 0: Tokens (8.0M), 1: Items (8), 2: Projects (6), 3: Words (14.8K)
  const [card3Index, setCard3Index] = useState(0); // 0: Endpoints (16K), 1: Active Channels (4), 2: Success (99%), 3: Cadence (15m)
  const [card4Index, setCard4Index] = useState(0); // 0: Visitors (4.8K), 1: Company IPs (84), 2: Pageviews (19K), 3: Session (3.4m)
  const [card5Index, setCard5Index] = useState(0); // 0: Themes (23), 1: Layouts (6), 2: Isolation (100%), 3: Active (#01)
  const [card6Index, setCard6Index] = useState(0); // 0: Queue (1), 1: Broadcast (14), 2: AI Speed (1.2s), 3: Hubs (4)

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

  const toggleAmbientMotion = () => {
    const next = !ambientMotion;
    setAmbientMotion(next);
    localStorage.setItem('pdl_ambient_motion', String(next));
  };

  // Card 1 Data Multi-Options
  const card1Data = [
    { num: '118', unit: 'ms', title: 'Site Performance', subtitle: 'Edge Response Latency', caption: 'Average global edge response latency' },
    { num: '98', unit: '%', title: 'System Health', subtitle: 'Lighthouse Rating', caption: 'Lighthouse audit performance score' },
    { num: '0.8', unit: 's', title: 'Core Web Vitals', subtitle: 'Largest Contentful Paint', caption: 'LCP hero content render velocity' },
    { num: '42', unit: 'ms', title: 'Edge Telemetry', subtitle: 'Time to First Byte', caption: 'Global CDN cached server handshake' }
  ];

  // Card 2 Data Multi-Options
  const card2Data = [
    { num: '8.0', unit: 'M', title: 'Content Library', subtitle: 'System Index Volume', caption: 'Indexed words & production assets' },
    { num: String(projectsCount + postsCount), unit: 'Items', title: 'Content Corpus', subtitle: 'Total Published Nodes', caption: `${projectsCount} Case studies & ${postsCount} published articles` },
    { num: String(projectsCount), unit: 'Repos', title: 'Production Systems', subtitle: 'Client Case Studies', caption: 'Shipped high-converting web applications' },
    { num: '14.8', unit: 'K', title: 'Knowledge Base', subtitle: 'Technical Essay Words', caption: 'Published engineering architecture words' }
  ];

  // Card 3 Data Multi-Options
  const card3Data = [
    { num: '16', unit: 'K', title: 'Connected Channels', subtitle: 'Cross-Source Context', caption: 'Connected data sources & API nodes' },
    { num: String(Math.max(4, automationsCount)), unit: 'Active', title: 'Active Pipelines', subtitle: 'Automation Channels', caption: 'GitHub, LinkedIn, Telegram & webhooks' },
    { num: '99', unit: '%', title: 'Pipeline Health', subtitle: 'Delivery Reliability', caption: 'Automated broadcast delivery rate' },
    { num: '15', unit: 'm', title: 'Sync Cadence', subtitle: 'Background Polling', caption: 'Continuous live commit & telemetry sync' }
  ];

  // Card 4 Data Multi-Options (Audience Telemetry)
  const card4Data = [
    { num: '4.8', unit: 'K', title: 'Audience Intelligence', subtitle: 'Weekly Verified Visits', caption: 'Verified developer & recruiter traffic (+18%)' },
    { num: '84', unit: 'IPs', title: 'Recruiter Traffic', subtitle: 'Target Company IPs', caption: 'Fortune 500 & tech firm employer visits' },
    { num: '19', unit: 'K', title: 'Monthly Reach', subtitle: 'Global Impressions', caption: 'Portfolio page impressions across 23 themes' },
    { num: '3.4', unit: 'm', title: 'Dwell Duration', subtitle: 'Average Session Time', caption: 'High-intent technical reader engagement' }
  ];

  // Card 5 Data Multi-Options (Theme Ecosystem)
  const card5Data = [
    { num: '23', unit: 'Worlds', title: 'Theme Ecosystem', subtitle: 'Isolated Architectures', caption: '23 Structurally distinct production themes' },
    { num: '6', unit: 'Types', title: 'Design Paradigms', subtitle: 'DOM Layout Systems', caption: 'IDE, Swiss Canvas, 3D, Zine, OS, Collage' },
    { num: '100', unit: '%', title: 'Isolation Score', subtitle: 'Zero Style Leakage', caption: 'Strict CSS scoped component sandboxing' },
    { num: '01', unit: 'Active', title: 'Selected World', subtitle: 'Serving Live Visitors', caption: 'Developer Portfolio Workstation active' }
  ];

  // Card 6 Data Multi-Options (Autonomous Social Pipeline)
  const card6Data = [
    { num: String(Math.max(1, pendingDraftsCount)), unit: 'Queue', title: 'Autonomous Pipeline', subtitle: 'Human-in-the-Loop', caption: 'Telegram & LinkedIn drafts awaiting review' },
    { num: '14', unit: 'Sent', title: 'Broadcast Engine', subtitle: 'Dispatched Updates', caption: 'Syndicated articles & project spotlights' },
    { num: '1.2', unit: 's', title: 'AI Drafter Latency', subtitle: 'Generation Velocity', caption: 'Autonomous markdown-to-social conversion' },
    { num: '4', unit: 'Hubs', title: 'Social Distribution', subtitle: 'Multi-Channel Reach', caption: 'LinkedIn, Telegram, X and RSS syndication' }
  ];

  // Render Gauge Ticks
  const gaugeTicks = useMemo(() => {
    const ticks: { x1: string; y1: string; x2: string; y2: string; sw: number; key: number }[] = [];
    for (let i = 0; i <= 22; i++) {
      const angle = (190 + i * 5) * Math.PI / 180;
      const outer = 142;
      const inner = i % 5 === 0 ? 129 : 133;
      const sw = i % 5 === 0 ? 1.5 : 1;
      ticks.push({
        x1: (163 + inner * Math.cos(angle)).toFixed(2),
        y1: (163 + inner * Math.sin(angle)).toFixed(2),
        x2: (163 + outer * Math.cos(angle)).toFixed(2),
        y2: (163 + outer * Math.sin(angle)).toFixed(2),
        sw,
        key: i
      });
    }
    return ticks;
  }, []);

  // Filter cards based on activeCategory
  const showCard1 = activeCategory === 'all' || activeCategory === 'core';
  const showCard2 = activeCategory === 'all' || activeCategory === 'core';
  const showCard3 = activeCategory === 'all' || activeCategory === 'core';
  const showCard4 = activeCategory === 'all' || activeCategory === 'intelligence';
  const showCard5 = activeCategory === 'all' || activeCategory === 'intelligence';
  const showCard6 = activeCategory === 'all' || activeCategory === 'intelligence';

  const visibleCardsCount = [showCard1, showCard2, showCard3, showCard4, showCard5, showCard6].filter(Boolean).length;

  const scrollToCard = (index: number) => {
    setCurrentSlide(index);
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.card');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.offsetWidth;
      const index = Math.round(scrollLeft / (width * 0.85 || 320));
      setCurrentSlide(Math.min(visibleCardsCount - 1, Math.max(0, index)));
    }
  };

  return (
    <div className="intelligent-stage-root relative w-full min-h-full">
      {/* LOCKED SVG FILTERS */}
      <div className="filter-defs" aria-hidden="true">
        <svg width="0" height="0">
          <defs>
            <filter id="cardNoise" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency=".54" numOctaves={3} seed={27} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.8" intercept="-.25" />
                <feFuncG type="linear" slope="1.8" intercept="-.25" />
                <feFuncB type="linear" slope="1.8" intercept="-.25" />
                <feFuncA type="table" tableValues="0 .52" />
              </feComponentTransfer>
            </filter>
            <filter id="radarSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.35" />
            </filter>
            <filter id="radarHalo" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5.2" />
            </filter>
            <filter id="gaugeBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="11" />
            </filter>
            <filter id="tileSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.4" />
            </filter>
            <filter id="groutSoft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6.5" />
            </filter>
            <filter id="panelNoiseF" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves={3} seed={13} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.5" intercept="-.1" />
                <feFuncG type="linear" slope="1.5" intercept="-.1" />
                <feFuncB type="linear" slope="1.5" intercept="-.1" />
                <feFuncA type="table" tableValues="0 .35" />
              </feComponentTransfer>
            </filter>
            <filter id="wallNoiseF">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={3} seed={71} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <filter id="deepNoiseF">
              <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves={3} seed={57} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <filter id="wallNoiseF2">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves={3} seed={29} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>
      </div>

      <style>{`
        .intelligent-stage-root {
          --paper: #ececeb;
          --ink: #222222;
          --copy: #4a4a4a;
          --glass-line: rgba(255,255,255,.36);
          --card-ref-w: 429;
          --card-ref-h: 554;
          --card-radius: 17;
          --card-count: 3;
          --gap: clamp(8px, 1.5vw, 23px);
          --gutter: clamp(14px, 3.2vw, 44px);
          --content-max: calc(var(--card-count) * var(--card-ref-w) * 1px + (var(--card-count) - 1) * var(--gap));
          --pad-top: clamp(20px, 3.5vw, 48px);
          --pad-bottom: clamp(20px, 3.5vw, 44px);
          --masthead-gap: clamp(16px, 2.5vw, 36px);
          --cards-offset: clamp(16px, 3vw, 40px);
          background: var(--paper);
          color: var(--ink);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .stage-box {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          padding: var(--pad-top) var(--gutter) var(--pad-bottom);
          background:
            linear-gradient(rgba(236,236,234,.10), rgba(236,236,234,.10)),
            url("https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5c3ec08f-2dbf-4c0a-8588-f6106a789443.webp") center / cover no-repeat,
            #ececeb;
        }

        .stage-motion {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
        .stage-motion--wide { display: block; }
        .stage-motion--narrow { display: none; }

        @media (max-width: 767px) {
          .stage-motion--wide { display: none; }
          .stage-motion--narrow { display: block; }
          .stage-box {
            background:
              linear-gradient(rgba(236,236,234,.08), rgba(236,236,234,.08)),
              url("https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0f4926a4-e660-4df2-9195-2bfb3e341bdd.webp") center top / 100% 100% no-repeat,
              #e8e8e8;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stage-motion { display: none !important; }
        }

        .masthead-wrap, .cards-wrap, .stage-dashboard-body {
          width: min(100%, var(--content-max));
          margin-inline: auto;
        }

        .stage-glass-panel {
          position: relative;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 4px 20px -2px rgba(50, 28, 39, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          color: var(--ink);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .stage-glass-panel:hover {
          border-color: rgba(255, 255, 255, 1);
          box-shadow: 0 8px 30px -4px rgba(50, 28, 39, 0.09), 0 2px 6px -1px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .stage-glass-inset {
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 16px;
        }

        .stage-pill-action {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 0.55rem 1.15rem;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
          cursor: pointer;
        }
        .stage-pill-action:hover {
          transform: translateY(-1.5px);
        }
        .stage-pill-action-dark {
          background: #1e2024;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .stage-pill-action-dark:hover {
          background: #0d0e10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }
        .stage-pill-action-crimson {
          background: #ad314d;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(173, 49, 77, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .stage-pill-action-crimson:hover {
          background: #8e253d;
          box-shadow: 0 4px 12px rgba(173, 49, 77, 0.35);
        }
        .stage-pill-action-glass {
          background: rgba(255, 255, 255, 0.85);
          color: #2d2d2d;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 1px 3px rgba(58, 25, 39, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        .stage-pill-action-glass:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 4px 12px rgba(58, 25, 39, 0.1);
        }

        .masthead-wrap {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, clamp(260px, 32vw, 483px));
          gap: var(--masthead-gap);
          align-items: start;
          z-index: 2;
        }

        @media (max-width: 767px) {
          .masthead-wrap {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        .headline-stage {
          margin: 0;
          max-width: 100%;
          color: #202020;
          font-size: clamp(24px, min(3.1vw, 5.9vh), 47px);
          font-weight: 400;
          letter-spacing: .015em;
          line-height: 1.223;
        }

        .headline__line {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
        }

        .dot-word {
          display: inline-block;
          flex: 0 0 auto;
          width: 4.851em;
          height: .766em;
          margin-left: .319em;
          color: #ad314d;
          transform: translateY(.085em);
        }

        .intro-stage {
          width: 100%;
          margin: .34em 0 0;
          color: var(--copy);
          font-size: clamp(13px, min(1.36vw, 2.6vh), 20.6px);
          font-weight: 400;
          letter-spacing: -.017em;
          line-height: 1.62;
        }

        /* CARD ROW / GRID STAGE */
        /* CARD ROW / GRID STAGE */
        .cards-stage {
          container-type: inline-size;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: var(--gap);
          margin-top: var(--cards-offset);
          --card-w: min(
            calc((100cqw - (var(--card-count) - 1) * var(--gap)) / var(--card-count)),
            var(--card-ref-w) * 1px
          );
        }

        /* MOBILE CAROUSEL MODE */
        @media (max-width: 767px) {
          .cards-stage.mode-carousel {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            padding-inline: 12px;
            padding-bottom: 16px;
            gap: 16px;
            justify-content: flex-start;
            -webkit-overflow-scrolling: touch;
            width: 100vw;
            margin-left: calc(-1 * var(--gutter));
            margin-right: calc(-1 * var(--gutter));
          }
          .cards-stage.mode-carousel .card {
            flex: 0 0 calc(100vw - 44px) !important;
            --card-w: min(calc(100vw - 44px), 429px);
            max-width: 429px;
            scroll-snap-align: center;
            scroll-snap-stop: always;
          }
          .cards-stage.mode-stack {
            flex-direction: column;
            align-items: center;
            --card-w: min(100cqw, 429px);
          }
        }

        /* TABLET */
        @media (min-width: 768px) and (max-width: 1180px) {
          .cards-stage {
            display: grid;
            grid-template-columns: repeat(2, min(calc((100cqw - var(--gap)) / 2), 429px));
            justify-content: center;
            align-content: center;
            --card-w: min(calc((100cqw - var(--gap)) / 2), 429px);
          }
        }

        /* CARD RIGID SCALING CONTAINER */
        .card {
          container-type: inline-size;
          position: relative;
          flex: 0 0 auto;
          overflow: hidden;
          width: var(--card-w);
          aspect-ratio: 429 / 554;
          border: 1px solid var(--glass-line);
          border-radius: calc(var(--card-w) * 17 / 429);
          background-origin: border-box;
          color: #fff;
          --u: calc(100cqw / 429);
          box-shadow: 0 4px 16px rgba(50,28,39,.22), inset 0 1px 0 rgba(255,255,255,.24);
          user-select: none;
        }

        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          mix-blend-mode: screen;
          pointer-events: none;
          background:
            linear-gradient(102deg, rgba(255,255,255,.10), transparent 28%, rgba(255,255,255,.08) 62%, transparent 88%),
            radial-gradient(ellipse 85% 34% at 54% 7%, rgba(255,255,255,.24), transparent 72%);
        }

        .card__media {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          pointer-events: none;
        }

        .card__grain {
          position: absolute;
          z-index: 2;
          inset: -8%;
          width: 116%;
          height: 116%;
          opacity: .46;
          mix-blend-mode: soft-light;
          pointer-events: none;
        }

        /* CARD HEADERS & METRICS */
        .card__title {
          position: absolute;
          z-index: 4;
          top: 6.1%;
          left: 5%;
          width: 90%;
          margin: 0;
          color: rgba(255,255,255,.96);
          font-size: calc(22.95 * var(--u));
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1.48;
          text-align: center;
          text-shadow: 0 1px 1px rgba(72,28,48,.14);
        }

        .metric {
          position: absolute;
          z-index: 5;
          left: 0;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          color: rgba(255,255,255,.97);
          filter: drop-shadow(0 1px 1px rgba(104,27,54,.08));
        }
        .dot-number {
          display: inline-flex;
          align-items: flex-end;
          height: calc(44 * var(--u));
        }
        .dot-svg {
          height: 100%;
          width: auto;
          max-height: 100%;
          overflow: visible;
        }
        .metric--speed {
          top: 48.6%;
        }
        .metric--context {
          top: 48.0%;
        }
        .metric--connections {
          top: 48.5%;
        }

        .metric__unit {
          margin-left: calc(5 * var(--u));
          font-size: calc(26 * var(--u));
          font-weight: 500;
          line-height: 1;
          transform: translateY(calc(2 * var(--u)));
        }

        .caption {
          position: absolute;
          z-index: 5;
          top: 63.5%;
          left: 6%;
          width: 88%;
          color: rgba(255,255,255,.87);
          font-size: calc(16.5 * var(--u));
          font-weight: 400;
          letter-spacing: calc(-.36 * var(--u));
          line-height: 1.35;
          text-align: center;
          text-shadow: 0 1px 2px rgba(60,21,35,.16);
        }

        /* INTERACTIVE CARD DATA PILLS */
        .card-data-pills {
          position: absolute;
          z-index: 6;
          top: 74%;
          left: 4%;
          width: 92%;
          display: flex;
          justify-content: center;
          gap: calc(5 * var(--u));
          flex-wrap: wrap;
        }

        .card-data-pill {
          padding: calc(3 * var(--u)) calc(8 * var(--u));
          border-radius: 9999px;
          font-size: calc(10.5 * var(--u));
          font-weight: 500;
          font-family: inherit;
          color: rgba(255, 255, 255, 0.88);
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(4px);
          cursor: pointer;
          transition: all 0.16s ease;
          white-space: nowrap;
        }

        .card-data-pill:hover {
          background: rgba(255, 255, 255, 0.30);
          color: #ffffff;
        }

        .card-data-pill.active {
          background: rgba(255, 255, 255, 0.96);
          color: #1a1a1a;
          font-weight: 700;
          border-color: rgba(255, 255, 255, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
        }

        .learn-more {
          position: absolute;
          z-index: 6;
          top: 85.5%;
          left: 50%;
          width: calc(130 * var(--u));
          height: calc(42 * var(--u));
          transform: translateX(-50%);
          border: 0;
          border-radius: 999px;
          color: #2d2d2d;
          background: rgba(255,255,255,.97);
          box-shadow: 0 1px 0 rgba(255,255,255,.50) inset, 0 1px 3px rgba(58,25,39,.08);
          font-size: calc(13.5 * var(--u));
          font-weight: 600;
          letter-spacing: calc(-.25 * var(--u));
          cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .learn-more:hover {
          transform: translateX(-50%) translateY(calc(-2 * var(--u)));
          box-shadow: 0 8px 20px rgba(58,25,39,.16);
        }

        /* CARD 1 BACKGROUND STACK */
        .card--speed {
          background:
            radial-gradient(ellipse 34% 24% at 50% 2%, rgba(255,220,211,.10) 0%, transparent 76%),
            radial-gradient(ellipse 44% 34% at 106% 20%, rgba(255,222,211,.10) 0%, transparent 74%),
            radial-gradient(ellipse 40% 27% at 50% 82%, rgba(255,214,208,.08) 0%, transparent 74%),
            radial-gradient(ellipse 43% 31% at -7% 61%, rgba(127,31,53,.06) 0%, transparent 74%),
            radial-gradient(ellipse 47% 34% at 107% 82%, rgba(119,29,49,.07) 0%, transparent 74%),
            linear-gradient(180deg, rgba(255,246,241,.43) 0%, rgba(255,237,235,.19) 9%, transparent 22%),
            radial-gradient(ellipse 44% 34% at 50% 111%, rgba(55,0,20,.16) 0%, transparent 74%),
            radial-gradient(ellipse 105% 32% at 50% 80%, rgba(255,218,204,.20) 0%, rgba(255,205,196,.10) 48%, transparent 78%),
            radial-gradient(ellipse 55% 22% at -5% 39%, rgba(240,250,200,.15) 0%, transparent 76%),
            radial-gradient(ellipse 64% 49% at -8% 106%, rgba(255,222,199,.48) 0%, rgba(255,204,192,.25) 49%, transparent 78%),
            radial-gradient(ellipse 64% 49% at 108% 106%, rgba(255,222,199,.43) 0%, rgba(255,204,192,.22) 49%, transparent 78%),
            radial-gradient(ellipse 52% 54% at -8% 44%, rgba(255,216,207,.20) 0%, transparent 77%),
            radial-gradient(ellipse 68% 45% at -4% -3%, rgba(255,235,232,.73) 0%, rgba(255,226,226,.41) 46%, transparent 77%),
            radial-gradient(ellipse 70% 45% at 104% -4%, rgba(255,238,233,.78) 0%, rgba(255,226,226,.42) 48%, transparent 78%),
            radial-gradient(ellipse 93% 47% at 106% 58%, rgba(245,247,241,.73) 0%, rgba(246,231,229,.42) 48%, transparent 76%),
            radial-gradient(ellipse 74% 40% at -8% 73%, rgba(255,210,190,.48) 0%, rgba(255,194,181,.25) 48%, transparent 77%),
            radial-gradient(ellipse 77% 36% at 57% 58%, rgba(255,226,218,.30) 0%, rgba(255,206,207,.15) 50%, transparent 78%),
            radial-gradient(ellipse 54% 30% at 50% 17%, rgba(106,8,51,.22) 0%, transparent 78%),
            linear-gradient(180deg, #bd4468 0%, #ad355b 38%, #a63b50 72%, #8c1320 100%);
          background-origin: border-box;
        }

        /* GAUGE ART */
        .gauge {
          position: absolute;
          z-index: 2;
          top: 27.63%;
          left: 10.5%;
          width: 79%;
          height: 59%;
          overflow: visible;
        }

        /* CARD 2 BACKGROUND STACK */
        .card--context {
          background:
            radial-gradient(ellipse 118% 66% at 48% -8%, rgba(221,232,255,.065), transparent 74%),
            radial-gradient(ellipse 106% 52% at 48% 112%, rgba(255,155,139,.075), transparent 73%),
            radial-gradient(ellipse 82% 15% at 50% 29%, rgba(240,204,244,.24), transparent 81%),
            radial-gradient(ellipse 64% 18% at 50% 61%, rgba(239,177,208,.17), transparent 81%),
            radial-gradient(ellipse 43% 42% at -5% 30%, rgba(228,220,255,.53), transparent 78%),
            radial-gradient(ellipse 43% 42% at 105% 30%, rgba(245,200,210,.54), transparent 78%),
            radial-gradient(ellipse 70% 48% at 70% 110%, rgba(238,204,201,.62), transparent 77%),
            radial-gradient(ellipse 70% 23% at 78% 1%, rgba(251,208,226,.56), transparent 78%),
            radial-gradient(ellipse 78% 25% at 15% 8%, rgba(218,211,255,.54), transparent 79%),
            radial-gradient(ellipse 38% 31% at 80% 90%, rgba(230,190,191,.38), transparent 74%),
            radial-gradient(ellipse 45% 26% at 47% 78%, rgba(236,184,183,.45), transparent 73%),
            linear-gradient(164deg, #c9b5e1 0%, #ad80ca 29%, #9d4f72 64%, #793246 100%);
          background-origin: border-box;
        }

        .context-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .context-backdrop {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .context-backdrop svg {
          width: 100%;
          height: 100%;
        }

        .context-window {
          position: absolute;
          z-index: 3;
          top: 32.4%;
          left: 20.4%;
          width: 59%;
          height: 30.1%;
          overflow: hidden;
          border-radius: calc(10 * var(--u));
          background:
            linear-gradient(0deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.15) 45%, rgba(255,255,255,0) 80%),
            linear-gradient(270deg, rgba(213,62,152,.62) 0px, rgba(213,62,152,0) calc(5 * var(--u))),
            radial-gradient(ellipse 118% 70% at 60% 8%, rgba(255,203,252,.34), transparent 74%),
            linear-gradient(105deg, rgba(250,232,250,.72) 0%, rgba(238,120,214,.68) 51%, rgba(222,86,177,.82) 100%);
          box-shadow: 0 calc(13 * var(--u)) calc(25 * var(--u)) rgba(70,17,69,.31), inset 0 1px 0 rgba(255,255,255,.12);
          backdrop-filter: blur(calc(9 * var(--u))) saturate(1.08);
        }

        .window-lines {
          position: absolute;
          top: 9%;
          left: 6.7%;
          width: 87%;
          height: 24%;
          display: flex;
          flex-direction: column;
        }
        .window-line--1 {
          height: calc(6 * var(--u));
          border-radius: calc(2.5 * var(--u));
          background: rgba(255,255,255,.72);
          width: 29%;
          margin-bottom: calc(3 * var(--u));
        }
        .window-line--2 {
          width: 100%;
          height: calc(22 * var(--u));
          border-radius: calc(6 * var(--u));
          background: linear-gradient(90deg, rgba(255,240,253,.72), rgba(255,170,242,.75) 42%, rgba(255,108,235,.78));
        }
        .window-line--3 {
          width: 86%;
          height: calc(5 * var(--u));
          border-radius: calc(2 * var(--u));
          background: rgba(255,255,255,.45);
          margin-top: calc(3 * var(--u));
        }

        /* CARD 3 BACKGROUND STACK */
        .card--connections {
          background:
            radial-gradient(ellipse 54% 14% at 56% 0%, rgba(255,206,190,.16), transparent 76%),
            radial-gradient(ellipse 38% 24% at 102% 8%, rgba(255,190,164,.24), transparent 75%),
            radial-gradient(ellipse 28% 24% at -5% 66%, rgba(255,192,174,.30), transparent 74%),
            radial-gradient(ellipse 46% 30% at 104% 32%, rgba(255,146,52,.42), transparent 74%),
            radial-gradient(ellipse 80% 36% at 62% 57%, rgba(255,141,36,.62), transparent 72%),
            radial-gradient(ellipse 58% 30% at 6% 103%, rgba(199,49,45,.38), transparent 76%),
            radial-gradient(ellipse 60% 32% at 97% 101%, rgba(190,40,44,.42), transparent 76%),
            linear-gradient(177deg, #d84736 0%, #dd523c 24%, #e8703d 52%, #de5641 78%, #d34239 100%);
          background-origin: border-box;
        }

        .connections-map {
          position: absolute;
          z-index: 2;
          top: 21.7%;
          left: 0;
          width: 100%;
          height: 43%;
          opacity: .88;
        }

        /* CARD 4: AUDIENCE TELEMETRY (INDIGO / VIOLET) */
        .card--audience {
          background:
            radial-gradient(ellipse 70% 35% at 50% 0%, rgba(167, 139, 250, 0.40) 0%, transparent 75%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(99, 102, 241, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 0% 100%, rgba(139, 92, 246, 0.30) 0%, transparent 70%),
            linear-gradient(175deg, #4338ca 0%, #3730a3 35%, #312e81 70%, #1e1b4b 100%);
          background-origin: border-box;
        }

        /* CARD 5: THEME ECOSYSTEM (EMERALD / FOREST) */
        .card--themes {
          background:
            radial-gradient(ellipse 70% 35% at 50% 0%, rgba(52, 211, 153, 0.40) 0%, transparent 75%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(16, 185, 129, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 0% 100%, rgba(5, 150, 105, 0.30) 0%, transparent 70%),
            linear-gradient(175deg, #065f46 0%, #047857 35%, #064e3b 70%, #022c22 100%);
          background-origin: border-box;
        }

        /* CARD 6: AUTONOMOUS PIPELINE (AMBER / SUNSET) */
        .card--pipeline {
          background:
            radial-gradient(ellipse 70% 35% at 50% 0%, rgba(251, 191, 36, 0.40) 0%, transparent 75%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(245, 158, 11, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 0% 100%, rgba(217, 119, 6, 0.30) 0%, transparent 70%),
            linear-gradient(175deg, #b45309 0%, #92400e 35%, #78350f 70%, #451a03 100%);
          background-origin: border-box;
        }
      `}</style>

      <div className="stage-box">
        {/* VIDEOS */}
        {ambientMotion && (
          <>
            <video
              className="stage-motion stage-motion--wide"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5c3ec08f-2dbf-4c0a-8588-f6106a789443.webp"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_125226_45cb4f38-aa7e-47e1-885d-ae0b69745369.mp4"
            />
            <video
              className="stage-motion stage-motion--narrow"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0f4926a4-e660-4df2-9195-2bfb3e341bdd.webp"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_125242_daae1570-386d-4bd5-8896-80499e2371e0.mp4"
            />
          </>
        )}

        {/* TOP TELEMETRY RIBBON & STAGE CONTROLS */}
        <div className="masthead-wrap mb-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-black/8 text-[11px] font-mono text-[#333339] shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TELEMETRY STREAM
            </span>
            <span className="hidden sm:inline text-xs font-mono text-[#666670]">
              PRAJWAL DL // PORTFOLIO OS v2.4
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Ambient Motion Toggle */}
            <button
              onClick={toggleAmbientMotion}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium flex items-center gap-1.5 transition-all shadow-sm ${
                ambientMotion
                  ? 'bg-white/90 text-black border border-black/10'
                  : 'bg-black/5 text-gray-600 border border-transparent'
              }`}
              title="Toggle ambient video backgrounds"
            >
              <Zap className="w-3 h-3 text-[#ad314d]" />
              <span className="hidden sm:inline">Motion:</span> {ambientMotion ? 'ON' : 'STILL'}
            </button>
          </div>
        </div>

        {/* MASTHEAD */}
        <header className="masthead-wrap">
          <h1 className="headline-stage">
            <div className="headline__line">
              {headlinePrefix}
              <span className="dot-word" data-dots={dotWord} aria-label={dotWord}>
                <DotWord text={dotWord} isWord />
              </span>
            </div>
            <div className="headline__line">{headlineSuffix}</div>
          </h1>

          <p className="intro-stage">{introText}</p>
        </header>

        {/* STAGE CONTROLS & MOBILE CAROUSEL CONTROLLER */}
        <div className="masthead-wrap mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`stage-pill-action py-1 px-3 text-xs ${
                activeCategory === 'all' ? 'stage-pill-action-dark' : 'stage-pill-action-glass'
              }`}
            >
              All 6 System Cards
            </button>
            <button
              onClick={() => setActiveCategory('core')}
              className={`stage-pill-action py-1 px-3 text-xs ${
                activeCategory === 'core' ? 'stage-pill-action-crimson' : 'stage-pill-action-glass'
              }`}
            >
              Core Triad (Health, Scale, Channels)
            </button>
            <button
              onClick={() => setActiveCategory('intelligence')}
              className={`stage-pill-action py-1 px-3 text-xs ${
                activeCategory === 'intelligence' ? 'stage-pill-action-dark' : 'stage-pill-action-glass'
              }`}
            >
              Intelligence Suite (Audience, Themes, AI)
            </button>
          </div>

          {/* Mobile Carousel / Stack Mode Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-mono">
            <span className="hidden sm:inline text-gray-500 text-[11px]">Mobile Layout:</span>
            <div className="flex sm:hidden items-center bg-white/70 p-0.5 rounded-full border border-black/8 shadow-sm">
              <button
                onClick={() => setMobileViewMode('carousel')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                  mobileViewMode === 'carousel' ? 'bg-[#1a1a1a] text-white' : 'text-gray-600'
                }`}
              >
                Swipe
              </button>
              <button
                onClick={() => setMobileViewMode('stack')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                  mobileViewMode === 'stack' ? 'bg-[#1a1a1a] text-white' : 'text-gray-600'
                }`}
              >
                Stack
              </button>
            </div>
          </div>
        </div>

        {/* CARDS ROW (Desktop Rigid Grid / Mobile Touch Swipe Carousel) */}
        <section
          ref={carouselRef}
          onScroll={handleScroll}
          className={`cards-stage cards-wrap ${
            mobileViewMode === 'carousel' ? 'mode-carousel' : 'mode-stack'
          }`}
          aria-label="Performance capabilities"
        >
          {/* CARD 1: SITE PERFORMANCE & EDGE LATENCY */}
          {showCard1 && (
            <article className="card card--speed">
              {ambientMotion && (
                <video
                  className="card__media"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/167977c6-8539-46b1-9a15-8dba566f50b8.png"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130045_1a612b69-4854-4b34-8043-ccb91f2c60af.mp4"
                />
              )}

              <svg className="card__grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
                <rect width="100%" height="100%" filter="url(#cardNoise)" />
              </svg>

              <h2 className="card__title">
                {card1Data[card1Index].title}<br />{card1Data[card1Index].subtitle}
              </h2>

              {/* GAUGE SVG */}
              <svg className="gauge" viewBox="0 0 326 326" aria-hidden="true">
                <defs>
                  <linearGradient id="gaugeArc" gradientUnits="userSpaceOnUse" x1="7" y1="136" x2="312" y2="109">
                    <stop offset="0" stopColor="#ff9ab7" stopOpacity="0.06" />
                    <stop offset="0.08" stopColor="#ff8caf" stopOpacity="0.44" />
                    <stop offset="0.34" stopColor="#ff6796" stopOpacity="0.94" />
                    <stop offset="0.58" stopColor="#ff6796" stopOpacity="1" />
                    <stop offset="0.82" stopColor="#ffe7ed" stopOpacity="0.74" />
                    <stop offset="0.94" stopColor="#fff8fa" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="gaugeShadow" gradientUnits="userSpaceOnUse" x1="11" y1="136" x2="308" y2="110">
                    <stop offset="0" stopColor="#6e1639" stopOpacity="0.04" />
                    <stop offset="0.09" stopColor="#6e1639" stopOpacity="0.17" />
                    <stop offset="0.52" stopColor="#72163d" stopOpacity="0.18" />
                    <stop offset="0.78" stopColor="#7b1a43" stopOpacity="0.1" />
                    <stop offset="1" stopColor="#7b1a43" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="radarBeam" cx="163" cy="163" r="145" gradientUnits="userSpaceOnUse">
                    <stop offset="0.3" stopColor="#650f35" stopOpacity="0" />
                    <stop offset="0.45" stopColor="#650f35" stopOpacity="0.025" />
                    <stop offset="0.7" stopColor="#650f35" stopOpacity="0.065" />
                    <stop offset="0.9" stopColor="#650f35" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#650f35" stopOpacity="0.05" />
                  </radialGradient>
                  <linearGradient id="radarBeamEdge" x1="238" y1="33" x2="190.5" y2="115.4" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffe7ef" stopOpacity="0.19" />
                    <stop offset="0.48" stopColor="#ffd1df" stopOpacity="0.11" />
                    <stop offset="0.82" stopColor="#ffc6d7" stopOpacity="0.045" />
                    <stop offset="1" stopColor="#ffc6d7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="arc-shadow" d="M11.34 136.26A154 154 0 0 1 307.71 110.33" fill="none" strokeWidth="3.2" strokeLinecap="round" stroke="url(#gaugeShadow)" />
                <path className="outer-ring" d="M6.91 135.48A158.5 158.5 0 0 1 311.94 108.79" fill="none" strokeWidth="2.2" strokeLinecap="round" stroke="url(#gaugeArc)" />
                <path className="fine-ring" d="M19.22 137.65A146 146 0 0 1 236 36.56" fill="none" strokeWidth="1.15" stroke="rgba(255,166,194,.31)" />
                <path className="halo-wedge" d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z" fill="#6a1238" opacity="0.022" filter="url(#radarHalo)" />
                <path className="radar-sweep" d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z" fill="url(#radarBeam)" filter="url(#radarSoft)" />
                <path className="edge-line" d="M238 33.1L190.5 115.4" stroke="url(#radarBeamEdge)" strokeWidth="1.25" strokeLinecap="round" filter="url(#radarSoft)" />
                <g id="gaugeTicks">
                  {gaugeTicks.map(t => (
                    <line
                      key={t.key}
                      className="tick"
                      x1={t.x1}
                      y1={t.y1}
                      x2={t.x2}
                      y2={t.y2}
                      strokeWidth={t.sw}
                      strokeLinecap="round"
                    />
                  ))}
                </g>
                <ellipse cx="225" cy="166" rx="92" ry="76" fill="#fff" opacity="0.055" filter="url(#gaugeBlur)" />
              </svg>

              <div className="metric metric--speed">
                <span className="dot-number">
                  <DotWord text={card1Data[card1Index].num} isSpeed />
                </span>
                <span className="metric__unit">{card1Data[card1Index].unit}</span>
              </div>

              <p className="caption">{card1Data[card1Index].caption}</p>

              {/* REAL DATA PILLS SWITCHER */}
              <div className="card-data-pills">
                <button
                  type="button"
                  className={`card-data-pill ${card1Index === 0 ? 'active' : ''}`}
                  onClick={() => setCard1Index(0)}
                >
                  118ms Latency
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card1Index === 1 ? 'active' : ''}`}
                  onClick={() => setCard1Index(1)}
                >
                  98% Health
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card1Index === 2 ? 'active' : ''}`}
                  onClick={() => setCard1Index(2)}
                >
                  0.8s LCP
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card1Index === 3 ? 'active' : ''}`}
                  onClick={() => setCard1Index(3)}
                >
                  42ms TTFB
                </button>
              </div>

              <button
                type="button"
                className="learn-more"
                onClick={() => onNavigate('/admin/site-health')}
              >
                Inspect Health
              </button>
            </article>
          )}

          {/* CARD 2: CONTENT CORPUS & INDEX WINDOW */}
          {showCard2 && (
            <article className="card card--context">
              {ambientMotion && (
                <video
                  className="card__media"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0446d1d5-e65e-4db5-8090-3e30d09afc43.png"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130054_dd005674-d693-4d81-80a5-357f7f10b3a3.mp4"
                />
              )}

              <svg className="card__grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
                <rect width="100%" height="100%" filter="url(#cardNoise)" />
              </svg>

              <h2 className="card__title">
                {card2Data[card2Index].title}<br />{card2Data[card2Index].subtitle}
              </h2>

              {/* TILE WALL BACKDROP */}
              <div className="context-glow" />
              <div className="context-backdrop">
                <svg viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="tTLf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4b0ee" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#c6bbff" stopOpacity="0.18" />
                    </linearGradient>
                    <linearGradient id="tTCf" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#d5c2ff" stopOpacity="0.22" />
                      <stop offset="33%" stopColor="#e0bdff" stopOpacity="0.26" />
                      <stop offset="66%" stopColor="#f2a0ee" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#ff96da" stopOpacity="0.34" />
                    </linearGradient>
                    <linearGradient id="tTRf" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffe8da" stopOpacity="0.56" />
                      <stop offset="50%" stopColor="#f9c6d0" stopOpacity="0.26" />
                      <stop offset="100%" stopColor="#eba4bf" stopOpacity="0.08" />
                    </linearGradient>
                    <linearGradient id="tMLf" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#bca5e8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#d8a2d1" stopOpacity="0.18" />
                    </linearGradient>
                    <linearGradient id="tMLx" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#caa8f0" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#8c3e80" stopOpacity="0.12" />
                    </linearGradient>
                    <linearGradient id="tMCf" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#de95d5" stopOpacity="0.28" />
                      <stop offset="50%" stopColor="#d075bc" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#bb5092" stopOpacity="0.25" />
                    </linearGradient>
                    <linearGradient id="tMRf" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#e858b8" stopOpacity="0.52" />
                      <stop offset="50%" stopColor="#e6459c" stopOpacity="0.46" />
                      <stop offset="100%" stopColor="#de74ba" stopOpacity="0.16" />
                    </linearGradient>
                    <linearGradient id="mrLShade" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6a1e4a" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#6a1e4a" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="deepX" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#7a1c38" stopOpacity="0.7" />
                      <stop offset="35%" stopColor="#d86050" stopOpacity="0.5" />
                      <stop offset="70%" stopColor="#e688b8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8a70c0" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="gV1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4a1835" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#361026" stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="gV2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5c1638" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#401228" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="gH1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#45122c" stopOpacity="0.25" />
                      <stop offset="50%" stopColor="#601538" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#45122c" stopOpacity="0.25" />
                    </linearGradient>
                    <linearGradient id="tileSheen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="wallMaskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                      <stop offset="54%" stopColor="#fff" stopOpacity="1" />
                      <stop offset="58%" stopColor="#fff" stopOpacity="0.72" />
                      <stop offset="62%" stopColor="#fff" stopOpacity="0.18" />
                      <stop offset="65%" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                    <mask id="wallM">
                      <rect width="429" height="554" fill="url(#wallMaskGrad)" />
                    </mask>
                    <linearGradient id="deepMaskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0.8" />
                    </linearGradient>
                    <mask id="deepM">
                      <rect x="-24" y="384" width="480" height="170" fill="url(#deepMaskGrad)" />
                    </mask>
                  </defs>

                  <g mask="url(#wallM)">
                    <rect x="-24" y="22" width="106" height="149" rx="15" fill="url(#tTLf)" />
                    <rect x="88" y="22" width="247" height="150" rx="15" fill="url(#tTCf)" />
                    <rect x="88" y="22" width="247" height="46" rx="15" fill="url(#tileSheen)" />
                    <rect x="346" y="22" width="111" height="147" rx="15" fill="url(#tTRf)" />
                    <rect x="346" y="22" width="111" height="46" rx="15" fill="url(#tileSheen)" />

                    <rect x="-24" y="177" width="108" height="174" rx="15" fill="url(#tMLf)" />
                    <rect x="-24" y="177" width="108" height="174" rx="15" fill="url(#tMLx)" />
                    <rect x="-24" y="177" width="108" height="52" rx="15" fill="url(#tileSheen)" />
                    <rect x="88" y="177" width="247" height="174" rx="15" fill="url(#tMCf)" />
                    <rect x="344" y="175" width="113" height="176" rx="15" fill="url(#tMRf)" />
                    <rect x="344" y="175" width="40" height="176" rx="15" fill="url(#mrLShade)" />
                  </g>

                  <g filter="url(#groutSoft)">
                    <rect x="81" y="30" width="8" height="150" fill="url(#gV1)" />
                    <rect x="338" y="30" width="8" height="322" fill="url(#gV2)" />
                    <rect x="0" y="167" width="429" height="12" fill="url(#gH1)" />
                  </g>

                  <ellipse cx="352" cy="86" rx="140" ry="108" fill="#f8b6ce" opacity="0.14" filter="url(#tileSoft)" />
                  <ellipse cx="75" cy="150" rx="82" ry="54" fill="#ffcce6" opacity="0.12" filter="url(#tileSoft)" />
                  <ellipse cx="8" cy="334" rx="76" ry="58" fill="#581635" opacity="0.22" filter="url(#tileSoft)" />
                  <ellipse cx="56" cy="215" rx="56" ry="62" fill="#7a245c" opacity="0.16" filter="url(#tileSoft)" />

                  <rect x="-24" y="384" width="480" height="170" fill="url(#deepX)" mask="url(#deepM)" />

                  <rect x="0" y="0" width="429" height="360" filter="url(#wallNoiseF)" opacity="0.34" style={{ mixBlendMode: 'soft-light' }} />
                  <rect x="-24" y="400" width="480" height="154" filter="url(#deepNoiseF)" opacity="0.22" style={{ mixBlendMode: 'soft-light' }} />
                  <rect x="-24" y="177" width="108" height="174" filter="url(#wallNoiseF2)" opacity="0.30" style={{ mixBlendMode: 'soft-light' }} />
                  <rect x="344" y="175" width="113" height="176" filter="url(#wallNoiseF2)" opacity="0.30" style={{ mixBlendMode: 'soft-light' }} />
                </svg>
              </div>

              {/* CONTEXT WINDOW */}
              <div className="context-window">
                <svg viewBox="0 0 252 166" preserveAspectRatio="none" aria-hidden="true">
                  <rect width="100%" height="100%" filter="url(#panelNoiseF)" />
                </svg>
                <div className="window-lines">
                  <span className="window-line window-line--1" />
                  <span className="window-line window-line--2" />
                  <span className="window-line window-line--3" />
                </div>
              </div>

              <div className="metric metric--context">
                <span className="dot-number">
                  <DotWord text={card2Data[card2Index].num} isContext />
                </span>
                <span className="metric__unit">{card2Data[card2Index].unit}</span>
              </div>

              <p className="caption">{card2Data[card2Index].caption}</p>

              {/* REAL DATA PILLS SWITCHER */}
              <div className="card-data-pills">
                <button
                  type="button"
                  className={`card-data-pill ${card2Index === 0 ? 'active' : ''}`}
                  onClick={() => setCard2Index(0)}
                >
                  8.0M Nodes
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card2Index === 1 ? 'active' : ''}`}
                  onClick={() => setCard2Index(1)}
                >
                  {projectsCount + postsCount} Items
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card2Index === 2 ? 'active' : ''}`}
                  onClick={() => setCard2Index(2)}
                >
                  {projectsCount} Projects
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card2Index === 3 ? 'active' : ''}`}
                  onClick={() => setCard2Index(3)}
                >
                  14.8K Words
                </button>
              </div>

              <button
                type="button"
                className="learn-more"
                onClick={() => onNavigate('/admin/projects')}
              >
                Browse Content
              </button>
            </article>
          )}

          {/* CARD 3: CONNECTED CHANNELS & DISTRIBUTION */}
          {showCard3 && (
            <article className="card card--connections">
              {ambientMotion && (
                <video
                  className="card__media"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/da8d0242-4dee-4f6d-813f-a5887e86ad77.png"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130103_7550f407-f14b-40a6-9616-7a26d7a8bd9f.mp4"
                />
              )}

              <svg className="card__grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
                <rect width="100%" height="100%" filter="url(#cardNoise)" />
              </svg>

              <h2 className="card__title">
                {card3Data[card3Index].title}<br />{card3Data[card3Index].subtitle}
              </h2>

              {/* CONNECTIONS MAP */}
              <div className="connections-map">
                <svg viewBox="0 0 429 238" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="connMaskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                      <stop offset="50%" stopColor="#fff" stopOpacity="1" />
                      <stop offset="67%" stopColor="#fff" stopOpacity="0.46" />
                      <stop offset="83%" stopColor="#fff" stopOpacity="0.15" />
                      <stop offset="96%" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                    <mask id="connMask">
                      <rect width="429" height="238" fill="url(#connMaskGrad)" />
                    </mask>
                  </defs>
                  <g mask="url(#connMask)">
                    <path d="M0 5H128c27 0 36 7 39 26 2 16 9 22 24 22h106c16 0 23-8 25-25 2-16 10-23 31-23h76" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.20" />
                    <path d="M0 117h46c15 0 22 8 26 25 5 23 12 31 31 31h174c18 0 25-8 30-31 4-17 11-25 26-25h96" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.30" />
                    <path d="M0 173h87c15 0 22 7 27 25 4 15 11 22 28 22h140c17 0 25-7 29-22 5-18 12-25 28-25h90" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.34" />
                    <path d="M0 228h120c17 0 25-5 28-18 4-15 10-20 28-20h81c18 0 25 6 28 20 4 13 11 18 28 18h116" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.16" />
                    <path d="M0 5H429M0 61H429M0 117H429" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.26" />
                    <path d="M0 173H429" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.09" />
                    <path d="M0 61h95c14 0 22-6 27-20 4-13 12-20 27-20h115c15 0 23 6 27 20 5 14 13 20 28 20h110" fill="none" stroke="#fff8dd" strokeWidth="1.15" strokeOpacity="0.52" />
                    <path d="M0 117h88c15 0 22-8 25-25 4-24 12-31 31-31h129c20 0 27 7 31 31 3 17 10 25 26 25h99" fill="none" stroke="#fff8dd" strokeWidth="1.15" strokeOpacity="0.94" />
                    <circle cx="45" cy="117" r="6.5" fill="#ffffff" />
                    <circle cx="133" cy="61" r="6.5" fill="#fff4a7" />
                    <circle cx="189" cy="61" r="6.5" fill="#fff1a4" />
                    <circle cx="319" cy="61" r="6.5" fill="#fff4a6" />
                    <circle cx="319" cy="117" r="6.5" fill="#fff2a0" />
                  </g>
                </svg>
              </div>

              <div className="metric metric--connections">
                <span className="dot-number">
                  <DotWord text={card3Data[card3Index].num} />
                </span>
                <span className="metric__unit">{card3Data[card3Index].unit}</span>
              </div>

              <p className="caption">{card3Data[card3Index].caption}</p>

              {/* REAL DATA PILLS SWITCHER */}
              <div className="card-data-pills">
                <button
                  type="button"
                  className={`card-data-pill ${card3Index === 0 ? 'active' : ''}`}
                  onClick={() => setCard3Index(0)}
                >
                  16K Endpoints
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card3Index === 1 ? 'active' : ''}`}
                  onClick={() => setCard3Index(1)}
                >
                  {automationsCount} Channels
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card3Index === 2 ? 'active' : ''}`}
                  onClick={() => setCard3Index(2)}
                >
                  99% Health
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card3Index === 3 ? 'active' : ''}`}
                  onClick={() => setCard3Index(3)}
                >
                  15m Sync
                </button>
              </div>

              <button
                type="button"
                className="learn-more"
                onClick={() => onNavigate('/admin/automations')}
              >
                Channels
              </button>
            </article>
          )}

          {/* CARD 4: AUDIENCE & RECRUITER TELEMETRY (INDIGO / VIOLET GLASS) */}
          {showCard4 && (
            <article className="card card--audience">
              <svg className="card__grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
                <rect width="100%" height="100%" filter="url(#cardNoise)" />
              </svg>

              <h2 className="card__title">
                {card4Data[card4Index].title}<br />{card4Data[card4Index].subtitle}
              </h2>

              {/* AUDIENCE RADAR & WAVEFORM SVG */}
              <div className="connections-map">
                <svg viewBox="0 0 429 238" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <radialGradient id="audRadar" cx="214" cy="119" r="100" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#a78bfa" stopOpacity="0.4" />
                      <stop offset="0.6" stopColor="#818cf8" stopOpacity="0.15" />
                      <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Radar Circles */}
                  <circle cx="214" cy="119" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="214" cy="119" r="75" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  <circle cx="214" cy="119" r="110" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="214" cy="119" r="110" fill="url(#audRadar)" />
                  
                  {/* Visitor Activity Wave */}
                  <path
                    d="M10 140 Q60 140 90 90 T150 160 T214 55 T278 150 T338 95 T419 135"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    filter="url(#radarSoft)"
                  />
                  <path
                    d="M10 140 Q60 140 90 90 T150 160 T214 55 T278 150 T338 95 T419 135"
                    fill="none"
                    stroke="#c4b5fd"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  {/* Company IP Nodes */}
                  <circle cx="90" cy="90" r="5" fill="#ffffff" />
                  <circle cx="214" cy="55" r="7" fill="#fbbf24" filter="url(#radarSoft)" />
                  <circle cx="214" cy="55" r="4.5" fill="#ffffff" />
                  <circle cx="338" cy="95" r="5" fill="#ffffff" />
                </svg>
              </div>

              <div className="metric metric--speed">
                <span className="dot-number">
                  <DotWord text={card4Data[card4Index].num} isSpeed />
                </span>
                <span className="metric__unit">{card4Data[card4Index].unit}</span>
              </div>

              <p className="caption">{card4Data[card4Index].caption}</p>

              {/* REAL DATA PILLS SWITCHER */}
              <div className="card-data-pills">
                <button
                  type="button"
                  className={`card-data-pill ${card4Index === 0 ? 'active' : ''}`}
                  onClick={() => setCard4Index(0)}
                >
                  4.8K Visits
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card4Index === 1 ? 'active' : ''}`}
                  onClick={() => setCard4Index(1)}
                >
                  84 Company IPs
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card4Index === 2 ? 'active' : ''}`}
                  onClick={() => setCard4Index(2)}
                >
                  19K Views
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card4Index === 3 ? 'active' : ''}`}
                  onClick={() => setCard4Index(3)}
                >
                  3.4m Dwell
                </button>
              </div>

              <button
                type="button"
                className="learn-more"
                onClick={() => onNavigate('/admin/analytics')}
              >
                Audience Telemetry
              </button>
            </article>
          )}

          {/* CARD 5: THEME ECOSYSTEM & 23 WORLDS (EMERALD / FOREST GLASS) */}
          {showCard5 && (
            <article className="card card--themes">
              <svg className="card__grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
                <rect width="100%" height="100%" filter="url(#cardNoise)" />
              </svg>

              <h2 className="card__title">
                {card5Data[card5Index].title}<br />{card5Data[card5Index].subtitle}
              </h2>

              {/* THEMES ISOMETRIC LATTICE SVG */}
              <div className="connections-map">
                <svg viewBox="0 0 429 238" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="prismLayer1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#a7f3d0" stopOpacity="0.5" />
                      <stop offset="100" stopColor="#34d399" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="prismLayer2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#6ee7b7" stopOpacity="0.4" />
                      <stop offset="100" stopColor="#059669" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  {/* Layer 1 */}
                  <polygon points="140,50 289,50 229,105 80,105" fill="url(#prismLayer1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                  {/* Layer 2 */}
                  <polygon points="140,95 289,95 229,150 80,150" fill="url(#prismLayer2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  {/* Layer 3 */}
                  <polygon points="140,140 289,140 229,195 80,195" fill="rgba(6,95,70,0.3)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  
                  {/* Active Theme Pin */}
                  <circle cx="184" cy="77" r="5.5" fill="#ffffff" />
                  <line x1="184" y1="77" x2="184" y2="35" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="184" cy="35" r="3.5" fill="#34d399" />
                </svg>
              </div>

              <div className="metric metric--speed">
                <span className="dot-number">
                  <DotWord text={card5Data[card5Index].num} isSpeed />
                </span>
                <span className="metric__unit">{card5Data[card5Index].unit}</span>
              </div>

              <p className="caption">{card5Data[card5Index].caption}</p>

              {/* REAL DATA PILLS SWITCHER */}
              <div className="card-data-pills">
                <button
                  type="button"
                  className={`card-data-pill ${card5Index === 0 ? 'active' : ''}`}
                  onClick={() => setCard5Index(0)}
                >
                  23 Worlds
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card5Index === 1 ? 'active' : ''}`}
                  onClick={() => setCard5Index(1)}
                >
                  6 Layouts
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card5Index === 2 ? 'active' : ''}`}
                  onClick={() => setCard5Index(2)}
                >
                  100% Isolated
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card5Index === 3 ? 'active' : ''}`}
                  onClick={() => setCard5Index(3)}
                >
                  Theme #01
                </button>
              </div>

              <button
                type="button"
                className="learn-more"
                onClick={() => onNavigate('/admin/themes')}
              >
                23 Worlds
              </button>
            </article>
          )}

          {/* CARD 6: AUTONOMOUS PIPELINE & SOCIAL DISPATCH (AMBER / SUNSET GLASS) */}
          {showCard6 && (
            <article className="card card--pipeline">
              <svg className="card__grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
                <rect width="100%" height="100%" filter="url(#cardNoise)" />
              </svg>

              <h2 className="card__title">
                {card6Data[card6Index].title}<br />{card6Data[card6Index].subtitle}
              </h2>

              {/* DISPATCH HUB SVG */}
              <div className="connections-map">
                <svg viewBox="0 0 429 238" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <radialGradient id="pipeHub" cx="214" cy="115" r="80" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#fbbf24" stopOpacity="0.4" />
                      <stop offset="0.7" stopColor="#f59e0b" stopOpacity="0.1" />
                      <stop offset="1" stopColor="#b45309" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Central Node */}
                  <circle cx="214" cy="115" r="45" fill="url(#pipeHub)" />
                  <circle cx="214" cy="115" r="14" fill="#fbbf24" opacity="0.3" filter="url(#radarSoft)" />
                  <circle cx="214" cy="115" r="7" fill="#ffffff" />

                  {/* Channel Vectors */}
                  <line x1="214" y1="115" x2="80" y2="60" stroke="#fef3c7" strokeWidth="1.2" strokeDasharray="3 3" />
                  <line x1="214" y1="115" x2="349" y2="60" stroke="#fef3c7" strokeWidth="1.2" strokeDasharray="3 3" />
                  <line x1="214" y1="115" x2="80" y2="180" stroke="#fef3c7" strokeWidth="1.2" strokeDasharray="3 3" />
                  <line x1="214" y1="115" x2="349" y2="180" stroke="#fef3c7" strokeWidth="1.2" strokeDasharray="3 3" />

                  {/* Platform Nodes */}
                  <circle cx="80" cy="60" r="8" fill="#ffffff" />
                  <circle cx="349" cy="60" r="8" fill="#38bdf8" />
                  <circle cx="80" cy="180" r="8" fill="#f43f5e" />
                  <circle cx="349" cy="180" r="8" fill="#10b981" />
                </svg>
              </div>

              <div className="metric metric--speed">
                <span className="dot-number">
                  <DotWord text={card6Data[card6Index].num} isSpeed />
                </span>
                <span className="metric__unit">{card6Data[card6Index].unit}</span>
              </div>

              <p className="caption">{card6Data[card6Index].caption}</p>

              {/* REAL DATA PILLS SWITCHER */}
              <div className="card-data-pills">
                <button
                  type="button"
                  className={`card-data-pill ${card6Index === 0 ? 'active' : ''}`}
                  onClick={() => setCard6Index(0)}
                >
                  {pendingDraftsCount || 1} Queue
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card6Index === 1 ? 'active' : ''}`}
                  onClick={() => setCard6Index(1)}
                >
                  14 Sent
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card6Index === 2 ? 'active' : ''}`}
                  onClick={() => setCard6Index(2)}
                >
                  1.2s AI
                </button>
                <button
                  type="button"
                  className={`card-data-pill ${card6Index === 3 ? 'active' : ''}`}
                  onClick={() => setCard6Index(3)}
                >
                  4 Hubs
                </button>
              </div>

              <button
                type="button"
                className="learn-more"
                onClick={() => onNavigate('/admin/automations')}
              >
                Social AI
              </button>
            </article>
          )}
        </section>

        {/* MOBILE CAROUSEL CONTROLS & PAGINATION DOTS */}
        {mobileViewMode === 'carousel' && (
          <div className="flex sm:hidden items-center justify-between px-4 mt-4 z-10">
            <button
              onClick={() => scrollToCard(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="p-2 rounded-full bg-white/80 border border-black/10 text-[#1a1a1a] disabled:opacity-30 shadow-sm"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: visibleCardsCount }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`transition-all ${
                    currentSlide === idx
                      ? 'w-5 h-2 rounded-full bg-[#ad314d]'
                      : 'w-2 h-2 rounded-full bg-black/20 hover:bg-black/40'
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToCard(Math.min(visibleCardsCount - 1, currentSlide + 1))}
              disabled={currentSlide === visibleCardsCount - 1}
              className="p-2 rounded-full bg-white/80 border border-black/10 text-[#1a1a1a] disabled:opacity-30 shadow-sm"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* COMPLETE DASHBOARD BODY IN STAGE DESIGN SYSTEM */}
        {children && (
          <div className="stage-dashboard-body mt-12 space-y-8 z-10 relative">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
