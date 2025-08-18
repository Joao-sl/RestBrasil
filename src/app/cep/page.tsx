import { CepLayout } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulta CEP',
  description: 'Consultar dados de um CEP',
  keywords: ['CEP', 'Procurar CEP', 'Buscar CEP', 'Pesquisar CEP'],
};

export default function Cep() {
  return <CepLayout />;
}
