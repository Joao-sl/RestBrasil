'use client';

import clsx from 'clsx';
import { CepResponse } from '@/lib';
import { useCopyToClipboard } from '@/hooks';
import { fetchHandler, formatCep } from '@/helpers';
import { useEffect, useRef, useState } from 'react';
import {
  IconMapPinFilled,
  IconMessageFilled,
  IconSignRightFilled,
} from '@tabler/icons-react';
import {
  Button,
  Card,
  CardContent,
  DashboardCard,
  DashboardCardAction,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardDl,
  DashboardCardHeader,
  DashboardCardTitle,
  Input,
  InputWrapper,
  Label,
  LoadingSpinner,
} from '@/components/ui';

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

  const titleClasses = 'flex items-center gap-1';
  const cardItems = [
    {
      title: (
        <div className={titleClasses}>
          <IconSignRightFilled color='#805d11' /> Endereço
        </div>
      ),
      fields: [
        {
          contentLabel: 'Logradouro',
          content: data?.logradouro || undefined,
        },
        {
          contentLabel: 'Bairro',
          content: data?.bairro || undefined,
        },
        {
          contentLabel: 'Complemento',
          content: data?.complemento || undefined,
        },
        {
          contentLabel: 'Unidade',
          content: data?.unidade || undefined,
        },
      ],
    },
    {
      title: (
        <div className={titleClasses}>
          <IconMapPinFilled color='#2bab3e' /> Localização
        </div>
      ),
      fields: [
        {
          contentLabel: 'Cidade',
          content: data?.localidade || undefined,
        },
        {
          contentLabel: 'UF',
          content: data?.uf || undefined,
        },
        {
          contentLabel: 'Estado',
          content: data?.estado || undefined || undefined,
        },
        {
          contentLabel: 'Região',
          content: data?.regiao || undefined || undefined,
        },
      ],
    },
    {
      title: (
        <div className={titleClasses}>
          <IconMessageFilled color='#7e15bf' /> Códigos
        </div>
      ),
      fields: [
        { contentLabel: 'DDD', content: data?.ddd || undefined },
        { contentLabel: 'Código IBGE', content: data?.ibge || undefined },
        { contentLabel: 'Código GIA', content: data?.gia || undefined },
        { contentLabel: 'Código SIAFI', content: data?.siafi || undefined },
      ],
    },
  ];

  return (
    <div className='space-y-6'>
      <Card className='max-w-2xl mx-auto mt-6'>
        <CardContent className='space-y-4'>
          <InputWrapper>
            <Label htmlFor='cep-search'>Buscar CEP</Label>
            <Input
              id='cep-search'
              placeholder='Digite o CEP'
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

      {error && (
        <div
          id='search-error'
          role='alert'
          className={clsx(
            'font-semibold mt-6 bg-red-50 rounded-lg max-w-4xl mx-auto',
            'p-4 border border-red-200 text-red-400',
          )}
        >
          {error}
        </div>
      )}

      {data && (
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='text-center mt-6'>
            <h3>Resultado da Consulta</h3>
            <p>CEP: {data.cep}</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
            {cardItems.map((item, idx) => {
              return (
                <DashboardCard key={idx}>
                  <DashboardCardHeader>
                    <DashboardCardTitle>{item.title}</DashboardCardTitle>
                  </DashboardCardHeader>

                  <DashboardCardContent>
                    <DashboardCardDl fields={item.fields} />
                  </DashboardCardContent>
                </DashboardCard>
              );
            })}
          </div>

          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Resposta em JSON</DashboardCardTitle>
              <DashboardCardDescription>
                Dados puros retornados pela API ViaCEP
              </DashboardCardDescription>

              <DashboardCardAction>
                <Button onClick={() => copy(JSON.stringify(data, null, 2))}>
                  {isCopied ? 'Copiado!' : 'Copiar JSON'}
                </Button>
              </DashboardCardAction>
            </DashboardCardHeader>

            <DashboardCardContent>
              <pre className='text-sm p-4 bg-muted rounded-lg'>
                {JSON.stringify(data, null, 2)}
              </pre>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}
    </div>
  );
}
