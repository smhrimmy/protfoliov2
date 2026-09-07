import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Globe, Clock, ArrowUpRight } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const sources = [
    { source: 'LinkedIn Direct & Posts', visitors: 1420, percentage: '48%' },
    { source: 'GitHub Repositories', visitors: 780, percentage: '26%' },
    { source: 'Google Search & SEO', visitors: 490, percentage: '16%' },
    { source: 'Direct / Recruiter Links', visitors: 290, percentage: '10%' }
  ];

  const topPages = [
    { path: '/projects/nova-clinics', views: 1840, time: '3m 42s' },
    { path: '/blog/architecting-multi-theme-operating-systems', views: 1420, time: '5m 10s' },
    { path: '/projects/aster-ai', views: 980, time: '2m 55s' },
    { path: '/resume', views: 820, time: '1m 20s' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Analytics & Traffic Intelligence</h1>
          <p className="text-xs text-gray-400 mt-1">Recruiter sessions, traffic attribution, session duration, and top visited case studies.</p>
        </div>

        <div className="flex items-center gap-2 bg-[#0e131f] p-1 rounded-xl border border-white/5 text-xs">
          {['24h', '7d', '30d', 'All'].map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${timeRange === t ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-5">
          <p className="text-xs font-mono text-gray-400 uppercase mb-2">Total Pageviews</p>
          <p className="text-3xl font-bold text-white">4,820</p>
          <span className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +18.4% vs last week</span>
        </div>
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-5">
          <p className="text-xs font-mono text-gray-400 uppercase mb-2">Unique Recruiters / Visitors</p>
          <p className="text-3xl font-bold text-white">1,890</p>
          <span className="text-[11px] font-mono text-blue-400 mt-1 flex items-center gap-1"><Users className="w-3 h-3" /> 84 companies</span>
        </div>
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-5">
          <p className="text-xs font-mono text-gray-400 uppercase mb-2">Avg. Session Duration</p>
          <p className="text-3xl font-bold text-white">3m 14s</p>
          <span className="text-[11px] font-mono text-gray-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> High engagement</span>
        </div>
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-5">
          <p className="text-xs font-mono text-gray-400 uppercase mb-2">Bounce Rate</p>
          <p className="text-3xl font-bold text-white">22.4%</p>
          <span className="text-[11px] font-mono text-emerald-400 mt-1">Excellent retention</span>
        </div>
      </div>

      {/* Interactive Bar Chart Simulation */}
      <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Daily Traffic Volume</h3>
          <span className="text-xs font-mono text-gray-400">Peak: Friday (940 views)</span>
        </div>
        <div className="h-44 flex items-end gap-3 pt-6 px-2">
          {[320, 480, 590, 720, 940, 810, 960].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <div
                className="w-full bg-blue-600/70 group-hover:bg-blue-500 rounded-t-lg transition-all"
                style={{ height: `${(val / 1000) * 100}%` }}
              />
              <span className="text-[10px] font-mono text-gray-500">Day {idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attribution Sources */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Top Attribution Channels</h3>
          <div className="space-y-3">
            {sources.map((s, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{s.source}</span>
                <span className="font-mono text-blue-400">{s.visitors} visits ({s.percentage})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Most Visited Case Studies & Pages</h3>
          <div className="space-y-3">
            {topPages.map((p, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
                <span className="font-mono text-gray-300 truncate max-w-[240px]">{p.path}</span>
                <span className="font-mono text-emerald-400">{p.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
