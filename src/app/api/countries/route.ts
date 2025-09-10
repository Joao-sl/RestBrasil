import { fetchHandler } from '@/helpers';
import { CountryRaw } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // TODO: Rate limit

  const searchParams = request.nextUrl.searchParams;
  const countryParam = searchParams.get('country')?.trim();

  try {
    const { data, status } = await fetchHandler<CountryRaw[]>(
      `https://restcountries.com/v3.1/translation/${countryParam}`,
    );

    if (status === 404) {
      return NextResponse.json(
        { error: 'Country not found' },
        { status: status },
      );
    }

    if (status < 200 || status > 299 || !data) {
      return NextResponse.json({ error: 'Internal Error' }, { status: status });
    }

    if (data.length > 1) {
      const filtered = data.filter(country => {
        return Object.keys(country.translations ?? {}).some(
          lang =>
            country.translations?.[lang]?.common?.toLowerCase() ===
            countryParam?.toLowerCase(),
        );
      });

      if (filtered) {
        return NextResponse.json(filtered[0]);
      }
    }

    return NextResponse.json(data[0]);
  } catch {
    return NextResponse.json({ error: 'Unknown Error' }, { status: 500 });
  }
}
