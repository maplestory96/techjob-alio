import React, { useState, useMemo } from 'react';
import { EmploymentType, JobPosting } from '../types/job';
import { classifyJobText } from '../utils/classifier';
import { getCategoryRule, REGIONS, EMPLOYMENT_TYPES } from '../config/categories';
import { X, Sparkles, AlertTriangle, CheckCircle2, Plus } from 'lucide-react';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (newJob: JobPosting) => void;
}

export const AddJobModal: React.FC<AddJobModalProps> = ({ isOpen, onClose, onAddJob }) => {
  const [organization, setOrganization] = useState('한국산업기술시험원 (KTL)');
  const [orgShortName, setOrgShortName] = useState('KTL');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [location, setLocation] = useState('경기/인천');
  const [detailLocation, setDetailLocation] = useState('경기 화성시');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('정규직');
  const [headcount, setHeadcount] = useState('1명');
  const [documentQuota, setDocumentQuota] = useState('서류 5배수');
  const [writtenQuota, setWrittenQuota] = useState('필기 3배수');
  const [applicationEnd, setApplicationEnd] = useState('2026-11-05');
  const [writtenDate, setWrittenDate] = useState('2026-11-14');
  const [interviewDate, setInterviewDate] = useState('2026-11-24');
  const [certsInput, setCertsInput] = useState('무선설비기사, 전기기사');

  const classification = useMemo(() => {
    return classifyJobText(`${title} ${summary} ${certsInput}`);
  }, [title, summary, certsInput]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const todayStr = '2026-10-20';
    const categories =
      classification.categories.length > 0 ? classification.categories : (['elec_hardware'] as const);

    const schedules: JobPosting['schedules'] = [
      { stage: 'application_start', label: '서류접수 시작', date: todayStr },
      { stage: 'application_end', label: '서류접수 마감', date: applicationEnd },
    ];
    if (writtenDate) {
      schedules.push({ stage: 'written_test', label: '필기전형', date: writtenDate });
    }
    if (interviewDate) {
      schedules.push({ stage: 'interview', label: '면접전형', date: interviewDate });
    }

    const newJob: JobPosting = {
      id: `custom-${Date.now()}`,
      organization,
      orgShortName: orgShortName || organization.slice(0, 4),
      orgType: '기타공공기관',
      title,
      categories: [...categories],
      subDomainTags:
        classification.matchedKeywords.length > 0
          ? classification.matchedKeywords.slice(0, 5)
          : ['신규등록'],
      employmentType,
      location,
      detailLocation: detailLocation || location,
      headcount,
      experienceLevel: '신입/경력',
      educationRequired: '학력 무관 (관련 전공 우대)',
      applicationStart: todayStr,
      applicationEnd,
      schedules,
      selectionQuotas: {
        documentQuota,
        isDocumentPassAll: documentQuota.includes('적부'),
        writtenQuota,
        interviewQuota: '최종 1배수',
      },
      coverLetterQuestions: [
        {
          number: 1,
          title: `${organization} 지원 동기 및 해당 직무 수행을 위해 준비한 역량을 기술해 주십시오.`,
          maxChars: 800,
        },
        {
          number: 2,
          title: '직무 관련 실험·실습, 연구 또는 프로젝트 수행 경험을 구체적으로 작성해 주십시오.',
          maxChars: 1000,
        },
      ],
      summary: summary || title,
      mainDuties: [summary || '세부 직무기술서 참조'],
      qualifications: ['관련 전공 및 계측기 운용 가능자'],
      preferredCerts: certsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      sourceUrl: 'https://job.alio.go.kr',
      sourcePlatform: '기관공식',
      isMedicalExcluded: classification.isMedicalExcluded,
      excludedReason: classification.excludedReason,
      updatedAt: '방금 추가됨',
    };

    onAddJob(newJob);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
      >
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-extrabold text-slate-900">
              새 채용공고 등록 & 자동 키워드 분류기
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700">
                실시간 도메인 분류 엔진 판별 결과
              </span>
              {classification.isMedicalExcluded ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                  <AlertTriangle className="w-3.5 h-3.5" /> 의료분야 자동제외 감지됨
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 수집 대상 적합
                </span>
              )}
            </div>

            {classification.isMedicalExcluded && (
              <p className="text-xs text-rose-600 font-medium">{classification.excludedReason}</p>
            )}

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-400">자동 매칭 직무:</span>
              {classification.categories.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  제목이나 요약에 EMC, 전장, MIL-STD, RF, KOLAS, 교정, 전기, 기계, 보안 등의 키워드를 입력해 보세요.
                </span>
              ) : (
                classification.categories.map((catId) => {
                  const rule = getCategoryRule(catId);
                  return (
                    <span
                      key={catId}
                      className={`px-2 py-0.5 rounded-md text-xs font-bold border ${rule?.badgeColor}`}
                    >
                      {rule?.name}
                    </span>
                  );
                })
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">기관명</label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">기관 약칭</label>
              <input
                type="text"
                required
                value={orgShortName}
                onChange={(e) => setOrgShortName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              공고 제목 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="예: 국방 MIL-STD-461 EMC 시험 및 KOLAS 고주파 계측기 교정원 채용"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              직무 요약 및 수행업무
            </label>
            <textarea
              rows={2}
              placeholder="예: 자동차 전장부품 CISPR 25 시험평가, RF 스펙트럼 분석기 교정 및 측정불확도 산출"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">지역 분류</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              >
                {REGIONS.filter((r) => r !== '전체 지역').map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">서류 선발배수</label>
              <input
                type="text"
                value={documentQuota}
                onChange={(e) => setDocumentQuota(e.target.value)}
                placeholder="예: 서류 적부 또는 서류 5배수"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">필기 선발배수</label>
              <input
                type="text"
                value={writtenQuota}
                onChange={(e) => setWrittenQuota(e.target.value)}
                placeholder="예: 필기 3배수 또는 무필기"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">고용형태</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              >
                {EMPLOYMENT_TYPES.filter((t) => t !== '전체 고용형태').map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">서류 마감일</label>
              <input
                type="date"
                required
                value={applicationEnd}
                onChange={(e) => setApplicationEnd(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">필기시험일 (선택)</label>
              <input
                type="date"
                value={writtenDate}
                onChange={(e) => setWrittenDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                우대 자격증 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={certsInput}
                onChange={(e) => setCertsInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">채용 인원</label>
              <input
                type="text"
                value={headcount}
                onChange={(e) => setHeadcount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>공고 등록하기</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
