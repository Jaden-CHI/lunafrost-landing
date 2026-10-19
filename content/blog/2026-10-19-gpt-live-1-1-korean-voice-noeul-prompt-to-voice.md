---
title: GPT-Live-1.1 한국어 음성 Noeul과 Prompt-to-Voice 실전 가이드
slug: gpt-live-1-1-korean-voice-noeul-prompt-to-voice
date: '2026-10-19'
category: AI Tools
tags:
  - GPT-Live
  - 음성AI
  - Noeul
  - Prompt-to-Voice
  - OpenAI
  - 보이스앱
  - 한국어AI
description: >-
  OpenAI GPT-Live-1.1에 추가된 한국어 전용 목소리 Noeul과 텍스트 설명만으로 커스텀 음성을 만드는
  Prompt-to-Voice를 활용해 음성 AI 앱을 만드는 방법을 정리했습니다.
cover: >-
  /images/posts/gpt-live-1-1-korean-voice-noeul-prompt-to-voice/commons-85252166.webp
published: true
automated: true
sources:
  - >-
    https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - 'https://developers.openai.com/codex/changelog'
  - 'https://developers.openai.com/api/docs/deprecations'
  - 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/
  - 'https://community.openai.com/c/announcements/6'
  - >-
    https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/
  - >-
    https://blog.google/intl/ko-kr/products/android-play-hardware/2026-10-new-tools-for-discovery-and-engagement-kr/
  - >-
    https://blog.google/intl/ko-kr/products/android-play-hardware/google-play-updates-october-2026-kr/
  - 'https://openai.com/products/release-notes/'
  - >-
    https://help.openai.com/en/articles/10128477-chatgpt-enterprise-and-edu-release-notes
  - 'https://openai.com/index/gpt-6-for-everyone/'
  - >-
    https://blog.google/intl/ko-kr/products/gemini-4-argon-in-google-antigravity-kr/
  - >-
    https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704
  - 'https://openai.com/index/introducing-gpt-live-1-in-the-api/'
  - 'https://developers.openai.com/api/docs/guides/audio'
  - 'https://developers.openai.com/api/docs/guides/live'
  - 'https://openai.com/index/continuous-voice-interaction-with-gpt-live/'
  - 'https://developers.openai.com/api/docs/guides/voice-agents'
  - 'https://developers.openai.com/api/docs/guides/live-prompting'
recoveredAt: '2026-10-19T04:51:06.644Z'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: tony_duell
  title: Microprocessor PCB
  source: 'https://commons.wikimedia.org/w/index.php?curid=85252166'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: 350ab3c4-40bf-4a19-9f32-3d118f991329
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/9/9d/Microprocessor_PCB.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 9fbded47d42b52f691f1eeaabed94fa5881bc5fab1099477d6d9edb649c9c4c5
  verifiedAt: '2026-10-19T04:53:34.966Z'
  originalArtist: tony_duell
  changes: Resized and converted to WebP
---
## TL;DR

