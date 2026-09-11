import React, { useState } from 'react';
import { 
  LayoutDashboard, FolderGit2, FileText, Palette, Sliders, Menu, X,
  Layers, Settings, Sparkles, Send, BarChart3, Search, Image, Database,
  Eye, GraduationCap, Award, MessageSquare, Files, Printer, ShieldAlert,
  User, Activity, MessageCircle, Compass, Bell, GitBranch
} from 'lucide-react';

interface AdminMobileNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const AdminMobileNav: React.FC<AdminMobileNavProps> = ({ currentRoute, onNavigate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { label: 'Dash', route: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Projects', route: '/admin/projects', icon: FolderGit2 },
    { label: 'Editor', route: '/admin/visual-editor', icon: Eye },
    { label: 'Themes', route: '/admin/themes', icon: Palette },
  ];

  const fullAdminRoutes = [
    {
      category: 'CORE',
      items: [
        { label: 'Dashboard', route: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Recruiter Mode', route: '/admin/recruiter', icon: Sliders },
        { label: 'Site Health', route: '/admin/site-health', icon: Activity },
        { label: 'Notifications', route: '/admin/notifications', icon: Bell },
        { label: 'Settings', route: '/admin/settings', icon: Settings },
      ]
    },
    {
      category: 'CONTENT CMS',
      items: [
        { label: 'Projects Manager', route: '/admin/projects', icon: FolderGit2 },
        { label: 'Blog & Articles', route: '/admin/blog', icon: FileText },
        { label: 'Comments Moderation', route: '/admin/comments', icon: MessageCircle },
        { label: 'Pages CMS', route: '/admin/pages', icon: Files },
        { label: 'Experience Timeline', route: '/admin/experience', icon: Layers },
        { label: 'Skills Matrix', route: '/admin/skills', icon: Compass },
        { label: 'Education', route: '/admin/education', icon: GraduationCap },
        { label: 'Certifications', route: '/admin/certifications', icon: Award },
        { label: 'Testimonials', route: '/admin/testimonials', icon: MessageSquare },
        { label: 'Resume & Print', route: '/admin/resume', icon: Printer },
        { label: 'Media Library', route: '/admin/media', icon: Image },
      ]
    },
    {
      category: 'DESIGN & INTELLIGENCE',
      items: [
        { label: 'Visual Site Editor', route: '/admin/visual-editor', icon: Eye },
        { label: '23 Themes Gallery', route: '/admin/themes', icon: Palette },
        { label: 'Design System', route: '/admin/design-system', icon: Layers },
        { label: 'AI Workspace', route: '/admin/ai', icon: Sparkles },
        { label: 'Automations & LinkedIn', route: '/admin/automations', icon: Send },
        { label: 'GitHub Hub', route: '/admin/github', icon: GitBranch },
        { label: 'Analytics Telemetry', route: '/admin/analytics', icon: BarChart3 },
        { label: 'SEO Suite', route: '/admin/seo', icon: Search },
      ]
    },
    {
      category: 'SYSTEM & LOGS',
      items: [
        { label: 'Full Site Backup', route: '/admin/backup', icon: Database },
        { label: 'Activity Audit Log', route: '/admin/activity', icon: ShieldAlert },
        { label: 'Owner Profile', route: '/admin/profile', icon: User },
      ]
    }
  ];

  const handleSelectRoute = (route: string) => {
    onNavigate(route);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Fixed Bottom Bar */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#ececeb]/95 backdrop-blur-lg border-t border-black/10 flex items-center justify-around z-40 px-2 select-none"
        aria-label="Mobile Navigation"
      >
        {mainTabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = currentRoute === tab.route;
          return (
            <button
              key={idx}
              onClick={() => handleSelectRoute(tab.route)}
              data-testid={`mobile-nav-${tab.label.toLowerCase()}`}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-[#ad314d] font-bold' : 'text-gray-500 hover:text-black'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#ad314d]' : 'text-gray-500'}`} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}

        {/* More Menu Drawer Trigger */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          data-testid="mobile-nav-more"
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
            drawerOpen ? 'text-[#ad314d] font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <Menu className={`w-5 h-5 mb-0.5 ${drawerOpen ? 'text-[#ad314d]' : 'text-gray-500'}`} />
          <span className="text-[10px]">More</span>
        </button>
      </nav>

      {/* Mobile Full Screen Navigation Sheet */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#ececeb]/98 backdrop-blur-xl flex flex-col p-6 overflow-y-auto animate-in fade-in duration-200 text-[#222222]">
          <div className="flex items-center justify-between pb-4 border-b border-black/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ad314d] to-[#1a1a1a] flex items-center justify-center font-mono font-bold text-xs text-white">
                PDL
              </div>
              <span className="font-bold text-sm text-[#1a1a1a]">All Admin OS Modules</span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-xl bg-black/5 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 py-4 space-y-6">
            {fullAdminRoutes.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{group.category}</p>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item, iIdx) => {
                    const Icon = item.icon;
                    const isActive = currentRoute === item.route;
                    return (
                      <button
                        key={iIdx}
                        onClick={() => handleSelectRoute(item.route)}
                        className={`flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-xl text-left text-[11px] sm:text-xs transition-colors ${
                          isActive 
                            ? 'bg-[#ad314d]/10 text-[#ad314d] border border-[#ad314d]/30 font-bold' 
                            : 'bg-white/85 text-gray-800 hover:bg-white border border-black/8 shadow-2xs'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#ad314d]' : 'text-gray-500'}`} />
                        <span className="truncate font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-black/10 text-center">
            <button
              onClick={() => {
                onNavigate('/');
                setDrawerOpen(false);
              }}
              className="w-full py-3 bg-[#1a1a1a] hover:bg-black text-white rounded-xl text-xs font-bold shadow-sm"
            >
              Exit to Public Site
            </button>
          </div>
        </div>
      )}
    </>
  );
};
