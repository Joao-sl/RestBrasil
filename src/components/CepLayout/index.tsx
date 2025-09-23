'use client';

import { CepResponse } from '@/lib';
import { useCopyToClipboard } from '@/hooks';
import { fetchHandler, formatCep } from '@/helpers';
import { useEffect, useRef, useState } from 'react';
import {
  IconSearch,
  IconMapPinFilled,
  IconBuildings,
  IconLocationFilled,
  IconHash,
  IconPhoneFilled,
  IconCode,
  IconMailFilled,
  IconLayoutGridFilled,
  IconCopyCheck,
  IconCopy,
} from '@tabler/icons-react';
import {
  Button,
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
  LoadingSpinner,
} from '@/components/ui';
import clsx from 'clsx';

export function CepLayout() {
  const controllerRef = useRef<AbortController | null>(null);
  const [cep, setCep] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<CepResponse>();
  const [isPending, setIsPending] = useState(false);
  const [copy, isCopied] = useCopyToClipboard();

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

  const cardItems = [
    {
      title: (
        <>
          <IconBuildings /> Endereço
        </>
      ),
      description: 'Informações detalhadas do logradouro',
      featured: [
        {
          icon: <IconMailFilled />,
          label: 'Logradouro',
          value: data?.logradouro,
        },
        {
          icon: <IconLayoutGridFilled />,
          label: 'Bairro',
          value: data?.bairro,
        },
      ],
      fields: [
        { contentLabel: 'Complemento', content: data?.complemento },
        { contentLabel: 'Unidade', content: data?.unidade },
      ],
    },
    {
      title: (
        <>
          <IconMapPinFilled /> Localização
        </>
      ),
      description: 'Divisão administrativa e regional',
      featured: [
        {
          icon: <IconMapPinFilled />,
          label: 'Cidade',
          value: data?.localidade,
        },
        { icon: <IconLocationFilled />, label: 'Estado', value: data?.estado },
      ],
      fields: [
        { contentLabel: 'UF', content: data?.uf },
        { contentLabel: 'Região', content: data?.regiao },
      ],
    },
    {
      title: (
        <>
          <IconCode /> Códigos
        </>
      ),
      description: 'Identificadores governamentais',
      featured: [
        { icon: <IconHash />, label: 'DDD', value: data?.ddd },
        { icon: <IconPhoneFilled />, label: 'IBGE', value: data?.ibge },
      ],
      fields: [
        { contentLabel: 'Código GIA', content: data?.gia },
        { contentLabel: 'Código SIAFI', content: data?.siafi },
      ],
    },
  ];

  const theme = {
    card: 'bg-gradient-to-br from-white to-violet-50 dark:bg-gradient-to-tl dark:from-card dark:to-card',
    title: '[&_svg]:text-violet-500 [&_svg]:bg-violet-100',
    featured: 'bg-violet-50 text-violet-500',
    dtClasses: 'border-violet-100',
    ddClasses: 'bg-violet-600',
  };

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
            className='min-w-24 bg-gradient-to-br from-purple-700 to-violet-700 '
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

      {data && (
        <Container asChild className='pb-0'>
          <section className='mt-6' role='region' aria-labelledby='result'>
            <h3 id='result' aria-live='polite' className='sr-only'>
              Resultado da consulta {data.cep}
            </h3>
            <h3 className='text-center text-5xl font-bold mb-2'>{data.cep}</h3>
            <p className='text-xl text-muted-foreground text-center'>
              {data.logradouro}, {data.estado} - {data.uf}
            </p>

            <div className='mt-8 space-y-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {cardItems.map((item, idx) => {
                  return (
                    <DashboardCard key={idx} className={theme?.card}>
                      <DashboardCardHeader>
                        <DashboardCardTitle className={theme?.title}>
                          {item.title}
                        </DashboardCardTitle>
                        <DashboardCardDescription>
                          {item.description}
                        </DashboardCardDescription>
                      </DashboardCardHeader>

                      <DashboardCardContent className='space-y-4'>
                        {item.featured ? (
                          <DashboardCardFeatured className='grid grid-cols-2 gap-4'>
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
                          className={theme.dtClasses}
                          ddClasses={theme.ddClasses}
                        />
                      </DashboardCardContent>
                    </DashboardCard>
                  );
                })}
              </div>

              <DashboardCard
                className={clsx(
                  'bg-gradient-to-br from-slate-100 to-purple-50 dark:bg-gradient-to-tl',
                  'dark:from-card dark:to-card',
                )}
              >
                <DashboardCardHeader>
                  <DashboardCardTitle className='[&_svg]:text-slate-500 [&_svg]:bg-slate-200 gap-2'>
                    <IconCode /> Resposta em JSON
                  </DashboardCardTitle>
                  <DashboardCardDescription>
                    Dados em JSON retornados pela API ViaCEP.
                  </DashboardCardDescription>

                  <DashboardCardAction>
                    <Button
                      onClick={() => copy(JSON.stringify(data, null, 2))}
                      className={clsx(
                        isCopied
                          ? 'bg-green-600 hover:bg-green-600'
                          : 'bg-violet-600 hover:bg-purple-600',
                      )}
                    >
                      {isCopied ? <IconCopyCheck /> : <IconCopy />}
                      {isCopied ? 'Copiado!' : 'Copiar JSON'}
                    </Button>
                  </DashboardCardAction>
                </DashboardCardHeader>

                <DashboardCardContent>
                  <pre className='text-sm p-4 bg-muted-foreground/5 rounded-lg leading-relaxed font-["Inter"]'>
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </DashboardCardContent>
              </DashboardCard>
            </div>
          </section>
        </Container>
      )}
    </>
  );
}
