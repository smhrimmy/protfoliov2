import React from 'react';
import { 
  LayoutDashboard, FolderGit2, FileText, Palette, Sparkles, Send, 
  Activity, Sliders, Settings, User, Layers, Award, GraduationCap, 
  MessageSquare, Image, ShieldAlert, GitBranch, BarChart3, Search,
  Compass, Eye, Bell, Database, Files, Printer, MessageCircle
} from 'lucide-react';

interface AdminSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentRoute, onNavigate }) => {
  const navSections = [
    {
      label: 'CORE',
      items: [
        { label: 'Dashboard', route: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Recruiter Mode', route: '/admin/recruiter', icon: Sliders },
        { label: 'Site Health', route: '/admin/site-health', icon: Activity },
        { label: 'Notifications', route: '/admin/notifications', icon: Bell },
      ]
    },
    {
      label: 'CONTENT CMS',
      items: [
        { label: 'Projects', route: '/admin/projects', icon: FolderGit2 },
        { label: 'Blog & Articles', route: '/admin/blog', icon: FileText },
        { label: 'Comments Moderation', route: '/admin/comments', icon: MessageCircle },
        { label: 'Pages CMS', route: '/admin/pages', icon: Files },
        { label: 'Experience', route: '/admin/experience', icon: Layers },
        { label: 'Skills', route: '/admin/skills', icon: Compass },
        { label: 'Education', route: '/admin/education', icon: GraduationCap },
        { label: 'Certifications', route: '/admin/certifications', icon: Award },
        { label: 'Testimonials', route: '/admin/testimonials', icon: MessageSquare },
        { label: 'Resume & Print', route: '/admin/resume', icon: Printer },
        { label: 'Media Library', route: '/admin/media', icon: Image },
      ]
    },
    {
      label: 'DESIGN & THEMES',
      items: [
        { label: 'Visual Site Editor', route: '/admin/visual-editor', icon: Eye },
        { label: 'Themes (19 Worlds)', route: '/admin/themes', icon: Palette },
        { label: 'Design System', route: '/admin/design-system', icon: Layers },
      ]
    },
    {
      label: 'SYNC & INTELLIGENCE',
      items: [
        { label: 'AI Workspace', route: '/admin/ai', icon: Sparkles },
        { label: 'Automations & LinkedIn', route: '/admin/automations', icon: Send },
        { label: 'GitHub Hub', route: '/admin/github', icon: GitBranch },
        { label: 'Analytics', route: '/admin/analytics', icon: BarChart3 },
        { label: 'SEO Suite', route: '/admin/seo', icon: Search },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { label: 'Full Site Backup', route: '/admin/backup', icon: Database },
        { label: 'Activity Log', route: '/admin/activity', icon: ShieldAlert },
        { label: 'Settings', route: '/admin/settings', icon: Settings },
        { label: 'Owner Profile', route: '/admin/profile', icon: User },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0a0e17] border-r border-white/5 flex flex-col h-screen shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="font-mono text-sm font-bold text-white">PDL</span>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white leading-tight">PORTFOLIO OS</h2>
            <p className="text-[10px] font-mono text-gray-500">v2.0 · SILVERSTEN</p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((sec, sIdx) => (
          <div key={sIdx}>
            <p className="px-3 text-[10px] font-mono tracking-wider text-gray-500 uppercase mb-2">{sec.label}</p>
            <div className="space-y-0.5">
              {sec.items.map((item, iIdx) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.route || currentRoute.startsWith(item.route + '/');
                return (
                  <button
                    key={iIdx}
                    onClick={() => onNavigate(item.route)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive 
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-white/5 bg-[#070a10]">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
            P
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Prajwal DL</p>
            <p className="text-[10px] text-gray-400 truncate">Systems Architect</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
