import React from 'react';
import { CATEGORY_RULES, EMPLOYMENT_TYPES, REGIONS } from '../config/categories';
import { FilterState, JobCategoryId } from '../types/job';
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
  'MIL-STD-461',
  '자동차 전장',
  'KOLAS',
  '무향챔버',
  '무선설비기사',
  '전기기사',
  '안테나',
  'KTL',
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm space-y-4">
        {/* 1단: 직무 카테고리 탭 & 뷰 전환 스위치 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          {/* 직무 탭 */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => onChangeFilters({ category: 'all' })}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                filters.category === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              전체 직무
            </button>
            {CATEGORY_RULES.map((rule) => {
              const active = filters.category === rule.id;
              return (
                <button
                  key={rule.id}
                  onClick={() => onChangeFilters({ category: rule.id as JobCategoryId })}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {rule.name}
                </button>
              );
            })}
          </div>

          {/* 우측: 카드형 뷰 / 캘린더 뷰 전환 */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/60">
              <button
                onClick={() => onChangeViewMode('card')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  viewMode === 'card'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>카드형 뷰</span>
              </button>
              <button
                onClick={() => onChangeViewMode('calendar')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>전형일정 캘린더</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2단: 검색창 & 지역 / 고용형태 / 정렬 드롭다운 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* 키워드 검색 */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onChangeFilters({ searchQuery: e.target.value })}
              placeholder="기관명, 규격(MIL-STD, CISPR, KOLAS), 자격증 검색..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
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
          <div className="md:col-span-2 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={filters.region}
              onChange={(e) => onChangeFilters({ region: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
            >
              {REGIONS.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* 고용 형태 선택 */}
          <div className="md:col-span-2 relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={filters.employmentType}
              onChange={(e) => onChangeFilters({ employmentType: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* 정렬 기준 */}
          <div className="md:col-span-3 flex items-center gap-2">
            <div className="relative flex-1">
              <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onChangeFilters({ sortBy: e.target.value as FilterState['sortBy'] })
                }
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="deadline">마감 임박순 정렬</option>
                <option value="latest">최신 등록순 정렬</option>
                <option value="organization">기관명 가나다순</option>
              </select>
            </div>

            <button
              onClick={onResetFilters}
              title="필터 초기화"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3단: 빠른 도메인 키워드 칩 & 검색 결과 건수 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 mr-1">추천 태그:</span>
            {QUICK_TAGS.map((tag) => {
              const isSelected = filters.searchQuery.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() =>
                    onChangeFilters({ searchQuery: isSelected ? '' : tag })
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
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

          <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
            <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.hideClosed}
                onChange={(e) => onChangeFilters({ hideClosed: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>마감된 공고 숨기기</span>
            </label>
            <span className="text-slate-300">|</span>
            <span>
              검색 결과 <strong className="text-blue-600 font-bold">{resultCount}</strong>건
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
