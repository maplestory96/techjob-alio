import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FilterState, JobCategoryId, JobPosting } from './types/job';
import { KEYWORD_RECIPE_PRESETS } from './config/categories';
import { INITIAL_JOBS } from './data/initialJobs';
import { calculateDDay } from './utils/dateUtils';
import { Header } from './components/Header';
import { StatsBanner } from './components/StatsBanner';
import { SmartRecipePanel } from './components/SmartRecipePanel';
import { FilterBar } from './components/FilterBar';
import { JobCard } from './components/JobCard';
import { CalendarView } from './components/CalendarView';
import { JobDetailModal } from './components/JobDetailModal';
import { AddJobModal } from './components/AddJobModal';
import { CrawlerGuideModal } from './components/CrawlerGuideModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SearchX, RotateCcw } from 'lucide-react';

const BOOKMARK_STORAGE_KEY = 'techjob_alio_bookmarks_v1';
const CUSTOM_JOBS_STORAGE_KEY = 'techjob_alio_custom_jobs_v2';
const MY_CERTS_STORAGE_KEY = 'techjob_alio_my_certs_v2';
const CUSTOM_RECIPE_STORAGE_KEY = 'techjob_alio_recipe_v3';

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  region: '전체 지역',
  employmentType: '전체 고용형태',
  searchQuery: '',
  sortBy: 'deadline',
  bookmarkedOnly: false,
  hideClosed: false,
  docPassAllOnly: false,
  matchedCertsOnly: false,
  customIncludeKeywords: [],
  customExcludeKeywords: [],
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
      return saved ? JSON.parse(saved) : ['korail-2026-all-02', 'ktl-2026-emc-01'];
    } catch {
      return [];
    }
  });

  const [myCerts, setMyCerts] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(MY_CERTS_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : ['한국사능력검정 1급', '컴퓨터활용능력 1급', '전기기사', '무선설비기사'];
    } catch {
      return ['한국사능력검정 1급', '컴퓨터활용능력 1급', '전기기사', '무선설비기사'];
    }
  });

  const [filters, setFilters] = useState<FilterState>(() => {
    try {
      const savedRecipe = localStorage.getItem(CUSTOM_RECIPE_STORAGE_KEY);
      if (savedRecipe) {
        const parsed = JSON.parse(savedRecipe);
        return {
          ...DEFAULT_FILTERS,
          customIncludeKeywords: parsed.includeKeywords ?? [],
          customExcludeKeywords: parsed.excludeKeywords ?? [],
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_FILTERS;
  });

  // 모바일에서는 기본적으로 맞춤 레시피 패널을 접어두어 첫 화면에서 공고 목록이 바로 보이게 함
  const [isRecipeOpen, setIsRecipeOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : false;
  });

  const [viewMode, setViewMode] = useState<'card' | 'calendar'>('card');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'detail' | 'cover_letter'>('detail');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCrawlerModalOpen, setIsCrawlerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  // public/data/jobs.json 로드 함수
  const loadExternalJson = useCallback(async (notify = false) => {
    try {
      const res = await fetch(`/data/jobs.json?t=${Date.now()}`);
      if (!res.ok) return;
      const data: JobPosting[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const map = new Map<string, JobPosting>();
        INITIAL_JOBS.forEach((j) => map.set(j.id, j));
        data.forEach((j) => map.set(j.id, j));
        setBaseJobs(Array.from(map.values()));
        if (notify) {
          showToast(`최신 채용공고 데이터를 성공적으로 불러왔습니다. (총 ${map.size}건)`);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    loadExternalJson(false);
  }, [loadExternalJson]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_JOBS_STORAGE_KEY, JSON.stringify(customJobs));
    } catch {
      // ignore
    }
  }, [customJobs]);

  useEffect(() => {
    try {
      localStorage.setItem(MY_CERTS_STORAGE_KEY, JSON.stringify(myCerts));
    } catch {
      // ignore
    }
  }, [myCerts]);

  useEffect(() => {
    try {
      localStorage.setItem(
        CUSTOM_RECIPE_STORAGE_KEY,
        JSON.stringify({
          includeKeywords: filters.customIncludeKeywords,
          excludeKeywords: filters.customExcludeKeywords,
        })
      );
    } catch {
      // ignore
    }
  }, [filters.customIncludeKeywords, filters.customExcludeKeywords]);

  const allJobs = useMemo(() => {
    return [...customJobs, ...baseJobs];
  }, [customJobs, baseJobs]);

  const getJobSearchableText = (job: JobPosting) =>
    [
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

  const getMatchedCertCount = useCallback(
    (job: JobPosting) => {
      return job.preferredCerts.filter((c) =>
        myCerts.some(
          (my) =>
            c.toLowerCase().includes(my.toLowerCase()) ||
            my.toLowerCase().includes(c.toLowerCase())
        )
      ).length;
    },
    [myCerts]
  );

  const excludedJobCount = useMemo(() => {
    if (filters.customExcludeKeywords.length === 0) return 0;
    return allJobs.filter((job) => {
      const text = getJobSearchableText(job);
      return filters.customExcludeKeywords.some((exc) =>
        text.includes(exc.toLowerCase())
      );
    }).length;
  }, [allJobs, filters.customExcludeKeywords]);

  const matchedCertJobCount = useMemo(() => {
    return allJobs.filter((j) => getMatchedCertCount(j) > 0).length;
  }, [allJobs, getMatchedCertCount]);

  // 현재 활성화된 상단 프리셋 판별
  const activePresetId = useMemo(() => {
    const emcPreset = KEYWORD_RECIPE_PRESETS.find((p) => p.id === 'emc_rf_cal_focus');
    if (
      emcPreset &&
      filters.customIncludeKeywords.length === emcPreset.includeKeywords.length &&
      filters.customExcludeKeywords.length === emcPreset.excludeKeywords.length
    ) {
      return 'emc_rf_cal_focus';
    }
    return 'all_public';
  }, [filters.customIncludeKeywords, filters.customExcludeKeywords]);

  const handleSelectPresetMode = (mode: 'all_public' | 'emc_rf_cal_focus') => {
    const preset = KEYWORD_RECIPE_PRESETS.find((p) => p.id === mode);
    if (!preset) return;
    setFilters((prev) => ({
      ...prev,
      category: 'all',
      customIncludeKeywords: preset.includeKeywords,
      customExcludeKeywords: preset.excludeKeywords,
    }));
    showToast(
      mode === 'all_public'
        ? '🌐 전 공기업 통합 보기 모드로 전환되었습니다.'
        : '⚡ EMC·RF·전기·교정 특화 (의료제외) 모드로 전환되었습니다.'
    );
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? '관심 공고 찜이 해제되었습니다.' : '관심 공고에 저장되었습니다.');
      return next;
    });
  };

  const handleToggleMyCert = (cert: string) => {
    setMyCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const handleAddJob = (newJob: JobPosting) => {
    setCustomJobs((prev) => [newJob, ...prev]);
    showToast('새 채용공고가 성공적으로 등록되었습니다!');
  };

  const handleUpdateFilters = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    showToast('모든 검색 필터가 초기화되어 전체 공기업 공고를 표시합니다.');
  };

  const handleSelectJob = (job: JobPosting, tab: 'detail' | 'cover_letter' = 'detail') => {
    setModalInitialTab(tab);
    setSelectedJob(job);
  };

  // 필터링 및 정렬된 최종 공고 목록
  const filteredJobs = useMemo(() => {
    return allJobs
      .filter((job) => {
        const fullText = getJobSearchableText(job);

        // 1. 커스텀 -제외 키워드 필터
        if (filters.customExcludeKeywords.length > 0) {
          const hasExcluded = filters.customExcludeKeywords.some((exc) =>
            fullText.includes(exc.toLowerCase())
          );
          if (hasExcluded) return false;
        }

        // 2. 커스텀 +포함 키워드 필터
        if (filters.customIncludeKeywords.length > 0) {
          const hasIncluded = filters.customIncludeKeywords.some((inc) =>
            fullText.includes(inc.toLowerCase())
          );
          if (!hasIncluded) return false;
        }

        // 3. 북마크 전용 보기
        if (filters.bookmarkedOnly && !bookmarks.includes(job.id)) {
          return false;
        }

        // 4. 서류 적부 공고만 보기
        if (filters.docPassAllOnly && !job.selectionQuotas?.isDocumentPassAll) {
          return false;
        }

        // 5. 내 보유 자격증 매칭 공고만 보기
        if (filters.matchedCertsOnly && getMatchedCertCount(job) === 0) {
          return false;
        }

        // 6. 마감 공고 숨기기
        if (filters.hideClosed && calculateDDay(job.applicationEnd).status === 'closed') {
          return false;
        }

        // 7. 직무 카테고리 탭 필터
        if (filters.category !== 'all' && !job.categories.includes(filters.category)) {
          return false;
        }

        // 8. 지역 필터
        if (
          filters.region !== '전체 지역' &&
          job.location !== filters.region &&
          job.location !== '전국'
        ) {
          return false;
        }

        // 9. 고용형태 필터
        if (
          filters.employmentType !== '전체 고용형태' &&
          job.employmentType !== filters.employmentType
        ) {
          return false;
        }

        // 10. 일반 검색어 필터
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.trim().toLowerCase();
          if (!fullText.includes(q)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'cert_match') {
          const diff = getMatchedCertCount(b) - getMatchedCertCount(a);
          if (diff !== 0) return diff;
        }
        if (filters.sortBy === 'deadline' || filters.sortBy === 'cert_match') {
          const dA = calculateDDay(a.applicationEnd).diffDays;
          const dB = calculateDDay(b.applicationEnd).diffDays;
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
  }, [allJobs, filters, bookmarks, getMatchedCertCount]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
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

      {/* 상단 전 공기업 9대 직군 대시보드 & 원클릭 모드 스위치 */}
      <StatsBanner
        allJobs={allJobs}
        selectedCategory={filters.category}
        onSelectCategory={(cat: JobCategoryId) => handleUpdateFilters({ category: cat })}
        activePresetId={activePresetId}
        onSelectPresetMode={handleSelectPresetMode}
      />

      {/* 유저 맞춤형 [+포함 / -제외 키워드] 레시피 & 내 자격증 매칭 패널 */}
      <SmartRecipePanel
        isOpen={isRecipeOpen}
        onToggleOpen={() => setIsRecipeOpen((prev) => !prev)}
        includeKeywords={filters.customIncludeKeywords}
        excludeKeywords={filters.customExcludeKeywords}
        onChangeKeywords={(inc, exc, cat) =>
          handleUpdateFilters({
            customIncludeKeywords: inc,
            customExcludeKeywords: exc,
            ...(cat ? { category: cat } : {}),
          })
        }
        myCerts={myCerts}
        onToggleMyCert={handleToggleMyCert}
        excludedJobCount={excludedJobCount}
        matchedCertJobCount={matchedCertJobCount}
        matchedCertsOnly={filters.matchedCertsOnly}
        onToggleMatchedCertsOnly={() =>
          handleUpdateFilters({ matchedCertsOnly: !filters.matchedCertsOnly })
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pb-12">
        {viewMode === 'card' ? (
          filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-10 sm:p-12 text-center my-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-800">
                조건에 일치하는 채용공고가 없습니다
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
                선택하신 직무 탭이나 [+포함 / -제외 키워드] 필터를 초기화해 보세요.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>전체 공기업 공고 보기로 초기화</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isBookmarked={bookmarks.includes(job.id)}
                  myCerts={myCerts}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectJob={handleSelectJob}
                />
              ))}
            </div>
          )
        ) : (
          <CalendarView
            jobs={filteredJobs}
            bookmarks={bookmarks}
            onSelectJob={(job) => handleSelectJob(job, 'detail')}
          />
        )}
      </main>

      {/* 데스크톱 푸터 */}
      <footer className="bg-white border-t border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <div>
            <strong className="text-slate-700">PublicJob ALIO v2.0</strong> · 전국 모든 공기업 채용 통합 & 맞춤 키워드·자소서·전형 캘린더 허브
          </div>
          <div className="flex items-center gap-3">
            <span>전 직군 통합 제공</span>
            <span>·</span>
            <span>모바일/PC 반응형 지원</span>
          </div>
        </div>
      </footer>

      {/* 모바일 전용 하단 고정 앱 내비게이션 바 */}
      <MobileBottomNav
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        isRecipeOpen={isRecipeOpen}
        onToggleRecipeOpen={() => {
          setIsRecipeOpen((prev) => !prev);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarkedOnly={filters.bookmarkedOnly}
        bookmarkCount={bookmarks.length}
        onToggleBookmarkedOnly={() =>
          handleUpdateFilters({ bookmarkedOnly: !filters.bookmarkedOnly })
        }
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* 공고 상세 & 자소서 작성 모달 */}
      <JobDetailModal
        job={selectedJob}
        initialTab={modalInitialTab}
        isBookmarked={selectedJob ? bookmarks.includes(selectedJob.id) : false}
        myCerts={myCerts}
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
        <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-semibold text-center md:text-left">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
