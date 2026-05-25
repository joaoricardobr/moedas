import { NextRequest, NextResponse } from 'next/server';
import { MOCK_ANALYSES } from '@/lib/mockData';

// GET /api/analyses/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  // In production: query DB by ID with auth check
  const analysis = MOCK_ANALYSES.find(a => a.id === id) || MOCK_ANALYSES[0];
  
  if (!analysis) {
    return NextResponse.json({ error: 'Análise não encontrada' }, { status: 404 });
  }

  return NextResponse.json({ data: analysis });
}

// PATCH /api/analyses/[id] — update feedback
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  // In production: validate + update DB
  return NextResponse.json({
    success: true,
    message: 'Feedback registrado com sucesso',
    analysisId: id,
  });
}
