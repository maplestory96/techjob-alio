import { CategoryRule } from '../types/job';

/**
 * [확장형 직무 카테고리 설정]
 * 추후 새로운 직무(예: IT/SW, 기계설계, 화학분석 등)를 추가할 때
 * 아래 배열에 규칙 객체만 추가하면 필터, 카드 배지, 크롤링 분류기에 자동 반영됩니다.
 */
export const CATEGORY_RULES: CategoryRule[] = [
  {
    id: 'emc_auto_def',
    name: 'EMC 시험 (전장·국방)',
    shortName: 'EMC (전장/국방)',
    description: '자동차 전장부품(CISPR 25, ISO 11452) 및 국방/방산(MIL-STD-461) 전자파 적합성·내성 시험평가 (의료기기 제외)',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    includeKeywords: [
      'EMC', 'EMI', 'EMS', '전자파', '전자기적합성', '전장', '자동차 전장',
      '국방', '방산', 'MIL-STD', '챔버', '무향실', 'CISPR', '내성시험'
    ],
    excludeKeywords: [
      '의료기기', '의료용', '생체의료', 'IEC 60601', '병원', '임상', '바이오헬스', '치과'
    ]
  },
  {
    id: 'rf_telecom',
    name: 'RF / 무선통신',
    shortName: 'RF·무선',
    description: '고주파(RF) 회로/시스템, 안테나 측정, 무선기기 형식등록(KC/FCC/CE), 레이다 및 위성통신 시험',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    includeKeywords: [
      'RF', '무선', '고주파', '마이크로파', '안테나', '전파', '무선통신',
      '레이다', '레이더', 'SAR', '스펙트럼', '네트워크 분석기', 'VNA', '위성통신'
    ],
    excludeKeywords: ['의료기기', '의료용']
  },
  {
    id: 'elec_hardware',
    name: '전기 / 전자',
    shortName: '전기·전자',
    description: '전기기기 안전인증(KC), 전력계통·고전압 시험, 하드웨어 회로 검증 및 전자부품 신뢰성 평가',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    includeKeywords: [
      '전기', '전자', '회로', '전력', '하드웨어', 'H/W', '안전인증',
      '신뢰성', '전력전자', '고전압', '변압기', '개폐기', '배전', '제어'
    ],
    excludeKeywords: ['의료기기', '의료용']
  },
  {
    id: 'calibration',
    name: '계측장비 교정',
    shortName: '계측·교정',
    description: '국가교정기관(KOLAS) 정밀측정, 전기·전자·고주파 표준기 교정, 측정불확도 산출 및 계측기 관리',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    includeKeywords: [
      '교정', '계측', 'KOLAS', '정밀측정', '표준기', '측정불확도',
      '소급성', '계측장비', '측정기', '전기교정', '고주파교정', '표준과학'
    ],
    excludeKeywords: ['의료기기', '의료용']
  }
];

export const REGIONS = [
  '전체 지역',
  '서울',
  '경기/인천',
  '대전/충청',
  '경남/부산/울산',
  '경북/대구',
  '광주/전라',
  '강원/기타',
  '전국'
];

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
