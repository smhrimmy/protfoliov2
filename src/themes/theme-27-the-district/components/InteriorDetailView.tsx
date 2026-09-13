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
  Terminal,
  User,
  BookOpen,
  Radio,
  FileText
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

  // Form state for Signal Tower contact broadcast
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setSentStatus('Transmitting signal...');
    setTimeout(() => {
      setSentStatus('Transmission Received! Signal logged to district radio inbox.');
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[90vh] district-glass rounded-2xl border border-[#ffb703]/30 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffb703]/20 bg-[#161b26]/90">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToDistrict}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffb703]/10 hover:bg-[#ffb703]/20 border border-[#ffb703]/40 text-[#ffb703] transition-all text-sm font-semibold district-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to District Wide Shot
            </button>

            <div>
              <h2 className="district-heading text-xl sm:text-2xl font-bold text-[#ffb703]">
                {buildingInfo?.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                ROOM INTERIOR: {buildingInfo?.subtitle}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            INTERIOR ROOM ACTIVE
          </div>
        </div>

        {/* Room Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 district-scrollbar">
          
          {/* STUDIO INTERIOR (ABOUT & BIO) */}
          {activeBuilding === 'studio' && (
            <div className="space-y-8">
              {/* Profile Top Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex flex-col items-center text-center space-y-4 md:border-r md:border-slate-800 md:pr-6">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#ffb703] shadow-lg">
                    {identity.avatarUrl ? (
                      <img
                        src={identity.avatarUrl}
                        alt={identity.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="district-heading text-2xl font-bold text-white">
                      {identity.name}
                    </h3>
                    <p className="text-sm text-[#ffb703] font-medium mt-0.5">{identity.role}</p>
                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {identity.location}
                    </p>
                  </div>

                  {identity.resumeUrl && (
                    <a
                      href={identity.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffb703] text-slate-950 font-bold text-xs hover:bg-[#ffc83b] transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      Download Resume
                    </a>
                  )}
                </div>

                {/* Bio & Philosophy */}
                <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[#ffb703] uppercase tracking-wider font-mono">
                      Architect Bio
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-sm">{identity.bio}</p>
                  </div>

                  {/* Identity Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                    <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                      <div className="text-xl font-bold text-[#ffb703]">
                        {identity.stats.projectsShipped}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">
                        Projects Shipped
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                      <div className="text-xl font-bold text-emerald-400">
                        {identity.stats.yearsBuilding}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">
                        Years Building
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                      <div className="text-xl font-bold text-blue-400">
                        {identity.stats.revenueInfluenced}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">
                        Impact / Value
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                      <div className="text-xl font-bold text-purple-400">
                        {identity.stats.happyClients}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">
                        Clients / Teams
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="space-y-4">
                <h4 className="district-heading text-lg font-bold text-[#ffb703] flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Engineering & Design Capabilities
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
                    >
                      <h5 className="font-semibold text-white text-sm font-mono border-b border-slate-800 pb-2">
                        {cat.category}
                      </h5>
                      <div className="space-y-2">
                        {cat.skills.map((s) => (
                          <div key={s.name} className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-slate-300">{s.name}</span>
                              <span className="text-[#ffb703]">{s.level}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#ffb703] to-amber-500 rounded-full"
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

          {/* GALLERY INTERIOR (PROJECTS SHOWCASE) */}
          {activeBuilding === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <p className="text-sm text-slate-300 font-mono">
                  Showing {projects.length} curated product architectural models
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="group rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden hover:border-[#ffb703]/50 transition-all flex flex-col"
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
                          <span className="px-2.5 py-1 rounded bg-[#ffb703]/90 text-slate-950 text-xs font-bold font-mono">
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
                        <h4 className="district-heading text-xl font-bold text-white group-hover:text-[#ffb703] transition-colors">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {proj.summary}
                        </p>
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-bold text-[#ffb703] hover:underline font-mono"
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

          {/* ARCHIVE INTERIOR (BLOG & WRITINGS) */}
          {activeBuilding === 'archive' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <p className="text-sm text-slate-300 font-mono">
                  District Technical Library & Publication Vault ({blogPosts.length} posts)
                </p>
              </div>

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-[#ffb703]/50 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {post.publishedAt || 'Published'} • {post.readingTimeMinutes} min read
                      </span>
                    </div>

                    <h4 className="district-heading text-xl font-bold text-white hover:text-[#ffb703] transition-colors cursor-pointer">
                      {post.title}
                    </h4>

                    <p className="text-slate-300 text-sm leading-relaxed">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-slate-400 font-mono bg-slate-800/60 px-2 py-0.5 rounded"
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

          {/* OFFICE TOWER INTERIOR (EXPERIENCE TIMELINE) */}
          {activeBuilding === 'office' && (
            <div className="space-y-8">
              <div className="border-b border-slate-800 pb-4">
                <h4 className="district-heading text-lg font-bold text-[#ffb703]">
                  Floor-by-Floor Career Progression
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Chronological breakdown from foundational training to current engineering leadership
                </p>
              </div>

              <div className="relative border-l-2 border-[#ffb703]/40 ml-4 pl-6 space-y-8">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#161b26] border-2 border-[#ffb703] group-hover:bg-[#ffb703] transition-colors" />

                    <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div>
                          <h4 className="district-heading text-lg font-bold text-white">
                            {exp.role}
                          </h4>
                          <p className="text-sm font-semibold text-[#ffb703]">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                            {exp.startDate} – {exp.endDate}
                          </span>
                          <p className="text-xs text-slate-400 mt-1 font-mono">{exp.location}</p>
                        </div>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">{exp.description}</p>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-1.5 pt-2">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-[#ffb703] mt-0.5">•</span>
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

          {/* SIGNAL TOWER INTERIOR (CONTACT STATION) */}
          {activeBuilding === 'signal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Transmission Form */}
              <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                  <div>
                    <h4 className="district-heading text-lg font-bold text-white">
                      Radio Broadcast Console
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Direct signal dispatch to identity inbox
                    </p>
                  </div>
                </div>

                <form onSubmit={handleBroadcast} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Caller Identity / Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-[#ffb703]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Return Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-[#ffb703]"
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
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-[#ffb703] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#ffb703] text-slate-950 font-bold text-sm hover:bg-[#ffc83b] transition-all shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    Transmit Signal
                  </button>

                  {sentStatus && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono text-center">
                      {sentStatus}
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Direct Channels & Links */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <h4 className="district-heading text-lg font-bold text-white border-b border-slate-800 pb-3">
                    Direct Frequencies & Social Terminals
                  </h4>

                  <div className="space-y-3">
                    {identity.socialLinks.email && (
                      <a
                        href={`mailto:${identity.socialLinks.email}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 hover:border-[#ffb703] hover:text-[#ffb703] transition-all"
                      >
                        <Mail className="w-5 h-5 text-[#ffb703]" />
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
                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 hover:border-[#ffb703] hover:text-[#ffb703] transition-all"
                      >
                        <GithubIcon className="w-5 h-5 text-[#ffb703]" />
                        <div>
                          <div className="text-xs text-slate-400 font-mono uppercase">GitHub Repository</div>
                          <div className="text-sm font-semibold">{identity.socialLinks.github}</div>
                        </div>
                      </a>
                    )}

                    {identity.socialLinks.linkedin && (
                      <a
                        href={identity.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 hover:border-[#ffb703] hover:text-[#ffb703] transition-all"
                      >
                        <LinkedinIcon className="w-5 h-5 text-[#ffb703]" />
                        <div>
                          <div className="text-xs text-slate-400 font-mono uppercase">LinkedIn Network</div>
                          <div className="text-sm font-semibold">{identity.socialLinks.linkedin}</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#ffb703]/10 border border-[#ffb703]/30 text-[#ffb703] text-xs font-mono text-center">
                  Beacon Light is actively rotating atop the Signal Tower at 60 FPS.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
