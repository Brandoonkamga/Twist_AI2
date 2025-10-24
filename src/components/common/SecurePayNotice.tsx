import { Lock } from 'lucide-react';

export const SecurePayNotice = () => (
  <div className="flex items-center gap-2 rounded-[1.5rem] bg-primary/5 px-4 py-3 text-sm text-primary" role="status">
    <Lock className="h-4 w-4" aria-hidden="true" />
    <span>Paiement sécurisé, protection des parents et des coiffeuses.</span>
  </div>
);
