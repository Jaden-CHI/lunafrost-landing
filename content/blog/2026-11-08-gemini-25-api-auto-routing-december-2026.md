---
title: 'Gemini 2.5 API 강제 라우팅: 12월 1일 전 체크리스트'
slug: gemini-25-api-auto-routing-december-2026
date: '2026-11-08'
category: AI Tools
tags:
  - Gemini
  - Google AI
  - API
  - breaking change
  - LLM
  - 개발자
description: >-
  2026년 12월 1일부터 gemini-2.5-pro와 gemini-2.5-flash 모델 ID로 보낸 요청이 자동으로 다른 모델로
  라우팅됩니다. 코드 변경 없이도 동작·과금이 바뀌는 breaking change 대응 가이드입니다.
cover: /images/posts/daily-2026-11-08/commons-92188968.webp
published: true
automated: true
sources:
  - 'https://en.wikipedia.org/wiki/ChatGPT'
  - 'https://github.com/jqueryscript/anthropic-claude-timeline'
  - 'https://en.wikipedia.org/wiki/Ollama'
  - 'https://en.wikipedia.org/wiki/Kling_AI'
  - >-
    https://dev.to/nikefd/3-ai-api-updates-worth-checking-this-week-migrations-tool-files-and-message-threads-lec
  - 'https://releasebot.io/updates/anthropic/claude-developer-platform'
  - 'https://releasebot.io/updates/google'
  - 'https://agentdeals.dev/digest/2026-w47'
  - 'https://hellogrowth.ai/en/blog/ai-news-november-2026'
  - >-
    https://itcares.ca/en/blog/ai-news-this-week-november-2026-for-regular-people.html
  - 'https://llmgateway.io/timeline'
  - 'https://en.wikipedia.org/wiki/Google_Antigravity'
  - 'https://en.wikipedia.org/wiki/OpenAI_o3'
  - 'https://en.wikipedia.org/wiki/2023_in_artificial_intelligence'
  - 'https://www.scriptbyai.com/ai-model-release-calendar/'
  - >-
    https://beevr.ai/blog/ai-model-releases-november-2026&gsessionid=dSHNV7IuiMrhftLX9Ujxoal_mA9fF_i1WhwtJauvF93BI1afKDN6zQ
  - 'https://llm-stats.com/ai-news'
  - 'https://www.promptzone.com/ai-model-releases'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://releasebot.io/updates/anthropic/claude'
  - 'https://www.digitalapplied.com/blog/claude-message-threads-messages-api-beta'
  - 'https://claude.com/resources/articles/message-threads'
  - 'https://emergent.sh/news/anthropic-message-threads-beta-cuts-latency'
  - 'https://releases.sh/anthropic/claude-platform'
  - 'https://x.com/ClaudeDevs/status/2117332449382510884'
  - 'https://en.wikipedia.org/wiki/Claude_Mythos'
  - 'https://firebase.google.com/docs/ai-logic/models'
  - 'https://hellogrowth.ai/en/blog/gemini-2-5-api-retirement'
  - 'https://en.wikipedia.org/wiki/Gemini_(language_model)'
  - 'https://en.wikipedia.org/wiki/Google_Gemini'
  - 'https://theepa.studio/blog/gemini-2-5-api-shutdown-december-2026/'
  - >-
    https://aipolix.com/en-us/news/google-deprecates-gemini-2-5-pro-flash-api-auto-route-3-8-flash-3-5-flash-lite-december-1
  - >-
    https://dev.to/mohammed_samaan_b256ef3f5/three-model-retirements-in-the-next-5-weeks-claude-sonnet-45-gemini-25-gpt-5-2hhd
  - >-
    https://aicoder.com/news/news-20261102-gemini-api-deprecates-gemini-2-5-pro-flash-dec-1-auto-route-3-8-flash-3-5-flash-lite
  - >-
    https://www.datastudios.org/post/gemini-api-reroutes-gemini-2-5-pro-2-5-flash-december-1-3-8-flash-3-5-flash-lite
