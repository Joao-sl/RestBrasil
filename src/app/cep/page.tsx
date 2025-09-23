import { CepLayout } from '@/components';
import {
  Container,
  DashboardCard,
  Hero,
  HeroBadge,
  HeroBanner,
  HeroDescription,
  HeroHeader,
  HeroOverlay,
  HeroTitle,
} from '@/components/ui';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconInfoCircleFilled, IconMapPin } from '@tabler/icons-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulta CEP',
  description: 'Consultar dados de um CEP',
  keywords: ['CEP', 'Procurar CEP', 'Buscar CEP', 'Pesquisar CEP'],
};

export default function Cep() {
  const sources = [
    {
      label: 'IBGE',
      link: 'http://www.cidades.ibge.gov.br/',
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
      link: 'http://www.tesourotransparente.gov.br/ckan/dataset/lista-de-municipios-do-siafi',
    },
  ];

  return (
    <>
      <Hero>
        <HeroBanner src={'/images/city.png'} alt='' />
        <HeroOverlay className='bg-gradient-to-r from-blue-900 via-purple-900 to-violet-900 opacity-70' />
        <HeroBadge>
          <IconMapPin /> Dados do ViaCEP
        </HeroBadge>

        <HeroHeader>
          <HeroTitle>
            Consultar{' '}
            <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
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

      <Container>
        <section>
          <DashboardCard className='gap-2 bg-gradient-to-br to-transparent from-blue-50 dark:bg-none dark:bg-card'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1 [&_svg]:text-primary'>
                <IconInfoCircleFilled /> Sobre os Dados
              </CardTitle>
            </CardHeader>
            <CardContent className='text-muted-foreground space-y-2'>
              <p>
                Todos os dados são obtidos a partir da
                <a
                  href='https://viacep.com.br/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline ml-1'
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
                      className='text-primary hover:underline ml-1'
                    >
                      {item.label}
                      {sources.length === idx + 1 ? '.' : ','}
                    </a>
                  );
                })}
              </p>
            </CardContent>
          </DashboardCard>
        </section>
      </Container>
    </>
  );
}
