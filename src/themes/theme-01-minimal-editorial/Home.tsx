import React, { useState, useEffect } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  ArrowUpRight, Mail, Download, 
  Terminal, Code2, Layers, Cpu, CheckCircle2, Star, ExternalLink,
  ChevronRight, Sparkles, Send, GitCommit, GitBranch, ShieldCheck, Globe
} from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z" />
  </svg>
);

const TwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  blogPosts, 
  experience, 
  skillCategories, 
  onNavigate 
}) => {
  const roles = [
    'Full-Stack Developer',
    'Systems Architect',
    'Cloud Infrastructure Engineer',
    'Open Source Contributor'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  const copyEmail = () => {
    navigator.clipboard.writeText(identity.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#e6edf3] font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Sleek Minimal Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#0a0c10]/85 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
              &gt;_
            </div>
            <div>
              <span className="font-semibold text-sm text-white tracking-tight block leading-none">
                {identity.name}
              </span>
              <span className="text-[11px] font-mono text-gray-500 leading-none">
                {identity.alias} · {identity.location}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-mono text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#writing" className="hover:text-white transition-colors">Writing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={identity.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/[0.08] transition-colors"
            >
              Admin OS
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-32">
        
        {/* ============================================================
            1. HERO SECTION
           ============================================================ */}
        <section className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for full-stack engineering & consulting
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Hi, I'm {identity.name}.
            </h1>

            <div className="text-2xl sm:text-3xl font-medium text-gray-300 font-mono flex items-center gap-2">
              <span className="text-gray-500">&gt;</span>
              <span className="text-emerald-400">{text}</span>
              <span className="w-2.5 h-7 bg-emerald-400 animate-pulse inline-block" />
            </div>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed pt-2">
              {identity.tagline}. I specialize in building fault-tolerant backend architectures,
              clean frontend interfaces, and distributed cloud microservices that scale under heavy load.
            </p>
          </div>

          {/* CTAs and Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold transition-colors flex items-center gap-2"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate('/resume')}
              className="px-6 py-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-gray-200 border border-white/[0.1] text-xs font-mono transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-gray-400" />
              <span>Download Resume</span>
            </button>
            <button
              onClick={copyEmail}
              className="px-4 py-3 rounded-lg text-gray-400 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>{copiedEmail ? 'Copied to Clipboard!' : identity.socialLinks.email}</span>
            </button>
          </div>

          {/* Terminal Code Block */}
          <div className="rounded-xl bg-[#0e121a] border border-white/[0.08] overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-[#131822] border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-gray-400 ml-2">architecture.config.ts</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400/80 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 99.99% SLO
              </span>
            </div>
            <div className="p-5 font-mono text-xs text-gray-300 space-y-1.5 overflow-x-auto">
              <p><span className="text-purple-400">export const</span> <span className="text-blue-400">developerProfile</span> = &#123;</p>
              <p className="pl-4"><span className="text-gray-400">engineer:</span> <span className="text-emerald-300">"{identity.name}"</span>,</p>
              <p className="pl-4"><span className="text-gray-400">alias:</span> <span className="text-emerald-300">"{identity.alias}"</span>,</p>
              <p className="pl-4"><span className="text-gray-400">currentFocus:</span> <span className="text-emerald-300">"Distributed Systems · Full-Stack React & Go · AI Agents"</span>,</p>
              <p className="pl-4"><span className="text-gray-400">principles:</span> [<span className="text-amber-300">"Zero-Downtime"</span>, <span className="text-amber-300">"Typed-Contracts"</span>, <span className="text-amber-300">"Measurable-Impact"</span>],</p>
              <p className="pl-4"><span className="text-gray-400">availability:</span> <span className="text-purple-400">true</span></p>
              <p>&#125;;</p>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. ABOUT SECTION
           ============================================================ */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <span>// 01. Context</span>
            <div className="h-[1px] flex-1 bg-white/[0.08]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Engineering with discipline, purpose, and measurable outcomes.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {identity.bio}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Currently operating as {identity.role} at {identity.alias} Studio. Over the past 8+ years,
                I have designed and implemented systems handling millions of transactions, built 
                design systems used across enterprise teams, and contributed to modern open-source web tooling.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Impact At A Glance</h3>
              <div className="space-y-4 font-mono">
                <div>
                  <div className="text-2xl font-bold text-white">{identity.stats.revenueInfluenced}</div>
                  <div className="text-xs text-gray-500">Revenue & Capital Influenced</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">{identity.stats.projectsShipped}+</div>
                  <div className="text-xs text-gray-500">Production Systems Shipped</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">99.98%</div>
                  <div className="text-xs text-gray-500">Median Production Availability</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. SKILLS SECTION
           ============================================================ */}
        <section id="skills" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <span>// 02. Technical Arsenal</span>
            <div className="h-[1px] flex-1 bg-white/[0.08]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Categorized Stack & Tooling
            </h2>
            <p className="text-xs font-mono text-gray-400">
              Evaluated by production delivery experience — displayed without misleading progress bars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat) => (
              <div 
                key={cat.id} 
                className="p-5 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-4 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {cat.category}
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">{cat.skills.length}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-gray-300 border border-white/[0.06] transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            4. PROJECTS SECTION
           ============================================================ */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <span>// 03. Selected Work</span>
            <div className="h-[1px] flex-1 bg-white/[0.08]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Production Systems
              </h2>
              <p className="text-xs font-mono text-gray-400 mt-1">
                Real-world products delivering concrete business impact.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/projects')}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View all projects ({projects.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((proj) => (
              <article
                key={proj.id}
                className="group rounded-xl bg-[#0e121a] border border-white/[0.08] hover:border-emerald-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20"
              >
                {/* Mockup Preview Top */}
                <div 
                  onClick={() => onNavigate(`/projects/${proj.slug}`)}
                  className="h-52 w-full bg-[#131822] overflow-hidden cursor-pointer relative"
                >
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0a0c10]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-300">
                    {proj.date?.slice(0, 4) || '2024'}
                  </div>
                </div>

                {/* Content Bottom */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase text-emerald-400 tracking-wider">
                        {proj.role}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-300 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                        Production Live
                      </span>
                    </div>

                    <h3 
                      onClick={() => onNavigate(`/projects/${proj.slug}`)}
                      className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {proj.title}
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-white/[0.04] text-gray-300 px-2 py-0.5 rounded border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links & CTA */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-3">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            title="Repository"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => onNavigate(`/projects/${proj.slug}`)}
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            5. OPEN SOURCE & GITHUB SECTION
           ============================================================ */}
        <section className="p-8 rounded-xl bg-[#0e121a] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">// Open Source</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Public Contributions & Repositories</h2>
            </div>
            <a
              href={identity.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-white border border-white/[0.1] inline-flex items-center gap-2 self-start transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>View GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
            </a>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>842 contributions in the last year</span>
              <span className="text-emerald-400">Top 3% active developer</span>
            </div>
            <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 p-3 bg-[#0a0c10] rounded-lg border border-white/[0.06] overflow-hidden">
              {Array.from({ length: 96 }).map((_, i) => {
                const levels = ['bg-white/[0.04]', 'bg-emerald-950', 'bg-emerald-800', 'bg-emerald-600', 'bg-emerald-400'];
                const level = (i * 7 + 3) % 5;
                return (
                  <div
                    key={i}
                    className={`h-3 w-full rounded-sm ${levels[level]} transition-opacity hover:opacity-80`}
                    title={`Day ${i + 1}: ${level * 3} contributions`}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            6. EXPERIENCE TIMELINE
           ============================================================ */}
        <section id="experience" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <span>// 04. Career History</span>
            <div className="h-[1px] flex-1 bg-white/[0.08]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Work Experience & Milestones
          </h2>

          <div className="border-l border-white/[0.08] pl-6 sm:pl-8 space-y-12">
            {experience.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0a0c10] border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors" />

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-lg font-bold text-white">
                      {exp.role} <span className="text-emerald-400">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-gray-500">
                      {exp.startDate} — {exp.endDate || 'Present'} · {exp.location}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-white/[0.04] text-gray-400 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            7. BLOG / WRITING SECTION
           ============================================================ */}
        <section id="writing" className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <span>// 05. Engineering Essays</span>
            <div className="h-[1px] flex-1 bg-white/[0.08]" />
          </div>

          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Technical Writing & Notes
            </h2>
            <button
              onClick={() => onNavigate('/blog')}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>All essays ({blogPosts.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                onClick={() => onNavigate(`/blog/${post.slug}`)}
                className="p-5 rounded-xl bg-[#0e121a] border border-white/[0.08] hover:border-emerald-500/40 cursor-pointer group flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span className="text-emerald-400 uppercase">{post.category}</span>
                    <span>{post.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>{post.publishedAt}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-gray-400" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            8. CONTACT SECTION
           ============================================================ */}
        <section id="contact" className="space-y-8 scroll-mt-24 pb-12">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <span>// 06. Initiation</span>
            <div className="h-[1px] flex-1 bg-white/[0.08]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                Interested in working together?
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Whether you have an upcoming project, need architectural consulting, or want to
                discuss high-throughput infrastructure — my inbox is open.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <a href={`mailto:${identity.socialLinks.email}`} className="hover:text-white underline underline-offset-4">
                    {identity.socialLinks.email}
                  </a>
                </div>
                <div className="text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Typical response time: under 4 hours</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#0e121a] border border-white/[0.08]">
              {formSubmitted ? (
                <div className="p-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Message Transmitted</h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Thank you for reaching out. I'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#0a0c10] border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#0a0c10] border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your product, timeline, or engineering challenge..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#0a0c10] border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* Clean Footer */}
      <footer className="border-t border-white/[0.06] bg-[#07090d] py-12 text-xs font-mono text-gray-500">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-gray-300 font-semibold">{identity.name} · {identity.alias}</p>
            <p className="text-[11px]">Crafted with React, TypeScript, and clean engineering standards.</p>
          </div>

          <div className="flex items-center gap-5 text-gray-400">
            <a href={identity.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <GithubIcon className="w-4 h-4 inline mr-1" /> GitHub
            </a>
            <a href={identity.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <LinkedinIcon className="w-4 h-4 inline mr-1" /> LinkedIn
            </a>
            <a href={identity.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <TwitterIcon className="w-4 h-4 inline mr-1" /> Twitter
            </a>
            <button onClick={() => onNavigate('/admin')} className="text-emerald-400 hover:underline">Admin</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
