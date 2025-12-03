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
      // Save onboarding data and redirect to dashboard
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
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-neutral-600">
              Étape {step}/{totalSteps}
            </span>
            <span className="text-sm text-neutral-600">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Step 1: Breakup recency */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-neutral-900">
                Quand la rupture a-t-elle eu lieu ?
              </h2>
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
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      data.breakupRecency === option.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-200 hover:border-primary-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Pain level */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-neutral-900">
                Quel est ton niveau de douleur actuel ?
              </h2>
              <p className="text-neutral-600">
                Sois honnête. Il n'y a pas de mauvaise réponse.
              </p>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={data.painLevel}
                  onChange={(e) =>
                    setData({ ...data, painLevel: parseInt(e.target.value) as any })
                  }
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>1 - Gérable</span>
                  <span className="font-semibold text-lg text-neutral-900">
                    {data.painLevel}
                  </span>
                  <span>5 - Insupportable</span>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Emotional state */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-neutral-900">
                Comment te sens-tu en ce moment ?
              </h2>
              <p className="text-neutral-600">Sélectionne toutes les émotions qui te touchent.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(EMOTIONAL_STATES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => toggleEmotionalState(key as EmotionalState)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      data.emotionalState.includes(key as EmotionalState)
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{value.emoji}</div>
                    <div className="text-sm font-medium text-neutral-900">
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
              <h2 className="text-2xl font-bold text-neutral-900">
                As-tu des envies de recontacter ton ex ?
              </h2>
              <p className="text-neutral-600">
                C'est normal. L'important est de le reconnaître.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setData({ ...data, hasRelapseUrges: true, wantsToContact: true })}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    data.hasRelapseUrges
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  <div className="font-semibold text-neutral-900 mb-1">
                    Oui, très souvent
                  </div>
                  <div className="text-sm text-neutral-600">
                    J'ai constamment envie de lui écrire ou de voir ce qu'il/elle fait
                  </div>
                </button>
                <button
                  onClick={() => setData({ ...data, hasRelapseUrges: false, wantsToContact: false })}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    !data.hasRelapseUrges
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  <div className="font-semibold text-neutral-900 mb-1">
                    Non, je résiste bien
                  </div>
                  <div className="text-sm text-neutral-600">
                    Je n'ai pas ou peu d'envies de reprendre contact
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Step 5: Current thoughts */}
          {step === 5 && (
            <>
              <h2 className="text-2xl font-bold text-neutral-900">
                Qu'est-ce qui te passe par la tête en ce moment ?
              </h2>
              <p className="text-neutral-600">
                Quelques mots suffisent. Le coach va t'aider à y voir plus clair.
              </p>
              <textarea
                value={data.currentThoughts}
                onChange={(e) =>
                  setData({ ...data, currentThoughts: e.target.value })
                }
                placeholder="Par exemple : 'Je n'arrête pas de penser à lui/elle...'"
                className="w-full h-40 p-4 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:outline-none resize-none"
              />
            </>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all"
              >
                Retour
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (step === 3 && data.emotionalState.length === 0) ||
                (step === 5 && !data.currentThoughts.trim())
              }
              className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all"
            >
              {step === totalSteps ? 'Commencer' : 'Suivant'}
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        {step === 1 && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800 leading-relaxed">
              ⚠️ Ce coach ne t'aidera jamais à recontacter ton ex ou à manipuler la
              situation. Son but est de protéger ton bien-être et ta dignité.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
