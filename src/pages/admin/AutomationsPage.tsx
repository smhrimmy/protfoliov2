import React, { useState, useEffect } from 'react';
import { 
  Send, Sparkles, Check, X, Clock, AlertCircle, Play, 
  ExternalLink, Edit, RefreshCw, Layers, ShieldCheck
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-gray-100 font-sans pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              HONEST SIMULATION ENGINE · TELEGRAM APPROVALS
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Social Automation & Syndication Hub</h1>
          <p className="text-xs text-gray-400 mt-1">
            Human-in-the-loop social pipelines for LinkedIn, X/Twitter, and Dev.to cross-posting.
          </p>
        </div>

        <button
          onClick={handleTriggerTestDraft}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/20"
        >
          <Sparkles className="w-4 h-4" /> Generate Test LinkedIn Draft
        </button>
      </div>

      {/* Telegram-style Approval Queue */}
      <div className="bg-[#0e131f] border border-blue-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Telegram-Style Content Approval Queue</h3>
              <p className="text-[11px] font-mono text-gray-400">Content will not broadcast until approved.</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
            {drafts.filter(d => d.status === 'pending_approval').length} PENDING
          </span>
        </div>

        {drafts.filter(d => d.status === 'pending_approval').length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-500 font-mono">
            No drafts currently pending. Publish a blog post or project to auto-trigger social generation.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drafts.filter(d => d.status === 'pending_approval').map(draft => (
              <div key={draft.id} className="bg-[#070a10] p-4 rounded-xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-400 uppercase font-bold">{draft.platform}</span>
                  <span className="text-amber-400 text-[10px]">AWAITING APPROVAL</span>
                </div>
                <p className="text-xs font-bold text-white">{draft.hookHeadline}</p>
                <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">{draft.summary}</p>
                <button
                  onClick={() => setSelectedDraft(draft)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                >
                  Open Approval Controls (Approve / Edit / Regen)
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connected Platform Adapters & Automation Rules */}
      <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Automation Pipelines & Adapters</h3>
        <div className="divide-y divide-white/5">
          {rules.map(rule => (
            <div key={rule.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{rule.name}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    rule.status === 'connected' ? 'bg-emerald-500/20 text-emerald-400' :
                    rule.status === 'simulated' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {rule.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Trigger: <span className="font-mono text-gray-300">{rule.trigger}</span> · Last run: {rule.lastRun ? new Date(rule.lastRun).toLocaleString() : 'Never'}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right text-xs font-mono text-gray-400 hidden sm:block">
                  <span className="text-emerald-400 font-bold">{rule.successCount}</span> passed / {rule.failCount} failed
                </div>
                <button
                  onClick={() => handleToggleRule(rule.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    rule.enabled ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-gray-400'
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
      <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Execution Logs & Payloads</h3>
          <span className="text-xs font-mono text-gray-400">Real verified simulated payloads</span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-64 overflow-y-auto">
          {logs.map(log => (
            <div key={log.id} className="p-3 bg-[#070a10] rounded-xl border border-white/5 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    [{log.status}]
                  </span>
                  <span className="text-white font-semibold">{log.platform}</span>
                  <span className="text-gray-500 text-[10px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-gray-400 text-[11px]">{log.message}</p>
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
