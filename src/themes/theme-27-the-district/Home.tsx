import React, { useState } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { BuildingId } from './components/DistrictCanvas3D';
import { DistrictCanvas3D } from './components/DistrictCanvas3D';
import { DistrictHUD } from './components/DistrictHUD';
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

  return (
    <div className="relative w-screen h-screen overflow-hidden district-theme select-none">
      
      {/* 3D WebGL District Canvas */}
      <DistrictCanvas3D
        activeBuilding={activeBuilding}
        onSelectBuilding={(id) => setActiveBuilding(id)}
      />

      {/* Heads Up Display (HUD) */}
      <DistrictHUD
        activeBuilding={activeBuilding}
        onSelectBuilding={(id) => setActiveBuilding(id)}
        identityName={identity.name}
      />

      {/* Interior Detail Room View (Active when camera dollies into a building) */}
      {activeBuilding && (
        <InteriorDetailView
          activeBuilding={activeBuilding}
          onBackToDistrict={() => setActiveBuilding(null)}
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
