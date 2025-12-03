import { NextRequest, NextResponse } from 'next/server';
import type { BreakupAnalysisRequest, BreakupAnalysis } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: BreakupAnalysisRequest = await request.json();
    const { breakupStory, relationshipDuration, whatWentWrong } = body;

    if (!breakupStory || !breakupStory.trim()) {
      return NextResponse.json(
        { error: 'Breakup story is required' },
        { status: 400 }
      );
    }

    // In production, this would call OpenAI/Claude API for deep analysis
    // For now, returning a template response

    const analysis: BreakupAnalysis = {
      id: Date.now().toString(),
      userId: 'demo-user',
      summary:
        'Votre relation était marquée par une forte dépendance émotionnelle de votre part, et un manque de réciprocité de la sienne. La rupture, bien que douloureuse, était probablement inévitable.',
      whatHappened:
        'La relation a commencé de manière intense mais a progressivement révélé des incompatibilités fondamentales. Vous donniez beaucoup sans recevoir en retour, ce qui a créé un déséquilibre.',
      mistakes: {
        yours: [
          'Trop de disponibilité émotionnelle',
          'Acceptation de comportements inacceptables',
          'Mise de côté de vos propres besoins',
          'Communication passive-agressive au lieu de clarté',
        ],
        theirs: [
          'Manque de considération pour vos besoins',
          'Communication froide ou absente',
          'Prise pour acquis de votre présence',
          'Absence d\'engagement clair',
        ],
      },
      emotionalIllusions: [
        'Vous pensiez pouvoir "sauver" la relation seul(e)',
        'Vous idéalisiez les bons moments en minimisant les mauvais',
        'Vous croyiez que votre amour suffirait',
        'Vous confondiez attachement et amour',
      ],
      toxicPatterns: [
        'Cycle de rupture/réconciliation',
        'Communication par sous-entendus',
        'Déséquilibre dans les efforts',
        'Dépendance émotionnelle',
      ],
      wasItHealthy: {
        assessment: 'addictive',
        explanation:
          'Cette relation était davantage basée sur l\'addiction émotionnelle que sur un amour sain. Les hauts étaient très hauts, les bas très bas, et vous vous sentiez incomplet(e) sans cette personne. Ce n\'est pas de l\'amour équilibré.',
      },
      insights: [
        'Cette rupture est une opportunité de reconstruction',
        'Vous méritez une relation équilibrée où vous êtes valorisé(e)',
        'Travaillez sur votre indépendance émotionnelle',
        'Identifiez vos limites avant la prochaine relation',
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // TODO: Replace with actual AI API call
    /*
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.breakupAnalysis },
        { role: "user", content: `Relationship duration: ${relationshipDuration}\n\nStory: ${breakupStory}\n\nWhat went wrong: ${whatWentWrong}` }
      ],
    });
    */

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Breakup analysis API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
