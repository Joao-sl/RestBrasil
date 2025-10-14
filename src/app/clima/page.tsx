import { Metadata } from 'next';
import { ClimaLayout } from '@/components';
import { IconCloud, IconInfoCircleFilled } from '@tabler/icons-react';
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

export const metadata: Metadata = {
  title: 'Clima',
  description: 'Consulte o clima de milhares cidades ao redor do mundo',
  keywords: ['Clima', 'Consultar clima', 'Previsão climática', 'Temperatura'],
};

export default function Clima() {
  return (
    <>
      <Hero>
        <HeroBanner src={'/images/weather.png'} alt='Nuvens' />
        <HeroOverlay className='bg-gradient-to-b from-blue-400 to-blue-800 opacity-70' />
        <HeroBadge>
          <IconCloud /> Dados da OpenWeather
        </HeroBadge>

        <HeroHeader>
          <HeroTitle>
            Confira o{' '}
            <span className='bg-gradient-to-r from-sky-300 to-sky-400 bg-clip-text text-transparent'>
              Clima
            </span>{' '}
            do Mundo
          </HeroTitle>

          <HeroDescription>
            Veja dados metrológicos atuais e previsões completas de milhares de
            cidades ao redor do mundo
          </HeroDescription>
        </HeroHeader>
      </Hero>

      <ClimaLayout />

      <Container asChild>
        <section>
          <DashboardCard className='gap-2 bg-gradient-to-br from-white to-blue-50 dark:bg-none dark:bg-card'>
            <DashboardCardHeader>
              <DashboardCardTitle className='flex items-center gap-1 [&_svg]:text-blue-700 [&_svg]:dark:text-blue-600'>
                <IconInfoCircleFilled /> Infos
              </DashboardCardTitle>
            </DashboardCardHeader>
            <DashboardCardContent className='text-muted-foreground space-y-2'>
              Os dados são exibidos baseados na cidades e fuso-horários das
              respectivas e não no seu. Ex: Se você esta no brasil e pesquisa
              Tóquio os dados serão de acordo com o fuso do japão, isso afeta as
              previsões, horas e por e nascer do sol.
            </DashboardCardContent>
          </DashboardCard>
        </section>
      </Container>
    </>
  );
}
