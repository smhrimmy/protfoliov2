import React from 'react';
import { X, History, RotateCcw } from 'lucide-react';
import { ContentRevision } from '@/types/cms';

interface RevisionDiffModalProps {
  revision: ContentRevision | null;
  onClose: () => void;
  onRestore: (revision: ContentRevision) => void;
}

export const RevisionDiffModal: React.FC<RevisionDiffModalProps> = ({ revision, onClose, onRestore }) => {
  if (!revision) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl p-6 text-white flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-semibold text-white">Revision Diff View</h3>
              <p className="text-xs text-gray-400 font-mono">{revision.summary} · {new Date(revision.timestamp).toLocaleString()}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diff lines */}
        <div className="flex-1 overflow-y-auto bg-[#0b0e14] border border-white/5 rounded-xl p-4 font-mono text-xs space-y-0.5">
          {revision.diffLines.map((line, idx) => (
            <div
              key={idx}
              className={`px-2 py-0.5 rounded flex items-start gap-2 ${
                line.type === 'add'
                  ? 'bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500'
                  : line.type === 'del'
                  ? 'bg-red-500/15 text-red-300 border-l-2 border-red-500 line-through opacity-75'
                  : 'text-gray-400'
              }`}
            >
              <span className="select-none text-gray-500 w-4 shrink-0">
                {line.type === 'add' ? '+' : line.type === 'del' ? '-' : ' '}
              </span>
              <span className="break-all whitespace-pre-wrap">{line.text}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-mono">Author: {revision.author}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-medium"
            >
              Close
            </button>
            <button
              onClick={() => {
                onRestore(revision);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restore This Revision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
