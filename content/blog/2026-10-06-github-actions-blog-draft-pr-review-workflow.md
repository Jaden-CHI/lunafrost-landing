---
title: GitHub Actions로 블로그 초안 PR 자동 검토 워크플로 만들기
slug: github-actions-blog-draft-pr-review-workflow
date: '2026-10-06'
category: Content
tags:
  - GitHub Actions
  - Claude Code
  - PR 리뷰
  - 블로그 자동화
  - Draft PR
  - CI/CD
description: >-
  Draft PR과 Claude Code GitHub Actions를 조합해 블로그 초안을 코드처럼 리뷰하는 자동화 워크플로 구축 방법을
  설명합니다.
cover: /images/posts/github-actions-blog-draft-pr-review-workflow/cover.webp
published: true
sources:
  - >-
    https://academy.claude.com/courses/claude-code-in-action/github-actions-and-code-review
  - >-
    https://github.blog/changelog/2025-11-07-actions-pull_request_target-and-environment-branch-protections-changes/
  - 'https://developers.openai.com/codex/github-action'
  - 'https://code.claude.com/docs/en/github-actions'
  - >-
    https://github.blog/ai-and-ml/generative-ai/automate-your-project-with-github-models-in-actions/
  - >-
    https://developers.openai.com/cookbook/examples/third_party/code_quality_and_security_scan_with_github_actions
  - >-
    https://github.blog/changelog/2026-02-13-github-agentic-workflows-are-now-in-technical-preview/
  - >-
    https://cookbook.openai.com/examples/third_party/code_quality_and_security_scan_with_github_actions
  - 'https://github.blog/tag/agentic-workflows/'
  - >-
    https://support.claude.com/en/articles/14233555-set-up-code-review-for-claude-code
  - >-
    https://github.blog/ai-and-ml/github-copilot/from-idea-to-pr-a-guide-to-github-copilots-agentic-workflows/
  - 'https://github.blog/2021-04-28-use-github-actions-manage-docs/'
  - >-
    https://github.blog/changelog/2023-03-09-github-actions-required-workflows-improvements/
  - >-
    https://github.blog/changelog/2020-05-26-mark-pull-requests-as-ready-for-review-review-and-merge-from-github-cli/
  - 'https://docs.anthropic.com/en/docs/claude-code/github-actions'
  - >-
    https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk
  - >-
    https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/
  - >-
    https://github.blog/news-insights/product-news/introducing-draft-pull-requests/
  - >-
    https://github.blog/changelog/2025-05-01-draft-pull-requests-are-now-available-in-all-repositories/
  - 'https://github.blog/changelog/2019-02-14-draft-pull-requests/'
  - 'https://code.claude.com/docs/en/routines'
  - 'https://github.blog/jp/2019-02-19-introducing-draft-pull-requests/'
  - >-
    https://github.blog/changelog/2025-11-06-pull-request-files-changed-public-preview-and-merge-experience-november-6-updates/
  - >-
    https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/
  - >-
    https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/
  - >-
    https://github.blog/changelog/2026-02-05-github-actions-early-february-2026-updates/
  - >-
    https://github.blog/jp/2026-02-16-automate-repository-tasks-with-github-agentic-workflows/
  - 'https://github.blog/enterprise-software/automation/'
  - 'https://github.blog/ai-and-ml/generative-ai/'
  - 'https://github.blog/ai-and-ml/llms/'
  - >-
    https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/
coverAlt: 여러 모니터와 태블릿이 있는 개발 작업환경 사진
coverCredit:
  author: Jakub Zerdzicki
  source: >-
    https://unsplash.com/photos/developer-working-on-multiple-screens-in-a-dark-office-v9iowyOH7QQ
  license: Unsplash License
  licenseUrl: 'https://unsplash.com/license'
  alt: 여러 모니터와 태블릿이 있는 개발 작업환경 사진
---
## TL;DR

