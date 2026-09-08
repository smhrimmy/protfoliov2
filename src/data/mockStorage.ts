import { PortfolioIdentity, Project, BlogPost, Experience, SkillCategory, Education, Certification, Testimonial, CustomPage, BlogComment, SiteBackup } from '@/types/portfolio';
import { initialIdentity, initialProjects, initialBlogPosts, initialExperience, initialSkills, initialEducation, initialCertifications, initialTestimonials, initialCustomPages, initialBlogComments, initialBackups } from './portfolioData';
import { THEME_MANIFESTS } from './initialThemes';
import { ContentRevision, MediaAsset, NotificationItem, SiteHealthCheck } from '@/types/cms';
import { AutomationRule, SocialDraft, AutomationLog } from '@/types/automation';

const STORAGE_KEYS = {
  IDENTITY: 'pdl_identity',
  PROJECTS: 'pdl_projects',
  POSTS: 'pdl_posts',
  EXPERIENCE: 'pdl_experience',
  SKILLS: 'pdl_skills',
  EDUCATION: 'pdl_education',
  CERTIFICATIONS: 'pdl_certifications',
  TESTIMONIALS: 'pdl_testimonials',
  PAGES: 'pdl_custom_pages',
  COMMENTS: 'pdl_blog_comments',
  BACKUPS: 'pdl_site_backups',
  ACTIVE_THEME: 'pdl_active_theme',
  LIVE_THEME: 'pdl_live_theme',
  THEME_OVERRIDES: 'pdl_theme_overrides',
  REVISIONS: 'pdl_revisions',
  MEDIA: 'pdl_media',
  NOTIFICATIONS: 'pdl_notifications',
  AUTOMATIONS: 'pdl_automations',
  DRAFTS: 'pdl_social_drafts',
  AUTOMATION_LOGS: 'pdl_automation_logs',
  SITE_MODE: 'pdl_site_mode', // 'draft' | 'live'
};

// Initial sample media
const initialMediaAssets: MediaAsset[] = [
  {
    id: 'med-1',
    name: 'supportos-hero.webp',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    sizeBytes: 184320,
    dimensions: { width: 1920, height: 1080 },
    altText: 'SupportOS customer support interface mockup',
    folder: 'Projects',
    tags: ['support', 'ui', 'hero'],
    usedIn: [{ entityType: 'project', id: 'proj-1', title: 'SupportOS' }],
    createdAt: '2026-02-10'
  },
  {
    id: 'med-2',
    name: 'optitalent-mockup.webp',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    sizeBytes: 245760,
    dimensions: { width: 1920, height: 1080 },
    altText: 'OptiTalent HRMS workforce management on mobile and desktop',
    folder: 'Projects',
    tags: ['hrms', 'workforce'],
    usedIn: [{ entityType: 'project', id: 'proj-2', title: 'OptiTalent HRMS' }],
    createdAt: '2026-02-14'
  },
  {
    id: 'med-3',
    name: 'avatar-prajwal.webp',
    url: 'https://avatars.githubusercontent.com/u/244284914?v=4',
    sizeBytes: 92160,
    dimensions: { width: 800, height: 800 },
    altText: 'Prajwal DL profile portrait',
    folder: 'General',
    tags: ['profile', 'author'],
    usedIn: [{ entityType: 'identity', id: 'identity', title: 'Prajwal DL' }],
    createdAt: '2026-01-05'
  }
];

// Initial automation rules
const initialAutomations: AutomationRule[] = [
  {
    id: 'auto-1',
    name: 'Blog to LinkedIn Pipeline',
    trigger: 'on_post_publish',
    platform: 'linkedin',
    status: 'connected',
    enabled: true,
    conditions: { featuredOnly: false },
    lastRun: '2026-03-15T10:30:00Z',
    successCount: 12,
    failCount: 0
  },
  {
    id: 'auto-2',
    name: 'New Project Announcement',
    trigger: 'on_project_publish',
    platform: 'twitter',
    status: 'connected',
    enabled: true,
    lastRun: '2026-02-28T14:15:00Z',
    successCount: 8,
    failCount: 0
  },
  {
    id: 'auto-3',
    name: 'GitHub Commit & Star Sync',
    trigger: 'scheduled',
    platform: 'github_sync',
    status: 'connected',
    enabled: true,
    lastRun: '2026-03-18T08:00:00Z',
    successCount: 45,
    failCount: 0
  },
  {
    id: 'auto-4',
    name: 'Dev.to Technical Cross-Post',
    trigger: 'manual',
    platform: 'devto',
    status: 'simulated',
    enabled: false,
    successCount: 4,
    failCount: 0
  }
];

