import { CategoryRule, KeywordRecipePreset } from '../types/job';

export const CATEGORY_RULES: CategoryRule[] = [
  // 1. 전 공기업 표준 대분류 직군
  {
    id: 'admin_biz',
    name: '경영 · 회계 · 사무 · 행정',
    shortName: '경영·사무·행정',
    group: 'general',
    description: '일반행정, 경영기획, 재무·회계, 인사·노무, 법무, 마케팅 및 고객지원',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    includeKeywords: ['일반행정', '사무', '경영', '회계', '재무', '기획', '인사', '총무', '법무', '경제', '행정'],
    excludeKeywords: []
  },
  {
    id: 'elec_hardware',
    name: '전기 · 전자 · 제어',
    shortName: '전기·전자',
    group: 'general',
    description: '전력계통, 송배전, 발전설비, 전기안전(KC), 하드웨어 회로 및 전자제어',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    includeKeywords: [
      '전기', '전자', '회로', '전력', '송배전', '발전', '하드웨어', 'H/W',
      '안전인증', '신뢰성', '고전압', '변압기', '차단기', '제어'
    ],
    excludeKeywords: []
  },
  {
    id: 'mech_material',
    name: '기계 · 설비 · 재료',
    shortName: '기계·설비',
    group: 'general',
    description: '기계설계, 발전/플랜트 기계설비, 차량·철도차량, 공조냉동, 열유체 및 금속재료',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    includeKeywords: ['기계', '설비', '열역학', '유체', '공조', '재료', '금속', '용접', '배관', '차량', '플랜트'],
    excludeKeywords: []
  },
  {
    id: 'it_sw',
    name: 'IT · 전산 · 정보보안',
    shortName: 'IT·전산',
    group: 'general',
    description: 'SW 개발, 전산망/인프라 운영, 정보보호, 데이터분석·AI, 클라우드 및 DB 관리',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    includeKeywords: ['전산', 'IT', '소프트웨어', 'SW', '정보보안', '정보보호', '데이터', 'AI', '네트워크', '시스템'],
    excludeKeywords: []
  },
  {
    id: 'civil_arch',
    name: '토목 · 건축 · 도시 · 안전',
    shortName: '토목·건축·안전',
    group: 'general',
    description: '도로·철도·항만 토목시공, 건축설계/시공, 도시계획, 시설물 안전진단 및 산업안전',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    includeKeywords: ['토목', '건축', '도시', '조경', '건설', '시공', '시설', '산업안전', '안전관리', '교통'],
    excludeKeywords: []
  },
  {
    id: 'chem_env',
    name: '화공 · 환경 · 에너지',
    shortName: '화공·환경',
    group: 'general',
    description: '화학공학, 가스/수소 안전, 수질·대기 환경관리, 신재생에너지 및 보건환경',
    badgeColor: 'bg-lime-50 text-lime-800 border-lime-200',
    includeKeywords: ['화공', '화학', '환경', '수질', '대기', '폐기물', '가스', '수소', '에너지'],
    excludeKeywords: []
  },
  // 2. 엔지니어링 스페셜리스트 세부 직군 (EMC / RF / 교정)
  {
    id: 'emc_auto_def',
    name: 'EMC 시험 (전장·국방)',
    shortName: 'EMC(전장/국방)',
    group: 'specialist',
    description: '자동차 전장부품(CISPR 25, ISO 11452) 및 국방/방산(MIL-STD-461) 전자파 적합성·내성 시험평가',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    includeKeywords: [
      'EMC', 'EMI', 'EMS', '전자파', '전자기적합성', '전장', '자동차 전장',
      '국방', '방산', 'MIL-STD', '챔버', '무향실', 'CISPR', '내성시험'
    ],
    excludeKeywords: ['의료기기', '의료용', '생체의료', 'IEC 60601']
  },
  {
    id: 'rf_telecom',
    name: 'RF · 무선 · 전파통신',
    shortName: 'RF·무선통신',
    group: 'specialist',
    description: '고주파(RF) 회로/시스템, 안테나 측정, 무선기기 인증, 레이다 및 위성통신',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    includeKeywords: [
      'RF', '무선', '고주파', '마이크로파', '안테나', '전파', '통신',
      '레이다', '레이더', 'SAR', '스펙트럼', 'VNA', '위성통신'
    ],
    excludeKeywords: []
  },
  {
    id: 'calibration',
    name: '계측제어 · KOLAS 교정',
    shortName: '계측·교정',
    group: 'specialist',
    description: '국가교정기관(KOLAS) 정밀측정, 표준기 교정, 측정불확도 산출 및 발전소 계측제어',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    includeKeywords: [
      '교정', '계측', 'KOLAS', '정밀측정', '표준기', '측정불확도',
      '소급성', '계측장비', '측정기', '계측제어'
    ],
    excludeKeywords: []
  }
];

