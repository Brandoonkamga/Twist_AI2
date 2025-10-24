import { Lock } from 'lucide-react';

export const SecurePayNotice = () => (
  <div className="flex items-center gap-3 rounded-2xl bg-primary/10 px-4 py-3 text-sm text-primary" role="status">
    <Lock className="h-5 w-5" aria-hidden="true" />
    <div>
      <p className="font-semibold">Paiement sécurisé</p>
      <p className="text-primary/80">Vos informations sont chiffrées. Aucun numéro de carte n’est stocké.</p>
    </div>
  </div>
);
