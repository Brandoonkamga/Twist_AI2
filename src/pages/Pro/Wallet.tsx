import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const Wallet = () => {
  const balance = 420;
  const pending = 120;
  const nextPayout = '2024-03-24';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">Portefeuille</h1>
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-subtext">Solde disponible</p>
            <p className="text-3xl font-bold text-text">{balance} €</p>
          </div>
          <Button>Retrait Instant Pay (48h)</Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-muted px-4 py-3">
            <p className="text-sm text-subtext">Gains en attente</p>
            <p className="text-xl font-semibold text-text">{pending} €</p>
          </div>
          <div className="rounded-2xl bg-muted px-4 py-3">
            <p className="text-sm text-subtext">Prochain virement estimé</p>
            <p className="text-xl font-semibold text-text">{nextPayout}</p>
          </div>
        </div>
        <p className="text-xs text-subtext">
          Les paiements sont sécurisés et versés automatiquement après confirmation du parent. Aucun numéro de carte n’est conservé.
        </p>
      </Card>
    </div>
  );
};

export default Wallet;
