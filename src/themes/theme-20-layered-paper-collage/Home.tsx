import React, { useState, useEffect, useRef } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { ArrowUpRight, Copy, Check, ExternalLink, Pin, Sparkles } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  skillCategories, 
  onNavigate 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Multi-plane pointer parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const getLayerStyle = (depth: number, baseRotate: number = 0) => {
    if (reducedMotion) return { transform: `rotate(${baseRotate}deg)` };
    const factor = 12;
    const tx = mouseOffset.x * depth * factor;
    const ty = mouseOffset.y * depth * factor;
    return {
      transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${baseRotate}deg)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(identity.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#e9e5dc] text-[#2c2927] font-serif antialiased selection:bg-[#d9534f] selection:text-white w-full max-w-full overflow-x-hidden relative"
      style={{
        backgroundImage: `radial-gradient(#c8c2b5 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    >
      
      {/* 1. MASKING TAPE STICKY-NOTE TABS NAVIGATION */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 pointer-events-none">
        <div className="flex items-center justify-between">
          
          {/* Logo Name Tag */}
          <div 
            style={getLayerStyle(1.5, -2)}
            className="pointer-events-auto bg-[#faf8f5] px-4 py-2 rounded-sm shadow-md border border-[#d8d2c4] relative"
          >
            {/* Masking tape on top */}
            <div className="absolute -top-2 left-6 w-12 h-4 bg-[#f3ebd7]/80 rotate-[-4deg] border-x border-[#ded5be]/60 shadow-xs" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#7a7469] block">Studio Board</span>
            <span className="font-bold text-sm text-[#2c2927] font-serif">{identity.name}</span>
          </div>

          {/* Tag Navigation Buttons */}
          <nav className="pointer-events-auto flex items-center gap-2 sm:gap-3 text-xs font-mono">
            <a
              href="#folio"
              style={getLayerStyle(1.8, 1)}
              className="bg-[#faf5ea] hover:bg-white px-3 py-1.5 rounded-sm shadow-md border border-[#ded5be] transition-all hover:-translate-y-0.5 relative group"
            >
              <div className="absolute -top-2 left-3 w-8 h-3.5 bg-[#f3ebd7]/70 rotate-[2deg] shadow-2xs" />
              <span>Projects</span>
            </a>
            <a
              href="#about"
              style={getLayerStyle(2.2, -1.5)}
              className="bg-[#faf5ea] hover:bg-white px-3 py-1.5 rounded-sm shadow-md border border-[#ded5be] transition-all hover:-translate-y-0.5 relative group"
            >
              <div className="absolute -top-2 left-3 w-8 h-3.5 bg-[#f3ebd7]/70 rotate-[-3deg] shadow-2xs" />
              <span>About</span>
            </a>
            <a
              href="#contact"
              style={getLayerStyle(2.5, 2)}
              className="bg-[#faf5ea] hover:bg-white px-3 py-1.5 rounded-sm shadow-md border border-[#ded5be] transition-all hover:-translate-y-0.5 relative group"
            >
              <div className="absolute -top-2 left-3 w-8 h-3.5 bg-[#f3ebd7]/70 rotate-[1deg] shadow-2xs" />
              <span>Contact</span>
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              style={getLayerStyle(2, -2)}
              className="bg-[#3e3a36] text-[#faf8f5] hover:bg-[#201e1c] px-3 py-1.5 rounded-sm shadow-md transition-all hover:-translate-y-0.5 text-[11px]"
            >
              Admin OS
            </button>
          </nav>

        </div>
      </header>

      {/* 2. THE COLLAGE HERO BOARD */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-24 relative min-h-[85vh] flex flex-col justify-center">
        
        {/* Screen Reader Visually Hidden Heading */}
        <h1 className="sr-only">
          {identity.name} — {identity.role}. Digital product designer crafting tactile, purposeful web systems.
        </h1>

        <div className="relative w-full max-w-4xl mx-auto min-h-[500px] flex items-center justify-center">
          
          {/* Layer 1: Background Craft Paper Backing (Depth 0.8) */}
          <div 
            style={getLayerStyle(0.8, -1)}
            className="absolute inset-x-4 sm:inset-x-12 inset-y-6 bg-[#ded8cb] rounded-lg shadow-inner border border-[#cfc8b9] -z-10"
          >
            {/* Grid ruler markings */}
            <div className="absolute top-2 left-3 font-mono text-[10px] text-[#9c9485] tracking-widest">
              BOARD REF: 020/COLLAGE · 1:1 TACTILE SCALE
            </div>
          </div>

          {/* Layer 2: Portrait Polaroid Cutout (Depth 1.5) */}
          <div 
            style={getLayerStyle(1.5, 3)}
            className="relative sm:absolute sm:left-12 sm:top-12 z-10 w-56 sm:w-64 p-3 bg-white shadow-xl rounded-xs border border-[#ddd6c8] group"
          >
            {/* Pushpin at top center */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
              <div className="w-5 h-5 rounded-full bg-[#d9534f] shadow-md border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
            </div>

            <div className="aspect-[4/5] overflow-hidden bg-[#e0dcd3] grayscale contrast-115">
              <img
                src={identity.avatarUrl}
                alt={identity.name}
                className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="pt-2.5 text-center font-mono text-xs text-[#5c564c]">
              {identity.name} · {identity.location}
            </div>
          </div>

          {/* Layer 3: Sliced Headline Letterform Fragments (Depth 2.5 to 4.5) */}
          <div className="relative z-20 pointer-events-none select-none my-12 sm:my-0">
            <div className="flex items-center justify-center tracking-tighter font-extrabold text-6xl sm:text-8xl md:text-9xl text-[#1f1d1b]">
              
              {/* Fragment 1: "C" */}
              <div 
                style={getLayerStyle(4.5, -4)}
                className="bg-[#faf7f2] text-[#22201e] px-3 py-1 shadow-2xl border border-[#d8d2c4] rounded-sm transform hover:scale-105 transition-transform"
              >
                C
              </div>

              {/* Fragment 2: "R" */}
              <div 
                style={getLayerStyle(3.2, 5)}
                className="bg-[#f0ece1] text-[#d9534f] px-3 py-2 shadow-2xl border border-[#d8d2c4] rounded-sm -ml-2 -mt-6 transform"
              >
                R
              </div>

              {/* Fragment 3: "A" */}
              <div 
                style={getLayerStyle(4.0, -2)}
                className="bg-[#242220] text-[#faf8f5] px-3.5 py-1 shadow-2xl rounded-sm -ml-2 transform"
              >
                A
              </div>

              {/* Fragment 4: "F" */}
              <div 
                style={getLayerStyle(2.8, 6)}
                className="bg-[#faf7f2] text-[#22201e] px-3 py-1.5 shadow-2xl border border-[#d8d2c4] rounded-sm -ml-2 mt-4 transform"
              >
                F
              </div>

              {/* Fragment 5: "T" */}
              <div 
                style={getLayerStyle(5.0, -5)}
                className="bg-[#dfd9cc] text-[#1c1b19] px-3 py-2 shadow-2xl border border-[#c4beaf] rounded-sm -ml-2 -mt-4 transform"
              >
                T
              </div>

            </div>
          </div>

          {/* Layer 4: Pinned Index Card Statement (Depth 3.0) */}
          <div 
            style={getLayerStyle(3.0, -2)}
            className="sm:absolute sm:right-8 sm:bottom-8 z-30 max-w-sm p-6 bg-[#faf8f2] shadow-2xl rounded-sm border border-[#ded8cb] space-y-3"
          >
            {/* Red pushpin */}
            <div className="absolute -top-3 right-6 z-20">
              <div className="w-4 h-4 rounded-full bg-[#3e3a36] shadow-sm border border-white" />
            </div>

            <span className="font-mono text-[10px] text-[#948d7f] uppercase tracking-wider block">
              // DESIGN MANIFESTO
            </span>
            <p className="text-sm font-serif leading-relaxed text-[#3c3833]">
              {identity.bio}
            </p>

            {/* Luggage Tag Style CTA Button */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9534f] hover:bg-[#c4413d] text-white font-mono text-xs rounded-sm shadow-md transition-all transform hover:-rotate-1 relative"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="font-mono text-[11px] text-[#7a7469]">
                Status: Available
              </span>
            </div>
          </div>

        </div>

        {/* Parallax interaction footnote */}
        <div className="text-center pt-8 font-mono text-[11px] text-[#8c8477]">
          [ TACTILE MULTI-PLANE PARALLAX · MOVE CURSOR TO SEPARATE LAYERS ]
        </div>
      </section>

      {/* 3. POLAROID & PINNED FOLIO SECTION */}
      <section id="folio" className="max-w-6xl mx-auto px-4 py-20 border-t border-[#d8d2c4] space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8c8477] block">
              Exhibit Board
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1f1d1b] mt-1">
              Pinned Selected Projects
            </h2>
          </div>
          <span className="font-mono text-xs text-[#7a7469]">
            {projects.length} Assembled Works
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => {
            const rot = idx % 2 === 0 ? -2 : 2.5;
            return (
              <article
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug || proj.id}`)}
                style={{ transform: `rotate(${rot}deg)` }}
                className="group cursor-pointer bg-white p-4 shadow-xl rounded-xs border border-[#ddd6c8] hover:shadow-2xl hover:scale-[1.02] hover:rotate-0 transition-all duration-300 relative space-y-3"
              >
                {/* Masking tape on top corner */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#f4edd9]/80 rotate-[1deg] border-x border-[#e2d8be]/80 shadow-2xs z-10" />

                {proj.coverImage && (
                  <div className="aspect-[4/3] bg-[#ece7dd] overflow-hidden border border-[#eae4d8]">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#8c8477]">
                    <span>REF: 0{idx + 1}</span>
                    <span>{proj.date || '2024'}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1f1d1b] group-hover:text-[#d9534f] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="font-serif text-xs text-[#5c564c] line-clamp-2 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f0ece3] flex items-center justify-between font-mono text-[11px] text-[#7a7469]">
                  <span>{proj.role}</span>
                  <span className="text-[#d9534f] flex items-center gap-1 font-bold">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. LINED NOTEBOOK ABOUT & EXPERIENCE */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-20 border-t border-[#d8d2c4] space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Lined Notebook Paper Card */}
          <div className="lg:col-span-7 bg-[#fffefb] p-8 rounded-sm shadow-xl border border-[#ded7ca] relative space-y-6">
            <div className="absolute -top-3 left-10 w-24 h-5 bg-[#f3ecd7]/80 rotate-[-2deg] border-x border-[#ded4bd] shadow-2xs" />

            <div className="border-b-2 border-[#d9534f]/30 pb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-[#9c9485] uppercase tracking-wider">
                NOTEBOOK RECORD // CAREER HISTORY
              </span>
              <span className="font-mono text-xs text-[#d9534f] font-bold">VERIFIED</span>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="border-b border-[#f0ece1] pb-4 space-y-1">
                  <div className="flex items-center justify-between font-serif">
                    <h4 className="font-bold text-base text-[#242220]">{exp.role}</h4>
                    <span className="font-mono text-xs text-[#8c8477]">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-[#d9534f]">{exp.company} · {exp.location}</div>
                  <p className="font-serif text-xs text-[#5c564c] leading-relaxed pt-1">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Notes Stack (Skills & Toolbox) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#fff9db] p-6 rounded-sm shadow-lg border border-[#e8dfaf] rotate-[1.5deg] space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#8a7f45] block font-bold">
                STICKY NOTE: CORE TOOLS
              </span>
              <div className="flex flex-wrap gap-2">
                {skillCategories.flatMap(c => c.skills).slice(0, 10).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white/80 border border-[#e0d69f] rounded-xs font-mono text-xs text-[#4a4427]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#e8f4f8] p-6 rounded-sm shadow-lg border border-[#c2dde6] rotate-[-2deg] space-y-3 font-mono text-xs text-[#3b5966]">
              <span className="font-bold uppercase tracking-wider block text-[#2c4754]">
                DISPATCH NOTE
              </span>
              <p className="font-serif text-xs leading-relaxed text-[#3c5561]">
                Available for end-to-end design sprints, architectural consultation, and high-craft web engineering.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. POSTCARD CONTACT BOARD */}
      <footer id="contact" className="max-w-6xl mx-auto px-4 py-20 border-t border-[#d8d2c4]">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-sm shadow-2xl border border-[#d8d1c2] relative space-y-6">
          <div className="absolute top-4 right-4 w-16 h-20 border-2 border-dashed border-[#b8b09f] p-1 flex flex-col items-center justify-center font-mono text-[9px] text-[#8c8477]">
            <span>POSTAGE</span>
            <span className="text-[#d9534f] font-bold text-xs mt-1">PDL OS</span>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-[#8c8477] uppercase tracking-wider block">
              CORRESPONDENCE
            </span>
            <h3 className="text-2xl font-serif text-[#1f1d1b]">
              Send a Letter or Contract Request
            </h3>
            <p className="font-serif text-xs text-[#686256] leading-relaxed">
              Drop a note directly to my inbox. I usually reply within 24–48 hours.
            </p>
          </div>

          <div className="p-4 bg-[#f8f5ee] rounded-xs border border-[#ded7ca] flex items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-[#8c8477] block uppercase">INBOX</span>
              <span className="font-mono text-sm font-bold text-[#242220] select-all">
                {identity.socialLinks.email}
              </span>
            </div>
            <button
              onClick={copyEmail}
              className="px-3 py-1.5 bg-[#d9534f] hover:bg-[#c4413d] text-white font-mono text-xs rounded-sm transition-all flex items-center gap-1.5 shrink-0"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between font-mono text-xs text-[#8c8477] pt-4 border-t border-[#f0ece1]">
            <span>© {new Date().getFullYear()} {identity.name}</span>
            <div className="flex items-center gap-4">
              {identity.socialLinks.github && (
                <a href={identity.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#d9534f]">
                  GitHub
                </a>
              )}
              {identity.socialLinks.linkedin && (
                <a href={identity.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#d9534f]">
                  LinkedIn
                </a>
              )}
              <button onClick={() => onNavigate('/admin')} className="hover:text-[#d9534f]">
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
