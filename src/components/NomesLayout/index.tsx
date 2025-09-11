'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { fetchHandler } from '@/helpers';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type {
  NameBasic,
  NameMap,
  NameRanking,
  NameRange,
  NameUnion,
  StateData,
} from '@/lib';
import {
  Button,
  Card,
  CardContent,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  DashboardCard,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardDl,
  DashboardCardHeader,
  DashboardCardTitle,
  Input,
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

type NomesLayoutProps = {
  states: StateData[] | null;
};

export function NomesLayout({ states }: NomesLayoutProps) {
  const [isPending, setIsPending] = useState(false);
  const [noDataError, setNoDataError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [state, setState] = useState('BR');

  const [dataBasic, setDataBasic] = useState<NameBasic[] | string>('');
  const [dataMap, setDataMap] = useState<NameMap[] | string>('');
  const [dataRange, setDataRange] = useState<NameRange[] | string>('');
  const [dataRanking, setDataRanking] = useState<NameRanking[] | string>('');

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
    setDataBasic('');
    setDataRange('');
    setDataRanking('');
    setDataMap('');

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

      const errorMsg = 'Erro ao recuperar os dados.';
      setDataBasic(data?.dataBasic || errorMsg);
      setDataMap(data?.dataMap || errorMsg);
      setDataRange(data?.dataRange || errorMsg);
      setDataRanking(data?.dataRanking || errorMsg);
      setName('');
    } finally {
      setIsPending(false);
    }
  }

  const chartConfig = {
    freq: {
      label: 'Pessoas:',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  const errorClasses = 'text-red-500 font-semibold';
  const rankingSliced = [
    dataRanking.slice(0, dataRanking.length / 2),
    dataRanking.slice(dataRanking.length / 2),
  ];

  const basicCardItems = Array.isArray(dataBasic)
    ? [
        {
          fields: [
            {
              contentLabel: 'Ranking',
              content: `${dataBasic[0].rank}°`,
            },
            {
              contentLabel: 'Quantidade',
              content: `${dataBasic[0].freq.toLocaleString('pt-BR')} Pessoas`,
            },
            {
              contentLabel: 'Porcentagem',
              content: `${
                dataBasic[0].percentual.toFixed(2) === '0.00'
                  ? '0.01'
                  : dataBasic[0].percentual.toFixed(2)
              }%`,
            },
          ],
        },
        {
          fields: [
            {
              contentLabel: 'Maior taxa por 100.000 pessoas',
              content: dataBasic[0].ufMax,
            },
            { contentLabel: 'Taxa', content: dataBasic[0]?.ufMaxProp },
            {
              contentLabel: 'Nomes semelhantes',
              content: (
                <div>
                  {dataBasic[0].nomes.split(',').map((name, idx) => {
                    return (
                      <Button
                        onClick={() => {
                          setName(name);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          window.document.getElementById('nome')?.focus();
                        }}
                        variant={'link'}
                        key={idx}
                      >
                        {name}
                      </Button>
                    );
                  })}
                </div>
              ),
            },
          ],
        },
      ]
    : 'Erro ao recuperar dados';

  return (
    <div className='space-y-6'>
      <Card>
        <CardContent>
          <div className='grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-6'>
            <InputWrapper>
              <Label htmlFor='nome'>Nome</Label>
              <Input
                id='nome'
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSearch();
                }}
                disabled={isPending}
                aria-disabled={isPending}
              ></Input>
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor='sex'>Sexo</Label>
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
              <Label htmlFor='states'>Localidade</Label>
              <InputSelect
                inputId='states'
                name='states'
                options={stateOptions}
                defaultValue={stateOptions[0]}
                aria-label='As opções são os estados brasileiros ou Brasil.'
                noOptionsMessage={() => 'Estado não encontrado'}
                onChange={option =>
                  setState((option as { value: string }).value)
                }
                isDisabled={isPending}
              />
            </InputWrapper>

            <div className='flex items-baseline-last'>
              <Button
                id='search'
                name='search'
                disabled={isPending}
                onClick={handleSearch}
              >
                <span className='flex justify-center w-12'>
                  {isPending ? <LoadingSpinner color='white' /> : 'Buscar'}
                </span>
              </Button>
            </div>
          </div>

          {formErrors.length > 0 && (
            <div id='error' role='alert'>
              <span className='text-red-600'>{formErrors}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {noDataError && (
        <div>
          <span
            role='alert'
            className='mt-4 p-6 w-full bg-red-400 rounded-md text-white font-semibold'
          >
            {noDataError}
          </span>
        </div>
      )}

      {isPending && (
        <div className='flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}

      <section
        id='basic-info-and-chart'
        className='grid grid-cols-1 lg:grid-cols-[30vw_auto] gap-8 mt-8'
      >
        {dataBasic && (
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Infos</DashboardCardTitle>
              <DashboardCardDescription>
                Informações básicas de acordos com a pesquisa
              </DashboardCardDescription>
            </DashboardCardHeader>

            <DashboardCardContent className='space-y-6'>
              {Array.isArray(basicCardItems) ? (
                basicCardItems.map((item, idx) => {
                  return (
                    <>
                      <DashboardCardDl
                        key={idx}
                        fields={item.fields}
                      ></DashboardCardDl>
                    </>
                  );
                })
              ) : (
                <p className={errorClasses}>{basicCardItems}</p>
              )}
            </DashboardCardContent>
          </DashboardCard>
        )}

        {(dataRange && (
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>
                {Array.isArray(dataBasic) ? dataBasic[0].nome : 'Gráfico'}
              </DashboardCardTitle>
              <DashboardCardDescription>
                Gráfico de nascimentos a cada década
              </DashboardCardDescription>
            </DashboardCardHeader>

            <DashboardCardContent>
              {Array.isArray(dataRange) && (
                <ChartContainer config={chartConfig} className='w-full'>
                  <BarChart accessibilityLayer data={dataRange}>
                    <CartesianGrid vertical={false} />
                    <YAxis
                      tickLine={true}
                      axisLine={false}
                      tickFormatter={value => value.toLocaleString('pt-BR')}
                    />
                    <XAxis
                      dataKey='faixa'
                      tickLine={false}
                      tickMargin={10}
                      axisLine={true}
                      tickFormatter={value => value.slice(1, 5)}
                    ></XAxis>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey='freq' fill='var(--chart-1)' radius={8}></Bar>
                  </BarChart>
                </ChartContainer>
              )}
            </DashboardCardContent>
          </DashboardCard>
        )) || <p className={errorClasses}>{dataRange.toString()}</p>}
      </section>

      {dataMap && (
        <section id='table-by-state'>
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Tabela Por Estado</DashboardCardTitle>
              <DashboardCardDescription>
                Tabela com estado, população, quantidade pessoas com o nome
                pesquisado e a taxa a cada 100 mil pessoas
              </DashboardCardDescription>
            </DashboardCardHeader>

            <DashboardCardContent className='h-120 overflow-auto'>
              {Array.isArray(dataMap) ? (
                <Table className='rounded-t-md overflow-hidden'>
                  <TableHeader className='bg-primary'>
                    <TableRow className='border-muted hover:bg-transparent'>
                      <TableHead className='text-white'>Estado</TableHead>
                      <TableHead className='text-right text-white'>
                        População
                      </TableHead>
                      <TableHead className='text-right text-white'>
                        Quantidade
                      </TableHead>
                      <TableHead className='text-right text-white'>
                        A cada 100 mil
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {dataMap.map((item, idx) => {
                      return (
                        <TableRow
                          key={idx}
                          className='font-medium border-muted'
                        >
                          <TableCell className='py-3 min-w-40'>
                            {item.nome}
                          </TableCell>
                          <TableCell className='text-right py-3 min-w-35'>
                            {item.populacao.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell className='text-right py-3 min-w-35'>
                            {item.freq.toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell className='text-right py-3 min-w-35'>
                            {item.prop.toLocaleString('pt-BR')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <p className={errorClasses}>{dataMap.toString()}</p>
              )}
            </DashboardCardContent>
          </DashboardCard>
        </section>
      )}

      {dataRanking && (
        <section id='ranking-by-search-params'>
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Ranking</DashboardCardTitle>
              <DashboardCardDescription>
                Esse ranking é baseado nos parâmetros da pesquisa.
              </DashboardCardDescription>
            </DashboardCardHeader>

            <DashboardCardContent>
              {Array.isArray(dataRanking) &&
              rankingSliced.every(array => Array.isArray(array)) ? (
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                  {rankingSliced.map((item, idx) => {
                    return (
                      <Table key={idx} className='rounded-t-md overflow-hidden'>
                        <TableHeader className='bg-primary'>
                          <TableRow
                            className={clsx(
                              idx === 1 ? 'hidden sm:table-row' : '',
                              'border-muted hover:bg-transparent',
                            )}
                          >
                            <TableHead className='text-white'>
                              Ranking
                            </TableHead>
                            <TableHead className='text-white text-right'>
                              Nome
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody
                          className={clsx(
                            idx === 0
                              ? '[&_tr:last-child]:border-b-1 sm:[&_tr:last-child]:border-b-0'
                              : '',
                          )}
                        >
                          {item.map((data, i) => {
                            return (
                              <TableRow
                                key={i}
                                className='border-muted font-medium'
                              >
                                <TableCell>{data.rank}°</TableCell>
                                <TableCell className='text-right text-muted-foreground py-2.5'>
                                  {data.nome}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    );
                  })}
                </div>
              ) : (
                <p className={errorClasses}>{dataRanking.toString()}</p>
              )}
            </DashboardCardContent>
          </DashboardCard>
        </section>
      )}
    </div>
  );
}
