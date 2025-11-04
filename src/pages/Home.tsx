import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/search/SearchBar';
import { StylistCard } from '../components/search/StylistCard';
import { SkeletonList } from '../components/common/SkeletonList';
import { Button } from '../components/ui/button';
import { stylists } from '../mock/fixtures';
import type { SearchQuery } from '../types';
import { useI18n } from '../i18n/I18nProvider';

const fetchStylists = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return stylists;
};

const Home = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState<SearchQuery>({ city: 'Paris', kidFriendlyOnly: true });
  const { data, isLoading } = useQuery({ queryKey: ['stylists'], queryFn: fetchStylists });

  const filtered = useMemo(() => {
    if (!data) return [];
    return data
      .filter((stylist) =>
        query.kidFriendlyOnly ? stylist.kidFriendly : true
      )
      .filter((stylist) =>
        stylist.city.toLowerCase().includes(query.city.toLowerCase()) ||
        String(stylist.distanceKm).includes(query.city.toLowerCase())
      )
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [data, query]);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-primary text-white p-8 md:p-12 shadow-card">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold md:text-5xl">{t('home.title')}</h1>
          <p className="max-w-2xl text-lg text-white/80">{t('home.subtitle')}</p>
          <SearchBar initialQuery={query.city} onSubmit={(values) => setQuery(values)} />
        </div>
      </section>
      <section className="space-y-6">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-2xl font-semibold text-text">Coiffeuses proches</h2>
          <Button variant="secondary" onClick={() => navigate('/reservation')}>
            {t('common.cta.reserve')}
          </Button>
        </header>
        {isLoading ? (
          <SkeletonList count={4} />
        ) : filtered.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} onClick={() => navigate(`/coiffeuses/${stylist.id}`)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-primary/40 bg-white p-8 text-center shadow-card">
            <p className="text-lg font-semibold text-text">{t('home.empty')}</p>
            <Button variant="primary" className="mt-4">
              {t('home.alert')}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
