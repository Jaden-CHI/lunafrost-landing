---
title: 'GPT-6.1 Terra 완전 가이드: Computer Use API 실전 활용'
slug: gpt-6-1-terra-computer-use-api-guide
date: '2026-10-27'
category: AI Tools
tags:
  - GPT-6.1 Terra
  - OpenAI
  - Computer Use
  - AI Agent
  - Vercel AI SDK
  - GitHub Copilot
  - LLM API
description: >-
  GPT-6.1 Terra의 가격 구조, 컨텍스트 윈도우, Computer Use 및 Tool Calling 실전 코드까지 — 공식 출처
  기반으로 정리한 개발자 가이드.
cover: /images/posts/daily-2026-10-27/commons-40028752.webp
published: true
automated: true
sources:
  - 'https://openai.com/news/product-releases/'
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - 'https://openai.com/products/release-notes/'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - 'https://community.openai.com/c/announcements/6'
  - >-
    https://blog.google/products-and-platforms/platforms/google-play/google-play-updates-october-2026/
  - 'https://www.anthropic.com/news'
  - >-
    https://github.blog/changelog/2025-12-01-copilot-spaces-public-spaces-and-code-view-support/
  - 'https://developer.android.com/jetpack/androidx/releases/compose-material3'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
  - 'https://help.openai.com/en/articles/9624314-model-release-notes'
  - 'https://openai.com/index/gpt-5-6/'
  - 'https://developers.openai.com/api/docs/models/gpt-6.1-terra'
  - 'https://openai.com/index/introducing-gpt-6-1-terra/'
  - 'https://github.blog/changelog/2026-10-26-gpt-6-1-terra-in-github-copilot/'
  - >-
    https://community.openai.com/t/gpt-6-1-terra-delivering-fast-and-capable-computer-use-at-a-lower-price/1409900
  - 'https://deploymentsafety.openai.com/gpt-6-1-terra'
  - 'https://vercel.com/ai-gateway/models/gpt-6.1-terra'
  - 'https://vercel.com/ai-gateway/models/gpt-6.1-terra-fast'
  - 'https://vercel.com/changelog/gpt-6-1-terra-now-available-on-ai-gateway'
  - 'https://openai.com/api/'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: c-g.
  title: >-
    Modular synthesizer DIY circuit boards - Epic Build Time (2014-11-05
    16.29.42 by c-g.)
  source: 'https://commons.wikimedia.org/w/index.php?curid=40028752'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: b43bdedd-ca97-4efc-8291-dbf2a764ce15
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/4/4a/Modular_synthesizer_DIY_circuit_boards_-_Epic_Build_Time_%282014-11-05_16.29.42_by_c-g.%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: c15071011258f284b5959c8eff28dea85ab75dc026cad4b165bfeebfd639c49b
  verifiedAt: '2026-10-27T03:39:44.304Z'
  originalArtist: >-
    <a rel="nofollow" class="external text"
    href="https://www.flickr.com/people/44113611@N00">c-g.</a>
  changes: Resized and converted to WebP
---
> **TL;DR** GPT-6.1 Terra(`gpt-6.1-terra`)는 2026년 10월 26일 출시된 OpenAI의 고효율 에이전트 모델이다. 입력 $1/M 토큰으로 GPT-5.6 Terra 대비 **50% 저렴**하고, Terminal-Bench 4.0에서 **50.3%** 태스크 해결률을 기록했다. Computer Use, 시각 추론, Tool Calling을 Responses API로 모두 지원한다.

---

## GPT-6.1 Terra란?

