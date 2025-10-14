import { fetchHandler } from '@/helpers';
import { mapForecast, mapWeather } from '@/helpers/mappers';
import { ForecastRawResponse, WeatherRawResponse } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

function normalize<T>(
  result: PromiseSettledResult<{
    data?: T;
    error: string | null;
    status: number;
  }>,
) {
  if (result.status === 'fulfilled') {
    const value = result.value;
    return {
      data: value.data ?? undefined,
      error: value.error,
      status: value.status,
    };
  }
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPEN_WEATHER_KEY;
  const params = request.nextUrl.searchParams;
  const city = params.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'The city params was not found' },
      { status: 400 },
    );
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const weatherPromise = fetchHandler<WeatherRawResponse>(weatherUrl);
    const forecastPromise = fetchHandler<ForecastRawResponse>(forecastUrl);

    const settled = await Promise.allSettled([weatherPromise, forecastPromise]);

    const weather = normalize<WeatherRawResponse>(settled[0]);
    const forecast = normalize<ForecastRawResponse>(settled[1]);

    if (weather?.status === 404 && forecast?.status === 404) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const weatherMapper = mapWeather(weather?.data as WeatherRawResponse);
    const forecastMapper = mapForecast(forecast?.data as ForecastRawResponse);

    return NextResponse.json({
      weather: weatherMapper,
      forecast: forecastMapper,
    });
  } catch {
    return NextResponse.json({ error: 'Unknown Error' }, { status: 500 });
  }
}
