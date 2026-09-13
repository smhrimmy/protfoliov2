import React from 'react';
import { FolderOpen, Plus, Sparkles, RefreshCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  description = 'There are no active records in this catalog section. Add new entries via the Admin OS or clear your active search filter.',
  icon: Icon = FolderOpen,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}) => {
  return (
    <div className="w-full p-8 sm:p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center flex flex-col items-center justify-center space-y-4 my-6">
      
      {/* Icon Badge */}
      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-[#ffb703] shadow-md">
        <Icon className="w-8 h-8" />
      </div>

      {/* Message */}
      <div className="max-w-md space-y-1.5">
        <h3 className="text-lg font-bold text-slate-100 font-sans tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      {(onAction || onSecondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ffb703] text-slate-950 font-bold text-xs hover:bg-[#ffc83b] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb703] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              {actionLabel}
            </button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
