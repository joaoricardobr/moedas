import { NextRequest, NextResponse } from 'next/server';
import { MOCK_ADMIN_STATS, MONTHLY_ANALYSES, RARITY_DISTRIBUTION, REVENUE_DATA } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  // In production: require admin JWT + aggregate DB queries
  return NextResponse.json({
    data: {
      stats: MOCK_ADMIN_STATS,
      monthlyAnalyses: MONTHLY_ANALYSES,
      rarityDistribution: RARITY_DISTRIBUTION,
      revenueData: REVENUE_DATA,
      systemHealth: {
        cpu: 42,
        memoryPct: 68,
        storageUsedGB: 847.3,
        redisConnected: true,
        dbConnected: true,
        aiModelLoaded: true,
        modelVersion: 'v2.3.1',
        avgProcessingMs: 7240,
        queueSize: 12,
        activeWorkers: 4,
      },
      apiStatus: [
        { name: 'Heritage Auctions', status: 'online', latencyMs: 342 },
        { name: 'PCGS', status: 'online', latencyMs: 218 },
        { name: 'NGC', status: 'online', latencyMs: 195 },
        { name: 'MercadoLivre', status: 'degraded', latencyMs: 1842 },
        { name: 'Google Gemini API', status: 'online', latencyMs: 1200 },
      ],
    }
  });
}
