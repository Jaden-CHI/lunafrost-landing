---
title: Pipecat로 음성 AI 에이전트 파이프라인 직접 만들기
slug: pipecat-voice-ai-agent-pipeline-guide
date: '2026-11-25'
category: AI Tools
tags:
  - Pipecat
  - 음성AI
  - STT
  - TTS
  - LLM
  - 파이프라인
  - 오픈소스
  - Python
  - 에이전트
description: >-
  Pipecat 1.0으로 STT → LLM → TTS 실시간 음성 대화 에이전트를 구축하는 실전 가이드. 설치부터 완전 로컬 구성까지 검증된
  1차 자료만 담았습니다.
cover: /images/posts/daily-2026-11-25/commons-84529165.webp
published: true
automated: true
sources:
  - 'https://ai.miraheze.org/wiki/Pipecat'
  - 'https://github.com/pipecat-ai'
  - 'https://micdrop.dev/blog/open-source-voice-agent-frameworks'
  - 'https://github.com/pipecat-ai/pipecat'
  - 'https://docs.pipecat.ai/pipecat/get-started/introduction'
  - 'https://docs.pipecat.ai/overview/introduction'
  - >-
    https://www.blog.brightcoding.dev/2026/02/18/pipecat-build-real-time-voice-ai-agents-in-minutes
  - 'https://techsy.io/en/blog/best-open-source-voice-agent-frameworks'
  - 'https://www.everydev.ai/tools/pipecat'
  - 'https://heyclau.de/entry/tools/pipecat'
  - 'https://dupple.com/reviews/huly'
  - 'https://openalternative.co/huly'
  - 'https://betterstack.com/community/guides/linux/huly/'
  - >-
    https://blog.elest.io/self-host-huly-one-open-source-app-to-replace-jira-linear-and-notion/
  - 'https://www.opentechhub.io/huly/'
  - 'https://toolradar.com/guides/best-open-source-project-management-tools'
  - 'https://selfhostedprojectmanagement.com/solutions/huly'
  - 'https://doolpa.com/article/huly'
  - >-
    https://www.pistack.xyz/posts/plane-vs-huly-vs-taiga-self-hosted-project-management-guide-2026/
  - 'https://selfhostedguides.com/huly-project-management-platform/'
  - 'https://www.firecrawl.dev/blog'
  - 'https://www.firecrawl.dev/blog/best-mcp-servers-for-developers'
  - 'https://www.firecrawl.dev/blog/firecrawl-mcp-in-cursor'
  - 'https://glama.ai/mcp/best/web-scraping'
  - 'https://github.com/firecrawl'
  - 'https://espressio.ai/blog/firecrawl-web-scraping-guide-2026/'
  - 'https://www.firecrawl.dev/blog/best-web-search-mcp'
  - 'https://hysenlabs.com/projects/firecrawl-firecrawl-mcp-server'
  - 'https://tokenmix.ai/blog/firecrawl-mcp-server-web-scraping-via-mcp-2026'
  - 'https://futureagi.com/blog/how-to-optimize-pipecat-latency-2026/'
  - 'https://docs.speechmatics.com/integrations-and-sdks/pipecat'
  - 'https://callsphere.ai/blog/vw4h-build-voice-agent-pipecat-self-hosted'
  - 'https://www.arunbaby.com/ai-agents/0018-voice-agent-frameworks/'
  - >-
    https://ai-box.eu/en/news/local-voice-agent-wiring-asr-llm-and-tts-into-a-loop-with-nvidia-pipecat-locally/2603/
  - 'https://docs.pipecat.ai/pipecat/learn/text-to-speech'
  - 'https://www.assemblyai.com/docs/voice-agents/pipecat'
  - 'https://blog.codeminer42.com/building-your-first-voice-agent/'
  - 'https://deepgram.com/blog/build-voice-agent-pipecat-deepgram-flux-stt-tts'
  - 'https://www.channel.tel/blog/voice-ai-pipeline-stt-tts-latency-budget'
  - 'https://docs.pipecat.ai/api-reference/server/services/supported-services'
  - 'https://docs.pipecat.ai/pipecat/fundamentals/service-settings'
  - 'https://docs.pipecat.ai/api-reference/server/services/llm/anannas'
  - 'https://docs.pipecat.ai/llms.txt'
  - 'https://docs.pipecat.ai/pipecat/get-started/quickstart'
  - 'https://docs.pipecat.ai/api-reference/server/services/tts/google'
  - 'https://docs.pipecat.ai/api-reference/server/services/tts/maya'
  - 'https://docs.pipecat.ai/pipecat/features/openai-audio-models-and-apis'
