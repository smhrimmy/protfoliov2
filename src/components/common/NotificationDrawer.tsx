import React from 'react';
import { X, Check, Bell, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const notifications = mockStorage.getNotifications();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#111827] border-l border-white/10 h-full p-6 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Notifications</h3>
            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => mockStorage.markAllNotificationsRead()}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Mark read
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-12">No notifications right now.</div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  mockStorage.markNotificationRead(n.id);
                  if (n.link) {
                    onNavigate(n.link);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  n.read ? 'bg-white/2 border-white/5 opacity-70' : 'bg-white/5 border-blue-500/30'
                } hover:bg-white/10`}
              >
                <div className="flex items-start gap-3">
                  {n.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  ) : n.type === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-2">{n.timestamp}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
