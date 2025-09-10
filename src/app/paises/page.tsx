import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageHeader,
} from '@/components/ui';
import { PaisesLayout } from '@/components';

export default function Paises() {
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageHeader
          title='Países'
          subtitle='Pesquise informações sobre os todos os países do mundo'
          centralized
        />

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
      </div>
    </div>
  );
}
