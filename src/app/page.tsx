import { HomeLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - RestBrasil',
  description:
    'Centenas de utilitários reunidos em um só lugar para sua comodidade.',
  keywords: [
    'Clima',
    'CEP',
    'Nomes',
    'Países',
    'Utilidade',
    'Utilitários',
    'APIs',
  ],
};

export default function Home() {
  return <HomeLayout />;
}
