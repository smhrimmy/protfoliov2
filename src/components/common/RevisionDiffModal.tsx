import React from 'react';
import { X, History, RotateCcw } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { ContentRevision } from '@/types/cms';

interface RevisionDiffModalProps {
  revision: ContentRevision | null;
  onClose: () => void;
  onRestore: (revision: ContentRevision) => void;
}

export const RevisionDiffModal: React.FC<RevisionDiffModalProps> = ({ revision, onClose, onRestore }) => {
  return (
    <Dialog.Root open={Boolean(revision)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#111827] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl p-6 text-white flex flex-col max-h-[85vh] focus:outline-none animate-in zoom-in-95 duration-200">
          {revision && (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-400" />
                  <div>
                    <Dialog.Title className="text-base font-semibold text-white">Revision Diff View</Dialog.Title>
                    <Dialog.Description className="text-xs text-gray-400 font-mono">{revision.summary} · {new Date(revision.timestamp).toLocaleString()}</Dialog.Description>
                  </div>
                </div>
                <Dialog.Close asChild>
                  <button className="text-gray-400 hover:text-white p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
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
                  <Dialog.Close asChild>
                    <button
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Close
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={() => {
                      onRestore(revision);
                      onClose();
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Restore This Revision
                  </button>
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
