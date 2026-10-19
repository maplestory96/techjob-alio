import React from 'react';
import { JobPosting, JobCategoryId } from '../types/job';
import { calculateDDay } from '../utils/dateUtils';
import { Flame, CheckCircle2, FilterX, Cpu, Radio, Zap, Gauge } from 'lucide-react';

interface StatsBannerProps {
  allJobs: JobPosting[];
  selectedCategory: JobCategoryId;
  onSelectCategory: (cat: JobCategoryId) => void;
  showMedicalExcluded: boolean;
  onToggleMedicalExcluded: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  allJobs,
  selectedCategory,
  onSelectCategory,
  showMedicalExcluded,
  onToggleMedicalExcluded,
}) => {
  const validJobs = allJobs.filter((j) => !j.isMedicalExcluded);
  const medicalExcludedCount = allJobs.filter((j) => j.isMedicalExcluded).length;

  const activeJobs = validJobs.filter((j) => calculateDDay(j.applicationEnd).status !== 'closed');
  const urgentJobs = validJobs.filter((j) => {
    const status = calculateDDay(j.applicationEnd).status;
    return status === 'today' || status === 'urgent';
  });

  const countByCategory = (cat: Exclude<JobCategoryId, 'all'>) =>
    validJobs.filter((j) => j.categories.includes(cat)).length;

  const cards = [
    {
      id: 'emc_auto_def' as const,
      title: 'EMC 시험 (전장·국방)',
      sub: 'CISPR 25 · ISO 11452 · MIL-STD',
      count: countByCategory('emc_auto_def'),
      icon: Cpu,
      color: 'from-indigo-500 to-blue-600',
      lightBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      id: 'rf_telecom' as const,
      title: 'RF / 무선통신',
      sub: '안테나 챔버 · 레이다 · VNA/OTA',
      count: countByCategory('rf_telecom'),
      icon: Radio,
      color: 'from-sky-500 to-cyan-600',
      lightBg: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'elec_hardware' as const,
      title: '전기 / 전자',
      sub: '전기안전(KC) · 고전압 · 회로검증',
      count: countByCategory('elec_hardware'),
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
      lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'calibration' as const,
      title: '계측장비 교정',
      sub: 'KOLAS 국가교정 · 표준기 · 불확도',
      count: countByCategory('calibration'),
      icon: Gauge,
      color: 'from-amber-500 to-orange-600',
      lightBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      {/* 상단 요약 바 */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-4 sm:p-5 text-white shadow-lg mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">현재 접수중 공고</span>
            <strong className="text-xl sm:text-2xl font-extrabold text-white">{activeJobs.length}건</strong>
          </div>

          <div className="h-5 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">오늘/3일내 마감임박</span>
            <strong className="text-lg sm:text-xl font-bold text-rose-400">{urgentJobs.length}건</strong>
          </div>

          <div className="h-5 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            <span>수집 대상: KTL · KTC · KTR · 기품원 · ADD · KRISS · ETRI · KERI · 한전KPS 등</span>
          </div>
        </div>

        {/* 의료 분야 제외 필터 작동 상태 스위치 */}
        <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-700/80">
          <div className="text-xs text-slate-300 flex items-center gap-1.5">
            <FilterX className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              의료분야 자동제외: <strong className="text-emerald-300">{medicalExcludedCount}건</strong> 차단됨
            </span>
          </div>
          <button
            onClick={onToggleMedicalExcluded}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors border ${
              showMedicalExcluded
                ? 'bg-rose-500/20 text-rose-200 border-rose-400/40 hover:bg-rose-500/30'
                : 'bg-slate-700/70 text-slate-300 border-slate-600 hover:bg-slate-700'
            }`}
          >
            {showMedicalExcluded ? '제외된 의료공고 숨기기' : '제외된 공고 확인'}
          </button>
        </div>
      </div>

      {/* 4대 타겟 직무 퀵 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          const isSelected = selectedCategory === card.id;
          return (
            <button
              key={card.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : card.id)}
              className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-sm`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    isSelected ? 'bg-blue-600 text-white border-blue-600' : card.lightBg
                  }`}
                >
                  {card.count}건
                </span>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">{card.title}</div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">{card.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
