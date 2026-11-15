---
title: 'DeepSeek App API: 웹검색·파일·음성을 단일 엔드포인트로'
slug: deepseek-app-tools-api-web-search-file-voice
date: '2026-11-15'
category: AI Tools
tags:
  - DeepSeek
  - API
  - 웹검색
  - 음성
  - 파일파싱
  - OCR
  - 개발자도구
description: >-
  2026년 11월 13일 공개된 DeepSeek App Tools API를 분석합니다. 웹검색·파일 파싱·URL
  읽기·OCR·음성(ASR/TTS)을 단일 엔드포인트로 통합해 오케스트레이션 오버헤드를 줄이는 방법을 정리했습니다.
cover: /images/posts/daily-2026-11-15/commons-95608091.webp
published: true
automated: true
sources:
  - 'https://en.wikipedia.org/wiki/ChatGPT'
  - 'https://releasebot.io/updates/openai'
  - 'https://en.wikipedia.org/wiki/GPT_Image'
  - 'https://releasebot.io/updates/openai/chatgpt'
  - 'https://openai.com/index/introducing-images-2-6/'
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://spyingbee.com/updates/openai/2026-11'
  - 'https://www.gptmap.org/en/posts/openai-models-release-notes'
  - 'https://ashutoshai.com/ai-compass/2026/11/13/'
  - 'https://github.com/jqueryscript/anthropic-claude-timeline'
  - 'https://platform.claude.com/docs/en/release-notes/overview.md'
  - 'https://docs.anthropic.com/en/release-notes/api'
  - 'https://releasebot.io/updates/anthropic/claude-developer-platform'
  - 'https://releasebot.io/updates/anthropic/claude'
  - 'https://en.wikipedia.org/wiki/Anthropic'
  - 'https://status.claude.com/'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://en.wikipedia.org/wiki/GPT-5.5'
  - 'https://en.wikipedia.org/wiki/GitHub_Copilot'
  - 'https://github.com/joshjohanning/github-changelog-weekly/issues/89'
  - 'https://releasebot.io/updates/github'
  - 'https://github.blog/changelog/'
  - >-
    https://github.blog/changelog/2026-11-13-github-enterprise-server-support-in-the-github-copilot-app/
  - 'https://releases.sh/github'
  - >-
    https://dev.classmethod.jp/en/articles/github-copilot-model-deprecation-nov-2026/
  - 'https://note.com/aitrendlab/n/n81514038aebb?hl=en'
  - 'https://agenticindex.io/change-log/github-copilot'
  - >-
    https://dev.to/sascha-ms/claude-message-threads-api-agent-loops-in-typescript-68o
  - >-
    https://dev.to/sueun-dev/claude-message-threads-send-only-new-messages-on-long-agent-loops-4b0g
  - >-
    https://dev.to/gabrielanhaia/claudes-api-now-holds-your-agents-conversation-for-5-minutes-keep-your-own-copy-3a1e
  - >-
    https://dev.to/paullovelace/claude-api-message-threads-stop-resending-the-whole-conversation-explained-honestly-3moa
  - 'https://claude.com/resources/articles/message-threads'
  - 'https://x.com/ClaudeDevs/status/2117332449382510884'
  - 'https://www.digitalapplied.com/blog/claude-message-threads-messages-api-beta'
  - 'https://cellcog.ai/blog/claude-message-threads/'
  - 'https://thomas-wiegold.com/blog/claude-message-threads/'
  - 'https://claude-world.com/articles/claude-api-message-threads/'
  - >-
    https://www.kucoin.com/news/flash/deepseek-expands-api-toolkit-with-new-model-and-standalone-features
  - 'https://casrai.org/news/deepseek-app-capabilities-api-2026'
  - >-
    https://pasqualepillitteri.it/en/news/33409/deepseek-chat-demo-open-source-chat-client
  - 'https://www.webpronews.com/deepseek-api-web-search-ocr-speech-tools-pricing'
  - 'https://cellcog.ai/blog/deepseek-api-web-search-voice-tools/'
  - >-
    https://startupfortune.com/deepseek-turns-its-whole-app-into-an-api-with-search-file-reading-voice-and-safety-built-in/
  - >-
    https://www.zeniteq.com/news/deepseek-opens-its-app-tools-to-api-developers-pb4jh4
  - 'https://offloop.org/learn/what-is-deepseek-app-api'
