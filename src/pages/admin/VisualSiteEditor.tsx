import React, { useState } from 'react';
import { 
  Undo, Redo, Save, Eye, Smartphone, Tablet, Monitor, 
  Layers, Sliders, CheckCircle2, ChevronDown, ChevronRight, 
  Palette, Plus, Trash2, ArrowUpRight, SplitSquareVertical
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { THEME_MANIFESTS } from '@/data/initialThemes';

interface VisualSiteEditorProps {
  onNavigate: (route: string) => void;
}

export const VisualSiteEditor: React.FC<VisualSiteEditorProps> = ({ onNavigate }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeThemeId, setActiveThemeId] = useState(mockStorage.getActiveTheme());
  const [activeTab, setActiveTab] = useState<'components' | 'layers'>('components');
  const [compareSplit, setCompareSplit] = useState(false);
  const [savedStatus, setSavedStatus] = useState<'Saved' | 'Saving...'>('Saved');

  // Inspector state for currently selected element
  const [selectedLayer, setSelectedLayer] = useState<string>('Hero Section');
  const [headingText, setHeadingText] = useState('Engineering systems that print — not just look good.');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [paddingY, setPaddingY] = useState('64px');
  const [showMetrics, setShowMetrics] = useState(true);

  const manifest = THEME_MANIFESTS.find(m => m.id === activeThemeId) || THEME_MANIFESTS[0];

  // Theme-scoped sections
  const themeSections = [
    { name: `${manifest.name} Hero Block`, type: 'hero', description: manifest.concept },
    { name: `${manifest.name} Project Rail`, type: 'projects', description: manifest.signatureInteraction },
    { name: `${manifest.name} Skills Matrix`, type: 'skills', description: 'Interactive skill levels' },
    { name: `${manifest.name} Experience Timeline`, type: 'experience', description: 'Career achievements' },
    { name: `${manifest.name} Contact Station`, type: 'contact', description: 'Communication form' }
  ];

  const pageLayers = [
    { id: 'l-1', name: 'Hero Section', children: ['Eyebrow Badge', 'Display Headline', 'Action CTA Group'] },
    { id: 'l-2', name: 'Featured Projects', children: ['Nova Clinics Card', 'Alto Commerce Card', 'ScreenVerse X Node'] },
    { id: 'l-3', name: 'Systems Architecture & Skills', children: ['Core Tech Radar', 'Frameworks List'] },
    { id: 'l-4', name: 'Contact & Inquiries', children: ['Direct Dispatch Form', 'Social Channels'] }
  ];

  const handleSave = () => {
    setSavedStatus('Saving...');
    setTimeout(() => {
      setSavedStatus('Saved');
    }, 350);
  };

  return (
    <div className="flex flex-col h-full bg-[#070a10] text-gray-100 font-sans select-none">
      {/* Top Toolbar */}
      <div className="h-14 bg-[#0a0e17] border-b border-white/10 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
            <button title="Undo" className="p-1 text-gray-400 hover:text-white rounded-lg"><Undo className="w-3.5 h-3.5" /></button>
            <button title="Redo" className="p-1 text-gray-400 hover:text-white rounded-lg"><Redo className="w-3.5 h-3.5" /></button>
          </div>

          <span className="text-xs font-mono text-gray-500">|</span>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400 font-mono">THEME:</span>
            <span className="font-semibold text-blue-400 truncate max-w-[140px]">{manifest.name}</span>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-lg transition-colors ${device === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-lg transition-colors ${device === 'tablet' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-lg transition-colors ${device === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareSplit(!compareSplit)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              compareSplit ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-300'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" /> Draft vs Live
          </button>

          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Save className="w-3.5 h-3.5" /> {savedStatus}
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="p-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl"
            title="Preview Live Canvas"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Component Library & Layers */}
        <div className="w-72 bg-[#0a0e17] border-r border-white/5 flex flex-col shrink-0">
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab('components')}
              className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 ${
                activeTab === 'components' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Theme Sections
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 ${
                activeTab === 'layers' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Layers Tree
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'components' ? (
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  SCOPED TO {manifest.name.toUpperCase()} ONLY
                </p>
                {themeSections.map((sec, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
                    <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{sec.name}</p>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{sec.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 font-mono text-xs">
                {pageLayers.map(l => (
                  <div key={l.id} className="space-y-1">
                    <div 
                      onClick={() => setSelectedLayer(l.name)}
                      className={`p-2 rounded-lg flex items-center justify-between cursor-pointer ${
                        selectedLayer === l.name ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <span className="font-bold">{l.name}</span>
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </div>
                    <div className="pl-4 space-y-0.5 border-l border-white/10 ml-2">
                      {l.children.map((c, ci) => (
                        <div key={ci} className="py-1 px-2 text-[11px] text-gray-400 hover:text-white cursor-pointer truncate">
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Live Theme Canvas */}
        <div className="flex-1 bg-[#05070c] p-6 flex items-center justify-center overflow-auto">
          <div 
            className={`transition-all duration-300 shadow-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c1017] flex flex-col ${
              device === 'desktop' ? 'w-full h-full' :
              device === 'tablet' ? 'w-[768px] h-[90%]' :
              'w-[380px] h-[90%]'
            }`}
          >
            {/* Canvas Mock Frame Header */}
            <div className="h-8 bg-[#111622] px-4 flex items-center justify-between border-b border-white/5 text-[10px] font-mono text-gray-400">
              <span>{manifest.name} // {manifest.layoutArchitecture}</span>
              <span className="text-emerald-400">CANVAS READY</span>
            </div>

            {/* Render Simulated Theme Canvas */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 select-text" style={{ paddingBottom: paddingY }}>
              {/* Hero Block Preview */}
              <div 
                onClick={() => setSelectedLayer('Hero Section')}
                className={`p-8 rounded-2xl border transition-all cursor-pointer ${
                  selectedLayer === 'Hero Section' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-white/5 hover:border-white/20'
                }`}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400">PRAJWAL DL · SYSTEMS ARCHITECT</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                  {headingText}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
                  Building bespoke AI automations, robust edge platforms, and interactive 3D portfolio environments for ambitious brands.
                </p>

                {showMetrics && (
                  <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/5 text-left font-mono">
                    <div>
                      <p className="text-lg font-bold text-white">40+</p>
                      <p className="text-[10px] text-gray-500">Shipped</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">$2.4M</p>
                      <p className="text-[10px] text-gray-500">Revenue</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">100%</p>
                      <p className="text-[10px] text-gray-500">Uptime</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Projects Preview Block */}
              <div 
                onClick={() => setSelectedLayer('Featured Projects')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  selectedLayer === 'Featured Projects' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Featured Systems</h3>
                  <span className="text-xs font-mono text-gray-400">Signature: {manifest.signatureInteraction}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-sm font-bold text-white">Nova Clinics</p>
                    <p className="text-xs text-gray-400 mt-1">AI-driven patient triage & booking engine.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-sm font-bold text-white">Alto Commerce</p>
                    <p className="text-xs text-gray-400 mt-1">Headless Next.js enterprise infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Properties Inspector */}
        <div className="w-80 bg-[#0a0e17] border-l border-white/5 flex flex-col shrink-0 p-5 space-y-5 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-blue-400" /> Properties Inspector
            </h3>
            <span className="text-[10px] font-mono text-gray-400 truncate max-w-[120px]">{selectedLayer}</span>
          </div>

          <div>
            <label className="text-[11px] font-mono text-gray-400 block mb-1">Headline Text</label>
            <textarea
              rows={3}
              value={headingText}
              onChange={e => setHeadingText(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-gray-400 block mb-1">Accent Token Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={e => setAccentColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/20"
              />
              <input
                type="text"
                value={accentColor}
                onChange={e => setAccentColor(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-gray-400 block mb-1">Vertical Canvas Padding</label>
            <select
              value={paddingY}
              onChange={e => setPaddingY(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="32px">Compact (32px)</option>
              <option value="64px">Default (64px)</option>
              <option value="96px">Generous (96px)</option>
            </select>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={showMetrics}
              onChange={e => setShowMetrics(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 bg-white/10"
            />
            <span className="text-xs text-white font-medium">Display Key Metrics Grid</span>
          </label>
        </div>
      </div>
    </div>
  );
};
