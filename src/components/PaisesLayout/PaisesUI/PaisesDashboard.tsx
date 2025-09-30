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
} from '@/components/ui';
import { CountryMapped } from '@/lib';
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
  IconSparkles,
  IconSwords,
  IconUsers,
  IconWorld,
} from '@tabler/icons-react';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';

type PaisesDashboardProps = {
  data: CountryMapped | undefined;
};

export function PaisesDashboard({ data }: PaisesDashboardProps) {
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
        content: data?.names.commonNamePtBr || data?.names?.common,
      },
      {
        contentLabel: 'Oficial',
        content: data?.names.officialNamePtBr || data?.names?.official,
      },
      {
        contentLabel: 'Comum nas Linguas Nativas',
        content: data?.names.native?.map((v, idx) => (
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
        content: data?.names.native?.map((v, idx) => (
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
          value: `${data?.area?.toLocaleString('pt-BR')} km²`,
        },
        {
          icon: <IconUsers />,
          label: 'População',
          value: data?.population,
        },
      ],
      fields: [
        {
          contentLabel: 'Continente',
          content: data?.continent?.join('/'),
        },
        { contentLabel: 'Sub-Região', content: data?.subregion },

        {
          contentLabel: 'Fuso horários',
          content: [
            <Fragment key={'timezone'}>
              <dt className='sr-only'>Fuso horários</dt>
              <dd>{data?.timezone?.join(', ')}</dd>
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
          value: data?.capital?.join(', '),
        },
        {
          icon: <IconCurrencyYen />,
          label: 'Moedas',
          value: data?.currencies
            ? Object.values(data?.currencies).map((v, idx) => {
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
        { contentLabel: 'Código internet', content: data?.tld?.join(', ') },
        { contentLabel: 'Membro da ONU', content: data?.unMember },
        {
          contentLabel: 'GINI',
          content: data?.gini
            ? Object.entries(data.gini).map(([key, value]) => {
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
          value: data?.fifa,
        },
        {
          icon: <IconSwords />,
          label: 'País independente',
          value: data?.independent,
        },
      ],
      fields: [
        { contentLabel: 'Lado de condução do carro', content: data?.car.side },
        {
          contentLabel: 'Idiomas oficiais',
          content: [
            <Fragment key={'Idiomas oficiais'}>
              <dt className='sr-only'>Idiomas oficiais</dt>
              <dd>{data?.languages?.join(', ')}</dd>
            </Fragment>,
          ],
        },
      ],
      link: (
        <a
          href={data?.maps}
          target='_blank'
          rel='noopener noreferrer'
          className={clsx(
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
      {data && (
        <Container asChild className='pb-0 mt-6 space-y-8'>
          <section>
            <h3 id='result' aria-live='polite' className='sr-only'>
              Resultado da consulta{' '}
              {data.names.commonNamePtBr || data.names.common}
            </h3>
            <h3 className='text-center text-5xl font-bold mb-2'>
              {data.names.commonNamePtBr || data.names.common}
            </h3>
            <p className='text-xl text-muted-foreground text-center'>
              {data.names.officialNamePtBr || data.names.official}
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

              {data?.flags?.svg && (
                <DashboardCard
                  className={clsx(
                    'justify-center lg:col-span-2 bg-gradient-to-br from-white to-stone-200/50',
                    'dark:bg-none dark:bg-card',
                  )}
                >
                  <DashboardCardHeader>
                    <DashboardCardTitle className='flex justify-center [&_svg]:p-0 [&_svg]:w-5 [&_svg]:h-5'>
                      <h4
                        className={clsx(
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
                          src={data.flags?.svg}
                          alt={data.flags?.alt || 'Bandeira do país pesquisado'}
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
                    className={clsx(
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
                  href={`https://pt.wikipedia.org/wiki/${data?.names?.commonNamePtBr}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={clsx(
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
