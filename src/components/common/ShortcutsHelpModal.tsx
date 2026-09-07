import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsHelpModal: React.FC<ShortcutsHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Cmd/Ctrl + K', description: 'Open Global Command Palette' },
    { key: '/', description: 'Open Content Search Modal' },
    { key: '?', description: 'Open Keyboard Shortcuts Help' },
    { key: 'Escape', description: 'Close active modal / drawer' },
    { key: 'Cmd/Ctrl + S', description: 'Trigger Manual Force Save' },
    { key: 'Cmd/Ctrl + P', description: 'Preview Active Public Theme' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-semibold text-white">Keyboard Shortcuts</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
              <span className="text-gray-300">{s.description}</span>
              <kbd className="px-2 py-1 rounded bg-white/10 text-blue-300 font-mono text-xs">{s.key}</kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