editorialLane: updates
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: mikemacmarketing
  title: Artificial Intelligence & AI & Machine Learning.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=95608091'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-95608091
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/f/f3/Artificial_Intelligence_%26_AI_%26_Machine_Learning.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 60cd5f8296fb458ccb766ef5ba9dc2fdf4570b6312ce69c66ca15fc1bfd8999a
  verifiedAt: '2026-11-15T04:45:20.611Z'
  originalArtist: mikemacmarketing
  changes: Resized and converted to WebP
---
> **TL;DR** — DeepSeek가 2026년 11월 13일 App Tools API를 공개했다. 웹검색·파일 파싱·URL 읽기·OCR·음성(ASR/TTS)을 하나의 엔드포인트로 처리할 수 있다. 모델 ID는 `deepseek-flash`, 프로토콜은 OpenAI Chat Completions·Responses API·Anthropic Messages 세 가지를 지원한다. 웹검색은 1,000건당 $0.75, 파일 파싱·OCR은 1,000페이지당 $0.225로 책정됐다고 복수의 보도가 전한다(가격은 `platform.deepseek.com` 가격 페이지에서 최신 여부를 직접 확인 권장).

---

## 왜 지금 주목해야 하는가

검색 기능, 파일 읽기, 음성 변환이 모두 포함된 AI 어시스턴트를 만들려면 지금까지 여러 벤더 SDK를 별도로 연결해야 했다. 검색 API, 문서 파서, STT/TTS 서비스를 각각 계약하고, 각 단계의 에러 핸들링과 비용을 따로 관리해야 했다.

