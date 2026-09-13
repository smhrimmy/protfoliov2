import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PortfolioIdentity } from '@/types/portfolio';
import { CyberModeTokens } from '../types/cyberdeck';

interface HolographicDossierViewProps {
  identity: PortfolioIdentity;
  tokens: CyberModeTokens;
  onExploreProjects: () => void;
}

export const HolographicDossierView: React.FC<HolographicDossierViewProps> = ({
  identity,
  tokens,
  onExploreProjects
}) => {
  return (
    <div className="space-y-6 font-mono text-gray-200 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <span 
            className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border"
            style={{
              backgroundColor: `${tokens.primaryColor}20`,
              borderColor: tokens.primaryColor,
              color: tokens.primaryColor
            }}
          >
            CLASSIFIED DOSSIER // OPERATIVE #0076
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans tracking-tight pt-1">
            {identity.name}
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-xl border border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-400 font-bold uppercase">CLEARANCE: LEVEL 5</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Avatar & Telemetry Card */}
        <div 
          className="lg:col-span-5 border rounded-2xl p-6 space-y-4 backdrop-blur-xl shadow-2xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.hudBorderColor,
            boxShadow: `0 0 25px ${tokens.accentGlow}`
          }}
        >
          <div className="h-60 rounded-xl bg-black/80 border border-white/15 overflow-hidden relative flex items-center justify-center">
            <img
              src={identity.avatarUrl}
              alt={identity.name}
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-[10px] text-cyan-300 font-mono">
              LOCATION: BENGALURU, INDIA // IST (+5:30)
            </div>
          </div>

          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            {identity.bio}
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-gray-400">PRIMARY ROLE:</span>
            <span className="font-bold" style={{ color: tokens.primaryColor }}>
              FULLSTACK SYSTEMS ARCHITECT
            </span>
          </div>
        </div>

        {/* Operational Capabilities */}
        <div 
          className="lg:col-span-7 border rounded-2xl p-6 space-y-5 backdrop-blur-xl shadow-2xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.hudBorderColor
          }}
        >
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-xl font-black text-white uppercase font-sans tracking-wide">
              OPERATIONAL CAPABILITIES &amp; WEAPONRY
            </h3>
            <p className="text-xs text-gray-400 pt-0.5">
              Verified engineering background in distributed web services, streaming client interfaces, and high-concurrency systems.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">FRONTEND ARCHITECTURE</span>
              <p className="text-sm font-black text-white font-sans">TYPESCRIPT / REACT 19 / NEXT.JS / TAILWINDCSS</p>
              <p className="text-xs text-gray-400 font-sans">Strict mode static type checking, server component streaming, and custom motion engines.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">BACKEND &amp; CLOUD INFRASTRUCTURE</span>
              <p className="text-sm font-black text-white font-sans">NODE.JS / POSTGRESQL / DOCKER / REDIS / AWS</p>
              <p className="text-xs text-gray-400 font-sans">High-performance REST API pipelines, containerized deployments, and relational schemas.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">SPATIAL &amp; AI CAPABILITIES</span>
              <p className="text-sm font-black text-white font-sans">THREE.JS / WEBGL / LLM INTEGRATION / AGENTIC SDK</p>
              <p className="text-xs text-gray-400 font-sans">Interactive 3D canvas rendering, shader effects, and generative AI function workflows.</p>
            </div>
          </div>

          <button
            onClick={onExploreProjects}
            className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider text-black shadow-xl transition-all hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: tokens.primaryColor,
              boxShadow: `0 0 20px ${tokens.accentGlow}`
            }}
          >
            EXPLORE PRODUCTION SYSTEMS (PROJECTS) &rarr;
          </button>
        </div>

      </div>

    </div>
  );
};
