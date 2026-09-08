import React, { useState } from 'react';
import { Search, X, FolderGit2, FileText, ArrowRight } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';

interface ContentSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const ContentSearchModal: React.FC<ContentSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  if (!isOpen) return null;

  const projects = mockStorage.getProjects();
  const posts = mockStorage.getPosts();

  const matchingProjects = query.trim() ? projects.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.summary.toLowerCase().includes(query.toLowerCase()) ||
    p.technologies.some(t => t.toLowerCase().includes(query.toLowerCase()))
  ) : [];

  const matchingPosts = query.trim() ? posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white/95 border border-black/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-[#1a1a1a]">
        <div className="flex items-center px-4 py-3 border-b border-black/8">
          <Search className="w-5 h-5 text-[#ad314d] mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Full-text search across projects, case studies, and blog articles..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-400 text-[#1a1a1a]"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-black p-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <p className="text-center text-xs text-gray-500 py-8 font-mono">
              Type keywords such as "React", "AI", "Nova Clinics", "Triage", or "Three.js"...
            </p>
          )}

          {matchingProjects.length > 0 && (
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2">Projects ({matchingProjects.length})</h4>
              <div className="space-y-2">
                {matchingProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate(`/admin/projects/${p.id}/edit`);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl bg-black/5 hover:bg-black/10 text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FolderGit2 className="w-4 h-4 text-[#ad314d] shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#ad314d] transition-colors">{p.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{p.summary}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingPosts.length > 0 && (
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2">Articles ({matchingPosts.length})</h4>
              <div className="space-y-2">
                {matchingPosts.map(post => (
                  <button
                    key={post.id}
                    onClick={() => {
                      onNavigate(`/admin/blog/${post.id}/edit`);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{post.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && matchingProjects.length === 0 && matchingPosts.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-8">No content matches found for "{query}".</p>
          )}
        </div>
      </div>
    </div>
  );
};
