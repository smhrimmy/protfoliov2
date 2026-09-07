import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { ArrowUpRight, Mail, ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, blogPosts, onNavigate }) => {
  // Signature Interaction: Hover on a project row swaps thumbnail into fixed side rail
  const [hoveredProject, setHoveredProject] = useState(projects[0]);

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#f4f4f5] font-sans antialiased selection:bg-[#d4af37]/30 selection:text-white">
      {/* Editorial Chrome: Top-Left Wordmark + Inline Navigation */}
      <header className="border-b border-[#27272a] px-8 py-6 flex items-baseline justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-white">{identity.name}</h1>
          <p className="text-[11px] font-mono tracking-widest text-[#9ca3af] uppercase mt-0.5">ISSUE № 01 · {identity.alias}</p>
        </div>
        <nav className="flex items-center gap-8 text-xs font-mono text-[#9ca3af]">
          <a href="#about" className="hover:text-white transition-opacity duration-200">01. DISPATCH</a>
          <a href="#projects" className="hover:text-white transition-opacity duration-200">02. INDEX</a>
          <a href="#blog" className="hover:text-white transition-opacity duration-200">03. ESSAYS</a>
          <a href="#contact" className="hover:text-white transition-opacity duration-200">04. INQUIRIES</a>
        </nav>
      </header>

      {/* Main Two-Column Asymmetric Grid */}
      <main className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: 680px Editorial Text Body */}
        <section className="lg:col-span-7 space-y-16">
          {/* Hero Treatment: No Image — Giant Serif Headline + Deck */}
          <div className="space-y-6 pt-4 border-b border-[#27272a] pb-14">
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block">
              {identity.location} · {identity.role}
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              {identity.tagline}
            </h2>
            <p className="text-base text-[#9ca3af] leading-relaxed max-w-[680px] font-sans">
              {identity.bio}
            </p>
          </div>

          {/* Projects Section with Signature Rail-Swap */}
          <div id="projects" className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#27272a] pb-3">
              <h3 className="font-serif text-xl font-bold text-white">Selected Systems & Case Studies</h3>
              <span className="text-xs font-mono text-[#9ca3af]">INDEX [01–0{projects.length}]</span>
            </div>

            <div className="divide-y divide-[#27272a]">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onMouseEnter={() => setHoveredProject(proj)}
                  onClick={() => onNavigate(`/projects/${proj.slug}`)}
                  className="py-5 flex items-baseline justify-between group cursor-pointer transition-opacity duration-150"
                >
                  <div className="space-y-1 max-w-[500px]">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-[#d4af37]">0{idx + 1}</span>
                      <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                        {proj.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#9ca3af] line-clamp-1">{proj.summary}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#9ca3af]">
                    <span className="hidden sm:inline">{proj.technologies.slice(0, 2).join(' / ')}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Essays Section */}
          <div id="blog" className="space-y-6 pt-8 border-t border-[#27272a]">
            <h3 className="font-serif text-xl font-bold text-white">Technical Essays</h3>
            <div className="space-y-4">
              {blogPosts.map(post => (
                <article 
                  key={post.id} 
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="p-5 bg-[#161920] border border-[#27272a] rounded-lg hover:border-[#d4af37]/40 cursor-pointer transition-all"
                >
                  <span className="text-[10px] font-mono text-[#d4af37] uppercase">{post.category} · {post.readingTimeMinutes} MIN</span>
                  <h4 className="font-serif text-lg font-bold text-white mt-1 mb-2">{post.title}</h4>
                  <p className="text-xs text-[#9ca3af] line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Contact Dispatch */}
          <div id="contact" className="pt-8 border-t border-[#27272a] space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">Initiate Direct Dispatch</h3>
            <p className="text-xs text-[#9ca3af]">One client engagement slot available for next quarter.</p>
            <a
              href={`mailto:${identity.socialLinks.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#d4af37] hover:bg-[#bfa030] text-[#0f1115] font-serif font-bold text-sm rounded-none transition-colors"
            >
              <Mail className="w-4 h-4" /> {identity.socialLinks.email}
            </a>
          </div>
        </section>

        {/* Right Column: Fixed Side Rail Thumbnail Preview (Signature Interaction) */}
        <aside className="hidden lg:block lg:col-span-5">
          <div className="sticky top-12 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#9ca3af] flex justify-between">
              <span>ACTIVE RAIL INSPECTOR</span>
              <span className="text-[#d4af37]">{hoveredProject.title}</span>
            </div>

            <div className="border border-[#27272a] p-2 bg-[#161920]">
              <div className="h-64 w-full bg-slate-900 overflow-hidden">
                <img
                  src={hoveredProject.coverImage}
                  alt={hoveredProject.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              <div className="p-4 space-y-2 font-mono text-xs">
                <p className="text-white font-bold">{hoveredProject.title}</p>
                <p className="text-gray-400 text-[11px] leading-relaxed">{hoveredProject.caseStudyBody.slice(0, 160)}...</p>
                <div className="pt-2 flex flex-wrap gap-1">
                  {hoveredProject.technologies.map((t, idx) => (
                    <span key={idx} className="bg-white/5 text-[#9ca3af] px-2 py-0.5 text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