// Initial social approval drafts
const initialSocialDrafts: SocialDraft[] = [
  {
    id: 'draft-1',
    sourceId: 'post-1',
    sourceType: 'post',
    sourceTitle: 'A Practical Guide to DNS Management and Zero-Downtime Website Migrations',
    platform: 'linkedin',
    hookHeadline: 'How to plan DNS transitions, manage TTL thresholds, and migrate websites with zero downtime.',
    summary: 'Practical guide to managing DNS, SSL certificates, and hosting migrations across shared, cloud, and VPS environments.',
    canonicalUrl: 'https://praxel.space/blog/mastering-dns-and-hosting-migrations',
    hashtags: ['#DNS', '#WebDevelopment', '#Hosting', '#WordPress', '#Infrastructure'],
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    status: 'pending_approval',
    createdAt: '2026-03-15T11:00:00Z'
  }
];

// Initial notifications
const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'LinkedIn Draft Ready for Review',
    message: 'A new social draft for "DNS Management and Website Migrations" is waiting in the approval queue.',
    type: 'info',
    timestamp: '10 minutes ago',
    read: false,
    link: '/admin/automations'
  },
  {
    id: 'notif-2',
    title: 'Autosave Completed',
    message: 'SupportOS project was autosaved successfully.',
    type: 'success',
    timestamp: '1 hour ago',
    read: true,
    link: '/admin/projects'
  },
  {
    id: 'notif-3',
    title: 'Site Health Check: 98/100',
    message: 'SEO audit completed. 0 broken links detected, Core Web Vitals all green.',
    type: 'success',
    timestamp: '2 hours ago',
    read: true,
    link: '/admin/site-health'
  }
];