editorialLane: practical
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: 'Jonathan Cutrer from San Angelo, Texas, United States'
  title: B&W motherboard circuits (38855379565).jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=84529165'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-84529165
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/f/fe/B%26W_motherboard_circuits_%2838855379565%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: d1c138ab89cce6f4c883e1361b7ded8ffba5a3d4215f99f6c949e2c98092e53a
  verifiedAt: '2026-11-25T06:57:58.193Z'
  originalArtist: >-
    <a rel="nofollow" class="external text"
    href="https://www.flickr.com/people/47121680@N00">Jonathan Cutrer</a> from
    San Angelo, Texas, United States
  changes: Resized and converted to WebP
---
> **TL;DR** — Pipecat은 STT → VAD → LLM → TTS를 단일 파이프라인으로 오케스트레이션하는 오픈소스 Python 프레임워크입니다. 2026년 4월 v1.0 GA 이후 안정화되었으며, 클라우드 API 조합과 완전 로컬 구성을 모두 지원합니다. 프레임워크 자체는 무료(BSD-2)이고, 비용은 선택한 서비스 프로바이더에서만 발생합니다.

---

## Pipecat이 해결하는 문제

음성 대화 에이전트를 직접 구현하려면 흔히 이런 조각들을 직접 이어 붙여야 합니다.

- 마이크 오디오 스트림 수신
- 발화 구간 감지(VAD)
- 음성 → 텍스트 변환(STT)
- LLM 추론
- 텍스트 → 음성 합성(TTS)
- 결과 오디오 재생
- 사용자 인터럽션 처리

