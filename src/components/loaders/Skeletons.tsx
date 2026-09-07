import React from 'react';

export const DashboardSkeleton: React.FC = () => (
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
);

export const ListCRUDSkeleton: React.FC = () => (
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
);
