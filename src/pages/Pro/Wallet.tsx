import { useMemo } from 'react';
import { bookings } from '../../mock/fixtures';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const Wallet = () => {
  const { balance, pending } = useMemo(() => {
    const confirmed = bookings.filter((booking) => booking.status === 'confirmed');
    const completed = bookings.filter((booking) => booking.status === 'completed');
    return {
      balance: completed.length * 48,
      pending: confirmed.length * 32,
    };
  }, []);

  const nextPayout = new Date();
  nextPayout.setDate(nextPayout.getDate() + 2);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-text">Portefeuille</h1>
        <p className="text-sm text-subtext">Suivez vos gains confirmés, ceux en attente et retirez en Instant Pay 48h.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Solde disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{balance.toFixed(2)} €</p>
            <p className="text-xs text-subtext">Retirable immédiatement.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gains en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-text">{pending.toFixed(2)} €</p>
            <p className="text-xs text-subtext">Libération 24h après chaque rendez-vous.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prochain versement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-text">{nextPayout.toLocaleDateString('fr-FR')}</p>
            <p className="text-xs text-subtext">Instant Pay disponible en 48h ouvrées.</p>
          </CardContent>
        </Card>
      </div>
      <Button className="w-full md:w-auto">Retirer via Instant Pay</Button>
    </section>
  );
};

export default Wallet;
