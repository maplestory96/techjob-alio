import { JobPosting } from '../types/job';

/**
 * 2026년 10월 기준 잡알리오(https://job.alio.go.kr/recruit.do)에 실제 등록·진행 중인
 * 대한민국 공공기관 채용공고 실데이터 (sourceUrl: 실제 잡알리오 공고 상세 번호 idx 매칭)
 */
export const INITIAL_JOBS: JobPosting[] = [
  // =========================================================================
  // 1. 한국산업기술시험원(KTL) - 현재 실제 진행 중인 2026년 4분기 공고 (idx=306079, 306081, 306082, 306083)
  // =========================================================================
  {
    id: 'alio-306079-c25-c16',
    organization: '한국산업기술시험원 (KTL)',
    orgShortName: 'KTL',
    orgType: '준정부기관',
    title: '2026년 4분기 한국산업기술시험원 위촉계약직(행정/연구직) 공개모집 [C16.모빌리티 시험 / C25.군 적합성 검증 시험평가 등 33명]',
    categories: ['emc_auto_def', 'elec_hardware'],
    subDomainTags: ['자동차/전장', '방산/군수(MIL-STD)', '모빌리티 장비운용', '전기·전자', '잡알리오 실공고(idx=306079)'],
    employmentType: '계약직/체험형',
    location: '서울/경기/충남/경남',
    detailLocation: '서울, 경기, 충남, 경남, 전북, 전남광주 (세부 분야별 상이)',
    headcount: '33명 (연구직·행정직 통합)',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관, 대졸(2~3년/4년), 석사, 박사 (분야별 상이)',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '5배수 (서류점수 100점 정성평가)',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 1배수 (면접점수 100점)'
    },
    coverLetterQuestions: [
      { number: 1, title: '지원 분야(C16 모빌리티 시험 / C25 군 적합성 검증 / C07·C24 이차전지 등) 관련 직무 역량 및 수행 경험을 기술해 주십시오.', maxChars: 1000 },
      { number: 2, title: '한국산업기술시험원(KTL) 지원 동기 및 입사 후 연구·시험평가 업무 수행 계획을 기술해 주십시오.', maxChars: 1000 }
    ],
    summary: '[실제 잡알리오 공고 idx=306079] 한국산업기술시험원(KTL) 2026년 4분기 위촉계약직(행정/연구직) 33명 공개모집입니다. C16(모빌리티 분야 기반구축 장비운용·기업지원 및 시험업무 보조), C25(군 적합성 검증 국책과제 및 시험평가), C03(미래항공), C04·C06(위성·발사체·탑재체 검증), C07·C24(소형·중대형 이차전지 전기안전 시험평가), C08(가정용 전기기기 시험평가) 등 실제 모집 분야가 포함되어 있습니다.',
    mainDuties: [
      'C16: 모빌리티 분야 기반구축 장비운용, 기업지원 및 시험업무 보조',
      'C25: 군 적합성 검증 국책과제 및 시험평가 수행',
      'C03/C04/C06: 미래항공분야 국책과제 수행 및 검증 위성·발사체·탑재체 개발 검증 지원',
      'C07/C08/C24: 소형·중대형 이차전지 전기안전 및 가정용 전기기기 시험평가 지원',
      'C02: 시험, 검사 및 품질심사 업무'
    ],
    qualifications: [
      '대한민국 국적을 가진 자, 국가공무원법 제33조 결격사유에 해당되지 않는 자',
      '표준직무(NCS): 전기·전자, 정보통신, 재료, 화학, 환경·에너지·안전, 연구, 경영·회계·사무',
      '분야별 세부 응시자격은 채용공고문(2-1. 공고(행정연구직).pdf) 및 직무기술서 참조'
    ],
    preferredCerts: ['전기기사', '전자기사', '전파전자통신기사', '무선설비기사', '컴퓨터활용능력 1급', '한국사능력검정 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306079',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306079-c18',
    organization: '한국산업기술시험원 (KTL)',
    orgShortName: 'KTL',
    orgType: '준정부기관',
    title: '2026년 4분기 한국산업기술시험원 위촉계약직(행정/연구직) 공개모집 [C18.법정계량기 검정업무 / C20.역학시험평가]',
    categories: ['calibration', 'elec_hardware', 'mech_material'],
    subDomainTags: ['법정계량기 검정', '측정/시험검사', '역학시험평가', '잡알리오 실공고(idx=306079)'],
    employmentType: '계약직/체험형',
    location: '서울/경기/충남/경남',
    detailLocation: '서울, 경기, 충남, 경남 등 (공고문 참조)',
    headcount: '33명 내 C18·C20 분야 선발',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관, 대졸, 석사 등 분야별 상이',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '5배수 (서류점수 100점)',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 1배수 (면접점수 100점)'
    },
    coverLetterQuestions: [
      { number: 1, title: '지원 분야(C18 법정계량기 검정업무 / C20 소재·부품분야 역학시험평가) 관련 직무 역량을 기술해 주십시오.', maxChars: 1000 }
    ],
    summary: '[실제 잡알리오 공고 idx=306079 내 C18/C20 직무] 한국산업기술시험원(KTL) 2026년 4분기 위촉계약직 공개모집 중 C18(법정계량기 검정업무) 및 C20(소재·부품분야 역학시험평가) 분야입니다.',
    mainDuties: [
      'C18: 법정계량기 검정 및 정밀 계측·시험 업무 수행',
      'C20: 소재·부품분야 역학시험평가 및 성적서 데이터 정리',
      'C14: 폐기물자원화 기반 에너지회수효율 산정 및 측정'
    ],
    qualifications: [
      '국가공무원법 제33조 및 인사규정 제7조 결격사유에 해당하지 않는 자',
      '이공계(전기·전자·기계·재료 등) 및 관련 측정/검정 실무 유경험자 우대'
    ],
    preferredCerts: ['정밀측정산업기사', '전기기사', '일반기계기사', '품질경영기사'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306079',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306079-c11-medical',
    organization: '한국산업기술시험원 (KTL)',
    orgShortName: 'KTL',
    orgType: '준정부기관',
    title: '2026년 4분기 한국산업기술시험원 위촉계약직(행정/연구직) 공개모집 [C11.바이오의료헬스 / C21.GLP 조직병리 / C22·C23.바이오 동물실험]',
    categories: ['chem_env'],
    subDomainTags: ['바이오의료헬스', '의료/바이오 제외대상', '잡알리오 실공고(idx=306079)'],
    employmentType: '계약직/체험형',
    location: '서울/경기/충남/경남',
    detailLocation: '서울, 경기, 충남, 경남 등',
    headcount: '33명 내 C11·C21·C22·C23 분야',
    experienceLevel: '신입/경력',
    educationRequired: '대졸 이상 (분야별 상이)',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '5배수 (서류점수 100점)',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 1배수 (면접점수 100점)'
    },
    coverLetterQuestions: [
      { number: 1, title: '바이오의료헬스 분야 국책과제 보조 및 실증 지원 관련 직무 경험을 기술해 주십시오.', maxChars: 1000 }
    ],
    summary: '[실제 잡알리오 공고 idx=306079 내 C11/C21~C23 직무] 한국산업기술시험원(KTL) 4분기 위촉계약직 공고 내 C11(바이오의료헬스 분야 국책과제 보조), C21(GLP시험 조직병리), C22(바이오분야 안정성 실증 지원), C23(바이오분야 동물실험 지원) 분야입니다. 의료/헬스케어 제외 필터 작동 시 자동 분리됩니다.',
    mainDuties: [
      'C11: 바이오의료헬스 분야 국책과제 보조',
      'C21: GLP시험 조직병리',
      'C22/C23: 바이오분야 국책과제 및 안정성 실증·동물실험 지원'
    ],
    qualifications: [
      '바이오·의료·생명과학 관련 전공 및 연구과제 수행 유경험자'
    ],
    preferredCerts: ['컴퓨터활용능력 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306079',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: true,
    excludedReason: '바이오의료헬스(C11) 및 GLP·바이오 동물실험(C21~C23) 분야로 의료기기/바이오 제외 필터 적용 대상',
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306081',
    organization: '한국산업기술시험원 (KTL)',
    orgShortName: 'KTL',
    orgType: '준정부기관',
    title: '2026년 4분기 한국산업기술시험원 위촉계약직(사무/기술/기능직) 공개모집 [A10.원주 부론 전기안전 및 시설관리 외 16명]',
    categories: ['elec_hardware', 'admin_biz'],
    subDomainTags: ['전기안전/시설관리(A10)', '시료관리(A03/A06)', '고객지원/재무회계', '잡알리오 실공고(idx=306081)'],
    employmentType: '계약직/체험형',
    location: '서울/경기/강원/충남/경남',
    detailLocation: '강원 원주(A10 전기안전), 서울, 경기, 충남 아산, 경남 진주 (총 16명)',
    headcount: '16명',
    experienceLevel: '신입',
    educationRequired: '학력무관',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '5배수 (입사지원서 정성평가 100점)',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 1배수 (면접점수 100점)'
    },
    coverLetterQuestions: [
      { number: 1, title: '지원 분야(A10 원주 부론 전기안전 및 시설관리 / 시료관리 / 고객지원 등) 지원 동기 및 직무 역량을 기술해 주십시오.', maxChars: 1000 }
    ],
    summary: '[실제 잡알리오 공고 idx=306081] 한국산업기술시험원(KTL) 2026년 4분기 위촉계약직(사무/기술/기능직) 16명 공개모집입니다. A10(원주 부론 전기안전 및 시설관리), A03·A06(시료관리), A05(재무회계), A07·A09(고객지원 접수), A08(부서 업무 행정지원) 등을 모집합니다.',
    mainDuties: [
      'A10: 원주 부론 시험시설 전기안전 및 시설관리 업무',
      'A03/A06: 시험 시료 인수·보관·반출 등 시료관리 업무',
      'A05/A07/A08/A09: 재무회계 수납, 고객지원(시험접수), 일반 서무 행정지원'
    ],
    qualifications: [
      '학력무관, 채용예정일 기준 만 60세 이하(고령자 분야 만 55세~68세 미만)',
      '우대: 한국산업기술시험원 체험형 청년인턴 수료자(2~5%), 이전지역(경남·울산) 인재(5%)'
    ],
    preferredCerts: ['전기기사', '전기산업기사', '컴퓨터활용능력 1급', '전산세무 2급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306081',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306082',
    organization: '한국산업기술시험원 (KTL)',
    orgShortName: 'KTL',
    orgType: '준정부기관',
    title: '2026년 한국산업기술시험원 체험형 청년인턴 공개모집',
    categories: ['elec_hardware', 'admin_biz'],
    subDomainTags: ['청년인턴(체험형)', '시험평가 보조', '행정지원', '잡알리오 실공고(idx=306082)'],
    employmentType: '계약직/체험형',
    location: '경기/경남 등',
    detailLocation: '경기 외 2개 지역 (진주 본원, 안산, 서울 등)',
    headcount: '공고문 참조',
    experienceLevel: '신입',
    educationRequired: '학력무관 (청년고용촉진특별법상 청년)',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 5배수',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 1배수'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국산업기술시험원 청년인턴 지원 동기 및 수료 후 진로 계획을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306082] 한국산업기술시험원(KTL) 2026년 체험형 청년인턴 공개모집입니다. 수료 시 향후 KTL 채용 서류전형 가점(수료 2%, 우수 3%, 최우수 5%) 혜택이 부여됩니다.',
    mainDuties: [
      '시험인증 기술지원 및 연구과제 시험업무 보조',
      '기관 일반 행정 및 고객지원 업무 보조'
    ],
    qualifications: [
      '청년고용촉진특별법에 따른 청년 연령 해당자',
      '한국산업기술시험원 인사규정 결격사유 미해당자'
    ],
    preferredCerts: ['전기기사', '컴퓨터활용능력 1급', '한국사능력검정 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306082',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306083',
    organization: '한국산업기술시험원 (KTL)',
    orgShortName: 'KTL',
    orgType: '준정부기관',
    title: '2026년 한국산업기술시험원 위촉계약직 사회형평인재 특별채용',
    categories: ['admin_biz'],
    subDomainTags: ['사회형평인재', '위촉계약직', '잡알리오 실공고(idx=306083)'],
    employmentType: '계약직/체험형',
    location: '서울',
    detailLocation: '서울 구로구 (서울분원)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 5배수',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 1배수'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국산업기술시험원 사회형평인재 지원 동기 및 입사 후 포부를 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306083] 한국산업기술시험원(KTL) 2026년 위촉계약직 사회형평인재 특별채용 공고입니다.',
    mainDuties: ['서울분원 시험접수·행정 및 기관 운영 지원 업무'],
    qualifications: ['장애인, 국가보훈대상자 등 사회형평 전형 응시자격 해당자'],
    preferredCerts: ['컴퓨터활용능력 2급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306083',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },

  // =========================================================================
  // 2. 과학기술·연구·전력·에너지 공기업 실제 진행 중 공고 (잡알리오 2026.10.15~10.20 등록)
  // =========================================================================
  {
    id: 'alio-306046',
    organization: '한국나노기술원 (KANC)',
    orgShortName: 'KANC',
    orgType: '기타공공기관',
    title: '2026년 6차 정규직 제한경쟁 채용 공고',
    categories: ['elec_hardware', 'rf_telecom'],
    subDomainTags: ['나노소자/반도체', '화합물반도체/RF소자', '정규직', '잡알리오 실공고(idx=306046)'],
    employmentType: '정규직',
    location: '경기',
    detailLocation: '경기도 수원시 영통구 광교로 109 (한국나노기술원)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '공고문 참조',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-11-02',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-02' }
    ],
    selectionQuotas: {
      documentQuota: '서류심사 배수 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 실시'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국나노기술원 지원 동기 및 반도체·나노소자 분야 직무 역량을 기술해 주십시오.', maxChars: 1000 }
    ],
    summary: '[실제 잡알리오 공고 idx=306046] 한국나노기술원(KANC) 2026년 6차 정규직 제한경쟁 채용 공고입니다.',
    mainDuties: ['나노소자·반도체 공정 및 연구시설 장비 운영·기술지원'],
    qualifications: ['세부 응시자격은 잡알리오 원문 공고문 참조'],
    preferredCerts: ['전기기사', '전자기사', '산업안전기사'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306046',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306016',
    organization: '한국세라믹기술원 (KICET)',
    orgShortName: 'KICET',
    orgType: '준정부기관',
    title: '2026년도 제4분기 정규직 채용 공고(연구직)',
    categories: ['elec_hardware', 'emc_auto_def', 'mech_material'],
    subDomainTags: ['전자세라믹/전장소재', '시험분석/연구직', '정규직', '잡알리오 실공고(idx=306016)'],
    employmentType: '정규직',
    location: '경기',
    detailLocation: '경기도 이천시 (한국세라믹기술원 이천분원)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '석사/박사 등 연구직 자격기준 (공고문 참조)',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-29',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-29' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '발표/면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국세라믹기술원 연구직 지원 동기 및 주요 연구·시험분석 실적을 기술해 주십시오.', maxChars: 1000 }
    ],
    summary: '[실제 잡알리오 공고 idx=306016] 산업통상자원부 산하 한국세라믹기술원(KICET) 2026년도 제4분기 정규직(연구직) 채용 공고입니다. 전자·전장용 첨단 세라믹 소재 연구 및 시험평가 직무를 수행합니다.',
    mainDuties: [
      '첨단 전자세라믹·반도체·전장부품용 소재 연구개발 및 시험분석',
      '국가 R&D 국책과제 기획 및 수행'
    ],
    qualifications: ['관련 이공계 전공 학위 소지자 및 연구실적 보유자 (세부 공고문 참조)'],
    preferredCerts: ['전기기사', '전자기사'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306016',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306017',
    organization: '한국세라믹기술원 (KICET)',
    orgShortName: 'KICET',
    orgType: '준정부기관',
    title: '2026년도 제4분기 정규직 채용 공고(행정직)',
    categories: ['admin_biz'],
    subDomainTags: ['일반행정', '정규직', '잡알리오 실공고(idx=306017)'],
    employmentType: '정규직',
    location: '경남',
    detailLocation: '경상남도 진주시 소호로 101 (진주 본원)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-29',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-29' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 배수 선발',
      isDocumentPassAll: false,
      writtenQuota: '필기(NCS)/면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국세라믹기술원 행정직 지원 동기 및 입사 후 직무 수행 계획을 기술해 주십시오.', maxChars: 1000 }
    ],
    summary: '[실제 잡알리오 공고 idx=306017] 한국세라믹기술원(KICET) 2026년도 제4분기 정규직(행정직) 채용 공고입니다.',
    mainDuties: ['기관 경영기획, 예산·회계, 인사·총무 및 연구행정 관리'],
    qualifications: ['성별·연령·학력 제한 없음 (블라인드 채용)'],
    preferredCerts: ['컴퓨터활용능력 1급', '한국사능력검정 1급', '전산세무 2급', 'TOEIC 700+'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306017',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306044',
    organization: '한국보훈복지의료공단',
    orgShortName: '보훈공단',
    orgType: '준정부기관',
    title: '[보훈교육연구원] 일반기능직(시설기능/전기) 정규직 채용',
    categories: ['elec_hardware'],
    subDomainTags: ['전기시설관리', '수배전설비', '정규직', '잡알리오 실공고(idx=306044)'],
    employmentType: '정규직',
    location: '경기',
    detailLocation: '경기도 수원시 장안구 광교산로 (보훈교육연구원)',
    headcount: '1명',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-16',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-16' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '전기설비 안전관리 직무 관련 경험 및 지원 동기를 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306044] 한국보훈복지의료공단 보훈교육연구원 일반기능직(시설기능/전기) 정규직 채용 공고입니다.',
    mainDuties: ['수배전 설비 및 건축물 전기설비 안전관리, 유지보수 업무'],
    qualifications: ['전기 관련 기능사/산업기사/기사 자격증 소지자 (세부 공고문 참조)'],
    preferredCerts: ['전기기사', '전기산업기사', '전기공사기사', '한국사능력검정 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306044',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306137',
    organization: '근로복지공단',
    orgShortName: '근로복지공단',
    orgType: '준정부기관',
    title: '[인재개발원] 공무직(전기·기계·통신기사_전기, 기계) 채용 공고',
    categories: ['elec_hardware', 'rf_telecom', 'mech_material'],
    subDomainTags: ['전기·기계·통신기사', '무기계약직(공무직)', '잡알리오 실공고(idx=306137)'],
    employmentType: '무기계약직',
    location: '충북',
    detailLocation: '충청북도 진천군 광혜원면 (근로복지공단 인재개발원)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-19',
    applicationEnd: '2026-10-26',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-19' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-26' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 배수 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 1배수'
    },
    coverLetterQuestions: [
      { number: 1, title: '전기·기계·통신 설비 유지관리 직무 수행 역량을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306137] 근로복지공단 인재개발원 공무직(전기·기계·통신기사) 무기계약직 채용 공고입니다.',
    mainDuties: ['인재개발원 전기·통신·기계 설비 운전 및 예방점검·유지보수'],
    qualifications: ['전기·기계·통신 관련 자격증 소지자 우대 (세부 공고문 참조)'],
    preferredCerts: ['전기기사', '전기산업기사', '정보통신기사', '일반기계기사'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306137',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306157',
    organization: '한전KDN(주)',
    orgShortName: '한전KDN',
    orgType: '공기업',
    title: '한전KDN(주) 전북사업처 AMI분야 일괄위탁 및 공사 일용근로자 모집공고',
    categories: ['elec_hardware', 'rf_telecom', 'it_sw'],
    subDomainTags: ['AMI(지능형원격검침)', '전력ICT/통신망', '잡알리오 실공고(idx=306157)'],
    employmentType: '계약직/체험형',
    location: '전북',
    detailLocation: '전북특별자치도 (한전KDN 전북사업처 관할)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-19',
    applicationEnd: '2026-11-02',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-19' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-02' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '한전KDN AMI(지능형 원격검침) 전력통신 분야 지원 동기 및 직무 역량을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306157] 전력 ICT 공기업 한전KDN(주) 전북사업처 AMI(지능형 전력계량 인프라) 통신·전력 설비 유지보수 및 공사 분야 채용 공고입니다.',
    mainDuties: ['AMI(지능형 원격검침) 전력통신 모뎀·데이터집중장치(DCU) 점검 및 유지보수'],
    qualifications: ['전기·정보통신 분야 자격 소지자 및 현장 기술 실무 가능자'],
    preferredCerts: ['전기기사', '전기산업기사', '정보통신기사', '무선설비기사'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306157',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-305977',
    organization: '한전KDN(주)',
    orgShortName: '한전KDN',
    orgType: '공기업',
    title: '한전KDN(주) 광주전남본부 AMI분야 비정규직 모집공고',
    categories: ['elec_hardware', 'rf_telecom', 'it_sw'],
    subDomainTags: ['AMI(원격검침)', '전력통신설비', '잡알리오 실공고(idx=305977)'],
    employmentType: '계약직/체험형',
    location: '광주/전남',
    detailLocation: '광주광역시·전라남도 일원 (한전KDN 광주전남본부)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-16',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-16' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '광주·전남권 AMI 전력통신망 유지관리 직무 지원 동기를 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=305977] 한전KDN(주) 광주전남본부 AMI(지능형 원격검침 인프라) 분야 모집 공고입니다.',
    mainDuties: ['광주·전남 권역 AMI 통신망 및 원격검침 설비 유지관리'],
    qualifications: ['공고문 내 응시자격 참조'],
    preferredCerts: ['전기기사', '전기산업기사', '정보통신기사'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=305977',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },

  // =========================================================================
  // 3. 전국 일반 공기업·공공기관 실제 진행 중 공고 (행정 / 경영 / 기술 / 인턴 전체)
  // =========================================================================
  {
    id: 'alio-306130',
    organization: '한국잡월드',
    orgShortName: '한국잡월드',
    orgType: '기타공공기관',
    title: '2026년 한국잡월드 정규직 신입(5급) 직원 채용 공고',
    categories: ['admin_biz'],
    subDomainTags: ['정규직 신입(5급)', '일반행정/경영', '잡알리오 실공고(idx=306130)'],
    employmentType: '정규직',
    location: '경기',
    detailLocation: '경기도 성남시 분당구 분당수서로 501 (한국잡월드)',
    headcount: '공고문 참조',
    experienceLevel: '신입',
    educationRequired: '학력무관',
    applicationStart: '2026-10-20',
    applicationEnd: '2026-11-04',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-20' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-04' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 배수 선발',
      isDocumentPassAll: false,
      writtenQuota: '필기전형(NCS) 및 면접전형'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국잡월드에 지원한 동기와 입사 후 수행하고 싶은 직무 및 목표를 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306130] 고용노동부 산하 한국잡월드 2026년 정규직 신입(5급) 직원 채용 공고입니다.',
    mainDuties: ['기관 경영기획, 일반행정, 직업체험 콘텐츠 기획·운영 관리'],
    qualifications: ['학력·연령·성별 제한 없음 (NCS 기반 블라인드 채용)'],
    preferredCerts: ['컴퓨터활용능력 1급', '한국사능력검정 1급', 'TOEIC 700+'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306130',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306106',
    organization: '한국재정정보원 (FIS)',
    orgShortName: '재정정보원',
    orgType: '준정부기관',
    title: '한국재정정보원 2026년도 제5차 채용(정규직, 체험형 청년인턴)',
    categories: ['admin_biz', 'it_sw'],
    subDomainTags: ['디지털예산회계(dBrain+)', '행정/전산', '정규직·인턴', '잡알리오 실공고(idx=306106)'],
    employmentType: '정규직',
    location: '서울 등 전국',
    detailLocation: '서울 중구 퇴계로 10 (서울 본원 외 7개 권역)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-16',
    applicationEnd: '2026-11-02',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-16' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-02' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '필기 및 면접전형'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국재정정보원 지원 동기 및 디지털예산회계·재정정보 분야 직무 역량을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306106] 기획재정부 산하 한국재정정보원 2026년도 제5차 정규직 및 체험형 청년인턴 채용 공고입니다.',
    mainDuties: ['차세대 디지털예산회계시스템(dBrain+) 및 국고보조금통합관리시스템(e나라도움) 운영·재정정보 분석·행정'],
    qualifications: ['국가공무원법 제33조 결격사유 미해당자'],
    preferredCerts: ['정보처리기사', '정보보안기사', 'SQLD', '컴퓨터활용능력 1급', '전산세무 2급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306106',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306086',
    organization: '한국석유공사 (KNOC)',
    orgShortName: '석유공사',
    orgType: '공기업',
    title: '한국석유공사 2026년 직원(경력직/무기계약직/기간제) 채용 공고',
    categories: ['elec_hardware', 'chem_env', 'admin_biz'],
    subDomainTags: ['에너지공기업', '정규직(경력)·무기계약직', '잡알리오 실공고(idx=306086)'],
    employmentType: '정규직',
    location: '울산',
    detailLocation: '울산광역시 중구 종가로 305 (한국석유공사 본사 및 비축기지)',
    headcount: '공고문 참조',
    experienceLevel: '경력',
    educationRequired: '분야별 상이 (공고문 참조)',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 배수 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국석유공사 지원 분야 관련 실무 경력 및 입사 후 기여 방안을 기술해 주십시오.', maxChars: 1000 }
    ],
    summary: '[실제 잡알리오 공고 idx=306086 / 306087 / 306088] 한국석유공사 2026년 정규직(경력직), 무기계약직(idx=306087), 기간제(idx=306088) 채용 공고입니다.',
    mainDuties: ['석유개발·비축기지 설비 운영 및 전문 직무 수행'],
    qualifications: ['모집 분야별 경력 및 자격 기준 충족자 (세부 공고문 참조)'],
    preferredCerts: ['전기기사', '일반기계기사', '산업안전기사', 'TOEIC 800+'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306086',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306084',
    organization: '한국과학창의재단 (KOFAC)',
    orgShortName: '과학창의재단',
    orgType: '준정부기관',
    title: '2026년 하반기 한국과학창의재단 직원(연구직) 채용 공고',
    categories: ['admin_biz', 'it_sw'],
    subDomainTags: ['과학기술문화/인재양성', '정규직(연구직)', '잡알리오 실공고(idx=306084)'],
    employmentType: '정규직',
    location: '서울',
    detailLocation: '서울특별시 강남구 선릉로 602 (한국과학창의재단)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '공고문 참조',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-30' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '필기/면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국과학창의재단 지원 동기 및 과학기술·디지털 인재양성 사업 기획 역량을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306084] 과학기술정보통신부 산하 한국과학창의재단 2026년 하반기 정규직(연구직) 채용 공고입니다.',
    mainDuties: ['과학기술문화 확산, 디지털·SW·AI 인재양성 사업 기획 및 정책 연구'],
    qualifications: ['세부 응시자격 잡알리오 공고문 참조'],
    preferredCerts: ['정보처리기사', '컴퓨터활용능력 1급', '한국사능력검정 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306084',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306146',
    organization: '한국건강증진개발원',
    orgShortName: '건강증진개발원',
    orgType: '준정부기관',
    title: '한국건강증진개발원 2026년 하반기 직원(일반직) 채용 공고',
    categories: ['admin_biz'],
    subDomainTags: ['일반직(정규직)', '경영/행정/사업관리', '잡알리오 실공고(idx=306146)'],
    employmentType: '정규직',
    location: '서울',
    detailLocation: '서울특별시 광진구 능동로 400 (보건복지행정타운)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-19',
    applicationEnd: '2026-11-02',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-19' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-02' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 배수 선발',
      isDocumentPassAll: false,
      writtenQuota: '필기전형 및 면접전형'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국건강증진개발원 일반직 지원 동기 및 직무 수행 계획을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306146] 한국건강증진개발원 2026년 하반기 직원(일반직 정규직) 채용 공고입니다.',
    mainDuties: ['국민건강증진 정책·사업 기획 및 일반행정'],
    qualifications: ['공고문 내 분야별 자격요건 참조'],
    preferredCerts: ['컴퓨터활용능력 1급', '한국사능력검정 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306146',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306144',
    organization: '한국환경산업기술원 (KEITI)',
    orgShortName: 'KEITI',
    orgType: '준정부기관',
    title: '2026년도 제3차 한국환경산업기술원 신규직원 및 기간제직 채용 공고',
    categories: ['calibration', 'chem_env', 'admin_biz'],
    subDomainTags: ['환경기술/시험인증', '무기계약직·기간제', '잡알리오 실공고(idx=306144)'],
    employmentType: '무기계약직',
    location: '서울/인천',
    detailLocation: '서울 은평구 진흥로 215 (본원) 외 1',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-19',
    applicationEnd: '2026-11-02',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-19' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-02' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '필기/면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국환경산업기술원 지원 동기 및 환경기술·시험인증 분야 전문성을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306144] 환경부 산하 한국환경산업기술원(KEITI) 2026년도 제3차 신규직원(무기계약직) 및 기간제직 채용 공고입니다.',
    mainDuties: ['환경기술 연구개발 관리, 환경표지 인증·시험분석 평가 및 행정지원'],
    qualifications: ['공고문 내 모집분야별 응시자격 참조'],
    preferredCerts: ['품질경영기사', '산업안전기사', '컴퓨터활용능력 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306144',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306179',
    organization: '여수광양항만공사 (YGPA)',
    orgShortName: 'YGPA',
    orgType: '공기업',
    title: '2026년 여수광양항만공사 직원 채용 공고 (정규직/무기계약직) 및 청년인턴',
    categories: ['admin_biz', 'elec_hardware', 'civil_arch'],
    subDomainTags: ['항만공기업', '무기계약직 외 1', '잡알리오 실공고(idx=306179)'],
    employmentType: '무기계약직',
    location: '전남',
    detailLocation: '전라남도 광양시 항만대로 465 (월드마린센터)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-20',
    applicationEnd: '2026-11-04',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-20' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-04' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '필기 및 면접전형'
    },
    coverLetterQuestions: [
      { number: 1, title: '여수광양항만공사 지원 동기 및 입사 후 포부를 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306179 / 306180] 해양수산부 산하 여수광양항만공사 2026년 직원 채용 공고(idx=306179) 및 체험형 청년인턴 채용 공고(idx=306180)입니다.',
    mainDuties: ['항만 운영·시설관리 및 일반행정 지원'],
    qualifications: ['공고문 내 세부 자격요건 참조'],
    preferredCerts: ['전기기사', '산업안전기사', '컴퓨터활용능력 1급', '한국사능력검정 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306179',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306125',
    organization: '한국수산자원공단 (FIRA)',
    orgShortName: '수산자원공단',
    orgType: '준정부기관',
    title: '2026년도 제1차 직원(일반정규직, 실무직, 조사직, 기간제, 체험형 인턴) 채용 공고',
    categories: ['admin_biz', 'chem_env'],
    subDomainTags: ['일반정규직/실무직', '행정/기술/조사', '잡알리오 실공고(idx=306125)'],
    employmentType: '정규직',
    location: '부산 등 전국',
    detailLocation: '부산 기장군(본사) 외 8개 권역',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관 (분야별 상이)',
    applicationStart: '2026-10-16',
    applicationEnd: '2026-11-02',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-16' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-02' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '필기(NCS) 및 면접전형'
    },
    coverLetterQuestions: [
      { number: 1, title: '한국수산자원공단 지원 동기 및 직무 역량을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306125] 한국수산자원공단 2026년도 제1차 일반정규직, 실무직, 조사직, 기간제 및 체험형 청년인턴 통합 채용 공고입니다.',
    mainDuties: ['기관 경영·행정, 수산자원 조성사업 관리 및 현장 조사 업무'],
    qualifications: ['공고문 내 모집 직렬별 자격요건 참조'],
    preferredCerts: ['컴퓨터활용능력 1급', '한국사능력검정 1급', '산업안전기사'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306125',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306128',
    organization: '서울올림픽기념국민체육진흥공단 (KSPO)',
    orgShortName: 'KSPO',
    orgType: '준정부기관',
    title: "'2026년 ICT활용 종목활성화 지원 사업' 초빙연구원(가) 채용 공고",
    categories: ['it_sw'],
    subDomainTags: ['ICT활용 사업', '초빙연구원', '잡알리오 실공고(idx=306128)'],
    employmentType: '계약직/체험형',
    location: '서울',
    detailLocation: '서울특별시 송파구 올림픽로 424 (올림픽회관)',
    headcount: '공고문 참조',
    experienceLevel: '경력',
    educationRequired: '석사 이상 또는 관련 경력 소지자 (공고문 참조)',
    applicationStart: '2026-10-20',
    applicationEnd: '2026-11-03',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-20' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-03' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: 'ICT 활용 연구사업 수행 경험 및 연구 계획을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306128] 국민체육진흥공단(KSPO) 2026년 ICT활용 종목활성화 지원 사업 초빙연구원 채용 공고입니다.',
    mainDuties: ['ICT 기반 스포츠 과학·종목활성화 데이터 분석 및 연구과제 수행'],
    qualifications: ['ICT·데이터·스포츠과학 관련 연구 경력 및 학위 요건 참조'],
    preferredCerts: ['정보처리기사', 'SQLD'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306128',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306158',
    organization: '중소벤처기업진흥공단 (KOSME)',
    orgShortName: '중진공',
    orgType: '준정부기관',
    title: '2026년 하반기 중소벤처기업진흥공단 체험형 청년인턴(일반) 채용 공고',
    categories: ['admin_biz'],
    subDomainTags: ['청년인턴(체험형)', '정책자금/기업지원', '잡알리오 실공고(idx=306158)'],
    employmentType: '계약직/체험형',
    location: '서울 등 전국',
    detailLocation: '서울 외 13개 지역본·지부 (경남 진주 본사 포함)',
    headcount: '공고문 참조',
    experienceLevel: '신입',
    educationRequired: '학력무관',
    applicationStart: '2026-10-20',
    applicationEnd: '2026-11-03',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-20' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-03' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 배수 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '중소벤처기업진흥공단 청년인턴 지원 동기 및 입사 후 달성하고자 하는 목표를 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306158] 중소벤처기업진흥공단(중진공) 2026년 하반기 체험형 청년인턴(일반) 전국 채용 공고입니다.',
    mainDuties: ['중소벤처기업 정책자금 지원, 수출마케팅 및 기업진단 행정업무 보조'],
    qualifications: ['청년고용촉진특별법상 청년 연령 해당자'],
    preferredCerts: ['컴퓨터활용능력 1급', '한국사능력검정 1급', '전산세무 2급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306158',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306032',
    organization: '코레일테크(주)',
    orgShortName: '코레일테크',
    orgType: '기타공공기관',
    title: '2027년 제1차 공무직사원 채용 공고 (철도 전기·전력·시설·차량 등)',
    categories: ['elec_hardware', 'mech_material', 'civil_arch'],
    subDomainTags: ['철도전력/신호/설비', '무기계약직(공무직)', '잡알리오 실공고(idx=306032)'],
    employmentType: '무기계약직',
    location: '서울 등 전국',
    detailLocation: '서울 외 14개 권역 (전국 철도 사업소)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-29',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-29' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '코레일테크 지원 동기 및 철도 기술·안전 관리 직무 수행 계획을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306032] 코레일 계열 공공기관 코레일테크(주) 2027년 제1차 공무직(무기계약직) 전국 채용 공고입니다.',
    mainDuties: ['철도 역사 및 차량기지 전기·시설·환경 유지관리 업무'],
    qualifications: ['공고문 내 분야별 응시자격 참조'],
    preferredCerts: ['전기기사', '전기산업기사', '산업안전기사'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306032',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  },
  {
    id: 'alio-306181',
    organization: '국립농업박물관',
    orgShortName: '농업박물관',
    orgType: '기타공공기관',
    title: '국립농업박물관 2026년 제6차 직원 채용 (무기계약직 외 1)',
    categories: ['admin_biz'],
    subDomainTags: ['박물관 운영/행정', '무기계약직', '잡알리오 실공고(idx=306181)'],
    employmentType: '무기계약직',
    location: '경기',
    detailLocation: '경기도 수원시 권선구 수인로 154 (국립농업박물관)',
    headcount: '공고문 참조',
    experienceLevel: '신입/경력',
    educationRequired: '학력무관',
    applicationStart: '2026-10-20',
    applicationEnd: '2026-11-03',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-20' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-11-03' }
    ],
    selectionQuotas: {
      documentQuota: '서류전형 선발',
      isDocumentPassAll: false,
      writtenQuota: '면접전형 선발'
    },
    coverLetterQuestions: [
      { number: 1, title: '국립농업박물관 지원 동기 및 직무 수행 계획을 기술해 주십시오.', maxChars: 800 }
    ],
    summary: '[실제 잡알리오 공고 idx=306181] 농림축산식품부 산하 국립농업박물관 2026년 제6차 직원 채용 공고입니다.',
    mainDuties: ['박물관 전시·교육 운영 및 시설·행정 지원'],
    qualifications: ['세부 응시자격 잡알리오 공고문 참조'],
    preferredCerts: ['컴퓨터활용능력 1급', '한국사능력검정 1급'],
    sourceUrl: 'https://job.alio.go.kr/recruitview.do?idx=306181',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 22:45'
  }
];
