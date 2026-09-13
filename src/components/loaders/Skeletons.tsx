import React, { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface SkeletonTimeoutProps {
  children: React.ReactNode;
  timeoutMs?: number;
  onRetry?: () => void;
}

export const SkeletonWithTimeout: React.FC<SkeletonTimeoutProps> = ({
  children,
  timeoutMs = 5000,
  onRetry = () => window.location.reload()
}) => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [timeoutMs]);

  if (timedOut) {
    return (
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3 max-w-xl mx-auto my-6 text-amber-200">
        <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold text-amber-400">
          <AlertCircle className="w-4 h-4" />
          <span>NETWORK FETCH TIMEOUT EXCEEDED</span>
        </div>
        <p className="text-xs text-slate-300">
          The requested data stream took longer than expected to resolve. Check your connection or retry.
        </p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs inline-flex items-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Data Stream</span>
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export const DashboardSkeleton: React.FC = () => (
  <SkeletonWithTimeout>
    <div className="p-6 space-y-6 animate-pulse max-w-7xl mx-auto">
      <div className="h-8 bg-white/5 rounded-lg w-1/4 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-white/5 rounded-xl border border-white/5" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-72 bg-white/5 rounded-xl border border-white/5" />
        <div className="h-72 bg-white/5 rounded-xl border border-white/5" />
      </div>
    </div>
  </SkeletonWithTimeout>
);

export const ListCRUDSkeleton: React.FC = () => (
  <SkeletonWithTimeout>
    <div className="p-6 space-y-4 animate-pulse max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 bg-white/5 rounded w-1/5" />
        <div className="h-9 bg-white/10 rounded w-28" />
      </div>
      <div className="h-12 bg-white/5 rounded-xl border border-white/5" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-16 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 justify-between" />
        ))}
      </div>
    </div>
  </SkeletonWithTimeout>
);
