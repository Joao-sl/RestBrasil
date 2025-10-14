import clsx from 'clsx';
import Image from 'next/image';
import { WeatherMapped } from '@/lib/weather-interface';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  IconInfoCircle,
  IconPennant2Filled,
  IconRipple,
  IconSnowflake,
  IconWind,
} from '@tabler/icons-react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  DashboardCard,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardHeader,
  DashboardCardTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';

type WeatherCardProps = {
  data: WeatherMapped;
  todayForecast: { hour: string; icon: string; temp: number; pop: number }[];
};

export function WeatherCard({ data, todayForecast }: WeatherCardProps) {
  const localTimestampSec =
    Math.floor(Date.now() / 1000) + (data?.timezone ?? 0);
  const localDate = new Date(localTimestampSec * 1000).toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const fields = [
    {
      dt: 'Chance de neve',
      dd: data?.snow ? `${data.snow}%` : undefined,
      icon: (
        <span
          aria-hidden='true'
          className='bg-slate-100 text-slate-800 p-2 rounded-xl dark:bg-accent/50 dark:text-slate-100'
        >
          <IconSnowflake aria-hidden='true' />
        </span>
      ),
    },
    {
      dt: 'Pressão ao nível do mar',
      dd: `${data?.sea_level_press} hPa`,
      tooltip:
        'hPa é a unidade de medida da pressão atmosférica, é o mesmo que millibar (mbar). O valor típico de pressão no nível do mar é de aproximadamente 1013 hPa.',
      icon: (
        <span
          aria-hidden='true'
          className='bg-slate-100 text-slate-800 p-2 rounded-xl dark:bg-blue-700 dark:text-slate-100'
        >
          <IconRipple aria-hidden='true' />
        </span>
      ),
    },
    {
      dt: 'Pressão a nível do solo',
      dd: `${data?.ground_level_press} hPa`,
      tooltip:
        'hPa é a unidade de medida da pressão do ar. Este é o valor exato da pressão atmosférica no local onde a medição foi feita (na altitude do solo).',
      icon: (
        <span
          aria-hidden='true'
          className='bg-slate-100 text-slate-800 p-2 rounded-xl dark:bg-blue-700 dark:text-slate-100'
        >
          <IconPennant2Filled aria-hidden='true' />
        </span>
      ),
    },
    {
      dt: 'Origem do Vento',
      dd: data?.wind_deg,
      tooltip:
        'Esse é um indicador da origem do vento e não para onde ele esta indo.',
      icon: (
        <span
          aria-hidden='true'
          className='bg-slate-100 text-slate-800 p-2 rounded-xl dark:bg-blue-700 dark:text-slate-100'
        >
          <IconWind aria-hidden='true' />
        </span>
      ),
    },
  ];

  const chartConfig = {
    temp: {
      label: 'Temperatura',
    },
  } satisfies ChartConfig;

  return (
    <DashboardCard className='row-span-2 gap-4 border-r'>
      <DashboardCardHeader className='gap-1'>
        <DashboardCardTitle>
          <h4 className='font-semibold'>Clima Atual</h4>
        </DashboardCardTitle>
        <DashboardCardDescription>
          <p className='inline-flex items-center gap-1 text-muted-foreground'>
            {localDate}
          </p>
        </DashboardCardDescription>
      </DashboardCardHeader>

      <DashboardCardContent className='space-y-7'>
        <div className='flex gap-6 bg-gradient-to-b from-blue-300 to-blue-700 rounded-xl p-5 shadow'>
          <Image
            src={`/images/weather/icons/${data?.weather_icon}.png`}
            alt={`Ícone da descrição "${data?.weather_description}"`}
            width={200}
            height={0}
            aria-hidden='true'
            className='w-30 h-auto object-contain'
          />
          <div className='flex flex-col justify-center gap-0.5 text-white'>
            <p className='text-lg'>
              {data?.city}, {data?.country}
            </p>

            <p className='text-6xl xl:text-6xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-blue-300 to-white'>
              {data?.temp}°C
            </p>
            <p className='capitalize text-white/70'>
              {data?.weather_description}
            </p>
          </div>
        </div>

        {todayForecast && (
          <div className='space-y-4 border-y py-7'>
            <h4 className='font-semibold text-muted-foreground'>
              Previsão do dia{' '}
              <span className='text-xs'>
                (
                {todayForecast.length === 1
                  ? '1 Disponível'
                  : `${Object.keys(todayForecast).length} Disponíveis`}
                )
              </span>
            </h4>

            {todayForecast.length > 1 ? (
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={todayForecast}
                  margin={{ left: 16, right: 16 }}
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
                              <dd className='font-semibold'>
                                {item.payload.pop}%
                              </dd>
                            </div>
                          </dl>
                        </div>
                      );
                    }}
                  />

                  <defs>
                    <linearGradient
                      id='gradientTemp'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
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
              <div className='flex gap-2'>
                <Image
                  src={`/images/weather/icons/${todayForecast[0].icon}.png`}
                  alt={`Ícone da descrição "${data?.weather_description}"`}
                  width={100}
                  height={0}
                  aria-hidden='true'
                  className='w-10 h-auto object-contain'
                />
                <dl className='flex flex-col text-sm'>
                  <div>
                    <dt className='sr-only'>Horas</dt>
                    <dd className=''>{todayForecast[0].hour.slice(0, 5)}</dd>
                  </div>

                  <div className='flex gap-1'>
                    <dt>Temperatura</dt>
                    <dd className='font-semibold'>{todayForecast[0].temp}°</dd>
                  </div>

                  <div className='flex gap-1'>
                    <dt>Chuva</dt>
                    <dd className='font-semibold'>{todayForecast[0].pop}%</dd>
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
          </div>
        )}

        <dl className='space-y-0'>
          {fields.map((item, idx) => {
            return item.dd ? (
              <div key={idx} className='flex items-center gap-3 p-2'>
                {item.icon}

                <div>
                  <dt className='inline-flex items-center gap-1 text-sm text-muted-foreground mb-0.5'>
                    {item.dt}
                    {item.tooltip && (
                      <Tooltip>
                        <TooltipTrigger>
                          <IconInfoCircle size={18} />
                        </TooltipTrigger>
                        <TooltipContent>{item.tooltip}</TooltipContent>
                      </Tooltip>
                    )}
                  </dt>
                  <dd className='font-semibold text-sm'>{item.dd}</dd>
                </div>
              </div>
            ) : null;
          })}
        </dl>
      </DashboardCardContent>
    </DashboardCard>
  );
}
