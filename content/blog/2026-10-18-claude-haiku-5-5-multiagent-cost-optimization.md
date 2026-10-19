---
title: Claude Haiku 5.5로 멀티에이전트 파이프라인 비용 줄이기
slug: claude-haiku-5-5-multiagent-cost-optimization
date: '2026-10-18'
category: AI Tools
tags:
  - Claude
  - Haiku
  - 멀티에이전트
  - 비용최적화
  - 서브에이전트
  - AI파이프라인
description: >-
  Anthropic이 출시한 Claude Haiku 5.5의 가격 구조, 멀티에이전트 서브에이전트 활용법, 마이그레이션 주의사항을 공식 문서
  기반으로 정리합니다.
cover: >-
  /images/posts/claude-haiku-5-5-multiagent-cost-optimization/commons-196076573.webp
published: true
automated: true
sources:
  - >-
    https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006
  - 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
  - 'https://developers.openai.com/api/docs/deprecations'
  - 'https://support.claude.com/en/articles/12138966-release-notes'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - 'https://community.openai.com/c/announcements/6'
  - 'https://developers.openai.com/api/docs/changelog'
  - >-
    https://blog.google/products-and-platforms/platforms/google-play/google-play-updates-october-2026/
  - 'https://developer.android.com/jetpack/androidx/releases/compose-material3'
  - 'https://github.blog/changelog/'
  - 'https://developer.apple.com/news/'
  - 'https://developer.android.com/blog/latest'
  - 'https://developer.apple.com/news/releases/'
  - 'https://developer.android.com/blog'
  - 'https://developer.apple.com/hello/october26/'
  - 'https://developer.android.com/studio/releases'
  - 'https://developer.apple.com/news/releases/?id=06182026b'
  - 'https://developer.android.com/latest-updates'
  - 'https://developer.android.com/about/versions/17/qpr2/release-notes'
  - 'https://platform.claude.com/docs/en/models/haiku-5-5/overview'
  - 'https://www.anthropic.com/claude-haiku-5-5'
  - 'https://platform.claude.com/docs/en/about-claude/pricing'
  - 'https://www.anthropic.com/claude/haiku'
  - 'https://platform.claude.com/docs/en/models/haiku-5-5/overview.md'
  - 'https://vercel.com/ai-gateway/models/claude-haiku-5.5'
  - 'https://platform.claude.com/docs/en/models/haiku-4-5/overview'
  - 'https://platform.claude.com/docs/en/models/overview'
  - 'https://platform.claude.com/docs/en/release-notes/overview'
  - 'https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/'
  - 'https://code.claude.com/docs/en/sub-agents'
  - 'https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration'
  - >-
    https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  - 'https://platform.claude.com/docs/en/models/haiku-5-5/whats-new-haiku-5-5'
  - 'https://code.claude.com/docs/en/model-config'
  - >-
    https://academy.claude.com/courses/introduction-to-subagents/creating-a-subagent
  - 'https://platform.claude.com/cookbook/multimodal-using-sub-agents'
recoveredAt: '2026-10-19T04:50:54.945Z'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Revaldinho
  title: Ferranti F100-L Microprocessor Die Photograph
  source: 'https://commons.wikimedia.org/w/index.php?curid=196076573'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: e6866504-b829-42d5-8914-4a7220caaedc
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/c/c0/Ferranti_F100-L_Microprocessor_Die_Photograph.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: e5e67876751879667569ddcba34563aab718e3b4571a0edb9091441d213a622f
  verifiedAt: '2026-10-19T04:53:33.947Z'
  originalArtist: >-
    <a
    href="//commons.wikimedia.org/w/index.php?title=User:Revaldinho&amp;action=edit&amp;redlink=1"
    class="new" title="User:Revaldinho (page does not exist)">Revaldinho</a>
  changes: Resized and converted to WebP
---
## TL;DR

- Claude Haiku 5.5는 2026년 10월 7일 출시, 100K 토큰 이하 요청에서 Haiku 4.5 대비 **90% 저렴**
- 프롬프트 캐싱 최소 길이가 4,096 → **512 토큰**으로 단축돼 소규모 요청도 캐싱 적용 가능
- `CLAUDE_CODE_SUBAGENT_MODEL` 환경 변수 하나로 서브에이전트 전체를 Haiku로 전환 가능
- `temperature`, `top_p`, assistant prefill 등 기존 파라미터 일부가 **에러를 반환**하므로 마이그레이션 전 확인 필수

---

## Claude Haiku 5.5란?

