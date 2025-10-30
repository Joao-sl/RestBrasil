import clsx from 'clsx';
import Image from 'next/image';
import { WeatherMapped } from '@/lib';
import { TodayForecastChart } from './today-forecast-chart';
import {
  IconDropletFilled,
  IconDropletsFilled,
  IconMapPinFilled,
  IconMist,
  IconRipple,
  IconSeedling,
  IconSnowflake,
  IconWind,
} from '@tabler/icons-react';
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
  DashboardCardTitle,
} from '@/components/ui';

type NewClimaProps = {
  weather: WeatherMapped;
  todayForecast: { hour: string; icon: string; temp: number; pop: number }[];
};

export function WeatherOverview({ weather, todayForecast }: NewClimaProps) {
  const localTimestampSec =
    Math.floor(Date.now() / 1000) + (weather?.timezone ?? 0);
  const localDate = new Date(localTimestampSec * 1000).toLocaleString('pt-PT', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const weatherDetails = [
    {
      title: 'Vento',
      value: `${Math.round(weather.wind)} km/h`,
      description: `Direção: ${weather.wind_deg}`,
      icon: <IconWind />,
      color: 'text-cyan-500 bg-cyan-500/20',
    },
    {
      title: 'Umidade',
      value: `${weather.humidity}%`,
      description: 'Nível de umidade relativa',
      icon: <IconDropletsFilled />,
      color: 'text-sky-500 bg-sky-500/20',
    },
    {
      title: 'Chuva',
      value: weather.rain || '0%',
      description: 'Probabilidade de chuva hoje',
      icon: <IconDropletFilled />,
      color: 'text-blue-500 bg-blue-500/20',
    },
    {
      title: 'Visibilidade',
      value: `${weather.visibility} KM`,
      description: 'Distância de visão',
      icon: <IconMist />,
      color: 'text-slate-500 bg-slate-500/20',
    },
    {
      title: 'Pressão (Solo)',
      value: `${weather.ground_level_press} hPa`,
      description: 'Pressão ao nível do solo',
      icon: <IconSeedling />,
      color: 'text-green-500 bg-green-500/20',
    },
    {
      title: 'Pressão (Mar)',
      value: `${weather.sea_level_press} hPa`,
      description: 'Pressão ao nível do mar',
      icon: <IconRipple />,
      color: 'text-indigo-500 bg-indigo-500/20',
    },
    {
      title: 'Neve',
      value: weather.snow ? `${weather.snow}%` : undefined,
      description: 'Probabilidade de neve hoje',
      icon: <IconSnowflake />,
      color: 'text-blue-400 bg-blue-400/20',
    },
  ];

  const sunriseAndSunset = [
    {
      title: 'Nascer do sol',
      value: new Date((weather.sunrise + weather.timezone) * 1000)
        .toISOString()
        .substring(11, 16),
      color: 'bg-yellow-500/20',
      iconUrl: '/images/weather/sunrise.png',
    },
    {
      title: 'Pôr do sol',
      value: new Date((weather.sunset + weather.timezone) * 1000)
        .toISOString()
        .substring(11, 16),
      color: 'bg-orange-100 dark:bg-orange-500/20',
      iconUrl: '/images/weather/sunset.png',
    },
  ];

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-[66.2%_auto] gap-6 items-center'>
        <DashboardCard className='h-full justify-center p-8'>
          <DashboardCardContent className='flex flex-col gap-8 justify-between md:gap-8 md:flex-row'>
            <div className='flex items-center gap-8'>
              <span className='bg-gradient-to-br from-sky-600 to-sky-600 aspect-square p-8 rounded-xl border'>
                <Image
                  src={`/images/weather/icons/${weather.weather_icon}.png`}
                  alt={`Ícone representando o clima atual`}
                  width={150}
                  height={150}
                  className='object-contain w-22 h-22'
                  aria-hidden='true'
                />
              </span>

              <div className='flex flex-col'>
                <p className='flex text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-sky-400 to-sky-600 mb-2'>
                  {weather.temp}
                  <span className='text-4xl font-semibold mt-2'>°C</span>
                </p>
                <p className='text-xl lg:text-2xl text-foreground font-medium mb-1 ml-2 capitalize'>
                  {weather.weather_description}
                </p>
                <p className='text-sm lg:text-base text-muted-foreground ml-2'>
                  Sensação de {weather.feels_like}°C
                </p>
              </div>
            </div>

            <div className='md:text-right md:self-center space-y-4'>
              <p className='md:ml-auto w-fit'>
                <span className='flex items-center gap-1 font-medium border p-2 px-4 rounded-full text-sm'>
                  <IconMapPinFilled
                    size={20}
                    aria-hidden='true'
                    className='text-sky-600'
                  />
                  {weather.city}, {weather.country}
                </span>
              </p>

              <p className='capitalize text-muted-foreground text-sm font-medium lg:text-base'>
                {localDate.split('às')[0]}
              </p>

              <p className='text-2xl lg:text-3xl font-bold'>
                {localDate.split('às')[1]}
              </p>
            </div>
          </DashboardCardContent>
        </DashboardCard>

        <DashboardCard className='h-full gap-2'>
          <DashboardCardHeader>
            <DashboardCardTitle className='text-xl'>
              <h3 className='font-semibold'>
                Previsão do dia{' '}
                <span className='text-xs'>
                  (
                  {todayForecast.length === 1
                    ? '1 Disponível'
                    : `${Object.keys(todayForecast).length} Disponíveis`}
                  )
                </span>
              </h3>
            </DashboardCardTitle>
          </DashboardCardHeader>

          <DashboardCardContent>
            <TodayForecastChart todayForecast={todayForecast} />
          </DashboardCardContent>
        </DashboardCard>
      </div>

      <div className='mt-6'>
        <h2 className='sr-only'>Detalhes do clima de hoje</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {weatherDetails.map(item => {
            return (
              item.value && (
                <DashboardCard key={item.title}>
                  <DashboardCardHeader>
                    <DashboardCardTitle className='text-md font-semibold [&_svg]:size-8'>
                      <span
                        aria-hidden
                        className={clsx(item.color, 'rounded-lg')}
                      >
                        {item.icon}
                      </span>
                      <h3>{item.title}</h3>
                    </DashboardCardTitle>
                  </DashboardCardHeader>

                  <DashboardCardContent>
                    <p className='text-2xl font-bold'>{item.value}</p>
                    <p className='text-sm text-muted-foreground'>
                      {item.description}
                    </p>
                  </DashboardCardContent>
                </DashboardCard>
              )
            );
          })}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          {sunriseAndSunset.map(item => {
            return (
              <DashboardCard key={item.title}>
                <DashboardCardContent>
                  <dl className='flex items-center gap-4'>
                    <span
                      aria-hidden='true'
                      className={clsx(item.color, 'p-3 rounded-full')}
                    >
                      <Image
                        src={item.iconUrl}
                        alt='Ícone do sol nascendo'
                        width={100}
                        height={100}
                        aria-hidden='true'
                        className='rounded-xl w-10 h-auto'
                      />
                    </span>

                    <div>
                      <dt className='text-muted-foreground font-medium text-sm'>
                        {item.title}
                      </dt>
                      <dd className='text-3xl font-bold'>{item.value}</dd>
                    </div>
                  </dl>
                </DashboardCardContent>
              </DashboardCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
