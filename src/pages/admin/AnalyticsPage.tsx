import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Globe, Clock, ArrowUpRight, 
  Smartphone, Monitor, Tablet, Compass, Download, Filter, Eye
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d' | 'all'>('7d');

  const trafficData = {
    '24h': {
      pageviews: '640',
      visitors: '280',
      duration: '3m 48s',
      bounceRate: '19.4%',
      bars: [35, 60, 45, 90, 120, 110, 80, 100]
    },
    '7d': {
      pageviews: '4,820',
      visitors: '1,890',
      duration: '3m 14s',
      bounceRate: '22.4%',
      bars: [320, 480, 590, 720, 940, 810, 960]
    },
    '30d': {
      pageviews: '19,400',
      visitors: '7,650',
      duration: '3m 02s',
      bounceRate: '23.8%',
      bars: [540, 620, 780, 890, 1100, 940, 1050]
    },
    '90d': {
      pageviews: '58,200',
      visitors: '22,400',
      duration: '2m 58s',
      bounceRate: '24.1%',
      bars: [680, 750, 910, 1020, 1250, 1140, 1300]
    },
    'all': {
      pageviews: '142,000',
      visitors: '54,000',
      duration: '3m 10s',
      bounceRate: '23.5%',
      bars: [800, 950, 1100, 1200, 1400, 1350, 1500]
    }
  }[timeRange];

  const sources = [
    { source: 'LinkedIn Direct & Posts', visitors: 1420, percentage: 48, change: '+24%' },
    { source: 'GitHub Repositories', visitors: 780, percentage: 26, change: '+12%' },
    { source: 'Google Search & SEO', visitors: 490, percentage: 16, change: '+8%' },
    { source: 'Direct / Recruiter Bookmarks', visitors: 290, percentage: 10, change: '+4%' }
  ];

  const topPages = [
    { path: '/projects/supportos', title: 'SupportOS — AI Support OS', views: 1840, time: '3m 42s', bounce: '18%' },
    { path: '/projects/optitalent-hrms', title: 'OptiTalent HRMS Workforce', views: 1420, time: '4m 10s', bounce: '14%' },
    { path: '/projects/finverse-financial-os', title: 'Finverse Financial Platform', views: 980, time: '2m 55s', bounce: '21%' },
    { path: '/resume', title: 'Interactive Resume & Print', views: 820, time: '1m 20s', bounce: '12%' },
    { path: '/projects/cashflow-wealth-os', title: 'Wealth OS / Cashflow', views: 640, time: '3m 18s', bounce: '19%' }
  ];

  const countries = [
    { country: 'United States', flag: '🇺🇸', visits: '1,420', percent: '42%' },
    { country: 'India', flag: '🇮🇳', visits: '1,120', percent: '33%' },
    { country: 'Germany', flag: '🇩🇪', visits: '380', percent: '11%' },
    { country: 'United Kingdom', flag: '🇬🇧', visits: '290', percent: '8%' },
    { country: 'Singapore', flag: '🇸🇬', visits: '210', percent: '6%' }
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8 text-[#222222] font-sans pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
            TELEMETRY & ATTRIBUTION · STAGE ENGINE
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#ad314d]" /> Analytics & Recruiter Telemetry
          </h1>
          <p className="text-xs text-[#55555e] mt-1">
            Real-time recruiter sessions, traffic attribution, session duration, and case study engagement.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1.5 bg-black/5 p-1 rounded-full border border-black/10 text-xs">
          {(['24h', '7d', '30d', '90d', 'all'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 rounded-full font-medium uppercase text-[11px] transition-colors ${
                timeRange === t ? 'bg-[#ad314d] text-white font-bold shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* High-Level Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-5">
          <p className="text-xs font-mono text-gray-400 uppercase mb-2">Total Pageviews</p>
          <p className="text-3xl font-black text-white">{trafficData.pageviews}</p>
          <span className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs prev period
          </span>
        </div>

        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-5">
          <p className="text-xs font-mono text-gray-400 uppercase mb-2">Unique Recruiters & Devs</p>
          <p className="text-3xl font-black text-white">{trafficData.visitors}</p>
          <span className="text-[11px] font-mono text-blue-400 mt-1 flex items-center gap-1">
            <Users className="w-3 h-3" /> 84 distinct orgs
          </span>
        </div>

        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-5">
          <p className="text-xs font-mono text-gray-400 uppercase mb-2">Avg Session Duration</p>
          <p className="text-3xl font-black text-white">{trafficData.duration}</p>
          <span className="text-[11px] font-mono text-gray-400 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" /> High engagement rate
          </span>
        </div>

        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-5">
          <p className="text-xs font-mono text-gray-400 uppercase mb-2">Bounce Rate</p>
          <p className="text-3xl font-black text-white">{trafficData.bounceRate}</p>
          <span className="text-[11px] font-mono text-emerald-400 mt-1">Excellent retention</span>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-[#0e131f] border border-white/5 rounded-3xl p-5 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Traffic Volume Over Time</h3>
            <p className="text-xs text-gray-400 mt-0.5">Continuous request volume across active period.</p>
          </div>
          <span className="text-xs font-mono text-[#ad314d] font-bold self-start sm:self-auto">Peak Volume: Day 5</span>
        </div>

        <div className="h-52 flex items-end gap-3 pt-6 px-2">
          {trafficData.bars.map((val, idx) => {
            const maxVal = Math.max(...trafficData.bars);
            const heightPercent = Math.round((val / maxVal) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </div>
                <div
                  className="w-full bg-gradient-to-t from-blue-600/50 to-blue-500 group-hover:to-blue-400 rounded-t-lg transition-all"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-mono text-gray-500">P{idx + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Grid: Traffic Acquisition Sources & Top Visited Case Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Traffic Sources */}
        <div className="lg:col-span-6 bg-[#0e131f] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5">
            Traffic Acquisition Sources
          </h3>

          <div className="space-y-4">
            {sources.map((src, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{src.source}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-gray-400">{src.visitors} visits</span>
                    <span className="text-emerald-400">{src.change}</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${src.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Device Breakdown */}
          <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <Monitor className="w-4 h-4 text-blue-400 mx-auto" />
              <p className="font-bold text-white">68%</p>
              <p className="text-[10px] text-gray-400 font-mono">Desktop</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <Smartphone className="w-4 h-4 text-emerald-400 mx-auto" />
              <p className="font-bold text-white">26%</p>
              <p className="text-[10px] text-gray-400 font-mono">Mobile</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <Tablet className="w-4 h-4 text-purple-400 mx-auto" />
              <p className="font-bold text-white">6%</p>
              <p className="text-[10px] text-gray-400 font-mono">Tablet</p>
            </div>
          </div>
        </div>

        {/* Top Case Studies & Geography */}
        <div className="lg:col-span-6 bg-[#0e131f] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5">
            Top Visited Case Studies
          </h3>

          <div className="divide-y divide-white/5 text-xs">
            {topPages.map((page, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">{page.title}</p>
                  <p className="text-[11px] font-mono text-gray-500 truncate">{page.path}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 font-mono text-right">
                  <div>
                    <p className="text-white font-bold">{page.views}</p>
                    <p className="text-[10px] text-gray-500">views</p>
                  </div>
                  <div>
                    <p className="text-gray-300">{page.time}</p>
                    <p className="text-[10px] text-gray-500">avg time</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Geography */}
          <div className="pt-4 border-t border-white/5">
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">Top Geographic Regions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {countries.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span>{c.flag}</span>
                    <span className="text-gray-300 truncate max-w-[80px]">{c.country}</span>
                  </div>
                  <span className="font-mono text-blue-400 text-[11px] font-bold">{c.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
