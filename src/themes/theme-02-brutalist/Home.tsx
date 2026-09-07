import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { ArrowUpRight, Mail, Download, ArrowDown, ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  skillCategories, 
  onNavigate 
}) => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans antialiased selection:bg-white selection:text-black">
      {/* Minimal Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            {identity.name}
          </button>

          <nav className="flex items-center gap-8 text-xs text-gray-400">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <button
              onClick={() => onNavigate('/admin')}
              className="px-3 py-1.5 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              Admin OS
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content with Generous Whitespace */}
      <main className="max-w-6xl mx-auto px-6 py-20 sm:py-32 space-y-40">
        
        {/* ============================================================
            HERO SECTION
            - Large name
            - One-line tagline
            - Generous height
            - Subtle scroll indicator
           ============================================================ */}
        <section className="min-h-[65vh] flex flex-col justify-between pt-10">
          <div className="space-y-8 max-w-3xl">
            <div className="inline-block text-xs font-mono text-gray-500 uppercase tracking-widest">
              {identity.location} · UTC+5:30
            </div>

            <h1 className="text-4xl sm:text-7xl font-light tracking-tight text-white leading-[1.08]">
              UI/UX Designer crafting purposeful digital experiences.
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              {identity.tagline}. Focused on system architecture, design systems, and software interface craft.
            </p>

            <div className="pt-4 flex items-center gap-6 text-sm">
              <a 
                href="#work" 
                className="px-6 py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <button 
                onClick={() => onNavigate('/resume')}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-20 flex items-center justify-between text-xs text-gray-500 font-mono border-t border-white/[0.06]">
            <span>SCROLL TO EXPLORE</span>
            <span>01 / 04</span>
          </div>
        </section>

        {/* ============================================================
            ABOUT SECTION
            - Photo with subtle hover effect
            - 3-4 sentences bio
            - Availability status
            - Location + timezone
           ============================================================ */}
        <section id="about" className="space-y-12 scroll-mt-24">
          <div className="text-xs font-mono uppercase text-gray-500 tracking-widest">
            About & Ethos
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 relative group">
              <img
                src={identity.avatarUrl}
                alt={identity.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <span className="text-xs font-mono text-white">{identity.name}</span>
                <span className="text-[11px] text-gray-400">{identity.role}</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight leading-tight">
                Simplicity is the consequence of disciplined reduction.
              </h2>
              <p className="text-gray-400 text-base leading-relaxed font-light">
                {identity.bio}
              </p>
              <p className="text-gray-400 text-base leading-relaxed font-light">
                Currently available for selected freelance initiatives, design system consulting,
                and high-fidelity product prototyping.
              </p>

              <div className="pt-6 grid grid-cols-2 gap-6 border-t border-white/[0.06] text-xs font-mono">
                <div>
                  <span className="text-gray-500 block mb-1">STATUS</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Q2
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">LOCATION</span>
                  <span className="text-white">{identity.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WORK / PROJECTS SECTION
            - 2-column desktop grid with generous whitespace
            - Large thumbnail image
            - Project title & category tag
            - Hover scale + "View Project"
           ============================================================ */}
        <section id="work" className="space-y-16 scroll-mt-24">
          <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-6">
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Selected Work
            </h2>
            <span className="text-xs font-mono text-gray-500">
              {projects.length} Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            {projects.map((proj, idx) => (
              <article
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group cursor-pointer space-y-4"
              >
                {/* Large Thumbnail Image */}
                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-900 relative">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-white text-black font-medium text-xs rounded-full shadow-2xl flex items-center gap-1.5">
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <h3 className="text-lg font-medium text-white group-hover:text-gray-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light mt-0.5">
                      {proj.summary}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider shrink-0 ml-4">
                    {proj.role}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            SKILLS SECTION
            - Simple tag clouds by category (Design, Prototyping, Research)
            - No progress bars
           ============================================================ */}
        <section className="space-y-10 border-t border-white/[0.06] pt-16">
          <div className="text-xs font-mono uppercase text-gray-500 tracking-widest">
            Disciplines & Tooling
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.slice(0, 3).map((cat) => (
              <div key={cat.id} className="space-y-4">
                <h3 className="text-sm font-medium text-white">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-white/[0.04] text-xs text-gray-400 hover:text-white border border-white/[0.06] transition-colors"
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
            CONTACT SECTION
            - "Let's work together"
            - Email link (mailto:)
            - Social links
            - Simple contact form
           ============================================================ */}
        <section id="contact" className="space-y-12 border-t border-white/[0.06] pt-20 scroll-mt-24">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
              Let's work together.
            </h2>
            <p className="text-gray-400 font-light text-base leading-relaxed">
              Have a project in mind or want to discuss design collaboration?
              Reach out directly at{' '}
              <a
                href={`mailto:${identity.socialLinks.email}`}
                className="text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                {identity.socialLinks.email}
              </a>.
            </p>
          </div>

          <div className="max-w-xl">
            {formSent ? (
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-2">
                <p className="text-sm font-medium text-white">Thank you for your inquiry.</p>
                <p className="text-xs text-gray-500">I will review and reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pb-3 bg-transparent border-b border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-white text-sm transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pb-3 bg-transparent border-b border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-white text-sm transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief description of the project"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pb-3 bg-transparent border-b border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-white text-sm transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-black font-medium text-xs rounded-full hover:bg-gray-200 transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {identity.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={identity.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href={identity.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href={identity.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
