import React, { useState, useEffect } from 'react';
import { JobPosting } from '../types/job';
import { getCategoryRule } from '../config/categories';
import { calculateDDay, formatFullDateWithDay } from '../utils/dateUtils';
import {
  X,
  Bookmark,
  ExternalLink,
  MapPin,
  Users,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Award,
  BookOpen,
  Calendar,
  FileEdit,
  Copy,
  Check,
  Layers,
  Sparkles,
  Trash2,
} from 'lucide-react';

interface JobDetailModalProps {
  job: JobPosting | null;
  initialTab?: 'detail' | 'cover_letter';
  isBookmarked: boolean;
  myCerts: string[];
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

const COVER_LETTER_STORAGE_KEY = 'techjob_alio_cover_letters_v1';

/**
 * EUC-KR 기준 바이트 계산 (한글 2Byte, 영문/숫자/공백 1Byte)
 */
function calcEucKrBytes(text: string): number {
  let bytes = 0;
  for (let i = 0; i < text.length; i++) {
    bytes += text.charCodeAt(i) > 127 ? 2 : 1;
  }
  return bytes;
}

/**
 * UTF-8 기준 바이트 계산 (한글 3Byte, 영문/숫자/공백 1Byte)
 */
function calcUtf8Bytes(text: string): number {
  return new TextEncoder().encode(text).length;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  initialTab = 'detail',
  isBookmarked,
  myCerts,
  onClose,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'detail' | 'cover_letter'>(initialTab);
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(COVER_LETTER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, job?.id]);

  useEffect(() => {
    try {
      localStorage.setItem(COVER_LETTER_STORAGE_KEY, JSON.stringify(drafts));
    } catch {
      // ignore storage errors
    }
  }, [drafts]);

  if (!job) return null;

  const dday = calculateDDay(job.applicationEnd, job.applicationStart);
  const questions = job.coverLetterQuestions || [];

