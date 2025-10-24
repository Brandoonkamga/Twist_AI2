import { useEffect } from 'react';
import { useUIStore } from '../../state/ui.store';
import { cn } from '../../utils/cn';

export const ToastContainer = () => {
  const { toasts, removeToast } = useUIStore();

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) => setTimeout(() => removeToast(toast.id), 4000));
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={cn(
            'rounded-2xl bg-white px-5 py-3 shadow-card border border-border/60 text-sm',
            toast.status === 'success' && 'border-success',
            toast.status === 'error' && 'border-danger'
          )}
        >
          <p className="font-semibold">{toast.title}</p>
          {toast.description ? <p className="text-muted-foreground text-sm">{toast.description}</p> : null}
        </div>
      ))}
    </div>
  );
};
