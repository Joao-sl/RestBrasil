import { NomesLayout } from '@/components';
import { Card, LoadingSpinner, PageHeader } from '@/components/ui';
import { CardContent } from '@/components/ui/card';
import { fetchHandler } from '@/helpers';
import { mapState } from '@/helpers/mappers';
import { StateRawResponse } from '@/lib';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Nomes',
  description:
    'Veja estatísticas sobre nomes brasileiros de acordo com censo de 2010 de IBGE',
};

export default async function Nomes() {
  const { data } = await fetchHandler<StateRawResponse[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?view=nivelado',
    {
      next: {
        revalidate: 84600,
      },
    },
  );

  const mappedData = data ? data.map(mapState) : null;

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageHeader
          title='Nomes'
          subtitle='Veja dados sobre os nomes dos brasileiros'
          centralized
        />

        <Suspense
          fallback={
            <div className='flex items-center justify-center'>
              <LoadingSpinner />
            </div>
          }
        >
          <NomesLayout states={mappedData} />
        </Suspense>

        <div className='mt-8'>
          <Card>
            <CardContent>
              <div className='space-y-2'>
                <h3 className='font-semibold text-lg'>Dicas</h3>
                <ul className='list-disc list-inside'>
                  <li>Infelizmente a API não aceita nomes compostos.</li>
                  <li>Todos os dados são referentes ao censo de 2010.</li>
                  <li>
                    Somente são apresentados os nomes cuja frequência é maior ou
                    igual a 20 para o total Brasil.
                  </li>
                </ul>
              </div>
              <span>Fonte dos dados: IBGE censo 2010</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
