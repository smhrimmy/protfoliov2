import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowLeft, ExternalLink, Globe } from 'lucide-react';
import { initialIdentity, initialProjects } from '@/data/portfolioData';

interface SpecialPageProps {
  onNavigate: (route: string) => void;
  token?: string;
}

export const SharedPreviewPage: React.FC<SpecialPageProps> = ({ onNavigate, token }) => {
  return (
    <div className="min-h-screen bg-[#070a10] text-gray-100 font-sans p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-[#0e131f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">VERIFIED RECRUITER PREVIEW</span>
          </div>
          <span className="text-xs font-mono text-gray-500">TOKEN: {token || '48h_active'}</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{initialIdentity.name} — Candidate Brief</h1>
          <p className="text-sm text-blue-400 font-mono mb-4">{initialIdentity.role}</p>
          <p className="text-xs text-gray-300 leading-relaxed">{initialIdentity.bio}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 bg-white/2 rounded-xl border border-white/5 text-center font-mono">
          <div><p className="text-xl font-bold text-white">40+</p><p className="text-[10px] text-gray-500">Shipped</p></div>
          <div><p className="text-xl font-bold text-emerald-400">$2.4M</p><p className="text-[10px] text-gray-500">Revenue</p></div>
          <div><p className="text-xl font-bold text-white">5yr</p><p className="text-[10px] text-gray-500">Web Craft</p></div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Featured Systems</h3>
          {initialProjects.slice(0, 3).map(p => (
            <div key={p.id} className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-white">{p.title}</span>
              <span className="text-gray-400">{p.role}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" /> Explore Full 19-Theme Portfolio
          </button>
          <a
            href="mailto:prajwal@silversten.dev"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
          >
            Contact Prajwal
          </a>
        </div>
      </div>
    </div>
  );
};

export const PasswordProtectedPage: React.FC<SpecialPageProps> = ({ onNavigate }) => {
  const [passcode, setPasscode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'pdl2024' || passcode.trim() === 'recruiter') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (unlocked) {
    return (
      <div className="min-h-screen bg-[#070a10] text-gray-100 font-sans p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-[#0e131f] border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
          <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">Protected Case Study Unlocked</h2>
          <p className="text-xs text-gray-300">Confidential enterprise architecture: <strong>Enterprise Health Triage Engine</strong>.</p>
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
          >
            Return to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a10] text-gray-100 font-sans p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm bg-[#0e131f] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-amber-400">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Protected Case Study</h2>
          <p className="text-xs text-gray-400 mt-1">This project contains proprietary client architecture. Enter the passcode provided in the recruiter brief.</p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-3 pt-2">
          <input
            type="password"
            placeholder="Enter passcode (hint: recruiter)..."
            value={passcode}
            onChange={e => setPasscode(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white text-center focus:outline-none focus:border-blue-500 font-mono"
          />
          {error && <p className="text-xs text-red-400 font-mono">Invalid passcode. Try "recruiter".</p>}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Unlock Case Study
          </button>
        </form>

        <button onClick={() => onNavigate('/')} className="text-xs text-gray-500 hover:text-gray-300 flex items-center justify-center gap-1 mx-auto">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC<SpecialPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#070a10] text-gray-100 font-sans p-6 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-md bg-[#0e131f] border border-white/10 rounded-2xl p-8 space-y-4 shadow-2xl">
        <span className="font-mono text-4xl font-black text-blue-500">404</span>
        <h2 className="text-xl font-bold text-white">Route Not Found in Operating Matrix</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          The requested coordinate does not map to any active public theme or admin module.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
          >
            Return to Public Portfolio
          </button>
          <button
            onClick={() => onNavigate('/admin/dashboard')}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold"
          >
            Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
