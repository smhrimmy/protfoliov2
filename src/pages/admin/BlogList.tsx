import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Search, Filter, Calendar, Clock, 
  ExternalLink, Edit, Trash2, Send, History, CheckCircle2
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { BlogPost } from '@/types/portfolio';
import { ContentRevision } from '@/types/cms';
import { RevisionDiffModal } from '@/components/common/RevisionDiffModal';

interface BlogListProps {
  onNavigate: (route: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>(mockStorage.getPosts());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRevision, setSelectedRevision] = useState<ContentRevision | null>(null);

  useEffect(() => {
    const update = () => setPosts(mockStorage.getPosts());
    return mockStorage.subscribe(update);
  }, []);

  const filtered = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete this article?')) {
      mockStorage.deletePost(id);
    }
  };

  const handleShowHistory = (id: string) => {
    const revs = mockStorage.getRevisions(id);
    if (revs.length > 0) {
      setSelectedRevision(revs[0]);
    } else {
      alert('No previous revisions logged for this post yet.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#222222] font-sans pb-28">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
            EDITORIAL ENGINE · ARTICLES & WRITING
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#ad314d]" /> Blog & Editorial CMS
          </h1>
          <p className="text-xs text-[#55555e] mt-1">Block-based editorial publishing, revision history, and LinkedIn syndication.</p>
        </div>
        <button
          onClick={() => onNavigate('/admin/blog/new')}
          className="px-4 py-2.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-black/8 shadow-2xs">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-gray-500 ml-1" />
          <input
            type="text"
            placeholder="Search articles by title, tags, excerpt..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-black/10 rounded-xl px-3 py-1.5 text-xs text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:border-[#ad314d]"
          />
        </div>
      </div>

      <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-black/8 overflow-hidden shadow-2xs">
        <div className="divide-y divide-black/8">
          {filtered.map(post => (
            <div key={post.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/[0.02] transition-colors">
              <div className="flex items-start gap-4 min-w-0">
                <img src={post.coverImage} alt={post.title} className="w-20 h-16 rounded-xl object-cover shrink-0 border border-black/8" />
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-800 font-bold uppercase">
                      {post.category}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      post.status === 'published' ? 'bg-emerald-500/15 text-emerald-800' : 'bg-amber-500/20 text-amber-900'
                    }`}>
                      {post.status}
                    </span>
                    {post.linkedinShared && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> LinkedIn Syndicated
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#1a1a1a] truncate">{post.title}</h3>
                  <p className="text-xs text-[#55555e] line-clamp-1">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#71717a] pt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTimeMinutes} min read</span>
                    <span>{post.wordCount} words</span>
                    <span>{post.publishedAt || 'Draft'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => handleShowHistory(post.id)}
                  title="Revision Diff History"
                  className="p-2 text-gray-600 hover:text-black rounded-lg hover:bg-black/5 transition-colors"
                >
                  <History className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  title="Delete"
                  className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate(`/admin/blog/${post.id}/edit`)}
                  className="px-3.5 py-1.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Edit className="w-3 h-3 text-white" /> Open Editor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RevisionDiffModal
        revision={selectedRevision}
        onClose={() => setSelectedRevision(null)}
        onRestore={(rev) => {
          mockStorage.savePost(rev.snapshot);
          setPosts(mockStorage.getPosts());
        }}
      />
    </div>
  );
};
