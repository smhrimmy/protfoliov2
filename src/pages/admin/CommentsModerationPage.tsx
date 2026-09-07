import React, { useState } from 'react';
import { MessageSquare, Check, X, ShieldAlert, Trash2, Filter, AlertCircle, ThumbsUp } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { BlogComment } from '@/types/portfolio';

export const CommentsModerationPage: React.FC = () => {
  const [comments, setComments] = useState<BlogComment[]>(mockStorage.getComments());
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'spam'>('pending');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const pendingCount = comments.filter(c => c.status === 'pending').length;

  const handleApprove = (id: string) => {
    mockStorage.approveComment(id);
    setComments(mockStorage.getComments());
    setSuccessMsg('Comment approved & visible on article.');
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleReject = (id: string) => {
    mockStorage.rejectComment(id);
    setComments(mockStorage.getComments());
    setSuccessMsg('Comment moved to pending.');
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleSpam = (id: string) => {
    mockStorage.spamComment(id);
    setComments(mockStorage.getComments());
    setSuccessMsg('Comment flagged as spam.');
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this comment permanently?')) {
      mockStorage.deleteComment(id);
      setComments(mockStorage.getComments());
      setSuccessMsg('Comment deleted.');
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  const filtered = comments.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Blog Comments & Moderation Queue</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Review, approve, or discard reader feedback across technical blog articles.</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs">
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${filter === 'pending' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          <span>Pending</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-gray-950 font-bold text-[10px] rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'approved' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          Approved ({comments.filter(c => c.status === 'approved').length})
        </button>
        <button
          onClick={() => setFilter('spam')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'spam' ? 'bg-red-600/20 text-red-400 border border-red-500/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          Spam ({comments.filter(c => c.status === 'spam').length})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'all' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          All ({comments.length})
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 space-y-3 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white">{c.authorName} <span className="font-normal text-gray-400 font-mono">({c.authorEmail})</span></p>
                <p className="text-[11px] text-blue-400 font-medium mt-0.5">Article: {c.postTitle}</p>
              </div>

              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                c.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                c.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {c.status}
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-white/2 p-3 rounded-xl border border-white/5">
              {c.content}
            </p>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="font-mono text-[10px] text-gray-500">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>

              <div className="flex items-center gap-2">
                {c.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(c.id)}
                    className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                )}
                {c.status !== 'spam' && (
                  <button
                    onClick={() => handleSpam(c.id)}
                    className="px-2.5 py-1 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" /> Mark Spam
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
