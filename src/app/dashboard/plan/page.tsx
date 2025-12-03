'use client';

import { useState, useEffect } from 'react';
import type { ReconstructionPlan, DailyTask } from '@/types';
import { TASK_TYPES } from '@/lib/constants';

export default function PlanPage() {
  const [plan, setPlan] = useState<ReconstructionPlan | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<7 | 14 | 21 | 30>(14);

  useEffect(() => {
    // Load plan from localStorage
    const saved = localStorage.getItem('reconstructionPlan');
    if (saved) {
      setPlan(JSON.parse(saved));
    }
  }, []);

  const generatePlan = () => {
    const tasks: DailyTask[] = [];

    // Generate tasks for each day
    for (let day = 1; day <= selectedDuration; day++) {
      if (day === 1) {
        tasks.push({
          id: `task-${day}-1`,
          day,
          title: 'Supprimer/Masquer les photos',
          description: 'Retire de ta vue toutes les photos de ton ex. Archive-les si tu veux, mais ne les garde pas visibles.',
          type: 'boundary',
          completed: false,
        });
      } else if (day === 2) {
        tasks.push({
          id: `task-${day}-1`,
          day,
          title: 'Bloquer sur les réseaux',
          description: 'Bloque ou masque ton ex sur tous les réseaux sociaux. Pas de stalking.',
          type: 'boundary',
          completed: false,
        });
      } else if (day === 3) {
        tasks.push({
          id: `task-${day}-1`,
          day,
          title: 'Écrire une lettre (à ne pas envoyer)',
          description: 'Écris tout ce que tu aurais voulu dire. Puis brûle la lettre ou déchire-la.',
          type: 'writing',
          completed: false,
        });
      } else if (day % 7 === 0) {
        tasks.push({
          id: `task-${day}-1`,
          day,
          title: 'Bilan hebdomadaire',
          description: 'Écris dans ton journal : comment tu te sens par rapport à la semaine dernière ?',
          type: 'emotional',
          completed: false,
        });
      } else if (day % 3 === 0) {
        tasks.push({
          id: `task-${day}-1`,
          day,
          title: 'Activité physique intense',
          description: 'Sport, course, vélo, danse... Évacue l\'énergie négative.',
          type: 'self-care',
          completed: false,
        });
      } else {
        const routines = [
          { title: 'Routine matinale', description: 'Lève-toi à heure fixe, douche, petit-déj complet.' },
          { title: 'Appeler un ami', description: 'Parle à quelqu\'un qui te soutient vraiment.' },
          { title: 'Temps hors écran', description: '2h minimum sans téléphone, pour lire ou sortir.' },
          { title: 'Gratitude du jour', description: 'Écris 3 choses pour lesquelles tu es reconnaissant(e) aujourd\'hui.' },
        ];
        const routine = routines[(day - 1) % routines.length];
        tasks.push({
          id: `task-${day}-1`,
          day,
          title: routine.title,
          description: routine.description,
          type: 'routine',
          completed: false,
        });
      }
    }

    const newPlan: ReconstructionPlan = {
      id: Date.now().toString(),
      userId: 'demo-user',
      duration: selectedDuration,
      startDate: new Date(),
      currentDay: 1,
      dailyTasks: tasks,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setPlan(newPlan);
    localStorage.setItem('reconstructionPlan', JSON.stringify(newPlan));
    setIsCreating(false);
  };

  const toggleTaskCompletion = (taskId: string) => {
    if (!plan) return;

    const updatedTasks = plan.dailyTasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date() : undefined }
        : task
    );

    const updatedPlan = { ...plan, dailyTasks: updatedTasks, updatedAt: new Date() };
    setPlan(updatedPlan);
    localStorage.setItem('reconstructionPlan', JSON.stringify(updatedPlan));
  };

  const getCurrentDayTasks = () => {
    if (!plan) return [];
    const daysSinceStart = Math.floor(
      (new Date().getTime() - new Date(plan.startDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const currentDay = Math.min(daysSinceStart + 1, plan.duration);
    return plan.dailyTasks.filter((task) => task.day === currentDay);
  };

  const getProgress = () => {
    if (!plan) return 0;
    const completed = plan.dailyTasks.filter((task) => task.completed).length;
    return Math.round((completed / plan.dailyTasks.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
          <span>📅</span>
          Plan de Reconstruction
        </h1>
        <p className="text-neutral-600 mt-1">
          Un plan personnalisé pour avancer jour après jour.
        </p>
      </div>

      {!plan ? (
        /* Plan creation */
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          {!isCreating ? (
            <>
              <div className="text-6xl mb-4">🌱</div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Prêt(e) à construire ton plan ?
              </h2>
              <p className="text-neutral-600 max-w-lg mx-auto">
                Le coach va créer un plan structuré avec des tâches quotidiennes pour
                t'aider à avancer étape par étape.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Créer mon plan
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Quelle durée pour ton plan ?
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[7, 14, 21, 30].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration as any)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedDuration === duration
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      {duration}
                    </div>
                    <div className="text-sm text-neutral-600">jours</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={generatePlan}
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
                >
                  Générer mon plan
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
        /* Active plan */
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Plan de {plan.duration} jours
                </h3>
                <p className="text-sm text-neutral-600">
                  Commencé le{' '}
                  {new Date(plan.startDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600">
                  {getProgress()}%
                </div>
                <div className="text-sm text-neutral-600">complété</div>
              </div>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>

          {/* Today's tasks */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-2">
              <span>🎯</span>
              Tâches d'aujourd'hui
            </h3>
            <div className="space-y-3">
              {getCurrentDayTasks().map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-neutral-200 hover:border-primary-300'
                  }`}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-green-600 border-green-600'
                          : 'border-neutral-300'
                      }`}
                    >
                      {task.completed && <span className="text-white text-sm">✓</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{TASK_TYPES[task.type].icon}</span>
                        <h4
                          className={`font-semibold ${
                            task.completed
                              ? 'text-neutral-500 line-through'
                              : 'text-neutral-900'
                          }`}
                        >
                          {task.title}
                        </h4>
                      </div>
                      <p className="text-sm text-neutral-600">{task.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All tasks overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-neutral-900">
              Vue d'ensemble
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Array.from({ length: plan.duration }, (_, i) => i + 1).map((day) => {
                const dayTasks = plan.dailyTasks.filter((task) => task.day === day);
                const completed = dayTasks.filter((task) => task.completed).length;
                return (
                  <div
                    key={day}
                    className="p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-900">Jour {day}</span>
                      <span className="text-sm text-neutral-600">
                        {completed}/{dayTasks.length} complété{completed > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
