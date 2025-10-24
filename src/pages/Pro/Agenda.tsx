import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useUIStore } from '../../state/ui.store';

export const Agenda = () => {
  const { setLoadingCalendar, isLoadingCalendar } = useUIStore();

  const toggleSlot = (slot: string) => {
    setLoadingCalendar(true);
    setTimeout(() => {
      setLoadingCalendar(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">Agenda</h1>
      <Card className="space-y-4 p-4">
        <p className="text-sm text-subtext">Ouvrez/fermez vos créneaux. Les parents voient la mise à jour instantanément.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {['Jeudi 10:00', 'Jeudi 14:00', 'Vendredi 09:30', 'Samedi 11:00'].map((slot) => (
            <Button key={slot} variant="secondary" onClick={() => toggleSlot(slot)} disabled={isLoadingCalendar}>
              {isLoadingCalendar ? 'Mise à jour...' : `Basculer ${slot}`}
            </Button>
          ))}
        </div>
        <p className="text-xs text-subtext">
          Besoin de congés ? Bloquez vos dates et informez vos clientes. Un rappel navigation vous est envoyé la veille.
        </p>
      </Card>
    </div>
  );
};
