import React from 'react';
import { useApp, ToastMessage } from '../../context/AppContext';
import { ShieldAlert, CheckCircle2, AlertTriangle, Sparkles, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  const getIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'SAFE':
        return <CheckCircle2 className="w-4 h-4 text-[var(--color-safe)] shrink-0" />;
      case 'CAUTION':
        return <AlertTriangle className="w-4 h-4 text-[var(--color-moderate)] shrink-0" />;
      case 'HIGH':
        return <AlertTriangle className="w-4 h-4 text-[var(--color-high)] shrink-0" />;
      case 'CRITICAL':
        return <ShieldAlert className="w-4 h-4 text-[var(--color-critical)] shrink-0 animate-pulse" />;
      case 'AI':
        return <Sparkles className="w-4 h-4 text-[#C084FC] shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-[#60A5FA] shrink-0" />;
    }
  };

  const getBorder = (type: ToastMessage['type']) => {
    switch (type) {
      case 'CRITICAL':
        return 'border-[var(--color-critical)]/60 bg-[#170a0a]/95 glow-critical';
      case 'HIGH':
        return 'border-[var(--color-high)]/50 bg-[#161208]/95';
      case 'CAUTION':
        return 'border-[var(--color-moderate)]/40 bg-[#14140a]/95';
      case 'AI':
        return 'border-[#A78BFA]/40 bg-[#120f18]/95';
      default:
        return 'border-white/10 bg-[#0c120d]/95';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all animate-in slide-in-from-top duration-200 ${getBorder(toast.type)}`}
        >
          <div className="mt-0.5">{getIcon(toast.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h5 className="text-xs font-bold text-[var(--text-primary)] truncate">{toast.title}</h5>
              <span className="text-[9px] text-[var(--text-muted)] font-mono shrink-0">{toast.timestamp}</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed break-words">
              {toast.description}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[var(--text-muted)] hover:text-white p-0.5 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
