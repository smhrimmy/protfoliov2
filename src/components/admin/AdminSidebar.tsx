import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FolderGit2, FileText, Palette, Sparkles, Send, 
  Activity, Sliders, Settings, User, Layers, Award, GraduationCap, 
  MessageSquare, Image, ShieldAlert, GitBranch, BarChart3, Search,
  Compass, Eye, Bell, Database, Files, Printer, MessageCircle,
  ChevronLeft, ChevronRight
} from 'lucide-react';

interface AdminSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentRoute, onNavigate }) => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('pdl_sidebar_collapsed') === 'true';
  });

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('pdl_sidebar_collapsed', String(next));
  };

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
        { label: 'Themes (23 Themes)', route: '/admin/themes', icon: Palette },
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
    <aside 
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-[#0a0e17] border-r border-white/5 flex flex-col h-screen shrink-0 select-none transition-all duration-300 relative z-20`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div 
          onClick={() => onNavigate('/admin/dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Dashboard"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <span className="font-mono text-sm font-bold text-white">PDL</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-sm font-bold tracking-tight text-white leading-tight">PORTFOLIO OS</h2>
              <p className="text-[10px] font-mono text-gray-500 truncate">v2.0 · SILVERSTEN</p>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={toggleCollapsed}
          className="hidden md:flex p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          data-testid="admin-sidebar-toggle"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 no-scrollbar">
        {navSections.map((sec, sIdx) => (
          <div key={sIdx}>
            {!collapsed ? (
              <p className="px-3 text-[10px] font-mono tracking-wider text-gray-500 uppercase mb-2">
                {sec.label}
              </p>
            ) : (
              <div className="w-full border-t border-white/5 my-2" />
            )}
            <div className="space-y-0.5">
              {sec.items.map((item, iIdx) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.route || currentRoute.startsWith(item.route + '/');
                return (
                  <button
                    key={iIdx}
                    onClick={() => onNavigate(item.route)}
                    title={collapsed ? item.label : undefined}
                    data-testid={`admin-nav-${item.route.replace('/admin/', '').replace('/', '-')}`}
                    className={`w-full flex items-center ${
                      collapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2'
                    } rounded-xl text-xs font-medium transition-all ${
                      isActive 
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-white/5 bg-[#070a10]">
        <div 
          onClick={() => onNavigate('/admin/profile')}
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer`}
          title="Owner Profile & Credentials"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
            P
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Prajwal DL</p>
              <p className="text-[10px] text-gray-400 truncate">Systems Architect</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
