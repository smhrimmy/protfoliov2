import React, { useState } from 'react';
import { GitBranch, Star, GitFork, RefreshCw, ExternalLink, Code2 } from 'lucide-react';
import { githubService, GitHubRepo, GitHubCommit } from '@/services/githubService';

export const GitHubHub: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>(githubService.getRepos());
  const [commits, setCommits] = useState<GitHubCommit[]>(githubService.getCommits());
  const [languages, setLanguages] = useState(githubService.getLanguages());
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('GitHub synchronization completed (simulated). Repositories and commits up to date.');
    }, 700);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">GitHub Hub & Repository Sync</h1>
          <p className="text-xs text-gray-400 mt-1">Open source repositories, languages breakdown, and recent commit telemetry.</p>
        </div>
        <button
          onClick={handleSync}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} /> Sync GitHub Data
        </button>
      </div>

      {/* Language Breakdown Bar */}
      <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Language Distribution</h3>
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-white/5">
          {languages.map((l, i) => (
            <div key={i} style={{ width: `${l.percentage}%`, backgroundColor: l.color }} title={`${l.language}: ${l.percentage}%`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 pt-1">
          {languages.map((l, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-gray-300">{l.language}</span>
              <span className="text-gray-500">{l.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white">Featured Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map(r => (
            <div key={r.id} className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm font-mono text-blue-400">{r.name}</span>
                  <a href={r.htmlUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{r.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-3 border-t border-white/5">
                <span className="text-gray-400">{r.language}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> {r.stars}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3 h-3" /> {r.forks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commit Stream */}
      <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Recent Commit Activity</h3>
        <div className="space-y-2 font-mono text-xs">
          {commits.map((c, i) => (
            <div key={i} className="p-3 bg-white/2 rounded-xl flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-blue-400 font-bold">{c.hash}</span>
                <span className="text-white truncate max-w-md">{c.message}</span>
              </div>
              <span className="text-gray-500 text-[11px] shrink-0">{c.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
