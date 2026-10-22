---
title: Claude Inference Hooks & User Profiles 실전 가이드
slug: claude-inference-hooks-user-profiles-guide
date: '2026-10-22'
category: AI Tools
tags:
  - Claude
  - Anthropic
  - Inference Hooks
  - User Profiles
  - Enterprise AI
  - AI 보안
  - API
description: >-
  2026년 10월 GA 출시된 Claude Inference Hooks와 User Profiles로 B2B SaaS에 실시간 AI 보안
  레이어를 붙이는 방법을 공식 문서 기반으로 정리합니다.
cover: /images/posts/daily-2026-10-22/commons-153667928.webp
published: true
automated: true
sources:
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - 'https://developers.openai.com/codex/changelog'
  - 'https://openai.com/products/release-notes/'
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://blog.google/innovation-and-ai/products/'
  - >-
    https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/
  - 'https://developers.googleblog.com/'
  - 'https://flutter.dev/blog'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - 'https://developer.android.com/jetpack/androidx/releases/compose-animation'
  - 'https://developers.openai.com/api/docs/deprecations'
  - >-
    https://developers.openai.com/api/docs/changelog?mw_entry=2026-08-20-974ac0734e053853
  - 'https://openai.com/news/'
  - 'https://community.openai.com/c/announcements/6'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://www.anthropic.com/transparency'
  - 'https://community.openai.com/latest?no_definitions=true&page=1'
  - 'https://www.anthropic.com/news/3-5-models-and-computer-use'
  - 'https://claude.com/resources/articles/claude-duet'
  - 'https://claude.com/product/claude-duet'
  - 'https://support.claude.com/en/articles/17631495-get-started-with-claude-duet'
  - 'https://code.claude.com/docs/en/changelog'
  - >-
    https://claude.com/code-with-claude/session/ldn-build-a-proactive-agent-workflow-with-claude-code
  - 'https://www.anthropic.com/news/finance-agents'
  - 'https://claude.com/blog'
  - 'https://platform.claude.com/docs/en/manage-claude/inference-hooks'
  - 'https://platform.claude.com/docs/en/manage-claude/inference-hooks-endpoint'
  - 'https://platform.claude.com/docs/en/api/go/beta/user_profiles/create'
  - >-
    https://platform.claude.com/docs/en/manage-claude/inference-hooks-configuration
  - 'https://platform.claude.com/docs/en/manage-claude/compliance-api'
  - 'https://platform.claude.com/docs/en/api/beta/user_profiles/list'
  - 'https://platform.claude.com/docs/en/api/beta/user_profiles/retrieve'
  - 'https://claude.com/resources/articles/claude-enterprise-inference-hooks'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Windell Oskay
  title: Raw materials – Several microprocessors 20070911
  source: 'https://commons.wikimedia.org/w/index.php?curid=153667928'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: c231510c-2d54-41ee-a296-00e0180c6553
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/3/38/Raw_materials_%E2%80%93_Several_microprocessors_20070911.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 448fbe87762d3c90f99ffdd8026efcc5dfb58e8ce0445661db2bf1e750c0cde8
  verifiedAt: '2026-10-22T03:14:42.676Z'
  originalArtist: Windell Oskay
  changes: Resized and converted to WebP
---
> **TL;DR** — 2026년 10월 20일, Anthropic이 Claude Enterprise 조직을 위한 **Inference Hooks(GA)**와 **User Profiles(GA)**를 동시 출시했다. Inference Hooks는 모든 Claude 프롬프트를 모델 실행 전에 자체 HTTPS 서버로 라우팅해 허용/거부를 판정할 수 있게 해주고, User Profiles는 최종 고객 단위로 안전 조치를 분리한다. B2B SaaS나 다중 사용자 플랫폼을 Claude API 위에 얹고 있다면 지금 바로 적용할 수 있다.

---

## Inference Hooks란 무엇인가

