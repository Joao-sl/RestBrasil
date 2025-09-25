export interface CountryRaw {
  name?: {
    common?: string;
    official?: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  tld?: string[];
  cca2?: string;
  ccn3?: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: Record<string, { name: string; symbol: string }>;
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  capital?: string[];
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  languages?: Record<string, string>;
  latlng?: number[];
  landlocked?: boolean;
  area?: number;
  borders?: string[];
  demonyms?: Record<string, { f?: string; m?: string }>;
  cca3?: string;
  translations?: Record<string, { official?: string; common?: string }>;
  flag?: string;
  maps: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  population?: number;
  gini?: Record<string, number>;
  fifa?: string;
  car?: {
    signs?: string[];
    side?: string;
  };
  timezones?: string[];
  continents?: string[];
  flags?: {
    png?: string;
    svg?: string;
    alt?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  startOfWeek?: string;
  capitalInfo?: {
    latlng?: number[];
  };
  postalCode?: {
    format?: string;
    regex?: string;
  };
}

export interface CountryMapped {
  flags: {
    svg: string | undefined;
    alt: string | undefined;
  };
  names: {
    common: string | undefined;
    official: string | undefined;
    commonNamePtBr: string | undefined;
    officialNamePtBr: string | undefined;
    native:
      | {
          language: string | undefined;
          official: string | undefined;
          common: string | undefined;
        }[]
      | undefined;
  };
  subregion: string | undefined;
  area: number | undefined;
  borders: string[] | undefined;
  continent: string[] | undefined;
  population: string | undefined;
  capital: string[] | undefined;
  tld: string[] | undefined;
  gini: Record<string, number> | undefined;
  languages: string[] | undefined;
  currencies: Record<string, { symbol: string; name: string }> | undefined;
  car: {
    signs: string[] | undefined;
    side: string | undefined;
  };
  maps: string | undefined;
  unMember: string | undefined;
  independent: string | undefined;
  fifa: string | undefined;
  timezone: string[] | undefined;
}
