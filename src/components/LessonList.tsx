import React, { useState } from 'react';
import { LessonUnit } from '../types';
import {
  BookOpen,
  CheckCircle,
  Clock,
  ChevronRight,
  Shield,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  UserCheck,
  FileSearch,
  AlertTriangle,
  MessageSquareShare,
  Wifi,
  HeartHandshake
} from 'lucide-react';

interface LessonListProps {
  lessons: LessonUnit[];
  completedLessons: number[];
  onSelectLesson: (lessonId: number) => void;
}

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  completedLessons,
  onSelectLesson
}) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Icon mapping
  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6' };
    switch (name) {
      case 'Globe': return <BookOpen {...props} />;
      case 'ShieldCheck': return <Shield {...props} />;
      case 'UserCheck': return <UserCheck {...props} />;
      case 'FileSearch': return <FileSearch {...props} />;
      case 'AlertTriangle': return <AlertTriangle {...props} />;
      case 'MessageSquareShare': return <MessageSquareShare {...props} />;
      case 'Wifi': return <Wifi {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  const filteredLessons = lessons.filter((lesson) => {
    const isCompleted = completedLessons.includes(lesson.id);
    if (filter === 'completed' && !isCompleted) return false;
    if (filter === 'pending' && isCompleted) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lesson.title.toLowerCase().includes(q);
      const matchSub = lesson.subtitle.toLowerCase().includes(q);
      return matchTitle || matchSub;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              หลักสูตรการเรียนรู้
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              หน่วยการเรียนรู้เรื่องการใช้อินเทอร์เน็ตอย่างปลอดภัย
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              ศึกษาเนื้อหาทั้ง 8 หน่วย เพื่อเตรียมความพร้อมในการทำแบบทดสอบและนำไปประยุกต์ใช้ในชีวิตประจำวัน
            </p>
          </div>

          {/* Progress Card inside banner */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 shrink-0 w-full md:w-64">
            <div className="flex justify-between items-center text-xs text-slate-600 font-medium mb-1.5">
              <span>ความคืบหน้ารวม</span>
              <span className="text-blue-600 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 text-right">
              สำเร็จแล้ว {completedCount} จาก {totalLessons} หน่วย
            </p>
          </div>
        </div>

        {/* Filter Controls (Buttons allowed per zero-pill discipline) */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({lessons.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'completed'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              เรียนจบแล้ว ({completedCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'pending'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ยังไม่จบ ({totalLessons - completedCount})
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อหน่วยหรือหัวข้อ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`group bg-white p-6 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isCompleted
                  ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-md'
                  : 'border-slate-200/80 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {renderIcon(lesson.iconName)}
                    </div>
                    <div>
                      {/* Zero-pill: Unboxed text metadata with typographic dot */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="text-blue-600 font-semibold">หน่วยที่ {lesson.unitNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.estimatedMinutes} นาที
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                        {lesson.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {lesson.subtitle}
                </p>

                {/* Learning Objectives Preview */}
                <div className="bg-slate-50 rounded-xl p-3.5 space-y-1.5 text-xs text-slate-600 border border-slate-100">
                  <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider">
                    วัตถุประสงค์การเรียนรู้:
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-slate-600">
                    {lesson.learningObjectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="line-clamp-1">
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                {isCompleted ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>เรียนจบแล้ว</span>
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium">
                    ยังไม่เสร็จสมบูรณ์
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLesson(lesson.id);
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isCompleted
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-blue-600 hover:bg-blue-50 font-semibold'
                  }`}
                >
                  <span>{isCompleted ? 'ทบทวนบทเรียน' : 'เริ่มเรียนรู้'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">ไม่พบบทเรียนที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs text-slate-500 mt-1">ลองเปลี่ยนคำค้นหาหรือตัวกรองด้านบน</p>
        </div>
      )}
    </div>
  );
};
