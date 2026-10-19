---
title: GPT-Live-1.1 한국어 음성 AI 앱 실전 가이드
slug: gpt-live-1-1-korean-voice-ai-app-guide
date: '2026-10-17'
category: AI Tools
tags:
  - GPT-Live
  - 음성AI
  - OpenAI
  - WebRTC
  - 커스텀보이스
  - Decisions API
  - 앱개발
description: >-
  Noeul 한국어 보이스, Prompt-to-Voice 커스텀 보이스, Decisions API 연동까지 — GPT-Live-1.1로 음성
  AI 앱을 만드는 방법을 공식 문서 기반으로 정리합니다.
cover: /images/posts/gpt-live-1-1-korean-voice-ai-app-guide/commons-149787898.webp
published: true
automated: true
sources:
  - 'https://developers.openai.com/codex/changelog'
  - 'https://community.openai.com/c/announcements/6'
  - 'https://deploymentsafety.openai.com/gpt-6-october'
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
  - 'https://openai.com/products/release-notes/'
  - 'https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes'
  - 'https://github.blog/ai-and-ml/'
  - 'https://github.blog/changelog/'
  - 'https://developers.openai.com/api/docs/deprecations'
  - >-
    https://blog.google/intl/ko-kr/products/android-play-hardware/2026-10-new-tools-for-discovery-and-engagement-kr/
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - >-
    https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006
  - 'https://claude.com/docs/cowork/changelog'
  - >-
    https://blog.google/intl/ko-kr/products/android-play-hardware/google-play-updates-october-2026-kr/
  - >-
    https://help.openai.com/en/articles/10128477-chatgpt-enterprise-and-edu-release-notes
  - >-
    https://blog.google/intl/ko-kr/products/gemini-4-argon-in-google-antigravity-kr/
  - >-
    https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704
  - 'https://openai.com/index/introducing-gpt-live-1-in-the-api/'
  - 'https://developers.openai.com/api/docs/guides/audio'
  - 'https://developers.openai.com/api/docs/guides/live'
  - 'https://developers.openai.com/api/docs/guides/custom-voices'
  - 'https://developers.openai.com/api/docs/guides/voice-agents'
  - 'https://openai.com/index/continuous-voice-interaction-with-gpt-live/'
  - 'https://developers.openai.com/cookbook/examples/audio/voice_agent_evaluation'
  - 'https://developers.openai.com/api/docs/guides/live-conversations'
  - >-
    https://blog.google/products-and-platforms/platforms/google-play/google-play-updates-october-2026/
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-studio-io-2026/
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/introducing-vibe-coding-in-google-ai-studio/
  - 'https://ai.google.dev/gemini-api/docs/aistudio-build-mode'
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/
  - >-
    https://developer.android.com/blog/posts/build-native-android-apps-in-google-ai-studio
  - >-
    https://discuss.ai.google.dev/t/an-app-and-a-google-compiler-for-android/184766
  - >-
    https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/
  - 'https://blog.google/innovation-and-ai/technology/ai/io-2026-vibe-coded-quiz/'
  - >-
    https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/
recoveredAt: '2026-10-19T04:50:46.855Z'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: SiliconANGLE theCUBE
  title: 13-die AMD microprocessor (SiliconANGLE theCUBE)
  source: 'https://commons.wikimedia.org/w/index.php?curid=149787898'
  license: CC BY 3.0
  licenseUrl: 'https://creativecommons.org/licenses/by/3.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: 692adba2-fd32-4c6b-8dac-b0158f9f8c04
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/2/2e/13-die_AMD_microprocessor_%28SiliconANGLE_theCUBE%29.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 2c84d35e2610a9353c66cca9c7ff03dc49cafba8391c5de240cf0c1e72ccbe47
  verifiedAt: '2026-10-19T04:53:31.201Z'
  originalArtist: >-
    <a rel="nofollow" class="external text"
    href="https://www.youtube.com/@siliconangle">SiliconANGLE theCUBE</a>
  changes: Resized and converted to WebP
---
## TL;DR

- GPT-Live-1.1이 **한국어 전용 보이스 Noeul**을 포함해 API에 9개 신규 보이스를 추가했습니다.
- **Prompt-to-Voice**로 텍스트 설명만으로 커스텀 보이스를 무료 생성할 수 있습니다(GPT-Live 세션 요금만 과금).
- **Decisions API 네이티브 연동**으로 사용자가 말하는 도중에도 저지연 의사결정이 가능합니다.
- 연결 방식은 WebRTC(권장)와 WebSockets 중 선택할 수 있으며, 컨텍스트 윈도우는 128,000 토큰입니다.

---

## 왜 지금 GPT-Live-1.1인가

음성 AI 앱을 만들고 싶은 한국 개발자에게 오랫동안 가장 큰 장벽은 **자연스러운 한국어 보이스의 부재**였습니다. 영어 중심 TTS를 한국어 앱에 억지로 끼워 맞추거나, 별도 TTS 서비스를 파이프라인에 추가해야 했죠.

