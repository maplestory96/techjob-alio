import React, { useState } from 'react';
import { COMMON_CERTIFICATES, KEYWORD_RECIPE_PRESETS } from '../config/categories';
import { JobCategoryId } from '../types/job';
import {
  SlidersHorizontal,
  Award,
  Plus,
  X,
  CheckCircle2,
  FilterX,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SmartRecipePanelProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  includeKeywords: string[];
  excludeKeywords: string[];
  onChangeKeywords: (inc: string[], exc: string[], category?: JobCategoryId) => void;
  myCerts: string[];
  onToggleMyCert: (cert: string) => void;
  excludedJobCount: number;
  matchedCertJobCount: number;
  matchedCertsOnly: boolean;
  onToggleMatchedCertsOnly: () => void;
}

export const SmartRecipePanel: React.FC<SmartRecipePanelProps> = ({
  isOpen,
  onToggleOpen,
  includeKeywords,
  excludeKeywords,
  onChangeKeywords,
  myCerts,
  onToggleMyCert,
  excludedJobCount,
  matchedCertJobCount,
  matchedCertsOnly,
  onToggleMatchedCertsOnly,
}) => {
  const [incInput, setIncInput] = useState('');
  const [excInput, setExcInput] = useState('');
  const [customCertInput, setCustomCertInput] = useState('');

  const handleAddInclude = (e: React.FormEvent) => {
    e.preventDefault();
    const val = incInput.trim();
    if (!val) return;
    if (!includeKeywords.includes(val)) {
      onChangeKeywords([...includeKeywords, val], excludeKeywords);
    }
    setIncInput('');
  };

  const handleAddExclude = (e: React.FormEvent) => {
    e.preventDefault();
    const val = excInput.trim();
    if (!val) return;
    if (!excludeKeywords.includes(val)) {
      onChangeKeywords(includeKeywords, [...excludeKeywords, val]);
    }
    setExcInput('');
  };

  const handleRemoveInclude = (kw: string) => {
    onChangeKeywords(
      includeKeywords.filter((k) => k !== kw),
      excludeKeywords
    );
  };

  const handleRemoveExclude = (kw: string) => {
    onChangeKeywords(
      includeKeywords,
      excludeKeywords.filter((k) => k !== kw)
    );
  };

  const handleAddCustomCert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = customCertInput.trim();
    if (!val) return;
    if (!myCerts.includes(val)) {
      onToggleMyCert(val);
    }
    setCustomCertInput('');
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-1.5 pb-1">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* 상단 요약 헤더 바 (접기/펼치기 가능) */}
        <div
          onClick={onToggleOpen}
          className="px-3.5 sm:px-5 py-3 bg-gradient-to-r from-slate-50 via-blue-50/40 to-indigo-50/40 flex items-center justify-between gap-2 cursor-pointer select-none"
        >
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-blue-600 shrink-0" />
              <span>맞춤 키워드 레시피 & 내 자격증 매칭</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-100 text-emerald-800">
              +포함 {includeKeywords.length === 0 ? '전체' : `${includeKeywords.length}개`}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-rose-100 text-rose-700">
              -제외 {excludeKeywords.length}개 ({excludedJobCount}건 차단)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-indigo-100 text-indigo-700">
              🎯 자격증 {myCerts.length}개 ({matchedCertJobCount}건 매칭)
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 shrink-0"
          >
            <span className="hidden sm:inline">{isOpen ? '설정 접기' : '맞춤 설정 열기'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isOpen && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* 좌측 7열: [+포함 / -제외 키워드] 레시피 빌더 */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>1. 원클릭 직군·키워드 레시피 프리셋</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {KEYWORD_RECIPE_PRESETS.map((preset) => {
                    const isSameInc =
                      preset.includeKeywords.length === includeKeywords.length &&
                      preset.includeKeywords.every((k) => includeKeywords.includes(k));
                    const isSameExc =
                      preset.excludeKeywords.length === excludeKeywords.length &&
                      preset.excludeKeywords.every((k) => excludeKeywords.includes(k));
                    const active = isSameInc && isSameExc;

                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() =>
                          onChangeKeywords(
                            preset.includeKeywords,
                            preset.excludeKeywords,
                            preset.category
                          )
                        }
                        title={preset.description}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          active
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {preset.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* +포함 키워드 설정 행 */}
              <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>+포함 키워드 (비워두면 모든 공고 허용)</span>
                  </span>
                  <form onSubmit={handleAddInclude} className="flex items-center gap-1 w-full sm:w-auto">
                    <input
                      type="text"
                      value={incInput}
                      onChange={(e) => setIncInput(e.target.value)}
                      placeholder="예: 행정, 기계, EMC, KOLAS..."
                      className="flex-1 sm:w-44 px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 inline-flex items-center gap-0.5 shrink-0"
                    >
                      <Plus className="w-3 h-3" /> 추가
                    </button>
                  </form>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {includeKeywords.length === 0 ? (
                    <span className="text-[11px] text-slate-500">
                      현재 모든 직무 키워드가 허용되어 있습니다. 특정 단어만 보려면 위에서 추가해 보세요.
                    </span>
                  ) : (
                    includeKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold"
                      >
                        +{kw}
                        <button
                          type="button"
                          onClick={() => handleRemoveInclude(kw)}
                          className="hover:text-emerald-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* -제외 키워드 설정 행 */}
              <div className="p-3 rounded-xl bg-rose-50/40 border border-rose-100 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-rose-900 flex items-center gap-1">
                    <FilterX className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>-제외 키워드 (해당 단어 포함 시 자동 숨김)</span>
                  </span>
                  <form onSubmit={handleAddExclude} className="flex items-center gap-1 w-full sm:w-auto">
                    <input
                      type="text"
                      value={excInput}
                      onChange={(e) => setExcInput(e.target.value)}
                      placeholder="예: 의료기기, 임상, 미화..."
                      className="flex-1 sm:w-44 px-2.5 py-1.5 rounded-lg border border-rose-200 bg-white text-xs focus:outline-none focus:border-rose-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 inline-flex items-center gap-0.5 shrink-0"
                    >
                      <Plus className="w-3 h-3" /> 제외
                    </button>
                  </form>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {excludeKeywords.length === 0 ? (
                    <span className="text-[11px] text-slate-500">
                      현재 제외된 키워드가 없습니다.
                    </span>
                  ) : (
                    excludeKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold"
                      >
                        -{kw}
                        <button
                          type="button"
                          onClick={() => handleRemoveExclude(kw)}
                          className="hover:text-rose-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 우측 5열: 내 보유 자격증 자동 우대 매칭 시뮬레이터 */}
            <div className="lg:col-span-5 pt-4 lg:pt-0 lg:pl-5 flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-indigo-600" />
                    <span>2. 내 보유 자격증 체크 (우대 자동 매칭)</span>
                  </span>

                  <button
                    type="button"
                    onClick={onToggleMatchedCertsOnly}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                      matchedCertsOnly
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                    }`}
                  >
                    {matchedCertsOnly ? '✓ 매칭 공고만 ON' : '매칭 공고만 보기'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set([...COMMON_CERTIFICATES, ...myCerts])).map((cert) => {
                    const active = myCerts.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => onToggleMyCert(cert)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          active
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {active ? `✓ ${cert}` : cert}
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleAddCustomCert} className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  value={customCertInput}
                  onChange={(e) => setCustomCertInput(e.target.value)}
                  placeholder="보유 자격증 직접 입력 (예: 회계사, 가스기사)..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 shrink-0"
                >
                  + 추가
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
