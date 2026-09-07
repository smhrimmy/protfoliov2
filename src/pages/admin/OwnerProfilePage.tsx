import React, { useState } from 'react';
import { User, Save, Check, Globe, Mail, MapPin, Sparkles, GitBranch } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity } from '@/types/portfolio';

export const OwnerProfilePage: React.FC = () => {
  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    mockStorage.setIdentity(identity);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Owner Profile & Brand Settings</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Personal identity, brand alias, engineering stats, and social syndication handles.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20 self-start sm:self-auto"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Changes Saved' : 'Save Profile'}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Core Identity */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Core Identity</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Full Legal Name *</label>
              <input
                type="text"
                required
                value={identity.name}
                onChange={e => setIdentity({ ...identity, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Brand Alias / Moniker *</label>
              <input
                type="text"
                required
                value={identity.alias}
                onChange={e => setIdentity({ ...identity, alias: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Primary Role Title *</label>
              <input
                type="text"
                required
                value={identity.role}
                onChange={e => setIdentity({ ...identity, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Sub-Specialty / Discipline</label>
              <input
                type="text"
                value={identity.subRole}
                onChange={e => setIdentity({ ...identity, subRole: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-mono">Location & Timezone</label>
            <input
              type="text"
              value={identity.location}
              onChange={e => setIdentity({ ...identity, location: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-mono">Tagline / Mission Statement</label>
            <input
              type="text"
              value={identity.tagline}
              onChange={e => setIdentity({ ...identity, tagline: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-mono">Biography / About</label>
            <textarea
              rows={4}
              value={identity.bio}
              onChange={e => setIdentity({ ...identity, bio: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Media Assets */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Media & Avatars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Avatar / Portrait URL</label>
              <input
                type="url"
                value={identity.avatarUrl}
                onChange={e => setIdentity({ ...identity, avatarUrl: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">External Resume PDF Link</label>
              <input
                type="text"
                value={identity.resumeUrl}
                onChange={e => setIdentity({ ...identity, resumeUrl: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Key Career Impact Metrics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Projects Shipped</label>
              <input
                type="text"
                value={identity.stats.projectsShipped}
                onChange={e => setIdentity({ ...identity, stats: { ...identity.stats, projectsShipped: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Revenue Influenced</label>
              <input
                type="text"
                value={identity.stats.revenueInfluenced}
                onChange={e => setIdentity({ ...identity, stats: { ...identity.stats, revenueInfluenced: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Happy Clients</label>
              <input
                type="text"
                value={identity.stats.happyClients}
                onChange={e => setIdentity({ ...identity, stats: { ...identity.stats, happyClients: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Years Building</label>
              <input
                type="text"
                value={identity.stats.yearsBuilding}
                onChange={e => setIdentity({ ...identity, stats: { ...identity.stats, yearsBuilding: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Social Syndication & Contact Channels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block mb-1 font-mono">GitHub Profile URL</label>
              <input
                type="text"
                value={identity.socialLinks.github}
                onChange={e => setIdentity({ ...identity, socialLinks: { ...identity.socialLinks, github: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">LinkedIn Profile URL</label>
              <input
                type="text"
                value={identity.socialLinks.linkedin}
                onChange={e => setIdentity({ ...identity, socialLinks: { ...identity.socialLinks, linkedin: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Twitter / X Handle</label>
              <input
                type="text"
                value={identity.socialLinks.twitter}
                onChange={e => setIdentity({ ...identity, socialLinks: { ...identity.socialLinks, twitter: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1 font-mono">Direct Work Email</label>
              <input
                type="email"
                value={identity.socialLinks.email}
                onChange={e => setIdentity({ ...identity, socialLinks: { ...identity.socialLinks, email: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
