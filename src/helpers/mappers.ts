import { degToCompass, weatherIconPriority } from './weather-helpers';
import {
  CountryMapped,
  CountryRaw,
  ForecastMapped,
  ForecastRawResponse,
  StateRawResponse,
  WeatherForecasts,
  WeatherMapped,
  WeatherRawResponse,
} from '@/lib';

export function mapState(data: StateRawResponse) {
  return {
    ufId: data['UF-id'],
    ufSigla: data['UF-sigla'],
    ufNome: data['UF-nome'],
    regiaoId: data['regiao-id'],
    regiaoSigla: data['regiao-sigla'],
    regiaoNome: data['regiao-nome'],
  };
}

export function mapCountry(data: CountryRaw): CountryMapped {
  return {
    flags: {
      svg: data.flags?.svg,
      alt: data.flags?.alt,
    },
    names: {
      common: data.name?.common,
      official: data.name?.official,
      commonNamePtBr: data.translations?.['por']?.common,
      officialNamePtBr: data.translations?.['por']?.official,
      native: data.name?.nativeName
        ? Object.entries(data.name.nativeName).map(([key, value]) => {
            return {
              language: data.languages?.[key],
              official: value.official,
              common: value.common,
            };
          })
        : undefined,
    },
    subregion: data.subregion,
    area: data.area,
    borders: data.borders,
    continent: data.continents,
    population: data.population?.toLocaleString('pt-BR'),
    capital: data.capital,
    tld: data.tld,
    gini: data.gini,
    languages: data.languages ? Object.values(data.languages) : undefined,
    currencies: data.currencies,
    car: {
      signs: data.car?.signs,
      side:
        data.car?.side && data.car.side === 'right' ? 'Direita' : 'Esquerda',
    },
    maps: data.maps.googleMaps,
    unMember: data.unMember === true ? 'Sim' : 'Não',
    independent: data.independent === true ? 'Sim' : 'Não',
    fifa: data.fifa,
    timezone: data.timezones,
  };
}

export function mapWeather(data: WeatherRawResponse): WeatherMapped {
  return {
    city: data.name,
    country: data.sys.country,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    date: data.dt,
    wind: Number((data.wind.speed * 3.6).toFixed(2)),
    wind_deg: degToCompass(data.wind.deg),
    ground_level_press: data.main.grnd_level,
    sea_level_press: data.main.sea_level,
    humidity: data.main.humidity,
    temp: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    visibility: data.visibility / 1000,
    clouds: data.clouds.all,
    rain: data.rain?.['1h'],
    snow: data.snow?.['1h'] ? data.snow?.['1h'] * 100 : undefined,
    weather_main: data.weather[0].main,
    weather_description: data.weather[0].description,
    weather_icon: data.weather[0].icon.slice(0, 2),
    timezone: data.timezone,
  };
}

export function mapForecast(data: ForecastRawResponse): ForecastMapped {
  const localTimestampSec = Math.floor(Date.now() / 1000) + data.city.timezone;
  const localDateObj = new Date(localTimestampSec * 1000);
  const localDateTxt = localDateObj.toISOString().slice(0, 10);

  // Just for internal control
  let iconId = 0;

  const forecastsMap = data.list.reduce(
    (acc: WeatherForecasts, value) => {
      if (value.dt < localTimestampSec) {
        return acc;
      }

      const dateTxt = value.dt_txt.split(' ')[0];
      const timeTxt = value.dt_txt.split(' ')[1];

      const tempMax = Math.round(value.main.temp_max);
      const tempMin = Math.round(value.main.temp_min);
      const temp = Math.round(value.main.temp);
      const pop = value.pop * 100;
      const icon = value.weather[0].icon.slice(0, 2);
      const weatherId = value.weather[0].id;
      const desc = value.weather[0].description;

      if (dateTxt === localDateTxt) {
        acc.today.push({
          hour: timeTxt,
          icon,
          temp,
          pop,
        });

        if (!acc.today_higher_pop || acc.today_higher_pop < pop) {
          acc.today_higher_pop = value.pop * 100;
        }

        return acc;
      }

      if (!acc.next_days[dateTxt]) {
        iconId = weatherIconPriority(value.weather[0].id);
        acc.next_days[dateTxt] = {
          tempMax,
          tempMin,
          icon,
          desc,
        };
      } else {
        const day = acc.next_days[dateTxt];

        if (day.tempMax < tempMax) {
          day.tempMax = tempMax;
        }

        if (day.tempMin > tempMin) {
          day.tempMin = tempMin;
        }

        const newIconPriority = weatherIconPriority(weatherId);
        if (iconId > newIconPriority) {
          day.icon = icon;
          iconId = newIconPriority;
          day.desc = desc;
        }
      }
      return acc;
    },
    { next_days: {}, today: [], today_higher_pop: 0 },
  );

  return {
    city: {
      id: data.city.id,
      name: data.city.name,
      coord: {
        lat: data.city.coord.lat,
        lon: data.city.coord.lon,
      },
    },
    country: data.city.country,
    population: data.city.population,
    timezone: data.city.timezone,
    sunrise: data.city.sunrise,
    sunset: data.city.sunset,
    forecasts: forecastsMap,
  };
}
