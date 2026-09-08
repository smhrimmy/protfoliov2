import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, FileText, Sparkles, Send, ArrowUpRight, TrendingUp, 
  CheckCircle2, AlertTriangle, Eye, ShieldCheck, GitBranch, Database,
  Palette, Plus, Clock, ExternalLink, HardDrive, Check, X, RefreshCw,
  Bell, Activity, Users, Globe, ChevronRight, Layers, Award
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { THEME_MANIFESTS } from '@/data/initialThemes';
import { Project, BlogPost } from '@/types/portfolio';
import { SocialDraft } from '@/types/automation';
import { NotificationItem } from '@/types/cms';
import { IntelligentStage } from '@/components/dashboard/IntelligentStage';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [posts, setPosts] = useState<BlogPost[]>(mockStorage.getPosts());
  const [activeThemeId, setActiveThemeId] = useState(mockStorage.getActiveTheme());
  const [liveThemeId, setLiveThemeId] = useState(mockStorage.getLiveTheme());
  const [siteMode, setSiteMode] = useState<'draft' | 'live'>(mockStorage.getSiteMode());
  const [drafts, setDrafts] = useState<SocialDraft[]>(mockStorage.getSocialDrafts());
  const [automations, setAutomations] = useState(mockStorage.getAutomations());
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockStorage.getNotifications());
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setProjects(mockStorage.getProjects());
      setPosts(mockStorage.getPosts());
      setActiveThemeId(mockStorage.getActiveTheme());
      setLiveThemeId(mockStorage.getLiveTheme());
      setSiteMode(mockStorage.getSiteMode());
      setDrafts(mockStorage.getSocialDrafts());
      setAutomations(mockStorage.getAutomations());
      setNotifications(mockStorage.getNotifications());
    };
    return mockStorage.subscribe(update);
  }, []);

  const activeManifest = THEME_MANIFESTS.find(m => m.id === activeThemeId) || THEME_MANIFESTS[0];
  const pendingDrafts = drafts.filter(d => d.status === 'pending_approval');

  const showToast = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleApproveDraft = (id: string) => {
    const draft = drafts.find(d => d.id === id);
    if (draft) {
      const updated = { ...draft, status: 'approved' as const };
      mockStorage.saveSocialDraft(updated);
      setDrafts(drafts.map(d => d.id === id ? updated : d));
      showToast('Draft approved for automated broadcast!');
    }
  };

  const handleRejectDraft = (id: string) => {
    const draft = drafts.find(d => d.id === id);
    if (draft) {
      const updated = { ...draft, status: 'rejected' as const };
      mockStorage.saveSocialDraft(updated);
      setDrafts(drafts.map(d => d.id === id ? updated : d));
      showToast('Draft marked as rejected.');
    }
  };

  const handlePublishSite = () => {
    mockStorage.publishAllToLive();
    setSiteMode('live');
    showToast('All changes successfully published to Live site!');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8 text-gray-100 font-sans pb-24">
      {/* Action Feedback Toast */}
      {actionFeedback && (
        <div className="fixed top-20 right-6 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* INTELLIGENT STAGE (Top Section) */}
      <IntelligentStage
        onNavigate={onNavigate}
        headlinePrefix="Operating at "
        dotWord="Intelligent"
        headlineSuffix="Performance"
        introText="Every capability is engineered for speed, scale and contextual understanding, giving your AI the foundation to reason, adapt and perform in production."
      />

      {/* Hero Command Banner */}
      <div className="bg-gradient-to-r from-blue-950/50 via-[#0c121e] to-[#070a10] p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational · 98% Health
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[11px] font-mono">
                Theme {activeManifest.number}: {activeManifest.name}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Prajwal DL // Operating Command Center
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Real-time portfolio telemetry, 19 isolated theme architectures, and autonomous distribution engine.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('/admin/projects/new')}
              data-testid="dash-new-project-btn"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <Plus className="w-4 h-4" /> New Project
            </button>

            <button
              onClick={() => onNavigate('/admin/blog/new')}
              data-testid="dash-new-article-btn"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" /> New Article
            </button>

            <button
              onClick={() => onNavigate('/admin/visual-editor')}
              data-testid="dash-visual-editor-btn"
              className="px-4 py-2.5 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Eye className="w-4 h-4" /> Visual Site Editor
            </button>

            <button
              onClick={() => onNavigate('/admin/recruiter')}
              data-testid="dash-recruiter-btn"
              className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Users className="w-4 h-4 text-emerald-400" /> Recruiter Mode
            </button>
          </div>
        </div>

        {/* Publishing Lifecycle Bar */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">STATE:</span>
              <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                siteMode === 'live' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {siteMode}
              </span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">ACTIVE THEME:</span>
              <span className="text-white font-bold">{activeManifest.name}</span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">LAST PUBLISHED:</span>
              <span className="text-gray-300">Today, 22:43 UTC</span>
            </div>
          </div>

          {siteMode === 'draft' && (
            <button
              onClick={handlePublishSite}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold flex items-center gap-1.5 text-xs transition-colors shadow-md"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Publish Changes to Live
            </button>
          )}
        </div>
      </div>

      {/* Vital Signals Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Site Health */}
        <div 
          onClick={() => onNavigate('/admin/site-health')}
          className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Health & Speed</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight">98%</span>
              <span className="text-xs font-mono text-emerald-400">Optimal</span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span>LCP: 0.8s</span>
            <span>CLS: 0.01</span>
            <span>SEO: 99</span>
          </div>
        </div>

        {/* Metric 2: Projects & Live Drafts */}
        <div 
          onClick={() => onNavigate('/admin/projects')}
          className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Production Systems</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <FolderGit2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight">{projects.length}</span>
              <span className="text-xs font-mono text-blue-400">Deployed</span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[11px] text-gray-400">
            <span>{projects.filter(p => p.featured).length} Featured</span>
            <span className="text-blue-400 font-medium">Manage →</span>
          </div>
        </div>

        {/* Metric 3: Recruiter Telemetry */}
        <div 
          onClick={() => onNavigate('/admin/analytics')}
          className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Weekly Visitors</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight">4,820</span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +18.4%
              </span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[11px] text-gray-400">
            <span>84 Company IPs</span>
            <span className="text-purple-400 font-medium">Telemetry →</span>
          </div>
        </div>

        {/* Metric 4: Social Approval Queue */}
        <div 
          onClick={() => onNavigate('/admin/automations')}
          className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Telegram Queue</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight">{pendingDrafts.length}</span>
              <span className="text-xs font-mono text-amber-400">Needs Review</span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[11px] text-gray-400">
            <span>Autonomous Pipeline</span>
            <span className="text-amber-400 font-medium">Review →</span>
          </div>
        </div>
      </div>

      {/* Layer 2: Pending Approval Queue & Active Theme Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Theme Highlight */}
        <div className="bg-[#0e131f] border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">ACTIVE THEME WORLD</span>
              </div>
              <button
                onClick={() => onNavigate('/admin/themes')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                19 Worlds →
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-sm">
                  #{activeManifest.number}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">{activeManifest.name}</h3>
                  <p className="text-xs font-mono text-gray-400">{activeManifest.layoutArchitecture}</p>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                {activeManifest.concept}
              </p>

              <div className="text-[11px] font-mono text-gray-400 space-y-1 pt-1">
                <p><span className="text-gray-500">SIGNATURE:</span> {activeManifest.signatureInteraction}</p>
                <p><span className="text-gray-500">TYPE SYSTEM:</span> {activeManifest.typographyPairing}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center gap-2">
            <button
              onClick={() => onNavigate('/admin/visual-editor')}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Open Visual Editor
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-colors"
              title="View on Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Human-in-the-Loop Social Approval Queue */}
        <div className="lg:col-span-2 bg-[#0e131f] border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Telegram & LinkedIn Approval Queue</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-xs font-mono">
              {pendingDrafts.length} pending
            </span>
          </div>

          {pendingDrafts.length === 0 ? (
            <div className="p-8 text-center space-y-2 border border-dashed border-white/10 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-white">Queue Clear · No pending approvals</p>
              <p className="text-[11px] text-gray-500">All automated drafts have been reviewed and dispatched.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-72 pr-1 no-scrollbar">
              {pendingDrafts.map((draft) => (
                <div key={draft.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-amber-400 font-bold uppercase">
                      {draft.platform} · {draft.createdAt ? new Date(draft.createdAt).toLocaleDateString() : 'Immediate'}
                    </span>
                    <span className="text-gray-500 text-[10px] font-mono">ID: {draft.id}</span>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed font-sans line-clamp-3">
                    {draft.summary || draft.hookHeadline}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-[11px] text-gray-400 font-mono">Target: {draft.platform.toUpperCase()}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRejectDraft(draft.id)}
                        className="px-3 py-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 rounded-lg font-semibold text-xs flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                      <button
                        onClick={() => onNavigate('/admin/automations')}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-gray-200 rounded-lg font-semibold text-xs transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleApproveDraft(draft.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve & Broadcast
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 text-right">
            <button
              onClick={() => onNavigate('/admin/automations')}
              className="text-xs text-gray-400 hover:text-white font-mono"
            >
              Open Automation Pipeline Manager →
            </button>
          </div>
        </div>
      </div>

      {/* Layer 3: Recent Projects Matrix + Recent Blog Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Matrix */}
        <div className="lg:col-span-2 bg-[#0e131f] border border-white/5 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Production Case Studies</h3>
            </div>
            <button
              onClick={() => onNavigate('/admin/projects')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              View All ({projects.length}) →
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {projects.slice(0, 4).map((proj) => (
              <div key={proj.id} className="py-3.5 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-10 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                        {proj.title}
                      </h4>
                      {proj.featured && (
                        <span className="px-1.5 py-0.2 rounded bg-blue-600/20 text-blue-400 text-[9px] font-mono uppercase font-bold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{proj.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="hidden sm:flex items-center gap-1">
                    {proj.technologies.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate(`/admin/projects/${proj.id}`)}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs transition-colors"
                    title="Edit project"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onNavigate(`/projects/${proj.id}`)}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-xs transition-colors"
                    title="View public case study"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-[#0e131f] border border-white/5 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Essays</h3>
            </div>
            <button
              onClick={() => onNavigate('/admin/blog')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              View All ({posts.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {posts.slice(0, 3).map((post) => (
              <div 
                key={post.id}
                onClick={() => onNavigate(`/admin/blog/${post.id}`)}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="text-purple-400 uppercase font-bold">{post.category}</span>
                  <span>{post.readingTimeMinutes} MIN READ</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">{post.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('/admin/blog/new')}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Draft New Article
          </button>
        </div>
      </div>

      {/* Layer 4: Storage, GitHub Activity & Audit Log */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Storage / Asset Indicator */}
        <div 
          onClick={() => onNavigate('/admin/media')}
          className="p-6 rounded-3xl bg-[#0e131f] border border-white/5 hover:border-white/10 transition-all cursor-pointer space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Media & Storage</h4>
            </div>
            <span className="text-xs font-mono text-gray-400">5% Used</span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '5%' }} />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>24.8 MB of 500 MB</span>
              <span>Cloud Storage Ready</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500">Asset library supports high-res PNG, WebP, SVG, and video reels.</p>
        </div>

        {/* GitHub Pulse */}
        <div 
          onClick={() => onNavigate('/admin/github')}
          className="p-6 rounded-3xl bg-[#0e131f] border border-white/5 hover:border-white/10 transition-all cursor-pointer space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">GitHub Pulse</h4>
            </div>
            <span className="text-xs font-mono text-emerald-400">Sync Active</span>
          </div>

          <div className="space-y-1 text-xs">
            <p className="font-mono text-white font-bold truncate">feat: complete PDL Portfolio OS v2</p>
            <p className="text-[11px] text-gray-400">114 files · main branch · smhrimmy/protfoliov2</p>
          </div>
          <p className="text-[11px] text-gray-500">Auto-syncs live projects and commit activity directly to public portfolio.</p>
        </div>

        {/* Backup & System Security */}
        <div 
          onClick={() => onNavigate('/admin/backup')}
          className="p-6 rounded-3xl bg-[#0e131f] border border-white/5 hover:border-white/10 transition-all cursor-pointer space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Backup & Migration</h4>
            </div>
            <span className="text-xs font-mono text-purple-400">Verified</span>
          </div>

          <div className="space-y-1 text-xs">
            <p className="font-bold text-white">Full JSON State Snapshot</p>
            <p className="text-[11px] text-gray-400">1-click complete data export / restore</p>
          </div>
          <p className="text-[11px] text-gray-500">All 19 theme configs, projects, posts, and settings exportable.</p>
        </div>
      </div>
    </div>
  );
};
