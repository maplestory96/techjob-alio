import React from 'react';
import { X, Terminal, Cloud, Layers, CheckCircle2, RefreshCw } from 'lucide-react';

interface CrawlerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReloadJson: () => void;
}

export const CrawlerGuideModal: React.FC<CrawlerGuideModalProps> = ({
  isOpen,
  onClose,
  onReloadJson,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
      >
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                비용 0원 실시간 수집 & 무서버 확장 아키텍처
              </h2>
              <p className="text-xs text-slate-500">
                로컬 크롤러 스크립트부터 무료 클라우드 자동화까지 프로젝트에 모두 내장되어 있습니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-slate-700">
          {/* 1. 로컬에서 즉시 수집하기 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                1단계: 내 PC(로컬)에서 최신 공고 무료 크롤링 실행
              </h3>
              <button
                onClick={onReloadJson}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>jobs.json 다시 불러오기</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              프로젝트 내 <code className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">scripts/crawler.py</code>에
              공공데이터포털(기획재정부 조달/알리오 채용정보 API) 및 잡알리오 웹 파서가 구현되어 있습니다.
              터미널에서 아래 명령어를 실행하면 <code className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">public/data/jobs.json</code>이 즉시 갱신됩니다.
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs overflow-x-auto">
              <div># 터미널에서 크롤러 실행 (비용 0원)</div>
              <div className="text-emerald-400 mt-1">npm run crawl</div>
              <div className="text-slate-400 mt-1"># 또는 직접 실행: python scripts/crawler.py</div>
            </div>
          </div>

          {/* 2. 무료 서버리스 자동화 */}
          <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-2.5">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-600" />
              2단계: PC를 꺼두어도 6시간마다 자동 업데이트 (평생 0원)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              유료 클라우드 서버를 임대할 필요 없이, 프로젝트에 포함된{' '}
              <code className="px-1.5 py-0.5 rounded bg-white border border-blue-200 text-blue-800">
                .github/workflows/update-jobs.yml
              </code>
              을 GitHub 저장소에 푸시하면 <strong>GitHub Actions</strong>가 매일 정해진 시간에 무료로 크롤러를 돌려 최신 공고를 업데이트하고, <strong>Vercel / GitHub Pages</strong>가 무료로 사이트를 배포합니다.
            </p>
            <ul className="space-y-1 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>API/크롤링 비용: 0원 (공공데이터포털 무료 오픈API + 잡알리오)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>스케줄러/서버 비용: 0원 (GitHub Actions 무료 티어)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>데이터베이스 확장: 추후 공고가 수만 건으로 늘어나면 무료 Supabase(PostgreSQL)로 즉시 전환 가능</span>
              </li>
            </ul>
          </div>

          {/* 3. 타 직무 확장성 */}
          <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              3단계: 다른 직무 분야(기계, 화학, IT, 행정 등)로 확장하는 방법
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              이 사이트는 <strong>룰셋 기반 아키텍처(Rule-Driven Architecture)</strong>로 설계되었습니다.{' '}
              <code className="px-1.5 py-0.5 rounded bg-white border border-emerald-200 text-emerald-800">
                src/config/categories.ts
              </code>{' '}
              파일에 새로운 직무 ID와 포함/제외 키워드만 한 줄 추가하면 상단 대시보드, 필터 탭, 카드 배지, 분류기가 코드 수정 없이 자동으로 확장됩니다.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
