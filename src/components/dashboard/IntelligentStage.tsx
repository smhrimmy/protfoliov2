import React, { useState, useEffect, useMemo } from 'react';
import { mockStorage } from '@/data/mockStorage';

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

  useEffect(() => {
    const handleStorage = () => {
      setProjectsCount(mockStorage.getProjects().length);
      setPostsCount(mockStorage.getPosts().length);
      setAutomationsCount(mockStorage.getAutomations().filter(a => a.enabled).length);
      setAmbientMotion(localStorage.getItem('pdl_ambient_motion') !== 'false');
    };
    window.addEventListener('storage', handleStorage);
    const unsub = mockStorage.subscribe(handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      unsub();
    };
  }, []);

  // Compute live metric display strings
  const siteLatency = '118'; // 118ms edge latency
  const contentTotal = ((projectsCount * 0.8 + postsCount * 1.6) || 2.4).toFixed(1); // e.g. 2.4M tokens / words indexed
  const connectionsCount = Math.max(16, automationsCount * 4); // 16 active connections / webhooks

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
          --pad-top: clamp(24px, 4vw, 56px);
          --pad-bottom: clamp(20px, 3.5vw, 44px);
          --masthead-gap: clamp(16px, 2.5vw, 36px);
          --cards-offset: clamp(20px, 4.5vw, 54px);
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

        .dot-svg {
          display: block;
          overflow: visible;
          color: inherit;
          width: 100%;
          height: 100%;
        }

        .intro-stage {
          container-type: inline-size;
          width: 100%;
          margin: .34em 0 0;
          color: var(--copy);
          font-size: clamp(13px, min(1.36vw, 2.6vh), 20.6px);
          font-weight: 400;
          letter-spacing: -.017em;
          line-height: 1.62;
        }

        .desktop-break { display: none; }
        @container (min-width: 26.5em) {
          .desktop-break { display: inline; }
        }

        /* CARDS CONTAINER */
        .cards-wrap {
          container-type: inline-size;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--gap);
          margin-top: var(--cards-offset);
          --card-w: min(
            (100cqw - (var(--card-count) - 1) * var(--gap)) / var(--card-count),
            var(--card-ref-w) * 1px
          );
        }

        @media (min-width: 768px) and (max-width: 1100px) {
          .cards-wrap {
            display: grid;
            grid-template-columns: repeat(2, max-content);
            justify-content: center;
            align-content: center;
            --card-w: min((100cqw - var(--gap)) / 2, 429px);
          }
          .cards-wrap .card:last-child {
            grid-column: 1 / -1;
            justify-self: center;
          }
        }

        @media (max-width: 767px) {
          .cards-wrap {
            flex-direction: column;
            align-items: center;
            --card-w: min(100cqw, 429px);
          }
        }

        .card {
          container-type: inline-size;
          position: relative;
          flex: 0 0 auto;
          overflow: hidden;
          width: var(--card-w);
          aspect-ratio: 429/554;
          border: 1px solid var(--glass-line);
          border-radius: calc(var(--card-w) * 17 / 429);
          background-origin: border-box;
          color: #fff;
          --u: calc(100cqw / 429);
          box-shadow: 0 2px 4px rgba(50,28,39,.30), inset 0 1px 0 rgba(255,255,255,.24);
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

        .card__media {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          pointer-events: none;
        }

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

        .caption {
          position: absolute;
          z-index: 5;
          top: 65.1%;
          left: 10%;
          width: 80%;
          color: rgba(255,255,255,.87);
          font-size: calc(19.95 * var(--u));
          font-weight: 400;
          letter-spacing: calc(-.36 * var(--u));
          line-height: 1.45;
          text-align: center;
          text-shadow: 0 1px 2px rgba(60,21,35,.16);
        }

        .learn-more {
          position: absolute;
          z-index: 6;
          top: 83.75%;
          left: 50%;
          width: calc(111 * var(--u));
          height: calc(45 * var(--u));
          transform: translateX(-50%);
          border: 0;
          border-radius: 999px;
          color: #2d2d2d;
          background: rgba(255,255,255,.97);
          box-shadow: 0 1px 0 rgba(255,255,255,.50) inset, 0 1px 3px rgba(58,25,39,.08);
          font-size: calc(14 * var(--u));
          font-weight: 400;
          letter-spacing: calc(-.25 * var(--u));
          transition: transform .18s ease, box-shadow .18s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .learn-more:hover {
          transform: translateX(-50%) translateY(calc(-2 * var(--u)));
          box-shadow: 0 8px 20px rgba(58,25,39,.16);
        }
        .learn-more:focus-visible {
          outline: 3px solid rgba(255,255,255,.78);
          outline-offset: 3px;
        }

        /* CARD 1 — .card--speed */
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
        .card--speed::before {
          background:
            linear-gradient(103deg, rgba(255,255,255,.08), transparent 31%, rgba(255,255,255,.055) 63%, transparent 88%),
            radial-gradient(ellipse 92% 19% at 51% 0%, rgba(255,255,255,.08), transparent 78%);
        }
        .card--speed .card__grain { opacity: .54; }
        .card--speed .card__title { top: 6.3%; color: #fff; font-size: calc(22.7 * var(--u)); }
        .metric--speed { top: 48.6%; }
        .card--speed .dot-number { width: 31.2%; }
        .card--speed .dot-svg {
          transform: translate(calc(4 * var(--u)), calc(2 * var(--u))) scale(.925, 1.018);
          transform-origin: left top;
        }
        .card--speed .dot-svg circle { r: 2.05px; fill-opacity: 1; }
        .card--speed .metric__unit {
          margin-left: 1%;
          font-size: calc(30.6 * var(--u));
          transform: translateY(calc(5 * var(--u)));
          font-weight: 400;
          line-height: 1;
        }
        .card--speed .caption { top: 64.75%; font-size: calc(20.33 * var(--u)); }
        .card--speed .learn-more { top: 83.9%; width: calc(111 * var(--u)); height: calc(44 * var(--u)); }

        .gauge {
          position: absolute;
          z-index: 2;
          top: 27.63%;
          left: 10.5%;
          width: 79%;
          height: 59%;
          overflow: visible;
          pointer-events: none;
        }
        .tick { stroke: rgba(255,188,210,.34); }

        /* CARD 2 — .card--context */
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
        .card--context .card__title {
          font-size: calc(23 * var(--u));
          line-height: 1.48;
        }
        .card--context .card__grain { opacity: .68; }
        .card--context::before {
          mix-blend-mode: multiply;
          opacity: .54;
          background:
            radial-gradient(ellipse 18% 23% at 20% 32%, rgba(103,41,148,.24), transparent 76%),
            radial-gradient(ellipse 20% 24% at 81% 30%, rgba(121,34,113,.22), transparent 76%),
            radial-gradient(ellipse 66% 9% at 50% 30%, rgba(103,33,125,.26), transparent 82%),
            radial-gradient(ellipse 68% 8% at 50% 69%, rgba(86,27,64,.23), transparent 83%),
            linear-gradient(103deg, rgba(255,255,255,.08), transparent 31%, rgba(255,255,255,.05) 63%, transparent 88%);
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
          z-index: 0;
          pointer-events: none;
        }
        .context-backdrop svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .context-window {
          position: absolute;
          z-index: 3;
          top: 32.4%;
          left: 20.4%;
          width: 59%;
          height: 30.1%;
          overflow: hidden;
          border: none;
          border-radius: calc(10 * var(--u));
          background:
            linear-gradient(0deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.15) 45%, rgba(255,255,255,0) 80%),
            linear-gradient(270deg, rgba(213,62,152,.62) 0px, rgba(213,62,152,0) calc(5 * var(--u))),
            radial-gradient(ellipse 118% 70% at 60% 8%, rgba(255,203,252,.34), transparent 74%),
            linear-gradient(105deg, rgba(250,232,250,.72) 0%, rgba(238,120,214,.68) 51%, rgba(222,86,177,.82) 100%);
          box-shadow: 0 calc(13 * var(--u)) calc(25 * var(--u)) rgba(70,17,69,.31), inset 0 1px 0 rgba(255,255,255,.12);
          backdrop-filter: blur(calc(9 * var(--u))) saturate(1.08);
          -webkit-backdrop-filter: blur(calc(9 * var(--u))) saturate(1.08);
        }
        .context-window svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: .24;
          mix-blend-mode: soft-light;
          pointer-events: none;
        }

        .window-lines {
          position: absolute;
          top: 9%;
          left: 6.7%;
          width: 87%;
          height: 24%;
          pointer-events: none;
        }
        .window-line--1 {
          display: block;
          height: calc(6 * var(--u));
          border-radius: calc(2.5 * var(--u));
          background: rgba(255,255,255,.72);
          width: 29%;
          margin-bottom: calc(3 * var(--u));
        }
        .window-line--2 {
          display: block;
          width: 100%;
          height: calc(22 * var(--u));
          border-radius: calc(6 * var(--u));
          background: linear-gradient(90deg, rgba(255,240,253,.72), rgba(255,170,242,.75) 42%, rgba(255,108,235,.78));
        }
        .window-line--3 {
          display: block;
          width: 86%;
          height: calc(6 * var(--u));
          border-radius: calc(2.5 * var(--u));
          background: rgba(255,255,255,.72);
          margin-top: calc(3 * var(--u));
          opacity: .64;
        }

        .metric--context {
          top: 48.0%;
          transform: translateX(2.1cqw);
        }
        .metric--context .dot-number { width: 30.5%; }
        .metric--context .dot-svg {
          transform: translate(calc(-1 * var(--u)), calc(-.5 * var(--u))) scale(.96, 1.02);
          transform-origin: center;
        }
        .card--context .caption {
          top: 65.72%;
          color: rgba(255,255,255,.84);
          font-size: calc(19.1 * var(--u));
          letter-spacing: calc(-.28 * var(--u));
          line-height: 1.38;
        }
        .card--context .learn-more {
          top: 83.9%;
          height: calc(44 * var(--u));
        }

        /* CARD 3 — .card--connections */
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
        .card--connections .card__grain { opacity: .58; }
        .card--connections::before {
          background:
            linear-gradient(102deg, rgba(255,255,255,.07), transparent 30%, rgba(255,255,255,.05) 62%, transparent 88%),
            radial-gradient(ellipse 84% 26% at 54% 4%, rgba(255,255,255,.11), transparent 74%);
        }

        .connections-map {
          position: absolute;
          z-index: 2;
          top: 21.7%;
          left: 0;
          width: 100%;
          height: 43%;
          opacity: .78;
          pointer-events: none;
        }
        .connections-map svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .metric--connections {
          top: 48.5%;
          transform: translateX(2.1cqw);
        }
        .metric--connections .dot-number { width: 23%; }
        .metric__unit {
          margin-left: 1.3%;
          font-size: calc(30.46 * var(--u));
          font-weight: 400;
          line-height: 1;
          letter-spacing: calc(-.8 * var(--u));
        }

        .filter-defs {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
          pointer-events: none;
        }
      `}</style>

      <div className="stage-box">
        {/* AMBIENT BACKGROUND VIDEOS OR POSTER */}
        {ambientMotion ? (
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
        ) : (
          <div
            className="stage-motion"
            style={{
              backgroundImage: `url("https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5c3ec08f-2dbf-4c0a-8588-f6106a789443.webp")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
        )}

        {/* MASTHEAD */}
        <header className="masthead-wrap">
          <h1 className="headline-stage">
            <span className="headline__line">
              {headlinePrefix}
              <span className="dot-word" aria-label={dotWord}>
                <DotWord text={dotWord} isWord />
              </span>
            </span>
            <span className="headline__line">{headlineSuffix}</span>
          </h1>
          <p className="intro-stage">
            {introText}
          </p>
        </header>

        {/* CARDS ROW */}
        <section className="cards-wrap" aria-label="Operating telemetry & metrics">
          {/* CARD 1: SITE PERFORMANCE & EDGE LATENCY */}
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

            <h2 className="card__title">Site Performance<br />AI Response Latency</h2>

            {/* GAUGE */}
            <svg className="gauge" viewBox="0 0 326 326" aria-hidden="true">
              <defs>
                <linearGradient id="gaugeArc" gradientUnits="userSpaceOnUse" x1="7" y1="136" x2="312" y2="109">
                  <stop offset="0" stopColor="#ff9ab7" stopOpacity="0.06" />
                  <stop offset="0.08" stopColor="#ff8caf" stopOpacity="0.44" />
                  <stop offset="0.34" stopColor="#ff6796" stopOpacity="0.94" />
                  <stop offset="0.58" stopColor="#ff6796" stopOpacity="1" />
                  <stop offset="0.82" stopColor="#ffe7ed" stopOpacity="0.74" />
                  <stop offset="0.94" stopColor="#fff8fa" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
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
                <DotWord text={siteLatency} isSpeed />
              </span>
              <span className="metric__unit">ms</span>
            </div>

            <p className="caption">Average global<br />response</p>

            <button
              type="button"
              className="learn-more"
              onClick={() => onNavigate('/admin/site-health')}
            >
              Learn More
            </button>
          </article>

          {/* CARD 2: CONTENT ARCHITECTURE & CONTEXT WINDOW */}
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

            <h2 className="card__title">Context Window<br />Long-form Understanding</h2>

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
                  <mask id="tTCshadeM">
                    <rect x="88" y="22" width="247" height="150" rx="15" fill="#fff" />
                  </mask>
                  <mask id="deepM">
                    <rect x="-24" y="384" width="480" height="170" fill="url(#wallMaskGrad)" />
                  </mask>
                </defs>
                <g mask="url(#wallM)">
                  <g filter="url(#tileSoft)">
                    <rect x="-24" y="22" width="106" height="149" rx="15" fill="url(#tTLf)" />
                    <rect x="88" y="22" width="247" height="150" rx="15" fill="url(#tTCf)" />
                    <rect x="88" y="22" width="247" height="46" rx="15" fill="url(#tileSheen)" mask="url(#tTCshadeM)" />
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
                </g>
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
                <DotWord text={contentTotal} isContext />
              </span>
              <span className="metric__unit">M</span>
            </div>

            <p className="caption">Tokens processed<br />simultaneously</p>

            <button
              type="button"
              className="learn-more"
              onClick={() => onNavigate('/admin/projects')}
            >
              Learn More
            </button>
          </article>

          {/* CARD 3: CONNECTIONS & DISTRIBUTION CHANNELS */}
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

            <h2 className="card__title">Intelligent Connections<br />Cross-Source Context</h2>

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
                <DotWord text={connectionsCount.toString()} />
              </span>
              <span className="metric__unit">K</span>
            </div>

            <p className="caption">Connected data<br />sources</p>

            <button
              type="button"
              className="learn-more"
              onClick={() => onNavigate('/admin/automations')}
            >
              Learn More
            </button>
          </article>
        </section>

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
