import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import { SearchQuery } from '../../types';
import { useTranslation } from '../../i18n';

interface SearchBarProps {
  initialQuery?: string;
  onSubmit: (query: SearchQuery) => void;
}

export const SearchBar = ({ initialQuery = '', onSubmit }: SearchBarProps) => {
  const [city, setCity] = useState(initialQuery);
  const [kidFriendlyOnly, setKidFriendlyOnly] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ city, kidFriendlyOnly });
  };

  return (
    <form
      className="w-full rounded-[1.5rem] bg-white p-4 shadow-lg"
      onSubmit={handleSubmit}
      aria-label="Recherche de coiffeuses"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="flex flex-1 items-center gap-3" htmlFor="city">
          <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="sr-only">Ville</span>
          <Input
            id="city"
            name="city"
            value={city}
            placeholder="Paris, Montreuil..."
            onChange={(event) => setCity(event.target.value)}
            required
            aria-describedby="city-help"
          />
        </label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            aria-expanded={showFilters}
            aria-controls="search-filters"
            onClick={() => setShowFilters((value) => !value)}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filtres
          </Button>
          <Button type="submit" className="flex-1 md:flex-none">
            {t('common.cta.search')}
          </Button>
        </div>
      </div>
      <p id="city-help" className="mt-2 text-xs text-subtext">
        Géolocalisation facultative. Vous pouvez saisir une ville ou un code postal.
      </p>
      {showFilters ? (
        <div
          id="search-filters"
          className="mt-4 flex items-center justify-between rounded-[1.5rem] bg-muted px-4 py-3"
        >
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              checked={kidFriendlyOnly}
              onChange={(event) => setKidFriendlyOnly(event.target.checked)}
              className="h-5 w-5 rounded border-border text-primary"
            />
            <span>Kid-Friendly par défaut</span>
          </label>
          <span className="text-xs text-subtext">Suggestions : Paris 11e, Saint-Denis...</span>
        </div>
      ) : null}
    </form>
  );
};
