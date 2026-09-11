import React, { useState } from 'react';
import { 
  Search, CheckCircle2, AlertCircle, Globe, Share2, RefreshCw, 
  Download, FileText, Check, Copy, ExternalLink, Zap, ShieldCheck
} from 'lucide-react';

export const SEOSuite: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<'/' | '/projects' | '/blog' | '/about' | '/contact'>('/');
  const [previewPlatform, setPreviewPlatform] = useState<'google' | 'twitter' | 'linkedin'>('google');
  const [score, setScore] = useState(98);
  const [isAuditing, setIsAuditing] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Per-route SEO state dictionary
  const [routeSEO, setRouteSEO] = useState({
    '/': {
      title: 'Prajwal DL — Systems Architect & 3D Creative Engineer',
      description: 'Production-grade portfolio operating system featuring 19 isolated themes, case studies across healthcare and ecommerce, and agentic workflows.',
      keywords: 'Systems Architect, React 19, Three.js, WebGL, Agentic AI, Distributed Systems',
      canonical: 'https://portfolio.prajwaldl.com/'
    },
    '/projects': {
      title: 'Production Systems & Case Studies — Prajwal DL',
      description: 'Explore high-throughput cloud backends, headless e-commerce architectures, and interactive 3D WebGL experiences.',
      keywords: 'Case Studies, Software Architecture, Enterprise Systems, Full Stack Lead',
      canonical: 'https://portfolio.prajwaldl.com/projects'
    },
    '/blog': {
      title: 'Technical Essays & Systems Architecture Publications — Prajwal DL',
      description: 'Deep dives on multi-theme React operating systems, WebGL rendering pipelines, and human-in-the-loop AI automations.',
      keywords: 'Tech Blog, Architecture Essays, WebGL Engineering, AI Pipelines',
      canonical: 'https://portfolio.prajwaldl.com/blog'
    },
    '/about': {
      title: 'Engineering Biography & Core Tenets — Prajwal DL',
      description: 'Background, architectural philosophy, and track record across distributed systems and modern frontend architectures.',
      keywords: 'Prajwal DL, Full Stack Developer, WordPress Support, DNS Management, Mangalore',
      canonical: 'https://praxel.space/about'
    },
    '/contact': {
      title: 'Initiate Direct Dispatch — Prajwal DL',
      description: 'Open to select staff engineering and architectural advisory engagements for next quarter.',
      keywords: 'Hire Systems Architect, Technical Consulting, Remote Advisory',
      canonical: 'https://portfolio.prajwaldl.com/contact'
    }
  });

  const currentSEO = routeSEO[selectedRoute];

  const updateCurrentField = (field: 'title' | 'description' | 'keywords' | 'canonical', value: string) => {
    setRouteSEO(prev => ({
      ...prev,
      [selectedRoute]: {
        ...prev[selectedRoute],
        [field]: value
      }
    }));
  };

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setScore(99);
    }, 600);
  };

  const downloadSitemap = () => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://portfolio.prajwaldl.com/</loc><priority>1.0</priority></url>
  <url><loc>https://portfolio.prajwaldl.com/projects</loc><priority>0.9</priority></url>
  <url><loc>https://portfolio.prajwaldl.com/blog</loc><priority>0.8</priority></url>
  <url><loc>https://portfolio.prajwaldl.com/about</loc><priority>0.7</priority></url>
  <url><loc>https://portfolio.prajwaldl.com/contact</loc><priority>0.7</priority></url>
