'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { fetchHandler } from '@/helpers';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type {
  NameBasic,
  NameMap,
  NameRaking,
  NameRange,
  NameUnion,
  StateData,
} from '@/lib';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Input,
  InputSelect,
  InputWrapper,
  Label,
  LoadingSpinner,
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
  const [dataRanking, setDataRanking] = useState<NameRaking[] | string>('');

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

  const titleClasses = 'text-2xl font-semibold mb-4';
  const errorClasses = 'text-red-500 font-semibold';

  return (
    <>
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
          <h3
            role='alert'
            className='mt-4 p-6 bg-red-400 rounded-md text-white font-semibold'
          >
            {noDataError}
          </h3>
        </div>
      )}

      {isPending && (
        <div className='flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-[30vw_auto] gap-8 mt-8'>
        {dataBasic && (
          <Card>
            <CardContent>
              <h3 className={titleClasses}>Infos</h3>

              {(Array.isArray(dataBasic) && (
                <div>
                  <div className='flex justify-between'>
                    <span>Ranking</span>
                    <span>
                      {dataBasic[0].rank
                        ? `${dataBasic[0].rank}°`
                        : 'Não ranqueado'}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Quantidade</span>
                    <span>
                      {dataBasic[0]?.freq.toLocaleString('pt-BR')} Pessoas
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Porcentagem</span>
                    <span>{dataBasic[0].percentual.toFixed(2)}%</span>
                  </div>

                  <h3 className='mt-4 font-semibold'>
                    Maior taxa (100 mil pessoas)
                  </h3>
                  <div className='flex justify-between'>
                    <span>Estado</span>
                    <span>{dataBasic[0]?.ufMax}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Taxa</span>
                    <span>{Number(dataBasic[0]?.ufMaxProp).toFixed(2)}</span>
                  </div>

                  <h3 className='font-semibold mt-6'>Nomes semelhantes</h3>
                  {dataBasic[0]?.nomes.split(',').map((v, i) => {
                    return (
                      <Button
                        onClick={() => {
                          setName(v);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          window.document.getElementById('nome')?.focus();
                        }}
                        variant={'link'}
                        key={i}
                      >
                        {v}
                      </Button>
                    );
                  })}
                </div>
              )) || <p className={errorClasses}>{dataBasic.toString()}</p>}
            </CardContent>
          </Card>
        )}

        {(dataRange && (
          <Card>
            <CardHeader>
              <CardTitle>
                {Array.isArray(dataBasic) ? dataBasic[0].nome : 'Gráfico'}
              </CardTitle>
              <CardDescription>
                Gráfico de nascimentos a cada década
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Array.isArray(dataRange) && (
                <ChartContainer
                  config={chartConfig}
                  className='min-h-[400px] w-full'
                >
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
            </CardContent>
          </Card>
        )) || <p className={errorClasses}>{dataRange.toString()}</p>}

        {dataMap && (
          <Card className='lg:col-span-2'>
            <CardContent>
              <h3 className={titleClasses}>Tabela Por Estado</h3>

              {(Array.isArray(dataMap) && (
                <div className='rounded-lg max-h-120 sm:max-h-[600px] overflow-auto font-medium'>
                  <table className='min-w-full sm:w-full sm:table-fixed'>
                    <thead className='bg-primary sticky top-0 z-10 text-gray-100'>
                      <tr>
                        <th scope='col' className='text-left px-4 py-4'>
                          Estado
                        </th>
                        <th scope='col' className='text-right px-4 py-4'>
                          População
                        </th>
                        <th scope='col' className='text-right px-4 py-4'>
                          Quantidade
                        </th>
                        <th
                          scope='col'
                          className='text-right px-4 py-4 min-w-36'
                        >
                          A cada 100 mil
                        </th>
                      </tr>
                    </thead>

                    <tbody className='text-sm'>
                      {dataMap.map((v, i) => {
                        return (
                          <tr
                            className={clsx(
                              'hover:bg-muted border-b',
                              'border-muted text-gray-600 dark:text-white/80',
                            )}
                            key={i}
                          >
                            <td className='px-4 py-3.5 min-w-42'>{v.nome}</td>
                            <td className='text-right px-4 py-3'>
                              {v.populacao}
                            </td>
                            <td className='text-right px-4 py-3'>{v.freq}</td>
                            <td className='text-right px-4 py-3'>{v.prop}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )) || <p className={errorClasses}>{dataMap.toString()}</p>}
            </CardContent>
          </Card>
        )}

        {dataRanking && (
          <Card className='lg:col-span-2'>
            <CardContent>
              <h3 className={titleClasses}>
                Ranking baseado nos parâmetros da pesquisa
              </h3>

              {(Array.isArray(dataRanking) && (
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                  <div>
                    <div className='flex justify-between bg-primary p-2 font-bold rounded-t-md'>
                      <span>Nome</span>
                      <span>Ranking</span>
                    </div>
                    {dataRanking
                      .slice(0, dataRanking.length / 2)
                      .map((v, i) => (
                        <div
                          key={i}
                          className='flex justify-between p-2 border-b hover:bg-muted'
                        >
                          <p>{v.rank}°</p>
                          <p className='text-muted-foreground'>{v.nome}</p>
                        </div>
                      ))}
                  </div>

                  <div>
                    <div className='hidden md:flex justify-between bg-primary p-2 font-bold rounded-t-md '>
                      <span>Nome</span>
                      <span>Ranking</span>
                    </div>
                    {dataRanking.slice(dataRanking.length / 2).map((v, i) => (
                      <div
                        key={i}
                        className='flex justify-between p-2 border-b hover:bg-muted'
                      >
                        <p>{v.rank}°</p>
                        <p className='text-muted-foreground'>{v.nome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )) || <p>{dataRanking.toString()}</p>}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
