import React, { useState, useEffect } from 'react';
import { 
  Send, Sparkles, Check, X, Clock, AlertCircle, Play, 
  ExternalLink, Edit, RefreshCw, Layers, ShieldCheck, BookOpen, Tag
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { AutomationRule, SocialDraft, AutomationLog } from '@/types/automation';
import { TelegramApprovalModal } from '@/components/common/TelegramApprovalModal';
import { contentPipelineService } from '@/services/contentPipelineService';

export const AutomationsPage: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(mockStorage.getAutomations());
  const [drafts, setDrafts] = useState<SocialDraft[]>(mockStorage.getSocialDrafts());
  const [logs, setLogs] = useState<AutomationLog[]>(mockStorage.getAutomationLogs());
  const [selectedDraft, setSelectedDraft] = useState<SocialDraft | null>(null);

  useEffect(() => {
    const update = () => {
      setRules(mockStorage.getAutomations());
      setDrafts(mockStorage.getSocialDrafts());
      setLogs(mockStorage.getAutomationLogs());
    };
    return mockStorage.subscribe(update);
  }, []);

  const handleToggleRule = (id: string) => {
    const rule = rules.find(r => r.id === id);
    if (rule) {
      const updated = { ...rule, enabled: !rule.enabled };
      mockStorage.saveAutomation(updated);
    }
  };

  const handleTriggerTestDraft = () => {
    const posts = mockStorage.getPosts();
    if (posts.length > 0) {
      const draft = contentPipelineService.generateSocialDraft(posts[0], 'post', 'linkedin');
      setSelectedDraft(draft);
    }
  };

  const handleTriggerJournalCrossPost = () => {
    const posts = mockStorage.getPosts();
    const journalPost = posts.find(p => 
      p.tags.some(t => ['career', 'dev notes', 'architecture', 'engineering'].includes(t.toLowerCase()))
    ) || posts[0];

    if (journalPost) {
      const targetPost = {
        ...journalPost,
        status: 'published' as const,
        tags: Array.from(new Set([...journalPost.tags, 'Career', 'Dev Notes']))
      };
      const draft = contentPipelineService.generateSocialDraft(targetPost, 'post', 'linkedin');
      setSelectedDraft(draft);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-[#222222] font-sans pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#ad314d] animate-pulse" />
            <span className="text-[10px] font-mono text-[#ad314d] uppercase tracking-wider font-bold">
              HONEST SIMULATION ENGINE · TELEGRAM APPROVALS
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Social Automation & Syndication Hub</h1>
          <p className="text-xs text-[#55555e] mt-1">
            Human-in-the-loop social pipelines for LinkedIn, X/Twitter, and Dev.to cross-posting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleTriggerJournalCrossPost}
            className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-black text-white rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
            title="Auto-pulls excerpt as LinkedIn copy & links back to The Journal"
          >
            <BookOpen className="w-4 h-4 text-amber-400" /> Simulate "The Journal" Cross-Post
          </button>
          <button
            onClick={handleTriggerTestDraft}
            className="px-4 py-2.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" /> Standard Test Draft
          </button>
        </div>
      </div>

      {/* Telegram-style Approval Queue */}
      <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-black/8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a1a1a]">Telegram-Style Content Approval Queue</h3>
              <p className="text-[11px] font-mono text-[#55555e]">Content will not broadcast until approved.</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
            {drafts.filter(d => d.status === 'pending_approval').length} PENDING
          </span>
        </div>

        {drafts.filter(d => d.status === 'pending_approval').length === 0 ? (
          <div className="py-8 text-center text-xs text-[#666670] font-mono">
            No drafts currently pending. Publish a blog post or project to auto-trigger social generation.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drafts.filter(d => d.status === 'pending_approval').map(draft => (
              <div key={draft.id} className="bg-black/[0.02] p-4 rounded-xl border border-black/8 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-blue-700 uppercase font-bold">{draft.platform}</span>
                    {draft.renderThemeTarget && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-300 font-sans font-medium">
                        📖 {draft.renderThemeTarget === 'theme-24-the-journal' ? 'The Journal' : draft.renderThemeTarget}
                      </span>
                    )}
                    {draft.syndicationTriggerTag && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                        🏷️ {draft.syndicationTriggerTag}
                      </span>
                    )}
                  </div>
                  <span className="text-amber-700 text-[10px] font-bold">AWAITING APPROVAL</span>
                </div>
                <p className="text-xs font-bold text-[#1a1a1a]">{draft.hookHeadline}</p>
                <p className="text-[11px] text-[#44444c] line-clamp-3 leading-relaxed whitespace-pre-line">{draft.summary}</p>
                <div className="flex items-center justify-between text-[10px] text-[#777780] font-mono pt-1">
                  <span className="truncate max-w-[200px]">Link: {draft.canonicalUrl}</span>
                  <span>Target: {draft.renderThemeTarget === 'theme-24-the-journal' ? 'The Journal' : (draft.renderThemeTarget || 'Default')}</span>
                </div>
                <button
                  onClick={() => setSelectedDraft(draft)}
                  className="w-full py-2 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-xs"
                >
                  Open Approval Controls (Approve / Edit / Regen)
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connected Platform Adapters & Automation Rules */}
      <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-[#1a1a1a]">Automation Pipelines & Adapters</h3>
        <div className="divide-y divide-black/6">
          {rules.map(rule => (
            <div key={rule.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#1a1a1a]">{rule.name}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    rule.status === 'connected' ? 'bg-emerald-100 text-emerald-800' :
                    rule.status === 'simulated' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {rule.status}
                  </span>
                </div>
                <p className="text-xs text-[#55555e]">Trigger: <span className="font-mono text-[#1a1a1a]">{rule.trigger}</span> · Last run: {rule.lastRun ? new Date(rule.lastRun).toLocaleString() : 'Never'}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right text-xs font-mono text-[#55555e] hidden sm:block">
                  <span className="text-emerald-700 font-bold">{rule.successCount}</span> passed / {rule.failCount} failed
                </div>
                <button
                  onClick={() => handleToggleRule(rule.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    rule.enabled ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-black/5 text-[#55555e]'
                  }`}
                >
                  {rule.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Logs (Simulated Success Verification) */}
      <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1a1a1a]">Execution Logs & Payloads</h3>
          <span className="text-xs font-mono text-[#55555e]">Real verified simulated payloads</span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-64 overflow-y-auto">
          {logs.map(log => (
            <div key={log.id} className="p-3 bg-black/[0.02] rounded-xl border border-black/6 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    [{log.status}]
                  </span>
                  <span className="text-[#1a1a1a] font-semibold">{log.platform}</span>
                  <span className="text-[#888890] text-[10px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-[#55555e] text-[11px]">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TelegramApprovalModal
        draft={selectedDraft}
        onClose={() => setSelectedDraft(null)}
      />
    </div>
  );
};
