import React from 'react';
import { Page } from '../types';
import { Shield, BookOpen, CheckCircle, BarChart3, MessageSquare, HelpCircle, X, ChevronRight } from 'lucide-react';

interface MobileNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
  completedCount: number;
  totalLessons: number;
  progressPercent: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onClose,
  completedCount,
  totalLessons,
  progressPercent
}) => {
  const menuItems: { page: Page; label: string; description: string; icon: React.ReactNode }[] = [
    { page: 'home', label: 'หน้าหลัก', description: 'ภาพรวมระบบและสถิติการเรียน', icon: <Shield className="w-5 h-5" /> },
    { page: 'lessons', label: 'เนื้อหา/บทเรียน', description: `เรียนรู้ทั้ง ${totalLessons} หน่วยความรู้`, icon: <BookOpen className="w-5 h-5" /> },
    { page: 'quiz', label: 'แบบทดสอบ', description: 'วัดความรู้ 24 ข้อ ครอบคลุมทุกเนื้อหา', icon: <CheckCircle className="w-5 h-5" /> },
    { page: 'results', label: 'ผลการเรียน', description: 'แดชบอร์ดความก้าวหน้าและเหรียญรางวัล', icon: <BarChart3 className="w-5 h-5" /> },
    { page: 'survey', label: 'แบบประเมินความคิดเห็น', description: 'ส่งความคิดเห็นเพื่อพัฒนาแอปพลิเคชัน', icon: <MessageSquare className="w-5 h-5" /> },
    { page: 'about', label: 'เกี่ยวกับบทเรียน', description: 'ข้อมูลโครงการ วัตถุประสงค์ และผู้พัฒนา', icon: <HelpCircle className="w-5 h-5" /> }
  ];

  return (
    <>
      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-blue-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-tight">เรียนรู้อินเทอร์เน็ตปลอดภัย</h2>
                  <p className="text-xs text-slate-500">Safe Internet Learning</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                aria-label="ปิดเมนู"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Progress Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
                <span>ความก้าวหน้าบทเรียน</span>
                <span className="text-blue-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                เรียนจบแล้ว {completedCount} จาก {totalLessons} หน่วย
              </p>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {menuItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={isActive ? 'text-blue-600' : 'text-slate-500'}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-slate-400 font-normal">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 text-center bg-slate-50">
              <p className="text-xs text-slate-500">
                แจ้งเหตุออนไลน์ โทร <span className="font-semibold text-blue-600">1441</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar for Mobile */}
      <nav
        aria-label="แถบนำทางด่วนบนมือถือ"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex justify-around items-center"
      >
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            currentPage === 'home' ? 'text-blue-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <Shield className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">หน้าหลัก</span>
        </button>

        <button
          onClick={() => onNavigate('lessons')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            currentPage === 'lessons' ? 'text-blue-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">บทเรียน</span>
        </button>

        <button
          onClick={() => onNavigate('quiz')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            currentPage === 'quiz' ? 'text-blue-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <CheckCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">แบบทดสอบ</span>
        </button>

        <button
          onClick={() => onNavigate('results')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            currentPage === 'results' ? 'text-blue-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <BarChart3 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">ผลการเรียน</span>
        </button>

        <button
          onClick={() => onNavigate('survey')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            currentPage === 'survey' ? 'text-blue-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">ประเมิน</span>
        </button>
      </nav>
    </>
  );
};
