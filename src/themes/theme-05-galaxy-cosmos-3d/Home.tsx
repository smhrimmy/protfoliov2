import React, { useEffect, useRef, useState } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';
import * as THREE from 'three';
import { Orbit, Sparkles, Compass, Radio, ExternalLink } from 'lucide-react';

export const Home: React.FC<ThemePageProps> = ({ identity, projects, onNavigate }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  // Three.js 3D WebGL Galaxy Scene with 2D Fallback
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let stars: THREE.Points;
    let animId: number;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 40;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Starfield Particle Geometry
      const starGeo = new THREE.BufferGeometry();
      const starCount = 1200;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 120;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const starMat = new THREE.PointsMaterial({
        color: 0xc084fc,
        size: 0.8,
        transparent: true,
        opacity: 0.8
      });

      stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      const animate = () => {
        stars.rotation.y += 0.0012;
        stars.rotation.x += 0.0006;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to CSS galaxy gradient.', e);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050510] text-[#f3e8ff] font-sans overflow-hidden select-none">
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Orbital Navigation Ring */}
      <header className="relative z-10 p-6 flex items-center justify-between border-b border-purple-950/40 bg-[#050510]/50 backdrop-blur-md max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center">
            <Orbit className="w-5 h-5 text-purple-300 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-black text-sm tracking-wider uppercase text-white">{identity.name}</h1>
            <p className="text-[10px] font-mono text-purple-400">COSMIC CARTOGRAPHY · {identity.alias}</p>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-xs font-mono text-purple-300">
          <a href="#celestial-index" className="hover:text-white transition-colors">CELESTIAL INDEX</a>
          <a href={`mailto:${identity.socialLinks.email}`} className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs font-bold transition-colors">
            TRANSMIT
          </a>
        </nav>
      </header>

      {/* Main Radial Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Core Solar Hero */}
        <section className="lg:col-span-6 space-y-6">
          <div className="p-8 rounded-3xl bg-purple-950/20 border border-purple-500/20 backdrop-blur-lg space-y-4">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">STELLAR COORDINATES</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {identity.tagline}
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-mono">
              {identity.bio}
            </p>
          </div>

          {/* Planetary Nodes Carousel */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest">Planetary Project Nodes</h3>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedProject.id === proj.id 
                      ? 'bg-purple-600/30 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                      : 'bg-white/5 border-white/5 hover:border-purple-500/40'
                  }`}
                >
                  <p className="text-[10px] font-mono text-purple-400">ORBIT 0{idx + 1}</p>
                  <p className="font-bold text-white text-sm mt-1">{proj.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Planet Detail Inspector */}
        <section className="lg:col-span-6 flex flex-col justify-center">
          <div className="p-8 rounded-3xl bg-[#0d0d26]/80 border border-purple-500/30 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">TARGET CELESTIAL BODY</span>
                <h3 className="text-2xl font-black text-white mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => onNavigate(`/projects/${selectedProject.slug}`)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                Inspect Case Study <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-52 w-full rounded-2xl overflow-hidden border border-purple-500/20">
              <img src={selectedProject.coverImage} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs text-purple-200 leading-relaxed font-mono">
              {selectedProject.caseStudyBody}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedProject.technologies.map((t, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
