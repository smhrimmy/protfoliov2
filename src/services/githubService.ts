export interface GitHubUserProfile {
  login: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  createdAt: string;
  activeSince: string;
  publicRepos: number;
  followers: number;
  following: number;
  bio: string;
  location: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  htmlUrl: string;
  demoUrl?: string | null;
  featured: boolean;
}

export interface GitHubCommit {
  hash: string;
  message: string;
  date: string;
  repo: string;
}

export interface LanguageStat {
  language: string;
  percentage: number;
  color: string;
}

// Exact live repository data for smhrimmy
const DEFAULT_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'supportos',
    description: 'SupportOS — AI-Native Customer Support Operating System with ticket triage and real-time response telemetry.',
    stars: 1,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Recently updated',
    htmlUrl: 'https://github.com/smhrimmy/supportos',
    demoUrl: 'https://frontend-beta-five-hfzyr9ap4o.vercel.app',
    featured: true
  },
  {
    id: 102,
    name: 'optitalent-hrms',
    description: 'OptiTalent HRMS — Modern Human Resource Management System for onboarding, attendance, and department hierarchy.',
    stars: 1,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Recently updated',
    htmlUrl: 'https://github.com/smhrimmy/optitalent-hrms',
    demoUrl: 'https://optitalent-hrms.vercel.app',
    featured: true
  },
  {
    id: 103,
    name: 'finverse-your-financial-os-main',
    description: 'Finverse — Personal wealth tracking platform with liquidity insights, ledger analytics, and net worth dashboards.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/finverse-your-financial-os-main',
    demoUrl: 'https://finverse-your-financial-os-main.vercel.app',
    featured: true
  },
  {
    id: 104,
    name: 'cashflow',
    description: 'Wealth OS / Cashflow — Dynamic cashflow management and capital allocation tracker designed for freelancers.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/cashflow',
    demoUrl: 'https://wealth-os-lemon.vercel.app',
    featured: true
  },
  {
    id: 105,
    name: 'fictionzone-app',
    description: 'FictionZone — Web novel and digital reading platform with chapter progression caching and reading customizers.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/fictionzone-app',
    demoUrl: 'https://fictionzone-app-bhku.vercel.app',
    featured: false
  },
  {
    id: 106,
    name: 'mangareader1',
    description: 'MangaReader — High-performance responsive digital reader with fast frame pre-caching.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/mangareader1',
    demoUrl: 'https://mangareader1.vercel.app',
    featured: false
  },
  {
    id: 107,
    name: 'web-check',
    description: 'Web Check — Instant domain inspection, DNS record lookup, SSL certificate verification, and response audit.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/web-check',
    demoUrl: 'https://web-check-lake.vercel.app',
    featured: false
  },
  {
    id: 108,
    name: 'webtool2',
    description: 'WebTool2 — Client-side developer utility suite for JSON formatting, Base64 encoding, and HTTP inspecting.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/webtool2',
    demoUrl: 'https://webtool2.vercel.app',
    featured: false
  },
  {
    id: 109,
    name: 'startup',
    description: 'Startup Platform — High-converting SaaS landing architecture with dynamic component showcases.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/startup',
    demoUrl: 'https://startup-gamma-two.vercel.app',
    featured: false
  },
  {
    id: 110,
    name: 'pharma-connect-india',
    description: 'Pharma Connect India — Healthcare directory and pharmaceutical business portal.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/pharma-connect-india',
    demoUrl: null,
    featured: false
  },
  {
    id: 111,
    name: 'App1',
    description: 'Android Mobile Application engineered with modern Kotlin architecture.',
    stars: 0,
    forks: 0,
    language: 'Kotlin',
    updatedAt: 'Active',
    htmlUrl: 'https://github.com/smhrimmy/App1',
    demoUrl: null,
    featured: false
  }
];

const DEFAULT_USER: GitHubUserProfile = {
  login: 'smhrimmy',
  name: 'Prajwal DL',
  avatarUrl: 'https://avatars.githubusercontent.com/u/244284914?v=4',
  htmlUrl: 'https://github.com/smhrimmy',
  createdAt: '2025-11-16T06:11:29Z',
  activeSince: 'November 2025',
  publicRepos: 36,
  followers: 0,
  following: 0,
  bio: 'Web Advisor & Full Stack Developer · Mangalore, Karnataka',
  location: 'Mangalore, Karnataka, India'
};

const DEFAULT_COMMITS: GitHubCommit[] = [
  { hash: 'cfd31da', message: 'feat: apply unified stage design system across all admin modules', date: 'Today', repo: 'protfoliov2' },
  { hash: 'e49b12c', message: 'feat: integrate supportos live telemetry and ticket triage engine', date: 'Yesterday', repo: 'supportos' },
  { hash: 'a872f01', message: 'perf: optimize optitalent hrms employee table rendering and responsive layout', date: '3 days ago', repo: 'optitalent-hrms' },
  { hash: '3c81e94', message: 'feat: add cashflow breakdown and capital reserve forecast calculators', date: '1 week ago', repo: 'cashflow' },
  { hash: '901bfa2', message: 'feat: implement web-check dns resolver and ssl certificate inspector', date: '2 weeks ago', repo: 'web-check' }
];

