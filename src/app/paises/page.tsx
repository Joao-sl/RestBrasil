import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Hero,
  HeroBadge,
  HeroBanner,
  HeroDescription,
  HeroHeader,
  HeroOverlay,
  HeroTitle,
} from '@/components/ui';
import { PaisesLayout } from '@/components';
import { IconDatabaseImport } from '@tabler/icons-react';

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

      <Card className='gap-2 max-w-4xl mx-auto mt-8'>
        <CardHeader>
          <CardTitle>Dicas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='list-disc list-inside space-y-1'>
            <li>
              Em pesquisas pouco específicas, será exibido o primeiro país
              retornado pela API.
            </li>
            <li>
              Você pode pesquisar o nome do país em diversas línguas, porém a
              ortografia e o nome devem estar corretos e completos.
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
