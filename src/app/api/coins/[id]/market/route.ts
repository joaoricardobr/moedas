import { NextRequest, NextResponse } from 'next/server';
import { MOCK_MARKET_DATA, MOCK_AUCTIONS } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const grade = searchParams.get('grade');

  // In production: query market_prices + price_history tables
  const market = MOCK_MARKET_DATA.find(m => m.coinId === id) || MOCK_MARKET_DATA[0];
  const auctions = MOCK_AUCTIONS.filter(a => a.status !== 'ended').slice(0, 5);

  return NextResponse.json({
    data: {
      market,
      auctions,
      lastUpdated: new Date().toISOString(),
    }
  });
}
