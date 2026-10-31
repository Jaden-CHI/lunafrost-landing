---
title: Gemini API CLI로 AI 에이전트·CI 파이프라인 자동화하기
slug: gemini-api-cli-agent-ci-pipeline
date: '2026-10-31'
category: AI Tools
tags:
  - Gemini
  - CLI
  - CI/CD
  - AI 에이전트
  - 자동화
  - Interactions API
description: >-
  Google이 출시한 제로 의존성 CLI 도구 `gemini-api`로 SDK 코드 없이 셸과 CI 파이프라인에서 Gemini를 바로
  호출하는 방법을 공식 문서 기준으로 정리합니다.
cover: /images/posts/daily-2026-10-31/commons-149216205.webp
published: true
automated: true
sources:
  - 'https://openai.com/news/product-releases/'
  - 'https://openai.com/products/release-notes/'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
  - 'https://ai.google.dev/gemini-api/docs/changelog?release=09-18-2026'
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://developers.openai.com/api/docs/deprecations'
  - 'https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes'
  - 'https://github.blog/page/290/'
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/
  - 'https://help.openai.com/en/articles/9624314-model-release-notes'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - 'https://community.openai.com/c/announcements/6'
  - 'https://cdn.openai.com/pdf/gpt-6-october.pdf'
  - 'https://www.anthropic.com/news/3-5-models-and-computer-use'
  - 'https://ai.google.dev/gemini-api/docs/cli'
  - 'https://ai.google.dev/api'
  - 'https://ai.google.dev/gemini-api/docs/get-started'
  - 'https://ai.google.dev/gemini-api/docs/quickstart'
  - 'https://ai.google.dev/gemini-api/docs/interactions/quickstart'
  - 'https://ai.google.dev/gemini-api/docs/interactions-overview'
  - 'https://ai.google.dev/gemini-api/docs/generate-content/get-started'
  - 'https://ai.google.dev/gemini-api/docs/coding-agents'
  - 'https://ai.google.dev/gemini-api/docs/api-overview'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: >-
    Authors of the preprint study: Yingbo Li, Yucong Duan, Anamaria-Beatrice
    Spulber, Haoyang Che, Zakaria Maamar, Zhao Li, Chen Yang, Yu lei
  title: Integrated physical artificial intelligence.png
  source: 'https://commons.wikimedia.org/w/index.php?curid=149216205'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-149216205
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/7/7d/Integrated_physical_artificial_intelligence.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 14a28bf78186795c4b45742417d9b3b0d1664c88fdf08e01d4a2ca9c65390f84
  verifiedAt: '2026-10-31T11:38:19.688Z'
  originalArtist: >-
    Authors of the preprint study: Yingbo Li, Yucong Duan, Anamaria-Beatrice
    Spulber, Haoyang Che, Zakaria Maamar, Zhao Li, Chen Yang, Yu lei
  changes: Resized and converted to WebP
---

> **TL;DR** — Google이 2026년 10월 27일 공식 베타 출시한 `gemini-api` CLI는 SDK 코드 한 줄 없이 셸에서 Gemini를 호출할 수 있는 **무상태(stateless) · 제로 의존성** 도구입니다. AI 코딩 에이전트, 스크립트, CI 파이프라인에 바로 끼워 넣을 수 있고, 새로운 표준 엔드포인트인 Interactions API 위에서 동작합니다.

---

## `gemini-api`가 뭔데?

