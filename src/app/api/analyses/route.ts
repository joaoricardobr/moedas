import { NextRequest, NextResponse } from 'next/server';
import { MOCK_ANALYSES } from '@/lib/mockData';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
    }

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    const MAX_SIZE = 20 * 1024 * 1024; // 20MB

    const parts: any[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: `Tipo inválido: ${file.type}` }, { status: 400 });
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: 'Arquivo muito grande (máx 20MB)' }, { status: 400 });
      }

      const buffer = await file.arrayBuffer();
      const base64Data = Buffer.from(buffer).toString('base64');
      
      parts.push({
        inlineData: {
          mimeType: file.type,
          data: base64Data,
        }
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.includes('SuaChaveAqui')) {
      return NextResponse.json({ error: 'Chave do Gemini não configurada corretamente' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    parts.unshift({
      text: `Você é um especialista numismata nível global. Analise as imagens desta moeda e retorne um objeto JSON ESTRITAMENTE válido com o seguinte formato, não adicione marcação markdown ao redor do JSON:
{
  "coin": {
    "name": "Nome popular da moeda",
    "country": "País de origem",
    "countryCode": "Sigla de 2 letras",
    "year": 1900,
    "faceValue": 100,
    "currencyUnit": "Réis, Centavos, etc",
    "material": "gold" | "silver" | "copper" | "bronze" | "nickel" | "bimetallic" | "other",
    "diameter": 25,
    "weight": 10,
    "kmNumber": "KM#123",
    "isErrorCoin": false,
    "isProof": false,
    "isCommemorative": false,
    "currency": "BRL"
  },
  "confidence": 0.95,
  "grade": "VF20" | "EF40" | "MS60" | "etc",
  "rarity": "common" | "uncommon" | "scarce" | "rare" | "very_rare",
  "rarityScore": 5,
  "estimatedValueMin": 100,
  "estimatedValueMax": 200,
  "estimatedValueAvg": 150,
  "currency": "BRL",
  "demandIndex": 8,
  "authenticityScore": 0.98,
  "ocrText": "texto detectado na moeda"
}

Responda APENAS com o JSON. Estime os valores com base no mercado atual para essa moeda específica nessa conservação.`
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts }]
    });

    let jsonStr = response.text || '{}';
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }
    
    const analysisData = JSON.parse(jsonStr.trim());

    // Merge with mock base to have a full object for the UI
    const finalAnalysis = {
      ...MOCK_ANALYSES[0],
      ...analysisData,
      id: `a_${Date.now()}`,
      status: 'completed',
    };

    return NextResponse.json({
      success: true,
      analysis: finalAnalysis,
      message: 'Análise concluída',
    });
  } catch (err: any) {
    console.error('[upload] Error:', err);
    return NextResponse.json({ error: `Erro interno: ${err.message || String(err)}` }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

  const analyses = MOCK_ANALYSES.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    data: analyses,
    page,
    limit,
    total: MOCK_ANALYSES.length,
    pages: Math.ceil(MOCK_ANALYSES.length / limit),
  });
}
