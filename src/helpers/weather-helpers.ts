/**
 * @param deg Wind direction, degrees (meteorological) (0-360)
 */
export function degToCompass(deg: number) {
  const COMPASS_POINTS = [
    'N (Norte)',
    'NNE (Norte-Nordeste)',
    'NE (Nordeste)',
    'ENE (Este-Nordeste)',
    'L (Leste)',
    'ESE (Este-Sudeste)',
    'SE (Sudeste)',
    'SSE (Sul-Sudeste)',
    'S (Sul)',
    'SSW (Sul-Sudoeste)',
    'SW (Sudoeste)',
    'WSW (Oeste-Sudoeste)',
    'W (Oeste)',
    'WNW (Oeste-Noroeste)',
    'NW (Noroeste)',
    'NNW (Norte-Noroeste)',
  ];

  if (isNaN(deg)) return undefined;

  // This Normalize `deg` to value between 0 and 359.99...
  // This ensures that negative deg and above 360 are wrapped correctly into the 0–360 range.
  const normalizeDeg = ((deg % 360) + 360) % 360;

  // Add half of a compass sector (11.25°) to perform rounding.
  // Then divide by 22.5° — the size of one compass sector to determine which compass point the degree falls into.
  // Use module 16 to get COMPASS_POINTS index equivalent.
  const calc = Math.floor((normalizeDeg + 11.25) / 22.5) % 16;

  return `${COMPASS_POINTS[calc]} (${deg}°)`;
}

export function weatherIconPriority(id: number) {
  // Priority: Atmosphere > Snow > Thunderstorm > Rain > Drizzle > Clouds > Clear
  // ID:       7xx        > 6xx  > 2xx          > 5xx  > 3xx     > 80x    > 800

  if (id >= 700 && id < 800) {
    return 1;
  } else if (id >= 600 && id < 700) {
    return 2;
  } else if (id >= 200 && id < 300) {
    return 3;
  } else if (id >= 500 && id < 600) {
    return 4;
  } else if (id >= 300 && id < 400) {
    return 5;
  } else if (id >= 800 && id < 810) {
    return 6;
  } else if (id === 800) {
    return 7;
  }
  return 7;
}
