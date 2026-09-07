import React from 'react';
import { LayoutDashboard, FolderGit2, FileText, Palette, Sliders } from 'lucide-react';

interface AdminMobileNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const AdminMobileNav: React.FC<AdminMobileNavProps> = ({ currentRoute, onNavigate }) => {
  const tabs = [
    { label: 'Dash', route: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Projects', route: '/admin/projects', icon: FolderGit2 },
    { label: 'Blog', route: '/admin/blog', icon: FileText },
    { label: 'Themes', route: '/admin/themes', icon: Palette },
    { label: 'Recruiter', route: '/admin/recruiter', icon: Sliders },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0a0e17]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-around z-40 px-2">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = currentRoute === tab.route;
        return (
          <button
            key={idx}
            onClick={() => onNavigate(tab.route)}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
              isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
