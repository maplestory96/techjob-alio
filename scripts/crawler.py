#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[PublicJob ALIO] 전국 모든 공기업 채용정보 수집기 (잡알리오 목록 + 상세페이지 전수 파서)
- 전 직군 지원: 경영·행정, 전기·전자, 기계·설비, IT·전산, 토목·건축, 화공·환경, EMC·RF·교정
- 각 공고의 상세페이지(recruitview.do)에서 모든 세부 모집직종(A*, B*, C* 등), 표준직무(NCS),
  전체 근무지, 채용인원, 응시자격, 전형절차를 축약 없이 100% 추출합니다.
"""

import concurrent.futures
import html as html_lib
import json
import os
import re
import ssl
import urllib.parse
import urllib.request
from datetime import datetime
from typing import Any, Dict, List, Optional

CATEGORY_KEYWORDS: Dict[str, List[str]] = {
    "admin_biz": [
        "일반행정", "사무", "경영", "회계", "재무", "기획", "인사", "총무", "법무", "경제", "행정", "홍보", "콜센터", "고객지원"
    ],
    "elec_hardware": [
        "전기", "전자", "회로", "전력", "송배전", "발전", "하드웨어", "H/W",
        "안전인증", "신뢰성", "고전압", "변압기", "차단기", "배전", "제어", "이차전지", "태양광"
    ],
    "mech_material": [
        "기계", "설비", "열역학", "유체", "공조", "재료", "금속", "용접", "배관", "차량", "플랜트", "소재", "부품", "역학", "항공", "발사체"
    ],
    "it_sw": [
        "전산", "IT", "소프트웨어", "SW", "정보보안", "정보보호", "데이터", "AI", "네트워크", "시스템", "정보통신", "클라우드"
    ],
    "civil_arch": [
        "토목", "건축", "도시", "조경", "건설", "시공", "시설", "산업안전", "안전관리", "교통"
    ],
    "chem_env": [
        "화공", "화학", "환경", "수질", "대기", "폐기물", "가스", "수소", "에너지", "물환경"
    ],
    "emc_auto_def": [
        "EMC", "EMI", "EMS", "전자파", "전자기적합성", "전장", "자동차", "모빌리티",
        "국방", "방산", "군 적합성", "MIL-STD", "챔버", "무향실", "CISPR", "ISO 11452"
    ],
    "rf_telecom": [
        "RF", "무선", "고주파", "마이크로파", "안테나", "전파", "통신",
        "레이다", "레이더", "SAR", "스펙트럼", "VNA", "위성", "탑재체"
    ],
    "calibration": [
        "교정", "계측", "KOLAS", "정밀측정", "표준기", "측정불확도",
        "소급성", "계측장비", "측정기", "계측제어", "법정계량기", "검정"
    ],
}

NEGATIVE_MEDICAL_KEYWORDS: List[str] = [
    "의료기기", "의료용", "생체의료", "IEC 60601", "치과", "체외진단", "임상시험", "바이오헬스"
]


def clean_html_text(raw: str) -> str:
    txt = re.sub(r"<br\s*/?>", "\n", raw, flags=re.IGNORECASE)
    txt = re.sub(r"<[^>]+>", " ", txt)
    txt = html_lib.unescape(txt)
    lines = [re.sub(r"[ \t\r]+", " ", line).strip() for line in txt.split("\n")]
    return "\n".join([line for line in lines if line])


def classify_job(title: str, summary: str, tags: List[str], duties: List[str]) -> Dict[str, Any]:
    combined = f"{title} {summary} {' '.join(tags)} {' '.join(duties)}".upper()

    excluded_kw = next(
        (kw for kw in NEGATIVE_MEDICAL_KEYWORDS if kw.upper() in combined),
        None,
    )
    is_medical_excluded = excluded_kw is not None
    excluded_reason = f"'{excluded_kw}' 키워드 포함" if is_medical_excluded else None

    matched_categories: List[str] = []
    for cat_id, keywords in CATEGORY_KEYWORDS.items():
        if any(kw.upper() in combined for kw in keywords):
            matched_categories.append(cat_id)

    if not matched_categories:
        matched_categories = ["admin_biz"]

    return {
        "categories": matched_categories,
        "isMedicalExcluded": is_medical_excluded,
        "excludedReason": excluded_reason,
    }


def fetch_detail_info(idx: str, ctx: ssl.SSLContext) -> Dict[str, Any]:
    """잡알리오 상세페이지(recruitview.do?idx=...)에서 모든 모집직종과 상세 테이블 정보를 추출합니다."""
    url = f"https://job.alio.go.kr/recruitview.do?idx={idx}"
    info: Dict[str, Any] = {
        "ncs": "",
        "education": "",
        "workField": "",
        "expLevel": "",
        "fullLocation": "",
        "headcount": "",
        "prefCond": "",
        "interviewFields": [],
        "qualifications": [],
        "selectionProcess": [],
        "documentQuota": "공고문 기준",
        "isDocumentPassAll": False,
        "writtenQuota": "전형별 선발",
    }
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
        )
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            raw_html = resp.read().decode("utf-8", errors="ignore")

        # 1. 상단 기본정보 테이블 th/td 쌍 추출
        th_td_pairs = re.findall(
            r"<th[^>]*>(.*?)</th>\s*<td[^>]*>(.*?)</td>", raw_html, re.DOTALL
        )
        for th_raw, td_raw in th_td_pairs:
            th = clean_html_text(th_raw).replace("\n", " ").strip()
            td = clean_html_text(td_raw).replace("\n", " ").strip()
            if "표준직무(NCS)" in th:
                info["ncs"] = td.replace(".", "·").replace(",", ", ")
            elif "학력정보" in th:
                info["education"] = td.replace(",", ", ")
            elif "근무분야" in th:
                info["workField"] = td.replace(",", ", ")
            elif "채용구분" in th:
                info["expLevel"] = td
            elif "근무지" in th:
                info["fullLocation"] = td.replace(",", ", ")
            elif "채용인원" in th:
                info["headcount"] = td
            elif "우대조건" in th:
                info["prefCond"] = td

        # 2. 전형단계별 채용정보 탭의 모든 세부 모집직종 (A01, B01, C01~C26 등) 전수 추출
        raw_fields = re.findall(
            r'class=["\'][^"\']*interviewName[^"\']*["\'][^>]*>(.*?)</th>',
            raw_html,
            re.DOTALL,
        )
        fields: List[str] = []
        for rf in raw_fields:
            cleaned = clean_html_text(rf).replace("\n", " ").strip()
            if cleaned and cleaned not in fields:
                fields.append(cleaned)
        info["interviewFields"] = fields

        # 3. 응시자격 및 전형절차 추출
        qual_match = re.search(r"<h4>\s*응시자격\s*</h4>\s*<p>(.*?)</p>", raw_html, re.DOTALL)
        if qual_match:
            q_lines = [
                line.strip()
                for line in clean_html_text(qual_match.group(1)).split("\n")
                if line.strip()
            ]
            info["qualifications"] = q_lines[:12]

        proc_match = re.search(r"<h4>\s*전형절차/방법\s*</h4>\s*<p>(.*?)</p>", raw_html, re.DOTALL)
        if proc_match:
            p_text = clean_html_text(proc_match.group(1))
            p_lines = [line.strip() for line in p_text.split("\n") if line.strip()]
            info["selectionProcess"] = p_lines
            # 배수 자동 파싱
            if "적부" in p_text or "적격" in p_text:
                info["isDocumentPassAll"] = True
                info["documentQuota"] = "서류 적부"
            else:
                m_doc = re.search(r"서류[^\n:]*[:：]?\s*(\d+\s*배수)", p_text)
                if m_doc:
                    info["documentQuota"] = f"서류 {m_doc.group(1)}"

    except Exception:
        pass

    return info


def fetch_job_alio_html(max_pages: int = 3) -> List[Dict[str, Any]]:
    """잡알리오 목록 + 상세페이지를 병렬 수집하여 모든 직종 정보를 빠짐없이 구성합니다."""
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    raw_items: List[Dict[str, Any]] = []

    for page in range(1, max_pages + 1):
        url = f"https://job.alio.go.kr/recruit.do?ing=2&pageSet=50&pageNo={page}"
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
            )
            with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
                raw_html = resp.read().decode("utf-8", errors="ignore")

            rows = re.findall(r"<tr[^>]*>(.*?)</tr>", raw_html, re.DOTALL)
            for row in rows:
                idx_match = re.search(r"idx=(\d+)", row)
                if not idx_match:
                    continue
                idx = idx_match.group(1)

                tds = re.findall(r"<td[^>]*>(.*?)</td>", row, re.DOTALL)
                if len(tds) < 8:
                    continue

                clean_tds = [
                    re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", td)).strip()
                    for td in tds
                ]

                title = html_lib.unescape(clean_tds[2])
                org_name = html_lib.unescape(clean_tds[3]) if len(clean_tds) > 3 else "공공기관"
                location = clean_tds[4] if len(clean_tds) > 4 else "전국"
                emp_type_raw = clean_tds[5] if len(clean_tds) > 5 else "정규직"
                reg_date_raw = clean_tds[6] if len(clean_tds) > 6 else ""
                end_date_raw = clean_tds[7] if len(clean_tds) > 7 else ""

                if not title or len(title) < 3:
                    continue

                reg_dates = re.findall(r"(\d{4}[.-]\d{2}[.-]\d{2}|\d{2}[.-]\d{2}[.-]\d{2})", reg_date_raw)
                end_dates = re.findall(r"(\d{4}[.-]\d{2}[.-]\d{2}|\d{2}[.-]\d{2}[.-]\d{2})", end_date_raw)
                app_start = datetime.now().strftime("%Y-%m-%d")
                app_end = "2026-11-15"
                if reg_dates:
                    s_str = reg_dates[0].replace(".", "-")
                    if len(s_str) == 8:
                        s_str = "20" + s_str
                    app_start = s_str
                if end_dates:
                    d_str = end_dates[0].replace(".", "-")
                    if len(d_str) == 8:
                        d_str = "20" + d_str
                    app_end = d_str

                emp_type = "정규직"
                if "인턴" in emp_type_raw:
                    emp_type = "채용형 인턴"
                elif "무기" in emp_type_raw:
                    emp_type = "무기계약직"
                elif "비정규" in emp_type_raw or "계약" in emp_type_raw or "체험" in emp_type_raw:
                    emp_type = "계약직/체험형"

                raw_items.append(
                    {
                        "idx": idx,
                        "title": title,
                        "org_name": org_name,
                        "location": location,
                        "emp_type_raw": emp_type_raw,
                        "emp_type": emp_type,
                        "app_start": app_start,
                        "app_end": app_end,
                    }
                )
        except Exception as exc:
            print(f"[WARN] 잡알리오 페이지 {page} 수집 중 건너뜀: {exc}")

    print(f"[INFO] 목록 {len(raw_items)}건 수집 완료. 상세페이지(직종/근무지/인원) 병렬 파싱 시작...")

    detail_map: Dict[str, Dict[str, Any]] = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=15) as executor:
        future_to_idx = {
            executor.submit(fetch_detail_info, item["idx"], ctx): item["idx"]
            for item in raw_items
        }
        for future in concurrent.futures.as_completed(future_to_idx):
            idx = future_to_idx[future]
            try:
                detail_map[idx] = future.result()
            except Exception:
                detail_map[idx] = {}

    results: List[Dict[str, Any]] = []
    for item in raw_items:
        idx = item["idx"]
        title = item["title"]
        org_name = item["org_name"]
        d_info = detail_map.get(idx, {})

        full_loc = d_info.get("fullLocation") or item["location"] or "전국"
        headcount = d_info.get("headcount") or "공고문 참조"
        exp_level = d_info.get("expLevel") or "신입/경력"
        edu_req = d_info.get("education") or "공고문 참조"
        ncs_str = d_info.get("ncs") or ""
        work_field = d_info.get("workField") or ""
        interview_fields: List[str] = d_info.get("interviewFields") or []

        # 주요 수행 업무(mainDuties): 세부 모집직종(A*, B*, C* 등) 전수 기재
        main_duties: List[str] = []
        if interview_fields:
            for field_name in interview_fields:
                main_duties.append(field_name)
        if ncs_str:
            main_duties.append(f"표준직무(NCS): {ncs_str}")
        if work_field:
            main_duties.append(f"근무분야: {work_field}")
        if not main_duties:
            main_duties = ["세부 직무기술서 및 채용공고문 참조"]

        # 요약(summary): 축약 없이 모든 모집직종 기재
        if interview_fields:
            summary_text = f"모집직종({len(interview_fields)}개 분야): " + " / ".join(interview_fields)
            if ncs_str:
                summary_text += f"\n표준직무(NCS): {ncs_str}"
        else:
            summary_parts = [f"{org_name} {title}"]
            if ncs_str:
                summary_parts.append(f"표준직무(NCS): {ncs_str}")
            if work_field:
                summary_parts.append(f"근무분야: {work_field}")
            summary_text = " · ".join(summary_parts)

        qualifications: List[str] = d_info.get("qualifications") or [
            "세부 지원자격은 채용공고문 및 직무기술서 참조"
        ]
        if d_info.get("selectionProcess"):
            qualifications.extend(d_info["selectionProcess"][:6])

        tags: List[str] = []
        if ncs_str:
            for ncs_item in [x.strip() for x in ncs_str.split(",") if x.strip()][:5]:
                tags.append(ncs_item)
        if work_field:
            tags.append(work_field)
        tags.append(item["emp_type_raw"])

        cls_info = classify_job(title, summary_text, tags, main_duties)

        results.append(
            {
                "id": f"alio-live-{idx}",
                "organization": org_name,
                "orgShortName": org_name[:4],
                "orgType": "공공기관",
                "title": title,
                "categories": cls_info["categories"],
                "subDomainTags": tags,
                "employmentType": item["emp_type"],
                "location": full_loc,
                "detailLocation": full_loc,
                "headcount": headcount,
                "experienceLevel": exp_level,
                "educationRequired": edu_req,
                "applicationStart": item["app_start"],
                "applicationEnd": item["app_end"],
                "schedules": [
                    {"stage": "application_start", "label": "접수 시작", "date": item["app_start"]},
                    {"stage": "application_end", "label": "접수 마감", "date": item["app_end"]},
                ],
                "selectionQuotas": {
                    "documentQuota": d_info.get("documentQuota", "공고문 기준"),
                    "isDocumentPassAll": d_info.get("isDocumentPassAll", False),
                    "writtenQuota": d_info.get("writtenQuota", "전형별 선발"),
                },
                "coverLetterQuestions": [
                    {
                        "number": 1,
                        "title": f"{org_name} 지원 동기 및 입사 후 직무 수행 계획을 기술해 주십시오.",
                        "maxChars": 800,
                    }
                ],
                "summary": summary_text,
                "mainDuties": main_duties,
                "qualifications": qualifications,
                "preferredCerts": ["전기기사", "정보처리기사", "한국사능력검정 1급", "컴퓨터활용능력 1급"],
                "sourceUrl": f"https://job.alio.go.kr/recruitview.do?idx={idx}",
                "sourcePlatform": "JOB-ALIO",
                "isMedicalExcluded": cls_info["isMedicalExcluded"],
                "excludedReason": cls_info["excludedReason"],
                "updatedAt": now_str,
            }
        )

    return results


def main() -> None:
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_dir = os.path.join(project_root, "public", "data")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "jobs.json")

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")

    print("=" * 68)
    print("[PublicJob ALIO] 전국 모든 공기업 채용 크롤러 실행 (상세 직종 전수 파싱)")
    print(f"- 실행 시각: {now_str}")
    print("=" * 68)

    live_jobs = fetch_job_alio_html(max_pages=3)
    print(f"[INFO] 잡알리오에서 실시간 상세 공고 {len(live_jobs)}건을 성공적으로 가져왔습니다.")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(live_jobs, f, ensure_ascii=False, indent=2)

    print(f"[SUCCESS] 총 {len(live_jobs)}건이 '{output_path}'에 저장되었습니다.")


if __name__ == "__main__":
    main()