[공식 Inference Hooks 문서](https://platform.claude.com/docs/en/manage-claude/inference-hooks)에 따르면, Inference Hooks는 Claude Enterprise 조직이 **관리 대상 프롬프트를 AI 보안 서버(자체 HTTPS 엔드포인트)로 라우팅**할 수 있게 해주는 기능이다.

흐름은 단순하다.

1. 사용자가 프롬프트를 제출한다.
2. Anthropic 서버가 대화 트랜스크립트를 조직의 훅 서버로 전송한다.
3. 훅 서버가 `allow` 또는 `deny` 판정을 반환한다.
4. `deny`이면 요청이 모델에 전달되지 않는다.

핵심은 **훅이 Anthropic 서버에서 실행된다**는 점이다. 클라이언트 기기에 별도 에이전트를 설치하거나 SDK를 패치할 필요 없이, [단일 훅 하나로 claude.ai, Claude Code, Claude for Microsoft 365, Claude in Chrome 등 Claude Enterprise 조직의 모든 제품을 커버](https://platform.claude.com/docs/en/manage-claude/inference-hooks)한다. 단, Amazon Bedrock과 Google Cloud에서는 사용할 수 없다.

---

## 두 가지 훅 이벤트 타입

[공식 문서](https://platform.claude.com/docs/en/manage-claude/inference-hooks)는 두 가지 이벤트를 정의한다.

| 이벤트 | 발생 시점 | 조건 |
|---|---|---|
| `prompt` | 추론 시작 전, 관리 대상 요청당 1회 | 항상 |
| `tool_call` | Claude 응답에 툴 콜이 포함될 때, 툴 실행 전 | **Validate tool calls** 옵션 활성화 시 |

훅 서버의 판정 응답은 최소한의 JSON이다.

```json
// 허용
{ "action": "allow" }

// 거부 (사용자에게 표시할 사유 포함)
{ "action": "deny", "reason": "이 요청은 조직 보안 정책에 위반됩니다." }
```

[타임아웃 기본값은 5초](https://platform.claude.com/docs/en/manage-claude/inference-hooks)이며, 훅 서버가 이 안에 응답하지 못하면 **Block the request** 모드(fail-closed)로 추론이 중단된다. 서비스 가용성과 보안 정책 사이의 트레이드오프를 설계 단계에서 명확히 결정해야 한다.

---

## User Profiles: 최종 고객 단위 안전 조치

[User Profiles 공식 문서](https://platform.claude.com/docs/en/api/beta/user_profiles)에 따르면, 플랫폼이나 API 접근을 재판매하는 경우 각 API 요청이 **어떤 최종 고객을 위한 것인지** Anthropic에 명시할 수 있다. 덕분에 안전 조치가 조직 전체가 아니라 특정 최종 고객에게만 적용된다.

SDK와 `ant` CLI가 `/v1/user_profiles` 엔드포인트를 지원한다.

### Go SDK로 User Profile 생성

```go
client := anthropic.NewClient(
    option.WithAPIKey("my-anthropic-api-key"),
)
betaUserProfile, err := client.Beta.UserProfiles.New(
    context.TODO(),
    anthropic.BetaUserProfileNewParams{},
)
```

### curl로 User Profile 목록 조회

```bash
curl https://api.anthropic.com/v1/user_profiles \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: user-profiles-2026-08-18' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### curl로 특정 User Profile 조회

```bash
curl https://api.anthropic.com/v1/user_profiles/$USER_PROFILE_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: user-profiles-2026-08-18' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

> ⚠️ **베타 헤더 버전 주의:** [공식 문서](https://platform.claude.com/docs/en/api/beta/user_profiles)에 따르면 `external_id` 필드는 헤더 버전에 따라 응답 구조가 달라진다. `user-profiles-2026-09-04` 헤더에서는 `external_user_details.reference_id`로 반환된다.

---

## Organization Webhooks: 상태 변화를 push로 수신

[Admin API에는 Organization Webhooks(베타)도 추가](https://platform.claude.com/docs/en/manage-claude/inference-hooks)되었다(`webhooks-2026-10-07` 베타 헤더 사용). `/v1/organizations/webhooks` 엔드포인트로 다음 두 이벤트에 대한 웹훅을 등록할 수 있다.

- 조직의 사용자 프로필이 **제한/차단될 때**
- 제한/차단이 **해제될 때**

단, Organization Webhooks에 접근하려면 Anthropic 계정 팀에 별도로 연락해야 한다. 자동 활성화가 아니다.

---

## 실전 패턴: 차단 없이 트랜스크립트 아카이빙

보안 차단보다 **감사 로그(audit log) 수집**이 우선인 팀이라면, 항상 `allow`를 반환하되 트랜스크립트를 저장하는 패턴이 유용하다.

```python
from fastapi import FastAPI, Request

app = FastAPI()

@app.post("/hook")
async def inference_hook(request: Request):
    payload = await request.json()
    # 응답 후 비동기로 저장 → 사용자 크리티컬 패스 밖
    save_transcript_async(payload)
    return {"action": "allow"}
```

이 방식은 [Compliance API를 폴링하는 대신 사용할 수 있는 push 기반 대안](https://platform.claude.com/docs/en/manage-claude/compliance-api)이기도 하다. 저장을 응답 후에 처리하면 라운드트립이 사용자 경험에 영향을 주지 않는다.

---

## 적용 전 체크리스트

- [ ] **Claude Enterprise 플랜** 가입 여부 확인 (Inference Hooks는 Enterprise 전용)
- [ ] 훅 설정 권한: `organization:manage` 권한을 가진 **Owner 또는 Primary owner** 역할 필요
- [ ] 훅 서버 **응답 시간 목표** 결정 (기본 타임아웃 5초 이내)
- [ ] 타임아웃/장애 시 **fail-closed vs. fail-open** 정책 팀 내 합의
- [ ] User Profiles 베타 헤더 **버전 통일** (혼용 시 응답 구조 불일치 발생)
- [ ] Organization Webhooks 필요 시 **Anthropic 계정 팀 사전 접촉**

---

## 릴리스 타임라인

| 기능 | 날짜 | 상태 |
|---|---|---|
| Inference Hooks 베타 시작 | 2026년 8월 5일 | Beta |
| Inference Hooks GA 전환 | 2026년 10월 20일 | **GA** |
| User Profiles 출시 | 2026년 10월 20일 | **GA** |
| Organization Webhooks | 2026년 10월 20일 | Beta |

출처: [Claude Platform 공식 릴리스 노트](https://platform.claude.com/docs/en/release-notes/overview)

---

Claude API 위에 멀티테넌트 B2B 제품을 올리고 있다면, Inference Hooks + User Profiles 조합은 기존에 애플리케이션 레이어에서 직접 구현하던 프롬프트 필터링·감사 로그 로직을 **인프라 레벨로 위임**할 수 있는 첫 번째 공식 수단이다. 차단 정책보다 로깅·컴플라이언스가 급하다면 always-allow 패턴부터 시작해 점진적으로 deny 규칙을 추가하는 방식을 권장한다.


## 참고 자료
- [공식 자료 1](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 2](https://developers.openai.com/codex/changelog)
- [공식 자료 3](https://openai.com/products/release-notes/)
- [공식 자료 4](https://developers.openai.com/api/docs/changelog)
- [공식 자료 5](https://blog.google/innovation-and-ai/products/)
- [공식 자료 6](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/)
- [공식 자료 7](https://developers.googleblog.com/)
- [공식 자료 8](https://flutter.dev/blog)
- [공식 자료 9](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 10](https://developer.android.com/jetpack/androidx/releases/compose-animation)
- [공식 자료 11](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 12](https://developers.openai.com/api/docs/changelog?mw_entry=2026-08-20-974ac0734e053853)
- [공식 자료 13](https://openai.com/news/)
- [공식 자료 14](https://community.openai.com/c/announcements/6)
- [공식 자료 15](https://platform.claude.com/docs/en/release-notes/overview)
- [공식 자료 16](https://www.anthropic.com/transparency)
- [공식 자료 17](https://community.openai.com/latest?no_definitions=true&page=1)
- [공식 자료 18](https://www.anthropic.com/news/3-5-models-and-computer-use)
- [공식 자료 19](https://claude.com/resources/articles/claude-duet)
- [공식 자료 20](https://claude.com/product/claude-duet)
- [공식 자료 21](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)
- [공식 자료 22](https://code.claude.com/docs/en/changelog)
- [공식 자료 23](https://claude.com/code-with-claude/session/ldn-build-a-proactive-agent-workflow-with-claude-code)
- [공식 자료 24](https://www.anthropic.com/news/finance-agents)
- [공식 자료 25](https://claude.com/blog)
- [공식 자료 26](https://platform.claude.com/docs/en/manage-claude/inference-hooks)
- [공식 자료 27](https://platform.claude.com/docs/en/manage-claude/inference-hooks-endpoint)
- [공식 자료 28](https://platform.claude.com/docs/en/api/go/beta/user_profiles/create)
- [공식 자료 29](https://platform.claude.com/docs/en/manage-claude/inference-hooks-configuration)
- [공식 자료 30](https://platform.claude.com/docs/en/manage-claude/compliance-api)
- [공식 자료 31](https://platform.claude.com/docs/en/api/beta/user_profiles/list)
- [공식 자료 32](https://platform.claude.com/docs/en/api/beta/user_profiles/retrieve)
- [공식 자료 33](https://claude.com/resources/articles/claude-enterprise-inference-hooks)

커버 이미지: [Windell Oskay](https://commons.wikimedia.org/w/index.php?curid=153667928) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
