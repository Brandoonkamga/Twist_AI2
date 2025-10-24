import { Lock } from 'lucide-react';

export const SecurePayNotice: React.FC = () => (
  <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary" role="status">
    <Lock className="h-4 w-4" aria-hidden />
    <span>Paiement sécurisé via AfroConnect</span>
  </div>
);
