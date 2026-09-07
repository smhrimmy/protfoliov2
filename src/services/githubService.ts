export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  htmlUrl: string;
  featured: boolean;
}

export interface GitHubCommit {
  hash: string;
  message: string;
  date: string;
  repo: string;
}

export class GitHubService {
  private repos: GitHubRepo[] = [
    {
      id: 1,
      name: 'portfolio-os',
      description: 'Personal portfolio operating system with 19 isolated themes, CMS, and automated syndication.',
      stars: 142,
      forks: 28,
      language: 'TypeScript',
      updatedAt: 'Today',
      htmlUrl: 'https://github.com/prajwaldl/portfolio-os',
      featured: true
    },
    {
      id: 2,
      name: 'agentic-pipeline-engine',
      description: 'Human-in-the-loop autonomous social syndication with Telegram approvals.',
      stars: 89,
      forks: 14,
      language: 'TypeScript',
      updatedAt: '2 days ago',
      htmlUrl: 'https://github.com/prajwaldl/agentic-pipeline-engine',
      featured: true
    },
    {
      id: 3,
      name: 'spatial-screenverse',
      description: 'Browser-based 3D multi-screen canvas and audio visualizer.',
      stars: 215,
      forks: 41,
      language: 'GLSL / Three.js',
      updatedAt: '1 week ago',
      htmlUrl: 'https://github.com/prajwaldl/spatial-screenverse',
      featured: true
    },
    {
      id: 4,
      name: 'doh-edge-sentinel',
      description: 'Ultra-fast DNS-over-HTTPS diagnostics running on Cloudflare Workers.',
      stars: 64,
      forks: 9,
      language: 'Rust / TS',
      updatedAt: '2 weeks ago',
      htmlUrl: 'https://github.com/prajwaldl/doh-edge-sentinel',
      featured: false
    }
  ];

  getRepos(): GitHubRepo[] {
    return this.repos;
  }

  getCommits(): GitHubCommit[] {
    return [
      { hash: '7f9a2b1', message: 'feat: add strict isolation validator to theme registry', date: '4 hours ago', repo: 'portfolio-os' },
      { hash: '3e8c4d2', message: 'perf: optimize Three.js geometry buffers and dispose listeners', date: 'Yesterday', repo: 'spatial-screenverse' },
      { hash: '9b1e0f5', message: 'chore: implement Telegram approval webhook simulator', date: '3 days ago', repo: 'agentic-pipeline-engine' },
      { hash: '1a5d6c8', message: 'fix: resolve DoH fallback timeout on mobile network', date: '5 days ago', repo: 'doh-edge-sentinel' }
    ];
  }

  getLanguages(): { language: string; percentage: number; color: string }[] {
    return [
      { language: 'TypeScript', percentage: 58.4, color: '#3178c6' },
      { language: 'React / TSX', percentage: 22.1, color: '#61dafb' },
      { language: 'Python', percentage: 11.2, color: '#3572A5' },
      { language: 'GLSL / Shaders', percentage: 5.3, color: '#568f3d' },
      { language: 'Rust / Other', percentage: 3.0, color: '#dea584' }
    ];
  }
}

export const githubService = new GitHubService();
