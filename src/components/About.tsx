import React from 'react';
import { Page } from '../types';
import {
  Shield,
  Target,
  Users,
  Compass,
  BookOpen,
  Award,
  CheckCircle2,
  PhoneCall,
  Globe,
  HeartHandshake,
  Lightbulb
} from 'lucide-react';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Hero Header */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          <span>ข้อมูลโครงการพัฒนาสื่อการเรียนรู้</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          เกี่ยวกับแอปพลิเคชัน “Safe Internet Learning”
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          เว็บแอปพลิเคชันเพื่อการเรียนรู้ภาษาไทย เรื่อง <strong>“ความรู้เรื่องการใช้อินเทอร์เน็ตอย่างปลอดภัย”</strong>{' '}
          สร้างขึ้นเพื่อเป็นสื่อการเรียนรู้แบบโต้ตอบสำหรับนักเรียน ครู และผู้สนใจทั่วไป
        </p>
      </section>

      {/* Visual Concept Illustration with Fallback */}
      <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-900 max-h-72">
        <img
          src="/src/assets/images/cyber_security_concept_1790237737578.jpg"
          alt="ภาพจำลองความปลอดภัยของข้อมูลดิจิทัล"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Objectives & Target Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objectives */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <h2>วัตถุประสงค์ของโครงการ</h2>
          </div>

          <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-bold">1.</span>
              <span>เพื่อสร้างความรู้ความเข้าใจเกี่ยวกับการใช้งานอินเทอร์เน็ตอย่างปลอดภัยและมีประสิทธิภาพ</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-bold">2.</span>
              <span>เพื่อปลูกฝังทักษะการรู้เท่าทันภัยออนไลน์ มิจฉาชีพ ข่าวปลอม และการป้องกันข้อมูลส่วนบุคคล</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-bold">3.</span>
              <span>เพื่อส่งเสริมจิตสำนึกความเป็นพลเมืองดิจิทัล (Digital Citizenship) และความรับผิดชอบต่อสังคมออนไลน์</span>
            </li>
          </ul>
        </section>

        {/* Target Audience */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <h2>กลุ่มเป้าหมาย (Target Group)</h2>
          </div>

          <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-sky-600 font-bold">•</span>
              <span><strong>นักเรียนและเยาวชน:</strong> ระดับประถมศึกษาตอนปลาย มัธยมศึกษา และอาชีวศึกษา</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-sky-600 font-bold">•</span>
              <span><strong>ครูและบุคลากรทางการศึกษา:</strong> สำหรับใช้เป็นสื่อเสริมการจัดการเรียนรู้ในวิชาวิทยาการคำนวณหรือสุขศึกษา</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-sky-600 font-bold">•</span>
              <span><strong>ผู้ปกครองและประชาชนทั่วไป:</strong> เพื่อเรียนรู้และนำไปแนะนำบุตรหลานได้อย่างถูกต้อง</span>
            </li>
          </ul>
        </section>
      </div>

      {/* How to Use the App */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <h2>ขั้นตอนและวิธีการใช้งานแอปพลิเคชัน</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">1</div>
            <h3 className="font-bold text-slate-900">ศึกษาบทเรียน</h3>
            <p className="text-slate-600 leading-relaxed">
              อ่านเนื้อหาทั้ง 8 หน่วยตามลำดับ สังเกตตัวอย่างสถานการณ์จริงและข้อควรระวัง
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">2</div>
            <h3 className="font-bold text-slate-900">ทำแบบทดสอบ</h3>
            <p className="text-slate-600 leading-relaxed">
              ทดสอบความรู้ 24 ข้อ ครอบคลุมทั้งทฤษฎีและสถานการณ์จำลอง (เกณฑ์ผ่าน 70%)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">3</div>
            <h3 className="font-bold text-slate-900">ทบทวนผล & สะสมเหรียญ</h3>
            <p className="text-slate-600 leading-relaxed">
              ตรวจดูเฉลยละเอียด วิเคราะห์ข้อผิดพลาด และปลดล็อกเหรียญความสำเร็จในแดชบอร์ด
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">4</div>
            <h3 className="font-bold text-slate-900">ประเมินความคิดเห็น</h3>
            <p className="text-slate-600 leading-relaxed">
              ส่งข้อเสนอแนะ 8 หัวข้อ เพื่อนำไปปรับปรุงและรับเหรียญ "นักสำรวจข้อมูล"
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Breakdown */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>รายละเอียด 8 หน่วยการเรียนรู้ในหลักสูตร</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-blue-600">หน่วยที่ 1:</strong> ความรู้พื้นฐานเกี่ยวกับอินเทอร์เน็ตและข้อควรระวัง
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-blue-600">หน่วยที่ 2:</strong> การสร้างรหัสผ่านที่รัดกุมและระบบยืนยันตัวตน MFA
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-blue-600">หน่วยที่ 3:</strong> การป้องกันข้อมูลส่วนบุคคลและการตั้งค่าความเป็นส่วนตัว
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-blue-600">หน่วยที่ 4:</strong> การรู้เท่าทันข่าวปลอม Clickbait และการเช็กก่อนแชร์
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-blue-600">หน่วยที่ 5:</strong> การป้องกัน Phishing ลิงก์ดูดเงิน และแก๊งมิจฉาชีพ
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-blue-600">หน่วยที่ 6:</strong> การใช้ Social Media รอยเท้าดิจิทัล และหยุด Cyberbullying
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-blue-600">หน่วยที่ 7:</strong> การใช้อุปกรณ์ การอัปเดตระบบ และระวัง Wi-Fi สาธารณะ
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-blue-600">หน่วยที่ 8:</strong> Netiquette มารยาทชาวเน็ต ลิขสิทธิ์ และความรับผิดชอบ
          </div>
        </div>
      </section>

      {/* Study Tips Callout */}
      <section className="bg-amber-50/80 border border-amber-200/80 p-6 sm:p-8 rounded-3xl space-y-3">
        <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h2>คำแนะนำในการศึกษาบทเรียน</h2>
        </div>
        <ul className="space-y-2 text-sm text-amber-950 leading-relaxed list-disc list-inside">
          <li>ใช้เวลาศึกษาอย่างน้อยวันละ 1-2 หน่วย เพื่อให้สามารถจดจำและทำความเข้าใจได้อย่างต่อเนื่อง</li>
          <li>สังเกต "กล่องตัวอย่างสถานการณ์จริง" ในแต่ละหน่วย เพราะมักถูกนำไปออกข้อสอบสถานการณ์จำลอง</li>
          <li>ทำแบบทดสอบซ้ำมากกว่า 1 ครั้ง เพื่อทบทวนข้อที่เคยตอบผิดและเสริมความแม่นยำ</li>
          <li>นำความรู้ไปบอกต่อคนในครอบครัวและเพื่อนร่วมห้อง เพื่อสร้างสังคมออนไลน์ที่ปลอดภัยร่วมกัน</li>
        </ul>
      </section>

      {/* Emergency Cyber Contacts */}
      <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-sky-400">
          <PhoneCall className="w-5 h-5" />
          <span>หน่วยงานรับแจ้งเหตุและสายด่วนภัยออนไลน์ในประเทศไทย</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <h3 className="font-bold text-white">ศูนย์ AOC สายด่วน 1441</h3>
            <p className="text-slate-300">
              ศูนย์ปฏิบัติการแก้ไขปัญหาอาชญากรรมออนไลน์ ระงับอายัดบัญชีคนร้ายได้ทันทีตลอด 24 ชั่วโมง
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <h3 className="font-bold text-white">แจ้งความออนไลน์ สำนักงานตำรวจแห่งชาติ</h3>
            <p className="text-slate-300">
              เว็บไซต์ทางการ: <strong>thaipoliceonline.go.th</strong> แจ้งเหตุคดีออนไลน์ทุกประเภท
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('lessons')}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
        >
          เริ่มต้นเข้าสู่บทเรียนตอนนี้
        </button>
      </div>
    </div>
  );
};
