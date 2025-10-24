import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { SearchBar } from '../components/search/SearchBar';
import { StylistCard } from '../components/search/StylistCard';
import { SkeletonList } from '../components/common/SkeletonList';
import { stylists } from '../mock/fixtures';
import type { SearchQuery, Stylist } from '../types';
import { useTranslations } from '../i18n';

const fetchStylists = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return stylists;
};

const Home = () => {
  const [query, setQuery] = useState<SearchQuery>({ city: '', childAgeRange: '4-7' });
  const navigate = useNavigate();
  const t = useTranslations();

  const { data, isLoading } = useQuery({
    queryKey: ['stylists'],
    queryFn: fetchStylists,
  });

  const filtered = useMemo(() => {
    if (!data) return [] as Stylist[];
    if (!query.city) return data;
    return data.filter((stylist) => stylist.city.toLowerCase().includes(query.city.toLowerCase()));
  }, [data, query.city]);

  const handleSearch = (nextQuery: SearchQuery) => {
    setQuery(nextQuery);
  };

  const handleNavigate = (id: string) => {
    navigate(`/coiffeuses/${id}`);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-primary/10 via-white to-white p-6 shadow-card">
        <h1 className="text-3xl font-bold text-primaryContrast md:text-4xl">{t.home.title}</h1>
        <p className="mt-2 text-lg text-primaryContrast/80">{t.home.subtitle}</p>
        <div className="mt-6">
          <SearchBar initialQuery={query.city} onSubmit={handleSearch} />
        </div>
      </section>

      <section aria-live="polite" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-text">Coiffeuses près de vous</h2>
          <Button variant="ghost" onClick={() => handleSearch({ city: '', childAgeRange: query.childAgeRange })}>
            Réinitialiser
          </Button>
        </div>
        {isLoading ? (
          <SkeletonList count={4} />
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary/30 bg-white p-8 text-center">
            <p className="text-lg font-semibold text-primary">{t.home.empty}</p>
            <p className="mt-3 text-sm text-subtext">
              Activez une alerte et soyez informé·e des nouvelles coiffeuses kid-friendly près de vous.
            </p>
            <Button className="mt-4" variant="secondary">
              Alertez-moi
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} onClick={() => handleNavigate(stylist.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
