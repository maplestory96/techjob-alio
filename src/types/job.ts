export type JobCategoryId =
  | 'all'
  | 'emc_auto_def'
  | 'rf_telecom'
  | 'elec_hardware'
  | 'calibration';

export type EmploymentType = '정규직' | '채용형 인턴' | '무기계약직' | '계약직/체험형';

export type ScheduleStageType =
  | 'application_start'
  | 'application_end'
  | 'document_result'
  | 'written_test'
  | 'interview'
  | 'final_result';

export interface ScheduleEvent {
  stage: ScheduleStageType;
  label: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD (선택: 기간일 경우)
  note?: string;
}

export interface JobPosting {
  id: string;
  organization: string; // 기관명 (예: 한국산업기술시험원 (KTL))
  orgShortName: string; // 약칭 (예: KTL)
  orgType: '준정부기관' | '공기업' | '기타공공기관' | '출연연구기관';
  title: string; // 공고 제목
  categories: Exclude<JobCategoryId, 'all'>[]; // 매칭된 직무 카테고리들
  subDomainTags: string[]; // 세부 도메인 태그 (예: ["자동차 전장 EMC", "MIL-STD-461", "챔버 운영"])
  employmentType: EmploymentType;
  location: string; // 지역 대분류 (예: "경기", "경남", "대전", "전국")
  detailLocation: string; // 상세 근무지 (예: "경기 화성 / 안산", "대전 유성구")
  headcount: string; // 채용 인원 (예: "0명", "3명", "15명")
  experienceLevel: '신입' | '경력' | '신입/경력' | '학력/경력 무관';
  educationRequired: string; // 학력 요건
  applicationStart: string; // YYYY-MM-DD
  applicationEnd: string; // YYYY-MM-DD
  schedules: ScheduleEvent[]; // 전형 단계별 일정 (서류, 필기, 면접 등)
  summary: string; // 직무 핵심 요약
  mainDuties: string[]; // 주요 수행 업무
  qualifications: string[]; // 필수 및 우대 자격요건
  preferredCerts: string[]; // 우대 자격증/역량 (예: ["전기기사", "무선설비기사", "KOLAS 정밀측정교육"])
  ncsSubjects?: string[]; // 필기/NCS 과목 정보
  sourceUrl: string; // 원문 공고 링크 (잡알리오/기관 채용페이지)
  sourcePlatform: 'JOB-ALIO' | '기관공식' | '공공데이터API';
  isMedicalExcluded?: boolean; // 의료 분야 네거티브 필터 대상 여부 (검증/투명성 확인용)
  excludedReason?: string; // 제외 사유 (예: "의료기기 IEC 60601 분야 제외 규칙 적용")
  updatedAt: string; // 수집/업데이트 일시
}

export interface CategoryRule {
  id: Exclude<JobCategoryId, 'all'>;
  name: string;
  shortName: string;
  description: string;
  badgeColor: string;
  includeKeywords: string[];
  excludeKeywords: string[];
}

export interface FilterState {
  category: JobCategoryId;
  region: string;
  employmentType: string;
  searchQuery: string;
  sortBy: 'deadline' | 'latest' | 'organization';
  bookmarkedOnly: boolean;
  hideClosed: boolean;
  showMedicalExcluded: boolean; // 기본적으로 false (의료 분야 자동 제외)
}
