export interface StateRawResponse {
  'UF-id': number;
  'UF-sigla': string;
  'UF-nome': string;
  'regiao-id': number;
  'regiao-sigla': string;
  'regiao-nome': string;
}

export interface StateData {
  ufId: number;
  ufSigla: string;
  ufNome: string;
  regiaoId: number;
  regiaoSigla: string;
  regiaoNome: string;
}
