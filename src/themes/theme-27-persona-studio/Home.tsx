import React, { useState, useEffect } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { PersonaCityCanvas } from './components/PersonaCityCanvas';
import { ProjectModal } from './components/ProjectModal';
import { WhiteboardModal } from './components/WhiteboardModal';
import './persona.css';

export const Home: React.FC<ThemePageProps> = ({
  identity,
  projects,
  skillCategories,
  onNavigate
}) => {
  const [isNight, setIsNight] = useState<boolean>(false);
  const [weather, setWeather] = useState<'sunny' | 'rain' | 'snow'>('sunny');
  const [viewMode, setViewMode] = useState<'city' | 'site'>('city');
  const [activeBuildingModal, setActiveBuildingModal] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Contact Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Sync body night-mode class
  useEffect(() => {
    if (isNight) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  }, [isNight]);

  const handleBuildingSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      setActiveBuildingModal(null);
    } else {
      setActiveBuildingModal(sectionId);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    setContactSubmitted(true);
  };

  const allSkills = skillCategories && skillCategories.length > 0
    ? skillCategories.flatMap(c => c.skills)
    : [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 92 },
        { name: 'Node.js / Express', level: 88 },
        { name: 'Python / AI Engineering', level: 85 },
        { name: 'Tailwind CSS / Three.js', level: 90 },
        { name: 'PostgreSQL / MongoDB', level: 86 }
      ];

  return (
    <div className={`persona-container min-h-screen relative overflow-x-hidden ${isNight ? 'night-mode' : ''}`}>
      {/* 1. Interactive 3D Isometric Persona City Canvas */}
      {viewMode === 'city' && (
        <PersonaCityCanvas 
          isNight={isNight}
          weather={weather}
          activeSection={activeSection}
          onBuildingSelect={handleBuildingSelect}
        />
      )}

      {/* 2. Top Navigation & Environment Control Bar */}
      <header className="persona-header">
        <div className="persona-header-left">
          {/* Brand Logo Chip */}
          <div className="flex items-center gap-2 font-display font-bold text-lg text-black dark:text-white bg-white/80 dark:bg-black/80 px-4 py-2 rounded-full border border-black/10 backdrop-blur-md shadow-md">
            <span className="w-3 h-3 rounded-full bg-[#FDCA3D] animate-pulse" />
            <span>{identity?.name || 'Prajwal DL'}</span>
            <span className="text-xs opacity-50 font-mono">| STUDIO CITY</span>
          </div>
        </div>

        <div className="persona-header-right">
          {/* Weather Selector */}
          <div className="flex items-center gap-1 bg-white/80 dark:bg-black/80 p-1 rounded-full border border-black/10 backdrop-blur-md shadow-md">
            <button 
              onClick={() => setWeather('sunny')}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${weather === 'sunny' ? 'bg-[#FDCA3D] text-black shadow-sm' : 'opacity-60'}`}
              title="Sunny Weather"
            >
              ☀️
            </button>
            <button 
              onClick={() => setWeather('rain')}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${weather === 'rain' ? 'bg-[#FDCA3D] text-black shadow-sm' : 'opacity-60'}`}
              title="Rain Weather"
            >
              🌧️
            </button>
            <button 
              onClick={() => setWeather('snow')}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${weather === 'snow' ? 'bg-[#FDCA3D] text-black shadow-sm' : 'opacity-60'}`}
              title="Snow Weather"
            >
              ❄️
            </button>
          </div>

          {/* Day / Night Mode Toggle */}
          <button 
            onClick={() => setIsNight(!isNight)}
            className="persona-pill-btn"
          >
            {isNight ? '🌙 Night' : '☀️ Day'}
          </button>

          {/* Dual View Mode Switcher */}
          <button 
            onClick={() => setViewMode(viewMode === 'city' ? 'site' : 'city')}
            className="persona-pill-btn active"
          >
            {viewMode === 'city' ? '📄 Studio Site Mode' : '🏙️ 3D City Mode'}
          </button>
        </div>
      </header>

      {/* 3. CITY MODE FLOATING NAVIGATION BAR */}
      {viewMode === 'city' && (
        <nav className="persona-bottom-nav">
          <button 
            onClick={() => handleBuildingSelect('hero')}
            className={`persona-nav-item ${activeSection === 'hero' ? 'active' : ''}`}
          >
            HQ Home
          </button>
          <button 
            onClick={() => handleBuildingSelect('projects')}
            className={`persona-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
          >
            Projects
          </button>
          <button 
            onClick={() => handleBuildingSelect('skills')}
            className={`persona-nav-item ${activeSection === 'skills' ? 'active' : ''}`}
          >
            Skills
          </button>
          <button 
            onClick={() => handleBuildingSelect('whiteboard')}
            className={`persona-nav-item ${activeSection === 'whiteboard' ? 'active' : ''}`}
          >
            Whiteboard
          </button>
          <button 
            onClick={() => handleBuildingSelect('contact')}
            className={`persona-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Contact
          </button>
        </nav>
      )}

      {/* 4. CITY MODE INTERACTIVE MODALS */}
      {viewMode === 'city' && activeBuildingModal === 'projects' && (
        <ProjectModal projects={projects} onClose={() => setActiveBuildingModal(null)} />
      )}

      {viewMode === 'city' && activeBuildingModal === 'whiteboard' && (
        <WhiteboardModal onClose={() => setActiveBuildingModal(null)} />
      )}

      {viewMode === 'city' && activeBuildingModal === 'skills' && (
        <div className="persona-modal-overlay">
          <div className="persona-modal-card max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold font-display">Engineering & Skills Lab</h2>
                <p className="text-sm opacity-70">Technical architecture and core software engineering proficiencies.</p>
              </div>
              <button 
                onClick={() => setActiveBuildingModal(null)}
                className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              {allSkills.map((sk, i) => (
                <div key={i} className="bg-white/80 dark:bg-black/30 p-4 rounded-xl border border-black/10">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>{sk.name}</span>
                    <span className="text-[#FDCA3D] font-mono">{typeof sk.level === 'number' ? `${sk.level}%` : 'Advanced'}</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#E8B520] to-[#FDCA3D] rounded-full"
                      style={{ width: `${typeof sk.level === 'number' ? sk.level : 90}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'city' && activeBuildingModal === 'contact' && (
        <div className="persona-modal-overlay">
          <div className="persona-modal-card max-w-xl w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold font-display">Contact Station</h2>
                <p className="text-sm opacity-70">Get in touch for software projects and consulting.</p>
              </div>
              <button 
                onClick={() => setActiveBuildingModal(null)}
                className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center font-bold text-xl"
              >
                &times;
              </button>
            </div>

            {contactSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-sm opacity-70 mb-6">Thank you for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setContactSubmitted(false)}
                  className="px-6 py-2.5 bg-[#FDCA3D] text-black font-bold text-xs uppercase tracking-wider rounded-xl"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#FDCA3D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#FDCA3D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="How can I help you?"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#FDCA3D] resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-[#FDCA3D] hover:bg-[#e8b520] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md mt-4"
                >
                  Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. STUDIO LANDING SITE MODE */}
      {viewMode === 'site' && (
        <div className="pt-32 pb-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-24 relative z-10">
          {/* Hero Section */}
          <section className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#FDCA3D]/20 text-[#E8B520] font-mono text-xs font-bold uppercase tracking-wider">
              Product Design & Interactive Engineering
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold font-display tracking-tight leading-tight">
              Hi, I'm {identity?.name || 'Prajwal DL'}.<br />
              Building interactive products & digital experiences.
            </h1>
            <p className="text-xl max-w-2xl opacity-80 leading-relaxed font-body">
              {identity?.bio || 'Full-stack engineer and creative developer specializing in high-performance web systems, interactive 3D web applications, and intuitive product design.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => setViewMode('city')}
                className="px-8 py-4 bg-[#FDCA3D] hover:bg-[#e8b520] text-black font-bold rounded-full text-base transition-all shadow-lg hover:-translate-y-0.5"
              >
                Explore Persona 3D City &rarr;
              </button>
              {identity?.socialLinks?.github && (
                <a 
                  href={identity.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-black/20 dark:border-white/20 hover:border-black font-bold rounded-full text-base transition-all"
                >
                  GitHub Profile
                </a>
              )}
            </div>
          </section>

          {/* Featured Projects Grid */}
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-display mb-2">Featured Projects</h2>
              <p className="text-sm opacity-70">A selection of recent applications and software builds.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white/80 dark:bg-black/40 rounded-3xl p-6 border border-black/10 shadow-xl space-y-4">
                  <div className="w-full h-56 rounded-2xl overflow-hidden bg-gray-100">
                    <img 
                      src={proj.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'} 
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold font-display">{proj.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{proj.summary}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies?.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-black/10 dark:bg-white/10 text-xs font-semibold rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  {proj.liveUrl && (
                    <a 
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block pt-2 text-xs font-bold uppercase tracking-wider text-[#E8B520] hover:underline"
                    >
                      View Live Site &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-16 border-t border-black/10 text-center text-xs opacity-60 font-mono">
            &copy; {new Date().getFullYear()} {identity?.name || 'Prajwal DL'}. Persona Studio Theme.
          </footer>
        </div>
      )}

      {/* 6. FPS TELEMETRY METER */}
      <div className="fps-telemetry">
        FPS: 60 | CITY MODE: ACTIVE
      </div>
    </div>
  );
};
