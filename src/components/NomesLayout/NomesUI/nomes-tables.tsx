import clsx from 'clsx';
import { NameMap, NameRanking } from '@/lib';
import { IconLaurelWreath1, IconMapPinFilled } from '@tabler/icons-react';
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardHeader,
  DashboardCardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

type NamesTablesProps = {
  rankingData: NameRanking[] | undefined;
  mapData: NameMap[] | undefined;
  noDataError?: React.ReactNode | undefined;
};

export function NamesTables({
  rankingData,
  mapData,
  noDataError,
}: NamesTablesProps) {
  const tableCard = {
    card: 'bg-gradient-to-br from-slate-50 to-slate-200 dark:bg-none dark:bg-card',
    title:
      '[&_svg]:text-slate-700 [&_svg]:bg-gradient-to-br [&_svg]:from-slate-300 [&_svg]:to-blue-100',
  };

  return (
    <>
      <DashboardCard className={tableCard.card}>
        <DashboardCardHeader>
          <DashboardCardTitle className={tableCard.title}>
            <IconMapPinFilled /> <h3>Tabela Por Estado</h3>
          </DashboardCardTitle>
          <DashboardCardDescription>
            <p>
              Ranking dos estados com maior concentração do nome pesquisado.
            </p>
          </DashboardCardDescription>
        </DashboardCardHeader>

        <DashboardCardContent
          className={clsx(
            'h-[490.5px] overflow-auto relative [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
            '[&::-webkit-scrollbar-track]:bg-slate-700/10 [&::-webkit-scrollbar-thumb]:bg-slate-700',
            '[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full',
          )}
        >
          {Array.isArray(mapData) && mapData.length > 0 ? (
            <Table
              className='overflow-visible'
              wrapperClasses='overflow-visible'
            >
              <TableHeader className='bg-slate-700 sticky top-0 z-1'>
                <TableRow className='border-muted hover:bg-transparent'>
                  <TableHead className='text-white rounded-tl-md'>
                    Estado
                  </TableHead>
                  <TableHead className='text-right text-white'>
                    População
                  </TableHead>
                  <TableHead className='text-right text-white'>
                    Quantidade
                  </TableHead>
                  <TableHead className='text-right text-white rounded-tr-md'>
                    Taxa/100k
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className='[&_tr:last-child]:border-b'>
                {mapData.map((item, idx) => {
                  return (
                    <TableRow
                      key={idx}
                      className={clsx(
                        'font-medium border-slate-200 hover:bg-slate-200',
                        'dark:border-slate-700 dark:hover:bg-slate-800',
                      )}
                    >
                      <TableCell className='py-3 min-w-38'>
                        {item.nome}
                      </TableCell>
                      <TableCell className='text-right text-muted-foreground py-3'>
                        {item.populacao.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className='text-right py-3 text-muted-foreground'>
                        {item.freq.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className='text-right py-3 text-muted-foreground'>
                        {item.prop.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            noDataError ?? <span>Não foi possível recuperar os dados.</span>
          )}
        </DashboardCardContent>
      </DashboardCard>

      <DashboardCard className={tableCard.card}>
        <DashboardCardHeader>
          <DashboardCardTitle className={tableCard.title}>
            <IconLaurelWreath1 /> <h3>Top 20 Nomes</h3>
          </DashboardCardTitle>
          <DashboardCardDescription>
            <p>
              Esse ranking de nomes é baseado nos parâmetros sexo e estado da
              pesquisa.
            </p>
          </DashboardCardDescription>
        </DashboardCardHeader>

        <DashboardCardContent className='grid grid-cols-2'>
          {Array.isArray(rankingData) ? (
            <Table className='overflow-hidden rounded-tl-md'>
              <TableHeader className='bg-slate-700'>
                <TableRow className='hover:bg-transparent'>
                  <TableHead className='text-white'>Rank</TableHead>
                  <TableHead className='text-white'>Nome</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className='[&_tr:last-child]:border-b'>
                {rankingData.slice(0, 10).map((item, idx) => {
                  return (
                    <TableRow
                      key={idx}
                      className={clsx(
                        'font-medium border-slate-200 hover:bg-slate-200',
                        'dark:border-slate-700 dark:hover:bg-slate-800',
                      )}
                    >
                      <TableCell className='py-3'>{item.rank}°</TableCell>
                      <TableCell className='py-3 text-muted-foreground'>
                        {item.nome}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            noDataError ?? <span>Não foi possível recuperar os dados.</span>
          )}

          {Array.isArray(rankingData) ? (
            <Table className='overflow-hidden rounded-tr-md'>
              <TableHeader className='bg-slate-700'>
                <TableRow className='hover:bg-transparent'>
                  <TableHead className='text-white'>Rank</TableHead>
                  <TableHead className='text-white'>Nome</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className='[&_tr:last-child]:border-b'>
                {rankingData.slice(10).map((item, idx) => {
                  return (
                    <TableRow
                      key={idx}
                      className={clsx(
                        'font-medium border-slate-200 hover:bg-slate-200',
                        'dark:border-slate-700 dark:hover:bg-slate-800',
                      )}
                    >
                      <TableCell className='py-3'>{item.rank}°</TableCell>
                      <TableCell className='py-3 text-muted-foreground'>
                        {item.nome}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            noDataError ?? <span>Não foi possível recuperar os dados.</span>
          )}
        </DashboardCardContent>
      </DashboardCard>
    </>
  );
}
