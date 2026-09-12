import React, { useState } from 'react';
import { 
  ArrowRight, ArrowUpRight, ExternalLink, 
  Mail, Search, Terminal, Award, Briefcase, Calendar, Check, 
  Clock, Sparkles, BookOpen, Layers, LogIn, ChevronRight
} from 'lucide-react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { BlogModule } from './BlogModule';

export const Home: React.FC<ThemePageProps> = ({
  identity,
  projects,
  blogPosts,
  experience,
  skillCategories,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'blog' | 'works' | 'about'>('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | undefined>(undefined);

  const publishedPosts = blogPosts.filter(p => p.status === 'published');

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-black selection:text-white relative">
      {/* Subtle paper texture / ambient dot matrix grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* 1. GLOBAL NAVIGATION (Exact midhunnk.in structure) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 sm:px-10 md:px-14 py-4 border-b border-black/8 backdrop-blur-md bg-white/85 transition-all">
        {/* Logo / Wordmark */}
        <button 
          onClick={() => { setActiveTab('home'); setSelectedPostSlug(undefined); }}
          className="text-left group"
        >
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tight text-[#111111] hover:scale-[1.02] transition-transform block">
            {identity.name}<span className="text-[#ad314d]">.</span>
          </span>
        </button>

        {/* Desktop Plaintext Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-wider font-semibold text-gray-500">
          <button
            onClick={() => { setActiveTab('about'); }}
            className={`py-1 transition-colors relative hover:text-black ${activeTab === 'about' ? 'text-black font-bold' : ''}`}
          >
            About
            {activeTab === 'about' && <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#ad314d]" />}
          </button>
          <button
            onClick={() => { setActiveTab('works'); }}
            className={`py-1 transition-colors relative hover:text-black ${activeTab === 'works' ? 'text-black font-bold' : ''}`}
          >
            Works
            {activeTab === 'works' && <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#ad314d]" />}
          </button>
          <button
            onClick={() => { setActiveTab('blog'); }}
            className={`py-1 transition-colors relative hover:text-black ${activeTab === 'blog' ? 'text-black font-bold' : ''}`}
          >
            Blog
            {activeTab === 'blog' && <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#ad314d]" />}
          </button>
          <button
            onClick={() => onNavigate('/resume')}
            className="py-1 transition-colors hover:text-black"
          >
            Certificates
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="py-1 transition-colors hover:text-black"
          >
            Contact
          </button>
        </div>

        {/* Right action: Admin / Login */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin')}
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border border-black/15 text-gray-700 hover:border-black hover:text-black rounded-xl transition-all shadow-xs"
            title="Access Admin OS"
          >
            <LogIn className="w-3.5 h-3.5 text-[#ad314d]" />
            <span className="hidden sm:inline">Admin OS</span>
          </button>
        </div>
      </nav>

      {/* 2. MAIN CONTENT VIEW: HOME vs BLOG MODULE */}
      {activeTab === 'blog' ? (
        <BlogModule
          identity={identity}
          blogPosts={blogPosts}
          onNavigate={onNavigate}
          initialPostSlug={selectedPostSlug}
        />
      ) : (
        <main className="relative z-10 pt-28 sm:pt-36 pb-28 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 space-y-24">
          
          {/* HERO SECTION */}
          <section className="space-y-6 pt-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100/80 border border-black/5 rounded-full text-[11px] font-mono text-gray-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Fullstack Developer & Systems Architect</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tight text-gray-950 leading-[1.08]">
              Engineering systems that print — not just look good.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-sans leading-relaxed max-w-2xl">
              Thoughts on development, design, and building things that matter. Crafting high-throughput fullstack platforms, distributed systems, and content-first web environments.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <button
                onClick={() => setActiveTab('works')}
                className="px-5 py-3 bg-[#111111] hover:bg-black text-white font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
              >
                <span>Explore Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl flex items-center gap-2 transition-colors border border-black/5"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#ad314d]" />
                <span>Read The Journal ({publishedPosts.length})</span>
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-black/10 transition-colors"
              >
                Initiate Contact
              </button>
            </div>

            {/* Telemetry Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-black/8 font-mono">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">36</p>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">GitHub Repos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">8+</p>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">Live Deployments</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">4</p>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">Industry Roles</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">99.9%</p>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">System Uptime</p>
              </div>
            </div>
          </section>

          {/* WORKS / PROJECTS SHOWCASE */}
          <section id="works" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/8 pb-4">
              <div>
                <span className="font-mono text-xs text-[#ad314d] uppercase tracking-widest font-bold">Selected Works</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black italic tracking-tight text-gray-950 mt-1">
                  Production Systems & Projects
                </h2>
              </div>
              <button
                onClick={() => onNavigate('/projects')}
                className="text-xs font-mono font-bold text-gray-700 hover:text-black flex items-center gap-1 group"
              >
                <span>View All Projects</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.slice(0, 4).map(project => (
                <div
                  key={project.id}
                  onClick={() => onNavigate(`/projects/${project.slug}`)}
                  className="p-6 rounded-2xl border border-black/10 hover:border-black/30 hover:shadow-xl bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                      <span className="uppercase tracking-wider font-bold text-[#ad314d]">{project.role || project.technologies[0] || 'Engineering'}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Production Live</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#ad314d] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="p-1.5 text-gray-400 group-hover:text-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECENT WRITING / JOURNAL PREVIEW */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/8 pb-4">
              <div>
                <span className="font-mono text-xs text-[#ad314d] uppercase tracking-widest font-bold">Writing</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black italic tracking-tight text-gray-950 mt-1">
                  The Developer Ledger
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('blog')}
                className="text-xs font-mono font-bold text-gray-700 hover:text-black flex items-center gap-1 group"
              >
                <span>Read Full Journal</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publishedPosts.slice(0, 3).map(post => (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPostSlug(post.slug);
                    setActiveTab('blog');
                  }}
                  className="p-6 rounded-2xl border border-black/10 hover:border-black/30 hover:shadow-lg bg-white transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                      <span className="font-bold text-gray-800 uppercase text-[10px] bg-gray-100 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <span>{post.readingTimeMinutes} min</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#ad314d] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-mono text-[#ad314d] font-semibold flex items-center gap-1">
                    <span>Read dispatch</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE TIMELINE */}
          <section className="space-y-8">
            <div className="border-b border-black/8 pb-4">
              <span className="font-mono text-xs text-[#ad314d] uppercase tracking-widest font-bold">Career Record</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black italic tracking-tight text-gray-950 mt-1">
                Verified Experience
              </h2>
            </div>

            <div className="space-y-6">
              {experience.map(exp => (
                <div 
                  key={exp.id}
                  className="p-6 rounded-2xl border border-black/10 bg-white hover:border-black/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{exp.company}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600">{exp.location}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#ad314d] font-mono">{exp.role}</p>
                    <p className="text-xs text-gray-600 max-w-xl">{exp.description}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono text-gray-500 font-semibold">{exp.startDate} – {exp.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      )}

      {/* 3. FOOTER (Exact confirmed structure from midhunnk.in) */}
      <footer className="px-6 sm:px-10 md:px-14 py-16 border-t border-black/8 bg-white relative z-10" role="contentinfo">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <button 
              onClick={() => { setActiveTab('home'); setSelectedPostSlug(undefined); }}
              className="text-left"
            >
              <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter text-[#111111] hover:text-[#ad314d] transition-colors">
                {identity.name}<span className="text-[#ad314d]">.</span>
              </h3>
            </button>
            <p className="font-mono text-xs text-gray-500 mt-3 tracking-wide">
              Fullstack Developer &amp; Content Creator
            </p>
          </div>

          <nav aria-label="Footer navigation" className="font-mono text-xs text-gray-500 uppercase tracking-wider">
            <ul className="flex flex-wrap gap-6 mb-4">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-black transition-colors">About</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('works')} className="hover:text-black transition-colors">Projects</button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-black transition-colors">Hire Me</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-black transition-colors">Blog</button>
              </li>
            </ul>
            <p className="text-[11px] text-gray-400">
              © {new Date().getFullYear()} {identity.name}. All rights reserved.
            </p>
          </nav>
        </div>
      </footer>
    </div>
  );
};
