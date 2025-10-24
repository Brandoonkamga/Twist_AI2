import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const initialSlots = [
  { id: 'slot-1', date: '2024-03-22', time: '10:00', status: 'ouvert' },
  { id: 'slot-2', date: '2024-03-22', time: '14:00', status: 'ouvert' },
  { id: 'slot-3', date: '2024-03-23', time: '09:30', status: 'réservé' },
];

const Agenda = () => {
  const [slots, setSlots] = useState(initialSlots);

  const toggleSlot = (id: string) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id
          ? { ...slot, status: slot.status === 'ouvert' ? 'bloqué' : 'ouvert' }
          : slot
      )
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">Agenda</h1>
      <Card className="space-y-4">
        <p className="text-sm text-subtext">
          Activez ou bloquez vos créneaux en un clic. Les disponibilités sont synchronisées côté parents.
        </p>
        <ul className="space-y-3">
          {slots.map((slot) => (
            <li key={slot.id} className="flex flex-wrap items-center justify-between rounded-2xl bg-muted px-4 py-3">
              <div>
                <p className="font-semibold text-text">
                  {slot.date} · {slot.time}
                </p>
                <p className="text-sm text-subtext">Statut : {slot.status}</p>
              </div>
              <Button variant="secondary" onClick={() => toggleSlot(slot.id)}>
                {slot.status === 'ouvert' ? 'Bloquer' : 'Réouvrir'}
              </Button>
            </li>
          ))}
        </ul>
        <Button>Ajouter un créneau</Button>
      </Card>
    </div>
  );
};

export default Agenda;
