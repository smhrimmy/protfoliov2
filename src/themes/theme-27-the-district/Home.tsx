import React, { useEffect, useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { BuildingId } from './components/DistrictCanvas3D';
import { DistrictCanvas3D } from './components/DistrictCanvas3D';
import { DistrictHUD } from './components/DistrictHUD';
import { DistrictSVGFallback } from './components/DistrictSVGFallback';
import { InteriorDetailView } from './components/InteriorDetailView';
import './the-district.css';

export const Home: React.FC<ThemePageProps> = ({
  identity,
  projects,
  blogPosts,
  experience,
  skillCategories
}) => {
  const [activeBuilding, setActiveBuilding] = useState<BuildingId | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGlSupported(!!gl);
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  const handleSelectBuilding = (id: BuildingId | null) => {
    if (id) {
      setIsTransitioning(true);
      setActiveBuilding(id);
      // 900ms eased transition timer
      setTimeout(() => {
        setIsTransitioning(false);
      }, 900);
    } else {
      setActiveBuilding(null);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden district-theme select-none">
      
      {/* 3D WebGL Canvas or 2D Static Isometric SVG Fallback */}
      {webGlSupported ? (
        <DistrictCanvas3D
          activeBuilding={activeBuilding}
          onSelectBuilding={handleSelectBuilding}
          onTransitioningChange={(val) => setIsTransitioning(val)}
        />
      ) : (
        <DistrictSVGFallback
          activeBuilding={activeBuilding}
          onSelectBuilding={handleSelectBuilding}
        />
      )}

      {/* Heads-Up Display (HUD) with fixed bottom-right compass widget */}
      <DistrictHUD
        activeBuilding={activeBuilding}
        onSelectBuilding={handleSelectBuilding}
        identityName={identity.name}
      />

      {/* Full-Screen Material-Matched Room Interior View */}
      {activeBuilding && !isTransitioning && (
        <InteriorDetailView
          activeBuilding={activeBuilding}
          onBackToDistrict={() => handleSelectBuilding(null)}
          identity={identity}
          projects={projects}
          blogPosts={blogPosts}
          experience={experience}
          skillCategories={skillCategories}
        />
      )}
    </div>
  );
};
