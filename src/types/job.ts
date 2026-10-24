export type JobCategoryId =
  | 'all'
  | 'admin_biz'
  | 'elec_hardware'
  | 'mech_material'
  | 'it_sw'
  | 'civil_arch'
  | 'chem_env'
  | 'emc_auto_def'
  | 'rf_telecom'
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
  endDate?: string; // YYYY-MM-DD
  note?: string;
}

export interface SelectionQuotas {
  documentQuota: string; // 예: "서류 적부", "서류 5배수", "서류 7배수", "서류 10배수"
  isDocumentPassAll?: boolean; // 서류 적부(적격/부적격) 여부
  writtenQuota: string; // 예: "필기 3배수", "필기 2.5배수", "무필기 (서류+면접)"
  interviewQuota?: string; // 예: "1차 2배수 / 최종 1배수", "면접 1배수"
}

export interface CoverLetterQuestion {
  number: number;
  title: string;
  maxChars: number;
  hint?: string;
}

export interface JobPosting {
  id: string;
  organization: string;
  orgShortName: string;
  orgType: '시장형 공기업' | '준시장형 공기업' | '준정부기관' | '기타공공기관' | '출연연구기관' | '공기업';
  title: string;
  categories: Exclude<JobCategoryId, 'all'>[];
  subDomainTags: string[];
  employmentType: EmploymentType;
  location: string;
  detailLocation: string;
  headcount: string;
  experienceLevel: '신입' | '경력' | '신입/경력' | '학력/경력 무관';
  educationRequired: string;
  applicationStart: string;
  applicationEnd: string;
  schedules: ScheduleEvent[];
  selectionQuotas: SelectionQuotas;
  coverLetterQuestions: CoverLetterQuestion[];
  summary: string;
  mainDuties: string[];
  qualifications: string[];
  preferredCerts: string[];
  ncsSubjects?: string[];
  sourceUrl: string;
  sourcePlatform: 'JOB-ALIO' | '기관공식' | '공공데이터API';
  isMedicalExcluded?: boolean;
  excludedReason?: string;
  updatedAt: string;
}

export interface CategoryRule {
  id: Exclude<JobCategoryId, 'all'>;
  name: string;
  shortName: string;
  group: 'general' | 'specialist';
  description: string;
  badgeColor: string;
  includeKeywords: string[];
  excludeKeywords: string[];
}

export interface KeywordRecipePreset {
  id: string;
  name: string;
  description: string;
  category?: JobCategoryId;
  includeKeywords: string[];
  excludeKeywords: string[];
}

export interface FilterState {
  category: JobCategoryId;
  region: string;
  employmentType: string;
  searchQuery: string;
  sortBy: 'deadline' | 'latest' | 'cert_match' | 'organization';
  bookmarkedOnly: boolean;
  hideClosed: boolean;
  docPassAllOnly: boolean;
  matchedCertsOnly: boolean;
  customIncludeKeywords: string[];
  customExcludeKeywords: string[];
}
