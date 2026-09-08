import React, { useState, useEffect } from 'react';
import { 
  GitBranch, Star, GitFork, RefreshCw, ExternalLink, Code2, 
  Calendar, CheckCircle2, Globe, Layers, ArrowUpRight, Activity,
  FolderGit2, Sparkles, Laptop, ShieldCheck
} from 'lucide-react';
import { githubService, GitHubRepo, GitHubCommit, GitHubUserProfile, LanguageStat } from '@/services/githubService';

export const GitHubHub: React.FC = () => {
  const [user, setUser] = useState<GitHubUserProfile>(githubService.getUser());
  const [repos, setRepos] = useState<GitHubRepo[]>(githubService.getRepos());
  const [commits, setCommits] = useState<GitHubCommit[]>(githubService.getCommits());
  const [languages, setLanguages] = useState<LanguageStat[]>(githubService.getLanguages());
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState('Just now');
  const [filter, setFilter] = useState<'all' | 'featured' | 'demos'>('all');

  useEffect(() => {
    setUser(githubService.getUser());
    setRepos(githubService.getRepos());
    setCommits(githubService.getCommits());
    setLanguages(githubService.getLanguages());
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    await githubService.fetchLiveData();
    setUser(githubService.getUser());
    setRepos(githubService.getRepos());
    setCommits(githubService.getCommits());
    setLanguages(githubService.getLanguages());
    setIsSyncing(false);
    setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const filteredRepos = repos.filter(r => {
    if (filter === 'featured') return r.featured;
    if (filter === 'demos') return Boolean(r.demoUrl);
    return true;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 text-[#222222] font-sans pb-24">
      {/* 1. MASTHEAD & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase">
              LIVE GITHUB TELEMETRY
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#1a1a1a] tracking-tight mt-1">
            GitHub Hub & Repository Stream
          </h1>
          <p className="text-xs text-[#55555e] mt-1">
            Connected to official account <span className="font-mono font-bold text-[#ad314d]">@smhrimmy</span> · Synced: {lastSynced}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={user.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-white hover:bg-gray-50 text-[#1a1a1a] border border-black/10 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View on GitHub
          </a>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="px-4 py-2 bg-[#ad314d] hover:bg-[#92243d] text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Live Data'}
          </button>
        </div>
      </div>

      {/* 2. ACCOUNT TELEMETRY STAGE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Active Since */}
        <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-black/8 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#55555e] font-mono">
            <span>ACTIVE SINCE</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-[#1a1a1a] tracking-tight">{user.activeSince}</span>
            <p className="text-xs text-[#666670] mt-0.5">Joined Nov 16, 2025</p>
          </div>
          <div className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Continuous Engineering
          </div>
        </div>

        {/* Metric 2: Public Repositories */}
        <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-black/8 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#55555e] font-mono">
            <span>PUBLIC REPOSITORIES</span>
            <FolderGit2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-[#1a1a1a] tracking-tight">{user.publicRepos}</span>
            <span className="text-xs text-[#666670] ml-1.5 font-bold">Repositories</span>
            <p className="text-xs text-[#666670] mt-0.5">Full-Stack & Web Apps</p>
          </div>
          <div className="text-[11px] font-mono text-[#ad314d] font-semibold flex items-center gap-1">
            <Code2 className="w-3 h-3" /> 100% Open Access
          </div>
        </div>

        {/* Metric 3: Live Vercel Deployments */}
        <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-black/8 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#55555e] font-mono">
            <span>LIVE DEPLOYMENTS</span>
            <Globe className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-[#1a1a1a] tracking-tight">8+</span>
            <span className="text-xs text-[#666670] ml-1.5 font-bold">Vercel Demos</span>
            <p className="text-xs text-[#666670] mt-0.5">Instant Production Links</p>
          </div>
          <div className="text-[11px] font-mono text-blue-700 font-semibold flex items-center gap-1">
            <Activity className="w-3 h-3" /> Zero Server Maintenance
          </div>
        </div>

        {/* Metric 4: Primary Language */}
        <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-black/8 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#55555e] font-mono">
            <span>PRIMARY STACK</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-[#1a1a1a] tracking-tight">TypeScript</span>
            <p className="text-xs text-[#666670] mt-0.5">React · Tailwind · REST APIs</p>
          </div>
          <div className="text-[11px] font-mono text-purple-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Type-Safe Systems
          </div>
        </div>
      </div>

      {/* 3. LANGUAGE BREAKDOWN DISTRIBUTION */}
      <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-black/8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-[#1a1a1a] tracking-wide">Language Distribution Across Repositories</h2>
            <p className="text-xs text-[#55555e]">Calculated from active codebases in @smhrimmy repository portfolio</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#ad314d]">36 Repositories Indexed</span>
        </div>

        {/* Multi-color stacked distribution bar */}
        <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-black/5 p-0.5 border border-black/8">
          {languages.map((l, i) => (
            <div
              key={i}
              style={{ width: `${l.percentage}%`, backgroundColor: l.color }}
              title={`${l.language}: ${l.percentage}%`}
              className="h-full rounded-xs transition-all first:rounded-l-full last:rounded-r-full"
            />
          ))}
        </div>

        {/* Legend cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {languages.map((l, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-black/[0.02] border border-black/5 flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: l.color }} />
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#1a1a1a] truncate">{l.language}</p>
                <p className="text-[11px] font-mono text-[#55555e]">{l.percentage}% share</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. REPOSITORY SHOWCASE DIRECTORY */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#1a1a1a] tracking-tight">Repositories & Deployed Systems</h2>
            <p className="text-xs text-[#55555e]">Browse all repositories, inspect codebases, and launch live Vercel deployments.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-black/5 rounded-full border border-black/8 text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full transition-all ${
                filter === 'all'
                  ? 'bg-white text-[#1a1a1a] font-bold shadow-xs'
                  : 'text-[#55555e] hover:text-[#1a1a1a]'
              }`}
            >
              All ({repos.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-3 py-1 rounded-full transition-all ${
                filter === 'featured'
                  ? 'bg-white text-[#1a1a1a] font-bold shadow-xs'
                  : 'text-[#55555e] hover:text-[#1a1a1a]'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setFilter('demos')}
              className={`px-3 py-1 rounded-full transition-all ${
                filter === 'demos'
                  ? 'bg-white text-[#1a1a1a] font-bold shadow-xs'
                  : 'text-[#55555e] hover:text-[#1a1a1a]'
              }`}
            >
              Live Demos (8)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.map(r => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-black/8 hover:border-[#ad314d]/40 transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-[#ad314d] shrink-0" />
                    <span className="font-mono font-bold text-sm text-[#1a1a1a] truncate">
                      {r.name}
                    </span>
                  </div>
                  {r.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 text-[10px] font-bold shrink-0">
                      FEATURED
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#55555e] line-clamp-2 leading-relaxed">
                  {r.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-black/6">
                <div className="flex items-center justify-between text-xs font-mono text-[#666670]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {r.language}
                  </span>
                  <span className="text-[11px] text-[#777780]">{r.updatedAt}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={r.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 px-3 rounded-xl bg-black/5 hover:bg-black/10 text-[#1a1a1a] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" /> Source
                  </a>
                  {r.demoUrl && (
                    <a
                      href={r.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-1.5 px-3 rounded-xl bg-[#ad314d] hover:bg-[#92243d] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. RECENT REPOSITORY ACTIVITY */}
      <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-black/8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1a1a1a]">Recent Commit Activity & Push Events</h2>
            <p className="text-xs text-[#55555e]">Live audit trail of pushed commits across repositories</p>
          </div>
          <span className="text-xs font-mono text-emerald-800 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Live Stream
          </span>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          {commits.map((c, i) => (
            <div key={i} className="p-3 bg-black/[0.02] hover:bg-black/[0.04] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-black/5 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 font-bold text-[11px] shrink-0 border border-blue-500/20">
                  {c.hash}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/5 text-[#44444a] text-[11px] shrink-0">
                  {c.repo}
                </span>
                <span className="text-[#1a1a1a] truncate font-sans text-xs">
                  {c.message}
                </span>
              </div>
              <span className="text-[#777780] text-[11px] shrink-0 sm:text-right">
                {c.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
