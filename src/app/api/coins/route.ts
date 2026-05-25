import { NextRequest, NextResponse } from 'next/server';
import { MOCK_COINS } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const country = searchParams.get('country') || '';
  const year = searchParams.get('year');
  const material = searchParams.get('material') || '';
  const rarity = searchParams.get('rarity') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

  // In production: full-text search with pg_trgm + vector similarity
  let coins = [...MOCK_COINS];

  if (query) {
    const q = query.toLowerCase();
    coins = coins.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.namePt?.toLowerCase().includes(q) ||
      c.kmNumber?.toLowerCase().includes(q) ||
      String(c.year).includes(q)
    );
  }

  if (country) {
    coins = coins.filter(c => c.countryCode === country || c.country.toLowerCase().includes(country.toLowerCase()));
  }

  if (year) {
    const y = parseInt(year);
    coins = coins.filter(c => c.year === y || (c.yearEnd && c.year <= y && c.yearEnd >= y));
  }

  if (material) {
    coins = coins.filter(c => c.material === material);
  }

  if (rarity) {
    coins = coins.filter(c => c.rarity === rarity);
  }

  const total = coins.length;
  const paginated = coins.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    data: paginated,
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
}
