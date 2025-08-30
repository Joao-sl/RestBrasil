import { StateRawResponse } from '@/lib';

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
