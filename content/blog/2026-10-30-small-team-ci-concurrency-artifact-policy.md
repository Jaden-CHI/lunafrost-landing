---
title: '작은 팀의 CI 운영: 중복 실행과 산출물 관리'
slug: small-team-ci-concurrency-artifact-policy
date: '2026-10-30'
category: App Dev
tags:
  - GitHub Actions
  - CI
  - Developer Workflow
description: >-
  작은 프로젝트의 CI에서 검사와 배포의 실행 정책을 분리하고 산출물을 필요한 만큼 보관하는 방법을 정리합니다. 오래된 검사 취소, 배포 충돌
  방지, 로그 보관 기간과 비밀정보 제외를 실제 운영 규칙으로 만드는 체크리스트입니다.
published: true
automated: true
recoveredAt: '2026-10-31T11:50:49.223Z'
cover: /images/posts/small-team-ci-concurrency-artifact-policy/commons-75053126.webp
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: 'Rob Swystun from Winnipeg, Canada'
  title: Circuit board (9354056039).jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=75053126'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-75053126
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/3/32/Circuit_board_%289354056039%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 435ed1350bae1d23c01ca00b291e2f761c0db07fc952238ae7de155178850b51
  verifiedAt: '2026-10-31T11:51:16.130Z'
  originalArtist: >-
    <a rel="nofollow" class="external text"
    href="https://www.flickr.com/people/88781579@N05">Rob Swystun</a> from
    Winnipeg, Canada
  changes: Resized and converted to WebP
---
## 자동화에도 정리 기준이 필요하다

커밋할 때마다 검사가 실행되면 편리하지만, 연속으로 수정할 때 이전 커밋의 검사가 계속 남을 수 있다. 반대로 배포 작업을 무조건 취소하도록 만들면 진행 중인 외부 변경이 중간에 끊길 수 있다. 같은 CI 안에서도 검사와 배포는 다른 규칙이 필요하다.

작은 팀이라면 먼저 워크플로를 세 종류로 적어 본다. 코드를 읽기만 하는 검사, 미리보기 환경을 만드는 작업, 운영 환경을 바꾸는 배포다. 작업 이름보다 외부에 어떤 영향을 주는지로 구분하는 것이 핵심이다.

## 검사는 최신 커밋, 배포는 충돌 방지

GitHub Actions는 기본적으로 여러 실행을 동시에 수행할 수 있고, concurrency 설정으로 이를 제한할 수 있다. 오래된 코드 검사를 취소하거나 같은 환경에 대한 배포 충돌을 막는 데 사용할 수 있다. [GitHub 동시 실행 개념](https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency)

운영 규칙은 다음처럼 시작할 수 있다. 아래 표는 프로젝트에 맞게 조정할 제안이지 모든 저장소에 적용되는 기본값은 아니다.

| 작업 | 제안하는 기준 | 확인할 위험 |
| --- | --- | --- |
| PR 코드 검사 | 같은 PR의 최신 변경 우선 | 서로 다른 PR까지 함께 취소하는지 |
| 미리보기 생성 | 같은 대상의 오래된 작업 정리 | 외부 리소스가 남는지 |
| 운영 배포 | 같은 환경의 충돌 방지 | 중간 취소가 데이터 변경에 미치는 영향 |

동시 실행을 제한했다고 모든 요청이 순서대로 보존되는 것은 아니다. GitHub 문서의 기본 동작에서는 그룹당 대기 실행 하나만 유지하며, 새 대기 실행이 기존 것을 대체할 수 있다. 모든 작업을 반드시 처리해야 하는 경우에는 별도의 대기열 정책까지 확인해야 한다.

단순 검사에 맞춘 취소 정책을 데이터 이전이나 운영 배포에 그대로 복사하지 않는다. 특히 외부 API 호출이나 데이터 수정은 CI가 중단되어도 이미 수행된 효과가 자동으로 되돌아가지 않을 수 있다.

## 산출물은 다시 쓸 이유가 있는 것만 저장하기

워크플로 산출물은 실행 종료 후 결과를 보관하거나 작업 간 파일을 전달하는 용도다. GitHub의 업로드 설정은 파일 경로와 제외 패턴, 개별 보관 기간을 지원한다. 보관 기간은 저장소나 조직이 허용하는 한도 안에서 정해야 한다. [GitHub 산출물 저장 안내](https://docs.github.com/en/actions/tutorials/store-and-share-data)

처음에는 실패한 테스트의 보고서, 필요한 화면 캡처, 배포 대상 파일처럼 목적이 분명한 항목만 선택한다. 저장소 전체나 작업 디렉터리 전체를 올리면 환경 파일과 요청 원문까지 섞일 수 있다. 업로드 직전 실제 파일 목록을 확인하는 절차를 둔다.

보관 기간은 “길수록 좋다”보다 “얼마 동안 조사에 필요한가”로 정한다. 예를 들어 수시로 확인하는 테스트 결과는 짧게, 릴리스 판단에 사용한 결과는 더 길게 두는 식이다. 구체적인 일수는 팀의 점검 주기와 저장 공간 정책에 맞춘다.

## 한 번의 점검으로 운영 규칙 남기기

- 검사와 운영 변경 작업의 concurrency 그룹을 구분한다.
- 실행 취소 시 외부에 남는 작업이 있는지 확인한다.
- 산출물마다 사용 목적과 보관 기간을 적는다.
- 비밀키, 개인정보, 인증 헤더가 포함되지 않는지 검사한다.
- 필요한 결과를 실제로 내려받아 열 수 있는지 확인한다.

CI 설정 파일이 실행된다는 사실과 운영 규칙이 적절하다는 사실은 다르다. 작은 프로젝트일수록 취소해도 되는 작업과 반드시 끝내야 하는 작업을 구분해 두면, 자동화가 늘어나도 판단 기준을 유지하기 쉽다.

커버 이미지: [Rob Swystun from Winnipeg, Canada](https://commons.wikimedia.org/w/index.php?curid=75053126) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
