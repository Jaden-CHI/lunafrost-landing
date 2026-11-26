---
title: 'Plannotator: AI 에이전트 계획을 로컬에서 어노테이션하기'
slug: plannotator-ai-agent-plan-code-review-workspace
date: '2026-11-26'
category: AI Tools
tags:
  - Plannotator
  - AI에이전트
  - 코드리뷰
  - Human-in-the-loop
  - 오픈소스
  - TypeScript
  - Claude Code
  - 개발도구
  - 에이전트워크플로
description: >-
  Claude Code, Codex, Copilot CLI 등 AI 코딩 에이전트가 세운 계획과 diff를 로컬 브라우저에서
  어노테이션·승인·거부하고 피드백을 한 번에 돌려보낼 수 있는 Human-in-the-loop 리뷰 도구 Plannotator를 소개합니다.
cover: /images/posts/daily-2026-11-26/commons-109291350.webp
published: true
automated: true
sources:
  - 'https://trendshift.io/'
  - 'https://note.com/fujimotec/n/n7f7bc9a9a836?hl=en'
  - 'https://gittrend.io/'
  - 'https://githot.dev/en'
  - 'https://gitstock.org/trending/2026-11-26'
  - 'https://gitstock.org/trending/weekly/2026-11-26'
  - 'https://github.day/trending'
  - 'https://githubtrends.app/'
  - 'https://findarepo.com/trending/'
  - 'https://github.com/kouweizhu/agents-radar/issues/858'
  - 'https://github.com/topics/local-ai-agent'
  - 'https://github.com/topics/ai-browser-agent'
  - >-
    https://github.com/yuxiaopeng/Github-Ranking-AI/blob/main/Top100/AI%20Agents.md
  - >-
    https://www.coddykit.com/blog/github-trending-november-2026-from-alibaba-s-battle-tested-code-review-to-tailsc-5130025
  - >-
    https://www.coddykit.com/blog/github-trending-november-2026-from-a-56k-star-chrome-devtools-mcp-to-a-120k-star-5130026
  - 'https://en.wikipedia.org/wiki/OpenClaw'
  - 'https://gittrend.io/monthly/2026-11'
  - 'https://gittrend.io/trending/ai-agent'
  - 'https://github.com/cursor/plugins/blob/main/README.md'
  - 'https://github.com/cursor/plugins'
  - 'https://github.com/cursor/plugins/blob/main/third_party/github/README.md'
  - 'https://github.com/0x7067/plugins'
  - 'https://github.com/codemarc/cursorplugins'
  - 'https://github.com/igor-gorohovsky/plugins'
  - 'https://github.com/roedyrustam/cursorplugins'
  - 'https://github.com/cursor'
  - 'https://github.com/cursor/plugins/tree/main/pstack'
  - 'https://hysenlabs.com/projects/cursor-plugins'
  - 'https://github.com/backnotprop/plannotator'
  - 'https://github.com/backnotprop/plannotator/blob/main/AGENTS.md'
  - 'https://github.com/backnotprop/plannotator/blob/main/apps/copilot/README.md'
  - 'https://awesome.ecosyste.ms/projects/github.com/backnotprop/plannotator'
  - 'https://github.com/backnotprop/plannotator/blob/main/README.md'
  - >-
    https://news.lavx.hu/article/backnotprop-plannotator-a-local-review-workspace-for-coding-agents-2026-11-18
  - 'https://hysenlabs.com/projects/backnotprop-plannotator'
  - 'https://en.wikipedia.org/wiki/OpenAI_Codex_(AI_agent)'
  - >-
    https://explainx.ai/blog/plannotator-plan-code-review-workspace-coding-agents-claude-code-codex-github-trending-2026
  - 'https://en.wikipedia.org/wiki/Codex_(AI_agent)'
  - >-
    https://lzw.me/docs/opencodedocs/backnotprop/plannotator/changelog/release-notes/
  - 'https://newreleases.io/project/github/backnotprop/plannotator/release/v0.8.0'
  - 'https://newreleases.io/project/github/backnotprop/plannotator/release/v0.9.3'
  - >-
    https://newreleases.io/project/github/backnotprop/plannotator/release/v0.27.7
  - >-
    https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.4
  - >-
    https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.5
  - >-
    https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.8
  - >-
    https://newreleases.io/project/github/backnotprop/plannotator/release/v0.27.11
  - >-
    https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.1
  - >-
    https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.0