class MockStorageService {
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initDefaults();
  }

  private initDefaults() {
    const STORAGE_VERSION = 'v2.6_resume_sync_final';
    const currentVersion = localStorage.getItem('pdl_storage_sync_ver');
    if (currentVersion !== STORAGE_VERSION) {
      localStorage.setItem(STORAGE_KEYS.IDENTITY, JSON.stringify(initialIdentity));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(initialBlogPosts));
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(initialExperience));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(initialSkills));
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(initialEducation));
      localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(initialCertifications));
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(initialCustomPages));
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(initialBlogComments));
      localStorage.setItem(STORAGE_KEYS.BACKUPS, JSON.stringify(initialBackups));
      localStorage.setItem('pdl_storage_sync_ver', STORAGE_VERSION);
    }

    if (!localStorage.getItem(STORAGE_KEYS.IDENTITY)) {
      localStorage.setItem(STORAGE_KEYS.IDENTITY, JSON.stringify(initialIdentity));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    }
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(initialBlogPosts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EXPERIENCE)) {
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(initialExperience));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(initialSkills));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EDUCATION)) {
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(initialEducation));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(initialCertifications));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAGES)) {
      localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(initialCustomPages));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(initialBlogComments));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BACKUPS)) {
      localStorage.setItem(STORAGE_KEYS.BACKUPS, JSON.stringify(initialBackups));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_THEME)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_THEME, 'theme-01-minimal-editorial');
    }
    if (!localStorage.getItem(STORAGE_KEYS.LIVE_THEME)) {
      localStorage.setItem(STORAGE_KEYS.LIVE_THEME, 'theme-01-minimal-editorial');
    }
    if (!localStorage.getItem(STORAGE_KEYS.MEDIA)) {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(initialMediaAssets));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUTOMATIONS)) {
      localStorage.setItem(STORAGE_KEYS.AUTOMATIONS, JSON.stringify(initialAutomations));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DRAFTS)) {
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(initialSocialDrafts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SITE_MODE)) {
      localStorage.setItem(STORAGE_KEYS.SITE_MODE, 'draft');
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  // --- Identity ---
  getIdentity(): PortfolioIdentity {
    const raw = localStorage.getItem(STORAGE_KEYS.IDENTITY);
    return raw ? JSON.parse(raw) : initialIdentity;
  }
  setIdentity(identity: PortfolioIdentity) {
    localStorage.setItem(STORAGE_KEYS.IDENTITY, JSON.stringify(identity));
    this.notify();
  }

  // --- Projects ---
  getProjects(): Project[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return raw ? JSON.parse(raw) : initialProjects;
  }
  saveProject(project: Project) {
    const projects = this.getProjects();
    const idx = projects.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      // Record revision
      this.recordRevision('project', project.id, `Updated ${project.title}`, projects[idx], project);
      projects[idx] = project;
    } else {
      this.recordRevision('project', project.id, `Created ${project.title}`, null, project);
      projects.unshift(project);
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    this.notify();
  }
  deleteProject(id: string) {
    const projects = this.getProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    this.notify();
  }

  // --- Blog Posts ---
  getPosts(): BlogPost[] {
    const raw = localStorage.getItem(STORAGE_KEYS.POSTS);
    return raw ? JSON.parse(raw) : initialBlogPosts;
  }
  savePost(post: BlogPost) {
    const posts = this.getPosts();
    const idx = posts.findIndex(p => p.id === post.id);
    if (idx >= 0) {
      this.recordRevision('blog', post.id, `Updated ${post.title}`, posts[idx], post);
      posts[idx] = post;
    } else {
      this.recordRevision('blog', post.id, `Created ${post.title}`, null, post);
      posts.unshift(post);
    }
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    this.notify();
  }
  deletePost(id: string) {
    const posts = this.getPosts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    this.notify();
  }

  // --- Experience, Skills, Education, Certifications, Testimonials ---
  getExperience(): Experience[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
    return raw ? JSON.parse(raw) : initialExperience;
  }
  setExperience(exp: Experience[]) {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(exp));
    this.notify();
  }

  getSkills(): SkillCategory[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return raw ? JSON.parse(raw) : initialSkills;
  }
  setSkills(skills: SkillCategory[]) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    this.notify();
  }

  getEducation(): Education[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EDUCATION);
    return raw ? JSON.parse(raw) : initialEducation;
  }
  setEducation(edu: Education[]) {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(edu));
    this.notify();
  }
  saveEducation(item: Education) {
    const list = this.getEducation();
    const idx = list.findIndex(e => e.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    this.setEducation(list);
  }
  deleteEducation(id: string) {
    this.setEducation(this.getEducation().filter(e => e.id !== id));
  }

  getCertifications(): Certification[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
    return raw ? JSON.parse(raw) : initialCertifications;
  }
  setCertifications(certs: Certification[]) {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certs));
    this.notify();
  }
  saveCertification(item: Certification) {
    const list = this.getCertifications();
    const idx = list.findIndex(c => c.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    this.setCertifications(list);
  }
  deleteCertification(id: string) {
    this.setCertifications(this.getCertifications().filter(c => c.id !== id));
  }

  getTestimonials(): Testimonial[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return raw ? JSON.parse(raw) : initialTestimonials;
  }
  setTestimonials(tests: Testimonial[]) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(tests));
    this.notify();
  }
  saveTestimonial(item: Testimonial) {
    const list = this.getTestimonials();
    const idx = list.findIndex(t => t.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    this.setTestimonials(list);
  }
  deleteTestimonial(id: string) {
    this.setTestimonials(this.getTestimonials().filter(t => t.id !== id));
  }
  approveTestimonial(id: string) {
    const list = this.getTestimonials().map(t => t.id === id ? { ...t, status: 'approved' as const } : t);
    this.setTestimonials(list);
  }
  rejectTestimonial(id: string) {
    const list = this.getTestimonials().map(t => t.id === id ? { ...t, status: 'rejected' as const } : t);
    this.setTestimonials(list);
  }

  // --- Pages CMS ---
  getPages(): CustomPage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PAGES);
    return raw ? JSON.parse(raw) : initialCustomPages;
  }
  setPages(pages: CustomPage[]) {
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    this.notify();
  }
  savePage(page: CustomPage) {
    const list = this.getPages();
    const idx = list.findIndex(p => p.id === page.id || p.slug === page.slug);
    if (idx >= 0) list[idx] = page;
    else list.unshift(page);
    this.setPages(list);
  }
  deletePage(id: string) {
    this.setPages(this.getPages().filter(p => p.id !== id));
  }

  // --- Blog Comments & Reactions ---
  getComments(postId?: string): BlogComment[] {
    const raw = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const list: BlogComment[] = raw ? JSON.parse(raw) : initialBlogComments;
    return postId ? list.filter(c => c.postId === postId) : list;
  }
  setComments(comments: BlogComment[]) {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    this.notify();
  }
  saveComment(comment: BlogComment) {
    const list = this.getComments();
    const idx = list.findIndex(c => c.id === comment.id);
    if (idx >= 0) list[idx] = comment;
    else list.unshift(comment);
    this.setComments(list);
  }
  approveComment(id: string) {
    const list = this.getComments().map(c => c.id === id ? { ...c, status: 'approved' as const } : c);
    this.setComments(list);
  }
  rejectComment(id: string) {
    const list = this.getComments().map(c => c.id === id ? { ...c, status: 'pending' as const } : c);
    this.setComments(list);
  }
  spamComment(id: string) {
    const list = this.getComments().map(c => c.id === id ? { ...c, status: 'spam' as const } : c);
    this.setComments(list);
  }
  deleteComment(id: string) {
    this.setComments(this.getComments().filter(c => c.id !== id));
  }

  // --- Backup & Versioned Export ---
  getBackups(): SiteBackup[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BACKUPS);
    return raw ? JSON.parse(raw) : initialBackups;
  }
  setBackups(backups: SiteBackup[]) {
    localStorage.setItem(STORAGE_KEYS.BACKUPS, JSON.stringify(backups));
    this.notify();
  }
  createBackup(note: string = 'Manual snapshot'): SiteBackup {
    const data = this.exportFullJson();
    const backup: SiteBackup = {
      id: `backup-${Date.now()}`,
      timestamp: new Date().toISOString(),
      version: `v2.${this.getBackups().length + 1}.0`,
      sizeKb: Math.round(new Blob([data]).size / 1024),
      note,
      data: JSON.parse(data)
    };
    const list = this.getBackups();
    list.unshift(backup);
    this.setBackups(list);
    return backup;
  }
  deleteBackup(id: string) {
    this.setBackups(this.getBackups().filter(b => b.id !== id));
  }
  exportFullJson(): string {
    const payload: Record<string, any> = {};
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      payload[key] = localStorage.getItem(storageKey);
    });
    return JSON.stringify(payload, null, 2);
  }
  importFullJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
        if (parsed[key]) {
          localStorage.setItem(storageKey, parsed[key]);
        }
      });
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  // --- Theme State (Draft vs Live) ---
  getActiveTheme(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_THEME) || 'theme-01-minimal-editorial';
  }
  setActiveTheme(themeId: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_THEME, themeId);
    this.notify();
  }

  getLiveTheme(): string {
    return localStorage.getItem(STORAGE_KEYS.LIVE_THEME) || 'theme-01-minimal-editorial';
  }
  setLiveTheme(themeId: string) {
    localStorage.setItem(STORAGE_KEYS.LIVE_THEME, themeId);
    this.notify();
  }

  getSiteMode(): 'draft' | 'live' {
    return (localStorage.getItem(STORAGE_KEYS.SITE_MODE) as 'draft' | 'live') || 'draft';
  }
  setSiteMode(mode: 'draft' | 'live') {
    localStorage.setItem(STORAGE_KEYS.SITE_MODE, mode);
    this.notify();
  }

  publishAllToLive() {
    const active = this.getActiveTheme();
    this.setLiveTheme(active);
    this.setSiteMode('live');
    this.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Site Published to Live',
      message: `Active theme "${active}" and all draft revisions are now live.`,
      type: 'success',
      timestamp: 'Just now',
      read: false
    });
    this.notify();
  }

  // --- Revisions & Diff Engine ---
  private recordRevision(entityType: 'project' | 'blog' | 'page' | 'site_content', entityId: string, summary: string, oldObj: any, newObj: any) {
    const revisions = this.getRevisions();
    const oldText = oldObj ? JSON.stringify(oldObj, null, 2) : '';
    const newText = JSON.stringify(newObj, null, 2);

    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    const diffLines: { type: 'add' | 'del' | 'same'; text: string }[] = [];

    let i = 0, j = 0;
    while (i < oldLines.length || j < newLines.length) {
      if (i >= oldLines.length) {
        diffLines.push({ type: 'add', text: newLines[j] });
        j++;
      } else if (j >= newLines.length) {
        diffLines.push({ type: 'del', text: oldLines[i] });
        i++;
      } else if (oldLines[i] === newLines[j]) {
        diffLines.push({ type: 'same', text: oldLines[i] });
        i++;
        j++;
      } else {
        diffLines.push({ type: 'del', text: oldLines[i] });
        diffLines.push({ type: 'add', text: newLines[j] });
        i++;
        j++;
      }
      if (diffLines.length > 50) break; // Keep sample manageable
    }

    const rev: ContentRevision = {
      id: `rev-${Date.now()}`,
      entityId,
      entityType,
      timestamp: new Date().toISOString(),
      author: 'Prajwal DL',
      summary,
      diffLines,
      snapshot: newObj
    };

    revisions.unshift(rev);
    localStorage.setItem(STORAGE_KEYS.REVISIONS, JSON.stringify(revisions.slice(0, 100)));
  }

  getRevisions(entityId?: string): ContentRevision[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REVISIONS);
    const list: ContentRevision[] = raw ? JSON.parse(raw) : [];
    return entityId ? list.filter(r => r.entityId === entityId) : list;
  }

  // --- Media Library ---
  getMedia(): MediaAsset[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return raw ? JSON.parse(raw) : initialMediaAssets;
  }
  saveMedia(asset: MediaAsset) {
    const media = this.getMedia();
    const idx = media.findIndex(m => m.id === asset.id);
    if (idx >= 0) {
      media[idx] = asset;
    } else {
      media.unshift(asset);
    }
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
    this.notify();
  }
  deleteMedia(id: string) {
    const media = this.getMedia().filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
    this.notify();
  }

  // --- Notifications ---
  getNotifications(): NotificationItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : initialNotifications;
  }
  addNotification(notif: NotificationItem) {
    const notifs = this.getNotifications();
    notifs.unshift(notif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    this.notify();
  }
  markNotificationRead(id: string) {
    const notifs = this.getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    this.notify();
  }
  markAllNotificationsRead() {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    this.notify();
  }
  clearNotifications() {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
    this.notify();
  }

  // --- Automations ---
  getAutomations(): AutomationRule[] {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTOMATIONS);
    return raw ? JSON.parse(raw) : initialAutomations;
  }
  saveAutomation(rule: AutomationRule) {
    const rules = this.getAutomations();
    const idx = rules.findIndex(r => r.id === rule.id);
    if (idx >= 0) rules[idx] = rule;
    else rules.unshift(rule);
    localStorage.setItem(STORAGE_KEYS.AUTOMATIONS, JSON.stringify(rules));
    this.notify();
  }

  getSocialDrafts(): SocialDraft[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    return raw ? JSON.parse(raw) : initialSocialDrafts;
  }
  saveSocialDraft(draft: SocialDraft) {
    const drafts = this.getSocialDrafts();
    const idx = drafts.findIndex(d => d.id === draft.id);
    if (idx >= 0) drafts[idx] = draft;
    else drafts.unshift(draft);
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
    this.notify();
  }

  getAutomationLogs(): AutomationLog[] {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTOMATION_LOGS);
    return raw ? JSON.parse(raw) : [
      {
        id: 'log-1',
        ruleId: 'auto-1',
        ruleName: 'Blog to LinkedIn Pipeline',
        platform: 'LinkedIn API v2',
        timestamp: '2024-03-15T11:05:00Z',
        status: 'simulated-success',
        message: 'Draft published to LinkedIn stream simulation.',
        payload: {
          author: 'urn:li:person:prajwaldl',
          text: 'Why most "multi-theme" portfolios fail — and how we achieved strict component isolation across 19 radical designs...',
          visibility: 'PUBLIC'
        }
      }
    ];
  }
  addAutomationLog(log: AutomationLog) {
    const logs = this.getAutomationLogs();
    logs.unshift(log);
    localStorage.setItem(STORAGE_KEYS.AUTOMATION_LOGS, JSON.stringify(logs.slice(0, 50)));
    this.notify();
  }
}

export const mockStorage = new MockStorageService();
