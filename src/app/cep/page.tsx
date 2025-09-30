import { Metadata } from 'next';
import { CepLayout } from '@/components';
import { IconInfoCircleFilled, IconMapPin } from '@tabler/icons-react';
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
  title: 'Consulta CEP',
  description: 'Consultar dados de um CEP',
  keywords: ['CEP', 'Procurar CEP', 'Buscar CEP', 'Pesquisar CEP'],
};

export default function Cep() {
  const sources = [
    {
      label: 'IBGE',
      link: 'https://cidades.ibge.gov.br/',
    },
    {
      label: 'Portal da Fazendo de SP',
      link: 'https://portal.fazenda.sp.gov.br/servicos/gia/Downloads/pre_formatado_ngia_v0210_gia0801.pdf',
    },
    {
      label: 'Anatel',
      link: 'https://informacoes.anatel.gov.br/legislacao/resolucoes/2022/1641-resolucao-749',
    },
    {
      label: 'Tesouro Nacional',
      link: 'https://tesourotransparente.gov.br/ckan/dataset/lista-de-municipios-do-siafi',
    },
  ];

  return (
    <>
      <Hero>
        <HeroBanner src={'/images/city.png'} alt='' />
        <HeroOverlay className='bg-gradient-to-r from-blue-900 via-purple-950 to-violet-900' />
        <HeroBadge>
          <IconMapPin /> Dados do ViaCEP
        </HeroBadge>

        <HeroHeader>
          <HeroTitle>
            Consultar{' '}
            <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
              CEPs
            </span>{' '}
            do Brasil
          </HeroTitle>

          <HeroDescription>
            Encontre informações completas de endereço através do Código de
            Endereçamento Postal brasileiro.
          </HeroDescription>
        </HeroHeader>
      </Hero>

      <CepLayout />

      <Container asChild>
        <section>
          <DashboardCard className='gap-2 bg-gradient-to-br from-blue-50 via-purple-50 to-violet-50 dark:bg-none dark:bg-card'>
            <DashboardCardHeader>
              <DashboardCardTitle className='flex items-center gap-1 [&_svg]:text-blue-700 [&_svg]:dark:text-blue-600'>
                <IconInfoCircleFilled /> Sobre os Dados
              </DashboardCardTitle>
            </DashboardCardHeader>
            <DashboardCardContent className='text-muted-foreground space-y-2'>
              <p>
                Todos os dados são obtidos a partir da
                <a
                  href='https://viacep.com.br/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-700 dark:text-blue-600 hover:underline ml-1'
                >
                  ViaCEP
                </a>
                , uma api gratuita de alto desempenho com foco em consultas de
                Código de Endereçamento Postal (CEP) do Brasil.
              </p>

              <p>
                ViaCEP usa como fonte para construção de de seus dados sites
                como,
                {sources.map((item, idx) => {
                  return (
                    <a
                      key={idx}
                      href={item.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-700 dark:text-blue-600 hover:underline ml-1'
                    >
                      {item.label}
                      {sources.length === idx + 1 ? '.' : ','}
                    </a>
                  );
                })}
              </p>
            </DashboardCardContent>
          </DashboardCard>
        </section>
      </Container>
    </>
  );
}
