---
title: 작은 웹사이트의 Core Web Vitals 점검 순서
slug: small-website-core-web-vitals-checklist
date: '2026-10-28'
category: App Dev
tags:
  - Web Performance
  - Core Web Vitals
  - Frontend
description: >-
  작은 웹사이트에서 성능 개선을 시작할 때 확인할 LCP, INP, CLS와 점검 순서를 정리합니다. 대표 페이지 선정부터 모바일 측정,
  이미지와 스크립트 수정, 배포 전후 기록까지 한 번에 한 가지 문제를 해결하는 실무 체크리스트입니다.
published: true
automated: true
recoveredAt: '2026-10-31T11:49:29.562Z'
cover: /images/posts/small-website-core-web-vitals-checklist/commons-131630287.webp
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Ashley Pomeroy
  title: Printed Circuit Board 9990.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=131630287'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-131630287
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/c/cc/Printed_Circuit_Board_9990.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 38d392939bb01ff79a65fc55abc88acac6d4dd8cb099ba65010f453bd9323acc
  verifiedAt: '2026-10-31T11:51:10.793Z'
  originalArtist: >-
    <a href="//commons.wikimedia.org/wiki/User:Ashley_Pomeroy"
    title="User:Ashley Pomeroy">Ashley Pomeroy</a>
  changes: Resized and converted to WebP
---
## 성능 점수보다 먼저 볼 것은 사용자 동작

개인 블로그나 작은 서비스도 첫 화면이 늦게 나오거나 버튼 반응이 느리면 사용하기 불편하다. 그렇다고 모든 페이지를 한꺼번에 최적화할 필요는 없다. 방문자가 가장 자주 여는 화면 하나와 가장 중요한 동작 하나부터 정하는 편이 작업 범위를 잡기 쉽다.

예를 들어 블로그라면 글 상세 화면을 열고 본문을 읽기 시작하는 순간, 예약 서비스라면 날짜 선택 후 다음 단계로 넘어가는 순간을 고른다. 아래 순서는 작은 프로젝트에 적용하기 위한 제안이며, 특정 사이트에서 성능 향상을 측정한 결과는 아니다.

## 세 지표를 서로 다른 문제로 구분하기

Core Web Vitals는 로딩 성능인 LCP, 상호작용 반응성인 INP, 화면의 시각적 안정성인 CLS로 나뉜다. 좋은 경험의 기준은 각각 2.5초 이하, 200밀리초 이하, 0.1 이하다. 평가는 모바일과 데스크톱을 구분한 실제 방문의 75번째 백분위수를 기준으로 한다. [Google web.dev 기준](https://web.dev/articles/vitals)

| 지표 | 사용자가 느끼는 문제 | 먼저 확인할 대상 |
| --- | --- | --- |
| LCP | 주요 내용이 늦게 보임 | 첫 화면의 큰 이미지와 서버 응답 |
| INP | 눌러도 반응이 늦음 | 클릭 시 실행되는 긴 작업 |
| CLS | 읽던 내용이 밀려남 | 크기를 예약하지 않은 이미지와 삽입 콘텐츠 |

한 번의 개발 도구 측정값으로 실제 방문자 전체의 경험을 단정하지 않는다. 특히 새 사이트는 실제 사용자 데이터가 충분하지 않을 수 있다. 이때는 테스트 조건을 고정한 측정과 직접 조작 검사를 먼저 쌓는다.

## 첫 수정은 이미지와 불필요한 작업부터

첫 화면의 주요 이미지가 늦게 발견되는 구조인지 확인한다. 모든 이미지에 일괄적으로 지연 로딩을 적용하기보다, 초기 화면에서 필요한 이미지와 아래쪽 이미지를 구분해야 한다. 이미지 영역의 크기를 미리 확보하면 다운로드 후 본문이 밀리는 문제도 줄일 수 있다.

버튼이 느리다면 클릭 한 번에 어떤 작업이 붙어 있는지 살펴본다. 사용하지 않는 스크립트를 줄이고 긴 작업을 나누는 방법은 web.dev가 제시하는 개선 방향이다. 어떤 코드가 원인인지 확인하지 않고 라이브러리부터 교체하는 것은 피한다. [Core Web Vitals 개선 가이드](https://web.dev/articles/top-cwv)

예를 들어 검색 버튼이 전체 목록 정렬과 통계 계산을 함께 실행한다면, 검색 결과 표시와 통계 갱신을 분리할 수 있는지 검토한다. 이 판단은 실제 프로파일 기록을 보고 내려야 한다. 네트워크가 느린 문제와 메인 스레드가 바쁜 문제는 수정할 곳이 다르다.

## 배포 전후를 비교할 기록 남기기

작업 기록에는 URL, 기기 조건, 측정 시각, 변경한 코드, 측정 결과를 함께 남긴다. 이미지 압축과 스크립트 제거를 동시에 하면 어떤 수정이 효과가 있었는지 판단하기 어렵다. 가능하면 작은 변경 하나를 먼저 배포하고 같은 조건에서 반복 확인한다.

첫 점검 목록은 다섯 가지면 충분하다.

- 가장 중요한 상세 페이지 한 개를 선정한다.
- 모바일 화면에서 로딩과 버튼 동작을 직접 확인한다.
- 가장 큰 이미지와 긴 스크립트 작업을 찾는다.
- 원인이 확인된 항목 하나만 수정한다.
- 같은 조건의 재측정과 실제 방문자 데이터를 구분해 기록한다.

목표는 점수 화면을 보기 좋게 만드는 일이 아니다. 독자가 글을 빨리 읽고, 사용자가 하려던 동작을 끊김 없이 끝내도록 만드는 일이다.

커버 이미지: [Ashley Pomeroy](https://commons.wikimedia.org/w/index.php?curid=131630287) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
