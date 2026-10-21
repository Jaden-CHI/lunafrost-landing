---
title: OpenAI 12시간 프롬프트 캐싱 완전 가이드
slug: openai-12h-prompt-caching-guide
date: '2026-10-21'
category: AI Tools
tags:
  - OpenAI
  - 프롬프트 캐싱
  - Responses API
  - 비용 최적화
  - 멀티에이전트
  - LLM
description: >-
  2026년 10월 OpenAI가 Responses API에 추가한 12시간 프롬프트 캐싱 옵션의 가격 구조, API 파라미터, 실전 예제,
  그리고 주의사항을 공식 문서 기반으로 정리합니다.
cover: /images/posts/daily-2026-10-21/commons-127063240.webp
published: true
automated: true
sources:
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - 'https://developers.openai.com/codex/changelog'
  - 'https://openai.com/products/release-notes/'
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/
  - >-
    https://help.openai.com/en/articles/10128477-chatgpt-enterprise-and-edu-release-notes
  - 'https://developers.openai.com/api/docs/deprecations'
  - >-
    https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/
  - 'https://community.openai.com/c/announcements/6'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - >-
    https://developers.openai.com/api/docs/changelog?mw_entry=2026-08-20-974ac0734e053853
  - 'https://openai.com/news/'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://help.openai.com/en/articles/9624314-model-release-notes'
  - 'https://www.anthropic.com/transparency'
  - 'https://community.openai.com/latest?no_definitions=true&page=1'
  - 'https://developers.openai.com/api/docs/guides/prompt-caching'
  - 'https://developers.openai.com/api/docs/pricing'
  - 'https://openai.com/index/api-prompt-caching/'
  - 'https://developers.openai.com/cookbook/examples/prompt_caching_201'
  - >-
    https://community.openai.com/t/12-hour-prompt-caching-day-16-of-28-days-of-quality-of-life-improvements-and-or-a-full-reset/1403525?page=5
  - 'https://openai.com/index/introducing-codex/'
  - >-
    https://community.openai.com/t/ultrafast-is-rolling-out-today-for-gpt-6-1-sol-in-the-api-codex-and-chatgpt-work/1404475
  - 'https://openai.com/index/gpt-5-1-for-developers/'
  - >-
    https://community.openai.com/t/i-find-the-5-6-pricing-to-be-seriously-misleading/1390309/2
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Dave Ruske
  title: SBC6120 and Heath Microprocessor Trainer (15225028056)
  source: 'https://commons.wikimedia.org/w/index.php?curid=127063240'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: f6cefbbb-086a-41b5-abc7-4b26eac87b47
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/b/bd/SBC6120_and_Heath_Microprocessor_Trainer_%2815225028056%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 434aec55e84fe114ea45969e1537086bd70e7738cdf2360afdeff9448063fada
  verifiedAt: '2026-10-21T03:16:21.624Z'
  originalArtist: >-
    <a rel="nofollow" class="external text"
    href="https://www.flickr.com/people/97024820@N00">Dave Ruske</a>
  changes: Resized and converted to WebP
---
> **TL;DR** — OpenAI가 2026년 10월 20일 Responses API에 **12시간 TTL 프롬프트 캐싱** 옵션을 추가했다. 쓰기 단가는 일반 입력의 2.5배로 30분 TTL(1.25배)보다 비싸지만, 읽기 단가는 동일하게 0.1배다. 하루에 여러 번 같은 시스템 프롬프트·툴 정의를 재사용하는 에이전트 파이프라인이라면 쓰기 1회 → 읽기 N회 구조로 전환해 실질 비용을 크게 낮출 수 있다.

---

## 프롬프트 캐싱이란? — 30분 vs 12시간

