import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  ArrowRight, ArrowUpRight, Search, Target, PenTool, Rocket, 
  Check, Mail, Download, Sparkles, ExternalLink, Quote
} from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  blogPosts, 
  onNavigate 
}) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiry, setInquiry] = useState({ name: '', email: '', type: 'Product Design', message: '' });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiry({ name: '', email: '', type: 'Product Design', message: '' });
    }, 4000);
  };

  const processSteps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'User research, competitive benchmarking, and stakeholder synthesis.',
      icon: Search
    },
    {
      num: '02',
      title: 'Define',
      desc: 'Problem framing, architecture maps, and actionable success metrics.',
      icon: Target
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Interactive wireframes, design systems, and rigorous usability testing.',
      icon: PenTool
    },
    {
      num: '04',
      title: 'Deliver',
      desc: 'Design token specs, engineering handoff, and post-launch metric tracking.',
      icon: Rocket
    }
  ];

  const tools = [
    'Figma', 'Design Systems', 'Framer', 'Prototyping', 
    'React', 'TypeScript', 'Tailwind CSS', 'UserTesting', 
    'Information Architecture', 'WCAG 2.1 AA'
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1f2937] font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Design-System Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-gray-900">{identity.name}</span>
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-600">
            <a href="#work" className="hover:text-indigo-600 transition-colors">Work</a>
            <a href="#process" className="hover:text-indigo-600 transition-colors">Process</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition-all shadow-sm"
            >
              Let's Talk
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-xs text-gray-500 hover:text-gray-900 font-medium px-2 py-1"
            >
              Admin OS
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24 space-y-36">
        
        {/* ============================================================
            HERO SECTION
            - 2 columns: left text + right visual mockup
            - Value prop, subheadline, 2 CTAs
           ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block">
              UX/UI & Product Designer · {identity.location}
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              I design digital products that people actually enjoy using.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              {identity.tagline}. I focus on turning complex workflows into intuitive, delightful,
              and measurable user experiences that accelerate business growth.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-indigo-600/20 transition-all"
              >
                View Selected Work
              </a>
              <button
                onClick={() => onNavigate('/resume')}
                className="px-5 py-3.5 text-gray-700 hover:text-indigo-600 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Download Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Stylized Mockup Preview */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md aspect-[4/3] rounded-3xl bg-gradient-to-tr from-indigo-100 to-purple-50 p-6 border border-indigo-100 shadow-xl relative overflow-hidden">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/80">
                <img
                  src={projects[0]?.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 font-mono text-xs text-gray-800 space-y-1">
                <div className="text-[10px] text-indigo-600 font-bold uppercase">System Metric</div>
                <div className="font-bold text-sm">+34% Task Efficiency</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SELECTED WORK (Stacked Alternating Cards)
            - 4 case studies with metrics row
           ============================================================ */}
        <section id="work" className="space-y-16 scroll-mt-24">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Selected Work
              </h2>
              <p className="text-xs text-gray-500 mt-1">Four in-depth case studies with measurable outcomes.</p>
            </div>
            <span className="text-xs font-mono text-indigo-600 font-semibold">
              {projects.length} PROJECTS
            </span>
          </div>

          <div className="space-y-20">
            {projects.slice(0, 4).map((proj, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={proj.id}
                  className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div 
                      onClick={() => onNavigate(`/projects/${proj.slug}`)}
                      className="aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group relative shadow-inner"
                    >
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 uppercase">
                      <span>{proj.role}</span>
                      <span>·</span>
                      <span>{proj.date?.slice(0, 4) || '2024'}</span>
                    </div>

                    <h3 
                      onClick={() => onNavigate(`/projects/${proj.slug}`)}
                      className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      {proj.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {proj.summary}
                    </p>

                    {/* Measurable Outcomes Bar */}
                    <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                      <div>
                        <span className="text-indigo-600 font-bold block text-sm">
                          +34% Conversion
                        </span>
                        <span className="text-gray-500 text-[10px]">Verified Result</span>
                      </div>
                      <div>
                        <span className="text-gray-900 font-bold block text-sm">4.8 / 5.0</span>
                        <span className="text-gray-500 text-[10px]">Usability Score</span>
                      </div>
                      <div>
                        <span className="text-gray-900 font-bold block text-sm">2M+ Users</span>
                        <span className="text-gray-500 text-[10px]">Reach</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(`/projects/${proj.slug}`)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors pt-1"
                    >
                      <span>View Full Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            DESIGN PROCESS ("How I Work")
            - 4-step horizontal process flow
            - Quote block
           ============================================================ */}
        <section id="process" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-indigo-600 font-bold">Methodology</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              How I Work
            </h2>
            <p className="text-xs text-gray-500">
              A disciplined, research-led product design cycle from discovery to post-launch telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-4 relative"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 font-bold block">STEP {step.num}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5">{step.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quote Block */}
          <div className="p-8 rounded-2xl bg-white border-l-4 border-indigo-600 border border-gray-200/80 shadow-sm flex items-start gap-4">
            <Quote className="w-8 h-8 text-indigo-300 shrink-0 mt-1" />
            <p className="text-base sm:text-lg font-medium text-gray-800 italic leading-relaxed">
              "Great design isn't about making things pretty — it's about making things work for real people while meeting hard business constraints."
            </p>
          </div>
        </section>

        {/* ============================================================
            TOOLS & SKILLS
            - Chip grid
           ============================================================ */}
        <section className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500">
            Skills & Design System Stack
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {tools.map((t, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-700 shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ============================================================
            CONTACT SECTION
           ============================================================ */}
        <section id="contact" className="space-y-8 scroll-mt-24 p-8 sm:p-12 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono uppercase text-indigo-600 font-bold">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Let's create something together.
            </h2>
            <p className="text-sm text-gray-600">
              Open to product design roles, design system contracts, and user experience advisory.
            </p>
          </div>

          {inquirySent ? (
            <div className="p-8 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-2">
              <Check className="w-8 h-8 text-indigo-600 mx-auto" />
              <h3 className="font-bold text-gray-900">Inquiry Received</h3>
              <p className="text-xs text-gray-600">I will review your message and reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={inquiry.email}
                    onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Project Scope</label>
                <select
                  value={inquiry.type}
                  onChange={(e) => setInquiry({ ...inquiry, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-indigo-600 bg-white"
                >
                  <option value="Product Design">Full Product Design (Web/Mobile)</option>
                  <option value="Design System">Design System Architecture</option>
                  <option value="UX Audit">UX Audit & Usability Optimization</option>
                  <option value="Advisory">Design Advisory / Consulting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Project Details</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about your product timeline, goals, and key challenges..."
                  value={inquiry.message}
                  onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-indigo-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-full shadow-md shadow-indigo-600/20 transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {identity.name}. Designed with care and typed precision.</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${identity.socialLinks.email}`} className="text-indigo-600 hover:underline">
              {identity.socialLinks.email}
            </a>
            <button onClick={() => onNavigate('/admin')} className="text-gray-400 hover:text-gray-900">
              Admin OS
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
