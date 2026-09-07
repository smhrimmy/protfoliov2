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
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Notification Center</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-600 text-white font-mono text-xs rounded-full font-bold">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">Real-time alerts, automation logs, testimonial submissions, and site health notices.</p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5 text-blue-400" /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'all' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'unread' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('automations')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'automations' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          Automations
        </button>
        <button
          onClick={() => setFilter('system')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'system' ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
        >
          System & Health
        </button>
      </div>

      {/* Notification Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0e131f] border border-white/5 space-y-2">
            <Bell className="w-8 h-8 text-gray-600 mx-auto" />
            <p className="text-sm text-gray-300 font-semibold">No notifications in this filter</p>
            <p className="text-xs text-gray-500">You're all caught up with your portfolio events.</p>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                item.read
                  ? 'bg-[#0e131f]/60 border-white/5 text-gray-400'
                  : 'bg-[#0e131f] border-blue-500/30 text-gray-200 shadow-lg shadow-blue-500/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  {item.type === 'error' && <XCircle className="w-4 h-4 text-red-400" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xs font-bold ${item.read ? 'text-gray-300' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.message}</p>
                  <p className="text-[10px] font-mono text-gray-500">{item.timestamp}</p>
                </div>
              </div>

              {!item.read && (
                <button
                  onClick={() => handleMarkRead(item.id)}
                  className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors shrink-0"
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
