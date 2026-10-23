---
title: Claude 동적 워크플로로 수백 에이전트 병렬 실행하기
slug: claude-managed-agents-dynamic-workflows
date: '2026-10-23'
category: AI Tools
tags:
  - Claude
  - Managed Agents
  - Dynamic Workflows
  - 멀티에이전트
  - AI 자동화
  - Claude Code
description: >-
  2026년 10월 베타 출시된 Claude Managed Agents의 Dynamic Workflows를 활용해 수십~수백 개 에이전트를
  백그라운드에서 병렬 실행하는 방법을 공식 문서 기반으로 정리합니다.
cover: /images/posts/daily-2026-10-23/commons-84921981.webp
published: true
automated: true
sources:
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://developers.openai.com/api/docs/deprecations'
  - 'https://openai.com/index/introducing-our-next-generation-audio-models/'
  - 'https://developers.openai.com/api/docs/models/gpt-4o-audio-preview'
  - 'https://openai.com/index/introducing-the-realtime-api/'
  - 'https://developers.openai.com/api/docs/guides/text-to-speech'
  - 'https://developers.openai.com/api/docs/models/gpt-4o'
  - 'https://openai.com/index/introducing-gpt-realtime/'
  - >-
    https://community.openai.com/t/deprecation-notice-upcoming-model-shutdowns-in-2026/1379553
  - 'https://openai.com/index/hello-gpt-4o/'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://www.anthropic.com/news'
  - 'https://www.anthropic.com/claude-haiku-5-5'
  - 'https://claude.com/docs/cowork/changelog'
  - 'https://code.claude.com/docs/en/changelog'
  - >-
    https://claude.com/resources/articles/were-expanding-the-claude-startups-program-to-help-founders-build
  - 'https://claude.com/resources/articles'
  - 'https://www.anthropic.com/system-cards'
  - 'https://www.anthropic.com/news/announcements'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - 'https://ai.google.dev/gemini-api/docs/deprecations'
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-argon/
  - 'https://blog.google/innovation-and-ai/products/'
  - 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/'
  - 'https://discuss.ai.google.dev/latest?page=1'
  - 'https://blog.google/innovation-and-ai/technology/ai/'
  - >-
    https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/
  - >-
    https://blog.google/innovation-and-ai/products/gemini-app/gemini-4-argon-availability/
  - >-
    https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-at-work/
  - 'https://code.claude.com/docs/en/workflows'
  - 'https://platform.claude.com/cookbook/claude-agent-sdk-08-dynamic-workflows'
  - 'https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration'
  - 'https://platform.claude.com/docs/en/managed-agents/workflow-runs'
  - >-
    https://claude.com/resources/articles/how-an-anthropic-japan-business-development-representative-runs-his-day
  - 'https://platform.claude.com/docs/en/managed-agents/agent-setup'
  - 'https://claude.com/resources'
  - 'https://code.claude.com/docs/en/features-overview'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Krzysztof Gojowy
  title: Microprocessor
  source: 'https://commons.wikimedia.org/w/index.php?curid=84921981'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: d4d3fd65-5a95-4305-8f7b-09a7fa885845
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/0/01/Microprocessor.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 5510f37b22864e9f0827fd4710505c6056d8065d8deef357372fdfc9c1ab121e
  verifiedAt: '2026-10-23T03:20:33.624Z'
  originalArtist: >-
    <a
    href="//commons.wikimedia.org/w/index.php?title=User:Crosstron&amp;action=edit&amp;redlink=1"
    class="new" title="User:Crosstron (page does not exist)">Krzysztof
    Gojowy</a>
  changes: Resized and converted to WebP
---
> **TL;DR** — Claude Managed Agents의 Dynamic Workflows(동적 워크플로)는 2026년 10월 9일 베타 출시된 기능으로, 에이전트가 직접 워크플로 스크립트를 작성하고 서버가 이를 백그라운드에서 실행한다. 단일 컨텍스트 윈도우를 넘는 대규모 작업(계약서 수백 건 검토, 코드베이스 전수 감사 등)에 최적화되어 있으며, 기본 16개 에이전트를 동시에 돌리고 최대 1,000개까지 한 런에서 실행할 수 있다.

---

## 왜 동적 워크플로인가

단일 에이전트는 하나의 컨텍스트 윈도우 안에서 모든 것을 처리해야 한다. 문서가 수십 건만 넘어도 금세 한계에 부딪힌다. 서브에이전트(subagents)를 쓰면 리드 에이전트가 몇 개의 태스크를 위임할 수 있지만, 중간 결과를 리드 에이전트 컨텍스트에 계속 쌓아야 하므로 규모가 커지면 똑같은 병목이 생긴다.

[Anthropic 공식 문서](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)에 따르면 Claude Managed Agents에서 에이전트 간 작업 위임 방식은 세 가지다.

| 방식 | 다음 단계 결정 | 중간 결과 저장 | 스케일 |
|---|---|---|---|
| 단일 에이전트 | Claude (턴마다) | Claude 컨텍스트 | 컨텍스트 윈도우 1개 |
| 서브에이전트 | Claude (턴마다) | 리드 에이전트 컨텍스트 | 한 번에 몇 개 |
| **동적 워크플로** | **스크립트** | **스크립트 변수** | **수십~수백 에이전트/런** |

