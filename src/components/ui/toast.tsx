import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useUIStore } from '../../state/ui.store';

export const ToastViewport: React.FC = () => {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'rounded-lg border border-primary/10 bg-white p-4 shadow-card',
            toast.tone === 'success' && 'border-success/40',
            toast.tone === 'danger' && 'border-danger/40'
          )}
          role="status"
        >
          <div className="flex items-start gap-3">
            <p className="flex-1 text-sm text-text">{toast.message}</p>
            <button
              type="button"
              aria-label="Fermer la notification"
              onClick={() => removeToast(toast.id)}
              className="rounded-full p-1 text-subtext transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
