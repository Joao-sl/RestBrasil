'use client';

import { CepResponse } from '@/lib';
import { fetchHandler, formatCep } from '@/helpers';
import { useEffect, useRef, useState } from 'react';
import { CepDashboard } from './CepUI/CepDashboard';
import { IconSearch } from '@tabler/icons-react';
import {
  HeroButton,
  HeroCard,
  HeroCardContent,
  HeroCardDescription,
  HeroCardHeader,
  HeroCardTitle,
  HeroInput,
  LoadingSpinner,
} from '@/components/ui';

export function CepLayout() {
  const controllerRef = useRef<AbortController | null>(null);
  const [cep, setCep] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<CepResponse>();
  const [isPending, setIsPending] = useState(false);

  function handleCepChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCep(formatCep(event.target.value));
  }

  async function handleSearch() {
    controllerRef.current?.abort();

    if (cep.length < 8) {
      setError('Cep deve conter 8 dígitos');
      setData(undefined);
      return;
    }

    setError('');
    setIsPending(true);

    controllerRef.current = new AbortController();
    const controllerId = setTimeout(() => controllerRef.current?.abort(), 5000);

    try {
      const { data, error, status } = await fetchHandler<CepResponse>(
        `/api/cep?cep=${encodeURIComponent(cep)}`,
        { signal: controllerRef.current?.signal },
      );

      if (error) {
        setData(undefined);
        setError(error || `Erro desconhecido, StatusCode: ${status}`);
        setIsPending(false);
        return;
      }

      setData(data);
      setCep('');
    } finally {
      setIsPending(false);
      clearTimeout(controllerId);
    }
  }

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return (
    <>
      <HeroCard>
        <HeroCardHeader>
          <HeroCardTitle>Buscar por um CEP</HeroCardTitle>
          <HeroCardDescription>
            Digite apenas os números do CEP sem hífen (ex: 01001000)
          </HeroCardDescription>
        </HeroCardHeader>

        <HeroCardContent>
          <HeroInput
            id='cep-search'
            placeholder='Digite o CEP'
            icon={<IconSearch />}
            value={cep}
            onChange={handleCepChange}
            maxLength={9}
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
            className='min-w-24 bg-gradient-to-br from-purple-700 to-violet-700'
          >
            {isPending ? <LoadingSpinner color='white' /> : <IconSearch />}
            {isPending ? '' : 'Buscar'}
          </HeroButton>
        </HeroCardContent>

        {error && (
          <span
            id='search-error'
            role='alert'
            className='w-full text-left text-red-500 font-medium text-sm'
          >
            {error}
          </span>
        )}
      </HeroCard>

      {isPending && (
        <div className='flex items-center justify-center mt-8'>
          <LoadingSpinner />
        </div>
      )}

      {data && <CepDashboard data={data} />}
    </>
  );
}
