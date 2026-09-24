export type Page = 'home' | 'lessons' | 'quiz' | 'results' | 'survey' | 'about';

export interface LessonSection {
  title: string;
  content: string[];
  tips?: string[];
}

export interface ScenarioCase {
  title: string;
  situation: string;
  risk: string;
  safeAction: string;
}

export interface LessonUnit {
  id: number;
  unitNumber: number;
  title: string;
  subtitle: string;
  iconName: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  sections: LessonSection[];
  keyTakeaway: string;
  realWorldScenario: ScenarioCase;
  safetyChecklist: string[];
  summary: string;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'scenario';

export interface QuizQuestion {
  id: number;
  unitId: number;
  unitTitle: string;
  type: QuestionType;
  question: string;
  scenarioContext?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  date: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: 'ดีเยี่ยม' | 'ดีมาก' | 'ดี' | 'ควรทบทวนบทเรียน';
  timeSpentSeconds: number;
  userAnswers: { [questionId: number]: number };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressText?: string;
}

export interface SurveyResponse {
  educationLevel: string;
  ratings: { [key: number]: number };
  suggestions: string;
  submittedAt: string;
}

export interface UserLearningState {
  completedLessons: number[];
  lastActiveLessonId: number;
  quizHistory: QuizAttempt[];
  highestScore: number;
  totalQuizAttempts: number;
  surveySubmitted: boolean;
  surveyResponse?: SurveyResponse;
  achievements: Achievement[];
}
