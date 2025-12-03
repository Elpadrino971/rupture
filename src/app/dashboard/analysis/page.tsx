'use client';

import { useState, useEffect } from 'react';
import type { BreakupAnalysis } from '@/types';

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<BreakupAnalysis | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    breakupStory: '',
    relationshipDuration: '',
    whatWentWrong: '',
  });

  useEffect(() => {
    // Load analysis from localStorage
    const saved = localStorage.getItem('breakupAnalysis');
    if (saved) {
      setAnalysis(JSON.parse(saved));
    }
  }, []);

  const handleAnalyze = async () => {
    if (!formData.breakupStory.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis (will be replaced with actual API call)
    setTimeout(() => {
      const newAnalysis: BreakupAnalysis = {
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

      setAnalysis(newAnalysis);
      localStorage.setItem('breakupAnalysis', JSON.stringify(newAnalysis));
      setIsCreating(false);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
          <span>🧠</span>
          Comprendre la Rupture
        </h1>
        <p className="text-neutral-600 mt-1">
          Une analyse objective pour voir clair.
        </p>
      </div>

      {!analysis ? (
        /* Analysis creation */
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {!isCreating ? (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Prêt(e) à comprendre ce qui s'est passé ?
              </h2>
              <p className="text-neutral-600 max-w-lg mx-auto">
                Le coach va analyser ta rupture avec objectivité et t'aider à voir les
                choses clairement, sans jugement.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Commencer l'analyse
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Raconte-moi ce qui s'est passé
              </h2>
              <p className="text-neutral-600">
                Sois honnête. Plus tu donnes de détails, plus l'analyse sera précise.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Durée de la relation
                  </label>
                  <input
                    type="text"
                    value={formData.relationshipDuration}
                    onChange={(e) =>
                      setFormData({ ...formData, relationshipDuration: e.target.value })
                    }
                    placeholder="Ex: 2 ans"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Raconte l'histoire de votre relation
                  </label>
                  <textarea
                    value={formData.breakupStory}
                    onChange={(e) =>
                      setFormData({ ...formData, breakupStory: e.target.value })
                    }
                    placeholder="Comment vous vous êtes rencontrés, comment ça s'est développé, les moments forts..."
                    className="w-full h-40 px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Qu'est-ce qui n'a pas fonctionné ?
                  </label>
                  <textarea
                    value={formData.whatWentWrong}
                    onChange={(e) =>
                      setFormData({ ...formData, whatWentWrong: e.target.value })
                    }
                    placeholder="Les problèmes, les conflits, ce qui a mené à la rupture..."
                    className="w-full h-40 px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={!formData.breakupStory.trim() || isAnalyzing}
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all"
                >
                  {isAnalyzing ? 'Analyse en cours...' : 'Analyser'}
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all"
                >
                  Annuler
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Analysis results */
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>📋</span>
              Résumé
            </h3>
            <p className="text-neutral-700 leading-relaxed">{analysis.summary}</p>
          </div>

          {/* What happened */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>📖</span>
              Ce qui s'est réellement passé
            </h3>
            <p className="text-neutral-700 leading-relaxed">{analysis.whatHappened}</p>
          </div>

          {/* Mistakes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>⚠️</span>
              Les erreurs de chacun
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Tes erreurs</h4>
                <ul className="space-y-2">
                  {analysis.mistakes.yours.map((mistake, i) => (
                    <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Ses erreurs</h4>
                <ul className="space-y-2">
                  {analysis.mistakes.theirs.map((mistake, i) => (
                    <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Emotional illusions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>🌫️</span>
              Tes illusions émotionnelles
            </h3>
            <ul className="space-y-2">
              {analysis.emotionalIllusions.map((illusion, i) => (
                <li key={i} className="text-neutral-700 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{illusion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Toxic patterns */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>🔁</span>
              Patterns toxiques identifiés
            </h3>
            <ul className="space-y-2">
              {analysis.toxicPatterns.map((pattern, i) => (
                <li key={i} className="text-neutral-700 flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>{pattern}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Health assessment */}
          <div
            className={`rounded-2xl shadow-lg p-6 ${
              analysis.wasItHealthy.assessment === 'healthy'
                ? 'bg-green-50 border-2 border-green-300'
                : analysis.wasItHealthy.assessment === 'toxic'
                ? 'bg-red-50 border-2 border-red-300'
                : 'bg-amber-50 border-2 border-amber-300'
            }`}
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>💊</span>
              Cette relation était-elle saine ?
            </h3>
            <div className="mb-3">
              <span
                className={`inline-block px-4 py-2 rounded-full font-semibold ${
                  analysis.wasItHealthy.assessment === 'healthy'
                    ? 'bg-green-200 text-green-800'
                    : analysis.wasItHealthy.assessment === 'toxic'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-amber-200 text-amber-800'
                }`}
              >
                {analysis.wasItHealthy.assessment === 'healthy'
                  ? 'Relation saine'
                  : analysis.wasItHealthy.assessment === 'toxic'
                  ? 'Relation toxique'
                  : 'Relation addictive'}
              </span>
            </div>
            <p className="text-neutral-700 leading-relaxed">
              {analysis.wasItHealthy.explanation}
            </p>
          </div>

          {/* Insights */}
          <div className="bg-primary-50 border-2 border-primary-300 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              Ce qu'il faut retenir
            </h3>
            <ul className="space-y-3">
              {analysis.insights.map((insight, i) => (
                <li key={i} className="text-neutral-700 flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5 font-bold">→</span>
                  <span className="font-medium">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
