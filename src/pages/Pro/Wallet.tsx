import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export const Wallet = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-text">Portefeuille</h1>
    <Card className="space-y-4 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-subtext">Solde disponible</p>
          <p className="text-3xl font-bold text-text">€248,00</p>
        </div>
        <Button variant="primary">Retrait Instant Pay (48h)</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-[1.5rem] bg-muted p-4">
          <p className="text-sm text-subtext">Gains en attente</p>
          <p className="text-xl font-semibold text-text">€120,00</p>
          <p className="text-xs text-subtext">Versement estimé : 22 avril</p>
        </div>
        <div className="rounded-[1.5rem] bg-muted p-4">
          <p className="text-sm text-subtext">Dernier versement</p>
          <p className="text-xl font-semibold text-text">€210,00</p>
          <p className="text-xs text-subtext">Effectué le 8 avril</p>
        </div>
      </div>
      <p className="text-xs text-subtext">
        AfroConnect sécurise vos paiements et libère les fonds 24h après la prestation pour limiter les litiges.
      </p>
    </Card>
  </div>
);
