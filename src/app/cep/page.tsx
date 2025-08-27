import { CepLayout } from '@/components';
import { Card, PageHeader } from '@/components/ui';
import { CardContent } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulta CEP',
  description: 'Consultar dados de um CEP',
  keywords: ['CEP', 'Procurar CEP', 'Buscar CEP', 'Pesquisar CEP'],
};

export default function Cep() {
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageHeader
          title='Consulta CEP'
          subtitle='Digite um CEP para consultar informações de endereço'
          centralized
        />

        <CepLayout />

        <div className='mt-8 max-w-4xl mx-auto'>
          <Card>
            <CardContent>
              <h3>Sobre a API ViaCEP</h3>
              <p>
                Webservice gratuito de alto desempenho para consulta de Código
                de Endereçamento Postal (CEP) do Brasil.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
