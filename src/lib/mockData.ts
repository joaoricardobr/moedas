// ============================================================
// COINVISION AI — MOCK DATA FOR DEMO
// ============================================================
import type {
  CoinAnalysis, Coin, MarketData, AuctionResult,
  DashboardStats, AdminStats, CollectionItem, PriceAlert, PricePoint
} from './types';

// ── COINS ────────────────────────────────────────────────────
export const MOCK_COINS: Coin[] = [
  {
    id: 'c1', name: '500 Réis - Caboclo', namePt: '500 Réis - Caboclo (1889)',
    country: 'Brasil', countryCode: 'BR', year: 1889, faceValue: 500,
    currencyUnit: 'Réis', material: 'silver', diameter: 30.0, weight: 12.5,
    mintage: 350000, rarity: 'scarce', rarityScore: 7.2, kmNumber: 'KM#481',
    isErrorCoin: false, isProof: false, isCommemorative: false,
    obverseDesc: 'Cabeça do Caboclo voltada para a direita',
    reverseDesc: 'Valor facial cercado por ramos de café',
    estimatedValue: 4800, currency: 'BRL',
    referenceImages: ['https://upload.wikimedia.org/wikipedia/commons/0/0f/500_reis_1889.jpg'],
  },
  {
    id: 'c2', name: '1000 Réis - Estrelas', namePt: '1000 Réis com Estrelas (1912)',
    country: 'Brasil', countryCode: 'BR', year: 1912, faceValue: 1000,
    currencyUnit: 'Réis', material: 'silver', diameter: 37.0, weight: 25.0,
    mintage: 50000, rarity: 'rare', rarityScore: 8.5, kmNumber: 'KM#506',
    isErrorCoin: false, isProof: false, isCommemorative: false,
    estimatedValue: 18500, currency: 'BRL',
  },
  {
    id: 'c3', name: '1 Real - Descobrimento', namePt: '1 Real - 500 Anos do Descobrimento',
    country: 'Brasil', countryCode: 'BR', year: 2000, faceValue: 1,
    currencyUnit: 'Real', material: 'bimetallic', diameter: 27.0, weight: 7.0,
    mintage: 15000000, rarity: 'common', rarityScore: 2.1, kmNumber: 'KM#655',
    isErrorCoin: false, isProof: false, isCommemorative: true,
    estimatedValue: 35, currency: 'BRL',
  },
  {
    id: 'c4', name: 'Morgan Dollar', namePt: 'Morgan Dollar (1881-S)',
    country: 'Estados Unidos', countryCode: 'US', year: 1881, faceValue: 1,
    currencyUnit: 'Dollar', material: 'silver', diameter: 38.1, weight: 26.73,
    mintage: 12760000, rarity: 'uncommon', rarityScore: 5.8, kmNumber: 'KM#110',
    isErrorCoin: false, isProof: false, isCommemorative: false,
    estimatedValue: 2200, currency: 'BRL',
  },
  {
    id: 'c5', name: '50 Réis - Erro de Cunhagem', namePt: '50 Réis com Dupla Cunhagem',
    country: 'Brasil', countryCode: 'BR', year: 1920, faceValue: 50,
    currencyUnit: 'Réis', material: 'copper', diameter: 21.0, weight: 4.5,
    mintage: 5000000, rarity: 'very_rare', rarityScore: 9.1, kmNumber: 'KM#517a',
    isErrorCoin: true, isProof: false, isCommemorative: false,
    estimatedValue: 32000, currency: 'BRL',
  },
];

