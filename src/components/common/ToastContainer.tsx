import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  durationMs?: number;
}

type ToastListener = (toast: ToastMessage) => void;
const listeners: Set<ToastListener> = new Set();

export const toast = {
  show: (msg: Omit<ToastMessage, 'id'>) => {
    const fullToast: ToastMessage = {
      ...msg,
      id: Math.random().toString(36).substring(2, 9)
    };
    listeners.forEach((l) => l(fullToast));
  },
  success: (message: string, title: string = 'Success') => {
    toast.show({ type: 'success', title, message });
  },
  error: (message: string, title: string = 'Error Encountered') => {
    toast.show({ type: 'error', title, message });
  },
  warning: (message: string, title: string = 'Warning') => {
    toast.show({ type: 'warning', title, message });
  },
  info: (message: string, title: string = 'Information') => {
    toast.show({ type: 'info', title, message });
  }
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleAdd = (newToast: ToastMessage) => {
      setToasts((prev) => [...prev, newToast]);

      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.durationMs || 4000);

      return () => clearTimeout(timer);
    };

    listeners.add(handleAdd);
    return () => {
      listeners.delete(handleAdd);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        let borderClass = 'border-slate-700 bg-slate-900/95 text-slate-100';
        let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

        if (t.type === 'success') {
          borderClass = 'border-emerald-500/40 bg-[#0c1a14]/95 text-emerald-100';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        } else if (t.type === 'error') {
          borderClass = 'border-red-500/40 bg-[#1c0d11]/95 text-red-100';
          icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
        } else if (t.type === 'warning') {
          borderClass = 'border-amber-500/40 bg-[#1f170b]/95 text-amber-100';
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
        }

        return (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl border ${borderClass} shadow-2xl backdrop-blur-md flex items-start justify-between gap-3 animate-in slide-in-from-top-2 duration-200`}
          >
            <div className="flex items-start gap-3">
              {icon}
              <div className="space-y-0.5">
                {t.title && (
                  <h4 className="text-xs font-bold font-sans tracking-wide">
                    {t.title}
                  </h4>
                )}
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {t.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-100 p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
