---
title: 'OpenAI Decisions API 완전 정복: 분류·라우팅을 10배 빠르게'
slug: openai-decisions-api-guide
date: '2026-10-11'
category: App Dev
tags:
  - OpenAI
  - Decisions API
  - gpt-6-luna
  - 분류
  - 라우팅
  - API
description: >-
  OpenAI가 퍼블릭 베타로 출시한 Decisions API의 작동 방식, 세 가지 답변 타입, 가격 구조, 그리고 고객 문의 라우팅·이미지
  품질 검수 실전 예제까지 공식 문서 기반으로 정리했습니다.
cover: /images/posts/openai-decisions-api-guide/ai-agi-pattern.webp
published: true
automated: true
sources:
  - 'https://openai.com/index/devday-2026-recap/'
  - 'https://developers.openai.com/api/docs/changelog'
  - >-
    https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/
  - 'https://developer.android.com/jetpack/androidx/releases/benchmark'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - >-
    https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - 'https://developers.openai.com/api/docs/deprecations'
  - 'https://developers.openai.com/codex/changelog'
  - 'https://community.openai.com/c/announcements/6'
  - >-
    https://developer.android.com/blog/posts/top-ai-on-android-updates-for-building-intelligent-experiences-from-google-i-o-26
  - 'https://openai.com/index/wrtn/'
  - >-
    https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-july-2026/
  - 'https://openai.com/news/product-releases/'
  - >-
    https://blog.google/intl/en-in/products/platforms/new-tools-to-power-your-creation-journey-from-start-to-finish/
  - 'https://community.vercel.com/t/i-built-3-mini-apps-as-a-solo-developer/47852'
  - 'https://developers.openai.com/'
  - >-
    https://blog.google/outreach-initiatives/entrepreneurs/korean-startup-founders/
  - 'https://openai.com/devday/2026/'
  - 'https://vercel.com/i/openai-devday-2026'
  - >-
    https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877
  - 'https://developers.openai.com/api/docs/guides/decisions'
  - 'https://developers.openai.com/api/docs/guides/latest-model'
  - >-
    https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877/10
  - 'https://vercel.com/ai-gateway/models/gpt-6-luna-decisions'
  - 'https://vercel.com/i/what-is-openai-decisions-api'
  - 'https://openai.com/index/practical-guide-building-gpt-6/'
  - >-
    https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877?page=2
coverAlt: 범용 인공지능을 시각화한 입체 패턴
coverCredit:
  author: Google DeepMind / Wes Cockx
  source: 'https://unsplash.com/photos/background-pattern-0vw8EOgHsYY'
  license: Unsplash License
  licenseUrl: 'https://unsplash.com/license'
  alt: 범용 인공지능을 시각화한 입체 패턴
---
## TL;DR

- OpenAI가 2026년 10월 6일 `POST /v1/decisions` 엔드포인트를 **퍼블릭 베타**로 공개했다.
- Responses API 경유 GPT-6 Luna보다 **최대 10배 빠른** 실시간 의사결정에 특화되어 있다.
- 답변 유형은 **predicate / choice / score** 세 가지이며, 텍스트와 이미지 모두 입력 가능하다.
- 입력 토큰 **$0.10 / 1M**, 출력·캐시 읽기·쓰기는 **청구되지 않는다.**
- 현재 `gpt-6-luna` 모델만 지원하며, GA 일정은 "향후 몇 주 내"로만 공지된 베타 단계다.

---

## Decisions API란 무엇인가

