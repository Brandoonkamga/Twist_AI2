import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { bookings, stylists } from '../../mock/fixtures';
import { formatDate } from '../../lib/format';

const Dashboard = () => {
  const upcoming = bookings.slice(0, 3);
  const stylist = stylists[0];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Bonjour {stylist.name}</h1>
          <p className="text-subtext">Vous avez {upcoming.length} prochains rendez-vous confirmés.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Voir mon profil public</Button>
          <Button>Nouvelle dispo</Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-text">Prochains RDV</h2>
          <ul className="mt-4 space-y-3 text-sm text-subtext">
            {upcoming.map((booking) => (
              <li key={booking.id} className="flex items-center justify-between rounded-2xl bg-muted px-4 py-2">
                <span>{formatDate(`${booking.date}T${booking.time}`)}</span>
                <span className="font-semibold text-text">{booking.status}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-text">Note moyenne</h2>
          <p className="mt-4 text-4xl font-bold text-success">4.9</p>
          <p className="text-sm text-subtext">Continuez à chouchouter les enfants pour garder ce score !</p>
        </Card>
      </section>

      <Card className="space-y-3">
        <h2 className="text-xl font-semibold text-text">Raccourcis</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">Agenda</Button>
          <Button variant="secondary">Portefeuille</Button>
          <Button variant="secondary">Checklist hygiène</Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
