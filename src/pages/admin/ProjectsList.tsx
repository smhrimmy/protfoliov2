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
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Project Management</h1>
          <p className="text-xs text-gray-400 mt-1">Manage case studies, live links, technologies, and draft revisions.</p>
        </div>
        <button
          onClick={() => onNavigate('/admin/projects/new')}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" /> Create New Project
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0e131f] p-3 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search projects by name, summary, tech..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Tech Filter */}
          <select
            value={selectedTech}
            onChange={e => setSelectedTech(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none"
          >
            <option value="all">All Technologies</option>
            {allTechs.map((t, idx) => (
              <option key={idx} value={t}>{t}</option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/5 p-0.5 rounded-xl border border-white/5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Rendering */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-[#0e131f] rounded-2xl border border-white/5">
          <FolderGit2 className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No projects matched your criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(proj => (
            <div key={proj.id} className="rounded-2xl bg-[#0e131f] border border-white/5 overflow-hidden flex flex-col group hover:border-white/15 transition-all">
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {proj.featured && (
                    <span className="bg-amber-500/90 text-black px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black" /> Featured
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                    proj.status === 'published' ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-black'
                  }`}>
                    {proj.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{proj.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{proj.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.technologies.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-gray-500 px-1 py-0.5">
                        +{proj.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShowHistory(proj.id)}
                      title="View Revision Diff History"
                      className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                    >
                      <History className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(proj)}
                      title="Duplicate project"
                      className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      title="Delete project"
                      className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onNavigate(`/admin/projects/${proj.id}/edit`)}
                    className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit className="w-3 h-3" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0e131f] rounded-2xl border border-white/5 overflow-hidden">
          <div className="divide-y divide-white/5">
            {filtered.map(proj => (
              <div key={proj.id} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={proj.coverImage} alt={proj.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        proj.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">{proj.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShowHistory(proj.id)}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                  >
                    <History className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate(`/admin/projects/${proj.id}/edit`)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
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
