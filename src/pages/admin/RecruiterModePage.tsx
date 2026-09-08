import React, { useState } from 'react';
import { Sliders, Download, Copy, Check, Clock, ShieldCheck, Share2, ExternalLink } from 'lucide-react';
import { initialIdentity } from '@/data/portfolioData';

interface RecruiterModePageProps {
  onNavigate: (route: string) => void;
}

export const RecruiterModePage: React.FC<RecruiterModePageProps> = ({ onNavigate }) => {
  const [tokenCopied, setTokenCopied] = useState(false);
  const [hoursValid, setHoursValid] = useState(48);
  const [generatedToken, setGeneratedToken] = useState('recruiter_token_94f8a2c1');

  const shareableUrl = `https://praxel.space/preview/${generatedToken}`;

  const copyLink = () => {
    navigator.clipboard?.writeText(shareableUrl);
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    alert('Simulated PDF Resume generation triggered. Downloading: Prajwal_DL_Resume_2024.pdf');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-[#222222] font-sans pb-28">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ad314d]/10 text-[#ad314d] font-bold uppercase border border-[#ad314d]/20">
              STAGE RECRUITER SUITE · PRESENTATION ENGINE
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
            <Sliders className="w-6 h-6 text-[#ad314d]" /> Recruiter Command Mode
          </h1>
          <p className="text-xs text-[#55555e] mt-1">Tailored presentation view, skill radars, PDF resume export, and expiring recruiter token links.</p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <Download className="w-4 h-4" /> Download Official Resume PDF
        </button>
      </div>

      {/* Shareable Expiring Link Card */}
      <div className="bg-[#0e131f] border border-blue-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Generate Shareable Expiring Recruiter Preview Link</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Expiring Security Active
          </span>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          Provide recruiters with a clean, high-performance link that bypasses draft warnings and renders the stable portfolio with executive summaries.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-blue-400 truncate">
            {shareableUrl}
          </div>
          <button
            onClick={copyLink}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            {tokenCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {tokenCopied ? 'Link Copied!' : 'Copy Recruiter Link'}
          </button>
          <button
            onClick={() => onNavigate(`/preview/${generatedToken}`)}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
            title="Test preview link"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Executive Briefing Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-3">
          <h4 className="text-xs font-mono text-gray-400 uppercase">Target Roles</h4>
          <p className="text-sm font-bold text-white">Lead Full Stack Engineer · Systems Architect · 3D Web Creative</p>
          <p className="text-xs text-gray-400 leading-relaxed">Specializing in high-performance React edge architectures, agentic pipelines, and WebGL experiences.</p>
        </div>

        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-3">
          <h4 className="text-xs font-mono text-gray-400 uppercase">Key Benchmarks</h4>
          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between"><span className="text-gray-400">Projects Shipped:</span><span className="text-white font-bold">40+</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Revenue Influenced:</span><span className="text-emerald-400 font-bold">$2.4M</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Clients Satisfied:</span><span className="text-white font-bold">18</span></div>
          </div>
        </div>

        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-3">
          <h4 className="text-xs font-mono text-gray-400 uppercase">Availability Status</h4>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white">Available for Select Full-Time & Retainer Contracts</span>
          </div>
          <p className="text-xs text-gray-400 font-mono">Location: Mangalore, India (Remote worldwide)</p>
        </div>
      </div>
    </div>
  );
};
