import React, { useState, useEffect, useTransition } from 'react';
import { mockStorage } from '@/data/mockStorage';
import { THEME_MANIFESTS } from '@/data/initialThemes';
import { resolveThemePage, getThemeConfig } from '@/themes/registry';

// Loaders
import { AppBootLoader } from '@/components/loaders/AppBootLoader';
import { ThemeSwitchLoader } from '@/components/loaders/ThemeSwitchLoader';

// Admin Shell & Pages
import { AdminShell } from '@/components/admin/AdminShell';
import { Dashboard } from '@/pages/admin/Dashboard';
import { ProjectsList } from '@/pages/admin/ProjectsList';
import { ProjectEditor } from '@/pages/admin/ProjectEditor';
import { BlogList } from '@/pages/admin/BlogList';
import { BlogEditor } from '@/pages/admin/BlogEditor';
import { VisualSiteEditor } from '@/pages/admin/VisualSiteEditor';
import { ThemeSelectorPage } from '@/pages/admin/ThemeSelectorPage';
import { MediaLibrary } from '@/pages/admin/MediaLibrary';
import { AutomationsPage } from '@/pages/admin/AutomationsPage';
import { DesignSystemPage } from '@/pages/admin/DesignSystemPage';
import { SEOSuite } from '@/pages/admin/SEOSuite';
import { AnalyticsPage } from '@/pages/admin/AnalyticsPage';
import { GitHubHub } from '@/pages/admin/GitHubHub';
import { AIWorkspace } from '@/pages/admin/AIWorkspace';
import { SiteHealthPage } from '@/pages/admin/SiteHealthPage';
import { RecruiterModePage } from '@/pages/admin/RecruiterModePage';
import { EducationManagerPage } from '@/pages/admin/EducationManagerPage';
import { CertificationsManagerPage } from '@/pages/admin/CertificationsManagerPage';
import { TestimonialsManagerPage } from '@/pages/admin/TestimonialsManagerPage';
import { PagesCMSPage } from '@/pages/admin/PagesCMSPage';
import { ResumeManagerPage } from '@/pages/admin/ResumeManagerPage';
import { NotificationsCenterPage } from '@/pages/admin/NotificationsCenterPage';
import { BackupExportPage } from '@/pages/admin/BackupExportPage';
import { CommentsModerationPage } from '@/pages/admin/CommentsModerationPage';
import { OwnerProfilePage } from '@/pages/admin/OwnerProfilePage';
import { 
  ExperienceManager, 
  SkillsManager, 
  CredentialsManager, 
  ActivityLog, 
  ProfileSettings 
} from '@/pages/admin/CMSManagerPages';
import { SettingsPage } from '@/pages/admin/SettingsPage';

// Special & Public Pages
import { SharedPreviewPage, PasswordProtectedPage, NotFoundPage } from '@/pages/public/SpecialPages';
import { 
  PublicAboutPage, 
  PublicProjectsListPage, 
  PublicProjectDetailPage, 
  PublicExperiencePage, 
  PublicSkillsPage, 
  PublicResumePage, 
  PublicResumePrintPage, 
  PublicBlogListPage, 
  PublicBlogArticlePage, 
  PublicContactPage, 
  PublicSearchPage, 
  PublicPrivacyPage, 
  PublicTermsPage, 
  PublicTestimonialSubmitPage, 
  PublicRSSFeedPage, 
  PublicOfflinePage 
} from '@/pages/public/PublicSitePages';
import { Theme25ProjectsView } from '@/themes/theme-25-the-wanted-level/Projects';

// Icons
import { Palette, ChevronUp, ChevronDown, ExternalLink, Sparkles, Check } from 'lucide-react';

