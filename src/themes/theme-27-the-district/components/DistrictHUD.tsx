import React from 'react';
import { BuildingId, BUILDINGS } from './DistrictCanvas3D';
import {
  Building2,
  Compass,
  FolderKanban,
  Library,
  Radio,
  User,
  ZoomOut
} from 'lucide-react';

interface DistrictHUDProps {
  activeBuilding: BuildingId | null;
  onSelectBuilding: (id: BuildingId | null) => void;
  identityName: string;
}

export const DistrictHUD: React.FC<DistrictHUDProps> = ({
  activeBuilding,
  onSelectBuilding,
  identityName
}) => {
  const getIcon = (id: BuildingId) => {
    switch (id) {
      case 'studio':
        return <User className="w-3.5 h-3.5" />;
      case 'gallery':
        return <FolderKanban className="w-3.5 h-3.5" />;
      case 'office':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'archive':
        return <Library className="w-3.5 h-3.5" />;
      case 'signal':
        return <Radio className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-between w-full">
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl district-glass border border-[#F5A65B]/30 shadow-xl">
          <div className="w-3 h-3 rounded-full bg-[#F5A65B] animate-pulse" />
          <div>
            <h1 className="district-heading text-sm sm:text-base font-bold text-white tracking-wide">
              {identityName}'s District
            </h1>
            <p className="text-[10px] text-[#8B8FD9] font-mono">
              3/4 ISOMETRIC WALKABLE CITY METAPHOR
            </p>
          </div>
        </div>

        {/* Wide Shot Reset Button (Top Right) */}
        {activeBuilding && (
          <button
            onClick={() => onSelectBuilding(null)}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F5A65B] text-slate-950 font-bold text-xs font-mono shadow-xl hover:bg-[#ffb76b] transition-all"
          >
            <ZoomOut className="w-4 h-4" />
            ← Back to wide district shot
          </button>
        )}
      </div>

      {/* FIXED BOTTOM-RIGHT COMPASS & DIRECT JUMP MAP WIDGET */}
      <div className="pointer-events-auto self-end flex flex-col items-end gap-2 max-w-xs w-full">
        <div className="district-glass p-3 sm:p-4 rounded-2xl border border-[#F5A65B]/40 shadow-2xl space-y-3 w-full backdrop-blur-xl">
          
          {/* Compass Radar Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#F5A65B] animate-radar" />
              <span className="text-xs font-bold font-mono text-white">DISTRICT MAP</span>
            </div>
            <span className="text-[10px] font-mono text-[#8B8FD9]">
              {activeBuilding ? activeBuilding.toUpperCase() : 'ESTABLISHING'}
            </span>
          </div>

          {/* Quick Direct Jump Building Buttons */}
          <div className="space-y-1.5">
            {BUILDINGS.map((b) => {
              const isActive = activeBuilding === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => onSelectBuilding(b.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-[#F5A65B] text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getIcon(b.id)}
                    <span>{b.name}</span>
                  </div>
                  <span className="text-[10px] opacity-70">Jump →</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
};