[OpenAI 프롬프트 캐싱 공식 가이드](https://developers.openai.com/api/docs/guides/prompt-caching)에 따르면, 프롬프트 캐싱은 이전 요청에서 처리한 입력 토큰의 KV 텐서를 서버에 저장해 두고, 이후 요청에서 동일한 프리픽스가 감지되면 재처리 없이 **저렴한 캐시 읽기 단가**만 적용하는 방식이다.

기존에는 캐시 유효 기간(TTL)이 **30분** 고정이었다. 대화 세션 간 공백이 30분을 넘으면 캐시가 만료되어 다시 일반 입력 단가로 쓰기가 발생한다. [2026년 10월 20일 변경 이력](https://developers.openai.com/api/docs/changelog)을 보면, 이제 Responses API에서 `prompt_cache_options.ttl`을 `"12h"`로 명시해 **최소 12시간 캐시 유지**를 선택할 수 있게 됐다.

| 구분 | 30분 TTL | 12시간 TTL |
|---|---|---|
| 캐시 쓰기 단가 | 일반 입력 × 1.25 | 일반 입력 × 2.5 |
| 캐시 읽기 단가 | 일반 입력 × 0.1 | 일반 입력 × 0.1 |
| 적합한 콘텐츠 | 단일 세션 컨텍스트 | 하루 종일 재사용하는 지침·참조 자료 |

캐시 읽기 단가는 TTL 선택과 무관하게 동일하다. 차이는 **쓰기 프리미엄을 한 번 더 지불하고 캐시를 더 오래 유지하느냐**의 문제다.

---

## 언제 12h TTL이 유리한가?

### 멀티에이전트 파이프라인

시스템 프롬프트와 툴 정의가 수천 토큰에 달하는 에이전트는, 요청 간격이 30분을 넘는 순간 캐시를 다시 써야 한다. 워커가 여러 개이거나 배치 실행 간격이 수 시간이라면 12h TTL 하나로 모든 워커가 같은 캐시를 공유할 수 있다.

### 반복 배치 호출 파이프라인

콘텐츠 자동화나 데이터 처리 파이프라인에서 하루에 수십~수백 번 같은 지침을 앞에 붙여 LLM을 호출하는 경우, 공유 지침 블록에 12h TTL을 적용하면 쓰기는 하루 한 번, 읽기는 N번 구조가 된다.

### 장기 챗봇·고객센터 세션

B2B 환경에서는 사용자가 수 시간 동안 자리를 비웠다가 다시 돌아오는 일이 흔하다. 30분 TTL이라면 재접속 시마다 캐시 미스가 발생하지만, 12h TTL이면 업무 시간 내내 캐시가 살아 있을 가능성이 높다.

---

## 실전 API 예제 (gpt-6.1-sol 기준)

[공식 프롬프트 캐싱 가이드](https://developers.openai.com/api/docs/guides/prompt-caching)에 제시된 요청 구조를 기반으로 한 예제다. 핵심은 **콘텐츠 블록마다 독립적으로 TTL을 지정**할 수 있다는 점이다.

```json
{
  "model": "gpt-6.1-sol",
  "prompt_cache_options": { "mode": "explicit", "ttl": "30m" },
  "input": [
    {
      "role": "developer",
      "content": [
        {
          "type": "input_text",
          "text": "하루 종일 재사용하는 공유 지침 및 참조 자료...",
          "prompt_cache_breakpoint": { "mode": "explicit", "ttl": "12h" }
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "몇 분 안에 재사용할 세션 컨텍스트...",
          "prompt_cache_breakpoint": { "mode": "explicit" }
        },
        {
          "type": "input_text",
          "text": "현재 질문 (캐시 쓰기 불필요)"
        }
      ]
    }
  ]
}
```

- **첫 번째 블록**: 하루 종일 고정된 시스템 프롬프트나 참조 문서 → `"ttl": "12h"` 브레이크포인트
- **두 번째 블록**: 현재 세션에서만 유효한 컨텍스트 → 기본 30분 TTL 브레이크포인트
- **세 번째 블록**: 매 요청마다 바뀌는 질문 → 캐시 브레이크포인트 없음

### 캐시 사용량 모니터링

[공식 가이드](https://developers.openai.com/api/docs/guides/prompt-caching)에 따르면 Responses API 응답의 `input_tokens_details.cache_write_tokens_details` 필드가 쓰기를 **`ttl_30m_tokens`** 와 **`ttl_12h_tokens`** 로 분리해 반환한다. 이를 통해 TTL별 캐시 쓰기 비용을 정확히 추적할 수 있다.

---

## 비용 구조 시뮬레이션

[OpenAI 공식 가격표](https://developers.openai.com/api/docs/pricing) 기준 주요 모델의 단가(1M 토큰당)는 다음과 같다.

| 모델 | 일반 입력 | 캐시 읽기 | 30분 쓰기 | 12시간 쓰기 |
|---|---|---|---|---|
| gpt-6-astra | $10.00 | $1.00 | $12.50 | $25.00 |
| gpt-6.1-sol | $2.00 | $0.10 | $2.50 | $5.00 |
| gpt-6-luna | $0.10 | $0.01 | $0.125 | $0.25 |

**시나리오 예시 (gpt-6.1-sol, 공유 지침 100K 토큰, 하루 50회 호출)**

- **캐싱 없음**: 100K × $2.00/1M × 50회 = **$10.00**
- **30분 TTL** (간격 2시간, 쓰기 4회 발생 가정): 쓰기 4회 × 100K × $2.50/1M + 읽기 46회 × 100K × $0.10/1M = $1.00 + $0.46 = **$1.46**
- **12시간 TTL** (쓰기 1회): 쓰기 1회 × 100K × $5.00/1M + 읽기 49회 × 100K × $0.10/1M = $0.50 + $0.49 = **$0.99**

요청 간격이 길수록 12h TTL의 쓰기 프리미엄 1회가 30분 TTL 반복 쓰기보다 유리해진다. 반대로 요청이 30분 이내 간격으로 촘촘하게 몰려 있다면 30분 TTL이 더 경제적이다.

---

## 주의사항 & 불확실한 점

[공식 가이드](https://developers.openai.com/api/docs/guides/prompt-caching)가 명시하는 제약 사항을 그대로 전달한다.

- **12시간은 최소 보장 수명이지 최대가 아니다.** OpenAI는 요청한 최소 수명보다 캐시를 더 오래 유지할 수 있다고 밝히고 있으나, 정확히 언제 삭제되는지는 보장하지 않는다.
- **캐시 히트를 보장하지 않는다.** TTL 설정은 캐시 읽기 단가 적용 자격에 영향을 주지만, 모든 요청이 저장된 KV 텐서를 실제로 재사용하거나 지연 시간이 낮아진다는 것을 보장하지는 않는다.
- **성능 수치는 참고용이다.** TTFT 최대 80% 감소, 입력 비용 최대 90% 감소 수치는 [공식 발표](https://developers.openai.com/api/docs/guides/prompt-caching)에 명시된 값이지만 워크로드에 따라 결과는 다를 수 있다.
- **Responses API 전용이다.** Chat Completions API는 TTL 선택을 지원하지 않는다. [OpenAI Cookbook](https://developers.openai.com/cookbook/examples/prompt_caching_201)에 따르면 Responses API를 쓰면 `previous_response_id`를 통해 추론 토큰을 턴 간에 저장해 캐시 활용률이 내부 기준 40~80% 향상된다.

---

## 마치며

12시간 TTL 프롬프트 캐싱은 단순한 단가 할인이 아니라 **캐시 아키텍처를 설계하는 문제**다. 지침·참조 자료처럼 하루 내내 변하지 않는 블록은 12h TTL 브레이크포인트 앞에 두고, 세션 컨텍스트처럼 자주 바뀌는 블록은 30m TTL로 분리하는 계층 구조가 핵심이다. `cache_write_tokens_details`로 TTL별 실제 쓰기 비용을 모니터링하면서 워크로드에 맞는 TTL 조합을 찾는 것이 시작점이 될 것이다.

> 이 글의 가격·API 파라미터는 2026-10-21 기준 공식 문서에서 확인된 값입니다. 발행 전 [OpenAI 공식 가격표](https://developers.openai.com/api/docs/pricing)를 재확인하세요.


## 참고 자료
- [공식 자료 1](https://developers.openai.com/api/docs/changelog)
- [공식 자료 2](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 3](https://developers.openai.com/codex/changelog)
- [공식 자료 4](https://openai.com/products/release-notes/)
- [공식 자료 5](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/)
- [공식 자료 6](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-and-edu-release-notes)
- [공식 자료 7](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 8](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)
- [공식 자료 9](https://community.openai.com/c/announcements/6)
- [공식 자료 10](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 11](https://developers.openai.com/api/docs/changelog?mw_entry=2026-08-20-974ac0734e053853)
- [공식 자료 12](https://openai.com/news/)
- [공식 자료 13](https://platform.claude.com/docs/en/release-notes/overview)
- [공식 자료 14](https://help.openai.com/en/articles/9624314-model-release-notes)
- [공식 자료 15](https://www.anthropic.com/transparency)
- [공식 자료 16](https://community.openai.com/latest?no_definitions=true&page=1)
- [공식 자료 17](https://developers.openai.com/api/docs/guides/prompt-caching)
- [공식 자료 18](https://developers.openai.com/api/docs/pricing)
- [공식 자료 19](https://openai.com/index/api-prompt-caching/)
- [공식 자료 20](https://developers.openai.com/cookbook/examples/prompt_caching_201)
- [공식 자료 21](https://community.openai.com/t/12-hour-prompt-caching-day-16-of-28-days-of-quality-of-life-improvements-and-or-a-full-reset/1403525?page=5)
- [공식 자료 22](https://openai.com/index/introducing-codex/)
- [공식 자료 23](https://community.openai.com/t/ultrafast-is-rolling-out-today-for-gpt-6-1-sol-in-the-api-codex-and-chatgpt-work/1404475)
- [공식 자료 24](https://openai.com/index/gpt-5-1-for-developers/)
- [공식 자료 25](https://community.openai.com/t/i-find-the-5-6-pricing-to-be-seriously-misleading/1390309/2)

커버 이미지: [Dave Ruske](https://commons.wikimedia.org/w/index.php?curid=127063240) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
