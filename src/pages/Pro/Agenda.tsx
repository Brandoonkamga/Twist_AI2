import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const initialSlots = [
  { id: 'slot-1', date: '2024-06-10', time: '09:00', open: true },
  { id: 'slot-2', date: '2024-06-10', time: '14:00', open: true },
  { id: 'slot-3', date: '2024-06-11', time: '10:30', open: false }
];

const ProAgenda = () => {
  const [slots, setSlots] = useState(initialSlots);

  const toggleSlot = (id: string) => {
    setSlots((prev) => prev.map((slot) => (slot.id === id ? { ...slot, open: !slot.open } : slot)));
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10">
      <h1 className="text-3xl font-semibold text-foreground">Agenda</h1>
      <Card>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Ouvrez/fermez vos créneaux en un clic. Les parents voient les disponibilités mises à jour instantanément.</p>
          <ul className="space-y-3 text-sm">
            {slots.map((slot) => (
              <li key={slot.id} className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {new Date(slot.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <p className="text-xs text-muted-foreground">{slot.time}</p>
                </div>
                <Button variant={slot.open ? 'secondary' : 'primary'} onClick={() => toggleSlot(slot.id)}>
                  {slot.open ? 'Bloquer' : 'Ouvrir'}
                </Button>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl bg-muted px-4 py-3 text-xs text-muted-foreground">
            Conseil : envoyez le lien Maps aux parents la veille via la messagerie intégrée.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProAgenda;
