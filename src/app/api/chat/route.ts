import { NextRequest, NextResponse } from 'next/server';
import type { ChatRequest, ChatResponse, Message } from '@/types';
import { detectRelapseTriggers } from '@/lib/utils';
import { SYSTEM_PROMPTS, BREATHING_EXERCISES, ALTERNATIVE_ACTIVITIES } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, conversationId } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Detect relapse triggers
    const relapseDetection = detectRelapseTriggers(message);

    let responseContent = '';
    let antiRelapseResponse = null;

    if (relapseDetection.detected) {
      // Anti-relapse mode triggered
      antiRelapseResponse = {
        breathing: BREATHING_EXERCISES,
        emotionalRedirection: `Je vois que tu veux ${relapseDetection.triggerPhrases.join(', ')}. Stop. On va prendre une minute ensemble.`,
        hiddenNeedAnalysis: 'Ce que tu cherches vraiment, ce n\'est pas de recontacter cette personne. C\'est peut-être de la validation, du contrôle, ou de combler un vide. Mais ça ne marchera pas.',
        boundaryReminder: 'Tu mérites mieux que de supplier, stalker, ou manipuler quelqu\'un. Respecte-toi.',
        alternatives: ALTERNATIVE_ACTIVITIES.slice(0, 3),
      };

      responseContent = `**⚠️ MODE ANTI-RECHUTE ACTIVÉ**\n\n${antiRelapseResponse.emotionalRedirection}\n\n**Respiration guidée :**\n${antiRelapseResponse.breathing.join('\n')}\n\n**La vérité :**\n${antiRelapseResponse.hiddenNeedAnalysis}\n\n**Rappel :**\n${antiRelapseResponse.boundaryReminder}\n\n**Au lieu de ça, fais une de ces choses :**\n${antiRelapseResponse.alternatives.map((a, i) => `${i + 1}. ${a}`).join('\n')}`;
    } else {
      // Normal coaching response
      // In production, this would call OpenAI/Claude API
      // For now, we'll use a simple response
      responseContent = `Je t'entends. ${
        message.toLowerCase().includes('mal') || message.toLowerCase().includes('triste')
          ? "C'est dur, je sais. Mais le fait que tu sois ici, que tu parles, c'est déjà une victoire."
          : "Dis-m'en plus. Je suis là pour comprendre et t'aider."
      }\n\nQu'est-ce qui te pèse le plus en ce moment ?`;

      // TODO: Replace with actual AI API call
      /*
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS.coach },
          { role: "user", content: message }
        ],
      });
      responseContent = completion.choices[0].message.content || '';
      */
    }

    const responseMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      isAntiRelapseMode: relapseDetection.detected,
    };

    const response: ChatResponse = {
      message: responseMessage,
      conversationId: conversationId || Date.now().toString(),
      antiRelapseTriggered: relapseDetection.detected,
      antiRelapseResponse: antiRelapseResponse || undefined,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
