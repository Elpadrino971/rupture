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
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="card-glass overflow-hidden" style={{ height: 'calc(100vh - 12rem)' }}>
        {/* Chat header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">💬</span>
                Coach Post-Rupture
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-primary-100">
                  Protecteur • Logique • Bienveillant
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">Mode sécurisé</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-gradient-to-b from-neutral-50/50 to-white overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100% - 160px)' }}>
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                  <span className="text-xl">🤖</span>
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-soft ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white'
                    : message.isAntiRelapseMode
                    ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 text-neutral-900'
                    : 'bg-white border border-neutral-200 text-neutral-900'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-2 flex items-center gap-2 ${
                    message.role === 'user' ? 'text-primary-100' : 'text-neutral-500'
                  }`}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-calm-400 to-calm-600 flex items-center justify-center ml-3 flex-shrink-0 shadow-md text-white font-bold">
                  Toi
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-scale-in">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                <span className="text-xl">🤖</span>
              </div>
              <div className="bg-white border border-neutral-200 rounded-2xl px-5 py-4 shadow-soft">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" />
                  <div className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-neutral-200 p-4 shadow-inner-soft">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Écris ce que tu ressens..."
              className="input-field"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="btn-primary whitespace-nowrap"
            >
              <span className="hidden md:inline">Envoyer</span>
              <svg className="w-5 h-5 md:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
