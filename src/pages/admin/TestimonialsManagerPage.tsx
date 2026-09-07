import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, Edit2, Check, X, Star, Link, Copy, CheckCircle2, XCircle } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { Testimonial } from '@/types/portfolio';

export const TestimonialsManagerPage: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>(mockStorage.getTestimonials());
  const [activeFilter, setActiveFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filteredItems = items.filter(t => {
    const status = t.status || 'approved';
    if (activeFilter === 'all') return true;
    return status === activeFilter;
  });

  const pendingCount = items.filter(t => t.status === 'pending').length;

  const handleStartAdd = () => {
    setEditingItem({
      id: `test-${Date.now()}`,
      name: '',
      role: '',
      company: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      text: '',
      rating: 5,
      projectRef: 'Enterprise System',
      status: 'approved',
      createdAt: new Date().toISOString().split('T')[0]
    });
    setIsNew(true);
  };

  const handleStartEdit = (item: Testimonial) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim() || !editingItem.text.trim()) return;

    mockStorage.saveTestimonial(editingItem);
    setItems(mockStorage.getTestimonials());
    setEditingItem(null);
    setSuccessMsg(isNew ? 'Testimonial created.' : 'Testimonial updated.');
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleApprove = (id: string) => {
    mockStorage.approveTestimonial(id);
    setItems(mockStorage.getTestimonials());
    setSuccessMsg('Testimonial approved & published.');
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleReject = (id: string) => {
    mockStorage.rejectTestimonial(id);
    setItems(mockStorage.getTestimonials());
    setSuccessMsg('Testimonial rejected.');
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this testimonial permanently?')) {
      mockStorage.deleteTestimonial(id);
      setItems(mockStorage.getTestimonials());
      setSuccessMsg('Testimonial removed.');
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  const copyRequestUrl = () => {
    const url = `${window.location.origin}/testimonials/submit`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Testimonials & Moderation</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Client endorsements, peer recommendations, and incoming submission queue.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRequestModal(true)}
            className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Link className="w-3.5 h-3.5" /> Request Testimonial
          </button>
          <button
            onClick={handleStartAdd}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" /> Add Manual
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${activeFilter === 'all' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          All ({items.length})
        </button>
        <button
          onClick={() => setActiveFilter('approved')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${activeFilter === 'approved' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          Approved ({items.filter(i => (i.status || 'approved') === 'approved').length})
        </button>
        <button
          onClick={() => setActiveFilter('pending')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${activeFilter === 'pending' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          <span>Pending Moderation</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-gray-950 font-bold text-[10px] rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveFilter('rejected')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${activeFilter === 'rejected' ? 'bg-red-600/20 text-red-400 border border-red-500/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          Rejected ({items.filter(i => i.status === 'rejected').length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(t => {
          const status = t.status || 'approved';
          return (
            <div key={t.id} className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 flex flex-col justify-between space-y-4 hover:border-white/10 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border ${
                    status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {status}
                  </span>
                </div>

                <p className="text-xs text-gray-300 italic leading-relaxed">
                  "{t.text}"
                </p>

                {t.projectRef && (
                  <p className="text-[10px] font-mono text-gray-500">
                    Project: <span className="text-gray-400">{t.projectRef}</span>
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{t.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{t.role} · {t.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    {status !== 'approved' && (
                      <button
                        onClick={() => handleApprove(t.id)}
                        className="px-2 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-lg text-[10px] font-medium flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Approve
                      </button>
                    )}
                    {status !== 'rejected' && (
                      <button
                        onClick={() => handleReject(t.id)}
                        className="px-2 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg text-[10px] font-medium flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" /> Reject
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(t)}
                      className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Link className="w-4 h-4 text-emerald-400" /> Shareable Testimonial Link
              </h2>
              <button onClick={() => setShowRequestModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Send this secure link to clients, founders, or engineering peers. Their submitted recommendation will enter your moderation queue before being published live.
            </p>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-emerald-400 truncate">
                {window.location.origin}/testimonials/submit
              </span>
              <button
                onClick={copyRequestUrl}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied' : 'Copy Link'}
              </button>
            </div>

            <div className="bg-white/2 p-3 rounded-xl border border-white/5 text-[11px] text-gray-400 space-y-1">
              <p className="font-bold text-gray-300">Suggested Message:</p>
              <p className="italic">
                "Hey! Could you take 60 seconds to share a short testimonial regarding our collaboration? You can submit it directly here: {window.location.origin}/testimonials/submit"
              </p>
            </div>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="text-base font-bold text-white">
                {isNew ? 'Create Testimonial' : 'Edit Testimonial'}
              </h2>
              <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={e => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.company}
                    onChange={e => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Referenced Project</label>
                  <input
                    type="text"
                    value={editingItem.projectRef || ''}
                    onChange={e => setEditingItem({ ...editingItem, projectRef: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-mono">Avatar Image URL</label>
                <input
                  type="url"
                  value={editingItem.avatar}
                  onChange={e => setEditingItem({ ...editingItem, avatar: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-mono">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.text}
                  onChange={e => setEditingItem({ ...editingItem, text: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Rating (1 to 5)</label>
                  <select
                    value={editingItem.rating}
                    onChange={e => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                    className="w-full bg-[#0a0e17] border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Great)</option>
                    <option value={3}>3 Stars (Good)</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Moderation Status</label>
                  <select
                    value={editingItem.status || 'approved'}
                    onChange={e => setEditingItem({ ...editingItem, status: e.target.value as any })}
                    className="w-full bg-[#0a0e17] border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="approved">Approved (Live)</option>
                    <option value="pending">Pending Review</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
