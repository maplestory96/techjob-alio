import React, { useState, useMemo } from 'react';
import { JobPosting, ScheduleStageType } from '../types/job';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Bookmark, ExternalLink } from 'lucide-react';
import { formatFullDateWithDay } from '../utils/dateUtils';

interface CalendarViewProps {
  jobs: JobPosting[];
  bookmarks: string[];
  onSelectJob: (job: JobPosting) => void;
}

interface CalendarDayEvent {
  job: JobPosting;
  stage: ScheduleStageType;
  label: string;
  date: string;
  note?: string;
}

const STAGE_META: Record<
  ScheduleStageType,
  { name: string; shortTag: string; pillClass: string; dotClass: string }
> = {
  application_start: {
    name: '서류접수 시작',
    shortTag: '시작',
    pillClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
  },
  application_end: {
    name: '서류접수 마감',
    shortTag: '마감',
    pillClass: 'bg-rose-50 text-rose-700 border-rose-200 font-bold',
    dotClass: 'bg-rose-500',
  },
  document_result: {
    name: '서류전형 발표',
    shortTag: '발표',
    pillClass: 'bg-sky-50 text-sky-700 border-sky-200',
    dotClass: 'bg-sky-500',
  },
  written_test: {
    name: '필기시험 (NCS/전공)',
    shortTag: '필기',
    pillClass: 'bg-purple-50 text-purple-700 border-purple-200 font-semibold',
    dotClass: 'bg-purple-500',
  },
  interview: {
    name: '면접전형',
    shortTag: '면접',
    pillClass: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    dotClass: 'bg-amber-500',
  },
  final_result: {
    name: '최종합격 발표',
    shortTag: '최종',
    pillClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dotClass: 'bg-indigo-500',
  },
};

