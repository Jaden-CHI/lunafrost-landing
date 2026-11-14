---
title: 'browser-use: AI 에이전트가 브라우저를 직접 조작하는 오픈소스 프레임워크'
slug: browser-use-ai-agent-browser-automation
date: '2026-11-12'
category: AI Tools
tags:
  - browser-use
  - AI 에이전트
  - 브라우저 자동화
  - 오픈소스
  - Python
  - LLM
  - CDP
description: >-
  MIT 라이선스 Python 라이브러리 browser-use는 LLM 에이전트가 브라우저를 직접 클릭·타이핑·탐색하며 태스크를 완수하는 실행
  레이어입니다. 31개 브라우저 액션, 모든 LLM 호환, 클라우드 옵션까지 — 개발자와 크리에이터를 위한 핵심 정리.
cover: /images/posts/daily-2026-11-12/commons-64390166.webp
published: true
automated: true
sources:
  - 'https://github.com/marc-ko/daily-trending-repo/issues/606'
  - 'https://github.com/marc-ko/daily-trending-repo/issues/604'
  - >-
    https://www.coddykit.com/blog/github-trending-november-2026-from-a-147k-star-spec-driven-toolkit-to-a-2-78-tri-5130021
  - >-
    https://www.coddykit.com/blog/github-trending-november-2026-from-a-110k-star-agent-management-platform-to-a-38-5130017
  - >-
    https://www.coddykit.com/blog/github-trending-november-2026-from-a-40k-star-ai-engineering-hub-to-a-6k-star-ai-5130014
  - >-
    https://www.coddykit.com/blog/github-trending-november-2026-from-alibaba-s-battle-tested-code-review-to-tailsc-5130025
  - 'https://github.com/explore'
  - 'https://en.wikipedia.org/wiki/Atom_(text_editor)'
  - >-
    https://www.coddykit.com/pages/blog-detail?id=5130015&slug=github-trending-november-2026-from-an-8k-star-rust-desktop-agent-to-a-92k-star-w
  - 'https://github.com/kouweizhu/agents-radar/issues/886'
  - 'https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026'
  - 'https://gist.github.com/kevinmichaelchen/9d77b8a681238cc45297dff969686175'
  - >-
    https://shop.zimaspace.com/blogs/tech-ai-hub/top-10-open-source-local-ai-agent-projects-to-watch-in-2026
  - 'https://github.com/topics/local-ai-agent'
  - 'https://github.com/topics/ai-browser'
  - 'https://github.com/topics/ai-browser-agent'
  - 'https://fungies.io/top-github-repositories-ai-agent-frameworks-2026/'
  - >-
    https://www.nocobase.com/en/blog/6-github-top-open-source-ai-tools-for-ai-agents
  - 'https://ai.miraheze.org/wiki/Browser_Use'
  - 'https://github.com/browser-use/browser-use'
  - 'https://www.aipotluck.org/product/browser-use'
  - 'https://github.com/browser-use/browser-use/blob/main/README.md'
  - 'https://github.com/browser-use/browser-use/blob/main/AGENTS.md'
  - 'https://en.wikipedia.org/wiki/Modernizr'
  - 'https://en.wikipedia.org/wiki/PyScript'
  - 'https://en.wikipedia.org/wiki/Floorp'
  - 'https://en.wikipedia.org/wiki/DotNetBrowser'
  - 'https://github.com/D4Vinci/Scrapling?tab=readme-ov-file'
  - 'https://github.com/D4Vinci/Scrapling/blob/main/README.md'
  - 'https://github.com/D4Vinci/Scrapling/blob/main/docs/README_FR.md'
  - 'https://github.com/D4Vinci/Scrapling/blob/main/docs/README_RU.md'
  - 'https://github.com/D4Vinci/Scrapling/blob/main/docs/README_JP.md'
  - 'https://github.com/D4Vinci/Scrapling/blob/main/docs/README_DE.md'
  - 'https://github.com/D4Vinci/Scrapling/blob/main/docs/README_ES.md'
  - 'https://github.com/D4Vinci/Scrapling/blob/main/docs/README_PT_BR.md'
  - 'https://platform.beeknoee.com/github/D4Vinci/Scrapling'
