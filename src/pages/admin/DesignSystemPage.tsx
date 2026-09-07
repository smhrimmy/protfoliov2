import React, { useState } from 'react';
import { Palette, Sliders, Check, Copy, RefreshCw } from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  const [accent, setAccent] = useState('#3b82f6');
  const [bgPrimary, setBgPrimary] = useState('#0a0e17');
  const [radius, setRadius] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [copied, setCopied] = useState(false);

  const tokens = {
    colors: {
      brand: accent,
      background: bgPrimary,
      surface: '#111827',
      textPrimary: '#f9fafb',
      textMuted: '#9ca3af'
    },
    radii: {
      sm: '8px',
      md: '12px',
      lg: radius,
      full: '9999px'
    },
    motion: {
      durationFast: '150ms',
      durationNormal: '250ms',
      easingDefault: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }
  };

  const copyConfig = () => {
    navigator.clipboard?.writeText(JSON.stringify(tokens, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-gray-100 font-sans pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Design System & Token Architecture</h1>
          <p className="text-xs text-gray-400 mt-1">Global design tokens, per-theme overrides, and admin component library preview.</p>
        </div>
        <button
          onClick={copyConfig}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied JSON' : 'Export Tokens JSON'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Controls */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Theme Token Controls</h3>

          <div>
            <label className="text-xs font-mono text-gray-400 block mb-2">Brand Accent Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={accent} onChange={e => setAccent(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20" />
              <input type="text" value={accent} onChange={e => setAccent(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white flex-1" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gray-400 block mb-2">Primary Background</label>
            <div className="flex items-center gap-3">
              <input type="color" value={bgPrimary} onChange={e => setBgPrimary(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20" />
              <input type="text" value={bgPrimary} onChange={e => setBgPrimary(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white flex-1" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gray-400 block mb-2">Border Radius (Cards & Surfaces)</label>
            <select value={radius} onChange={e => setRadius(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white">
              <option value="8px">Subtle (8px)</option>
              <option value="12px">Rounded (12px)</option>
              <option value="16px">Generous (16px)</option>
              <option value="24px">Organic (24px)</option>
            </select>
          </div>
        </div>

        {/* Live Token Preview */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Token Component Preview</h3>

          <div className="p-6 border border-white/10 transition-all space-y-4" style={{ backgroundColor: bgPrimary, borderRadius: radius }}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
              <span className="text-xs font-bold text-white">Button & Card Surface</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              This interactive surface renders with your runtime tokens injected live.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-white text-xs font-semibold rounded-xl shadow-lg" style={{ backgroundColor: accent, borderRadius: radius }}>
                Primary Button
              </button>
              <button className="px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-xl hover:bg-white/15" style={{ borderRadius: radius }}>
                Secondary
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-[#080b11] border border-white/5 text-[11px] font-mono text-blue-300 overflow-x-auto">
            {JSON.stringify(tokens, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
