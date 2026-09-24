import React, { useState } from 'react';
import { SurveyResponse } from '../types';
import {
  MessageSquare,
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface SurveyProps {
  existingResponse?: SurveyResponse;
  onSubmitSurvey: (response: SurveyResponse) => void;
  onNavigateHome: () => void;
}

const SURVEY_QUESTIONS = [
  'เนื้อหาบทเรียนเข้าใจง่าย',
  'เนื้อหามีประโยชน์ต่อการใช้อินเทอร์เน็ตในชีวิตประจำวัน',
  'ตัวอย่างสถานการณ์ช่วยให้เข้าใจเนื้อหา',
  'รูปแบบการนำเสนอมีความน่าสนใจ',
  'แบบทดสอบเหมาะสมกับเนื้อหา',
  'ระบบใช้งานง่าย',
  'แอปช่วยเพิ่มความรู้เกี่ยวกับความปลอดภัยบนอินเทอร์เน็ต',
  'สามารถนำความรู้ไปใช้ในชีวิตประจำวันได้'
];

const RATING_LABELS = [
  { value: 5, label: 'มากที่สุด' },
  { value: 4, label: 'มาก' },
  { value: 3, label: 'ปานกลาง' },
  { value: 2, label: 'น้อย' },
  { value: 1, label: 'น้อยที่สุด' }
];

const EDUCATION_LEVELS = [
  'ประถมศึกษา (ป.1 - ป.6)',
  'มัธยมศึกษาตอนต้น (ม.1 - ม.3)',
  'มัธยมศึกษาตอนปลาย / ปวช. (ม.4 - ม.6)',
  'อุดมศึกษา / ปวส. / ปริญญาตรี',
  'ครู / อาจารย์ / บุคลากรทางการศึกษา',
  'บุคคลทั่วไป / ผู้ปกครอง'
];

export const Survey: React.FC<SurveyProps> = ({
  existingResponse,
  onSubmitSurvey,
  onNavigateHome
}) => {
  const [educationLevel, setEducationLevel] = useState<string>(
    existingResponse?.educationLevel || ''
  );
  const [ratings, setRatings] = useState<{ [key: number]: number }>(
    existingResponse?.ratings || {}
  );
  const [suggestions, setSuggestions] = useState<string>(
    existingResponse?.suggestions || ''
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(
    Boolean(existingResponse)
  );

  const handleRatingChange = (qIndex: number, ratingVal: number) => {
    setRatings((prev) => ({
      ...prev,
      [qIndex]: ratingVal
    }));
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!educationLevel) {
      setErrorMessage('กรุณาเลือกระดับชั้นหรือกลุ่มผู้เรียนในส่วนที่ 1');
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    const answeredCount = Object.keys(ratings).length;
    if (answeredCount < SURVEY_QUESTIONS.length) {
      const missingIndex = SURVEY_QUESTIONS.findIndex((_, idx) => !ratings[idx]);
      setErrorMessage(
        `กรุณาให้คะแนนประเมินให้ครบทั้ง 8 ข้อ (ยังไม่ได้ตอบข้อที่ ${missingIndex + 1})`
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const response: SurveyResponse = {
      educationLevel,
      ratings,
      suggestions: suggestions.trim(),
      submittedAt: formattedDate
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
      onSubmitSurvey(response);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleEditAgain = () => {
    setIsSubmittedSuccess(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" />
          <span>การประเมินผลการใช้งาน</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          แบบประเมินความคิดเห็นต่อบทเรียน
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          ความคิดเห็นของท่านมีคุณค่าอย่างยิ่งในการนำไปปรับปรุงและพัฒนาสื่อการเรียนรู้ให้มีประสิทธิภาพมากยิ่งขึ้น
        </p>
      </div>

      {/* Success State */}
      {isSubmittedSuccess ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-200 shadow-md text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              ขอบคุณสำหรับความคิดเห็นของคุณ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              ระบบได้บันทึกความคิดเห็นของคุณเรียบร้อยแล้ว และคุณได้รับเหรียญรางวัล "นักสำรวจข้อมูล" ในแดชบอร์ด
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs sm:text-sm text-slate-700 max-w-md mx-auto space-y-1.5">
            <div className="font-semibold text-slate-900">สรุปข้อมูลที่ส่ง:</div>
            <div>กลุ่มผู้เรียน: <strong>{educationLevel}</strong></div>
            <div>ประเมินครบ: <strong>8 จาก 8 หัวข้อ</strong></div>
            {suggestions && (
              <div className="pt-1">ข้อเสนอแนะ: "{suggestions}"</div>
            )}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNavigateHome}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              กลับสู่หน้าหลัก
            </button>
            <button
              onClick={handleEditAgain}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              แก้ไขความคิดเห็น
            </button>
          </div>
        </div>
      ) : (
        /* Survey Form */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: General Info */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                ส่วนที่ 1
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                ข้อมูลทั่วไปของผู้ประเมิน
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                (ไม่เก็บข้อมูลระบุตัวตนส่วนบุคคล เพื่อความเป็นส่วนตัวสูงสุด)
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="education-level" className="block text-sm font-semibold text-slate-800">
                ระดับชั้นหรือกลุ่มผู้เรียน <span className="text-red-500">*</span>
              </label>
              <select
                id="education-level"
                value={educationLevel}
                onChange={(e) => {
                  setEducationLevel(e.target.value);
                  setErrorMessage(null);
                }}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 cursor-pointer"
                required
              >
                <option value="">-- กรุณาเลือกระดับชั้น / กลุ่มผู้เรียน --</option>
                {EDUCATION_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Likert Scale Ratings */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                ส่วนที่ 2
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                แบบประเมินความคิดเห็น (ระดับ 1 - 5)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                5 = มากที่สุด · 4 = มาก · 3 = ปานกลาง · 2 = น้อย · 1 = น้อยที่สุด
              </p>
            </div>

            <div className="space-y-6">
              {SURVEY_QUESTIONS.map((question, qIdx) => {
                const currentRating = ratings[qIdx];
                return (
                  <div
                    key={qIdx}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                        {question} <span className="text-red-500">*</span>
                      </span>
                    </div>

                    {/* 5-Level Rating Buttons */}
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-1">
                      {RATING_LABELS.map((item) => {
                        const isSelected = currentRating === item.value;
                        return (
                          <button
                            type="button"
                            key={item.value}
                            onClick={() => handleRatingChange(qIdx, item.value)}
                            className={`p-2 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                          >
                            <span className="text-base sm:text-lg font-bold">
                              {item.value}
                            </span>
                            <span className="text-[10px] sm:text-xs mt-0.5 opacity-90 truncate max-w-full">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Open-ended Suggestions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                ส่วนที่ 3
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                ข้อเสนอแนะเพิ่มเติม
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                สิ่งที่ท่านอยากให้เพิ่มเติมหรือปรับปรุงในบทเรียนนี้
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="suggestions-input" className="block text-sm font-semibold text-slate-800">
                ข้อเสนอแนะเพิ่มเติม (ถ้ามี)
              </label>
              <textarea
                id="suggestions-input"
                rows={4}
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="พิมพ์ข้อเสนอแนะ เช่น เนื้อหาที่อยากให้เพิ่มเติม ฟีเจอร์ที่อยากได้ หรือข้อคิดเห็นอื่นๆ..."
                className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งแบบประเมิน'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