각 단계가 비동기로 동작하고 지연이 쌓이면 대화가 어색해집니다. Pipecat은 이 흐름 전체를 **선언적 파이프라인**으로 묶어 초저지연의 자연스러운 대화를 가능하게 합니다. [공식 소개 페이지](https://docs.pipecat.ai/overview/introduction)에 따르면 AI 서비스, 네트워크 트랜스포트, 오디오 처리를 오케스트레이션해 실시간 대화를 구현한다고 명시되어 있습니다.

---

## 프로젝트 현황

| 항목 | 내용 |
|---|---|
| 라이선스 | BSD-2-Clause (무료) |
| v1.0 GA | 2026년 4월 14일 |
| GitHub 스타 | 17,398개 (2026-11-22 기준, [github.com/pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat)) |
| 포크 | 3,164개 (동일 시점) |
| 지원 서비스 | [150개 이상의 AI 서비스](https://docs.pipecat.ai/api-reference/server/services/supported-services) |
| 언어 | **Python 전용** |

[GitHub README](https://github.com/pipecat-ai/pipecat) 첫 줄에도 Python 전용임이 명시되어 있습니다. TypeScript, Go 등 다른 언어 바인딩은 현재 공식 지원하지 않습니다.

---

## 파이프라인 구조 이해하기

[공식 TTS 문서](https://docs.pipecat.ai/pipecat/learn/text-to-speech)에 명시된 표준 파이프라인은 다음 순서로 구성됩니다.

```
transport.input()
  → STT 서비스
  → context_aggregator.user()
  → LLM 서비스
  → TTS 서비스
  → transport.output()
  → context_aggregator.assistant()
```

각 노드는 프레임(오디오 청크, 텍스트 토큰, 함수 호출 결과 등)을 비동기로 주고받습니다. 덕분에 LLM이 첫 토큰을 내보내는 순간 TTS가 즉시 합성을 시작해 체감 지연을 줄입니다.

---

## 설치 및 Quickstart

[공식 Quickstart](https://docs.pipecat.ai/pipecat/get-started/quickstart)는 Deepgram(STT) + OpenAI GPT(LLM) + Cartesia(TTS) 조합을 기본으로 사용합니다. 필요한 서비스 extra만 골라 설치합니다.

```bash
pip install "pipecat-ai[deepgram,openai,cartesia]" python-dotenv
```

> ⚠️ Pipecat은 버전마다 API가 변경될 수 있습니다. 아래 코드는 공식 Quickstart 문서의 구조를 기반으로 하며, 실제 실행 전 [docs.pipecat.ai/pipecat/get-started/quickstart](https://docs.pipecat.ai/pipecat/get-started/quickstart)에서 최신 버전을 확인하세요.

```python
import os
from pipecat.services.deepgram.stt import DeepgramSTTService
from pipecat.services.openai.responses.llm import OpenAIResponsesLLMService
from pipecat.services.cartesia.tts import CartesiaTTSService
from pipecat.pipeline.pipeline import Pipeline

stt = DeepgramSTTService(api_key=os.getenv("DEEPGRAM_API_KEY"))
llm = OpenAIResponsesLLMService(api_key=os.getenv("OPENAI_API_KEY"))
tts = CartesiaTTSService(api_key=os.getenv("CARTESIA_API_KEY"))

pipeline = Pipeline([stt, llm, tts])
```

각 서비스는 API 키만 교체하면 [지원 서비스 카탈로그](https://docs.pipecat.ai/api-reference/server/services/supported-services)의 다른 프로바이더로 바꿀 수 있습니다. LLM 프로바이더는 Anthropic, Azure, DeepSeek, Fireworks AI, Google Vertex AI, Ollama 등을 지원합니다.

---

## 완전 로컬 구성: 비용 없이 돌리기

[callsphere.ai 튜토리얼](https://callsphere.ai/blog/vw4h-build-voice-agent-pipecat-self-hosted)에서 소개된 방식으로, 외부 API 없이 로컬에서만 동작하는 구성도 가능합니다. 공식 문서도 이 조합이 가능함을 확인합니다.

| 역할 | 로컬 도구 |
|---|---|
| VAD | Silero VAD |
| STT | Deepgram(로컬 모드) 또는 대안 |
| LLM | Ollama (OpenAI 호환 엔드포인트) |
| TTS | Piper TTS (HTTP 서버 모드) |
| 트랜스포트 | SmallWebRTC |

Ollama는 `base_url="http://127.0.0.1:11434/v1"`로 OpenAI 호환 엔드포인트를 제공하므로, `OpenAILLMService`의 베이스 URL만 교체하면 됩니다. Piper TTS는 HTTP 서버 모드로 실행하면 Pipecat이 HTTP 클라이언트로 연결합니다.

> Piper TTS 모델명과 설치 호환성은 직접 실행 없이 최신 상태를 확인하기 어렵습니다. [Piper 공식 저장소](https://github.com/rhasspy/piper)에서 현재 지원 모델을 확인하세요.

---

## 비용 구조

| 항목 | 비용 |
|---|---|
| Pipecat 프레임워크 | 무료 (BSD-2) |
| Pipecat Cloud | [에이전트 분당 $0.01~$0.03, PSTN $0.018](https://docs.pipecat.ai/pipecat/get-started/introduction) (2026-01 GA) |
| Deepgram, Cartesia 등 | 각 서비스 요금 별도 |
| 완전 로컬 구성 | 추가 비용 없음 |

오픈소스 코어는 Pipecat Cloud 구독 없이 어디서나 실행할 수 있습니다. Pipecat Cloud는 관리형 배포가 필요할 때 선택지입니다.

---

## 알아두어야 할 한계

**Python 전용:** [README](https://github.com/pipecat-ai/pipecat)에 명시된 대로 프레임워크는 Python만 지원합니다. Node.js, Go 등 다른 언어 환경과 직접 통합은 불가능합니다.

**한국어 지원:** 공식 서비스 카탈로그에 Sarvam AI, FunASR 등 다국어 서비스가 목록에 있으나, 한국어 STT/TTS 조합의 지원 여부는 1차 자료에서 별도 검증되지 않았습니다. 사용 전 각 서비스의 공식 문서를 직접 확인하세요.

**API 변경:** [공식 문서](https://docs.pipecat.ai/pipecat/get-started/quickstart)에 명시된 대로 Pipecat API는 자주 변경되므로 코드를 복사하기 전 반드시 최신 Quickstart를 확인해야 합니다.

---

## 대안 비교

[micdrop.dev의 오픈소스 음성 에이전트 프레임워크 비교](https://micdrop.dev/blog/open-source-voice-agent-frameworks)에 따르면 유사한 프레임워크로 다음이 있습니다.

- **LiveKit Agents** — 대규모 배포 및 네이티브 전화망 연결에 강점
- **TEN Framework** — 멀티모달 그래프 오케스트레이션에 적합
- **Bolna** — 당일 전화 에이전트 배포에 최적화

Pipecat의 차별점은 단일 에이전트부터 핸드오프·병렬 팬아웃·공유 버스 기반 멀티 에이전트까지 같은 프레임워크 위에서 구성할 수 있다는 점입니다. [공식 소개](https://docs.pipecat.ai/overview/introduction)에서 이를 명시하고 있습니다.

---

## 시작하기 전 체크리스트

1. Python 환경 준비 (공식 문서에서 최소 버전 확인)
2. 사용할 STT/LLM/TTS 서비스의 API 키 발급
3. `pip install "pipecat-ai[...]"` 로 필요한 extra만 설치
4. [docs.pipecat.ai/pipecat/get-started/quickstart](https://docs.pipecat.ai/pipecat/get-started/quickstart)에서 현재 버전 Quickstart 코드 확인
5. 로컬 테스트 후 Pipecat Cloud 또는 자체 서버 배포 여부 결정

NVIDIA는 [Pipecat 위에 ACE Controller 로봇 운영체제를 구축](https://ai.miraheze.org/wiki/Pipecat)했을 만큼 프레임워크의 범용성이 검증되어 있습니다. 음성 대화 에이전트를 직접 만들어보고 싶다면 Pipecat은 현재 가장 성숙한 오픈소스 선택지 중 하나입니다.

## 참고 자료
- [참고 자료 1](https://ai.miraheze.org/wiki/Pipecat)
- [참고 자료 2](https://github.com/pipecat-ai)
- [참고 자료 3](https://micdrop.dev/blog/open-source-voice-agent-frameworks)
- [참고 자료 4](https://github.com/pipecat-ai/pipecat)
- [참고 자료 5](https://docs.pipecat.ai/pipecat/get-started/introduction)
- [참고 자료 6](https://docs.pipecat.ai/overview/introduction)
- [참고 자료 7](https://www.blog.brightcoding.dev/2026/02/18/pipecat-build-real-time-voice-ai-agents-in-minutes)
- [참고 자료 8](https://techsy.io/en/blog/best-open-source-voice-agent-frameworks)
- [참고 자료 9](https://www.everydev.ai/tools/pipecat)
- [참고 자료 10](https://heyclau.de/entry/tools/pipecat)
- [참고 자료 11](https://dupple.com/reviews/huly)
- [참고 자료 12](https://openalternative.co/huly)
- [참고 자료 13](https://betterstack.com/community/guides/linux/huly/)
- [참고 자료 14](https://blog.elest.io/self-host-huly-one-open-source-app-to-replace-jira-linear-and-notion/)
- [참고 자료 15](https://www.opentechhub.io/huly/)
- [참고 자료 16](https://toolradar.com/guides/best-open-source-project-management-tools)
- [참고 자료 17](https://selfhostedprojectmanagement.com/solutions/huly)
- [참고 자료 18](https://doolpa.com/article/huly)
- [참고 자료 19](https://www.pistack.xyz/posts/plane-vs-huly-vs-taiga-self-hosted-project-management-guide-2026/)
- [참고 자료 20](https://selfhostedguides.com/huly-project-management-platform/)
- [참고 자료 21](https://www.firecrawl.dev/blog)
- [참고 자료 22](https://www.firecrawl.dev/blog/best-mcp-servers-for-developers)
- [참고 자료 23](https://www.firecrawl.dev/blog/firecrawl-mcp-in-cursor)
- [참고 자료 24](https://glama.ai/mcp/best/web-scraping)
- [참고 자료 25](https://github.com/firecrawl)
- [참고 자료 26](https://espressio.ai/blog/firecrawl-web-scraping-guide-2026/)
- [참고 자료 27](https://www.firecrawl.dev/blog/best-web-search-mcp)
- [참고 자료 28](https://hysenlabs.com/projects/firecrawl-firecrawl-mcp-server)
- [참고 자료 29](https://tokenmix.ai/blog/firecrawl-mcp-server-web-scraping-via-mcp-2026)
- [참고 자료 30](https://futureagi.com/blog/how-to-optimize-pipecat-latency-2026/)
- [참고 자료 31](https://docs.speechmatics.com/integrations-and-sdks/pipecat)
- [참고 자료 32](https://callsphere.ai/blog/vw4h-build-voice-agent-pipecat-self-hosted)
- [참고 자료 33](https://www.arunbaby.com/ai-agents/0018-voice-agent-frameworks/)
- [참고 자료 34](https://ai-box.eu/en/news/local-voice-agent-wiring-asr-llm-and-tts-into-a-loop-with-nvidia-pipecat-locally/2603/)
- [참고 자료 35](https://docs.pipecat.ai/pipecat/learn/text-to-speech)
- [참고 자료 36](https://www.assemblyai.com/docs/voice-agents/pipecat)
- [참고 자료 37](https://blog.codeminer42.com/building-your-first-voice-agent/)
- [참고 자료 38](https://deepgram.com/blog/build-voice-agent-pipecat-deepgram-flux-stt-tts)
- [참고 자료 39](https://www.channel.tel/blog/voice-ai-pipeline-stt-tts-latency-budget)
- [참고 자료 40](https://docs.pipecat.ai/api-reference/server/services/supported-services)
- [참고 자료 41](https://docs.pipecat.ai/pipecat/fundamentals/service-settings)
- [참고 자료 42](https://docs.pipecat.ai/api-reference/server/services/llm/anannas)
- [참고 자료 43](https://docs.pipecat.ai/llms.txt)
- [참고 자료 44](https://docs.pipecat.ai/pipecat/get-started/quickstart)
- [참고 자료 45](https://docs.pipecat.ai/api-reference/server/services/tts/google)
- [참고 자료 46](https://docs.pipecat.ai/api-reference/server/services/tts/maya)
- [참고 자료 47](https://docs.pipecat.ai/pipecat/features/openai-audio-models-and-apis)

커버 이미지: [Jonathan Cutrer from San Angelo, Texas, United States](https://commons.wikimedia.org/w/index.php?curid=84529165) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
