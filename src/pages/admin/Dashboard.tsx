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
    setTimeout(() => setActionFeedback(null), 3200);
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
    <div className="relative min-h-screen bg-[#ececeb] text-[#222222] font-sans pb-16">
      {/* Floating Action Feedback Toast */}
      {actionFeedback && (
        <div className="fixed top-20 right-6 z-50 bg-[#1f2023] text-white px-4 py-2.5 rounded-full shadow-2xl border border-white/20 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* COMPLETE UNIFIED INTELLIGENT STAGE */}
      <IntelligentStage
        onNavigate={onNavigate}
        siteMode={siteMode}
        onPublishSite={handlePublishSite}
        activeManifest={activeManifest}
      >
        {/* LAYER 2: ACTIVE THEME SHOWCASE + SOCIAL APPROVAL QUEUE */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" aria-label="Theme & Automations">
          {/* Active Theme Highlight */}
          <div className="stage-glass-panel p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#ad314d]" />
                  <span className="text-xs font-mono text-[#666670] uppercase tracking-wider font-semibold">ACTIVE THEME WORLD</span>
                </div>
                <button
                  onClick={() => onNavigate('/admin/themes')}
                  className="text-xs text-[#ad314d] hover:text-[#8e253d] font-bold"
                >
                  23 Themes →
                </button>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ad314d]/10 text-[#ad314d] border border-[#ad314d]/20 flex items-center justify-center font-mono font-bold text-sm">
                    #{activeManifest.number}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a1a1a] leading-tight">{activeManifest.name}</h3>
                    <p className="text-xs font-mono text-[#666670]">{activeManifest.layoutArchitecture}</p>
                  </div>
                </div>

                <p className="stage-glass-inset text-xs text-[#333339] leading-relaxed p-3.5">
                  {activeManifest.concept}
                </p>

                <div className="text-[11px] font-mono text-[#55555e] space-y-1.5 pt-1">
                  <p><span className="text-[#888890]">SIGNATURE:</span> {activeManifest.signatureInteraction}</p>
                  <p><span className="text-[#888890]">TYPE SYSTEM:</span> {activeManifest.typographyPairing}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/8 flex items-center gap-2.5">
              <button
                onClick={() => onNavigate('/admin/visual-editor')}
                className="stage-pill-action stage-pill-action-dark flex-1 justify-center"
              >
                <Eye className="w-3.5 h-3.5" /> Open Visual Editor
              </button>
              <button
                onClick={() => onNavigate('/')}
                className="stage-pill-action stage-pill-action-glass px-3"
                title="View on Public Site"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Human-in-the-Loop Social Approval Queue */}
          <div className="lg:col-span-2 stage-glass-panel p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/8">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">Telegram & LinkedIn Approval Queue</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 text-xs font-mono font-bold">
                {pendingDrafts.length} pending
              </span>
            </div>

            {pendingDrafts.length === 0 ? (
              <div className="p-8 text-center space-y-2 border border-dashed border-black/15 rounded-2xl bg-white/40">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-[#1a1a1a]">Queue Clear · No pending approvals</p>
                <p className="text-[11px] text-[#666670]">All automated drafts have been reviewed and dispatched.</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-72 pr-1 no-scrollbar">
                {pendingDrafts.map((draft) => (
                  <div key={draft.id} className="stage-glass-inset p-4 hover:border-black/15 transition-all space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-amber-800 font-bold uppercase tracking-wide">
                        {draft.platform} · {draft.createdAt ? new Date(draft.createdAt).toLocaleDateString() : 'Immediate'}
                      </span>
                      <span className="text-[#888890] text-[10px] font-mono">ID: {draft.id}</span>
                    </div>

                    <p className="text-xs text-[#222228] leading-relaxed font-medium line-clamp-3">
                      {draft.summary || draft.hookHeadline}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 border-t border-black/8 text-xs">
                      <span className="text-[11px] text-[#666670] font-mono">Target: {draft.platform.toUpperCase()}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRejectDraft(draft.id)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-700 rounded-full font-semibold text-xs flex items-center gap-1 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                        <button
                          onClick={() => onNavigate('/admin/automations')}
                          className="stage-pill-action stage-pill-action-glass py-1.5 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleApproveDraft(draft.id)}
                          className="stage-pill-action bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm py-1.5 text-xs"
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
                className="text-xs text-[#55555e] hover:text-[#111111] font-mono font-medium"
              >
                Open Automation Pipeline Manager →
              </button>
            </div>
          </div>
        </section>

        {/* LAYER 3: PRODUCTION CASE STUDIES MATRIX + RECENT ESSAYS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" aria-label="Content Library">
          {/* Projects Matrix */}
          <div className="lg:col-span-2 stage-glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/8">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-[#ad314d]" />
                <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">Production Case Studies</h3>
              </div>
              <button
                onClick={() => onNavigate('/admin/projects')}
                className="text-xs text-[#ad314d] hover:text-[#8e253d] font-bold"
              >
                View All ({projects.length}) →
              </button>
            </div>

            <div className="divide-y divide-black/8">
              {projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="py-3.5 flex items-center justify-between gap-4 group">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-10 rounded-xl overflow-hidden bg-black/5 border border-black/10 shrink-0">
                      <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#1a1a1a] truncate group-hover:text-[#ad314d] transition-colors">
                          {proj.title}
                        </h4>
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-[#ad314d]/10 text-[#ad314d] text-[10px] font-mono uppercase font-bold">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#55555e] truncate mt-0.5">{proj.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="hidden sm:flex items-center gap-1">
                      {proj.technologies.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-black/5 text-[#55555e] px-2 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate(`/admin/projects/${proj.id}`)}
                      className="stage-pill-action stage-pill-action-glass py-1 text-xs"
                      title="Edit project"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onNavigate(`/projects/${proj.id}`)}
                      className="p-2 bg-black/5 hover:bg-black/10 text-[#44444a] hover:text-[#111] rounded-full text-xs transition-colors"
                      title="View public case study"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Essays */}
          <div className="stage-glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/8">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-700" />
                <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">Recent Essays</h3>
              </div>
              <button
                onClick={() => onNavigate('/admin/blog')}
                className="text-xs text-purple-700 hover:text-purple-900 font-bold"
              >
                View All ({posts.length}) →
              </button>
            </div>

            <div className="space-y-3">
              {posts.slice(0, 3).map((post) => (
                <div 
                  key={post.id}
                  onClick={() => onNavigate(`/admin/blog/${post.id}`)}
                  className="stage-glass-inset p-3.5 hover:border-black/20 cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#666670]">
                    <span className="text-purple-700 uppercase font-bold">{post.category}</span>
                    <span>{post.readingTimeMinutes} MIN READ</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1a1a1a] leading-snug line-clamp-1">{post.title}</h4>
                  <p className="text-[11px] text-[#55555e] line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('/admin/blog/new')}
              className="stage-pill-action stage-pill-action-dark w-full justify-center mt-1"
            >
              <Plus className="w-3.5 h-3.5" /> Draft New Article
            </button>
          </div>
        </section>

        {/* LAYER 4: STORAGE, GITHUB ACTIVITY & BACKUP */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="System Diagnostics">
          {/* Storage / Asset Indicator */}
          <div 
            onClick={() => onNavigate('/admin/media')}
            className="stage-glass-panel p-6 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-[#ad314d]" />
                <h4 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">Media & Storage</h4>
              </div>
              <span className="text-xs font-mono text-[#666670] font-bold">5% Used</span>
            </div>

            <div className="space-y-2">
              <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ad314d] to-purple-600 rounded-full" style={{ width: '5%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#55555e]">
                <span>24.8 MB of 500 MB</span>
                <span>Cloud Storage Ready</span>
              </div>
            </div>
            <p className="text-[11px] text-[#666670]">Asset library supports high-res PNG, WebP, SVG, and video reels.</p>
          </div>

          {/* GitHub Pulse */}
          <div 
            onClick={() => onNavigate('/admin/github')}
            className="stage-glass-panel p-6 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">GitHub Pulse</h4>
              </div>
              <span className="text-xs font-mono text-emerald-800 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Sync Active
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-mono text-[#1a1a1a] font-bold truncate">feat: complete PDL Portfolio OS v2</p>
              <p className="text-[11px] text-[#55555e]">114 files · main branch · smhrimmy/protfoliov2</p>
            </div>
            <p className="text-[11px] text-[#666670]">Auto-syncs live projects and commit activity directly to public portfolio.</p>
          </div>

          {/* Backup & System Security */}
          <div 
            onClick={() => onNavigate('/admin/backup')}
            className="stage-glass-panel p-6 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-700" />
                <h4 className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">Backup & Migration</h4>
              </div>
              <span className="text-xs font-mono text-purple-800 font-bold">Verified</span>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-[#1a1a1a]">Full JSON State Snapshot</p>
              <p className="text-[11px] text-[#55555e]">1-click complete data export / restore</p>
            </div>
            <p className="text-[11px] text-[#666670]">All 23 theme configs, projects, posts, and settings exportable.</p>
          </div>
        </section>
      </IntelligentStage>
    </div>
  );
};
