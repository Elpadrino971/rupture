import { RELAPSE_TRIGGERS } from './constants';
import type { RelapseDetection, EmotionalState } from '@/types';

/**
 * Detects relapse triggers in user message
 */
export function detectRelapseTriggers(message: string): RelapseDetection {
  const lowerMessage = message.toLowerCase();
  const detected: { type: string; phrases: string[] } = {
    type: '',
    phrases: [],
  };

  // Check each trigger category
  for (const [type, phrases] of Object.entries(RELAPSE_TRIGGERS)) {
    for (const phrase of phrases) {
      if (lowerMessage.includes(phrase.toLowerCase())) {
        detected.type = type;
        detected.phrases.push(phrase);
      }
    }
  }

  const hasDetection = detected.phrases.length > 0;

  // Determine severity based on number and type of triggers
  let severity: 'low' | 'medium' | 'high' = 'low';
  if (detected.phrases.length >= 3) {
    severity = 'high';
  } else if (detected.phrases.length >= 2) {
    severity = 'medium';
  } else if (hasDetection) {
    severity = detected.type === 'contact' || detected.type === 'stalking' ? 'medium' : 'low';
  }

  return {
    detected: hasDetection,
    triggerPhrases: detected.phrases,
    severity,
    type: detected.type as any,
  };
}

/**
 * Formats date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats time for display
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Calculates days since breakup
 */
export function daysSinceBreakup(breakupDate: Date): number {
  const now = new Date();
  const diff = now.getTime() - breakupDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Gets emotional state color class
 */
export function getEmotionalStateColor(state: EmotionalState): string {
  const colors: Record<EmotionalState, string> = {
    tristesse: 'bg-blue-100 text-blue-700 border-blue-200',
    nostalgie: 'bg-amber-100 text-amber-700 border-amber-200',
    colere: 'bg-red-100 text-red-700 border-red-200',
    manque: 'bg-rose-100 text-rose-700 border-rose-200',
    solitude: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    obsession: 'bg-purple-100 text-purple-700 border-purple-200',
    reconstruction: 'bg-green-100 text-green-700 border-green-200',
    acceptation: 'bg-teal-100 text-teal-700 border-teal-200',
    confusion: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return colors[state] || 'bg-gray-100 text-gray-700 border-gray-200';
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Class name utility
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
