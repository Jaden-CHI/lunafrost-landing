---
title: 'Mastra 실전 가이드: TypeScript AI 에이전트·워크플로·메모리'
slug: mastra-typescript-ai-agent-workflow-guide
date: '2026-11-18'
category: AI Tools
tags:
  - Mastra
  - TypeScript
  - AI에이전트
  - 워크플로
  - 오픈소스
  - MCP
  - Node.js
  - 에이전트프레임워크
description: >-
  Gatsby 팀이 만든 오픈소스 TypeScript AI 에이전트 프레임워크 Mastra의 핵심 구성
  요소(에이전트·워크플로·메모리·이벨·MCP)와 빠른 시작 방법을 1차 출처 기준으로 정리합니다.
cover: /images/posts/daily-2026-11-18/commons-157413772.webp
published: true
automated: true
sources:
  - 'https://github.com/mastra-ai'
  - 'https://nhimg.org/mastra-guide'
  - >-
    https://dev.to/thegdsks/building-a-production-ai-agent-in-typescript-with-mastra-a-2026-step-by-step-37dc
  - >-
    https://dev.to/gabrielanhaia/mastra-in-2026-what-it-is-when-to-use-it-and-how-it-compares-2go1
  - 'https://www.firecrawl.dev/blog/mastra-tutorial'
  - 'https://www.simplerdevelopment.com/blog/what-is-mastra'
  - >-
    https://callsphere.ai/blog/vw8h-build-ai-agent-mastra-typescript-framework-2026
  - 'https://www.codeworlds.com/en/collections/mastra'
  - 'https://www.agentlist.top/en/articles/mastra-ai-framework-guide/'
  - 'https://www.ayautomate.com/blog/best-typescript-ai-agent-frameworks'
  - 'https://www.creolestudios.com/ai-voice-agents-pipecat-guide/'
  - 'https://soniox.com/wiki/voice-agent-frameworks'
  - 'https://github.com/pipecat-ai'
  - 'https://micdrop.dev/blog/open-source-voice-agent-frameworks'
  - 'https://github.com/pipecat-ai/pipecat'
  - 'https://docs.pipecat.ai/pipecat/get-started/introduction'
  - 'https://docs.pipecat.ai/overview/introduction'
  - >-
    https://www.blog.brightcoding.dev/2026/02/18/pipecat-build-real-time-voice-ai-agents-in-minutes
  - 'https://techsy.io/en/blog/best-open-source-voice-agent-frameworks'
  - 'https://heyclau.de/entry/tools/pipecat'
  - 'https://www.firecrawl.dev/blog/best-web-extraction-tools'
  - 'https://www.firecrawl.dev/blog/best-open-source-web-scraping-libraries'
  - 'https://www.firecrawl.dev/blog'
  - >-
    https://www.digitalapplied.com/blog/ai-web-scraping-tools-firecrawl-guide-2025
  - 'https://www.firecrawl.dev/blog/mastering-firecrawl-scrape-endpoint'
  - 'https://www.firecrawl.dev/crawl'
  - 'https://freeapihub.com/blog/firecrawl-tutorial-website-to-llm-data-rag'
  - >-
    https://www.diego-rodriguez.work/blog/firecrawl-scraper-2026-developers-guide
  - 'https://starlog.is/articles/automation/firecrawl-firecrawl'
  - 'https://explainx.ai/blog/firecrawl-web-scraping-api-ai-agents-2026'
  - 'https://mastra.ai/'
  - 'https://mastra.ai/articles/ai-agent-workflows'
  - 'https://mastra.ai/reference/configuration'
  - 'https://mastra.ai/articles/mastra-vs-eve'
  - 'https://mastra.ai/docs/evals/evals-with-memory'
  - 'https://mastra.ai/ai-workflows'
  - 'https://mastra.ai/ai-agents'
  - 'https://mastra.ai/docs/getting-started/build-with-ai'
  - 'https://mastra.ai/ai-agent-framework'
  - 'https://www.firecrawl.dev/blog/best-enterprise-scraping-services'
  - 'https://www.firecrawl.dev/blog/best-web-search-apis'
  - 'https://www.firecrawl.dev/blog/best-web-scraping-api'
  - 'https://www.firecrawl.dev/blog/best-free-web-search-apis'
  - 'https://www.firecrawl.dev/pricing'
  - >-
    https://www.firecrawl.dev/pricing?dub_id=WrjkKRvxWoy9G1wT&gad_source=1&via=zxcvbnm
  - 'https://www.firecrawl.dev/pricing?extract-pricing=true'
  - 'https://www.firecrawl.dev/pricing.md'
