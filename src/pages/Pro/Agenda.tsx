import { useState } from 'react';
import { bookings } from '../../mock/fixtures';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const Agenda = () => {
  const [newSlot, setNewSlot] = useState('2024-03-24T10:00');
  const [message, setMessage] = useState('');

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-text">Mon agenda</h1>
        <p className="text-sm text-subtext">Ouvrez ou bloquez des créneaux, synchronisés automatiquement avec la recherche parents.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-muted/80 bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-text">Prochains créneaux confirmés</h2>
          <ul className="space-y-3 text-sm">
            {bookings.map((booking) => (
              <li key={booking.id} className="flex items-center justify-between rounded-lg border border-muted/60 p-3">
                <span>
                  {booking.date} — {booking.time}
                </span>
                <span className="text-subtext">{booking.atHome ? 'Déplacement' : 'Salon'}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-card">
          <h2 className="text-xl font-semibold text-primary">Gérer mes créneaux</h2>
          <label className="space-y-2 text-sm text-text">
            Ajouter un créneau
            <Input type="datetime-local" value={newSlot} onChange={(e) => setNewSlot(e.target.value)} />
          </label>
          <Button className="w-full">Ouvrir ce créneau</Button>
          <label className="space-y-2 text-sm text-text">
            Bloquer des congés
            <textarea
              className="min-h-[120px] w-full rounded-xl border border-muted/80 p-3"
              placeholder="Indiquez vos dates d’absence, nous les masquons côté parents."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <Button variant="secondary" className="w-full">
            Bloquer
          </Button>
          <p className="text-xs text-primary">Un rappel automatique avec lien Maps est envoyé la veille à 20h.</p>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
