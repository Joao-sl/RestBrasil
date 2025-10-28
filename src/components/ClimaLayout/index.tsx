'use client';

import { useState } from 'react';
import { fetchHandler } from '@/helpers';
import { IconSearch } from '@tabler/icons-react';
import { WeatherOverview } from './ClimaUI/weather-overview';
import { ForecastCarousel } from './ClimaUI/forecast-carousel';
import { ForecastMapped, WeatherMapped } from '@/lib/weather-interface';
import {
  Container,
  HeroButton,
  HeroCard,
  HeroCardContent,
  HeroCardDescription,
  HeroCardHeader,
  HeroCardTitle,
  HeroInput,
  LoadingSpinner,
} from '@/components/ui';

type apiData = {
  weather: WeatherMapped;
  forecast: ForecastMapped;
};

export function ClimaLayout() {
  const [isPending, setIsPending] = useState(false);
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string>();
  const [apiData, setApiData] = useState<apiData>();

  async function handleSearch() {
    if (!city) {
      setError('Digite uma cidade');
      return;
    }

    setApiData(undefined);
    setError(undefined);
    setIsPending(true);

    try {
      const { data, status } = await fetchHandler<apiData>(
        `/api/weather?city=${city.trim()}`,
      );

      if (status === 404) {
        setError('Cidade não encontrada');
        return;
      }

      setCity('');
      setApiData(data);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <HeroCard>
        <HeroCardHeader>
          <HeroCardTitle>Busque por uma cidade</HeroCardTitle>
          <HeroCardDescription>
            Veja dados sobre o clima de qualquer cidade do mundo.
          </HeroCardDescription>
        </HeroCardHeader>
        <HeroCardContent>
          <HeroInput
            id='cep-search'
            placeholder='Rio de Janeiro, Tokyo, Amsterd...'
            icon={<IconSearch />}
            value={city}
            onChange={e => setCity(e.currentTarget.value)}
            disabled={isPending}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch();
            }}
            aria-disabled={isPending}
            aria-describedby='search-error'
            aria-invalid={!!error}
          />

          <HeroButton
            onClick={handleSearch}
            disabled={isPending}
            aria-disabled={isPending}
            className='min-w-24 bg-gradient-to-b from-blue-300 to-blue-700'
          >
            {isPending ? <LoadingSpinner color='white' /> : <IconSearch />}
            {isPending ? '' : 'Buscar'}
          </HeroButton>
        </HeroCardContent>

        {error && (
          <span
            id='form-error'
            role='alert'
            className='text-sm text-red-500 text-left w-full font-medium'
          >
            {error}
          </span>
        )}
      </HeroCard>

      {isPending && (
        <div className='flex justify-center mt-8'>
          <LoadingSpinner />
        </div>
      )}

      {apiData && (
        <Container asChild>
          <section
            className='mt-8 rounded-xl pb-0'
            role='region'
            aria-labelledby='result'
          >
            <h2 className='sr-only'>
              Clima atual, {apiData.weather.city}, {apiData.weather.country}
            </h2>

            <div>
              <WeatherOverview
                weather={apiData.weather}
                todayForecast={apiData.forecast.forecasts.today}
              />

              <ForecastCarousel forecast={apiData.forecast} />
            </div>
          </section>
        </Container>
      )}
    </>
  );
}