- OpenAI가 [GPT-Live-1.1을 출시](https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704)하면서 한국어 전용 목소리 **Noeul**을 포함한 9개 자연어 목소리를 추가했습니다.
- [Prompt-to-Voice](https://developers.openai.com/api/docs/guides/live)가 모든 API 고객에게 공개됐고, 커스텀 목소리 생성 자체는 **무료**입니다.
- Full-Duplex 구조와 Native Decisions 통합으로 사용자가 말하는 도중에도 앱이 반응할 수 있습니다.
- GPT-Live-1.1의 API 정식 제공 시점은 2026년 10월 15일 기준 아직 미확정("coming soon")입니다.

---

## 한국어 전용 목소리 Noeul이 추가됐습니다

2026년 10월 15~16일, OpenAI는 [GPT-Live-1.1을 공개](https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704)했습니다. 이번 업데이트에서 가장 주목할 점은 비영어권 언어 지원의 실질적 확장입니다. 프랑스어·독일어·힌디어·일본어·한국어·멕시코 스페인어 등에서 성능이 향상됐고, 각 언어를 위한 자연어 목소리가 새로 추가됐습니다.

한국어에 추가된 목소리는 **Noeul** 하나입니다. 독일어 3개(Nuri, Juni, Flitz), 프랑스어 2개(Brise, Sillage), 힌디어 1개(Nira), 일본어 2개(Harema, Shida)와 함께 총 9개의 자연어 목소리가 이번에 포함됐습니다.

> ⚠️ Noeul의 지역별 ChatGPT 지원 범위는 공식 문서에서 "지역 및 계정에 따라 다를 수 있음"으로만 명시돼 있습니다. 직접 확인이 필요합니다.

---

## Prompt-to-Voice: 텍스트 설명으로 목소리를 만든다

[Prompt-to-Voice는 2026년 10월 16일 모든 API 고객을 대상으로 GA됐습니다.](https://developers.openai.com/api/docs/guides/live) 텍스트로 목소리의 특성을 설명하면 커스텀 음성을 생성해 GPT-Live 세션에서 재사용할 수 있습니다.

### 사용 엔드포인트

```
POST v1/audio/voices      # 커스텀 목소리 생성
POST v1/live/sessions     # GPT-Live 세션에 목소리 적용
```

커스텀 목소리 생성 자체는 **무료**이며, 실제 음성이 출력되는 GPT-Live 세션에는 일반 GPT-Live 과금이 적용됩니다. Voice Playground에서 브라우저 UI로도 사용할 수 있습니다.

### 실제 활용 예시

**한국어 AI 고객 상담 목소리 만들기**

`v1/audio/voices` 엔드포인트에 다음과 같은 프롬프트를 전달합니다.

```
"30대 여성, 차분하고 신뢰감 있는 말투, 고객 응대에 적합한 뉴스 앵커 스타일"
```

생성된 `voice_id`를 `v1/live/sessions` 요청의 `voice` 파라미터에 넘기면 해당 목소리로 세션이 열립니다. 공식 가이드에서 세부 파라미터 구조를 확인할 수 있습니다.

> ⚠️ Prompt-to-Voice로 생성된 목소리의 언어별 품질 차이에 대한 공식 벤치마크 수치는 현재 공개되지 않았습니다.

---

## GPT-Live의 핵심 구조: Full-Duplex + Native Decisions

### Full-Duplex란

[GPT-Live는 Full-Duplex 방식](https://openai.com/index/introducing-gpt-live-1-in-the-api/)으로 동작합니다. 사용자가 말하는 동안 AI가 동시에 들을 수 있고, 백엔드 에이전트는 툴 호출·검색·태스크 실행을 별도로 처리합니다. 대화 레이어와 백엔드 레이어를 독립적으로 구성할 수 있다는 점이 기존 턴-바이-턴 방식과 다릅니다.

[공식 문서](https://developers.openai.com/api/docs/guides/voice-agents)에 명시된 주요 기능:

- 시스템 프롬프트로 톤·속도·스타일 제어
- 배경 소음 처리 및 침묵 관리
- 장시간 세션 신뢰성
- 전화 통신(telephony) 배포 지원

### Native Decisions 통합

[GPT-Live에 Native Decisions 통합이 추가됐습니다.](https://developers.openai.com/api/docs/guides/live) 사용자가 아직 말하는 도중에도, 혹은 AI가 말하는 내용에 반응해 앱이 동작할 수 있습니다. 입출력 트랜스크립트 델타가 도착하는 시점에 decisions를 트리거하는 방식입니다.

**실시간 라우팅 에이전트 예시:**

사용자가 "환불하고 싶은데요"라고 말을 시작하는 순간, 문장이 끝나기 전에 Native Decisions API가 "FAQ 응답" vs "상담원 연결" 분기를 판단해 다음 동작을 준비합니다. 전체 발화가 끝날 때까지 기다리는 것보다 응답 지연을 줄일 수 있습니다.

---

## 세션 연결 시작하기 (공식 가이드 기준)

[GPT-Live WebRTC Quickstart](https://developers.openai.com/api/docs/guides/live)는 브라우저와 서버 예제로 마이크 입력·스피커 출력·이벤트 채널 연결을 다룹니다. 필요한 것은 세 가지입니다.

1. 마이크가 있는 환경
2. HTTPS 또는 localhost로 서비스되는 브라우저 페이지
3. OpenAI 프로젝트 API 키가 있는 신뢰할 수 있는 서버

[공식 문서의 세션 흐름](https://developers.openai.com/api/docs/guides/live-prompting)은 다음 순서입니다.

```
① 백엔드에 언제 위임할지 알려주는 짧은 대화 프롬프트 작성
② 브라우저 마이크·오디오·이벤트 채널 연결 + 서버에서 세션 생성
③ session.started 이벤트 수신 → 대화 시작
④ 대화 종료 후 세션 닫기, 최종 사용량 수집 및 연결 해제
```

---

## 지금 시도해볼 수 있는 활용 시나리오

| 시나리오 | 핵심 구성 요소 |
|---|---|
| 한국어 AI 고객 상담 | Noeul 목소리 + 한국어 시스템 프롬프트 + telephony 지원 |
| 맞춤형 보이스 생성 | Prompt-to-Voice → `v1/audio/voices` (무료) |
| 실시간 분기 라우팅 에이전트 | GPT-Live + Native Decisions 통합 |
| 언어 학습 대화 앱 | Full-Duplex 인터럽션 핸들링 |

---

## 주의할 점

GPT-Live-1.1의 API 정식 제공 일자는 2026년 10월 15일 기준 확정되지 않았습니다. OpenAI 개발자 커뮤니티에서 "아직 API에서 사용할 수 없는 것 같다"는 질문에 OpenAI 측은 ["곧 API에 제공될 예정"이라고 답했습니다.](https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704) 신규 목소리와 성능 개선을 API에서 사용하려면 공식 changelog를 주시하는 것이 좋습니다.

[OpenAI API Changelog](https://developers.openai.com/api/docs/changelog)와 [ChatGPT Release Notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)에서 업데이트를 확인할 수 있습니다.

## 참고 자료
- [공식 자료 1](https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006)
- [공식 자료 2](https://developers.openai.com/api/docs/changelog)
- [공식 자료 3](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 4](https://developers.openai.com/codex/changelog)
- [공식 자료 5](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 6](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [공식 자료 7](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 8](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/)
- [공식 자료 9](https://community.openai.com/c/announcements/6)
- [공식 자료 10](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)
- [공식 자료 11](https://blog.google/intl/ko-kr/products/android-play-hardware/2026-10-new-tools-for-discovery-and-engagement-kr/)
- [공식 자료 12](https://blog.google/intl/ko-kr/products/android-play-hardware/google-play-updates-october-2026-kr/)
- [공식 자료 13](https://openai.com/products/release-notes/)
- [공식 자료 14](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-and-edu-release-notes)
- [공식 자료 15](https://openai.com/index/gpt-6-for-everyone/)
- [공식 자료 16](https://blog.google/intl/ko-kr/products/gemini-4-argon-in-google-antigravity-kr/)
- [공식 자료 17](https://community.openai.com/t/gpt-live-1-1-is-rolling-out-with-new-voices-and-better-accents/1406704)
- [공식 자료 18](https://openai.com/index/introducing-gpt-live-1-in-the-api/)
- [공식 자료 19](https://developers.openai.com/api/docs/guides/audio)
- [공식 자료 20](https://developers.openai.com/api/docs/guides/live)
- [공식 자료 21](https://openai.com/index/continuous-voice-interaction-with-gpt-live/)
- [공식 자료 22](https://developers.openai.com/api/docs/guides/voice-agents)
- [공식 자료 23](https://developers.openai.com/api/docs/guides/live-prompting)

커버 이미지: [tony\_duell](https://commons.wikimedia.org/w/index.php?curid=85252166) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
