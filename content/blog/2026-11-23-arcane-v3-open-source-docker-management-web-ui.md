---
title: 'Arcane v3: 오픈소스 Docker 관리 Web UI 완전 가이드'
slug: arcane-v3-open-source-docker-management-web-ui
date: '2026-11-23'
category: Tech Trends
tags:
  - Arcane
  - Docker
  - 셀프호스트
  - 오픈소스
  - 컨테이너관리
  - Docker Compose
  - GitOps
  - Go
  - SvelteKit
description: >-
  Go + SvelteKit으로 만든 오픈소스 Docker 관리 도구 Arcane v3의 주요 기능, 설치법, 2.x→3.x 마이그레이션
  포인트를 정리했습니다.
cover: /images/posts/daily-2026-11-23/commons-155108582.webp
published: true
automated: true
sources:
  - 'https://trendshift.io/'
  - 'https://en.wikipedia.org/wiki/TLDR_Pages'
  - 'https://githot.dev/en'
  - 'https://gittrend.io/'
  - 'https://topgit.dev/trending/daily'
  - 'https://githubtrending.today/'
  - 'https://github.day/trending'
  - 'https://ghtrends.dev/daily/'
  - >-
    https://repowise.dev/blog/engineering/trending-github-2026-11-22-claude-bughunter
  - 'https://github.com/kouweizhu/agents-radar/issues/1038'
  - 'https://github.com/kouweizhu/agents-radar/issues/858'
  - 'https://github.com/topics/ai-browser-agent'
  - 'https://github.com/topics/ai-agents'
  - >-
    https://www.coddykit.com/blog/github-trending-november-2026-from-a-108k-star-persistent-memory-engine-to-a-39k-5130013
  - >-
    https://www.coddykit.com/blog/github-trending-november-2026-from-a-56k-star-chrome-devtools-mcp-to-a-120k-star-5130026
  - 'https://gittrend.io/monthly/2026-11'
  - 'https://www.agenorit.com.au/insights/top-github-repositories'
  - 'https://gittrend.io/trending/ai-agent'
  - 'https://github.com/ag-ui-protocol/ag-ui'
  - 'https://github.com/ag-ui-protocol/ag-ui/blob/main/README.md'
  - 'https://github.com/cleitonaugusto/ag-ui'
  - 'https://github.com/AppSolutionscl/ag-ui-protocol'
  - 'https://github.com/MyPrototypeWhat/ag-ui'
  - 'https://github.com/Usmanfawad/ag-ui'
  - 'https://github.com/ag-ui-protocol'
  - 'https://github.com/wrabit/ag-ui'
  - 'https://docs.ag-ui.com/'
  - 'https://github.com/ag-ui-protocol/ag-ui/blob/main/docs/sdk/java/overview.mdx'
  - 'https://dev.co/devops/open-source/arcane'
  - 'https://hyscaler.com/insights/arcane-docker/'
  - >-
    https://dev.to/arshtechpro/arcane-a-developers-guide-to-the-open-source-docker-management-ui-4g76
  - 'https://github.com/getarcaneapp/arcane/blob/main/README.md'
  - 'https://github.com/getarcaneapp'
  - 'https://romdhane.fr/blog/arcane'
  - >-
    https://www.it-connect.tech/arcane-a-powerful-open-source-solution-for-managing-docker-containers/
  - 'https://prohomelab.com/en/posts/arcane-docker-manager/'
  - 'https://www.antwacode.com/blog/en/arcane-modern-docker-management-ui'
  - 'https://getarcane.app/'
  - >-
    https://www.copilotkit.ai/blog/ag-ui-is-redefining-the-agent-user-interaction-layer
  - 'https://pypi.org/project/ag-ui-protocol/'
  - 'https://rywalker.com/research/ag-ui'
  - 'https://agent-ready.dev/what-is-ag-ui'
  - >-
    https://www.reactify-solutions.com/articles/ag-ui-protocol-generative-ui-2026
  - >-
    https://www.smfclearinghouse.com/blog/ag-ui-1-0-the-open-protocol-connecting-ai-agents-to-your-app/
  - 'https://blockchain.news/news/ag-ui-protocol-github-trending'
  - 'https://aiwiki.ai/wiki/ag_ui_protocol'
  - 'https://finance.biggo.com/news/065d04af-ed92-42d0-bab4-60df482ae54f'
  - 'https://github.com/getarcaneapp/arcane/releases'
  - 'https://github.com/getarcaneapp/arcane/releases/tag/v3.0.0'
  - 'https://github.com/getarcaneapp/arcane/releases/tag/v3.1.0'
  - 'https://en.wikipedia.org/wiki/Reverse:_1999'
  - 'https://github.com/getarcaneapp/arcane/releases/tag/v3.0.1'
  - 'https://github.com/getarcaneapp/arcane/blob/main/CHANGELOG.md'
  - 'https://en.wikipedia.org/wiki/Arc_(web_browser)'
  - 'https://en.wikipedia.org/wiki/Dia_(web_browser)'
