import { useQuery } from '@tanstack/react-query';
import { fetchBookings } from '../mock/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useState } from 'react';

export const Account = () => {
  const { data: bookings } = useQuery({ queryKey: ['bookings'], queryFn: fetchBookings });
  const [selectedTab, setSelectedTab] = useState('reservations');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">Mon espace</h1>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="reservations">Mes réservations</TabsTrigger>
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="reservations">
            <div className="grid gap-4 md:grid-cols-2">
              {bookings?.map((booking) => (
                <Card key={booking.id} className="space-y-3 p-4">
                  <h2 className="text-lg font-semibold text-text">Rendez-vous confirmé</h2>
                  <p className="text-sm text-subtext">
                    {booking.date} à {booking.time}
                  </p>
                  <p className="text-sm text-subtext">Statut : {booking.status}</p>
                  <Button variant="secondary" className="w-full">
                    Laisser un avis
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="favorites">
            <Card className="p-4 text-sm text-subtext">Ajoutez vos coiffeuses préférées pour les retrouver rapidement.</Card>
          </TabsContent>
          <TabsContent value="payments">
            <Card className="space-y-3 p-4 text-sm text-subtext">
              <p>Carte enregistrée : •••• 4242</p>
              <p>Aucun débit sans votre accord. Dépôt sécurisé via AfroConnect.</p>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="space-y-3 p-4 text-sm text-subtext">
              <p>Notifications : Activées (email + SMS veille du rendez-vous)</p>
              <Button variant="ghost" className="w-full text-primary">
                Télécharger mes données
              </Button>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
