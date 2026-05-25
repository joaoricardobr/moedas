// ============================================================
// COINVISION AI — TYPE DEFINITIONS
// ============================================================

export type CoinGrade = 
  | 'P1' | 'F2' | 'F12' | 'VF20' | 'VF25' | 'VF30'
  | 'EF40' | 'EF45' | 'AU50' | 'AU55' | 'AU58'
  | 'MS60' | 'MS61' | 'MS62' | 'MS63' | 'MS64' | 'MS65'
  | 'MS66' | 'MS67' | 'MS68' | 'MS69' | 'MS70'
  | 'PF60' | 'PF65' | 'PF70';

export type RarityLevel = 'common' | 'uncommon' | 'scarce' | 'rare' | 'very_rare' | 'ultra_rare' | 'unique';
export type MaterialType = 'gold' | 'silver' | 'copper' | 'bronze' | 'nickel' | 'zinc' | 'aluminum' | 'platinum' | 'bimetallic' | 'other';
export type AnalysisStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'review';
export type ImageType = 'obverse' | 'reverse' | 'edge' | 'detail';
export type UserRole = 'admin' | 'analyst' | 'premium' | 'basic';
export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise';

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  plan: SubscriptionPlan;
  coinsAnalyzed: number;
  uploadsUsed: number;
  uploadsLimit: number;
  createdAt: string;
}

export interface Coin {
  id: string;
  name: string;
  namePt?: string;
  country: string;
  countryCode: string;
  year: number;
  yearEnd?: number;
  faceValue: number;
  currencyUnit: string;
  material: MaterialType;
  diameter: number;
  weight: number;
  mintage?: number;
  rarity: RarityLevel;
  rarityScore: number;
  kmNumber?: string;
  catalogNumber?: string;
  isErrorCoin: boolean;
  isProof: boolean;
  isCommemorative: boolean;
  obverseDesc?: string;
  reverseDesc?: string;
  designer?: string;
  referenceImages?: string[];
  estimatedValue?: number;
  currency: string;
}

export interface CoinAnalysis {
  id: string;
  userId: string;
  coin?: Coin;
  status: AnalysisStatus;
  confidence: number;
  grade?: CoinGrade;
  gradeConfidence?: number;
  rarity?: RarityLevel;
  rarityScore?: number;
  estimatedValueMin?: number;
  estimatedValueMax?: number;
  estimatedValueAvg?: number;
  currency: string;
  demandIndex?: number;
  authenticityScore?: number;
  isAuthentic?: boolean;
  isErrorCoin?: boolean;
  ocrText?: string;
  ocrData?: {
    year?: number;
    country?: string;
    denomination?: string;
    inscriptions?: string[];
  };
  pipelineSteps?: PipelineStep[];
  images?: AnalysisImage[];
  uploadIds: string[];
  createdAt: string;
  completedAt?: string;
}

export interface PipelineStep {
  name: string;
  status: 'pending' | 'running' | 'done' | 'error';
  durationMs?: number;
  output?: string;
}

export interface AnalysisImage {
  id: string;
  imageType: ImageType;
  originalUrl: string;
  processedUrl?: string;
  enhancedUrl?: string;
  thumbnailUrl?: string;
}

export interface PricePoint {
  date: string;
  price: number;
  grade: CoinGrade;
  source: string;
}

export interface MarketData {
  coinId: string;
  grade: CoinGrade;
  priceAvg: number;
  priceMin: number;
  priceMax: number;
  priceTrend: number;
  volume30d: number;
  currency: string;
  history: PricePoint[];
}

export interface AuctionResult {
  id: string;
  title: string;
  house: string;
  realizedPrice?: number;
  estimateLow?: number;
  estimateHigh?: number;
  grade?: CoinGrade;
  currency: string;
  endsAt?: string;
  sourceUrl?: string;
  status: 'upcoming' | 'active' | 'ended';
}

export interface DashboardStats {
  totalAnalyses: number;
  totalCoins: number;
  avgConfidence: number;
  totalUsers: number;
  analysesToday: number;
  coinsIdentified: number;
  rareCoinFound: number;
  apiCallsToday: number;
  accuracyRate: number;
  processingQueue: number;
  revenueMonth: number;
  activeSubscriptions: number;
}

export interface AdminStats extends DashboardStats {
  newUsersToday: number;
  storageUsedGB: number;
  avgProcessingMs: number;
  errorRate: number;
}

export interface CollectionItem {
  id: string;
  coin?: Coin;
  analysis?: CoinAnalysis;
  grade?: CoinGrade;
  purchasePrice?: number;
  currentValue?: number;
  gainLoss?: number;
  gainLossPct?: number;
  purchaseDate?: string;
  notes?: string;
  isForSale?: boolean;
  askingPrice?: number;
}

export interface PriceAlert {
  id: string;
  coinId: string;
  coinName: string;
  grade?: CoinGrade;
  targetPrice: number;
  direction: 'above' | 'below';
  triggered: boolean;
  triggeredAt?: string;
  createdAt: string;
}

export const GRADE_LABELS: Record<CoinGrade, string> = {
  P1: 'P-1 (Poor)', F2: 'F-2 (Fair)', F12: 'F-12 (Fine)',
  VF20: 'VF-20', VF25: 'VF-25', VF30: 'VF-30 (Very Fine)',
  EF40: 'EF-40', EF45: 'EF-45 (Extremely Fine)',
  AU50: 'AU-50', AU55: 'AU-55', AU58: 'AU-58 (About Uncirculated)',
  MS60: 'MS-60', MS61: 'MS-61', MS62: 'MS-62', MS63: 'MS-63',
  MS64: 'MS-64', MS65: 'MS-65', MS66: 'MS-66', MS67: 'MS-67',
  MS68: 'MS-68', MS69: 'MS-69', MS70: 'MS-70 (Perfect)',
  PF60: 'PF-60', PF65: 'PF-65', PF70: 'PF-70 (Proof Perfect)',
};

export const RARITY_LABELS: Record<RarityLevel, string> = {
  common: 'Comum', uncommon: 'Incomum', scarce: 'Escassa',
  rare: 'Rara', very_rare: 'Muito Rara', ultra_rare: 'Ultra Rara', unique: 'Única',
};

export const RARITY_COLORS: Record<RarityLevel, string> = {
  common: '#6B7280', uncommon: '#10B981', scarce: '#3B82F6',
  rare: '#8B5CF6', very_rare: '#F59E0B', ultra_rare: '#EF4444', unique: '#D4AF37',
};

export const MATERIAL_LABELS: Record<MaterialType, string> = {
  gold: 'Ouro', silver: 'Prata', copper: 'Cobre', bronze: 'Bronze',
  nickel: 'Níquel', zinc: 'Zinco', aluminum: 'Alumínio',
  platinum: 'Platina', bimetallic: 'Bimetálica', other: 'Outro',
};