OpenAI는 [GPT-6.1 Terra를 "빠르고 효율적인 모델"](https://openai.com/index/introducing-gpt-6-1-terra/)로 공식 소개했다. 전작 GPT-5.6 Terra에서 크게 개선된 이 모델은 **상세한 시각 추론(visual reasoning)**, **정밀한 Computer Use**, **자연스러운 글쓰기**를 하나의 모델에 결합했다. 초안 작성, 기술 도면 해석, 폼 자동 입력, 영상 편집 워크플로처럼 반복적인 일상 업무에 특화된 포지셔닝이다.

API에서는 [`gpt-6.1-terra`](https://developers.openai.com/api/docs/models/gpt-6.1-terra) 모델 ID로 호출하며, ChatGPT Work와 Codex에서도 사용 가능하다. 단, ChatGPT Chat 탭에서는 지원되지 않는다.

---

## 가격과 컨텍스트 윈도우

### 토큰 요금

| 구분 | 입력 | 캐시된 입력 | 출력 |
|---|---|---|---|
| **Standard** (`gpt-6.1-terra`) | $1.00/M | $0.05/M | $5.00/M |
| **Fast** (`gpt-6.1-terra-fast`) | $2.00/M | — | $10.00/M |

[공식 가격 기준](https://openai.com/api/)으로 Terra는 GPT-5.6 Terra 및 GPT-6.1 Sol 대비 **표준 API 가격이 50% 낮다.** 청구서 자동화, 회계 소프트웨어 입력처럼 처리량이 많은 작업에서 비용 이점이 극대화된다. API 요금은 ChatGPT 구독과 별도로 청구된다.

> **주의:** 입력 토큰이 **272,000**을 초과하면 입력·캐시 요율이 2배, 출력은 1.5배로 청구된다. 대용량 문서 파이프라인을 설계할 때 반드시 고려해야 한다.

### 컨텍스트 및 출력 한계

- **컨텍스트 윈도우:** 1,050,000 토큰
- **최대 출력:** 128,000 토큰
- **지식 컷오프:** 2026년 6월 1일

---

## 성능 벤치마크

[공식 발표](https://openai.com/index/introducing-gpt-6-1-terra/) 기준으로 확인된 수치만 정리했다.

- **vs GPT-5.6 Terra:** 중간 추론 노력(`medium`) 기준 **15퍼센트포인트 높은 점수**를 약 1/3 비용으로 달성
- **Terminal-Bench 4.0 (코딩 에이전트 벤치마크):** 최대 추론 노력 기준 **50.3%** 태스크 해결 — GPT-5.6 Terra의 21.5%에서 두 배 이상 향상
- **환각 오류율:** 낮은 추론 노력 기준 GPT-5.6 Terra의 53.6%에서 **16.7%로 약 37퍼센트포인트 감소**
- **vs GPT-6 Astra / GPT-6.1 Sol:** **3배 이상 빠르게** 태스크 완료, 토큰당 가격은 1/10 수준

---

## 지원 기능과 추론 노력 설정

[Responses API](https://developers.openai.com/api/docs/models/gpt-6.1-terra)를 통해 아래 기능이 모두 지원된다.

- 웹 검색 / 파일 검색 / 이미지 생성
- 코드 인터프리터 / 호스팅 셸
- **Computer Use**
- MCP / Tool Search / Skills

**추론 노력(reasoning effort)**은 `none`, `low`, `medium`(기본값), `high`, `xhigh`, `max` 6단계로 조정할 수 있다. 처리량이 중요한 배치 작업은 `low`, 코딩 에이전트처럼 정확도가 중요한 작업은 `high` 이상을 권장한다.

> **Tool Calling은 반드시 Responses API를 통해야 한다.** Chat Completions API로는 동작하지 않으니 주의.

---

## 실전 코드: Vercel AI Gateway로 Tool Calling

[Vercel AI Gateway 공식 문서](https://vercel.com/ai-gateway/models/gpt-6.1-terra)에 게시된 예시를 기반으로 한 Tool Calling 구현이다. 모델명으로 `openai/gpt-6.1-terra`를 지정하면 AI SDK가 Responses API를 자동으로 사용한다.

```typescript
import { generateText, tool } from 'ai';
import { z } from 'zod';

// Standard 모드: 비용 효율 우선
const result = await generateText({
  model: 'openai/gpt-6.1-terra',
  prompt: '서울 현재 날씨를 알려줘.',
  tools: {
    getWeather: tool({
      description: 'Get the current weather for a location',
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => ({
        location,
        temperatureC: 18,
      }),
    }),
  },
});
```

레이턴시가 중요한 실시간 UI라면 [Fast 모드](https://vercel.com/ai-gateway/models/gpt-6.1-terra-fast)로 전환한다.

```typescript
// Fast 모드: 응답 속도 우선
const fastResult = await generateText({
  model: 'openai/gpt-6.1-terra-fast',
  prompt: '...',
});
```

Fast 모드(`gpt-6.1-terra-fast`)는 Standard 대비 입력 요금이 2배이므로, 사용자 인터랙션이 잦은 UI에 한정해 쓰는 것이 비용 최적화에 유리하다.

---

## GitHub Copilot 연동

[GitHub 공식 Changelog](https://github.blog/changelog/2026-10-26-gpt-6-1-terra-in-github-copilot/)에 따르면 GPT-6.1 Terra는 **GitHub Copilot에 정식(GA) 출시**됐다. 일상적인 에이전트 코딩과 터미널 작업에 특화되며, 초기 테스트에서 터미널 및 C# 코딩 태스크 해결률이 GPT-5.6 Terra보다 눈에 띄게 높았다. GPT-6.1 Sol보다 낮은 비용으로 제공된다.

Copilot Enterprise 및 Business 플랜 관리자는 **Copilot 설정 → 모델 정책**에서 GPT-6.1 Terra 접근 권한을 직접 관리할 수 있다.

---

## 언제 쓰고, 언제 쓰지 말아야 할까?

**적합한 유스케이스**
- 대용량 문서 자동 처리 (청구서, 양식 입력)
- Computer Use 기반 RPA 에이전트
- 코딩 에이전트 (Terminal-Bench 기준 최고 수준)
- 비용 민감한 배치 파이프라인

**주의할 상황**
- **매우 복잡한 코딩 작업:** [OpenAI는 이 경우 더 큰 GPT-6 모델을 권장](https://developers.openai.com/api/docs/models/gpt-6.1-terra)한다
- **UAE 리전 추론:** UAE 추론 레지던시를 지원하지 않는다
- **Fine-tuning:** 현재 지원되지 않는다
- **272K 토큰 초과 입력:** 요율이 상승하므로 청크 분할 전략 필요

---

## 정리

GPT-6.1 Terra는 가격, 속도, 에이전트 기능 세 축에서 균형을 맞춘 모델이다. 특히 **Computer Use와 Tool Calling을 실운영에서 쓰고 싶은 개발자**에게는 비용 측면에서 현실적인 선택지가 됐다. Vercel AI Gateway나 GitHub Copilot과의 통합이 공식 지원되므로, 기존 스택에 큰 변경 없이 도입을 검토해볼 수 있다.


## 참고 자료
- [공식 자료 1](https://openai.com/news/product-releases/)
- [공식 자료 2](https://developers.openai.com/api/docs/changelog)
- [공식 자료 3](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 4](https://openai.com/products/release-notes/)
- [공식 자료 5](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 6](https://community.openai.com/c/announcements/6)
- [공식 자료 7](https://blog.google/products-and-platforms/platforms/google-play/google-play-updates-october-2026/)
- [공식 자료 8](https://www.anthropic.com/news)
- [공식 자료 9](https://github.blog/changelog/2025-12-01-copilot-spaces-public-spaces-and-code-view-support/)
- [공식 자료 10](https://developer.android.com/jetpack/androidx/releases/compose-material3)
- [공식 자료 11](https://platform.claude.com/docs/en/release-notes/overview)
- [공식 자료 12](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [공식 자료 13](https://help.openai.com/en/articles/9624314-model-release-notes)
- [공식 자료 14](https://openai.com/index/gpt-5-6/)
- [공식 자료 15](https://developers.openai.com/api/docs/models/gpt-6.1-terra)
- [공식 자료 16](https://openai.com/index/introducing-gpt-6-1-terra/)
- [공식 자료 17](https://github.blog/changelog/2026-10-26-gpt-6-1-terra-in-github-copilot/)
- [공식 자료 18](https://community.openai.com/t/gpt-6-1-terra-delivering-fast-and-capable-computer-use-at-a-lower-price/1409900)
- [공식 자료 19](https://deploymentsafety.openai.com/gpt-6-1-terra)
- [공식 자료 20](https://vercel.com/ai-gateway/models/gpt-6.1-terra)
- [공식 자료 21](https://vercel.com/ai-gateway/models/gpt-6.1-terra-fast)
- [공식 자료 22](https://vercel.com/changelog/gpt-6-1-terra-now-available-on-ai-gateway)
- [공식 자료 23](https://openai.com/api/)

커버 이미지: [c-g.](https://commons.wikimedia.org/w/index.php?curid=40028752) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
