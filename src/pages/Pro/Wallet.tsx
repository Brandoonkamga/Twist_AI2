import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const ProWallet = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10">
      <h1 className="text-3xl font-semibold text-foreground">Portefeuille</h1>
      <Card>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Solde disponible</p>
              <p className="text-3xl font-bold text-foreground">€420.00</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gains en attente</p>
              <p className="text-3xl font-bold text-foreground">€120.00</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Versement suivant</p>
              <p className="text-3xl font-bold text-foreground">12 juin</p>
            </div>
          </div>
          <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Estimation versement : 12 juin 2024 (Instant Pay 48h). Les acomptes sont transférés après validation de la prestation.
          </div>
          <Button variant="primary">Déclencher un retrait Instant Pay</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProWallet;
