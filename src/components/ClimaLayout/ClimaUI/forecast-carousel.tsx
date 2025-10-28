import Image from 'next/image';
import { ForecastMapped } from '@/lib';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';

type ForecastProps = {
  forecast: ForecastMapped;
};

export function ForecastCarousel({ forecast }: ForecastProps) {
  return (
    <article className='mt-10'>
      <h1 className='text-xl font-bold'>Previsão dos Próximos Dias</h1>

      <Carousel className='px-4 md:px-0'>
        <CarouselContent className='md:flex md:justify-center py-5'>
          {Object.keys(forecast.forecasts.next_days).map(key => {
            return (
              <CarouselItem
                key={key}
                className='basis-2/4 md:basis-1/4 xl:basis-1/5'
              >
                <div className='flex flex-col items-center gap-3 size-full rounded-xl p-8 bg-card dark:border shadow-lg/5'>
                  <p className='font-semibold capitalize'>
                    {new Date(`${key}T00:00:00`).toLocaleDateString('pt-PT', {
                      weekday: 'short',
                    })}
                  </p>

                  <span
                    aria-hidden='true'
                    className='bg-sky-500/5 dark:bg-accent/80 p-4 rounded-lg'
                  >
                    <Image
                      src={`/images/weather/icons/${forecast.forecasts.next_days[key].icon}.png`}
                      alt={`Ícone do clima do dia ${new Date(
                        `${key}T00:00:00`,
                      ).toLocaleDateString('pt-BR')}`}
                      width={160}
                      height={160}
                      aria-hidden='true'
                      className='object-contain w-14 h-14'
                    />
                  </span>

                  <p className='text-xs text-muted-foreground capitalize line-clamp-1'>
                    {forecast.forecasts.next_days[key].desc}
                  </p>

                  <dl className='flex justify-center gap-5 border-t w-full pt-4 text-center'>
                    <div className='flex flex-col'>
                      <dt className='text-xs text-muted-foreground font-medium mb-1'>
                        Máx
                      </dt>
                      <dd className='text-xl lg:text-2xl font-display font-bold text-sky-600'>
                        {forecast.forecasts.next_days[key].tempMax}°
                      </dd>
                    </div>

                    <div className='flex flex-col text-center'>
                      <dt className='text-xs text-muted-foreground font-medium mb-1'>
                        Min
                      </dt>
                      <dd className='text-lg font-display font-semibold text-muted-foreground'>
                        {forecast.forecasts.next_days[key].tempMin}°
                      </dd>
                    </div>
                  </dl>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className='left-[-16px] rounded-lg h-full'
          variant='ghost'
        />
        <CarouselNext
          className='right-[-16px] rounded-lg h-full'
          variant='ghost'
        />
      </Carousel>
    </article>
  );
}