[OpenAI DevDay 2026 리캡](https://openai.com/index/devday-2026-recap/)에 따르면, Decisions API는 "Luna의 지능을 사용자 정의된 유한한 답변을 가진 특정 질문들에 집중시켜 실시간 의사결정을 가능하게 한다"고 설명한다. 쉽게 말해 **자유 형식 텍스트 생성이 아니라, 미리 정해진 선택지 안에서 빠르게 판단을 내리는 전용 API**다.

기존 Responses API나 Agents API가 범용 텍스트 생성·멀티스텝 작업에 최적화되어 있다면, Decisions API는 콘텐츠 모더레이션, 고객 문의 라우팅, 상품 이미지 검수처럼 **입력 → 분류/판단 → 액션** 패턴이 반복되는 워크플로에 맞게 설계됐다.

[공식 커뮤니티 발표](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877)에 따르면 2026년 10월 6일 퍼블릭 베타가 시작됐으며, 정식 출시(GA)는 "향후 몇 주 내"로 예고되어 있다.

---

## 요청 구조: 딱 세 가지 필드

[공식 가이드](https://developers.openai.com/api/docs/guides/decisions)에 따르면 요청은 다음 세 필드로 구성된다.

| 필드 | 설명 |
|------|------|
| `model` | 현재 `gpt-6-luna`만 지원 |
| `input` | 텍스트 또는 이미지가 포함된 사용자 메시지 |
| `questions` | 평가 항목 배열 (type, instructions, choices 등) |

응답에는 `answers` 배열이 반환되며, 각 항목은 질문 유형에 따라 다른 형태의 값을 담는다.

### 세 가지 답변 타입

- **predicate**: 조건이 참일 확률 (0~1 사이 확률값)
- **choice**: 미리 정의한 선택지 중 하나
- **score**: 순서가 있는 루브릭에 따른 점수

---

## 실전 예제 3가지

### 예제 1 — 고객 문의 라우팅 (Python)

"주문 금액이 두 번 청구되었습니다" 같은 문의가 들어왔을 때 담당 부서를 즉시 분류한다.

```python
from openai import OpenAI
client = OpenAI()

decision = client.decisions.create(
    model="gpt-6-luna",
    input="주문 금액이 두 번 청구되었습니다.",
    questions=[{
        "type": "choice",
        "name": "department",
        "instructions": "이 문의를 처리할 부서는?",
        "choices": [
            {"value": "billing", "description": "결제, 청구서, 환불"},
            {"value": "technical", "description": "제품 사용 문제"},
            {"value": "shipping", "description": "배송 및 추적"},
            {"value": "other", "description": "기타"}
        ]
    }]
)
answer = decision.answers[0]
print(f"부서: {answer.choice} (신뢰도: {answer.confidence})")
```

`choice` 타입이므로 응답은 네 가지 값 중 하나로 반환된다. 챗봇 백엔드나 CRM 연동 시 별도 파싱 로직 없이 바로 `answer.choice` 값을 라우팅 키로 쓸 수 있다.

### 예제 2 — 상품 이미지 품질 검수 (cURL)

e-커머스에서 판매자가 업로드한 상품 이미지에 손상이 있는지 자동으로 판단한다. `predicate` 타입을 쓰면 확률값으로 결과가 온다.

```bash
curl https://api.openai.com/v1/decisions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-luna",
    "input": [{"role": "user", "content": [
      {"type": "input_text", "text": "이 상품 이미지를 검사하세요."},
      {"type": "input_image", "image_url": "data:image/png;base64,..."}
    ]}],
    "questions": [{
      "type": "predicate",
      "name": "visible_damage",
      "instructions": "제품에 균열, 찢김, 찌그러짐 등 눈에 보이는 손상이 있습니까?"
    }]
  }'
```

반환된 확률값이 임계치(예: 0.8)를 넘으면 자동 반려 처리하는 식으로 파이프라인을 구성할 수 있다.

### 예제 3 — Vercel AI SDK 경유 (TypeScript)

[Vercel AI Gateway](https://vercel.com/ai-gateway/models/gpt-6-luna-decisions)를 통해 `GPT-6 Luna Decisions`를 호출할 때는 `experimental_decide`를 사용한다.

```typescript
import { experimental_decide as decide } from 'ai';

const result = await decide({
  model: 'openai/gpt-6-luna-decisions',
  state: '고객 지원 상담원이 전액 환불을 처리했습니다.',
  questions: {
    refunded: {
      type: 'boolean',
      instructions: '환불이 처리되었습니까?',
    },
  },
});
```

Next.js 기반 SaaS에서 서버 액션과 조합하면 추가 모델 호출 없이 상태 검증 로직을 단순화할 수 있다.

---

## 가격과 컨텍스트 윈도우

[공식 최신 모델 가이드](https://developers.openai.com/api/docs/guides/latest-model)에 따르면 `gpt-6-luna` 사용 시 입력 토큰 비용은 **$0.10 / 1M tokens**이며, 캐시 읽기·쓰기·출력 토큰은 **청구되지 않는다.** 분류 요청은 생성 토큰이 거의 없으므로 사실상 입력 비용만 발생한다.

[공식 커뮤니티](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877/10)에 따르면 표준 컨텍스트는 최대 272K 입력 토큰이며, 1M 토큰 컨텍스트 윈도우도 이용 가능하다. 긴 약관 문서나 대화 이력을 통째로 넣고 분류하는 시나리오도 커버된다.

참고로 같은 시기 OpenAI는 [API 사용 티어를 기존 5단계에서 Build / Launch / Grow 3단계로 간소화](https://developers.openai.com/api/docs/changelog)했으며, 누적 크레딧 구매액 기준으로 자동 업그레이드된다.

---

## 아직 불확실한 것들

베타 단계이므로 GA 전에 스펙이 바뀔 수 있다. 현재 공식 문서 기준으로 확정되지 않은 항목은 다음과 같다.

- **캐싱**: 현재 미지원. [커뮤니티](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877?page=2)에서 "베타 중 도입 가능성"을 언급했으나 일정 미정.
- **지원 모델 확대**: 현재 `gpt-6-luna`만 가능. 다른 GPT-6 패밀리 추가 여부 미정.
- **GA 일정**: "향후 몇 주 내"라고만 명시.
- **한국어 입력 성능**: 공식 문서에 별도 벤치마크 없음. 직접 테스트 필요.
- **Decisions API 전용 rate limit**: 공식 문서에 별도 수치 미기재.

---

## 언제 쓰면 좋은가

Decisions API는 **"답이 정해진 질문"을 빠르게 대량으로 처리해야 할 때** 가장 빛난다. 자유 형식 텍스트 생성이 필요 없는 분류·모더레이션·라우팅 레이어에 먼저 적용해 보고, 기존 Responses API 호출과 응답 시간을 직접 비교해 보는 것을 권장한다.

## 참고 자료
- [공식 자료 1](https://openai.com/index/devday-2026-recap/)
- [공식 자료 2](https://developers.openai.com/api/docs/changelog)
- [공식 자료 3](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)
- [공식 자료 4](https://developer.android.com/jetpack/androidx/releases/benchmark)
- [공식 자료 5](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 6](https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/)
- [공식 자료 7](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 8](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 9](https://developers.openai.com/codex/changelog)
- [공식 자료 10](https://community.openai.com/c/announcements/6)
- [공식 자료 11](https://developer.android.com/blog/posts/top-ai-on-android-updates-for-building-intelligent-experiences-from-google-i-o-26)
- [공식 자료 12](https://openai.com/index/wrtn/)
- [공식 자료 13](https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-july-2026/)
- [공식 자료 14](https://openai.com/news/product-releases/)
- [공식 자료 15](https://blog.google/intl/en-in/products/platforms/new-tools-to-power-your-creation-journey-from-start-to-finish/)
- [공식 자료 16](https://community.vercel.com/t/i-built-3-mini-apps-as-a-solo-developer/47852)
- [공식 자료 17](https://developers.openai.com/)
- [공식 자료 18](https://blog.google/outreach-initiatives/entrepreneurs/korean-startup-founders/)
- [공식 자료 19](https://openai.com/devday/2026/)
- [공식 자료 20](https://vercel.com/i/openai-devday-2026)
- [공식 자료 21](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877)
- [공식 자료 22](https://developers.openai.com/api/docs/guides/decisions)
- [공식 자료 23](https://developers.openai.com/api/docs/guides/latest-model)
- [공식 자료 24](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877/10)
- [공식 자료 25](https://vercel.com/ai-gateway/models/gpt-6-luna-decisions)
- [공식 자료 26](https://vercel.com/i/what-is-openai-decisions-api)
- [공식 자료 27](https://openai.com/index/practical-guide-building-gpt-6/)
- [공식 자료 28](https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877?page=2)

커버 이미지: [Google DeepMind / Wes Cockx](https://unsplash.com/photos/background-pattern-0vw8EOgHsYY) · [Unsplash License](https://unsplash.com/license). 본문 이해를 돕기 위한 자료 이미지입니다.
