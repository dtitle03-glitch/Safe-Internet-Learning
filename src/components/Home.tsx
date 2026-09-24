import React from 'react';
import { Page, LessonUnit, QuizAttempt } from '../types';
import {
  Shield,
  BookOpen,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Lock,
  Globe,
  Award,
  ChevronRight,
  TrendingUp,
  Clock,
  Flame
} from 'lucide-react';

interface HomeProps {
  lessons: LessonUnit[];
  completedLessons: number[];
  quizHistory: QuizAttempt[];
  highestScore: number;
  onNavigate: (page: Page, lessonId?: number) => void;
}

export const Home: React.FC<HomeProps> = ({
  lessons,
  completedLessons,
  quizHistory,
  highestScore,
  onNavigate
}) => {
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const latestQuiz = quizHistory.length > 0 ? quizHistory[0] : null;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white shadow-xl border border-blue-700/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.25),transparent_70%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>หลักสูตรดิจิทัลสำหรับนักเรียนและเยาวชน</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white text-balance">
              เรียนรู้การใช้อินเทอร์เน็ต<br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-200">
                อย่างปลอดภัยและรู้เท่าทัน
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              บทเรียนออนไลน์เพื่อสร้างความรู้ ความเข้าใจ และทักษะการท่องโลกไซเบอร์อย่างปลอดภัย
              ป้องกันข้อมูลส่วนบุคคล รู้ทันภัยมิจฉาชีพ และใช้เทคโนโลยีอย่างมีความรับผิดชอบ
            </p>

            {/* 4 Action Buttons requested by user */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('lessons', 1)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
              >
                <span>เริ่มเรียนรู้</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('lessons')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-100 bg-white/10 hover:bg-white/20 active:bg-white/25 rounded-xl backdrop-blur-xs transition-colors border border-white/20 cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-sky-300" />
                <span>เข้าสู่บทเรียน</span>
              </button>

              <button
                onClick={() => onNavigate('quiz')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-100 bg-white/10 hover:bg-white/20 active:bg-white/25 rounded-xl backdrop-blur-xs transition-colors border border-white/20 cursor-pointer whitespace-nowrap"
              >
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>ทำแบบทดสอบ</span>
              </button>

              <button
                onClick={() => onNavigate('survey')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-100 bg-white/10 hover:bg-white/20 active:bg-white/25 rounded-xl backdrop-blur-xs transition-colors border border-white/20 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>แบบประเมินความคิดเห็น</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Banner with Fallback Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-slate-800">
              <img
                src="/src/assets/images/hero_cyber_safety_1790237718601.jpg"
                alt="ภาพประกอบการเรียนรู้การใช้อินเทอร์เน็ตอย่างปลอดภัย"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-16/9 transform hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs text-slate-200 flex items-center gap-2 font-medium">
                  <Shield className="w-4 h-4 text-sky-400" />
                  <span>8 หน่วยการเรียนรู้ · 24 คำถามทดสอบ · ใบประกาศและเหรียญรางวัล</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Quick Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>ความคืบหน้าการเรียน</span>
            <span className="text-blue-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {progressPercent}%
            </span>
            <span className="text-xs text-slate-500">
              ({completedCount}/{totalLessons} หน่วย)
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Card 2: Total Lessons */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>บทเรียนทั้งหมด</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {totalLessons}
            </span>
            <span className="text-xs text-slate-500">หน่วยการเรียนรู้</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            ศึกษาตามลำดับเพื่อความเข้าใจที่สมบูรณ์
          </p>
        </div>

        {/* Card 3: Total Quiz Questions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>จำนวนแบบทดสอบ</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">24</span>
            <span className="text-xs text-slate-500">ข้อ (ครอบคลุม 8 หน่วย)</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            มีสถานการณ์จำลองและคำอธิบายเฉลยทุกข้อ
          </p>
        </div>

        {/* Card 4: Latest Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>คะแนนล่าสุด</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            {latestQuiz ? (
              <>
                <span className="text-3xl font-bold text-blue-600 tabular-nums">
                  {latestQuiz.score}/{latestQuiz.totalQuestions}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  ({latestQuiz.percentage}%)
                </span>
              </>
            ) : (
              <span className="text-base font-medium text-slate-400">
                ยังไม่ได้ทำแบบทดสอบ
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {highestScore > 0 ? `คะแนนสูงสุด: ${highestScore}%` : 'ทดสอบความรู้เพื่อรับเหรียญรางวัล'}
          </p>
        </div>
      </section>

      {/* 3 Core Pillars of Safe Internet */}
      <section className="bg-slate-100/70 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            3 คาถาหัวใจสำคัญเพื่อการท่องอินเทอร์เน็ตอย่างปลอดภัย
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            หลักคิดง่ายๆ ที่ช่วยปกป้องคุณจากการตกเป็นเหยื่อบนโลกออนไลน์
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">1. ป้องกัน (Protect)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              ตั้งรหัสผ่านที่รัดกุม เปิดใช้ MFA ยืนยันตัวตนสองชั้น และไม่เปิดเผยข้อมูลส่วนบุคคลหรือเลขบัตรประชาชนบนโลกออนไลน์
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">2. คิดก่อนคลิก (Think First)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              หยุดตรวจสอบลิงก์และแหล่งที่มาก่อนคลิกเสมอ ไม่เชื่อ SMS แจกรางวัล และแยกแยะข่าวปลอมด้วยการเช็กหลายแหล่ง
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">3. ไม่เชื่อ ไม่รีบ ไม่โอน (Verify)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              เมื่อเจอข้อความแปลกปลอมหรือแก๊งคอลเซ็นเตอร์โทรมาขู่ ห้ามบอกรหัส OTP แก่ผู้อื่น และไม่โอนเงินก่อนตรวจสอบสายด่วน 1441
            </p>
          </div>
        </div>
      </section>

      {/* Lesson Units Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">หน่วยการเรียนรู้ทั้งหมด</h2>
            <p className="text-sm text-slate-600 mt-1">
              ครอบคลุม 8 มิติสำคัญของการใช้ชีวิตบนโลกออนไลน์อย่างปลอดภัย
            </p>
          </div>
          <button
            onClick={() => onNavigate('lessons')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <span>ดูสารบัญทั้งหมด</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => onNavigate('lessons', lesson.id)}
                className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                    <span className="font-semibold text-blue-600">
                      หน่วยที่ {lesson.unitNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.estimatedMinutes} นาที
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  {isCompleted ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>เรียนจบแล้ว</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">ยังไม่จบ</span>
                  )}
                  <span className="text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center">
                    เข้าสู่บทเรียน <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ready for Assessment CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-100 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-300" />
            <span>แบบทดสอบประมวลผลความรู้</span>
          </div>
          <h3 className="text-2xl font-bold">พร้อมทดสอบความปลอดภัยของคุณหรือยัง?</h3>
          <p className="text-blue-100 text-sm max-w-xl">
            แบบทดสอบ 24 ข้อ มีทั้งข้อคำถามทฤษฎีและสถานการณ์จำลอง พร้อมเฉลยละเอียดและวิเคราะห์ระดับคะแนน
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('quiz')}
            className="px-6 py-3 bg-white text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-50 active:bg-blue-100 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            เริ่มทำแบบทดสอบ (24 ข้อ)
          </button>
        </div>
      </section>
    </div>
  );
};
