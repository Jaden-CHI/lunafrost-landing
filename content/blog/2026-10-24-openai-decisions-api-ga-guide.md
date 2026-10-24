---
title: 'OpenAI Decisions API GA 완전 가이드: 실시간 분류·라우팅'
slug: openai-decisions-api-ga-guide
date: '2026-10-24'
category: AI Tools
tags:
  - OpenAI
  - Decisions API
  - GPT-6 Luna
  - 분류
  - 라우팅
  - AI Tools
  - App Dev
description: >-
  2026년 10월 22일 정식 출시된 OpenAI Decisions API의 작동 원리, GA 신규 기능(프롬프트 캐싱·이미지 질문 단위
  지원·400문항), 확정 가격표, SDK 설정법을 개발자 관점에서 정리합니다.
cover: /images/posts/daily-2026-10-24/commons-10382423.webp
published: true
automated: true
sources:
  - 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
  - 'https://www.anthropic.com/news'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://openai.com/products/release-notes/'
  - 'https://openai.com/index/gpt-6-for-everyone/'
  - 'https://openai.com/news/research/'
  - 'https://developers.openai.com/api/docs/deprecations'
  - 'https://help.openai.com/en/articles/9624314-model-release-notes'
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://openai.com/index/sharing-ai-progress-in-mathematics/'
  - 'https://openai.com/index/devday-2026-recap/'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-collection/
  - 'https://blog.google/innovation-and-ai/sundar-pichai-io-2026/'
  - >-
    https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/
  - >-
    https://blog.google/intl/ko-kr/company-news/technology/building-the-agentic-future-kr/
  - 'https://openai.com/news/product-releases/'
  - >-
    https://blog.google/intl/ko-kr/products/android-play-hardware/google-play-updates-october-2026-kr/
  - 'https://openai.com/index/decisions-api/'
  - 'https://developers.openai.com/api/docs/guides/decisions'
  - >-
    https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877
  - >-
    https://community.openai.com/t/decisions-api-is-now-generally-available-with-new-updates/1408934
  - 'https://vercel.com/i/what-is-openai-decisions-api'
  - >-
    https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877/10
  - >-
    https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006
  - >-
    https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877?page=2
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Polluks
  title: Catweasel controller Mk3 (circuit board)
  source: 'https://commons.wikimedia.org/w/index.php?curid=10382423'
  license: CC BY 3.0
  licenseUrl: 'https://creativecommons.org/licenses/by/3.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: 92e9a6ed-54c8-4127-baad-2d6bcf318c31
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/5/58/Catweasel_controller_Mk3_%28circuit_board%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: d87921ecd5ebe87d6b10a8a4f84c8e4a2c35dbffcbd79fbb4b4148a84e096372
  verifiedAt: '2026-10-24T03:14:02.705Z'
  originalArtist: >-
    <a href="//commons.wikimedia.org/wiki/User:Polluks"
    title="User:Polluks">Polluks</a>
  changes: Resized and converted to WebP
---
> **TL;DR** — OpenAI Decisions API가 2026년 10월 22일 GA(정식 출시)됐다. `POST /v1/decisions` 하나로 텍스트·이미지·구조화 데이터를 **확률(probability) / 선택(choice) / 점수(score)** 세 가지 타입으로 즉시 반환한다. Responses API 대비 최대 10배 빠른 응답, 요청당 최대 400개 질문, 캐시 히트 시 입력 비용 90% 절감이 핵심이다.

---

## 발표 타임라인

| 날짜 | 이벤트 |
|---|---|
| 2026-09-29 | DevDay 2026에서 제한 프리뷰 최초 공개 |
| 2026-10-06 | 전체 개발자 대상 Public Beta 출시 |
| 2026-10-15 | GPT-Live 네이티브 연동 기능 추가 |
| 2026-10-22 | **GA(정식 출시)** + 신규 기능 대거 추가 |

