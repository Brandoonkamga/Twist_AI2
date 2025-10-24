import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../components/search/SearchBar';
import { SearchQuery } from '../types';
import { fetchStylists } from '../mock/api';
import { SkeletonList } from '../components/common/SkeletonList';
import { StylistCard } from '../components/search/StylistCard';
import { useI18n } from '../state/i18n.context';
import { Button } from '../components/ui/button';

const Home = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState<SearchQuery>({ city: 'Paris', kidOnly: true });

  const { data, isLoading } = useQuery({
    queryKey: ['stylists', query.city, query.kidOnly],
    queryFn: () => fetchStylists(query.city, query.kidOnly)
  });

  const handleSubmit = (next: SearchQuery) => {
    setQuery(next);
  };

  const stylists = data ?? [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-primary/10 via-white to-primary/10 p-8 text-center shadow-card">
        <h1 className={`text-foreground ${'text-4xl font-bold md:text-5xl'}`}>{t('home.title')}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('home.subtitle')}</p>
        <div className="mx-auto w-full max-w-3xl">
          <SearchBar initialQuery={query.city} onSubmit={handleSubmit} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>✔︎ Coiffeuses vérifiées</span>
          <span>✔︎ Acompte sécurisé 20%</span>
          <span>✔︎ Assistance parents 7j/7</span>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Coiffeuses près de vous</h2>
          <Button variant="ghost" onClick={() => navigate('/reservation')}>
            Commencer une réservation
          </Button>
        </div>
        {isLoading ? (
          <SkeletonList count={3} />
        ) : stylists.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border/70 bg-white p-8 text-center shadow-card">
            <p className="max-w-md text-muted-foreground">{t('home.empty')}</p>
            <Button variant="primary" onClick={() => navigate('/auth')}>
              Alertez-moi
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {stylists.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} onClick={() => navigate(`/coiffeuses/${stylist.id}`)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
