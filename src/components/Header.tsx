import React from 'react';
import { Bookmark, PlusCircle, Terminal, Radio, ShieldCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* 브랜드 로고 및 타이틀 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                TechJob <span className="text-blue-600">ALIO</span>
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                의료분야 자동제외 ON
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              공기업·출연연 <strong className="text-slate-700 font-semibold">EMC(전장·국방) · RF · 전기전자 · 계측교정</strong> 특화 채용 허브
            </p>
          </div>
        </div>

        {/* 우측 액션 버튼 영역 */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={onOpenCrawlerModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors"
            title="비용 0원 자동 수집기 및 서버 확장 가이드"
          >
            <Terminal className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">무료 크롤러/서버 연동</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">공고 추가·분류 테스트</span>
            <span className="sm:hidden">추가</span>
          </button>

          <button
            onClick={onToggleBookmarkedOnly}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              bookmarkedOnly
                ? 'bg-amber-500 text-white shadow-amber-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarkedOnly ? 'fill-white' : 'text-amber-500 fill-amber-500'}`} />
            <span>찜한 공고</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
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
