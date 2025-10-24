import { fetchUpcomingBookings } from '../../mock/api';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { formatDateTime } from '../../lib/format';
import { Link, useNavigate } from 'react-router-dom';

const ProDashboard = () => {
  const { data: upcoming } = useQuery({ queryKey: ['pro-upcoming'], queryFn: fetchUpcomingBookings });
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
      <h1 className="text-3xl font-semibold text-foreground">Tableau de bord</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Note moyenne</p>
            <p className="text-3xl font-bold text-foreground">4.9</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Réservations à venir</p>
            <p className="text-3xl font-bold text-foreground">{upcoming?.length ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Taux d’annulation (&lt;24h)</p>
            <p className="text-3xl font-bold text-foreground">2%</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Prochains RDV</h2>
            <Link to="/pro/agenda" className="text-sm font-semibold text-primary underline">
              Ouvrir l’agenda
            </Link>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {upcoming?.map((booking) => (
              <li key={booking.id} className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
                <span>{formatDateTime(booking.date, booking.time)}</span>
                <span className="text-xs font-semibold text-success">Confirmé</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => navigate('/pro/agenda')}>
          Agenda
        </Button>
        <Button variant="secondary" onClick={() => navigate('/pro/portefeuille')}>
          Portefeuille
        </Button>
        <Button variant="ghost">Mettre à jour mon profil</Button>
      </div>
    </div>
  );
};

export default ProDashboard;
