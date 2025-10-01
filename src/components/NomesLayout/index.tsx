'use client';

import { useState } from 'react';
import { fetchHandler } from '@/helpers';
import type {
  NameBasic,
  NameMap,
  NameRanking,
  NameRange,
  NameUnion,
  StateData,
} from '@/lib';
import {
  IconDatabaseOff,
  IconGlobe,
  IconSearch,
  IconTarget,
  IconUser,
} from '@tabler/icons-react';
import {
  Container,
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
} from '@/components/ui';
import { NomesChart } from './NomesUI/nomes-chart';
import { NamesTables } from './NomesUI/nomes-tables';
import { NomesBasicsCard } from './NomesUI/nomes-basics-card';
import clsx from 'clsx';

type NomesLayoutProps = {
  states: StateData[] | null;
};

type Data = {
  basicData: NameBasic | undefined;
  mapData: NameMap[] | undefined;
  rangeData: NameRange[] | undefined;
  rankingData: NameRanking[] | undefined;
};

export function NomesLayout({ states }: NomesLayoutProps) {
  const [data, setData] = useState<Data | undefined>();
  const [name, setName] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [sex, setSex] = useState('');
  const [state, setState] = useState('BR');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [noDataError, setNoDataError] = useState<string | null>(null);

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
        basicData: data?.dataBasic,
        mapData: data?.dataMap,
        rangeData: data?.dataRange,
        rankingData: data?.dataRanking,
      });
      setName('');
    } finally {
      setIsPending(false);
    }
  }

  const noDataErrorJsx = (
    <span
      role='status'
      className={clsx(
        'flex items-center justify-center gap-2',
        'text-slate-800 font-semibold text-lg px-5 py-4',
        'bg-slate-100 border border-slate-300 rounded-md',
      )}
    >
      <span>
        <IconDatabaseOff />
      </span>
      Desculpe, dados indisponíveis.
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

      {isPending && (
        <div className='flex items-center justify-center mt-8'>
          <LoadingSpinner />
        </div>
      )}

      {data && (
        <Container asChild className='space-y-8 pb-0'>
          <section>
            <h2 className='text-slate-700 text-center text-6xl font-bold dark:text-slate-200'>
              {data?.basicData?.nome}
            </h2>

            <div className='grid grid-cols-1 lg:grid-cols-[33%_auto] gap-8'>
              <NomesBasicsCard
                data={data.basicData}
                noDataError={noDataErrorJsx}
                setName={setName}
              />

              <NomesChart data={data.rangeData} noDataError={noDataErrorJsx} />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
              <NamesTables
                rankingData={data.rankingData}
                mapData={data.mapData}
                noDataError={noDataErrorJsx}
              />
            </div>
          </section>
        </Container>
      )}
    </>
  );
}
