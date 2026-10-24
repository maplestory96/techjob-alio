import React from 'react';
import { Bookmark, PlusCircle, Terminal, Layers } from 'lucide-react';

interface HeaderProps {
  bookmarkCount: number;
  bookmarkedOnly: boolean;
  onToggleBookmarkedOnly: () => void;
  onOpenAddModal: () => void;
  onOpenCrawlerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  bookmarkCount,
  bookmarkedOnly,
  onToggleBookmarkedOnly,
  onOpenAddModal,
  onOpenCrawlerModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* 브랜드 로고 및 타이틀 */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 truncate">
                PublicJob <span className="text-blue-600">ALIO</span>
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                전국 공기업 채용 통합
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 truncate hidden sm:block">
              전국 모든 공기업 직군별 채용공고 · 세부 모집직종 · 전형 일정 캘린더 통합 플랫폼
            </p>
          </div>
        </div>

        {/* 우측 액션 버튼 영역 */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenCrawlerModal}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors"
            title="실시간 잡알리오 크롤러 및 서버 연동 안내"
          >
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            <span className="hidden md:inline">실시간 수집/연동</span>
            <span className="md:hidden text-[11px]">수집기</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>공고 추가</span>
          </button>

          <button
            onClick={onToggleBookmarkedOnly}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
              bookmarkedOnly
                ? 'bg-amber-500 text-white shadow-amber-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${bookmarkedOnly ? 'fill-white' : 'text-amber-500 fill-amber-500'}`} />
            <span className="hidden sm:inline">찜한 공고</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-extrabold ${
                bookmarkedOnly ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {bookmarkCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
