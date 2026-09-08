import React, { useEffect, useState } from 'react';
import { Search, Command, ArrowRight, LayoutDashboard, FolderGit2, FileText, Palette, Sparkles, Send, Bell, Sliders, ExternalLink } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'All Projects', route: '/admin/projects', icon: FolderGit2, category: 'CMS' },
    { label: 'New Project', route: '/admin/projects/new', icon: FolderGit2, category: 'Actions' },
    { label: 'Blog Articles', route: '/admin/blog', icon: FileText, category: 'CMS' },
    { label: 'New Blog Post', route: '/admin/blog/new', icon: FileText, category: 'Actions' },
    { label: 'Visual Site Editor', route: '/admin/visual-editor', icon: Palette, category: 'Design' },
    { label: 'Theme Selector', route: '/admin/themes', icon: Palette, category: 'Design' },
    { label: 'AI Workspace', route: '/admin/ai', icon: Sparkles, category: 'Tools' },
    { label: 'Automations & LinkedIn', route: '/admin/automations', icon: Send, category: 'Growth' },
    { label: 'Site Health & Audit', route: '/admin/site-health', icon: Bell, category: 'System' },
    { label: 'Recruiter Presentation Mode', route: '/admin/recruiter', icon: Sliders, category: 'Recruiter' },
    { label: 'View Public Site', route: '/', icon: ExternalLink, category: 'Live' }
  ];

  const filtered = items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 p-4 animate-in fade-in duration-100">
      <div className="bg-white/95 border border-black/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden text-[#1a1a1a]">
        <div className="flex items-center px-4 py-3 border-b border-black/8">
          <Search className="w-5 h-5 text-[#ad314d] mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command, route, or search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-400 text-[#1a1a1a]"
          />
          <kbd className="text-[10px] font-mono bg-black/5 px-2 py-1 rounded text-gray-500">ESC</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">No matching commands found.</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigate(item.route);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 text-left group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-gray-600 group-hover:bg-[#ad314d]/10 group-hover:text-[#ad314d] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#ad314d] transition-colors">{item.label}</p>
                      <p className="text-[11px] text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