동적 워크플로에서는 에이전트가 워크플로 스크립트 자체를 작성하고, 이후 실행은 서버가 `workflow run`으로 백그라운드에서 처리한다. 다음 단계를 Claude가 매 턴 판단하지 않아도 되고, 중단된 런은 **같은 세션 내에서 이어서 재개**할 수 있다.

---

## 언제 동적 워크플로를 선택해야 하나

[공식 문서](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)는 아래 세 조건 중 하나라도 해당되면 동적 워크플로를 권장한다.

- 태스크가 **하나의 컨텍스트 윈도우를 초과**할 때
- 검증이 선택적이 아닌 **구조적으로 강제**되어야 할 때
- 오케스트레이션 자체를 **재사용 가능한 형태로 보존**할 가치가 있을 때

그 아래 규모에서는 단일 에이전트나 서브에이전트가 더 단순하고 적절한 도구다. 대표 유스케이스로는 감사(audit), 마이그레이션, 딥 리서치, 교차 검증이 언급된다.

---

## 실행 제약 사항 (베타 기준)

[워크플로 런 공식 문서](https://platform.claude.com/docs/en/managed-agents/workflow-runs)에 명시된 주요 제약은 다음과 같다.

- 런 중에 **사용자 입력을 받을 수 없다** (에이전트 권한 프롬프트·사용 한도 대기 시에만 일시 정지)
- 워크플로 스크립트 자체는 **파일시스템·셸에 직접 접근 불가** (접근은 에이전트만 가능)
- 모듈 로딩(`import()`)은 **지원하지 않는다**
- 기본 최대 **16개 에이전트 동시 실행**, 단일 런당 최대 **1,000개 에이전트**
- 중단된 런은 **새 세션에서는 처음부터 재시작**

Claude Code CLI에서는 `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` 환경변수로 동시 실행 수를 1~256 사이에서 조정할 수 있다 (CLI v2.1.269 이상 필요).

---

## Managed Agents API에서 활성화하기

[공식 문서](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)에 따르면 에이전트 정의의 `multiagent` 필드를 아래처럼 설정하면 된다. `multiagent_20261001` 타입을 사용하면 동적 워크플로는 별도로 비활성화하지 않는 한 기본으로 활성화된다.

```json
{
  "multiagent": {
    "type": "multiagent_20261001",
    "workflows": {
      "type": "enabled"
    }
  }
}
```

각 런의 진행 상황은 세션 이벤트 스트림의 `workflow_run.*` 이벤트로 추적한다. 에이전트가 언제 워크플로를 시작할지 제어하려면 시스템 프롬프트에 명시하면 된다.

> **베타 주의:** 현재 `managed-agents-2026-04-01` 베타 헤더가 필요하다. GA 일정은 미발표 상태다.

---

## Claude Code CLI에서 활성화하기

[Claude Code 공식 문서](https://code.claude.com/docs/en/workflows)에 소개된 마크다운 정의 파일 예시다. `ant apply` CLI로 에이전트를 배포할 때 사용한다.

```markdown
---
name: Contract Reviewer
model: claude-opus-5-5
tools:
  - type: agent_toolset_20260401
multiagent:
  type: multiagent_20261001
  workflows:
    type: enabled
---

You review contracts. When you're asked to review more than a few contracts,
start a workflow run that reads them in parallel and combines the findings.
Review one or two contracts yourself, without a run.
```

시스템 프롬프트에서 "몇 건 이상이면 워크플로를 시작하라"고 명시하는 것이 핵심이다. 에이전트가 스스로 규모를 판단해 워크플로 생성 여부를 결정한다.

---

## 워크플로 스크립트 프리미티브

[공식 쿡북](https://platform.claude.com/cookbook/claude-agent-sdk-08-dynamic-workflows)에서 확인한 주요 프리미티브다. 일반 JavaScript 로직(필터링, 병합, 루프 등)은 토큰 비용 없이 즉시 실행된다.

| 프리미티브 | 역할 |
|---|---|
| `agent(prompt, options)` | 에이전트 1개 생성 |
| `parallel([...])` | 에이전트 배치를 동시 실행, 전부 완료까지 대기 |
| `pipeline(items, stage1, ...)` | 아이템마다 단계를 순차 처리, 아이템 간 병렬 실행 |
| `phase("...")` | 이후 에이전트가 속할 페이즈 지정 |
| `return {...}` | 스크립트 결과값을 세션으로 반환 |

### 예제: 계약서 대량 검토 파이프라인

수백 건의 계약서를 1차 병렬 검토한 뒤, 문제가 있는 건만 2차 교차 검증하는 패턴이다.

```javascript
// 에이전트가 생성하는 워크플로 스크립트 예시
const contracts = ["contract_001.pdf", "contract_002.pdf", /* ... */];

// 1단계: 전체 병렬 1차 검토
phase("initial-review");
const firstPass = await parallel(
  contracts.map(file =>
    agent(`contract_001.pdf를 검토하고 위험 조항을 JSON으로 반환하라. 파일: ${file}`)
  )
);

// JavaScript로 필터링 (토큰 비용 없음)
const flagged = firstPass.filter(r => r.riskScore > 7);

// 2단계: 고위험 건만 교차 검증
phase("cross-validation");
const verified = await parallel(
  flagged.map(item =>
    agent(`다음 위험 분석을 독립적으로 검증하라: ${JSON.stringify(item)}`)
  )
);

return { totalReviewed: contracts.length, flagged: verified };
```

실제 프로덕션에서는 에이전트가 이 스크립트를 직접 작성하므로, 개발자는 에이전트 정의와 시스템 프롬프트만 관리하면 된다.

---

## 옵저버빌리티: OpenTelemetry 연동

[2026년 10월 14일 릴리즈 노트](https://platform.claude.com/docs/en/release-notes/overview)에 따르면 같은 시기에 **OpenTelemetry 익스포트**가 베타로 출시됐다. Messages API 요청과 Managed Agents 세션을 자신의 옵저버빌리티 플랫폼에서 추적할 수 있다.

- Claude SDK는 Python, TypeScript, C#, Go, Java, PHP, Ruby에서 스팬(span)을 발행
- Claude Console에서 OpenTelemetry 대상을 추가하면 API에서 스팬을 수신 가능
- 수백 개 에이전트가 병렬로 뛰는 워크플로를 디버깅할 때 사실상 필수 도구

---

## 정리

동적 워크플로는 "에이전트 하나로 감당 안 되는 규모"를 다루기 위한 구조적 해법이다. 핵심은 오케스트레이션 로직을 스크립트로 분리해 서버가 백그라운드에서 실행한다는 점이며, 덕분에 중간 결과가 리드 에이전트 컨텍스트를 오염시키지 않고 수백 개 에이전트를 안정적으로 조율할 수 있다.

현재 베타 단계이므로 GA 이전에 API 인터페이스가 바뀔 수 있다. 프로덕션 도입 전 [공식 릴리즈 노트](https://platform.claude.com/docs/en/release-notes/overview)를 주기적으로 확인하는 것을 권장한다.


## 참고 자료
- [공식 자료 1](https://developers.openai.com/api/docs/changelog)
- [공식 자료 2](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 3](https://openai.com/index/introducing-our-next-generation-audio-models/)
- [공식 자료 4](https://developers.openai.com/api/docs/models/gpt-4o-audio-preview)
- [공식 자료 5](https://openai.com/index/introducing-the-realtime-api/)
- [공식 자료 6](https://developers.openai.com/api/docs/guides/text-to-speech)
- [공식 자료 7](https://developers.openai.com/api/docs/models/gpt-4o)
- [공식 자료 8](https://openai.com/index/introducing-gpt-realtime/)
- [공식 자료 9](https://community.openai.com/t/deprecation-notice-upcoming-model-shutdowns-in-2026/1379553)
- [공식 자료 10](https://openai.com/index/hello-gpt-4o/)
- [공식 자료 11](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 12](https://platform.claude.com/docs/en/release-notes/overview)
- [공식 자료 13](https://www.anthropic.com/news)
- [공식 자료 14](https://www.anthropic.com/claude-haiku-5-5)
- [공식 자료 15](https://claude.com/docs/cowork/changelog)
- [공식 자료 16](https://code.claude.com/docs/en/changelog)
- [공식 자료 17](https://claude.com/resources/articles/were-expanding-the-claude-startups-program-to-help-founders-build)
- [공식 자료 18](https://claude.com/resources/articles)
- [공식 자료 19](https://www.anthropic.com/system-cards)
- [공식 자료 20](https://www.anthropic.com/news/announcements)
- [공식 자료 21](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 22](https://ai.google.dev/gemini-api/docs/deprecations)
- [공식 자료 23](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-argon/)
- [공식 자료 24](https://blog.google/innovation-and-ai/products/)
- [공식 자료 25](https://blog.google/innovation-and-ai/models-and-research/gemini-models/)
- [공식 자료 26](https://discuss.ai.google.dev/latest?page=1)
- [공식 자료 27](https://blog.google/innovation-and-ai/technology/ai/)
- [공식 자료 28](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)
- [공식 자료 29](https://blog.google/innovation-and-ai/products/gemini-app/gemini-4-argon-availability/)
- [공식 자료 30](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-at-work/)
- [공식 자료 31](https://code.claude.com/docs/en/workflows)
- [공식 자료 32](https://platform.claude.com/cookbook/claude-agent-sdk-08-dynamic-workflows)
- [공식 자료 33](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)
- [공식 자료 34](https://platform.claude.com/docs/en/managed-agents/workflow-runs)
- [공식 자료 35](https://claude.com/resources/articles/how-an-anthropic-japan-business-development-representative-runs-his-day)
- [공식 자료 36](https://platform.claude.com/docs/en/managed-agents/agent-setup)
- [공식 자료 37](https://claude.com/resources)
- [공식 자료 38](https://code.claude.com/docs/en/features-overview)

커버 이미지: [Krzysztof Gojowy](https://commons.wikimedia.org/w/index.php?curid=84921981) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