[DeepSeek는 2026년 11월 13일 "Full-Suite App API Release"를 발표](https://casrai.org/news/deepseek-app-capabilities-api-2026)하며 App에서 작동하던 도구 스택 전체를 API로 열었다. [검색·파일 추출 같은 복잡한 작업을 DeepSeek 서버에 위임함으로써 오케스트레이션 오버헤드를 줄일 수 있다](https://www.zeniteq.com/news/deepseek-opens-its-app-tools-to-api-developers-pb4jh4)는 것이 공식 발표의 핵심 메시지다.

---

## 내장 도구 (Built-in Features)

[공식 발표에 따르면](https://casrai.org/news/deepseek-app-capabilities-api-2026) `deepseek-flash` 모델 요청에 도구를 선언하면 다음 기능이 서버 측에서 자동으로 실행된다.

| 기능 | 파라미터 | 비고 |
|---|---|---|
| 웹검색 (인용 포함) | `deepseek_web_search` | non-thinking 모드 전용 |
| 딥 싱킹 검색 | — | 멀티스텝 추론 중 페이지 읽기 |
| 파일 입력 | — | PDF·Office·이미지를 컨텍스트로 파싱 |
| URL 읽기 | `deepseek_read_url` | 사용자 메시지의 링크를 직접 가져옴 |
| 안전 검사 | — | 입출력 스크리닝 내장 |

응답은 thinking, 검색 단계, 페이지 읽기, 인용 텍스트, 거부 등 구조화된 블록으로 반환되기 때문에, 앱 UI에서 각 단계를 사용자에게 단계별로 표시하는 것이 가능하다.

> ⚠️ **제한**: 웹검색(인용 포함)은 non-thinking 모드에서만 작동한다. thinking 모드와 동시에 사용할 수 없다.

---

## 독립형(Standalone) 엔드포인트

도구 호출 타이밍을 코드가 직접 결정하는 파이프라인을 위해, [DeepSeek는 Search, Fetch, OCR, ASR(음성→텍스트), TTS(텍스트→음성)를 별도 독립형 API로도 제공한다](https://startupfortune.com/deepseek-turns-its-whole-app-into-an-api-with-search-file-reading-voice-and-safety-built-in/). 내장 도구로 처리하기 어려운 배치 파이프라인이나, 특정 단계에서만 OCR을 쓰고 싶은 경우에 적합하다.

> ⚠️ 독립형 ASR/TTS의 언어 지원 범위(한국어 포함 여부)는 1차 문서에서 확인되지 않았다. 프로덕션 적용 전 공식 문서 확인이 필요하다.

---

## 세 가지 프로토콜 엔드포인트

[개발자는 세 가지 프로토콜 중 현재 스택에 맞는 것을 선택할 수 있다](https://casrai.org/news/deepseek-app-capabilities-api-2026).

- **OpenAI Chat Completions** — `api.deepseek.com/chat/completions`
- **Responses API** — `api.deepseek.com/responses`
- **Anthropic 호환 Messages** — `api.deepseek.com/anthropic/v1/messages`

OpenAI SDK나 Anthropic SDK를 이미 사용 중이라면 `base_url`만 교체해 기존 코드를 그대로 활용할 수 있다.

---

## 코드 예제

### 내장 웹검색 활성화 (Chat Completions 형식)

```json
{
  "model": "deepseek-flash",
  "tools": [{"type": "deepseek_web_search"}],
  "messages": [
    {"role": "user", "content": "2026년 11월 한국 AI 규제 최신 동향을 알려줘"}
  ]
}
```

모델이 웹검색이 필요하다고 판단하면 서버 측에서 검색을 실행하고, 인용 출처가 포함된 구조화된 응답을 반환한다.

### URL 읽기 활성화

```json
{
  "model": "deepseek-flash",
  "tools": [{"type": "deepseek_read_url"}],
  "messages": [
    {"role": "user", "content": "https://example.com/report.pdf 의 주요 내용을 요약해줘"}
  ]
}
```

메시지에 포함된 URL을 DeepSeek 서버가 직접 가져와 컨텍스트에 주입한다. 클라이언트 측 fetch 코드가 필요 없다.

> ⚠️ 파라미터 필드명 `deepseek_web_search`, `deepseek_read_url`은 복수 보도 출처 기반이다. 최종 형식은 공식 API 문서에서 반드시 재확인하길 권장한다.

---

## 가격

[복수의 보도에 따르면](https://www.webpronews.com/deepseek-api-web-search-ocr-speech-tools-pricing) 현재 책정된 가격은 다음과 같다.

| 기능 | 가격 |
|---|---|
| 웹검색 | $0.75 / 1,000건 |
| 파일 파싱 / OCR | $0.225 / 1,000페이지 |

[이는 OpenAI·Anthropic이 자체 API에 책정한 검색 도구 가격의 10분의 1 미만](https://www.webpronews.com/deepseek-api-web-search-ocr-speech-tools-pricing)으로 보도된다. 다만 이 수치는 2차 보도 출처에서 확인된 것이다. 발행 전 `platform.deepseek.com` 가격 페이지에서 최신 여부를 직접 확인하길 권장한다.

---

## 오픈소스 데모 클라이언트

[2026년 11월 12일, TypeScript로 작성된 오픈소스 데모 클라이언트 `chat-demo`가 MIT 라이선스로 공개됐다](https://pasqualepillitteri.it/en/news/33409/deepseek-chat-demo-open-source-chat-client). 별도의 애플리케이션 백엔드 없이 브라우저에서 직접 작동하는 것이 특징이다. 로컬에서 빠르게 도구 동작을 검증하거나, 자체 프로젝트의 출발점으로 삼을 수 있다.

> ⚠️ 데모 저장소 URL은 보도에서 `github.com/deepseek-ai/chat-demo`로 추정되나 직접 확인하지 않았다. 접속 전 URL을 검증하길 권장한다.

---

## 개발자·크리에이터에게 실질적으로 의미하는 것

**개발자** 입장에서 가장 큰 이점은 외부 도구 오케스트레이션의 감소다. 검색 API 키 관리, 문서 파서 연동, STT/TTS 서비스 계약을 각각 유지하는 대신, 단일 DeepSeek 엔드포인트 하나로 파이프라인을 단순화할 수 있다. 세 가지 프로토콜을 지원하기 때문에 기존 OpenAI 또는 Anthropic 기반 코드베이스를 대규모로 수정하지 않고 테스트해볼 수 있다는 점도 실용적이다.

**크리에이터 도구 빌더** 입장에서는 웹검색과 파일 파싱이 결합된 리서치 어시스턴트, URL 요약 기능이 내장된 뉴스레터 도구, 음성 입출력이 필요한 콘텐츠 도구를 더 적은 외부 의존성으로 구축할 수 있게 됐다.

물론 주요 한계는 존재한다. 웹검색은 non-thinking 모드 전용이고, 독립형 음성 API의 언어 지원 범위는 아직 공식 문서에서 확인되지 않았다. 한국어 음성 처리가 필수인 프로젝트라면 별도 검증이 선행되어야 한다.


## 참고 자료
- [참고 자료 1](https://en.wikipedia.org/wiki/ChatGPT)
- [참고 자료 2](https://releasebot.io/updates/openai)
- [참고 자료 3](https://en.wikipedia.org/wiki/GPT_Image)
- [참고 자료 4](https://releasebot.io/updates/openai/chatgpt)
- [참고 자료 5](https://openai.com/index/introducing-images-2-6/)
- [참고 자료 6](https://developers.openai.com/api/docs/changelog)
- [참고 자료 7](https://spyingbee.com/updates/openai/2026-11)
- [참고 자료 8](https://www.gptmap.org/en/posts/openai-models-release-notes)
- [참고 자료 9](https://ashutoshai.com/ai-compass/2026/11/13/)
- [참고 자료 10](https://github.com/jqueryscript/anthropic-claude-timeline)
- [참고 자료 11](https://platform.claude.com/docs/en/release-notes/overview.md)
- [참고 자료 12](https://docs.anthropic.com/en/release-notes/api)
- [참고 자료 13](https://releasebot.io/updates/anthropic/claude-developer-platform)
- [참고 자료 14](https://releasebot.io/updates/anthropic/claude)
- [참고 자료 15](https://en.wikipedia.org/wiki/Anthropic)
- [참고 자료 16](https://status.claude.com/)
- [참고 자료 17](https://platform.claude.com/docs/en/release-notes/overview)
- [참고 자료 18](https://en.wikipedia.org/wiki/GPT-5.5)
- [참고 자료 19](https://en.wikipedia.org/wiki/GitHub_Copilot)
- [참고 자료 20](https://github.com/joshjohanning/github-changelog-weekly/issues/89)
- [참고 자료 21](https://releasebot.io/updates/github)
- [참고 자료 22](https://github.blog/changelog/)
- [참고 자료 23](https://github.blog/changelog/2026-11-13-github-enterprise-server-support-in-the-github-copilot-app/)
- [참고 자료 24](https://releases.sh/github)
- [참고 자료 25](https://dev.classmethod.jp/en/articles/github-copilot-model-deprecation-nov-2026/)
- [참고 자료 26](https://note.com/aitrendlab/n/n81514038aebb?hl=en)
- [참고 자료 27](https://agenticindex.io/change-log/github-copilot)
- [참고 자료 28](https://dev.to/sascha-ms/claude-message-threads-api-agent-loops-in-typescript-68o)
- [참고 자료 29](https://dev.to/sueun-dev/claude-message-threads-send-only-new-messages-on-long-agent-loops-4b0g)
- [참고 자료 30](https://dev.to/gabrielanhaia/claudes-api-now-holds-your-agents-conversation-for-5-minutes-keep-your-own-copy-3a1e)
- [참고 자료 31](https://dev.to/paullovelace/claude-api-message-threads-stop-resending-the-whole-conversation-explained-honestly-3moa)
- [참고 자료 32](https://claude.com/resources/articles/message-threads)
- [참고 자료 33](https://x.com/ClaudeDevs/status/2117332449382510884)
- [참고 자료 34](https://www.digitalapplied.com/blog/claude-message-threads-messages-api-beta)
- [참고 자료 35](https://cellcog.ai/blog/claude-message-threads/)
- [참고 자료 36](https://thomas-wiegold.com/blog/claude-message-threads/)
- [참고 자료 37](https://claude-world.com/articles/claude-api-message-threads/)
- [참고 자료 38](https://www.kucoin.com/news/flash/deepseek-expands-api-toolkit-with-new-model-and-standalone-features)
- [참고 자료 39](https://casrai.org/news/deepseek-app-capabilities-api-2026)
- [참고 자료 40](https://pasqualepillitteri.it/en/news/33409/deepseek-chat-demo-open-source-chat-client)
- [참고 자료 41](https://www.webpronews.com/deepseek-api-web-search-ocr-speech-tools-pricing)
- [참고 자료 42](https://cellcog.ai/blog/deepseek-api-web-search-voice-tools/)
- [참고 자료 43](https://startupfortune.com/deepseek-turns-its-whole-app-into-an-api-with-search-file-reading-voice-and-safety-built-in/)
- [참고 자료 44](https://www.zeniteq.com/news/deepseek-opens-its-app-tools-to-api-developers-pb4jh4)
- [참고 자료 45](https://offloop.org/learn/what-is-deepseek-app-api)

커버 이미지: [mikemacmarketing](https://commons.wikimedia.org/w/index.php?curid=95608091) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
