import { CepLayout } from '@/components';
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
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconMapPin } from '@tabler/icons-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulta CEP',
  description: 'Consultar dados de um CEP',
  keywords: ['CEP', 'Procurar CEP', 'Buscar CEP', 'Pesquisar CEP'],
};

export default function Cep() {
  return (
    <>
      <Hero>
        <HeroBanner src={'/images/city.png'} alt='' />
        <HeroOverlay className='bg-gradient-to-r from-blue-900 via-purple-900 to-violet-900 opacity-80' />
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
            Endereçamento Postal brasileiro
          </HeroDescription>
        </HeroHeader>
      </Hero>

      <CepLayout />

      <Card className='gap-2 max-w-4xl mx-auto mt-8'>
        <CardHeader>
          <CardTitle>Sobre</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Webservice gratuito de alto desempenho para consulta de Código de
            Endereçamento Postal (CEP) do Brasil.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
