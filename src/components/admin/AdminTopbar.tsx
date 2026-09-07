import React, { useState, useEffect } from 'react';
import { 
  Search, Command, Bell, ExternalLink, Globe, CheckCircle2, 
  HelpCircle, RefreshCw, Send, ArrowUpRight
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { THEME_MANIFESTS } from '@/data/initialThemes';

interface AdminTopbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenCommandPalette: () => void;
  onOpenContentSearch: () => void;
  onOpenShortcuts: () => void;
  onOpenNotifications: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenCommandPalette,
  onOpenContentSearch,
  onOpenShortcuts,
  onOpenNotifications,
}) => {
  const [siteMode, setSiteMode] = useState<'draft' | 'live'>(mockStorage.getSiteMode());
  const [activeThemeId, setActiveThemeId] = useState(mockStorage.getActiveTheme());
  const [unreadCount, setUnreadCount] = useState(0);
  const [autosaveState, setAutosaveState] = useState<'Saved' | 'Saving...' | 'Error'>('Saved');

  useEffect(() => {
    const update = () => {
      setSiteMode(mockStorage.getSiteMode());
      setActiveThemeId(mockStorage.getActiveTheme());
      setUnreadCount(mockStorage.getNotifications().filter(n => !n.read).length);
    };
    update();
    return mockStorage.subscribe(update);
  }, []);

  const activeManifest = THEME_MANIFESTS.find(m => m.id === activeThemeId) || THEME_MANIFESTS[0];

  const handlePublishLive = () => {
    setAutosaveState('Saving...');
    setTimeout(() => {
      mockStorage.publishAllToLive();
      setAutosaveState('Saved');
    }, 450);
  };

  const getBreadcrumbs = () => {
    const parts = currentRoute.replace('/admin', '').split('/').filter(Boolean);
    if (parts.length === 0) return 'Dashboard';
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ');
  };

  return (
    <header className="h-16 bg-[#0a0e17]/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left: Breadcrumbs & Autosave */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 font-mono">ADMIN /</span>
          <span className="font-semibold text-white">{getBreadcrumbs()}</span>
        </div>

        {/* Autosave Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono text-gray-400">
          <span className={`w-1.5 h-1.5 rounded-full ${autosaveState === 'Saved' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
          <span>{autosaveState}</span>
        </div>
      </div>

      {/* Center: Search Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick actions & jump...</span>
          <kbd className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-gray-300">⌘K</kbd>
        </button>

        <button
          onClick={onOpenContentSearch}
          title="Full-text content search"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Active Theme Badge */}
        <button
          onClick={() => onNavigate('/admin/themes')}
          title="Current active theme"
          className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-300 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="font-mono text-[11px] text-gray-400 truncate max-w-[130px]">{activeManifest.name}</span>
        </button>

        {/* Draft / Live Lifecycle Indicator */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5 text-xs">
          <span className={`px-2 py-0.5 rounded-lg text-[11px] font-mono uppercase font-bold ${
            siteMode === 'live' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {siteMode}
          </span>
          {siteMode === 'draft' && (
            <button
              onClick={handlePublishLive}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Publish Live
            </button>
          )}
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          )}
        </button>

        {/* Shortcuts Help */}
        <button
          onClick={onOpenShortcuts}
          title="Keyboard shortcuts (?)"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Public Preview Button */}
        <button
          onClick={() => onNavigate('/')}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">View Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
};
