import React from 'react';
import { CheckCircle2, Award, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'achievement' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-lg border backdrop-blur-md flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${
            toast.type === 'achievement'
              ? 'bg-amber-50/95 border-amber-200 text-amber-900'
              : toast.type === 'success'
              ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900'
              : 'bg-white/95 border-slate-200 text-slate-900'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'achievement' ? (
              <Award className="w-5 h-5 text-amber-600 animate-bounce" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <Info className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold leading-snug">{toast.title}</h4>
            <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
            aria-label="ปิดการแจ้งเตือน"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
