import React, { useState, useEffect } from 'react';
import { 
  Search, Command, Bell, ExternalLink, Globe, CheckCircle2, 
  HelpCircle, RefreshCw, Send, ArrowUpRight, ChevronRight
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
      setSiteMode('live');
      setAutosaveState('Saved');
    }, 450);
  };

  const getBreadcrumbs = () => {
    const parts = currentRoute.replace('/admin', '').split('/').filter(Boolean);
    if (parts.length === 0) return [{ label: 'Dashboard', path: '/admin/dashboard' }];
    return parts.map((p, idx) => {
      const subPath = '/admin/' + parts.slice(0, idx + 1).join('/');
      return {
        label: p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' '),
        path: subPath
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  const isDashboard = currentRoute === '/admin' || currentRoute === '/admin/dashboard';

  return (
    <header className={`h-16 ${isDashboard ? 'bg-[#ececeb]/90 border-b border-black/8 text-[#222222]' : 'bg-[#0a0e17]/80 border-b border-white/5 text-gray-100'} backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-30`}>
      {/* Left: Breadcrumbs & Autosave */}
      <div className="flex items-center gap-3 min-w-0">
        <nav className="flex items-center gap-1.5 text-xs truncate" aria-label="Breadcrumb">
          <button 
            onClick={() => onNavigate('/admin/dashboard')}
            className={`${isDashboard ? 'text-gray-600 hover:text-black' : 'text-gray-500 hover:text-white'} font-mono transition-colors`}
          >
            ADMIN
          </button>
          <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={b.path}>
              {idx > 0 && <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />}
              <button
                onClick={() => onNavigate(b.path)}
                className={`truncate transition-colors ${
                  idx === breadcrumbs.length - 1 
                    ? (isDashboard ? 'font-semibold text-black' : 'font-semibold text-white')
                    : (isDashboard ? 'text-gray-500 hover:text-black' : 'text-gray-400 hover:text-white')
                }`}
              >
                {b.label}
              </button>
            </React.Fragment>
          ))}
        </nav>

        {/* Autosave Status */}
        <div className={`hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${isDashboard ? 'bg-black/5 border border-black/10 text-gray-600' : 'bg-white/5 border border-white/5 text-gray-400'} text-[11px] font-mono shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${autosaveState === 'Saved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
          <span>{autosaveState}</span>
        </div>
      </div>

      {/* Center: Search Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCommandPalette}
          className={`hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl ${isDashboard ? 'bg-white/80 hover:bg-white border border-black/10 text-gray-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400'} text-xs transition-colors`}
          data-testid="admin-command-palette-trigger"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick actions & jump...</span>
          <kbd className={`text-[10px] font-mono ${isDashboard ? 'bg-black/10 text-gray-700' : 'bg-white/10 text-gray-300'} px-1.5 py-0.5 rounded`}>⌘K</kbd>
        </button>

        <button
          onClick={onOpenContentSearch}
          title="Full-text content search (/)"
          className={`p-2 rounded-xl ${isDashboard ? 'bg-white/80 hover:bg-white border border-black/10 text-gray-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'} transition-colors`}
          data-testid="admin-content-search-trigger"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Theme Badge */}
        <button
          onClick={() => onNavigate('/admin/themes')}
          title="Switch or customize active theme"
          data-testid="admin-active-theme-badge"
          className={`hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-xl ${isDashboard ? 'bg-white/80 hover:bg-white border border-black/10 text-gray-800 shadow-sm' : 'bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300'} text-xs transition-colors`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className={`font-mono text-[11px] ${isDashboard ? 'text-gray-700' : 'text-gray-400'} truncate max-w-[130px]`}>{activeManifest.name}</span>
        </button>

        {/* Draft / Live Lifecycle Indicator */}
        <div className={`flex items-center gap-1 sm:gap-2 ${isDashboard ? 'bg-black/5 border border-black/10' : 'bg-white/5 border border-white/5'} p-1 rounded-xl text-xs`}>
          <span className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-mono uppercase font-bold ${
            siteMode === 'live' ? 'bg-emerald-500/20 text-emerald-600' : 'bg-amber-500/20 text-amber-700'
          }`}>
            {siteMode}
          </span>
          {siteMode === 'draft' && (
            <button
              onClick={handlePublishLive}
              data-testid="admin-publish-live-btn"
              className="px-2 sm:px-2.5 py-1 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> 
              <span className="hidden sm:inline">Publish Live</span>
            </button>
          )}
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          title="Notification Center"
          data-testid="admin-notifications-trigger"
          className={`relative p-2 rounded-xl ${isDashboard ? 'bg-white/80 hover:bg-white border border-black/10 text-gray-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'} transition-colors`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          )}
        </button>

        {/* Shortcuts Help */}
        <button
          onClick={onOpenShortcuts}
          title="Keyboard shortcuts (?)"
          data-testid="admin-shortcuts-trigger"
          className={`hidden sm:flex p-2 rounded-xl ${isDashboard ? 'bg-white/80 hover:bg-white border border-black/10 text-gray-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'} transition-colors`}
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Public Preview Button */}
        <button
          onClick={() => onNavigate('/')}
          data-testid="admin-view-site-btn"
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl ${isDashboard ? 'bg-[#202020] hover:bg-[#111111] text-white shadow-sm' : 'bg-white/10 hover:bg-white/15 text-white'} text-xs font-medium flex items-center gap-1.5 transition-colors`}
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">View Site</span>
          <ArrowUpRight className={`w-3.5 h-3.5 ${isDashboard ? 'text-gray-300' : 'text-gray-400'}`} />
        </button>
      </div>
    </header>
  );
};
