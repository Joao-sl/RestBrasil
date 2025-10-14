export interface WeatherRawResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastRawResponse {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      },
    ];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      '3h': number;
    };
    snow?: {
      '3h': number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherForecasts {
  today: { hour: string; icon: string; temp: number; pop: number }[];
  next_days: Record<string, { tempMax: number; tempMin: number; icon: string }>;
  today_higher_pop: number;
}

export interface ForecastMapped {
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
  forecasts: WeatherForecasts;
}

export interface WeatherMapped {
  city: string;
  country: string;
  sunrise: number;
  sunset: number;
  date: number;
  wind: number;
  wind_deg: string | undefined;
  ground_level_press: number;
  sea_level_press: number;
  humidity: number;
  temp: number;
  feels_like: number;
  visibility: number;
  clouds: number;
  rain?: number;
  snow?: number;
  weather_main: string;
  weather_description: string;
  weather_icon: string;
  timezone: number;
}
