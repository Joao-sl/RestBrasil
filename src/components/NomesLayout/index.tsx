'use client';

import { useState } from 'react';
import { fetchHandler } from '@/helpers';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type {
  NameBasic,
  NameMap,
  NameRanking,
  NameRange,
  NameUnion,
  StateData,
} from '@/lib';
import {
  IconChartLine,
  IconCrown,
  IconGlobe,
  IconGraphFilled,
  IconLaurelWreath1,
  IconMapPinFilled,
  IconSearch,
  IconTarget,
  IconTrendingUp,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import {
  Button,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Container,
  DashboardCard,
  DashboardCardAction,
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
  InputSelect,
  InputWrapper,
  Label,
  LoadingSpinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import clsx from 'clsx';

type NomesLayoutProps = {
  states: StateData[] | null;
};

type Data = {
  dataBasic: NameBasic | undefined;
  dataMap: NameMap[] | undefined;
  dataRange: NameRange[] | undefined;
  dataRanking: NameRanking[] | undefined;
};

export function NomesLayout({ states }: NomesLayoutProps) {
  const [isPending, setIsPending] = useState(false);
  const [noDataError, setNoDataError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [state, setState] = useState('BR');

  const [data, setData] = useState<Data | undefined>();

  const sexOptions = [
    { value: ' ', label: 'Ambos' },
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
  ];

  const stateOptions = [
    { value: 'BR', label: 'Brasil' },
    ...(states?.map(v => ({ value: v.ufId, label: v.ufNome })) || []),
  ];

  async function handleSearch() {
    const cleanedName = name.trim();
    setFormErrors([]);
    setNoDataError(null);
    setData(undefined);

    const validations = [
      {
        test: cleanedName.length < 2,
        message: 'O nome deve conter ao menos 2 letras.',
      },
      {
        test: cleanedName.includes(' '),
        message: 'Infelizmente, não há dados sobre nomes compostos.',
      },
    ];

    const errorArray = validations.filter(v => v.test).map(v => v.message);

    if (errorArray.length > 0) {
      setFormErrors(errorArray);
      return;
    }

    const params = new URLSearchParams();
    params.append('name', name);
    params.append('sex', sex);
    params.append('state', state);

    try {
      setIsPending(true);
      const { data, error, status } = await fetchHandler<NameUnion>(
        `/api/names?${params}`,
      );

      if (error || status < 200 || status > 299) {
        setNoDataError(error);
        return;
      }

      setData({
        dataBasic: data?.dataBasic,
        dataMap: data?.dataMap,
        dataRange: data?.dataRange,
        dataRanking: data?.dataRanking,
      });
      setName('');
    } finally {
      setIsPending(false);
    }
  }

  const statisticsCard = {
    title: (
      <h3 className='inline-flex items-center gap-2'>
        <IconChartLine /> Estatísticas
      </h3>
    ),
    description: <p>Análise baseada nos dados do IBGE.</p>,

    featured: [
      {
        icon: <IconCrown />,
        label: 'Ranking',
        value: `${data?.dataBasic?.rank.toLocaleString('pt-BR')}°`,
      },
      {
        icon: <IconUsers />,
        label: 'Pessoas',
        value: data?.dataBasic?.freq.toLocaleString('pt-BR'),
      },
    ],

    fields: [
      {
        contentLabel: 'Porcentagem ',
        content: `${
          data?.dataBasic?.percentual.toFixed(2) === '0.00'
            ? '0.01'
            : data?.dataBasic?.percentual.toFixed(2)
        }%`,
      },
      {
        contentLabel: 'Estado Líder',
        content: data?.dataBasic?.ufMax,
      },
      {
        contentLabel: 'Taxa por 100k hab.',
        content:
          Number(data?.dataBasic?.ufMaxProp).toFixed(2) ?? 'Indisponível',
      },
      {
        contentLabel: 'Nomes Semelhantes',
        content: [
          <dt key={'dt-links'} className='sr-only'>
            Nomes Semelhantes
          </dt>,
          <dd key={'name-links'} className='space-x-3 space-y-1'>
            {data?.dataBasic?.nomes
              ? data?.dataBasic?.nomes?.split(',').map((name, idx) => {
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

  const higherBirthRate = data?.dataRange?.reduce(
    (acc, item) => (item.freq > acc.freq ? item : acc),
    data.dataRange[0],
  );

  const statisticsTheme = {
    card: 'bg-gradient-to-br from-white to-blue-50 dark:bg-none dark:bg-card',
    title: '[&_svg]:text-blue-700 [&_svg]:bg-blue-50 [&_svg]:text-blue-500',
    featured:
      'bg-blue-50 text-blue-700 [&_svg]:h-7 [&_svg]:w-7 text-lg dark:text-blue-500',
    dtClasses: 'border-blue-100',
    ddClasses: 'bg-blue-700',
  };

  const chartTheme = {
    card: 'bg-gradient-to-br from-white to-blue-100 dark:bg-none dark:bg-card',
    title:
      '[&_svg]:text-blue-700 [&_svg]:bg-gradient-to-br [&_svg]:from-blue-100 [&_svg]:to-violet-100',
    fill: 'oklch(48.8% 0.243 264.376)',
  };

  const tableCard = {
    card: 'bg-gradient-to-br from-slate-50 to-slate-200 dark:bg-none dark:bg-card',
    title:
      '[&_svg]:text-slate-700 [&_svg]:bg-gradient-to-br [&_svg]:from-slate-300 [&_svg]:to-blue-100',
  };

  const chartConfig = {
    freq: {
      label: 'Pessoas: ',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  const NoDataErrorJsx = (
    <span role='status' className='text-red-500 font-semibold'>
      Desculpe, não conseguimos recuperar esses dados.
    </span>
  );

  return (
    <>
      <HeroCard className='overflow-visible'>
        <HeroCardHeader>
          <HeroCardTitle>Pesquise um nome</HeroCardTitle>
          <HeroCardDescription>
            Não é necessário colocar acentuação nos nomes
          </HeroCardDescription>
        </HeroCardHeader>

        <HeroCardContent className='grid gap-6 sm:gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]'>
          <InputWrapper>
            <Label htmlFor='name' className=''>
              <IconUser size={20} color='oklch(48.8% 0.243 264.376)' />
              Nome
            </Label>

            <HeroInput
              id='name'
              value={name}
              icon={<IconSearch />}
              placeholder='Ex: Lara, Larissa, Soph...'
              onChange={e => setName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch();
              }}
              disabled={isPending}
              autoComplete='on'
              aria-disabled={isPending}
              aria-invalid={!!noDataError || formErrors.length > 0}
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor='sex'>
              <IconTarget size={20} color='oklch(62.7% 0.265 303.9)' /> Gênero
            </Label>
            <InputSelect
              inputId='sex'
              name='sex'
              options={sexOptions}
              defaultValue={sexOptions[0]}
              isSearchable={false}
              aria-label='Opções de sexo'
              onChange={option => setSex((option as { value: string }).value)}
              isDisabled={isPending}
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor='states'>
              <IconGlobe size={20} color='oklch(72.3% 0.219 149.579)' /> Estado
            </Label>
            <InputSelect
              inputId='states'
              name='states'
              options={stateOptions}
              defaultValue={stateOptions[0]}
              aria-label='Estado especifico ou todo o brasil'
              noOptionsMessage={() => 'Estado não encontrado'}
              onChange={option => setState((option as { value: string }).value)}
              isDisabled={isPending}
            />
          </InputWrapper>

          <HeroButton
            id='search'
            name='search'
            disabled={isPending}
            onClick={handleSearch}
            className='min-w-24 self-end bg-gradient-to-br from-blue-600  to-blue-800'
          >
            {isPending ? <LoadingSpinner color='white' /> : <IconSearch />}
            {isPending ? '' : 'Buscar'}
          </HeroButton>
        </HeroCardContent>

        {(formErrors.length > 0 || noDataError) && (
          <div
            id='error'
            role='alert'
            className='text-left w-full text-sm font-medium text-red-500'
          >
            {formErrors.length > 0 ? (
              formErrors.map((item, idx) => {
                return (
                  <span key={idx} className='block'>
                    {item}
                  </span>
                );
              })
            ) : (
              <span>{noDataError}</span>
            )}
          </div>
        )}
      </HeroCard>

      {data && (
        <Container asChild className='space-y-8 pb-0'>
          <section>
            {isPending && (
              <div className='flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            )}

            <h1 className='text-slate-700 text-center text-6xl font-bold dark:text-slate-200'>
              {data?.dataBasic?.nome}
            </h1>

            <div className='grid grid-cols-1 lg:grid-cols-[33%_auto] gap-8'>
              <DashboardCard className={statisticsTheme.card}>
                <DashboardCardHeader>
                  <DashboardCardTitle className={statisticsTheme.title}>
                    {statisticsCard.title}
                  </DashboardCardTitle>
                  <DashboardCardDescription>
                    {statisticsCard.description}
                  </DashboardCardDescription>
                </DashboardCardHeader>

                <DashboardCardContent className='space-y-6'>
                  {data?.dataBasic ? (
                    <>
                      <DashboardCardFeatured className='grid grid-cols-2 gap-4'>
                        {statisticsCard.featured.map((item, idx) => (
                          <DashboardCardItem
                            item={item}
                            key={idx}
                            className={statisticsTheme.featured}
                          />
                        ))}
                      </DashboardCardFeatured>

                      <DashboardCardDl
                        fields={statisticsCard.fields}
                        ddClasses={statisticsTheme.ddClasses}
                        className={statisticsTheme.dtClasses}
                      />
                    </>
                  ) : (
                    NoDataErrorJsx
                  )}
                </DashboardCardContent>
              </DashboardCard>

              <DashboardCard className={chartTheme.card}>
                <DashboardCardHeader>
                  <DashboardCardTitle className={chartTheme.title}>
                    <IconTrendingUp />{' '}
                    <h3>
                      Popularidade do nome{' '}
                      <span className='bg-gradient-to-br from-blue-600 to-violet-600 text-transparent bg-clip-text'>
                        {data?.dataBasic?.nome}
                      </span>
                    </h3>
                  </DashboardCardTitle>
                  <DashboardCardDescription>
                    <p>Popularidade ao longo das décadas</p>
                  </DashboardCardDescription>

                  {higherBirthRate && (
                    <DashboardCardAction>
                      <p className='text-xl sm:text-2xl font-semibold'>
                        {higherBirthRate.freq.toLocaleString('pt-BR')}
                      </p>
                      <p className='text-sm text-right text-muted-foreground'>
                        Pico em {higherBirthRate.faixa.slice(1, 5)}
                      </p>
                    </DashboardCardAction>
                  )}
                </DashboardCardHeader>

                <DashboardCardContent>
                  {Array.isArray(data?.dataRange) ? (
                    <>
                      {data?.dataRange.length > 0 ? (
                        <ChartContainer config={chartConfig}>
                          <AreaChart accessibilityLayer data={data?.dataRange}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey='faixa'
                              tickLine={true}
                              tickMargin={10}
                              axisLine={true}
                              tickFormatter={value => value.slice(1, 5)}
                            />
                            <YAxis
                              tickLine={true}
                              axisLine={true}
                              tickFormatter={value =>
                                value.toLocaleString('pt-BR')
                              }
                            />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator='line' />}
                            />
                            <Area
                              dataKey='freq'
                              type='natural'
                              fill={chartTheme.fill}
                              stroke={chartTheme.fill}
                              strokeWidth={2}
                              fillOpacity={0.4}
                            />
                          </AreaChart>
                        </ChartContainer>
                      ) : (
                        <p
                          className={clsx(
                            'flex items-center justify-center gap-2',
                            'text-yellow-800 font-semibold text-lg px-5 py-4',
                            'bg-yellow-100 border border-yellow-300 rounded-md',
                          )}
                        >
                          <span>
                            <IconGraphFilled size={30} />
                          </span>
                          Gráfico Indisponível
                        </p>
                      )}
                    </>
                  ) : (
                    NoDataErrorJsx
                  )}
                </DashboardCardContent>
              </DashboardCard>
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
              <DashboardCard className={tableCard.card}>
                <DashboardCardHeader>
                  <DashboardCardTitle className={tableCard.title}>
                    <IconMapPinFilled /> <h3>Tabela Por Estado</h3>
                  </DashboardCardTitle>
                  <DashboardCardDescription>
                    <p>
                      Ranking dos estados com maior concentração do nome
                      pesquisado.
                    </p>
                  </DashboardCardDescription>
                </DashboardCardHeader>

                <DashboardCardContent
                  className={clsx(
                    'h-120 overflow-auto relative [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
                    '[&::-webkit-scrollbar-track]:bg-slate-700/10 [&::-webkit-scrollbar-thumb]:bg-slate-700',
                    '[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full',
                  )}
                >
                  {Array.isArray(data?.dataMap) ? (
                    <Table
                      className='overflow-visible'
                      wrapperClasses='overflow-visible'
                    >
                      <TableHeader className='bg-slate-700 sticky top-0 z-1'>
                        <TableRow className='border-muted hover:bg-transparent'>
                          <TableHead className='text-white rounded-tl-md'>
                            Estado
                          </TableHead>
                          <TableHead className='text-right text-white'>
                            População
                          </TableHead>
                          <TableHead className='text-right text-white'>
                            Quantidade
                          </TableHead>
                          <TableHead className='text-right text-white rounded-tr-md'>
                            Taxa/100k
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody className='[&_tr:last-child]:border-b'>
                        {data?.dataMap.map((item, idx) => {
                          return (
                            <TableRow
                              key={idx}
                              className={clsx(
                                'font-medium border-slate-200 hover:bg-slate-200',
                                'dark:border-slate-700 dark:hover:bg-slate-800',
                              )}
                            >
                              <TableCell className='py-3 min-w-38'>
                                {item.nome}
                              </TableCell>
                              <TableCell className='text-right text-muted-foreground py-3'>
                                {item.populacao.toLocaleString('pt-BR')}
                              </TableCell>
                              <TableCell className='text-right py-3 text-muted-foreground'>
                                {item.freq.toLocaleString('pt-BR')}
                              </TableCell>
                              <TableCell className='text-right py-3 text-muted-foreground'>
                                {item.prop.toLocaleString('pt-BR')}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    NoDataErrorJsx
                  )}
                </DashboardCardContent>
              </DashboardCard>

              <DashboardCard className={tableCard.card}>
                <DashboardCardHeader>
                  <DashboardCardTitle className={tableCard.title}>
                    <IconLaurelWreath1 /> <h3>Top 20 Nomes</h3>
                  </DashboardCardTitle>
                  <DashboardCardDescription>
                    <p>
                      Esse ranking de nomes é baseado nos parâmetros sexo e
                      estado da pesquisa.
                    </p>
                  </DashboardCardDescription>
                </DashboardCardHeader>

                <DashboardCardContent className='grid grid-cols-2'>
                  {Array.isArray(data?.dataRanking) ? (
                    <Table className='overflow-hidden rounded-tl-md'>
                      <TableHeader className='bg-slate-700'>
                        <TableRow className='hover:bg-transparent'>
                          <TableHead className='text-white'>Rank</TableHead>
                          <TableHead className='text-white'>Nome</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody className='[&_tr:last-child]:border-b'>
                        {data?.dataRanking.slice(0, 10).map((item, idx) => {
                          return (
                            <TableRow
                              key={idx}
                              className={clsx(
                                'font-medium border-slate-200 hover:bg-slate-200',
                                'dark:border-slate-700 dark:hover:bg-slate-800',
                              )}
                            >
                              <TableCell className='py-3'>
                                {item.rank}°
                              </TableCell>
                              <TableCell className='py-3 text-muted-foreground'>
                                {item.nome}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    NoDataErrorJsx
                  )}

                  {Array.isArray(data?.dataRanking) ? (
                    <Table className='overflow-hidden rounded-tr-md'>
                      <TableHeader className='bg-slate-700'>
                        <TableRow className='hover:bg-transparent'>
                          <TableHead className='text-white'>Rank</TableHead>
                          <TableHead className='text-white'>Nome</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody className='[&_tr:last-child]:border-b'>
                        {data?.dataRanking.slice(10).map((item, idx) => {
                          return (
                            <TableRow
                              key={idx}
                              className={clsx(
                                'font-medium border-slate-200 hover:bg-slate-200',
                                'dark:border-slate-700 dark:hover:bg-slate-800',
                              )}
                            >
                              <TableCell className='py-3'>
                                {item.rank}°
                              </TableCell>
                              <TableCell className='py-3 text-muted-foreground'>
                                {item.nome}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    NoDataErrorJsx
                  )}
                </DashboardCardContent>
              </DashboardCard>
            </div>
          </section>
        </Container>
      )}
    </>
  );
}
