import React, { useState, useEffect } from 'react';
import { 
  Palette, Check, Eye, Columns, Sparkles, Filter, Undo2, 
  ExternalLink, Layers, Sliders, Star, AlertCircle, X, Maximize2
} from 'lucide-react';
import { THEME_MANIFESTS } from '@/data/initialThemes';
import { ThemeManifest, ThemeCategory, ThemeCapability } from '@/types/theme';
import { mockStorage } from '@/data/mockStorage';
import { ThemeSwitchLoader } from '@/components/loaders/ThemeSwitchLoader';

interface ThemeSelectorPageProps {
  onNavigate: (route: string) => void;
  onPreviewTheme: (themeId: string) => void;
}

export const ThemeSelectorPage: React.FC<ThemeSelectorPageProps> = ({ onNavigate, onPreviewTheme }) => {
  const [activeThemeId, setActiveThemeId] = useState(mockStorage.getActiveTheme());
  const [liveThemeId, setLiveThemeId] = useState(mockStorage.getLiveTheme());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCapability, setSelectedCapability] = useState<string>('All');
  
  // Compare mode
  const [compareMode, setCompareMode] = useState(false);
  const [compareThemeA, setCompareThemeA] = useState<string>('theme-01-minimal-editorial');
  const [compareThemeB, setCompareThemeB] = useState<string>('theme-02-brutalist');

  // Loading switch animation state
  const [switchingToTheme, setSwitchingToTheme] = useState<string | null>(null);

  // Undo state
  const [lastSwitchedFrom, setLastSwitchedFrom] = useState<string | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);

  // Quick customize modal
  const [customizingManifest, setCustomizingManifest] = useState<ThemeManifest | null>(null);
  const [customAccent, setCustomAccent] = useState('#3b82f6');

  // Pinned / Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const raw = localStorage.getItem('pdl_favorite_themes');
    return raw ? JSON.parse(raw) : ['theme-01-minimal-editorial', 'theme-05-galaxy-cosmos-3d'];
  });

  const categories = ['All', 'Editorial', 'Brutalist', 'Cyber', 'OS / Retro', '3D / Spatial', 'Minimalist', 'Experimental'];
  const capabilities = ['All', '3D', 'High Contrast', 'Motion-Rich', 'Heavy Assets', 'Pointer-Intensive', 'Camera'];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('pdl_favorite_themes', JSON.stringify(updated));
  };

  const handleApplyTheme = (themeId: string, applyToLive: boolean = false) => {
    setLastSwitchedFrom(activeThemeId);
    setSwitchingToTheme(themeId);
    
    setTimeout(() => {
      mockStorage.setActiveTheme(themeId);
      if (applyToLive) {
        mockStorage.setLiveTheme(themeId);
        mockStorage.setSiteMode('live');
      } else {
        mockStorage.setSiteMode('draft');
      }
      setActiveThemeId(themeId);
      setSwitchingToTheme(null);
      setShowUndoToast(true);
      setTimeout(() => setShowUndoToast(false), 6000);
    }, 700);
  };

  const handleUndo = () => {
    if (lastSwitchedFrom) {
      mockStorage.setActiveTheme(lastSwitchedFrom);
      setActiveThemeId(lastSwitchedFrom);
      setShowUndoToast(false);
    }
  };

  const filteredThemes = THEME_MANIFESTS.filter(m => {
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchCap = selectedCapability === 'All' || m.capabilities.includes(selectedCapability as any);
    return matchCat && matchCap;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">
              WORDPRESS-INSPIRED ENGINE · STRICT COMPONENT ISOLATION
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Theme Selector & World Index</h1>
          <p className="text-xs text-gray-400 mt-1">19 structurally distinct interactive architectures. Zero shared visual chrome or page shells.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors ${
              compareMode ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
            }`}
          >
            <Columns className="w-4 h-4" /> Compare Mode
          </button>
        </div>
      </div>

      {/* Compare Mode Split-Screen View */}
      {compareMode && (
        <div className="bg-[#0e131f] border border-blue-500/30 rounded-2xl p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Columns className="w-4 h-4 text-blue-400" /> Side-by-Side Theme Structural Comparison
            </h3>
            <button onClick={() => setCompareMode(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme A */}
            <div className="space-y-3 bg-[#070a10] p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-gray-400">Theme A:</label>
                <select
                  value={compareThemeA}
                  onChange={e => setCompareThemeA(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                >
                  {THEME_MANIFESTS.map(m => (
                    <option key={m.id} value={m.id}>{m.number} · {m.name}</option>
                  ))}
                </select>
              </div>

              {(() => {
                const mA = THEME_MANIFESTS.find(m => m.id === compareThemeA)!;
                return (
                  <div className="text-xs space-y-2 font-mono text-gray-300">
                    <p className="font-bold text-white text-sm">{mA.name} ({mA.category})</p>
                    <p className="text-[11px] text-gray-400">{mA.concept}</p>
                    <div className="pt-2 space-y-1 text-[11px]">
                      <div><span className="text-gray-500">Layout:</span> {mA.layoutArchitecture}</div>
                      <div><span className="text-gray-500">Nav:</span> {mA.navigationPattern}</div>
                      <div><span className="text-gray-500">Grid:</span> {mA.gridSystem}</div>
                      <div><span className="text-gray-500">Signature:</span> {mA.signatureInteraction}</div>
                      <div><span className="text-gray-500">Motion:</span> {mA.motionModel}</div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Theme B */}
            <div className="space-y-3 bg-[#070a10] p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-gray-400">Theme B:</label>
                <select
                  value={compareThemeB}
                  onChange={e => setCompareThemeB(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                >
                  {THEME_MANIFESTS.map(m => (
                    <option key={m.id} value={m.id}>{m.number} · {m.name}</option>
                  ))}
                </select>
              </div>

              {(() => {
                const mB = THEME_MANIFESTS.find(m => m.id === compareThemeB)!;
                return (
                  <div className="text-xs space-y-2 font-mono text-gray-300">
                    <p className="font-bold text-white text-sm">{mB.name} ({mB.category})</p>
                    <p className="text-[11px] text-gray-400">{mB.concept}</p>
                    <div className="pt-2 space-y-1 text-[11px]">
                      <div><span className="text-gray-500">Layout:</span> {mB.layoutArchitecture}</div>
                      <div><span className="text-gray-500">Nav:</span> {mB.navigationPattern}</div>
                      <div><span className="text-gray-500">Grid:</span> {mB.gridSystem}</div>
                      <div><span className="text-gray-500">Signature:</span> {mB.signatureInteraction}</div>
                      <div><span className="text-gray-500">Motion:</span> {mB.motionModel}</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0e131f] p-3 rounded-2xl border border-white/5">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === c ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 font-mono">Capability:</span>
          <select
            value={selectedCapability}
            onChange={e => setSelectedCapability(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-1 text-xs text-gray-300 focus:outline-none"
          >
            {capabilities.map((cap, i) => (
              <option key={i} value={cap}>{cap}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of 19 Live Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map(manifest => {
          const isActive = activeThemeId === manifest.id;
          const isLive = liveThemeId === manifest.id;
          const isFav = favorites.includes(manifest.id);

          return (
            <div
              key={manifest.id}
              className={`rounded-2xl bg-[#0e131f] border overflow-hidden flex flex-col justify-between transition-all group ${
                isActive ? 'border-blue-500 shadow-xl shadow-blue-500/10' : 'border-white/5 hover:border-white/20'
              }`}
            >
              {/* Miniature Interactive Preview Container */}
              <div 
                onClick={() => onPreviewTheme(manifest.id)}
                className="relative h-48 w-full bg-[#070a10] border-b border-white/5 cursor-pointer overflow-hidden group/preview"
              >
                {/* Visual Representation of Theme's Unique Layout Style */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between select-none">
                  {/* Miniature Top Chrome / Nav Pattern */}
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                    <span className="font-bold tracking-tighter" style={{ color: manifest.defaultTokens.accent }}>
                      {manifest.number} // {manifest.name.toUpperCase()}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                      {manifest.navigationPattern.split('+')[0]}
                    </span>
                  </div>

                  {/* Miniature Content Area Mock */}
                  <div className="space-y-2 py-2">
                    <div className="h-3 rounded w-3/4" style={{ backgroundColor: manifest.defaultTokens.accent, opacity: 0.8 }} />
                    <div className="h-2 rounded w-1/2 bg-white/20" />
                    <div className="grid grid-cols-3 gap-1.5 pt-2">
                      <div className="h-10 rounded bg-white/5 border border-white/5" />
                      <div className="h-10 rounded bg-white/5 border border-white/5" />
                      <div className="h-10 rounded bg-white/5 border border-white/5" />
                    </div>
                  </div>

                  {/* Miniature Footer / Signature interaction note */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
                    <span className="truncate max-w-[180px]">{manifest.signatureInteraction}</span>
                    <span className="px-1 py-0.5 rounded bg-white/5">{manifest.performance}</span>
                  </div>
                </div>

                {/* Hover Overlay: "Try It Live" Full Preview */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center gap-2 opacity-0 group-hover/preview:opacity-100 transition-opacity">
                  <span className="px-3 py-1.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Try It Live
                  </span>
                </div>

                {/* Badges & Favorite button */}
                <button
                  onClick={(e) => toggleFavorite(manifest.id, e)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/80 text-white transition-colors z-10"
                >
                  <Star className={`w-3.5 h-3.5 ${isFav ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}`} />
                </button>
              </div>

              {/* Card Metadata & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {manifest.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {isActive && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                          ACTIVE
                        </span>
                      )}
                      {isLive && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{manifest.concept}</p>

                  {/* Capability badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {manifest.capabilities.map((cap, cIdx) => (
                      <span key={cIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5">
                        {cap}
                      </span>
                    ))}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      manifest.performance === 'Light' ? 'bg-emerald-500/10 text-emerald-400' :
                      manifest.performance === 'Moderate' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {manifest.performance} Load
                    </span>
                  </div>
                </div>

                {/* Apply Flow Buttons */}
                <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => handleApplyTheme(manifest.id, false)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      isActive 
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {isActive ? <Check className="w-3.5 h-3.5" /> : null}
                    {isActive ? 'Active (Draft)' : 'Set Active'}
                  </button>

                  <button
                    onClick={() => handleApplyTheme(manifest.id, true)}
                    title="Publish directly to Live"
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 rounded-xl text-xs font-semibold"
                  >
                    Make Live
                  </button>

                  <button
                    onClick={() => {
                      setCustomizingManifest(manifest);
                      setCustomAccent(manifest.defaultTokens.accent);
                    }}
                    title="Quick Customize Tokens"
                    className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Undo Toast Float */}
      {showUndoToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] border border-blue-500/40 p-4 rounded-2xl shadow-2xl flex items-center gap-4 text-white animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium">Theme applied successfully!</span>
          </div>
          <button
            onClick={handleUndo}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-blue-300 rounded-xl text-xs font-semibold flex items-center gap-1"
          >
            <Undo2 className="w-3.5 h-3.5" /> Undo
          </button>
        </div>
      )}

      {/* Quick Customize Modal */}
      {customizingManifest && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-md p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-semibold">Quick Customize: {customizingManifest.name}</h3>
              <button onClick={() => setCustomizingManifest(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 block mb-2">Accent Color Token</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customAccent}
                  onChange={e => setCustomAccent(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20"
                />
                <input
                  type="text"
                  value={customAccent}
                  onChange={e => setCustomAccent(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setCustomizingManifest(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Token override for ${customizingManifest.name} saved!`);
                  setCustomizingManifest(null);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold"
              >
                Save Overrides
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Switch Loader Interstitial */}
      {switchingToTheme && (
        <ThemeSwitchLoader
          themeId={switchingToTheme}
          onComplete={() => setSwitchingToTheme(null)}
        />
      )}
    </div>
  );
};
