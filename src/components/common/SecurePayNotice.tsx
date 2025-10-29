import { Lock } from 'lucide-react';

export const SecurePayNotice = () => (
  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
    <Lock className="h-4 w-4" aria-hidden="true" />
    <span>Paiement sécurisé — vos données sont protégées.</span>
  </div>
);
