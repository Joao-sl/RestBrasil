import { NomesLayout } from '@/components';
import {
  Container,
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
  DashboardCardTitle,
  Hero,
  HeroBadge,
  HeroBanner,
  HeroDescription,
  HeroHeader,
  HeroOverlay,
  HeroTitle,
} from '@/components/ui';
import { fetchHandler } from '@/helpers';
import { mapState } from '@/helpers/mappers';
import { StateRawResponse } from '@/lib';
import { IconSparkles, IconUserFilled } from '@tabler/icons-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nomes',
  description:
    'Veja estatísticas sobre nomes brasileiros de acordo com censo de 2010 de IBGE',
  keywords: ['IBGE 2010', 'Nomes', 'Nomes Brasil', 'Nomes Populares'],
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

      <Container>
        <section>
          <DashboardCard className='gap-2 bg-gradient-to-br from-violet-50 to-blue-100 dark:bg-none dark:bg-card'>
            <DashboardCardHeader>
              <DashboardCardTitle className='[&_svg]:text-blue-700 [&_svg]:bg-blue-100'>
                <IconSparkles /> <h3>Dicas</h3>
              </DashboardCardTitle>
            </DashboardCardHeader>

            <DashboardCardContent>
              <div className='space-y-2 text-muted-foreground'>
                <ul className='space-y-2'>
                  <li>Infelizmente nomes compostos não são aceitos.</li>
                  <li>
                    Todos os dados são referentes ao censo de 2010 do IBGE.
                  </li>
                  <li>
                    Só serão apresentados dados dos os nomes cuja frequência é
                    maior ou igual a vinte para o total Brasil.
                  </li>
                </ul>
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </section>
      </Container>
    </>
  );
}
