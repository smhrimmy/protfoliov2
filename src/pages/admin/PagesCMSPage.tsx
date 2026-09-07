import React, { useState } from 'react';
import { FileText, Plus, Trash2, Edit2, Check, X, ExternalLink, Calendar, Eye, Layers } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { CustomPage } from '@/types/portfolio';

interface PagesCMSPageProps {
  onNavigate?: (route: string) => void;
}

export const PagesCMSPage: React.FC<PagesCMSPageProps> = ({ onNavigate }) => {
  const [pages, setPages] = useState<CustomPage[]>(mockStorage.getPages());
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleStartAdd = () => {
    setEditingPage({
      id: `page-${Date.now()}`,
      slug: '',
      title: '',
      metaDescription: '',
      lastModified: new Date().toISOString().split('T')[0],
      status: 'published',
      blocks: [
        {
          id: `pb-${Date.now()}`,
          type: 'paragraph',
          content: 'Add page content here...'
        }
      ]
    });
    setIsNew(true);
  };

  const handleStartEdit = (page: CustomPage) => {
    setEditingPage({ ...page });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage || !editingPage.title.trim() || !editingPage.slug.trim()) return;

    editingPage.lastModified = new Date().toISOString().split('T')[0];
    mockStorage.savePage(editingPage);
    setPages(mockStorage.getPages());
    setEditingPage(null);
    setSuccessMsg(isNew ? 'Page created.' : 'Page updated.');
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this page permanently?')) {
      mockStorage.deletePage(id);
      setPages(mockStorage.getPages());
      setSuccessMsg('Page removed.');
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Standalone Pages CMS</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Manage static and legal pages (About, Privacy, Terms, Colophon).</p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Page
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      <div className="bg-[#0e131f] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
        {pages.map(page => (
          <div key={page.id} className="p-5 flex items-center justify-between hover:bg-white/2 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{page.title}</h3>
                <span className="font-mono text-xs text-indigo-400">/{page.slug}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                  page.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {page.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-1">{page.metaDescription || 'No meta description configured'}</p>
              <p className="text-[10px] font-mono text-gray-500 flex items-center gap-1 pt-1">
                <Calendar className="w-3 h-3" /> Last modified: {page.lastModified}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {onNavigate && (
                <button
                  onClick={() => onNavigate(`/${page.slug}`)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
              )}
              <button
                onClick={() => handleStartEdit(page)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                title="Edit Page"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(page.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                title="Delete Page"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-white/10 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="text-base font-bold text-white">
                {isNew ? 'Create Standalone Page' : `Edit: ${editingPage.title}`}
              </h2>
              <button onClick={() => setEditingPage(null)} className="text-gray-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPage.title}
                    onChange={e => {
                      const title = e.target.value;
                      setEditingPage({
                        ...editingPage,
                        title,
                        slug: isNew ? title.toLowerCase().replace(/\s+/g, '-') : editingPage.slug
                      });
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingPage.slug}
                    onChange={e => setEditingPage({ ...editingPage, slug: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-mono">Meta SEO Description</label>
                <input
                  type="text"
                  value={editingPage.metaDescription || ''}
                  onChange={e => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  placeholder="Summary for search engines and social previews..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-mono">Page Body (Paragraph Block)</label>
                <textarea
                  rows={6}
                  value={typeof editingPage.blocks[0]?.content === 'string' ? editingPage.blocks[0].content : ''}
                  onChange={e => {
                    const updatedBlocks = [...editingPage.blocks];
                    if (updatedBlocks.length > 0) {
                      updatedBlocks[0] = { ...updatedBlocks[0], content: e.target.value };
                    } else {
                      updatedBlocks.push({ id: `pb-${Date.now()}`, type: 'paragraph', content: e.target.value });
                    }
                    setEditingPage({ ...editingPage, blocks: updatedBlocks });
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 font-mono">Status:</label>
                  <select
                    value={editingPage.status}
                    onChange={e => setEditingPage({ ...editingPage, status: e.target.value as any })}
                    className="bg-[#0a0e17] border border-white/10 rounded-lg px-2.5 py-1 text-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingPage(null)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20"
                  >
                    Save Page
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