[Google AI for Developers 공식 릴리즈 노트](https://ai.google.dev/gemini-api/docs/changelog)에 따르면, `gemini-api` CLI는 2026년 10월 27일 베타로 공식 출시됐습니다. 공식적인 포지셔닝은 다음과 같습니다.

> "AI 코딩 에이전트, 스크립트, CI 파이프라인을 위한 무상태(stateless), 제로 의존성 커맨드라인 클라이언트"

macOS, Linux, Windows에서 설치 스크립트, Go, 또는 사전 빌드된 바이너리로 설치할 수 있으며, 이 CLI 하나로 텍스트·미디어(이미지, 음성, 음악, 영상) 생성, 문서·녹음 파일 분석, Gemini 관리형 에이전트 실행까지 커버합니다.

### `@google/gemini-cli`와 뭐가 다른가?

많은 분들이 헷갈려 하는 부분입니다. [공식 CLI 가이드](https://ai.google.dev/gemini-api/docs/cli)는 두 도구를 명확히 구분합니다.

| 항목 | `gemini-api` (이번 글) | `@google/gemini-cli` |
|---|---|---|
| **성격** | 정적(stateless) API 클라이언트 | 인터랙티브 코딩 에이전트 |
| **로컬 상태** | 유지하지 않음 | 세션 컨텍스트 유지 |
| **주용도** | CI, 스크립트, 에이전트 내부 도구 | 개발자와의 대화형 코딩 보조 |

핵심은 `gemini-api`가 **어떤 코딩 에이전트 안에서도 실행할 수 있는 도구**라는 점입니다. 즉, `@google/gemini-cli` 세션 안에서 `gemini-api`를 서브 커맨드처럼 호출하는 구성도 가능합니다.

---

## 설계 철학: 무상태(Stateless)가 왜 중요한가?

[공식 문서](https://ai.google.dev/gemini-api/docs/cli)는 `gemini-api`가 기본적으로 숨겨진 로컬 상태를 유지하지 않는다고 명시합니다. CI 파이프라인이나 자동화 스크립트 관점에서 이는 큰 장점입니다.

- **재현성 보장**: 동일한 커맨드는 동일한 환경에서 동일하게 동작합니다.
- **디버깅 용이성**: 숨겨진 캐시나 세션 상태가 없으므로 예기치 않은 동작의 원인을 추적하기 쉽습니다.
- **병렬 실행 안전**: 각 호출이 독립적이므로 여러 파이프라인 잡이 동시에 실행돼도 충돌이 없습니다.

멀티스텝 워크플로가 필요하다면? 이전 interaction의 ID(`--previous-interaction-id`), 업로드된 파일 URI(`files/<id>`), 또는 백그라운드 interaction ID를 **명시적으로 체이닝**해서 구성합니다. 상태를 숨기지 않고 데이터 흐름을 코드로 드러내는 방식이라, 파이프라인 가독성이 오히려 높아집니다.

---

## 빠르게 시작하기: 인증과 기본 확인

[공식 CLI 가이드](https://ai.google.dev/gemini-api/docs/cli)에서 발췌한 설정 흐름입니다. Google AI Studio에서 API 키를 생성한 뒤 아래를 실행합니다.

```bash
# 환경 변수로 키 주입
export GEMINI_API_KEY="YOUR_API_KEY"

# OS 키체인에 저장하거나 인터랙티브 설정
gemini-api configure --api-key "YOUR_API_KEY"

# 현재 인증 소스 확인
gemini-api whoami

# 실제 요청 없이 동작 미리보기 (dry run)
gemini-api generate "Confirm CLI setup in one sentence." --dry-run
```

`--dry-run` 플래그로 API 비용을 소모하지 않고 커맨드 구성을 검증할 수 있다는 점은 CI 환경 셋업 시 특히 유용합니다.

---

## CI 파이프라인 연동 실전 팁

### `--agent-mode`로 구조화된 오류 처리

[공식 문서](https://ai.google.dev/gemini-api/docs/cli)에 따르면 `--agent-mode` 플래그를 추가하면 stderr에 **구조화된 JSON 오류**를 반환하고, 종료 코드로 실패를 처리합니다. `--interactive`를 전달하지 않는 한 모든 커맨드는 사용자 프롬프트를 표시하지 않습니다. CI 잡이 멈추는 일이 없다는 뜻입니다.

```bash
# CI 잡 예시: PR 코드 변경 사항을 요약해 커밋 메시지 초안 생성
gemini-api generate "Summarize the following diff as a commit message: $(git diff HEAD~1)" \
  --agent-mode
```

### 멀티스텝 체이닝 패턴

문서가 제시하는 체이닝 방법은 다음과 같습니다. `generate` 또는 `agent run`이 반환하는 `id` 값을 캡처해 다음 스텝에 넘기는 방식입니다.

```bash
# 1단계: 파일 업로드 후 파일 경로 캡처
FILE_URI=$(gemini-api files upload ./meeting-recording.mp3)

# 2단계: 업로드된 파일 URI를 사용해 트랜스크립션 요청
TRANSCRIPTION_ID=$(gemini-api generate "Transcribe this audio." \
  --file "$FILE_URI" | jq -r '.id')

# 3단계: 이전 interaction ID를 이어받아 요약 생성
gemini-api generate "Summarize the transcription as bullet points." \
  --previous-interaction-id "$TRANSCRIPTION_ID"
```

### 보안: API 키는 반드시 시크릿 스토어에서 주입

[공식 문서](https://ai.google.dev/gemini-api/docs/coding-agents)는 이 점을 명확히 강조합니다. `GEMINI_API_KEY`는 절대 리포지터리나 빌드 파일에 커밋하지 말고, GitHub Actions Secrets, AWS Secrets Manager, HashiCorp Vault 같은 **시크릿 스토어에서 런타임에 주입**해야 합니다.

```yaml
# GitHub Actions 예시
- name: Run Gemini summarization
  env:
    GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  run: |
    gemini-api generate "Summarize today's test failures." --agent-mode
```

---

## 코딩 에이전트 환경에서 쓸 때: AGENTS.md 권장 설정

[코딩 에이전트 공식 가이드](https://ai.google.dev/gemini-api/docs/coding-agents)는 에이전트 지시 프롬프트(AGENTS.md)에 명시할 것을 다음과 같이 권장합니다.

- **현재 Gemini API SDK만 사용**: Python은 `google-genai`, TypeScript/JS는 `@google/genai`
- **레거시 SDK 사용 금지**: `google-generativeai`, `@google/generative-ai`는 절대 사용하지 않음
- **새 애플리케이션은 Interactions API 우선**: `client.interactions.create` 사용. `generateContent`가 필요한 특정 기능은 예외

에이전트에게 `gemini-api` 접근 권한을 부여할 때는, 지시 프롬프트에 "텍스트·미디어 생성, 문서·녹음 분석, Gemini 관리형 에이전트 실행 및 관리가 가능하다"고 명시하는 것이 권장됩니다. 커맨드 탐색은 `gemini-api --help`, 스키마 확인은 `gemini-api <command> --schema`로 합니다.

---

## Interactions API: 앞으로의 표준

`gemini-api`가 올라선 기반인 [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview)는 멀티스텝 도구 사용, 오케스트레이션, 복잡한 추론 플로우를 타입화된 실행 단계를 통해 지원하는 새 표준 엔드포인트입니다. Google은 앞으로 코어 메인라인 패밀리를 넘어서는 신규 모델과 에이전틱 기능·도구를 **Interactions API에서만 독점 출시**한다고 밝혔습니다.

기존 `generateContent` API는 레거시로 분류되며, [공식 문서](https://ai.google.dev/gemini-api/docs/api-overview)는 신규 프로젝트에서 Interactions API를 강력히 권장하고 있습니다. 지금 당장 마이그레이션할 여유가 없더라도, 새로 시작하는 프로젝트라면 처음부터 Interactions API 위에서 설계하는 것이 합리적입니다.

---

## 주의할 점

[공식 릴리즈 노트](https://ai.google.dev/gemini-api/docs/changelog)는 `gemini-api`가 오픈소스 베타임을 명시하며, **마이너 버전 간에도 브레이킹 체인지가 발생할 수 있다**고 경고합니다. 자동화 환경과 CI 파이프라인에서는 특정 릴리즈 버전을 고정(pin)하는 것이 권장됩니다.

다음 항목들은 현시점 공식 문서에서 명확히 확인되지 않아 이 글에서 다루지 않았습니다.

- 정확한 설치 명령어와 최신 버전 태그
- Interactions API 호출 단가(CLI 문서에 별도 명시 없음)
- Windows 상세 설치 절차
- GA(정식 출시) 전환 일정

요금은 [Gemini API 공식 Pricing 페이지](https://ai.google.dev/gemini-api/docs/changelog)에서, 최신 커맨드 인터페이스는 설치 후 `gemini-api --help`로 직접 교차 검증하세요.

---

`gemini-api`는 "Gemini를 쓰려면 SDK를 배워야 한다"는 진입 장벽을 낮춥니다. 셸 스크립트를 쓸 줄 안다면 오늘 당장 CI 파이프라인에 Gemini를 붙여볼 수 있습니다. 베타 기간인 만큼 버전 고정과 공식 문서 모니터링을 습관화하면서 써보시길 권합니다.


## 참고 자료
- [공식 자료 1](https://openai.com/news/product-releases/)
- [공식 자료 2](https://openai.com/products/release-notes/)
- [공식 자료 3](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 4](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [공식 자료 5](https://ai.google.dev/gemini-api/docs/changelog?release=09-18-2026)
- [공식 자료 6](https://developers.openai.com/api/docs/changelog)
- [공식 자료 7](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 8](https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes)
- [공식 자료 9](https://github.blog/page/290/)
- [공식 자료 10](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/)
- [공식 자료 11](https://help.openai.com/en/articles/9624314-model-release-notes)
- [공식 자료 12](https://platform.claude.com/docs/en/release-notes/overview)
- [공식 자료 13](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 14](https://community.openai.com/c/announcements/6)
- [공식 자료 15](https://cdn.openai.com/pdf/gpt-6-october.pdf)
- [공식 자료 16](https://www.anthropic.com/news/3-5-models-and-computer-use)
- [공식 자료 17](https://ai.google.dev/gemini-api/docs/cli)
- [공식 자료 18](https://ai.google.dev/api)
- [공식 자료 19](https://ai.google.dev/gemini-api/docs/get-started)
- [공식 자료 20](https://ai.google.dev/gemini-api/docs/quickstart)
- [공식 자료 21](https://ai.google.dev/gemini-api/docs/interactions/quickstart)
- [공식 자료 22](https://ai.google.dev/gemini-api/docs/interactions-overview)
- [공식 자료 23](https://ai.google.dev/gemini-api/docs/generate-content/get-started)
- [공식 자료 24](https://ai.google.dev/gemini-api/docs/coding-agents)
- [공식 자료 25](https://ai.google.dev/gemini-api/docs/api-overview)

커버 이미지: [Authors of the preprint study: Yingbo Li, Yucong Duan, Anamaria-Beatrice Spulber, Haoyang Che, Zakaria Maamar, Zhao Li, Chen Yang, Yu lei](https://commons.wikimedia.org/w/index.php?curid=149216205) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
