import { CATEGORY_RULES, NEGATIVE_MEDICAL_KEYWORDS } from '../config/categories';
import { JobCategoryId } from '../types/job';

export interface ClassificationResult {
  categories: Exclude<JobCategoryId, 'all'>[];
  isMedicalExcluded: boolean;
  excludedReason?: string;
  matchedKeywords: string[];
}

/**
 * 공고 제목, 주요업무, 태그 텍스트를 기반으로
 * 1) 의료 분야 네거티브 필터링 여부 판별
 * 2) EMC(전장/국방), RF, 전기/전자, 계측교정 카테고리 자동 분류
 */
export function classifyJobText(text: string): ClassificationResult {
  const upperText = text.toUpperCase();

  // 1. 의료 분야 네거티브 필터 검사
  const foundMedicalKeyword = NEGATIVE_MEDICAL_KEYWORDS.find((kw) =>
    upperText.includes(kw.toUpperCase())
  );

  const isMedicalExcluded = Boolean(foundMedicalKeyword);
  const excludedReason = foundMedicalKeyword
    ? `'${foundMedicalKeyword}' 키워드 감지 (의료 분야 자동 제외 규칙)`
    : undefined;

  // 2. 타겟 직무 카테고리 매칭
  const categories: Exclude<JobCategoryId, 'all'>[] = [];
  const matchedKeywordsSet = new Set<string>();

  for (const rule of CATEGORY_RULES) {
    const matched = rule.includeKeywords.filter((kw) =>
      upperText.includes(kw.toUpperCase())
    );
    if (matched.length > 0) {
      categories.push(rule.id);
      matched.forEach((m) => matchedKeywordsSet.add(m));
    }
  }

  return {
    categories,
    isMedicalExcluded,
    excludedReason,
    matchedKeywords: Array.from(matchedKeywordsSet)
  };
}
