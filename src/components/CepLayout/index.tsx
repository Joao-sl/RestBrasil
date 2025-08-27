'use client';

import clsx from 'clsx';
import { CepResponse } from '@/lib';
import { useCopyToClipboard } from '@/hooks';
import { fetchHandler, formatCep } from '@/helpers';
import { useEffect, useRef, useState } from 'react';
import { IconMapPin, IconSearch } from '@tabler/icons-react';
import {
  Button,
  Card,
  CardContent,
  Input,
  LoadingSpinner,
} from '@/components/ui';

export function CepLayout() {
  const controllerRef = useRef<AbortController | null>(null);
  const [cep, setCep] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<CepResponse | ''>('');
  const [isPending, setIsPending] = useState(false);
  const [copy, isCopied] = useCopyToClipboard();

  function handleCepChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCep(formatCep(event.target.value));
  }

  async function handleSearch() {
    controllerRef.current?.abort();

    if (cep.length < 8) {
      setError('Cep deve conter 8 dígitos');
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
        setData('');
        setError(error || `Erro desconhecido, StatusCode: ${status}`);
        setIsPending(false);
        return;
      }

      setData(data!);
      setIsPending(false);
      setCep('');
    } finally {
      clearTimeout(controllerId);
    }
  }

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  const unavailable = <span className='text-red-500'>Indisponível</span>;
  return (
    // TODO: Apply styles to the component and improve accessibility
    // TODO: Personalized Tooltip for cards

    <>
      <div className='mt-8'>
        <div className='max-w-2xl mx-auto'>
          <Card>
            <CardContent>
              <div className='mb-6'>
                <h3 className='flex items-center gap-1 font-semibold'>
                  <IconMapPin stroke={2} size={20} className='text-green-500' />
                  Buscar CEP
                </h3>
                <p className='text-sm'>Digite o CEP no formato 00000000</p>
              </div>

              <div className='flex items-center gap-2'>
                <Input
                  id='cep-search'
                  placeholder='00000000'
                  value={cep}
                  onChange={handleCepChange}
                  maxLength={9}
                  disabled={isPending}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  aria-disabled={isPending}
                  aria-label='Digite o CEP'
                />

                <Button
                  size='sm'
                  onClick={handleSearch}
                  disabled={isPending}
                  aria-disabled={isPending}
                  aria-label='Buscar informações do cep digitado'
                >
                  {isPending ? (
                    <span>
                      <LoadingSpinner color='default' size='sm' />
                    </span>
                  ) : (
                    <IconSearch stroke={2.5} />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div
              className={clsx(
                'font-semibold mt-6 bg-red-50 rounded-lg',
                'p-4 border border-red-200 text-red-400',
              )}
            >
              {error}
            </div>
          )}
        </div>

        {data && (
          <div className='max-w-4xl mx-auto space-y-8'>
            <div className='text-center mt-6'>
              <h3>Resultado da Consulta</h3>
              <p>CEP: {data.cep}</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
              <Card>
                <CardContent>
                  <h4>🗺️ Endereço</h4>

                  <div className='space-y-3'>
                    <div>
                      <p>Logradouro</p>
                      <p>{data.logradouro || unavailable}</p>
                    </div>

                    <div>
                      <p>Complemento</p>
                      <p>{data.complemento || unavailable}</p>
                    </div>

                    <div>
                      <p>Bairro</p>
                      <p>{data.bairro || unavailable}</p>
                    </div>

                    <div>
                      <p>Unidade</p>
                      <p>{data.unidade || unavailable}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h4>🌎 Localização</h4>

                  <div className='space-y-3'>
                    <div>
                      <p>Cidade</p>
                      <p>{data.localidade || unavailable}</p>
                    </div>

                    <div>
                      <p>uf</p>
                      <p>{data.uf || unavailable}</p>
                    </div>

                    <div>
                      <p>Estado</p>
                      <p>{data.estado || unavailable}</p>
                    </div>

                    <div>
                      <p>Região</p>
                      <p>{data.regiao || unavailable}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h4>🔢 Códigos</h4>

                  <div className='space-y-3'>
                    <div>
                      <p>DDD</p>
                      <p>{data.ddd || unavailable}</p>
                    </div>

                    <div>
                      <p>Código IBGE</p>
                      <p>{data.ibge || unavailable}</p>
                    </div>

                    <div>
                      <p>Código GIA</p>
                      <p>{data.gia || unavailable}</p>
                    </div>

                    <div>
                      <p>Código SIAFI</p>
                      <p>{data.siafi || unavailable}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent>
                <div>
                  <div className='flex justify-between'>
                    <h3>Resposta JSON</h3>
                    <Button
                      className='bg-green-600 px-2 py-1 rounded-lg cursor-pointer text-white font-semibold'
                      onClick={() => copy(JSON.stringify(data, null, 2))}
                    >
                      {isCopied ? 'Copiado!' : 'Copiar JSON'}
                    </Button>
                  </div>
                  <p>Dados puros retornados pela API ViaCEP</p>
                </div>

                <pre className='text-sm p-4 bg-muted/10 rounded-lg'>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