  const handleDraftChange = (qNum: number, value: string) => {
    const key = `${job.id}_q${qNum}`;
    setDrafts((prev) => ({ ...prev, [key]: value }));
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const handleCopyAll = () => {
    const allText = questions
      .map((q) => {
        const key = `${job.id}_q${q.number}`;
        const ans = drafts[key] || '';
        return `[문항 ${q.number}] ${q.title}\n(${ans.length}/${q.maxChars}자)\n\n${ans}`;
      })
      .join('\n\n----------------------------------------\n\n');

    handleCopyText('all', allText);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
      >
        {/* 모달 상단 헤더 */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                  {job.organization}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                  {job.orgType}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs border ${dday.badgeClass}`}>
                  {dday.label}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {job.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 상단 탭 전환 바 (직무 상세 vs 자소서 문항 & 글자수 계산기) */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab('detail')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                activeTab === 'detail'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>전형 일정 · 선발배수 · 직무 상세</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('cover_letter')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                activeTab === 'cover_letter'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>자소서 문항 & 실시간 글자수 계산기</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                  activeTab === 'cover_letter'
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-200/70 text-blue-900'
                }`}
              >
                {questions.length}문항
              </span>
            </button>
          </div>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 space-y-6">
          {activeTab === 'detail' ? (
            <>
              {/* 직무 카테고리 및 세부 태그 */}
              <div className="flex flex-wrap items-center gap-1.5">
                {job.categories.map((catId) => {
                  const rule = getCategoryRule(catId);
                  if (!rule) return null;
                  return (
                    <span
                      key={catId}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${rule.badgeColor}`}
                    >
                      {rule.name}
                    </span>
                  );
                })}
                {job.subDomainTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* [옵션 A] 공식 전형 단계별 선발 배수 요약 카드 */}
              {job.selectionQuotas && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-blue-50/50 to-emerald-50/60 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">
                        공고문 공식 전형 단계별 선발 배수
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {job.selectionQuotas.isDocumentPassAll
                          ? '이 공고는 서류 적부(적격/부적격) 전형으로 지원 자격 충족 시 필기 응시 기회가 부여됩니다.'
                          : '서류 배수 선발 후 필기 및 면접 전형이 진행됩니다.'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border ${
                        job.selectionQuotas.isDocumentPassAll
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-slate-800 border-slate-300'
                      }`}
                    >
                      1차: {job.selectionQuotas.documentQuota}
                    </span>
                    <span className="text-slate-400 font-bold">→</span>
                    <span className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-white text-purple-700 border border-purple-200">
                      2차: {job.selectionQuotas.writtenQuota}
                    </span>
                    {job.selectionQuotas.interviewQuota && (
                      <>
                        <span className="text-slate-400 font-bold">→</span>
                        <span className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-white text-blue-700 border border-blue-200">
                          3차: {job.selectionQuotas.interviewQuota}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* 핵심 채용 조건 요약 그리드 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <Briefcase className="w-3.5 h-3.5" /> 고용형태 / 경력
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    {job.employmentType} ({job.experienceLevel})
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <MapPin className="w-3.5 h-3.5" /> 근무지역
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    {job.detailLocation}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <Users className="w-3.5 h-3.5" /> 채용인원
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">{job.headcount}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <GraduationCap className="w-3.5 h-3.5" /> 학력요건
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    {job.educationRequired}
                  </div>
                </div>
              </div>

              {/* 전형 일정 스텝 타임라인 */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  전형 단계별 상세 일정
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {job.schedules.map((sch, idx) => (
                    <div
                      key={`${sch.stage}-${idx}`}
                      className="p-3 rounded-xl border border-slate-200 bg-white flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600">{sch.label}</span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          STEP {idx + 1}
                        </span>
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        {formatFullDateWithDay(sch.date)}
                      </div>
                      {sch.note && (
                        <div className="text-[11px] text-rose-600 font-semibold mt-0.5">
                          {sch.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 직무 요약 및 주요 수행 업무 */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2">직무 핵심 요약</h3>
                  <p className="text-sm text-slate-700 bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 leading-relaxed">
                    {job.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2">주요 수행 업무</h3>
                  <ul className="space-y-2">
                    {job.mainDuties.map((duty, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2">지원 자격 및 우대요건</h3>
                  <ul className="space-y-2">
                    {job.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 우대 자격증 (내 보유 자격증 매칭 하이라이트) & 필기 과목 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100">
                  <h4 className="text-xs font-extrabold text-indigo-900 flex items-center gap-1.5 mb-2.5">
                    <Award className="w-4 h-4 text-indigo-600" />
                    우대 자격증 및 교육 (내 자격증 자동 대조)
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {job.preferredCerts.map((cert) => {
                      const isMatched = myCerts.some(
                        (my) =>
                          cert.toLowerCase().includes(my.toLowerCase()) ||
                          my.toLowerCase().includes(cert.toLowerCase())
                      );
                      return (
                        <span
                          key={cert}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            isMatched
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-white border-indigo-200 text-indigo-700'
                          }`}
                        >
                          {isMatched ? `🎯 ${cert} (보유 매칭)` : cert}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {job.ncsSubjects && job.ncsSubjects.length > 0 && (
                  <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100">
                    <h4 className="text-xs font-extrabold text-purple-900 flex items-center gap-1.5 mb-2.5">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      필기 / 전형 평가 과목
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.ncsSubjects.map((subj) => (
                        <span
                          key={subj}
                          className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-700 text-xs font-semibold"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* [탭 2] 자기소개서 문항 & 실시간 글자수/바이트 계산기 */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    자기소개서 문항 미리보기 & 실시간 글자수·바이트(Byte) 계산기
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    작성하시는 내용은 내 브라우저에 <strong>자동 임시저장</strong>되어 창을 닫아도 사라지지 않습니다.
                  </p>
                </div>

                {questions.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCopyAll}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 shadow-sm"
                  >
                    {copiedKey === 'all' ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> 전체 복사 완료!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> 전 문항 한 번에 복사
                      </>
                    )}
                  </button>
                )}
              </div>

              {questions.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500">
                  등록된 자기소개서 문항이 없습니다.
                </div>
              ) : (
                <div className="space-y-6">
                  {questions.map((q) => {
                    const key = `${job.id}_q${q.number}`;
                    const text = drafts[key] || '';
                    const charCountWithSpaces = text.length;
                    const charCountWithoutSpaces = text.replace(/\s+/g, '').length;
                    const eucKrBytes = calcEucKrBytes(text);
                    const utf8Bytes = calcUtf8Bytes(text);
                    const isOverLimit = charCountWithSpaces > q.maxChars;
                    const progressPercent = Math.min(
                      100,
                      Math.round((charCountWithSpaces / q.maxChars) * 100)
                    );

                    return (
                      <div
                        key={q.number}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-900 text-white text-xs font-extrabold">
                              문항 {q.number} (최대 {q.maxChars.toLocaleString()}자)
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug pt-1">
                              {q.title}
                            </h4>
                          </div>
                        </div>

                        {q.hint && (
                          <div className="px-3 py-2 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs">
                            <strong>💡 직무 작성 팁:</strong> {q.hint}
                          </div>
                        )}

                        <textarea
                          rows={6}
                          value={text}
                          onChange={(e) => handleDraftChange(q.number, e.target.value)}
                          placeholder={`문항 ${q.number}에 대한 답변을 이곳에 작성해 보세요. (자동 저장됨)`}
                          className={`w-full p-3.5 rounded-xl border text-sm leading-relaxed focus:outline-none transition-colors bg-white ${
                            isOverLimit
                              ? 'border-rose-400 focus:border-rose-600 ring-2 ring-rose-500/10'
                              : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                          }`}
                        />

                        {/* 프로그레스 바 */}
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              isOverLimit
                                ? 'bg-rose-600'
                                : progressPercent >= 85
                                ? 'bg-emerald-500'
                                : 'bg-blue-600'
                            }`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>

                        {/* 실시간 글자수 & 바이트 계산기 상태바 */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                          <div className="flex flex-wrap items-center gap-3 text-slate-600">
                            <span>
                              공백 포함:{' '}
                              <strong
                                className={`text-sm font-extrabold ${
                                  isOverLimit ? 'text-rose-600' : 'text-blue-600'
                                }`}
                              >
                                {charCountWithSpaces.toLocaleString()}
                              </strong>{' '}
                              / {q.maxChars.toLocaleString()}자
                              {isOverLimit && (
                                <span className="ml-1 text-rose-600 font-bold">
                                  (제한 글자수 초과!)
                                </span>
                              )}
                            </span>
                            <span className="text-slate-300">|</span>
                            <span>
                              공백 제외:{' '}
                              <strong className="font-bold text-slate-800">
                                {charCountWithoutSpaces.toLocaleString()}
                              </strong>
                              자
                            </span>
                            <span className="text-slate-300">|</span>
                            <span>
                              바이트(한글 2B):{' '}
                              <strong className="font-bold text-slate-800">
                                {eucKrBytes.toLocaleString()}
                              </strong>{' '}
                              Byte
                            </span>
                            <span className="text-slate-300">|</span>
                            <span>
                              바이트(한글 3B):{' '}
                              <strong className="font-bold text-slate-800">
                                {utf8Bytes.toLocaleString()}
                              </strong>{' '}
                              Byte
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {text.length > 0 && (
                              <button
                                type="button"
                                onClick={() => handleDraftChange(q.number, '')}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-slate-500 hover:bg-slate-200/70"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> 비우기
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleCopyText(key, text)}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
                            >
                              {copiedKey === key ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" /> 복사됨
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" /> 문항 답변 복사
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 모달 하단 액션 푸터 */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-3">
          <button
            onClick={(e) => onToggleBookmark(job.id, e)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
            />
            <span>{isBookmarked ? '관심 공고 찜 완료' : '관심 공고 찜하기'}</span>
          </button>

          <a
            href={job.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all"
          >
            <span>잡알리오 / 기관 원문 공고 이동</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
