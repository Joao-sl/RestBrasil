import Image from 'next/image';
import { WeatherMapped } from '@/lib/weather-interface';
import { IconInfoCircle } from '@tabler/icons-react';
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardHeader,
  DashboardCardTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import clsx from 'clsx';

type WeatherOverviewCardProps = {
  data: WeatherMapped;
  todayPop: number;
};

export function WeatherOverviewCard({
  data,
  todayPop,
}: WeatherOverviewCardProps) {
  const fields = [
    {
      title: 'Umidade',
      value: `${data.humidity}%`,
      icon: (
        <Image
          src='/images/animated-svg/raindrop-measure.svg'
          alt='Ícone de uma gota'
          width={50}
          height={50}
          className='object-contain w-8 h-auto'
          aria-hidden='true'
        />
      ),
      description: 'A umidade ideal geralmente fica entre 40% e 60%.',
    },
    {
      title: 'Visibilidade',
      value: `${data.visibility}%`,
      icon: (
        <Image
          src='/images/animated-svg/mist.svg'
          alt='Ícone representando a névoa'
          width={50}
          height={50}
          className='object-contain w-10 h-auto'
          aria-hidden='true'
        />
      ),
      description: 'Distância em que um objeto pode ser visto e reconhecido.',
    },
    {
      title: 'Sensação Térmica',
      value: `${data.feels_like}°`,
      icon: (
        <Image
          src={
            data.feels_like > data.temp
              ? '/images/animated-svg/thermometer-warmer.svg'
              : data.feels_like < data.temp
              ? '/images/animated-svg/thermometer-colder.svg'
              : '/images/animated-svg/thermometer-equal.svg'
          }
          alt='Ícone de um termômetro'
          width={50}
          height={50}
          className='object-contain w-7 h-auto'
          aria-hidden='true'
        />
      ),
      description: 'Influenciada pela umidade e velocidade do vento.',
    },
  ];

  return (
    <DashboardCard className='gap-4 overflow-hidden'>
      <DashboardCardHeader className='gap-1'>
        <DashboardCardTitle>
          <h4 className='font-semibold'>Visão geral de hoje</h4>
        </DashboardCardTitle>
        <DashboardCardDescription>
          <p>Detalhes do clima de hoje</p>
        </DashboardCardDescription>
      </DashboardCardHeader>

      <DashboardCardContent className='space-y-6'>
        <dl className='grid grid-cols-1 gap-8 md:gap-6 md:grid-cols-3 md:h-45'>
          <div
            className={clsx(
              'flex flex-col rounded-xl p-4 min-h-[172px]',
              'bg-gradient-to-br from-white to-green-50 dark:border dark:bg-none',
            )}
          >
            <dt className='text-muted-foreground font-medium text-sm mb-4 md:mb-0'>
              Velocidade do Vento
            </dt>

            <div className='h-full rounded-xl flex justify-center'>
              <Image
                src={'/images/weather/wind.png'}
                alt='Ícone representando o vento'
                width={150}
                height={150}
                className='self-center h-18 w-auto'
                aria-hidden='true'
              />
            </div>
            <dd className='font-semibold text-center mt-2 md:mt-0'>
              {data.wind} km/h
            </dd>
          </div>

          <div
            className={clsx(
              'flex flex-col rounded-xl p-4 min-h-[172px]',
              'bg-gradient-to-br from-white to-blue-50 dark:border dark:bg-none',
            )}
          >
            <dt className='text-muted-foreground font-medium text-sm mb-4 md:mb-0'>
              Chance de chuva hoje
            </dt>

            <div className='h-full flex justify-center'>
              <Image
                src={'/images/weather/rain.png'}
                alt='Ícone de gotas de chuva'
                width={150}
                height={150}
                className='self-center h-auto w-20'
                aria-hidden='true'
              />
            </div>
            <dd className='text-center font-semibold mt-2 md:mt-0'>
              {todayPop === 0 ? 'Não chove' : `${todayPop}%`}
            </dd>
          </div>

          <div
            className={clsx(
              'flex flex-col rounded-xl p-4 min-h-[172px]',
              'bg-gradient-to-br from-white to-orange-50/80',
              'dark:border dark:bg-none',
            )}
          >
            <span
              className='inline-flex items-center gap-1 font-semibold text-muted-foreground text-sm mb-4 md:mb-0'
              aria-hidden='true'
            >
              Nascer e Pôr do Sol
              <Tooltip>
                <TooltipTrigger>
                  <IconInfoCircle size={18} />
                </TooltipTrigger>
                <TooltipContent>
                  Esse campo é baseado no Fuso horário do local pesquisado e não
                  no seu.
                </TooltipContent>
              </Tooltip>
            </span>

            <div className='flex flex-col gap-4 justify-center h-full'>
              <div className='flex items-center gap-2'>
                <Image
                  src={'/images/weather/sunrise.png'}
                  alt='Ícone do sol nascendo'
                  width={100}
                  height={100}
                  aria-hidden='true'
                  className='rounded-xl w-8 h-auto'
                />
                <div>
                  <dt className='text-muted-foreground text-sm'>
                    Nascer do Sol
                  </dt>
                  <dd className='font-semibold'>
                    {new Date((data.sunrise + data.timezone) * 1000)
                      .toISOString()
                      .substring(11, 16)}
                  </dd>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Image
                  src={'/images/weather/sunset.png'}
                  alt='Ícone do sol se pondo'
                  width={100}
                  height={100}
                  aria-hidden='true'
                  className='rounded-xl w-8 h-auto'
                />
                <div>
                  <dt className='text-muted-foreground text-sm'>Pôr as</dt>
                  <dd className='font-semibold'>
                    {new Date((data.sunset + data.timezone) * 1000)
                      .toISOString()
                      .substring(11, 16)}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </dl>

        <dl className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {fields.map((item, idx) => {
            return (
              <div
                key={idx}
                className='flex items-start gap-3 p-4 bg-accent/50 rounded-lg shadow-xs min-h-[124px]'
              >
                <span aria-hidden='true' className='mt-1'>
                  {item.icon}
                </span>

                <div className='space-y-1'>
                  <dt className='text-sm text-muted-foreground font-semibold'>
                    {item.title}
                  </dt>
                  <dd className='text-2xl font-bold'>{item.value}</dd>
                  <dd className='text-xs text-muted-foreground'>
                    {item.description}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </DashboardCardContent>
    </DashboardCard>
  );
}