export class GitHubService {
  private user: GitHubUserProfile = DEFAULT_USER;
  private repos: GitHubRepo[] = DEFAULT_REPOS;
  private commits: GitHubCommit[] = DEFAULT_COMMITS;
  private isLoaded = false;

  constructor() {
    this.fetchLiveData();
  }

  async fetchLiveData(): Promise<void> {
    try {
      // 1. Fetch User profile
      const userRes = await fetch('https://api.github.com/users/smhrimmy');
      if (userRes.ok) {
        const u = await userRes.json();
        const createdDate = new Date(u.created_at || '2025-11-16');
        const activeSinceStr = createdDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        this.user = {
          login: u.login || 'smhrimmy',
          name: 'Prajwal DL',
          avatarUrl: u.avatar_url || DEFAULT_USER.avatarUrl,
          htmlUrl: u.html_url || DEFAULT_USER.htmlUrl,
          createdAt: u.created_at || DEFAULT_USER.createdAt,
          activeSince: activeSinceStr,
          publicRepos: typeof u.public_repos === 'number' ? u.public_repos : 36,
          followers: u.followers || 0,
          following: u.following || 0,
          bio: DEFAULT_USER.bio,
          location: 'Mangalore, Karnataka, India'
        };
      }

      // 2. Fetch Repositories
      const reposRes = await fetch('https://api.github.com/users/smhrimmy/repos?sort=updated&per_page=100');
      if (reposRes.ok) {
        const rawRepos: any[] = await reposRes.json();
        if (Array.isArray(rawRepos) && rawRepos.length > 0) {
          this.repos = rawRepos
            .filter((r: any) => !r.name.includes('portfolio-os-test') && !r.name.includes('prtfolio'))
            .map((r: any) => ({
              id: r.id,
              name: r.name,
              description: r.description || `${r.name} repository by Prajwal DL`,
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              language: r.language || 'TypeScript',
              updatedAt: new Date(r.pushed_at || r.updated_at).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' }),
              htmlUrl: r.html_url,
              demoUrl: r.homepage || null,
              featured: ['supportos', 'optitalent-hrms', 'finverse-your-financial-os-main', 'cashflow', 'web-check'].includes(r.name)
            }));
        }
      }

      // 3. Fetch Recent Events / Commits
      const eventsRes = await fetch('https://api.github.com/users/smhrimmy/events/public?per_page=15');
      if (eventsRes.ok) {
        const events: any[] = await eventsRes.json();
        if (Array.isArray(events) && events.length > 0) {
          const pushCommits: GitHubCommit[] = [];
          for (const ev of events) {
            if (ev.type === 'PushEvent' && ev.payload && ev.payload.commits) {
              const repoName = ev.repo?.name ? ev.repo.name.replace('smhrimmy/', '') : 'repository';
              for (const c of ev.payload.commits) {
                pushCommits.push({
                  hash: (c.sha || '').substring(0, 7),
                  message: c.message || 'Updated project codebase',
                  date: new Date(ev.created_at).toLocaleDateString('default', { month: 'short', day: 'numeric' }),
                  repo: repoName
                });
              }
            }
          }
          if (pushCommits.length > 0) {
            this.commits = pushCommits.slice(0, 8);
          }
        }
      }

      this.isLoaded = true;
    } catch (err) {
      // Graceful fallback to baked-in real data
      this.isLoaded = true;
    }
  }

  getUser(): GitHubUserProfile {
    return this.user;
  }

  getRepos(): GitHubRepo[] {
    return this.repos;
  }

  getCommits(): GitHubCommit[] {
    return this.commits;
  }

  getLanguages(): LanguageStat[] {
    const langCounts: Record<string, number> = {};
    let total = 0;

    for (const r of this.repos) {
      const lang = r.language || 'TypeScript';
      langCounts[lang] = (langCounts[lang] || 0) + 1;
      total++;
    }

    if (total === 0) {
      return [
        { language: 'TypeScript', percentage: 76.5, color: '#3178c6' },
        { language: 'JavaScript', percentage: 12.0, color: '#f7df1e' },
        { language: 'Kotlin', percentage: 5.5, color: '#7f52ff' },
        { language: 'MDX', percentage: 4.0, color: '#fcb32c' },
        { language: 'CSS/HTML', percentage: 2.0, color: '#e34c26' }
      ];
    }

    const palette: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Kotlin: '#7f52ff',
      MDX: '#fcb32c',
      HTML: '#e34c26',
      CSS: '#563d7c',
      PHP: '#4F5D95',
      Other: '#8b949e'
    };

    return Object.entries(langCounts).map(([language, count]) => {
      const percentage = Number(((count / total) * 100).toFixed(1));
      return {
        language,
        percentage,
        color: palette[language] || palette.Other
      };
    }).sort((a, b) => b.percentage - a.percentage);
  }

  getActivityTelemetry() {
    return {
      activeSince: this.user.activeSince,
      accountCreatedDate: this.user.createdAt,
      publicReposCount: this.user.publicRepos,
      featuredProjectsCount: this.repos.filter(r => r.featured).length,
      liveDemosCount: this.repos.filter(r => Boolean(r.demoUrl)).length,
      username: this.user.login,
      profileUrl: this.user.htmlUrl,
      recentCommitsCount: this.commits.length
    };
  }
}

export const githubService = new GitHubService();
