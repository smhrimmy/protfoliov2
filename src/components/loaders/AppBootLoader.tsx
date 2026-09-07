import React, { useEffect, useState } from 'react';

interface AppBootLoaderProps {
  onComplete: () => void;
  minDisplayMs?: number;
}

const BOOT_LINES = [
  'Initializing PDL Portfolio OS kernel...',
  'Resolving design tokens & font pairings...',
  'Mounting 19 isolated theme sandboxes...',
  'Syncing local storage state...',
  'Preparing creative operating workspace...'
];

export const AppBootLoader: React.FC<AppBootLoaderProps> = ({ onComplete, minDisplayMs = 700 }) => {
  const [progress, setProgress] = useState(15);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 98;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 120);

    const lineInterval = setInterval(() => {
      setLineIndex(prev => (prev + 1) % BOOT_LINES.length);
    }, 180);

    const checkDone = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayMs - elapsed);
      setTimeout(() => {
        setProgress(100);
        setTimeout(onComplete, 180);
      }, remaining);
    }, minDisplayMs);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearTimeout(checkDone);
    };
  }, [onComplete, minDisplayMs]);

  return (
    <div className="fixed inset-0 z-50 bg-[#080b11] text-white flex flex-col items-center justify-center p-6 select-none font-sans">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Monogram / Wordmark */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-white/10">
            <span className="font-mono text-xl font-bold tracking-tighter text-white">PDL</span>
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-xl -z-10 animate-pulse-slow"></div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-lg font-bold tracking-tight text-white mb-1">PDL PORTFOLIO OS</h1>
          <p className="text-xs font-mono text-blue-400/80 tracking-widest uppercase">v2.0 · Creative Systems Engine</p>
        </div>

        {/* Thin progress bar */}
        <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden mb-3 border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Rotating status line */}
        <div className="h-5 flex items-center justify-between w-full text-[11px] font-mono text-gray-400">
          <span className="truncate pr-2">{BOOT_LINES[lineIndex]}</span>
          <span className="text-gray-500 shrink-0">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
