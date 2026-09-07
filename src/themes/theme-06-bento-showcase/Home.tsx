import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  ArrowRight, ArrowUpRight, Check, Star, Mail, Sparkles, 
  Clock, Shield, DollarSign, Send, MessageSquare 
} from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  onNavigate 
}) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    budget: '$5k - $10k',
    timeline: '1-2 months',
    description: ''
  });

  const services = [
    {
      title: 'Full-Stack Product Engineering',
      desc: 'End-to-end web applications built with Next.js, React, Node, and PostgreSQL.',
      deliverables: ['Custom Web App', 'Database Architecture', 'REST/GraphQL API', 'CI/CD Pipeline'],
      price: 'From $4,500',
      timeline: '3-5 weeks'
    },
    {
      title: 'Design Systems & UI Architecture',
      desc: 'Scalable token systems, accessible React components, and comprehensive Figma libraries.',
      deliverables: ['Token Architecture', 'Storybook Documentation', 'WCAG 2.1 AA Audit', 'NPM Package'],
      price: 'From $3,500',
      timeline: '2-4 weeks'
    },
    {
      title: 'High-Throughput Cloud & DevOps',
      desc: 'Zero-downtime infrastructure, Docker containerization, Kubernetes, and edge workers.',
      deliverables: ['Terraform IaC', 'Autoscaling Clusters', 'Telemetry & Alerting', 'Security Hardening'],
      price: 'From $5,000',
      timeline: '2-3 weeks'
    }
  ];

  const clientLogos = [
    'TechFlow', 'Nova Clinics', 'Alto Commerce', 'Aether Labs', 'Apex Mobility', 'Pulse AI'
  ];

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#e2e8f0] font-sans antialiased selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0d0f14]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center font-bold text-xs text-rose-400">
              P
            </div>
            <span className="font-bold text-sm text-white tracking-tight">{identity.name}</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#clients" className="hover:text-white transition-colors">Clients</a>
            <a href="#contact" className="hover:text-white transition-colors">Inquire</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-all"
            >
              Start a Project
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-xs text-gray-500 hover:text-white px-2 py-1"
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24 space-y-36">
        
        {/* ============================================================
            HERO SECTION
            - Memorable headline
            - Brief intro
            - Selected preview & CTA
           ============================================================ */}
        <section className="space-y-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Currently booking Q2/Q3 client engagements</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08]">
            I build digital systems that people actually remember.
          </h1>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl font-normal">
            {identity.tagline}. Partnering with founders and engineering leaders to turn ambitious ideas
            into rock-solid, production-grade products.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-rose-600/25"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#work"
              className="px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-gray-200 border border-white/10 text-xs font-medium transition-colors"
            >
              View Selected Work
            </a>
          </div>
        </section>

        {/* Client Logos Wall */}
        <section id="clients" className="space-y-4 border-y border-white/[0.08] py-10">
          <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-mono">
            Trusted by founders and high-growth engineering teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 pt-2">
            {clientLogos.map((logo, idx) => (
              <span key={idx} className="font-mono text-sm sm:text-base font-bold text-gray-500 hover:text-white transition-colors cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </section>

        {/* ============================================================
            SELECTED WORK
           ============================================================ */}
        <section id="work" className="space-y-12 scroll-mt-24">
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Selected Client Work
              </h2>
              <p className="text-xs text-gray-400 mt-1">Direct case studies with measurable production outcomes.</p>
            </div>
            <button
              onClick={() => onNavigate('/projects')}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <span>View all projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((proj) => (
              <article
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group cursor-pointer rounded-2xl bg-[#141720] border border-white/[0.08] hover:border-rose-500/40 p-6 space-y-5 transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black relative">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-gray-300">
                    {proj.role}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {proj.client || 'Verified Result'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-white/[0.06] text-gray-400">
                  <span className="font-mono text-[11px]">{proj.date?.slice(0, 4) || '2024'}</span>
                  <span className="text-rose-400 font-medium flex items-center gap-1">
                    Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            SERVICES & ENGAGEMENT PACKAGES
            - Service name, included deliverables, starting price, timeline
           ============================================================ */}
        <section id="services" className="space-y-12 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-rose-400 font-semibold">Services</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Transparent, Scoped Engagements
            </h2>
            <p className="text-xs text-gray-400">
              Fixed-scope deliverables with clear timelines. No hidden retainers or surprise bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#141720] border border-white/[0.08] hover:border-white/20 flex flex-col justify-between space-y-6 transition-colors"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{svc.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{svc.desc}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Deliverables</span>
                    {svc.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-white">{svc.price}</span>
                      <span className="text-[10px] text-gray-500 block">Starting rate</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {svc.timeline}
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-rose-600 hover:text-white text-gray-200 text-xs font-semibold flex items-center justify-center transition-colors"
                  >
                    Inquire About This Service
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            CLIENT TESTIMONIAL
           ============================================================ */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#141720] to-[#1c202d] border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
            "Working with {identity.name} was hands-down the best technical partnership we've had.
            He took our messy prototype and engineered a production system that effortlessly handled
            our 10x traffic spike on launch day."
          </blockquote>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center font-bold text-sm text-rose-400">
              TL
            </div>
            <div>
              <p className="text-sm font-bold text-white">Trevor Lindstrom</p>
              <p className="text-xs text-gray-400 font-mono">VP Engineering, TechFlow</p>
            </div>
          </div>
        </section>

        {/* ============================================================
            PROJECT INQUIRY FLOW
           ============================================================ */}
        <section id="contact" className="p-8 sm:p-12 rounded-3xl bg-[#141720] border border-white/[0.08] space-y-8 scroll-mt-24">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase text-rose-400 font-semibold">Initiation</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Let's build something together.</h2>
            <p className="text-xs text-gray-400">Fill in your requirements below for a detailed proposal within 24 hours.</p>
          </div>

          {inquirySent ? (
            <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
              <Check className="w-8 h-8 text-rose-400 mx-auto" />
              <h3 className="font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-gray-400 font-mono">I will review your project scope and follow up promptly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setInquirySent(true); }} className="space-y-4 max-w-xl font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sarah Miller"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#0d0f14] border border-white/10 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={inquiry.email}
                    onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#0d0f14] border border-white/10 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Budget Range</label>
                  <select
                    value={inquiry.budget}
                    onChange={(e) => setInquiry({ ...inquiry, budget: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#0d0f14] border border-white/10 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option>$3,000 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Target Timeline</label>
                  <select
                    value={inquiry.timeline}
                    onChange={(e) => setInquiry({ ...inquiry, timeline: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#0d0f14] border border-white/10 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option>Under 1 month</option>
                    <option>1-2 months</option>
                    <option>3+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Project Summary</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Key goals, technical stack preferences, and scope..."
                  value={inquiry.description}
                  onChange={(e) => setInquiry({ ...inquiry, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0d0f14] border border-white/10 text-white focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors shadow-lg shadow-rose-600/20"
              >
                Submit Project Brief
              </button>
            </form>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 text-xs font-mono text-gray-500 text-center">
        © 2026 {identity.name}. Available worldwide for engineering and advisory.
      </footer>
    </div>
  );
};
