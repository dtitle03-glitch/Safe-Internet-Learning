import React from 'react';
import { Page } from '../types';
import { Shield, PhoneCall, Globe, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pb-20 lg:pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900">
                Safe Internet Learning
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              สื่อการเรียนรู้ออนไลน์ภาษาไทย เพื่อส่งเสริมให้นักเรียนและเยาวชนใช้อินเทอร์เน็ตอย่างปลอดภัย มีความรับผิดชอบ และรู้เท่าทันภัยมิจฉาชีพออนไลน์
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-700 font-medium pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>หลักสูตรครอบคลุม 8 หน่วยการเรียนรู้ และแบบทดสอบ 24 ข้อ</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">
              เมนูการเรียนรู้
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  หน้าหลัก
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  เนื้อหา 8 หน่วยการเรียนรู้
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  แบบทดสอบวัดความรู้
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  ผลการเรียนและเหรียญรางวัล
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('survey')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  แบบประเมินความคิดเห็น
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Cyber Hotline */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">
              สายด่วนแจ้งภัยออนไลน์
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  <span>สายด่วนตำรวจไซเบอร์ (AOC)</span>
                </div>
                <p className="text-blue-600 font-bold text-sm mt-0.5">โทร 1441 (ตลอด 24 ชม.)</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>แจ้งความออนไลน์ทางการ</span>
                </div>
                <p className="text-slate-600 mt-0.5">thaipoliceonline.go.th</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Safe Internet Learning · เรียนรู้การใช้อินเทอร์เน็ตอย่างปลอดภัย เพื่อการศึกษา</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              เกี่ยวกับบทเรียน
            </button>
            <span aria-hidden="true">·</span>
            <span>ไม่มีค่าใช้จ่าย</span>
            <span aria-hidden="true">·</span>
            <span>บันทึกความคืบหน้าบนเบราว์เซอร์</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
