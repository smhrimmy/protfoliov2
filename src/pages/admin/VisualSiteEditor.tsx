import React, { useState, useEffect } from 'react';
import { 
  Undo, Redo, Save, Eye, EyeOff, Smartphone, Tablet, Monitor, 
  Layers, Sliders, CheckCircle2, ChevronDown, ChevronRight, 
  Palette, Plus, Trash2, ArrowUpRight, SplitSquareVertical,
  Lock, Unlock, Copy, History, Sparkles, MoveUp, MoveDown,
  Box, Type, Image as ImageIcon, Layout, ZoomIn, ZoomOut,
  Maximize2, RefreshCw, Check, CheckCheck, X, ArrowLeft,
  MousePointerClick
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
  const [leftNavTab, setLeftNavTab] = useState<'sections' | 'components' | 'layers'>('sections');
  const [inspectorTab, setInspectorTab] = useState<'content' | 'typography' | 'spacing' | 'colors' | 'borders'>('content');
  const [compareSplit, setCompareSplit] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [savedStatus, setSavedStatus] = useState<'Saved' | 'Saving...' | 'Unsaved'>('Saved');
  const [showOutlines, setShowOutlines] = useState(true);
  
  // Mobile responsive views
  const [mobileTab, setMobileTab] = useState<'canvas' | 'sections' | 'inspector'>('canvas');
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Undo / Redo Stacks
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);

  const manifest = THEME_MANIFESTS.find(m => m.id === activeThemeId) || THEME_MANIFESTS[0];

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileScreen(isMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

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
        accentColor: '#ad314d',
        bgColor: 'rgba(255, 255, 255, 0.03)',
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
        accentColor: '#ad314d',
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
  const activeElement = elements.find(e => e.id === selectedId) || elements[0] || {
    id: 'empty',
    name: 'No Selection',
    type: 'custom',
    locked: false,
    visible: true,
    content: { eyebrow: '', headline: '', subhead: '', ctaPrimaryText: '', ctaSecondaryText: '', showMetrics: false },
    styles: {
      accentColor: '#ad314d',
      bgColor: 'transparent',
      borderRadius: '16px',
      borderWidth: '1px',
      boxShadow: 'none',
      animation: 'none',
      responsive: {
        desktop: { fontSize: '24px', paddingY: '32px', gap: '20px' },
        tablet: { fontSize: '20px', paddingY: '24px', gap: '16px' },
        mobile: { fontSize: '18px', paddingY: '20px', gap: '12px' }
      }
    }
  };

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
      triggerToast('All changes saved successfully');
    }, 350);
  };

  const handlePublishLive = () => {
    setSavedStatus('Saving...');
    setTimeout(() => {
      mockStorage.publishAllToLive();
      setSavedStatus('Saved');
      triggerToast('🚀 Site published live to production!');
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

  const moveElement = (id: string, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const index = elements.findIndex(el => el.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === elements.length - 1) return;

    const newElements = [...elements];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newElements[index];
    newElements[index] = newElements[targetIndex];
    newElements[targetIndex] = temp;

    setUndoStack(prev => [...prev, elements]);
    setRedoStack([]);
    setElements(newElements);
    setSavedStatus('Unsaved');
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
    triggerToast(`Duplicated ${source.name}`);
  };

  const deleteElement = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (elements.length <= 1) {
      triggerToast('Cannot delete the last remaining section');
      return;
    }
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) {
      const remaining = elements.filter(el => el.id !== id);
      setSelectedId(remaining[0]?.id || '');
    }
    triggerToast('Section removed');
  };

  // Device resolution specifications
  const getDeviceDimensions = () => {
    if (isMobileScreen) {
      return { width: '100%', height: 'auto', label: 'Phone Viewport' };
    }
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
  const effectiveDevice = isMobileScreen ? 'mobile' : device;

  return (
    <div className="flex flex-col h-full bg-[#ececeb] text-[#1a1a1a] font-sans select-none overflow-hidden relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP CONTROL BAR */}
      <header className="h-14 bg-white/90 backdrop-blur-md border-b border-black/8 px-3 sm:px-4 flex items-center justify-between shrink-0 z-30">
        {/* Left: Undo, Redo, Theme Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 bg-black/5 p-1 rounded-xl">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              title="Undo (Ctrl+Z)"
              className={`p-1.5 rounded-lg transition-colors ${
                undoStack.length > 0 ? 'text-gray-800 hover:bg-black/5' : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              title="Redo (Ctrl+Y)"
              className={`p-1.5 rounded-lg transition-colors ${
                redoStack.length > 0 ? 'text-gray-800 hover:bg-black/5' : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-xs font-mono text-gray-300 hidden sm:inline">|</span>

          <div className="hidden sm:flex items-center gap-2 text-xs bg-black/5 px-2.5 py-1 rounded-xl">
            <span className="text-gray-500 font-mono text-[10px]">THEME:</span>
            <span className="font-semibold text-[#ad314d] truncate max-w-[140px]">{manifest.name}</span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher & Zoom (Desktop only, hidden on mobile screens) */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-black/5 p-1 rounded-xl border border-black/5">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${device === 'desktop' ? 'bg-[#ad314d] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
              title="Desktop 1440px"
              data-testid="editor-viewport-desktop"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded-lg transition-colors ${device === 'tablet' ? 'bg-[#ad314d] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
              title="Tablet 768px"
              data-testid="editor-viewport-tablet"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${device === 'mobile' ? 'bg-[#ad314d] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
              title="Mobile 375px"
              data-testid="editor-viewport-mobile"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center bg-black/5 px-2.5 py-1 rounded-xl text-xs font-mono text-gray-600">
            <span>{zoomScale}%</span>
          </div>
        </div>

        {/* Right: Compare, Save, Publish Live */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setCompareSplit(!compareSplit)}
            className={`hidden md:flex px-3 py-1.5 rounded-xl text-xs font-semibold items-center gap-1.5 border transition-colors ${
              compareSplit ? 'bg-purple-600 border-purple-500 text-white' : 'bg-black/5 border-black/5 text-gray-700 hover:bg-black/10'
            }`}
            title="Split comparison: Draft vs Live"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Compare</span>
          </button>

          <button
            onClick={handleSave}
            className="px-2.5 sm:px-3.5 py-1.5 bg-black/5 hover:bg-black/10 text-gray-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-black/5"
            title="Save changes"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{savedStatus}</span>
          </button>

          <button
            onClick={handlePublishLive}
            className="px-3 sm:px-4 py-1.5 bg-[#ad314d] hover:bg-[#8f283f] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            data-testid="editor-publish-btn"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Publish<span className="hidden sm:inline"> Live</span></span>
          </button>
        </div>
      </header>

      {/* MOBILE SEGMENTED PILL SWITCHER (Visible on mobile/tablet < 1024px) */}
      <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-black/8 px-3 py-2 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-1 p-1 bg-black/5 rounded-xl w-full max-w-md mx-auto">
          <button
            onClick={() => setMobileTab('canvas')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'canvas' 
                ? 'bg-white text-gray-900 shadow-xs font-bold' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#ad314d]" />
            <span>Canvas</span>
          </button>
          <button
            onClick={() => setMobileTab('sections')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'sections' 
                ? 'bg-white text-gray-900 shadow-xs font-bold' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Sections ({elements.length})</span>
          </button>
          <button
            onClick={() => setMobileTab('inspector')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'inspector' 
                ? 'bg-white text-gray-900 shadow-xs font-bold' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>Style & Edit</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE (Desktop 3-Column Studio OR Mobile Single Tab) */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* LEFT PANEL: PAGES, SECTIONS, COMPONENTS, LAYERS */}
        <div className={`
          ${mobileTab === 'sections' ? 'flex w-full' : 'hidden'} 
          lg:flex lg:w-72 bg-white border-r border-black/8 flex-col shrink-0 h-full overflow-hidden
        `}>
          {/* Mobile subheader */}
          <div className="lg:hidden p-3 bg-gray-50 border-b border-black/8 flex items-center justify-between shrink-0">
            <button
              onClick={() => setMobileTab('canvas')}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 px-2.5 py-1.5 bg-white rounded-xl border border-black/5 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Canvas</span>
            </button>
            <span className="text-xs font-bold text-gray-900">
              Manage Sections
            </span>
          </div>

          {/* Tabs header */}
          <div className="flex border-b border-black/8 text-[11px] font-mono bg-gray-50/50 shrink-0">
            <button
              onClick={() => setLeftNavTab('sections')}
              className={`flex-1 py-2.5 px-2 text-center transition-colors ${
                leftNavTab === 'sections' 
                  ? 'text-[#ad314d] border-b-2 border-[#ad314d] font-bold bg-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setLeftNavTab('components')}
              className={`flex-1 py-2.5 px-2 text-center transition-colors ${
                leftNavTab === 'components' 
                  ? 'text-[#ad314d] border-b-2 border-[#ad314d] font-bold bg-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Blocks
            </button>
            <button
              onClick={() => setLeftNavTab('layers')}
              className={`flex-1 py-2.5 px-2 text-center transition-colors ${
                leftNavTab === 'layers' 
                  ? 'text-[#ad314d] border-b-2 border-[#ad314d] font-bold bg-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Layers ({elements.length})
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* SECTIONS TAB */}
            {leftNavTab === 'sections' && (
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                  PRESET PORTFOLIO SECTIONS
                </p>

                {[
                  { name: `${manifest.name} Hero Block`, desc: manifest.concept, type: 'hero' },
                  { name: 'Featured Case Studies Rail', desc: 'Horizontal project slider with metrics', type: 'projects' },
                  { name: 'Skills & Competencies Radar', desc: 'Interactive mastery categories', type: 'skills' },
                  { name: 'Career Experience Timeline', desc: 'Chronological roles and achievements', type: 'custom' },
                  { name: 'Direct Inquiries CTA Station', desc: 'Dispatch form with instant mailto', type: 'contact' }
                ].map((sec, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      const newEl: CanvasElement = {
                        id: `el-${Date.now()}`,
                        name: sec.name,
                        type: sec.type as any,
                        locked: false,
                        visible: true,
                        content: {
                          eyebrow: 'NEW SECTION',
                          headline: sec.name,
                          subhead: sec.desc,
                          ctaPrimaryText: 'Learn More',
                          ctaSecondaryText: '',
                          showMetrics: false
                        },
                        styles: {
                          accentColor: '#ad314d',
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
                      setUndoStack(prev => [...prev, elements]);
                      setElements(prev => [...prev, newEl]);
                      setSelectedId(newEl.id);
                      setSavedStatus('Unsaved');
                      triggerToast(`Added ${sec.name}`);
                      setMobileTab('canvas');
                    }}
                    className="p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100/80 border border-black/5 hover:border-[#ad314d]/30 cursor-pointer transition-all group active:scale-[0.99]"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#ad314d] transition-colors">{sec.name}</h4>
                      <div className="p-1 rounded-lg bg-white border border-black/5 group-hover:bg-[#ad314d] group-hover:text-white transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{sec.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* COMPONENTS TAB */}
            {leftNavTab === 'components' && (
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
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
                      onClick={() => {
                        triggerToast(`Added ${b.name} block`);
                      }}
                      className="p-3 rounded-xl bg-gray-50 border border-black/5 hover:border-black/15 flex items-center justify-between cursor-pointer text-xs group active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#ad314d]" />
                        <span className="font-semibold text-gray-800">{b.name}</span>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700" />
                    </div>
                  );
                })}
              </div>
            )}

            {/* LAYERS TREE TAB */}
            {leftNavTab === 'layers' && (
              <div className="space-y-2 text-xs">
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2">CANVAS COMPONENT TREE</p>
                {elements.map((el, index) => {
                  const isSelected = selectedId === el.id;
                  return (
                    <div
                      key={el.id}
                      onClick={() => {
                        setSelectedId(el.id);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#ad314d]/10 text-gray-900 border-[#ad314d]/40 font-bold shadow-xs' 
                          : 'bg-gray-50 border-black/5 text-gray-700 hover:bg-gray-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <Layers className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#ad314d]' : 'text-gray-400'}`} />
                        <span className="truncate">{el.name}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {/* Move Up/Down */}
                        <button
                          onClick={e => moveElement(el.id, 'up', e)}
                          disabled={index === 0}
                          className={`p-1 rounded hover:bg-black/5 ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'text-gray-600'}`}
                          title="Move up"
                        >
                          <MoveUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={e => moveElement(el.id, 'down', e)}
                          disabled={index === elements.length - 1}
                          className={`p-1 rounded hover:bg-black/5 ${index === elements.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-gray-600'}`}
                          title="Move down"
                        >
                          <MoveDown className="w-3 h-3" />
                        </button>

                        <button
                          onClick={e => toggleVisible(el.id, e)}
                          className="p-1 rounded hover:bg-black/5 text-gray-600"
                          title={el.visible ? 'Hide section' : 'Show section'}
                        >
                          {el.visible ? (
                            <Eye className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-gray-400" />
                          )}
                        </button>

                        <button
                          onClick={e => duplicateElement(el.id, e)}
                          className="p-1 rounded hover:bg-black/5 text-gray-600"
                          title="Duplicate"
                        >
                          <Copy className="w-3 h-3" />
                        </button>

                        <button
                          onClick={e => deleteElement(el.id, e)}
                          className="p-1 rounded hover:bg-red-50 text-gray-600 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        {/* Mobile quick jump to edit */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(el.id);
                            setMobileTab('inspector');
                          }}
                          className="ml-1 px-2.5 py-1 bg-white border border-black/10 rounded-lg text-[10px] font-semibold text-[#ad314d] active:scale-95 shadow-xs"
                          title="Edit in inspector"
                        >
                          Edit
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
        <div className={`
          ${mobileTab === 'canvas' ? 'flex w-full' : 'hidden'} 
          lg:flex flex-1 bg-[#ececeb] p-3 sm:p-6 flex-col items-center justify-start overflow-y-auto overflow-x-hidden relative h-full
        `}>
          {/* Viewport Frame */}
          <div
            className={`transition-all duration-300 shadow-xl overflow-hidden rounded-2xl border border-black/10 bg-[#0c1017] preview-canvas-surface text-white flex flex-col ${
              isMobileScreen ? 'w-full mb-24' : 'my-auto'
            }`}
            style={isMobileScreen ? {
              width: '100%',
              minHeight: 'auto',
              backgroundColor: '#0c1017',
              color: '#ffffff'
            } : {
              width: dims.width,
              height: dims.height,
              maxHeight: '94%',
              transform: `scale(${zoomScale / 100})`,
              transformOrigin: 'top center',
              backgroundColor: '#0c1017',
              color: '#ffffff'
            }}
          >
            {/* Device Header Bar */}
            <div className="h-8 bg-[#111622] px-4 flex items-center justify-between border-b border-white/5 text-[10px] font-mono text-gray-400 shrink-0 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-300">{dims.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 hidden sm:inline">Tap any section to edit</span>
                <button
                  onClick={() => setShowOutlines(!showOutlines)}
                  className="text-[10px] text-gray-400 hover:text-white"
                >
                  Outlines: {showOutlines ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Split Comparison Mode OR Single Canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 select-text">
              {compareSplit ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-white/5 space-y-4">
                    <span className="text-xs font-mono text-amber-400 uppercase font-bold">DRAFT STATE</span>
                    {elements.filter(e => e.visible).map(el => (
                      <div key={el.id} className="p-4 rounded-xl border border-white/10 space-y-2">
                        <h4 className="font-bold text-sm text-white" style={{ color: '#ffffff' }}>{el.content.headline}</h4>
                        <p className="text-xs text-gray-300" style={{ color: '#d1d5db' }}>{el.content.subhead}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-white/5 space-y-4">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">LIVE PRODUCTION</span>
                    {elements.filter(e => e.visible).map(el => (
                      <div key={el.id} className="p-4 rounded-xl border border-white/10 space-y-2 opacity-85">
                        <h4 className="font-bold text-sm text-white" style={{ color: '#ffffff' }}>{el.content.headline}</h4>
                        <p className="text-xs text-gray-300" style={{ color: '#d1d5db' }}>{el.content.subhead}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                elements.filter(e => e.visible).map((el) => {
                  const isSelected = selectedId === el.id;
                  const responsiveStyle = el.styles.responsive[effectiveDevice] || el.styles.responsive.desktop;

                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`p-5 sm:p-8 transition-all cursor-pointer relative rounded-2xl ${
                        isSelected 
                          ? 'ring-2 ring-[#ad314d] border-[#ad314d] shadow-2xl bg-white/[0.04]' 
                          : showOutlines 
                          ? 'border border-dashed border-white/15 hover:border-white/35 hover:bg-white/[0.02]' 
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
                        <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[#ad314d] text-white font-mono text-[10px] font-bold rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <Check className="w-3 h-3 text-white" />
                          <span style={{ color: '#ffffff' }}>Editing: {el.name}</span>
                        </div>
                      )}

                      {/* Element Content Render */}
                      <div className="space-y-4">
                        {el.content.eyebrow && (
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: el.styles.accentColor }} />
                            <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: '#9ca3af' }}>
                              {el.content.eyebrow}
                            </span>
                          </div>
                        )}

                        <h2 
                          className="font-black canvas-text-heading leading-tight tracking-tight"
                          style={{ fontSize: responsiveStyle.fontSize, color: '#ffffff' }}
                        >
                          {el.content.headline}
                        </h2>

                        <p className="text-xs sm:text-sm canvas-text-body leading-relaxed max-w-2xl" style={{ color: '#d1d5db' }}>
                          {el.content.subhead}
                        </p>

                        {/* CTA Buttons */}
                        {(el.content.ctaPrimaryText || el.content.ctaSecondaryText) && (
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            {el.content.ctaPrimaryText && (
                              <button
                                className="px-5 py-2.5 text-white font-bold text-xs shadow-lg active:scale-95 transition-transform"
                                style={{ backgroundColor: el.styles.accentColor, borderRadius: el.styles.borderRadius, color: '#ffffff' }}
                              >
                                {el.content.ctaPrimaryText}
                              </button>
                            )}
                            {el.content.ctaSecondaryText && (
                              <button
                                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs active:scale-95 transition-transform border border-white/10"
                                style={{ borderRadius: el.styles.borderRadius, color: '#ffffff' }}
                              >
                                {el.content.ctaSecondaryText}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Key Metrics Grid */}
                        {el.content.showMetrics && (
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 mt-4 border-t border-white/5 font-mono">
                            <div>
                              <p className="text-lg sm:text-xl font-bold" style={{ color: '#ffffff' }}>40+</p>
                              <p className="text-[10px]" style={{ color: '#9ca3af' }}>Shipped</p>
                            </div>
                            <div>
                              <p className="text-lg sm:text-xl font-bold text-emerald-400" style={{ color: '#34d399' }}>$2.4M</p>
                              <p className="text-[10px]" style={{ color: '#9ca3af' }}>Revenue</p>
                            </div>
                            <div>
                              <p className="text-lg sm:text-xl font-bold text-blue-400" style={{ color: '#60a5fa' }}>100%</p>
                              <p className="text-[10px]" style={{ color: '#9ca3af' }}>Uptime</p>
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

          {/* FLOATING ACTION DRAWER ON MOBILE (Tapping section on canvas triggers this) */}
          {isMobileScreen && selectedId && (
            <div className="fixed bottom-24 left-3 right-3 z-40 bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl p-3 shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom duration-200">
              <div className="truncate pr-2">
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Selected Section</div>
                <div className="text-xs font-bold text-gray-900 truncate">{activeElement.name}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setMobileTab('inspector')}
                  className="px-3.5 py-2 bg-[#ad314d] hover:bg-[#8f283f] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={(e) => toggleVisible(selectedId, e)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                  title="Toggle visibility"
                >
                  {activeElement.visible ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
                </button>
                <button
                  onClick={() => setSelectedId('')}
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl transition-colors"
                  title="Deselect"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* DESKTOP BOTTOM CANVAS CONTROLS */}
          <div className="hidden md:flex h-10 bg-white/90 backdrop-blur-md border border-black/8 rounded-full px-4 items-center gap-4 mt-4 text-xs select-none shadow-xs">
            <span className="font-mono text-gray-500 text-[11px]">{dims.label}</span>
            <div className="h-3 w-[1px] bg-black/10" />
            <div className="flex items-center gap-1.5">
              <button onClick={() => setZoomScale(Math.max(50, zoomScale - 15))} className="p-1 text-gray-600 hover:text-gray-900"><ZoomOut className="w-3.5 h-3.5" /></button>
              <span className="font-mono text-[11px] text-gray-800 w-10 text-center">{zoomScale}%</span>
              <button onClick={() => setZoomScale(Math.min(150, zoomScale + 15))} className="p-1 text-gray-600 hover:text-gray-900"><ZoomIn className="w-3.5 h-3.5" /></button>
              <button onClick={() => setZoomScale(100)} className="text-[10px] font-mono text-[#ad314d] px-1.5 py-0.5 rounded hover:bg-black/5">Reset</button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: INSPECTOR WITH CATEGORIES */}
        <div className={`
          ${mobileTab === 'inspector' ? 'flex w-full' : 'hidden'} 
          lg:flex lg:w-80 bg-white border-l border-black/8 flex-col shrink-0 h-full overflow-hidden
        `}>
          {/* Mobile subheader */}
          <div className="lg:hidden p-3 bg-gray-50 border-b border-black/8 flex items-center justify-between shrink-0">
            <button
              onClick={() => setMobileTab('canvas')}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 px-2.5 py-1.5 bg-white rounded-xl border border-black/5 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Canvas</span>
            </button>
            <div className="text-right truncate max-w-[160px]">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Section</div>
              <div className="text-xs font-bold text-gray-900 truncate">{activeElement.name}</div>
            </div>
          </div>

          {/* Inspector Header (Desktop & Mobile) */}
          <div className="p-3.5 border-b border-black/8 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#ad314d]" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Inspector</h3>
            </div>
            {/* Quick section changer in inspector */}
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              className="text-xs bg-gray-50 border border-black/10 rounded-lg px-2 py-1 text-gray-800 font-medium max-w-[140px] truncate"
            >
              {elements.map(el => (
                <option key={el.id} value={el.id}>{el.name}</option>
              ))}
            </select>
          </div>

          {/* Inspector Tabs */}
          <div className="flex border-b border-black/8 text-[11px] font-mono bg-gray-50/50 overflow-x-auto shrink-0 no-scrollbar">
            {(['content', 'typography', 'spacing', 'colors', 'borders'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setInspectorTab(tab)}
                className={`py-2 px-3 capitalize whitespace-nowrap transition-colors ${
                  inspectorTab === tab 
                    ? 'text-[#ad314d] border-b-2 border-[#ad314d] font-bold bg-white' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Inspector Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* CONTENT TAB */}
            {inspectorTab === 'content' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-600 font-semibold block mb-1">Eyebrow Headline</label>
                  <input
                    type="text"
                    value={activeElement.content.eyebrow}
                    onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, eyebrow: e.target.value } }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-[#ad314d] focus:ring-2 focus:ring-[#ad314d]/20 transition-all outline-none"
                    placeholder="e.g. Systems Architect"
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold block mb-1">Display Headline</label>
                  <textarea
                    rows={3}
                    value={activeElement.content.headline}
                    onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, headline: e.target.value } }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:bg-white focus:border-[#ad314d] focus:ring-2 focus:ring-[#ad314d]/20 transition-all outline-none resize-none"
                    placeholder="Primary bold heading..."
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold block mb-1">Subhead Description</label>
                  <textarea
                    rows={3}
                    value={activeElement.content.subhead}
                    onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, subhead: e.target.value } }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:bg-white focus:border-[#ad314d] focus:ring-2 focus:ring-[#ad314d]/20 transition-all outline-none resize-none"
                    placeholder="Description paragraph..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-600 font-semibold block mb-1">Primary CTA Button</label>
                    <input
                      type="text"
                      value={activeElement.content.ctaPrimaryText}
                      onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, ctaPrimaryText: e.target.value } }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-[#ad314d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-semibold block mb-1">Secondary CTA Button</label>
                    <input
                      type="text"
                      value={activeElement.content.ctaSecondaryText}
                      onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, ctaSecondaryText: e.target.value } }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-[#ad314d] outline-none"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <span className="font-semibold text-gray-800">Show Metrics Grid</span>
                  <input
                    type="checkbox"
                    checked={activeElement.content.showMetrics}
                    onChange={e => updateActiveElement(el => ({ ...el, content: { ...el.content, showMetrics: e.target.checked } }))}
                    className="w-4 h-4 rounded text-[#ad314d] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TYPOGRAPHY TAB */}
            {inspectorTab === 'typography' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#ad314d]/10 border border-[#ad314d]/20 text-[#ad314d] font-mono text-[11px]">
                  Configuring typography for: <strong className="uppercase">{effectiveDevice}</strong>
                </div>

                <div>
                  <label className="text-gray-600 font-semibold block mb-1">Headline Font Size ({effectiveDevice})</label>
                  <select
                    value={activeElement.styles.responsive[effectiveDevice]?.fontSize || '24px'}
                    onChange={e => updateActiveElement(el => ({
                      ...el,
                      styles: {
                        ...el.styles,
                        responsive: {
                          ...el.styles.responsive,
                          [effectiveDevice]: { 
                            ...el.styles.responsive[effectiveDevice], 
                            fontSize: e.target.value 
                          }
                        }
                      }
                    }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:bg-white outline-none"
                  >
                    <option value="18px">18px (Compact Mobile)</option>
                    <option value="22px">22px (Standard Mobile)</option>
                    <option value="28px">28px (Prominent Tablet)</option>
                    <option value="36px">36px (Hero Display Desktop)</option>
                    <option value="48px">48px (Massive Headline)</option>
                  </select>
                </div>
              </div>
            )}

            {/* SPACING TAB */}
            {inspectorTab === 'spacing' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#ad314d]/10 border border-[#ad314d]/20 text-[#ad314d] font-mono text-[11px]">
                  Vertical padding for: <strong className="uppercase">{effectiveDevice}</strong>
                </div>

                <div>
                  <label className="text-gray-600 font-semibold block mb-1">Vertical Padding Y</label>
                  <select
                    value={activeElement.styles.responsive[effectiveDevice]?.paddingY || '24px'}
                    onChange={e => updateActiveElement(el => ({
                      ...el,
                      styles: {
                        ...el.styles,
                        responsive: {
                          ...el.styles.responsive,
                          [effectiveDevice]: { 
                            ...el.styles.responsive[effectiveDevice], 
                            paddingY: e.target.value 
                          }
                        }
                      }
                    }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:bg-white outline-none"
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
                  <label className="text-gray-600 font-semibold block mb-1">Accent Token</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={activeElement.styles.accentColor}
                      onChange={e => updateActiveElement(el => ({
                        ...el,
                        styles: { ...el.styles, accentColor: e.target.value }
                      }))}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-gray-200 p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={activeElement.styles.accentColor}
                      onChange={e => updateActiveElement(el => ({
                        ...el,
                        styles: { ...el.styles, accentColor: e.target.value }
                      }))}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-mono text-sm text-gray-900"
                    />
                  </div>
                </div>

                {/* Quick Color Swatches */}
                <div>
                  <label className="text-gray-500 text-[11px] font-mono block mb-1.5">PRESET ACCENTS</label>
                  <div className="flex items-center gap-2">
                    {['#ad314d', '#2563eb', '#10b981', '#7c3aed', '#ea580c', '#0d9488'].map(c => (
                      <button
                        key={c}
                        onClick={() => updateActiveElement(el => ({ ...el, styles: { ...el.styles, accentColor: c } }))}
                        className="w-7 h-7 rounded-lg border-2 transition-transform hover:scale-110 active:scale-95"
                        style={{ backgroundColor: c, borderColor: activeElement.styles.accentColor === c ? '#000' : 'transparent' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BORDERS TAB */}
            {inspectorTab === 'borders' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-600 font-semibold block mb-1">Border Corner Radius</label>
                  <select
                    value={activeElement.styles.borderRadius}
                    onChange={e => updateActiveElement(el => ({
                      ...el,
                      styles: { ...el.styles, borderRadius: e.target.value }
                    }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:bg-white outline-none"
                  >
                    <option value="0px">Sharp (0px)</option>
                    <option value="8px">Subtle (8px)</option>
                    <option value="16px">Standard (16px)</option>
                    <option value="24px">Pill / Organic (24px)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Bottom Action: "Done & View on Canvas" */}
          <div className="lg:hidden p-3 bg-white border-t border-black/8 shrink-0">
            <button
              onClick={() => setMobileTab('canvas')}
              className="w-full py-2.5 bg-[#ad314d] hover:bg-[#8f283f] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Done & View on Canvas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
