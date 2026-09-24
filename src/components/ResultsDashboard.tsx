import React from 'react';
import { UserLearningState, LessonUnit, Page } from '../types';
import {
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  RotateCcw,
  Calendar,
  Lock,
  Check,
  ChevronRight,
  AlertTriangle,
  Repeat,
  ShieldCheck,
  MessageSquareText
} from 'lucide-react';

interface ResultsDashboardProps {
  learningState: UserLearningState;
  lessons: LessonUnit[];
  onNavigate: (page: Page, lessonId?: number) => void;
  onRequestReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  learningState,
  lessons,
  onNavigate,
  onRequestReset
}) => {
  const totalLessons = lessons.length;
  const completedCount = learningState.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const latestQuiz = learningState.quizHistory.length > 0 ? learningState.quizHistory[0] : null;

  // Render achievement icon
  const renderAchievementIcon = (iconName: string, unlocked: boolean) => {
    const props = { className: `w-6 h-6 ${unlocked ? 'text-amber-500' : 'text-slate-400'}` };
    switch (iconName) {
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Repeat': return <Repeat {...props} />;
      case 'Award': return <Award {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'MessageSquareText': return <MessageSquareText {...props} />;
      default: return <Award {...props} />;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Dashboard Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            แดชบอร์ดสรุปการเรียนรู้
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ผลการเรียนและความก้าวหน้า
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            ติดตามพัฒนาการ บันทึกคะแนนสอบ และสะสมเหรียญรางวัลความสำเร็จในการเรียนรู้ความปลอดภัยออนไลน์
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('quiz')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            ทำแบบทดสอบใหม่
          </button>
          <button
            onClick={onRequestReset}
            className="px-4 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            รีเซ็ตความคืบหน้า
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Overall Lesson Progress */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
              <span>ความคืบหน้าหลักสูตร</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {progressPercent}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              เรียนจบแล้ว {completedCount} จาก {totalLessons} หน่วย
            </p>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Card 2: Latest Quiz Score */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
              <span>คะแนนแบบทดสอบล่าสุด</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tabular-nums">
              {latestQuiz ? `${latestQuiz.score}/${latestQuiz.totalQuestions}` : '-'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {latestQuiz ? `ระดับ: ${latestQuiz.grade} (${latestQuiz.percentage}%)` : 'ยังไม่มีประวัติการทำแบบทดสอบ'}
            </p>
          </div>
          <div className="mt-4 text-[11px] text-slate-400">
            {latestQuiz ? `วันที่สอบ: ${latestQuiz.date}` : 'ทำแบบทดสอบเพื่อดูสถิติ'}
          </div>
        </div>

        {/* Card 3: Highest Score */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
              <span>คะแนนสูงสุด (High Score)</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {learningState.highestScore > 0 ? `${learningState.highestScore}%` : '-'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {learningState.highestScore >= 90
                ? 'ระดับดีเยี่ยม'
                : learningState.highestScore >= 80
                ? 'ระดับดีมาก'
                : learningState.highestScore >= 70
                ? 'ระดับดี'
                : learningState.highestScore > 0
                ? 'ควรทบทวน'
                : 'ยังไม่ได้ทดสอบ'}
            </p>
          </div>
          <div className="mt-4 text-[11px] text-slate-400">
            {learningState.highestScore >= 90 ? '★ ปลดล็อกเหรียญผู้พิทักษ์แล้ว' : 'เกณฑ์เหรียญทอง: 90%'}
          </div>
        </div>

        {/* Card 4: Total Quiz Attempts */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
              <span>จำนวนครั้งที่ทำข้อสอบ</span>
              <Repeat className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {learningState.totalQuizAttempts}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              ครั้งของการประเมินความรู้
            </p>
          </div>
          <div className="mt-4 text-[11px] text-slate-400">
            การทำซ้ำช่วยเสริมสร้างความจำ
          </div>
        </div>
      </section>

      {/* Achievement Badges System */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>เหรียญรางวัลและความสำเร็จ (Achievements)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              ปลดล็อกเหรียญเกียรติยศเมื่อคุณทำภารกิจการเรียนรู้สำเร็จ
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            ปลดล็อกแล้ว{' '}
            <strong className="text-blue-600">
              {learningState.achievements.filter((a) => a.unlocked).length}
            </strong>{' '}
            / {learningState.achievements.length} เหรียญ
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {learningState.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                ach.unlocked
                  ? 'bg-amber-50/50 border-amber-200/90 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 opacity-70'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  ach.unlocked
                    ? 'bg-amber-100 border border-amber-200'
                    : 'bg-slate-200/70 border border-slate-300'
                }`}
              >
                {ach.unlocked ? (
                  renderAchievementIcon(ach.iconName, true)
                ) : (
                  <Lock className="w-5 h-5 text-slate-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className={`text-sm font-bold truncate ${ach.unlocked ? 'text-amber-950' : 'text-slate-700'}`}>
                    {ach.title}
                  </h3>
                  {ach.unlocked && (
                    <span className="text-[11px] text-amber-700 font-bold bg-amber-100/80 px-1.5 py-0.5 rounded">
                      สำเร็จ
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {ach.description}
                </p>

                <div className="mt-2.5 text-[11px] font-medium text-slate-500">
                  {ach.unlocked ? (
                    <span className="text-amber-700">ปลดล็อกเมื่อ: {ach.unlockedAt || 'ล่าสุด'}</span>
                  ) : (
                    <span>สถานะ: {ach.progressText || 'ยังไม่สำเร็จ'}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Unit Completion Checklist */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              สถานะรายหน่วยการเรียนรู้ (8 หน่วย)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              คลิกเพื่อเปิดอ่านหรือทบทวนเนื้อหาแต่ละหน่วย
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson) => {
            const isCompleted = learningState.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => onNavigate('lessons', lesson.id)}
                className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-slate-50/70 transition-all flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : lesson.unitNumber}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      หน่วยที่ {lesson.unitNumber}: {lesson.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {lesson.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-semibold ${
                      isCompleted ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {isCompleted ? 'เรียนจบแล้ว' : 'ยังไม่จบ'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quiz History Timeline */}
      {learningState.quizHistory.length > 0 && (
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            ประวัติการทำแบบทดสอบ ({learningState.quizHistory.length} ครั้งล่าสุด)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 px-2">ครั้งที่</th>
                  <th className="pb-3 px-2">วันที่สอบ</th>
                  <th className="pb-3 px-2">คะแนน</th>
                  <th className="pb-3 px-2">เปอร์เซ็นต์</th>
                  <th className="pb-3 px-2">ระดับผลการเรียน</th>
                  <th className="pb-3 px-2">เวลาที่ใช้</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {learningState.quizHistory.slice(0, 10).map((hist, idx) => (
                  <tr key={hist.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      #{learningState.quizHistory.length - idx}
                    </td>
                    <td className="py-3 px-2 text-slate-600">{hist.date}</td>
                    <td className="py-3 px-2 font-bold text-blue-600 tabular-nums">
                      {hist.score} / {hist.totalQuestions}
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-800 tabular-nums">
                      {hist.percentage}%
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-semibold text-slate-800">
                        {hist.grade}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-slate-500 tabular-nums text-xs">
                      {Math.floor(hist.timeSpentSeconds / 60)}m {hist.timeSpentSeconds % 60}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
