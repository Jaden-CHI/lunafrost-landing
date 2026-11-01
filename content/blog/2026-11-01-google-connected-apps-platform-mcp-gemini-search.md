---
title: 'Google Connected Apps Platform: MCP로 Gemini·Search에 앱 노출하기'
slug: google-connected-apps-platform-mcp-gemini-search
date: '2026-11-01'
category: App Dev
tags:
  - Google
  - MCP
  - Gemini
  - AppFunctions
  - Connected Apps
  - AI Agent
  - Android
description: >-
  2026년 10월 28일 출시된 Google Connected Apps Platform을 통해 개발자가 MCP 서버·Android
  AppFunctions로 Gemini 앱과 Google Search AI Mode에 앱을 직접 배포하는 방법을 정리합니다.
cover: /images/posts/daily-2026-11-01/commons-129773144.webp
published: true
automated: true
sources:
  - 'https://www.simular.ai/alternatives/best-ai-agent-platforms'
  - 'https://en.wikipedia.org/wiki/ChatGPT'
  - 'https://docs.databricks.com/aws/en/release-notes/product'
  - >-
    https://www.thehansindia.com/tech/upcoming-ai-updates-in-november-2026-major-developments-to-watch-1137527
  - 'https://docs.cloud.google.com/vertex-ai/docs/release-notes'
  - 'https://en.wikipedia.org/wiki/Google_Antigravity'
  - 'https://en.wikipedia.org/wiki/Amazon_Bedrock'
  - 'https://www.mobilemarketingreads.com/android-dev-summit-2026/'
  - 'https://releasebot.io/updates/anthropic/claude-developer-platform'
  - 'https://developers.openai.com/docs/changelog'
  - >-
    https://developers.openai.com/api/docs/changelog?mw_entry=2026-08-21-3a253b16744d621b
  - 'https://developers.openai.com/api/docs/changelog'
  - >-
    https://developers.openai.com/api/docs/changelog.md?entry=2026-09-08-3922e216050f6857
  - 'https://developers.openai.com/codex/changelog'
  - 'https://help.openai.com/en/articles/9624314-model-release-notes'
  - 'https://releasebot.io/updates/openai'
  - 'https://releases.sh/openai'
  - 'https://www.scriptbyai.com/timeline-of-chatgpt/'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - >-
    https://www.droid-life.com/2026/10/28/google-launches-connected-apps-platform-for-gemini/
  - 'https://en.wikipedia.org/wiki/Google_AI_Studio'
  - >-
    https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/
  - 'https://en.wikipedia.org/wiki/Google_One'
  - 'https://9to5google.com/2026/10/28/gemini-google-connected-apps-platform/'
  - 'https://releasebot.io/updates/google'
  - 'https://en.wikipedia.org/wiki/Google_Gemini'
  - >-
    https://www.relevantaudience.com/geo/google-connected-apps-platform-preview-mcp-search-gemini/
  - >-
    https://pasqualepillitteri.it/en/news/28959/android-mcp-appfunctions-beta-google-ai-agents
  - 'https://mean.ceo/tpost/google-connected-apps?amp=true'
  - 'https://en.wikipedia.org/wiki/Google_Fit'
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/connected-apps-one-place/
  - 'https://en.wikipedia.org/wiki/Health_Connect'
  - >-
    https://developer.android.com/ai/appfunctions/create-manage-connected-apps?hl=ko
  - 'https://developers.google.com/connected-apps/mcp'
  - 'https://developers.google.com/connected-apps'
editorialLane: updates
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Our World in Data
  title: >-
    Timeline of artificial intelligence training computation for the last 8
    decades.png
  source: 'https://commons.wikimedia.org/w/index.php?curid=129773144'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-129773144
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/4/4a/Timeline_of_artificial_intelligence_training_computation_for_the_last_8_decades.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: b8a79120e9b71963a6111f9737974a5efc6e78e4b0304133af09f9ae92fc0828
  verifiedAt: '2026-11-01T04:19:42.950Z'
  originalArtist: Our World in Data
  changes: Resized and converted to WebP
---
> **TL;DR** Google이 2026년 10월 28일 Connected Apps Platform을 공개했습니다. 기존에는 Google과 개별 파트너십을 맺어야만 Gemini·Search에 앱을 노출할 수 있었지만, 이제는 누구나 공개 절차로 등록할 수 있습니다. 진입 경로는 **원격 MCP 서버**와 **Android AppFunctions** 두 가지이며, 현재 미국 개발자 대상 베타로 운영 중입니다.

---

## 왜 지금 이 플랫폼이 중요한가

