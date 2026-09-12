import React, { useState } from 'react';
import { X, Check, RefreshCw, Edit3, Send, AlertCircle } from 'lucide-react';
import { SocialDraft } from '@/types/automation';
import { socialPublishService } from '@/services/socialPublishService';
import { mockStorage } from '@/data/mockStorage';

interface TelegramApprovalModalProps {
  draft: SocialDraft | null;
  onClose: () => void;
}

export const TelegramApprovalModal: React.FC<TelegramApprovalModalProps> = ({ draft, onClose }) => {
  if (!draft) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState(draft.hookHeadline);
  const [summary, setSummary] = useState(draft.summary);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleApprove = async () => {
    setIsPublishing(true);
    setStatusMessage('Broadcasting simulated payload to LinkedIn v2 API...');
    try {
      const updatedDraft = { ...draft, hookHeadline: headline, summary };
      const res = await socialPublishService.publish(updatedDraft);
      setStatusMessage(`[${res.status}] ${res.message}`);
      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRegenerate = () => {
    setHeadline(`Deep dive: Key architectural decisions in ${draft.sourceTitle}`);
    setSummary(`Here is what we learned scaling this platform to enterprise benchmarks with zero runtime latency degradation.`);
  };

  const handleReject = () => {
    draft.status = 'rejected';
    mockStorage.saveSocialDraft(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-blue-500/30 rounded-2xl w-full max-w-lg shadow-2xl p-6 text-white animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Social Approval Queue</h3>
              <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">{draft.platform.toUpperCase()} PIPELINE</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telegram Card preview */}
        <div className="bg-[#0b111e] border border-white/5 rounded-xl p-4 mb-4 space-y-3 font-sans">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-blue-400 font-semibold">TARGET: {draft.platform.toUpperCase()}</span>
              {draft.renderThemeTarget && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
                  📖 {draft.renderThemeTarget === 'theme-24-the-journal' ? 'The Journal' : draft.renderThemeTarget}
                </span>
              )}
              {draft.syndicationTriggerTag && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  🏷️ {draft.syndicationTriggerTag}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">NEEDS APPROVAL</span>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-gray-400 font-mono">Hook Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-mono">Summary Body</label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-bold text-white">{headline}</p>
              <p className="text-xs text-gray-300 leading-relaxed">{summary}</p>
              <p className="text-xs text-blue-400 truncate">{draft.canonicalUrl}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {draft.hashtags.map((h, i) => (
                  <span key={i} className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded font-mono">{h}</span>
                ))}
              </div>
            </>
          )}

          {draft.mediaUrl && (
            <div className="h-32 w-full rounded-lg overflow-hidden border border-white/5 mt-2">
              <img src={draft.mediaUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {statusMessage && (
          <div className="mb-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="grid grid-cols-4 gap-2">
          <button
            disabled={isPublishing}
            onClick={handleApprove}
            className="col-span-2 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-green-600/20"
          >
            <Check className="w-4 h-4" /> Approve & Broadcast
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> {isEditing ? 'Done' : 'Edit'}
          </button>

          <button
            onClick={handleRegenerate}
            className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Regen
          </button>
        </div>

        <button
          onClick={handleReject}
          className="w-full mt-2 text-center text-xs text-red-400 hover:text-red-300 py-1.5 font-mono"
        >
          Reject Draft
        </button>
      </div>
    </div>
  );
};
