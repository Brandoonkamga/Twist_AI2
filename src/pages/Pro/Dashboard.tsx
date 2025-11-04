import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export const Dashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-text">Vue d’ensemble</h1>
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="space-y-3 p-4">
        <p className="text-sm text-subtext">Prochains rendez-vous</p>
        <ul className="space-y-2 text-sm text-text">
          <li>Jeudi 14:00 · Emma L. · Box braids enfant</li>
          <li>Vendredi 09:30 · Noah M. · Cornrows créatifs</li>
          <li>Samedi 11:00 · Léa P. · Soin hydratant</li>
        </ul>
      </Card>
      <Card className="space-y-3 p-4">
        <p className="text-sm text-subtext">Note moyenne</p>
        <p className="text-3xl font-bold text-success">4.8</p>
        <p className="text-xs text-subtext">Basée sur 128 avis parents.</p>
      </Card>
      <Card className="space-y-3 p-4">
        <p className="text-sm text-subtext">Actions rapides</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary">
            <Link to="/pro/agenda">Ouvrir mon agenda</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/pro/portefeuille">Voir mon portefeuille</Link>
          </Button>
        </div>
      </Card>
    </div>
  </div>
);
