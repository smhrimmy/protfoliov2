import React, { useState } from 'react';
import { Mail, Send, GitBranch, Globe, CheckCircle2 } from 'lucide-react';
import { CyberModeTokens } from '../types/cyberdeck';
import { soundFX3D } from './SoundFX3D';

interface HolographicContactViewProps {
  tokens: CyberModeTokens;
}

export const HolographicContactView: React.FC<HolographicContactViewProps> = ({ tokens }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX3D.playHoloChime();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-6 font-mono text-gray-200 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <span 
          className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border"
          style={{
            backgroundColor: `${tokens.primaryColor}20`,
            borderColor: tokens.primaryColor,
            color: tokens.primaryColor
          }}
        >
          SECURE ENCRYPTED FREQUENCY
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
          ESTABLISH CONTACT
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Terminal Form */}
        <div 
          className="lg:col-span-7 border rounded-2xl p-6 space-y-4 backdrop-blur-xl shadow-2xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.hudBorderColor
          }}
        >
          <h3 className="text-lg font-black text-white uppercase font-sans">
            TRANSMIT FREQUENCY MESSAGE
          </h3>

          {sent ? (
            <div className="p-6 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto animate-bounce" />
              <p className="font-bold text-sm">TRANSMISSION RECEIVED // DISPATCH ENCRYPTED</p>
              <p className="text-xs text-gray-300 font-sans">Prajwal DL will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase">SENDER NAME:</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase">SENDER EMAIL / FREQUENCY:</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase">PAYLOAD TRANSMISSION:</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Type your message or project inquiry..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: tokens.primaryColor,
                  boxShadow: `0 0 20px ${tokens.accentGlow}`
                }}
              >
                <Send className="w-4 h-4" />
                <span>TRANSMIT ENCRYPTED PAYLOAD</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels */}
        <div 
          className="lg:col-span-5 border rounded-2xl p-6 space-y-6 backdrop-blur-xl shadow-2xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.hudBorderColor
          }}
        >
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-lg font-black text-white uppercase font-sans">
              DIRECT OPERATIVE CHANNELS
            </h3>
            <p className="text-xs text-gray-400 pt-0.5">
              Encrypted endpoints for technical inquiries, architecture consulting, and project collaborations.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:prajwal.dl.dev@gmail.com"
              className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-cyan-400 flex items-center gap-3 transition-all text-xs text-white cursor-pointer"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-[10px] text-gray-400 uppercase block">DIRECT EMAIL</span>
                <span className="font-bold font-sans">prajwal.dl.dev@gmail.com</span>
              </div>
            </a>

            <a
              href="https://github.com/smhrimmy"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-pink-400 flex items-center gap-3 transition-all text-xs text-white cursor-pointer"
            >
              <GitBranch className="w-4 h-4 text-pink-400" />
              <div>
                <span className="text-[10px] text-gray-400 uppercase block">GITHUB TELEMETRY</span>
                <span className="font-bold font-sans">github.com/smhrimmy</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/prajwal-dl"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-emerald-400 flex items-center gap-3 transition-all text-xs text-white cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-gray-400 uppercase block">LINKEDIN NETWORK</span>
                <span className="font-bold font-sans">linkedin.com/in/prajwal-dl</span>
              </div>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-black/80 border border-white/10 space-y-1 text-xs">
            <span className="text-[10px] text-cyan-400 font-bold uppercase">PHYSICAL LOCATION:</span>
            <p className="text-gray-300 font-sans">Bengaluru, Karnataka, India // IST (+5:30)</p>
          </div>
        </div>

      </div>

    </div>
  );
};
