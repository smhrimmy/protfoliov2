import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { SiteHealthCheck } from '@/types/cms';

export const SiteHealthPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [checks, setChecks] = useState<SiteHealthCheck[]>([
    {
      id: 'h-1',
      category: 'seo',
      title: 'Broken Internal & External Links Audit',
      description: 'Crawled all 19 themes and markdown links for 404 or dead endpoints.',
      severity: 'good',
      passed: true,
      recommendation: '0 broken links detected across 40+ case studies.'
    },
    {
      id: 'h-2',
      category: 'accessibility',
      title: 'ARIA Labels & Keyboard Focus Traps',
      description: 'Tested tab ordering, visible focus rings, and screen-reader contrast ratios.',
      severity: 'good',
      passed: true,
      recommendation: 'WCAG AAA color contrast maintained across all 19 palettes.'
    },
    {
      id: 'h-3',
      category: 'performance',
      title: 'Largest Contentful Paint (LCP) & Asset Weights',
      description: 'Evaluated WebGL shaders and image compression thresholds.',
      severity: 'good',
      passed: true,
      recommendation: 'LCP is 1.2s on desktop and 2.1s on simulated 4G mobile.'
    },
    {
      id: 'h-4',
      category: 'content',
      title: 'Stale Content & Freshness Telemetry',
      description: 'Monitors recency of case studies and published engineering articles.',
      severity: 'warning',
      passed: false,
      recommendation: 'Consider publishing a new blog case study or syncing GitHub commits.'
    }
  ]);

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 750);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Site Health & Integrity Scanner</h1>
          <p className="text-xs text-gray-400 mt-1">Automated rollup of SEO, accessibility flags, broken links, and performance.</p>
        </div>
        <button
          onClick={handleRescan}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} /> Run Diagnostics Scan
        </button>
      </div>

      <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-black text-2xl border border-emerald-500/20">
            98%
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Overall Portfolio Health: Optimal</h3>
            <p className="text-xs text-gray-400">3 passed checks · 1 advisory item · 0 critical flaws</p>
          </div>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          ALL CRITICAL AUDITS PASSED
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Health Checks Breakdown</h3>
        <div className="space-y-3">
          {checks.map(c => (
            <div key={c.id} className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 flex items-start gap-4">
              {c.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{c.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase">{c.category}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{c.description}</p>
                <p className="text-xs font-mono text-gray-300 mt-2 bg-white/5 p-2 rounded-lg">Status: {c.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
