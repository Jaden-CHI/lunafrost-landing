---
title: n8n 셀프호스트로 AI 에이전트 워크플로 자동화하기
slug: n8n-selfhosted-ai-agent-workflow-automation
date: '2026-11-17'
category: AI Tools
tags:
  - n8n
  - 워크플로자동화
  - AI에이전트
  - 셀프호스트
  - 노코드
  - Ollama
  - fair-code
description: >-
  Zapier 대신 셀프호스트로 AI 에이전트와 워크플로를 직접 운용할 수 있는 fair-code 플랫폼 n8n의 핵심 기능,
  Self-hosted AI Starter Kit, 라이선스 구조를 공식 문서 기반으로 정리했습니다.
cover: /images/posts/daily-2026-11-17/commons-192966211.webp
published: true
automated: true
sources:
  - >-
    https://medium.com/@ayeshha2398/5-ai-video-tools-that-turned-my-gpu-into-a-private-video-studio-in-2026-9258bf8377ab
  - 'https://en.wikipedia.org/wiki/LTX_Studio'
  - 'https://en.wikipedia.org/wiki/Leonardo.ai'
  - 'https://en.wikipedia.org/wiki/LTX_(text-to-video_model)'
  - 'https://en.wikipedia.org/wiki/LTX-2'
  - 'https://www.youtube.com/watch?v=mTLVWgLa_S4'
  - 'https://www.youtube.com/watch?v=SVbhqQ9X9Do'
  - 'https://ltx.io/model/capabilities/audio-generation'
  - >-
    https://github.com/FurkanGozukara/Stable-Diffusion/wiki/Its-Finally-Here-The-First-TRUE-Open-Source-AI-Video-and-Audio-Generator
  - 'https://www.youtube.com/watch?v=eEkbIvwfXw0'
  - 'https://en.wikipedia.org/wiki/AI_browser'
  - 'https://www.youtube.com/watch?v=juJhhmrtJTY'
  - 'https://en.wikipedia.org/wiki/BrowserStack'
  - 'https://www.youtube.com/shorts/V58GblANav8'
  - 'https://www.youtube.com/watch?v=tRTDrzWu95U'
  - 'https://www.youtube.com/watch?v=k9X7kaheMxo'
  - 'https://www.youtube.com/@Browserbots'
  - 'https://en.wikipedia.org/wiki/ChatGPT'
  - 'https://en.wikipedia.org/wiki/Cursor_(code_editor)'
  - >-
    https://github.com/FurkanGozukara/Stable-Diffusion/wiki/Ovi-Generate-Videos-With-Audio-Like-VEO-3-or-SORA-2-Run-Locally-Open-Source-for-Free
  - 'https://en.wikipedia.org/wiki/Kling_AI'
  - 'https://www.youtube.com/watch?v=6SNgxL6mKnQ'
  - 'https://www.youtube.com/watch?v=NZ0OtgBMing'
  - 'https://www.youtube.com/watch?v=jCWPqTDgplk'
  - 'https://www.youtube.com/watch?v=LzPbjWZjPVA'
  - 'https://www.youtube.com/watch?v=1jDEZGjvXbk'
  - 'https://www.youtube.com/watch?v=PfdnYe2690E'
  - 'https://www.youtube.com/watch?v=BJIKdZGJA5s'
  - 'https://www.youtube.com/watch?v=syrQHW6pnto'
  - 'https://www.youtube.com/watch?v=1mbr32JXMYU'
  - 'https://www.youtube.com/watch?v=Yof1n5Qvtu0'
  - 'https://www.youtube.com/watch?v=N6dAAXULoDQ'
  - 'https://gigazine.net/gsc_news/en/20251023-character-ai-ovi/'
  - 'https://vidofy.ai/en/models/ovi'
  - 'https://ovi-ai.org/'
  - 'https://en.wikipedia.org/wiki/Text-to-video_model'
  - 'https://en.wikipedia.org/wiki/Civitai'
  - 'https://magiclight.ai/academy/ovi-ai-review/'
  - 'https://hatchworks.com/blog/ai-agents/n8n-guide/'
  - 'https://automationatlas.io/tools/n8n/'
  - 'https://en.wikipedia.org/wiki/N8n'
  - 'https://github.com/n8n-io/n8n'
  - 'https://docs.n8n.io/advanced-ai/'
  - 'https://docs.n8n.io/deploy/host-n8n/deploy-with-the-ai-starter-kit'
  - 'https://ecn-apps.com/pages/articles/n8n-workflow-automation-guide-2026.html'
  - >-
    https://community.n8n.io/t/introducing-the-ai-assistant-the-workflow-building-agent-inside-n8n/302667?tl=en
  - >-
    https://aiunpacker.com/blog/complete-guide-to-ai-workflow-automation-with-n8n
