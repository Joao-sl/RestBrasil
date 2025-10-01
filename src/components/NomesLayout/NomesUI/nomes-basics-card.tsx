'use client';

import { NameBasic } from '@/lib';
import { IconChartLine, IconCrown, IconUsers } from '@tabler/icons-react';
import {
  Button,
  DashboardCard,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardDl,
  DashboardCardFeatured,
  DashboardCardHeader,
  DashboardCardItem,
  DashboardCardTitle,
} from '@/components/ui';

type NamesBasicsCardProps = {
  data: NameBasic | undefined;
  noDataError?: React.ReactNode;
  setName: (value: string) => void;
};

export function NomesBasicsCard({
  data,
  noDataError,
  setName,
}: NamesBasicsCardProps) {
  const nameBasicsData = {
    title: (
      <h3 className='inline-flex items-center gap-2'>
        <IconChartLine /> Informações Básicas
      </h3>
    ),
    description: <p>Análise baseada nos dados do IBGE.</p>,

    featured: [
      {
        icon: <IconCrown />,
        label: 'Ranking',
        value: `${data?.rank.toLocaleString('pt-BR')}°`,
      },
      {
        icon: <IconUsers />,
        label: 'Pessoas',
        value: data?.freq.toLocaleString('pt-BR'),
      },
    ],

    fields: [
      {
        contentLabel: 'Porcentagem ',
        content: `${
          data?.percentual.toFixed(2) === '0.00'
            ? '0.01'
            : data?.percentual.toFixed(2)
        }%`,
      },
      {
        contentLabel: 'Estado Líder',
        content: data?.ufMax,
      },
      {
        contentLabel: 'Taxa por 100k hab.',
        content: Number(data?.ufMaxProp).toFixed(2) ?? 'Indisponível',
      },
      {
        contentLabel: 'Nomes Semelhantes',
        content: [
          <dt key={'dt-links'} className='sr-only'>
            Nomes Semelhantes
          </dt>,
          <dd key={'name-links'} className='space-x-3 space-y-1'>
            {data?.nomes
              ? data?.nomes?.split(',').map((name, idx) => {
                  return (
                    <Button
                      onClick={() => {
                        setName(name);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        window.document.getElementById('name')?.focus();
                      }}
                      variant={'link'}
                      key={idx}
                      className='p-0 text-blue-700 dark:text-blue-500'
                    >
                      {name}
                    </Button>
                  );
                })
              : 'Indisponível'}
          </dd>,
        ],
      },
    ],
  };

  const nameBasicsTheme = {
    card: 'bg-gradient-to-br from-white to-blue-50 dark:bg-none dark:bg-card',
    title: '[&_svg]:text-blue-700 [&_svg]:bg-blue-50 [&_svg]:text-blue-500',
    featured:
      'bg-blue-50 text-blue-700 [&_svg]:h-7 [&_svg]:w-7 text-lg dark:text-blue-500',
    dtClasses: 'border-blue-100',
    ddClasses: 'bg-blue-700',
  };

  return (
    <DashboardCard className={nameBasicsTheme.card}>
      <DashboardCardHeader>
        <DashboardCardTitle className={nameBasicsTheme.title}>
          {nameBasicsData.title}
        </DashboardCardTitle>
        <DashboardCardDescription>
          {nameBasicsData.description}
        </DashboardCardDescription>
      </DashboardCardHeader>

      <DashboardCardContent className='space-y-6'>
        {data ? (
          <>
            <DashboardCardFeatured className='grid grid-cols-2 gap-4'>
              {nameBasicsData.featured.map((item, idx) => (
                <DashboardCardItem
                  item={item}
                  key={idx}
                  className={nameBasicsTheme.featured}
                />
              ))}
            </DashboardCardFeatured>

            <DashboardCardDl
              fields={nameBasicsData.fields}
              ddClasses={nameBasicsTheme.ddClasses}
              className={nameBasicsTheme.dtClasses}
            />
          </>
        ) : (
          noDataError ?? <span>Não foi possível recuperar os dados.</span>
        )}
      </DashboardCardContent>
    </DashboardCard>
  );
}
