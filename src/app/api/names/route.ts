import { fetchHandler } from '@/helpers';
import { NameBasic, NameMap, NameRaking, NameRange } from '@/lib';
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
      data: value.data ?? null,
      error: value.error,
      status: value.status,
    };
  }
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const name = params.get('name');
  const sex = params.get('sex') || ' ';
  const state = params.get('state') || 0;

  try {
    const promiseBasic = fetchHandler<NameBasic[]>(
      `https://servicodados.ibge.gov.br/api/v1/censos/nomes/basica?nome=${name}&regiao=${state}&sexo=${sex}`,
    );
    const promiseMap = fetchHandler<NameMap[]>(
      `https://servicodados.ibge.gov.br/api/v1/censos/nomes/mapa?nome=${name}&sexo=${sex}`,
    );
    const promiseRange = fetchHandler<NameRange[]>(
      `https://servicodados.ibge.gov.br/api/v1/censos/nomes/faixa?nome=${name}&localidade=${state}&sexo=${sex}`,
    );
    const promiseRanking = fetchHandler<NameRaking[]>(
      `https://servicodados.ibge.gov.br/api/v1/censos/nomes/ranking?&regiao=${state}sexo=${sex}`,
    );

    const settled = await Promise.allSettled([
      promiseBasic,
      promiseMap,
      promiseRange,
      promiseRanking,
    ]);

    const settledBasic = settled[0];
    const settledMap = settled[1];
    const settledRange = settled[2];
    const settledRanking = settled[3];

    const dataBasic = normalize<NameBasic[]>(settledBasic);
    const dataMap = normalize<NameMap[]>(settledMap);
    const dataRange = normalize<NameRange[]>(settledRange);
    const dataRanking = normalize<NameRaking[]>(settledRanking);

    if (
      dataBasic?.data?.length === 0 ||
      dataMap?.data?.length === 0 ||
      dataRange?.data?.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            'De acordo com os dados existem menos de 20 pessoas com esse nome no brasil',
        },
        { status: 400 },
      );
    }

    const response = {
      dataBasic: dataBasic?.data,
      dataMap: dataMap?.data,
      dataRange: dataRange?.data,
      dataRanking: dataRanking?.data,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        error: 'Unknown ERROR',
      },
      { status: 400 },
    );
  }
}