editorialLane: github
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Serhio Magpie
  title: Ibanez FL9 Flanger (circuit board).jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=155108582'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-155108582
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/b/b3/Ibanez_FL9_Flanger_%28circuit_board%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 8bceec86898a717c6d50f27593090d4bf846032db4df54ea5b924890fb6a4d26
  verifiedAt: '2026-11-23T05:43:05.547Z'
  originalArtist: >-
    <a href="//commons.wikimedia.org/wiki/User:Serhio_Magpie" title="User:Serhio
    Magpie">Serhio Magpie</a>
  changes: Resized and converted to WebP
---
> **TL;DR** — Arcane은 Go 백엔드 + SvelteKit 프론트엔드로 만든 BSD-3-Clause 오픈소스 Docker Web UI입니다. 2026년 11월 14일 v3.0.0이 출시됐고, 같은 달 18일 v3.1.0까지 연속 릴리스됐습니다. 컨테이너·이미지·볼륨·네트워크·Compose 프로젝트·멀티호스트 에이전트를 한 화면에서 관리할 수 있으며, 유료 티어 없이 완전 오픈소스로 제공됩니다.

---

## Arcane이란?

[Arcane](https://getarcane.app/)은 이미 운영 중인 Docker 환경 위에 올려 쓰는 셀프호스트 Web UI입니다. 대시보드, Compose 편집기, 컨테이너 로그·터미널, 멀티호스트 관리를 한 곳에서 제공합니다. Docker 외에 Podman(rootful, rootless, quadlet)도 지원합니다.

[GitHub 저장소 `getarcaneapp/arcane`](https://github.com/getarcaneapp/arcane)는 2026년 11월 18일 기준 9,714 스타를 기록했습니다(관측일: 2026-11-18, 출처: [hyscaler.com](https://hyscaler.com/insights/arcane-docker/)). Portainer CE(38,850 스타)에 비하면 아직 작지만, BSD-3-Clause 라이선스로 완전 무료인 점이 차별점입니다.

---

## v3에서 달라진 것

### v3.0.0 (2026-11-14)

[v3.0.0 릴리스 노트](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.0)에 따르면 이번 메이저 버전에서 다음이 바뀌었습니다.

- **대시보드·액티비티 센터 재설계** — 라이브 업그레이드 진행 상태 표시 추가
- **사용자 정의 뷰** — 원하는 컨테이너·프로젝트만 모아 보는 커스텀 화면
- **확장된 백업 및 GitOps 기능** — Git 저장소와 Compose 프로젝트 연동 지원
- **호환성 변경** — 모든 환경 변수가 `ARCANE_` 접두사로 통일되고, `JWT_SECRET`이 삭제됐으며, 컨테이너 이미지 이름이 변경됨

> ⚠️ v3.0.0 릴리스 노트는 "2.x Compose 파일로 시작하면 무엇을 변경해야 하는지 목록을 출력하고 종료한다"고 명시합니다. 2.x에서 올리기 전에 반드시 아래 마이그레이션 항목을 확인하세요.

### v3.1.0 (2026-11-18)

[v3.1.0 릴리스 노트](https://github.com/getarcaneapp/arcane/releases/tag/v3.1.0)에서 추가된 주요 기능:

- **LDAP 로그인** (사용자 동기화 포함)
- **환경 간 프로젝트 복사·이동**
- **배경 이미지 블러 조절**

버그 수정으로는 에이전트 요청 중단 문제, API 유효성 검사 강화, 이미지 업데이트·정리 처리 개선이 포함됩니다.

### v3.1.1

백업·컨테이너·프로젝트 관련 버그 수정 릴리스입니다. 중복 예약 백업이 순차 실행되도록 변경됐고, `ky` HTTP 클라이언트 제거 및 E2E 테스트를 vite-plus로 이전하는 리팩터링도 포함됩니다.

---

## 2.x → 3.x 마이그레이션 체크리스트

v3은 2.x와 **호환되지 않습니다**. 공식 릴리스 노트 기준 변경 사항은 아래와 같습니다.

| 항목 | 2.x | 3.x |
|---|---|---|
| 매니저 이미지 | `ghcr.io/getarcaneapp/arcane` | `ghcr.io/getarcaneapp/manager` |
| 에이전트 이미지 | `ghcr.io/getarcaneapp/arcane-headless` | `ghcr.io/getarcaneapp/agent` |
| 환경 변수 | `APP_URL`, `ENCRYPTION_KEY` 등 | `ARCANE_APP_URL`, `ARCANE_ENCRYPTION_KEY` 등 |
| `JWT_SECRET` | 존재 | **삭제됨** |

2.x Compose 파일을 그대로 사용하면 Arcane이 필요한 변경 목록을 출력하고 종료합니다. 이 출력을 가이드 삼아 수정한 뒤 재시작하면 됩니다.

---

## 설치: Docker Compose 한 파일로 시작하기

[공식 사이트](https://getarcane.app/)에서 제공하는 최소 Compose 구성입니다.

```yaml
services:
  arcane:
    image: ghcr.io/getarcaneapp/manager:latest
    container_name: arcane
    ports:
      - '3552:3552'
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - arcane-data:/app/data
    environment:
      - ARCANE_ENCRYPTION_KEY=your-32-char-encryption-key
      - TZ=UTC
    cgroup: host
    restart: unless-stopped

volumes:
  arcane-data:
```

`docker compose up -d` 한 번으로 `http://localhost:3552`에서 대시보드를 열 수 있습니다. 이미지는 GitHub Container Registry 외에 Docker Hub(`getarcaneapp/manager`)와 Quay(`quay.io/getarcaneapp/manager`)에도 미러가 있습니다.

---

## 주요 기능 살펴보기

### 멀티호스트 에이전트

원격 서버에 헤드리스 에이전트(`ghcr.io/getarcaneapp/agent`)를 올리면, 단일 Arcane 대시보드에서 여러 호스트를 한꺼번에 관리할 수 있습니다. SSH 터널 없이 에이전트가 중앙 매니저와 통신하는 구조입니다.

### GitOps 연동

Git 저장소와 Compose 프로젝트를 연동하면 저장소에 push할 때 Arcane이 변경 사항을 감지해 자동으로 배포합니다. CI 파이프라인 없이 소규모 팀이 GitOps를 도입할 수 있는 가장 빠른 경로입니다.

### Compose 편집기 + 보안 스캔

UI 안에서 Compose 파일을 직접 편집하고 배포할 수 있습니다. 보안 스캔 기능도 포함되어 있어 이미지 취약점을 대시보드에서 확인할 수 있습니다.

---

## Portainer와 무엇이 다른가

[hyscaler.com](https://hyscaler.com/insights/arcane-docker/)의 2026-11-18 기준 GitHub 스타 비교에서 Portainer CE는 38,850, Arcane은 9,714입니다. 커뮤니티 규모는 Portainer가 크지만, Arcane은 다음 측면에서 차별화됩니다.

- **완전 무료**: 유료 Business Edition 없이 모든 기능이 BSD-3-Clause 오픈소스로 제공됩니다.
- **현대적 기술 스택**: Go + SvelteKit 조합으로 UI 반응성이 설계 목표로 명시되어 있습니다.
- **Podman 지원**: rootless Podman과 quadlet 모두 지원해 rootless 컨테이너 환경에서도 사용할 수 있습니다.

---

## 주의할 점

- 대형 인프라(수백 컨테이너)에서의 실제 응답 속도·안정성은 직접 테스트 없이 확인할 수 없습니다.
- SAML·OIDC 완전 지원 여부는 공식 문서에서 명시적으로 확인되지 않았습니다. LDAP은 v3.1.0부터 지원됩니다.
- Docker Swarm 전체 기능 목록은 별도 문서 확인이 필요합니다.

---

## 정리

Arcane v3는 Docker 환경을 GUI로 관리하고 싶은 개발자·홈랩 운영자에게 현실적인 선택지입니다. 2026년 11월 한 달 사이에 v3.0.0 → v3.1.1까지 연속 릴리스된 점에서 유지보수가 활발하다는 것을 확인할 수 있습니다. Compose 한 파일로 시작할 수 있어 진입 장벽도 낮습니다. 2.x를 쓰고 있다면 환경 변수 접두사와 이미지명 변경을 먼저 확인하고 업그레이드하세요.

- 저장소: [github.com/getarcaneapp/arcane](https://github.com/getarcaneapp/arcane)
- 공식 사이트: [getarcane.app](https://getarcane.app/)


## 참고 자료
- [참고 자료 1](https://trendshift.io/)
- [참고 자료 2](https://en.wikipedia.org/wiki/TLDR_Pages)
- [참고 자료 3](https://githot.dev/en)
- [참고 자료 4](https://gittrend.io/)
- [참고 자료 5](https://topgit.dev/trending/daily)
- [참고 자료 6](https://githubtrending.today/)
- [참고 자료 7](https://github.day/trending)
- [참고 자료 8](https://ghtrends.dev/daily/)
- [참고 자료 9](https://repowise.dev/blog/engineering/trending-github-2026-11-22-claude-bughunter)
- [참고 자료 10](https://github.com/kouweizhu/agents-radar/issues/1038)
- [참고 자료 11](https://github.com/kouweizhu/agents-radar/issues/858)
- [참고 자료 12](https://github.com/topics/ai-browser-agent)
- [참고 자료 13](https://github.com/topics/ai-agents)
- [참고 자료 14](https://www.coddykit.com/blog/github-trending-november-2026-from-a-108k-star-persistent-memory-engine-to-a-39k-5130013)
- [참고 자료 15](https://www.coddykit.com/blog/github-trending-november-2026-from-a-56k-star-chrome-devtools-mcp-to-a-120k-star-5130026)
- [참고 자료 16](https://gittrend.io/monthly/2026-11)
- [참고 자료 17](https://www.agenorit.com.au/insights/top-github-repositories)
- [참고 자료 18](https://gittrend.io/trending/ai-agent)
- [참고 자료 19](https://github.com/ag-ui-protocol/ag-ui)
- [참고 자료 20](https://github.com/ag-ui-protocol/ag-ui/blob/main/README.md)
- [참고 자료 21](https://github.com/cleitonaugusto/ag-ui)
- [참고 자료 22](https://github.com/AppSolutionscl/ag-ui-protocol)
- [참고 자료 23](https://github.com/MyPrototypeWhat/ag-ui)
- [참고 자료 24](https://github.com/Usmanfawad/ag-ui)
- [참고 자료 25](https://github.com/ag-ui-protocol)
- [참고 자료 26](https://github.com/wrabit/ag-ui)
- [참고 자료 27](https://docs.ag-ui.com/)
- [참고 자료 28](https://github.com/ag-ui-protocol/ag-ui/blob/main/docs/sdk/java/overview.mdx)
- [참고 자료 29](https://dev.co/devops/open-source/arcane)
- [참고 자료 30](https://hyscaler.com/insights/arcane-docker/)
- [참고 자료 31](https://dev.to/arshtechpro/arcane-a-developers-guide-to-the-open-source-docker-management-ui-4g76)
- [참고 자료 32](https://github.com/getarcaneapp/arcane/blob/main/README.md)
- [참고 자료 33](https://github.com/getarcaneapp)
- [참고 자료 34](https://romdhane.fr/blog/arcane)
- [참고 자료 35](https://www.it-connect.tech/arcane-a-powerful-open-source-solution-for-managing-docker-containers/)
- [참고 자료 36](https://prohomelab.com/en/posts/arcane-docker-manager/)
- [참고 자료 37](https://www.antwacode.com/blog/en/arcane-modern-docker-management-ui)
- [참고 자료 38](https://getarcane.app/)
- [참고 자료 39](https://www.copilotkit.ai/blog/ag-ui-is-redefining-the-agent-user-interaction-layer)
- [참고 자료 40](https://pypi.org/project/ag-ui-protocol/)
- [참고 자료 41](https://rywalker.com/research/ag-ui)
- [참고 자료 42](https://agent-ready.dev/what-is-ag-ui)
- [참고 자료 43](https://www.reactify-solutions.com/articles/ag-ui-protocol-generative-ui-2026)
- [참고 자료 44](https://www.smfclearinghouse.com/blog/ag-ui-1-0-the-open-protocol-connecting-ai-agents-to-your-app/)
- [참고 자료 45](https://blockchain.news/news/ag-ui-protocol-github-trending)
- [참고 자료 46](https://aiwiki.ai/wiki/ag_ui_protocol)
- [참고 자료 47](https://finance.biggo.com/news/065d04af-ed92-42d0-bab4-60df482ae54f)
- [참고 자료 48](https://github.com/getarcaneapp/arcane/releases)
- [참고 자료 49](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.0)
- [참고 자료 50](https://github.com/getarcaneapp/arcane/releases/tag/v3.1.0)
- [참고 자료 51](https://en.wikipedia.org/wiki/Reverse:_1999)
- [참고 자료 52](https://github.com/getarcaneapp/arcane/releases/tag/v3.0.1)
- [참고 자료 53](https://github.com/getarcaneapp/arcane/blob/main/CHANGELOG.md)
- [참고 자료 54](https://en.wikipedia.org/wiki/Arc_(web_browser))
- [참고 자료 55](https://en.wikipedia.org/wiki/Dia_(web_browser))

커버 이미지: [Serhio Magpie](https://commons.wikimedia.org/w/index.php?curid=155108582) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
