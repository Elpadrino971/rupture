'use client';

import { useState, useEffect } from 'react';
import type { JournalEntry, EmotionalState } from '@/types';
import { EMOTIONAL_STATES } from '@/lib/constants';
import { getEmotionalStateColor } from '@/lib/utils';

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load journal entries from localStorage
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntry = async () => {
    if (!currentEntry.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis (will be replaced with actual API call)
    setTimeout(() => {
      const detectedTags: EmotionalState[] = [];
      const lowerContent = currentEntry.toLowerCase();

      // Simple keyword detection for demo
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

      if (detectedTags.length === 0) {
        detectedTags.push('confusion');
      }

      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        userId: 'demo-user',
        content: currentEntry,
        emotionalTags: detectedTags,
        aiAnalysis: `Je vois que tu ressens beaucoup de ${detectedTags
          .map((tag) => EMOTIONAL_STATES[tag].label.toLowerCase())
          .join(', ')}. C'est une étape normale du processus de guérison.`,
        aiInsights: [
          'Tu exprimes tes émotions, c\'est déjà un pas important',
          'Continue à écrire, ça aide à clarifier ce que tu ressens',
          'Rappelle-toi : les émotions passent, même les plus intenses',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setCurrentEntry('');
      setIsWriting(false);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
            <span>📔</span>
            Journal Émotionnel
          </h1>
          <p className="text-neutral-600 mt-1">
            Écris ce que tu ressens, sans filtre. Ça reste entre toi et le coach.
          </p>
        </div>
        {!isWriting && (
          <button
            onClick={() => setIsWriting(true)}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            ✍️ Nouvelle entrée
          </button>
        )}
      </div>

      {/* Writing area */}
      {isWriting && (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">
              Nouvelle entrée
            </h2>
            <button
              onClick={() => {
                setIsWriting(false);
                setCurrentEntry('');
              }}
              className="text-neutral-500 hover:text-neutral-700"
            >
              ✕
            </button>
          </div>

          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Écris tout ce qui te passe par la tête... Tes pensées, tes émotions, tes peurs, tes espoirs. Personne ne jugera."
            className="w-full h-64 p-4 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:outline-none resize-none text-neutral-900"
            autoFocus
          />

          <div className="flex gap-3">
            <button
              onClick={saveEntry}
              disabled={!currentEntry.trim() || isAnalyzing}
              className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all"
            >
              {isAnalyzing ? 'Analyse en cours...' : 'Enregistrer et analyser'}
            </button>
            <button
              onClick={() => {
                setIsWriting(false);
                setCurrentEntry('');
              }}
              className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Entries list */}
      <div className="space-y-4">
        {entries.length === 0 && !isWriting && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Aucune entrée pour le moment
            </h3>
            <p className="text-neutral-600 mb-6">
              Commence à écrire pour vider ta tête et suivre ton évolution.
            </p>
            <button
              onClick={() => setIsWriting(true)}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Créer ma première entrée
            </button>
          </div>
        )}

        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm text-neutral-500 mb-2">
                  {new Date(entry.createdAt).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {entry.emotionalTags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getEmotionalStateColor(
                        tag
                      )}`}
                    >
                      {EMOTIONAL_STATES[tag].emoji} {EMOTIONAL_STATES[tag].label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
                {entry.content}
              </p>
            </div>

            {entry.aiAnalysis && (
              <div className="bg-calm-50 border-l-4 border-primary-600 p-4 rounded-r-lg">
                <div className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                  <span>🤖</span>
                  Analyse du coach
                </div>
                <p className="text-sm text-neutral-700 mb-3">{entry.aiAnalysis}</p>
                {entry.aiInsights && entry.aiInsights.length > 0 && (
                  <ul className="space-y-1">
                    {entry.aiInsights.map((insight, i) => (
                      <li key={i} className="text-xs text-neutral-600 flex items-start gap-2">
                        <span className="text-primary-600 mt-0.5">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
