import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminMobileNav } from './AdminMobileNav';
import { CommandPalette } from '@/components/common/CommandPalette';
import { ContentSearchModal } from '@/components/common/ContentSearchModal';
import { ShortcutsHelpModal } from '@/components/common/ShortcutsHelpModal';
import { NotificationDrawer } from '@/components/common/NotificationDrawer';
import { OnboardingTour } from '@/components/common/OnboardingTour';

interface AdminShellProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ currentRoute, onNavigate, children }) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [contentSearchOpen, setContentSearchOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('pdl_tour_completed');
    if (!completed) {
      setShowTour(true);
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setShortcutsOpen(prev => !prev);
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setContentSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="stage-admin-scope flex h-screen bg-[#ececeb] text-[#222222] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <AdminSidebar currentRoute={currentRoute} onNavigate={onNavigate} />
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onOpenCommandPalette={() => setCommandOpen(true)}
          onOpenContentSearch={() => setContentSearchOpen(true)}
          onOpenShortcuts={() => setShortcutsOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
        />

        <main className="stage-admin-scope flex-1 overflow-y-auto pb-20 md:pb-6 bg-[#ececeb] text-[#222222]">
          {children}
        </main>
      </div>

      {/* Mobile Nav */}
      <AdminMobileNav currentRoute={currentRoute} onNavigate={onNavigate} />

      {/* Overlays */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} onNavigate={onNavigate} />
      <ContentSearchModal isOpen={contentSearchOpen} onClose={() => setContentSearchOpen(false)} onNavigate={onNavigate} />
      <ShortcutsHelpModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      <NotificationDrawer isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} onNavigate={onNavigate} />
      {showTour && <OnboardingTour onComplete={() => setShowTour(false)} />}
    </div>
  );
};
