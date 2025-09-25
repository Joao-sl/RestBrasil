import { CountryMapped, CountryRaw, StateRawResponse } from '@/lib';

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