editorialLane: youtube
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Wolne Wybory / Florian Thery
  title: Tractatus-Politico-Philosophicus AI.v1.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=192966211'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-192966211
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/6/61/Tractatus-Politico-Philosophicus_AI.v1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 19e324729c1266ee63cda13822dcac4f4a28f51eb8ce39a59cc7b92c372cbff3
  verifiedAt: '2026-11-17T06:29:14.494Z'
  originalArtist: >-
    <a href="//commons.wikimedia.org/wiki/User:Wolne_Wybory" title="User:Wolne
    Wybory">Wolne Wybory</a> / Florian Thery
  changes: Resized and converted to WebP
---
> **TL;DR** n8n은 비주얼 캔버스와 커스텀 코드를 함께 쓸 수 있는 fair-code 워크플로 자동화 플랫폼입니다. Zapier·Make와 달리 소스 코드가 공개되어 있고 셀프호스트가 가능하며, Ollama 등과 연동한 로컬 AI 에이전트 구축을 공식 지원합니다. 단, AI Starter Kit는 테스트 전용이므로 프로덕션 투입 전 보안 강화가 필요합니다.

---

## n8n이란 무엇인가

n8n은 베를린의 n8n GmbH가 개발한 워크플로 자동화 플랫폼으로, 셀프호스트 애플리케이션 또는 관리형 클라우드 서비스로 실행됩니다. [위키피디아의 n8n 항목](https://en.wikipedia.org/wiki/N8n)은 이 플랫폼을 "Zapier나 Make의 소스 공개 대안"으로 소개합니다.

[GitHub 저장소 `n8n-io/n8n`](https://github.com/n8n-io/n8n)에 따르면 n8n은 **AI 에이전트와 워크플로를 구축·배포하는 fair-code 플랫폼**으로, 비주얼 캔버스와 커스텀 코드를 결합해 셀프호스트 또는 클라우드에서 실행하며 1,500개 이상의 통합을 지원한다고 명시되어 있습니다.

> ⚠️ 단, 공식 문서 내 여러 페이지에서 400+, 500+ 등 다른 통합 수치가 혼재합니다. 정확한 현황은 [공식 통합 목록](https://n8n.io/integrations)에서 직접 확인하세요.

---

## Zapier·Make와 무엇이 다른가

단순 자동화 툴과의 차이가 n8n의 핵심 가치입니다. [n8n 공식 문서](https://docs.n8n.io/advanced-ai/)에 따르면:

> "Zapier나 Make 같은 플랫폼이 단순성을 강조하는 반면, n8n은 플랫폼 셀프호스트, 커스텀 JavaScript 작성, 모듈식 서브플로우 구축, API 직접 통합, 그리고 네이티브 AI 기능을 제공한다는 점에서 더 나아간다."

정리하면 세 플랫폼의 주요 차이는 다음과 같습니다.

| 항목 | n8n | Zapier | Make |
|---|---|---|---|
| 셀프호스트 | ✅ | ❌ | ❌ |
| 소스 코드 공개 | ✅ (fair-code) | ❌ | ❌ |
| 커스텀 코드 작성 | ✅ JavaScript | 제한적 | 제한적 |
| 로컬 AI 연동 | ✅ Ollama 등 | ❌ | ❌ |

---

## 라이선스와 가격 구조

n8n은 **Sustainable Use License**와 **n8n Enterprise License**의 이중 구조로 배포됩니다. GitHub `n8n-io/n8n`의 LICENSE.md 기준으로 주요 조건은 아래와 같습니다.

- 소스 코드는 항상 공개 상태로 유지됩니다.
- **내부·개인 사용에 한해 셀프호스트는 무료**입니다.
- 호스팅 서비스로 타인에게 재판매하려면 별도 허가가 필요합니다.
- 어디서나 직접 배포할 수 있고, 커스텀 노드와 기능을 추가해 확장할 수 있습니다.

클라우드 유료 플랜도 존재하지만, 구체적인 요금 체계는 [n8n 공식 가격 페이지](https://n8n.io/pricing)에서 직접 확인하세요. 본 글에서는 공식 문서로 검증되지 않은 수치를 별도로 기재하지 않습니다.

---

## AI 기능과 Self-hosted AI Starter Kit

[n8n 고급 AI 문서](https://docs.n8n.io/advanced-ai/)는 n8n으로 구현할 수 있는 AI 기능의 범위를 다음과 같이 설명합니다.

> "자체 챗봇 생성부터 다른 소스의 문서와 데이터를 AI로 처리하는 것까지 가능하다. 이 기능은 클라우드와 셀프호스트 n8n 버전 1.19.4 이상에서 사용 가능하다."

셀프호스트 환경에서 로컬 AI를 바로 실험하고 싶다면 공식 제공되는 **Self-hosted AI Starter Kit**가 출발점이 됩니다. [공식 배포 가이드](https://docs.n8n.io/deploy/host-n8n/deploy-with-the-ai-starter-kit)에 따르면 이 키트는:

- **완전한 로컬 AI 및 로우코드 개발 환경을 부트스트랩하는 오픈 Docker Compose 템플릿**입니다.
- n8n 셀프호스트 플랫폼과 호환 AI 컴포넌트를 결합하여 셀프호스트 AI 워크플로를 바로 구축할 수 있도록 구성되어 있습니다.
- **Ollama**가 포함되어 있어 최신 로컬 LLM을 크로스플랫폼으로 설치·실행할 수 있습니다.

> ⚠️ **중요한 주의사항**: 공식 문서는 이 키트가 **테스트 전용으로 설계**되었으며, 프로덕션 환경에 최적화되어 있지 않으므로 프로덕션 사용 전에 보안 설정 및 강화가 필요하다고 명시하고 있습니다.

---

## 구체적인 활용 예제

공식 문서와 GitHub 기반으로 확인된 사용 시나리오입니다. 아래는 모두 직접 실행한 결과가 아니라, 공식 문서에 명시된 기능 설명을 토대로 한 예시입니다.

### 예제 1: GitHub 이슈 → Slack 알림 AI 요약 워크플로

1. **트리거**: GitHub 노드로 새 이슈 감지
2. **처리**: OpenAI 또는 Ollama 노드로 이슈 내용 요약 생성
3. **출력**: Slack 노드로 채널에 요약문 전송

n8n의 비주얼 캔버스에서 각 노드를 연결하고, 필요한 경우 JavaScript 코드 노드를 삽입해 커스텀 로직을 추가할 수 있습니다.

### 예제 2: AI Starter Kit로 로컬 RAG 에이전트 구성

Docker Compose로 Starter Kit를 실행하면 n8n과 Ollama가 함께 기동됩니다. n8n 캔버스에서 Ollama 노드를 연결하고, 문서 로더 노드로 로컬 PDF나 텍스트 파일을 불러온 뒤 벡터 스토어 노드와 연결하면 로컬 RAG 파이프라인을 구성할 수 있습니다. 외부 API 호출 없이 사내 문서를 처리하는 에이전트가 필요한 개발 팀에게 적합한 구성입니다.

---

## Dify와의 차이: 왜 별도로 살펴봐야 하는가

RAG 챗봇과 LLM 중심 워크플로에 특화된 Dify와 달리, n8n은 **앱 간 범용 자동화**가 핵심입니다. CRM, 이메일, GitHub, 데이터베이스, 슬랙 등 외부 서비스를 연결하는 허브 역할을 하면서 그 위에 AI 레이어를 얹는 구조입니다. 챗봇 자체를 만들기보다 **비즈니스 프로세스 전체를 자동화**하면서 AI 처리를 중간 단계로 삽입하고 싶을 때 n8n이 더 적합합니다.

---

## 시작 전 확인할 사항

- **버전 요건**: AI 기능은 셀프호스트 n8n **v1.19.4 이상**에서 사용 가능합니다 ([공식 문서](https://docs.n8n.io/advanced-ai/)).
- **라이선스 범위**: 내부 사용은 무료이지만 재판매·호스팅 서비스화 시 별도 허가가 필요합니다.
- **AI Starter Kit는 테스트용**: 프로덕션 투입 전 반드시 보안 설정을 별도로 구성해야 합니다 ([배포 가이드](https://docs.n8n.io/deploy/host-n8n/deploy-with-the-ai-starter-kit)).
- **통합 수 수치**: 공식 채널별로 400+~1,500+ 등 혼재하므로 최신 수치는 직접 확인이 필요합니다.

---

n8n은 클라우드 SaaS에 데이터를 올리기 꺼려지는 팀, 또는 Zapier 비용을 줄이면서 AI 자동화를 직접 통제하고 싶은 개발자에게 실질적인 대안입니다. fair-code 모델 덕분에 소스를 직접 수정하거나 커스텀 노드를 추가하는 것도 가능합니다. AI Starter Kit의 Docker Compose 한 번 실행으로 로컬 환경을 빠르게 띄워 볼 수 있으니, 셀프호스트 AI 파이프라인을 검토 중이라면 출발점으로 삼아볼 만합니다.


## 참고 자료
- [참고 자료 1](https://medium.com/@ayeshha2398/5-ai-video-tools-that-turned-my-gpu-into-a-private-video-studio-in-2026-9258bf8377ab)
- [참고 자료 2](https://en.wikipedia.org/wiki/LTX_Studio)
- [참고 자료 3](https://en.wikipedia.org/wiki/Leonardo.ai)
- [참고 자료 4](https://en.wikipedia.org/wiki/LTX_(text-to-video_model))
- [참고 자료 5](https://en.wikipedia.org/wiki/LTX-2)
- [참고 자료 6](https://www.youtube.com/watch?v=mTLVWgLa_S4)
- [참고 자료 7](https://www.youtube.com/watch?v=SVbhqQ9X9Do)
- [참고 자료 8](https://ltx.io/model/capabilities/audio-generation)
- [참고 자료 9](https://github.com/FurkanGozukara/Stable-Diffusion/wiki/Its-Finally-Here-The-First-TRUE-Open-Source-AI-Video-and-Audio-Generator)
- [참고 자료 10](https://www.youtube.com/watch?v=eEkbIvwfXw0)
- [참고 자료 11](https://en.wikipedia.org/wiki/AI_browser)
- [참고 자료 12](https://www.youtube.com/watch?v=juJhhmrtJTY)
- [참고 자료 13](https://en.wikipedia.org/wiki/BrowserStack)
- [참고 자료 14](https://www.youtube.com/shorts/V58GblANav8)
- [참고 자료 15](https://www.youtube.com/watch?v=tRTDrzWu95U)
- [참고 자료 16](https://www.youtube.com/watch?v=k9X7kaheMxo)
- [참고 자료 17](https://www.youtube.com/@Browserbots)
- [참고 자료 18](https://en.wikipedia.org/wiki/ChatGPT)
- [참고 자료 19](https://en.wikipedia.org/wiki/Cursor_(code_editor))
- [참고 자료 20](https://github.com/FurkanGozukara/Stable-Diffusion/wiki/Ovi-Generate-Videos-With-Audio-Like-VEO-3-or-SORA-2-Run-Locally-Open-Source-for-Free)
- [참고 자료 21](https://en.wikipedia.org/wiki/Kling_AI)
- [참고 자료 22](https://www.youtube.com/watch?v=6SNgxL6mKnQ)
- [참고 자료 23](https://www.youtube.com/watch?v=NZ0OtgBMing)
- [참고 자료 24](https://www.youtube.com/watch?v=jCWPqTDgplk)
- [참고 자료 25](https://www.youtube.com/watch?v=LzPbjWZjPVA)
- [참고 자료 26](https://www.youtube.com/watch?v=1jDEZGjvXbk)
- [참고 자료 27](https://www.youtube.com/watch?v=PfdnYe2690E)
- [참고 자료 28](https://www.youtube.com/watch?v=BJIKdZGJA5s)
- [참고 자료 29](https://www.youtube.com/watch?v=syrQHW6pnto)
- [참고 자료 30](https://www.youtube.com/watch?v=1mbr32JXMYU)
- [참고 자료 31](https://www.youtube.com/watch?v=Yof1n5Qvtu0)
- [참고 자료 32](https://www.youtube.com/watch?v=N6dAAXULoDQ)
- [참고 자료 33](https://gigazine.net/gsc_news/en/20251023-character-ai-ovi/)
- [참고 자료 34](https://vidofy.ai/en/models/ovi)
- [참고 자료 35](https://ovi-ai.org/)
- [참고 자료 36](https://en.wikipedia.org/wiki/Text-to-video_model)
- [참고 자료 37](https://en.wikipedia.org/wiki/Civitai)
- [참고 자료 38](https://magiclight.ai/academy/ovi-ai-review/)
- [참고 자료 39](https://hatchworks.com/blog/ai-agents/n8n-guide/)
- [참고 자료 40](https://automationatlas.io/tools/n8n/)
- [참고 자료 41](https://en.wikipedia.org/wiki/N8n)
- [참고 자료 42](https://github.com/n8n-io/n8n)
- [참고 자료 43](https://docs.n8n.io/advanced-ai/)
- [참고 자료 44](https://docs.n8n.io/deploy/host-n8n/deploy-with-the-ai-starter-kit)
- [참고 자료 45](https://ecn-apps.com/pages/articles/n8n-workflow-automation-guide-2026.html)
- [참고 자료 46](https://community.n8n.io/t/introducing-the-ai-assistant-the-workflow-building-agent-inside-n8n/302667?tl=en)
- [참고 자료 47](https://aiunpacker.com/blog/complete-guide-to-ai-workflow-automation-with-n8n)

커버 이미지: [Wolne Wybory / Florian Thery](https://commons.wikimedia.org/w/index.php?curid=192966211) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
