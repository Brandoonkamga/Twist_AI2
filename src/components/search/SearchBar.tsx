import { useMemo, useState } from 'react';
import { MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import type { SearchQuery } from '../../types';
import { useTranslations } from '../../i18n';

const citySuggestions = ['Paris', 'Montreuil', 'Saint-Denis', 'Ivry-sur-Seine', 'Boulogne-Billancourt', 'Versailles'];

export type SearchBarProps = {
  initialQuery?: string;
  onSubmit: (query: SearchQuery) => void;
};

export const SearchBar = ({ initialQuery = '', onSubmit }: SearchBarProps) => {
  const [city, setCity] = useState(initialQuery);
  const [childAgeRange, setChildAgeRange] = useState<SearchQuery['childAgeRange']>('4-7');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const t = useTranslations();

  const filteredCities = useMemo(
    () =>
      city
        ? citySuggestions.filter((suggestion) => suggestion.toLowerCase().includes(city.toLowerCase()))
        : citySuggestions,
    [city]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ city: city.trim(), childAgeRange });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative grid gap-3 rounded-2xl bg-white p-4 shadow-card transition duration-normal ease-friendly lg:grid-cols-[2fr,1fr,auto]"
      aria-label="Recherche de coiffeuses kid-friendly"
    >
      <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 focus-within:border-primary" htmlFor="search-city">
        <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
        <div className="flex-1">
          <span className="block text-sm text-subtext">Ville ou code postal</span>
          <Input
            id="search-city"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            autoComplete="off"
            placeholder="Paris, Montreuil..."
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => setShowSuggestions(true)}
            className="border-none px-0 py-0 text-lg font-medium focus-visible:ring-0"
          />
        </div>
      </label>
      {showSuggestions && filteredCities.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-4 right-4 top-[4.5rem] z-10 rounded-2xl border border-border bg-white shadow-card"
        >
          {filteredCities.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm hover:bg-muted"
                onMouseDown={() => {
                  setCity(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <span>{suggestion}</span>
                <Search className="h-4 w-4 text-subtext" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <label className="flex flex-col rounded-2xl border border-border bg-white px-4 py-3 focus-within:border-primary">
        <span className="text-sm text-subtext">Âge de l’enfant</span>
        <Select value={childAgeRange} onChange={(event) => setChildAgeRange(event.target.value as SearchQuery['childAgeRange'])}>
          <option value="0-3">0-3 ans</option>
          <option value="4-7">4-7 ans</option>
          <option value="8-12">8-12 ans</option>
        </Select>
      </label>

      <div className="flex items-center gap-2">
        <Button type="submit" className="flex items-center gap-2" aria-label="Lancer la recherche">
          <Search className="h-5 w-5" aria-hidden="true" />
          <span>{t.common.cta.search}</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="hidden h-full items-center gap-2 lg:flex"
          aria-label="Afficher les filtres"
        >
          <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
          <span>Filtres</span>
        </Button>
      </div>
    </form>
  );
};
