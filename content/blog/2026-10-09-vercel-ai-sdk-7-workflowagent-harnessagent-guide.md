---
title: 'Vercel AI SDK 7 완전 분석: WorkflowAgent와 HarnessAgent 실전 가이드'
slug: vercel-ai-sdk-7-workflowagent-harnessagent-guide
date: '2026-10-09'
category: AI Tools
tags:
  - Vercel
  - AI SDK
  - WorkflowAgent
  - HarnessAgent
  - TypeScript
  - 에이전트
description: >-
  2026년 6월 출시된 Vercel AI SDK 7의 핵심 변화인 WorkflowAgent, HarnessAgent, Top-level
  Reasoning을 공식 문서 기반으로 분석합니다. ESM 전용·Node.js 22 요구사항과 마이그레이션 포인트까지 정리했습니다.
cover: /images/posts/vercel-ai-sdk-7-workflowagent-harnessagent-guide/ai-accountability.webp
published: true
automated: true
sources:
  - 'https://vercel.com/blog/ai-sdk-6'
  - 'https://vercel.com/changelog/ai-sdk-7'
  - 'https://community.vercel.com/c/announcements/27'
  - 'https://vercel.com/docs'
  - 'https://community.vercel.com/t/vercel-weekly-2026-08-17/47755'
  - 'https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk'
  - 'https://vercel.com/changelog/chat-sdk-now-includes-ai-sdk-tools'
  - 'https://community.vercel.com/t/vercel-weekly-2026-06-29/44602'
  - 'https://community.vercel.com/t/vercel-weekly-2026-09-21/49532'
  - 'https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python'
  - 'https://vercel.com/i/v0-vs-cursor'
  - 'https://openai.com/index/introducing-upgrades-to-codex/'
  - 'https://help.openai.com/en/articles/20001506-using-openai-models-in-cursor'
  - 'https://code.claude.com/docs/en/changelog'
  - 'https://developers.openai.com/codex/ide'
  - 'https://vercel.com/i/cursor-vs-claude-code'
  - 'https://vercel.com/i/codex-plugins'
  - 'https://vercel.com/changelog/cursor-ai-sdk-harness-adapter'
  - >-
    https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/
  - >-
    https://claude.com/resources/webinars/how-cursor-pioneering-coding-frontiers-claude-opus-4
  - 'https://openai.com/index/cloudflare-openai-agent-cloud/'
  - 'https://vercel.com/i/vercel-ai-gateway-vs-cloudflare-ai-gateway'
  - 'https://claude.com/marketplace/connectors/cloudflare'
  - 'https://vercel.com/i/openrouter-alternatives'
  - 'https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare'
  - 'https://vercel.com/kb/guide/next-js-on-vercel-vs-cloudflare'
  - 'https://vercel.com/blog/fluid-compute-benchmark-results'
  - 'https://vercel.com/i/best-ai-gateways'
  - 'https://vercel.com/kb/guide/vercel-ai-sdk-vs-tanstack-ai'
  - >-
    https://community.openai.com/t/cloudflare-error-1016-origin-dns-error-on-api-openai-com-at-2026-01-07-11-43-utc/1371280
  - 'https://vercel.com/blog/a-new-programming-model-for-durable-execution'
  - 'https://vercel.com/kb/guide/what-is-workflowagent'
  - 'https://vercel.com/kb/guide/ai-gateway-and-ai-sdk'
  - 'https://vercel.com/i/ai-agent-frameworks'
  - 'https://vercel.com/kb/guide/run-research-workspace-vercel'
  - 'https://vercel.com/changelog/page/32'
  - 'https://vercel.com/blog/vercel-ship-2026-recap'
  - 'https://vercel.com/kb/guide/durableagent-to-workflowagent'
coverAlt: AI 시스템의 책임성을 표현한 개념 일러스트
coverCredit:
  author: Google DeepMind / Champ Panupong Techawongthawonas
  source: >-
    https://unsplash.com/photos/diagram-schematic-mWztzk66I7Q
  license: Unsplash License
  licenseUrl: 'https://unsplash.com/license'
  alt: AI 시스템의 책임성을 표현한 개념 일러스트
---
## TL;DR

