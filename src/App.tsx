import React, { useState, useEffect } from 'react';
import { Page, QuizAttempt, SurveyResponse, UserLearningState, Achievement } from './types';
import { LESSON_UNITS } from './data/lessonsData';
import { QUIZ_QUESTIONS } from './data/quizData';
import {
  getInitialState,
  saveLearningState,
  evaluateAchievements,
  calculateGrade
} from './utils/storage';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { ConfirmationModal } from './components/ConfirmationModal';
import { Home } from './components/Home';
import { LessonList } from './components/LessonList';
import { LessonDetail } from './components/LessonDetail';
import { Quiz } from './components/Quiz';
import { QuizResult } from './components/QuizResult';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Survey } from './components/Survey';
import { About } from './components/About';

export default function App() {
  // Navigation & View States
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Active Quiz View States
  const [activeQuizAttempt, setActiveQuizAttempt] = useState<QuizAttempt | null>(null);
  const [quizMode, setQuizMode] = useState<'taking' | 'result'>('taking');

  // User Learning State (synced with LocalStorage)
  const [learningState, setLearningState] = useState<UserLearningState>(getInitialState);

  // Toast notifications queue
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'ยืนยัน',
    onConfirm: () => {}
  });

  // Save to localStorage whenever learningState changes
  useEffect(() => {
    saveLearningState(learningState);
  }, [learningState]);

  // Helper to add toast
  const addToast = (type: 'success' | 'achievement' | 'info', title: string, message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigate handler
  const handleNavigate = (page: Page, lessonId?: number) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);

    if (page === 'lessons') {
      if (lessonId !== undefined) {
        setActiveLessonId(lessonId);
      } else if (activeLessonId === null) {
        setActiveLessonId(null);
      }
    } else {
      setActiveLessonId(null);
    }

    if (page === 'quiz') {
      setQuizMode('taking');
      setActiveQuizAttempt(null);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle complete unit
  const handleToggleLessonComplete = (lessonId: number) => {
    const isCompleted = learningState.completedLessons.includes(lessonId);
    let updatedCompleted: number[];

    if (isCompleted) {
      updatedCompleted = learningState.completedLessons.filter((id) => id !== lessonId);
      addToast('info', 'อัปเดตสถานะ', `ยกเลิกการเรียนจบหน่วยที่ ${lessonId}`);
    } else {
      updatedCompleted = [...learningState.completedLessons, lessonId];
      addToast('success', 'ยินดีด้วย!', `คุณเรียนจบหน่วยที่ ${lessonId} แล้ว`);
    }

    const nextState: UserLearningState = {
      ...learningState,
      completedLessons: updatedCompleted,
      lastActiveLessonId: lessonId
    };

    const evaluated = evaluateAchievements(nextState, (newAch) => {
      addToast('achievement', 'ปลดล็อกเหรียญรางวัล!', `${newAch.title}: ${newAch.description}`);
    });

    setLearningState(evaluated);
  };

  // When student starts or selects a lesson
  const handleSelectLesson = (lessonId: number) => {
    setActiveLessonId(lessonId);
    setCurrentPage('lessons');

    // Trigger start learning achievement evaluation if not done
    const nextState: UserLearningState = {
      ...learningState,
      lastActiveLessonId: lessonId
    };
    const evaluated = evaluateAchievements(nextState, (newAch) => {
      addToast('achievement', 'ปลดล็อกเหรียญรางวัล!', `${newAch.title}: ${newAch.description}`);
    });
    setLearningState(evaluated);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete Quiz handler
  const handleCompleteQuiz = (attempt: QuizAttempt) => {
    const newHistory = [attempt, ...learningState.quizHistory];
    const newAttempts = learningState.totalQuizAttempts + 1;
    const newHighScore = Math.max(learningState.highestScore, attempt.percentage);

    const nextState: UserLearningState = {
      ...learningState,
      quizHistory: newHistory,
      totalQuizAttempts: newAttempts,
      highestScore: newHighScore
    };

    const evaluated = evaluateAchievements(nextState, (newAch) => {
      addToast('achievement', 'ปลดล็อกเหรียญรางวัลใหม่!', `${newAch.title}: ${newAch.description}`);
    });

    setLearningState(evaluated);
    setActiveQuizAttempt(attempt);
    setQuizMode('result');
    addToast(
      'success',
      'ตรวจข้อสอบเสร็จสมบูรณ์',
      `คุณได้คะแนน ${attempt.score}/${attempt.totalQuestions} (${attempt.percentage}%) ระดับ${attempt.grade}`
    );
  };

  // Retake Quiz handler
  const handleRetakeQuiz = () => {
    setQuizMode('taking');
    setActiveQuizAttempt(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Survey handler
  const handleSubmitSurvey = (response: SurveyResponse) => {
    const nextState: UserLearningState = {
      ...learningState,
      surveySubmitted: true,
      surveyResponse: response
    };

    const evaluated = evaluateAchievements(nextState, (newAch) => {
      addToast('achievement', 'ปลดล็อกเหรียญรางวัล!', `${newAch.title}: ${newAch.description}`);
    });

    setLearningState(evaluated);
    addToast('success', 'บันทึกความคิดเห็นแล้ว', 'ขอบคุณสำหรับข้อเสนอแนะในการปรับปรุงแอปพลิเคชัน');
  };

  // Reset Progress Request
  const handleRequestReset = () => {
    setConfirmModal({
      isOpen: true,
      title: 'ยืนยันการรีเซ็ตข้อมูลการเรียน?',
      message:
        'การดำเนินการนี้จะล้างประวัติการทำแบบทดสอบ ความก้าวหน้าของหน่วยการเรียนรู้ และเหรียญรางวัลทั้งหมด ข้อมูลจะไม่สามารถกู้คืนได้ คุณแน่ใจหรือไม่?',
      confirmText: 'ยืนยันการรีเซ็ต',
      isDestructive: true,
      onConfirm: () => {
        const freshState = getInitialState();
        freshState.completedLessons = [];
        freshState.quizHistory = [];
        freshState.highestScore = 0;
        freshState.totalQuizAttempts = 0;
        freshState.surveySubmitted = false;
        freshState.surveyResponse = undefined;

        setLearningState(freshState);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        setActiveLessonId(null);
        addToast('info', 'รีเซ็ตข้อมูลเรียบร้อย', 'ระบบได้เริ่มนับความก้าวหน้าใหม่ทั้งหมด');
      }
    });
  };

  const completedCount = learningState.completedLessons.length;
  const totalLessons = LESSON_UNITS.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Active lesson object if viewing lesson detail
  const currentLessonUnit = activeLessonId !== null
    ? LESSON_UNITS.find((u) => u.id === activeLessonId) || LESSON_UNITS[0]
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Top Bar Contract Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        completedCount={completedCount}
        totalLessons={totalLessons}
      />

      {/* Mobile Drawer and Bottom Nav */}
      <MobileNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        completedCount={completedCount}
        totalLessons={totalLessons}
        progressPercent={progressPercent}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Page 1: Home */}
        {currentPage === 'home' && (
          <Home
            lessons={LESSON_UNITS}
            completedLessons={learningState.completedLessons}
            quizHistory={learningState.quizHistory}
            highestScore={learningState.highestScore}
            onNavigate={handleNavigate}
          />
        )}

        {/* Page 2: Lessons List or Lesson Detail */}
        {currentPage === 'lessons' && (
          <>
            {currentLessonUnit ? (
              <LessonDetail
                lesson={currentLessonUnit}
                totalLessons={totalLessons}
                isCompleted={learningState.completedLessons.includes(currentLessonUnit.id)}
                onToggleComplete={handleToggleLessonComplete}
                onNavigateLesson={(id) => handleSelectLesson(id)}
                onBackToList={() => setActiveLessonId(null)}
                onStartQuiz={() => handleNavigate('quiz')}
              />
            ) : (
              <LessonList
                lessons={LESSON_UNITS}
                completedLessons={learningState.completedLessons}
                onSelectLesson={handleSelectLesson}
              />
            )}
          </>
        )}

        {/* Page 3: Quiz (Taking or Result) */}
        {currentPage === 'quiz' && (
          <>
            {quizMode === 'result' && activeQuizAttempt ? (
              <QuizResult
                attempt={activeQuizAttempt}
                questions={QUIZ_QUESTIONS}
                onRetake={handleRetakeQuiz}
                onNavigate={handleNavigate}
              />
            ) : (
              <Quiz
                questions={QUIZ_QUESTIONS}
                onCompleteQuiz={handleCompleteQuiz}
                onBackToHome={() => handleNavigate('home')}
              />
            )}
          </>
        )}

        {/* Page 4: Results & Progress Dashboard */}
        {currentPage === 'results' && (
          <ResultsDashboard
            learningState={learningState}
            lessons={LESSON_UNITS}
            onNavigate={handleNavigate}
            onRequestReset={handleRequestReset}
          />
        )}

        {/* Page 5: Survey */}
        {currentPage === 'survey' && (
          <Survey
            existingResponse={learningState.surveyResponse}
            onSubmitSurvey={handleSubmitSurvey}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* Page 6: About */}
        {currentPage === 'about' && <About onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Floating Toast Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Global Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        isDestructive={confirmModal.isDestructive}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
