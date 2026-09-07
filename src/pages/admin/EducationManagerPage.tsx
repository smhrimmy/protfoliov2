import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2, Edit2, Check, X, Building, Calendar, MapPin, Award } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { Education } from '@/types/portfolio';

export const EducationManagerPage: React.FC = () => {
  const [items, setItems] = useState<Education[]>(mockStorage.getEducation());
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleStartAdd = () => {
    setEditingItem({
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: 'Mangalore, India',
      year: '2020 - 2024',
      score: 'GPA: 3.9 / 4.0',
      details: 'Relevant Coursework: Distributed Systems, Advanced Data Structures, Cloud Computing'
    });
    setIsNew(true);
  };

  const handleStartEdit = (item: Education) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.degree.trim() || !editingItem.institution.trim()) return;

    mockStorage.saveEducation(editingItem);
    setItems(mockStorage.getEducation());
    setEditingItem(null);
    setSuccessMsg(isNew ? 'Education record added.' : 'Education record updated.');
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this education record?')) {
      mockStorage.deleteEducation(id);
      setItems(mockStorage.getEducation());
      setSuccessMsg('Record deleted.');
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Education & Academics</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Formal degrees, verified academic institutions, and distinctions.</p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Degree
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(edu => (
          <div key={edu.id} className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 space-y-3 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                <p className="text-xs text-blue-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5" /> {edu.institution}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(edu)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  title="Edit Degree"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-gray-400">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gray-500" /> {edu.year}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gray-500" /> {edu.location}</span>
              {edu.score && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold"><Award className="w-3 h-3" /> {edu.score}</span>
                </>
              )}
            </div>

            {edu.details && (
              <p className="text-xs text-gray-300 leading-relaxed bg-white/2 p-3 rounded-xl border border-white/5">
                {edu.details}
              </p>
            )}
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="text-base font-bold text-white">
                {isNew ? 'Add Education Record' : 'Edit Education Record'}
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
                <label className="text-gray-400 block mb-1 font-mono">Degree Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.degree}
                  onChange={e => setEditingItem({ ...editingItem, degree: e.target.value })}
                  placeholder="e.g. B.Tech in Computer Science & Engineering"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Institution *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.institution}
                    onChange={e => setEditingItem({ ...editingItem, institution: e.target.value })}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Location</label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={e => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="City, Country"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Year Range</label>
                  <input
                    type="text"
                    value={editingItem.year}
                    onChange={e => setEditingItem({ ...editingItem, year: e.target.value })}
                    placeholder="2020 - 2024"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">GPA / Score</label>
                  <input
                    type="text"
                    value={editingItem.score || ''}
                    onChange={e => setEditingItem({ ...editingItem, score: e.target.value })}
                    placeholder="GPA: 3.9 / 4.0"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-mono">Highlights / Coursework</label>
                <textarea
                  rows={3}
                  value={editingItem.details || ''}
                  onChange={e => setEditingItem({ ...editingItem, details: e.target.value })}
                  placeholder="Key accomplishments, leadership roles, or specialized coursework..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 resize-none"
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
