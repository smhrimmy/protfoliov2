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
        return <User className="w-4 h-4" />;
      case 'gallery':
        return <FolderKanban className="w-4 h-4" />;
      case 'office':
        return <Building2 className="w-4 h-4" />;
      case 'archive':
        return <Library className="w-4 h-4" />;
      case 'signal':
        return <Radio className="w-4 h-4" />;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6">
      {/* Top Wayfinding HUD Bar */}
      <div className="flex items-center justify-between w-full">
        {/* District Identity Badge */}
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-xl district-glass border border-[#ffb703]/30 shadow-lg">
          <div className="w-3 h-3 rounded-full bg-[#ffb703] animate-pulse" />
          <div>
            <h1 className="district-heading text-sm sm:text-base font-bold text-white tracking-wide">
              {identityName}'s District
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">
              THE DISTRICT METAPHOR • 3D ISOMETRIC CITY
            </p>
          </div>
        </div>

        {/* Radar Minimap Compass */}
        <div className="pointer-events-auto hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl district-glass border border-[#ffb703]/30 shadow-lg">
          <div className="relative w-8 h-8 rounded-full border border-[#ffb703]/40 flex items-center justify-center bg-slate-950/80">
            <Compass className="w-5 h-5 text-[#ffb703] animate-radar" />
          </div>
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-white">N 45° E 12°</div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">
              {activeBuilding ? `ROOM: ${activeBuilding}` : 'ESTABLISHING SHOT'}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom District Navigation Dock */}
      <div className="pointer-events-auto mx-auto max-w-2xl w-full">
        <div className="p-2 rounded-2xl district-glass border border-[#ffb703]/40 shadow-2xl flex items-center justify-between gap-1 sm:gap-2">
          
          {/* Reset Camera Button */}
          <button
            onClick={() => onSelectBuilding(null)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
              activeBuilding === null
                ? 'bg-[#ffb703] text-slate-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800/80'
            }`}
            title="Reset to wide establishing shot"
          >
            <ZoomOut className="w-4 h-4" />
            <span className="hidden sm:inline">Wide Shot</span>
          </button>

          <div className="h-6 w-px bg-slate-800" />

          {/* Building Selector Buttons */}
          <div className="flex items-center gap-1 flex-1 justify-around">
            {BUILDINGS.map((b) => {
              const isActive = activeBuilding === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => onSelectBuilding(b.id)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-medium font-mono transition-all ${
                    isActive
                      ? 'bg-[#ffb703]/20 border border-[#ffb703] text-[#ffb703] shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  {getIcon(b.id)}
                  <span className="hidden md:inline">{b.name}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
