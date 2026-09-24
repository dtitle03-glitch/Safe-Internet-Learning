import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizAttempt } from '../types';
import {
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Send,
  Sparkles,
  Award,
  Clock,
  RotateCcw
} from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onCompleteQuiz: (attempt: QuizAttempt) => void;
  onBackToHome: () => void;
}

export const Quiz: React.FC<QuizProps> = ({
  questions,
  onCompleteQuiz,
  onBackToHome
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setErrorMessage(null);
  }, [currentIndex]);

  const totalQuestions = questions.length;
  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
    setErrorMessage(null);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const unansweredQuestionNumbers = questions
    .filter((q) => userAnswers[q.id] === undefined)
    .map((_, idx) => questions.findIndex((q) => q.id === _.id) + 1);

  const handleSubmitAttempt = () => {
    // Validation: check if all answered
    if (unansweredCount > 0) {
      setErrorMessage(
        `ยังตอบคำถามไม่ครบ (เหลืออีก ${unansweredCount} ข้อ: ข้อ ${unansweredQuestionNumbers.slice(0, 5).join(', ')}${unansweredQuestionNumbers.length > 5 ? '...' : ''}) กรุณาตอบให้ครบก่อนส่งแบบทดสอบ`
      );
      return;
    }

    setIsSubmitting(true);

    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    let grade: 'ดีเยี่ยม' | 'ดีมาก' | 'ดี' | 'ควรทบทวนบทเรียน' = 'ควรทบทวนบทเรียน';
    if (percentage >= 90) grade = 'ดีเยี่ยม';
    else if (percentage >= 80) grade = 'ดีมาก';
    else if (percentage >= 70) grade = 'ดี';

    const now = new Date();
    const formattedDate = now.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      date: formattedDate,
      timestamp: Date.now(),
      score,
      totalQuestions,
      percentage,
      grade,
      timeSpentSeconds,
      userAnswers
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onCompleteQuiz(attempt);
    }, 400);
  };

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Quiz Top Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              แบบทดสอบประมวลผลความรู้
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              แบบทดสอบความรู้การใช้อินเทอร์เน็ตอย่างปลอดภัย
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ครอบคลุมเนื้อหาทั้ง 8 หน่วย รวม 24 ข้อ (เกณฑ์ผ่าน: 70% ขึ้นไป)
            </p>
          </div>

          <button
            onClick={onBackToHome}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            ออกจากการทดสอบ
          </button>
        </div>

        {/* Progress bar */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
            <span>
              ตอบแล้ว <strong className="text-blue-600">{answeredCount}</strong> จาก {totalQuestions} ข้อ
            </span>
            <span className="font-bold text-slate-800">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Palette / Jumper */}
        <div className="pt-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            เลือกข้ามไปยังข้อ:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-100">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-300'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                  aria-label={`ไปยังข้อที่ ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Question Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        {/* Question Metadata */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-blue-600 font-bold text-sm">
              ข้อที่ {currentIndex + 1} / {totalQuestions}
            </span>
            <span aria-hidden="true">·</span>
            <span>หน่วยที่ {currentQ.unitId}: {currentQ.unitTitle}</span>
          </div>

          <span className="text-[11px] font-medium text-slate-400">
            {currentQ.type === 'scenario'
              ? 'สถานการณ์จำลอง'
              : currentQ.type === 'true_false'
              ? 'ถูกหรือผิด'
              : 'ปรนัย 4 ตัวเลือก'}
          </span>
        </div>

        {/* Scenario Context Callout (if scenario type) */}
        {currentQ.scenarioContext && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>สถานการณ์จำลอง</span>
            </div>
            <p className="text-sm sm:text-base text-amber-950 leading-relaxed font-medium">
              "{currentQ.scenarioContext}"
            </p>
          </div>
        )}

        {/* Question Prompt */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h2>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = userAnswers[currentQ.id] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-medium shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 text-slate-500'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <span className="text-sm sm:text-base leading-relaxed flex-1">
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Error Validation Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Navigation & Submit Controls */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer w-full sm:w-auto justify-center ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-400'
                : 'text-slate-700 hover:bg-slate-50 bg-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ข้อก่อนหน้า</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs w-full sm:w-auto"
              >
                <span>ข้อถัดไป</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitAttempt}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs w-full sm:w-auto"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'กำลังตรวจข้อสอบ...' : 'ส่งคำตอบแบบทดสอบ'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Submit Bar when all are answered */}
      {answeredCount === totalQuestions && currentIndex < totalQuestions - 1 && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>คุณตอบครบทั้ง 24 ข้อแล้ว! สามารถส่งแบบทดสอบได้ทันที</span>
          </div>
          <button
            onClick={handleSubmitAttempt}
            disabled={isSubmitting}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            ส่งแบบทดสอบตอนนี้
          </button>
        </div>
      )}
    </div>
  );
};