editorialLane: practical
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Mohammed Qays
  title: Artificial Intelligence and Wikipedia course SM.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=157413772'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-157413772
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/9/99/Artificial_Intelligence_and_Wikipedia_course_SM.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 78a4fcb69ef90a7fb366d801fc86e67354d1ea8136ec00429d6c1e93fedb238c
  verifiedAt: '2026-11-18T05:52:23.697Z'
  originalArtist: >-
    <a href="//commons.wikimedia.org/wiki/User:Mohammed_Qays"
    title="User:Mohammed Qays">Mohammed Qays</a>
  changes: Resized and converted to WebP
---
> **TL;DR** Mastra는 Gatsby 팀이 만든 Apache 2.0 오픈소스 TypeScript AI 에이전트 프레임워크다. 에이전트·워크플로·메모리·이벨(evals)·MCP를 단일 패키지에 묶어 제공하며, `npm create mastra@latest` 한 줄로 시작할 수 있다. Python 전용 프레임워크(CrewAI 등)를 쓰기 어려운 TypeScript 풀스택 팀에게 현재 가장 현실적인 선택지다.

---

## Mastra란 무엇인가

[Mastra](https://mastra.ai/ai-agent-framework)는 Gatsby 팀이 개발하고 Y Combinator W25 배치를 졸업한 TypeScript 네이티브 AI 에이전트 프레임워크다. 1,300만 달러 투자를 받아 2026년 1월 v1.0을 출시했으며, 2026년 11월 12일 기준 최신 안정 버전은 `@mastra/core 1.83.0`이다. GitHub `mastra-ai/mastra` 저장소는 2026-11-17 관측 기준 스타 29,561개를 기록하고 있다([github.com/mastra-ai](https://github.com/mastra-ai)).

라이선스는 Apache 2.0이며, `ee/` 디렉터리에 한해 Mastra Enterprise License가 별도 적용된다. 엔터프라이즈 범위 기능의 세부 목록은 현재 공식 문서에서 명시적으로 열거되지 않으므로 사용 전 직접 확인이 필요하다.

---

## 핵심 구성 요소

Mastra는 다섯 가지 프리미티브를 하나의 프레임워크 안에 통합한다.

### 1. 에이전트 (Agents)

[공식 문서](https://mastra.ai/ai-agents)에 따르면, Mastra 에이전트는 LLM을 사용해 개방형 작업을 추론·결정·실행한다. 모든 에이전트에는 메모리, 도구 호출, MCP, 로깅, 트레이싱, 이벨 프리미티브가 기본 내장되어 있다.

```typescript
// src/mastra/agents/support-agent.ts
import { Agent } from "@mastra/core/agent";

export const supportAgent = new Agent({
  id: "support-agent",
  name: "Support Agent",
  // instructions, model, tools, memory 옵션을 추가
});
```

### 2. 워크플로 (Workflows)

[워크플로 문서](https://mastra.ai/ai-workflows)는 순차(sequential), 병렬(parallel), 분기(branching), 루프(looping) 실행 패턴을 지원한다고 명시한다. 단일 에이전트가 신뢰성 있게 처리하기 어려운 다단계 프로세스에 명확한 `step` 구조를 제공하는 것이 목적이다.

예컨대 "사용자 문의 → 의도 분류 → 부서별 에이전트 분기 → 응답 생성 → 로그 저장" 같은 흐름을 step 단위로 선언적으로 정의할 수 있다. 프로덕션 환경에서 step 메모이제이션과 자동 재시도가 필요하다면 Inngest에 배포하는 방식이 공식적으로 지원된다. 단, 이 경우 Inngest 자체 요금이 별도로 발생한다.

### 3. 메모리 (Memory)

[이벨·메모리 문서](https://mastra.ai/docs/evals/evals-with-memory)에 세 가지 메모리 유형이 소개되어 있다.

| 유형 | 역할 |
|---|---|
| **Working Memory** | 영구 사용자 사실 저장 |
| **Semantic Recall** | 과거 대화를 벡터 검색으로 불러오기 |
| **Observational Memory** | 세션 히스토리를 압축해 컨텍스트 경량화 |

RAG 파이프라인 없이도 멀티턴 대화 품질을 높이고 싶다면 Semantic Recall부터 활성화하는 것이 현실적인 출발점이다.

### 4. 이벨 (Evals)

에이전트 출력의 품질을 정량화하는 평가 레이어다. 별도 외부 도구 없이 프레임워크 안에서 평가 지표를 정의하고 실행할 수 있다.

### 5. MCP (Model Context Protocol)

[설정 문서](https://mastra.ai/reference/configuration)에 따르면 서버 설정의 `server.mcp`를 통해 에이전트·워크플로·도구를 `/api/mcp` 엔드포인트로 외부에 노출하는 내장 MCP 서버를 구성할 수 있다. 또한 `@mastra/mcp-docs-server` 패키지로 Mastra 전체 문서를 MCP로 로컬 접근할 수 있으며, Cursor, Windsurf, Cline, Claude Code, VS Code 등 MCP를 지원하는 도구와 바로 연동된다.

---

## 빠른 시작

```bash
npm create mastra@latest
```

CLI를 실행하면 `src/mastra/` 디렉터리 아래에 에이전트·도구·워크플로 하위 폴더와, 모든 것을 Mastra 런타임에 등록하는 루트 `index.ts`가 자동으로 생성된다. 추가 보일러플레이트 없이 곧바로 에이전트 로직 작성을 시작할 수 있다.

배포 대상은 Vercel, Netlify, Cloudflare, 독립형 Node 서버를 공식 지원한다.

---

## 대안 프레임워크와 비교

[공식 비교 문서](https://mastra.ai/articles/mastra-vs-eve)를 포함한 1차 출처를 기준으로 정리하면 다음과 같다.

| 프레임워크 | 언어 | 강점 | 한계 |
|---|---|---|---|
| **Mastra** | TypeScript | 에이전트·워크플로·메모리·이벨 통합, MCP 네이티브 | 버전 업속도 빠름, Cloud 가격 미공개 |
| **CrewAI** | Python | 역할 기반 멀티에이전트 | Python 전용 |
| **Vercel AI SDK** | TypeScript | 스트리밍 UI, 모델 계층 | 에이전트 오케스트레이션 프레임워크 아님 |

Vercel AI SDK는 모델·스트리밍 계층이고 Mastra는 에이전트·워크플로 계층이다. 단순 채팅 UI라면 AI SDK만으로 충분하지만, 워크플로·메모리·이벨이 필요한 에이전트 제품을 TypeScript로 구축한다면 두 계층을 함께 쓰는 조합이 현재 가장 일반적인 스택이다([mastra.ai](https://mastra.ai/ai-agent-framework)).

---

## 주의할 점

**버전 고정**: v1.0.0에서 v1.83.0까지 10개월 만에 83개 마이너 버전이 출시됐다. `package.json`에서 버전을 고정(`"@mastra/core": "1.83.0"`)하고, 업그레이드 전 체인지로그를 반드시 확인해야 한다.

**비용 불확실성**: Mastra Cloud 가격은 2026-11-18 기준 공식 가격 페이지에서 확인되지 않았다. 셀프호스트(Apache 2.0 범위)는 무료지만 Cloud 비용은 별도 문의가 필요하다.

**엔터프라이즈 기능 경계**: `ee/` 디렉터리에 적용되는 Mastra Enterprise License 범위가 공식 문서에 명시적으로 열거되어 있지 않다. 상업 프로젝트에서 `ee/` 기능을 사용한다면 라이선스 조건을 직접 검토해야 한다.

**모델 지원 범위**: 공식 사이트는 1,000개 이상의 모델 연결을 언급하나, 이는 Vercel AI SDK 등 외부 프로바이더를 경유하는 간접 지원이 포함된 수치로 보인다. 특정 모델의 Mastra 직접 통합 여부는 프로바이더별로 별도 확인이 필요하다.

---

## 정리

Mastra는 TypeScript 풀스택 개발자가 에이전트 제품을 처음부터 직접 설계하지 않고 빠르게 프로덕션에 올릴 수 있도록 설계된 프레임워크다. 에이전트·워크플로·메모리·이벨·MCP를 단일 패키지에 통합한 구조는 Python 생태계 없이 AI 에이전트를 구축하려는 팀에게 현재 가장 성숙한 선택지 중 하나다. 단, 빠른 버전 업속도와 Cloud 가격 미공개는 프로덕션 도입 전 반드시 고려해야 할 변수다.


## 참고 자료
- [참고 자료 1](https://github.com/mastra-ai)
- [참고 자료 2](https://nhimg.org/mastra-guide)
- [참고 자료 3](https://dev.to/thegdsks/building-a-production-ai-agent-in-typescript-with-mastra-a-2026-step-by-step-37dc)
- [참고 자료 4](https://dev.to/gabrielanhaia/mastra-in-2026-what-it-is-when-to-use-it-and-how-it-compares-2go1)
- [참고 자료 5](https://www.firecrawl.dev/blog/mastra-tutorial)
- [참고 자료 6](https://www.simplerdevelopment.com/blog/what-is-mastra)
- [참고 자료 7](https://callsphere.ai/blog/vw8h-build-ai-agent-mastra-typescript-framework-2026)
- [참고 자료 8](https://www.codeworlds.com/en/collections/mastra)
- [참고 자료 9](https://www.agentlist.top/en/articles/mastra-ai-framework-guide/)
- [참고 자료 10](https://www.ayautomate.com/blog/best-typescript-ai-agent-frameworks)
- [참고 자료 11](https://www.creolestudios.com/ai-voice-agents-pipecat-guide/)
- [참고 자료 12](https://soniox.com/wiki/voice-agent-frameworks)
- [참고 자료 13](https://github.com/pipecat-ai)
- [참고 자료 14](https://micdrop.dev/blog/open-source-voice-agent-frameworks)
- [참고 자료 15](https://github.com/pipecat-ai/pipecat)
- [참고 자료 16](https://docs.pipecat.ai/pipecat/get-started/introduction)
- [참고 자료 17](https://docs.pipecat.ai/overview/introduction)
- [참고 자료 18](https://www.blog.brightcoding.dev/2026/02/18/pipecat-build-real-time-voice-ai-agents-in-minutes)
- [참고 자료 19](https://techsy.io/en/blog/best-open-source-voice-agent-frameworks)
- [참고 자료 20](https://heyclau.de/entry/tools/pipecat)
- [참고 자료 21](https://www.firecrawl.dev/blog/best-web-extraction-tools)
- [참고 자료 22](https://www.firecrawl.dev/blog/best-open-source-web-scraping-libraries)
- [참고 자료 23](https://www.firecrawl.dev/blog)
- [참고 자료 24](https://www.digitalapplied.com/blog/ai-web-scraping-tools-firecrawl-guide-2025)
- [참고 자료 25](https://www.firecrawl.dev/blog/mastering-firecrawl-scrape-endpoint)
- [참고 자료 26](https://www.firecrawl.dev/crawl)
- [참고 자료 27](https://freeapihub.com/blog/firecrawl-tutorial-website-to-llm-data-rag)
- [참고 자료 28](https://www.diego-rodriguez.work/blog/firecrawl-scraper-2026-developers-guide)
- [참고 자료 29](https://starlog.is/articles/automation/firecrawl-firecrawl)
- [참고 자료 30](https://explainx.ai/blog/firecrawl-web-scraping-api-ai-agents-2026)
- [참고 자료 31](https://mastra.ai/)
- [참고 자료 32](https://mastra.ai/articles/ai-agent-workflows)
- [참고 자료 33](https://mastra.ai/reference/configuration)
- [참고 자료 34](https://mastra.ai/articles/mastra-vs-eve)
- [참고 자료 35](https://mastra.ai/docs/evals/evals-with-memory)
- [참고 자료 36](https://mastra.ai/ai-workflows)
- [참고 자료 37](https://mastra.ai/ai-agents)
- [참고 자료 38](https://mastra.ai/docs/getting-started/build-with-ai)
- [참고 자료 39](https://mastra.ai/ai-agent-framework)
- [참고 자료 40](https://www.firecrawl.dev/blog/best-enterprise-scraping-services)
- [참고 자료 41](https://www.firecrawl.dev/blog/best-web-search-apis)
- [참고 자료 42](https://www.firecrawl.dev/blog/best-web-scraping-api)
- [참고 자료 43](https://www.firecrawl.dev/blog/best-free-web-search-apis)
- [참고 자료 44](https://www.firecrawl.dev/pricing)
- [참고 자료 45](https://www.firecrawl.dev/pricing?dub_id=WrjkKRvxWoy9G1wT&gad_source=1&via=zxcvbnm)
- [참고 자료 46](https://www.firecrawl.dev/pricing?extract-pricing=true)
- [참고 자료 47](https://www.firecrawl.dev/pricing.md)

커버 이미지: [Mohammed Qays](https://commons.wikimedia.org/w/index.php?curid=157413772) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
