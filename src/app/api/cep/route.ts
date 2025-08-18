import { fetchHandler } from '@/helpers';
import { CepResponse } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  //TODO: Rate limit

  const cepParam = request.nextUrl.searchParams ?? '';
  const cleanCep = cepParam.get('cep')?.replace(/\D/g, '');

  if (!cleanCep) {
    return NextResponse.json({ error: 'Digite um CEP' }, { status: 400 });
  }

  if (cleanCep.length !== 8) {
    return NextResponse.json(
      { error: 'CEP inválido, deve conter 8 dígitos' },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await fetchHandler<CepResponse>(
      `https://viacep.com.br/ws/${cleanCep}/json/`,
      { signal: request.signal },
    );

    if (data?.erro) {
      return NextResponse.json(
        { error: 'CEP não encontrado' },
        { status: 400 },
      );
    }

    if (error) {
      return NextResponse.json({ error: 'CEP inválido' }, { status: 400 });
    }

    return NextResponse.json(data!);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Connection Timeout' },
        { status: 504 },
      );
    }

    return NextResponse.json({ error: 'Connection Error' }, { status: 500 });
  }
}
