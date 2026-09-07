import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, ArrowRight, ExternalLink, Globe, Calendar, Clock, MapPin, 
  Award, Building, ChevronRight, Search, Mail, Send, Check, Star, 
  Download, Printer, QrCode, ThumbsUp, Heart, Flame, Shield, FileText,
  Terminal, Sparkles, MessageSquare, Copy, Rss, WifiOff, X
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { Project, BlogPost, Experience, SkillCategory, Education, Certification, Testimonial, CustomPage } from '@/types/portfolio';

interface PublicPageProps {
  onNavigate: (route: string) => void;
  param?: string;
}

// ----------------------------------------------------
// Public Shared Layout Chrome (Header + Footer)
// ----------------------------------------------------
export const PublicLayout: React.FC<{
  children: React.ReactNode;
  onNavigate: (route: string) => void;
  activeRoute: string;
}> = ({ children, onNavigate, activeRoute }) => {
  const identity = mockStorage.getIdentity();

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Projects', route: '/projects' },
    { label: 'Articles', route: '/blog' },
    { label: 'Experience', route: '/experience' },
    { label: 'Skills', route: '/skills' },
    { label: 'Resume', route: '/resume' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#070a10] text-gray-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#070a10]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-mono font-bold text-xs text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              PDL
            </div>
            <div>
              <span className="text-xs font-bold text-white tracking-tight uppercase block leading-none">
                {identity.alias}
              </span>
              <span className="text-[10px] font-mono text-gray-400 leading-none">
                {identity.role}
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-xs">
            {navLinks.map(link => {
              const isActive = activeRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => onNavigate(link.route)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/search')}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              title="Search Site"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/admin')}
              className="hidden sm:inline-flex px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 rounded-xl text-xs font-medium transition-colors items-center gap-1"
            >
              <span>Admin OS</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#05070c] py-12 text-xs text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-mono text-gray-300 font-semibold">
              {identity.name} · {identity.alias}
            </p>
            <p className="text-[11px] text-gray-500">
              Architecting high-throughput systems, resilient cloud infrastructure, and 3D spatial experiences.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => onNavigate('/rss.xml')} className="hover:text-white transition-colors flex items-center gap-1">
              <Rss className="w-3 h-3 text-amber-400" /> RSS
            </button>
            <button onClick={() => onNavigate('/protected')} className="hover:text-white transition-colors">Client Portal</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ----------------------------------------------------
// 1. PublicAboutPage (/about)
// ----------------------------------------------------
export const PublicAboutPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const identity = mockStorage.getIdentity();

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/about">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Engineering Biography</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Systems Architect & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              3D Creative Engineer
            </span>
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
            {identity.bio}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0e131f] border border-white/5 font-mono">
          <div>
            <p className="text-2xl font-bold text-white">{identity.stats.projectsShipped}</p>
            <p className="text-[11px] text-gray-400 uppercase mt-0.5">Shipped Systems</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">{identity.stats.revenueInfluenced}</p>
            <p className="text-[11px] text-gray-400 uppercase mt-0.5">Revenue Influenced</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">{identity.stats.happyClients}</p>
            <p className="text-[11px] text-gray-400 uppercase mt-0.5">Happy Clients</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">{identity.stats.yearsBuilding}</p>
            <p className="text-[11px] text-gray-400 uppercase mt-0.5">Years of Mastery</p>
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Core Architectural Tenets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-2">
              <span className="text-xs font-mono text-blue-400 font-bold">01 / DISCIPLINE</span>
              <h3 className="text-sm font-bold text-white">Strict Isolation</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Clean architectural boundaries between data layers and presentations. Every design world maintains distinct component trees.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">02 / VELOCITY</span>
              <h3 className="text-sm font-bold text-white">Zero-Lag Telemetry</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                60fps WebGL rendering paired with sub-second page transitions, optimistic state mutations, and instantaneous search indexing.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold">03 / TRUST</span>
              <h3 className="text-sm font-bold text-white">Human-In-The-Loop AI</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Automated social pipelines and AI assistants that propose diffs for verification rather than blindly injecting unchecked output.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Ready to collaborate on high-stakes systems?</h3>
            <p className="text-xs text-gray-300">Currently open to select staff engineering and architectural advisory roles.</p>
          </div>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shrink-0 shadow-lg shadow-blue-600/20"
          >
            Initiate Contact
          </button>
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 2. PublicProjectsListPage (/projects)
// ----------------------------------------------------
export const PublicProjectsListPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const [projects] = useState<Project[]>(mockStorage.getProjects());
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'all' || p.technologies.some(t => t.toLowerCase().includes(filter.toLowerCase()));
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/projects">
      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Engineered Works</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">Featured Production Systems</h1>
          <p className="text-xs text-gray-400 mt-2 max-w-xl">
            High-throughput enterprise backends, WebGL rendering engines, and multi-tenant architectures.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 text-xs no-scrollbar">
            {['all', 'React', 'Three.js', 'TypeScript', 'Node.js', 'WebGL'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-colors ${
                  filter === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search systems & stack..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(p => (
            <div
              key={p.id}
              onClick={() => onNavigate(`/projects/${p.id}`)}
              className="group cursor-pointer rounded-2xl bg-[#0e131f] border border-white/5 overflow-hidden hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-black/40">
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.featured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-blue-600 text-white font-mono text-[10px] font-bold rounded-md uppercase">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono text-blue-400 font-semibold uppercase">{p.role}</span>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5 mt-3 space-y-3">
                <div className="flex flex-wrap gap-1 pt-3">
                  {p.technologies.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                  {p.technologies.length > 3 && (
                    <span className="text-[10px] font-mono text-gray-500">+{p.technologies.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Case Study</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 3. PublicProjectDetailPage (/projects/:id)
// ----------------------------------------------------
export const PublicProjectDetailPage: React.FC<PublicPageProps> = ({ onNavigate, param }) => {
  const projects = mockStorage.getProjects();
  const project = projects.find(p => p.id === param || p.slug === param) || projects[0];

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/projects">
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => onNavigate('/projects')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all projects
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-mono font-bold uppercase">
              {project.role}
            </span>
            <span className="text-xs font-mono text-gray-500">· {project.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">{project.summary}</p>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <img src={project.coverImage} alt={project.title} className="w-full h-80 sm:h-96 object-cover" />
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-[#0e131f] border border-white/5 text-center font-mono">
          <div>
            <p className="text-xl font-bold text-emerald-400">99.99%</p>
            <p className="text-[10px] text-gray-400 uppercase mt-0.5">SLA Uptime</p>
          </div>
          <div>
            <p className="text-xl font-bold text-white">&lt;140ms</p>
            <p className="text-[10px] text-gray-400 uppercase mt-0.5">P99 Latency</p>
          </div>
          <div>
            <p className="text-xl font-bold text-blue-400">$2.4M</p>
            <p className="text-[10px] text-gray-400 uppercase mt-0.5">Revenue Impact</p>
          </div>
        </div>

        {/* Case Study Body */}
        <div className="p-8 rounded-2xl bg-[#0e131f] border border-white/5 space-y-6">
          <h2 className="text-xl font-bold text-white">System Architecture & Execution</h2>
          <div className="text-sm text-gray-300 leading-relaxed space-y-4">
            <p>{project.caseStudyBody}</p>
            <p>
              Engineered with strict zero-runtime reflection, end-to-end type safety, and real-time WebSockets synchronization. Benchmarked across 100,000 synthetic concurrent connections.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t, idx) => (
                <span key={idx} className="text-xs font-mono bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-xl">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* External Links */}
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Launch Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              View GitHub Source
            </a>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 4. PublicExperiencePage (/experience)
// ----------------------------------------------------
export const PublicExperiencePage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const experience = mockStorage.getExperience();

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/experience">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Career Trajectory</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">Professional Experience</h1>
          <p className="text-xs text-gray-400 mt-2 max-w-xl">
            Track record of leadership across distributed engineering teams, high-traffic SaaS, and creative labs.
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
          {experience.map(exp => (
            <div key={exp.id} className="relative pl-8 space-y-2">
              <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-[#070a10]" />

              <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs text-blue-400 font-medium">{exp.company} · {exp.location}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{exp.startDate} – {exp.endDate}</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">{exp.description}</p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1 pt-2">
                  {exp.technologies.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 5. PublicSkillsPage (/skills)
// ----------------------------------------------------
export const PublicSkillsPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const skills = mockStorage.getSkills();

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/skills">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Technical Capability</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">Core Competencies & Radar</h1>
          <p className="text-xs text-gray-400 mt-2 max-w-xl">
            Proficiencies across distributed systems architecture, creative 3D computing, and cloud deployment pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map(cat => (
            <div key={cat.id} className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">{cat.category}</h3>
              <div className="space-y-3">
                {cat.skills.map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-200 font-medium">{s.name}</span>
                      <span className="font-mono text-gray-400">{s.level}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 6. PublicResumePage (/resume) & PublicResumePrintPage (/resume/print)
// ----------------------------------------------------
export const PublicResumePage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const identity = mockStorage.getIdentity();
  const experience = mockStorage.getExperience();
  const skills = mockStorage.getSkills();
  const education = mockStorage.getEducation();
  const certs = mockStorage.getCertifications();

  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/resume">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Curriculum Vitae</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">Executive Resume</h1>
            <p className="text-xs text-gray-400 mt-1">Verified background for recruiters and enterprise partners.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="px-3.5 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" /> Share QR
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div className="bg-white text-gray-950 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-8 font-sans border border-gray-200">
          <div className="border-b-2 border-gray-950 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">{identity.name}</h2>
              <p className="text-sm font-bold text-blue-700 uppercase tracking-wider mt-0.5">{identity.role}</p>
              <p className="text-xs text-gray-600 mt-1">{identity.tagline}</p>
            </div>
            <div className="text-xs text-gray-600 sm:text-right space-y-0.5 font-mono">
              <p>{identity.location}</p>
              <p>{identity.socialLinks.email}</p>
              <p>{identity.socialLinks.website}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Summary</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{identity.bio}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-gray-950">{exp.role}</h4>
                    <p className="text-xs font-semibold text-blue-700">{exp.company} · {exp.location}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-gray-200">
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Education</h3>
              {education.map(edu => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600">{edu.institution} · {edu.year}</p>
                  {edu.score && <p className="font-mono text-blue-700">{edu.score}</p>}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Certifications</h3>
              {certs.map(c => (
                <div key={c.id} className="text-xs space-y-0.5">
                  <p className="font-bold text-gray-900">{c.name}</p>
                  <p className="text-gray-600">{c.issuer} ({c.issueDate})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-white/10 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-purple-400" /> Shareable Resume QR
              </h3>
              <button onClick={() => setShowQrModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-950 fill-current">
                <rect x="10" y="10" width="24" height="24" rx="4" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" rx="2" />
                <rect x="66" y="10" width="24" height="24" rx="4" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" rx="2" />
                <rect x="10" y="66" width="24" height="24" rx="4" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" rx="2" />
                <rect x="42" y="14" width="6" height="12" />
                <rect x="42" y="32" width="16" height="6" />
                <rect x="32" y="44" width="10" height="16" />
                <rect x="48" y="48" width="14" height="8" />
                <rect x="44" y="66" width="6" height="20" />
                <rect x="62" y="82" width="18" height="6" />
              </svg>
            </div>
            <p className="text-xs text-gray-300">Scan to access the full digital candidate brief.</p>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

export const PublicResumePrintPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const identity = mockStorage.getIdentity();
  const experience = mockStorage.getExperience();
  const education = mockStorage.getEducation();
  const certs = mockStorage.getCertifications();
  const skills = mockStorage.getSkills();

  return (
    <div className="bg-white text-gray-950 p-8 sm:p-14 max-w-4xl mx-auto space-y-8 font-sans print:p-0 print:max-w-none">
      <div className="print:hidden pb-4 flex justify-between items-center border-b border-gray-200">
        <button onClick={() => onNavigate('/resume')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Resume View
        </button>
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow">
          Print Document
        </button>
      </div>

      <div className="border-b-2 border-gray-950 pb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">{identity.name}</h1>
          <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">{identity.role}</p>
          <p className="text-xs text-gray-600 mt-1">{identity.tagline}</p>
        </div>
        <div className="text-xs text-gray-600 text-right space-y-0.5 font-mono">
          <p>{identity.location}</p>
          <p>{identity.socialLinks.email}</p>
          <p>{identity.socialLinks.website}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Summary</h2>
        <p className="text-xs text-gray-700 leading-relaxed">{identity.bio}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-gray-950">{exp.role}</h3>
                <p className="text-xs font-semibold text-blue-700">{exp.company} · {exp.location}</p>
              </div>
              <span className="text-xs font-mono text-gray-500">{exp.startDate} – {exp.endDate}</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 pt-2 border-t border-gray-200">
        <div className="space-y-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="text-xs space-y-0.5">
              <p className="font-bold text-gray-900">{edu.degree}</p>
              <p className="text-gray-600">{edu.institution} · {edu.year}</p>
              {edu.score && <p className="font-mono text-blue-700">{edu.score}</p>}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Certifications</h2>
          {certs.map(c => (
            <div key={c.id} className="text-xs space-y-0.5">
              <p className="font-bold text-gray-900">{c.name}</p>
              <p className="text-gray-600">{c.issuer} ({c.issueDate})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 7. PublicBlogListPage (/blog)
// ----------------------------------------------------
export const PublicBlogListPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const posts = mockStorage.getPosts().filter(p => p.status === 'published');
  const [search, setSearch] = useState('');
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const filtered = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubSuccess(true);
    setTimeout(() => {
      setEmailSub('');
      setSubSuccess(false);
    }, 3000);
  };

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/blog">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Engineering Journal</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">Architecture & Systems Writing</h1>
          <p className="text-xs text-gray-400 mt-2 max-w-xl">
            Technical essays on strict component isolation, WebGL rendering, distributed micro-frontends, and AI pipelines.
          </p>
        </div>

        {/* Newsletter Box (Section 16.4) */}
        <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
              <Mail className="w-4 h-4 text-blue-400" /> Engineering Dispatch Newsletter
            </h3>
            <p className="text-xs text-gray-400">Receive architectural teardowns and deep technical case studies monthly.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              required
              placeholder="Enter your email..."
              value={emailSub}
              onChange={e => setEmailSub(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-full sm:w-56"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shrink-0 shadow-lg shadow-blue-600/20"
            >
              {subSuccess ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filtered.map(post => (
            <article
              key={post.id}
              onClick={() => onNavigate(`/blog/${post.slug}`)}
              className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 hover:border-blue-500/40 transition-all duration-300 cursor-pointer space-y-3 group"
            >
              <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                <span className="text-blue-400 font-semibold uppercase">{post.category}</span>
                <span>·</span>
                <span>{post.readingTimeMinutes} min read</span>
                <span>·</span>
                <span>{post.publishedAt || 'Recent'}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="text-xs text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 8. PublicBlogArticlePage (/blog/:slug)
// ----------------------------------------------------
export const PublicBlogArticlePage: React.FC<PublicPageProps> = ({ onNavigate, param }) => {
  const posts = mockStorage.getPosts();
  const post = posts.find(p => p.slug === param || p.id === param) || posts[0];
  const comments = mockStorage.getComments(post.id).filter(c => c.status === 'approved');

  const [claps, setClaps] = useState(42);
  const [hearts, setHearts] = useState(19);
  const [fire, setFire] = useState(31);

  // Comment submission state
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSent, setCommentSent] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    mockStorage.saveComment({
      id: `comm-${Date.now()}`,
      postId: post.id,
      postTitle: post.title,
      authorName,
      authorEmail: authorEmail || 'reader@community.dev',
      content: commentText,
      createdAt: new Date().toISOString(),
      status: 'pending' // Enforces moderation queue!
    });

    setCommentSent(true);
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
    setTimeout(() => setCommentSent(false), 4000);
  };

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/blog">
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
            <span className="px-2.5 py-0.5 bg-blue-600/20 text-blue-400 rounded-full font-bold uppercase">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.readingTimeMinutes} min read</span>
            <span>·</span>
            <span>{post.publishedAt || 'Published recently'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-blue-500 pl-4">
            {post.excerpt}
          </p>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={post.coverImage} alt={post.title} className="w-full h-72 sm:h-96 object-cover" />
          </div>
        )}

        {/* Render Content Blocks */}
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-sans pt-4">
          {post.blocks.map(b => {
            if (b.type === 'heading') {
              return (
                <h2 key={b.id} className="text-2xl font-bold text-white tracking-tight pt-4">
                  {typeof b.content === 'string' ? b.content : ''}
                </h2>
              );
            }
            if (b.type === 'callout') {
              const callout = typeof b.content === 'object' ? b.content : { title: 'Note', text: b.content };
              return (
                <div key={b.id} className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-300 space-y-1">
                  <p className="font-bold text-xs uppercase tracking-wider">{callout.title || 'Architecture Tenet'}</p>
                  <p className="text-xs text-blue-200">{callout.text}</p>
                </div>
              );
            }
            if (b.type === 'code') {
              return (
                <div key={b.id} className="rounded-xl bg-[#090d16] border border-white/10 p-4 font-mono text-xs overflow-x-auto text-emerald-400">
                  <pre>{typeof b.content === 'string' ? b.content : ''}</pre>
                </div>
              );
            }
            return (
              <p key={b.id} className="leading-relaxed">
                {typeof b.content === 'string' ? b.content : ''}
              </p>
            );
          })}
        </div>

        {/* Interactive Reactions Bar (Section 16.13) */}
        <div className="p-4 rounded-2xl bg-[#0e131f] border border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400">Was this insight helpful?</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setClaps(claps + 1)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-blue-400" /> {claps}
            </button>
            <button
              onClick={() => setHearts(hearts + 1)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400" /> {hearts}
            </button>
            <button
              onClick={() => setFire(fire + 1)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" /> {fire}
            </button>
          </div>
        </div>

        {/* Comments Section (Section 16.13) */}
        <div className="pt-8 border-t border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" /> Discussion & Peer Notes ({comments.length})
            </h3>
          </div>

          {/* Approved comments list */}
          <div className="space-y-4">
            {comments.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-[#0e131f] border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{c.authorName}</span>
                  <span className="font-mono text-[10px] text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">{c.content}</p>
              </div>
            ))}
          </div>

          {/* Submit a comment form */}
          <form onSubmit={handleAddComment} className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-4 text-xs">
            <h4 className="font-bold text-white">Leave a Peer Comment</h4>

            {commentSent && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" /> Your note was submitted to the moderation queue and will appear after review.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Your Name *"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email (kept private)"
                value={authorEmail}
                onChange={e => setAuthorEmail(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <textarea
              rows={3}
              required
              placeholder="Share your perspective or question..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 resize-none"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-purple-600/20"
            >
              <Send className="w-3.5 h-3.5" /> Submit for Moderation
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 9. PublicContactPage (/contact)
// ----------------------------------------------------
export const PublicContactPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const identity = mockStorage.getIdentity();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Simulate sending contact inquiry
    mockStorage.addNotification({
      id: `notif-${Date.now()}`,
      title: `Inquiry from ${name}`,
      message: `"${message.slice(0, 80)}..." (${email})`,
      type: 'info',
      timestamp: 'Just now',
      read: false
    });

    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/contact">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Direct Inquiries</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">Initiate Collaboration</h1>
          <p className="text-xs text-gray-400 mt-2 max-w-xl">
            Discuss architectural consulting, staff engineering engagements, or bespoke 3D interactive graphics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Direct Channels</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-500 font-mono block">Email:</span>
                  <a href={`mailto:${identity.socialLinks.email}`} className="text-white font-medium hover:text-blue-400 transition-colors">
                    {identity.socialLinks.email}
                  </a>
                </div>
                <div>
                  <span className="text-gray-500 font-mono block">Base:</span>
                  <span className="text-white">{identity.location} (IST / UTC+5:30)</span>
                </div>
                <div>
                  <span className="text-gray-500 font-mono block">GitHub:</span>
                  <a href={identity.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    github.com/silversten
                  </a>
                </div>
                <div>
                  <span className="text-gray-500 font-mono block">LinkedIn:</span>
                  <a href={identity.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    linkedin.com/in/prajwal-dl
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => setShowQr(true)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5 text-purple-400" /> Share Contact vCard QR
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#0e131f] border border-white/5 space-y-4 text-xs">
              <h3 className="text-base font-bold text-white">Send Direct Message</h3>

              {sent && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4" /> Message received. Prajwal will respond within 24 business hours.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1 font-mono">Your Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-mono">Project Scope / Message *</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Outline timelines, technical objectives, or hiring opportunities..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {showQr && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-white/10 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-purple-400" /> Instant Contact vCard
              </h3>
              <button onClick={() => setShowQr(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-950 fill-current">
                <rect x="10" y="10" width="24" height="24" rx="4" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" rx="2" />
                <rect x="66" y="10" width="24" height="24" rx="4" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" rx="2" />
                <rect x="10" y="66" width="24" height="24" rx="4" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" rx="2" />
                <rect x="42" y="14" width="6" height="12" />
                <rect x="42" y="32" width="16" height="6" />
                <rect x="32" y="44" width="10" height="16" />
                <rect x="48" y="48" width="14" height="8" />
                <rect x="44" y="66" width="6" height="20" />
                <rect x="62" y="82" width="18" height="6" />
              </svg>
            </div>
            <p className="text-xs text-gray-300">Scan on mobile to automatically import Prajwal DL's contact card.</p>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 10. PublicSearchPage (/search)
// ----------------------------------------------------
export const PublicSearchPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const projects = mockStorage.getProjects();
  const posts = mockStorage.getPosts();
  const experience = mockStorage.getExperience();

  const results = useMemo(() => {
    if (!query.trim()) return { projects: [], posts: [], experience: [] };
    const q = query.toLowerCase();
    return {
      projects: projects.filter(p => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q))),
      posts: posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
      experience: experience.filter(e => e.role.toLowerCase().includes(q) || e.company.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
    };
  }, [query, projects, posts, experience]);

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/search">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Global Knowledge Graph</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">Full-Text Search</h1>
          <p className="text-xs text-gray-400 mt-1">Instant discovery across systems, research articles, and career achievements.</p>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 text-gray-500 absolute left-4 top-3.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type anything (e.g. 'Three.js', 'architecture', 'health', 'micro-frontends')..."
            className="w-full bg-[#0e131f] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 shadow-xl"
          />
        </div>

        {query.trim() && (
          <div className="space-y-6 text-xs">
            {results.projects.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-mono text-gray-400 uppercase tracking-wider">Matching Systems ({results.projects.length})</h3>
                <div className="space-y-2">
                  {results.projects.map(p => (
                    <div
                      key={p.id}
                      onClick={() => onNavigate(`/projects/${p.id}`)}
                      className="p-4 rounded-xl bg-[#0e131f] border border-white/5 hover:border-blue-500/30 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-white text-sm">{p.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{p.summary}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.posts.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-mono text-gray-400 uppercase tracking-wider">Matching Articles ({results.posts.length})</h3>
                <div className="space-y-2">
                  {results.posts.map(post => (
                    <div
                      key={post.id}
                      onClick={() => onNavigate(`/blog/${post.slug}`)}
                      className="p-4 rounded-xl bg-[#0e131f] border border-white/5 hover:border-blue-500/30 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-white text-sm">{post.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{post.excerpt}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.projects.length === 0 && results.posts.length === 0 && results.experience.length === 0 && (
              <p className="text-gray-500 text-center py-8">No results found for "{query}".</p>
            )}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 11. PublicLegalPages (/privacy & /terms)
// ----------------------------------------------------
export const PublicPrivacyPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/privacy">
      <div className="max-w-3xl mx-auto space-y-6 text-xs text-gray-300 leading-relaxed">
        <h1 className="text-3xl font-black text-white tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 font-mono">Last updated: March 2024</p>
        <p>
          This portfolio operating system respects visitor privacy. No invasive tracking cookies, pixel beacons, or ad network identifiers are injected.
        </p>
        <h2 className="text-base font-bold text-white pt-2">Data Processing</h2>
        <p>
          Any messages sent via the contact form or testimonial submissions are stored locally in the owner's sandboxed operating system environment for review. We do not monetize, broker, or syndicate personal credentials.
        </p>
      </div>
    </PublicLayout>
  );
};

export const PublicTermsPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/terms">
      <div className="max-w-3xl mx-auto space-y-6 text-xs text-gray-300 leading-relaxed">
        <h1 className="text-3xl font-black text-white tracking-tight">Terms of Service</h1>
        <p className="text-gray-500 font-mono">Last updated: March 2024</p>
        <p>
          All source code architectures, 3D WebGL scenes, design systems, and written case studies presented on this site are the intellectual property of Prajwal DL / SILVERSTEN or their respective client entities.
        </p>
        <p>
          Visitors are permitted to evaluate the candidate brief for employment, engineering contracting, or architectural advisory purposes. Unauthorized mirroring is prohibited.
        </p>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 12. PublicTestimonialSubmitPage (/testimonials/submit)
// ----------------------------------------------------
export const PublicTestimonialSubmitPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [projectRef, setProjectRef] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    mockStorage.saveTestimonial({
      id: `test-${Date.now()}`,
      name,
      role: role || 'Collaborator',
      company: company || 'Enterprise',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      text,
      rating,
      projectRef: projectRef || 'Collaborative Engineering',
      status: 'pending', // Directly enters admin moderation queue!
      createdAt: new Date().toISOString().split('T')[0]
    });

    // Notify admin
    mockStorage.addNotification({
      id: `notif-${Date.now()}`,
      title: `New Testimonial Submitted by ${name}`,
      message: `"${text.slice(0, 80)}..." - pending your review in CMS.`,
      type: 'info',
      timestamp: 'Just now',
      read: false
    });

    setSubmitted(true);
  };

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/testimonials">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Verified Collaboration</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">Submit an Endorsement</h1>
          <p className="text-xs text-gray-400 mt-1">
            Thank you for collaborating with Prajwal DL. Your feedback will be reviewed and published in the portfolio credentials showcase.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-[#0e131f] border border-emerald-500/30 text-center space-y-4">
            <Check className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-lg font-bold text-white">Recommendation Received!</h2>
            <p className="text-xs text-gray-300">
              Thank you for supporting Prajwal DL's engineering practice. Your testimonial has been routed to the owner moderation console.
            </p>
            <button
              onClick={() => onNavigate('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
            >
              Explore Portfolio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 block mb-1 font-mono">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1 font-mono">Your Role / Title *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="e.g. VP of Engineering"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 block mb-1 font-mono">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Stripe / Meta"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1 font-mono">Shared Project / Engagement</label>
                <input
                  type="text"
                  value={projectRef}
                  onChange={e => setProjectRef(e.target.value)}
                  placeholder="e.g. Triage Engine MVP"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 block mb-1 font-mono">Recommendation / Endorsement *</label>
              <textarea
                rows={5}
                required
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Describe Prajwal's technical leadership, communication, and engineering delivery..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="text-gray-400 block mb-1 font-mono">Rating</label>
              <select
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                className="w-full bg-[#0a0e17] border border-white/10 rounded-xl px-3 py-2 text-white"
              >
                <option value={5}>5 Stars — Outstanding execution</option>
                <option value={4}>4 Stars — Great results</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20"
            >
              Submit Recommendation
            </button>
          </form>
        )}
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 13. PublicRSSFeedPage (/rss.xml)
// ----------------------------------------------------
export const PublicRSSFeedPage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  const posts = mockStorage.getPosts().filter(p => p.status === 'published');
  const [copied, setCopied] = useState(false);

  const xmlContent = useMemo(() => {
    const items = posts.map(p => `
    <item>
      <title>${p.title}</title>
      <link>${window.location.origin}/blog/${p.slug}</link>
      <description>${p.excerpt}</description>
      <pubDate>${p.publishedAt || '2024-03-01'}</pubDate>
      <guid>${p.id}</guid>
    </item>`).join('');

    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Prajwal DL / SILVERSTEN — Engineering Journal</title>
    <link>${window.location.origin}/blog</link>
    <description>Systems Architecture, 3D Graphics, and High-Throughput Engineering</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;
  }, [posts]);

  const copyFeed = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/rss.xml">
      <div className="max-w-4xl mx-auto space-y-6 font-mono text-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Rss className="w-5 h-5 text-amber-400" /> RSS 2.0 Syndication Feed
            </h1>
            <p className="text-gray-400 text-[11px] mt-0.5">Auto-regenerated on article publish event.</p>
          </div>

          <button
            onClick={copyFeed}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'XML Copied' : 'Copy Feed XML'}
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#090d16] border border-white/10 overflow-x-auto text-emerald-400 max-h-[550px]">
          <pre>{xmlContent}</pre>
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 14. PublicOfflinePage (/offline)
// ----------------------------------------------------
export const PublicOfflinePage: React.FC<PublicPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#070a10] text-gray-100 font-sans p-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-md w-full bg-[#0e131f] border border-white/10 rounded-2xl p-8 space-y-4 shadow-2xl">
        <WifiOff className="w-10 h-10 text-amber-400 mx-auto" />
        <h1 className="text-xl font-bold text-white">Network Connection Paused</h1>
        <p className="text-xs text-gray-400 leading-relaxed">
          You are exploring PDL Portfolio OS in offline PWA state. Previously visited case studies and theme assets remain available from the local service cache.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            Go to Cached Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
};
