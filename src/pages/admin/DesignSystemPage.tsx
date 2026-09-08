import React, { useState } from 'react';
import { 
  Palette, Sliders, Check, Copy, RefreshCw, Type, Maximize2, 
  Sparkles, Layers, Box, CheckCircle2, AlertCircle, Search, 
  Send, ExternalLink, X, ChevronRight, Eye, Play
} from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  // Token State
  const [accent, setAccent] = useState('#3b82f6');
  const [accentHover, setAccentHover] = useState('#2563eb');
  const [bgPrimary, setBgPrimary] = useState('#0a0e17');
  const [surface, setSurface] = useState('#111827');
  const [border, setBorder] = useState('#1f2937');
  const [textPrimary, setTextPrimary] = useState('#f9fafb');
  const [textMuted, setTextMuted] = useState('#9ca3af');
  const [successColor, setSuccessColor] = useState('#10b981');
  const [dangerColor, setDangerColor] = useState('#ef4444');
  const [warningColor, setWarningColor] = useState('#f59e0b');

  // Typography Tokens
  const [fontFamilySans, setFontFamilySans] = useState('Inter, sans-serif');
  const [fontFamilySerif, setFontFamilySerif] = useState('"Playfair Display", Georgia, serif');
  const [fontFamilyMono, setFontFamilyMono] = useState('"JetBrains Mono", monospace');
  const [baseFontSize, setBaseFontSize] = useState('16px');
  const [letterSpacing, setLetterSpacing] = useState('0.02em');
  const [lineHeight, setLineHeight] = useState('1.6');

  // Surface Geometry & Elevation Tokens
  const [radius, setRadius] = useState('14px');
  const [borderWidth, setBorderWidth] = useState('1px');
  const [shadowElevation, setShadowElevation] = useState('0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)');
  const [motionDuration, setMotionDuration] = useState('200ms');

  // UI Component Preview State
  const [activeTab, setActiveTab] = useState<'buttons' | 'inputs' | 'cards' | 'tabs' | 'badges' | 'tables' | 'dialogs'>('buttons');
  const [previewTabIdx, setPreviewTabIdx] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'json' | 'tailwind' | 'css'>('json');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getTokensBundle = () => ({
    colors: {
      brand: accent,
      brandHover: accentHover,
      background: bgPrimary,
      surface: surface,
      border: border,
      textPrimary: textPrimary,
      textMuted: textMuted,
      success: successColor,
      danger: dangerColor,
      warning: warningColor
    },
    typography: {
      fontSans: fontFamilySans,
      fontSerif: fontFamilySerif,
      fontMono: fontFamilyMono,
      baseSize: baseFontSize,
      lineHeight: lineHeight,
      letterSpacing: letterSpacing
    },
    geometry: {
      radius: radius,
      borderWidth: borderWidth,
      shadow: shadowElevation,
      transitionDuration: motionDuration
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  });

  const generateTailwindSnippet = () => {
    return `// tailwind.config.js extension
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '${accent}',
        'brand-hover': '${accentHover}',
        'surface-primary': '${surface}',
        'border-token': '${border}',
      },
      borderRadius: {
        token: '${radius}',
      },
      fontFamily: {
        sans: [${fontFamilySans}],
        serif: [${fontFamilySerif}],
        mono: [${fontFamilyMono}],
      }
    }
  }
};`;
  };

  const generateCssVariables = () => {
    return `:root {
  --color-brand: ${accent};
  --color-brand-hover: ${accentHover};
  --color-bg-primary: ${bgPrimary};
  --color-surface: ${surface};
  --color-border: ${border};
  --color-text-primary: ${textPrimary};
  --color-text-muted: ${textMuted};
  --radius-token: ${radius};
  --font-sans: ${fontFamilySans};
  --font-serif: ${fontFamilySerif};
  --font-mono: ${fontFamilyMono};
  --motion-duration: ${motionDuration};
}`;
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-100 font-sans pb-28">
      {/* Toast Feedback */}
      {copiedCode && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>Copied {copiedCode} to clipboard!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Palette className="w-6 h-6 text-blue-400" /> Design System Studio & Token Architecture
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time design token controls that immediately reflect across living UI component instances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 text-xs">
            <button
              onClick={() => setExportFormat('json')}
              className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors ${exportFormat === 'json' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
            >
              JSON
            </button>
            <button
              onClick={() => setExportFormat('tailwind')}
              className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors ${exportFormat === 'tailwind' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
            >
              Tailwind
            </button>
            <button
              onClick={() => setExportFormat('css')}
              className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors ${exportFormat === 'css' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
            >
              CSS Vars
            </button>
          </div>

          <button
            onClick={() => {
              const code = exportFormat === 'json' 
                ? JSON.stringify(getTokensBundle(), null, 2)
                : exportFormat === 'tailwind' 
                ? generateTailwindSnippet() 
                : generateCssVariables();
              copyToClipboard(code, `${exportFormat.toUpperCase()} configuration`);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Config
          </button>
        </div>
      </div>

      {/* Two-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Token Controls */}
        <div className="lg:col-span-5 bg-[#0a0e17] border border-white/5 rounded-3xl p-6 space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/5">
            <Sliders className="w-4 h-4 text-blue-400" /> Token Variables
          </h2>

          {/* Color Palette Tokens */}
          <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">Color Tokens</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-gray-400 block mb-1">Brand Accent</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={accent} onChange={e => setAccent(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/20" />
                  <input type="text" value={accent} onChange={e => setAccent(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs font-mono text-white" />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-gray-400 block mb-1">Surface Background</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={surface} onChange={e => setSurface(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/20" />
                  <input type="text" value={surface} onChange={e => setSurface(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs font-mono text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Success</label>
                <input type="color" value={successColor} onChange={e => setSuccessColor(e.target.value)} className="w-full h-7 rounded cursor-pointer bg-transparent" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Warning</label>
                <input type="color" value={warningColor} onChange={e => setWarningColor(e.target.value)} className="w-full h-7 rounded cursor-pointer bg-transparent" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Danger</label>
                <input type="color" value={dangerColor} onChange={e => setDangerColor(e.target.value)} className="w-full h-7 rounded cursor-pointer bg-transparent" />
              </div>
            </div>
          </div>

          {/* Geometry, Radius & Borders */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">Radius & Geometry</p>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Border Radius</span>
                <span className="font-mono text-white">{radius}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-xs">
                {['0px', '6px', '12px', '16px', '9999px'].map(r => (
                  <button
                    key={r}
                    onClick={() => setRadius(r)}
                    className={`py-1.5 rounded-lg border transition-colors ${radius === r ? 'bg-blue-600 border-blue-500 text-white font-bold' : 'bg-white/5 border-white/5 text-gray-400'}`}
                  >
                    {r === '9999px' ? 'Full' : r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Border Width</label>
                <select
                  value={borderWidth}
                  onChange={e => setBorderWidth(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="0px">None (0px)</option>
                  <option value="1px">Subtle (1px)</option>
                  <option value="2px">Bold (2px)</option>
                  <option value="4px">Brutalist (4px)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Motion Speed</label>
                <select
                  value={motionDuration}
                  onChange={e => setMotionDuration(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="150ms">Snappy (150ms)</option>
                  <option value="200ms">Standard (200ms)</option>
                  <option value="350ms">Relaxed (350ms)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Typography Scale */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">Typography Scale</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Primary Font</label>
                <select
                  value={fontFamilySans}
                  onChange={e => setFontFamilySans(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="Inter, sans-serif">Inter (Modern Swiss)</option>
                  <option value="Geist, sans-serif">Geist (Clean Tech)</option>
                  <option value="system-ui">System Default</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Base Font Size</label>
                <select
                  value={baseFontSize}
                  onChange={e => setBaseFontSize(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="14px">Compact (14px)</option>
                  <option value="16px">Default (16px)</option>
                  <option value="18px">Large (18px)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Component Showcase */}
        <div className="lg:col-span-7 bg-[#0e131f] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live Component Preview</h2>
            </div>

            {/* Component Category Selector */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
              {(['buttons', 'inputs', 'cards', 'tabs', 'badges', 'tables', 'dialogs'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    activeTab === tab ? 'bg-blue-600 text-white font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 1. BUTTONS SHOWCASE */}
          {activeTab === 'buttons' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400">Buttons rendered with dynamic brand tokens, radius, and hover styles.</p>

              <div className="p-8 rounded-2xl bg-[#080b11] border border-white/5 flex flex-wrap items-center gap-4">
                {/* Primary Button */}
                <button
                  className="px-5 py-2.5 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
                  style={{
                    backgroundColor: accent,
                    borderRadius: radius,
                    borderWidth: borderWidth,
                    borderColor: 'transparent',
                    transitionDuration: motionDuration
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Primary Action
                </button>

                {/* Secondary Button */}
                <button
                  className="px-5 py-2.5 text-white font-semibold text-xs transition-colors hover:bg-white/10"
                  style={{
                    backgroundColor: surface,
                    borderRadius: radius,
                    borderWidth: borderWidth,
                    borderColor: border,
                    transitionDuration: motionDuration
                  }}
                >
                  Secondary Action
                </button>

                {/* Ghost / Outline Button */}
                <button
                  className="px-5 py-2.5 font-semibold text-xs transition-colors hover:bg-white/5"
                  style={{
                    color: accent,
                    borderRadius: radius,
                    borderWidth: borderWidth,
                    borderColor: accent,
                    transitionDuration: motionDuration
                  }}
                >
                  Outline Button
                </button>

                {/* Danger Button */}
                <button
                  className="px-4 py-2.5 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                  style={{
                    backgroundColor: dangerColor,
                    borderRadius: radius,
                    transitionDuration: motionDuration
                  }}
                >
                  <AlertCircle className="w-3.5 h-3.5" /> Danger
                </button>

                {/* Loading State Button */}
                <button
                  disabled
                  className="px-4 py-2.5 text-gray-400 font-semibold text-xs flex items-center gap-2 opacity-75 cursor-not-allowed"
                  style={{
                    backgroundColor: surface,
                    borderRadius: radius,
                    borderWidth: borderWidth,
                    borderColor: border
                  }}
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing...
                </button>
              </div>
            </div>
          )}

          {/* 2. INPUTS & FORMS SHOWCASE */}
          {activeTab === 'inputs' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400">Form controls reflecting live radius and surface tokens.</p>

              <div className="p-8 rounded-2xl bg-[#080b11] border border-white/5 space-y-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1.5">Search Input with Prefix Icon</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Query across systems..."
                      className="w-full pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none"
                      style={{
                        backgroundColor: surface,
                        borderRadius: radius,
                        borderWidth: borderWidth,
                        borderColor: border
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1.5">Standard Select Dropdown</label>
                    <select
                      className="w-full px-3 py-2.5 text-xs text-white focus:outline-none"
                      style={{
                        backgroundColor: surface,
                        borderRadius: radius,
                        borderWidth: borderWidth,
                        borderColor: border
                      }}
                    >
                      <option>System Architecture v2.0</option>
                      <option>Next.js Edge Cluster</option>
                      <option>Three.js WebGL Spatial</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1.5">Validated Field (Success)</label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="https://portfolio.prajwaldl.com"
                        className="w-full px-3 py-2.5 text-xs text-white focus:outline-none pr-8"
                        style={{
                          backgroundColor: surface,
                          borderRadius: radius,
                          borderWidth: borderWidth,
                          borderColor: successColor
                        }}
                      />
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-2.5 top-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. CARDS SHOWCASE */}
          {activeTab === 'cards' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400">Standard, elevated, and stat bento cards.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Elevated Card */}
                <div
                  className="p-6 transition-all space-y-3"
                  style={{
                    backgroundColor: surface,
                    borderRadius: radius,
                    borderWidth: borderWidth,
                    borderColor: border,
                    boxShadow: shadowElevation
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold" style={{ color: accent }}>FEATURED WORK</span>
                    <span className="text-xs text-gray-500">2026</span>
                  </div>
                  <h3 className="text-base font-bold text-white">SupportOS System</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    AI-native customer support operating system with ticket triage and real-time response telemetry.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold" style={{ color: accent }}>
                    <span>Explore Case Study</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bento Stat Card */}
                <div
                  className="p-6 space-y-2 flex flex-col justify-between"
                  style={{
                    backgroundColor: bgPrimary,
                    borderRadius: radius,
                    borderWidth: borderWidth,
                    borderColor: border
                  }}
                >
                  <span className="text-xs font-mono text-gray-400 uppercase">Throughput Rate</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">99.98%</span>
                    <span className="text-xs font-mono" style={{ color: successColor }}>+0.04%</span>
                  </div>
                  <p className="text-[11px] text-gray-500">Continuous edge uptime verified across 4 regions.</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. TABS SHOWCASE */}
          {activeTab === 'tabs' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400">Navigation tabs with dynamic token highlights.</p>

              <div className="p-8 rounded-2xl bg-[#080b11] border border-white/5 space-y-6">
                {/* Pill Tabs */}
                <div 
                  className="p-1.5 flex gap-1 border"
                  style={{
                    backgroundColor: surface,
                    borderRadius: radius,
                    borderColor: border
                  }}
                >
                  {['Systems Architecture', 'AI Workflows', '3D WebGL Engines'].map((t, idx) => (
                    <button
                      key={t}
                      onClick={() => setPreviewTabIdx(idx)}
                      className={`flex-1 py-2 text-xs font-semibold transition-all ${
                        previewTabIdx === idx ? 'text-white shadow-md' : 'text-gray-400 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: previewTabIdx === idx ? accent : 'transparent',
                        borderRadius: radius
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Underline Tabs */}
                <div className="flex border-b border-white/10 text-xs">
                  {['Overview', 'Tech Stack', 'Metrics', 'Live Deployment'].map((t, idx) => (
                    <button
                      key={t}
                      onClick={() => setPreviewTabIdx(idx)}
                      className={`py-3 px-4 font-medium transition-all ${
                        previewTabIdx === idx ? 'font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                      style={{
                        color: previewTabIdx === idx ? accent : undefined,
                        borderBottom: previewTabIdx === idx ? `2px solid ${accent}` : 'none'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. BADGES SHOWCASE */}
          {activeTab === 'badges' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400">Status badges, category pills, and tag chips.</p>

              <div className="p-8 rounded-2xl bg-[#080b11] border border-white/5 flex flex-wrap items-center gap-3">
                <span 
                  className="px-3 py-1 text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${accent}25`,
                    color: accent,
                    borderRadius: radius,
                    border: `1px solid ${accent}40`
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
                  Live Production
                </span>

                <span 
                  className="px-3 py-1 text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${successColor}25`,
                    color: successColor,
                    borderRadius: radius,
                    border: `1px solid ${successColor}40`
                  }}
                >
                  <Check className="w-3 h-3" /> System Verified
                </span>

                <span 
                  className="px-3 py-1 text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${warningColor}25`,
                    color: warningColor,
                    borderRadius: radius,
                    border: `1px solid ${warningColor}40`
                  }}
                >
                  Pending Review
                </span>

                <span 
                  className="px-3 py-1 text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${dangerColor}25`,
                    color: dangerColor,
                    borderRadius: radius,
                    border: `1px solid ${dangerColor}40`
                  }}
                >
                  Critical Alert
                </span>
              </div>
            </div>
          )}

          {/* 6. TABLES SHOWCASE */}
          {activeTab === 'tables' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400">Data table styled with surface, border, and typography tokens.</p>

              <div 
                className="overflow-hidden border"
                style={{
                  backgroundColor: surface,
                  borderRadius: radius,
                  borderColor: border
                }}
              >
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 font-mono text-[10px] text-gray-400 uppercase">
                      <th className="p-3">System Name</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3 font-bold text-white">SupportOS (IT Support Portal)</td>
                      <td className="p-3 text-gray-400">Technical Lead</td>
                      <td className="p-3"><span className="text-emerald-400 font-mono text-[11px]">● Live</span></td>
                      <td className="p-3 text-right"><span style={{ color: accent }} className="font-semibold cursor-pointer">Inspect</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">OptiTalent HRMS</td>
                      <td className="p-3 text-gray-400">Full Stack Developer</td>
                      <td className="p-3"><span className="text-emerald-400 font-mono text-[11px]">● Live</span></td>
                      <td className="p-3 text-right"><span style={{ color: accent }} className="font-semibold cursor-pointer">Inspect</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Finverse Financial OS</td>
                      <td className="p-3 text-gray-400">Frontend Engineer</td>
                      <td className="p-3"><span className="text-emerald-400 font-mono text-[11px]">● Live</span></td>
                      <td className="p-3 text-right"><span style={{ color: accent }} className="font-semibold cursor-pointer">Inspect</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. DIALOGS & MODAL SHOWCASE */}
          {activeTab === 'dialogs' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-400">Modal dialog preview utilizing elevation, backdrop blur, and token styles.</p>

              <div className="p-8 rounded-2xl bg-[#080b11] border border-white/5 text-center space-y-4">
                <p className="text-xs text-gray-300">Click to preview interactive modal rendered with current design tokens:</p>
                <button
                  onClick={() => setDialogOpen(true)}
                  className="px-5 py-2.5 text-white font-bold text-xs shadow-lg transition-all"
                  style={{
                    backgroundColor: accent,
                    borderRadius: radius
                  }}
                >
                  Open Live Dialog Preview
                </button>
              </div>

              {dialogOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                  <div 
                    className="max-w-md w-full p-6 space-y-4 border animate-in zoom-in-95"
                    style={{
                      backgroundColor: surface,
                      borderRadius: radius,
                      borderColor: border,
                      boxShadow: shadowElevation
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">Confirm System Action</h3>
                      <button onClick={() => setDialogOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      This modal dialog automatically inherits the design system's background surface, border radius, and elevation tokens.
                    </p>
                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        onClick={() => setDialogOpen(false)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                        style={{ borderRadius: radius }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setDialogOpen(false)}
                        className="px-4 py-2 text-white text-xs font-bold shadow-md"
                        style={{ backgroundColor: accent, borderRadius: radius }}
                      >
                        Confirm Action
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
