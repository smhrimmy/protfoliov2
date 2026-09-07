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

// Icons
import { Palette, ChevronUp, ChevronDown, ExternalLink, Sparkles, Check } from 'lucide-react';

export function App() {
  const [booting, setBooting] = useState(true);
  const [switchingThemeId, setSwitchingThemeId] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname || '/');
  const [activeThemeId, setActiveThemeId] = useState(mockStorage.getActiveTheme());
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
      setCurrentRoute(path);
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
      adminContent = <ProfileSettings />;
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
      <div className="relative min-h-screen">
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

        {/* Floating Quick Theme Switcher Pill (for exploration across all 19 themes) */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-gray-950/90 backdrop-blur-xl border border-gray-800 text-gray-100 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
            {/* Collapsed Bar */}
            <div className="flex items-center space-x-3 px-4 py-2.5">
              <button
                onClick={() => setSwitcherOpen(!switcherOpen)}
                className="flex items-center space-x-2 text-xs font-medium hover:text-blue-400 transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-gray-400">THEME {currentManifest.number}:</span>
                <span className="font-semibold text-white">{currentManifest.name}</span>
                {switcherOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronUp className="w-3.5 h-3.5 text-gray-400" />}
              </button>

              <div className="h-4 w-[1px] bg-gray-800" />

              <button
                onClick={() => navigate('/admin')}
                className="text-xs font-semibold px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 rounded-lg transition-colors flex items-center space-x-1"
              >
                <span>Admin OS</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Expanded 19 Theme Gallery Grid */}
            {switcherOpen && (
              <div className="p-3 border-t border-gray-800/80 max-h-80 overflow-y-auto w-80 space-y-1.5 no-scrollbar">
                <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400 px-2 py-1 flex justify-between">
                  <span>19 Distinct Architectural Themes</span>
                  <span className="text-blue-400">Zero Duplication</span>
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
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        isCurrent
                          ? 'bg-blue-600/20 border border-blue-500/40 text-white font-bold'
                          : 'hover:bg-gray-900 text-gray-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate pr-2">
                        <span className="font-mono text-[10px] text-gray-500">#{t.number}</span>
                        <span className="truncate">{t.name}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback 404
  return <NotFoundPage onNavigate={navigate} />;
}

export default App;
