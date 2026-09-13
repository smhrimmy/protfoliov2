import React from 'react';
import { X, Keyboard } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface ShortcutsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsHelpModal: React.FC<ShortcutsHelpModalProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: 'Cmd/Ctrl + K', description: 'Open Global Command Palette' },
    { key: '/', description: 'Open Content Search Modal' },
    { key: '?', description: 'Open Keyboard Shortcuts Help' },
    { key: 'Escape', description: 'Close active modal / drawer' },
    { key: 'Cmd/Ctrl + S', description: 'Trigger Manual Force Save' },
    { key: 'Cmd/Ctrl + P', description: 'Preview Active Public Theme' }
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#111827] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6 text-white focus:outline-none animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-blue-400" />
              <Dialog.Title className="text-base font-semibold text-white">Keyboard Shortcuts</Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-white p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Keyboard shortcuts available across Portfolio OS</Dialog.Description>

          <div className="space-y-3">
            {shortcuts.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-gray-300">{s.description}</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-blue-300 font-mono text-xs">{s.key}</kbd>
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
