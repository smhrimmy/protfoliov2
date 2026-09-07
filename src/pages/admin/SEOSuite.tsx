import React, { useState } from 'react';
import { Search, CheckCircle2, AlertCircle, Globe, Share2, RefreshCw } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';

export const SEOSuite: React.FC = () => {
  const [metaTitle, setMetaTitle] = useState('Prajwal DL — AI Automation & Full Stack Systems Architect');
  const [metaDescription, setMetaDescription] = useState('Personal portfolio operating system featuring 19 isolated themes, case studies across healthcare and ecommerce, and agentic workflows.');
  const [score, setScore] = useState(98);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setScore(99);
    }, 600);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-gray-100 font-sans pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SEO Suite & OpenGraph Studio</h1>
          <p className="text-xs text-gray-400 mt-1">Search indexing, meta previews, sitemap generation, and social card audits.</p>
        </div>
        <button
          onClick={handleAudit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} /> Run Live SEO Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Root Metadata Configuration</h3>
            <div>
              <label className="text-xs font-mono text-gray-400 block mb-1">Global Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={e => setMetaTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-gray-400 block mb-1">Global Meta Description</label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={e => setMetaDescription(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Google SERP Preview */}
          <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-3">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Live Google Search Preview</h3>
            <div className="bg-white p-4 rounded-xl text-left font-sans space-y-1">
              <p className="text-gray-500 text-xs">https://silversten.dev</p>
              <p className="text-[#1a0dab] font-medium text-base line-clamp-1">{metaTitle}</p>
              <p className="text-[#4d5156] text-xs leading-relaxed line-clamp-2">{metaDescription}</p>
            </div>
          </div>
        </div>

        {/* Audit Score Breakdown */}
        <div className="space-y-6">
          <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4 text-center">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Overall SEO Health</h3>
            <div className="text-5xl font-black text-emerald-400">{score} / 100</div>
            <p className="text-xs text-gray-400">Canonical tags valid · 0 broken links · OpenGraph tags formatted</p>
          </div>

          <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> robots.txt Valid</span>
              <span>200 OK</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> sitemap.xml Auto-Generated</span>
              <span>19 Routes</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Semantic Headings & Alt Texts</span>
              <span>Passed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