- **Draft PR**로 초안을 올리면 자동 리뷰가 건너뛰어지고, `Ready for review` 전환 시점에 워크플로가 트리거된다.
- **Claude Code GitHub Actions**를 연동하면 PR에 AI 인라인 코멘트가 자동으로 달린다.
- 트리거는 `pull_request_target` 대신 `pull_request`를 쓰는 것이 보안상 권장된다.
- **GitHub Agentic Workflows**(현재 퍼블릭 프리뷰)를 쓰면 YAML 없이 Markdown으로 워크플로를 기술할 수 있다.

---

블로그를 혼자 쓰든 팀으로 운영하든, 초안 피드백 루프는 항상 느리다. 에디터에게 링크를 보내고, 댓글을 기다리고, 수정 후 다시 공유하는 과정이 반복된다. 코드 리뷰처럼 PR 기반으로 초안을 관리하면 이 루프를 자동화할 수 있다.

## Draft PR: 초안 신호를 명확히 보내기

[2025년 5월부터 Draft Pull Request는 공개·비공개 구분 없이 모든 리포지토리에서 무료로 사용할 수 있다.](https://github.blog/changelog/2025-05-01-draft-pull-requests-are-now-available-in-all-repositories/) Draft PR은 세 가지 역할을 한다.

1. 리뷰어에게 "아직 작업 중"이라는 명확한 신호를 보낸다.
2. CODEOWNERS 리뷰어 알림을 억제한다.
3. `Ready for review`로 전환하기 전까지 병합을 차단한다.

블로그 초안 워크플로에서 이 특성은 핵심이다. **초안 단계에서는 AI 리뷰를 건너뛰고, 작성자가 직접 `Ready for review`를 누르는 순간에만 워크플로를 실행**하는 구조를 만들 수 있기 때문이다.

## 워크플로 전체 흐름

```
[작성자] Draft PR 생성 (자동 리뷰 없음)
    ↓
[작성자] "Ready for review" 클릭
    ↓  ← ready_for_review 이벤트 트리거
[GitHub Actions] Claude Code 리뷰 실행
    ↓
[PR] 인라인 코멘트 + 요약 코멘트 자동 게시
    ↓
[작성자] 피드백 반영 후 @claude 멘션으로 추가 요청
    ↓
[병합 승인]
```

## 핵심 설정 1 — 트리거

[Claude Code GitHub Actions 공식 문서](https://code.claude.com/docs/en/github-actions)의 코드 리뷰 워크플로 예제는 다음 트리거 조합을 사용한다.

```yaml
on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
```

`ready_for_review` 타입이 핵심이다. Draft 상태에서 Ready for review로 전환되는 순간 워크플로가 실행된다. 나머지 타입(`opened`, `synchronize`, `reopened`)은 이미 Ready 상태인 PR이 업데이트될 때를 커버한다.

### `pull_request_target`은 쓰지 않는다

[2025년 12월 8일부터 적용된 GitHub 보안 변경](https://github.blog/changelog/2025-11-07-actions-pull_request_target-and-environment-branch-protections-changes/)에 따르면, `pull_request_target`은 GitHub Actions에서 가장 많이 남용되는 트리거 중 하나다. 이 이벤트로 트리거된 워크플로는 베이스 리포지토리의 `GITHUB_TOKEN`과 시크릿에 접근할 수 있어, 포크에서 검토되지 않은 PR의 헤드를 체크아웃하면 공격자 제어 코드가 워크플로 전체 권한으로 실행될 수 있다. 공식 가이드는 높은 권한이 필요하지 않다면 `pull_request`를 쓸 것을 권장한다.

## 핵심 설정 2 — Claude Code GitHub Actions 연동

[Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions)는 PR이나 이슈 코멘트에서 `@claude`를 언급하면 분석·코멘트·커밋 푸시를 수행하는 GitHub Action이다. 빠른 설정은 Claude Code에서 `/install-github-app` 명령을 실행하면 GitHub App 설치, 인증 시크릿 추가, 워크플로 PR 준비까지 자동으로 처리한다.

수동 설정 시 필요한 권한은 세 가지다.

- **Contents** (읽기·쓰기): Claude가 파일 수정 가능
- **Issues** (읽기·쓰기): Claude가 이슈에 응답 가능
- **Pull requests** (읽기·쓰기): Claude가 PR 코멘트 게시 및 변경 푸시 가능

시크릿은 `ANTHROPIC_API_KEY`(API 키) 또는 `CLAUDE_CODE_OAUTH_TOKEN`(구독 토큰) 중 하나를 리포지토리 시크릿으로 저장한다.

### 인라인 코멘트가 달리는 조건

공식 문서에 따르면 `--comment` 옵션을 사용해야 Claude가 발견한 각 이슈에 인라인 코멘트를 PR에 직접 게시한다. 이 옵션 없이는 결과를 워크플로 실행 로그에서만 확인할 수 있다. 이슈가 없으면 요약 코멘트 하나가 게시된다.

### Claude가 자동으로 건너뛰는 PR

[공식 문서](https://code.claude.com/docs/en/github-actions)는 Claude가 Draft PR, 이미 Claude 코멘트가 있는 PR, 단순 자동화 PR을 건너뛴다고 명시한다. 초안 단계에서 의도적으로 리뷰를 받고 싶다면 별도 트리거 설계가 필요하다.

## 블로그 초안용 커스텀 프롬프트 작성

공식 예제는 코드 리뷰 중심으로 설계되어 있다. 블로그 초안에 맞는 리뷰를 받으려면 프롬프트를 직접 작성해야 한다. 공식 템플릿은 없지만, 워크플로 파일의 `prompt` 필드에 다음과 같이 기술할 수 있다.

```yaml
with:
  prompt: |
    이 PR은 블로그 초안입니다. 다음 기준으로 리뷰해주세요:
    1. 첫 문단이 핵심 주제를 명확히 전달하는가
    2. 주장에 근거나 예시가 있는가
    3. 독자(개발자, 크리에이터)에게 맞는 어조인가
    4. 제목과 본문의 일관성
    문제가 없으면 요약 코멘트 하나만 남겨주세요.
```

## GitHub Agentic Workflows: YAML 없는 미래

[2026년 2월 테크니컬 프리뷰로 시작해 2026년 6월 11일 퍼블릭 프리뷰로 전환된 GitHub Agentic Workflows](https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/)는 복잡한 YAML 대신 일반 Markdown으로 워크플로를 작성하는 방식이다. `.github/workflows/`에 Markdown 파일을 추가하고 자연어로 자동화 목표를 기술하면, `gh aw` CLI가 이를 표준 GitHub Actions 워크플로로 변환한다.

보안 측면에서 에이전트는 기본적으로 읽기 전용 권한으로 실행되고, 쓰기 작업은 사전 승인된 "safe outputs"를 통하며 Agent Workflow Firewall 뒤의 샌드박스 컨테이너 안에서 동작한다.

블로그 초안 리뷰처럼 빈번하게 트리거되는 경우 API 비용이 누적될 수 있으므로, 비용 모니터링 설정을 함께 검토하는 것이 좋다.

## 알아야 할 제약 사항

- **포크 PR 시크릿 차단**: 퍼블릭 리포지토리에서는 GitHub이 포크 PR로 트리거된 실행에서 시크릿을 차단한다. 외부 기고자의 PR에는 AI 리뷰가 실행되지 않을 수 있다.
- **Draft 자동 스킵**: Claude는 Draft PR을 기본적으로 건너뛴다. 이 동작은 설계상 의도된 것이며, `Ready for review` 전환이 트리거 역할을 한다.
- **비용**: `ANTHROPIC_API_KEY` 사용 시 API 호출 비용이 발생한다. 구체적인 단가는 Anthropic 콘솔에서 확인해야 한다.

---

"초안을 코드처럼 리뷰한다"는 아이디어는 단순하지만, Draft PR → `ready_for_review` 트리거 → AI 인라인 코멘트로 이어지는 파이프라인을 구성하면 실제로 편집 루프가 짧아진다. YAML이 부담스럽다면 GitHub Agentic Workflows가 퍼블릭 프리뷰인 지금이 실험해볼 타이밍이다.

## 참고 자료
- [공식 자료 1](https://academy.claude.com/courses/claude-code-in-action/github-actions-and-code-review)
- [공식 자료 2](https://github.blog/changelog/2025-11-07-actions-pull_request_target-and-environment-branch-protections-changes/)
- [공식 자료 3](https://developers.openai.com/codex/github-action)
- [공식 자료 4](https://code.claude.com/docs/en/github-actions)
- [공식 자료 5](https://github.blog/ai-and-ml/generative-ai/automate-your-project-with-github-models-in-actions/)
- [공식 자료 6](https://developers.openai.com/cookbook/examples/third_party/code_quality_and_security_scan_with_github_actions)
- [공식 자료 7](https://github.blog/changelog/2026-02-13-github-agentic-workflows-are-now-in-technical-preview/)
- [공식 자료 8](https://cookbook.openai.com/examples/third_party/code_quality_and_security_scan_with_github_actions)
- [공식 자료 9](https://github.blog/tag/agentic-workflows/)
- [공식 자료 10](https://support.claude.com/en/articles/14233555-set-up-code-review-for-claude-code)
- [공식 자료 11](https://github.blog/ai-and-ml/github-copilot/from-idea-to-pr-a-guide-to-github-copilots-agentic-workflows/)
- [공식 자료 12](https://github.blog/2021-04-28-use-github-actions-manage-docs/)
- [공식 자료 13](https://github.blog/changelog/2023-03-09-github-actions-required-workflows-improvements/)
- [공식 자료 14](https://github.blog/changelog/2020-05-26-mark-pull-requests-as-ready-for-review-review-and-merge-from-github-cli/)
- [공식 자료 15](https://docs.anthropic.com/en/docs/claude-code/github-actions)
- [공식 자료 16](https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk)
- [공식 자료 17](https://github.blog/changelog/2026-06-18-safer-pull_request_target-defaults-for-github-actions-checkout/)
- [공식 자료 18](https://github.blog/news-insights/product-news/introducing-draft-pull-requests/)
- [공식 자료 19](https://github.blog/changelog/2025-05-01-draft-pull-requests-are-now-available-in-all-repositories/)
- [공식 자료 20](https://github.blog/changelog/2019-02-14-draft-pull-requests/)
- [공식 자료 21](https://code.claude.com/docs/en/routines)
- [공식 자료 22](https://github.blog/jp/2019-02-19-introducing-draft-pull-requests/)
- [공식 자료 23](https://github.blog/changelog/2025-11-06-pull-request-files-changed-public-preview-and-merge-experience-november-6-updates/)
- [공식 자료 24](https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/)
- [공식 자료 25](https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/)
- [공식 자료 26](https://github.blog/changelog/2026-02-05-github-actions-early-february-2026-updates/)
- [공식 자료 27](https://github.blog/jp/2026-02-16-automate-repository-tasks-with-github-agentic-workflows/)
- [공식 자료 28](https://github.blog/enterprise-software/automation/)
- [공식 자료 29](https://github.blog/ai-and-ml/generative-ai/)
- [공식 자료 30](https://github.blog/ai-and-ml/llms/)
- [공식 자료 31](https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/)

커버 이미지: [Jakub Zerdzicki](https://unsplash.com/photos/developer-working-on-multiple-screens-in-a-dark-office-v9iowyOH7QQ) · [Unsplash License](https://unsplash.com/license). 본문 이해를 돕기 위한 자료 이미지입니다.
