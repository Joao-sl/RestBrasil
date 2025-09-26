import {
  Hero,
  HeroBadge,
  HeroBanner,
  HeroDescription,
  HeroHeader,
  HeroOverlay,
  HeroTitle,
  Container,
  DashboardCard,
  DashboardCardHeader,
  DashboardCardTitle,
  DashboardCardContent,
} from '@/components/ui';
import { PaisesLayout } from '@/components';
import { IconDatabaseImport, IconSparkles } from '@tabler/icons-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Países',
  description: 'Busque informações de todos os países do mundo.',
  keywords: [
    'Países',
    'Dados de países',
    'Rest countries',
    'Rest countries dashboard',
  ],
};

export default function Paises() {
  return (
    <>
      <Hero>
        <HeroBanner src='/images/world-map.png' alt='Mapa múndi' />
        <HeroOverlay className='bg-gradient-to-r from-emerald-900 via-teal-900 to-blue-900' />
        <HeroBadge>
          <IconDatabaseImport /> Dados do Rest Countries
        </HeroBadge>

        <HeroHeader>
          <HeroTitle>
            Explore os{' '}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400'>
              Países
            </span>{' '}
            do Mundo
          </HeroTitle>

          <HeroDescription>
            Descubra informações detalhadas sobre geografia, política, economia
            e cultura de todos os países do mundo
          </HeroDescription>
        </HeroHeader>
      </Hero>

      <PaisesLayout />

      <Container>
        <DashboardCard className='gap-2 bg-gradient-to-br from-slate-50 to-blue-100 dark:bg-none dark:bg-card'>
          <DashboardCardHeader>
            <DashboardCardTitle className='[&_svg]:text-blue-700 [&_svg]:bg-blue-100'>
              <h4 className='flex items-center gap-2'>
                <IconSparkles /> Dicas
              </h4>
            </DashboardCardTitle>
          </DashboardCardHeader>
          <DashboardCardContent className='px-6 text-muted-foreground space-y-2'>
            <p>
              Em pesquisas pouco específicas, será exibido o primeiro país
              retornado pela API.
            </p>
            <p>
              Você pode pesquisar o nome do país em diversas línguas, porém a
              ortografia e o nome devem estar corretos e completos.
            </p>
          </DashboardCardContent>
        </DashboardCard>
      </Container>
    </>
  );
}
