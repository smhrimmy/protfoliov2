import React, { useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  Check, ArrowUpRight, DollarSign, Calendar, Clock, 
  ShieldCheck, Sparkles, HelpCircle, ChevronDown, ChevronUp, Send
} from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  onNavigate 
}) => {
  // Interactive Scope Calculator State
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({
    webapp: true,
    designSystem: false,
    backend: true,
    maintenance: false
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  // Deliverables pricing
  const servicesConfig: { [key: string]: { label: string; price: number; weeks: number } } = {
    webapp: { label: 'Web Application & Frontend', price: 4500, weeks: 3 },
    designSystem: { label: 'Design System & Component Library', price: 2800, weeks: 2 },
    backend: { label: 'Backend Architecture & Database APIs', price: 3200, weeks: 2 },
    maintenance: { label: '3-Month Post-Launch SLA Support', price: 1800, weeks: 12 }
  };

  const calculateTotal = () => {
    let total = 0;
    let weeks = 0;
    Object.keys(selectedServices).forEach(key => {
      if (selectedServices[key]) {
        total += servicesConfig[key].price;
        weeks = Math.max(weeks, servicesConfig[key].weeks);
      }
    });
    return { total, weeks };
  };

  const { total, weeks } = calculateTotal();

  const toggleService = (key: string) => {
    setSelectedServices(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const faqs = [
    {
      q: 'How are client engagements structured?',
      a: 'Projects are structured on a 50/50 fixed-scope sprint model. 50% deposit upon kickoff, with the final 50% due upon delivery and sign-off. Zero surprise hourly overages.'
    },
    {
      q: 'What is your typical turnaround time?',
      a: 'Most focused sprints complete in 2 to 4 weeks. Full-scale system redesigns take 4 to 8 weeks depending on backend complexity and third-party integrations.'
    },
    {
      q: 'Do you offer ongoing retainer / fractional advisory?',
      a: 'Yes. For teams requiring senior technical guidance, code audits, or ongoing feature roadmaps, monthly advisory retainers start at $3,000/month.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#e2e8f0] font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-300 w-full max-w-full overflow-x-hidden">
      
      {/* 1. TOP LIVE AVAILABILITY BANNER */}
      <div className="bg-emerald-950/50 border-b border-emerald-500/20 py-2.5 px-4 text-center text-xs font-mono text-emerald-400">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold">ACCEPTING Q3 COMMISSIONS</span>
          <span className="text-emerald-500/70 hidden sm:inline">· 2 Client Slots Remaining for Venture Sprints</span>
        </span>
      </div>

      {/* 2. HEADER */}
      <header className="sticky top-0 z-40 bg-[#0b0f17]/90 backdrop-blur-md border-b border-white/[0.08] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black flex items-center justify-center font-bold text-sm">
              {identity.name.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-sm block">{identity.name}</span>
              <span className="text-gray-400 text-[11px]">{identity.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#calculator"
              className="text-gray-300 hover:text-white transition-colors hidden sm:inline"
            >
              Pricing Calculator
            </a>
            <a
              href="#packages"
              className="text-gray-300 hover:text-white transition-colors hidden sm:inline"
            >
              Fixed Tiers
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:text-white font-mono"
            >
              Admin OS
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO & VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-20 space-y-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>High-Velocity Engineering & Product Design Studio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Senior execution without the agency overhead.
          </h1>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
            I partner directly with founders and product teams to design, architect, and ship 
            production-ready web software. Transparent pricing, strict deadlines, and zero fluff.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#calculator"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm"
            >
              Calculate Your Project Scope
            </a>
            <a
              href="#work"
              className="px-5 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors text-sm"
            >
              Review Shipped Work ({projects.length})
            </a>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE PROJECT BUDGET & SCOPE CALCULATOR */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08]">
        <div className="rounded-3xl bg-[#111722] border border-white/[0.1] p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
                Instant Scope Estimator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Customize Your Deliverables
              </h2>
            </div>
            <span className="text-xs text-gray-400">
              Check all components your launch requires
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Options Checkbox Grid */}
            <div className="lg:col-span-7 space-y-3">
              {Object.keys(servicesConfig).map(key => {
                const item = servicesConfig[key];
                const isSelected = !!selectedServices[key];
                return (
                  <div
                    key={key}
                    onClick={() => toggleService(key)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isSelected ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-gray-600'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-semibold text-sm text-white">{item.label}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        +${item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-6">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
                Estimated Commitment
              </span>

              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-xs block">Estimated Investment</span>
                  <div className="text-4xl font-extrabold text-white font-mono mt-1">
                    ${total.toLocaleString()}
                    <span className="text-xs text-gray-400 font-sans font-normal ml-2">USD</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-white/[0.08] pt-3 text-gray-300">
                  <span>Estimated Delivery Window:</span>
                  <span className="font-bold text-white font-mono">{weeks} — {weeks + 2} Weeks</span>
                </div>
              </div>

              <a
                href={`mailto:${identity.socialLinks.email}?subject=Project Inquiry (${weeks}w scope, $${total})`}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors text-center block text-sm shadow-lg shadow-emerald-500/20"
              >
                Lock In Scope & Start Sprint →
              </a>
              <p className="text-[11px] text-gray-500 text-center">
                Includes code handover, full repository rights, and 14-day warranty.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. THREE FIXED-SCOPE TIERS */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Fixed Scope Packages</span>
          <h2 className="text-3xl font-extrabold text-white">Transparent, Turnkey Pricing</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="p-6 rounded-2xl bg-[#111722] border border-white/[0.08] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-gray-400 uppercase">TIER 01</span>
              <h3 className="text-xl font-bold text-white">MVP Sprint</h3>
              <div className="text-3xl font-extrabold text-white font-mono">$4,500</div>
              <p className="text-xs text-gray-400">For early-stage founders needing a polished prototype to test market traction.</p>
              <ul className="space-y-2 text-xs text-gray-300 border-t border-white/[0.08] pt-4">
                <li className="flex items-center gap-2">✓ 2-Week Dedicated Sprint</li>
                <li className="flex items-center gap-2">✓ React / Next.js Frontend</li>
                <li className="flex items-center gap-2">✓ Supabase / PostgreSQL DB</li>
                <li className="flex items-center gap-2">✓ Stripe Checkout Integration</li>
              </ul>
            </div>
            <a
              href={`mailto:${identity.socialLinks.email}?subject=MVP Sprint Tier`}
              className="w-full py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold text-center block text-xs"
            >
              Select MVP Sprint
            </a>
          </div>

          {/* Tier 2: Highlighted */}
          <div className="p-6 rounded-2xl bg-[#131d2c] border-2 border-emerald-500/80 space-y-6 flex flex-col justify-between shadow-xl shadow-emerald-950/50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-black font-bold text-[10px] tracking-wider uppercase">
              Most Popular
            </div>
            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase">TIER 02</span>
              <h3 className="text-xl font-bold text-white">Production System</h3>
              <div className="text-3xl font-extrabold text-white font-mono">$9,500</div>
              <p className="text-xs text-gray-400">Complete architectural overhaul, design system, and multi-tenant cloud scale.</p>
              <ul className="space-y-2 text-xs text-gray-300 border-t border-white/[0.08] pt-4">
                <li className="flex items-center gap-2 font-semibold text-white">✓ Everything in MVP Sprint</li>
                <li className="flex items-center gap-2">✓ Accessible Figma Design System</li>
                <li className="flex items-center gap-2">✓ Automated CI/CD & Testing</li>
                <li className="flex items-center gap-2">✓ 30-Day Post-Launch SLA</li>
              </ul>
            </div>
            <a
              href={`mailto:${identity.socialLinks.email}?subject=Production System Tier`}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-center block text-xs"
            >
              Select Production System
            </a>
          </div>

          {/* Tier 3 */}
          <div className="p-6 rounded-2xl bg-[#111722] border border-white/[0.08] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-gray-400 uppercase">TIER 03</span>
              <h3 className="text-xl font-bold text-white">Fractional CTO</h3>
              <div className="text-3xl font-extrabold text-white font-mono">$3,000<span className="text-xs text-gray-400 font-sans font-normal"> / mo</span></div>
              <p className="text-xs text-gray-400">Ongoing technical leadership, architecture reviews, and high-impact PR reviews.</p>
              <ul className="space-y-2 text-xs text-gray-300 border-t border-white/[0.08] pt-4">
                <li className="flex items-center gap-2">✓ Weekly Architecture Sync</li>
                <li className="flex items-center gap-2">✓ Unlimited Async Code Reviews</li>
                <li className="flex items-center gap-2">✓ Candidate Technical Interviews</li>
                <li className="flex items-center gap-2">✓ Cancel Anytime</li>
              </ul>
            </div>
            <a
              href={`mailto:${identity.socialLinks.email}?subject=Fractional Retainer Inquiry`}
              className="w-full py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold text-center block text-xs"
            >
              Join Advisory Retainer
            </a>
          </div>
        </div>
      </section>

      {/* 6. SHIPPED WORK REPERTOIRE */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08] space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">Client Results</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Selected Commercial Proof</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(proj => (
            <div
              key={proj.id}
              onClick={() => onNavigate(`/projects/${proj.slug || proj.id}`)}
              className="p-6 rounded-2xl bg-[#111722] border border-white/[0.08] hover:border-emerald-500/40 transition-all cursor-pointer space-y-4 group"
            >
              {proj.coverImage && (
                <div className="aspect-video rounded-xl overflow-hidden bg-black/40">
                  <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                <span>{proj.role}</span>
                <span className="text-gray-500">{proj.date || '2024'}</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">{proj.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{proj.summary}</p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08] space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Common Questions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              className="p-5 rounded-2xl bg-[#111722] border border-white/[0.08] cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between text-sm font-bold text-white">
                <span>{faq.q}</span>
                {expandedFaq === idx ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
              {expandedFaq === idx && (
                <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t border-white/[0.06]">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#080b10] py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span>© {new Date().getFullYear()} {identity.name} Studio</span>
            <span className="mx-2">·</span>
            <span>Commercial Contracts & Invoicing</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/admin')} className="hover:text-white transition-colors">
              Admin OS
            </button>
            <a href={`mailto:${identity.socialLinks.email}`} className="hover:text-white transition-colors">
              {identity.socialLinks.email}
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
