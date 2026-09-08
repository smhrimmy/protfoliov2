import React, { useState, useEffect } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import { 
  Camera, Hand, ArrowUpRight, Sparkles, Shield, 
  ExternalLink, Copy, Check, Eye, RefreshCw, X
} from 'lucide-react';
import { LowPolyMesh } from './three/LowPolyMesh';
import { CSSFacetedMesh } from './fallback/CSSFacetedMesh';
import { useHandTracker } from './vision/useHandTracker';
import { ConsentGate } from './components/ConsentGate';
import { DeviceFramePreview } from './components/DeviceFramePreview';

export const Home: React.FC<ThemePageProps> = ({ 
  identity, 
  projects, 
  experience, 
  skillCategories, 
  onNavigate 
}) => {
  // Hand tracking state hook
  const handTracker = useHandTracker();
  
  // Consent modal state
  const [consentOpen, setConsentOpen] = useState(false);
  const [useCSSFallback, setUseCSSFallback] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse rotation state (used when hand tracking is inactive)
  const [mouseRot, setMouseRot] = useState({ x: 0, y: 0 });
  const [isPointerInteracting, setIsPointerInteracting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pointer drag / move handler for the 3D mesh
  const handlePointerMove = (e: React.MouseEvent) => {
    if (handTracker.isActive || reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMouseRot({ x, y });
  };

  const handleStartTracking = async () => {
    setConsentOpen(false);
    await handTracker.startTracking();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(identity.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Determine current rotation source
  const currentRotX = handTracker.isActive ? handTracker.handX : mouseRot.x;
  const currentRotY = handTracker.isActive ? handTracker.handY : mouseRot.y;

  return (
    <div 
      onMouseMove={handlePointerMove}
      className="min-h-screen bg-[#07070b] text-[#f0f0f5] font-sans antialiased selection:bg-[#7952ff] selection:text-white w-full max-w-full overflow-x-hidden"
    >
      
      {/* 1. MINIMAL CORNER ACTIONS NAVIGATION */}
      <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-[#07070b]/90 to-transparent backdrop-blur-xs text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7952ff] shadow-[0_0_10px_#7952ff]" />
            <span className="font-bold text-white tracking-widest text-xs uppercase">{identity.name}</span>
            <span className="text-gray-600 hidden sm:inline">/</span>
            <span className="text-gray-400 hidden sm:inline text-[11px]">
              Paper-Fold 3D & Vision Lab
            </span>
          </div>

          <div className="flex items-center gap-3">
            {handTracker.isActive ? (
              <button
                onClick={handTracker.stopTracking}
                className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-mono flex items-center gap-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Stop Camera</span>
              </button>
            ) : (
              <button
                onClick={() => setConsentOpen(true)}
                className="px-3 py-1 rounded-full bg-[#7952ff]/20 hover:bg-[#7952ff]/30 border border-[#7952ff]/40 text-[#b59bff] text-[11px] font-mono flex items-center gap-1.5 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Try Hand Tracking</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('/admin')}
              className="px-2.5 py-1 rounded border border-white/10 text-gray-400 hover:text-white transition-colors text-[11px]"
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* 2. THE 3D FACETED HERO VIEWPORT */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-20 pb-12 px-4 sm:px-8">
        
        {/* Subtle Background Polygon Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, #7952ff15 1px, transparent 1px), linear-gradient(to bottom, #7952ff15 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Top Tagline */}
        <div className="max-w-7xl mx-auto w-full pt-4 space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7952ff]/10 border border-[#7952ff]/30 text-[#b59bff] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Faceted Geometry & Computer Vision Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] max-w-2xl">
            Crafting digital experiences, one fold at a time.
          </h1>
        </div>

        {/* Central 3D / Low-Poly Mesh Viewport */}
        <div className="relative w-full max-w-3xl h-[420px] sm:h-[500px] mx-auto my-4 flex items-center justify-center">
          {useCSSFallback ? (
            <CSSFacetedMesh
              rotX={currentRotX}
              rotY={currentRotY}
              isPinching={handTracker.isPinching}
            />
          ) : (
            <LowPolyMesh
              rotX={currentRotX}
              rotY={currentRotY}
              isPinching={handTracker.isPinching}
              onWebGLUnsupported={() => setUseCSSFallback(true)}
            />
          )}

          {/* Interactive Control Pill Overlay */}
          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto bg-[#101018]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{handTracker.isActive ? 'Hand Tracking Online' : 'Mouse Control Active'}</span>
              </span>
              <span className="text-gray-600">|</span>
              {handTracker.isActive ? (
                <button
                  onClick={handTracker.stopTracking}
                  className="text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Turn Off Camera
                </button>
              ) : (
                <button
                  onClick={() => setConsentOpen(true)}
                  className="text-[#b59bff] hover:text-white transition-colors flex items-center gap-1"
                >
                  <Hand className="w-3.5 h-3.5" />
                  <span>Opt-in Webcam Control</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Bottom Meta Strip */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500 z-10 border-t border-white/[0.06] pt-4">
          <div>
            <span>GEOMETRY: 120 FACETED POLYGONS</span>
            <span className="mx-2">·</span>
            <span>SHADING: FLAT PBR</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#work" className="text-gray-300 hover:text-white transition-colors">
              Explore Shipped Work ↓
            </a>
          </div>
        </div>

      </section>

      {/* 3. SHIPPED WORK REPERTOIRE */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08] space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#7952ff] uppercase tracking-widest block">
              // REPERTOIRE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Engineered Works & Applications
            </h2>
          </div>
          <span className="font-mono text-xs text-gray-500">
            {projects.length} Total Deployed Projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => onNavigate(`/projects/${proj.slug || proj.id}`)}
              className="p-6 rounded-3xl bg-[#0f1017] border border-white/[0.08] hover:border-[#7952ff]/50 transition-all cursor-pointer space-y-4 group"
            >
              {proj.coverImage && (
                <div className="aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/[0.06]">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-[#b59bff]">
                <span>{proj.role}</span>
                <span className="text-gray-500">{proj.date || '2024'}</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#b59bff] transition-colors">
                {proj.title}
              </h3>

              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-light">
                {proj.summary}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-500">{proj.technologies.slice(0, 2).join(' · ')}</span>
                <span className="text-[#b59bff] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Inspect Case</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECTONIC EXPERIENCE & PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-white/[0.08] space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-[#7952ff] uppercase tracking-widest block">
              // PHILOSOPHY
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Tactile, Dimensional Interfaces.
            </h2>
            <p className="text-base text-gray-300 leading-relaxed font-light">
              {identity.bio}
            </p>

            <div className="p-6 rounded-3xl bg-[#0f1017] border border-white/[0.08] space-y-3 font-mono text-xs">
              <span className="text-[#b59bff] font-bold block uppercase tracking-wider">
                CORE CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-2">
                {skillCategories.flatMap(c => c.skills).slice(0, 10).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs text-[#7952ff] uppercase tracking-widest block">
              // HISTORY
            </span>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0f1017] border border-white/[0.08] space-y-1.5 font-mono text-xs"
                >
                  <div className="flex items-center justify-between text-white font-sans font-bold">
                    <span className="text-sm">{exp.role}</span>
                    <span className="text-xs font-mono text-[#b59bff]">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-gray-400 font-sans">{exp.company} · {exp.location}</div>
                  <p className="text-gray-300 leading-relaxed font-sans text-xs pt-1">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. FOOTER & DIRECT INQUIRY */}
      <footer className="border-t border-white/[0.08] bg-[#040407] py-12 text-xs font-mono text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7952ff]" />
            <span>Theme 23 · Low-Poly Paper-Fold System</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={copyEmail}
              className="text-[#b59bff] hover:text-white transition-colors"
            >
              {copiedEmail ? 'Email Copied!' : identity.socialLinks.email}
            </button>
            <button onClick={() => onNavigate('/admin')} className="hover:text-white transition-colors">
              Admin OS
            </button>
          </div>
        </div>
      </footer>

      {/* CAMERA OPT-IN CONSENT GATE MODAL */}
      <ConsentGate
        isOpen={consentOpen}
        onConfirm={handleStartTracking}
        onCancel={() => setConsentOpen(false)}
        error={handTracker.error}
      />

      {/* SMARTPHONE BEZEL CAMERA LIVE PREVIEW */}
      <DeviceFramePreview
        videoRef={handTracker.videoRef}
        isActive={handTracker.isActive}
        isPinching={handTracker.isPinching}
        landmarks={handTracker.landmarks}
        onStop={handTracker.stopTracking}
      />

    </div>
  );
};
