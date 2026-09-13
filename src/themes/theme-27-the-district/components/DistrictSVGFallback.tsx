import React from 'react';
import { BuildingId, BUILDINGS } from './DistrictCanvas3D';
import { Building2, FolderKanban, Library, Radio, User } from 'lucide-react';

interface DistrictSVGFallbackProps {
  activeBuilding: BuildingId | null;
  onSelectBuilding: (id: BuildingId) => void;
}

export const DistrictSVGFallback: React.FC<DistrictSVGFallbackProps> = ({
  onSelectBuilding
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0E1330] p-4 overflow-hidden">
      
      {/* Fallback Header Notice */}
      <div className="absolute top-6 left-6 z-20 district-glass px-4 py-2 rounded-xl border border-[#F5A65B]/30">
        <span className="text-xs font-mono text-[#F5A65B]">
          STATIC ISOMETRIC FALLBACK VIEW ACTIVE
        </span>
      </div>

      {/* SVG Isometric District Illustration */}
      <div className="w-full max-w-4xl aspect-[4/3] relative">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full drop-shadow-2xl select-none"
        >
          {/* Isometric Ground Grid */}
          <polygon
            points="400,100 750,300 400,500 50,300"
            fill="#141A3D"
            stroke="#222C54"
            strokeWidth="2"
          />
          <line x1="400" y1="100" x2="400" y2="500" stroke="#F5A65B" strokeOpacity="0.25" strokeWidth="1" />
          <line x1="50" y1="300" x2="750" y2="300" stroke="#F5A65B" strokeOpacity="0.25" strokeWidth="1" />

          {/* 1. THE STUDIO (Top Left) */}
          <g
            onClick={() => onSelectBuilding('studio')}
            className="cursor-pointer group transition-transform duration-300 hover:-translate-y-2"
          >
            <polygon points="200,200 280,240 280,310 200,270" fill="#242D54" stroke="#F5A65B" strokeWidth="1.5" />
            <polygon points="200,200 280,240 360,200 280,160" fill="#323E70" />
            <polygon points="280,240 360,200 360,270 280,310" fill="#1C2344" />
            {/* Storefront Warm Window Glow */}
            <polygon points="220,240 260,260 260,290 220,270" fill="#F5A65B" className="group-hover:opacity-100 opacity-80" />
            <text x="240" y="150" fill="#F5A65B" fontSize="13" fontFamily="Bricolage Grotesque" fontWeight="bold" textAnchor="middle">
              The Studio (Bio)
            </text>
          </g>

          {/* 2. THE GALLERY (Top Right) */}
          <g
            onClick={() => onSelectBuilding('gallery')}
            className="cursor-pointer group transition-transform duration-300 hover:-translate-y-2"
          >
            <polygon points="520,180 600,220 600,320 520,280" fill="#1C2548" stroke="#3B82F6" strokeWidth="1.5" />
            <polygon points="520,180 600,220 680,180 600,140" fill="#293668" />
            <polygon points="600,220 680,180 680,280 600,320" fill="#131B38" />
            {/* Glass Front Panel */}
            <polygon points="540,210 580,230 580,300 540,280" fill="#3B82F6" fillOpacity="0.7" />
            <text x="600" y="130" fill="#3B82F6" fontSize="13" fontFamily="Bricolage Grotesque" fontWeight="bold" textAnchor="middle">
              The Gallery (Projects)
            </text>
          </g>

          {/* 3. THE ARCHIVE (Bottom Left) */}
          <g
            onClick={() => onSelectBuilding('archive')}
            className="cursor-pointer group transition-transform duration-300 hover:-translate-y-2"
          >
            <polygon points="160,340 230,375 230,480 160,445" fill="#32224A" stroke="#8B8FD9" strokeWidth="1.5" />
            <polygon points="160,340 230,375 300,340 230,305" fill="#463166" />
            <polygon points="230,375 300,340 300,445 230,480" fill="#221634" />
            {/* Stacked windows */}
            <rect x="180" y="380" width="15" height="15" fill="#8B8FD9" rx="2" />
            <rect x="180" y="410" width="15" height="15" fill="#8B8FD9" rx="2" />
            <text x="230" y="295" fill="#8B8FD9" fontSize="13" fontFamily="Bricolage Grotesque" fontWeight="bold" textAnchor="middle">
              The Archive (Journal)
            </text>
          </g>

          {/* 4. THE OFFICE TOWER (Center Skyscraper) */}
          <g
            onClick={() => onSelectBuilding('office')}
            className="cursor-pointer group transition-transform duration-300 hover:-translate-y-2"
          >
            <polygon points="360,160 440,200 440,420 360,380" fill="#1B2342" stroke="#F5A65B" strokeWidth="2" />
            <polygon points="360,160 440,200 520,160 440,120" fill="#2B3763" />
            <polygon points="440,200 520,160 520,380 440,420" fill="#121830" />
            {/* Lit Tower Windows */}
            <rect x="380" y="220" width="12" height="12" fill="#F5A65B" rx="1" />
            <rect x="405" y="220" width="12" height="12" fill="#F5A65B" rx="1" />
            <rect x="380" y="260" width="12" height="12" fill="#F5A65B" rx="1" />
            <rect x="405" y="260" width="12" height="12" fill="#F5A65B" rx="1" />
            <rect x="380" y="300" width="12" height="12" fill="#F5A65B" rx="1" />
            <rect x="405" y="300" width="12" height="12" fill="#F5A65B" rx="1" />
            <text x="440" y="105" fill="#F5A65B" fontSize="14" fontFamily="Bricolage Grotesque" fontWeight="bold" textAnchor="middle">
              The Office Tower (Career)
            </text>
          </g>

          {/* 5. THE SIGNAL TOWER (Bottom Right) */}
          <g
            onClick={() => onSelectBuilding('signal')}
            className="cursor-pointer group transition-transform duration-300 hover:-translate-y-2"
          >
            <polygon points="540,360 610,395 610,460 540,425" fill="#451A24" stroke="#EF4444" strokeWidth="1.5" />
            <polygon points="540,360 610,395 680,360 610,325" fill="#5E2532" />
            <polygon points="610,395 680,360 680,425 610,460" fill="#301118" />
            {/* Thin Spire Antenna */}
            <line x1="610" y1="325" x2="610" y2="210" stroke="#8B8FD9" strokeWidth="4" />
            {/* Blinking Signal Beacon */}
            <circle cx="610" cy="205" r="8" fill="#EF4444" className="animate-pulse" />
            <text x="610" y="190" fill="#EF4444" fontSize="13" fontFamily="Bricolage Grotesque" fontWeight="bold" textAnchor="middle">
              The Signal Tower (Contact)
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