[OpenAI 공식 체인지로그](https://developers.openai.com/api/docs/changelog)에 각 이벤트가 기록되어 있다.

---

## Decisions API란 무엇인가

[공식 GA 블로그](https://openai.com/index/decisions-api/)에 따르면, Decisions API는 GPT-6 Luna의 추론 능력을 **유한한 답변 집합을 가진 질문**에 집중시키는 방식으로 동작한다. 풀 텍스트 생성 없이 텍스트·이미지·구조화 입력에서 근실시간으로 결정을 반환하기 때문에, Responses API 대비 최대 10배 빠른 응답이 가능하다.

[공식 개발자 가이드](https://developers.openai.com/api/docs/guides/decisions)는 이 API가 **콘텐츠 분류, 요청 라우팅, 에이전트의 다음 행동 선택**에 적합하다고 명시한다.

---

## 핵심 개념: 세 가지 반환 타입

Decisions API는 질문 타입에 따라 세 가지 방식으로 결과를 반환한다.

| 타입 | 설명 | 예시 |
|---|---|---|
| `probability` | 조건이 참일 확률 | "이 문장에 혐오 표현이 포함됐을 확률은?" |
| `choice` | 정의된 옵션 중 하나 선택 | "이 메시지를 결제·배송·환불 중 어디로 라우팅할까?" |
| `score` | 루브릭 기준 점수 | "이 리뷰의 품질을 1~5점으로 평가해줘" |

---

## 요청 구조

[공식 가이드](https://developers.openai.com/api/docs/guides/decisions)에 따르면 요청은 세 필드로 구성된다.

- **`model`**: 현재 `gpt-6-luna`만 지원
- **`input`**: 모든 질문이 공유하는 증거 — 텍스트 문자열 또는 메시지·툴콜·툴 출력의 배열
- **`questions`**: 평가할 내용 — 타입, 지시문, 허용 선택지 또는 점수 레벨 포함

아래는 챗봇 라우팅에 적용한 의사 코드 예시다.

```json
{
  "model": "gpt-6-luna",
  "input": "환불 처리가 왜 이렇게 오래 걸리나요? 3일째입니다.",
  "questions": [
    {
      "type": "choice",
      "instruction": "이 메시지를 가장 적합한 팀으로 분류하세요.",
      "choices": ["결제팀", "배송팀", "환불팀", "일반문의팀"]
    },
    {
      "type": "probability",
      "instruction": "이 메시지에 고객 불만이 포함되어 있을 확률을 반환하세요."
    }
  ]
}
```

한 번의 요청으로 **라우팅 목적지**와 **감정 강도**를 동시에 얻는 구조다. GA 기준으로는 요청당 최대 **400개 질문**을 담을 수 있어(베타 대비 2배), 대량 배치 처리에도 효율적이다.

---

## GA에서 추가된 주요 기능

[GA 공식 어나운스먼트](https://community.openai.com/t/decisions-api-is-now-generally-available-with-new-updates/1408934)가 정리한 신규 기능은 다음과 같다.

### 1. 프롬프트 캐싱
컨텍스트를 재사용할 때 비용이 대폭 줄어든다. 동일한 시스템 프롬프트나 긴 문서를 반복 전달하는 파이프라인에서 효과가 크다.

### 2. 질문별 이미지 첨부
이전에는 입력 레벨에서만 이미지를 첨부할 수 있었지만, GA부터는 **질문 단위로도 이미지를 첨부**할 수 있다. 공유 레퍼런스 이미지와 비교 이미지를 개별 질문에 연결하는 방식이 가능해졌다.

### 3. 네이티브 JSON 입력
구조화된 앱 데이터를 별도 직렬화 없이 `input` 필드에 직접 전달할 수 있다.

### 4. 요청당 최대 400개 질문
베타 대비 2배로 늘어났다. 로그 분석, 상품 카탈로그 검수 등 배치 워크로드에 유리하다.

### 5. GPT-Live 네이티브 연동
2026년 10월 15일에 먼저 추가됐다. [공식 체인지로그](https://developers.openai.com/api/docs/changelog)에 따르면, **사용자 발화 중에도** 앱이 반응하거나 Live가 말하는 내용에 실시간으로 반응할 수 있다. Live가 Decisions를 직접 위임 호출하거나, 입출력 트랜스크립트 델타 도착 시 결정을 트리거하는 두 가지 방식이 모두 지원된다.

---

## 확정 가격표

[GA 공식 블로그](https://openai.com/index/decisions-api/) 기준 `gpt-6-luna`의 Decisions API 요금은 다음과 같다.

| 항목 | 요금 |
|---|---|
| 비캐시 입력 | $0.10 / 100만 토큰 |
| 캐시 히트 입력 | $0.01 / 100만 토큰 |
| 출력 토큰 | **없음** |

출력 토큰 과금이 없다는 점이 중요하다. 풀 텍스트 생성이 아닌 분류·점수 반환이므로 응답 자체의 토큰 비용이 발생하지 않는다.

> ⚠️ **주의:** 캐시 **쓰기** 비용은 공식 가이드에 별도 명시가 없다. 정확한 금액은 [OpenAI 가격 페이지](https://openai.com/index/decisions-api/)를 직접 확인하길 권장한다.

컨텍스트 윈도우는 표준 티어 기준 최대 272K 입력 토큰이며, 1M 토큰 옵션도 제공된다.

---

## SDK 설정

[Vercel 공식 가이드](https://vercel.com/i/what-is-openai-decisions-api)에 따르면, `decisions.create` 메서드를 사용하려면 아래 버전 이상이 필요하다.

```bash
# JavaScript / TypeScript
npm install openai@^7.30.0

# Python
pip install openai>=3.26.0
```

---

## 실전 활용 시나리오

| 시나리오 | 활용 방식 |
|---|---|
| **콘텐츠 모더레이션** | 사용자 업로드 텍스트·이미지 → `choice` 타입으로 위반 카테고리 분류 |
| **챗봇 라우팅** | 인입 메시지 → `probability` / `choice`로 의도 분류 → 담당 에이전트 배정 |
| **음성 앱** | GPT-Live 연동으로 사용자 발화 중 감정·의도 실시간 분류, 즉시 UI 반응 |
| **전자상거래** | 상품 기준 이미지 + 질문별 비교 이미지로 불량품 자동 검수 |
| **배치 처리** | 요청당 400문항으로 대량 로그·리뷰 데이터 비용 효율적 처리 |

---

## 데이터 처리 및 규정 준수

[공식 가이드](https://developers.openai.com/api/docs/guides/decisions)에 따르면, Decisions API는 **ZDR(Zero Data Retention)** 및 적격 고객 대상 **HIPAA** 사용을 지원한다. 데이터 레지던시는 지원 API 전 리전에서 제공되며, 리전 처리는 미국 및 유럽(EEA + 스위스)에서 지원된다.

> ⚠️ **한국 리전 관련:** 아시아 리전에 추가 용량이 확충됐다는 언급은 있으나, 한국 리전 포함 여부는 공식 명시가 없다. 가용성 가이드에서 직접 확인이 필요하다.

---

## 주의할 점

- **지원 모델이 `gpt-6-luna` 하나뿐이다.** 다른 모델 추가 일정은 공식 발표가 없다.
- **베타 시절 플레이그라운드 불일치 버그**가 커뮤니티에 보고된 적 있다. GA 이후 해소 여부는 코드 레벨에서 직접 검증하는 것을 권장한다.
- **Private Link** 지원이 명시되어 있으나, 활성화 절차와 비용 구조는 별도 문의가 필요하다.

---

Decisions API는 "모델에게 글을 쓰게 하는" 것이 아니라 "모델에게 판단만 시키는" 접근을 공식 엔드포인트로 제도화한 것이다. 분류·라우팅·검수처럼 답이 닫혀 있는 문제에는 Responses API보다 빠르고 저렴하게 동작한다. GA로 안정화됐으니, 기존 파이프라인의 병목 지점을 한 번 돌아볼 좋은 시점이다.


## 참고 자료
- [공식 자료 1](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [공식 자료 2](https://www.anthropic.com/news)
- [공식 자료 3](https://platform.claude.com/docs/en/release-notes/overview)
- [공식 자료 4](https://openai.com/products/release-notes/)
- [공식 자료 5](https://openai.com/index/gpt-6-for-everyone/)
- [공식 자료 6](https://openai.com/news/research/)
- [공식 자료 7](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 8](https://help.openai.com/en/articles/9624314-model-release-notes)
- [공식 자료 9](https://developers.openai.com/api/docs/changelog)
- [공식 자료 10](https://openai.com/index/sharing-ai-progress-in-mathematics/)
- [공식 자료 11](https://openai.com/index/devday-2026-recap/)
- [공식 자료 12](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 13](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-collection/)
- [공식 자료 14](https://blog.google/innovation-and-ai/sundar-pichai-io-2026/)
- [공식 자료 15](https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/)
- [공식 자료 16](https://blog.google/intl/ko-kr/company-news/technology/building-the-agentic-future-kr/)
- [공식 자료 17](https://openai.com/news/product-releases/)
- [공식 자료 18](https://blog.google/intl/ko-kr/products/android-play-hardware/google-play-updates-october-2026-kr/)
- [공식 자료 19](https://openai.com/index/decisions-api/)
- [공식 자료 20](https://developers.openai.com/api/docs/guides/decisions)
- [공식 자료 21](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877)
- [공식 자료 22](https://community.openai.com/t/decisions-api-is-now-generally-available-with-new-updates/1408934)
- [공식 자료 23](https://vercel.com/i/what-is-openai-decisions-api)
- [공식 자료 24](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877/10)
- [공식 자료 25](https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006)
- [공식 자료 26](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877?page=2)

커버 이미지: [Polluks](https://commons.wikimedia.org/w/index.php?curid=10382423) · [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
