'use client';

import { NavItem } from '@/lib';
import { Container } from '../ui';
import { useBreakpoint } from '@/hooks';
import { MobileMenu } from './mobile-menu';
import { DesktopMenu } from './desktop-menu';
import {
  IconSignature,
  IconCloudFilled,
  IconFenceFilled,
  IconMapPinFilled,
} from '@tabler/icons-react';

const navMainLinks: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Sobre', href: '/sobre' },
];

const sitePages: NavItem[] = [
  {
    name: 'Clima',
    href: '/clima',
    icon: <IconCloudFilled />,
    description: 'Dados meteorológicos de milhares de cidades.',
  },
  {
    name: 'Países',
    href: '/paises',
    icon: <IconMapPinFilled />,
    description: 'Dados sobre os milhares de países.',
  },
  {
    name: 'Nomes',
    href: '/nomes',
    icon: <IconSignature />,
    description: 'Estatísticas sobre nomes brasileiros.',
  },
  {
    name: 'CEPs',
    href: '/cep',
    icon: <IconFenceFilled />,
    description: 'Informações completas de cada CEP.',
  },
];

export function HomeMenu() {
  const isSmallScreen = useBreakpoint('(width <= 820px)');

  return (
    <nav className='border-b bg-gradient-to-br from-green-500/10 via-background to-blue-500/10'>
      <Container className='py-4'>
        {isSmallScreen ? (
          <MobileMenu navMainLinks={navMainLinks} sitePages={sitePages} />
        ) : (
          <DesktopMenu navMainLinks={navMainLinks} sitePages={sitePages} />
        )}
      </Container>
    </nav>
  );
}