export const KEYWORD_RECIPE_PRESETS: KeywordRecipePreset[] = [
  {
    id: 'all_public',
    name: '🌐 전체 공기업 통합 보기 (기본)',
    description: '사무·전기·기계·IT·토목·화공·EMC 등 전국 모든 공기업 채용공고를 제한 없이 확인합니다.',
    category: 'all',
    includeKeywords: [],
    excludeKeywords: []
  },
  {
    id: 'admin_focus',
    name: '💼 경영·회계·일반행정 집중',
    description: '문과/상경/법정 계열 일반행정, 경영기획, 회계, 재무 직무 공고만 필터링합니다.',
    category: 'admin_biz',
    includeKeywords: ['행정', '사무', '경영', '회계', '기획', '재무'],
    excludeKeywords: []
  },
  {
    id: 'mech_elec_focus',
    name: '⚙️ 메이저 기술직 (기계·전기·화공·토목)',
    description: '한전·한수원·코레일·도로공사·가스공사 등 주요 공기업 기술직 공고를 모아봅니다.',
    category: 'all',
    includeKeywords: ['전기', '기계', '토목', '건축', '화공', '환경', '설비', '안전'],
    excludeKeywords: ['의료기기']
  },
  {
    id: 'it_focus',
    name: '💻 IT·전산·정보보안 집중',
    description: '공기업 전산직, SW 개발, 정보보호, 데이터 직무 공고만 필터링합니다.',
    category: 'it_sw',
    includeKeywords: ['전산', 'IT', '정보보안', '정보보호', 'SW', '데이터', '시스템'],
    excludeKeywords: []
  }
];

export const COMMON_CERTIFICATES: string[] = [
  '한국사능력검정 1급',
  '컴퓨터활용능력 1급',
  '전기기사',
  '무선설비기사',
  '정보통신기사',
  '전자기사',
  'KOLAS 정밀측정교육',
  '일반기계기사',
  '정보처리기사',
  '토목기사',
  '건축기사',
  '화공기사',
  '산업안전기사'
];

export const REGIONS = [
  '전체 지역',
  '서울',
  '경기/인천',
  '대전/세종/충청',
  '경남/부산/울산',
  '경북/대구',
  '광주/전라',
  '강원/제주',
  '전국'
];

export const REGION_KEYWORDS: Record<string, string[]> = {
  '서울': ['서울'],
  '경기/인천': ['경기', '인천', '성남', '수원', '고양', '용인', '안산', '과천', '화성', '평택', '부천', '의왕', '안양', '분당', '판교', '시흥', '김포', '파주'],
  '대전/세종/충청': ['대전', '세종', '충남', '충북', '충청', '청주', '천안', '아산', '진천', '음성', '오송', '당진', '보령', '태안', '논산', '공주', '충주', '제천'],
  '대전/충청': ['대전', '세종', '충남', '충북', '충청', '청주', '천안', '아산', '진천', '음성', '오송'],
  '경남/부산/울산': ['경남', '부산', '울산', '진주', '창원', '김해', '양산', '거제', '통영', '밀양', '사천'],
  '경북/대구': ['경북', '대구', '김천', '경주', '구미', '포항', '안동', '영주', '상주', '경산', '울진'],
  '광주/전라': ['광주', '전남', '전북', '전라', '나주', '전주', '여수', '광양', '목포', '순천', '익산', '군산', '완주', '무안'],
  '강원/제주': ['강원', '제주', '원주', '춘천', '강릉', '동해', '태백', '삼척', '속초', '서귀포', '정선'],
  '강원/기타': ['강원', '제주', '원주', '춘천', '강릉', '해외'],
  '전국': ['전국']
};

export function matchesRegion(location: string, detailLocation: string, selectedRegion: string): boolean {
  if (!selectedRegion || selectedRegion === '전체 지역') return true;
  const combined = `${location || ''} ${detailLocation || ''}`;
  const keywords = REGION_KEYWORDS[selectedRegion] || [selectedRegion];
  return keywords.some((kw) => combined.includes(kw));
}

export const EMPLOYMENT_TYPES = [
  '전체 고용형태',
  '정규직',
  '채용형 인턴',
  '무기계약직',
  '계약직/체험형'
];

export const NEGATIVE_MEDICAL_KEYWORDS = [
  '의료기기',
  '의료용',
  '생체의료',
  'IEC 60601',
  '치과용',
  '체외진단',
  '임상시험',
  '바이오헬스'
];

export function getCategoryRule(id: string): CategoryRule | undefined {
  return CATEGORY_RULES.find((rule) => rule.id === id);
}