editorialLane: updates
recoveredAt: '2026-11-14T01:53:04.230Z'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: quapan
  title: Labyrinthine circuit board lines - Flickr - quapan.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=92188968'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-92188968
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/6/66/Labyrinthine_circuit_board_lines_-_Flickr_-_quapan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: bb148a498b45d57dfb058c011879fc132a73f05cace6cb50263ca79acf5f4c97
  verifiedAt: '2026-11-14T01:50:53.723Z'
  originalArtist: >-
    <a rel="nofollow" class="external text"
    href="https://www.flickr.com/people/9361468@N05">quapan</a>
  changes: Resized and converted to WebP
---
> 2026-11-08 누락분을 2026-11-14에 보완 발행한 글입니다.

> **TL;DR** — 2026년 11월 2일 Gemini API 릴리스 노트 기준, `gemini-2.5-pro`와 `gemini-2.5-flash` 모델 ID는 2026년 12월 1일부터 각각 더 최신 모델로 자동 라우팅됩니다. 코드가 "정상 작동"처럼 보여도 실제로는 다른 모델이 응답하고 그 모델의 요금이 청구됩니다. 지금 바로 모델 ID 문자열을 검색하세요.

---

## 무슨 일이 생겼나

[2026년 11월 2일자 Gemini API 릴리스 노트](https://aicoder.com/news/news-20261102-gemini-api-deprecates-gemini-2-5-pro-flash-dec-1-auto-route-3-8-flash-3-5-flash-lite)에서 Google은 `gemini-2.5-pro`와 `gemini-2.5-flash`를 deprecated 처리하고 Google AI Studio의 모델 선택 목록에서 삭제했습니다.

2026년 12월 1일부터, 이 두 모델 이름으로 보내는 모든 API 요청은 Google이 선택한 더 최신 모델이 처리하며, **그 모델의 요금이 청구**됩니다.

이것이 단순 발표가 아닌 이유는 하나입니다. 코드 한 줄 고치지 않아도 모델 동작과 과금이 바뀐다는 점입니다.

---

## 기존 deprecation과 무엇이 다른가

Anthropic이 모델을 은퇴시킬 때는 해당 모델 ID로 요청을 보내면 오류를 반환합니다. 개발자가 즉시 문제를 인지할 수 있습니다.

Google의 12월 1일 변경은 다릅니다. [기존 모델 이름이 계속 응답을 반환하되, Google이 요청을 다른 모델로 라우팅하고 그 모델의 요금을 청구합니다.](https://www.datastudios.org/post/gemini-api-reroutes-gemini-2-5-pro-2-5-flash-december-1-3-8-flash-3-5-flash-lite) 코드가 "정상 작동"처럼 보이지만 실제로는 다른 모델이 응답하고 있는 것입니다.

라우팅 규칙은 다음과 같습니다.

| 기존 모델 ID | 라우팅 대상 |
|---|---|
| `gemini-2.5-pro` | `gemini-3.8-flash` |
| `gemini-2.5-flash` | `gemini-3.5-flash-lite` |

---

## 어떤 동작 변화가 생길 수 있나

[모델 문자열은 유효한 채로 유지되지만 동작이 바뀔 수 있으므로, 개발자는 12월 1일 이전에 모델 문자열을 교체하고 테스트를 다시 실행해야 합니다.](https://theepa.studio/blog/gemini-2-5-api-shutdown-december-2026/)

구체적인 주의 사항이 하나 있습니다. [Gemini 3.5 Flash-Lite는 기본적으로 thinking level이 `minimal`입니다.](https://aipolix.com/en-us/news/google-deprecates-gemini-2-5-pro-flash-api-auto-route-3-8-flash-3-5-flash-lite-december-1) 서브에이전트, 툴 호출, 코드 실행, 다단계 추론처럼 복잡한 작업에서는 `medium` 또는 `high`로 명시해야 합니다. `gemini-2.5-flash`를 위해 작성된 코드 중 이 기능에 의존하는 경우, 라우팅 발효 후 출력 품질이 조용히 저하될 수 있습니다.

라우팅은 갑작스러운 서비스 중단을 막아주지만, 코드를 변경하지 않아도 출력 품질·레이턴시·토큰 사용량·비용이 달라질 수 있습니다.

---

## 요금은 어떻게 바뀌나

출력 단가 기준으로 비용이 낮아질 수 있지만, 모델이 달라지므로 토큰 사용량 자체가 달라질 수 있다는 점을 감안해야 합니다. 또한 [Gemini 3.8 Flash는 2027년 1월 1일부터 가격이 인상될 예정](https://firebase.google.com/docs/ai-logic/models)이므로, 연초 예산 계획에도 반영이 필요합니다.

---

## 영향 범위 확인

[Gemini Developer API의 경우, 2026년 12월 1일부터 `gemini-2.5-flash`와 `gemini-2.5-pro` 요청이 더 최신 모델로 자동 라우팅되며, 이는 breaking change를 유발할 수 있습니다.](https://hellogrowth.ai/en/blog/gemini-2-5-api-retirement)

간단히 정리하면 다음과 같습니다.

- **영향받는 대상** — `gemini-2.5-pro` 또는 `gemini-2.5-flash` 모델 ID를 하드코딩한 모든 Gemini API 연동 코드
- **영향받지 않는 대상** — 이미 `gemini-3.8-flash` 등 최신 모델 ID를 사용하는 코드

---

## 12월 1일 전 체크리스트

아래 순서대로 대응하면 됩니다.

**1. 모델 ID 검색**
코드베이스 전체에서 `gemini-2.5-pro`, `gemini-2.5-flash` 문자열을 검색합니다. 환경 변수, 설정 파일, 프롬프트 템플릿까지 포함해야 합니다.

```bash
# 예시: 현재 디렉터리 기준 전체 검색
grep -r "gemini-2\.5" .
```

**2. 모델 ID 교체**
- `gemini-2.5-pro` → `gemini-3.8-flash`
- `gemini-2.5-flash` → `gemini-3.5-flash-lite`

**3. thinking level 명시**
에이전트·툴 호출·다단계 추론 등 복잡한 작업에서 thinking level 파라미터를 `minimal`이 아닌 값으로 명시적으로 설정하고 있는지 확인합니다.

**4. 테스트 재실행**
프롬프트 출력, 토큰 사용량, 비용 추정치를 12월 1일 전에 재검증합니다. 특히 Thinking budget 파라미터나 고급 기능을 사용하는 경우, 대체 모델에서 동일하게 지원되는지 개별 테스트로 확인해야 합니다.

**5. 가격 모니터링**
[Firebase AI Logic 지원 모델 문서](https://firebase.google.com/docs/ai-logic/models)에서 최신 요금과 2027년 1월 1일 이후 예정 요금을 확인해 두세요.

---

## 불확실한 점

기존 앱에서 대체 모델의 품질과 비용이 어떻게 달라지는지는 별도 테스트가 필요합니다. 라우팅 발표 시점(11월 2일)과 실제 적용일(12월 1일) 사이에 안내가 변경될 수 있으므로 [공식 Gemini API 릴리스 노트](https://aistudio.google.com/docs/changelog)와 [지원 종료 일정](https://aistudio.google.com/docs/deprecations)을 확인하세요.

---

## 한눈에 보기

| 항목 | 내용 |
|---|---|
| 공식 발표일 | 2026년 11월 2일 |
| 적용일 | 2026년 12월 1일 |
| `gemini-2.5-pro` 라우팅 대상 | `gemini-3.8-flash` |
| `gemini-2.5-flash` 라우팅 대상 | `gemini-3.5-flash-lite` |
| 코드 변경 없을 때 | 다른 모델이 조용히 응답, 과금도 새 모델 기준 |
| 대응 필요 범위 | 모델 ID를 하드코딩한 모든 Gemini API 연동 |

---

*공식 출처: [Gemini API 릴리스 노트 (2026-11-02 항목)](https://aistudio.google.com/docs/changelog), [Gemini 지원 종료 일정](https://aistudio.google.com/docs/deprecations), [Firebase AI Logic 지원 모델 문서](https://firebase.google.com/docs/ai-logic/models)*

## 참고 자료
- [참고 자료 1](https://en.wikipedia.org/wiki/ChatGPT)
- [참고 자료 2](https://github.com/jqueryscript/anthropic-claude-timeline)
- [참고 자료 3](https://en.wikipedia.org/wiki/Ollama)
- [참고 자료 4](https://en.wikipedia.org/wiki/Kling_AI)
- [참고 자료 5](https://dev.to/nikefd/3-ai-api-updates-worth-checking-this-week-migrations-tool-files-and-message-threads-lec)
- [참고 자료 6](https://releasebot.io/updates/anthropic/claude-developer-platform)
- [참고 자료 7](https://releasebot.io/updates/google)
- [참고 자료 8](https://agentdeals.dev/digest/2026-w47)
- [참고 자료 9](https://hellogrowth.ai/en/blog/ai-news-november-2026)
- [참고 자료 10](https://itcares.ca/en/blog/ai-news-this-week-november-2026-for-regular-people.html)
- [참고 자료 11](https://llmgateway.io/timeline)
- [참고 자료 12](https://en.wikipedia.org/wiki/Google_Antigravity)
- [참고 자료 13](https://en.wikipedia.org/wiki/OpenAI_o3)
- [참고 자료 14](https://en.wikipedia.org/wiki/2023_in_artificial_intelligence)
- [참고 자료 15](https://www.scriptbyai.com/ai-model-release-calendar/)
- [참고 자료 16](https://beevr.ai/blog/ai-model-releases-november-2026&gsessionid=dSHNV7IuiMrhftLX9Ujxoal_mA9fF_i1WhwtJauvF93BI1afKDN6zQ)
- [참고 자료 17](https://llm-stats.com/ai-news)
- [참고 자료 18](https://www.promptzone.com/ai-model-releases)
- [참고 자료 19](https://platform.claude.com/docs/en/release-notes/overview)
- [참고 자료 20](https://releasebot.io/updates/anthropic/claude)
- [참고 자료 21](https://www.digitalapplied.com/blog/claude-message-threads-messages-api-beta)
- [참고 자료 22](https://claude.com/resources/articles/message-threads)
- [참고 자료 23](https://emergent.sh/news/anthropic-message-threads-beta-cuts-latency)
- [참고 자료 24](https://releases.sh/anthropic/claude-platform)
- [참고 자료 25](https://x.com/ClaudeDevs/status/2117332449382510884)
- [참고 자료 26](https://en.wikipedia.org/wiki/Claude_Mythos)
- [참고 자료 27](https://firebase.google.com/docs/ai-logic/models)
- [참고 자료 28](https://hellogrowth.ai/en/blog/gemini-2-5-api-retirement)
- [참고 자료 29](https://en.wikipedia.org/wiki/Gemini_(language_model))
- [참고 자료 30](https://en.wikipedia.org/wiki/Google_Gemini)
- [참고 자료 31](https://theepa.studio/blog/gemini-2-5-api-shutdown-december-2026/)
- [참고 자료 32](https://aipolix.com/en-us/news/google-deprecates-gemini-2-5-pro-flash-api-auto-route-3-8-flash-3-5-flash-lite-december-1)
- [참고 자료 33](https://dev.to/mohammed_samaan_b256ef3f5/three-model-retirements-in-the-next-5-weeks-claude-sonnet-45-gemini-25-gpt-5-2hhd)
- [참고 자료 34](https://aicoder.com/news/news-20261102-gemini-api-deprecates-gemini-2-5-pro-flash-dec-1-auto-route-3-8-flash-3-5-flash-lite)
- [참고 자료 35](https://www.datastudios.org/post/gemini-api-reroutes-gemini-2-5-pro-2-5-flash-december-1-3-8-flash-3-5-flash-lite)

커버 이미지: [quapan](https://commons.wikimedia.org/w/index.php?curid=92188968) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
