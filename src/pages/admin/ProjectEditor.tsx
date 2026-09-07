import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Send, Eye, Star, Globe, GitBranch, Plus, X, 
  Image, Sparkles, Check
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { Project } from '@/types/portfolio';
import { contentPipelineService } from '@/services/contentPipelineService';
import { TelegramApprovalModal } from '@/components/common/TelegramApprovalModal';
import { SocialDraft } from '@/types/automation';

interface ProjectEditorProps {
  projectId?: string; // empty means 'new'
  onNavigate: (route: string) => void;
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({ projectId, onNavigate }) => {
  const isNew = !projectId || projectId === 'new';
  const existing = !isNew ? mockStorage.getProjects().find(p => p.id === projectId) : null;

  const [title, setTitle] = useState(existing?.title || '');
  const [slug, setSlug] = useState(existing?.slug || '');
  const [summary, setSummary] = useState(existing?.summary || '');
  const [caseStudyBody, setCaseStudyBody] = useState(existing?.caseStudyBody || '');
  const [coverImage, setCoverImage] = useState(existing?.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80');
  const [role, setRole] = useState(existing?.role || 'Lead Systems Architect');
  const [client, setClient] = useState(existing?.client || '');
  const [date, setDate] = useState(existing?.date || '2024');
  const [technologies, setTechnologies] = useState<string[]>(existing?.technologies || ['React', 'TypeScript', 'Tailwind CSS']);
  const [newTech, setNewTech] = useState('');
  const [liveUrl, setLiveUrl] = useState(existing?.liveUrl || '');
  const [githubUrl, setGithubUrl] = useState(existing?.githubUrl || '');
  const [featured, setFeatured] = useState(existing?.featured || false);
  const [visibility, setVisibility] = useState<'public' | 'private' | 'password'>(existing?.visibility || 'public');
  const [status, setStatus] = useState<'draft' | 'published'>(existing?.status || 'draft');
  const [metaTitle, setMetaTitle] = useState(existing?.seo.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(existing?.seo.metaDescription || '');

  const [activeDraft, setActiveDraft] = useState<SocialDraft | null>(null);
  const [savedStatus, setSavedStatus] = useState<'Saved' | 'Saving...'>('Saved');

  const handleSave = () => {
    setSavedStatus('Saving...');
    const project: Project = {
      id: existing ? existing.id : `proj-${Date.now()}`,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      title,
      summary,
      caseStudyBody,
      coverImage,
      galleryImages: [coverImage],
      role,
      client,
      date,
      technologies,
      liveUrl,
      githubUrl,
      featured,
      visibility,
      status,
      seo: {
        metaTitle: metaTitle || `${title} — Case Study`,
        metaDescription: metaDescription || summary
      }
    };

    setTimeout(() => {
      mockStorage.saveProject(project);
      setSavedStatus('Saved');
      if (isNew) {
        onNavigate('/admin/projects');
      }
    }, 300);
  };

  const handleShareToLinkedIn = () => {
    const project: Project = {
      id: existing ? existing.id : `proj-${Date.now()}`,
      slug,
      title,
      summary,
      caseStudyBody,
      coverImage,
      galleryImages: [coverImage],
      role,
      client,
      date,
      technologies,
      featured,
      visibility,
      status: 'published',
      seo: { metaTitle, metaDescription }
    };
    const draft = contentPipelineService.generateSocialDraft(project, 'project', 'linkedin');
    setActiveDraft(draft);
  };

  const addTech = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTech = (t: string) => {
    setTechnologies(technologies.filter(item => item !== t));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      {/* Top action bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/projects')}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              {isNew ? 'New Project Case Study' : `Edit: ${title}`}
            </h1>
            <p className="text-[11px] font-mono text-gray-400">Autosave enabled · {savedStatus}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareToLinkedIn}
            className="px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" /> Share to LinkedIn
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Save className="w-4 h-4" /> Save Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Fields (Left 2 Cols) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-[#0e131f] p-5 rounded-2xl border border-white/5 space-y-4">
            <div>
              <label className="text-xs font-mono text-gray-400 uppercase">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  if (isNew) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }}
                placeholder="e.g. Nova Clinics"
                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="nova-clinics"
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-blue-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase">Client / Organization</label>
                <input
                  type="text"
                  value={client}
                  onChange={e => setClient(e.target.value)}
                  placeholder="Nova Healthcare Network"
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 uppercase">Summary (Hook & Outcome)</label>
              <textarea
                rows={2}
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder="Brief high-impact summary for project cards..."
                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 uppercase">Case Study Body</label>
              <textarea
                rows={8}
                value={caseStudyBody}
                onChange={e => setCaseStudyBody(e.target.value)}
                placeholder="Comprehensive technical breakdown, problems solved, architectural decisions, and quantifiable impact..."
                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-gray-200 focus:outline-none focus:border-blue-500 leading-relaxed font-mono"
              />
            </div>
          </div>

          {/* Links & Repository */}
          <div className="bg-[#0e131f] p-5 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Deployment & Code Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-gray-400 flex items-center gap-1.5 mb-1">
                  <Globe className="w-3.5 h-3.5 text-blue-400" /> Live Demo URL
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={e => setLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-gray-400 flex items-center gap-1.5 mb-1">
                  <GitBranch className="w-3.5 h-3.5 text-purple-400" /> GitHub Repository Link
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings (Right Col) */}
        <div className="space-y-5">
          {/* Status & Featured */}
          <div className="bg-[#0e131f] p-5 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Publishing Lifecycle</h3>
            
            <div>
              <label className="text-[11px] text-gray-400 block mb-1">Content Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as 'draft' | 'published')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="draft">Draft (Private in CMS)</option>
                <option value="published">Published (Live on Public Theme)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-gray-400 block mb-1">Visibility Mode</label>
              <select
                value={visibility}
                onChange={e => setVisibility(e.target.value as any)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="public">Public</option>
                <option value="private">Private (Admin only)</option>
                <option value="password">Password-Protected (Section 16.12)</option>
              </select>
            </div>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-white/10"
              />
              <span className="text-xs font-medium text-white flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Featured on Hero
              </span>
            </label>
          </div>

          {/* Technologies Tag Manager */}
          <div className="bg-[#0e131f] p-5 rounded-2xl border border-white/5 space-y-3">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Technologies Used</h3>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((t, idx) => (
                <span key={idx} className="flex items-center gap-1 text-[11px] font-mono bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-lg">
                  {t}
                  <button onClick={() => removeTech(t)} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newTech}
                onChange={e => setNewTech(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Add tech (e.g. FastAPI)..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
              />
              <button
                onClick={addTech}
                className="p-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cover Media */}
          <div className="bg-[#0e131f] p-5 rounded-2xl border border-white/5 space-y-3">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Cover Media</h3>
            <div className="h-32 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            </div>
            <input
              type="text"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="Cover image URL..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Telegram Approval Modal */}
      <TelegramApprovalModal
        draft={activeDraft}
        onClose={() => setActiveDraft(null)}
      />
    </div>
  );
};
