import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, FileText, Sparkles, Send, ArrowUpRight, TrendingUp, 
  CheckCircle2, AlertTriangle, Eye, ShieldCheck, GitBranch, Database,
  Palette, Plus, Clock, ExternalLink
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { THEME_MANIFESTS } from '@/data/initialThemes';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState(mockStorage.getProjects());
  const [posts, setPosts] = useState(mockStorage.getPosts());
  const [activeThemeId, setActiveThemeId] = useState(mockStorage.getActiveTheme());
  const [liveThemeId, setLiveThemeId] = useState(mockStorage.getLiveTheme());
  const [drafts, setDrafts] = useState(mockStorage.getSocialDrafts());
  const [automations, setAutomations] = useState(mockStorage.getAutomations());

  useEffect(() => {
    const update = () => {
      setProjects(mockStorage.getProjects());
      setPosts(mockStorage.getPosts());
      setActiveThemeId(mockStorage.getActiveTheme());
      setLiveThemeId(mockStorage.getLiveTheme());
      setDrafts(mockStorage.getSocialDrafts());
      setAutomations(mockStorage.getAutomations());
    };
    return mockStorage.subscribe(update);
  }, []);

  const activeManifest = THEME_MANIFESTS.find(m => m.id === activeThemeId) || THEME_MANIFESTS[0];
  const pendingDrafts = drafts.filter(d => d.status === 'pending_approval');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans">
      {/* Welcome Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950/40 via-indigo-950/20 to-transparent p-6 rounded-2xl border border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">System Online · All Adapters Operational</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Prajwal DL // Operating Command</h1>
          <p className="text-xs text-gray-400 mt-1">Portfolio management, 19 isolated themes, and autonomous distribution engine.</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('/admin/projects/new')}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
          <button
            onClick={() => onNavigate('/admin/blog/new')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Article
          </button>
          <button
            onClick={() => onNavigate('/admin/visual-editor')}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-purple-400" /> Edit Site
          </button>
        </div>
      </div>

      {/* Bento Grid Layer 1: Core Metrics & Active Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Health Score */}
        <div 
          onClick={() => onNavigate('/admin/site-health')}
          className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase">Site Health</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">98%</span>
            <span className="text-xs font-mono text-emerald-400">Excellent</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">SEO, accessibility & speed all within green thresholds.</p>
        </div>

        {/* Metric 2: Projects & Live Drafts */}
        <div 
          onClick={() => onNavigate('/admin/projects')}
          className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase">Projects</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{projects.length}</span>
            <span className="text-xs font-mono text-gray-400">Published</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">Nova Clinics, Alto Commerce, ScreenVerse X, Aster AI...</p>
        </div>

        {/* Metric 3: Articles & Words */}
        <div 
          onClick={() => onNavigate('/admin/blog')}
          className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase">Blog & Case Studies</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{posts.length}</span>
            <span className="text-xs font-mono text-purple-400">Live</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">Flagship block editor with inline AI and LinkedIn sync.</p>
        </div>

        {/* Metric 4: Social Automation Queue */}
        <div 
          onClick={() => onNavigate('/admin/automations')}
          className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase">Approval Queue</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{pendingDrafts.length}</span>
            <span className="text-xs font-mono text-amber-400">Needs Review</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">Telegram-style human approval for LinkedIn drafts.</p>
        </div>
      </div>

      {/* Bento Grid Layer 2: Active Theme Card + Draft Queue & Quick Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Theme Highlight Bento */}
        <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-10">
            <Palette className="w-32 h-32 text-blue-400" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">Active Public Theme</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                THEME {activeManifest.number}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{activeManifest.name}</h3>
            <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">{activeManifest.concept}</p>

            <div className="space-y-2 text-xs font-mono bg-white/5 p-3 rounded-xl border border-white/5 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Layout:</span>
                <span className="text-gray-300 truncate max-w-[170px]">{activeManifest.layoutArchitecture}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Navigation:</span>
                <span className="text-gray-300 truncate max-w-[170px]">{activeManifest.navigationPattern}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Grid:</span>
                <span className="text-gray-300 truncate max-w-[170px]">{activeManifest.gridSystem}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onNavigate('/admin/themes')}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Palette className="w-4 h-4" /> Browse 19 Themes
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/5"
              title="Open public view"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Draft Review Queue Bento */}
        <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Draft Review Queue</h3>
              <button 
                onClick={() => onNavigate('/admin/automations')}
                className="text-xs text-blue-400 hover:underline"
              >
                View all ({drafts.length})
              </button>
            </div>

            {pendingDrafts.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-500 font-mono">
                No drafts pending review. You are completely caught up!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingDrafts.slice(0, 2).map(draft => (
                  <div key={draft.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-blue-400 uppercase font-bold">{draft.platform}</span>
                      <span className="text-amber-400">Review Required</span>
                    </div>
                    <p className="text-xs font-medium text-white line-clamp-1">{draft.hookHeadline}</p>
                    <p className="text-[11px] text-gray-400 line-clamp-2">{draft.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('/admin/automations')}
            className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            Open Telegram Approval Queue <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Analytics & Activity Timeline */}
        <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Live Traffic & Activity</h3>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24% this week
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs font-mono">
                <span className="text-gray-400">Total Pageviews</span>
                <span className="font-bold text-white">4,820</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs font-mono">
                <span className="text-gray-400">Unique Recruiters</span>
                <span className="font-bold text-white">142</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs font-mono">
                <span className="text-gray-400">Avg. Session Duration</span>
                <span className="font-bold text-white">3m 14s</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/admin/analytics')}
            className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Full Analytics & Sources <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
