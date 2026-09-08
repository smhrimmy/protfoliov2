import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Globe, Calendar, Clock, MapPin, 
  Award, Building, ChevronRight, Search, Mail, Send, Check, Star, 
  Download, Printer, QrCode, ThumbsUp, Heart, Flame, Shield, FileText,
  Terminal, Sparkles, MessageSquare, Copy, Rss, WifiOff, X, Quote, CheckCircle2
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
    { label: 'Work', route: '/projects' },
    { label: 'About', route: '/about' },
    { label: 'Experience', route: '/experience' },
    { label: 'Essays', route: '/blog' },
    { label: 'Resume', route: '/resume' },
    { label: 'Contact', route: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#e6edf3] font-sans flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0a0c10]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 group-hover:scale-105 transition-transform">
              &gt;_
            </div>
            <div>
              <span className="text-xs font-bold text-white tracking-tight uppercase block leading-none">
                {identity.name}
              </span>
              <span className="text-[10px] font-mono text-gray-500 leading-none">
                {identity.alias}
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-400">
            {navLinks.map(link => {
              const isActive = activeRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => onNavigate(link.route)}
                  className={`transition-colors ${
                    isActive
                      ? 'text-emerald-400 font-semibold'
                      : 'hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/search')}
              className="p-1.5 text-gray-400 hover:text-white transition-colors"
              title="Search Site"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-xs font-mono px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/[0.08] rounded-lg transition-colors inline-flex items-center gap-1"
            >
              <span>Admin OS</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 sm:py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#07090d] py-12 text-xs font-mono text-gray-500">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-gray-300 font-semibold">{identity.name} · {identity.alias}</p>
            <p className="text-[11px]">Web Advisor & Full Stack Developer · Technical Troubleshooting Specialist</p>
          </div>

          <div className="flex items-center gap-5 text-gray-400">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => onNavigate('/rss.xml')} className="hover:text-white transition-colors flex items-center gap-1">
              <Rss className="w-3 h-3 text-amber-400" /> RSS
            </button>
            <button onClick={() => onNavigate('/admin')} className="text-emerald-400 hover:underline">Admin</button>
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
      <div className="space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">// 01. Context</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            About {identity.name}
          </h1>
          <p className="text-sm text-gray-400 font-mono">
            {identity.role} · {identity.location}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6 text-sm text-gray-300 leading-relaxed">
            <p className="text-base text-white font-medium leading-relaxed">
              {identity.bio}
            </p>
            <p>
              I design and build software systems where reliability, performance, and aesthetic discipline intersect.
              Over the past decade, I've engineered distributed cloud backends, created design systems
              used by cross-functional teams, and built real-time collaborative interfaces.
            </p>
            <p>
              My philosophy centers on radical simplification: removing unnecessary abstractions,
              enforcing strict type safety, and ensuring that every system delivers measurable, verifiable value.
            </p>

            <div className="pt-4 flex items-center gap-4 text-xs font-mono">
              <button
                onClick={() => onNavigate('/resume')}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full CV</span>
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="px-5 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 border border-white/10 transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0e121a] border border-white/[0.08] space-y-6">
            <div className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
              <img
                src={identity.avatarUrl}
                alt={identity.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3 font-mono text-xs text-gray-400">
              <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                <span>Status</span>
                <span className="text-emerald-400">Available Q2/Q3</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                <span>Location</span>
                <span className="text-white">{identity.location}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                <span>Experience</span>
                <span className="text-white">8+ Years</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Email</span>
                <a href={`mailto:${identity.socialLinks.email}`} className="text-emerald-400 hover:underline">
                  {identity.socialLinks.email}
                </a>
              </div>
            </div>
          </div>
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
      <div className="space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">// Selected Works</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Production Systems & Case Studies</h1>
          <p className="text-xs font-mono text-gray-400 max-w-xl">
            Real-world products delivering measurable business impact and resilient cloud uptime.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-white/[0.06] py-4">
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono no-scrollbar">
            {['all', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === cat
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white/[0.04] text-gray-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Systems' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#0e121a] border border-white/[0.08] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(p => (
            <article
              key={p.id}
              onClick={() => onNavigate(`/projects/${p.slug || p.id}`)}
              className="group cursor-pointer rounded-xl bg-[#0e121a] border border-white/[0.08] overflow-hidden hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-black/40">
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#0a0c10]/80 backdrop-blur-md text-[10px] font-mono text-gray-300 rounded border border-white/10">
                    {p.date?.slice(0, 4) || '2024'}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 uppercase">{p.role}</span>
                    <span className="text-gray-500">{p.client || 'Enterprise'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {p.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 4).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-white/[0.04] text-gray-400 px-2 py-0.5 rounded border border-white/[0.06]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold group-hover:text-emerald-300">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

// ----------------------------------------------------
// 3. PublicProjectDetailPage (/projects/:id)
// FULL 12-SECTION CASE STUDY TEMPLATE (websiteprompts.com)
// ----------------------------------------------------
export const PublicProjectDetailPage: React.FC<PublicPageProps> = ({ onNavigate, param }) => {
  const projects = mockStorage.getProjects();
  const currentIndex = projects.findIndex(p => p.id === param || p.slug === param);
  const project = currentIndex >= 0 ? projects[currentIndex] : projects[0];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/projects">
      <div className="space-y-16 max-w-4xl mx-auto">
        
        {/* Top Back Nav */}
        <button
          onClick={() => onNavigate('/projects')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all projects
        </button>

        {/* ============================================================
            1. HERO SECTION
            - Large hero image
            - Project title
            - Client name & Quick summary
            - Quick stats bar: Timeline, Role, Team Size, Year
           ============================================================ */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono font-bold uppercase">
                {project.role}
              </span>
              <span className="text-xs font-mono text-gray-500">· {project.client || 'Enterprise Client'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Large Hero Impact Image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-black">
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl bg-[#0e121a] border border-white/[0.08] font-mono text-xs">
            <div>
              <span className="text-gray-500 block mb-1">TIMELINE</span>
              <span className="text-white font-bold">8 Weeks</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">ROLE</span>
              <span className="text-emerald-400 font-bold">{project.role}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">TEAM SIZE</span>
              <span className="text-white font-bold">3 Engineers</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">YEAR</span>
              <span className="text-white font-bold">{project.date?.slice(0, 4) || '2024'}</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. PROJECT OVERVIEW
            - The Brief
            - The Client
            - Deliverables
            - Tools Used
           ============================================================ */}
        <section className="space-y-8 border-t border-white/[0.08] pt-12">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-400">// 01. Overview</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">The Brief & Deliverables</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 font-bold">The Brief</h3>
              <p className="text-gray-300">
                The objective was to completely re-architect the legacy monolith into an edge-distributed,
                zero-downtime platform capable of handling multi-region transactions with deterministic latency.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 font-bold">The Client Context</h3>
              <p className="text-gray-300">
                {project.client || 'TechFlow Inc.'}, a fast-growing digital platform managing high-concurrency
                customer traffic across North America, Europe, and Asia-Pacific.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Core Technologies Deployed</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span key={idx} className="text-xs font-mono bg-white/[0.05] text-gray-200 border border-white/10 px-3 py-1 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            3. THE CHALLENGE & CLIENT PULL QUOTE
           ============================================================ */}
        <section className="space-y-8 border-t border-white/[0.08] pt-12">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-400">// 02. The Bottleneck</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">The Challenge</h2>
          </div>

          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              Under surge traffic, the legacy system experienced catastrophic connection pooling exhaustion,
              spiking P99 latencies past 3,200ms and causing dropped carts during high-velocity promotional drops.
            </p>
            <p>
              Constraints included an unmovable 8-week production launch window, strict data residency requirements,
              and a requirement that zero live customer transactions could be interrupted during migration.
            </p>
          </div>

          {/* Client Pull Quote */}
          <div className="p-8 rounded-2xl bg-emerald-500/5 border-l-4 border-emerald-500 border border-white/[0.06] space-y-2">
            <Quote className="w-8 h-8 text-emerald-500/40" />
            <blockquote className="text-base sm:text-lg font-medium text-gray-100 italic leading-relaxed">
              "We were losing customers at peak checkout and hitting database deadlocks. We needed an engineer
              who could dissect our architecture and guarantee resilience under heavy load."
            </blockquote>
            <p className="text-xs font-mono text-gray-400 pt-2">— VP of Product, {project.client || 'Enterprise Client'}</p>
          </div>
        </section>

        {/* ============================================================
            4. THE 5-PHASE PROCESS
           ============================================================ */}
        <section className="space-y-8 border-t border-white/[0.08] pt-12">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-400">// 03. Execution</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">Engineering Process & Phasing</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-2">
              <span className="text-emerald-400 font-bold block">PHASE 01</span>
              <h4 className="text-white font-bold">Audit</h4>
              <p className="text-[11px] text-gray-400 font-sans">Bottleneck profiling & telemetry baseline.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-2">
              <span className="text-emerald-400 font-bold block">PHASE 02</span>
              <h4 className="text-white font-bold">Strategy</h4>
              <p className="text-[11px] text-gray-400 font-sans">Edge routing & schema partition model.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-2">
              <span className="text-emerald-400 font-bold block">PHASE 03</span>
              <h4 className="text-white font-bold">Design</h4>
              <p className="text-[11px] text-gray-400 font-sans">Component contracts & typed API specs.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-2">
              <span className="text-emerald-400 font-bold block">PHASE 04</span>
              <h4 className="text-white font-bold">Build</h4>
              <p className="text-[11px] text-gray-400 font-sans">Edge worker rollout & shadow traffic tests.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-2">
              <span className="text-emerald-400 font-bold block">PHASE 05</span>
              <h4 className="text-white font-bold">Launch</h4>
              <p className="text-[11px] text-gray-400 font-sans">Zero-downtime cutover & live validation.</p>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. THE SOLUTION & ARCHITECTURE
           ============================================================ */}
        <section className="space-y-8 border-t border-white/[0.08] pt-12">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-400">// 04. Technical Solution</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">Architecture & Decisions</h2>
          </div>

          <div className="p-8 rounded-2xl bg-[#0e121a] border border-white/[0.08] space-y-6 text-sm text-gray-300 leading-relaxed">
            <p>{project.caseStudyBody}</p>
            <p>
              Engineered with strict zero-runtime reflection, end-to-end type contracts, and real-time state
              synchronization. All telemetry is piped directly into Grafana and CloudWatch with automated canary rollback triggers.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.06] text-xs font-mono">
              <div>
                <span className="text-emerald-400 font-bold block mb-1">DECISION: EDGE CACHE</span>
                <p className="text-gray-400 font-sans">Stateless edge execution handles 94% of reads without database hits.</p>
              </div>
              <div>
                <span className="text-emerald-400 font-bold block mb-1">DECISION: OPTIMISTIC LOCKING</span>
                <p className="text-gray-400 font-sans">Eliminated deadlock states across 100,000 synthetic test connections.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. THE RESULTS (BIG NUMBERS)
           ============================================================ */}
        <section className="space-y-8 border-t border-white/[0.08] pt-12">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-400">// 05. Measurable Outcomes</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">Verified Production Impact</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            <div className="p-6 rounded-xl bg-[#0e121a] border border-white/[0.08]">
              <p className="text-3xl font-bold text-emerald-400">+156%</p>
              <p className="text-[11px] text-gray-400 uppercase mt-1">Throughput</p>
            </div>
            <div className="p-6 rounded-xl bg-[#0e121a] border border-white/[0.08]">
              <p className="text-3xl font-bold text-white">-40%</p>
              <p className="text-[11px] text-gray-400 uppercase mt-1">P99 Latency</p>
            </div>
            <div className="p-6 rounded-xl bg-[#0e121a] border border-white/[0.08]">
              <p className="text-3xl font-bold text-emerald-400">$2.4M</p>
              <p className="text-[11px] text-gray-400 uppercase mt-1">Influenced GMV</p>
            </div>
            <div className="p-6 rounded-xl bg-[#0e121a] border border-white/[0.08]">
              <p className="text-3xl font-bold text-white">99.99%</p>
              <p className="text-[11px] text-gray-400 uppercase mt-1">SLO Availability</p>
            </div>
          </div>
        </section>

        {/* ============================================================
            7. LESSONS LEARNED & NEXT PROJECT
           ============================================================ */}
        <section className="space-y-8 border-t border-white/[0.08] pt-12">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-400">// 06. Retrospective</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">Lessons Learned</h2>
          </div>

          <div className="p-6 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-3 text-xs text-gray-300 leading-relaxed font-mono">
            <p>• Shadowing production traffic early revealed edge-case timeouts that unit tests failed to catch.</p>
            <p>• Investing in strict TypeScript schema contracts reduced integration bugs between services to zero.</p>
            <p>• Clear SLO dashboards fostered team confidence during the live cutover window.</p>
          </div>

          {/* Next Project Nav */}
          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-gray-500 uppercase block">NEXT CASE STUDY</span>
              <button
                onClick={() => onNavigate(`/projects/${nextProject.slug || nextProject.id}`)}
                className="text-base font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>{nextProject.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onNavigate('/projects')}
              className="text-xs font-mono text-gray-400 hover:text-white"
            >
              View All Work
            </button>
          </div>
        </section>

        {/* ============================================================
            8. CONTEXTUAL HIRE ME CTA
           ============================================================ */}
        <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-tr from-[#0e121a] to-[#151c28] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">Want results like these for your engineering product?</h3>
            <p className="text-xs text-gray-400 font-mono">Currently available for selected architectural initiatives and leadership advisory.</p>
          </div>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs font-mono transition-colors shrink-0"
          >
            Let's Work Together
          </button>
        </section>

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
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">// Career</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Professional History</h1>
          <p className="text-xs font-mono text-gray-400 max-w-xl">
            Track record of technical leadership across distributed systems, high-scale web applications, and creative tooling.
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[1px] before:bg-white/[0.08]">
          {experience.map(exp => (
            <div key={exp.id} className="relative pl-8 space-y-2">
              <span className="absolute left-[9px] top-6 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0a0c10]" />

              <div className="p-6 sm:p-8 rounded-2xl bg-[#0e121a] border border-white/[0.08] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs text-emerald-400 font-mono">{exp.company} · {exp.location}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{exp.startDate} – {exp.endDate}</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-sans">{exp.description}</p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-inside pt-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t, idx) => (
                    <span key={idx} className="text-[11px] font-mono bg-white/[0.04] text-gray-300 border border-white/[0.06] px-2.5 py-1 rounded-md">
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
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">// Capabilities</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Technical Toolbelt & Disciplines</h1>
          <p className="text-xs font-mono text-gray-400 max-w-xl">
            Categorized core proficiencies across distributed backends, UI architecture, cloud infrastructure, and 3D graphics. Clean badges without arbitrary percentages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map(cat => (
            <div key={cat.id} className="p-6 rounded-2xl bg-[#0e121a] border border-white/[0.08] space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-gray-200 font-mono hover:border-emerald-500/40 hover:text-white transition-colors"
                  >
                    {s.name}
                  </span>
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

  const [showQrModal, setShowQrModal] = useState(false);

  // Resume flat skills list matching resume exactly
  const resumeSkills = [
    'Technical Troubleshooting',
    'WordPress Support',
    'DNS Management',
    'Frontend Development',
    'UI/UX Design',
    'Problem-Solving',
    'Communication',
    'Multitasking',
    'Quick Learner',
    'Microsoft Excel'
  ];

  return (
    <PublicLayout onNavigate={onNavigate} activeRoute="/resume">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Curriculum Vitae</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">Professional Resume</h1>
            <p className="text-xs text-gray-400 mt-1">Verified credentials and experience for recruiters and hiring managers.</p>
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
              className="px-4 py-2 bg-[#ad314d] hover:bg-[#92243d] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-[#ad314d]/20"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
          </div>
        </div>

        {/* Paper Container (Matches Resume PDF) */}
        <div className="bg-white text-gray-950 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-8 font-sans border border-gray-200">
          {/* Header Row */}
          <div className="border-b-2 border-gray-950 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-950">{identity.name}</h2>
              <p className="text-sm font-bold text-[#ad314d] uppercase tracking-wider mt-1">{identity.role}</p>
              <p className="text-xs text-gray-600 mt-0.5">{identity.tagline}</p>
            </div>
            <div className="text-xs text-gray-700 sm:text-right space-y-1 font-mono">
              <p className="font-bold">{identity.socialLinks.phone || '+918105561638'} ☎</p>
              <p><a href={`mailto:${identity.socialLinks.email}`} className="hover:underline text-blue-600">{identity.socialLinks.email}</a> ✉</p>
              <p><a href={identity.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-blue-600">linkedin.com/in/prajwal-d-l-118198370/</a> 🔗</p>
              <p><a href={identity.socialLinks.website} target="_blank" rel="noreferrer" className="hover:underline text-blue-600">{identity.socialLinks.website}</a> 🌐</p>
              <p className="font-semibold text-gray-900">{identity.location} 📍</p>
            </div>
          </div>

          {/* 1. Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 flex items-center gap-1.5">
              <span>👤</span> Summary
            </h3>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">{identity.bio}</p>
          </div>

          {/* 2. Skills */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 flex items-center gap-1.5">
              <span>📊</span> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeSkills.map((sk, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 text-xs font-medium rounded-md shadow-xs">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 flex items-center gap-1.5">
              <span>🎓</span> Education
            </h3>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-950 uppercase tracking-tight">{edu.institution}</p>
                    <span className="font-mono text-gray-600 text-[11px]">{edu.year}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{edu.degree} · <span className="text-gray-600">{edu.location}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1 flex items-center gap-1.5">
              <span>💼</span> Experience
            </h3>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-gray-950">{exp.company}</h4>
                      <p className="text-xs font-semibold text-[#ad314d]">{exp.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-gray-700 block font-semibold">{exp.startDate} – {exp.endDate}</span>
                      <span className="text-[11px] text-gray-500 font-mono">{exp.location}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-gray-800 space-y-1 leading-relaxed">
                    {exp.achievements && exp.achievements.length > 0 ? (
                      exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))
                    ) : (
                      <li>{exp.description}</li>
                    )}
                  </ul>
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

  const resumeSkills = [
    'Technical Troubleshooting',
    'WordPress Support',
    'DNS Management',
    'Frontend Development',
    'UI/UX Design',
    'Problem-Solving',
    'Communication',
    'Multitasking',
    'Quick Learner',
    'Microsoft Excel'
  ];

  return (
    <div className="bg-white text-gray-950 p-8 sm:p-14 max-w-4xl mx-auto space-y-8 font-sans print:p-0 print:max-w-none">
      <div className="print:hidden pb-4 flex justify-between items-center border-b border-gray-200">
        <button onClick={() => onNavigate('/resume')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Resume View
        </button>
        <button onClick={() => window.print()} className="px-4 py-2 bg-[#ad314d] text-white text-xs font-semibold rounded-lg shadow">
          Print Document
        </button>
      </div>

      {/* Header */}
      <div className="border-b-2 border-gray-950 pb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-950">{identity.name}</h1>
          <p className="text-sm font-bold text-[#ad314d] uppercase tracking-wider">{identity.role}</p>
        </div>
        <div className="text-xs text-gray-700 text-right space-y-0.5 font-mono">
          <p className="font-bold">{identity.socialLinks.phone || '+918105561638'}</p>
          <p>{identity.socialLinks.email}</p>
          <p>linkedin.com/in/prajwal-d-l-118198370/</p>
          <p>{identity.socialLinks.website}</p>
          <p className="font-semibold">{identity.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Summary</h2>
        <p className="text-xs text-gray-800 leading-relaxed">{identity.bio}</p>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Skills</h2>
        <div className="flex flex-wrap gap-1.5">
          {resumeSkills.map((sk, i) => (
            <span key={i} className="px-2.5 py-0.5 bg-gray-100 border border-gray-300 text-gray-800 text-[11px] font-medium rounded">
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Education</h2>
        <div className="space-y-2">
          {education.map(edu => (
            <div key={edu.id} className="text-xs">
              <div className="flex justify-between items-start font-bold text-gray-950">
                <span>{edu.institution}</span>
                <span className="font-mono text-gray-600 font-normal">{edu.year}</span>
              </div>
              <p className="text-gray-800">{edu.degree} · {edu.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Experience</h2>
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-gray-950">{exp.company}</h3>
                  <p className="text-xs font-semibold text-[#ad314d]">{exp.role}</p>
                </div>
                <div className="text-right text-xs font-mono text-gray-600">
                  <span>{exp.startDate} – {exp.endDate}</span>
                  <p className="text-[11px] text-gray-500">{exp.location}</p>
                </div>
              </div>
              <ul className="list-disc list-outside pl-4 text-xs text-gray-800 space-y-0.5 leading-relaxed">
                {exp.achievements && exp.achievements.length > 0 ? (
                  exp.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))
                ) : (
                  <li>{exp.description}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">// Contact</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Initiate Collaboration</h1>
          <p className="text-xs font-mono text-gray-400 max-w-xl">
            Discuss architectural consulting, staff engineering engagements, or bespoke digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0e121a] border border-white/[0.08] space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">// Direct Channels</h3>
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-gray-500 block text-[11px]">EMAIL</span>
                  <a href={`mailto:${identity.socialLinks.email}`} className="text-white hover:text-emerald-400 transition-colors">
                    {identity.socialLinks.email}
                  </a>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px]">LOCATION</span>
                  <span className="text-white">{identity.location} (IST / UTC+5:30)</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px]">GITHUB</span>
                  <a href={identity.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                    github.com/smhrimmy
                  </a>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px]">LINKEDIN</span>
                  <a href={identity.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                    linkedin.com/in/prajwal-dl
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => setShowQr(true)}
                  className="w-full py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/[0.08] rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Share Contact vCard QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#0e121a] border border-white/[0.08] space-y-5 text-xs font-mono">
              <h3 className="text-base font-bold text-white font-sans">Send Direct Message</h3>

              {sent && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl flex items-center gap-2 font-mono text-xs">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Message received. Prajwal will respond within 24 business hours.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 block mb-1.5 text-[11px]">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1.5 text-[11px]">WORK EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1.5 text-[11px]">PROJECT SCOPE / MESSAGE *</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Outline timelines, technical objectives, or hiring opportunities..."
                  className="w-full bg-black/40 border border-white/[0.1] rounded-xl p-3.5 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none leading-relaxed font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex items-center gap-2 transition-colors font-mono text-xs shadow-lg shadow-emerald-950"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {showQr && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e121a] border border-white/[0.1] rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <QrCode className="w-4 h-4 text-emerald-400" /> Instant Contact vCard
              </h3>
              <button onClick={() => setShowQr(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-lg">
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
            <p className="text-xs text-gray-300 font-mono">Scan on mobile to automatically import Prajwal DL's contact card.</p>
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
          All source code architectures, 3D WebGL scenes, design systems, and written case studies presented on this site are the intellectual property of Prajwal DL or their respective open-source repositories.
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
    <title>Prajwal DL — Engineering Notes</title>
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
