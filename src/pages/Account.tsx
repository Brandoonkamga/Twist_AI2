import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { bookings, stylists } from '../mock/fixtures';
import { formatCurrency } from '../lib/format';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useI18n } from '../i18n/I18nProvider';

const Account = () => {
  const { t } = useI18n();
  const [note, setNote] = useState(5);
  const [comment, setComment] = useState('');

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-text">{t('account.tabs.bookings')}</h1>
        <p className="text-sm text-subtext">Retrouvez vos réservations, cartes enregistrées et paramètres.</p>
      </header>
      <Tabs defaultValue="bookings">
        <TabsList>
          <TabsTrigger value="bookings">{t('account.tabs.bookings')}</TabsTrigger>
          <TabsTrigger value="favorites">{t('account.tabs.favorites')}</TabsTrigger>
          <TabsTrigger value="payments">{t('account.tabs.payments')}</TabsTrigger>
          <TabsTrigger value="settings">{t('account.tabs.settings')}</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings" className="space-y-6">
          {bookings.map((booking) => {
            const stylist = stylists.find((s) => s.id === booking.stylistId);
            const service = stylist?.services.find((srv) => srv.id === booking.serviceId);
            return (
              <article key={booking.id} className="rounded-2xl border border-muted/80 bg-white p-6 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-text">{stylist?.name}</h2>
                    <p className="text-sm text-subtext">
                      {booking.date} à {booking.time} — {booking.atHome ? 'À domicile' : 'Chez la coiffeuse'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-subtext">{service?.title}</p>
                    <p className="text-base font-semibold text-text">{formatCurrency(service?.price ?? 0)}</p>
                  </div>
                </div>
                {booking.status === 'completed' && (
                  <div className="mt-4 space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <h3 className="text-sm font-semibold text-primary">{t('account.reviews.cta')}</h3>
                    <label className="flex items-center gap-2 text-sm text-text">
                      {t('account.reviews.ratingLabel')}
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={note}
                        onChange={(e) => setNote(Number(e.target.value))}
                        className="w-20"
                      />
                    </label>
                    <textarea
                      className="min-h-[100px] w-full rounded-xl border border-muted/80 p-3 text-sm"
                      placeholder={t('account.reviews.commentLabel')}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button className="w-full md:w-auto">{t('account.reviews.submit')}</Button>
                  </div>
                )}
              </article>
            );
          })}
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-subtext">Vous n’avez pas encore de favoris. Ajoutez des coiffeuses pour les retrouver facilement.</p>
        </TabsContent>
        <TabsContent value="payments">
          <div className="rounded-2xl border border-muted/80 bg-white p-6 shadow-card text-sm text-subtext">
            <p>Aucune carte sauvegardée. Ajoutez-en lors de votre prochaine réservation.</p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="space-y-3 text-sm text-subtext">
            <p>Modifiez votre adresse, vos préférences de contact et gérez vos notifications ici.</p>
            <Button variant="secondary" className="w-full md:w-auto">
              Mettre à jour mon profil
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Account;
