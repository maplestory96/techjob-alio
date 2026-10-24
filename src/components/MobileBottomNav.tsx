import React from 'react';
import { LayoutGrid, Calendar, SlidersHorizontal, Bookmark, PlusCircle } from 'lucide-react';

interface MobileBottomNavProps {
  viewMode: 'card' | 'calendar';
  onChangeViewMode: (mode: 'card' | 'calendar') => void;
  isRecipeOpen: boolean;
  onToggleRecipeOpen: () => void;
  bookmarkedOnly: boolean;
  bookmarkCount: number;
  onToggleBookmarkedOnly: () => void;
  onOpenAddModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  viewMode,
  onChangeViewMode,
  isRecipeOpen,
  onToggleRecipeOpen,
  bookmarkedOnly,
  bookmarkCount,
  onToggleBookmarkedOnly,
  onOpenAddModal,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => {
            onChangeViewMode('card');
            if (bookmarkedOnly) onToggleBookmarkedOnly();
          }}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
            viewMode === 'card' && !bookmarkedOnly
              ? 'text-blue-600 bg-blue-50/70'
              : 'text-slate-500'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span>공고목록</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeViewMode('calendar')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
            viewMode === 'calendar' ? 'text-blue-600 bg-blue-50/70' : 'text-slate-500'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>전형달력</span>
        </button>

        <button
          type="button"
          onClick={onToggleRecipeOpen}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
            isRecipeOpen ? 'text-indigo-600 bg-indigo-50/70' : 'text-slate-500'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5 mb-0.5" />
          <span>맞춤필터</span>
        </button>

        <button
          type="button"
          onClick={onToggleBookmarkedOnly}
          className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
            bookmarkedOnly ? 'text-amber-600 bg-amber-50' : 'text-slate-500'
          }`}
        >
          <Bookmark className={`w-5 h-5 mb-0.5 ${bookmarkedOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span>찜({bookmarkCount})</span>
        </button>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold text-slate-500 hover:text-blue-600"
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span>공고추가</span>
        </button>
      </div>
    </nav>
  );
};
