'use client';

import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/types';
import { detectRelapseTriggers } from '@/lib/utils';
import { BREATHING_EXERCISES, ALTERNATIVE_ACTIVITIES } from '@/lib/constants';

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [antiRelapseMode, setAntiRelapseMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load onboarding data and create welcome message
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content: `Salut. Je suis là pour t'aider à traverser cette période difficile.\n\nJe vois que tu passes par ${
          data.emotionalState.join(', ')
        }. C'est normal. ${
          data.hasRelapseUrges
            ? "J'ai aussi vu que tu as des envies de recontacter ton ex. On va travailler là-dessus ensemble."
            : ''
        }\n\nMon rôle n'est pas de te dire quoi faire, mais de te protéger de tes impulsions et de t'aider à voir clair.\n\n**Ce que je peux faire :**\n- T'aider à gérer tes émotions\n- Te stopper si tu veux faire quelque chose de nocif\n- T'aider à comprendre ce qui s'est passé\n- Te guider vers la reconstruction\n\n**Ce que je ne ferai JAMAIS :**\n- T'aider à recontacter ton ex\n- T'aider à manipuler ou tester quelqu'un\n- Encourager le stalking ou la vengeance\n\nComment te sens-tu là, maintenant ?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }

    // Listen for emergency anti-relapse button
    const handleAntiRelapse = () => {
      setAntiRelapseMode(true);
      const emergencyMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `**MODE ANTI-RECHUTE ACTIVÉ** 🛑\n\nOK, stop. Respire.\n\nAvant de faire quoi que ce soit, on va prendre 30 secondes ensemble.\n\n**Respiration guidée :**\n${BREATHING_EXERCISES.join('\n')}\n\n*Maintenant, dis-moi : qu'est-ce que tu voulais faire exactement ?*`,
        timestamp: new Date(),
        isAntiRelapseMode: true,
      };
      setMessages((prev) => [...prev, emergencyMessage]);
      scrollToBottom();
    };

    window.addEventListener('trigger-anti-relapse', handleAntiRelapse);
    return () => window.removeEventListener('trigger-anti-relapse', handleAntiRelapse);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Detect relapse triggers
    const relapseDetection = detectRelapseTriggers(input);

    // Simulate AI response (will be replaced with actual API call)
    setTimeout(() => {
      let responseContent = '';

      if (relapseDetection.detected) {
        // Anti-relapse response
        setAntiRelapseMode(true);
        responseContent = `**⚠️ STOP - Je détecte une impulsion nocive**\n\nJe vois que tu veux ${relapseDetection.triggerPhrases.join(
          ', '
        )}.\n\n**Je ne peux pas t'aider à faire ça. Et voici pourquoi :**\n\n1. **Ça ne changera rien** - Ça va juste te faire mal et potentiellement empirer la situation\n2. **Tu mérites mieux** - Que de supplier, stalker, ou manipuler quelqu'un\n3. **Ça va te faire régresser** - Tous tes progrès vont partir en fumée\n\n**Ce que tu ressens vraiment :**\nCe n'est pas lui/elle qui te manque. C'est :\n- Le besoin de validation ?\n- La peur de la solitude ?\n- L'addiction à l'intensité émotionnelle ?\n- Le refus d'accepter que c'est fini ?\n\n**Au lieu de ça, fais une de ces choses :**\n${ALTERNATIVE_ACTIVITIES.slice(0, 3)
  .map((activity, i) => `${i + 1}. ${activity}`)
  .join('\n')}\n\nQu'est-ce que tu en dis ? Tu es prêt(e) à choisir une alternative ?`;
      } else if (antiRelapseMode) {
        // Follow-up in anti-relapse mode
        responseContent = `Je suis fier(ère) de toi. Tu es encore là, tu résistes.\n\nC'est exactement ce qu'il faut faire. Ces moments passent toujours, même si ça ne le semble pas.\n\nComment tu te sens maintenant ? L'envie est encore forte ou elle commence à passer ?`;
        setAntiRelapseMode(false);
      } else {
        // Normal coaching response
        responseContent = `Je t'entends. ${input.toLowerCase().includes('mal') || input.toLowerCase().includes('triste')
          ? "C'est dur, je sais. Mais le fait que tu sois ici, que tu parles, c'est déjà une victoire."
          : "Dis-m'en plus. Je suis là pour comprendre et t'aider."
        }\n\nQu'est-ce qui te pèse le plus en ce moment ?`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        isAntiRelapseMode: relapseDetection.detected,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 12rem)' }}>
        {/* Chat header */}
        <div className="bg-primary-600 text-white p-4">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <span>💬</span>
            Coach Post-Rupture
          </h1>
          <p className="text-sm text-primary-100 mt-1">
            Protecteur • Logique • Bienveillant
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100% - 140px)' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : message.isAntiRelapseMode
                    ? 'bg-red-50 border-2 border-red-300 text-neutral-900'
                    : 'bg-neutral-100 text-neutral-900'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-primary-100' : 'text-neutral-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-neutral-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Écris ce que tu ressens..."
              className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
