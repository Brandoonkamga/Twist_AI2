import { useEffect } from 'react';
import { useUIStore } from '../../state/ui.store';
import { Button } from './button';

export const ToastViewport = () => {
  const { toasts, dismissToast } = useUIStore();

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((toast) =>
      setTimeout(() => dismissToast(toast.id), 4000)
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, dismissToast]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="rounded-[1.5rem] bg-primary text-white p-4 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description ? (
                <p className="text-xs text-white/80">{toast.description}</p>
              ) : null}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => dismissToast(toast.id)}
            >
              Fermer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
