import { FeaturedPages } from '@/lib';
import { HomeHero } from './HomeUI/home-hero';
import { HomeDisplays } from './HomeUI/home-displays';
import {
  IconCloudFilled,
  IconFenceFilled,
  IconMapPinFilled,
  IconSignature,
} from '@tabler/icons-react';

const featuredPages: FeaturedPages[] = [
  {
    name: 'Clima',
    description:
      'Consulte previsões meteorológicas em tempo real de qualquer localidade do mundo. Dados precisos e atualizados incluindo temperatura, umidade, velocidade do vento, condições climáticas e mais.',
    icon: (
      <IconCloudFilled
        className='text-blue-600'
        aria-label='Ícone de uma nuvem'
      />
    ),
    href: '/clima',
  },
  {
    name: 'CEP',
    description:
      'Encontre endereços completos através do CEP utilizando dados oficiais. Obtenha informações detalhadas como logradouro, bairro, cidade, estado e complementos de forma instantânea.',
    icon: (
      <IconFenceFilled
        className='text-amber-600'
        aria-label='Ícone de uma cerca'
      />
    ),
    href: '/cep',
  },
  {
    name: 'Países',
    description:
      'Explore informações detalhadas sobre todos os países do mundo através da nossa página. Acesse dados sobre população, área territorial, moedas, idiomas, bandeiras e muito mais de forma simples, rápida e pratica.',
    icon: (
      <IconMapPinFilled
        className='text-red-500'
        aria-label='Ícone de uma marcação'
      />
    ),
    href: '/paises',
  },
  {
    name: 'Nomes',
    description:
      'Descubra a popularidade e frequência de nomes brasileiros ao longo das décadas. Dados oficiais do censo de 2010 do IBGE que permitem analisar tendências, rankings e a evolução histórica dos nomes mais utilizados no Brasil.',
    icon: <IconSignature aria-label='Ícone de uma assinatura' />,
    href: '/nomes',
  },
];

export function HomeLayout() {
  return (
    <div>
      <HomeHero featuredPages={featuredPages} />
      <HomeDisplays featuredPages={featuredPages} />
    </div>
  );
}
