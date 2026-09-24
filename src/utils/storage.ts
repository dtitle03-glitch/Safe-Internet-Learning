import { Achievement, QuizAttempt, SurveyResponse, UserLearningState } from '../types';

const STORAGE_KEY = 'safe_internet_learning_state_v1';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'start_learning',
    title: 'เริ่มต้นการเรียนรู้',
    description: 'เปิดเข้าสู่บทเรียนแรกและเริ่มศึกษาเนื้อหา',
    iconName: 'Sparkles',
    unlocked: false,
    progressText: '0/1 บทเรียน'
  },
  {
    id: 'diligent_learner',
    title: 'ผู้เรียนสม่ำเสมอ',
    description: 'ทำแบบทดสอบวัดความรู้อย่างน้อย 2 ครั้ง',
    iconName: 'Repeat',
    unlocked: false,
    progressText: '0/2 ครั้ง'
  },
  {
    id: 'cyber_guardian',
    title: 'ผู้พิทักษ์โลกออนไลน์',
    description: 'ทำคะแนนแบบทดสอบได้ตั้งแต่ 90% ขึ้นไป',
    iconName: 'Award',
    unlocked: false,
    progressText: 'เกณฑ์ 90%'
  },
  {
    id: 'cyber_master',
    title: 'นักเรียนรู้ทันภัยออนไลน์',
    description: 'ศึกษาและทำเครื่องหมายว่าเรียนจบครบทั้ง 8 หน่วย',
    iconName: 'ShieldCheck',
    unlocked: false,
    progressText: '0/8 หน่วย'
  },
  {
    id: 'feedback_contributor',
    title: 'นักสำรวจข้อมูล',
    description: 'ร่วมทำแบบประเมินความคิดเห็นเพื่อพัฒนาแอป',
    iconName: 'MessageSquareText',
    unlocked: false,
    progressText: 'ยังไม่ส่งแบบประเมิน'
  }
];

export const getInitialState = (): UserLearningState => {
  if (typeof window === 'undefined') {
    return {
      completedLessons: [],
      lastActiveLessonId: 1,
      quizHistory: [],
      highestScore: 0,
      totalQuizAttempts: 0,
      surveySubmitted: false,
      achievements: INITIAL_ACHIEVEMENTS
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        completedLessons: [],
        lastActiveLessonId: 1,
        quizHistory: [],
        highestScore: 0,
        totalQuizAttempts: 0,
        surveySubmitted: false,
        achievements: INITIAL_ACHIEVEMENTS
      };
    }

    const parsed: UserLearningState = JSON.parse(raw);
    // Ensure all achievements exist in case of future additions
    const mergedAchievements = INITIAL_ACHIEVEMENTS.map((defaultAch) => {
      const existing = parsed.achievements?.find((a) => a.id === defaultAch.id);
      return existing || defaultAch;
    });

    return {
      completedLessons: parsed.completedLessons || [],
      lastActiveLessonId: parsed.lastActiveLessonId || 1,
      quizHistory: parsed.quizHistory || [],
      highestScore: parsed.highestScore || 0,
      totalQuizAttempts: parsed.totalQuizAttempts || 0,
      surveySubmitted: parsed.surveySubmitted || false,
      surveyResponse: parsed.surveyResponse,
      achievements: mergedAchievements
    };
  } catch (error) {
    console.warn('Failed to parse local learning state', error);
    return {
      completedLessons: [],
      lastActiveLessonId: 1,
      quizHistory: [],
      highestScore: 0,
      totalQuizAttempts: 0,
      surveySubmitted: false,
      achievements: INITIAL_ACHIEVEMENTS
    };
  }
};

export const saveLearningState = (state: UserLearningState): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save learning state', error);
  }
};

export const evaluateAchievements = (
  state: UserLearningState,
  newUnlockedCallback?: (ach: Achievement) => void
): UserLearningState => {
  const achievements = [...state.achievements];
  const now = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const checkAndUnlock = (id: string, condition: boolean, progress: string) => {
    const idx = achievements.findIndex((a) => a.id === id);
    if (idx !== -1) {
      const current = achievements[idx];
      achievements[idx] = {
        ...current,
        progressText: progress
      };
      if (condition && !current.unlocked) {
        achievements[idx] = {
          ...achievements[idx],
          unlocked: true,
          unlockedAt: now
        };
        newUnlockedCallback?.(achievements[idx]);
      }
    }
  };

  // 1. Start learning (has completed at least 1 lesson OR viewed active lesson)
  const hasStarted = state.completedLessons.length > 0 || state.lastActiveLessonId > 1;
  checkAndUnlock(
    'start_learning',
    hasStarted,
    hasStarted ? 'สำเร็จแล้ว' : '0/1 บทเรียน'
  );

  // 2. Diligent learner: quiz attempts >= 2
  const attempts = state.totalQuizAttempts;
  checkAndUnlock(
    'diligent_learner',
    attempts >= 2,
    attempts >= 2 ? `สำเร็จแล้ว (${attempts} ครั้ง)` : `${attempts}/2 ครั้ง`
  );

  // 3. Cyber guardian: highest score >= 90%
  const maxScore = state.highestScore;
  checkAndUnlock(
    'cyber_guardian',
    maxScore >= 90,
    maxScore >= 90 ? `สำเร็จแล้ว (${maxScore}%)` : `คะแนนสูงสุด ${maxScore}% (เกณฑ์ 90%)`
  );

  // 4. Cyber master: 8 units completed
  const completedCount = state.completedLessons.length;
  checkAndUnlock(
    'cyber_master',
    completedCount >= 8,
    completedCount >= 8 ? 'สำเร็จครบ 8 หน่วยแล้ว' : `${completedCount}/8 หน่วย`
  );

  // 5. Feedback contributor: survey submitted
  const surveyDone = state.surveySubmitted;
  checkAndUnlock(
    'feedback_contributor',
    surveyDone,
    surveyDone ? 'ส่งแบบประเมินเรียบร้อยแล้ว' : 'ยังไม่ส่งแบบประเมิน'
  );

  return {
    ...state,
    achievements
  };
};

export const calculateGrade = (percentage: number): 'ดีเยี่ยม' | 'ดีมาก' | 'ดี' | 'ควรทบทวนบทเรียน' => {
  if (percentage >= 90) return 'ดีเยี่ยม';
  if (percentage >= 80) return 'ดีมาก';
  if (percentage >= 70) return 'ดี';
  return 'ควรทบทวนบทเรียน';
};
