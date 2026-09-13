import React, { useState, useEffect } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Cyberdeck3DScene } from './components/Cyberdeck3DScene';
import { CyberdeckHUD } from './components/CyberdeckHUD';
import { HolographicOverviewView } from './components/HolographicOverviewView';
import { HolographicDossierView } from './components/HolographicDossierView';
import { HolographicSkillsView } from './components/HolographicSkillsView';
import { HolographicProjectsView } from './components/HolographicProjectsView';
import { HolographicExperienceView } from './components/HolographicExperienceView';
import { HolographicContactView } from './components/HolographicContactView';
import { CyberMode, CYBER_MODES } from './types/cyberdeck';

export const Home: React.FC<ThemePageProps> = ({
  identity,
  projects,
  blogPosts,
  experience,
  skillCategories,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<string>('start');
  const [currentMode, setCurrentMode] = useState<CyberMode>('cyber-neon');
  const modeTokens = CYBER_MODES[currentMode] || CYBER_MODES['cyber-neon'];

  // Handle hash navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['start', 'dossier', 'skills', 'projects', 'experience', 'contact'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dossier':
        return (
          <HolographicDossierView
            identity={identity}
            tokens={modeTokens}
            onExploreProjects={() => handleTabChange('projects')}
          />
        );
      case 'skills':
        return <HolographicSkillsView tokens={modeTokens} />;
      case 'projects':
        return (
          <HolographicProjectsView
            projects={projects}
            tokens={modeTokens}
            onNavigate={onNavigate}
          />
        );
      case 'experience':
        return (
          <HolographicExperienceView
            experience={experience}
            tokens={modeTokens}
          />
        );
      case 'contact':
        return <HolographicContactView tokens={modeTokens} />;
      case 'start':
      default:
        return (
          <HolographicOverviewView
            tokens={modeTokens}
            onExploreSection={handleTabChange}
          />
        );
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#050614] text-gray-100 font-mono relative overflow-x-hidden selection:bg-cyan-500 selection:text-black transition-all duration-700"
      style={{ background: modeTokens.bgGradient }}
    >
      {/* 1. Interactive 3D Spatial Canvas Scene */}
      <Cyberdeck3DScene activeTab={activeTab} mode={currentMode} />

      {/* 2. Spatial HUD Navigation Header */}
      <CyberdeckHUD
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        onNavigateAdmin={() => onNavigate('/admin')}
      />

      {/* 3. Main Stage Content Area */}
      <main className="relative z-10 pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        {renderActiveView()}
      </main>

      {/* 4. Bottom Telemetry Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 border-t border-white/10 px-4 py-2 flex items-center justify-between text-[10px] text-gray-400 font-mono tracking-wider backdrop-blur-xl pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-bold hidden sm:inline">3D WORKSTATION SPATIAL PERSPECTIVE</span>
          <span className="text-white/20 hidden sm:inline">&bull;</span>
          <span style={{ color: modeTokens.primaryColor }} className="font-bold">MODE: {modeTokens.name.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 font-mono">BENGALURU, INDIA</span>
          <span className="text-white/20">&bull;</span>
          <span style={{ color: modeTokens.primaryColor }} className="font-bold">SYSTEM SLA 99.9%</span>
        </div>
      </footer>
    </div>
  );
};