지금까지 서드파티 앱을 Gemini 앱이나 Google Search AI Mode와 연동하려면 Google과 직접 협의해야 했습니다. [Google 공식 블로그(2026-10-28)](https://blog.google/innovation-and-ai/technology/developers-tools/connected-apps-one-place/)에 따르면, 기존 Connected App은 Adobe·Dropbox·Instacart·OpenTable·Ticketmaster 등 50개 이상이 있었지만 이들은 모두 Google과의 개별 협의로 만들어진 통합이었습니다.

Connected Apps Platform은 이 구조를 바꿉니다. [공식 개발자 문서](https://developers.google.com/connected-apps)는 이 플랫폼이 "한 번 활성화하면 Google 전체에서 실행"되는 에코시스템을 목표로 설계됐다고 설명합니다. 표준 프로토콜로 서드파티 데이터와 도구를 안전하게 노출하는 경로를 통일해, 매번 맞춤형 통합을 새로 빌드할 필요가 없어집니다.

---

## 두 가지 통합 경로: MCP 서버 vs. AppFunctions

[공식 개발자 문서](https://developers.google.com/connected-apps)는 통합 경로를 두 가지로 구분합니다.

| | 원격 MCP 서버 | Android AppFunctions |
|---|---|---|
| 대상 플랫폼 | Android, iOS, Web | Android 전용 |
| 공식 권장 기본값 | ✅ | 심층 기기 통합 시 |
| 기존 자산 활용 | 기존 Web API 재사용 가능 | Jetpack AppFunctions SDK 필요 |

**원격 MCP 서버**는 기존 Web API나 원격 MCP 서버가 있는 팀에게 가장 빠른 진입 경로입니다. Android·iOS·Web 전반에 걸쳐 확장할 수 있어 공식 문서도 기본값으로 권장합니다.

**Android AppFunctions**는 온디바이스 콘텐츠를 활용하고 Android OS 및 시스템 UI와 깊이 통합해야 하는 경우에 적합합니다. [Android 공식 문서](https://developer.android.com/ai/appfunctions/create-manage-connected-apps?hl=ko)에 따르면 Google Connected Console에서 AppFunctions와 Android MCP를 연결하면, Android의 Gemini가 사용자를 대신해 앱에서 직접 작업을 트리거하고 완료할 수 있습니다.

---

## 원격 MCP 서버 배포: 3단계 절차

[MCP 서버 공식 가이드](https://developers.google.com/connected-apps/mcp)는 배포를 세 단계로 정의합니다.

### Phase 1 — 빌드
원격 MCP 서버를 개발하고, 초기화 시 도메인과 기능을 설명하는 **서버 지시문(server instructions)**을 정의합니다. 서버 지시문은 Gemini가 언제 이 서버를 호출할지 판단하는 핵심 신호입니다.

### Phase 2 — 검증
MCP Inspector 도구로 로컬에서 서버를 실행해 테스트합니다. 공개 배포 전에 도구 호출이 올바르게 동작하는지 확인하는 단계입니다.

### Phase 3 — 배포 및 테스트
공개 HTTPS 엔드포인트에 서버를 배포한 뒤 **Gemini Developer Mode**로 라이브 도구 실행을 검증합니다. 이후 Google Connected Console에서 앱을 등록·테스트·제출합니다. 제출 시 Search, Gemini 앱, 또는 양쪽 모두 중 노출 위치를 선택할 수 있으며, 라이브 이후에는 트래픽·레이턴시·오류율 추적과 브랜드 아이덴티티(로고·인증 계정) 관리가 가능합니다.

---

## 사용자 경험 관점에서 보면

[공식 개발자 문서](https://developers.google.com/connected-apps)는 플랫폼의 목적을 이렇게 설명합니다. 사용자가 앱을 한 번 연결하면, 이후 Gemini 앱이나 Search 안에서 개인 계정 컨텍스트에 접근하고 대화 중에 실제 작업을 완료할 수 있습니다. 앱을 별도로 열지 않아도 Gemini가 대신 작업을 처리하는 구조입니다.

예를 들어 피트니스 앱이 AppFunctions를 통해 연결되어 있다면, 사용자가 Gemini에게 "오늘 운동 기록 보여줘"라고 말하는 것만으로 앱 데이터에 접근해 결과를 반환하는 시나리오를 공식 문서는 상정합니다. [Google 공식 블로그(2026-10-28)](https://blog.google/innovation-and-ai/technology/developers-tools/connected-apps-one-place/)는 신규 파트너로 Adobe, Calm, Peloton이 추가됐음을 밝혔습니다.

---

## 지금 알아야 할 제한 사항

솔직하게 짚고 넘어가야 할 부분이 있습니다.

**지역 제한:** 플랫폼 프리뷰는 현재 미국 내 개발자 대상 베타로 제공됩니다. 미국 외 개발자는 대기자 명단을 통해 접근해야 합니다. 정식 글로벌 지원 시점은 아직 공개되지 않았습니다.

**AppFunctions 성숙도:** [Android 공식 문서](https://developer.android.com/ai/appfunctions/create-manage-connected-apps?hl=ko)는 AppFunctions 라이브러리가 **알파 상태**임을 명시합니다. 함수 시그니처가 아직 변경될 수 있으므로, 프로덕션 배포 전에 업데이트에 대비한 계획이 필요합니다. 또한 현재로서는 AppFunctions를 구현한 앱이 있어도 이를 호출할 수 있는 어시스턴트가 없을 수 있다고 문서는 경고합니다.

**MCP와의 호환성:** 공식 문서는 Google이 AppFunctions를 "MCP 도구의 모바일 동등물"로 설명하지만, 기존 MCP 클라이언트가 AppFunctions를 직접 호출할 수 있다고 명시하지는 않습니다.

**수수료:** 2026년 10월 29일 시점 공식 발표 및 개발자 문서에 수수료나 수익 분배에 관한 언급은 없습니다.

**불확실한 점:** AppFunctions Jetpack 라이브러리의 안정 버전 출시 일정, Google 제출 후 검토 기간과 승인 기준 상세는 아직 공개되지 않았습니다.

---

## 정리

Connected Apps Platform은 Gemini·Search 연동의 진입 장벽을 낮추는 구조적 변화입니다. 기존 Web API가 있는 팀이라면 원격 MCP 서버 경로로 비교적 빠르게 시작할 수 있고, 깊은 Android 통합이 필요한 팀은 AppFunctions를 검토할 수 있습니다. 다만 AppFunctions는 알파 단계인 만큼 프로덕션 적용은 라이브러리가 안정화된 뒤로 미루는 것이 현실적입니다. 미국 외 개발자라면 대기자 명단에 등록해두고, [공식 문서](https://developers.google.com/connected-apps)의 업데이트를 주시하는 것이 지금 할 수 있는 첫 번째 행동입니다.


## 참고 자료
- [참고 자료 1](https://www.simular.ai/alternatives/best-ai-agent-platforms)
- [참고 자료 2](https://en.wikipedia.org/wiki/ChatGPT)
- [참고 자료 3](https://docs.databricks.com/aws/en/release-notes/product)
- [참고 자료 4](https://www.thehansindia.com/tech/upcoming-ai-updates-in-november-2026-major-developments-to-watch-1137527)
- [참고 자료 5](https://docs.cloud.google.com/vertex-ai/docs/release-notes)
- [참고 자료 6](https://en.wikipedia.org/wiki/Google_Antigravity)
- [참고 자료 7](https://en.wikipedia.org/wiki/Amazon_Bedrock)
- [참고 자료 8](https://www.mobilemarketingreads.com/android-dev-summit-2026/)
- [참고 자료 9](https://releasebot.io/updates/anthropic/claude-developer-platform)
- [참고 자료 10](https://developers.openai.com/docs/changelog)
- [참고 자료 11](https://developers.openai.com/api/docs/changelog?mw_entry=2026-08-21-3a253b16744d621b)
- [참고 자료 12](https://developers.openai.com/api/docs/changelog)
- [참고 자료 13](https://developers.openai.com/api/docs/changelog.md?entry=2026-09-08-3922e216050f6857)
- [참고 자료 14](https://developers.openai.com/codex/changelog)
- [참고 자료 15](https://help.openai.com/en/articles/9624314-model-release-notes)
- [참고 자료 16](https://releasebot.io/updates/openai)
- [참고 자료 17](https://releases.sh/openai)
- [참고 자료 18](https://www.scriptbyai.com/timeline-of-chatgpt/)
- [참고 자료 19](https://ai.google.dev/gemini-api/docs/changelog)
- [참고 자료 20](https://www.droid-life.com/2026/10/28/google-launches-connected-apps-platform-for-gemini/)
- [참고 자료 21](https://en.wikipedia.org/wiki/Google_AI_Studio)
- [참고 자료 22](https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/)
- [참고 자료 23](https://en.wikipedia.org/wiki/Google_One)
- [참고 자료 24](https://9to5google.com/2026/10/28/gemini-google-connected-apps-platform/)
- [참고 자료 25](https://releasebot.io/updates/google)
- [참고 자료 26](https://en.wikipedia.org/wiki/Google_Gemini)
- [참고 자료 27](https://www.relevantaudience.com/geo/google-connected-apps-platform-preview-mcp-search-gemini/)
- [참고 자료 28](https://pasqualepillitteri.it/en/news/28959/android-mcp-appfunctions-beta-google-ai-agents)
- [참고 자료 29](https://mean.ceo/tpost/google-connected-apps?amp=true)
- [참고 자료 30](https://en.wikipedia.org/wiki/Google_Fit)
- [참고 자료 31](https://blog.google/innovation-and-ai/technology/developers-tools/connected-apps-one-place/)
- [참고 자료 32](https://en.wikipedia.org/wiki/Health_Connect)
- [참고 자료 33](https://developer.android.com/ai/appfunctions/create-manage-connected-apps?hl=ko)
- [참고 자료 34](https://developers.google.com/connected-apps/mcp)
- [참고 자료 35](https://developers.google.com/connected-apps)

커버 이미지: [Our World in Data](https://commons.wikimedia.org/w/index.php?curid=129773144) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
