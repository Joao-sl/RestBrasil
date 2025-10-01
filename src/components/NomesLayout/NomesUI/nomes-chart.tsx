import clsx from 'clsx';
import { NameRange } from '@/lib';
import { IconGraphOff, IconTrendingUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  DashboardCard,
  DashboardCardAction,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardHeader,
  DashboardCardTitle,
} from '@/components/ui';

type NomesChartProps = {
  data: NameRange[] | undefined;
  noDataError?: React.ReactNode;
};

export function NomesChart({ data, noDataError }: NomesChartProps) {
  const higherBirthRate = data?.reduce(
    (acc, item) => (item.freq > acc.freq ? item : acc),
    data[0],
  );

  const chartTheme = {
    card: 'bg-gradient-to-br from-white to-blue-100 dark:bg-none dark:bg-card',
    title:
      '[&_svg]:text-blue-700 [&_svg]:bg-gradient-to-br [&_svg]:from-blue-100 [&_svg]:to-violet-100',
    fill: 'oklch(48.8% 0.243 264.376)',
  };

  const chartConfig = {
    freq: {
      label: 'Pessoas: ',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  return (
    <DashboardCard className={chartTheme.card}>
      <DashboardCardHeader>
        <DashboardCardTitle className={chartTheme.title}>
          <IconTrendingUp />{' '}
          <h3>
            Popularidade do nome{' '}
            <span className='bg-gradient-to-br from-blue-600 to-violet-600 text-transparent bg-clip-text'>
              {data?.[0]?.nome}
            </span>
          </h3>
        </DashboardCardTitle>
        <DashboardCardDescription>
          <p>Popularidade ao longo das décadas</p>
        </DashboardCardDescription>

        {higherBirthRate && (
          <DashboardCardAction>
            <p className='text-xl sm:text-2xl font-semibold'>
              {higherBirthRate.freq.toLocaleString('pt-BR')}
            </p>
            <p className='text-sm text-right text-muted-foreground'>
              Pico em {higherBirthRate.faixa.slice(1, 5)}
            </p>
          </DashboardCardAction>
        )}
      </DashboardCardHeader>

      <DashboardCardContent>
        {Array.isArray(data) ? (
          <>
            {data?.length > 0 ? (
              <ChartContainer config={chartConfig}>
                <AreaChart accessibilityLayer data={data}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey='faixa'
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={value => value.slice(1, 5)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickFormatter={value => value.toLocaleString('pt-BR')}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator='line' />}
                  />
                  <Area
                    dataKey='freq'
                    type='natural'
                    fill={chartTheme.fill}
                    stroke={chartTheme.fill}
                    strokeWidth={2}
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <p
                className={clsx(
                  'flex items-center justify-center gap-2',
                  'text-slate-800 font-semibold text-lg px-5 py-4',
                  'bg-slate-100 border border-slate-300 rounded-md',
                )}
              >
                <span>
                  <IconGraphOff size={30} />
                </span>
                Gráfico Indisponível
              </p>
            )}
          </>
        ) : (
          noDataError ?? <span>Error ao recuperar os dados.</span>
        )}
      </DashboardCardContent>
    </DashboardCard>
  );
}