editorialLane: github
recoveredAt: '2026-11-14T02:03:50.921Z'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Therringshaw
  title: Computer motherboard magnified by water.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=64390166'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-64390166
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/9/91/Computer_motherboard_magnified_by_water.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 48e29d6f1e3a5c9996f19807de550a2892b0e643629296ebabb23196c32a1cc5
  verifiedAt: '2026-11-14T02:01:23.670Z'
  originalArtist: >-
    <a
    href="//commons.wikimedia.org/w/index.php?title=User:Therringshaw&amp;action=edit&amp;redlink=1"
    class="new" title="User:Therringshaw (page does not exist)">Therringshaw</a>
  changes: Resized and converted to WebP
---
> 2026-11-12 누락분을 2026-11-14에 보완 발행한 글입니다.

> **TL;DR** `browser-use/browser-use`는 LLM이 웹 브라우저를 직접 제어해 태스크를 완수하는 MIT 라이선스 Python 라이브러리입니다. 31개 브라우저 액션, 모든 함수 호출 지원 LLM과 호환, 로컬 모델(Ollama)도 지원합니다. 데이터 추출 파이프라인인 Crawl4AI와 달리, 에이전트가 브라우저 세션을 자율 제어하는 **실행 레이어**에 해당합니다.

---

## 왜 지금 browser-use인가

AI 에이전트는 텍스트를 생성하는 단계를 넘어, 실제 브라우저를 열고 클릭하고 폼을 입력하고 결과를 가져오는 **행동 에이전트**로 진화하고 있습니다.

