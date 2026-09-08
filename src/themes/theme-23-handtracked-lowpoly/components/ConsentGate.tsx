import React from 'react';
import { Camera, ShieldCheck, X, AlertCircle } from 'lucide-react';

interface ConsentGateProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  error?: string | null;
}

export const ConsentGate: React.FC<ConsentGateProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  error 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12131c] border border-[#7952ff]/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-[#7952ff]/20 space-y-6 animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#7952ff]/10 border border-[#7952ff]/30 flex items-center justify-center text-[#9b7aff]">
            <Camera className="w-6 h-6" />
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Enable Hand Tracking Control?
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            You can interact with the low-poly 3D face mesh using hand gestures in front of your camera.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-black/50 border border-white/[0.08] space-y-2 font-mono text-[11px] text-gray-300">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Client-Side Privacy Guarantee</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            All video processing executes strictly inside your local browser tab. No video frames, audio, or biometric data are ever recorded, stored, or sent to any server.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-[#7952ff] hover:bg-[#683fee] text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-[#7952ff]/30 transition-colors uppercase tracking-wider text-center"
          >
            Grant Camera Access
          </button>
          <button
            onClick={onCancel}
            className="py-3 px-4 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.05] font-mono text-xs transition-colors"
          >
            Cancel (Use Mouse)
          </button>
        </div>

      </div>
    </div>
  );
};
