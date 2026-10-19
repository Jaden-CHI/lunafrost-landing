---
title: 자동 블로그 발행 실패를 복구하는 체크리스트
slug: scheduled-blog-failure-recovery-checklist
date: '2026-10-15'
category: App Dev
tags:
  - GitHub Actions
  - 블로그
  - 배포
  - 장애복구
description: 예약 실행은 됐지만 글이 올라오지 않을 때 생성·이미지·검증·배포를 분리해 원인을 찾고 초안을 복구하는 절차를 정리합니다.
published: true
automated: true
recoveredAt: '2026-10-19T04:50:33.694Z'
cover: /images/posts/scheduled-blog-failure-recovery-checklist/commons-147434244.webp
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Bill Smith
  title: Intel Microprocessors over time
  source: 'https://commons.wikimedia.org/w/index.php?curid=147434244'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: 3740b814-46c8-49bd-a356-cc9109ecccc2
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/8/8b/Intel_Microprocessors_over_time.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 069f4ed689012237dd487ffd3c29d3632ac6ad1fa89428a6407b84c76b5c7b14
  verifiedAt: '2026-10-19T04:53:28.195Z'
  originalArtist: Bill Smith
  changes: Resized and converted to WebP
---
## TL;DR

- 예약 실행, 글 생성, 저장소 반영, 실제 배포는 각각 다른 성공 조건입니다.
- 실패한 작업을 다시 실행하기 전에 복구 가능한 초안이 있는지 먼저 확인합니다.
- 날짜별 중복 검사와 실패 알림을 함께 두면 누락과 이중 발행을 줄일 수 있습니다.

## 홈페이지부터 고치기 전에 실행 기록 보기

블로그 목록이 갱신되지 않으면 캐시부터 의심하기 쉽습니다. 그러나 새 글 파일이 만들어지지 않았다면 캐시를 지워도 결과는 같습니다. 먼저 예약 작업의 실행 기록에서 시작 시각, 종료 상태, 마지막 성공 단계를 확인합니다.

[GitHub Actions 로그 안내](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs)를 참고해 실패한 단계의 출력을 확인할 수 있습니다. 글 작성이 끝난 뒤 이미지 다운로드에서 실패했다면 원인은 글쓰기 API가 아니라 이미지 단계입니다. 반대로 파일 저장은 성공했지만 배포가 실패했다면 게시 파이프라인을 조사해야 합니다.

## 성공 조건을 네 가지로 분리하기

첫째는 생성 성공입니다. 제목과 본문이 정상적인 형식으로 준비됐는지 확인합니다. 둘째는 콘텐츠 검증입니다. 이미지 파일, 출처, 슬러그, 날짜가 올바른지 확인합니다. 셋째는 저장소 반영이고, 넷째는 실제 홈페이지에서 새 글이 열리는 상태입니다.

| 단계 | 남겨야 할 증거 |
|---|---|
| 생성 | 초안 파일과 종료 상태 |
| 검증 | 테스트 결과와 이미지 경로 |
| 저장 | 커밋 식별자 |
| 배포 | 게시물 URL과 실제 응답 |

작업 화면이 성공이라고 표시되는 것과 독자에게 글이 보이는 것은 같은 일이 아닙니다. 게시물 URL과 이미지 URL을 실제로 요청하는 검사가 마지막에 있어야 합니다.

## 초안 복구와 재생성 구분하기

복구 산출물이 남아 있다면 초안을 가져와 누락된 이미지나 메타데이터만 보완합니다. 전체 작업을 다시 실행하면 같은 주제의 새 글을 또 만들 수 있습니다. 보관 기간이 지나 원본이 없다면 없는 초안을 복원했다고 표현하지 말고 대체 글을 작성해야 합니다.

복구 글의 목록 날짜를 원래 일정에 맞추더라도 실제 복구 시점은 별도 필드에 보관하는 편이 좋습니다. 운영 이력을 확인하거나 같은 날짜를 두 번 처리하지 않도록 하는 데 도움이 됩니다.

## 예약 시간은 실행 보장이 아닙니다

[GitHub의 예약 실행 설명](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)은 부하 상황에서 예약 작업이 지연될 수 있음을 안내합니다. 매일 오전 특정 시각으로 cron을 설정했다고 해서 독자가 정확히 그 시각에 글을 볼 수 있다고 약속해서는 안 됩니다.

예약일 기준으로 이미 공개된 자동 글이 있는지 검사하고, 실패하면 알림을 남기며, 복구 뒤에는 실제 페이지를 확인하는 세 가지 장치가 필요합니다. 정시 발행이 중요한 서비스라면 초안을 미리 준비하는 방식과 별도의 스케줄러도 검토해야 합니다.

커버 이미지: [Bill Smith](https://commons.wikimedia.org/w/index.php?curid=147434244) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
