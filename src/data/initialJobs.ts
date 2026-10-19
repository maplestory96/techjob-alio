import { JobPosting } from '../types/job';

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'ktl-2026-emc-01',
    organization: '한국산업기술시험원 (KTL)',
    orgShortName: 'KTL',
    orgType: '준정부기관',
    title: '미래전장기술센터 자동차 전장부품 EMC 시험평가 정규직(전문직) 채용',
    categories: ['emc_auto_def', 'elec_hardware'],
    subDomainTags: ['자동차 전장 EMC', 'CISPR 25', 'ISO 11452', '무향챔버 운영', 'E-Mobility'],
    employmentType: '정규직',
    location: '경기/인천',
    detailLocation: '경기 화성시 (미래전장기술센터)',
    headcount: '2명',
    experienceLevel: '신입/경력',
    educationRequired: '학사 이상 (전기·전자·전파·통신공학 계열)',
    applicationStart: '2026-10-10',
    applicationEnd: '2026-10-23',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-10' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-10-23', note: '18:00 마감' },
      { stage: 'document_result', label: '서류전형 발표', date: '2026-10-29' },
      { stage: 'written_test', label: '필기전형 (NCS+전공)', date: '2026-11-07' },
      { stage: 'interview', label: '실무/임원 면접', date: '2026-11-18' },
      { stage: 'final_result', label: '최종합격 발표', date: '2026-11-27' }
    ],
    summary: '완성차 및 전장부품(EV 인버터, BMS, 자율주행 센서) 대상 전자파 적합성(EMI/EMS) 시험평가 및 성적서 발행',
    mainDuties: [
      '자동차 전장품 국내외 규격(CISPR 25, ISO 11452-2/4, UN ECE R10) 기반 EMC 시험 수행',
      '10m/3m 반무향실(Semi-Anechoic Chamber) 및 리버브레이션 챔버 시스템 운용',
      '전장부품 전자파 노이즈 디버깅 기술지원 및 KOLAS 공인성적서 작성'
    ],
    qualifications: [
      '전기, 전자, 정보통신, 전파공학 등 관련 전공 학사 학위 이상 소지자',
      '회로이론, 전자기학, RF 측정 장비(EMI Receiver, Spectrum Analyzer, Signal Generator) 활용 기본 지식 보유자'
    ],
    preferredCerts: ['무선설비기사', '전기기사', '정보통신기사', '전자기사', 'KOLAS 정밀측정교육 수료'],
    ncsSubjects: ['의사소통', '수리능력', '문제해결', '전공(전기전자/전자기학)'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'dtaq-2026-def-02',
    organization: '국방기술품질원 (DTaQ)',
    orgShortName: '기품원',
    orgType: '출연연구기관',
    title: '유도무기·감시정찰체계 국방 규격(MIL-STD-461) EMC 및 RF 품질보증 연구원 채용',
    categories: ['emc_auto_def', 'rf_telecom'],
    subDomainTags: ['국방 EMC', 'MIL-STD-461G', 'MIL-STD-464', '레이더 RF', '방산품질보증'],
    employmentType: '정규직',
    location: '경남/부산/울산',
    detailLocation: '경남 진주시 본원 / 창원 기동화력센터',
    headcount: '3명',
    experienceLevel: '신입/경력',
    educationRequired: '석사 이상 (또는 학사 후 관련 경력 2년 이상)',
    applicationStart: '2026-10-08',
    applicationEnd: '2026-10-20',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-08' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-10-20', note: '오늘 17:00 마감' },
      { stage: 'document_result', label: '1차 합격자 발표', date: '2026-10-27' },
      { stage: 'written_test', label: '온라인 인성 및 직무역량검사', date: '2026-11-02' },
      { stage: 'interview', label: '전공 세미나 및 심층면접', date: '2026-11-12' }
    ],
    summary: '양산 무기체계 전자기 환경효과(E3: EMI/EMC/EMP) 시험 입회·검증 및 군용 RF 송수신 모듈 품질보증',
    mainDuties: [
      '군용 탑재장비 MIL-STD-461G (CE, CS, RE, RS) 시험절차서(ATP) 검토 및 입회 평가',
      '체계 수준 전자기적합성(MIL-STD-464) 및 고출력 전자기펄스(HEMP) 방호 성능 검증',
      '능동위상배열(AESA) 레이다 송수신(TRM) 모듈 RF 특성 측정 및 결함 원인 분석'
    ],
    qualifications: [
      '전자공학, 전파공학, 전기공학, 국방시스템공학 관련 전공자',
      'RF 계측기(Network Analyzer, Spectrum Analyzer, Power Meter) 운용 및 MIL 규격 이해자'
    ],
    preferredCerts: ['무선설비기사', '전파전자통신기사', '전기기사', 'iNARTE EMC Engineer'],
    ncsSubjects: ['직무수행능력평가(전공 발표)', 'NCS 직업기초능력'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'kriss-2026-cal-03',
    organization: '한국표준과학연구원 (KRISS)',
    orgShortName: 'KRISS',
    orgType: '출연연구기관',
    title: '양자국가표준본부 직류·교류 전자기 및 RF 정밀계측·국가교정 기술직 공채',
    categories: ['calibration', 'rf_telecom', 'elec_hardware'],
    subDomainTags: ['국가교정(KOLAS)', 'RF 정밀측정', '측정불확도', '표준기 소급성', 'ISO/IEC 17025'],
    employmentType: '정규직',
    location: '대전/충청',
    detailLocation: '대전 유성구 (대덕연구단지 본원)',
    headcount: '2명',
    experienceLevel: '신입/경력',
    educationRequired: '학사 이상 (전기·전자·물리·계측공학)',
    applicationStart: '2026-10-14',
    applicationEnd: '2026-10-28',
    schedules: [
      { stage: 'application_start', label: '원서접수 시작', date: '2026-10-14' },
      { stage: 'application_end', label: '원서접수 마감', date: '2026-10-28', note: '18:00 마감' },
      { stage: 'document_result', label: '서류심사 발표', date: '2026-11-05' },
      { stage: 'written_test', label: '필기전형 (전공실무/NCS)', date: '2026-11-14' },
      { stage: 'interview', label: '종합면접전형', date: '2026-11-24' }
    ],
    summary: '국가 측정표준 확립을 위한 전기·자기자기·고주파(RF) 참조표준기 교정 및 측정불확도 평가',
    mainDuties: [
      '전압·저항·전류·임피던스 및 RF 전력/감쇠량 국가측정표준 시스템 운영 및 유지보수',
      '국내 산업체 및 교정기관 대상 상위 표준기 정밀교정(Calibration) 서비스 수행',
      'ISO/IEC 17025 품질경영시스템 기반 측정불확도(Uncertainty) 산출 및 교정성적서 기술책임 보조'
    ],
    qualifications: [
      '정밀 전기계측, 고주파 측정, LabVIEW/Python 기반 계측 자동화(GPIB/VISA) 유경험자 우대',
      '측정불확도 추정 및 KOLAS 공인교정기관 실무 교육 이수자 우대'
    ],
    preferredCerts: ['KOLAS 정밀측정교육', '전기기사', '전자기사', '무선설비기사'],
    ncsSubjects: ['전자기학 및 전기계측', 'NCS 문제해결/수리능력'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'ktc-2026-emcrf-04',
    organization: '한국기계전기전자시험연구원 (KTC)',
    orgShortName: 'KTC',
    orgType: '기타공공기관',
    title: '미래모빌리티·방위산업 EMC 및 무선(RF/SAR) 시험인증 채용형 인턴(정규직 전환형)',
    categories: ['emc_auto_def', 'rf_telecom', 'elec_hardware'],
    subDomainTags: ['전장 EMC', '방산 EMC', '무선 RF 시험', 'KC/FCC/CE 인증', '안테나 챔버'],
    employmentType: '채용형 인턴',
    location: '경기/인천',
    detailLocation: '경기 군포시 본원 / 충북 음성 전장센터',
    headcount: '4명',
    experienceLevel: '신입',
    educationRequired: '학력 무관 (전기·전자·전파 관련 지식 보유자)',
    applicationStart: '2026-10-12',
    applicationEnd: '2026-10-25',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-12' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-10-25' },
      { stage: 'document_result', label: '서류전형 발표', date: '2026-10-31' },
      { stage: 'written_test', label: '인적성 및 NCS 필기시험', date: '2026-11-08' },
      { stage: 'interview', label: '역량 및 실무면접', date: '2026-11-17' }
    ],
    summary: '전장부품·방산장비 전자파 시험 및 5G/Wi-Fi 6E/블루투스 무선기기 RF 적합성 시험평가 (인턴 종료 후 90% 이상 정규직 전환)',
    mainDuties: [
      '자동차 전장 및 방산 기기 EMI/EMS 시험 진행 및 대책 설계 지원',
      '무선통신기기(RF) 출력, 주파수 허용편차, 스퓨리어스 발사강도 시험 (KC, FCC, CE RED)',
      '시험 설비(Signal Analyzer, ESG, Power Amplifier) 일상 점검 및 사내 교정 주기 관리'
    ],
    qualifications: [
      '채용형 인턴 수료 후 즉시 정규직 전환 근무 가능자',
      '전자파 및 RF 수동/능동 소자 특성 이해, S-Parameter 측정 개념 숙지자'
    ],
    preferredCerts: ['무선설비기사', '전파전자통신기사', '전기기사', '정보통신기사'],
    ncsSubjects: ['NCS 직업기초능력(5과목)', '직무수행능력(전기전자기초)'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'ktr-2026-cal-05',
    organization: '한국화학융합시험연구원 (KTR)',
    orgShortName: 'KTR',
    orgType: '기타공공기관',
    title: '전기전자에너지연구소 전장 EMC 시험 및 KOLAS 계측장비 교정 기술직 채용',
    categories: ['calibration', 'emc_auto_def', 'elec_hardware'],
    subDomainTags: ['KOLAS 교정', '전장 EMC', '전기계측기 교정', '고주파 교정', '신뢰성 시험'],
    employmentType: '정규직',
    location: '경기/인천',
    detailLocation: '경기 과천시 본원 / 용인 청사',
    headcount: '3명',
    experienceLevel: '신입/경력',
    educationRequired: '전문학사 이상 (전기·전자·제어계측)',
    applicationStart: '2026-10-15',
    applicationEnd: '2026-10-30',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-15' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-10-30' },
      { stage: 'written_test', label: 'AI 역량검사 및 인적성', date: '2026-11-06' },
      { stage: 'interview', label: '1차 실무면접 / 2차 최종면접', date: '2026-11-16' }
    ],
    summary: 'KOLAS 공인교정기관 전기·전자·주파수 분야 계측장비 교정 및 자동차 전장품 전자파 신뢰성 시험',
    mainDuties: [
      '오실로스코프, 멀티미터, 신호발생기, 스펙트럼분석기 등 전기/고주파 계측장비 방문 및 입고 교정',
      'KOLAS 교정 절차서 개정 및 표준장비 소급성 유지관리',
      '자동차 전장 모듈 환경신뢰성 및 과도전압 내성(ISO 7637-2) 시험 지원'
    ],
    qualifications: [
      'KOLAS 정밀측정교육(정밀계측기기본, 측정불확도추정, 전기/고주파교정) 수료자 우대',
      '운전면허 소지자 (현장 출장 교정 수행 시 필요)'
    ],
    preferredCerts: ['KOLAS 교정교육 수료증', '전기기사', '전자기사', '계측제어기사'],
    ncsSubjects: ['NCS 기초역량', 'AI 역량검사'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'add-2026-def-06',
    organization: '국방과학연구소 (ADD)',
    orgShortName: 'ADD',
    orgType: '출연연구기관',
    title: '국방시험연구원 전자전·레이다 RF 계측 및 무기체계 전자기환경(MIL-STD) 시험 기술직',
    categories: ['emc_auto_def', 'rf_telecom'],
    subDomainTags: ['국방과학연구소', 'MIL-STD-461', '전자전 RF', '대형 전자파 챔버', '안테나 측정'],
    employmentType: '무기계약직',
    location: '대전/충청',
    detailLocation: '대전 유성구 / 충남 태안 안흥종합시험장',
    headcount: '2명',
    experienceLevel: '신입/경력',
    educationRequired: '학사 이상 또는 전문학사 후 경력 2년 이상',
    applicationStart: '2026-10-16',
    applicationEnd: '2026-11-02',
    schedules: [
      { stage: 'application_start', label: '응시원서 접수', date: '2026-10-16' },
      { stage: 'application_end', label: '응시원서 마감', date: '2026-11-02', note: '15:00 마감' },
      { stage: 'document_result', label: '서류전형 합격발표', date: '2026-11-11' },
      { stage: 'interview', label: '실무능력 및 면접평가', date: '2026-11-20' }
    ],
    summary: '국방 연구개발 무기체계 대형 전자파 무향실 운용, MIL-STD-461/464 시험 계측 및 근접전계 안테나 패턴 측정',
    mainDuties: [
      '군용 비행체·지상장비 체계 전자기적합성(EMC) 및 복사내성(RS) 고출력 증폭기(TWTA/SSPA) 운용',
      '전자전 재밍 장비 및 레이다 안테나 레이돔 RF 투과손실/패턴 정밀 계측',
      '시험 계측 데이터 수집 자동화 프로그램 운용 및 시험장 계측기 정밀 교정 의뢰 관리'
    ],
    qualifications: [
      '대한민국 국적자 (군사기밀 취급 인가 결격사유 없는 자)',
      '초고주파(Microwave) 및 EMC 시험장비 실무 운용 역량 보유자'
    ],
    preferredCerts: ['무선설비기사', '전파전자통신기사', '전기기사', '전자기사'],
    ncsSubjects: ['블라인드 직무역량 기술서 심사', '전공 실무 구술면접'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'keri-2026-elec-07',
    organization: '한국전기연구원 (KERI)',
    orgShortName: 'KERI',
    orgType: '출연연구기관',
    title: '전기기기시험본부 대전력·고전압 시험인증 및 계측설비 교정 기술원 채용',
    categories: ['elec_hardware', 'calibration', 'emc_auto_def'],
    subDomainTags: ['고전압/대전력 시험', '전기안전인증', '전력기기 EMC', '계측설비 교정', 'STL 국제인증'],
    employmentType: '정규직',
    location: '경남/부산/울산',
    detailLocation: '경남 창원시 본원 / 경기 안산 분원',
    headcount: '5명',
    experienceLevel: '신입',
    educationRequired: '학사 이상 (전기공학, 전자공학, 제어계측공학)',
    applicationStart: '2026-10-18',
    applicationEnd: '2026-11-04',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-18' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-11-04' },
      { stage: 'written_test', label: '필기전형 (전공+NCS)', date: '2026-11-15' },
      { stage: 'interview', label: '실무 및 종합면접', date: '2026-11-25' }
    ],
    summary: '세계단락시험협의체(STL) 공인 중전기기 단락·유전·과도전압 시험 및 고전압 정밀 분압기/오실로스코프 교정',
    mainDuties: [
      '초고압 차단기, 변압기, 전력케이블 단락시험 및 뇌임펄스(Lightning Impulse) 고전압 절연 시험',
      '스마트그리드 전력변환장치(PCS) 및 전기차 급속충전기 전자파(EMC)/고조파 시험',
      '대전력 시험장 내 고전압 프로브, 전류 션트(Shunt), 광계측 시스템 정밀 교정 및 오차 보정'
    ],
    qualifications: [
      '전기공학, 전력전자, 고전압공학, 제어계측 관련 전공자',
      '전기기사 자격증 소지자 가점 부여'
    ],
    preferredCerts: ['전기기사', '전기공사기사', '전자기사', 'KOLAS 정밀측정교육'],
    ncsSubjects: ['전공(회로이론, 전자기학, 전력공학, 전기기기)', 'NCS 직업기초능력'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'etri-2026-rf-08',
    organization: '한국전자통신연구원 (ETRI)',
    orgShortName: 'ETRI',
    orgType: '출연연구기관',
    title: '입체통신연구소 6G/저궤도 위성통신 RF 송수신 하드웨어 및 안테나 시험 연구원 채용',
    categories: ['rf_telecom', 'elec_hardware'],
    subDomainTags: ['6G/위성통신 RF', '밀리미터파(mmWave)', '안테나 챔버 측정', 'RF 프론트엔드'],
    employmentType: '계약직/체험형',
    location: '대전/충청',
    detailLocation: '대전 유성구 ETRI 본원',
    headcount: '3명',
    experienceLevel: '신입/경력',
    educationRequired: '학사 또는 석사 학위 소지자',
    applicationStart: '2026-10-12',
    applicationEnd: '2026-10-22',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-12' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-10-22', note: 'D-2 마감임박' },
      { stage: 'document_result', label: '서류전형 결과발표', date: '2026-10-28' },
      { stage: 'interview', label: '온라인/대면 면접전형', date: '2026-11-05' }
    ],
    summary: 'Ka/Ku 대역 위성통신 탑재체 RF 모듈 성능 시험, 밀리미터파 빔포밍 안테나 무향실 OTA(Over-The-Air) 측정',
    mainDuties: [
      '밀리미터파 대역 RF 송수신(Transceiver) 보드 검증 및 VNA/Spectrum Analyzer 계측',
      '근접전계/원거리전계 안테나 무향챔버를 활용한 빔패턴, 이득(Gain), EIRP 측정',
      '우주·국방 환경 대비 RF 부품 열진공/전자파 시험 데이터 분석'
    ],
    qualifications: [
      '전자공학, 전파통신공학, 정보통신공학 전공자',
      'ADS, HFSS, CST 등 EM/RF 시뮬레이션 툴 또는 RF 계측장비 사용 경험자'
    ],
    preferredCerts: ['무선설비기사', '전파전자통신기사', '전자기사'],
    ncsSubjects: ['서류전형 후 직무역량 면접 중심'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'kps-2026-cal-09',
    organization: '한전KPS',
    orgShortName: '한전KPS',
    orgType: '공기업',
    title: '2026년 하반기 신입사원(G4등급) 전기·계측제어 및 표준계측기 교정 분야 채용',
    categories: ['elec_hardware', 'calibration'],
    subDomainTags: ['계측제어 정밀점검', 'KOLAS 사내교정', '발전설비 전기진단', '공기업 정규직'],
    employmentType: '채용형 인턴',
    location: '전국',
    detailLocation: '전남 나주 본사 및 전국 사업소 (인재개발원 계측교정센터)',
    headcount: '25명',
    experienceLevel: '신입',
    educationRequired: '학력 무관',
    applicationStart: '2026-10-19',
    applicationEnd: '2026-11-03',
    schedules: [
      { stage: 'application_start', label: '지원서 접수 시작', date: '2026-10-19' },
      { stage: 'application_end', label: '지원서 접수 마감', date: '2026-11-03' },
      { stage: 'written_test', label: '필기시험 (NCS + 전공)', date: '2026-11-21' },
      { stage: 'interview', label: '역량 및 인성면접', date: '2026-12-03' }
    ],
    summary: '발전소 계측제어설비(I&C) 예방정비 및 한전KPS KOLAS 공인교정센터 내 압력·온도·전기 계측기 정밀교정',
    mainDuties: [
      '발전소 터빈/보일러/원자로 계측제어 루프 시험, 센서 정밀 교정 및 제어카드 H/W 진단',
      '사내 KOLAS 교정기관 표준계측기(칼리브레이터, 표준저항, 주파수카운터) 주기 교정 수행',
      '발전기 및 주변압기 절연진단, 부분방전(PD) 측정'
    ],
    qualifications: [
      '전기, 전자, 계측제어 관련 산업기사 이상 자격증 소지자 가점',
      '교대근무 및 전국 사업소 근무 가능자'
    ],
    preferredCerts: ['전기기사', '전자기사', '계측제어기사', '무선설비기사'],
    ncsSubjects: ['의사소통, 수리, 문제해결, 자원관리, 기술능력', '전기/전자/계측 전공필기'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'rapa-2026-rfemc-10',
    organization: '한국전파진흥협회 (RAPA)',
    orgShortName: 'RAPA',
    orgType: '기타공공기관',
    title: '전파엔지니어링랩(IoT/전장) 대형 전자파 챔버 및 RF 계측장비 운영·교정 전임직 채용',
    categories: ['rf_telecom', 'emc_auto_def', 'calibration'],
    subDomainTags: ['전파엔지니어링랩', 'EMC 디버깅', 'RF 계측장비 관리', '안테나 챔버'],
    employmentType: '계약직/체험형',
    location: '서울',
    detailLocation: '서울 양천구 목동 / 경기 고양 IoT기술지원센터',
    headcount: '2명',
    experienceLevel: '신입/경력',
    educationRequired: '초대졸 이상 (전파·통신·전자 계열)',
    applicationStart: '2026-10-13',
    applicationEnd: '2026-10-26',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-13' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-10-26' },
      { stage: 'document_result', label: '서류합격 발표', date: '2026-10-30' },
      { stage: 'interview', label: '실무 면접전형', date: '2026-11-06' }
    ],
    summary: '중소 전장/무선기기 기업 대상 EMC 사전시험(Pre-compliance), RF 안테나 성능 측정 기술지원 및 보유 계측장비 교정 관리',
    mainDuties: [
      '3m/10m EMC 챔버 및 OTA 안테나 챔버 시험 일정 운영 및 측정 엔지니어링 지원',
      '고성능 오실로스코프, 네트워크 분석기(VNA), 스펙트럼 분석기 등 센터 보유 계측장비 상태 점검 및 정기 교정 관리',
      '전장/무선 모듈 EMI 방사 노이즈 원인 분석 및 필터/차폐 디버깅 가이드'
    ],
    qualifications: [
      'RF 및 EMC 측정 장비 직접 조작 가능자',
      '기업 기술지원 및 커뮤니케이션 원활자'
    ],
    preferredCerts: ['무선설비기사', '전파전자통신기사', '정보통신기사'],
    ncsSubjects: ['NCS 기반 서류 및 실무 면접'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: false,
    updatedAt: '2026-10-20 00:15'
  },
  // --- 아래 2건은 '의료 분야 자동 제외(Negative Filter)' 작동을 검증하기 위한 실제형 공고입니다 ---
  {
    id: 'ktl-2026-med-excluded-11',
    organization: '한국산업기술시험원 (KTL)',
    orgShortName: 'KTL',
    orgType: '준정부기관',
    title: '[의료분야 제외대상] 바이오의료헬스본부 전자의료기기(IEC 60601-1-2) 전자파 및 안전성 시험원',
    categories: ['emc_auto_def', 'elec_hardware'],
    subDomainTags: ['의료기기 EMC', 'IEC 60601', '생체의료', '자동제외됨'],
    employmentType: '정규직',
    location: '서울',
    detailLocation: '서울 구로구 / 강원 원주 의료기기센터',
    headcount: '2명',
    experienceLevel: '신입/경력',
    educationRequired: '학사 이상 (의공학, 전자공학)',
    applicationStart: '2026-10-11',
    applicationEnd: '2026-10-27',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-11' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-10-27' }
    ],
    summary: '병원용 전자의료기기 및 체외진단기기의 의료규격(IEC 60601-1-2) 기반 전자파 안전 시험 (※ 사용자 설정에 의해 의료 분야 자동 필터링 대상)',
    mainDuties: [
      '전자의료기기 식약처 품목허가용 전자파 및 전기안전 시험',
      '생체의료 장비 누설전류 및 절연 시험'
    ],
    qualifications: ['의공학, 전자공학 전공자'],
    preferredCerts: ['의공기사', '전기기사'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: true,
    excludedReason: "'의료기기 / IEC 60601 / 생체의료' 키워드 감지 (요청하신 전장·국방 외 의료 분야 자동 제외 규칙 적용)",
    updatedAt: '2026-10-20 00:15'
  },
  {
    id: 'kbio-2026-med-excluded-12',
    organization: '오송첨단의료산업진흥재단 (KBIOHealth)',
    orgShortName: 'KBIO',
    orgType: '기타공공기관',
    title: '[의료분야 제외대상] 첨단의료기기개발지원센터 의료용 전자파(EMC) 및 신뢰성 평가 연구직',
    categories: ['emc_auto_def'],
    subDomainTags: ['의료용 전자기기', '임상시험', 'IEC 60601', '자동제외됨'],
    employmentType: '정규직',
    location: '대전/충청',
    detailLocation: '충북 청주시 오송읍',
    headcount: '1명',
    experienceLevel: '경력',
    educationRequired: '석사 이상',
    applicationStart: '2026-10-14',
    applicationEnd: '2026-10-29',
    schedules: [
      { stage: 'application_start', label: '서류접수 시작', date: '2026-10-14' },
      { stage: 'application_end', label: '서류접수 마감', date: '2026-10-29' }
    ],
    summary: '첨단 전자의료기기 인허가 지원 및 의료용 전자파 시험 (※ 사용자 설정에 의해 의료 분야 자동 필터링 대상)',
    mainDuties: ['의료기기 전자파 시험평가 및 기술지원'],
    qualifications: ['의공학 및 전자공학 전공'],
    preferredCerts: ['의공기사'],
    sourceUrl: 'https://job.alio.go.kr',
    sourcePlatform: 'JOB-ALIO',
    isMedicalExcluded: true,
    excludedReason: "'의료용 / 의료기기' 키워드 감지 (요청하신 전장·국방 외 의료 분야 자동 제외 규칙 적용)",
    updatedAt: '2026-10-20 00:15'
  }
];
