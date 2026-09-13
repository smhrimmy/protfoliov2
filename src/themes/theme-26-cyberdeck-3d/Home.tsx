import React, { useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Cyberdeck3DScene } from './components/Cyberdeck3DScene';
import './theme26.css';

export const Home: React.FC<ThemePageProps> = ({
  identity,
  projects,
  skillCategories,
}) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  
  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Handle hash changes or tab switches
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMenuOpen(false);
    
    const section = document.getElementById(`${tab}-section`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextProject = () => {
    if (projects.length === 0) return;
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrevProject = () => {
    if (projects.length === 0) return;
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    setContactStatus('loading');
    setTimeout(() => {
      setContactStatus('success');
    }, 1200);
  };

  // Extract skills from skillCategories or fallback
  const allSkills = skillCategories && skillCategories.length > 0
    ? skillCategories.flatMap(c => c.skills)
    : [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 92 },
        { name: 'Node.js / Express', level: 88 },
        { name: 'Python / AI Frameworks', level: 85 },
        { name: 'Tailwind CSS / Three.js', level: 90 },
        { name: 'PostgreSQL / MongoDB', level: 86 }
      ];

  const currentProj = projects[currentProjectIndex] || {
    id: 'demo',
    title: 'Portfolio V2 Platform',
    summary: 'High-performance interactive 3D theme portfolio system built with React, Three.js, and TypeScript.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind'],
    liveUrl: '#'
  };

  return (
    <div className="t26-container min-h-screen relative text-[#091434] bg-[#F5EFE6] selection:bg-[#FF923E] selection:text-white">
      {/* 1. 3D Spatial Canvas Background */}
      <Cyberdeck3DScene activeTab={activeTab} />

      {/* 2. Top Header Controls Overlay */}
      <header id="header-container" className="flex items-center justify-between px-6 py-4">
        {/* Logo SVG */}
        <div 
          id="logo-click-container" 
          onClick={() => handleTabChange('home')}
          className="cursor-pointer group flex items-center gap-2"
          title="Return to Home"
        >
          <svg id="header-logo-svg" viewBox="0 0 56 61" width="48" height="48" className="transition-transform group-hover:scale-105">
            <path
              d="M3 14 24 2C28 0 28 0 32 2L53 14C56 16 56 17 56 19L56 43C56 46 55 47 51 49L32 59C28 61 28 61 24 59L5 49C1 47 0 46 0 43L0 19C0 17 0 16 3 14M28 4 5 17 28 28 51 17 28 4M53 20 30 31 30 56 53 44 53 20M40 42 33 35C33 35 32 34 33 33 34 32 35 33 36 34L36 34 43 41C44 42 44 42 43 43L35 51C35 51 34 52 33 51 32 50 33 49 33 49L40 42M16 42 23 35C23 35 24 34 23 33 22 32 21 33 20 34L13 41C12 42 12 42 13 43L21 51C21 51 22 52 23 51 24 50 23 49 23 49L16 42"
              fill="#091434"
            />
          </svg>
          <span className="font-bold text-lg tracking-wider text-[#091434] ml-14 hidden sm:inline">
            {identity?.name || 'Prajwal DL'}
          </span>
        </div>

        {/* Header Right Buttons */}
        <div className="flex items-center gap-4 z-50">
          {/* Sound Toggle Button */}
          <div 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-12 h-12 rounded-xl bg-[#091434] text-white flex items-center justify-center cursor-pointer hover:bg-[#FF923E] transition-colors shadow-lg"
            title={soundEnabled ? "Mute Audio" : "Enable Sound FX"}
          >
            <svg viewBox="0 0 18 9" width="24" height="24" fill="currentColor">
              <path d="M 0 4 C 0 4 0 3 1 3 L 2 3 L 3 2 C 5 0 5 1 5 2 L 5 7 C 5 8 5 9 3 7 L 2 6 L 1 6 C 0 6 0 5 0 5 L 0 4" />
              {soundEnabled && (
                <>
                  <path d="M 7 4 C 8 4 8 5 7 5 C 6 5 6 6 7 6 C 9 6 9 3 7 3 C 6 3 6 4 7 4" />
                  <path d="M 7 2 C 10 2 10 7 7 7 C 6 7 6 8 7 8 C 11 8 11 1 7 1 C 6 1 6 2 7 2" />
                </>
              )}
            </svg>
          </div>

          {/* Menu Toggle Button */}
          <div 
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 rounded-xl bg-[#091434] text-white flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-[#FF923E] transition-colors shadow-lg"
            title="Toggle Menu"
          >
            <div className={`w-6 h-1 bg-white rounded transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-1 bg-white rounded transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-1 bg-white rounded transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </div>
      </header>

      {/* 3. Slide Menu Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
          <div id="menu-container" className="w-80 sm:w-96 bg-white h-full p-8 flex flex-col justify-between shadow-2xl relative">
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-2xl text-[#091434] hover:text-[#FF923E]"
            >
              &times;
            </button>

            <div className="mt-12 flex flex-col gap-6">
              <span 
                onClick={() => handleTabChange('home')}
                className={`menu-item text-2xl font-bold ${activeTab === 'home' ? 'active-menu-item text-[#FF923E]' : 'text-[#091434]'}`}
              >
                Home
              </span>
              <span 
                onClick={() => handleTabChange('about')}
                className={`menu-item text-2xl font-bold ${activeTab === 'about' ? 'active-menu-item text-[#FF923E]' : 'text-[#091434]'}`}
              >
                About
              </span>
              <span 
                onClick={() => handleTabChange('work')}
                className={`menu-item text-2xl font-bold ${activeTab === 'work' ? 'active-menu-item text-[#FF923E]' : 'text-[#091434]'}`}
              >
                Work
              </span>
              <span 
                onClick={() => handleTabChange('contact')}
                className={`menu-item text-2xl font-bold ${activeTab === 'contact' ? 'active-menu-item text-[#FF923E]' : 'text-[#091434]'}`}
              >
                Contact
              </span>
            </div>

            <div className="flex flex-col gap-4 border-t pt-6 border-gray-200">
              <div className="flex items-center gap-4 text-xl text-[#091434]">
                {identity?.socialLinks?.github && (
                  <a href={identity.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF923E]">
                    GitHub
                  </a>
                )}
                {identity?.socialLinks?.linkedin && (
                  <a href={identity.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF923E]">
                    LinkedIn
                  </a>
                )}
                {identity?.socialLinks?.email && (
                  <a href={`mailto:${identity.socialLinks.email}`} className="hover:text-[#FF923E]">
                    Email
                  </a>
                )}
              </div>

              <div className="text-xs text-gray-500 font-mono">
                &copy; {new Date().getFullYear()} {identity?.name || 'Prajwal DL'}. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Main Stage Content */}
      <main className="relative z-10">
        {/* HOME / LANDING SECTION */}
        <section id="home-section" className="min-h-screen flex items-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-3xl">
            <svg id="landing-content-svg" viewBox="0 0 500 240" className="w-full max-w-xl">
              <text className="landing-headline font-bold text-4xl sm:text-6xl" y="55" x="5">Hi, my</text>
              <text className="landing-headline font-bold text-4xl sm:text-6xl" y="125" x="5">name is {identity?.name?.split(' ')[0] || 'Prajwal'}.</text>
              <text className="landing-subheading text-base sm:text-lg" x="10" y="175">
                {identity?.bio || 'I love creating beautiful user experiences and high-performance web applications.'}
              </text>
            </svg>

            <div className="mt-8">
              <button 
                onClick={() => handleTabChange('contact')}
                className="big-button bg-[#FF923E] hover:bg-[#e07d2c] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg text-lg transition-transform hover:-translate-y-1"
              >
                Get in touch
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <section id="about-section" className="min-h-screen px-6 sm:px-12 lg:px-24 py-20 bg-gradient-to-b from-transparent via-[#091434]/5 to-transparent">
          <div id="about-content-container" className="max-w-4xl mx-auto">
            {/* SVG Dossier Header */}
            <div className="bg-[#091434]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-[#34bfff] border border-[#00b7ff]/30 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Character Profile Picture */}
                <div className="w-36 h-44 rounded-xl border-2 border-[#00b7ff] overflow-hidden shadow-lg flex-shrink-0 bg-[#050614]">
                  <img 
                    src="/theme-26/skills-profile-picture.png" 
                    alt={identity?.name || "Prajwal DL"} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Identity Metadata Header */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-[#00b7ff]/20 pb-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Name</div>
                      <div className="text-xl font-bold text-white">{identity?.name || 'Prajwal DL'}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Role</div>
                      <div className="text-xl font-bold text-white">{identity?.role || 'Full-Stack Software Engineer'}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Location</div>
                      <div className="text-xl font-bold text-white">{identity?.location || 'Bengaluru, India'}</div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 tracking-wider uppercase">Technical Skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {allSkills.slice(0, 6).map((skill, idx) => (
                        <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <div className="flex justify-between text-xs font-semibold mb-1 text-white">
                            <span>{skill.name}</span>
                            <span className="text-[#34bfff]">
                              {typeof skill.level === 'number' ? `${skill.level}%` : 'Advanced'}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#2d88dd] to-[#34bfff] rounded-full"
                              style={{ width: `${typeof skill.level === 'number' ? skill.level : 90}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Cards with Pixel Icons */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#00b7ff]/20">
                <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/10">
                  <img src="/theme-26/icons/baby-pixel.png" alt="Icon" className="w-10 h-10 object-contain flex-shrink-0" />
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Software engineer and creative developer building responsive, accessible web systems.
                  </p>
                </div>

                <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/10">
                  <img src="/theme-26/icons/heart-pixel.png" alt="Icon" className="w-10 h-10 object-contain flex-shrink-0" />
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Passionate about turning complex technical problems into intuitive, user-centric products.
                  </p>
                </div>

                <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/10">
                  <img src="/theme-26/icons/rocket-pixel.png" alt="Icon" className="w-10 h-10 object-contain flex-shrink-0" />
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Always exploring cutting-edge technology, full-stack architecture, and 3D web interfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK / PROJECTS CAROUSEL SECTION */}
        <section id="work-section" className="min-h-screen px-6 sm:px-12 lg:px-24 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-0.5 bg-[#FF923E]" />
                <h5 className="text-[#FF923E] font-semibold text-lg uppercase tracking-wider">Portfolio</h5>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#091434] mt-2">
                Some things I've worked on
              </h1>
            </div>

            {/* Project Card Display */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-w-xl mx-auto relative">
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={currentProj.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'} 
                  alt={currentProj.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-[#091434] mb-3">{currentProj.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{currentProj.summary}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-8">
                {currentProj.technologies?.map((tech: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-[#091434] text-white text-xs rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Live View Button */}
              {currentProj.liveUrl && (
                <a 
                  href={currentProj.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 bg-[#FF923E] hover:bg-[#e07d2c] text-white text-center font-bold rounded-xl transition-colors shadow-md"
                >
                  Live View
                </a>
              )}

              {/* Navigation Carousel Buttons */}
              <div className="flex justify-center items-center gap-6 mt-8">
                <button 
                  onClick={handlePrevProject}
                  className="w-14 h-14 rounded-full bg-[#091434] text-white flex items-center justify-center hover:bg-[#FF923E] transition-colors shadow-lg"
                  title="Previous Project"
                >
                  &larr;
                </button>
                <span className="text-sm font-bold text-gray-500 font-mono">
                  {currentProjectIndex + 1} / {projects.length || 1}
                </span>
                <button 
                  onClick={handleNextProject}
                  className="w-14 h-14 rounded-full bg-[#091434] text-white flex items-center justify-center hover:bg-[#FF923E] transition-colors shadow-lg"
                  title="Next Project"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact-section" className="min-h-screen px-6 sm:px-12 lg:px-24 py-20">
          <div className="max-w-2xl mx-auto w-full">
            <div className="mb-8 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="w-10 h-0.5 bg-[#FF923E]" />
                <h5 className="text-[#FF923E] font-semibold text-lg uppercase tracking-wider">Say hello 👋</h5>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#091434] mt-2">
                Contact me
              </h1>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100">
              {contactStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#091434] mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. I'll get back to you shortly.</p>
                  <button 
                    onClick={() => setContactStatus('idle')}
                    className="small-button bg-[#FF923E] text-white px-6 py-2.5 rounded-xl font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Name :</label>
                    <input 
                      type="text" 
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 text-[#091434] font-medium border border-transparent focus:border-[#FF923E] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email :</label>
                    <input 
                      type="email" 
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 text-[#091434] font-medium border border-transparent focus:border-[#FF923E] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Message :</label>
                    <textarea 
                      required
                      rows={5}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="How can I help you?"
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 text-[#091434] font-medium border border-transparent focus:border-[#FF923E] focus:bg-white focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4 text-xl text-[#091434]">
                      {identity?.socialLinks?.github && (
                        <a href={identity.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF923E]">
                          GitHub
                        </a>
                      )}
                      {identity?.socialLinks?.email && (
                        <a href={`mailto:${identity.socialLinks.email}`} className="hover:text-[#FF923E]">
                          Mail
                        </a>
                      )}
                    </div>

                    <button 
                      type="submit"
                      disabled={contactStatus === 'loading'}
                      className="big-button bg-[#FF923E] hover:bg-[#e07d2c] text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5"
                    >
                      {contactStatus === 'loading' ? 'Delivering...' : 'Submit'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 5. Scroll Wheel Indicator */}
      <div className="scroll-container">
        <div className="scroll-border-container">
          <div className="scroll-wheel" />
        </div>
      </div>

      {/* 6. Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-gray-500 font-mono border-t border-gray-200 bg-white/60 backdrop-blur-md">
        &copy; {new Date().getFullYear()} {identity?.name || 'Prajwal DL'}. All rights reserved.
      </footer>
    </div>
  );
};
