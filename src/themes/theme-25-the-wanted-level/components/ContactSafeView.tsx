import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Users, GitBranch, Send, CheckCircle2, Shield, Copy, ExternalLink, Share2 } from 'lucide-react';
import { soundFX } from './SoundEffects';

export const ContactSafeView: React.FC = () => {
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);

  const contactChannels = [
    {
      id: 'phone',
      label: 'PHONE',
      value: '+91 80881 23456',
      icon: Phone,
      color: '#ec4899',
      action: 'tel:+918088123456',
      subtext: 'VOICE // DIRECT FREQUENCY'
    },
    {
      id: 'email',
      label: 'EMAIL',
      value: 'dl.prajwal1234@gmail.com',
      icon: Mail,
      color: '#38bdf8',
      action: 'mailto:dl.prajwal1234@gmail.com',
      subtext: 'ENCRYPTED DISPATCH'
    },
    {
      id: 'social',
      label: 'SOCIAL',
      value: 'linkedin.com/in/prajwaldl',
      icon: Users,
      color: '#f59e0b',
      action: 'https://linkedin.com/in/prajwaldl',
      subtext: 'PROFESSIONAL NETWORK'
    },
    {
      id: 'whatsapp',
      label: 'WHATSAPP',
      value: '+91 80881 23456',
      icon: MessageSquare,
      color: '#10b981',
      action: 'https://wa.me/918088123456',
      subtext: 'INSTANT CHAT CHANNEL'
    },
    {
      id: 'github',
      label: 'GITHUB',
      value: '@smhrimmy',
      icon: GitBranch,
      color: '#a855f7',
      action: 'https://github.com/smhrimmy',
      subtext: '36 PUBLIC REPOSITORIES'
    },
    {
      id: 'press',
      label: 'PRESS',
      value: 'Verified Portfolio OS',
      icon: Shield,
      color: '#fb7185',
      action: '#',
      subtext: 'MEDIA & REFERENCES'
    }
  ];

  const handleChannelClick = (ch: typeof contactChannels[0]) => {
    soundFX.playCashChime();
    if (ch.action && ch.action !== '#') {
      if (ch.action.startsWith('http')) {
        window.open(ch.action, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = ch.action;
      }
    } else {
      navigator.clipboard.writeText(ch.value);
      setCopiedChannel(ch.id);
      setTimeout(() => setCopiedChannel(null), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playCashChime();
    setFormSent(true);
  };

  return (
    <div className="space-y-6 font-mono text-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold tracking-widest border border-purple-500/30">
              SAFEHOUSE TRANSMISSION
            </span>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> CHANNELS OPEN 24/7
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
            CONTACT SAFE
          </h2>
          <p className="text-xs text-gray-400">
            Select an encrypted comms channel or submit a direct contract dispatch briefing.
          </p>
        </div>

        <div className="bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
          <span className="text-[9px] text-gray-400 uppercase block font-bold">Response SLA</span>
          <span className="text-sm font-black text-emerald-400 font-sans">&lt; 24 HOURS GUARANTEED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 6-Tile Communication Matrix */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
            Direct Transmission Frequencies
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {contactChannels.map((ch) => {
              const Icon = ch.icon;
              const isCopied = copiedChannel === ch.id;

              return (
                <button
                  key={ch.id}
                  onClick={() => handleChannelClick(ch)}
                  className="group relative p-4 rounded-xl bg-black/80 hover:bg-black border border-white/10 hover:border-pink-500/60 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 hover:-translate-y-1 shadow-lg focus:outline-none"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  <div 
                    className="p-3 rounded-xl border transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${ch.color}15`,
                      borderColor: `${ch.color}40`,
                      color: ch.color
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-xs font-black text-white font-sans tracking-wider uppercase group-hover:text-pink-400 transition-colors">
                    {ch.label}
                  </span>

                  <span className="text-[9px] text-gray-400 font-mono line-clamp-1">
                    {isCopied ? 'COPIED TO CLIPBOARD' : ch.subtext}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Contact Objectives Box (from screenshot 1) */}
          <div className="p-4 rounded-xl bg-[#0c0e17] border border-pink-500/40 space-y-2 shadow-xl">
            <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
              CONTACT OBJECTIVES
            </span>
            <ul className="space-y-1 text-xs text-gray-300 font-sans">
              <li className="flex items-center gap-2">
                <span className="text-[#f59e0b] font-bold">▸</span> Build High-Yield Enterprise SaaS &amp; UI Systems
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f59e0b] font-bold">▸</span> Architect Zero-Downtime Cloud &amp; Hosting Migrations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#f59e0b] font-bold">▸</span> Available for Full-Time, Advisory, &amp; Contract Engagements
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Encrypted Contract Dispatch Terminal Form */}
        <div className="lg:col-span-6">
          <div className="bg-[#0c0e17] border border-white/15 rounded-xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">
                  DIRECT MISSION INTAKE
                </span>
                <h3 className="text-lg font-black text-white uppercase font-sans">
                  DISPATCH CONTRACT PROPOSAL
                </h3>
              </div>
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>

            {formSent ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white uppercase font-sans">DISPATCH TRANSMITTED</h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  Your transmission has been logged into the operative queue. Prajwal DL will acknowledge frequency within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold uppercase text-[10px]">Client / Syndicate Handle</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Enterprise Client / Alex Vance"
                    className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 focus:border-pink-500 text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold uppercase text-[10px]">Frequency (Email Address)</label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. contact@enterprise.com"
                    className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 focus:border-pink-500 text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold uppercase text-[10px]">Project Scope &amp; Target Valuation</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Detail system specifications, target timelines, and project scope..."
                    className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 focus:border-pink-500 text-white focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)] focus:outline-none"
                >
                  <Send className="w-4 h-4" /> TRANSMIT CONTRACT BRIEFING
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