Anthropic은 2026년 10월 7일 [Claude Haiku 5.5를 공식 출시](https://www.anthropic.com/claude-haiku-5-5)했습니다. 분류(classification), 라우팅(routing), 추출(extraction), 요약(summarization) 같은 **고볼륨·저지연 작업**에 최적화된 소형 모델입니다.

주요 스펙은 다음과 같습니다.

- **컨텍스트 윈도우**: 1M 토큰
- **최대 출력**: 128K 토큰
- **Adaptive Thinking**: `effort` 파라미터로 추론 깊이 조절
- **Browser use tool**: Claude API 및 Google Cloud에서 신규 지원

[공식 모델 문서](https://platform.claude.com/docs/en/models/haiku-5-5/overview)에 따르면 Haiku 5.5는 현재까지 가장 빠른 Haiku 모델로, 실시간 고객 지원이나 브라우저 자동화처럼 속도가 중요한 작업에도 효과적입니다.

---

## 가격 구조: 어디서 얼마나 아낄 수 있나?

[Anthropic 공식 가격 문서](https://platform.claude.com/docs/en/about-claude/pricing)를 기준으로 정리하면 아래와 같습니다.

| 구간 | 입력 | 출력 |
|---|---|---|
| 100K 토큰 이하 | $0.10/MTok | $0.50/MTok |
| 100K 토큰 초과 | $0.50/MTok | $2.50/MTok |

Haiku 4.5와 비교하면, **100K 이하 요청은 90% 절감, 100K 초과 요청은 50% 절감**됩니다. 평균적으로는 약 75% 더 저렴하게 사용할 수 있습니다.

여기에 두 가지 추가 절감 수단이 있습니다.

- **프롬프트 캐싱**: 최대 90% 절감. 캐싱 최소 길이가 기존 4,096 토큰에서 **512 토큰**으로 줄어 훨씬 짧은 프롬프트도 캐시 적용 대상이 됩니다.
- **배치 처리**: 추가로 50% 절감

실시간 응답이 필요 없는 배치 파이프라인이라면 캐싱과 배치 처리를 함께 적용하는 것이 가장 효율적입니다.

---

## 멀티에이전트 파이프라인에서 Haiku를 서브에이전트로 쓰는 법

[Anthropic 멀티에이전트 오케스트레이션 문서](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)는 강력한 오케스트레이터 모델이 전체 작업을 계획하고, 세부 서브태스크를 Haiku에 위임하는 패턴을 권장합니다. 각 서브에이전트는 **별도의 컨텍스트 윈도우, 커스텀 시스템 프롬프트, 특정 툴 접근 권한, 독립적인 권한**을 갖고 실행됩니다.

테스트 실행, 문서 수집, 로그 파일 처리처럼 대량의 출력을 생성하는 사이드 태스크를 메인 컨텍스트에서 분리할 때 특히 유용합니다.

### 예제 1: Claude Code에서 서브에이전트 전체를 Haiku로 고정

[Claude Code 서브에이전트 공식 문서](https://code.claude.com/docs/en/sub-agents)에 따르면, 설정 파일에 아래 환경 변수를 추가하면 모든 서브에이전트가 Haiku로 실행됩니다.

```json
{
  "env": {
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku",
    "CLAUDE_CODE_SUBAGENT_MODEL_FORCE": "1"
  }
}
```

오케스트레이터는 더 강력한 모델을 유지하면서 반복적인 서브태스크만 Haiku로 내려보내는 구조입니다.

### 예제 2: YAML로 Haiku 서브에이전트 정의 (GitHub MCP 연동)

[멀티에이전트 오케스트레이션 문서](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)에서 제공하는 `researcher.md` 예시입니다. `claude-haiku-5-5` 모델에 GitHub MCP 서버를 붙인 리서치 에이전트를 정의합니다.

```yaml
---
name: researcher
model: claude-haiku-5-5
mcp_servers:
  - type: url
    name: github
    url: https://api.githubcopilot.com/mcp/
tools:
  - type: mcp_toolset
    mcp_server_name: github
---
```

동일한 유형의 워커를 병렬로 여러 개 실행하는 경우, 이런 커스텀 서브에이전트를 정의해두면 재사용이 용이합니다.

### effort 파라미터 선택 기준

[Claude Code 모델 설정 문서](https://code.claude.com/docs/en/model-config)에 따르면 Haiku 5.5의 기본 `effort` 레벨은 `medium`입니다.

- **`medium`**: 새 기능 구현처럼 범위가 명확한 일상적인 엔지니어링 작업
- **`high`**: 기존 코드베이스의 버그 수정처럼 검증이 중요하거나 엣지 케이스가 예상되는 경우

불필요하게 `high`를 고정하면 토큰 소비가 늘어나므로, 작업 성격에 따라 동적으로 조절하는 것이 좋습니다.

---

## GitHub Copilot에서도 쓸 수 있다

[GitHub Changelog](https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot)에 따르면 Haiku 5.5는 GitHub Copilot에서도 정식 출시(GA)되었습니다. 초기 테스트에서 Haiku 5.5는 Claude Sonnet 5에 필적하는 코딩 성능을 훨씬 적은 토큰과 단계 수로 달성했다고 밝혔습니다. 서브에이전트, 빠른 편집, 터미널 작업처럼 속도가 중요한 고볼륨 작업에 적합합니다.

---

## 마이그레이션 전 반드시 확인할 브레이킹 체인지

Haiku 4.5용 코드를 그대로 Haiku 5.5에 투입하면 **런타임 에러**가 발생할 수 있습니다. [릴리스 노트](https://platform.claude.com/docs/en/release-notes/overview)에서 명시한 브레이킹 체인지는 다음 네 가지입니다.

1. **수동 extended thinking (`budget_tokens`)** → 에러 반환. Adaptive Thinking(`effort` 파라미터)으로 교체
2. **`temperature`, `top_p`, `top_k` 파라미터** → 에러 반환. 해당 파라미터 제거 필요
3. **Assistant message prefill** → 에러 반환. 메시지를 user turn으로 종료하도록 수정
4. **`computer_20250124` 툴** → Claude API·Google Cloud·Amazon Bedrock에서 에러 반환. 각 플랫폼에 맞는 최신 툴셋으로 교체

특히 `temperature`를 명시적으로 설정하는 코드는 광범위하게 퍼져 있는 경우가 많으므로, 배포 전 코드베이스 전체를 검색해 제거하는 것을 권장합니다.

---

## 정리

Haiku 5.5는 단순히 저렴한 모델이 아니라, 512 토큰부터 캐싱이 적용되고 1M 컨텍스트를 지원하는 실질적인 서브에이전트용 모델입니다. 오케스트레이터-서브에이전트 패턴을 이미 쓰고 있다면, 서브에이전트 레이어를 Haiku 5.5로 교체하는 것만으로도 의미 있는 비용 절감을 기대할 수 있습니다. 다만 마이그레이션 전 브레이킹 체인지 네 가지는 반드시 점검하세요.

## 참고 자료
- [공식 자료 1](https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006)
- [공식 자료 2](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [공식 자료 3](https://developers.openai.com/api/docs/deprecations)
- [공식 자료 4](https://support.claude.com/en/articles/12138966-release-notes)
- [공식 자료 5](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 6](https://community.openai.com/c/announcements/6)
- [공식 자료 7](https://developers.openai.com/api/docs/changelog)
- [공식 자료 8](https://blog.google/products-and-platforms/platforms/google-play/google-play-updates-october-2026/)
- [공식 자료 9](https://developer.android.com/jetpack/androidx/releases/compose-material3)
- [공식 자료 10](https://github.blog/changelog/)
- [공식 자료 11](https://developer.apple.com/news/)
- [공식 자료 12](https://developer.android.com/blog/latest)
- [공식 자료 13](https://developer.apple.com/news/releases/)
- [공식 자료 14](https://developer.android.com/blog)
- [공식 자료 15](https://developer.apple.com/hello/october26/)
- [공식 자료 16](https://developer.android.com/studio/releases)
- [공식 자료 17](https://developer.apple.com/news/releases/?id=06182026b)
- [공식 자료 18](https://developer.android.com/latest-updates)
- [공식 자료 19](https://developer.android.com/about/versions/17/qpr2/release-notes)
- [공식 자료 20](https://platform.claude.com/docs/en/models/haiku-5-5/overview)
- [공식 자료 21](https://www.anthropic.com/claude-haiku-5-5)
- [공식 자료 22](https://platform.claude.com/docs/en/about-claude/pricing)
- [공식 자료 23](https://www.anthropic.com/claude/haiku)
- [공식 자료 24](https://platform.claude.com/docs/en/models/haiku-5-5/overview.md)
- [공식 자료 25](https://vercel.com/ai-gateway/models/claude-haiku-5.5)
- [공식 자료 26](https://platform.claude.com/docs/en/models/haiku-4-5/overview)
- [공식 자료 27](https://platform.claude.com/docs/en/models/overview)
- [공식 자료 28](https://platform.claude.com/docs/en/release-notes/overview)
- [공식 자료 29](https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/)
- [공식 자료 30](https://code.claude.com/docs/en/sub-agents)
- [공식 자료 31](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)
- [공식 자료 32](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [공식 자료 33](https://platform.claude.com/docs/en/models/haiku-5-5/whats-new-haiku-5-5)
- [공식 자료 34](https://code.claude.com/docs/en/model-config)
- [공식 자료 35](https://academy.claude.com/courses/introduction-to-subagents/creating-a-subagent)
- [공식 자료 36](https://platform.claude.com/cookbook/multimodal-using-sub-agents)

커버 이미지: [Revaldinho](https://commons.wikimedia.org/w/index.php?curid=196076573) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
