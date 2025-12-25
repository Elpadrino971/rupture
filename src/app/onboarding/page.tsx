'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { OnboardingData, EmotionalState } from '@/types';
import { EMOTIONAL_STATES } from '@/lib/constants';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    breakupRecency: 'recent',
    painLevel: 3,
    hasRelapseUrges: false,
    emotionalState: [],
    wantsToContact: false,
    currentThoughts: '',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      localStorage.setItem('onboardingData', JSON.stringify(data));
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleEmotionalState = (state: EmotionalState) => {
    setData((prev) => ({
      ...prev,
      emotionalState: prev.emotionalState.includes(state)
        ? prev.emotionalState.filter((s) => s !== state)
        : [...prev.emotionalState, state],
    }));
  };

  return (
    <main className="min-h-screen p-6 flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-calm-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-2xl w-full relative z-10 animate-fade-in">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-neutral-700">
              Étape {step}/{totalSteps}
            </span>
            <span className="text-sm font-semibold text-primary-600">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3 shadow-inner-soft overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-600 to-primary-500 h-3 rounded-full transition-all duration-500 shadow-glow"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="card p-10 space-y-6 animate-scale-in">
          {/* Step 1: Breakup recency */}
          {step === 1 && (
            <>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-glow mb-4">
                  <span className="text-3xl">📅</span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Quand la rupture a-t-elle eu lieu ?
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { value: 'recent', label: 'Très récente (moins d\'une semaine)' },
                  { value: 'weeks', label: 'Il y a quelques semaines' },
                  { value: 'months', label: 'Il y a plusieurs mois' },
                  { value: 'old', label: 'Il y a plus de 6 mois' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setData({ ...data, breakupRecency: option.value as any })
                    }
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                      data.breakupRecency === option.value
                        ? 'border-primary-600 bg-gradient-to-r from-primary-50 to-primary-100 shadow-soft transform scale-105'
                        : 'border-neutral-200 hover:border-primary-300 hover:shadow-soft'
                    }`}
                  >
                    <span className="font-semibold text-neutral-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Pain level */}
          {step === 2 && (
            <>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-glow mb-4">
                  <span className="text-3xl">💔</span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Quel est ton niveau de douleur actuel ?
                </h2>
                <p className="text-neutral-600 mt-2">
                  Sois honnête. Il n'y a pas de mauvaise réponse.
                </p>
              </div>
              <div className="space-y-6 py-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={data.painLevel}
                  onChange={(e) =>
                    setData({ ...data, painLevel: parseInt(e.target.value) as any })
                  }
                  className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  style={{
                    background: `linear-gradient(to right, #0158a1 0%, #0158a1 ${((data.painLevel - 1) / 4) * 100}%, #e5e7eb ${((data.painLevel - 1) / 4) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-neutral-600 px-2">
                  <span>1 - Gérable</span>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600">{data.painLevel}</div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {data.painLevel === 1 && 'Ça va'}
                      {data.painLevel === 2 && 'Difficile'}
                      {data.painLevel === 3 && 'Douloureux'}
                      {data.painLevel === 4 && 'Très dur'}
                      {data.painLevel === 5 && 'Insupportable'}
                    </div>
                  </div>
                  <span>5 - Insupportable</span>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Emotional state */}
          {step === 3 && (
            <>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl shadow-glow mb-4">
                  <span className="text-3xl">🎭</span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Comment te sens-tu en ce moment ?
                </h2>
                <p className="text-neutral-600 mt-2">Sélectionne toutes les émotions qui te touchent.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(EMOTIONAL_STATES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => toggleEmotionalState(key as EmotionalState)}
                    className={`p-5 rounded-xl border-2 text-center transition-all duration-300 ${
                      data.emotionalState.includes(key as EmotionalState)
                        ? 'border-primary-600 bg-gradient-to-br from-primary-50 to-primary-100 shadow-soft transform scale-105'
                        : 'border-neutral-200 hover:border-primary-300 hover:shadow-soft'
                    }`}
                  >
                    <div className="text-3xl mb-2">{value.emoji}</div>
                    <div className="text-sm font-semibold text-neutral-900">
                      {value.label}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 4: Relapse urges */}
          {step === 4 && (
            <>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl shadow-glow mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  As-tu des envies de recontacter ton ex ?
                </h2>
                <p className="text-neutral-600 mt-2">
                  C'est normal. L'important est de le reconnaître.
                </p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => setData({ ...data, hasRelapseUrges: true, wantsToContact: true })}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    data.hasRelapseUrges
                      ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 shadow-soft'
                      : 'border-neutral-200 hover:border-orange-300 hover:shadow-soft'
                  }`}
                >
                  <div className="font-bold text-neutral-900 mb-2 text-lg">
                    🔥 Oui, très souvent
                  </div>
                  <div className="text-sm text-neutral-600 leading-relaxed">
                    J'ai constamment envie de lui écrire ou de voir ce qu'il/elle fait
                  </div>
                </button>
                <button
                  onClick={() => setData({ ...data, hasRelapseUrges: false, wantsToContact: false })}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    !data.hasRelapseUrges
                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-soft'
                      : 'border-neutral-200 hover:border-green-300 hover:shadow-soft'
                  }`}
                >
                  <div className="font-bold text-neutral-900 mb-2 text-lg">
                    ✅ Non, je résiste bien
                  </div>
                  <div className="text-sm text-neutral-600 leading-relaxed">
                    Je n'ai pas ou peu d'envies de reprendre contact
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Step 5: Current thoughts */}
          {step === 5 && (
            <>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-glow mb-4">
                  <span className="text-3xl">💭</span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">
                  Qu'est-ce qui te passe par la tête en ce moment ?
                </h2>
                <p className="text-neutral-600 mt-2">
                  Quelques mots suffisent. Le coach va t'aider à y voir plus clair.
                </p>
              </div>
              <textarea
                value={data.currentThoughts}
                onChange={(e) =>
                  setData({ ...data, currentThoughts: e.target.value })
                }
                placeholder="Par exemple : 'Je n'arrête pas de penser à lui/elle...'"
                className="input-field h-48 resize-none"
                autoFocus
              />
            </>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="btn-secondary"
              >
                ← Retour
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (step === 3 && data.emotionalState.length === 0) ||
                (step === 5 && !data.currentThoughts.trim())
              }
              className="btn-primary flex-1"
            >
              {step === totalSteps ? 'Commencer le coaching →' : 'Suivant →'}
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        {step === 1 && (
          <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <p className="text-sm text-amber-800 leading-relaxed">
                Ce coach ne t'aidera jamais à recontacter ton ex ou à manipuler la
                situation. Son but est de protéger ton bien-être et ta dignité.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
