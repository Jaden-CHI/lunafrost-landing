---
title: 'OpenCode 실전 가이드: 터미널 AI 코딩 에이전트'
slug: opencode-terminal-ai-coding-agent-guide
date: '2026-11-04'
category: AI Tools
tags:
  - OpenCode
  - 로컬AI
  - 터미널
  - 오픈소스
  - AI코딩
  - Ollama
  - BYOK
  - CLI
description: >-
  오픈소스 터미널 AI 코딩 에이전트 OpenCode(anomalyco/opencode)의 설치부터 로컬 모델 연결, BYOK 설정까지 공식
  자료 기반으로 정리한 실전 가이드.
cover: /images/posts/daily-2026-11-04/commons-97505111.webp
published: true
automated: true
sources:
  - 'https://en.wikipedia.org/wiki/Qwen'
  - 'https://aiagentstore.ai/ai-agent-news/this-week'
  - 'https://en.wikipedia.org/wiki/Cursor_(code_editor)'
  - 'https://en.wikipedia.org/wiki/ChatGPT'
  - 'https://en.wikipedia.org/wiki/LTX_Studio'
  - 'https://futuretools.io/news'
  - 'https://munderdiffl.in/blog/agent-tools-today-2026-11-02/'
  - 'https://openai.com/index/devday-2026-recap/'
  - 'https://www.thetoolnerd.com/p/10-new-ai-tools-this-week-sentient'
  - 'https://techtwitter.io/blog/other/new-ai-tools-for-developers-october-2026'
  - 'https://github.com/topics/ai-developer-tools'
  - 'https://www.morphllm.com/ai-coding-assistant-open-source'
  - 'https://dev.to/bluehotdog/best-open-source-ai-coding-tools-in-2026-3k57'
  - 'https://github.com/QAInsights/awesome-ai-tools'
  - 'https://huggingface.co/bbougard/activity/all'
  - 'https://pinggy.io/blog/best_open_source_self_hosted_llms_for_coding/'
  - 'https://frontman.sh/blog/best-open-source-ai-coding-tools-2026/'
  - 'https://amux.io/guides/best-self-hosted-ai-coding-tools-2026/'
  - 'https://www.promptquorum.com/power-local-llm/opencode-review'
  - 'https://www.shakudo.io/blog/top-9-workflow-automation-tools'
  - 'https://kestra.io/resources/infrastructure/best-workflow-automation-tools'
  - 'https://www.weweb.io/blog/best-automation-tools'
  - 'https://en.wikipedia.org/wiki/Microsoft_Power_Automate'
  - 'https://riseuplabs.com/workflow-automation-tools/'
  - 'https://en.wikipedia.org/wiki/Flowable'
  - >-
    https://dev.to/siennacols/10-best-workflow-automation-tools-in-2026-that-actually-save-time-50hl
  - 'https://www.vellum.ai/blog/top-low-code-ai-workflow-automation-tools'
  - 'https://pypi.org/user/mrbungie/'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://platform.claude.com/docs/de/build-with-claude/message-threads.md'
  - >-
    https://dev.to/gabrielanhaia/claudes-api-now-holds-your-agents-conversation-for-5-minutes-keep-your-own-copy-3a1e
  - 'https://platform.claude.com/docs/en/build-with-claude/message-threads'
  - 'https://platform.claude.com/docs/id/build-with-claude/message-threads.md'
  - 'https://platform.claude.com/docs/es/build-with-claude/message-threads.md'
  - 'https://platform.claude.com/docs/ko/build-with-claude/message-threads.md'
  - 'https://platform.claude.com/docs/fr/build-with-claude/message-threads.md'
  - 'https://platform.claude.com/docs/pt-BR/build-with-claude/message-threads.md'
  - 'https://platform.claude.com/docs/en/build-with-claude/message-threads.md'
  - 'https://github.com/opencode-2026'
  - 'https://github.com/naqashmunir21/why-opencode'
  - 'https://github.com/opencode-ai/opencode'
  - 'https://pkg.go.dev/github.com/cjairm/devgeta@v1.14.1/internal/apps/opencode'
  - 'https://github.com/huer0625/opencode'
  - 'https://github.com/anomalyco/OpenCode'
  - 'https://github.com/bjcoombs/opencode'
  - >-
    https://dev.to/rosgluk/opencode-quickstart-install-configure-and-use-the-terminal-ai-coding-agent-4kcb
  - >-
    https://www.unite.ai/anthropic-launches-message-threads-beta-for-long-running-agents/
  - 'https://platform.claude.com/docs/api/rate-limits'
  - 'https://www.developersdigest.tech/blog/claude-api-message-threads-2026'
  - 'https://cellcog.ai/blog/claude-message-threads/'
  - 'https://aireiter.com/blog/claude-message-threads-api-guide'
  - >-
    https://platform.claude.com/docs/zh-TW/api/cli/beta/organization/spend_limits/effective