editorialLane: github
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Mbrickn
  title: C201 Motherboard Back.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=109291350'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-109291350
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/0/0f/C201_Motherboard_Back.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: fcbef7363a7ff45f66e73880c2f80af4f5e0e1cdebc3a7f9e2c856f351c937a9
  verifiedAt: '2026-11-26T06:48:52.624Z'
  originalArtist: >-
    <a href="//commons.wikimedia.org/wiki/User:Mbrickn"
    title="User:Mbrickn">Mbrickn</a>
  changes: Resized and converted to WebP
---
## TL;DR

AI 코딩 에이전트가 계획을 제안하거나 diff를 만들 때, 개발자가 로컬 브라우저에서 마크업·어노테이션·승인·거부를 에이전트에게 한 번에 되돌려줄 수 있는 중간 검토 레이어가 없다는 문제를 **Plannotator**가 해결합니다. Claude Code의 `ExitPlanMode`를 훅으로 가로채 계획 리뷰 UI를 자동으로 열고, git diff나 GitHub PR·GitLab MR도 같은 창에서 코드 리뷰할 수 있습니다. TypeScript로 작성된 MIT/Apache-2.0 오픈소스이며, 사용 텔레메트리를 수집하지 않습니다.

---

## 왜 에이전트 리뷰 레이어가 필요한가

Claude Code, Codex, Copilot CLI, Gemini CLI 같은 AI 코딩 에이전트는 이제 단순한 자동완성을 넘어 "계획(plan) → 실행 → diff 생성"의 전체 사이클을 담당합니다. 문제는 이 흐름이 에디터 터미널과 에이전트 대화창 사이에 흩어져 있다는 점입니다.

- 에이전트가 세운 계획을 한눈에 보면서 특정 단계에 메모를 달기 어렵고
- "이 파일은 건드리지 마" 같은 맥락적 피드백을 한 번에 에이전트에 돌려주는 창구가 없으며
- 팀원과 리뷰 내용을 공유하려면 별도 채널을 써야 했습니다