export const CalendarView: React.FC<CalendarViewProps> = ({
  jobs,
  bookmarks,
  onSelectJob,
}) => {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState<number>(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(now.getMonth());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  });

  const [enabledStages, setEnabledStages] = useState<Record<ScheduleStageType, boolean>>({
    application_start: true,
    application_end: true,
    document_result: true,
    written_test: true,
    interview: true,
    final_result: true,
  });

  const toggleStage = (stage: ScheduleStageType) => {
    setEnabledStages((prev) => ({ ...prev, [stage]: !prev[stage] }));
  };

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarDayEvent[]> = {};
    for (const job of jobs) {
      for (const s of job.schedules) {
        if (!enabledStages[s.stage]) continue;
        if (!map[s.date]) {
          map[s.date] = [];
        }
        map[s.date].push({
          job,
          stage: s.stage,
          label: s.label,
          date: s.date,
          note: s.note,
        });
      }
    }
    return map;
  }, [jobs, enabledStages]);

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const days: Array<{ dateStr: string; dayNum: number; isCurrentMonth: boolean }> = [];

    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const prevDate = new Date(currentYear, currentMonth - 1, d);
      const dateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr, dayNum: d, isCurrentMonth: false });
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr, dayNum: d, isCurrentMonth: true });
    }

    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextDate = new Date(currentYear, currentMonth + 1, d);
      const dateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr, dayNum: d, isCurrentMonth: false });
    }

    return days;
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const selectedDayEvents = eventsByDate[selectedDateStr] || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
      {/* 좌측 8열: 월간 캘린더 그리드 */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-3.5 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900">
              {currentYear}년 {currentMonth + 1}월
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentYear(now.getFullYear());
                  setCurrentMonth(now.getMonth());
                  setSelectedDateStr(todayStr);
                }}
                className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700"
              >
                오늘
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 전형 단계별 범례 & 토글 */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0">
            {(Object.keys(STAGE_META) as ScheduleStageType[]).map((stageKey) => {
              const meta = STAGE_META[stageKey];
              const active = enabledStages[stageKey];
              return (
                <button
                  key={stageKey}
                  onClick={() => toggleStage(stageKey)}
                  className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs border transition-all ${
                    active
                      ? meta.pillClass
                      : 'bg-slate-50 text-slate-400 border-slate-200 line-through'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${meta.dotClass}`} />
                  <span>{meta.shortTag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200/80 text-center text-[11px] sm:text-xs font-bold text-slate-500 py-2">
          <div className="text-rose-500">일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div className="text-blue-600">토</div>
        </div>

        {/* 날짜 셀 그리드 (모바일에서도 한눈에 들어오도록 최적화) */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
          {calendarDays.map((cell, idx) => {
            const dayEvents = eventsByDate[cell.dateStr] || [];
            const isToday = cell.dateStr === todayStr;
            const isSelected = cell.dateStr === selectedDateStr;
            const dayOfWeek = idx % 7;

            return (
              <div
                key={cell.dateStr}
                onClick={() => setSelectedDateStr(cell.dateStr)}
                className={`min-h-[68px] sm:min-h-[116px] p-1 sm:p-2 transition-colors cursor-pointer flex flex-col ${
                  !cell.isCurrentMonth ? 'bg-slate-50/60 text-slate-300' : 'bg-white hover:bg-blue-50/30'
                } ${isSelected ? 'ring-2 ring-inset ring-blue-600 bg-blue-50/20' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[11px] sm:text-xs font-bold flex items-center justify-center ${
                      isToday
                        ? 'bg-blue-600 text-white'
                        : !cell.isCurrentMonth
                        ? 'text-slate-300'
                        : dayOfWeek === 0
                        ? 'text-rose-500'
                        : dayOfWeek === 6
                        ? 'text-blue-600'
                        : 'text-slate-700'
                    }`}
                  >
                    {cell.dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] font-extrabold text-blue-600 sm:text-slate-400">
                      {dayEvents.length}
                    </span>
                  )}
                </div>

                {/* 모바일: 컴팩트 미니 배지 / 데스크톱: 전체 배지 */}
                <div className="space-y-0.5 sm:space-y-1 overflow-y-auto max-h-[42px] sm:max-h-[80px] no-scrollbar">
                  {dayEvents.map((ev, i) => {
                    const meta = STAGE_META[ev.stage];
                    const isFav = bookmarks.includes(ev.job.id);
                    return (
                      <div
                        key={`${ev.job.id}-${ev.stage}-${i}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDateStr(cell.dateStr);
                          onSelectJob(ev.job);
                        }}
                        className={`px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] border truncate flex items-center gap-0.5 sm:gap-1 hover:opacity-80 ${meta.pillClass}`}
                      >
                        <span className="font-extrabold shrink-0 hidden sm:inline">[{meta.shortTag}]</span>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 sm:hidden ${meta.dotClass}`} />
                        <span className="truncate font-semibold">{ev.job.orgShortName}</span>
                        {isFav && <span className="text-amber-500 ml-auto shrink-0 hidden sm:inline">★</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 우측(모바일은 하단) 4열: 선택된 날짜의 상세 전형 타임라인 패널 */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                선택 일자 전형 일정 ({selectedDayEvents.length}건)
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                {formatFullDateWithDay(selectedDateStr)}
              </h3>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          {selectedDayEvents.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-semibold text-slate-500">
                선택하신 날짜에 예정된 전형 일정이 없습니다.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                달력에서 일정이 있는 날짜를 터치해 보세요.
              </p>
            </div>
          ) : (
            <div className="mt-3.5 space-y-2.5">
              {selectedDayEvents.map((ev, idx) => {
                const meta = STAGE_META[ev.stage];
                const isFav = bookmarks.includes(ev.job.id);
                return (
                  <div
                    key={`${ev.job.id}-${ev.stage}-${idx}`}
                    onClick={() => onSelectJob(ev.job)}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer bg-slate-50/50"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-md text-xs border ${meta.pillClass}`}
                      >
                        {meta.name}
                      </span>
                      {ev.note && (
                        <span className="text-xs font-semibold text-rose-600">
                          {ev.note}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mt-1">
                      <span>{ev.job.organization}</span>
                      {isFav && (
                        <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-2">
                      {ev.job.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/70 text-[11px] text-slate-500">
                      <span className="truncate">{ev.job.detailLocation}</span>
                      <span className="text-blue-600 font-bold inline-flex items-center gap-0.5 shrink-0">
                        상세/자소서 <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
          <strong className="text-slate-700 block mb-0.5">💡 토요일 필기 겹치기 확인 팁</strong>
          상단의 <span className="font-semibold text-purple-600">[필기]</span> 버튼만 켜두면 토요일마다 어느 공기업 시험이 겹치는지 한눈에 비교할 수 있습니다.
        </div>
      </div>
    </div>
  );
};
