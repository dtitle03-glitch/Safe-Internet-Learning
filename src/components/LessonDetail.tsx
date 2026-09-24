import React, { useEffect } from 'react';
import { LessonUnit } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  Award,
  Share2,
  FileCheck2,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface LessonDetailProps {
  lesson: LessonUnit;
  totalLessons: number;
  isCompleted: boolean;
  onToggleComplete: (lessonId: number) => void;
  onNavigateLesson: (lessonId: number) => void;
  onBackToList: () => void;
  onStartQuiz: () => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  lesson,
  totalLessons,
  isCompleted,
  onToggleComplete,
  onNavigateLesson,
  onBackToList,
  onStartQuiz
}) => {
  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const hasPrev = lesson.id > 1;
  const hasNext = lesson.id < totalLessons;

  // Percentage of units progress
  const unitProgress = Math.round((lesson.unitNumber / totalLessons) * 100);

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToList}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้ารายการบทเรียน</span>
        </button>

        {/* Unboxed metadata per zero-pill discipline */}
        <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
          <span>หน่วยที่ {lesson.unitNumber} จาก {totalLessons}</span>
          <span aria-hidden="true">·</span>
          <span>เวลาอ่าน ~{lesson.estimatedMinutes} นาที</span>
        </div>
      </div>

      {/* Progress Bar of Curriculum */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
          <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>ตำแหน่งหลักสูตร</span>
          </span>
          <span className="font-bold text-slate-800">{unitProgress}% (หน่วยที่ {lesson.unitNumber}/{totalLessons})</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-sky-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${unitProgress}%` }}
          />
        </div>
      </div>

      {/* Hero Header of Unit */}
      <header className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          หน่วยการเรียนรู้ที่ {lesson.unitNumber}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {lesson.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {lesson.subtitle}
        </p>

        {/* Completion status toggle button in header */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? '✓ เรียนจบหน่วยนี้แล้ว (คลิกเพื่อยกเลิก)' : 'ทำเครื่องหมายว่าเรียนจบแล้ว'}</span>
          </button>

          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>ทำแบบทดสอบความรู้</span>
          </button>
        </div>
      </header>

      {/* Learning Objectives Box */}
      <section className="bg-blue-50/80 border border-blue-200/80 p-6 sm:p-8 rounded-3xl">
        <div className="flex items-center gap-2.5 text-blue-900 font-bold text-base mb-3">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
          <h2>วัตถุประสงค์การเรียนรู้</h2>
        </div>
        <ul className="space-y-2.5 text-sm sm:text-base text-blue-950 leading-relaxed">
          {lesson.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Main Content Sections */}
      <div className="space-y-8">
        {lesson.sections.map((sec, idx) => (
          <section
            key={idx}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4"
          >
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              {sec.title}
            </h2>
            <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
              {sec.content.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {sec.tips && sec.tips.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5">
                <span className="font-semibold text-slate-900 block">ข้อสังเกตเพิ่มเติม:</span>
                <ul className="list-disc list-inside space-y-1">
                  {sec.tips.map((tip, tIdx) => (
                    <li key={tIdx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* กล่อง "สิ่งที่ควรรู้" (Key Takeaway) */}
      <section className="bg-amber-50/80 border border-amber-200/80 p-6 sm:p-8 rounded-3xl">
        <div className="flex items-center gap-3 text-amber-900 font-bold text-lg mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2>สิ่งที่ควรรู้ (Key Takeaway)</h2>
        </div>
        <p className="text-sm sm:text-base text-amber-950 font-medium leading-relaxed pl-1">
          {lesson.keyTakeaway}
        </p>
      </section>

      {/* กล่อง "ตัวอย่างสถานการณ์จริง" (Real-world Scenario Simulation) */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2>ตัวอย่างสถานการณ์จริง</h2>
            <p className="text-xs text-slate-500 font-normal">{lesson.realWorldScenario.title}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900 block mb-1">สถานการณ์:</span>
          {lesson.realWorldScenario.situation}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Risk */}
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-xs sm:text-sm text-red-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-red-700">
              <span aria-hidden="true">✕</span> ความเสี่ยงหากทำผิดวิธี:
            </span>
            <p className="leading-relaxed">{lesson.realWorldScenario.risk}</p>
          </div>

          {/* Safe action */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" /> วิธีรับมือที่ถูกต้องและปลอดภัย:
            </span>
            <p className="leading-relaxed">{lesson.realWorldScenario.safeAction}</p>
          </div>
        </div>
      </section>

      {/* กล่อง "คำแนะนำด้านความปลอดภัย" (Safety Checklist) */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2>คำแนะนำด้านความปลอดภัย (Safety Checklist)</h2>
        </div>

        <ul className="space-y-3 text-sm sm:text-base text-slate-700">
          {lesson.safetyChecklist.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                ✓
              </div>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* กล่อง "สรุปท้ายบท" (Unit Summary) */}
      <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
          <FileCheck2 className="w-4 h-4" />
          <span>สรุปท้ายบท (Summary)</span>
        </div>
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
          {lesson.summary}
        </p>
      </section>

      {/* Complete Checkbox Card */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">สถานะการเรียนหน่วยนี้</h4>
            <p className="text-xs text-slate-500">
              {isCompleted ? 'คุณได้บันทึกว่าเรียนจบหน่วยนี้แล้ว' : 'กดปุ่มเพื่อบันทึกว่าเรียนจบและรับความก้าวหน้า'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onToggleComplete(lesson.id)}
          className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isCompleted ? '✓ เรียนจบแล้ว' : 'ทำเครื่องหมายว่าเรียนจบ'}
        </button>
      </div>

      {/* Navigation Buttons: Prev, Next, Quiz */}
      <footer className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {hasPrev ? (
            <button
              onClick={() => onNavigateLesson(lesson.id - 1)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>บทก่อนหน้า</span>
            </button>
          ) : (
            <div className="hidden sm:block w-28" />
          )}

          {hasNext && (
            <button
              onClick={() => onNavigateLesson(lesson.id + 1)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-xs sm:text-sm font-medium text-blue-700 bg-blue-50/50 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <span>บทถัดไป (หน่วยที่ {lesson.id + 1})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={onStartQuiz}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>ทำแบบทดสอบวัดความรู้</span>
        </button>
      </footer>
    </article>
  );
};
