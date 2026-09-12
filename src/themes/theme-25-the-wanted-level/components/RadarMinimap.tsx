import React, { useState } from 'react';
import { Compass, ZoomIn, ZoomOut, Crosshair } from 'lucide-react';

interface RadarMinimapProps {
  activeSection: string;
  onWaypointClick?: (section: string) => void;
}

export const RadarMinimap: React.FC<RadarMinimapProps> = ({ activeSection, onWaypointClick }) => {
  const [zoomLevel, setZoomLevel] = useState<1 | 2>(1);

  const waypoints = [
    { id: 'dossier', label: 'HQ', x: 50, y: 50, color: '#f59e0b' },
    { id: 'heists', label: 'JOB', x: 28, y: 32, color: '#38bdf8' },
    { id: 'arsenal', label: 'GUN', x: 74, y: 25, color: '#ec4899' },
    { id: 'intel', label: 'LOG', x: 80, y: 68, color: '#10b981' },
    { id: 'crew', label: 'REP', x: 30, y: 72, color: '#a855f7' },
    { id: 'dispatch', label: 'COM', x: 58, y: 82, color: '#eab308' },
  ];

  return (
    <div className="flex flex-col items-start gap-1 font-mono select-none">
      {/* Sector Callout Banner */}
      <div className="bg-black/90 border-l-2 border-[#f59e0b] px-2.5 py-1 text-[10px] text-gray-200 tracking-wider flex items-center gap-2 backdrop-blur-md shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[#f59e0b] font-bold">BENGALURU SECTOR</span>
        <span className="text-gray-500 text-[9px]">12.9716° N / 77.5946° E</span>
      </div>

      {/* Radar Map Plate */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-[#0a0d14]/95 border-2 border-white/20 rounded-full overflow-hidden shadow-2xl backdrop-blur-md group">
        {/* Subtle Map Grid / Streets Silhouette */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Concentric distance rings */}
            <circle cx="50" cy="50" r="20" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="#ffffff" strokeWidth="0.75" />
            {/* Crosshairs */}
            <line x1="50" y1="2" x2="50" y2="98" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            {/* Street grid lines */}
            <path d="M10,25 L90,25 M15,70 L85,70 M25,10 L25,90 M70,15 L70,85 M35,35 L65,65 M35,65 L65,35" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.7" fill="none" />
          </svg>
        </div>

        {/* 360-degree rotating radar scan beam */}
        <div className="absolute inset-0 pointer-events-none origin-center animate-[spin_4s_linear_infinite]">
          <div 
            className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left"
            style={{
              background: 'conic-gradient(from 0deg, rgba(56, 189, 248, 0.4) 0deg, rgba(56, 189, 248, 0) 60deg)'
            }}
          />
        </div>

        {/* North Indicator */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/80 bg-black/60 px-1 rounded">
          N
        </div>

        {/* Interactive Waypoints */}
        {waypoints.map(wp => {
          const isActive = wp.id === activeSection;
          return (
            <button
              key={wp.id}
              onClick={() => onWaypointClick && onWaypointClick(wp.id)}
              style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
              title={`Waypoint: ${wp.label}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-150 focus:outline-none"
            >
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <span 
                    className="absolute w-4 h-4 rounded-full animate-ping"
                    style={{ backgroundColor: wp.color, opacity: 0.6 }}
                  />
                )}
                <div 
                  className={`w-2.5 h-2.5 rounded-full border border-black shadow-md ${isActive ? 'ring-2 ring-white scale-125' : 'opacity-80'}`}
                  style={{ backgroundColor: wp.color }}
                />
              </div>
            </button>
          );
        })}

        {/* Player Blip in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
        </div>

        {/* Quick Zoom Switcher */}
        <button
          onClick={() => setZoomLevel(zoomLevel === 1 ? 2 : 1)}
          className="absolute bottom-1 right-1 p-1 rounded-full bg-black/70 hover:bg-black text-white/70 hover:text-white transition-colors z-20"
          title="Toggle GPS Zoom"
        >
          {zoomLevel === 1 ? <ZoomIn className="w-3 h-3" /> : <ZoomOut className="w-3 h-3" />}
        </button>
      </div>

      {/* GPS Status Footer */}
      <div className="flex items-center justify-between w-36 sm:w-44 px-1 text-[9px] text-gray-400">
        <span className="text-emerald-400 font-bold">GPS: LOCKED</span>
        <span className="text-gray-500">ZOOM x{zoomLevel}.0</span>
      </div>
    </div>
  );
};
