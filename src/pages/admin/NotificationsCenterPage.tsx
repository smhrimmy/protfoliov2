import React, { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { NotificationItem } from '@/types/cms';

export const NotificationsCenterPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockStorage.getNotifications());
  const [filter, setFilter] = useState<'all' | 'unread' | 'automations' | 'system'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = (id: string) => {
    mockStorage.markNotificationRead(id);
    setNotifications(mockStorage.getNotifications());
  };

  const handleMarkAllRead = () => {
    mockStorage.markAllNotificationsRead();
    setNotifications(mockStorage.getNotifications());
  };

  const handleClearAll = () => {
    if (confirm('Clear all notifications?')) {
      mockStorage.clearNotifications();
      setNotifications([]);
    }
  };

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'automations') return n.title.toLowerCase().includes('linkedin') || n.title.toLowerCase().includes('pipeline') || n.title.toLowerCase().includes('github');
    if (filter === 'system') return n.title.toLowerCase().includes('system') || n.title.toLowerCase().includes('published') || n.title.toLowerCase().includes('health');
    return true;
  });

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 text-[#222222] font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
            EVENT STREAM · AUDIT LOGS
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#ad314d]" />
            <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Notification Center</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-[#ad314d] text-white font-mono text-xs rounded-full font-bold">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-[#55555e] mt-1">Real-time alerts, automation logs, testimonial submissions, and site health notices.</p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-3.5 py-1.5 bg-white hover:bg-gray-50 text-[#1a1a1a] border border-black/10 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3.5 py-1.5 bg-white hover:bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-black/8 pb-2 text-xs font-medium overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full transition-colors ${filter === 'all' ? 'bg-black/10 text-[#1a1a1a] font-bold' : 'text-[#666670] hover:text-[#1a1a1a]'}`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-full transition-colors ${filter === 'unread' ? 'bg-[#ad314d]/15 text-[#ad314d] font-bold' : 'text-[#666670] hover:text-[#1a1a1a]'}`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('automations')}
          className={`px-3 py-1.5 rounded-full transition-colors ${filter === 'automations' ? 'bg-black/10 text-[#1a1a1a] font-bold' : 'text-[#666670] hover:text-[#1a1a1a]'}`}
        >
          Automations
        </button>
        <button
          onClick={() => setFilter('system')}
          className={`px-3 py-1.5 rounded-full transition-colors ${filter === 'system' ? 'bg-black/10 text-[#1a1a1a] font-bold' : 'text-[#666670] hover:text-[#1a1a1a]'}`}
        >
          System & Health
        </button>
      </div>

      {/* Notification Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/80 border border-black/8 space-y-2">
            <Bell className="w-8 h-8 text-[#888890] mx-auto" />
            <p className="text-sm text-[#1a1a1a] font-semibold">No notifications in this filter</p>
            <p className="text-xs text-[#666670]">You're all caught up with your portfolio events.</p>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                item.read
                  ? 'bg-white/50 border-black/5 text-[#71717a]'
                  : 'bg-white/90 border-[#ad314d]/30 text-[#1a1a1a] shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  {item.type === 'error' && <XCircle className="w-4 h-4 text-red-600" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-[#ad314d]" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xs font-bold ${item.read ? 'text-[#55555e]' : 'text-[#1a1a1a]'}`}>
                      {item.title}
                    </h3>
                    {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-[#ad314d]" />}
                  </div>
                  <p className={`text-xs leading-relaxed ${item.read ? 'text-[#71717a]' : 'text-[#44444c]'}`}>{item.message}</p>
                  <p className="text-[10px] font-mono text-[#888890]">{item.timestamp}</p>
                </div>
              </div>

              {!item.read && (
                <button
                  onClick={() => handleMarkRead(item.id)}
                  className="p-1.5 text-[#666670] hover:text-[#ad314d] hover:bg-black/5 rounded-lg transition-colors shrink-0"
                  title="Mark as read"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
