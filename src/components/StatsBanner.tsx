import React from 'react';
import { JobPosting, JobCategoryId } from '../types/job';
import { CATEGORY_RULES } from '../config/categories';
import { calculateDDay } from '../utils/dateUtils';
import { Flame, Layers } from 'lucide-react';

interface StatsBannerProps {
  allJobs: JobPosting[];
  selectedCategory: JobCategoryId;
  onSelectCategory: (cat: JobCategoryId) => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  allJobs,
  selectedCategory,
  onSelectCategory,
}) => {
  const activeJobs = allJobs.filter((j) => calculateDDay(j.applicationEnd).status !== 'closed');
  const urgentJobs = allJobs.filter((j) => {
    const status = calculateDDay(j.applicationEnd).status;
    return status === 'today' || status === 'urgent';
  });
  const docPassAllCount = allJobs.filter((j) => j.selectionQuotas?.isDocumentPassAll).length;

  const countByCategory = (cat: Exclude<JobCategoryId, 'all'>) =>
    allJobs.filter((j) => j.categories.includes(cat)).length;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-1">
      {/* 상단 요약 배너 */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-3.5 sm:p-5 text-white shadow-lg mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">전체 공고</span>
            <strong className="text-lg sm:text-2xl font-extrabold text-white">{activeJobs.length}건</strong>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">마감임박</span>
            <strong className="text-base sm:text-xl font-bold text-rose-400">{urgentJobs.length}건</strong>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">서류적부</span>
            <strong className="text-base sm:text-xl font-bold text-emerald-400">{docPassAllCount}건</strong>
          </div>
        </div>
      </div>

      {/* 전 공기업 9대 직군 가로 스크롤(모바일) / 그리드(데스크톱) 카운트 바 */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 px-3.5 py-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-xs sm:text-sm font-extrabold">전체 직군</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
              selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {allJobs.length}
          </span>
        </button>

        {CATEGORY_RULES.map((rule) => {
          const isSelected = selectedCategory === rule.id;
          const cnt = countByCategory(rule.id);
          return (
            <button
              key={rule.id}
              type="button"
              onClick={() => onSelectCategory(isSelected ? 'all' : rule.id)}
              className={`shrink-0 px-3.5 py-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              <span className="text-xs sm:text-sm font-bold whitespace-nowrap">{rule.shortName}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                  isSelected ? 'bg-white text-blue-700' : rule.badgeColor
                }`}
              >
                {cnt}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