// ── ANALYSES ─────────────────────────────────────────────────
export const MOCK_ANALYSES: CoinAnalysis[] = [
  {
    id: 'a1', userId: 'u1', coin: MOCK_COINS[0], status: 'completed',
    confidence: 0.947, grade: 'EF45', gradeConfidence: 0.88,
    rarity: 'scarce', rarityScore: 7.2,
    estimatedValueMin: 3800, estimatedValueMax: 6200, estimatedValueAvg: 4800,
    currency: 'BRL', demandIndex: 7.4, authenticityScore: 0.96, isAuthentic: true,
    isErrorCoin: false,
    ocrText: '500 RÉIS · REPÚBLICA DOS ESTADOS UNIDOS DO BRASIL · 1889',
    ocrData: { year: 1889, country: 'Brasil', denomination: '500 Réis', inscriptions: ['REPÚBLICA DOS ESTADOS UNIDOS DO BRASIL'] },
    pipelineSteps: [
      { name: 'Upload & Validação', status: 'done', durationMs: 120 },
      { name: 'Pré-processamento', status: 'done', durationMs: 340 },
      { name: 'OCR (Tesseract)', status: 'done', durationMs: 890 },
      { name: 'Detecção YOLO', status: 'done', durationMs: 650 },
      { name: 'Embedding CLIP', status: 'done', durationMs: 720 },
      { name: 'Busca por Similaridade', status: 'done', durationMs: 430 },
      { name: 'Consulta Catálogos', status: 'done', durationMs: 1200 },
      { name: 'Análise de Mercado', status: 'done', durationMs: 2100 },
      { name: 'Classificação Conservação', status: 'done', durationMs: 580 },
      { name: 'Geração do Relatório', status: 'done', durationMs: 210 },
    ],
    uploadIds: ['img1', 'img2'],
    createdAt: '2026-05-25T10:15:00Z', completedAt: '2026-05-25T10:15:07Z',
  },
  {
    id: 'a2', userId: 'u1', coin: MOCK_COINS[4], status: 'completed',
    confidence: 0.912, grade: 'VF30', gradeConfidence: 0.79,
    rarity: 'very_rare', rarityScore: 9.1,
    estimatedValueMin: 25000, estimatedValueMax: 40000, estimatedValueAvg: 32000,
    currency: 'BRL', demandIndex: 9.3, authenticityScore: 0.91, isAuthentic: true,
    isErrorCoin: true,
    ocrData: { year: 1920, country: 'Brasil', denomination: '50 Réis' },
    pipelineSteps: [
      { name: 'Upload & Validação', status: 'done', durationMs: 115 },
      { name: 'Pré-processamento', status: 'done', durationMs: 380 },
      { name: 'OCR (Tesseract)', status: 'done', durationMs: 920 },
      { name: 'Detecção YOLO', status: 'done', durationMs: 700 },
      { name: 'Embedding CLIP', status: 'done', durationMs: 690 },
      { name: 'Busca por Similaridade', status: 'done', durationMs: 510 },
      { name: 'Consulta Catálogos', status: 'done', durationMs: 1400 },
      { name: 'Análise de Mercado', status: 'done', durationMs: 2300 },
      { name: 'Detecção de Erros', status: 'done', durationMs: 880 },
      { name: 'Classificação Conservação', status: 'done', durationMs: 560 },
      { name: 'Geração do Relatório', status: 'done', durationMs: 190 },
    ],
    uploadIds: ['img3'],
    createdAt: '2026-05-25T11:42:00Z', completedAt: '2026-05-25T11:42:09Z',
  },
  {
    id: 'a3', userId: 'u1', coin: MOCK_COINS[3], status: 'processing',
    confidence: 0, uploadIds: ['img4'], currency: 'BRL',
    pipelineSteps: [
      { name: 'Upload & Validação', status: 'done', durationMs: 105 },
      { name: 'Pré-processamento', status: 'done', durationMs: 310 },
      { name: 'OCR (Tesseract)', status: 'running' },
      { name: 'Detecção YOLO', status: 'pending' },
      { name: 'Embedding CLIP', status: 'pending' },
      { name: 'Busca por Similaridade', status: 'pending' },
      { name: 'Consulta Catálogos', status: 'pending' },
      { name: 'Análise de Mercado', status: 'pending' },
      { name: 'Classificação Conservação', status: 'pending' },
      { name: 'Geração do Relatório', status: 'pending' },
    ],
    createdAt: '2026-05-25T14:58:00Z',
  },
];

// ── MARKET DATA ───────────────────────────────────────────────
function genHistory(base: number, months = 12): PricePoint[] {
  const points: PricePoint[] = [];
  let price = base * 0.7;
  for (let i = months; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    price = price * (1 + (Math.random() - 0.4) * 0.12);
    points.push({
      date: d.toISOString().slice(0, 7),
      price: Math.round(price),
      grade: 'EF45',
      source: ['Heritage', 'Stack\'s Bowers', 'MercadoLivre'][Math.floor(Math.random() * 3)],
    });
  }
  return points;
}

export const MOCK_MARKET_DATA: MarketData[] = [
  {
    coinId: 'c1', grade: 'EF45', priceAvg: 4800, priceMin: 3200, priceMax: 7500,
    priceTrend: 12.4, volume30d: 8, currency: 'BRL',
    history: genHistory(4800),
  },
  {
    coinId: 'c5', grade: 'VF30', priceAvg: 32000, priceMin: 25000, priceMax: 45000,
    priceTrend: 28.7, volume30d: 3, currency: 'BRL',
    history: genHistory(32000),
  },
];

// ── AUCTIONS ──────────────────────────────────────────────────
export const MOCK_AUCTIONS: AuctionResult[] = [
  {
    id: 'au1', title: '500 Réis 1889 - EF45', house: 'Heritage Auctions',
    realizedPrice: 5200, estimateLow: 4000, estimateHigh: 6000,
    grade: 'EF45', currency: 'BRL', status: 'ended',
    endsAt: '2026-05-10T20:00:00Z', sourceUrl: 'https://ha.com',
  },
  {
    id: 'au2', title: 'Morgan Dollar 1881-S MS64', house: 'Stack\'s Bowers',
    realizedPrice: 2800, estimateLow: 2000, estimateHigh: 3500,
    grade: 'MS64', currency: 'BRL', status: 'ended',
    endsAt: '2026-05-18T18:00:00Z',
  },
  {
    id: 'au3', title: '1000 Réis 1912 - EF40', house: 'Numista Leilões',
    estimateLow: 15000, estimateHigh: 22000,
    grade: 'EF40', currency: 'BRL', status: 'active',
    endsAt: '2026-06-05T20:00:00Z',
  },
  {
    id: 'au4', title: '50 Réis 1920 Dupla Cunhagem', house: 'Casa do Colecionador',
    estimateLow: 28000, estimateHigh: 42000,
    grade: 'VF30', currency: 'BRL', status: 'upcoming',
    endsAt: '2026-06-15T20:00:00Z',
  },
];