지난 Crawl4AI 글이 "웹 페이지를 LLM 데이터로 변환하는 파이프라인"을 다뤘다면, [`browser-use/browser-use`](https://github.com/browser-use/browser-use)는 그 다음 단계입니다. LLM 에이전트가 브라우저 세션을 직접 제어하며 태스크를 완수하는 실행 레이어 — 이것이 browser-use의 핵심입니다.

[GitHub 저장소 공식 설명](https://github.com/browser-use/browser-use)은 이 프로젝트를 다음과 같이 정의합니다:

> "Open-source Python library for AI browser agents, plus Browser Use Cloud: stealth browsers and a hosted agent API."

---

## 프로젝트 기본 정보

| 항목 | 내용 |
|---|---|
| **저장소** | `browser-use/browser-use` |
| **라이선스** | MIT (오픈소스 라이브러리 전체 적용) |
| **주요 언어** | Python (TypeScript 일부) |
| **스타 수** | 109,104 stargazers ([aipotluck.org](https://www.aipotluck.org/product/browser-use), 2026-08-13 관측 기준) |

> **주의:** 복수 출처(109K, 96.8K, 86K 등)가 각기 다른 시점·방법으로 집계해 수치가 불일치합니다. 정확한 현재 스타 수는 [저장소](https://github.com/browser-use/browser-use)에서 직접 확인하세요.

---

## 핵심 기능 — 공식 README 기준

### 세 가지 사용 경로

[공식 README](https://github.com/browser-use/browser-use/blob/main/README.md)는 browser-use를 사용하는 세 가지 경로를 제시합니다:

1. **호스팅 V4 에이전트** — 클라우드에서 바로 실행
2. **Browser Use CLI** — 일회성 태스크에 최적
3. **오픈소스 Python 라이브러리** — 로컬에서 커스터마이징하며 직접 실행

### 31개 브라우저 액션과 CDP 지원

[README](https://github.com/browser-use/browser-use/blob/main/README.md)에 따르면 browser-use는 **31개의 브라우저 액션**을 구현합니다. 로컬 브라우저, Browser Use Cloud 브라우저, 또는 기존 원격 브라우저를 **CDP(Chrome DevTools Protocol)**로 제어할 수 있습니다.

### 모든 LLM과 호환 — 로컬 모델 포함

browser-use는 **함수 호출(function calling) 기능이 있는 모든 LLM과 호환**되는 범용 프레임워크입니다. Ollama 등 로컬 모델을 로컬 브라우저와 함께 사용하는 것도 지원하나, 성능은 하드웨어와 모델 요구사항에 따라 달라집니다.

### Claude 도구셋 연동

[AGENTS.md](https://github.com/browser-use/browser-use/blob/main/AGENTS.md)에 따르면 browser-use는 **Claude용 브라우저 툴셋을 유지 관리**하며, Claude의 브라우저 툴셋을 browser-use를 드라이버로 사용해 연동할 수 있습니다.

---

## 실용 예제 — 공식 README 기반 패턴

### 패턴 A: Python 라이브러리로 로컬 실행

```python
from browser_use import Agent

agent = Agent(task="오늘의 항공편 가격을 찾아서 정리해줘")
await agent.run()
```

오픈소스 Python 라이브러리로 직접 로컬 코드에서 browser-use 에이전트를 실행하는 가장 기본적인 패턴입니다.

### 패턴 B: CLI로 원샷 태스크

README 기준, CLI는 일회성 태스크에 적합합니다. Python 라이브러리는 반복 자동화, 커스텀 툴, 커스텀 시스템 프롬프트, 구조화된 출력, 세밀한 브라우저 제어가 필요한 경우에 사용합니다.

### 패턴 C: Claude 도구셋 연동

browser-use를 드라이버로 삼아 Claude의 브라우저 툴셋과 연결하는 패턴입니다. Claude가 실제 브라우저 액션을 browser-use에 위임하는 구조입니다.

---

## 클라우드 티어와 보안 주의사항

### Browser Use Cloud (선택 사항)

[README](https://github.com/browser-use/browser-use/blob/main/README.md)에 따르면 Browser Use Cloud는 봇 탐지와 CAPTCHA 도전을 줄이기 위해 설계된 **스텔스 브라우저와 프록시**를 제공합니다. `api.browser-use.com`의 v2 REST API를 통해 사용량 기반으로 과금됩니다.

README에는 클라우드 브라우저 사용 요금으로 **시간당 $0.02**가 명시되어 있습니다. 단, 요금 체계는 언제든 변경될 수 있으므로 계약 전 [공식 사이트](https://browser-use.com)에서 반드시 확인하세요.

### 로컬 실행 시 보안 주의

[README 보안 항목](https://github.com/browser-use/browser-use/blob/main/README.md)은 명확히 경고합니다:

> `Browser('chromium')` 또는 Chrome 프로파일을 열면 `127.0.0.1`의 디버깅 포트에 인증 없이 노출됩니다. 공유 머신에서는 다른 로컬 사용자가 해당 브라우저 세션 및 로그인 정보에 접근할 수 있습니다. **컨테이너 또는 Browser Use Cloud 사용을 권장합니다.**

또한 browser-use는 MIT 라이선스로 무료이나, [익명 사용 데이터를 PostHog로 수집](https://github.com/browser-use/browser-use/blob/main/README.md)합니다. 완전한 프라이버시가 필요하다면 텔레메트리 옵션을 확인하세요.

---

## Crawl4AI와 무엇이 다른가

| 비교 항목 | Crawl4AI | browser-use |
|---|---|---|
| **목표** | 웹 페이지 내용을 LLM 입력 데이터로 변환 | AI 에이전트가 브라우저를 직접 제어해 태스크 수행 |
| **동작 방식** | 크롤링 → 마크다운 추출 → LLM 전달 | 에이전트 → 브라우저 액션(클릭/타이핑) → 결과 반환 |
| **실행 주체** | 개발자가 파이프라인 설계 | LLM 에이전트가 브라우저 세션을 자율 제어 |
| **LLM 연결** | RAG, Ollama 등 소비 측 | LLM이 브라우저를 직접 구동하는 행동 측 |

두 도구는 경쟁 관계가 아니라 **파이프라인의 다른 레이어**에 위치합니다. Crawl4AI로 데이터를 수집하고, browser-use로 에이전트가 행동하는 구조를 함께 쓸 수도 있습니다.

---

## 개발자·크리에이터를 위한 체크리스트

- ✅ 반복적인 웹 태스크(가격 조회, 폼 제출, 로그인 후 데이터 수집)를 자동화하고 싶다면 → Python 라이브러리 경로
- ✅ 일회성 테스트나 빠른 프로토타이핑 → CLI 경로
- ✅ CAPTCHA·봇 탐지가 걸리는 사이트 → Cloud 티어 고려 (요금 사전 확인 필수)
- ⚠️ 공유 서버·공용 VM에서 실행 → 디버깅 포트 노출 위험, 컨테이너 격리 권장
- ⚠️ 로컬 LLM(Ollama 등) 사용 → 하드웨어 성능에 따라 결과 품질이 크게 달라짐

---

## 1차 출처

| 출처 | 종류 |
|---|---|
| [github.com/browser-use/browser-use README](https://github.com/browser-use/browser-use/blob/main/README.md) | 1차 (저장소 공식) |
| [github.com/browser-use/browser-use AGENTS.md](https://github.com/browser-use/browser-use/blob/main/AGENTS.md) | 1차 (저장소 공식) |
| [aipotluck.org/product/browser-use](https://www.aipotluck.org/product/browser-use) (2026-08-13 관측) | 2차 (독립 검증) |

> 직접 실행 및 태스크 성공률을 검증하지 않았으므로, 실사용 성능은 개인 환경에서 별도 검증이 필요합니다.


## 참고 자료
- [참고 자료 1](https://github.com/marc-ko/daily-trending-repo/issues/606)
- [참고 자료 2](https://github.com/marc-ko/daily-trending-repo/issues/604)
- [참고 자료 3](https://www.coddykit.com/blog/github-trending-november-2026-from-a-147k-star-spec-driven-toolkit-to-a-2-78-tri-5130021)
- [참고 자료 4](https://www.coddykit.com/blog/github-trending-november-2026-from-a-110k-star-agent-management-platform-to-a-38-5130017)
- [참고 자료 5](https://www.coddykit.com/blog/github-trending-november-2026-from-a-40k-star-ai-engineering-hub-to-a-6k-star-ai-5130014)
- [참고 자료 6](https://www.coddykit.com/blog/github-trending-november-2026-from-alibaba-s-battle-tested-code-review-to-tailsc-5130025)
- [참고 자료 7](https://github.com/explore)
- [참고 자료 8](https://en.wikipedia.org/wiki/Atom_(text_editor))
- [참고 자료 9](https://www.coddykit.com/pages/blog-detail?id=5130015&slug=github-trending-november-2026-from-an-8k-star-rust-desktop-agent-to-a-92k-star-w)
- [참고 자료 10](https://github.com/kouweizhu/agents-radar/issues/886)
- [참고 자료 11](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026)
- [참고 자료 12](https://gist.github.com/kevinmichaelchen/9d77b8a681238cc45297dff969686175)
- [참고 자료 13](https://shop.zimaspace.com/blogs/tech-ai-hub/top-10-open-source-local-ai-agent-projects-to-watch-in-2026)
- [참고 자료 14](https://github.com/topics/local-ai-agent)
- [참고 자료 15](https://github.com/topics/ai-browser)
- [참고 자료 16](https://github.com/topics/ai-browser-agent)
- [참고 자료 17](https://fungies.io/top-github-repositories-ai-agent-frameworks-2026/)
- [참고 자료 18](https://www.nocobase.com/en/blog/6-github-top-open-source-ai-tools-for-ai-agents)
- [참고 자료 19](https://ai.miraheze.org/wiki/Browser_Use)
- [참고 자료 20](https://github.com/browser-use/browser-use)
- [참고 자료 21](https://www.aipotluck.org/product/browser-use)
- [참고 자료 22](https://github.com/browser-use/browser-use/blob/main/README.md)
- [참고 자료 23](https://github.com/browser-use/browser-use/blob/main/AGENTS.md)
- [참고 자료 24](https://en.wikipedia.org/wiki/Modernizr)
- [참고 자료 25](https://en.wikipedia.org/wiki/PyScript)
- [참고 자료 26](https://en.wikipedia.org/wiki/Floorp)
- [참고 자료 27](https://en.wikipedia.org/wiki/DotNetBrowser)
- [참고 자료 28](https://github.com/D4Vinci/Scrapling?tab=readme-ov-file)
- [참고 자료 29](https://github.com/D4Vinci/Scrapling/blob/main/README.md)
- [참고 자료 30](https://github.com/D4Vinci/Scrapling/blob/main/docs/README_FR.md)
- [참고 자료 31](https://github.com/D4Vinci/Scrapling/blob/main/docs/README_RU.md)
- [참고 자료 32](https://github.com/D4Vinci/Scrapling/blob/main/docs/README_JP.md)
- [참고 자료 33](https://github.com/D4Vinci/Scrapling/blob/main/docs/README_DE.md)
- [참고 자료 34](https://github.com/D4Vinci/Scrapling/blob/main/docs/README_ES.md)
- [참고 자료 35](https://github.com/D4Vinci/Scrapling/blob/main/docs/README_PT_BR.md)
- [참고 자료 36](https://platform.beeknoee.com/github/D4Vinci/Scrapling)

커버 이미지: [Therringshaw](https://commons.wikimedia.org/w/index.php?curid=64390166) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
