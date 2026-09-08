import React, { useState, useEffect, useRef } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { ArrowUpRight, Sparkles, Send, Copy, Check, Star, Heart } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  skillCategories, 
  onNavigate 
}) => {
  // Cursor tracking eyes state
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [activePose, setActivePose] = useState<'hero' | 'projects' | 'about' | 'contact'>('hero');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Idle blink timer
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Pointer eye-tracking math
  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalized vector from screen center
    const dx = (clientX / innerWidth - 0.5) * 2;
    const dy = (clientY / innerHeight - 0.5) * 2;
    
    // Clamped radius
    const maxRadius = 9;
    const distance = Math.hypot(dx, dy);
    const clampedDistance = Math.min(distance, 1);
    const angle = Math.atan2(dy, dx);
    
    setPupilOffset({
      x: Math.cos(angle) * clampedDistance * maxRadius,
      y: Math.sin(angle) * clampedDistance * maxRadius
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(identity.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen text-[#1e272e] font-sans antialiased selection:bg-[#ff4757] selection:text-white w-full max-w-full overflow-x-hidden"
    >
      
      {/* 1. CHUNKY PLAYFUL TOP BAR */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="pointer-events-auto bg-[#1e272e] text-white px-4 py-2 rounded-2xl shadow-[4px_4px_0px_#000] border-2 border-black flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ffd32a] animate-bounce" />
            <span className="font-extrabold text-sm tracking-tight">{identity.name}</span>
            <span className="text-xs bg-[#ff4757] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider hidden sm:inline">
              STUDIO
            </span>
          </div>

          <nav className="pointer-events-auto flex items-center gap-2 text-xs font-extrabold">
            <a
              href="#projects"
              onClick={() => setActivePose('projects')}
              className="bg-white hover:bg-[#ffd32a] text-[#1e272e] px-3.5 py-2 rounded-xl shadow-[3px_3px_0px_#000] border-2 border-black transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Work
            </a>
            <a
              href="#about"
              onClick={() => setActivePose('about')}
              className="bg-white hover:bg-[#00d2d3] text-[#1e272e] px-3.5 py-2 rounded-xl shadow-[3px_3px_0px_#000] border-2 border-black transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setActivePose('contact')}
              className="bg-white hover:bg-[#ff4757] hover:text-white text-[#1e272e] px-3.5 py-2 rounded-xl shadow-[3px_3px_0px_#000] border-2 border-black transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Contact
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="bg-[#1e272e] text-white px-3.5 py-2 rounded-xl shadow-[3px_3px_0px_#000] border-2 border-black transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs"
            >
              Admin
            </button>
          </nav>
        </div>
      </header>

      {/* 2. PANEL 1: HERO - VIBRANT SOLAR YELLOW */}
      <section 
        onMouseEnter={() => setActivePose('hero')}
        className="bg-[#ffd32a] border-b-4 border-black min-h-[90vh] flex flex-col justify-center px-4 sm:px-8 py-20 relative"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#ff4757]" />
              <span>Full-Stack Engineer & Character Craft</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1e272e] tracking-tight leading-[1.05]">
              Making software lively, bold & memorable!
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#2f3542] max-w-xl leading-relaxed">
              {identity.bio}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                onClick={() => setActivePose('projects')}
                className="px-6 py-3.5 bg-[#ff4757] hover:bg-[#ff6b81] text-white font-black text-sm rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all flex items-center gap-2"
              >
                <span>See Selected Works</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </a>
              <a
                href="#contact"
                onClick={() => setActivePose('contact')}
                className="px-6 py-3.5 bg-white hover:bg-gray-100 text-[#1e272e] font-black text-sm rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] transition-all"
              >
                Say Hello!
              </a>
            </div>
          </div>

          {/* Right Mascot Stage */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Interactive Animated Mascot Character SVG */}
            <div 
              aria-hidden="true"
              className="relative w-72 sm:w-80 h-80 flex items-center justify-center filter drop-shadow-[8px_8px_0px_#000]"
            >
              <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                {/* Antenna */}
                <path d="M 150 70 Q 150 35 170 30" stroke="#1e272e" strokeWidth="6" fill="none" strokeLinecap="round" />
                <circle cx="170" cy="30" r="10" fill="#ff4757" stroke="#1e272e" strokeWidth="4" />

                {/* Main Body */}
                <rect
                  x="40"
                  y="70"
                  width="220"
                  height="190"
                  rx="60"
                  fill="#ffffff"
                  stroke="#1e272e"
                  strokeWidth="8"
                />

                {/* Belly Patch */}
                <rect
                  x="65"
                  y="140"
                  width="170"
                  height="100"
                  rx="40"
                  fill="#f1f2f6"
                  stroke="#1e272e"
                  strokeWidth="4"
                />

                {/* Left Eye Socket */}
                <circle cx="105" cy="120" r="30" fill="#ffffff" stroke="#1e272e" strokeWidth="6" />
                {/* Right Eye Socket */}
                <circle cx="195" cy="120" r="30" fill="#ffffff" stroke="#1e272e" strokeWidth="6" />

                {/* Left Pupil (Tracking Pointer) */}
                <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                  <circle cx="105" cy="120" r="14" fill="#1e272e" />
                  <circle cx="102" cy="116" r="4" fill="#ffffff" />
                </g>

                {/* Right Pupil (Tracking Pointer) */}
                <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                  <circle cx="195" cy="120" r="14" fill="#1e272e" />
                  <circle cx="192" cy="116" r="4" fill="#ffffff" />
                </g>

                {/* Eyelids (Blinking Animation) */}
                {isBlinking && (
                  <>
                    <rect x="75" y="90" width="60" height="35" rx="10" fill="#ffffff" stroke="#1e272e" strokeWidth="6" />
                    <rect x="165" y="90" width="60" height="35" rx="10" fill="#ffffff" stroke="#1e272e" strokeWidth="6" />
                  </>
                )}

                {/* Cheeks */}
                <circle cx="75" cy="140" r="10" fill="#ff6b81" opacity="0.6" />
                <circle cx="225" cy="140" r="10" fill="#ff6b81" opacity="0.6" />

                {/* Expression / Mouth based on Active Pose */}
                {activePose === 'hero' && (
                  <path d="M 130 150 Q 150 170 170 150" stroke="#1e272e" strokeWidth="6" fill="none" strokeLinecap="round" />
                )}
                {activePose === 'projects' && (
                  <ellipse cx="150" cy="155" rx="14" ry="10" fill="#ff4757" stroke="#1e272e" strokeWidth="5" />
                )}
                {activePose === 'about' && (
                  <path d="M 135 155 L 165 155" stroke="#1e272e" strokeWidth="6" strokeLinecap="round" />
                )}
                {activePose === 'contact' && (
                  <path d="M 130 148 Q 150 175 170 148 Z" fill="#1e272e" stroke="#1e272e" strokeWidth="4" />
                )}

                {/* Left Arm / Prop */}
                {activePose === 'contact' ? (
                  <g transform="rotate(-20 30 160)">
                    <path d="M 40 160 Q 15 130 30 110" stroke="#1e272e" strokeWidth="8" fill="none" strokeLinecap="round" />
                    {/* Little waving letter */}
                    <rect x="15" y="90" width="30" height="20" rx="3" fill="#ff4757" stroke="#1e272e" strokeWidth="3" />
                  </g>
                ) : (
                  <path d="M 40 160 Q 15 180 35 200" stroke="#1e272e" strokeWidth="8" fill="none" strokeLinecap="round" />
                )}

                {/* Right Arm */}
                {activePose === 'projects' ? (
                  <path d="M 260 160 Q 285 130 265 110" stroke="#1e272e" strokeWidth="8" fill="none" strokeLinecap="round" />
                ) : (
                  <path d="M 260 160 Q 285 180 265 200" stroke="#1e272e" strokeWidth="8" fill="none" strokeLinecap="round" />
                )}
              </svg>
            </div>

            {/* Pose Switcher Buttons */}
            <div className="mt-4 p-1.5 bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1 text-[11px] font-bold">
              {(['hero', 'projects', 'about', 'contact'] as const).map(pose => (
                <button
                  key={pose}
                  onClick={() => setActivePose(pose)}
                  className={`px-3 py-1 rounded-xl capitalize transition-all ${
                    activePose === pose
                      ? 'bg-[#1e272e] text-white shadow-xs'
                      : 'text-[#1e272e] hover:bg-gray-100'
                  }`}
                >
                  {pose}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-black text-[#1e272e]/80 mt-2 uppercase tracking-wider">
              [ WATCH PUPILS TRACK YOUR CURSOR ]
            </span>
          </div>

        </div>
      </section>

      {/* 3. PANEL 2: PROJECTS - VIVID ELECTRIC MINT */}
      <section 
        id="projects" 
        onMouseEnter={() => setActivePose('projects')}
        className="bg-[#00d2d3] border-b-4 border-black px-4 sm:px-8 py-24 space-y-12"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="bg-black text-white px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider">
                FEATURED WORK
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1e272e] mt-2">
                Shipped Systems & Apps
              </h2>
            </div>
            <span className="font-extrabold text-sm text-[#1e272e]">
              Total: {projects.length} Projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug || proj.id}`)}
                className="bg-white rounded-3xl p-6 border-3 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all cursor-pointer space-y-4 group"
              >
                {proj.coverImage && (
                  <div className="aspect-video rounded-2xl overflow-hidden border-2 border-black bg-gray-100">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs font-bold text-[#ff4757]">
                  <span>{proj.role}</span>
                  <span className="text-[#57606f]">{proj.date || '2024'}</span>
                </div>

                <h3 className="text-2xl font-black text-[#1e272e] group-hover:text-[#ff4757] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-sm font-medium text-[#57606f] line-clamp-2">
                  {proj.summary}
                </p>

                <div className="pt-2 flex items-center justify-between font-black text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#f1f2f6] rounded-md border border-black text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#ff4757] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PANEL 3: ABOUT & EXPERIENCE - ELECTRIC LAVENDER */}
      <section 
        id="about" 
        onMouseEnter={() => setActivePose('about')}
        className="bg-[#f3f0ff] border-b-4 border-black px-4 sm:px-8 py-24 space-y-12"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="bg-[#5f27cd] text-white px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider">
              BACKGROUND & ETHOS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1e272e]">
              Engineering with personality.
            </h2>
            <p className="text-base sm:text-lg font-medium text-[#485460] leading-relaxed">
              {identity.bio}
            </p>

            <div className="p-6 rounded-3xl bg-white border-3 border-black shadow-[5px_5px_0px_#000] space-y-3">
              <span className="text-xs font-black text-[#5f27cd] uppercase tracking-wider block">
                SKILLS & CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-2">
                {skillCategories.flatMap(c => c.skills).slice(0, 12).map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#ffd32a] text-[#1e272e] rounded-xl font-bold text-xs border-2 border-black"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black text-[#5f27cd] uppercase tracking-wider block">
              EXPERIENCE TRACK RECORD
            </span>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-1"
                >
                  <div className="flex items-center justify-between font-black">
                    <span className="text-base text-[#1e272e]">{exp.role}</span>
                    <span className="text-xs text-[#5f27cd]">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#ff4757]">{exp.company} · {exp.location}</div>
                  <p className="text-xs text-[#57606f] font-medium pt-1 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. PANEL 4: CONTACT - ENERGETIC CORAL */}
      <footer 
        id="contact" 
        onMouseEnter={() => setActivePose('contact')}
        className="bg-[#ff4757] text-white px-4 sm:px-8 py-24 space-y-8"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="bg-black text-[#ffd32a] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block">
            READY TO COLLABORATE?
          </span>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Let's build something fun!
          </h2>

          <p className="text-lg text-white/90 max-w-xl mx-auto font-medium">
            Open for new software engineering contracts, product builds, and creative digital experiences.
          </p>

          <div className="max-w-md mx-auto p-4 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] flex items-center justify-between gap-4">
            <span className="font-extrabold text-sm text-[#1e272e] truncate select-all">
              {identity.socialLinks.email}
            </span>
            <button
              onClick={copyEmail}
              className="px-4 py-2 bg-[#ffd32a] hover:bg-[#ffc048] text-black font-black text-xs rounded-xl border-2 border-black transition-all flex items-center gap-1.5 shrink-0"
            >
              {copiedEmail ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[3]" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="pt-8 flex items-center justify-center gap-6 text-sm font-extrabold text-white/90">
            {identity.socialLinks.github && (
              <a href={identity.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffd32a]">
                GitHub
              </a>
            )}
            {identity.socialLinks.linkedin && (
              <a href={identity.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffd32a]">
                LinkedIn
              </a>
            )}
            <button onClick={() => onNavigate('/admin')} className="hover:text-[#ffd32a]">
              Admin OS
            </button>
          </div>

          <div className="text-xs text-white/70 pt-4">
            © {new Date().getFullYear()} {identity.name} · Studio Creates™
          </div>
        </div>
      </footer>

    </div>
  );
};
