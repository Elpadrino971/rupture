import { NextRequest, NextResponse } from 'next/server';
import type { JournalAnalysisRequest, JournalAnalysisResponse, EmotionalState } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: JournalAnalysisRequest = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Simple keyword-based emotion detection (would be replaced with AI in production)
    const lowerContent = content.toLowerCase();
    const detectedTags: EmotionalState[] = [];

    if (lowerContent.includes('triste') || lowerContent.includes('pleurer')) {
      detectedTags.push('tristesse');
    }
    if (lowerContent.includes('manque') || lowerContent.includes('absence')) {
      detectedTags.push('manque');
    }
    if (lowerContent.includes('colère') || lowerContent.includes('énervé')) {
      detectedTags.push('colere');
    }
    if (lowerContent.includes('seul') || lowerContent.includes('solitude')) {
      detectedTags.push('solitude');
    }
    if (lowerContent.includes('pense') || lowerContent.includes('obsédé')) {
      detectedTags.push('obsession');
    }
    if (lowerContent.includes('nostalgie') || lowerContent.includes('souvenir')) {
      detectedTags.push('nostalgie');
    }

    if (detectedTags.length === 0) {
      detectedTags.push('confusion');
    }

    // Generate analysis (would use AI in production)
    const analysis = `Je vois que tu ressens ${detectedTags.map(tag => tag).join(', ')}. C'est une étape normale du processus de guérison.`;

    const insights = [
      'Tu exprimes tes émotions, c\'est déjà un pas important',
      'Continue à écrire, ça aide à clarifier ce que tu ressens',
      'Rappelle-toi : les émotions passent, même les plus intenses',
    ];

    // TODO: Replace with actual AI API call
    /*
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.journalAnalysis },
        { role: "user", content: content }
      ],
    });
    */

    const response: JournalAnalysisResponse = {
      emotionalTags: detectedTags,
      analysis,
      insights,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Journal analysis API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
