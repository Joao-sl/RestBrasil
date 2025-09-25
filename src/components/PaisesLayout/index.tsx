'use client';

import Image from 'next/image';
import { Fragment, useState } from 'react';
import { CountryMapped, CountryRaw } from '@/lib';
import { mapCountry } from '@/helpers/mappers';
import { fetchHandler } from '@/helpers';
import {
  IconBallFootball,
  IconBuilding,
  IconChessKingFilled,
  IconCurrencyYen,
  IconExternalLink,
  IconFlagFilled,
  IconGlobeFilled,
  IconLanguage,
  IconMeterSquare,
  IconSearch,
  IconSparkles,
  IconSwords,
  IconUsers,
  IconWorld,
} from '@tabler/icons-react';
import {
  Container,
  DashboardCard,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardDl,
  DashboardCardFeatured,
  DashboardCardHeader,
  DashboardCardItem,
  DashboardCardTitle,
  HeroButton,
  HeroCard,
  HeroCardContent,
  HeroCardDescription,
  HeroCardHeader,
  HeroCardTitle,
  HeroInput,
  LoadingSpinner,
} from '@/components/ui/';
import { cn } from '@/lib/utils';

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

  const cardNames = {
    title: (
      <>
        <IconLanguage /> Nomes
      </>
    ),
    description: 'Nomes do país em diferentes idiomas',
    fields: [
      {
        contentLabel: 'Comum',
        content:
          countryData?.names.commonNamePtBr || countryData?.names?.common,
      },
      {
        contentLabel: 'Oficial',
        content:
          countryData?.names.officialNamePtBr || countryData?.names?.official,
      },
      {
        contentLabel: 'Comum nas Linguas Nativas',
        content: countryData?.names.native?.map((v, idx) => (
          <Fragment key={idx}>
            <dt className='text-stone-500 dark:text-stone-400 font-semibold'>
              {v.language}
            </dt>
            <dd className='mb-1'>{v.common}</dd>
          </Fragment>
        )),
      },
      {
        contentLabel: 'Oficial nas Linguas Nativas',
        content: countryData?.names.native?.map((v, idx) => (
          <Fragment key={idx}>
            <dt className='text-stone-500 font-semibold inline w-fit'>
              {v.language}
            </dt>
            <dd className='mb-1 inline w-fit'>{v.official}</dd>
          </Fragment>
        )),
      },
    ],
  };

  const cardItems = [
    {
      title: (
        <>
          <IconGlobeFilled /> Geografia
        </>
      ),
      description: 'Informações geográficas e populacionais',

      featured: [
        {
          icon: <IconMeterSquare />,
          label: 'Area',
          value: `${countryData?.area?.toLocaleString('pt-BR')} km²`,
        },
        {
          icon: <IconUsers />,
          label: 'População',
          value: countryData?.population,
        },
      ],

      fields: [
        {
          contentLabel: 'Continente',
          content: countryData?.continent?.join('/'),
        },
        { contentLabel: 'Sub-Região', content: countryData?.subregion },

        {
          contentLabel: 'Fuso horários',
          content: [
            <Fragment key={'timezone'}>
              <dt className='sr-only'>Fuso horários</dt>
              <dd>{countryData?.timezone?.join(', ')}</dd>
            </Fragment>,
          ],
        },
      ],
    },

    {
      title: (
        <>
          <IconChessKingFilled /> Política
        </>
      ),
      description: 'Sistema político e informações econômicas',

      featured: [
        {
          icon: <IconBuilding />,
          label: 'Capital',
          value: countryData?.capital?.join(', '),
        },
        {
          icon: <IconCurrencyYen />,
          label: 'Moedas',
          value: countryData?.currencies
            ? Object.values(countryData?.currencies).map((v, idx) => {
                return (
                  <p key={idx}>
                    {v.name} ({v.symbol})
                  </p>
                );
              })
            : undefined,
        },
      ],

      fields: [
        {
          contentLabel: 'Código internet',
          content: countryData?.tld?.join(', '),
        },

        {
          contentLabel: 'Membro da ONU',
          content: countryData?.unMember,
        },
        {
          contentLabel: 'GINI',
          content: countryData?.gini
            ? Object.entries(countryData.gini).map(([key, value]) => {
                return (
                  <Fragment key={`${key}-${value}`}>
                    <dt className='sr-only'>GINI de {key}</dt>
                    <dd>
                      {key}: {value}
                    </dd>
                  </Fragment>
                );
              })
            : undefined,
        },
      ],
    },

    {
      title: (
        <>
          <IconSparkles /> Outros
        </>
      ),
      description: 'Detalhes culturais e práticos',

      featured: [
        {
          icon: <IconBallFootball />,
          label: 'Código FIFA',
          value: countryData?.fifa,
        },
        {
          icon: <IconSwords />,
          label: 'País independente',
          value: countryData?.independent,
        },
      ],

      fields: [
        {
          contentLabel: 'Lado de condução do carro',
          content: countryData?.car.side,
        },
        {
          contentLabel: 'Idiomas oficiais',
          content: [
            <Fragment key={'Idiomas oficiais'}>
              <dt className='sr-only'>Idiomas oficiais</dt>
              <dd>{countryData?.languages?.join(', ')}</dd>
            </Fragment>,
          ],
        },
      ],

      link: (
        <a
          href={countryData?.maps}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            'flex items-center justify-center gap-2 font-semibold',
            'p-3 mt-3 rounded-lg border text-sm border-stone-600 dark:text-stone-400',
            'text-stone-600 hover:bg-stone-600 transition hover:text-white',
          )}
        >
          <IconExternalLink size={18} /> Ver no google Maps
        </a>
      ),
    },
  ];

  const theme = {
    card: 'bg-gradient-to-br from-white to-stone-100 dark:bg-gradient-to-tl dark:from-card dark:to-card',
    title: '[&_svg]:text-stone-600 [&_svg]:bg-stone-100',
    featured: 'bg-stone-100 text-stone-600 dark:text-stone-400',
    dtClasses: 'border-stone-100',
    ddClasses: 'bg-stone-600',
  };

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

      {countryData && (
        <Container asChild className='pb-0 mt-6 space-y-8'>
          <section>
            <h3 id='result' aria-live='polite' className='sr-only'>
              Resultado da consulta{' '}
              {countryData.names.commonNamePtBr || countryData.names.common}
            </h3>
            <h3 className='text-center text-5xl font-bold mb-2'>
              {countryData.names.commonNamePtBr || countryData.names.common}
            </h3>
            <p className='text-xl text-muted-foreground text-center'>
              {countryData.names.officialNamePtBr || countryData.names.official}
            </p>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8'>
              <DashboardCard className={theme.card}>
                <DashboardCardHeader>
                  <DashboardCardTitle className={theme.title}>
                    <h4 className='flex items-center gap-2'>
                      {cardNames.title}
                    </h4>
                  </DashboardCardTitle>
                  <DashboardCardDescription>
                    <p>{cardNames.description}</p>
                  </DashboardCardDescription>
                </DashboardCardHeader>

                <DashboardCardContent>
                  <DashboardCardDl
                    fields={cardNames.fields}
                    className={theme.dtClasses}
                    ddClasses={theme.ddClasses}
                  />
                </DashboardCardContent>
              </DashboardCard>

              {countryData?.flags?.svg && (
                <DashboardCard
                  className={cn(
                    'justify-center lg:col-span-2 bg-gradient-to-br from-white to-stone-200/50',
                    'dark:bg-none dark:bg-card',
                  )}
                >
                  <DashboardCardHeader>
                    <DashboardCardTitle className='flex justify-center [&_svg]:p-0 [&_svg]:w-5 [&_svg]:h-5'>
                      <h4
                        className={cn(
                          'flex items-center gap-2 text-sm px-4 py-2 font-medium',
                          'text-stone-800 bg-stone-200 rounded-full mb-4 shadow-xs',
                        )}
                      >
                        <IconFlagFilled /> Bandeira Nacional
                      </h4>
                    </DashboardCardTitle>

                    <DashboardCardContent className='flex justify-center'>
                      <div>
                        <Image
                          src={countryData.flags?.svg}
                          alt={
                            countryData.flags?.alt ||
                            'Bandeira do país pesquisado'
                          }
                          width={320}
                          height={0}
                          sizes='100vw'
                          className='rounded-2xl object-contain border border-input'
                        />
                      </div>
                    </DashboardCardContent>
                  </DashboardCardHeader>
                </DashboardCard>
              )}

              {cardItems.map((item, idx) => {
                return (
                  <DashboardCard key={idx} className={theme?.card}>
                    <DashboardCardHeader>
                      <DashboardCardTitle className={theme?.title}>
                        <h3 className='flex items-center gap-2'>
                          {item.title}
                        </h3>
                      </DashboardCardTitle>
                      <DashboardCardDescription>
                        <p>{item.description}</p>
                      </DashboardCardDescription>
                    </DashboardCardHeader>

                    <DashboardCardContent>
                      {item.featured ? (
                        <DashboardCardFeatured className='grid grid-cols-2'>
                          {item.featured.map((v, i) => {
                            return (
                              <DashboardCardItem
                                key={`Featured Item - ${i}`}
                                item={v}
                                className={theme?.featured}
                              />
                            );
                          })}
                        </DashboardCardFeatured>
                      ) : null}

                      <DashboardCardDl
                        fields={item.fields}
                        className={theme?.dtClasses}
                        ddClasses={theme?.ddClasses}
                      />

                      {item.link ? item.link : null}
                    </DashboardCardContent>
                  </DashboardCard>
                );
              })}
            </div>

            <DashboardCard className='bg-gradient-to-br from-slate-50 to-emerald-50 dark:bg-none dark:bg-card'>
              <DashboardCardHeader className='text-center space-y-2'>
                <div className='flex justify-center'>
                  <span
                    className={cn(
                      'flex items-center gap-2 font-medium px-4 py-2 text-sm',
                      'rounded-full text-emerald-700 bg-emerald-100',
                    )}
                  >
                    <IconWorld stroke={1.5} size={18} /> Quer saber mais?
                  </span>
                </div>
                <DashboardCardTitle className='justify-center text-2xl font-bold'>
                  <h4>Explore informações detalhadas</h4>
                </DashboardCardTitle>
                <DashboardCardDescription>
                  <p>
                    Acesse dados completos sobre economia, cultura, história e
                    muito mais
                  </p>
                </DashboardCardDescription>
              </DashboardCardHeader>

              <DashboardCardContent className='flex justify-center'>
                <a
                  href={`https://pt.wikipedia.org/wiki/${countryData?.names?.commonNamePtBr}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm transition',
                    'bg-emerald-600 text-white rounded-md hover:bg-emerald-700',
                  )}
                >
                  <IconExternalLink size={18} /> Mais informações completas
                </a>
              </DashboardCardContent>
            </DashboardCard>
          </section>
        </Container>
      )}
    </>
  );
}
