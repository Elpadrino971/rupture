// User types
export interface User {
  id: string;
  email: string;
  createdAt: Date;
  subscription?: Subscription;
  profile?: UserProfile;
}

export interface UserProfile {
  userId: string;
  breakupDate?: Date;
  breakupRecency: 'recent' | 'weeks' | 'months' | 'old';
  painLevel: 1 | 2 | 3 | 4 | 5;
  hasRelapseUrges: boolean;
  emotionalState: EmotionalState[];
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type EmotionalState =
  | 'tristesse'
  | 'nostalgie'
  | 'colere'
  | 'manque'
  | 'solitude'
  | 'obsession'
  | 'reconstruction'
  | 'acceptation'
  | 'confusion';

// Chat types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isAntiRelapseMode?: boolean;
  emotionalTags?: EmotionalState[];
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Anti-relapse types
export interface RelapseDetection {
  detected: boolean;
  triggerPhrases: string[];
  severity: 'low' | 'medium' | 'high';
  type: 'contact' | 'stalking' | 'manipulation' | 'revenge' | 'test';
}

export interface AntiRelapseResponse {
  breathing: string[];
  emotionalRedirection: string;
  hiddenNeedAnalysis: string;
  boundaryReminder: string;
  alternatives: string[];
}

// Journal types
export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  emotionalTags: EmotionalState[];
  aiAnalysis?: string;
  aiInsights?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Reconstruction plan types
export interface ReconstructionPlan {
  id: string;
  userId: string;
  duration: 7 | 14 | 21 | 30;
  startDate: Date;
  currentDay: number;
  dailyTasks: DailyTask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyTask {
  id: string;
  day: number;
  title: string;
  description: string;
  type: 'routine' | 'emotional' | 'writing' | 'boundary' | 'self-care';
  completed: boolean;
  completedAt?: Date;
}

// Breakup analysis types
export interface BreakupAnalysis {
  id: string;
  userId: string;
  summary: string;
  whatHappened: string;
  mistakes: {
    yours: string[];
    theirs: string[];
  };
  emotionalIllusions: string[];
  toxicPatterns: string[];
  wasItHealthy: {
    assessment: 'healthy' | 'addictive' | 'toxic' | 'unclear';
    explanation: string;
  };
  insights: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Subscription types
export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  planId: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API request/response types
export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: Message;
  conversationId: string;
  antiRelapseTriggered?: boolean;
  antiRelapseResponse?: AntiRelapseResponse;
}

export interface JournalAnalysisRequest {
  content: string;
}

export interface JournalAnalysisResponse {
  emotionalTags: EmotionalState[];
  analysis: string;
  insights: string[];
}

export interface BreakupAnalysisRequest {
  breakupStory: string;
  relationshipDuration: string;
  whatWentWrong: string;
}

// Onboarding types
export interface OnboardingData {
  breakupRecency: 'recent' | 'weeks' | 'months' | 'old';
  painLevel: 1 | 2 | 3 | 4 | 5;
  hasRelapseUrges: boolean;
  emotionalState: EmotionalState[];
  wantsToContact: boolean;
  currentThoughts: string;
}