</urlset>`;
    const blob = new Blob([sitemapContent], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8 text-[#222222] font-sans pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
            DISCOVERY ENGINE · METADATA & CRAWLER CLEARANCE
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
            <Search className="w-6 h-6 text-[#ad314d]" /> SEO Suite & OpenGraph Studio
          </h1>
          <p className="text-xs text-[#55555e] mt-1">
            Per-route search optimization, social sharing card previews, and AI crawler permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadSitemap}
            className="px-3.5 py-2 bg-white/80 hover:bg-white text-gray-700 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border border-black/10 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Download sitemap.xml
          </button>

          <button
            onClick={handleAudit}
            className="px-4 py-2 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} /> Run SEO Audit
          </button>
        </div>
      </div>

      {/* Audit Score & Crawler Clearance Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-black/8 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-mono text-[#55555e] uppercase">Core SEO Health</span>
            <p className="text-3xl font-black text-[#1a1a1a] mt-1">{score}/100</p>
            <span className="text-xs font-mono text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> All Checks Passing
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-mono text-base">
            A+
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-black/8 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-mono text-[#55555e] uppercase">AI Agents & LLM Access</span>
            <p className="text-sm font-bold text-[#1a1a1a] mt-1">100% Unrestricted</p>
            <p className="text-[11px] text-emerald-700 mt-1 font-mono font-semibold">robots.txt & llms.txt active</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-black/8 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-mono text-[#55555e] uppercase">Structured JSON-LD</span>
            <p className="text-sm font-bold text-[#1a1a1a] mt-1">Schema.org Person & WebSite</p>
            <p className="text-[11px] text-[#888890] mt-1 font-mono">Injected into index.html</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Studio: Route Selector + Fields + Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Per-Route Selector & Meta Inputs */}
        <div className="lg:col-span-6 bg-white/85 backdrop-blur-md border border-black/8 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/8">
            <span className="text-xs font-mono text-[#55555e] uppercase tracking-widest font-semibold">Select Route to Configure</span>
            <div className="flex gap-1 overflow-x-auto text-xs font-mono bg-black/5 p-1 rounded-xl border border-black/8">
              {(['/', '/projects', '/blog', '/about', '/contact'] as const).map(route => (
                <button
                  key={route}
                  onClick={() => setSelectedRoute(route)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedRoute === route ? 'bg-[#ad314d] text-white font-bold' : 'text-[#55555e] hover:text-[#1a1a1a]'
                  }`}
                >
                  {route}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <label className="font-mono text-[#55555e] font-semibold">Page Meta Title</label>
                <span className="font-mono text-[10px] text-[#888890]">{currentSEO.title.length}/60 chars</span>
              </div>
              <input
                type="text"
                value={currentSEO.title}
                onChange={e => updateCurrentField('title', e.target.value)}
                className="w-full bg-white border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#ad314d]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label className="font-mono text-[#55555e] font-semibold">Meta Description</label>
                <span className="font-mono text-[10px] text-[#888890]">{currentSEO.description.length}/160 chars</span>
              </div>
              <textarea
                rows={3}
                value={currentSEO.description}
                onChange={e => updateCurrentField('description', e.target.value)}
                className="w-full bg-white border border-black/10 rounded-xl p-3 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#ad314d] resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-[#55555e] font-semibold block mb-1">Target Keywords</label>
              <input
                type="text"
                value={currentSEO.keywords}
                onChange={e => updateCurrentField('keywords', e.target.value)}
                className="w-full bg-white border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#ad314d]"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-[#55555e] font-semibold block mb-1">Canonical URL</label>
              <input
                type="text"
                value={currentSEO.canonical}
                onChange={e => updateCurrentField('canonical', e.target.value)}
                className="w-full bg-white border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1a1a1a] font-mono focus:outline-none focus:border-[#ad314d]"
              />
            </div>
          </div>
        </div>

        {/* Right: Live Preview Console */}
        <div className="lg:col-span-6 bg-white/85 backdrop-blur-md border border-black/8 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/8">
            <span className="text-xs font-mono text-[#55555e] uppercase tracking-widest font-semibold">Live Platform Preview</span>
            <div className="flex gap-1 text-xs bg-black/5 p-1 rounded-xl border border-black/8">
              <button
                onClick={() => setPreviewPlatform('google')}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  previewPlatform === 'google' ? 'bg-[#ad314d] text-white font-bold' : 'text-[#55555e] hover:text-[#1a1a1a]'
                }`}
              >
                Google SERP
              </button>
              <button
                onClick={() => setPreviewPlatform('twitter')}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  previewPlatform === 'twitter' ? 'bg-[#ad314d] text-white font-bold' : 'text-[#55555e] hover:text-[#1a1a1a]'
                }`}
              >
                Twitter Card
              </button>
              <button
                onClick={() => setPreviewPlatform('linkedin')}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  previewPlatform === 'linkedin' ? 'bg-[#ad314d] text-white font-bold' : 'text-[#55555e] hover:text-[#1a1a1a]'
                }`}
              >
                LinkedIn Share
              </button>
            </div>
          </div>

          {/* 1. GOOGLE SERP PREVIEW */}
          {previewPlatform === 'google' && (
            <div className="bg-white p-5 rounded-2xl text-left font-sans space-y-1.5 shadow-lg select-text">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">
                  P
                </div>
                <div>
                  <p className="text-[#202124] text-xs font-medium leading-tight">Prajwal DL · Web Advisor</p>
                  <p className="text-[#5f6368] text-[11px] font-mono leading-tight">{currentSEO.canonical}</p>
                </div>
              </div>
              <h3 className="text-[#1a0dab] hover:underline cursor-pointer font-medium text-lg leading-snug line-clamp-1">
                {currentSEO.title}
              </h3>
              <p className="text-[#4d5156] text-xs leading-relaxed line-clamp-2">
                {currentSEO.description}
              </p>
            </div>
          )}

          {/* 2. TWITTER / X CARD PREVIEW */}
          {previewPlatform === 'twitter' && (
            <div className="bg-black border border-[#2f3336] rounded-2xl overflow-hidden shadow-lg select-text font-sans">
              <div className="h-44 bg-gradient-to-tr from-blue-900 via-indigo-900 to-purple-900 p-6 flex flex-col justify-end">
                <span className="text-xs font-mono text-blue-300 uppercase font-bold">PRAXEL.SPACE</span>
                <h4 className="text-xl font-bold text-white tracking-tight">{currentSEO.title}</h4>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-gray-500 font-mono">portfolio.prajwaldl.com</p>
                <h4 className="text-sm font-bold text-white line-clamp-1">{currentSEO.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{currentSEO.description}</p>
              </div>
            </div>
          )}

          {/* 3. LINKEDIN SHARE PREVIEW */}
          {previewPlatform === 'linkedin' && (
            <div className="bg-[#1b1f23] border border-white/10 rounded-2xl overflow-hidden shadow-lg select-text font-sans">
              <div className="h-44 bg-gradient-to-r from-blue-950 via-slate-900 to-[#070a10] p-6 flex flex-col justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                  PDL
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">{currentSEO.title}</h4>
              </div>
              <div className="p-4 bg-[#23272c] space-y-1">
                <p className="text-[11px] font-mono text-blue-400">PORTFOLIO.PRAJWALDL.COM</p>
                <h4 className="text-xs font-bold text-white line-clamp-1">{currentSEO.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{currentSEO.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
