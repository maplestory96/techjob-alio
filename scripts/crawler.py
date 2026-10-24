#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[TechJob ALIO] 전국 모든 공기업 채용정보 수집기 (잡알리오 웹 파서 + 공공데이터 API 통합)
- 전 직군 지원: 경영·행정, 전기·전자, 기계·설비, IT·전산, 토목·건축, 화공·환경, EMC·RF·교정
- 실행 방법: python scripts/crawler.py (또는 npm run crawl)
"""

import json
import os
import re
import ssl
import urllib.parse
import urllib.request
from datetime import datetime
from typing import Any, Dict, List

# 1. 전 공기업 직무 카테고리 키워드 룰셋
CATEGORY_KEYWORDS: Dict[str, List[str]] = {
    "admin_biz": [
        "일반행정", "사무", "경영", "회계", "재무", "기획", "인사", "총무", "법무", "경제", "행정"
    ],
    "elec_hardware": [
        "전기", "전자", "회로", "전력", "송배전", "발전", "하드웨어", "H/W",
        "안전인증", "신뢰성", "고전압", "변압기", "차단기", "배전", "제어"
    ],
    "mech_material": [
        "기계", "설비", "열역학", "유체", "공조", "재료", "금속", "용접", "배관", "차량", "플랜트"
    ],
    "it_sw": [
        "전산", "IT", "소프트웨어", "SW", "정보보안", "정보보호", "데이터", "AI", "네트워크", "시스템"
    ],
    "civil_arch": [
        "토목", "건축", "도시", "조경", "건설", "시공", "시설", "산업안전", "안전관리", "교통"
    ],
    "chem_env": [
        "화공", "화학", "환경", "수질", "대기", "폐기물", "가스", "수소", "에너지"
    ],
    "emc_auto_def": [
        "EMC", "EMI", "EMS", "전자파", "전자기적합성", "전장", "자동차",
        "국방", "방산", "MIL-STD", "챔버", "무향실", "CISPR", "ISO 11452"
    ],
    "rf_telecom": [
        "RF", "무선", "고주파", "마이크로파", "안테나", "전파", "통신",
        "레이다", "레이더", "SAR", "스펙트럼", "VNA", "위성통신"
    ],
    "calibration": [
        "교정", "계측", "KOLAS", "정밀측정", "표준기", "측정불확도",
        "소급성", "계측장비", "측정기", "계측제어"
    ],
}

NEGATIVE_MEDICAL_KEYWORDS: List[str] = [
    "의료기기", "의료용", "생체의료", "IEC 60601", "치과", "체외진단", "임상시험", "바이오헬스"
]


def classify_job(title: str, summary: str, tags: List[str]) -> Dict[str, Any]:
    """공고 텍스트를 분석하여 9대 직무 카테고리 매칭 및 의료 키워드 여부를 판별합니다."""
    combined = f"{title} {summary} {' '.join(tags)}".upper()

    excluded_kw = next(
        (kw for kw in NEGATIVE_MEDICAL_KEYWORDS if kw.upper() in combined),
        None,
    )
    is_medical_excluded = excluded_kw is not None
    excluded_reason = (
        f"'{excluded_kw}' 키워드 포함"
        if is_medical_excluded
        else None
    )

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


def fetch_job_alio_html(max_pages: int = 3) -> List[Dict[str, Any]]:
    """
    잡알리오(job.alio.go.kr) 채용공고 게시판에서 실시간 진행 중인 전체 공공기관 공고를 파싱합니다.
    (비용 0원, API 키 불필요)
    """
    results: List[Dict[str, Any]] = []
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")

    for page in range(1, max_pages + 1):
        url = f"https://job.alio.go.kr/recruit.do?ing=2&pageSet=50&pageNo={page}"
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                },
            )
            with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
                raw_html = resp.read().decode("utf-8", errors="ignore")

            # 잡알리오 목록 테이블 행(tr) 파싱 (td[0]=체크박스, td[1]=번호, td[2]=채용제목, td[3]=기관명, td[4]=근무지, td[5]=고용형태, td[6]=등록일, td[7]=마감일, td[8]=상태)
            rows = re.findall(r"<tr[^>]*>(.*?)</tr>", raw_html, re.DOTALL)
            for row in rows:
                idx_match = re.search(r"idx=(\d+)", row)
                if not idx_match:
                    continue
                idx = idx_match.group(1)

                # 텍스트 셀 추출
                tds = re.findall(r"<td[^>]*>(.*?)</td>", row, re.DOTALL)
                if len(tds) < 8:
                    continue

                clean_tds = [
                    re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", td)).strip()
                    for td in tds
                ]

                title = clean_tds[2].replace("&#039;", "'").replace("&quot;", '"').replace("&amp;", "&")
                org_name = clean_tds[3] if len(clean_tds) > 3 else "공공기관"
                location = clean_tds[4] if len(clean_tds) > 4 else "전국"
                emp_type_raw = clean_tds[5] if len(clean_tds) > 5 else "정규직"
                reg_date_raw = clean_tds[6] if len(clean_tds) > 6 else ""
                end_date_raw = clean_tds[7] if len(clean_tds) > 7 else ""

                if not title or len(title) < 3:
                    continue

                # 등록일 및 마감일 파싱 (YYYY.MM.DD 또는 YY.MM.DD 형태)
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

                cls_info = classify_job(title, org_name, [emp_type_raw, location])

                results.append(
                    {
                        "id": f"alio-live-{idx}",
                        "organization": org_name,
                        "orgShortName": org_name[:4],
                        "orgType": "공기업",
                        "title": title,
                        "categories": cls_info["categories"],
                        "subDomainTags": [emp_type_raw, location, "잡알리오 실시간"],
                        "employmentType": emp_type,
                        "location": location if location else "전국",
                        "detailLocation": location if location else "전국",
                        "headcount": "공고문 참조",
                        "experienceLevel": "신입/경력",
                        "educationRequired": "공고문 참조",
                        "applicationStart": app_start,
                        "applicationEnd": app_end,
                        "schedules": [
                            {"stage": "application_start", "label": "접수 시작", "date": app_start},
                            {"stage": "application_end", "label": "접수 마감", "date": app_end},
                        ],
                        "selectionQuotas": {
                            "documentQuota": "공고문 기준",
                            "isDocumentPassAll": False,
                            "writtenQuota": "전형별 선발",
                        },
                        "coverLetterQuestions": [
                            {
                                "number": 1,
                                "title": f"{org_name} 지원 동기 및 입사 후 직무 수행 계획을 기술해 주십시오.",
                                "maxChars": 800,
                            }
                        ],
                        "summary": f"[잡알리오 실시간 수집] {org_name} - {title}",
                        "mainDuties": ["세부 직무기술서 및 원문 채용공고 참조"],
                        "qualifications": ["세부 지원자격 원문 공고문 참조"],
                        "preferredCerts": ["전기기사", "정보처리기사", "한국사능력검정 1급", "컴퓨터활용능력 1급"],
                        "sourceUrl": f"https://job.alio.go.kr/recruitview.do?idx={idx}",
                        "sourcePlatform": "JOB-ALIO",
                        "isMedicalExcluded": cls_info["isMedicalExcluded"],
                        "excludedReason": cls_info["excludedReason"],
                        "updatedAt": now_str,
                    }
                )
        except Exception as exc:
            print(f"[WARN] 잡알리오 페이지 {page} 수집 중 건너뜀: {exc}")

    return results


def main() -> None:
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_dir = os.path.join(project_root, "public", "data")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "jobs.json")

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")

    print("=" * 68)
    print("[TechJob ALIO] 전국 모든 공기업 채용 크롤러 실행")
    print(f"- 실행 시각: {now_str}")
    print("=" * 68)

    live_jobs = fetch_job_alio_html(max_pages=3)
    if live_jobs:
        print(f"[INFO] 잡알리오에서 실시간 공고 {len(live_jobs)}건을 성공적으로 가져왔습니다.")

    # 기존 jobs.json 데이터와 병합
    existing_jobs: List[Dict[str, Any]] = []
    if os.path.exists(output_path):
        try:
            with open(output_path, "r", encoding="utf-8") as f:
                existing_jobs = json.load(f)
        except Exception:
            existing_jobs = []

    merged_map: Dict[str, Dict[str, Any]] = {}
    for item in existing_jobs:
        merged_map[item["id"]] = item
    for item in live_jobs:
        merged_map[item["id"]] = item

    final_list = list(merged_map.values())
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(final_list, f, ensure_ascii=False, indent=2)

    print(f"[SUCCESS] 총 {len(final_list)}건이 '{output_path}'에 저장되었습니다.")


if __name__ == "__main__":
    main()
