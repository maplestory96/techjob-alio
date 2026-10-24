import React from 'react';
import { EMPLOYMENT_TYPES, REGIONS } from '../config/categories';
import { FilterState } from '../types/job';
import {
  Search,
  MapPin,
  Briefcase,
  ArrowUpDown,
  LayoutGrid,
  Calendar as CalendarIcon,
  RotateCcw,
  X,
} from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onChangeFilters: (next: Partial<FilterState>) => void;
  onResetFilters: () => void;
  viewMode: 'card' | 'calendar';
  onChangeViewMode: (mode: 'card' | 'calendar') => void;
  resultCount: number;
}

const QUICK_TAGS = [
  '일반행정',
  '전기기사',
  '일반기계기사',
  '토목기사',
  '정보처리기사',
  '자동차 전장',
  'MIL-STD-461',
  'KOLAS',
  '무선설비기사',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  viewMode,
  onChangeViewMode,
  resultCount,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-sm space-y-3.5">
        {/* 1단: 검색창 & 지역 / 고용형태 / 정렬 / 뷰 전환 */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-3">
          {/* 키워드 검색 (모바일에서는 2열 전체 차지) */}
          <div className="col-span-2 md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onChangeFilters({ searchQuery: e.target.value })}
              placeholder="기관명(한전, 코레일, KTL 등), 직무, 자격증 검색..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onChangeFilters({ searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 근무 지역 선택 */}
          <div className="col-span-1 md:col-span-2 relative">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={filters.region}
              onChange={(e) => onChangeFilters({ region: e.target.value })}
              className="w-full pl-8 sm:pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
            >
              {REGIONS.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* 고용 형태 선택 */}
          <div className="col-span-1 md:col-span-2 relative">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={filters.employmentType}
              onChange={(e) => onChangeFilters({ employmentType: e.target.value })}
              className="w-full pl-8 sm:pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* 정렬 기준 + 초기화 + 뷰 스위치 */}
          <div className="col-span-2 md:col-span-4 flex items-center gap-2">
            <div className="relative flex-1">
              <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onChangeFilters({ sortBy: e.target.value as FilterState['sortBy'] })
                }
                className="w-full pl-8 sm:pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="deadline">마감 임박순 정렬</option>
                <option value="cert_match">내 자격증 매칭순</option>
                <option value="latest">최신 등록순 정렬</option>
                <option value="organization">기관명 가나다순</option>
              </select>
            </div>

            <button
              onClick={onResetFilters}
              title="필터 초기화"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* 데스크톱 뷰 스위치 */}
            <div className="hidden sm:inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/60 shrink-0">
              <button
                onClick={() => onChangeViewMode('card')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'card'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="카드형 뷰"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onChangeViewMode('calendar')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="전형일정 캘린더 뷰"
              >
                <CalendarIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2단: 빠른 키워드 칩 (모바일 가로 스와이프) & 서류적부/마감숨김 체크박스 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0">
            <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0">인기 검색:</span>
            {QUICK_TAGS.map((tag) => {
              const isSelected = filters.searchQuery.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() =>
                    onChangeFilters({ searchQuery: isSelected ? '' : tag })
                  }
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold'
                      : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-600 shrink-0">
            <div className="flex items-center gap-2.5">
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <input
                  type="checkbox"
                  checked={filters.docPassAllOnly}
                  onChange={(e) => onChangeFilters({ docPassAllOnly: e.target.checked })}
                  className="rounded border-emerald-400 text-emerald-600 focus:ring-emerald-500"
                />
                <span>서류 적부만</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.hideClosed}
                  onChange={(e) => onChangeFilters({ hideClosed: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>마감 숨김</span>
              </label>
            </div>

            <span>
              결과 <strong className="text-blue-600 font-extrabold">{resultCount}</strong>건
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