export function App() {
  const [booting, setBooting] = useState(true);
  const [switchingThemeId, setSwitchingThemeId] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname || '/');
  const queryTheme = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('theme') : null;
  const [activeThemeId, setActiveThemeId] = useState(queryTheme || mockStorage.getActiveTheme());
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [, startTransition] = useTransition();

  // Sync route on popstate
  useEffect(() => {
    const handlePop = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Listen for storage theme changes
  useEffect(() => {
    const unsubscribe = mockStorage.subscribe(() => {
      const stored = mockStorage.getActiveTheme();
      if (stored !== activeThemeId && !switchingThemeId) {
        setSwitchingThemeId(stored);
      }
    });
    return unsubscribe;
  }, [activeThemeId, switchingThemeId]);

  // Navigate helper
  const navigate = (path: string) => {
    startTransition(() => {
      window.history.pushState({}, '', path);
      const cleanPath = path.split('?')[0].split('#')[0] || '/';
      setCurrentRoute(cleanPath);

      const matchTheme = path.match(/[?&]theme=([^&#]+)/);
      if (matchTheme && matchTheme[1]) {
        setActiveThemeId(matchTheme[1]);
      }
      window.scrollTo(0, 0);
    });
  };

  // Change Theme with designed interstitial transition
  const handleSelectTheme = (newThemeId: string) => {
    if (newThemeId === activeThemeId) return;
    setSwitchingThemeId(newThemeId);
  };

  const handleSwitchComplete = () => {
    if (switchingThemeId) {
      mockStorage.setActiveTheme(switchingThemeId);
      setActiveThemeId(switchingThemeId);
      setSwitchingThemeId(null);
    }
  };

  // Boot Loader floor (minimum 600ms)
  if (booting) {
    return <AppBootLoader onComplete={() => setBooting(false)} minDisplayMs={700} />;
  }

  // Interstitial Theme Switcher Loader
  if (switchingThemeId) {
    return <ThemeSwitchLoader themeId={switchingThemeId} onComplete={handleSwitchComplete} />;
  }

  // ==========================================
  // ROUTE DISPATCHER
  // ==========================================

  // 1. Admin Routes (/admin/*)
  if (currentRoute.startsWith('/admin')) {
    let adminContent: React.ReactNode;

    if (currentRoute === '/admin' || currentRoute === '/admin/dashboard') {
      adminContent = <Dashboard onNavigate={navigate} />;
    } else if (currentRoute === '/admin/projects') {
      adminContent = <ProjectsList onNavigate={navigate} />;
    } else if (currentRoute === '/admin/projects/new') {
      adminContent = <ProjectEditor projectId="new" onNavigate={navigate} />;
    } else if (currentRoute.startsWith('/admin/projects/')) {
      const pId = currentRoute.replace('/admin/projects/', '');
      adminContent = <ProjectEditor projectId={pId} onNavigate={navigate} />;
    } else if (currentRoute === '/admin/blog') {
      adminContent = <BlogList onNavigate={navigate} />;
    } else if (currentRoute === '/admin/blog/new') {
      adminContent = <BlogEditor postId="new" onNavigate={navigate} />;
    } else if (currentRoute.startsWith('/admin/blog/')) {
      const bId = currentRoute.replace('/admin/blog/', '');
      adminContent = <BlogEditor postId={bId} onNavigate={navigate} />;
    } else if (currentRoute === '/admin/visual-editor') {
      adminContent = <VisualSiteEditor onNavigate={navigate} />;
    } else if (currentRoute === '/admin/themes') {
      adminContent = <ThemeSelectorPage onNavigate={navigate} onPreviewTheme={handleSelectTheme} />;
    } else if (currentRoute === '/admin/media') {
      adminContent = <MediaLibrary />;
    } else if (currentRoute === '/admin/automations') {
      adminContent = <AutomationsPage />;
    } else if (currentRoute === '/admin/design-system') {
      adminContent = <DesignSystemPage />;
    } else if (currentRoute === '/admin/seo') {
      adminContent = <SEOSuite />;
    } else if (currentRoute === '/admin/analytics') {
      adminContent = <AnalyticsPage />;
    } else if (currentRoute === '/admin/github') {
      adminContent = <GitHubHub />;
    } else if (currentRoute === '/admin/ai' || currentRoute === '/admin/ai-workspace') {
      adminContent = <AIWorkspace />;
    } else if (currentRoute === '/admin/site-health') {
      adminContent = <SiteHealthPage />;
    } else if (currentRoute === '/admin/recruiter') {
      adminContent = <RecruiterModePage onNavigate={navigate} />;
    } else if (currentRoute === '/admin/education') {
      adminContent = <EducationManagerPage />;
    } else if (currentRoute === '/admin/certifications') {
      adminContent = <CertificationsManagerPage />;
    } else if (currentRoute === '/admin/testimonials') {
      adminContent = <TestimonialsManagerPage />;
    } else if (currentRoute === '/admin/pages') {
      adminContent = <PagesCMSPage onNavigate={navigate} />;
    } else if (currentRoute === '/admin/resume') {
      adminContent = <ResumeManagerPage onNavigate={navigate} />;
    } else if (currentRoute === '/admin/notifications') {
      adminContent = <NotificationsCenterPage />;
    } else if (currentRoute === '/admin/backup') {
      adminContent = <BackupExportPage />;
    } else if (currentRoute === '/admin/comments') {
      adminContent = <CommentsModerationPage />;
    } else if (currentRoute === '/admin/profile') {
      adminContent = <OwnerProfilePage />;
    } else if (currentRoute === '/admin/experience') {
      adminContent = <ExperienceManager />;
    } else if (currentRoute === '/admin/skills') {
      adminContent = <SkillsManager />;
    } else if (currentRoute === '/admin/credentials') {
      adminContent = <CredentialsManager />;
    } else if (currentRoute === '/admin/activity') {
      adminContent = <ActivityLog />;
    } else if (currentRoute === '/admin/settings') {
      adminContent = <SettingsPage />;
    } else {
      adminContent = <Dashboard onNavigate={navigate} />;
    }

    return (
      <AdminShell currentRoute={currentRoute} onNavigate={navigate}>
        {adminContent}
      </AdminShell>
    );
  }

  // 2. Special Public Pages
  if (currentRoute.startsWith('/preview/')) {
    const token = currentRoute.replace('/preview/', '');
    return <SharedPreviewPage token={token} onNavigate={navigate} />;
  }

  if (currentRoute === '/protected') {
    return <PasswordProtectedPage onNavigate={navigate} />;
  }

  // 3. Full Public Pages (About, Projects, Blog, Experience, Skills, Resume, Contact, Search, Legal, etc.)
  if (currentRoute === '/about') {
    return <PublicAboutPage onNavigate={navigate} />;
  }
  if (currentRoute === '/projects') {
    if (activeThemeId === 'theme-25-the-wanted-level') {
      return (
        <Theme25ProjectsView
          projects={mockStorage.getProjects()}
          onNavigate={navigate}
        />
      );
    }
    return <PublicProjectsListPage onNavigate={navigate} />;
  }
  if (currentRoute.startsWith('/projects/') || currentRoute.startsWith('/project/')) {
    const param = currentRoute.replace('/projects/', '').replace('/project/', '');
    return <PublicProjectDetailPage onNavigate={navigate} param={param} />;
  }
  if (currentRoute === '/experience') {
    return <PublicExperiencePage onNavigate={navigate} />;
  }
  if (currentRoute === '/skills') {
    return <PublicSkillsPage onNavigate={navigate} />;
  }
  if (currentRoute === '/resume') {
    return <PublicResumePage onNavigate={navigate} />;
  }
  if (currentRoute === '/resume/print') {
    return <PublicResumePrintPage onNavigate={navigate} />;
  }
  if (currentRoute === '/blog') {
    return <PublicBlogListPage onNavigate={navigate} />;
  }
  if (currentRoute.startsWith('/blog/')) {
    const slug = currentRoute.replace('/blog/', '');
    return <PublicBlogArticlePage onNavigate={navigate} param={slug} />;
  }
  if (currentRoute === '/contact') {
    return <PublicContactPage onNavigate={navigate} />;
  }
  if (currentRoute === '/search') {
    return <PublicSearchPage onNavigate={navigate} />;
  }
  if (currentRoute === '/privacy') {
    return <PublicPrivacyPage onNavigate={navigate} />;
  }
  if (currentRoute === '/terms') {
    return <PublicTermsPage onNavigate={navigate} />;
  }
  if (currentRoute === '/testimonials/submit') {
    return <PublicTestimonialSubmitPage onNavigate={navigate} />;
  }
  if (currentRoute === '/rss.xml') {
    return <PublicRSSFeedPage onNavigate={navigate} />;
  }
  if (currentRoute === '/offline') {
    return <PublicOfflinePage onNavigate={navigate} />;
  }

  // 4. Public Portfolio Home (/)
  if (currentRoute === '/' || currentRoute === '/home') {
    const ThemeComponent = resolveThemePage(activeThemeId);
    const themeConfig = getThemeConfig(activeThemeId);
    const currentManifest = THEME_MANIFESTS.find(m => m.id === activeThemeId) || THEME_MANIFESTS[0];

    return (
      <div className="relative min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Render Isolated Theme Page */}
        <ThemeComponent
          identity={mockStorage.getIdentity()}
          projects={mockStorage.getProjects()}
          blogPosts={mockStorage.getPosts()}
          experience={mockStorage.getExperience()}
          skillCategories={mockStorage.getSkills()}
          onNavigate={navigate}
          config={themeConfig}
        />

        {/* Sleek Minimalist Quick Theme Switcher Pill */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
          {/* Expanded 19 Theme Gallery Popover */}
          {switcherOpen && (
            <div className="mb-2 p-2.5 bg-[#0c1017]/95 backdrop-blur-xl border border-white/[0.1] rounded-2xl shadow-2xl w-72 max-h-72 overflow-y-auto space-y-1 font-mono text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="text-[10px] uppercase tracking-wider text-gray-500 px-2 py-1 flex justify-between border-b border-white/[0.06] mb-1">
                <span>Theme Engine</span>
                <span className="text-emerald-400">19 Architectures</span>
              </div>
              {THEME_MANIFESTS.map((t) => {
                const isCurrent = t.id === activeThemeId;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      handleSelectTheme(t.id);
                      setSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] flex items-center justify-between transition-colors ${
                      isCurrent
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold'
                        : 'hover:bg-white/[0.05] text-gray-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-gray-500">#{t.number}</span>
                      <span className="truncate">{t.name}</span>
                    </div>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Floating Pill Trigger */}
          <div className="flex items-center gap-2 bg-[#0c1017]/90 backdrop-blur-md border border-white/[0.12] text-gray-200 rounded-full px-3.5 py-1.5 shadow-xl hover:border-white/[0.2] transition-colors">
            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="flex items-center gap-2 text-xs font-mono hover:text-white transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-400 text-[11px]">THEME {currentManifest.number}:</span>
              <span className="text-white font-semibold text-[11px] max-w-[120px] truncate">{currentManifest.name}</span>
              {switcherOpen ? <ChevronDown className="w-3 h-3 text-gray-400" /> : <ChevronUp className="w-3 h-3 text-gray-400" />}
            </button>

            <span className="h-3 w-[1px] bg-white/[0.12]" />

            <button
              onClick={() => navigate('/admin')}
              className="text-[11px] font-mono text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
              title="Open Admin OS"
            >
              <span>Admin</span>
              <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback 404
  return <NotFoundPage onNavigate={navigate} />;
}

export default App;