- Vercel AI SDK 7이 2026년 6월 25일 출시됐다. 주간 다운로드 1,600만 회를 넘긴 메이저 릴리스다.
- **WorkflowAgent**: 서버리스 타임아웃과 프로세스 재시작을 견디는 내구성 있는 에이전트 루프.
- **HarnessAgent**: Cursor, Claude Code, Codex 등 외부 에이전트를 단일 인터페이스로 교체 가능.
- **필수 조건**: Node.js 22 이상 + ESM(`"type": "module"`). CommonJS `require()`는 지원 안 한다.
- AI SDK 6 → 7은 API 이름 변경이 여럿이라 공식 codemod를 먼저 돌리는 게 낫다.

---

## AI SDK 7이 등장한 배경

[AI SDK 7 공식 Changelog](https://vercel.com/changelog/ai-sdk-7)에 따르면, 이번 릴리스는 단순한 모델 호출 라이브러리에서 **프로덕션 에이전트 플랫폼**으로의 전환을 선언한다. 텍스트·오디오·이미지·리얼타임·비디오를 아우르는 멀티모달 파이프라인, 외부 에이전트 런타임 통합, 내구성 있는 실행 환경이 한 번에 들어왔다.

크게 다섯 축으로 정리된다.

1. **에이전트 개발** — 추론 제어, 툴·런타임 컨텍스트, MCP 앱 지원
2. **에이전트 실행** — Tool Approvals, WorkflowAgent, 퍼스트클래스 타임아웃
3. **에이전트 하니스** — Cursor, Claude Code, Codex, Deep Agents, Pi 연결
4. **에이전트 관찰** — 재설계된 텔레메트리, `@ai-sdk/otel`, 스텝 성능 통계
5. **텍스트 이상의 생성** — 안정화된 음성·전사 API, 이미지 생성·편집, 멀티모달 임베딩

---

## WorkflowAgent: 죽지 않는 에이전트 루프

서버리스 환경에서 AI 에이전트를 운영해본 개발자라면 함수 타임아웃에 데인 적이 있을 것이다. WorkflowAgent는 그 문제를 정면으로 해결한다.

[공식 WorkflowAgent 문서](https://vercel.com/kb/guide/what-is-workflowagent)에 따르면, `@ai-sdk/workflow`의 `WorkflowAgent`는 `ToolLoopAgent`와 동일한 에이전트 루프를 실행하되, 각 툴 호출이 `'use step'`으로 표시되어 Vercel Workflow 내 **내구성 있는 스텝**이 된다. 실패한 스텝은 마지막 체크포인트부터 재시도되며, 커스텀 상태 저장소나 폴링 코드를 따로 짤 필요가 없다.

특히 `needsApproval: true`로 표시한 툴은 사람의 응답을 받을 때까지 에이전트를 몇 시간, 며칠이고 일시 중단할 수 있다. 결제 승인, 법무 검토, 관리자 확인처럼 인간-인-더-루프가 필수인 워크플로에 바로 쓸 수 있다는 뜻이다.

```typescript
// ESM 환경 + Node.js 22 이상 필수
import { WorkflowAgent } from '@ai-sdk/workflow';

const agent = new WorkflowAgent({
  model: 'anthropic/claude-sonnet-5.5', // AI Gateway 라우팅
  instructions: '사용자 요청을 단계별로 처리하는 에이전트입니다.',
  tools: {
    processPayment: {
      needsApproval: true, // 승인 전까지 워크플로 일시 중단
      // ... 툴 정의
    },
  },
});
```

> 위 예제는 [공식 WorkflowAgent 문서](https://vercel.com/kb/guide/what-is-workflowagent) 및 [내구성 실행 프로그래밍 모델 포스트](https://vercel.com/blog/a-new-programming-model-for-durable-execution) 기반이다.

---

## HarnessAgent: 에이전트 벤더 락인 탈출

[AI SDK 7 Changelog](https://vercel.com/changelog/ai-sdk-7)에 소개된 **하니스 레이어**는 기존에 확립된 외부 에이전트를 AI SDK 에코시스템 안으로 가져오는 어댑터 계층이다. 현재 지원되는 하니스는 Cursor, Claude Code, Cline, Codex, Deep Agents, Grok Build, OpenCode, Pi다.

핵심 가치는 **애플리케이션 코드를 바꾸지 않고** 하니스만 교체할 수 있다는 점이다. 팀이 Cursor에서 Claude Code로, 또는 반대로 전환할 때 비즈니스 로직 코드를 건드릴 필요가 없다.

```typescript
import { HarnessAgent } from '@ai-sdk/harness/agent';
import { cursor } from '@ai-sdk/harness-cursor';

const agent = new HarnessAgent({
  harness: cursor,
});
```

어댑터 내부에서는 `@ai-sdk/harness-acp`가 Agent Client Protocol(ACP)을 통해 Cursor를 HarnessAgent에 연결한다. [Cursor AI SDK 하니스 어댑터 Changelog](https://vercel.com/changelog/cursor-ai-sdk-harness-adapter)에서 상세 내용을 확인할 수 있다.

---

## 알아야 할 Breaking Changes

[AI Gateway와 AI SDK 통합 문서](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk) 및 공식 Changelog를 종합하면 SDK 6 → 7에서 바뀐 주요 API는 아래와 같다.

| 기능 | AI SDK 6 | AI SDK 7 |
|---|---|---|
| 시스템 지시 | `system` | `instructions` |
| 툴루프 정지 조건 | `stepCountIs` | `isStepCount` |
| 완료 콜백 | `onFinish` / `onStepFinish` | `onEnd` / `onStepEnd` |
| 텔레메트리 | `experimental_telemetry` | `telemetry` |
| 전체 이벤트 스트림 | `result.fullStream` | `result.stream` |
| 최상위 추론 | 미지원 | 지원 |

공식 문서는 별도 codemod와 마이그레이션 스킬을 제공한다. ESM, Node.js 22, `toolsContext`, `runtimeContext`, `finalStep` 등에 대한 마이그레이션 경로가 포함되어 있으니 손으로 하나씩 바꾸기 전에 codemod를 먼저 실행해 보길 권한다.

### Top-level Reasoning

`generateText`와 `streamText`가 이제 최상위 `reasoning` 옵션을 지원한다. OpenAI, Anthropic, Google, Groq, xAI, DeepSeek 등 주요 프로바이더에 **프로바이더 네이티브 설정**으로 매핑된다. 단, 정확한 동작과 파라미터는 프로바이더마다 다를 수 있다는 점은 공식 문서도 명시하고 있다.

### 스코프 툴 컨텍스트 (`toolsContext`)

툴이 `contextSchema`를 선언하면 호출자는 `toolsContext`를 통해 툴별 값만 주입할 수 있다. 서드파티 툴이 자신에게 필요한 시크릿이나 설정만 받게 되어 권한 범위가 명확해진다.

---

## 필수 조건 체크리스트

[공식 문서](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk)에 명시된 사전 조건이다. 이 두 가지를 갖추지 않으면 SDK 자체가 동작하지 않는다.

- **Node.js 22 이상** — SDK가 의존하는 네이티브 fetch 구현과 개선된 `AsyncLocalStorage` 시맨틱이 이전 LTS에 백포트되지 않는다.
- **ESM 전용** — `package.json`에 `"type": "module"` 추가 또는 파일을 `.mjs`로 마이그레이션. CommonJS `require()`는 지원하지 않는다.

레거시 Node.js 18/20 프로젝트를 운영 중이라면 런타임 업그레이드가 선행되어야 한다.

---

## 주의할 점

- **Realtime 음성·비디오 생성**은 아직 `experimental` 상태다. 프로덕션 사용은 권장하지 않는다.
- **Python용 AI SDK**는 현재 퍼블릭 베타로, 안정 API가 보장되지 않는다. [공식 Python SDK 문서](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python)에서 최신 상태를 확인하자.
- **HarnessAgent Cursor 어댑터**는 [OpenAI의 Cursor(SpaceX 인수) 모델 제공 계약 종료 공지](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/) 이슈로 장기 지원 여부가 불분명하다.
- **WorkflowAgent 비용**은 Vercel Workflows 스텝당 과금 구조이므로 공식 요금제 페이지를 직접 확인해야 한다. 리서치 시점 기준 구체적인 가격은 공식 문서에 포함되어 있지 않았다.

---

Vercel AI SDK 7은 TypeScript 스택 위에서 프로덕션 에이전트를 운영하려는 팀에게 실질적인 선택지가 됐다. WorkflowAgent의 내구성 보장과 HarnessAgent의 벤더 중립성은 특히 서버리스 환경에서 반복적으로 마주치는 문제들을 SDK 레벨에서 해결해 준다. 다만 Node.js 22 강제와 ESM 전환이라는 선행 비용은 기존 프로젝트라면 무시할 수 없으니, 마이그레이션 계획을 먼저 세우는 것이 현실적이다.

## 참고 자료
- [공식 자료 1](https://vercel.com/blog/ai-sdk-6)
- [공식 자료 2](https://vercel.com/changelog/ai-sdk-7)
- [공식 자료 3](https://community.vercel.com/c/announcements/27)
- [공식 자료 4](https://vercel.com/docs)
- [공식 자료 5](https://community.vercel.com/t/vercel-weekly-2026-08-17/47755)
- [공식 자료 6](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk)
- [공식 자료 7](https://vercel.com/changelog/chat-sdk-now-includes-ai-sdk-tools)
- [공식 자료 8](https://community.vercel.com/t/vercel-weekly-2026-06-29/44602)
- [공식 자료 9](https://community.vercel.com/t/vercel-weekly-2026-09-21/49532)
- [공식 자료 10](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python)
- [공식 자료 11](https://vercel.com/i/v0-vs-cursor)
- [공식 자료 12](https://openai.com/index/introducing-upgrades-to-codex/)
- [공식 자료 13](https://help.openai.com/en/articles/20001506-using-openai-models-in-cursor)
- [공식 자료 14](https://code.claude.com/docs/en/changelog)
- [공식 자료 15](https://developers.openai.com/codex/ide)
- [공식 자료 16](https://vercel.com/i/cursor-vs-claude-code)
- [공식 자료 17](https://vercel.com/i/codex-plugins)
- [공식 자료 18](https://vercel.com/changelog/cursor-ai-sdk-harness-adapter)
- [공식 자료 19](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/)
- [공식 자료 20](https://claude.com/resources/webinars/how-cursor-pioneering-coding-frontiers-claude-opus-4)
- [공식 자료 21](https://openai.com/index/cloudflare-openai-agent-cloud/)
- [공식 자료 22](https://vercel.com/i/vercel-ai-gateway-vs-cloudflare-ai-gateway)
- [공식 자료 23](https://claude.com/marketplace/connectors/cloudflare)
- [공식 자료 24](https://vercel.com/i/openrouter-alternatives)
- [공식 자료 25](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare)
- [공식 자료 26](https://vercel.com/kb/guide/next-js-on-vercel-vs-cloudflare)
- [공식 자료 27](https://vercel.com/blog/fluid-compute-benchmark-results)
- [공식 자료 28](https://vercel.com/i/best-ai-gateways)
- [공식 자료 29](https://vercel.com/kb/guide/vercel-ai-sdk-vs-tanstack-ai)
- [공식 자료 30](https://community.openai.com/t/cloudflare-error-1016-origin-dns-error-on-api-openai-com-at-2026-01-07-11-43-utc/1371280)
- [공식 자료 31](https://vercel.com/blog/a-new-programming-model-for-durable-execution)
- [공식 자료 32](https://vercel.com/kb/guide/what-is-workflowagent)
- [공식 자료 33](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk)
- [공식 자료 34](https://vercel.com/i/ai-agent-frameworks)
- [공식 자료 35](https://vercel.com/kb/guide/run-research-workspace-vercel)
- [공식 자료 36](https://vercel.com/changelog/page/32)
- [공식 자료 37](https://vercel.com/blog/vercel-ship-2026-recap)
- [공식 자료 38](https://vercel.com/kb/guide/durableagent-to-workflowagent)

커버 이미지: [Google DeepMind / Champ Panupong Techawongthawonas](https://unsplash.com/photos/diagram-schematic-mWztzk66I7Q) · [Unsplash License](https://unsplash.com/license). 본문 이해를 돕기 위한 자료 이미지이며 제품 화면은 아닙니다.
