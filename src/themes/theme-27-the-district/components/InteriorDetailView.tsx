import React, { useState } from 'react';
import { BuildingId, BUILDINGS } from './DistrictCanvas3D';
import { PortfolioIdentity, Project, BlogPost, Experience, SkillCategory } from '@/types/portfolio';
import {
  ArrowLeft,
  Briefcase,
  Code2,
  ExternalLink,
  Mail,
  MapPin,
  Send,
  Sparkles,
  User,
  BookOpen,
  Radio,
  FileText,
  Building2,
  FolderKanban,
  Library
} from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
  </svg>
);

interface InteriorDetailViewProps {
  activeBuilding: BuildingId;
  onBackToDistrict: () => void;
  identity: PortfolioIdentity;
  projects: Project[];
  blogPosts: BlogPost[];
  experience: Experience[];
  skillCategories: SkillCategory[];
}

export const InteriorDetailView: React.FC<InteriorDetailViewProps> = ({
  activeBuilding,
  onBackToDistrict,
  identity,
  projects,
  blogPosts,
  experience,
  skillCategories
}) => {
  const buildingInfo = BUILDINGS.find((b) => b.id === activeBuilding);

  // Form state for Signal Tower radio transmission
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setSentStatus('Transmitting signal frequency...');
    setTimeout(() => {
      setSentStatus('Transmission Received! Message logged to signal station.');
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 1000);
  };

  const getMaterialClass = () => {
    switch (activeBuilding) {
      case 'studio':
        return 'material-panel-studio';
      case 'gallery':
        return 'material-panel-gallery';
      case 'archive':
        return 'material-panel-archive';
      case 'office':
        return 'material-panel-office';
      case 'signal':
        return 'material-panel-signal';
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/70 backdrop-blur-lg animate-fade-in">
      <div className={`relative w-full max-w-6xl max-h-[92vh] ${getMaterialClass()} rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-all duration-500`}>
        
        {/* Header Bar with Back to District Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5A65B]/20 bg-[#161C3D]/90">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToDistrict}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5A65B]/15 hover:bg-[#F5A65B]/30 border border-[#F5A65B]/40 text-[#F5A65B] transition-all text-xs sm:text-sm font-bold font-mono shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              ← Back to district
            </button>

            <div>
              <h2 className="district-heading text-lg sm:text-2xl font-bold text-[#F5A65B]">
                {buildingInfo?.name}
              </h2>
              <p className="text-[11px] text-[#8B8FD9] font-mono">
                {buildingInfo?.subtitle}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ROOM INTERIOR ACTIVE
          </div>
        </div>

        {/* Room Content Container */}
        <div className="flex-1 overflow-y-auto p-6 district-scrollbar">
          
          {/* 1. THE STUDIO (STOREFRONT: ABOUT & BIO) */}
          {activeBuilding === 'studio' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-900/70 border border-[#F5A65B]/30">
                <div className="flex flex-col items-center text-center space-y-4 md:border-r md:border-slate-800 md:pr-6">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#F5A65B] shadow-xl">
                    {identity.avatarUrl ? (
                      <img
                        src={identity.avatarUrl}
                        alt={identity.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="district-heading text-2xl font-bold text-white">
                      {identity.name}
                    </h3>
                    <p className="text-sm text-[#F5A65B] font-medium mt-0.5">{identity.role}</p>
                    <p className="text-xs text-[#8B8FD9] flex items-center justify-center gap-1 mt-1 font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      {identity.location}
                    </p>
                  </div>

                  {identity.resumeUrl && (
                    <a
                      href={identity.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5A65B] text-slate-950 font-bold text-xs hover:bg-[#ffb76b] transition-all shadow-md"
                    >
                      <FileText className="w-4 h-4" />
                      Download Resume
                    </a>
                  )}
                </div>

                <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-[#F5A65B] uppercase tracking-wider font-mono">
                      Architect & Developer Bio
                    </h4>
                    <p className="text-slate-200 leading-relaxed text-sm">{identity.bio}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                      <div className="text-xl font-bold text-[#F5A65B]">
                        {identity.stats.projectsShipped}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">
                        Shipped
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                      <div className="text-xl font-bold text-emerald-400">
                        {identity.stats.yearsBuilding}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">
                        Years Exp
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                      <div className="text-xl font-bold text-blue-400">
                        {identity.stats.revenueInfluenced}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">
                        Impact
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                      <div className="text-xl font-bold text-[#8B8FD9]">
                        {identity.stats.happyClients}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">
                        Clients
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="space-y-4">
                <h4 className="district-heading text-lg font-bold text-[#F5A65B] flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Technical Capabilities & Stack
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3"
                    >
                      <h5 className="font-semibold text-white text-xs font-mono border-b border-slate-800 pb-2 uppercase tracking-wider text-[#8B8FD9]">
                        {cat.category}
                      </h5>
                      <div className="space-y-2.5">
                        {cat.skills.map((s) => (
                          <div key={s.name} className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-slate-200">{s.name}</span>
                              <span className="text-[#F5A65B]">{s.level}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#F5A65B] to-amber-400 rounded-full"
                                style={{ width: `${s.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. THE GALLERY (GLASS-FRONTED GRID: PROJECTS) */}
          {activeBuilding === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-4">
                <p className="text-xs text-[#8B8FD9] font-mono">
                  Displaying {projects.length} featured engineering systems
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="group rounded-2xl bg-slate-900/80 border border-blue-500/20 overflow-hidden hover:border-blue-400/60 transition-all flex flex-col shadow-xl"
                  >
                    {proj.coverImage && (
                      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                          <span className="px-2.5 py-1 rounded bg-blue-500 text-white text-xs font-bold font-mono">
                            {proj.role}
                          </span>
                          <span className="text-xs text-slate-300 font-mono bg-slate-900/80 px-2 py-0.5 rounded">
                            {proj.date}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h4 className="district-heading text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {proj.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/50 text-[10px] text-blue-200 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:underline font-mono"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white font-mono"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. THE ARCHIVE (STACKED PAPER/CARD VAULT: BLOG) */}
          {activeBuilding === 'archive' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#8B8FD9]/20 pb-4">
                <p className="text-xs text-[#8B8FD9] font-mono">
                  District Technical Writings ({blogPosts.length} publication dossiers)
                </p>
              </div>

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-[#8B8FD9]/30 hover:border-[#8B8FD9]/70 transition-all space-y-3 shadow-lg"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-mono">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#8B8FD9] font-mono">
                        {post.publishedAt || 'Published'} • {post.readingTimeMinutes} min read
                      </span>
                    </div>

                    <h4 className="district-heading text-xl font-bold text-white hover:text-[#8B8FD9] transition-colors cursor-pointer">
                      {post.title}
                    </h4>

                    <p className="text-slate-300 text-sm leading-relaxed">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-[#8B8FD9] font-mono bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900/40"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. THE OFFICE TOWER (SKYSCRAPER CAREER LEDGER: EXPERIENCE) */}
          {activeBuilding === 'office' && (
            <div className="space-y-8">
              <div className="border-b border-[#F5A65B]/20 pb-4">
                <h4 className="district-heading text-lg font-bold text-[#F5A65B]">
                  Floor-by-Floor Professional Career Timeline
                </h4>
                <p className="text-xs text-[#8B8FD9] font-mono mt-1">
                  Chronological progression from initial diploma to full engineering leadership
                </p>
              </div>

              <div className="relative border-l-2 border-[#F5A65B]/40 ml-4 pl-6 space-y-8">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0E1330] border-2 border-[#F5A65B] group-hover:bg-[#F5A65B] transition-colors" />

                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div>
                          <h4 className="district-heading text-lg font-bold text-white">
                            {exp.role}
                          </h4>
                          <p className="text-sm font-semibold text-[#F5A65B]">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 rounded bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700">
                            {exp.startDate} – {exp.endDate}
                          </span>
                          <p className="text-xs text-[#8B8FD9] mt-1 font-mono">{exp.location}</p>
                        </div>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">{exp.description}</p>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-1.5 pt-2">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-[#F5A65B] mt-0.5">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. THE SIGNAL TOWER (RADIO TRANSMITTER STATION: CONTACT) */}
          {activeBuilding === 'signal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-red-500/30 space-y-4 shadow-xl">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                  <div>
                    <h4 className="district-heading text-lg font-bold text-white">
                      Radio Signal Transmitter
                    </h4>
                    <p className="text-xs text-[#8B8FD9] font-mono">
                      Direct signal dispatch console
                    </p>
                  </div>
                </div>

                <form onSubmit={handleBroadcast} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Sender Name / Call Sign
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-[#F5A65B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Return Frequency / Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-[#F5A65B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Signal Payload / Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Enter your message details..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-[#F5A65B] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F5A65B] text-slate-950 font-bold text-sm hover:bg-[#ffb76b] transition-all shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    Transmit Message
                  </button>

                  {sentStatus && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono text-center">
                      {sentStatus}
                    </div>
                  )}
                </form>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
                  <h4 className="district-heading text-lg font-bold text-white border-b border-slate-800 pb-3">
                    Direct Contact Channels
                  </h4>

                  <div className="space-y-3">
                    {identity.socialLinks.email && (
                      <a
                        href={`mailto:${identity.socialLinks.email}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:border-[#F5A65B] hover:text-[#F5A65B] transition-all"
                      >
                        <Mail className="w-5 h-5 text-[#F5A65B]" />
                        <div>
                          <div className="text-xs text-slate-400 font-mono uppercase">Direct Email</div>
                          <div className="text-sm font-semibold">{identity.socialLinks.email}</div>
                        </div>
                      </a>
                    )}

                    {identity.socialLinks.github && (
                      <a
                        href={identity.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:border-[#F5A65B] hover:text-[#F5A65B] transition-all"
                      >
                        <GithubIcon className="w-5 h-5 text-[#F5A65B]" />
                        <div>
                          <div className="text-xs text-slate-400 font-mono uppercase">GitHub Profile</div>
                          <div className="text-sm font-semibold">{identity.socialLinks.github}</div>
                        </div>
                      </a>
                    )}

                    {identity.socialLinks.linkedin && (
                      <a
                        href={identity.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:border-[#F5A65B] hover:text-[#F5A65B] transition-all"
                      >
                        <LinkedinIcon className="w-5 h-5 text-[#F5A65B]" />
                        <div>
                          <div className="text-xs text-slate-400 font-mono uppercase">LinkedIn Profile</div>
                          <div className="text-sm font-semibold">{identity.socialLinks.linkedin}</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center">
                  Signal Spire Beacon is pulsing on an active loop.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
