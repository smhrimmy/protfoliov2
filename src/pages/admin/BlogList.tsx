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
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Blog & Articles</h1>
          <p className="text-xs text-gray-400 mt-1">Block-based editorial publishing, revision history, and LinkedIn syndication.</p>
        </div>
        <button
          onClick={() => onNavigate('/admin/blog/new')}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-purple-600/20"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 bg-[#0e131f] p-3 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search articles by title, tags, excerpt..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-[#0e131f] rounded-2xl border border-white/5 overflow-hidden">
        <div className="divide-y divide-white/5">
          {filtered.map(post => (
            <div key={post.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/2 transition-colors">
              <div className="flex items-start gap-4">
                <img src={post.coverImage} alt={post.title} className="w-20 h-16 rounded-xl object-cover shrink-0" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold uppercase">
                      {post.category}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      post.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {post.status}
                    </span>
                    {post.linkedinShared && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> LinkedIn Syndicated
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">{post.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500 pt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTimeMinutes} min read</span>
                    <span>{post.wordCount} words</span>
                    <span>{post.publishedAt || 'Draft'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleShowHistory(post.id)}
                  title="Revision Diff History"
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <History className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  title="Delete"
                  className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate(`/admin/blog/${post.id}/edit`)}
                  className="px-3.5 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Edit className="w-3 h-3" /> Open Editor
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
