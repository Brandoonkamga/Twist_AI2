import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { SearchQuery } from '../../types';
import { useI18n } from '../../i18n/I18nProvider';

const schema = z.object({
  city: z.string().min(2, 'Veuillez indiquer une ville'),
  kidFriendlyOnly: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

const suggestedCities = ['Paris', 'Montreuil', 'Ivry-sur-Seine', 'Saint-Denis'];

export interface SearchBarProps {
  initialQuery?: string;
  onSubmit: (query: SearchQuery) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '', onSubmit }) => {
  const { t } = useI18n();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { register, handleSubmit, setValue, watch, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: initialQuery,
      kidFriendlyOnly: true,
    },
  });

  const submit = handleSubmit((values) => {
    onSubmit(values);
    setShowSuggestions(false);
  });

  const cityValue = watch('city');

  return (
    <form onSubmit={submit} className="w-full rounded-2xl bg-white p-4 shadow-card" aria-label="Recherche de coiffeuses">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <label className="flex w-full flex-col gap-2 text-sm font-medium text-text">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden />
            Ville ou code postal
          </span>
          <div className="relative">
            <Input
              {...register('city')}
              aria-invalid={!!formState.errors.city}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Paris, Montreuil…"
            />
            {showSuggestions && cityValue.length < 3 && (
              <p className="mt-2 text-xs text-subtext">Tapez au moins 3 lettres pour personnaliser la recherche.</p>
            )}
            {showSuggestions && cityValue.length >= 2 && (
              <ul
                className="absolute z-20 mt-2 w-full rounded-lg border border-muted/80 bg-white shadow-card"
                role="listbox"
              >
                {suggestedCities
                  .filter((city) => city.toLowerCase().includes(cityValue.toLowerCase()))
                  .map((city) => (
                    <li key={city}>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm hover:bg-muted"
                        onClick={() => {
                          setValue('city', city, { shouldValidate: true });
                          setShowSuggestions(false);
                        }}
                      >
                        {city}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          {formState.errors.city && (
            <span className="text-xs text-danger">{formState.errors.city.message}</span>
          )}
        </label>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register('kidFriendlyOnly')}
              className="h-4 w-4 rounded border border-muted/80 text-primary focus:ring-primary"
              aria-label={t('common.labels.kidFriendly')}
            />
            Kid-Friendly par défaut
          </label>
          <Button type="submit" className="w-full md:w-auto">
            {t('common.cta.search')}
          </Button>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-subtext">
        <Filter className="h-4 w-4" aria-hidden />
        Ajustez les filtres après votre recherche.
      </div>
    </form>
  );
};
