import React from 'react';
import { Page } from '../types';
import { Shield, BookOpen, CheckCircle, Menu, X, BarChart3, HelpCircle, MessageSquare } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, lessonId?: number) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  completedCount: number;
  totalLessons: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
  completedCount,
  totalLessons
}) => {
  const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'home', label: 'หน้าหลัก', icon: <Shield className="w-4 h-4" /> },
    { page: 'lessons', label: 'เนื้อหา/บทเรียน', icon: <BookOpen className="w-4 h-4" /> },
    { page: 'quiz', label: 'แบบทดสอบ', icon: <CheckCircle className="w-4 h-4" /> },
    { page: 'results', label: 'ผลการเรียน', icon: <BarChart3 className="w-4 h-4" /> },
    { page: 'survey', label: 'แบบประเมินความคิดเห็น', icon: <MessageSquare className="w-4 h-4" /> },
    { page: 'about', label: 'เกี่ยวกับบทเรียน', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
            Safe Internet Learning
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-3 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-blue-600 font-semibold bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('lessons')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>เข้าสู่บทเรียน ({completedCount}/{totalLessons})</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-label="เปิดเมนูนำทาง"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
