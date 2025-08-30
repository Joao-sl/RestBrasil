// cSpell:disable

export interface NameBasic {
  rank: number;
  nome: string;
  freq: number;
  percentual: number;
  ufMax: string;
  ufMaxProp: string;
  regiao: number;
  sexo: string;
  nomes: string;
}

export interface NameMap {
  nome: string;
  uf: number;
  freq: number;
  populacao: number;
  sexo: string;
  prop: number;
}

export interface NameRange {
  nome: string;
  freq: number;
  regiao: number;
  sexo: string;
  faixa: string;
}

export interface NameRaking {
  nome: string;
  regiao: number;
  freq: number;
  rank: number;
  sexo: string;
}

export interface NameUnion {
  dataBasic: NameBasic[];
  dataMap: NameMap[];
  dataRange: NameRange[];
  dataRanking: NameRaking[];
}
