import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useI18n } from '../../state/i18n.context';
import { SearchQuery } from '../../types';

const schema = z.object({
  city: z.string().min(2, 'Merci d’entrer une ville'),
  kidOnly: z.boolean().default(true)
});

type FormValues = z.infer<typeof schema>;

const citySuggestions = ['Paris', 'Montreuil', 'Saint-Denis', 'Ivry-sur-Seine', 'Levallois-Perret'];

export const SearchBar = ({ initialQuery, onSubmit }: { initialQuery: string; onSubmit: (query: SearchQuery) => void }) => {
  const { t } = useI18n();
  const [showFilters, setShowFilters] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { city: initialQuery, kidOnly: true }
  });

  useEffect(() => {
    setValue('city', initialQuery);
  }, [initialQuery, setValue]);

  const submit = (values: FormValues) => {
    onSubmit(values);
  };

  const kidOnly = watch('kidOnly');

  return (
    <form className="w-full rounded-3xl bg-white p-4 shadow-card" onSubmit={handleSubmit(submit)}>
      <label htmlFor="search-city" className="sr-only">
        {t('home.title')}
      </label>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            id="search-city"
            list="city-suggestions"
            aria-describedby={errors.city ? 'search-city-error' : undefined}
            placeholder="Paris, Montreuil…"
            {...register('city')}
          />
          <datalist id="city-suggestions">
            {citySuggestions.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
          {errors.city ? (
            <p id="search-city-error" className="mt-1 text-sm text-danger">
              {errors.city.message}
            </p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={() => setShowFilters((prev) => !prev)} aria-expanded={showFilters}>
            Filtres
          </Button>
          <Button type="submit" className="whitespace-nowrap">
            {t('common.cta.search')}
          </Button>
        </div>
      </div>
      {showFilters ? (
        <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-muted p-4" aria-live="polite">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border border-border"
              checked={kidOnly}
              onChange={(event) => {
                setValue('kidOnly', event.target.checked, { shouldDirty: true });
                submit({ city: watch('city'), kidOnly: event.target.checked });
              }}
            />
            <span>Afficher uniquement les prestations enfants</span>
          </label>
        </div>
      ) : null}
    </form>
  );
};
