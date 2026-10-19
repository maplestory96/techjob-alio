import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FilterState, JobCategoryId, JobPosting } from './types/job';
import { INITIAL_JOBS } from './data/initialJobs';
import { calculateDDay } from './utils/dateUtils';
import { Header } from './components/Header';
import { StatsBanner } from './components/StatsBanner';
import { FilterBar } from './components/FilterBar';
import { JobCard } from './components/JobCard';
import { CalendarView } from './components/CalendarView';
import { JobDetailModal } from './components/JobDetailModal';
import { AddJobModal } from './components/AddJobModal';
import { CrawlerGuideModal } from './components/CrawlerGuideModal';
import { SearchX, RotateCcw } from 'lucide-react';

const BOOKMARK_STORAGE_KEY = 'techjob_alio_bookmarks_v1';
const CUSTOM_JOBS_STORAGE_KEY = 'techjob_alio_custom_jobs_v1';

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  region: '전체 지역',
  employmentType: '전체 고용형태',
  searchQuery: '',
  sortBy: 'deadline',
  bookmarkedOnly: false,
  hideClosed: false,
  showMedicalExcluded: false,
};

export const App: React.FC = () => {
  const [baseJobs, setBaseJobs] = useState<JobPosting[]>(INITIAL_JOBS);
  const [customJobs, setCustomJobs] = useState<JobPosting[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_JOBS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['ktl-2026-emc-01', 'kriss-2026-cal-03'];
    } catch {
      return [];
    }
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<'card' | 'calendar'>('card');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCrawlerModalOpen, setIsCrawlerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // public/data/jobs.json 로드 함수 (크롤러가 갱신한 파일이 있으면 병합)
  const loadExternalJson = useCallback(async (notify = false) => {
    try {
      const res = await fetch(`/data/jobs.json?t=${Date.now()}`);
      if (!res.ok) return;
      const data: JobPosting[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // ID 중복 제거 병합
        const map = new Map<string, JobPosting>();
        INITIAL_JOBS.forEach((j) => map.set(j.id, j));
        data.forEach((j) => map.set(j.id, j));
        setBaseJobs(Array.from(map.values()));
        if (notify) {
          showToast(`최신 jobs.json 데이터를 성공적으로 불러왔습니다. (${map.size}건)`);
        }
      }
    } catch {
      // 로컬 초기 상태에서는 INITIAL_JOBS 사용
    }
  }, []);

  useEffect(() => {
    loadExternalJson(false);
  }, [loadExternalJson]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore storage errors
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_JOBS_STORAGE_KEY, JSON.stringify(customJobs));
    } catch {
      // ignore storage errors
    }
  }, [customJobs]);

  const allJobs = useMemo(() => {
    return [...customJobs, ...baseJobs];
  }, [customJobs, baseJobs]);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? '관심 공고 찜이 해제되었습니다.' : '관심 공고에 저장되었습니다.');
      return next;
    });
  };

  const handleAddJob = (newJob: JobPosting) => {
    setCustomJobs((prev) => [newJob, ...prev]);
    if (newJob.isMedicalExcluded) {
      showToast('새 공고가 등록되었으나 의료 분야 키워드로 인해 자동 제외 분류되었습니다.');
    } else {
      showToast('새 채용공고가 성공적으로 등록되었습니다!');
    }
  };

  const handleUpdateFilters = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    showToast('모든 검색 필터가 초기화되었습니다.');
  };

  // 필터링 및 정렬된 최종 공고 목록
  const filteredJobs = useMemo(() => {
    return allJobs
      .filter((job) => {
        // 1. 의료 분야 네거티브 필터 (기본 제외)
        if (!filters.showMedicalExcluded && job.isMedicalExcluded) {
          return false;
        }

        // 2. 북마크 전용 보기
        if (filters.bookmarkedOnly && !bookmarks.includes(job.id)) {
          return false;
        }

        // 3. 마감 공고 숨기기
        if (filters.hideClosed && calculateDDay(job.applicationEnd).status === 'closed') {
          return false;
        }

        // 4. 직무 카테고리 필터
        if (filters.category !== 'all' && !job.categories.includes(filters.category)) {
          return false;
        }

        // 5. 지역 필터
        if (
          filters.region !== '전체 지역' &&
          job.location !== filters.region &&
          job.location !== '전국'
        ) {
          return false;
        }

        // 6. 고용형태 필터
        if (
          filters.employmentType !== '전체 고용형태' &&
          job.employmentType !== filters.employmentType
        ) {
          return false;
        }

        // 7. 검색어 필터 (기관명, 약칭, 공고명, 요약, 태그, 우대자격증, 상세지역)
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.trim().toLowerCase();
          const searchable = [
            job.organization,
            job.orgShortName,
            job.title,
            job.summary,
            job.detailLocation,
            ...job.subDomainTags,
            ...job.preferredCerts,
            ...job.mainDuties,
          ]
            .join(' ')
            .toLowerCase();

          if (!searchable.includes(q)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'deadline') {
          const dA = calculateDDay(a.applicationEnd).diffDays;
          const dB = calculateDDay(b.applicationEnd).diffDays;
          // 마감된 공고는 뒤로 배치
          if (dA < 0 && dB >= 0) return 1;
          if (dA >= 0 && dB < 0) return -1;
          return dA - dB;
        }
        if (filters.sortBy === 'latest') {
          return b.applicationStart.localeCompare(a.applicationStart);
        }
        if (filters.sortBy === 'organization') {
          return a.organization.localeCompare(b.organization, 'ko');
        }
        return 0;
      });
  }, [allJobs, filters, bookmarks]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 상단 내비게이션 헤더 */}
      <Header
        bookmarkCount={bookmarks.length}
        bookmarkedOnly={filters.bookmarkedOnly}
        onToggleBookmarkedOnly={() =>
          handleUpdateFilters({ bookmarkedOnly: !filters.bookmarkedOnly })
        }
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCrawlerModal={() => setIsCrawlerModalOpen(true)}
      />

      {/* 상단 직무별 요약 통계 배너 */}
      <StatsBanner
        allJobs={allJobs}
        selectedCategory={filters.category}
        onSelectCategory={(cat: JobCategoryId) => handleUpdateFilters({ category: cat })}
        showMedicalExcluded={filters.showMedicalExcluded}
        onToggleMedicalExcluded={() =>
          handleUpdateFilters({ showMedicalExcluded: !filters.showMedicalExcluded })
        }
      />

      {/* 검색 & 필터 컨트롤 바 */}
      <FilterBar
        filters={filters}
        onChangeFilters={handleUpdateFilters}
        onResetFilters={handleResetFilters}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        resultCount={filteredJobs.length}
      />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {viewMode === 'card' ? (
          filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center my-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-800">
                조건에 일치하는 채용공고가 없습니다
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
                선택하신 직무 필터나 검색어를 변경하거나 초기화해 보세요.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>필터 전체 초기화</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isBookmarked={bookmarks.includes(job.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectJob={setSelectedJob}
                />
              ))}
            </div>
          )
        ) : (
          <CalendarView
            jobs={filteredJobs}
            bookmarks={bookmarks}
            onSelectJob={setSelectedJob}
          />
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <strong className="text-slate-700">TechJob ALIO</strong> · 공기업 하드웨어·시험인증·교정(EMC/RF/전기전자/KOLAS) 특화 채용 정보 시스템
          </div>
          <div className="flex items-center gap-4">
            <span>비용 0원 오픈소스 아키텍처</span>
            <span>·</span>
            <span>의료기기/생체의료 네거티브 필터 적용됨</span>
          </div>
        </div>
      </footer>

      {/* 공고 상세 모달 */}
      <JobDetailModal
        job={selectedJob}
        isBookmarked={selectedJob ? bookmarks.includes(selectedJob.id) : false}
        onClose={() => setSelectedJob(null)}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* 새 공고 직접 등록 & 분류기 테스트 모달 */}
      <AddJobModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddJob={handleAddJob}
      />

      {/* 무료 크롤러 & 서버 확장 안내 모달 */}
      <CrawlerGuideModal
        isOpen={isCrawlerModalOpen}
        onClose={() => setIsCrawlerModalOpen(false)}
        onReloadJson={() => loadExternalJson(true)}
      />

      {/* 토스트 알림 */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-semibold animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
