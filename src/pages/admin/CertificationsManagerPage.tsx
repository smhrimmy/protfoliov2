import React, { useState } from 'react';
import { Award, Plus, Trash2, Edit2, Check, X, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { Certification } from '@/types/portfolio';

export const CertificationsManagerPage: React.FC = () => {
  const [items, setItems] = useState<Certification[]>(mockStorage.getCertifications());
  const [editingItem, setEditingItem] = useState<Certification | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleStartAdd = () => {
    setEditingItem({
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '2024',
      credentialId: '',
      credentialUrl: 'https://credentials.example.com/verify'
    });
    setIsNew(true);
  };

  const handleStartEdit = (item: Certification) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim() || !editingItem.issuer.trim()) return;

    mockStorage.saveCertification(editingItem);
    setItems(mockStorage.getCertifications());
    setEditingItem(null);
    setSuccessMsg(isNew ? 'Certification added.' : 'Certification updated.');
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this certification record?')) {
      mockStorage.deleteCertification(id);
      setItems(mockStorage.getCertifications());
      setSuccessMsg('Certification deleted.');
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Certifications & Licenses</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Verified industry credentials, cloud certifications, and technical accreditations.</p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(cert => (
          <div key={cert.id} className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 space-y-3 hover:border-white/10 transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(cert)}
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white leading-snug">{cert.name}</h3>
                <p className="text-xs text-blue-400 mt-0.5">{cert.issuer}</p>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500 pt-1">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {cert.issueDate}</span>
                {cert.credentialId && <span>ID: {cert.credentialId}</span>}
              </div>
            </div>

            {cert.credentialUrl && (
              <div className="pt-2 border-t border-white/5">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
                >
                  Verify Credential <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="text-base font-bold text-white">
                {isNew ? 'Add Certification' : 'Edit Certification'}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1 font-mono">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect - Professional"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-mono">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  value={editingItem.issuer}
                  onChange={e => setEditingItem({ ...editingItem, issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services (AWS)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Issue Date / Year</label>
                  <input
                    type="text"
                    value={editingItem.issueDate}
                    onChange={e => setEditingItem({ ...editingItem, issueDate: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Credential ID</label>
                  <input
                    type="text"
                    value={editingItem.credentialId || ''}
                    onChange={e => setEditingItem({ ...editingItem, credentialId: e.target.value })}
                    placeholder="e.g. AWS-PSA-10492"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-mono">Verification URL</label>
                <input
                  type="url"
                  value={editingItem.credentialUrl || ''}
                  onChange={e => setEditingItem({ ...editingItem, credentialUrl: e.target.value })}
                  placeholder="https://credly.com/badges/..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
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
                  Save Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
