import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, Plus, Search, Filter, LayoutGrid, List, 
  ExternalLink, Edit, Trash2, Copy, History, Star
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { Project } from '@/types/portfolio';
import { ContentRevision } from '@/types/cms';
import { RevisionDiffModal } from '@/components/common/RevisionDiffModal';

interface ProjectsListProps {
  onNavigate: (route: string) => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [selectedRevision, setSelectedRevision] = useState<ContentRevision | null>(null);

  useEffect(() => {
    const update = () => setProjects(mockStorage.getProjects());
    return mockStorage.subscribe(update);
  }, []);

  const allTechs = Array.from(new Set(projects.flatMap(p => p.technologies)));

  const filtered = projects.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'all' || p.technologies.includes(selectedTech);
    return matchesQuery && matchesTech;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      mockStorage.deleteProject(id);
    }
  };

  const handleDuplicate = (project: Project) => {
    const duplicated: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      slug: `${project.slug}-copy`,
      title: `${project.title} (Copy)`,
      status: 'draft'
    };
    mockStorage.saveProject(duplicated);
  };

  const handleShowHistory = (id: string) => {
    const revs = mockStorage.getRevisions(id);
    if (revs.length > 0) {
      setSelectedRevision(revs[0]);
    } else {
      alert('No previous revisions logged for this project yet.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#222222] font-sans pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
            CONTENT REPOSITORY · CASE STUDIES
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-[#ad314d]" /> Project Management
          </h1>
          <p className="text-xs text-[#55555e] mt-1">Manage case studies, live links, technologies, and draft revisions.</p>
        </div>
        <button
          onClick={() => onNavigate('/admin/projects/new')}
          className="px-4 py-2.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Project
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-black/8 shadow-2xs">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-gray-500 ml-1" />
          <input
            type="text"
            placeholder="Search projects by name, summary, tech..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-black/10 rounded-xl px-3 py-1.5 text-xs text-[#1a1a1a] placeholder-gray-500 focus:outline-none focus:border-[#ad314d]"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Tech Filter */}
          <select
            value={selectedTech}
            onChange={e => setSelectedTech(e.target.value)}
            className="bg-white border border-black/10 rounded-xl px-3 py-1.5 text-xs text-[#1a1a1a] focus:outline-none"
          >
            <option value="all">All Technologies</option>
            {allTechs.map((t, idx) => (
              <option key={idx} value={t}>{t}</option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-black/5 p-0.5 rounded-xl border border-black/8">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#ad314d] text-white shadow-2xs' : 'text-gray-600 hover:text-black'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#ad314d] text-white shadow-2xs' : 'text-gray-600 hover:text-black'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Rendering */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white/80 backdrop-blur-md rounded-2xl border border-black/8">
          <FolderGit2 className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600 font-medium">No projects matched your criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(proj => (
            <div key={proj.id} className="rounded-2xl bg-white/85 backdrop-blur-md border border-black/8 overflow-hidden flex flex-col group hover:border-black/20 transition-all shadow-2xs hover:shadow-md">
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {proj.featured && (
                    <span className="bg-amber-500 text-black px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 fill-black" /> Featured
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                    proj.status === 'published' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-black'
                  }`}>
                    {proj.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#1a1a1a] mb-1">{proj.title}</h3>
                  <p className="text-xs text-[#55555e] line-clamp-2 leading-relaxed">{proj.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.technologies.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-black/5 text-[#55555e] px-2 py-0.5 rounded-md font-semibold">
                        {t}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-[#888890] px-1 py-0.5">
                        +{proj.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-black/8 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShowHistory(proj.id)}
                      title="View Revision Diff History"
                      className="p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-black/5 transition-colors"
                    >
                      <History className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(proj)}
                      title="Duplicate project"
                      className="p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-black/5 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      title="Delete project"
                      className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onNavigate(`/admin/projects/${proj.id}/edit`)}
                    className="px-3 py-1.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Edit className="w-3 h-3 text-white" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-black/8 overflow-hidden shadow-2xs">
          <div className="divide-y divide-black/8">
            {filtered.map(proj => (
              <div key={proj.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-black/[0.02] transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img src={proj.coverImage} alt={proj.title} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-black/8" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#1a1a1a] truncate">{proj.title}</h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                        proj.status === 'published' ? 'bg-emerald-500/15 text-emerald-800' : 'bg-amber-500/20 text-amber-900'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#55555e] line-clamp-1">{proj.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => handleShowHistory(proj.id)}
                    title="View History"
                    className="p-2 text-gray-600 hover:text-black rounded-lg hover:bg-black/5 transition-colors"
                  >
                    <History className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate(`/admin/projects/${proj.id}/edit`)}
                    className="px-3 py-1.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revision Diff Modal */}
      <RevisionDiffModal
        revision={selectedRevision}
        onClose={() => setSelectedRevision(null)}
        onRestore={(rev) => {
          mockStorage.saveProject(rev.snapshot);
          setProjects(mockStorage.getProjects());
        }}
      />
    </div>
  );
};
