import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../components/search/SearchBar';
import { SkeletonList } from '../components/common/SkeletonList';
import { StylistCard } from '../components/search/StylistCard';
import { fetchStylists } from '../mock/api';
import { SearchQuery } from '../types';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';

export const Home = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState<SearchQuery>({ city: 'Paris', kidFriendlyOnly: true });
  const navigate = useNavigate();

  const { data: stylists = [], isPending } = useQuery({
    queryKey: ['stylists', query],
    queryFn: () => fetchStylists(query)
  });

  const handleSubmit = (values: SearchQuery) => {
    setQuery(values);
  };

  return (
    <div className="space-y-12">
      <section className="rounded-[1.5rem] bg-gradient-to-r from-primary/10 to-primary/5 p-8 shadow-sm">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primaryContrast">{t('home.title')}</h1>
          <p className="max-w-2xl text-lg text-primaryContrast/80">{t('home.subtitle')}</p>
        </div>
        <div className="mt-6">
          <SearchBar initialQuery={query.city} onSubmit={handleSubmit} />
        </div>
      </section>
      <section aria-labelledby="list-heading" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 id="list-heading" className="text-2xl font-semibold text-text">
            Coiffeuses proches de vous
          </h2>
          <Button variant="secondary" className="hidden md:inline-flex">
            Créer une alerte disponibilité
          </Button>
        </div>
        <div>
          {isPending ? (
            <SkeletonList />
          ) : stylists.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {stylists.map((stylist) => (
                <StylistCard
                  key={stylist.id}
                  stylist={stylist}
                  onClick={() => navigate(`/coiffeuses/${stylist.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-[1.5rem] bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-semibold text-text">{t('home.empty')}</p>
              <Button variant="primary">Alertez-moi</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
