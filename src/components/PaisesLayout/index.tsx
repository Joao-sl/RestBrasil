'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { CountryMapped, CountryRaw } from '@/lib';
import { mapCountry } from '@/helpers/mappers';
import { fetchHandler } from '@/helpers';
import {
  IconChessKing,
  IconGlobe,
  IconMessage2,
  IconNotes,
} from '@tabler/icons-react';
import {
  Button,
  Card,
  CardContent,
  DashboardCard,
  DashboardCardContent,
  DashboardCardDl,
  DashboardCardHeader,
  DashboardCardTitle,
  Input,
  InputWrapper,
  Label,
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
    } finally {
      setIsPending(false);
    }
    setCountry('');
  }

  const titleClasses = 'flex items-center gap-1';
  const cardNames = [
    {
      title: (
        <div className={titleClasses}>
          <IconMessage2 /> Nomes
        </div>
      ),
      fields: [
        {
          contentLabel: 'Comum (inglês)',
          content: countryData?.names?.common,
        },
        {
          contentLabel: 'Oficial (inglês)',
          content: countryData?.names?.official,
        },
        {
          contentLabel: 'Comum (linguas nativas)',
          content: countryData?.names.native?.map(
            v => `${v.language}: ${v.common}`,
          ),
        },
        {
          contentLabel: 'Oficial (linguas nativas)',
          content: countryData?.names.native?.map(
            v => `${v.language}: ${v.official}`,
          ),
        },
      ],
    },
  ];

  const cardItems = [
    {
      title: (
        <div className={titleClasses}>
          <IconGlobe /> Geografia
        </div>
      ),
      fields: [
        {
          contentLabel: 'Continente',
          content: countryData?.continent?.join('/'),
        },
        { contentLabel: 'Sub-Região', content: countryData?.subregion },
        { contentLabel: 'Area', content: `${countryData?.area} km²` },
        { contentLabel: 'População', content: `${countryData?.population}` },
        {
          contentLabel: 'Fuso horário',
          content: countryData?.timezone?.join(', '),
        },
      ],
    },
    {
      title: (
        <div className={titleClasses}>
          <IconChessKing /> Política
        </div>
      ),
      fields: [
        {
          contentLabel: 'Capital',
          content: countryData?.capital,
        },
        {
          contentLabel: 'Código internet',
          content: countryData?.tld?.join(', '),
        },
        {
          contentLabel: 'Moedas',
          content: countryData?.currencies
            ? Object.values(countryData?.currencies).map(v => {
                return `(${v.symbol}): ${v.name} `;
              })
            : undefined,
        },
        {
          contentLabel: 'GINI',
          content: countryData?.gini
            ? Object.entries(countryData.gini).map(([key, value]) => {
                return `(${key}): ${value}`;
              })
            : undefined,
        },
        {
          contentLabel: 'Membro da ONU',
          content: countryData?.unMember,
        },
      ],
    },
    {
      title: (
        <div className={titleClasses}>
          <IconNotes /> Outros
        </div>
      ),
      fields: [
        {
          contentLabel: 'Lado de condução do carro',
          content: countryData?.car.side,
        },
        {
          contentLabel: 'Google Maps',
          content: (
            <a
              href={countryData?.maps}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-primary hover:underline transition'
            >
              Ver no google maps
            </a>
          ),
        },
        {
          contentLabel: 'País independente',
          content: countryData?.independent,
        },
        {
          contentLabel: 'Código FIFA',
          content: countryData?.fifa,
        },
        {
          contentLabel: 'Idiomas oficiais',
          content: countryData?.languages?.join(', '),
        },
      ],
    },
  ];

  return (
    <div className='space-y-6'>
      <Card className='max-w-2xl mx-auto mt-6'>
        <CardContent className='space-y-4'>
          <InputWrapper>
            <Label htmlFor='country'>Pesquise o país</Label>
            <Input
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
              aria-invalid={!!formError}
              aria-disabled={isPending}
            />
            {formError && (
              <span
                id='form-error'
                role='alert'
                className='text-sm text-red-500'
              >
                {formError}
              </span>
            )}
          </InputWrapper>
          <Button
            onClick={handleSearch}
            disabled={isPending}
            aria-disabled={isPending}
            className='min-w-20'
          >
            {isPending ? <LoadingSpinner color='white' /> : 'Buscar'}
          </Button>
        </CardContent>
      </Card>

      {fetchError && (
        <div
          className={clsx(
            'font-semibold mt-6 bg-red-50 rounded-lg max-w-2xl mx-auto',
            'p-4 border border-red-200 text-red-400',
          )}
        >
          {fetchError}
        </div>
      )}

      {countryData && (
        <>
          {countryData.names.common && (
            <h3 className='text-center text-5xl font-bold'>
              {countryData.names.common}
            </h3>
          )}

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {cardNames.map((item, idx) => {
              return (
                <DashboardCard key={idx}>
                  <DashboardCardHeader>
                    <DashboardCardTitle>{item.title}</DashboardCardTitle>
                  </DashboardCardHeader>

                  <DashboardCardContent>
                    <DashboardCardDl fields={item.fields}></DashboardCardDl>
                  </DashboardCardContent>
                </DashboardCard>
              );
            })}

            {countryData?.flags?.svg && (
              <div className='relative aspect-[5/3] lg:col-span-2 overflow-hidden'>
                <Image
                  src={countryData.flags?.svg}
                  alt={countryData.flags?.alt || 'Bandeira do país pesquisado'}
                  fill
                  sizes='(min-width: 1024px) 66.66vw, 100vw'
                  className='object-contain'
                ></Image>
              </div>
            )}

            {cardItems.map((item, idx) => {
              return (
                <DashboardCard key={idx}>
                  <DashboardCardHeader>
                    <DashboardCardTitle>{item.title}</DashboardCardTitle>
                  </DashboardCardHeader>

                  <DashboardCardContent>
                    <DashboardCardDl fields={item.fields}></DashboardCardDl>
                  </DashboardCardContent>
                </DashboardCard>
              );
            })}
          </div>
          <p>
            <a
              href={`https://wikipedia.org/wiki/${countryData?.names?.common}`}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-primary hover:underline'
            >
              Para mais informações clique aqui
            </a>
          </p>
        </>
      )}
    </div>
  );
}
