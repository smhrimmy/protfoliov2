import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  Terminal, Code2, Layers, Cpu, CheckCircle2, Star, ExternalLink,
  ChevronRight, Sparkles, Send, GitCommit, GitBranch, ShieldCheck, Globe,
  FileCode, FileJson, FileText, Settings, Play, Copy, Check, ArrowUpRight,
  Folder, FolderOpen, AlertCircle, Laptop
} from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
  const [activeTab, setActiveTab] = useState<'workspace' | 'projects' | 'architecture' | 'terminal'>('workspace');
  const [activeFile, setActiveFile] = useState<'README.md' | 'projects.json' | 'stack.sh' | 'contact.env'>('README.md');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Interactive Terminal State
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'pdl --version', output: 'PDL Portfolio OS v2.4.0 (Engine: React 18 / TypeScript / Vite)' },
    { cmd: 'whoami', output: `${identity.name} — ${identity.role} [${identity.location}]` },
    { cmd: 'status', output: 'System operational. Available for senior contract & advisory roles.' }
  ]);
  const [cliInput, setCliInput] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    let out = '';
    const lower = cmd.toLowerCase();
    if (lower === 'help') {
      out = 'Available commands: whoami, projects, skills, stack, clear, contact, admin, exit';
    } else if (lower === 'whoami') {
      out = `${identity.name} (${identity.alias}) — ${identity.role}\nBio: ${identity.bio}\nLocation: ${identity.location}`;
    } else if (lower === 'projects') {
      out = projects.map(p => `• [${p.title}] -> ${p.summary.slice(0, 65)}... (Tech: ${p.technologies.slice(0, 3).join(', ')})`).join('\n');
    } else if (lower === 'skills' || lower === 'stack') {
      out = skillCategories.map(c => `[${c.category.toUpperCase()}]: ${c.skills.map(s => s.name).join(', ')}`).join('\n');
    } else if (lower === 'clear') {
      setTerminalHistory([]);
      setCliInput('');
      return;
    } else if (lower === 'contact') {
      out = `Email: ${identity.socialLinks.email}\nGitHub: ${identity.socialLinks.github}\nLinkedIn: ${identity.socialLinks.linkedin}`;
    } else if (lower === 'admin') {
      onNavigate('/admin');
      out = 'Navigating to Portfolio Admin OS...';
    } else {
      out = `sh: command not found: "${cmd}". Type "help" to see available instructions.`;
    }

    setTerminalHistory(prev => [...prev, { cmd, output: out }]);
    setCliInput('');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(identity.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090d14] text-[#d1d7e0] font-mono selection:bg-emerald-500/30 selection:text-emerald-300 w-full max-w-full overflow-x-hidden">
      
      {/* 1. TOP TECHNICAL CONTROL STRIP */}
      <header className="sticky top-0 z-40 bg-[#0c111a]/95 backdrop-blur border-b border-white/[0.08] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-gray-400 truncate">
              <Laptop className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white truncate">{identity.alias || 'developer'}</span>
              <span className="text-gray-600 hidden sm:inline">@</span>
              <span className="text-emerald-400/90 text-[11px] hidden sm:inline">workstation-01</span>
              <span className="text-gray-600 hidden md:inline">git:(main)</span>
            </div>
          </div>

          {/* Primary Mode Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/[0.08] text-[11px]">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'workspace'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span className="hidden sm:inline">Code</span> Explorer
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>Terminal CLI</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        
        {/* TAB 1: WORKSPACE / FILE EXPLORER VIEW */}
        {activeTab === 'workspace' && (
          <div className="rounded-2xl border border-white/[0.1] bg-[#0c1017] shadow-2xl overflow-hidden">
            {/* File Header Tab Bar */}
            <div className="bg-[#141a24] border-b border-white/[0.08] flex items-center justify-between px-3 overflow-x-auto text-xs">
              <div className="flex items-center gap-1 py-1">
                {[
                  { id: 'README.md', icon: FileText, label: 'README.md' },
                  { id: 'projects.json', icon: FileJson, label: 'projects.json' },
                  { id: 'stack.sh', icon: FileCode, label: 'stack.sh' },
                  { id: 'contact.env', icon: Settings, label: 'contact.env' }
                ].map(file => {
                  const Icon = file.icon;
                  const isCurrent = activeFile === file.id;
                  return (
                    <button
                      key={file.id}
                      onClick={() => setActiveFile(file.id as any)}
                      className={`px-3 py-1.5 rounded-t-md flex items-center gap-2 border-t-2 transition-colors shrink-0 ${
                        isCurrent
                          ? 'bg-[#0c1017] text-emerald-300 border-emerald-400 font-medium'
                          : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{file.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-400 pr-2 shrink-0">
                <span className="hidden sm:inline">UTF-8</span>
                <span className="hidden sm:inline">·</span>
                <span className="text-emerald-400 font-bold">TypeScript v5.6</span>
              </div>
            </div>

            {/* Editor Body */}
            <div className="p-6 md:p-8 space-y-6 text-sm">
              {activeFile === 'README.md' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span># DEVELOPER PROFILE SPECIFICATION</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                      {identity.name}
                    </h1>
                    <p className="text-emerald-400 text-sm mt-1">
                      {identity.role} — {identity.location}
                    </p>
                  </div>

                  <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed space-y-4">
                    <p>{identity.bio}</p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-xs text-gray-400 block">Experience</span>
                      <span className="text-xl font-bold text-white mt-1 block">
                        {experience.length > 0 ? `${experience.length}+ Roles Logged` : '5+ Years'}
                      </span>
                      <span className="text-[11px] text-emerald-400/80 mt-0.5 block">Production Proven</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-xs text-gray-400 block">Shipped Projects</span>
                      <span className="text-xl font-bold text-white mt-1 block">
                        {projects.length} Repositories
                      </span>
                      <span className="text-[11px] text-emerald-400/80 mt-0.5 block">Full-stack & AI Systems</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-xs text-gray-400 block">Status</span>
                      <span className="text-xl font-bold text-emerald-300 mt-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                        Available
                      </span>
                      <span className="text-[11px] text-gray-400 mt-0.5 block">Open to Senior Contracts</span>
                    </div>
                  </div>

                  {/* Experience Timeline within Readme */}
                  <div className="pt-6 border-t border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                        ## CAREER_LOG.diff
                      </span>
                      <span className="text-xs text-gray-500">Chronological</span>
                    </div>
                    <div className="space-y-4">
                      {experience.map((exp, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/[0.06] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="font-bold text-white text-base font-sans">{exp.role}</span>
                            <span className="text-xs text-emerald-400 font-mono">
                              {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 font-sans">
                            {exp.company} · {exp.location}
                          </div>
                          <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFile === 'projects.json' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      // projects.json — Array&lt;ProductionBuild&gt;
                    </span>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                    >
                      <span>Open Project Inspector</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          setSelectedProjectId(proj.id);
                          setActiveTab('projects');
                        }}
                        className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wide">
                            {proj.role || 'Engine'}
                          </span>
                          <span className="text-xs text-gray-500">{proj.date || '2024'}</span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-sans">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                          {proj.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.technologies.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-[10px] bg-black/40 text-gray-300 px-2 py-0.5 rounded border border-white/[0.06]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeFile === 'stack.sh' && (
                <div className="space-y-6">
                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      #!/usr/bin/env bash — CORE_CAPABILITIES
                    </span>
                  </div>
                  <div className="space-y-6">
                    {skillCategories.map((cat, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                          <Cpu className="w-4 h-4 text-emerald-400" />
                          <span>{cat.category}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {cat.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-xs">
                              <span className="text-gray-200 block font-medium truncate">{skill.name}</span>
                              <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider mt-0.5 block">
                                {skill.level || 'Expert'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeFile === 'contact.env' && (
                <div className="space-y-6 max-w-xl">
                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      # ENVIRONMENT CREDENTIALS & HANDSHAKE
                    </span>
                  </div>
                  <div className="p-5 rounded-xl bg-black/40 border border-white/[0.08] space-y-4 text-xs">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-gray-500 block">PRIMARY_EMAIL=</span>
                        <span className="text-emerald-300 font-bold text-sm select-all">{identity.socialLinks.email}</span>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white border border-white/[0.1] flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] space-y-2">
                      <span className="text-gray-500 block">PUBLIC_ENDPOINTS:</span>
                      <div className="flex flex-wrap gap-2">
                        {identity.socialLinks.github && (
                          <a
                            href={identity.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.06] flex items-center gap-1.5 transition-colors"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                            <ArrowUpRight className="w-3 h-3 text-gray-500" />
                          </a>
                        )}
                        {identity.socialLinks.linkedin && (
                          <a
                            href={identity.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.06] flex items-center gap-1.5 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>LinkedIn</span>
                            <ArrowUpRight className="w-3 h-3 text-gray-500" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DEDICATED PROJECT INSPECTOR */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Project List Nav */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block px-1">
                // Repository Roster ({projects.length})
              </span>
              <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
                {projects.map(proj => {
                  const isSelected = proj.id === selectedProjectId;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-emerald-400 font-bold">{proj.role || 'Project'}</span>
                        <span className="text-gray-500">{proj.date || '2024'}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white font-sans truncate">{proj.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1 mt-1">{proj.summary}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed Inspector Frame */}
            {selectedProject && (
              <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-[#0c1017] border border-white/[0.1] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest block">
                      {selectedProject.role}
                    </span>
                    <h2 className="text-2xl font-bold text-white font-sans mt-1">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => onNavigate(`/projects/${selectedProject.slug || selectedProject.id}`)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 self-start text-xs shrink-0"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {selectedProject.coverImage && (
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-black/50">
                    <img
                      src={selectedProject.coverImage}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block font-bold">
                    Executive Summary
                  </span>
                  <p className="text-sm text-gray-300 font-sans leading-relaxed">
                    {selectedProject.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block font-bold">
                    Tech Stack Architecture
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-4 text-xs">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Source Repository</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Production Deployment</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INTERACTIVE TERMINAL CLI */}
        {activeTab === 'terminal' && (
          <div className="rounded-2xl border border-white/[0.1] bg-[#070a0f] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">Interactive CLI Shell (v2.4)</span>
              </div>
              <span>Type &apos;help&apos; for list of commands</span>
            </div>

            <div className="space-y-3 font-mono text-xs max-h-[50vh] overflow-y-auto pr-2">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="text-gray-500">$</span>
                    <span className="font-bold">{item.cmd}</span>
                  </div>
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono pl-4 leading-relaxed">
                    {item.output}
                  </pre>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommand} className="pt-3 border-t border-white/[0.08] flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={cliInput}
                onChange={e => setCliInput(e.target.value)}
                placeholder="Type command here (e.g. whoami, projects, skills, clear)..."
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder:text-gray-600"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors"
              >
                Execute
              </button>
            </form>
          </div>
        )}

      </main>

      {/* 3. SUBTLE FOOTER STATUS BAR */}
      <footer className="border-t border-white/[0.08] bg-[#0c1017] py-6 text-xs text-gray-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Operational · Ready for production deployment</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/admin')} className="hover:text-white transition-colors">
              [Admin OS Console]
            </button>
            <span>© {new Date().getFullYear()} {identity.name}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
