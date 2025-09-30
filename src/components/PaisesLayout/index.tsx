'use client';

import { useState } from 'react';
import { fetchHandler } from '@/helpers';
import { mapCountry } from '@/helpers/mappers';
import { IconSearch } from '@tabler/icons-react';
import { CountryMapped, CountryRaw } from '@/lib';
import { PaisesDashboard } from './PaisesUI/PaisesDashboard';
import {
  HeroButton,
  HeroCard,
  HeroCardContent,
  HeroCardDescription,
  HeroCardHeader,
  HeroCardTitle,
  HeroInput,
  LoadingSpinner,
} from '@/components/ui/';

export function PaisesLayout() {
  const [countryData, setCountryData] = useState<CountryMapped>();
  const [country, setCountry] = useState<string>('');
  const [formError, setFormError] = useState<string>();
  const [fetchError, setFetchError] = useState<string>();
  const [isPending, setIsPending] = useState(false);

  async function handleSearch() {
    if (!country.trim()) {
      setFormError('Digite um país');
      return;
    }

    setFormError(undefined);
    setFetchError(undefined);
    setCountryData(undefined);
    setIsPending(true);

    try {
      const { data, status } = await fetchHandler<CountryRaw>(
        `api/countries?country=${country.trim()}`,
      );

      if (status === 404) {
        setFetchError('País não encontrado, por favor verifique a ortografia.');
        return;
      }

      if (status < 200 || status > 299 || !data) {
        setFetchError('Erro de conexão por favor tente novamente mais tarde.');
        return;
      }

      setCountryData(mapCountry(data));
      setCountry('');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <HeroCard>
        <HeroCardHeader>
          <HeroCardTitle>Pesquise qualquer país</HeroCardTitle>
          <HeroCardDescription>
            Digite o país em português, inglês ou idioma nativo
          </HeroCardDescription>
        </HeroCardHeader>

        <HeroCardContent>
          <HeroInput
            icon={<IconSearch />}
            id='country'
            name='country'
            value={country}
            placeholder='Digite o nome do país'
            onChange={e => setCountry(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch();
            }}
            disabled={isPending}
            autoComplete='off'
            aria-describedby='form-error'
            aria-invalid={!!formError || !!fetchError}
            aria-disabled={isPending}
          />
          <HeroButton
            onClick={handleSearch}
            disabled={isPending}
            aria-disabled={isPending}
            className='min-w-24 bg-gradient-to-br from-emerald-700 to-teal-600'
          >
            {isPending ? <LoadingSpinner color='white' /> : <IconSearch />}
            {isPending ? '' : 'Buscar'}
          </HeroButton>
        </HeroCardContent>

        {(formError || fetchError) && (
          <span
            id='form-error'
            role='alert'
            className='text-sm text-red-500 text-left w-full font-medium'
          >
            {formError || fetchError}
          </span>
        )}
      </HeroCard>

      {isPending && (
        <div className='flex items-center justify-center mt-8'>
          <LoadingSpinner />
        </div>
      )}

      {countryData && <PaisesDashboard data={countryData} />}
    </>
  );
}