editorialLane: practical
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: 'Peter Shanks from Hobart, Australia'
  title: Green circuit board II (2389301870)
  source: 'https://commons.wikimedia.org/w/index.php?curid=97505111'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: 8083ed6f-6fb8-4029-bebb-4abbacca288b
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/4/43/Green_circuit_board_II_%282389301870%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 9a3429a7b41e04039a7e759332840114f7215aeffe4df85c20858fc54926bfa8
  verifiedAt: '2026-11-04T04:48:00.317Z'
  originalArtist: >-
    <a rel="nofollow" class="external text"
    href="https://www.flickr.com/people/87273935@N00">Peter Shanks</a> from
    Hobart, Australia
  changes: Resized and converted to WebP
---
> **TL;DR** — OpenCode는 MIT 라이선스의 터미널 우선 AI 코딩 에이전트다. 공식 설치 한 줄로 시작하고, Ollama 로컬 모델부터 Claude·OpenAI 같은 클라우드 API(BYOK)까지 75개 이상의 프로바이더를 지원한다. 도구 자체는 무료이며, 비용은 선택한 모델 프로바이더에서만 발생한다.

---

## OpenCode란 무엇인가

[anomalyco/opencode](https://github.com/anomalyco/OpenCode)는 Neovim 사용자 커뮤니티와 terminal.shop 제작팀이 개발한 오픈소스 AI 코딩 에이전트다. 완성도 높은 TUI(터미널 UI)를 갖추고 있으며, IDE나 브라우저 없이 터미널만으로 AI 코딩 워크플로를 완결할 수 있도록 설계되었다.

> ⚠️ GitHub의 `opencode-ai/opencode` 리포지토리는 현재 아카이브(read-only) 상태다. 활성 개발은 **anomalyco/opencode**에서 진행된다. 설치 명령이나 기능은 빠른 릴리스 주기에 따라 변경될 수 있으므로, 항상 [공식 문서](https://github.com/anomalyco/OpenCode)와 changelog를 교차 확인하라.

---

## 설치: 플랫폼별 공식 명령어

공식 README 기준의 설치 방법은 아래와 같다.

### 가장 빠른 시작 — 공식 설치 스크립트

```bash
curl -fsSL https://opencode.ai/install | bash
```

### macOS / Linux (Homebrew)

```bash
brew install anomalyco/tap/opencode
```

Homebrew tap 방식은 `brew upgrade`로 최신 버전을 유지할 수 있어 장기 운영에 편리하다.

### Windows

```powershell
# Scoop
scoop install opencode

# Chocolatey
choco install opencode
```

### Arch Linux

```bash
sudo pacman -S opencode
```

### Docker (CI·격리 환경)

```bash
docker run -it --rm ghcr.io/anomalyco/opencode
```

### Node.js / SDK

```bash
# CLI 전역 설치
npm install -g opencode-ai

# JS/TS SDK
npm install @opencode-ai/sdk
```

데스크톱 앱이 필요하다면 macOS는 `brew install --cask opencode-desktop`, Windows는 공식 `.exe` 설치 파일을 제공한다.

---

## 두 가지 에이전트 모드

OpenCode는 용도에 따라 두 모드를 제공한다.

| 모드 | 목적 | 접근 권한 |
|------|------|-----------|
| `build` | 개발 작업, 코드 생성·수정 (기본값) | 전체 접근 |
| `plan` | 코드베이스 분석, 탐색, 설계 검토 | 읽기 전용 |

`plan` 모드는 파일을 수정하지 않는다. 대형 코드베이스를 먼저 파악하거나, PR 리뷰 전 영향 범위를 점검할 때 유용하다.

---

## 로컬 모델 연결: Ollama·LM Studio·llama.cpp

OpenCode는 75개 이상의 프로바이더를 지원하며, Ollama·LM Studio·llama.cpp를 통한 로컬 추론을 공식 지원한다. API 비용 없이 운영하고 싶다면 로컬 모델이 핵심이다.

### 하드웨어 가이드라인

아래 수치는 유사 에이전트(Cline)의 공개 가이드([morphllm.com](https://www.morphllm.com/ai-coding-assistant-open-source))를 참고한 것이며, OpenCode도 동일한 Ollama 기반 모델 규격에서 동작한다.

| 모델 규모 | 권장 RAM/VRAM |
|-----------|--------------|
| 소형·양자화 모델 | 16–32 GB |
| 중형 코딩 모델 | 32–64 GB |
| 대형 모델 | 64 GB 이상 |

24 GB GPU 또는 32 GB Mac 환경에서는 Qwen 계열 27B 모델을 4비트 양자화(약 16–19 GB)로 실행할 수 있다.

### 로컬 모델 선택 팁

커뮤니티에서는 **Qwen 2.5 Coder 32B**가 많은 코딩 벤치마크에서 GPT-4o와 근접한 성능을 보인다고 평가하지만, 이는 커뮤니티 컨센서스이며 OpenCode 공식 측정값은 아니다. 모델 선택 전 본인의 하드웨어 스펙과 작업 규모를 먼저 확인하라.

---

## BYOK: 클라우드 API 연결

로컬 GPU가 부족하거나 대형 코드베이스를 다뤄야 할 때는 클라우드 API를 키(BYOK, Bring Your Own Key) 방식으로 연결한다. OpenCode 설정 파일은 `~/.config/opencode/`에 위치하며, 모델을 직접 지정할 수 있다.

공식 문서 예시([dev.to](https://dev.to/rosgluk/opencode-quickstart-install-configure-and-use-the-terminal-ai-coding-agent-4kcb))에 따르면 다음과 같은 모델 조합이 소개된다.

- **일상 코딩·버그 수정·PR 리뷰** → `claude-opus-5`
- **대형 코드베이스·멀티 파일 리팩터·긴 에이전트 워크플로** → `kimi-k3`

> 클라우드 API를 사용하면 각 프로바이더(Anthropic, OpenAI, Gemini 등)의 요금이 발생한다. OpenCode 자체는 MIT 라이선스 무료 오픈소스이므로 도구 비용은 없다.

---

## 비용 구조 한눈에 보기

| 운영 방식 | OpenCode 비용 | 모델 비용 | 필요 조건 |
|-----------|--------------|-----------|-----------|
| 로컬 모델 (Ollama 등) | 무료 | 없음 | 충분한 GPU/RAM |
| 클라우드 API (BYOK) | 무료 | 프로바이더 요금 | API 키 |

---

## 개발자·크리에이터가 주목해야 할 이유

터미널 중심 개발 환경을 선호하거나, IDE 플러그인 의존 없이 AI 보조 코딩을 운영하고 싶은 경우 OpenCode는 유력한 선택지다. Docker 지원으로 CI 파이프라인에 통합할 수 있고, JS/TS SDK를 통해 커스텀 자동화 스크립트 안에서 에이전트를 호출하는 것도 가능하다.

단, 프로젝트는 빠른 릴리스 주기를 가지므로 명령어·설정 형식이 바뀔 수 있다. 운영 전 [anomalyco/opencode](https://github.com/anomalyco/OpenCode) 공식 README와 changelog를 반드시 확인하라.


## 참고 자료
- [참고 자료 1](https://en.wikipedia.org/wiki/Qwen)
- [참고 자료 2](https://aiagentstore.ai/ai-agent-news/this-week)
- [참고 자료 3](https://en.wikipedia.org/wiki/Cursor_(code_editor))
- [참고 자료 4](https://en.wikipedia.org/wiki/ChatGPT)
- [참고 자료 5](https://en.wikipedia.org/wiki/LTX_Studio)
- [참고 자료 6](https://futuretools.io/news)
- [참고 자료 7](https://munderdiffl.in/blog/agent-tools-today-2026-11-02/)
- [참고 자료 8](https://openai.com/index/devday-2026-recap/)
- [참고 자료 9](https://www.thetoolnerd.com/p/10-new-ai-tools-this-week-sentient)
- [참고 자료 10](https://techtwitter.io/blog/other/new-ai-tools-for-developers-october-2026)
- [참고 자료 11](https://github.com/topics/ai-developer-tools)
- [참고 자료 12](https://www.morphllm.com/ai-coding-assistant-open-source)
- [참고 자료 13](https://dev.to/bluehotdog/best-open-source-ai-coding-tools-in-2026-3k57)
- [참고 자료 14](https://github.com/QAInsights/awesome-ai-tools)
- [참고 자료 15](https://huggingface.co/bbougard/activity/all)
- [참고 자료 16](https://pinggy.io/blog/best_open_source_self_hosted_llms_for_coding/)
- [참고 자료 17](https://frontman.sh/blog/best-open-source-ai-coding-tools-2026/)
- [참고 자료 18](https://amux.io/guides/best-self-hosted-ai-coding-tools-2026/)
- [참고 자료 19](https://www.promptquorum.com/power-local-llm/opencode-review)
- [참고 자료 20](https://www.shakudo.io/blog/top-9-workflow-automation-tools)
- [참고 자료 21](https://kestra.io/resources/infrastructure/best-workflow-automation-tools)
- [참고 자료 22](https://www.weweb.io/blog/best-automation-tools)
- [참고 자료 23](https://en.wikipedia.org/wiki/Microsoft_Power_Automate)
- [참고 자료 24](https://riseuplabs.com/workflow-automation-tools/)
- [참고 자료 25](https://en.wikipedia.org/wiki/Flowable)
- [참고 자료 26](https://dev.to/siennacols/10-best-workflow-automation-tools-in-2026-that-actually-save-time-50hl)
- [참고 자료 27](https://www.vellum.ai/blog/top-low-code-ai-workflow-automation-tools)
- [참고 자료 28](https://pypi.org/user/mrbungie/)
- [참고 자료 29](https://platform.claude.com/docs/en/release-notes/overview)
- [참고 자료 30](https://platform.claude.com/docs/de/build-with-claude/message-threads.md)
- [참고 자료 31](https://dev.to/gabrielanhaia/claudes-api-now-holds-your-agents-conversation-for-5-minutes-keep-your-own-copy-3a1e)
- [참고 자료 32](https://platform.claude.com/docs/en/build-with-claude/message-threads)
- [참고 자료 33](https://platform.claude.com/docs/id/build-with-claude/message-threads.md)
- [참고 자료 34](https://platform.claude.com/docs/es/build-with-claude/message-threads.md)
- [참고 자료 35](https://platform.claude.com/docs/ko/build-with-claude/message-threads.md)
- [참고 자료 36](https://platform.claude.com/docs/fr/build-with-claude/message-threads.md)
- [참고 자료 37](https://platform.claude.com/docs/pt-BR/build-with-claude/message-threads.md)
- [참고 자료 38](https://platform.claude.com/docs/en/build-with-claude/message-threads.md)
- [참고 자료 39](https://github.com/opencode-2026)
- [참고 자료 40](https://github.com/naqashmunir21/why-opencode)
- [참고 자료 41](https://github.com/opencode-ai/opencode)
- [참고 자료 42](https://pkg.go.dev/github.com/cjairm/devgeta@v1.14.1/internal/apps/opencode)
- [참고 자료 43](https://github.com/huer0625/opencode)
- [참고 자료 44](https://github.com/anomalyco/OpenCode)
- [참고 자료 45](https://github.com/bjcoombs/opencode)
- [참고 자료 46](https://dev.to/rosgluk/opencode-quickstart-install-configure-and-use-the-terminal-ai-coding-agent-4kcb)
- [참고 자료 47](https://www.unite.ai/anthropic-launches-message-threads-beta-for-long-running-agents/)
- [참고 자료 48](https://platform.claude.com/docs/api/rate-limits)
- [참고 자료 49](https://www.developersdigest.tech/blog/claude-api-message-threads-2026)
- [참고 자료 50](https://cellcog.ai/blog/claude-message-threads/)
- [참고 자료 51](https://aireiter.com/blog/claude-message-threads-api-guide)
- [참고 자료 52](https://platform.claude.com/docs/zh-TW/api/cli/beta/organization/spend_limits/effective)

커버 이미지: [Peter Shanks from Hobart, Australia](https://commons.wikimedia.org/w/index.php?curid=97505111) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
