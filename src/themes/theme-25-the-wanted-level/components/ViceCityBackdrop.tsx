import React from 'react';

interface ViceCityBackdropProps {
  activeTab: string;
}

export const ViceCityBackdrop: React.FC<ViceCityBackdropProps> = ({ activeTab }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* Sky Base Gradient based on active tab */}
      <div 
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: activeTab === 'experience'
            ? 'linear-gradient(180deg, #070914 0%, #170b24 45%, #2a112c 70%, #15091e 100%)'
            : activeTab === 'contact'
            ? 'linear-gradient(180deg, #060710 0%, #180927 50%, #2b0836 80%, #0d0617 100%)'
            : 'linear-gradient(180deg, #070814 0%, #150a24 40%, #2d0b33 75%, #0e0717 100%)'
        }}
      />

      {/* Atmospheric Neon Horizon Glow (Hot Pink / Sunset Amber) */}
      <div 
        className="absolute bottom-16 sm:bottom-20 left-0 right-0 h-96 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(236,72,153,0.35) 0%, rgba(245,158,11,0.2) 35%, rgba(14,7,23,0) 70%)'
        }}
      />

      {/* Sweeping Helicopter Searchlight Beam (from Screenshot 3) */}
      <div 
        className="absolute top-0 left-1/3 w-80 h-[80vh] origin-top opacity-30 mix-blend-screen pointer-events-none animate-[searchlight_10s_ease-in-out_infinite_alternate]"
        style={{
          background: 'conic-gradient(from 170deg at 50% 0%, rgba(56,189,248,0.35) 0deg, rgba(236,72,153,0.2) 15deg, transparent 25deg)'
        }}
      />

      {/* Distant Skyscraper Skyline Silhouette (Vector SVG) */}
      <div className="absolute bottom-10 left-0 right-0 h-72 sm:h-96 opacity-35 pointer-events-none">
        <svg 
          className="w-full h-full preserve-3d" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Back layer buildings (Dark Purple/Indigo) */}
          <path 
            d="M0,320 L0,220 L30,220 L30,160 L70,160 L70,220 L110,220 L110,130 L130,110 L150,130 L150,220 L210,220 L210,180 L260,180 L260,240 L310,240 L310,150 L360,150 L360,230 L420,230 L420,100 L450,80 L480,100 L480,230 L550,230 L550,170 L610,170 L610,240 L680,240 L680,120 L730,120 L730,220 L800,220 L800,160 L850,160 L850,230 L920,230 L920,90 L950,70 L980,90 L980,230 L1060,230 L1060,150 L1120,150 L1120,220 L1200,220 L1200,140 L1260,140 L1260,240 L1340,240 L1340,170 L1400,170 L1400,230 L1440,230 L1440,320 Z" 
            fill="#090514" 
          />

          {/* Mid layer buildings with neon antenna towers */}
          <path 
            d="M20,320 L20,240 L60,240 L60,190 L90,190 L90,250 L160,250 L160,170 L190,140 L220,170 L220,260 L290,260 L290,210 L340,210 L340,270 L400,270 L400,150 L430,130 L460,150 L460,260 L520,260 L520,200 L580,200 L580,270 L660,270 L660,180 L710,180 L710,260 L780,260 L780,140 L810,110 L840,140 L840,260 L910,260 L910,190 L960,190 L960,270 L1030,270 L1030,160 L1080,160 L1080,260 L1170,260 L1170,180 L1220,180 L1220,270 L1310,270 L1310,190 L1370,190 L1370,260 L1440,260 L1440,320 Z" 
            fill="#05030d" 
          />

          {/* Glowing Windows Matrix (Cyan and Amber Dots) */}
          <g fill="#38bdf8" opacity="0.6">
            <rect x="425" y="115" width="2" height="3" />
            <rect x="435" y="115" width="2" height="3" />
            <rect x="445" y="115" width="2" height="3" />
            <rect x="425" y="130" width="2" height="3" />
            <rect x="435" y="130" width="2" height="3" />
            <rect x="445" y="130" width="2" height="3" />
            <rect x="425" y="150" width="2" height="3" />
            <rect x="445" y="150" width="2" height="3" />
            <rect x="790" y="150" width="2" height="3" />
            <rect x="800" y="150" width="2" height="3" />
            <rect x="820" y="150" width="2" height="3" />
            <rect x="790" y="170" width="2" height="3" />
            <rect x="810" y="170" width="2" height="3" />
            <rect x="820" y="170" width="2" height="3" />
            <rect x="930" y="120" width="2" height="3" />
            <rect x="940" y="120" width="2" height="3" />
            <rect x="960" y="120" width="2" height="3" />
            <rect x="930" y="140" width="2" height="3" />
            <rect x="950" y="140" width="2" height="3" />
          </g>
          
          <g fill="#f59e0b" opacity="0.5">
            <rect x="120" y="145" width="2" height="3" />
            <rect x="135" y="145" width="2" height="3" />
            <rect x="120" y="165" width="2" height="3" />
            <rect x="140" y="165" width="2" height="3" />
            <rect x="690" y="140" width="2" height="3" />
            <rect x="705" y="140" width="2" height="3" />
            <rect x="690" y="160" width="2" height="3" />
            <rect x="715" y="160" width="2" height="3" />
            <rect x="1040" y="180" width="2" height="3" />
            <rect x="1055" y="180" width="2" height="3" />
          </g>

          {/* Red Antenna Warning Lights flashing */}
          <circle cx="450" cy="78" r="2" fill="#ef4444" className="animate-ping" />
          <circle cx="810" cy="108" r="2" fill="#ef4444" className="animate-ping" />
          <circle cx="950" cy="68" r="2" fill="#ef4444" className="animate-ping" />
        </svg>
      </div>

      {/* Silhouetted Palm Tree Fronds on Left & Right Margins (Classic Vice City Framing) */}
      <div className="absolute top-16 -left-6 sm:left-0 w-44 sm:w-64 h-80 opacity-20 pointer-events-none transform -rotate-12">
        <svg viewBox="0 0 200 300" fill="#020108">
          <path d="M0,0 Q60,40 120,60 Q80,80 0,70 Z" />
          <path d="M0,20 Q80,70 160,110 Q100,120 0,90 Z" />
          <path d="M0,40 Q90,110 180,170 Q110,160 0,110 Z" />
          <path d="M0,70 Q70,140 140,220 Q80,180 0,130 Z" />
          <path d="M0,100 Q50,170 100,260 Q50,200 0,150 Z" />
          {/* Trunk curve */}
          <path d="M0,0 Q30,120 15,300 L0,300 Z" />
        </svg>
      </div>

      <div className="absolute bottom-12 -right-6 sm:right-0 w-48 sm:w-72 h-96 opacity-25 pointer-events-none transform rotate-6">
        <svg viewBox="0 0 200 300" fill="#020108">
          <path d="M200,0 Q140,40 80,60 Q120,80 200,70 Z" />
          <path d="M200,20 Q120,70 40,110 Q100,120 200,90 Z" />
          <path d="M200,40 Q110,110 20,170 Q90,160 200,110 Z" />
          <path d="M200,70 Q130,140 60,220 Q120,180 200,130 Z" />
          <path d="M200,100 Q150,170 100,260 Q150,200 200,150 Z" />
          {/* Trunk curve */}
          <path d="M200,0 Q170,120 185,300 L200,300 Z" />
        </svg>
      </div>

      {/* Subtle Neon Particles / Floating Bokeh Embers */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
        <div className="absolute top-1/2 left-2/3 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_10px_#ec4899] animate-pulse" />
      </div>

      {/* Gritty Cinematic Vignette Overlay */}
      <div 
        className="absolute inset-0 opacity-50 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 35%, rgba(2,1,6,0.92) 100%)'
        }}
      />

      {/* Retro CRT Scanlines Overlay */}
      <div 
        className="absolute inset-0 opacity-12 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)'
        }}
      />

    </div>
  );
};