[Plannotator](https://github.com/backnotprop/plannotator)는 이 갭을 채우는 **로컬 퍼스트 Human-in-the-loop 워크스페이스**입니다.

---

## 핵심 기능

### 계획(Plan) 리뷰

[README 기준](https://github.com/backnotprop/plannotator/blob/main/README.md), Plannotator는 Claude Code의 `ExitPlanMode` 훅을 가로채 에이전트가 계획을 제안하는 순간 마크다운 리뷰 화면을 자동으로 엽니다. 개발자는 이 화면에서:

- 계획의 각 단계에 어노테이션을 달거나
- 전체를 승인하거나
- 수정을 요청하는 피드백을 에이전트에 한 번에 전송할 수 있습니다

에이전트 세션을 블로킹하지 않고 창이 열리기 때문에, 에이전트와의 대화 흐름이 끊기지 않습니다.

### 코드 리뷰

계획 리뷰 외에도 다음 소스를 모두 지원합니다:

| 소스 | 설명 |
|------|------|
| 미커밋 변경사항 | `plannotator review` 명령으로 현재 로컬 diff 로드 |
| GitHub PR URL | PR 링크만 넣으면 diff를 불러와 인라인 코멘트 가능 |
| GitLab MR URL | GitLab도 동일하게 지원 |
| GitButler 활성 워크스페이스 | GitButler 연동 |
| 정적 unified diff 파일 | 파일 직접 로드 |

v0.27.7에서는 Jujutsu fork-point 베이스도 추가되었습니다([릴리스 노트](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.27.7)).

### 내장 AI 리뷰

리뷰 중인 항목에 대해 AI에게 질문하거나, diff 전체에 AI 코멘트를 자동으로 달아주는 기능이 내장되어 있습니다.

### Plannotator Inbox

에이전트 질문·파일·가이드된 리뷰를 하나의 로컬 창에서 처리할 수 있는 Inbox 기능이 있으며, 터미널 기반 옵션(Herdr Annotate, Plannotator TUI)도 포함합니다.

---

## 지원 에이전트

[README](https://github.com/backnotprop/plannotator) 기준 공식 지원 에이전트 목록:

- **Claude Code** (Anthropic)
- **Codex** (OpenAI)
- **Copilot CLI** (GitHub)
- **Gemini CLI** (Google)
- **OpenCode**, **Kiro**, **Droid**, **Amp**, **DeepSeek Harness**, **Pi**

---

## Claude Code 연동 예시

[Copilot README](https://github.com/backnotprop/plannotator/blob/main/apps/copilot/README.md)와 메인 README를 종합한 Claude Code 연동 흐름은 다음과 같습니다.

```bash
# 1. Claude Code 플러그인 마켓플레이스에서 추가
/plugin marketplace add backnotprop/plannotator

# 2. 플러그인 설치
/plugin install plannotator@plannotator
```

설치 후 Claude Code 세션에 `/plannotator-review`, `/plannotator-annotate`, `/plannotator-last` 커맨드가 추가됩니다. 에이전트가 계획을 세우는 순간 리뷰 화면이 자동으로 열리므로 별도 명령 없이도 Human-in-the-loop 루프가 작동합니다.

> **주의**: 위 명령어는 README에서 확인한 내용이며, 버전 업데이트에 따라 달라질 수 있습니다. 반드시 [공식 저장소](https://github.com/backnotprop/plannotator)의 최신 README를 참고하세요.

---

## 릴리스 흐름으로 보는 개발 방향

활발한 유지보수 상태를 릴리스 노트에서 확인할 수 있습니다:

- **[v0.8.0](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.8.0)** (2026-02-13): BSL-1.1 → MIT/Apache-2.0 이중 라이선스로 전환. 완전 오픈소스화.
- **[v0.9.3](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.9.3)**: npm OIDC 프로비넌스 퍼블리싱, VS Code Diff 버튼 추가.
- **[v0.27.7](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.27.7)**: Pi on Windows 호스트 크래시 픽스, Call Flow 트리 캡, Jujutsu 지원. 5개 PR 중 3개가 커뮤니티 기여.
- **[v0.27.11](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.27.11)** (확인된 최신): v0.27.10에서 스크롤 시 자동 파일 뷰 표시·어노테이션 undo/redo, v0.27.9에서 WebMCP 브라우저 에이전트 도구, v0.27.5에서 실행 중인 앱에 직접 어노테이션 기능이 포함됩니다.

v0.27.x 계열에서 커뮤니티 기여가 늘고 있다는 점은 도구의 성숙도를 보여주는 지표입니다.

---

## 프라이버시: 로컬 퍼스트의 의미

[README 프라이버시 섹션](https://github.com/backnotprop/plannotator/blob/main/README.md)에 명시된 내용:

> Plannotator는 사용 텔레메트리나 분석 데이터를 수집하지 않습니다.

단, 로드 시 GitHub에서 최신 릴리스를 확인하는 요청이 발생합니다. 코드 리뷰 내용이나 어노테이션이 외부 서버로 전송되지 않는다는 점은 사내 코드베이스를 다루는 팀에게 중요한 조건입니다.

---

## 어떤 팀에 적합한가

- **AI 에이전트를 적극 사용하되 "에이전트가 임의로 파일을 건드리는 것"을 막고 싶은 개발자**: 계획 리뷰 단계에서 미리 개입할 수 있습니다.
- **PR 리뷰를 에이전트 보조로 하고 싶은 팀**: 내장 AI 리뷰와 GitHub PR 연동을 함께 활용할 수 있습니다.
- **Git 외 워크플로 사용자**: GitButler, Jujutsu, Perforce까지 지원합니다.

---

## 주의할 점

- 최신 버전은 [GitHub 릴리스 페이지](https://github.com/backnotprop/plannotator)에서 직접 확인하세요. 본 글 작성 시점(2026-11-26) 확인 버전은 v0.27.11입니다.
- 스타 수(★15,087)는 [gitstock.org 2026-11-26 관측값](https://gitstock.org/trending/weekly/2026-11-26) 기준이며 이후 변동되었을 수 있습니다.
- 유료 플랜 또는 클라우드 버전 존재 여부는 현재 확인된 범위에서 명시되지 않았습니다. plannotator.ai에서 별도 확인이 필요합니다.

---

에이전트가 더 많은 결정을 대신하는 환경일수록, 개발자가 개입하는 지점의 품질이 중요해집니다. Plannotator는 그 개입 지점을 체계화하는 도구입니다.


## 참고 자료
- [참고 자료 1](https://trendshift.io/)
- [참고 자료 2](https://note.com/fujimotec/n/n7f7bc9a9a836?hl=en)
- [참고 자료 3](https://gittrend.io/)
- [참고 자료 4](https://githot.dev/en)
- [참고 자료 5](https://gitstock.org/trending/2026-11-26)
- [참고 자료 6](https://gitstock.org/trending/weekly/2026-11-26)
- [참고 자료 7](https://github.day/trending)
- [참고 자료 8](https://githubtrends.app/)
- [참고 자료 9](https://findarepo.com/trending/)
- [참고 자료 10](https://github.com/kouweizhu/agents-radar/issues/858)
- [참고 자료 11](https://github.com/topics/local-ai-agent)
- [참고 자료 12](https://github.com/topics/ai-browser-agent)
- [참고 자료 13](https://github.com/yuxiaopeng/Github-Ranking-AI/blob/main/Top100/AI%20Agents.md)
- [참고 자료 14](https://www.coddykit.com/blog/github-trending-november-2026-from-alibaba-s-battle-tested-code-review-to-tailsc-5130025)
- [참고 자료 15](https://www.coddykit.com/blog/github-trending-november-2026-from-a-56k-star-chrome-devtools-mcp-to-a-120k-star-5130026)
- [참고 자료 16](https://en.wikipedia.org/wiki/OpenClaw)
- [참고 자료 17](https://gittrend.io/monthly/2026-11)
- [참고 자료 18](https://gittrend.io/trending/ai-agent)
- [참고 자료 19](https://github.com/cursor/plugins/blob/main/README.md)
- [참고 자료 20](https://github.com/cursor/plugins)
- [참고 자료 21](https://github.com/cursor/plugins/blob/main/third_party/github/README.md)
- [참고 자료 22](https://github.com/0x7067/plugins)
- [참고 자료 23](https://github.com/codemarc/cursorplugins)
- [참고 자료 24](https://github.com/igor-gorohovsky/plugins)
- [참고 자료 25](https://github.com/roedyrustam/cursorplugins)
- [참고 자료 26](https://github.com/cursor)
- [참고 자료 27](https://github.com/cursor/plugins/tree/main/pstack)
- [참고 자료 28](https://hysenlabs.com/projects/cursor-plugins)
- [참고 자료 29](https://github.com/backnotprop/plannotator)
- [참고 자료 30](https://github.com/backnotprop/plannotator/blob/main/AGENTS.md)
- [참고 자료 31](https://github.com/backnotprop/plannotator/blob/main/apps/copilot/README.md)
- [참고 자료 32](https://awesome.ecosyste.ms/projects/github.com/backnotprop/plannotator)
- [참고 자료 33](https://github.com/backnotprop/plannotator/blob/main/README.md)
- [참고 자료 34](https://news.lavx.hu/article/backnotprop-plannotator-a-local-review-workspace-for-coding-agents-2026-11-18)
- [참고 자료 35](https://hysenlabs.com/projects/backnotprop-plannotator)
- [참고 자료 36](https://en.wikipedia.org/wiki/OpenAI_Codex_(AI_agent))
- [참고 자료 37](https://explainx.ai/blog/plannotator-plan-code-review-workspace-coding-agents-claude-code-codex-github-trending-2026)
- [참고 자료 38](https://en.wikipedia.org/wiki/Codex_(AI_agent))
- [참고 자료 39](https://lzw.me/docs/opencodedocs/backnotprop/plannotator/changelog/release-notes/)
- [참고 자료 40](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.8.0)
- [참고 자료 41](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.9.3)
- [참고 자료 42](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.27.7)
- [참고 자료 43](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.4)
- [참고 자료 44](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.5)
- [참고 자료 45](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.8)
- [참고 자료 46](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.27.11)
- [참고 자료 47](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.1)
- [참고 자료 48](https://newreleases.io/project/github/backnotprop/plannotator/release/v0.26.0)

커버 이미지: [Mbrickn](https://commons.wikimedia.org/w/index.php?curid=109291350) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
