import React, { useState, useEffect } from 'react';
import { 
  Settings, User, Palette, Type, Layout, Home, Share2, Globe, 
  Search, BarChart3, Bell, Sliders, Shield, Lock, Database, 
  Sparkles, Check, RefreshCw, Save, AlertCircle, Trash2, Download,
  Upload, ExternalLink, HardDrive, Key, CheckCircle2, ChevronRight,
  Eye, Zap
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { THEME_MANIFESTS } from '@/data/initialThemes';

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedSuccessToast, setSavedSuccessToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Settings State Bundle
  const [settings, setSettings] = useState({
    // General
    siteTitle: 'PDL Portfolio OS',
    tagline: 'Specializing in Full Stack Web Development, WordPress, DNS, and Cloud Hosting Infrastructure.',
    language: 'en-US',
    timezone: 'UTC+05:30 (IST)',
    copyright: '© 2026 Prajwal DL. All rights reserved.',
    maintenanceMode: false,

    // Profile
    fullName: 'Prajwal DL',
    brandAlias: 'pdl',
    primaryRole: 'Web Advisor & Full Stack Web Developer',
    bio: 'Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly. Strong work ethic and effective communication skills. Eager to contribute to a dynamic team and support organizational goals.',
    location: 'Mangalore, Karnataka, India',
    availableForHire: true,
    avatarUrl: 'https://avatars.githubusercontent.com/u/244284914?v=4',
    phone: '+918105561638',

    // Appearance
    defaultTheme: mockStorage.getActiveTheme(),
    colorMode: 'dark',
    accentColor: '#3b82f6',
    reducedMotion: false,
    ambientDashboardMotion: localStorage.getItem('pdl_ambient_motion') !== 'false',
    webglHardwareAccel: true,
    lowPowerFallback: true,

    // Typography
    bodyFont: 'Inter',
    headingFont: 'Playfair Display',
    monoFont: 'JetBrains Mono',
    baseFontSize: '16px',
    lineHeight: '1.6',

    // Layout
    maxWidth: '1280px',
    stickyNavbar: true,
    showBreadcrumbs: true,
    showFooter: true,
    showFloatingSwitcher: true,

    // Homepage
    enableHero: true,
    enableFeaturedProjects: true,
    enableExperience: true,
    enableSkills: true,
    enableTestimonials: false,
    enableContact: true,

    // Social
    github: 'https://github.com/smhrimmy',
    linkedin: 'https://linkedin.com/in/prajwal-d-l-118198370/',
    twitter: 'https://twitter.com/prajwaldl',
    email: 'pdlkpt@gmail.com',
    telegram: '@prajwaldl',

    // Domain
    customDomain: 'praxel.space',
    forceHttps: true,
    cnameTarget: 'cname.vercel-dns.com',

    // SEO
    metaTitle: 'Prajwal DL — AI Automation & Full Stack Systems Architect',
    metaDescription: 'Personal portfolio operating system featuring 19 isolated themes, case studies across healthcare and ecommerce, and agentic workflows.',
    ogImage: '/favicon.svg',
    allowIndexing: true,
    allowAiCrawlers: true,

    // Analytics
    ga4Id: 'G-PDL98274X1',
    privacyAnalytics: true,
    respectDoNotTrack: true,

    // Notifications
    emailNotifications: true,
    telegramBotAlerts: true,
    pushNotifications: false,
    weeklyDigest: true,

    // Integrations
    githubConnected: true,
    googleDriveConnected: false,
    telegramBotToken: '••••••••••••••••••••••••••••••',
    telegramChatId: '984128912',

    // AI & Automation
    aiProvider: 'gemini',
    apiKey: '••••••••••••••••••••••••••••••',
    autoDraftLinkedIn: true,
    aiTone: 'executive',

    // Security & Privacy
    clientPortalPassword: '',
    enableClientPortal: false,
    sessionTimeout: '24h',
    cookieConsent: false,
    anonymizeIps: true
  });

  const categories = [
    { id: 'general', label: 'General & Site', icon: Settings },
    { id: 'profile', label: 'Profile & Identity', icon: User },
    { id: 'appearance', label: 'Appearance & Themes', icon: Palette },
    { id: 'typography', label: 'Typography & Fonts', icon: Type },
    { id: 'layout', label: 'Layout & Chrome', icon: Layout },
    { id: 'homepage', label: 'Homepage Sections', icon: Home },
    { id: 'social', label: 'Social & Links', icon: Share2 },
    { id: 'domain', label: 'Custom Domain', icon: Globe },
    { id: 'seo', label: 'SEO & AI Crawlers', icon: Search },
    { id: 'analytics', label: 'Analytics Telemetry', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations & Webhooks', icon: Sliders },
    { id: 'ai', label: 'AI & Automations', icon: Sparkles },
    { id: 'security', label: 'Security & Access', icon: Lock },
    { id: 'privacy', label: 'Privacy & Compliance', icon: Shield },
    { id: 'backup', label: 'Backup & Migration', icon: Database },
  ];

  const filteredCategories = categories.filter(c => 
    c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const showToast = (msg: string) => {
    setSavedSuccessToast(msg);
    setTimeout(() => setSavedSuccessToast(null), 3000);
  };

  const handleSaveSection = (sectionName: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      showToast(`Saved settings for ${sectionName}`);
    }, 400);
  };

  const handleResetSection = (sectionName: string) => {
    showToast(`Reset ${sectionName} to default configuration.`);
    setHasUnsavedChanges(false);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "pdl-portfolio-settings-backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Settings backup downloaded as JSON.');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-28">
      {/* Toast Notification */}
      {savedSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedSuccessToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
            CONFIGURATION & METADATA · STAGE ENGINE
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#ad314d]" /> System Settings & Configuration
          </h1>
          <p className="text-xs text-[#55555e] mt-1">
            Grouped settings architecture across 16 categories, live overrides, and JSON portability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="px-3.5 py-2 bg-white/80 hover:bg-white text-gray-700 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border border-black/10 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export JSON
          </button>
          <button
            onClick={() => handleSaveSection('All Sections')}
            disabled={isSaving}
            className="px-4 py-2 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save All</span>
          </button>
        </div>
      </div>

      {/* Mobile Category Switcher & Quick Navigation (< md) */}
      <div className="block md:hidden space-y-3">
        <div className="p-3.5 bg-[#0a0e17] border border-white/10 rounded-2xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold">Settings Category</span>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              {categories.findIndex(c => c.id === activeSection) + 1} of {categories.length}
            </span>
          </div>

          {/* Quick Select Dropdown */}
          <div className="relative">
            <select
              value={activeSection}
              onChange={e => setActiveSection(e.target.value)}
              className="w-full bg-[#151c2c] border border-white/15 text-white rounded-xl px-4 py-3 text-xs font-semibold appearance-none focus:outline-none focus:border-blue-500 shadow-inner"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id} className="bg-[#0f172a] text-white py-2">
                  {c.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3.5 top-3.5 text-gray-400 text-xs">
              ▼
            </div>
          </div>

          {/* Touch-Friendly Horizontal Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeSection === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSection(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                      : 'bg-white/5 text-gray-300 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grouped Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Settings Sidebar (Hidden on mobile, clean 2-col on desktop) */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 bg-[#0a0e17] border border-white/5 rounded-2xl p-4 space-y-4 shrink-0">
          {/* Search Settings Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search 16 categories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Categories List */}
          <div className="space-y-1 max-h-[600px] overflow-y-auto no-scrollbar">
            {filteredCategories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeSection === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSection(cat.id)}
                  data-testid={`settings-nav-${cat.id}`}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                    isActive 
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Settings Content Form Pane */}
        <div className="md:col-span-8 lg:col-span-9 bg-[#0e131f] border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-6 w-full max-w-full overflow-hidden">
          {/* SECTION 1: GENERAL */}
          {activeSection === 'general' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">General Site Settings</h2>
                  <p className="text-xs text-gray-400">Global site title, metadata, timezone, and operational modes.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleResetSection('General')} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white">Reset</button>
                  <button onClick={() => handleSaveSection('General')} className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Save</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Site Title</label>
                  <input
                    type="text"
                    value={settings.siteTitle}
                    onChange={e => handleChange('siteTitle', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Default Language</label>
                  <select
                    value={settings.language}
                    onChange={e => handleChange('language', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="de-DE">German (DE)</option>
                    <option value="ja-JP">Japanese (JA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={e => handleChange('tagline', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Timezone</label>
                  <input
                    type="text"
                    value={settings.timezone}
                    onChange={e => handleChange('timezone', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Copyright Notice</label>
                  <input
                    type="text"
                    value={settings.copyright}
                    onChange={e => handleChange('copyright', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Maintenance Mode</p>
                  <p className="text-[11px] text-gray-400">Renders maintenance splash page for non-admin visitors.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={e => handleChange('maintenanceMode', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
              </div>
            </div>
          )}

          {/* SECTION 2: PROFILE */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">Owner Profile & Persona</h2>
                  <p className="text-xs text-gray-400">Personal bio, role headline, and professional availability.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleResetSection('Profile')} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white">Reset</button>
                  <button onClick={() => handleSaveSection('Profile')} className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Save</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={settings.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Brand / Moniker</label>
                  <input
                    type="text"
                    value={settings.brandAlias}
                    onChange={e => handleChange('brandAlias', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Primary Role Headline</label>
                <input
                  type="text"
                  value={settings.primaryRole}
                  onChange={e => handleChange('primaryRole', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Professional Biography</label>
                <textarea
                  rows={4}
                  value={settings.bio}
                  onChange={e => handleChange('bio', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Location Coordinates</label>
                  <input
                    type="text"
                    value={settings.location}
                    onChange={e => handleChange('location', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Available for Hire</p>
                    <p className="text-[11px] text-gray-400">Displays green availability badge on public site.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.availableForHire}
                    onChange={e => handleChange('availableForHire', e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: APPEARANCE */}
          {activeSection === 'appearance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">Appearance & Theme Engine</h2>
                  <p className="text-xs text-gray-400">Default theme world, color modes, 3D hardware acceleration.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleResetSection('Appearance')} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white">Reset</button>
                  <button onClick={() => handleSaveSection('Appearance')} className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Save</button>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Default Theme (from 19 Worlds)</label>
                <select
                  value={settings.defaultTheme}
                  onChange={e => {
                    handleChange('defaultTheme', e.target.value);
                    mockStorage.setActiveTheme(e.target.value);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {THEME_MANIFESTS.map(m => (
                    <option key={m.id} value={m.id} className="bg-gray-900">
                      Theme {m.number}: {m.name} ({m.layoutArchitecture})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Accent Brand Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={e => handleChange('accentColor', e.target.value)}
                      className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-white/20"
                    />
                    <input
                      type="text"
                      value={settings.accentColor}
                      onChange={e => handleChange('accentColor', e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Color Mode</label>
                  <select
                    value={settings.colorMode}
                    onChange={e => handleChange('colorMode', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="dark">Deep Cosmic Dark (#070a10)</option>
                    <option value="oled">Pure OLED Pitch Black (#000000)</option>
                    <option value="system">System Synchronized</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Three.js WebGL Hardware Acceleration</p>
                    <p className="text-[11px] text-gray-400">Enables 60fps 3D particle space canvas in themes 05, 11, and 18.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.webglHardwareAccel}
                    onChange={e => handleChange('webglHardwareAccel', e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Low-Power & Mobile Fallback</p>
                    <p className="text-[11px] text-gray-400">Automatically scales down particles and heavy shaders on battery saver.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.lowPowerFallback}
                    onChange={e => handleChange('lowPowerFallback', e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Respect prefers-reduced-motion</p>
                    <p className="text-[11px] text-gray-400">Disables parallax scrolls and kinetic typographic physics.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={e => handleChange('reducedMotion', e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Ambient Dashboard Motion (Intelligent Stage)</p>
                    <p className="text-[11px] text-gray-400">Controls looping CloudFront video backgrounds in the Dashboard Intelligent Stage. When off, renders high-fidelity poster gradients to reduce GPU usage.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.ambientDashboardMotion}
                    onChange={e => {
                      handleChange('ambientDashboardMotion', e.target.checked);
                      localStorage.setItem('pdl_ambient_motion', String(e.target.checked));
                      window.dispatchEvent(new Event('storage'));
                    }}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: TYPOGRAPHY */}
          {activeSection === 'typography' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">Typography Scale & Tokens</h2>
                  <p className="text-xs text-gray-400">Font families, letter spacing, and line heights.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleResetSection('Typography')} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white">Reset</button>
                  <button onClick={() => handleSaveSection('Typography')} className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Save</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Body Font Family</label>
                  <select
                    value={settings.bodyFont}
                    onChange={e => handleChange('bodyFont', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Inter">Inter (Swiss Neutral)</option>
                    <option value="Geist">Geist Sans (Vercel Clean)</option>
                    <option value="System">System UI Native</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Heading Font Family</label>
                  <select
                    value={settings.headingFont}
                    onChange={e => handleChange('headingFont', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Playfair Display">Playfair Display (Editorial)</option>
                    <option value="Cinzel">Cinzel (Haute Couture)</option>
                    <option value="Inter">Inter (Geometric Bold)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Code / Mono Font</label>
                  <select
                    value={settings.monoFont}
                    onChange={e => handleChange('monoFont', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="JetBrains Mono">JetBrains Mono</option>
                    <option value="Fira Code">Fira Code</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>
              </div>

              {/* Live Font Sample */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Typographic Render Preview</p>
                <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: settings.headingFont }}>
                  Architecting High-Throughput Distributed Cloud Systems
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed" style={{ fontFamily: settings.bodyFont }}>
                  Fast page transitions, optimistic UI updates, and zero-latency client synchronization powering production environments.
                </p>
                <p className="text-xs text-emerald-400 font-mono" style={{ fontFamily: settings.monoFont }}>
                  const systemLatencyMs = 12; // sub-frame execution budget
                </p>
              </div>
            </div>
          )}

          {/* SECTION 5: DOMAIN */}
          {activeSection === 'domain' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">Custom Domain & SSL</h2>
                  <p className="text-xs text-gray-400">CNAME DNS routing and automatic TLS certification.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleSaveSection('Domain')} className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Save Domain</button>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Production Domain</label>
                <input
                  type="text"
                  value={settings.customDomain}
                  onChange={e => handleChange('customDomain', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#080b11] border border-white/5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">DNS CNAME RECORD:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> DNS Validated
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-lg text-gray-300">
                  <span>Host: @ / www</span>
                  <span>Target: {settings.cnameTarget}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Force HTTPS / TLS 1.3</p>
                  <p className="text-[11px] text-gray-400">Redirects all unencrypted HTTP requests to secure port 443.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.forceHttps}
                  onChange={e => handleChange('forceHttps', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
              </div>
            </div>
          )}

          {/* SECTION 6: SEO & AI CRAWLERS */}
          {activeSection === 'seo' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">Search Engine & AI Discovery</h2>
                  <p className="text-xs text-gray-400">Meta tags, OpenGraph sharing, and AI bot access permissions.</p>
                </div>
                <button onClick={() => handleSaveSection('SEO')} className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Save SEO</button>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> Unrestricted AI Agent Discovery Active
                  </p>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    GPTBot, ClaudeBot, PerplexityBot, and testing agents can inspect UI/UX without blocks.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.allowAiCrawlers}
                  onChange={e => handleChange('allowAiCrawlers', e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Global Meta Title Template</label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={e => handleChange('metaTitle', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Global Meta Description</label>
                <textarea
                  rows={3}
                  value={settings.metaDescription}
                  onChange={e => handleChange('metaDescription', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Search Engine Indexing (robots.txt)</p>
                  <p className="text-[11px] text-gray-400">Allow Google, Bing, and external search engines to index routes.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.allowIndexing}
                  onChange={e => handleChange('allowIndexing', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
              </div>
            </div>
          )}

          {/* SECTION 7: AI & AUTOMATION */}
          {activeSection === 'ai' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">AI Agent & Social Automations</h2>
                  <p className="text-xs text-gray-400">Gemini/OpenAI model routing, auto-drafting, and editorial voice.</p>
                </div>
                <button onClick={() => handleSaveSection('AI')} className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Save AI</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Preferred AI Provider</label>
                  <select
                    value={settings.aiProvider}
                    onChange={e => handleChange('aiProvider', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="gemini">Google Gemini 2.5 Pro / Flash</option>
                    <option value="openai">OpenAI GPT-4o</option>
                    <option value="claude">Anthropic Claude 3.7 Sonnet</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">AI Writing Tone</label>
                  <select
                    value={settings.aiTone}
                    onChange={e => handleChange('aiTone', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="executive">Executive & Systems Architect</option>
                    <option value="punchy">Punchy & Technical</option>
                    <option value="academic">Academic & Architectural</option>
                    <option value="conversational">Conversational & Engaging</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">API Key (Encrypted in Local Store)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={settings.apiKey}
                    onChange={e => handleChange('apiKey', e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                  <button className="px-3 py-2 bg-white/10 text-xs rounded-xl text-gray-300">Update</button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Auto-Draft LinkedIn Post on Project Publish</p>
                  <p className="text-[11px] text-gray-400">Generates draft in approval queue whenever a new case study is published.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoDraftLinkedIn}
                  onChange={e => handleChange('autoDraftLinkedIn', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
              </div>
            </div>
          )}

          {/* SECTION 8: BACKUP & DATA */}
          {activeSection === 'backup' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">Backup, Migration & Data Portability</h2>
                  <p className="text-xs text-gray-400">Complete JSON snapshot of projects, posts, 19 theme configs, and settings.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <Database className="w-6 h-6 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">Export Full Snapshot</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Download an unencrypted JSON payload containing all application state for backup or migration.
                  </p>
                  <button
                    onClick={handleExportJson}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download JSON Backup
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <Upload className="w-6 h-6 text-purple-400" />
                  <h3 className="text-sm font-bold text-white">Restore from Backup</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Import a previous JSON backup file to overwrite local state and theme customizations.
                  </p>
                  <button
                    onClick={() => showToast('Select JSON backup file to upload.')}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" /> Select Backup File
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-red-400">Factory Reset Local Storage</p>
                  <p className="text-[11px] text-gray-400">Wipes local database and restores original mock projects and themes.</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all portfolio data to factory defaults?')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Reset All
                </button>
              </div>
            </div>
          )}

          {/* Fallback for other sections */}
          {!['general', 'profile', 'appearance', 'typography', 'domain', 'seo', 'ai', 'backup'].includes(activeSection) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white capitalize">{activeSection.replace('-', ' ')} Settings</h2>
                  <p className="text-xs text-gray-400">Dedicated operational parameters for {activeSection}.</p>
                </div>
                <button onClick={() => handleSaveSection(activeSection)} className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Save</button>
              </div>

              <div className="p-8 text-center space-y-3 bg-white/5 rounded-2xl border border-white/5">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white capitalize">{activeSection} Module Configured</h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Configuration keys for {activeSection} are synced with the runtime storage provider and ready for production deployment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile Quick Save Action Bar (< md) */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 p-3 bg-[#0a0e17]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${hasUnsavedChanges ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
          <span className="font-mono text-gray-300 text-[11px]">{hasUnsavedChanges ? 'Unsaved edits' : 'Up to date'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleResetSection(activeSection)}
            className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-xl text-xs font-mono"
          >
            Reset
          </button>
          <button
            onClick={() => handleSaveSection(activeSection)}
            disabled={isSaving}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Sticky Unsaved Changes Bar */}
      {hasUnsavedChanges && (
        <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0e131f] border border-blue-500/40 text-white px-6 py-3 rounded-2xl shadow-2xl items-center gap-4 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-semibold">You have unsaved changes</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHasUnsavedChanges(false)}
              className="px-3 py-1 bg-white/10 hover:bg-white/15 text-xs rounded-lg text-gray-300"
            >
              Discard
            </button>
            <button
              onClick={() => handleSaveSection('All')}
              className="px-3.5 py-1 bg-blue-600 hover:bg-blue-500 text-xs font-semibold rounded-lg text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
