import React, { useState } from 'react';
import { QuizAttempt, QuizQuestion, Page } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BarChart3,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface QuizResultProps {
  attempt: QuizAttempt;
  questions: QuizQuestion[];
  onRetake: () => void;
  onNavigate: (page: Page) => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  attempt,
  questions,
  onRetake,
  onNavigate
}) => {
  const [filterReview, setFilterReview] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedExplanations, setExpandedExplanations] = useState<{ [id: number]: boolean }>({});

  const correctCount = attempt.score;
  const incorrectCount = attempt.totalQuestions - attempt.score;
  const isPassed = attempt.percentage >= 70;

  const toggleExpand = (id: number) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuestions = questions.filter((q) => {
    const isCorrect = attempt.userAnswers[q.id] === q.correctAnswerIndex;
    if (filterReview === 'correct' && !isCorrect) return false;
    if (filterReview === 'incorrect' && isCorrect) return false;
    return true;
  });

  // Grade badge styling
  const getGradeStyle = (grade: string) => {
    switch (grade) {
      case 'ดีเยี่ยม':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          desc: 'ยอดเยี่ยมมาก! คุณมีความรู้ความเข้าใจเรื่องความปลอดภัยบนอินเทอร์เน็ตในระดับสูงมาก'
        };
      case 'ดีมาก':
        return {
          bg: 'bg-blue-50 border-blue-300 text-blue-900',
          badge: 'bg-blue-600 text-white',
          desc: 'ดีมาก! คุณมีความรู้เรื่องภัยไซเบอร์และการป้องกันตัวเป็นอย่างดี'
        };
      case 'ดี':
        return {
          bg: 'bg-sky-50 border-sky-300 text-sky-900',
          badge: 'bg-sky-600 text-white',
          desc: 'ผ่านเกณฑ์! คุณมีความรู้พื้นฐานที่ดี แนะนำให้ทบทวนข้อที่ตอบผิดเพิ่มเติม'
        };
      default:
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          badge: 'bg-amber-600 text-white',
          desc: 'ควรทบทวนบทเรียนเพิ่มเติม เพื่อเพิ่มความมั่นใจในการใช้งานอินเทอร์เน็ตอย่างปลอดภัย'
        };
    }
  };

  const gradeInfo = getGradeStyle(attempt.grade);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Score Summary Banner */}
      <section className={`p-6 sm:p-10 rounded-3xl border ${gradeInfo.bg} shadow-md space-y-6 text-center sm:text-left`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Award className="w-4 h-4 text-amber-500" />
              <span>ผลการทดสอบวัดความรู้</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              ผลการประเมิน: <span className="underline decoration-blue-500">{attempt.grade}</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed">
              {gradeInfo.desc}
            </p>
          </div>

          {/* Big Score Dial */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-center min-w-48 shrink-0">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
              คะแนนรวมของคุณ
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 tabular-nums">
              {attempt.score}
              <span className="text-xl sm:text-2xl text-slate-400 font-medium">/{attempt.totalQuestions}</span>
            </div>
            <div className="mt-1 text-sm font-bold text-slate-800">
              คิดเป็น {attempt.percentage}%
            </div>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/70">
          <div className="bg-white/80 p-3.5 rounded-xl text-center border border-slate-200/50">
            <span className="text-xs text-slate-500 font-medium block">ตอบถูก</span>
            <span className="text-xl font-bold text-emerald-600 tabular-nums">{correctCount} ข้อ</span>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl text-center border border-slate-200/50">
            <span className="text-xs text-slate-500 font-medium block">ตอบผิด</span>
            <span className="text-xl font-bold text-red-600 tabular-nums">{incorrectCount} ข้อ</span>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl text-center border border-slate-200/50">
            <span className="text-xs text-slate-500 font-medium block">สถานะ</span>
            <span className={`text-base font-bold ${isPassed ? 'text-emerald-700' : 'text-amber-700'}`}>
              {isPassed ? '✓ ผ่านเกณฑ์' : 'ทบทวนบทเรียน'}
            </span>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl text-center border border-slate-200/50">
            <span className="text-xs text-slate-500 font-medium block">เวลาที่ใช้</span>
            <span className="text-base font-bold text-slate-800 tabular-nums">
              {Math.floor(attempt.timeSpentSeconds / 60)} นาที {attempt.timeSpentSeconds % 60} วิ
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ทำแบบทดสอบอีกครั้ง</span>
          </button>

          <button
            onClick={() => onNavigate('results')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>ดูแดชบอร์ดผลการเรียน</span>
          </button>

          <button
            onClick={() => onNavigate('lessons')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>กลับไปทบทวนบทเรียน</span>
          </button>
        </div>
      </section>

      {/* Answer Review Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              เฉลยคำตอบและคำอธิบายโดยละเอียด
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              ศึกษาเหตุผลและหลักการที่ถูกต้องในแต่ละข้อ เพื่อพัฒนาทักษะความปลอดภัย
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilterReview('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterReview === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({questions.length})
            </button>
            <button
              onClick={() => setFilterReview('incorrect')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterReview === 'incorrect'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              เฉพาะข้อที่ผิด ({incorrectCount})
            </button>
            <button
              onClick={() => setFilterReview('correct')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterReview === 'correct'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              เฉพาะข้อที่ถูก ({correctCount})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const userAnswerIndex = attempt.userAnswers[q.id];
            const isCorrect = userAnswerIndex === q.correctAnswerIndex;
            const originalIndex = questions.findIndex((item) => item.id === q.id);

            return (
              <div
                key={q.id}
                className={`p-6 rounded-3xl bg-white border transition-all ${
                  isCorrect
                    ? 'border-emerald-200/80 shadow-2xs'
                    : 'border-red-200/80 shadow-2xs'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                        isCorrect ? 'bg-emerald-600' : 'bg-red-600'
                      }`}
                    >
                      {originalIndex + 1}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      หน่วยที่ {q.unitId}: {q.unitTitle}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      isCorrect ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>ตอบถูก</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>ตอบผิด</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Scenario Context if present */}
                {q.scenarioContext && (
                  <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200/70 mb-3">
                    <strong>สถานการณ์:</strong> "{q.scenarioContext}"
                  </p>
                )}

                {/* Question */}
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-4">
                  {q.question}
                </h3>

                {/* Options display */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userAnswerIndex === optIdx;
                    const isCorrectAnswer = q.correctAnswerIndex === optIdx;

                    let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700';
                    if (isCorrectAnswer) {
                      optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium ring-1 ring-emerald-400';
                    } else if (isUserChoice && !isCorrect) {
                      optionStyle = 'bg-red-50 border-red-300 text-red-950 font-medium line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${optionStyle}`}
                      >
                        <span className="font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isCorrectAnswer && (
                          <span className="text-xs font-semibold text-emerald-700 shrink-0">
                            (คำตอบที่ถูกต้อง)
                          </span>
                        )}
                        {isUserChoice && !isCorrect && (
                          <span className="text-xs font-semibold text-red-600 shrink-0">
                            (คุณเลือกข้อนี้)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs sm:text-sm text-blue-950 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-blue-900">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>คำอธิบายเฉลย:</span>
                  </div>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