// ── DASHBOARD STATS ───────────────────────────────────────────
export const MOCK_STATS: DashboardStats = {
  totalAnalyses: 14872,
  totalCoins: 8341,
  avgConfidence: 0.923,
  totalUsers: 2847,
  analysesToday: 247,
  coinsIdentified: 12455,
  rareCoinFound: 183,
  apiCallsToday: 5642,
  accuracyRate: 0.944,
  processingQueue: 12,
  revenueMonth: 48750,
  activeSubscriptions: 612,
};

export const MOCK_ADMIN_STATS: AdminStats = {
  ...MOCK_STATS,
  newUsersToday: 34,
  storageUsedGB: 847.3,
  avgProcessingMs: 7240,
  errorRate: 0.012,
};

// ── COLLECTION ────────────────────────────────────────────────
export const MOCK_COLLECTION: CollectionItem[] = [
  {
    id: 'ci1', coin: MOCK_COINS[0], analysis: MOCK_ANALYSES[0],
    grade: 'EF45', purchasePrice: 3200, currentValue: 4800,
    gainLoss: 1600, gainLossPct: 50, purchaseDate: '2024-03-15',
    notes: 'Comprada em leilão Heritage',
  },
  {
    id: 'ci2', coin: MOCK_COINS[3],
    grade: 'MS63', purchasePrice: 1800, currentValue: 2200,
    gainLoss: 400, gainLossPct: 22.2, purchaseDate: '2023-11-20',
  },
  {
    id: 'ci3', coin: MOCK_COINS[2],
    grade: 'MS65', purchasePrice: 25, currentValue: 35,
    gainLoss: 10, gainLossPct: 40, purchaseDate: '2025-01-05',
  },
];

// ── PRICE ALERTS ──────────────────────────────────────────────
export const MOCK_ALERTS: PriceAlert[] = [
  {
    id: 'al1', coinId: 'c1', coinName: '500 Réis 1889',
    grade: 'EF45', targetPrice: 3500, direction: 'below',
    triggered: false, createdAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 'al2', coinId: 'c2', coinName: '1000 Réis 1912',
    targetPrice: 20000, direction: 'below',
    triggered: true, triggeredAt: '2026-05-20T14:30:00Z',
    createdAt: '2026-04-15T10:00:00Z',
  },
];

// ── CHART DATA ────────────────────────────────────────────────
export const MONTHLY_ANALYSES = [
  { month: 'Jan', analyses: 820, users: 145 },
  { month: 'Fev', analyses: 1100, users: 180 },
  { month: 'Mar', analyses: 950, users: 167 },
  { month: 'Abr', analyses: 1400, users: 220 },
  { month: 'Mai', analyses: 1850, users: 290 },
  { month: 'Jun', analyses: 1620, users: 265 },
  { month: 'Jul', analyses: 2100, users: 340 },
  { month: 'Ago', analyses: 2350, users: 390 },
  { month: 'Set', analyses: 2100, users: 365 },
  { month: 'Out', analyses: 2700, users: 440 },
  { month: 'Nov', analyses: 3100, users: 510 },
  { month: 'Dez', analyses: 3480, users: 580 },
];

export const RARITY_DISTRIBUTION = [
  { name: 'Comum', value: 52, color: '#6B7280' },
  { name: 'Incomum', value: 24, color: '#10B981' },
  { name: 'Escassa', value: 12, color: '#3B82F6' },
  { name: 'Rara', value: 7, color: '#8B5CF6' },
  { name: 'Muito Rara', value: 3, color: '#F59E0B' },
  { name: 'Ultra Rara', value: 1.5, color: '#EF4444' },
  { name: 'Única', value: 0.5, color: '#D4AF37' },
];

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 18400, subscriptions: 320 },
  { month: 'Fev', revenue: 22100, subscriptions: 380 },
  { month: 'Mar', revenue: 19800, subscriptions: 355 },
  { month: 'Abr', revenue: 28500, subscriptions: 460 },
  { month: 'Mai', revenue: 35200, subscriptions: 530 },
  { month: 'Jun', revenue: 31800, subscriptions: 495 },
  { month: 'Jul', revenue: 39400, subscriptions: 570 },
  { month: 'Ago', revenue: 44100, subscriptions: 612 },
];
