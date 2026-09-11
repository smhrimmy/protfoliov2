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
      {/* Shareable Expiring Link Card */}
      <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#ad314d]" />
            <h3 className="text-sm font-bold text-[#1a1a1a]">Generate Shareable Expiring Recruiter Preview Link</h3>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Expiring Security Active
          </span>
        </div>

        <p className="text-xs text-[#55555e] leading-relaxed">
          Provide recruiters with a clean, high-performance link that renders the stable portfolio with verified resume credentials, real GitHub metrics, and live case studies.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full bg-black/5 border border-black/10 rounded-xl px-4 py-2.5 text-xs font-mono text-[#1a1a1a] truncate">
            {shareableUrl}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={copyLink}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 shadow-2xs"
            >
              {tokenCopied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              {tokenCopied ? 'Link Copied!' : 'Copy Recruiter Link'}
            </button>
            <button
              onClick={() => onNavigate(`/preview/${generatedToken}`)}
              className="p-2.5 bg-white hover:bg-gray-50 border border-black/10 text-gray-700 rounded-xl shadow-2xs"
              title="Test preview link"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Executive Briefing Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-3 shadow-2xs">
          <h4 className="text-xs font-mono text-[#71717a] uppercase font-bold">Target Roles</h4>
          <p className="text-sm font-bold text-[#1a1a1a]">Web Advisor · Full Stack Web Developer · WordPress Specialist</p>
          <p className="text-xs text-[#55555e] leading-relaxed">Expertise in WordPress migrations, DNS configuration, hosting optimization, React frontends, and responsive user interfaces.</p>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-3 shadow-2xs">
          <h4 className="text-xs font-mono text-[#71717a] uppercase font-bold">Key Verified Benchmarks</h4>
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex justify-between"><span className="text-[#55555e]">GitHub Repositories:</span><span className="text-[#1a1a1a] font-bold">36 Public Repos</span></div>
            <div className="flex justify-between"><span className="text-[#55555e]">Industry Positions:</span><span className="text-emerald-800 font-bold">4 Verified Roles</span></div>
            <div className="flex justify-between"><span className="text-[#55555e]">Education Completed:</span><span className="text-[#1a1a1a] font-bold">Diploma (2024)</span></div>
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl p-6 space-y-3 shadow-2xs">
          <h4 className="text-xs font-mono text-[#71717a] uppercase font-bold">Availability Status</h4>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#1a1a1a]">Available for Full-Time & Contract Roles</span>
          </div>
          <p className="text-xs text-[#55555e] font-mono">Location: Mangalore, Karnataka, India (Remote & On-site)</p>
        </div>
      </div>
    </div>
  );
};
