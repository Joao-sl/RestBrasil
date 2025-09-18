import { NomesLayout } from '@/components';
import {
  Card,
  Hero,
  HeroBadge,
  HeroBanner,
  HeroDescription,
  HeroHeader,
  HeroOverlay,
  HeroTitle,
} from '@/components/ui';
import { CardContent } from '@/components/ui/card';
import { fetchHandler } from '@/helpers';
import { mapState } from '@/helpers/mappers';
import { StateRawResponse } from '@/lib';
import { IconUserFilled } from '@tabler/icons-react';
import { Metadata } from 'next';

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
    <>
      <Hero>
        <HeroBanner src={'/images/brazil-names.png'} alt='' />
        <HeroOverlay className='bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950' />
        <HeroBadge>
          <IconUserFilled /> Dados do censo de 2010 IBGE
        </HeroBadge>

        <HeroHeader>
          <HeroTitle>
            Explore os{' '}
            <span className='bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent'>
              Nomes
            </span>{' '}
            do Brasil
          </HeroTitle>

          <HeroDescription>
            Descubra a história, popularidade e distribuição geográfica dos
            nomes brasileiros através de dados oficiais e visualizações
            interativas
          </HeroDescription>
        </HeroHeader>
      </Hero>

      <NomesLayout states={mappedData} />

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
    </>
  );
}
