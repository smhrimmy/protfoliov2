import React, { useState, useEffect } from 'react';
import { 
  Undo, Redo, Save, Eye, Smartphone, Tablet, Monitor, 
  Layers, Sliders, CheckCircle2, ChevronDown, ChevronRight, 
  Palette, Plus, Trash2, ArrowUpRight, SplitSquareVertical,
  Lock, Unlock, Copy, History, Sparkles, MoveUp, MoveDown,
  Box, Type, Image as ImageIcon, Layout, ZoomIn, ZoomOut,
  Maximize2, RefreshCw, Check, CheckCheck, X
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { THEME_MANIFESTS } from '@/data/initialThemes';

interface VisualSiteEditorProps {
  onNavigate: (route: string) => void;
}

interface ResponsiveStyleProps {
  desktop: { fontSize: string; paddingY: string; gap: string };
  tablet: { fontSize: string; paddingY: string; gap: string };
  mobile: { fontSize: string; paddingY: string; gap: string };
}

interface CanvasElement {
  id: string;
  name: string;
  type: 'hero' | 'projects' | 'skills' | 'contact' | 'custom';
  locked: boolean;
  visible: boolean;
  content: {
    eyebrow: string;
    headline: string;
    subhead: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    showMetrics: boolean;
  };
  styles: {
    accentColor: string;
    bgColor: string;
    borderRadius: string;
    borderWidth: string;
    boxShadow: string;
    animation: 'none' | 'fadeIn' | 'slideUp' | 'scaleIn';
    responsive: ResponsiveStyleProps;
  };
}

export const VisualSiteEditor: React.FC<VisualSiteEditorProps> = ({ onNavigate }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [activeThemeId, setActiveThemeId] = useState(mockStorage.getActiveTheme());
  const [leftNavTab, setLeftNavTab] = useState<'pages' | 'sections' | 'components' | 'layers' | 'patterns'>('sections');
  const [inspectorTab, setInspectorTab] = useState<'content' | 'layout' | 'typography' | 'spacing' | 'colors' | 'borders' | 'effects' | 'animation'>('content');
  const [compareSplit, setCompareSplit] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [savedStatus, setSavedStatus] = useState<'Saved' | 'Saving...' | 'Unsaved'>('Saved');
  const [showOutlines, setShowOutlines] = useState(true);

  // Undo / Redo Stacks
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);

  const manifest = THEME_MANIFESTS.find(m => m.id === activeThemeId) || THEME_MANIFESTS[0];

  // Canvas Element Hierarchy
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: 'el-hero',
      name: 'Hero Section Block',
      type: 'hero',
      locked: false,
      visible: true,
      content: {
        eyebrow: 'Prajwal DL · Systems Architect & Creative Engineer',
        headline: 'Engineering systems that print — not just look good.',
        subhead: 'Building bespoke AI automations, robust edge platforms, and interactive 3D portfolio environments for ambitious brands.',
        ctaPrimaryText: 'Explore Featured Systems',
        ctaSecondaryText: 'Initiate Contact',
        showMetrics: true,
      },
      styles: {
        accentColor: '#3b82f6',
        bgColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '16px',
        borderWidth: '1px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        animation: 'slideUp',
        responsive: {
          desktop: { fontSize: '36px', paddingY: '48px', gap: '24px' },
          tablet: { fontSize: '28px', paddingY: '36px', gap: '20px' },
          mobile: { fontSize: '22px', paddingY: '24px', gap: '16px' }
        }
      }
    },
    {
      id: 'el-projects',
      name: 'Featured Systems Grid',
      type: 'projects',
      locked: false,
      visible: true,
      content: {
        eyebrow: 'PRODUCTION CASE STUDIES',
        headline: 'Selected Systems Architecture',
        subhead: 'High-throughput enterprise backends, WebGL rendering engines, and multi-tenant platforms.',
        ctaPrimaryText: 'View All Projects',
        ctaSecondaryText: '',
        showMetrics: false,
      },
      styles: {
        accentColor: '#3b82f6',
        bgColor: 'transparent',
        borderRadius: '16px',
        borderWidth: '1px',
        boxShadow: 'none',
        animation: 'fadeIn',
        responsive: {
          desktop: { fontSize: '24px', paddingY: '36px', gap: '24px' },
          tablet: { fontSize: '20px', paddingY: '28px', gap: '16px' },
          mobile: { fontSize: '18px', paddingY: '20px', gap: '12px' }
        }
      }
    },
    {
      id: 'el-contact',
      name: 'Direct Inquiries Station',
      type: 'contact',
      locked: false,
      visible: true,
      content: {
        eyebrow: 'GET IN TOUCH',
        headline: 'Initiate Direct Architectural Dispatch',
        subhead: 'One client advisory and development slot available for next quarter.',
        ctaPrimaryText: 'Dispatch Email',
        ctaSecondaryText: 'Schedule Technical Call',
        showMetrics: false,
      },
      styles: {
        accentColor: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.03)',
        borderRadius: '20px',
        borderWidth: '1px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        animation: 'slideUp',
        responsive: {
          desktop: { fontSize: '28px', paddingY: '48px', gap: '24px' },
          tablet: { fontSize: '22px', paddingY: '32px', gap: '16px' },
          mobile: { fontSize: '18px', paddingY: '24px', gap: '12px' }
        }
      }
    }
  ]);

  const [selectedId, setSelectedId] = useState<string>('el-hero');
  const activeElement = elements.find(e => e.id === selectedId) || elements[0];

  const updateActiveElement = (updater: (prev: CanvasElement) => CanvasElement) => {
    setUndoStack(prev => [...prev, elements]);
    setRedoStack([]);
    setElements(prev => prev.map(el => el.id === selectedId ? updater(el) : el));
    setSavedStatus('Unsaved');
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const lastState = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, elements]);
    setElements(lastState);
    setUndoStack(prev => prev.slice(0, prev.length - 1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setUndoStack(prev => [...prev, elements]);
    setElements(nextState);
    setRedoStack(prev => prev.slice(0, prev.length - 1));
  };

  const handleSave = () => {
    setSavedStatus('Saving...');
    setTimeout(() => {
      setSavedStatus('Saved');
    }, 400);
  };

  const handlePublishLive = () => {
    setSavedStatus('Saving...');
    setTimeout(() => {
      mockStorage.publishAllToLive();
      setSavedStatus('Saved');
    }, 450);
  };

  const toggleLock = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setElements(prev => prev.map(el => el.id === id ? { ...el, locked: !el.locked } : el));
  };

  const toggleVisible = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setElements(prev => prev.map(el => el.id === id ? { ...el, visible: !el.visible } : el));
  };

  const duplicateElement = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const source = elements.find(el => el.id === id);
    if (!source) return;
    const newEl: CanvasElement = {
      ...source,
      id: `el-${Date.now()}`,
      name: `${source.name} (Copy)`
    };
    setElements(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const deleteElement = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (elements.length <= 1) return;
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) {
      setSelectedId(elements.find(el => el.id !== id)?.id || '');
    }
  };

  // Device resolution specifications
  const getDeviceDimensions = () => {
    switch (device) {
      case 'mobile':
        return { width: '375px', height: '667px', label: 'Mobile (375 × 667px)' };
      case 'tablet':
        return { width: '768px', height: '90%', label: 'Tablet (768 × 1024px)' };
      default:
        return { width: '100%', height: '100%', label: 'Desktop (1440 × 900px)' };
    }
  };

  const dims = getDeviceDimensions();

  return (
    <div className="flex flex-col h-full bg-[#070a10] text-gray-100 font-sans select-none overflow-hidden">
      {/* 1. TOP CONTROL BAR */}
      <header className="h-14 bg-[#0a0e17] border-b border-white/10 px-4 flex items-center justify-between shrink-0 z-30">
        {/* Left: Undo, Redo, Theme Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              title="Undo (Ctrl+Z)"
              className={`p-1.5 rounded-lg ${undoStack.length > 0 ? 'text-gray-300 hover:text-white' : 'text-gray-600 cursor-not-allowed'}`}
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              title="Redo (Ctrl+Y)"
              className={`p-1.5 rounded-lg ${redoStack.length > 0 ? 'text-gray-300 hover:text-white' : 'text-gray-600 cursor-not-allowed'}`}
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-xs font-mono text-gray-600 hidden sm:inline">|</span>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-gray-500 font-mono">THEME:</span>
            <span className="font-semibold text-blue-400 truncate max-w-[150px]">{manifest.name}</span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher & Zoom */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${device === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              title="Desktop 1440px"
              data-testid="editor-viewport-desktop"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded-lg transition-colors ${device === 'tablet' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              title="Tablet 768px"
              data-testid="editor-viewport-tablet"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${device === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              title="Mobile 375px"
              data-testid="editor-viewport-mobile"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="hidden md:flex items-center bg-white/5 px-2 py-1 rounded-xl border border-white/5 text-xs font-mono text-gray-400">
            <span>{zoomScale}%</span>
          </div>
        </div>

        {/* Right: Compare, History, Save, Publish */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareSplit(!compareSplit)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              compareSplit ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-300'
            }`}
            title="Split comparison: Draft vs Live"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Draft vs Live</span>
          </button>

          <button
            onClick={() => setHistoryDrawerOpen(!historyDrawerOpen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
            title="Revision History"
          >
            <History className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedStatus}</span>
          </button>

          <button
            onClick={handlePublishLive}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
            data-testid="editor-publish-btn"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN 3-COLUMN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT PANEL: PAGES, SECTIONS, COMPONENTS, LAYERS */}
        <div className="w-72 bg-[#0a0e17] border-r border-white/5 flex flex-col shrink-0">
          {/* Tabs header */}
          <div className="flex border-b border-white/5 text-[11px] font-mono overflow-x-auto no-scrollbar">
            <button
              onClick={() => setLeftNavTab('sections')}
              className={`flex-1 py-3 px-2 text-center transition-colors ${
                leftNavTab === 'sections' ? 'text-blue-400 border-b-2 border-blue-500 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setLeftNavTab('components')}
              className={`flex-1 py-3 px-2 text-center transition-colors ${
                leftNavTab === 'components' ? 'text-blue-400 border-b-2 border-blue-500 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Blocks
            </button>
            <button
              onClick={() => setLeftNavTab('layers')}
              className={`flex-1 py-3 px-2 text-center transition-colors ${
                leftNavTab === 'layers' ? 'text-blue-400 border-b-2 border-blue-500 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Layers
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {/* SECTIONS TAB */}
            {leftNavTab === 'sections' && (
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  PRESET THEME SECTIONS
                </p>

                {[
                  { name: `${manifest.name} Hero Block`, desc: manifest.concept },
                  { name: 'Featured Case Studies Rail', desc: 'Horizontal project slider with metrics' },
                  { name: 'Skills & Competencies Radar', desc: 'Interactive mastery categories' },
                  { name: 'Career Experience Timeline', desc: 'Chronological roles and achievements' },
                  { name: 'Direct Inquiries CTA Station', desc: 'Dispatch form with instant mailto' }
                ].map((sec, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      const newEl: CanvasElement = {
                        id: `el-${Date.now()}`,
                        name: sec.name,
                        type: 'custom',
                        locked: false,
                        visible: true,
                        content: {
                          eyebrow: 'NEW SECTION PRESET',
                          headline: sec.name,
                          subhead: sec.desc,
                          ctaPrimaryText: 'Learn More',
                          ctaSecondaryText: '',
                          showMetrics: false
                        },
                        styles: {
                          accentColor: '#3b82f6',
                          bgColor: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: '16px',
                          borderWidth: '1px',
                          boxShadow: 'none',
                          animation: 'fadeIn',
                          responsive: {
                            desktop: { fontSize: '24px', paddingY: '36px', gap: '20px' },
                            tablet: { fontSize: '20px', paddingY: '28px', gap: '16px' },
                            mobile: { fontSize: '18px', paddingY: '20px', gap: '12px' }
                          }
                        }
                      };
                      setElements(prev => [...prev, newEl]);
                      setSelectedId(newEl.id);
                    }}
                    className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{sec.name}</h4>
                      <Plus className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400" />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{sec.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* COMPONENTS TAB */}
            {leftNavTab === 'components' && (
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  UI BUILDING BLOCKS
                </p>
                {[
                  { name: 'Display Heading', icon: Type },
                  { name: 'Rich Text Paragraph', icon: Box },
                  { name: 'Call-to-Action Button', icon: Sparkles },
                  { name: 'Metric Stat Pill', icon: Layout },
                  { name: 'Media / Video Embed', icon: ImageIcon }
                ].map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 flex items-center justify-between cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-white">{b.name}</span>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                  );
                })}
              </div>
            )}

            {/* LAYERS TREE TAB */}
            {leftNavTab === 'layers' && (
              <div className="space-y-2 font-mono text-xs">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">CANVAS COMPONENT TREE</p>
                {elements.map((el) => {
                  const isSelected = selectedId === el.id;
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 font-bold' 
                          : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <Layers className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                        <span className="truncate">{el.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={e => toggleVisible(el.id, e)}
                          className="p-1 hover:text-white text-gray-400"
                          title={el.visible ? 'Hide section' : 'Show section'}
                        >
                          <Eye className={`w-3 h-3 ${el.visible ? 'text-emerald-400' : 'text-gray-600'}`} />
                        </button>

                        <button
                          onClick={e => toggleLock(el.id, e)}
                          className="p-1 hover:text-white text-gray-400"
                          title={el.locked ? 'Unlock' : 'Lock'}
                        >
                          {el.locked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-gray-600" />}
                        </button>

                        <button
                          onClick={e => duplicateElement(el.id, e)}
                          className="p-1 hover:text-white text-gray-400"
                          title="Duplicate element"
                        >
                          <Copy className="w-3 h-3" />
                        </button>

                        <button
                          onClick={e => deleteElement(el.id, e)}
                          className="p-1 hover:text-red-400 text-gray-400"
                          title="Delete element"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* CENTER LIVE WEBSITE CANVAS */}
        <div className="flex-1 bg-[#05070c] p-4 sm:p-6 flex flex-col items-center justify-start overflow-auto">
          {/* Viewport Frame */}
          <div
            className="transition-all duration-300 shadow-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c1017] flex flex-col my-auto"
            style={{
              width: dims.width,
              height: dims.height,
              maxHeight: '94%',
              transform: `scale(${zoomScale / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Device Header Bar */}
            <div className="h-8 bg-[#111622] px-4 flex items-center justify-between border-b border-white/5 text-[10px] font-mono text-gray-400 shrink-0 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{dims.label}</span>
              </div>
              <span className="text-gray-500">LIVE RESPONSIVE PREVIEW</span>
            </div>

            {/* Split Comparison Mode OR Single Canvas */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 select-text no-scrollbar">
              {compareSplit ? (
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-white/5 space-y-4">
                    <span className="text-xs font-mono text-amber-400 uppercase font-bold">DRAFT STATE</span>
                    {elements.filter(e => e.visible).map(el => (
                      <div key={el.id} className="p-4 rounded-xl border border-white/10 space-y-2">
                        <h4 className="font-bold text-sm text-white">{el.content.headline}</h4>
                        <p className="text-xs text-gray-400">{el.content.subhead}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-white/5 space-y-4">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">LIVE PRODUCTION</span>
                    {elements.filter(e => e.visible).map(el => (
                      <div key={el.id} className="p-4 rounded-xl border border-white/5 space-y-2 opacity-85">
                        <h4 className="font-bold text-sm text-white">{el.content.headline}</h4>
                        <p className="text-xs text-gray-400">{el.content.subhead}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                elements.filter(e => e.visible).map((el) => {
                  const isSelected = selectedId === el.id;
                  const responsiveStyle = el.styles.responsive[device];

                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`p-6 sm:p-8 transition-all cursor-pointer relative ${
                        isSelected 
                          ? 'ring-2 ring-blue-500 border-blue-500 shadow-xl' 
                          : showOutlines 
                          ? 'border border-dashed border-white/15 hover:border-white/30' 
                          : 'border border-transparent'
                      }`}
                      style={{
                        backgroundColor: el.styles.bgColor,
                        borderRadius: el.styles.borderRadius,
                        paddingTop: responsiveStyle.paddingY,
                        paddingBottom: responsiveStyle.paddingY,
                        boxShadow: el.styles.boxShadow
                      }}
                    >
                      {/* Active Tag */}
                      {isSelected && (
                        <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-blue-600 text-white font-mono text-[10px] font-bold rounded-md uppercase">
                          Editing: {el.name} ({device.toUpperCase()})
                        </div>
                      )}

                      {/* Element Content Render */}
                      <div className="space-y-4">
                        {el.content.eyebrow && (
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: el.styles.accentColor }} />
                            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                              {el.content.eyebrow}
                            </span>
                          </div>
                        )}

                        <h2 
                          className="font-black text-white leading-tight tracking-tight"
                          style={{ fontSize: responsiveStyle.fontSize }}
                        >
                          {el.content.headline}
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                          {el.content.subhead}
                        </p>

                        {/* CTA Buttons */}
                        {(el.content.ctaPrimaryText || el.content.ctaSecondaryText) && (
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            {el.content.ctaPrimaryText && (
                              <button
                                className="px-5 py-2.5 text-white font-bold text-xs shadow-lg"
                                style={{ backgroundColor: el.styles.accentColor, borderRadius: el.styles.borderRadius }}
                              >
                                {el.content.ctaPrimaryText}
                              </button>
                            )}
                            {el.content.ctaSecondaryText && (
                              <button
                                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs"
                                style={{ borderRadius: el.styles.borderRadius }}
                              >
                                {el.content.ctaSecondaryText}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Key Metrics Grid */}
                        {el.content.showMetrics && (
                          <div className="grid grid-cols-3 gap-4 pt-6 mt-4 border-t border-white/5 font-mono">
                            <div>
                              <p className="text-xl font-bold text-white">40+</p>
                              <p className="text-[10px] text-gray-400">Shipped</p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-emerald-400">$2.4M</p>
                              <p className="text-[10px] text-gray-400">Revenue</p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-blue-400">100%</p>
                              <p className="text-[10px] text-gray-400">Uptime</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* BOTTOM CANVAS CONTROLS */}
          <div className="h-10 bg-[#0a0e17]/90 backdrop-blur-md border border-white/10 rounded-full px-4 flex items-center gap-4 mt-4 text-xs select-none">
            <span className="font-mono text-gray-400 text-[11px]">{dims.label}</span>
            <div className="h-3 w-[1px] bg-white/10" />
            <div className="flex items-center gap-1.5">
              <button onClick={() => setZoomScale(Math.max(50, zoomScale - 15))} className="p-1 text-gray-400 hover:text-white"><ZoomOut className="w-3.5 h-3.5" /></button>
              <span className="font-mono text-[11px] text-white w-10 text-center">{zoomScale}%</span>
              <button onClick={() => setZoomScale(Math.min(150, zoomScale + 15))} className="p-1 text-gray-400 hover:text-white"><ZoomIn className="w-3.5 h-3.5" /></button>
              <button onClick={() => setZoomScale(100)} className="text-[10px] font-mono text-blue-400 px-1.5 py-0.5 rounded hover:bg-white/5">Reset</button>
            </div>
            <div className="h-3 w-[1px] bg-white/10" />
            <button
              onClick={() => setShowOutlines(!showOutlines)}
              className={`text-[11px] font-mono ${showOutlines ? 'text-blue-400' : 'text-gray-500'}`}
            >
              Outlines: {showOutlines ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: INSPECTOR WITH CATEGORIES */}
        <div className="w-80 bg-[#0a0e17] border-l border-white/5 flex flex-col shrink-0">
          {/* Inspector Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Inspector</h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 text-[10px] font-mono uppercase font-bold">
              {device}
            </span>
          </div>

          {/* Inspector Tabs */}
          <div className="flex border-b border-white/5 text-[10px] font-mono overflow-x-auto no-scrollbar">
            {(['content', 'typography', 'spacing', 'colors', 'borders'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setInspectorTab(tab)}
                className={`py-2 px-3 capitalize transition-colors ${
                  inspectorTab === tab ? 'text-blue-400 border-b-2 border-blue-500 font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Inspector Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
            {/* CONTENT TAB */}
            {inspectorTab === 'content' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-400 font-mono block mb-1">Eyebrow Headline</label>
                  <input
                    type="text"
                    value={activeElement.content.eyebrow}
                    onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, eyebrow: e.target.value } }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-mono block mb-1">Display Headline</label>
                  <textarea
                    rows={3}
                    value={activeElement.content.headline}
                    onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, headline: e.target.value } }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-mono block mb-1">Subhead Description</label>
                  <textarea
                    rows={4}
                    value={activeElement.content.subhead}
                    onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, subhead: e.target.value } }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-400 font-mono block mb-1">Primary CTA</label>
                    <input
                      type="text"
                      value={activeElement.content.ctaPrimaryText}
                      onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, ctaPrimaryText: e.target.value } }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 font-mono block mb-1">Secondary CTA</label>
                    <input
                      type="text"
                      value={activeElement.content.ctaSecondaryText}
                      onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, ctaSecondaryText: e.target.value } }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="font-medium text-white">Show Metrics Grid</span>
                  <input
                    type="checkbox"
                    checked={activeElement.content.showMetrics}
                    onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, showMetrics: e.target.checked } }))}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </div>
              </div>
            )}

            {/* TYPOGRAPHY TAB (INDEPENDENT RESPONSIVE OVERRIDES) */}
            {inspectorTab === 'typography' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-300 font-mono text-[11px]">
                  Setting overrides for active viewport: <strong className="uppercase">{device}</strong>
                </div>

                <div>
                  <label className="text-gray-400 font-mono block mb-1">Font Size ({device})</label>
                  <select
                    value={activeElement.styles.responsive[device].fontSize}
                    onChange={e => updateActiveElement(el => ({
                      ...el,
                      styles: {
                        ...el.styles,
                        responsive: {
                          ...el.styles.responsive,
                          [device]: { ...el.styles.responsive[device], fontSize: e.target.value }
                        }
                      }
                    }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="18px">18px (Compact)</option>
                    <option value="22px">22px (Medium)</option>
                    <option value="28px">28px (Large)</option>
                    <option value="36px">36px (Hero Display)</option>
                    <option value="48px">48px (Massive Headline)</option>
                  </select>
                </div>
              </div>
            )}

            {/* SPACING TAB */}
            {inspectorTab === 'spacing' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-300 font-mono text-[11px]">
                  Padding overrides for active viewport: <strong className="uppercase">{device}</strong>
                </div>

                <div>
                  <label className="text-gray-400 font-mono block mb-1">Vertical Padding Y</label>
                  <select
                    value={activeElement.styles.responsive[device].paddingY}
                    onChange={e => updateActiveElement(el => ({
                      ...el,
                      styles: {
                        ...el.styles,
                        responsive: {
                          ...el.styles.responsive,
                          [device]: { ...el.styles.responsive[device], paddingY: e.target.value }
                        }
                      }
                    }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="16px">16px (Dense)</option>
                    <option value="24px">24px (Mobile Default)</option>
                    <option value="36px">36px (Tablet Default)</option>
                    <option value="48px">48px (Desktop Default)</option>
                    <option value="64px">64px (Generous)</option>
                  </select>
                </div>
              </div>
            )}

            {/* COLORS TAB */}
            {inspectorTab === 'colors' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-400 font-mono block mb-1">Accent Token</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={activeElement.styles.accentColor}
                      onChange={e => updateActiveElement(el => ({
                        ...el,
                        styles: { ...el.styles, accentColor: e.target.value }
                      }))}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={activeElement.styles.accentColor}
                      onChange={e => updateActiveElement(el => ({
                        ...el,
                        styles: { ...el.styles, accentColor: e.target.value }
                      }))}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 font-mono text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BORDERS & RADIUS TAB */}
            {inspectorTab === 'borders' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-400 font-mono block mb-1">Border Radius</label>
                  <select
                    value={activeElement.styles.borderRadius}
                    onChange={e => updateActiveElement(el => ({
                      ...el,
                      styles: { ...el.styles, borderRadius: e.target.value }
                    }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="0px">None (0px)</option>
                    <option value="8px">Subtle (8px)</option>
                    <option value="16px">Default (16px)</option>
                    <option value="24px">Organic (24px)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
