import clsx from 'clsx';
import Image from 'next/image';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui';

type TodayForecastChartProps = {
  todayForecast: { hour: string; icon: string; temp: number; pop: number }[];
};

const chartConfig = {
  temp: {
    label: 'Temperatura',
  },
} satisfies ChartConfig;

export function TodayForecastChart({ todayForecast }: TodayForecastChartProps) {
  return (
    <>
      {todayForecast.length > 1 ? (
        <ChartContainer config={chartConfig} className='max-h-40 w-full'>
          <AreaChart
            accessibilityLayer
            data={todayForecast}
            margin={{ left: 18, right: 18 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='hour'
              tickLine={false}
              axisLine={false}
              tickFormatter={value => value.slice(0, 5)}
            />
            <YAxis hide domain={['dataMin - 4', 'dataMax + 4']} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
              formatter={(value, _, item) => {
                return (
                  <div className='flex gap-2'>
                    <Image
                      src={`/images/weather/icons/${item.payload.icon}.png`}
                      alt={`Ícone representando o clima atual`}
                      width={30}
                      height={30}
                      className='object-contain w-auto h-auto'
                      aria-hidden='true'
                    />
                    <dl className='flex flex-col gap-1'>
                      <dt className='sr-only'>Horas</dt>
                      <dd className='font-semibold'>
                        {item.payload.hour.slice(0, 5)}
                      </dd>

                      <div className='flex gap-1'>
                        <dt>Temperatura:</dt>
                        <dd className='font-semibold'>{value}°</dd>
                      </div>

                      <div className='flex gap-1'>
                        <dt>Chuva:</dt>
                        <dd className='font-semibold'>{item.payload.pop}%</dd>
                      </div>
                    </dl>
                  </div>
                );
              }}
            />

            <defs>
              <linearGradient id='gradientTemp' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='30%'
                  stopColor='oklch(48.8% 0.243 264.376)'
                  stopOpacity={1}
                />
                <stop
                  offset='70%'
                  stopColor='oklch(80.9% 0.105 251.813)'
                  stopOpacity={0.8}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey='temp'
              type='natural'
              fill='url(#gradientTemp)'
              fillOpacity={0.5}
              strokeWidth={3}
              stroke='oklch(62.3% 0.214 259.815)'
            />
          </AreaChart>
        </ChartContainer>
      ) : todayForecast.length === 1 ? (
        <div className='flex gap-2 font-medium'>
          <dl className='grid grid-cols-2 text-sm w-full'>
            <div className='col-span-2 flex items-center gap-3 mb-4 bg-sky-600/5 dark:bg-accent p-4 rounded-lg'>
              <Image
                src={`/images/weather/icons/${todayForecast[0].icon}.png`}
                alt={`Ícone representando a descrição do clima.`}
                width={100}
                height={0}
                aria-hidden='true'
                className='w-14 h-auto object-contain'
              />
              <dt className='sr-only'>Horas</dt>
              <dd className='text-lg font-bold w-full'>
                {todayForecast[0].hour.slice(0, 5)}
              </dd>
            </div>

            <div className='space-y-1'>
              <dt className='text-sm text-muted-foreground font-normal'>
                Temperatura
              </dt>
              <dd className='text-2xl font-bold'>{todayForecast[0].temp}°</dd>
            </div>

            <div className='space-y-1'>
              <dt className='text-sm text-muted-foreground font-normal'>
                Chuva
              </dt>
              <dd className='text-2xl font-bold'>{todayForecast[0].pop}%</dd>
            </div>
          </dl>
        </div>
      ) : (
        <div
          role='contentinfo'
          className={clsx(
            'px-4 py-5 bg-gradient-to-br from-yellow-200 to-yellow-400',
            'font-bold rounded-xl border border-yellow-400 text-yellow-800',
          )}
        >
          <p>Previsão de hoje indisponível.</p>
        </div>
      )}
    </>
  );
}
