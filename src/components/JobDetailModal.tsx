import React from 'react';
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
} from 'lucide-react';

interface JobDetailModalProps {
  job: JobPosting | null;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isBookmarked,
  onClose,
  onToggleBookmark,
}) => {
  if (!job) return null;

  const dday = calculateDDay(job.applicationEnd, job.applicationStart);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
      >
        {/* 모달 상단 헤더 */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
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

        {/* 모달 본문 */}
        <div className="p-6 space-y-6">
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
                    <span className="text-[11px] font-semibold text-slate-400">STEP {idx + 1}</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1">
                    {formatFullDateWithDay(sch.date)}
                  </div>
                  {sch.note && (
                    <div className="text-[11px] text-rose-600 font-semibold mt-0.5">{sch.note}</div>
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

          {/* 우대 자격증 & 필기 과목 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100">
              <h4 className="text-xs font-extrabold text-indigo-900 flex items-center gap-1.5 mb-2.5">
                <Award className="w-4 h-4 text-indigo-600" />
                우대 자격증 및 교육
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.preferredCerts.map((cert) => (
                  <span
                    key={cert}
                    className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 text-xs font-semibold"
                  >
                    {cert}
                  </span>
                ))}
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
        </div>

        {/* 모달 하단 액션 푸터 */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-3">
          <button
            onClick={(e) => onToggleBookmark(job.id, e)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
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
