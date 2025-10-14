import Image from 'next/image';
import { ForecastMapped } from '@/lib/weather-interface';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  DashboardCard,
  DashboardCardContent,
  DashboardCardDescription,
  DashboardCardHeader,
  DashboardCardTitle,
} from '@/components/ui';

type ForecastCardProps = {
  data: ForecastMapped;
};

export function ForecastCard({ data }: ForecastCardProps) {
  return (
    <DashboardCard className='overflow-x-auto'>
      <DashboardCardHeader>
        <DashboardCardTitle>
          <h4 className='font-semibold'>Previsão</h4>
        </DashboardCardTitle>
        <DashboardCardDescription>
          <p>Previsão de maxima e minima para os próximos dias.</p>
        </DashboardCardDescription>
      </DashboardCardHeader>

      <DashboardCardContent>
        <Carousel className='px-4'>
          <CarouselContent className='md:flex md:justify-center'>
            {Object.keys(data.forecasts.next_days).map((key, idx) => {
              return (
                <CarouselItem
                  key={idx}
                  className='basis-2/5 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 max-w-30'
                >
                  <div className='flex flex-col items-center gap-3 w-full bg-accent/50 rounded-xl py-4'>
                    <p className='font-semibold '>
                      {new Date(`${key}T00:00:00`).toLocaleDateString('pt-PT', {
                        weekday: 'short',
                      })}
                    </p>

                    <Image
                      src={`/images/weather/icons/${data.forecasts.next_days[key].icon}.png`}
                      alt={`Ícone do clima do dia ${new Date(
                        `${key}T00:00:00`,
                      ).toLocaleDateString('pt-BR')}`}
                      width={160}
                      height={160}
                      aria-hidden='true'
                      className='object-contain w-16 h-16'
                    />
                    <div className='flex gap-0.5 font-semibold'>
                      <p>{data.forecasts.next_days[key].tempMax}°</p>
                      <span>/ </span>
                      <p className='text-muted-foreground'>
                        {data.forecasts.next_days[key].tempMin}°
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            className='left-[-20px] rounded-lg h-full'
            variant='ghost'
          />
          <CarouselNext
            className='right-[-20px] rounded-lg h-full'
            variant='ghost'
          />
        </Carousel>
      </DashboardCardContent>
    </DashboardCard>
  );
}
