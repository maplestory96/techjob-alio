import React from 'react';
import { JobPosting } from '../types/job';
import { getCategoryRule } from '../config/categories';
import { calculateDDay, formatShortDate } from '../utils/dateUtils';
import {
  Bookmark,
  MapPin,
  Users,
  Calendar,
  Award,
  ExternalLink,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

interface JobCardProps {
  job: JobPosting;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectJob: (job: JobPosting) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isBookmarked,
  onToggleBookmark,
  onSelectJob,
}) => {
  const dday = calculateDDay(job.applicationEnd, job.applicationStart);

  // 필기시험 또는 면접 일정 미리보기 추출
  const writtenSchedule = job.schedules.find((s) => s.stage === 'written_test');
  const interviewSchedule = job.schedules.find((s) => s.stage === 'interview');

  return (
    <article
      onClick={() => onSelectJob(job)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between p-5 hover:-translate-y-0.5 ${
        job.isMedicalExcluded
          ? 'border-rose-300 bg-rose-50/20 hover:shadow-md'
          : isBookmarked
          ? 'border-amber-300/90 shadow-sm hover:shadow-xl hover:border-amber-400'
          : 'border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300'
      }`}
    >
      <div>
        {/* 의료 분야 제외 안내 배너 (토글 켜졌을 때만 노출) */}
        {job.isMedicalExcluded && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-rose-100/80 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">[자동 제외 대상]</span> {job.excludedReason}
            </div>
          </div>
        )}

        {/* 상단: 기관 약칭 로고 + 기관명/유형 + D-Day & 북마크 */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center font-extrabold text-xs text-slate-700 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors">
              {job.orgShortName}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 truncate">
                  {job.organization}
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600 shrink-0">
                  {job.orgType}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-semibold text-blue-600">
                  {job.employmentType}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-[11px] text-slate-500">{job.experienceLevel}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`px-2.5 py-1 rounded-full text-xs border whitespace-nowrap ${dday.badgeClass}`}
            >
              {dday.label}
            </span>
            <button
              onClick={(e) => onToggleBookmark(job.id, e)}
              title={isBookmarked ? '찜 해제' : '관심 공고 찜하기'}
              className={`p-1.5 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-200 text-amber-500'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* 직무 카테고리 배지 */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {job.categories.map((catId) => {
            const rule = getCategoryRule(catId);
            if (!rule) return null;
            return (
              <span
                key={catId}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${rule.badgeColor}`}
              >
                {rule.shortName}
              </span>
            );
          })}
        </div>

        {/* 공고 제목 */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
          {job.title}
        </h3>

        {/* 핵심 직무 요약 */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3.5">
          {job.summary}
        </p>

        {/* 세부 기술 도메인 태그 */}
        <div className="flex flex-wrap gap-1 mb-4">
          {job.subDomainTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 하단: 근무지/인원/우대자격증 및 전형 일정 요약 */}
      <div className="pt-3.5 border-t border-slate-100 space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.detailLocation}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-medium text-slate-700">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>채용 {job.headcount}</span>
          </div>
        </div>

        {job.preferredCerts.length > 0 && (
          <div className="flex items-center gap-1.5 text-slate-500 truncate">
            <Award className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">우대: {job.preferredCerts.slice(0, 3).join(', ')}</span>
          </div>
        )}

        {/* 전형 일정 미니 타임라인 */}
        <div className="bg-slate-50 rounded-xl p-2.5 flex items-center justify-between gap-2 border border-slate-100">
          <div className="flex items-center gap-2 text-[11px] text-slate-600 flex-wrap">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              마감 {formatShortDate(job.applicationEnd)}
            </span>
            {writtenSchedule && (
              <>
                <span className="text-slate-300">→</span>
                <span className="text-purple-700 font-medium">
                  필기 {formatShortDate(writtenSchedule.date)}
                </span>
              </>
            )}
            {interviewSchedule && (
              <>
                <span className="text-slate-300">→</span>
                <span className="text-emerald-700 font-medium">
                  면접 {formatShortDate(interviewSchedule.date)}
                </span>
              </>
            )}
          </div>

          <span className="inline-flex items-center text-[11px] font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0">
            상세 <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