[2026년 10월 15일 OpenAI 개발자 커뮤니티 발표](https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704)에 따르면, GPT-Live-1.1은 ChatGPT, Codex, 그리고 API 전반에 걸친 업데이트로 **13개의 새 보이스**를 추가하고 한국어·일본어·프랑스어·독일어·힌디어·멕시코 스페인어 등 비영어권 언어의 성능을 대폭 향상시켰습니다.

특히 [API changelog](https://developers.openai.com/api/docs/changelog)에서 확인되는 API용 9개 신규 자연어 보이스 목록에는 **Noeul(한국어)**이 공식 포함되어 있습니다. 이로써 별도 한국어 TTS 없이 GPT-Live 파이프라인 하나로 한국어 음성 앱을 구성할 수 있는 공식 경로가 열렸습니다.

---

## 핵심 기능 3가지

### 1. Noeul — 한국어 공식 보이스

[API changelog](https://developers.openai.com/api/docs/changelog)에 등재된 9개 신규 보이스 중 한국어 담당은 **Noeul** 하나입니다. 세션 설정 시 `session.audio.output.voice.id`에 `noeul`을 지정하면 바로 사용할 수 있습니다. Noeul의 실사용 음질과 억양 완성도에 대한 공식 성능 지표는 아직 공개되지 않았으므로, 실제 앱에 적용하기 전 Voice Playground에서 사전 테스트를 권장합니다.

### 2. Prompt-to-Voice — 텍스트로 커스텀 보이스 만들기

[2026년 10월 16일 모든 API 고객에게 공개된](https://developers.openai.com/api/docs/guides/custom-voices) **Prompt-to-Voice** 기능은 텍스트 설명만으로 커스텀 보이스를 생성합니다.

**구체적인 흐름:**

1. `/v1/audio/voices` 엔드포인트에 `type: prompt`와 원하는 보이스 설명을 JSON으로 전송합니다.
2. 응답으로 받은 `voice_id`를 저장합니다.
3. GPT-Live 세션 초기화 시 `session.audio.output.voice.id`에 해당 ID를 지정하고, `session.instructions` 안에 원본 보이스 설명을 함께 포함시켜 성능을 보강합니다.

**비용:** 보이스 생성 자체는 무료이며, GPT-Live 세션 요금만 청구됩니다. 다만 [공식 문서](https://developers.openai.com/api/docs/guides/custom-voices)에 명시된 대로 Prompt-to-Voice로 만든 보이스는 **GPT-Live에서만 동작**하며, Text to Speech·Realtime·Chat Completions API에서는 지원되지 않습니다.

녹음 기반 커스텀 보이스를 사용하려면 요구 사항이 따릅니다. 동의 녹음과 레퍼런스 샘플은 반드시 같은 사람의 것이어야 하고, 샘플은 최소 5초 이상의 실제 발화와 최소 15개의 텍스트 토큰을 포함해야 합니다. 권장 길이는 10~30초이며, 각 업로드 파일은 10 MiB 이내여야 합니다.

### 3. Decisions API 네이티브 연동 — 저지연 의사결정

[2026년 10월 15일 GA된](https://developers.openai.com/api/docs/guides/voice-agents) GPT-Live의 Decisions API 네이티브 연동은 음성 에이전트의 반응 속도를 근본적으로 바꿉니다.

[공식 가이드](https://developers.openai.com/api/docs/guides/live-conversations)에 따르면 두 가지 delegation 방식이 있습니다.

- **Native delegation:** Live가 앱을 거치는 라운드트립 없이 Decisions API를 직접 호출합니다. 지연이 가장 낮습니다.
- **Custom delegation:** Live가 앱에 이벤트를 보내고, 앱이 Decisions API를 호출합니다. 비즈니스 로직 삽입이 필요할 때 선택합니다.

두 방식 모두 사용자가 **아직 말하는 중**에도 실시간으로 의사결정을 내릴 수 있습니다. 예를 들어 사용자가 "오늘 서울 날씨 알려줘"라고 말하기 시작하는 순간, transcript delta 트리거를 통해 날씨 API 호출을 미리 시작할 수 있습니다.

---

## 세션 연결 시작하기

[공식 live 가이드](https://developers.openai.com/api/docs/guides/live)에 정리된 첫 세션 구성 순서입니다.

**연결 방식 선택:**
- **WebRTC:** 브라우저·모바일·서버 오디오 모두에 권장. 미디어 트랙은 오디오로, 제어 이벤트는 JSON으로 데이터 채널을 통해 전송합니다.
- **WebSockets:** 단일 연결에서 오디오와 제어 이벤트를 모두 처리하는 지원 대안입니다.

**초기화 3단계:**

1. 백엔드에 언제 도움을 요청할지 GPT-Live에 알려주는 짧은 대화 프롬프트를 작성합니다.
2. 서버에서 세션을 생성하고, 브라우저의 마이크·오디오 재생·이벤트 채널을 연결하는 퀵스타트를 따릅니다. 서버가 브라우저의 연결 오퍼에 응답합니다.
3. `session.started` 이벤트를 수신한 뒤 음성 입력을 시작합니다.

기본 컨텍스트 윈도우는 **128,000 토큰**이며, 지시사항·대화 텍스트·트랜스크립트에 노출되지 않는 오디오 토큰이 모두 포함됩니다. 장시간 세션을 운영할 경우 컨텍스트 관리 전략을 함께 설계해야 합니다.

---

## 크리에이터를 위한 활용 아이디어

개발자가 아닌 크리에이터라도 Prompt-to-Voice는 바로 활용할 수 있습니다. Voice Playground에서 프롬프트로 생성한 보이스를 테스트한 뒤, 팟캐스트 스타일 AI 호스트나 인터랙티브 콘텐츠의 내레이터로 사용하는 구성이 가능합니다. 단, 앞서 언급한 대로 Prompt-to-Voice 보이스는 GPT-Live 세션 맥락에서만 동작합니다.

---

## 확인이 필요한 사항

글을 쓰는 시점에서 아직 공식 확인이 되지 않은 항목들이 있습니다. **GPT-Live 세션의 구체적인 과금 단가**는 공식 릴리즈 노트에서 "regular session billing"으로만 명시되어 있어 pricing 페이지에서 별도 확인이 필요합니다. **한국 개발자의 데이터 레지던시 옵션**도 공식 changelog에서는 미국과 유럽(EEA + 스위스)만 명시되어 있어 한국 리전 지원 여부는 별도 확인을 권장합니다. **Noeul 보이스의 억양 완성도** 역시 공식 성능 지표가 없으므로 실사용 테스트가 먼저입니다.

---

## 참고 링크

- [GPT-Live-1.1 커뮤니티 발표](https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704)
- [OpenAI API changelog](https://developers.openai.com/api/docs/changelog)
- [GPT-Live 공식 가이드](https://developers.openai.com/api/docs/guides/live)
- [Custom Voices 공식 가이드](https://developers.openai.com/api/docs/guides/custom-voices)
- [Voice Agents 공식 가이드](https://developers.openai.com/api/docs/guides/voice-agents)
- [Live Conversations 공식 가이드](https://developers.openai.com/api/docs/guides/live-conversations)

## 참고 자료
- [공식 자료 1](https://developers.openai.com/codex/changelog)
- [공식 자료 2](https://community.openai.com/c/announcements/6)
- [공식 자료 3](https://deploymentsafety.openai.com/gpt-6-october)
- [공식 자료 4](https://developers.openai.com/api/docs/changelog)
- [공식 자료 5](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [공식 자료 6](https://openai.com/products/release-notes/)
- [공식 자료 7](https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes)
- [공식 자료 8](https://github.blog/ai-and-ml/)
- [공식 자료 9](https://github.blog/changelog/)
- [공식 자료 10](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 11](https://blog.google/intl/ko-kr/products/android-play-hardware/2026-10-new-tools-for-discovery-and-engagement-kr/)
- [공식 자료 12](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 13](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 14](https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006)
- [공식 자료 15](https://claude.com/docs/cowork/changelog)
- [공식 자료 16](https://blog.google/intl/ko-kr/products/android-play-hardware/google-play-updates-october-2026-kr/)
- [공식 자료 17](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-and-edu-release-notes)
- [공식 자료 18](https://blog.google/intl/ko-kr/products/gemini-4-argon-in-google-antigravity-kr/)
- [공식 자료 19](https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704)
- [공식 자료 20](https://openai.com/index/introducing-gpt-live-1-in-the-api/)
- [공식 자료 21](https://developers.openai.com/api/docs/guides/audio)
- [공식 자료 22](https://developers.openai.com/api/docs/guides/live)
- [공식 자료 23](https://developers.openai.com/api/docs/guides/custom-voices)
- [공식 자료 24](https://developers.openai.com/api/docs/guides/voice-agents)
- [공식 자료 25](https://openai.com/index/continuous-voice-interaction-with-gpt-live/)
- [공식 자료 26](https://developers.openai.com/cookbook/examples/audio/voice_agent_evaluation)
- [공식 자료 27](https://developers.openai.com/api/docs/guides/live-conversations)
- [공식 자료 28](https://blog.google/products-and-platforms/platforms/google-play/google-play-updates-october-2026/)
- [공식 자료 29](https://blog.google/innovation-and-ai/technology/developers-tools/google-ai-studio-io-2026/)
- [공식 자료 30](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-vibe-coding-in-google-ai-studio/)
- [공식 자료 31](https://ai.google.dev/gemini-api/docs/aistudio-build-mode)
- [공식 자료 32](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/)
- [공식 자료 33](https://developer.android.com/blog/posts/build-native-android-apps-in-google-ai-studio)
- [공식 자료 34](https://discuss.ai.google.dev/t/an-app-and-a-google-compiler-for-android/184766)
- [공식 자료 35](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)
- [공식 자료 36](https://blog.google/innovation-and-ai/technology/ai/io-2026-vibe-coded-quiz/)
- [공식 자료 37](https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/)

커버 이미지: [SiliconANGLE theCUBE](https://commons.wikimedia.org/w/index.php?curid=149787898) · [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
