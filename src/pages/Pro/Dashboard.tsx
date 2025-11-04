import { useNavigate } from 'react-router-dom';
import { bookings, stylists } from '../../mock/fixtures';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const Dashboard = () => {
  const navigate = useNavigate();
  const upcoming = bookings.filter((booking) => booking.status !== 'completed').slice(0, 3);
  const stylist = stylists[0];
  const avgRating = stylist.rating.toFixed(1);

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text">Bonjour {stylist.name}</h1>
        <p className="text-sm text-subtext">Suivez vos rendez-vous, votre note et accédez à vos raccourcis pros.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Prochains rendez-vous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcoming.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between rounded-xl border border-muted/60 p-4">
                <div>
                  <p className="text-sm font-semibold text-text">{booking.date} • {booking.time}</p>
                  <p className="text-xs text-subtext">{booking.atHome ? 'À domicile' : 'Salon'} — ID {booking.id}</p>
                </div>
                <Button variant="secondary" onClick={() => navigate('/pro/agenda')}>
                  Voir l’agenda
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Note moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{avgRating}</p>
            <p className="text-sm text-subtext">Basée sur {stylist.reviewsCount} avis de parents.</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Button className="w-full" onClick={() => navigate('/pro/agenda')}>
          Agenda
        </Button>
        <Button variant="secondary" className="w-full" onClick={() => navigate('/pro/portefeuille')}>
          Portefeuille
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => navigate('/coiffeuses/stylist-1')}>
          Mon profil public
        </Button>
      </div>
    </section>
  );
};

export default Dashboard;
